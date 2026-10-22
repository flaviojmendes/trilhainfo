import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Plugin } from 'vite';
import { roadmapCatalogs } from './catalogPlugin';
import {
  applySocialMeta,
  BlogPost,
  pageForPath,
  renderCard,
  SocialPage,
  socialPages,
} from './socialPreview';
import {
  applyStaticContent,
  noindexHTML,
  robotsTXT,
  sitemapXML,
  staticPageBody,
} from './searchArtifacts';
import { applyStructuredData } from '../src/seo/structuredData';
import { isPersonalPath } from '../src/seo/routePolicy';

// Link unfurlers (Slack, WhatsApp, LinkedIn, X) do not run JavaScript, so every shareable
// route needs its own HTML file with page-specific tags and an absolute preview image.
export function socialPlugin(): Plugin {
  let root = process.cwd();
  const posts = (): BlogPost[] =>
    JSON.parse(readFileSync(resolve(root, 'public/posts/posts.json'), 'utf8'));
  const pages = (): SocialPage[] => {
    return socialPages(roadmapCatalogs(), posts());
  };
  const htmlFile = (path: string) => (path === '/' ? 'index.html' : `${path.slice(1)}/index.html`);

  return {
    name: 'trilha-social-preview',
    enforce: 'post',
    configResolved(config) {
      root = config.root;
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = (req.url || '').split('?')[0];
        if (pathname === '/robots.txt' || pathname === '/sitemap.xml') {
          res.setHeader(
            'Content-Type',
            pathname === '/robots.txt'
              ? 'text/plain; charset=utf-8'
              : 'application/xml; charset=utf-8',
          );
          res.end(
            req.method === 'HEAD'
              ? undefined
              : pathname === '/robots.txt'
              ? robotsTXT
              : sitemapXML(pages()),
          );
          return;
        }
        const image = /^\/og\/([\w-]+)\.png$/.exec((req.url || '').split('?')[0])?.[1];
        const page = image && pages().find((page) => page.image === `/og/${image}.png`);
        if (!page) return next();
        renderCard(page.card, root)
          .then((png) => {
            res.setHeader('Content-Type', 'image/png');
            res.end(png);
          })
          .catch(next);
      });
    },
    async transformIndexHtml(html, context) {
      const path = context.originalUrl || (context.path === '/index.html' ? '/' : context.path);
      const page = pageForPath(pages(), path);
      if (!page)
        return noindexHTML(
          html,
          isPersonalPath(path)
            ? 'Seu espaço de estudo · Trilha Info'
            : 'Página não encontrada · Trilha Info',
        );
      const metadata = applySocialMeta(html, page);
      return page.path.startsWith('/roadmap/')
        ? applyStructuredData(metadata, page)
        : applyStaticContent(
            metadata,
            await staticPageBody(page, roadmapCatalogs(), posts(), root),
            page,
          );
    },
    async generateBundle(_, bundle) {
      const index = bundle['index.html'];
      if (index?.type !== 'asset') return;
      const appHTML = String(index.source);
      const all = pages();
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsTXT });
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXML(all) });
      this.emitFile({
        type: 'asset',
        fileName: 'private.html',
        source: noindexHTML(appHTML, 'Seu espaço de estudo · Trilha Info'),
      });
      this.emitFile({
        type: 'asset',
        fileName: '404.html',
        source: noindexHTML(appHTML, 'Página não encontrada · Trilha Info'),
      });
      const catalogs = roadmapCatalogs();
      for (const page of all) {
        const body = page.path.startsWith('/roadmap/')
          ? undefined
          : await staticPageBody(page, catalogs, posts(), root);
        const files = [htmlFile(page.path)];
        if (page.path.startsWith('/roadmap/'))
          files.push(htmlFile(page.path.replace('/roadmap/', '/hroadmap/')));
        for (const fileName of files) {
          const existing = bundle[fileName];
          const metadata = applySocialMeta(
            existing?.type === 'asset' ? String(existing.source) : appHTML,
            page,
          );
          const source =
            body === undefined
              ? applyStructuredData(metadata, page)
              : applyStaticContent(metadata, body, page);
          if (existing?.type === 'asset') existing.source = source;
          else this.emitFile({ type: 'asset', fileName, source });
        }
      }
      const cards = await Promise.all(all.map((page) => renderCard(page.card, root)));
      all.forEach((page, index) =>
        this.emitFile({ type: 'asset', fileName: page.image.slice(1), source: cards[index] }),
      );
    },
  };
}
