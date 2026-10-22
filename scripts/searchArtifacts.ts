import { readFileSync } from 'fs';
import { resolve } from 'path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Markdown from 'markdown-to-jsx';
import { guides, findGuide } from '../src/guides';
import { GuideContent } from '../src/guides/types';
import { courses, courseLessons, findCourse, findLesson } from '../src/lessons';
import { LessonBlock, LessonContent } from '../src/lessons/types';
import { RoadmapCatalog } from '../src/learning/types';
import { homeQuestions } from '../src/seo/faq';
import { BlogPost, siteUrl, SocialPage } from '../src/seo/pages';
import { applyStructuredData } from '../src/seo/structuredData';
import { escapeHTML as e, staticStyles } from './roadmapArtifacts';

const inline = (text: string) =>
  e(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
const p = (text: string) => `<p>${inline(text)}</p>`;
const code = (text: string) => `<pre><code>${e(text)}</code></pre>`;
const list = (items: string[], ordered = false) => {
  const tag = ordered ? 'ol' : 'ul';
  return `<${tag}>${items.map((item) => `<li>${inline(item)}</li>`).join('')}</${tag}>`;
};
const link = (path: string, title: string) => `<a href="${e(path)}">${e(title)}</a>`;
const sources = (items: GuideContent['sources']) =>
  items?.length
    ? `<section><h2>Referências</h2><ul>${items
        .map((item) => `<li>${link(item.url, item.title)}</li>`)
        .join('')}</ul></section>`
    : '';

/** A readable equivalent of every editorial block, without inactive JavaScript controls. */
export function staticBlock(block: LessonBlock): string {
  switch (block.type) {
    case 'text':
      return p(block.text);
    case 'list':
      return list(block.items, block.ordered);
    case 'callout':
      return `<aside>${block.title ? `<h3>${inline(block.title)}</h3>` : ''}${p(
        block.text,
      )}</aside>`;
    case 'code':
      return `${block.caption ? p(block.caption) : ''}${code(block.code)}${
        block.output ? code(block.output) : ''
      }`;
    case 'steps':
      return `<ol>${block.items
        .map(
          (item) =>
            `<li><h3>${inline(item.title)}</h3>${p(item.text)}${
              item.code ? code(item.code) : ''
            }</li>`,
        )
        .join('')}</ol>`;
    case 'cards':
      return block.items
        .map(
          (item) =>
            `<section>${item.label ? p(item.label) : ''}<h3>${inline(item.title)}</h3>${p(
              item.text,
            )}${item.points ? list(item.points) : ''}${item.code ? code(item.code) : ''}</section>`,
        )
        .join('');
    case 'table':
      return `<div class="reading-table"><table><caption>${inline(
        block.caption,
      )}</caption><thead><tr>${block.head
        .map((cell) => `<th scope="col">${inline(cell)}</th>`)
        .join('')}</tr></thead><tbody>${block.rows
        .map(
          (row) =>
            `<tr>${row
              .map((cell, i) =>
                i ? `<td>${inline(cell)}</td>` : `<th scope="row">${inline(cell)}</th>`,
              )
              .join('')}</tr>`,
        )
        .join('')}</tbody></table></div>`;
    case 'terms':
      return `<dl>${block.items
        .map((item) => `<dt>${inline(item.term)}</dt><dd>${inline(item.text)}</dd>`)
        .join('')}</dl>`;
    case 'sequence':
      return `${p(block.caption)}${list(
        block.messages.map(
          (message) =>
            `${block.actors[message.from]} → ${block.actors[message.to]}: ${message.label}${
              message.text ? `. ${message.text}` : ''
            }`,
        ),
        true,
      )}`;
    case 'scripts':
      return block.variants
        .map((item) => `<h3>${inline(item.title)}</h3>${code(item.markup)}${p(item.text)}`)
        .join('');
    case 'complexity':
      return block.items
        .map(
          (item) =>
            `<h3>${inline(item.name)}: O(${e(item.id)})</h3>${p(item.text)}${p(item.example)}${code(
              item.code,
            )}`,
        )
        .join('');
    case 'joins':
      return block.items
        .map(
          (item) =>
            `<h3>${inline(item.title)}</h3>${p(item.text)}${code(item.sql)}${code(item.result)}`,
        )
        .join('');
    case 'pyramid':
      return `${p(block.caption)}${list(
        block.levels.map((item) => `${item.title}: ${item.text}`),
      )}`;
    case 'layout':
      return `${p(block.caption)}${code(block.code)}`;
    case 'checklist':
      return list(block.items);
    case 'quiz':
      return `<section><h3>${inline(block.question)}</h3>${
        block.code ? code(block.code) : ''
      }${list(block.options.map((option) => option.text))}</section>`;
    case 'order':
      return `${p(block.prompt)}${list(block.items)}`;
    case 'classify':
      return `${p(block.prompt)}${p(block.buckets.join(' · '))}${list(
        block.items.map((item) => item.text),
      )}`;
    case 'fill':
      return `${p(block.prompt)}${code(block.template.replace(/\[\[[\s\S]*?\]\]/g, '____'))}`;
    case 'analogy':
      return `<aside><h3>${inline(block.title)}</h3>${p(block.text)}</aside>`;
    case 'reveal':
      return `<details><summary>${inline(block.question)}</summary>${p(block.answer)}</details>`;
    case 'anatomy':
      return `${p(block.caption)}${code(block.parts.map((part) => part.text).join(''))}${list(
        block.parts
          .filter((part) => part.label)
          .map((part) => `${part.label}: ${part.note || part.text}`),
      )}`;
    case 'flow':
      return `${p(block.caption)}${list(
        block.steps.map(
          (step) =>
            `${block.actors[step.from]} → ${block.actors[step.to]}: ${step.label}. ${step.text}`,
        ),
        true,
      )}`;
    case 'trace':
      return `${p(block.caption)}${code(block.code)}${list(
        block.steps.map(
          (step) =>
            `Linha ${step.line}: ${step.note}${step.output ? ` Saída: ${step.output}` : ''}`,
        ),
        true,
      )}`;
    case 'playground':
      return `<h3>${inline(block.title)}</h3>${block.task ? p(block.task) : ''}${[
        block.html,
        block.css,
        block.js,
      ]
        .filter((text): text is string => !!text)
        .map(code)
        .join('')}${block.checks ? list(block.checks.map((check) => check.label)) : ''}`;
    case 'terminal':
      return `<h3>${inline(block.title)}</h3>${block.task ? p(block.task) : ''}${
        block.intro ? code(block.intro) : ''
      }<ol>${block.steps
        .map(
          (step) =>
            `<li>${p(step.goal)}${code(
              Array.isArray(step.command) ? step.command[0] : step.command,
            )}${step.output ? code(step.output) : ''}</li>`,
        )
        .join('')}</ol>`;
    case 'sql':
      return `<h3>${inline(block.title)}</h3>${block.task ? p(block.task) : ''}${code(
        block.query,
      )}${block.checks ? list(block.checks.map((check) => check.label)) : ''}`;
    case 'python':
      return `<h3>${inline(block.title)}</h3>${block.task ? p(block.task) : ''}${code(block.code)}${
        block.checks ? list(block.checks.map((check) => check.label)) : ''
      }`;
    case 'boxModel':
      return p('Laboratório interativo do modelo de caixa: conteúdo, padding, borda e margin.');
    case 'layoutLab':
      return p(
        `Laboratório interativo de layout com ${block.mode === 'flex' ? 'Flexbox' : 'Grid'}.`,
      );
    case 'specificity':
      return list(block.pairs.map(([a, b]) => `${a} ou ${b}`));
    case 'contrast':
      return p(
        `Laboratório de contraste: texto ${block.foreground} sobre fundo ${block.background}.`,
      );
    case 'domTree':
      return `${p(block.caption)}${code(block.html)}`;
    case 'screenReader':
      return `${p(block.caption)}${block.variants
        .map((item) => `<h3>${inline(item.label)}</h3>${code(item.code)}${list(item.speech)}`)
        .join('')}`;
    case 'codeTabs':
      return `${p(block.caption)}${block.tabs
        .map((tab) => `<h3>${inline(tab.label)}</h3>${code(tab.code)}`)
        .join('')}`;
    default: {
      const unhandled: never = block;
      throw new Error(`Bloco sem leitura estática: ${JSON.stringify(unhandled)}`);
    }
  }
}

function sections(content: GuideContent | LessonContent) {
  return `<nav aria-label="Nesta página"><ol>${content.sections
    .map((section) => `<li>${link(`#${section.id}`, section.title)}</li>`)
    .join('')}</ol></nav>${content.sections
    .map(
      (section) =>
        `<section id="${e(section.id)}"><h2>${inline(section.title)}</h2>${section.blocks
          .map(staticBlock)
          .join('')}</section>`,
    )
    .join('')}`;
}

const entries = (items: Array<{ path: string; title: string; description: string }>) =>
  `<ul>${items
    .map((item) => `<li>${link(item.path, item.title)}${p(item.description)}</li>`)
    .join('')}</ul>`;

export async function staticPageBody(
  page: SocialPage,
  catalogs: RoadmapCatalog[],
  posts: BlogPost[],
  root: string,
): Promise<string> {
  let body = `<h1>${e(page.title)}</h1>${p(page.description)}`;
  const guide = page.path.startsWith('/guide/') && findGuide(page.path.slice(7));
  const lesson = page.path.startsWith('/aula/') && findLesson(page.path.slice(6));
  const course = page.path.startsWith('/aulas/') && findCourse(page.path.slice(7));
  if (guide) {
    const { content } = await guide.load();
    body += `<p>${guide.minutes} min de leitura · ${e(guide.level)} · Revisado em <time datetime="${
      guide.updatedAt
    }">${guide.updatedAt}</time></p>${sections(content)}${sources(
      content.sources,
    )}<h2>Trilhas relacionadas</h2>${listLinks(
      guide.trails.map((id) => ({
        path: `/roadmap/${id}`,
        title: catalogs.find((c) => c.id === id)?.title || id,
      })),
    )}`;
  } else if (lesson) {
    const { content } = await lesson.load();
    body += `<p>Cerca de ${lesson.minutes} min · Revisado em <time datetime="${lesson.updatedAt}">${
      lesson.updatedAt
    }</time></p><h2>Ao final, você vai conseguir</h2>${list(lesson.objectives)}${p(
      content.hook,
    )}${sections(content)}<section><h2>Fechamento</h2>${list(content.recap)}<h3>${inline(
      content.mission.title,
    )}</h3>${p(content.mission.text)}${list(content.mission.steps, true)}</section>${sources(
      content.sources,
    )}<h2>Cursos relacionados</h2>${listLinks(
      courses
        .filter((c) => c.modules.some((m) => m.lessonIds.includes(lesson.id)))
        .map((c) => ({ path: `/aulas/${c.id}`, title: c.title })),
    )}`;
  } else if (course) {
    body += `${link(`/roadmap/${course.id}`, `Ver a trilha ${course.title}`)}${course.modules
      .map(
        (module) =>
          `<section><h2>${e(module.title)}${module.optional ? ' (opcional)' : ''}</h2>${entries(
            module.lessonIds.flatMap((id) => {
              const item = findLesson(id);
              return item
                ? [{ path: `/aula/${id}`, title: item.title, description: item.summary }]
                : [];
            }),
          )}</section>`,
      )
      .join('')}`;
  } else if (page.path === '/guias') {
    body += entries(
      guides.map((item) => ({
        path: `/guide/${item.id}`,
        title: item.title,
        description: item.summary,
      })),
    );
  } else if (page.path === '/aulas') {
    body += entries(
      courses.map((item) => ({
        path: `/aulas/${item.id}`,
        title: `Aulas de ${item.title}`,
        description: `${
          courseLessons(item).length
        } aulas gratuitas, com explicações, exercícios e prática.`,
      })),
    );
  } else if (page.path === '/blog') {
    body += entries(
      posts.map((item) => ({
        path: `/blog/${item.url}`,
        title: item.title,
        description: item.summary,
      })),
    );
  } else if (page.path.startsWith('/blog/')) {
    const post = posts.find((item) => `/blog/${item.url}` === page.path);
    if (!post) throw new Error(`Publicação ausente: ${page.path}`);
    const markdown = readFileSync(resolve(root, `public/posts/${post.url}.md`), 'utf8');
    // The Markdown already has its own h1. Use the same safe parser as the client page.
    body = renderToStaticMarkup(
      // markdown-to-jsx requires children in its props type for React.createElement.
      // eslint-disable-next-line react/no-children-prop
      createElement(Markdown, { options: { disableParsingRawHTML: true }, children: markdown }),
    );
  } else if (page.path === '/') {
    body += `<h2>Escolha uma trilha de tecnologia</h2>${entries(
      catalogs.map((item) => ({
        path: `/roadmap/${item.id}`,
        title: item.title,
        description: `${item.audience} ${item.outcome}`,
      })),
    )}<h2>Aulas e guias gratuitos</h2>${listLinks([
      { path: '/aulas', title: 'Aulas interativas de programação e tecnologia' },
      { path: '/guias', title: 'Guias rápidos de tecnologia' },
      { path: '/blog', title: 'Blog de tecnologia e carreira' },
    ])}<section><h2>Dúvidas sobre como estudar</h2><dl>${homeQuestions
      .map(({ question, answer }) => `<dt>${e(question)}</dt><dd>${e(answer)}</dd>`)
      .join('')}</dl></section><h2>Código aberto</h2>${p(
      'A Trilha Info nasceu em junho de 2022 para organizar conteúdos gratuitos em português para quem quer entrar na área de tecnologia. Todo o currículo está no GitHub, e qualquer pessoa pode propor melhorias.',
    )}${link(
      'https://github.com/flaviojmendes/trilhainfo',
      'Ver o código e contribuir no GitHub',
    )}`;
  }
  return `<main class="catalog-fallback" lang="pt-BR"><div class="reading"><noscript><p>Versão de leitura. Ative JavaScript para usar os exercícios interativos e salvar seu progresso.</p></noscript><nav aria-label="Navegação">${link(
    '/',
    'Trilha Info',
  )}${link('/aulas', 'Aulas')}${link('/guias', 'Guias')}${link(
    '/blog',
    'Blog',
  )}</nav><article>${body}</article><footer><p>Trilha Info: conteúdo gratuito em português. Idealizado por ${link(
    'https://youtube.com/flaviojmendes',
    'flaviojmendes',
  )}.</p></footer></div></main>`;
}

const listLinks = (items: Array<{ path: string; title: string }>) =>
  `<ul>${items.map((item) => `<li>${link(item.path, item.title)}</li>`).join('')}</ul>`;

export function applyStaticContent(html: string, body: string, page: SocialPage) {
  return applyStructuredData(html, page)
    .replace(/<style data-static-reading>[\s\S]*?<\/style>/g, '')
    .replace(
      /<div id="root">[\s\S]*?<\/div>\s*(?=<script|<\/body)/,
      () => `<div id="root">${body}</div>\n`,
    )
    .replace(
      '</head>',
      `<style data-static-reading>${staticStyles}.reading-table{overflow-x:auto}.catalog-fallback table{border-collapse:collapse}.catalog-fallback th,.catalog-fallback td{padding:8px;border:1px solid #493b44;text-align:left}.catalog-fallback img{max-width:100%;height:auto}.catalog-fallback dt{font-weight:700;margin-top:24px}.catalog-fallback dd{margin:8px 0 0}</style></head>`,
    );
}

export function sitemapXML(pages: SocialPage[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages
    .map(
      (page) =>
        `<url><loc>${e(`${siteUrl}${page.path}`)}</loc>${
          page.modified ? `<lastmod>${e(page.modified)}</lastmod>` : ''
        }</url>`,
    )
    .join('')}</urlset>\n`;
}

export const robotsTXT = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${siteUrl}/sitemap.xml
`;

/** Served for personal/dynamic routes and HTTP 404 responses; public pages get their own HTML. */
export function noindexHTML(html: string, title: string) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/gi, `<title>${e(title)}</title>`)
    .replace(
      /<meta\s+(?:name|property)="(?:robots|description|og:[^"]*|twitter:[^"]*|article:[^"]*)"[^>]*>\s*/gi,
      '',
    )
    .replace(/<link\b[^>]*\brel="canonical"[^>]*>\s*/gi, '')
    .replace(/<script[^>]*(?:data-seo-schema|data-trilha-meta)[^>]*>[\s\S]*?<\/script>\s*/g, '')
    .replace(
      /<div id="root">[\s\S]*?<\/div>\s*(?=<script|<\/body)/,
      `<div id="root"><main class="catalog-fallback"><div class="reading"><h1>${e(
        title,
      )}</h1><p>${link('/', 'Voltar à Trilha Info')}</p></div></main></div>\n`,
    )
    .replace('</head>', '<meta name="robots" content="noindex, follow" /></head>');
}
