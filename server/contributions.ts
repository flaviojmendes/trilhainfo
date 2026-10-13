import type { IncomingMessage, ServerResponse } from 'http';
import {
  contributionFile,
  contributionResource,
  FieldErrors,
  validateDraft,
  youtubeId,
} from '../src/contributions/validate';
import {
  Contribution,
  ContributionDraft,
  languageLabels,
  resourceKindLabels,
} from '../src/contributions/types';
import type { RoadmapCatalog } from '../src/learning/types';
import { GitHubError, githubConfig, installationClient } from './github';

type Request = IncomingMessage & { body?: unknown };

const label = 'contribuição';
const maxOpenPulls = 40;
const perHour = 5;
const recent = new Map<string, number[]>();

function send(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (!res.getHeader('Cache-Control')) res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

async function readBody(req: Request): Promise<unknown> {
  if (req.body !== undefined) return typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 16_000) throw new Error('too large');
  }
  return JSON.parse(raw || '{}');
}

function clientIP(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  return (
    (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(',')[0].trim() ||
    req.socket.remoteAddress ||
    ''
  );
}

function siteOrigin(req: Request, env: NodeJS.ProcessEnv): string {
  if (env.SITE_URL) return env.SITE_URL.replace(/\/$/, '');
  if (env.VERCEL_ENV === 'production') return 'https://trilha.info';
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`;
  return `http://${req.headers.host || 'localhost:5173'}`;
}

function allowedOrigin(req: Request, env: NodeJS.ProcessEnv): boolean {
  const origin = req.headers.origin;
  if (!origin) return true;
  try {
    const { hostname } = new URL(origin);
    return (
      hostname === 'trilha.info' ||
      hostname.endsWith('.trilha.info') ||
      hostname === env.VERCEL_URL ||
      hostname.endsWith('.vercel.app') ||
      (env.VERCEL_ENV !== 'production' && (hostname === 'localhost' || hostname === '127.0.0.1'))
    );
  } catch {
    return false;
  }
}

function limited(ip: string): boolean {
  const now = Date.now();
  const hits = (recent.get(ip) || []).filter((time) => now - time < 3_600_000);
  recent.set(ip, [...hits, now]);
  return hits.length >= perHour;
}

async function verifyTurnstile(token: unknown, ip: string, secret: string): Promise<boolean> {
  if (typeof token !== 'string' || !token) return false;
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  return Boolean(((await response.json()) as { success?: boolean }).success);
}

function checkAgainstCatalog(draft: ContributionDraft, catalog: RoadmapCatalog): FieldErrors {
  const group = catalog.groups[draft.groupId];
  if (!group) return { groupId: 'Esse assunto não existe mais na trilha. Recarregue a página.' };
  if (draft.kind === 'resource') {
    const node = catalog.nodes[draft.nodeId];
    if (!node || node.groupId !== group.id) return { nodeId: 'Escolha um passo deste assunto.' };
  }
  const url = contributionResource(draft).url.replace(/\/$/, '');
  if (Object.values(catalog.resources).some((resource) => resource.url.replace(/\/$/, '') === url))
    return {
      [draft.kind === 'resource' ? 'resource.url' : 'step.resource.url']:
        'Esse link já está na trilha.',
    };
  return {};
}

// User text ends up in a public PR body: neutralize mentions, tables and raw HTML.
function md(text: string): string {
  return text
    .replace(/[<>]/g, '')
    .replace(/\|/g, '\\|')
    .replace(/@/g, '@\u200b')
    .replace(/\s+/g, ' ');
}

function pullBody(
  contribution: Contribution,
  catalog: RoadmapCatalog,
  origin: string,
  github?: string,
): string {
  const group = catalog.groups[contribution.groupId];
  const resource =
    contribution.kind === 'resource' ? contribution.resource : contribution.step.resource;
  const language = resource.language ? languageLabels[resource.language] : 'Idioma não informado';
  const author = contribution.author?.name ? md(contribution.author.name) : '';
  const rows = [
    ['Trilha', `[${catalog.title}](${origin}/roadmap/${catalog.id})`],
    ['Assunto', `${md(group.title)} (\`${group.id}\`)`],
    contribution.kind === 'resource'
      ? ['Passo', md(catalog.nodes[contribution.nodeId].title)]
      : ['Novo passo', `**${md(contribution.step.title)}**: ${md(contribution.step.description)}`],
    [
      'Conteúdo',
      `${resourceKindLabels[resource.kind]} · ${language} · [${md(resource.title)}](${
        resource.url
      })`,
    ],
    ['Sugerido por', [author, github ? `@${github}` : ''].filter(Boolean).join(' ') || 'Anônimo'],
  ];
  return [
    `## ${contribution.kind === 'resource' ? 'Sugestão de conteúdo' : 'Sugestão de novo passo'}`,
    '',
    '| | |',
    '|---|---|',
    ...rows.map(([key, value]) => `| ${key} | ${value} |`),
    '',
    '### Por que isso ajuda quem estuda',
    '',
    `> ${md(contribution.reason)}`,
    '',
    '### Revisão',
    '',
    '- [ ] O link abre e o conteúdo é gratuito',
    '- [ ] Está no assunto e no passo certos',
    '- [ ] O título descreve o conteúdo',
    '',
    '---',
    'Enviado pelo botão "Sugerir conteúdo" da Trilha Info. Depois do merge, o conteúdo aparece na trilha no próximo deploy.',
    '',
    `<!-- contribution-url: ${resource.url} -->`,
  ].join('\n');
}

export async function handleContribution(req: Request, res: ServerResponse, env = process.env) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Use POST.' });
  if (!allowedOrigin(req, env)) return send(res, 403, { error: 'Origem não permitida.' });

  let input: Record<string, unknown>;
  try {
    input = (await readBody(req)) as Record<string, unknown>;
  } catch {
    return send(res, 400, { error: 'Não foi possível ler a sugestão.' });
  }
  if (input.website) return send(res, 202, { ok: true });

  const result = validateDraft(input);
  if (!result.ok)
    return send(res, 422, { error: 'Revise os campos destacados.', errors: result.errors });
  const draft = result.value;

  const ip = clientIP(req);
  if (limited(ip))
    return send(res, 429, {
      error: 'Você já enviou várias sugestões nesta hora. Tente de novo mais tarde.',
    });

  const production = env.VERCEL_ENV === 'production';
  if (env.TURNSTILE_SECRET_KEY) {
    if (!(await verifyTurnstile(input.turnstileToken, ip, env.TURNSTILE_SECRET_KEY)))
      return send(res, 403, {
        error: 'Não conseguimos confirmar que você não é um robô. Tente de novo.',
      });
  } else if (production)
    return send(res, 503, { error: 'O envio de sugestões ainda não está configurado.' });

  const origin = siteOrigin(req, env);
  const catalogResponse = await fetch(`${origin}/data/${encodeURIComponent(draft.roadmapId)}.json`);
  if (!catalogResponse.ok)
    return send(res, 422, {
      error: 'Trilha não encontrada.',
      errors: { roadmapId: 'Trilha não encontrada.' },
    });
  const catalog = (await catalogResponse.json()) as RoadmapCatalog;
  const conflicts = checkAgainstCatalog(draft, catalog);
  if (Object.keys(conflicts).length)
    return send(res, 422, { error: Object.values(conflicts)[0], errors: conflicts });

  const contribution = contributionFile(draft);
  const path = `src/contributions/entries/${contribution.id}.json`;
  const content = `${JSON.stringify(contribution, null, 2)}\n`;
  const config = githubConfig(env);
  if (!config) {
    if (production)
      return send(res, 503, { error: 'O envio de sugestões ainda não está configurado.' });
    return send(res, 200, { dryRun: true, path, file: contribution });
  }

  try {
    const client = await installationClient(config);
    const resource = contributionResource(draft);
    const duplicate = await client.searchOpenPulls(`"contribution-url: ${resource.url}" in:body`);
    if (duplicate.total_count > 0)
      return send(res, 409, {
        error: 'Alguém já sugeriu esse link e a sugestão está em revisão.',
        pull: { number: duplicate.items[0].number, url: duplicate.items[0].html_url },
      });
    const open = await client.searchOpenPulls(`label:"${label}"`);
    if (open.total_count >= maxOpenPulls)
      return send(res, 503, {
        error: 'Há muitas sugestões aguardando revisão. Tente de novo em alguns dias.',
      });

    let coAuthor = '';
    const login = draft.author?.github;
    if (login) {
      const user = await client.findUser(login);
      if (!user)
        return send(res, 422, {
          error: 'Não encontramos esse usuário no GitHub.',
          errors: { 'author.github': 'Não encontramos esse usuário no GitHub.' },
        });
      coAuthor = `\n\nCo-authored-by: ${draft.author?.name || user.name || user.login} <${
        user.id
      }+${user.login}@users.noreply.github.com>`;
    }

    const subject = draft.kind === 'resource' ? resource.title : draft.step.title;
    const groupTitle = catalog.groups[draft.groupId].title;
    const pull = await client.openPull({
      branch: `contribuicao/${contribution.id}`,
      path,
      content,
      message: `content(${draft.roadmapId}): sugere "${subject}" em ${groupTitle}${coAuthor}`,
      title: `${
        draft.kind === 'resource' ? 'Conteúdo' : 'Novo passo'
      } em ${groupTitle}: ${subject}`.slice(0, 200),
      body: pullBody(contribution, catalog, env.SITE_URL || 'https://trilha.info', login),
      labels: [label],
    });
    return send(res, 201, { pull: { number: pull.number, url: pull.html_url } });
  } catch (error) {
    console.error('contribution failed', error instanceof GitHubError ? error.message : error);
    return send(res, 502, {
      error: 'O GitHub não respondeu como esperado. Tente de novo em alguns minutos.',
    });
  }
}

export async function handleLinkInfo(req: Request, res: ServerResponse) {
  const url = new URL(req.url || '/', 'http://localhost').searchParams.get('url') || '';
  const id = youtubeId(url);
  if (!id) return send(res, 404, { error: 'Sem informações para esse link.' });
  const response = await fetch(
    `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(
      `https://www.youtube.com/watch?v=${id}`,
    )}`,
  );
  if (!response.ok) return send(res, 404, { error: 'Vídeo não encontrado.' });
  const data = (await response.json()) as { title?: string; author_name?: string };
  res.setHeader('Cache-Control', 'public, max-age=86400');
  return send(res, 200, { kind: 'video', title: data.title || '', author: data.author_name || '' });
}
