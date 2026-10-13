import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Plugin } from 'vite';
import { roadmapCatalogs } from './catalogPlugin';
import { applySocialMeta, BlogPost, pageForPath, renderCard, SocialPage, socialPages } from './socialPreview';

// Link unfurlers (Slack, WhatsApp, LinkedIn, X) do not run JavaScript, so every shareable
// route needs its own HTML file with page-specific tags and an absolute preview image.
export function socialPlugin(): Plugin {
  let root = process.cwd();
  const pages = (): SocialPage[] => {
    const posts: BlogPost[] = JSON.parse(
      readFileSync(resolve(root, 'public/posts/posts.json'), 'utf8'),
    );
    return socialPages(roadmapCatalogs(), posts);
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
    transformIndexHtml(html, context) {
      const page = pageForPath(pages(), context.originalUrl || context.path);
      return page ? applySocialMeta(html, page) : html;
    },
    async generateBundle(_, bundle) {
      const index = bundle['index.html'];
      if (index?.type !== 'asset') return;
      const appHTML = String(index.source);
      const all = pages();
      for (const page of all) {
        const files = [htmlFile(page.path)];
        if (page.path.startsWith('/roadmap/')) files.push(htmlFile(page.path.replace('/roadmap/', '/hroadmap/')));
        for (const fileName of files) {
          const existing = bundle[fileName];
          if (existing?.type === 'asset') existing.source = applySocialMeta(String(existing.source), page);
          else this.emitFile({ type: 'asset', fileName, source: applySocialMeta(appHTML, page) });
        }
      }
      const cards = await Promise.all(all.map((page) => renderCard(page.card, root)));
      all.forEach((page, index) =>
        this.emitFile({ type: 'asset', fileName: page.image.slice(1), source: cards[index] }),
      );
    },
  };
}
