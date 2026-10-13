import {
  Contribution,
  ContributionDraft,
  ContributionLanguage,
  ContributionResource,
  ContributionResourceKind,
  languageLabels,
  resourceKindLabels,
} from './types';

export type FieldErrors = Partial<Record<string, string>>;

const identity = /^[a-zA-Z0-9][a-zA-Z0-9._-]*$/;
const githubLogin = /^(?!-)[A-Za-z0-9-]{1,39}$/;
// eslint-disable-next-line no-control-regex
const controlCharacters = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;

export const limits = {
  title: [6, 120],
  stepTitle: [4, 80],
  description: [20, 400],
  reason: [20, 600],
  name: [0, 60],
} as const;

function text(value: unknown): string {
  return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
}

function checkText(
  errors: FieldErrors,
  field: string,
  value: string,
  [min, max]: readonly [number, number],
  label: string,
) {
  if (controlCharacters.test(value)) errors[field] = `${label} tem caracteres inválidos.`;
  else if (value.length < min)
    errors[field] =
      min <= 1
        ? `Informe ${label.toLowerCase()}.`
        : `${label} precisa de pelo menos ${min} caracteres.`;
  else if (value.length > max) errors[field] = `${label} pode ter até ${max} caracteres.`;
}

export function normalizeURL(value: unknown): string | undefined {
  const raw = text(value);
  if (!raw) return undefined;
  try {
    const url = new URL(/^[a-z][a-z0-9+.-]*:/i.test(raw) ? raw : `https://${raw}`);
    if (url.protocol !== 'https:' || !url.hostname.includes('.') || url.username || url.password)
      return undefined;
    url.hash = '';
    return url.toString();
  } catch {
    return undefined;
  }
}

export function youtubeId(url: string): string | undefined {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^(www\.|m\.)/, '');
    const id =
      host === 'youtu.be'
        ? parsed.pathname.slice(1)
        : host === 'youtube.com'
        ? parsed.searchParams.get('v') ||
          parsed.pathname.match(/^\/(?:shorts|embed|live)\/([^/]+)/)?.[1]
        : undefined;
    return id && /^[\w-]{11}$/.test(id) ? id : undefined;
  } catch {
    return undefined;
  }
}

function checkResource(
  errors: FieldErrors,
  prefix: string,
  input: Record<string, unknown> | undefined,
): ContributionResource | undefined {
  const kind = input?.kind as ContributionResourceKind;
  if (!Object.prototype.hasOwnProperty.call(resourceKindLabels, kind))
    errors[`${prefix}.kind`] = 'Escolha o tipo de conteúdo.';
  const url = normalizeURL(input?.url);
  if (!url) errors[`${prefix}.url`] = 'Use um link completo que comece com https://.';
  const title = text(input?.title);
  checkText(errors, `${prefix}.title`, title, limits.title, 'O título');
  const language = (input?.language ?? null) as ContributionLanguage | null;
  if (language !== null && !Object.prototype.hasOwnProperty.call(languageLabels, language))
    errors[`${prefix}.language`] = 'Escolha um idioma da lista.';
  return url ? { kind, title, url, language } : undefined;
}

export function validateDraft(
  input: unknown,
): { ok: true; value: ContributionDraft } | { ok: false; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const value = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>;
  const roadmapId = text(value.roadmapId);
  const groupId = text(value.groupId);
  if (!identity.test(roadmapId)) errors.roadmapId = 'Trilha inválida.';
  if (!identity.test(groupId)) errors.groupId = 'Assunto inválido.';

  const reason = text(value.reason);
  checkText(errors, 'reason', reason, limits.reason, 'A justificativa');

  const authorInput = (value.author || {}) as Record<string, unknown>;
  const name = text(authorInput.name);
  const github = text(authorInput.github).replace(/^@/, '');
  checkText(errors, 'author.name', name, limits.name, 'O nome');
  if (github && !githubLogin.test(github))
    errors['author.github'] = 'Use só o usuário, sem o link.';
  const author =
    name || github ? { ...(name ? { name } : {}), ...(github ? { github } : {}) } : undefined;

  let draft: ContributionDraft | undefined;
  if (value.kind === 'resource') {
    const nodeId = text(value.nodeId);
    if (!identity.test(nodeId)) errors.nodeId = 'Escolha em qual passo o conteúdo entra.';
    const resource = checkResource(errors, 'resource', value.resource as Record<string, unknown>);
    if (resource)
      draft = { kind: 'resource', roadmapId, groupId, nodeId, resource, reason, author };
  } else if (value.kind === 'step') {
    const step = (value.step || {}) as Record<string, unknown>;
    const title = text(step.title);
    const description = text(step.description);
    checkText(errors, 'step.title', title, limits.stepTitle, 'O nome do passo');
    checkText(errors, 'step.description', description, limits.description, 'A descrição');
    const resource = checkResource(
      errors,
      'step.resource',
      step.resource as Record<string, unknown>,
    );
    if (resource)
      draft = {
        kind: 'step',
        roadmapId,
        groupId,
        step: { title, description, resource },
        reason,
        author,
      };
  } else errors.kind = 'Escolha o que você quer sugerir.';

  if (Object.keys(errors).length || !draft) return { ok: false, errors };
  if (!author) delete (draft as { author?: unknown }).author;
  return { ok: true, value: draft };
}

export function validateContribution(input: unknown): string[] {
  const value = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>;
  const problems: string[] = [];
  if (value.schemaVersion !== 1) problems.push('schemaVersion deve ser 1');
  if (typeof value.id !== 'string' || !/^[a-z0-9-]{8,80}$/.test(value.id))
    problems.push('id inválido');
  if (typeof value.createdAt !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value.createdAt))
    problems.push('createdAt deve ser AAAA-MM-DD');
  const result = validateDraft(value);
  if (!result.ok)
    problems.push(...Object.entries(result.errors).map(([field, error]) => `${field}: ${error}`));
  return problems;
}

export function contributionFile(draft: ContributionDraft, now = new Date()): Contribution {
  const createdAt = now.toISOString().slice(0, 10);
  const subject = draft.kind === 'resource' ? draft.resource.title : draft.step.title;
  const slug = subject
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40)
    .replace(/-$/, '');
  const suffix = Math.random().toString(36).slice(2, 8);
  return {
    schemaVersion: 1,
    id: `${createdAt}-${slug || 'sugestao'}-${suffix}`,
    createdAt,
    ...draft,
  };
}

export function contributionResource(contribution: ContributionDraft): ContributionResource {
  return contribution.kind === 'resource' ? contribution.resource : contribution.step.resource;
}
