import { Plugin } from 'vite';
import { roadmaps } from '../src/roadmaps/roadmaps';
import { roadmapGuides } from '../src/roadmaps/guides';
import { readContributions } from './contributions';
import { createCatalog } from '../src/learning/catalog';
import { roadmapSchema, studyContextSchema, studyPlanSchema } from '../src/learning/schema';
import { enrichAppHTML, roadmapMarkdown, staticCatalogHTML } from './roadmapArtifacts';

export function roadmapCatalogs() {
  const contributions = readContributions();
  return Object.entries(roadmaps).map(([id, roadmap]) =>
    createCatalog(
      id,
      roadmap.title,
      roadmap.file,
      roadmapGuides[id as keyof typeof roadmapGuides],
      contributions,
    ),
  );
}

export function catalogPlugin(): Plugin {
  const catalogs = roadmapCatalogs;
  function artifacts() {
    const all = catalogs();
    const files = new Map<string, { type: string; body: string }>();
    const putJSON = (path: string, value: unknown) =>
      files.set(path, {
        type: 'application/json; charset=utf-8',
        body: JSON.stringify(value, null, 2),
      });
    putJSON('data/index.json', {
      schemaVersion: 1,
      roadmaps: all.map((catalog) => ({
        id: catalog.id,
        title: catalog.title,
        version: catalog.version,
        json: `/data/${catalog.id}.json`,
        markdown: `/data/${catalog.id}.md`,
        html: `/read/${catalog.id}/`,
      })),
    });
    putJSON('schemas/roadmap.v1.schema.json', roadmapSchema);
    putJSON('schemas/study-context.v1.schema.json', studyContextSchema);
    putJSON('schemas/study-plan.v1.schema.json', studyPlanSchema);
    all.forEach((catalog) => {
      putJSON(`data/${catalog.id}.json`, catalog);
      files.set(`data/${catalog.id}.md`, {
        type: 'text/markdown; charset=utf-8',
        body: roadmapMarkdown(catalog),
      });
      files.set(`read/${catalog.id}/index.html`, {
        type: 'text/html; charset=utf-8',
        body: staticCatalogHTML(catalog),
      });
    });
    files.set('llms.txt', {
      type: 'text/plain; charset=utf-8',
      body: `# Trilha Info\n\n> Trilhas abertas de tecnologia, com referências gratuitas e práticas verificáveis.\n\n## Trilhas completas\n${all
        .map((c) => `- [${c.title}](https://trilha.info/data/${c.id}.md): versão ${c.version}`)
        .join(
          '\n',
        )}\n\n## Aulas e guias\n- [Aulas interativas](https://trilha.info/aulas): cursos e aulas gratuitas em português.\n- [Guias rápidos](https://trilha.info/guias): explicações, exemplos e fontes para consultar.\n- [Blog](https://trilha.info/blog): publicações sobre tecnologia e carreira.\n- [Mapa do site](https://trilha.info/sitemap.xml): todas as páginas públicas canônicas.\n\n## Dados estruturados\n- [Índice JSON](https://trilha.info/data/index.json)\n- [Contrato do catálogo](https://trilha.info/schemas/roadmap.v1.schema.json)\n- [Contrato do contexto de estudo](https://trilha.info/schemas/study-context.v1.schema.json)\n- [Contrato de plano](https://trilha.info/schemas/study-plan.v1.schema.json)\n\nO progresso pessoal é exportado pelo estudante; não está nestes arquivos públicos. Durações desconhecidas são null. A licença MIT refere-se ao catálogo, não aos materiais externos.\n`,
    });
    return { all, files };
  }
  return {
    name: 'trilha-catalog',
    enforce: 'post',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = (req.url || '/').split('?')[0];
        if (!/^\/(data\/|schemas\/|read\/|llms\.txt$)/.test(pathname)) return next();
        const { files } = artifacts();
        const key = pathname.slice(1).replace(/\/$/, '/index.html');
        const file = files.get(key) || files.get(`${key}/index.html`);
        if (!file) {
          res.statusCode = 404;
          res.end('Arquivo não encontrado');
          return;
        }
        res.setHeader('Content-Type', file.type);
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.end(req.method === 'HEAD' ? undefined : file.body);
      });
    },
    transformIndexHtml(html, context) {
      const id = /^\/(?:roadmap|hroadmap)\/([^/]+)\/?$/.exec(
        context.originalUrl?.split('?')[0] || context.path,
      )?.[1];
      const catalog = id ? catalogs().find((catalog) => catalog.id === id) : undefined;
      return catalog ? enrichAppHTML(html, catalog) : html;
    },
    generateBundle(_, bundle) {
      const { all, files } = artifacts();
      files.forEach((file, fileName) =>
        this.emitFile({ type: 'asset', fileName, source: file.body }),
      );
      const index = bundle['index.html'];
      if (index?.type === 'asset')
        all.forEach((catalog) => {
          const source = enrichAppHTML(String(index.source), catalog);
          this.emitFile({ type: 'asset', fileName: `roadmap/${catalog.id}/index.html`, source });
          this.emitFile({ type: 'asset', fileName: `hroadmap/${catalog.id}/index.html`, source });
        });
    },
  };
}
