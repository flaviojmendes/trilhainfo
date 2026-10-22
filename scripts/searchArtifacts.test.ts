// @vitest-environment node
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { JSDOM } from 'jsdom';
import { guides } from '../src/guides';
import { lessons } from '../src/lessons';
import { homeQuestions } from '../src/seo/faq';
import { applySocialMeta, pageForPath, socialPages } from '../src/seo/pages';
import { roadmapCatalogs } from './catalogPlugin';
import {
  applyStaticContent,
  noindexHTML,
  robotsTXT,
  sitemapXML,
  staticBlock,
  staticPageBody,
} from './searchArtifacts';

const root = resolve(__dirname, '..');
const template = readFileSync(resolve(root, 'index.html'), 'utf8');
const posts = JSON.parse(readFileSync(resolve(root, 'public/posts/posts.json'), 'utf8'));
const catalogs = roadmapCatalogs();
const pages = socialPages(catalogs, posts);
const getPage = (path: string) => {
  const page = pageForPath(pages, path);
  if (!page) throw new Error(`Página ausente: ${path}`);
  return page;
};

describe('Conteúdo acessível a buscadores e assistentes', () => {
  it('publica as seções e referências de todos os guias e aulas sem JavaScript', async () => {
    for (const meta of [...guides, ...lessons]) {
      const page = getPage(`${'category' in meta ? '/guide/' : '/aula/'}${meta.id}`);
      const html = await staticPageBody(page, catalogs, posts, root);
      const { content } = await meta.load();
      for (const section of content.sections) expect(html).toContain(`id="${section.id}"`);
      for (const source of content.sources || [])
        expect(html).toContain(source.url.replace(/&/g, '&amp;'));
    }
  });

  it('mantém uma única canonical e um único grafo por página ao enriquecer HTML existente', async () => {
    const page = getPage('/guide/cors');
    const body = await staticPageBody(page, catalogs, posts, root);
    const once = applyStaticContent(applySocialMeta(template, page), body, page);
    const twice = applyStaticContent(applySocialMeta(once, page), body, page);
    const document = new JSDOM(twice).window.document;
    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://trilha.info/guide/cors',
    );
    expect(document.querySelectorAll('script[data-seo-schema]')).toHaveLength(1);
    expect(document.querySelectorAll('style[data-static-reading]')).toHaveLength(1);
    expect(document.querySelectorAll('#root main')).toHaveLength(1);
    expect(document.querySelector('h1')?.textContent).toBe(page.title);
    const graph = JSON.parse(
      document.querySelector('script[data-seo-schema]')?.textContent || '{}',
    )['@graph'];
    expect(graph).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ '@type': ['TechArticle', 'LearningResource'] }),
        expect.objectContaining({ '@type': 'BreadcrumbList' }),
      ]),
    );
  });

  it('usa as mesmas respostas visíveis da home no FAQ estruturado', async () => {
    const page = getPage('/');
    const html = applyStaticContent(
      applySocialMeta(template, page),
      await staticPageBody(page, catalogs, posts, root),
      page,
    );
    const document = new JSDOM(html).window.document;
    const graph = JSON.parse(
      document.querySelector('script[data-seo-schema]')?.textContent || '{}',
    )['@graph'];
    const faq = graph.find((item: { '@type': string }) => item['@type'] === 'FAQPage');
    for (const { question, answer } of homeQuestions) {
      expect(document.querySelector('main')?.textContent).toContain(answer);
      expect(faq.mainEntity).toContainEqual({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      });
    }
  });

  it('inclui blog e aulas no sitemap sem duplicatas, variantes de URL ou páginas pessoais', () => {
    const xml = sitemapXML(pages);
    const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
    expect(new Set(urls).size).toBe(pages.length);
    expect(urls).toContain('https://trilha.info/blog');
    expect(urls).toContain('https://trilha.info/blog/trilha-001');
    expect(urls).toContain('https://trilha.info/aula/html-primeira-pagina');
    expect(xml).not.toMatch(/profile|login|hroadmap|\?trilha|\/read\//);
    expect(robotsTXT).toContain('Sitemap: https://trilha.info/sitemap.xml');
    expect(robotsTXT).not.toContain('Disallow: /assets');
  });

  it('remove a identidade da home ao servir um erro ou uma página pessoal', async () => {
    const home = getPage('/');
    const html = applyStaticContent(
      applySocialMeta(template, home),
      await staticPageBody(home, catalogs, posts, root),
      home,
    );
    const document = new JSDOM(noindexHTML(html, 'Página não encontrada · Trilha Info')).window
      .document;
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe(
      'noindex, follow',
    );
    expect(document.querySelector('link[rel="canonical"]')).toBeNull();
    expect(document.querySelector('script[type="application/ld+json"]')).toBeNull();
    expect(document.querySelector('h1')?.textContent).toBe('Página não encontrada · Trilha Info');
    expect(document.querySelectorAll('h1')).toHaveLength(1);
  });

  it('escapa exemplos de HTML e não expõe as respostas das lacunas', () => {
    const html = staticBlock({
      type: 'code',
      language: 'html',
      code: '</script><script>alert(1)</script>',
    });
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
    expect(
      staticBlock({
        type: 'fill',
        prompt: 'Complete',
        language: 'js',
        template: 'const [[segredo]] = 1;',
        explanation: '',
      }),
    ).toContain('const ____ = 1;');
  });
});
