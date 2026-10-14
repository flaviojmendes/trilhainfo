// @vitest-environment node
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { guides } from '../src/guides';
import { courses, lessons } from '../src/lessons';
import { roadmapCatalogs } from './catalogPlugin';
import { applySocialMeta, pageForPath, renderCard, siteUrl, socialPages } from './socialPreview';

const root = resolve(__dirname, '..');
const indexHTML = readFileSync(resolve(root, 'index.html'), 'utf8');
const posts = JSON.parse(readFileSync(resolve(root, 'public/posts/posts.json'), 'utf8'));
const catalogs = roadmapCatalogs();
const pages = socialPages(catalogs, posts);

const tagValues = (html: string, attribute: 'name' | 'property', key: string) =>
  [...html.matchAll(new RegExp(`<meta ${attribute}="${key}" content="([^"]*)"`, 'g'))].map(
    (match) => match[1],
  );

describe('Prévia de links', () => {
  it('cobre a home, os guias, as aulas, as trilhas e os posts com endereços e imagens únicos', () => {
    const paths = pages.map((page) => page.path);
    expect(new Set(paths).size).toBe(paths.length);
    expect(new Set(pages.map((page) => page.image)).size).toBe(pages.length);
    expect(paths).toEqual(
      expect.arrayContaining([
        '/',
        '/guias',
        ...guides.map((guide) => `/guide/${guide.id}`),
        '/aulas',
        ...courses.map((course) => `/aulas/${course.id}`),
        ...lessons.map((lesson) => `/aula/${lesson.id}`),
        ...catalogs.map((catalog) => `/roadmap/${catalog.id}`),
        ...posts.map((post: { url: string }) => `/blog/${post.url}`),
      ]),
    );
    for (const page of pages) {
      expect(page.description.length).toBeGreaterThan(40);
      expect(page.description.length).toBeLessThanOrEqual(240);
      expect(page.description).not.toMatch(/`|\*\*/);
    }
  });

  it('encontra a página pelo endereço, com barra final, busca ou a visão horizontal', () => {
    expect(pageForPath(pages, '/guide/bigO/')?.title).toBe('Notação Big O');
    expect(pageForPath(pages, '/guias?tema=apis')?.path).toBe('/guias');
    expect(pageForPath(pages, '/hroadmap/frontend')?.path).toBe('/roadmap/frontend');
    expect(pageForPath(pages, '/')?.path).toBe('/');
    expect(pageForPath(pages, '/profile')).toBeUndefined();
  });

  it('troca as tags genéricas por tags únicas e absolutas da página', () => {
    const page = pageForPath(pages, '/guide/sessionsTokens');
    if (!page) throw new Error('Guia ausente');
    const html = applySocialMeta(indexHTML, page);

    expect(html.match(/<title>/g)).toHaveLength(1);
    expect(html).toContain('<title>Sessões, JWT e OAuth 2.0 · Guias · Trilha Info</title>');
    expect(html.match(/rel="canonical"/g)).toHaveLength(1);
    expect(tagValues(html, 'name', 'description')).toHaveLength(1);
    expect(tagValues(html, 'property', 'og:title')).toEqual(['Sessões, JWT e OAuth 2.0']);
    expect(tagValues(html, 'property', 'og:url')).toEqual([`${siteUrl}/guide/sessionsTokens`]);
    expect(tagValues(html, 'property', 'og:image')).toEqual([
      `${siteUrl}/og/guide-sessionsTokens.png`,
    ]);
    expect(tagValues(html, 'property', 'og:type')).toEqual(['article']);
    expect(tagValues(html, 'name', 'twitter:card')).toEqual(['summary_large_image']);
    expect(tagValues(html, 'name', 'twitter:data1')).toEqual(['10 min']);
    expect(html.indexOf('og:title')).toBeLessThan(html.indexOf('<script'));
  });

  it('escapa aspas e sinais no conteúdo das tags', () => {
    const html = applySocialMeta(indexHTML, {
      ...pages[0],
      title: 'Use "async" & <defer>',
    });
    expect(tagValues(html, 'property', 'og:title')).toEqual([
      'Use &quot;async&quot; &amp; &lt;defer&gt;',
    ]);
  });

  it('desenha o cartão de prévia em PNG 1200×630', async () => {
    const page = pageForPath(pages, '/roadmap/frontend');
    if (!page) throw new Error('Trilha ausente');
    const png = await renderCard(page.card, root);
    expect(png.subarray(1, 4).toString()).toBe('PNG');
    expect(png.readUInt32BE(16)).toBe(1200);
    expect(png.readUInt32BE(20)).toBe(630);
    expect(png.length).toBeLessThan(300 * 1024);
  }, 30000);
});
