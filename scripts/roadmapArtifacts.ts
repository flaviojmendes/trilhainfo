import { RoadmapCatalog } from '../src/learning/types';
import { learningMetadata } from '../src/learning/metadata';

export const escapeHTML = (value: string): string =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char] || char),
  );
const jsonScript = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');

export function roadmapMarkdown(catalog: RoadmapCatalog): string {
  const lines = [
    `# Trilha de ${catalog.title}`,
    '',
    `ID: ${catalog.id}`,
    `Versão: ${catalog.version}`,
    'Versão do formato: 1',
    'Idioma: pt-BR',
    `Licença do catálogo: ${catalog.license}`,
    '',
    catalog.audience,
    '',
    `Objetivo: ${catalog.outcome}`,
    '',
  ];
  if (catalog.prerequisite)
    lines.push(
      `Entrada recomendada: [${catalog.prerequisite.label}](https://trilha.info${catalog.prerequisite.path})`,
      '',
    );
  for (const stage of catalog.stages) {
    lines.push(
      `## ${stage.title}${stage.optional ? ' (opcional)' : ''}`,
      '',
      `ID da etapa: ${stage.id}`,
      '',
      stage.description,
      '',
    );
    for (const id of stage.groupIds) {
      const group = catalog.groups[id];
      lines.push(
        `### ${group.title}`,
        '',
        `ID do grupo: ${id}`,
        '',
        group.description,
        '',
        `Objetivos essenciais: ${group.requiredIds.join(', ')}`,
        '',
        ...(['simple', 'standard', 'deep'] as const).map(
          (depth) => `Modo ${depth}: ${group.variants[depth].stepIds.join(', ')}`,
        ),
        '',
      );
      if (group.href) lines.push(`Trilha relacionada: https://trilha.info${group.href}`, '');
      for (const nodeId of group.variants.deep.stepIds) {
        const node = catalog.nodes[nodeId];
        lines.push(
          `#### ${node.title}`,
          '',
          `ID: ${node.id}`,
          `Tipo: ${node.kind}`,
          `Pré-requisitos: ${node.requires.length ? node.requires.join(', ') : 'nenhum'}`,
          '',
          node.description,
          '',
        );
        if (node.prompt) lines.push('Prompt de estudo:', '', '```text', node.prompt, '```', '');
        lines.push(
          'Referências:',
          '',
          ...node.resourceIds.map((id) => {
            const resource = catalog.resources[id];
            return `- [${resource.title}](${resource.url}) | ID: ${id} | Idioma: ${
              resource.language || 'não informado'
            } | Gratuito: ${
              resource.free === null ? 'não informado' : resource.free ? 'sim' : 'não'
            } | Duração: ${
              resource.estimatedMinutes === null
                ? 'não estimada'
                : `${resource.estimatedMinutes} min`
            }`;
          }),
          '',
        );
      }
    }
  }
  return lines.join('\n');
}

export const staticStyles = `.catalog-fallback{font:16px/1.7 system-ui,sans-serif;color:#fdfdfd;background:#171316;min-height:100vh;padding:24px}.catalog-fallback .reading{max-width:76ch;margin:auto}.catalog-fallback a{color:#ff83c5;text-decoration:underline;text-underline-offset:4px;overflow-wrap:anywhere}.catalog-fallback h1{font-size:2.5rem;line-height:1.2}.catalog-fallback h2{margin-top:56px;padding-top:16px;border-top:1px solid #4e3d47}.catalog-fallback h3{margin-top:32px}.catalog-fallback h4{margin-top:24px}.catalog-fallback p{white-space:pre-line}.catalog-fallback :target{scroll-margin-top:24px}.catalog-fallback :focus-visible{outline:2px solid #ff83c5;outline-offset:4px}.catalog-fallback nav{display:flex;gap:16px;flex-wrap:wrap}.catalog-fallback pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#241c22;padding:16px}.catalog-fallback li{margin-block:10px}@media(max-width:480px){.catalog-fallback{padding:16px}.catalog-fallback h1{font-size:2rem}}`;

export function staticCatalogBody(catalog: RoadmapCatalog): string {
  const e = escapeHTML;
  return `<main class="catalog-fallback" lang="pt-BR"><div class="reading">
    <nav aria-label="Navegação"><a href="/">Trilha Info</a><a href="/roadmap/${
      catalog.id
    }">Abrir versão interativa</a><a href="/data/${
    catalog.id
  }.json">Baixar JSON</a><a href="/data/${catalog.id}.md">Ler Markdown</a></nav>
    <h1>Trilha de ${e(catalog.title)}</h1><p>${e(
    catalog.audience,
  )}</p><p><strong>Objetivo:</strong> ${e(catalog.outcome)}</p>
    <p>Catálogo ${e(catalog.version)} · Conteúdo completo, incluindo aprofundamentos opcionais.</p>
    ${
      catalog.prerequisite
        ? `<p><a href="${e(catalog.prerequisite.path)}">${e(catalog.prerequisite.label)}</a></p>`
        : ''
    }
    <nav aria-label="Etapas">${catalog.stages
      .map((stage) => `<a href="#${e(stage.id)}">${e(stage.title)}</a>`)
      .join('')}</nav>
    ${catalog.stages
      .map(
        (stage) =>
          `<section aria-labelledby="${e(stage.id)}"><h2 id="${e(stage.id)}">${e(stage.title)}${
            stage.optional ? ' (opcional)' : ''
          }</h2><p>${e(stage.description)}</p>${stage.groupIds
            .map((id) => {
              const group = catalog.groups[id];
              return `<article aria-labelledby="${e(id)}"><h3 id="${e(id)}">${e(
                group.title,
              )}</h3><p>${e(group.description)}</p>${
                group.href ? `<p><a href="${e(group.href)}">Abrir ${e(group.title)}</a></p>` : ''
              }<ol>${group.variants.deep.stepIds
                .map((nodeId) => {
                  const node = catalog.nodes[nodeId];
                  return `<li><h4 id="${e(node.id)}">${e(node.title)}</h4><p>${e(
                    node.description,
                  )}</p>${
                    node.requires.length
                      ? `<p>Pré-requisitos: ${node.requires
                          .map((id) => `<a href="#${e(id)}">${e(catalog.nodes[id].title)}</a>`)
                          .join(', ')}</p>`
                      : ''
                  }${
                    node.prompt
                      ? `<details><summary>Prompt para estudar ${e(group.title)}</summary><pre>${e(
                          node.prompt,
                        )}</pre></details>`
                      : ''
                  }<ul>${node.resourceIds
                    .map((id) => {
                      const resource = catalog.resources[id];
                      return `<li><a href="${e(resource.url)}">${e(resource.title)}</a> <span>(${e(
                        resource.language || 'idioma não informado',
                      )})</span></li>`;
                    })
                    .join('')}</ul></li>`;
                })
                .join('')}</ol></article>`;
            })
            .join('')}</section>`,
      )
      .join('')}
    <footer><p>Licença ${e(
      catalog.license,
    )} do catálogo. As referências externas têm suas próprias condições de uso.</p></footer>
  </div></main>`;
}

export function metadataHead(catalog: RoadmapCatalog): string {
  return `<link data-trilha-meta rel="canonical" href="https://trilha.info/roadmap/${catalog.id}">
  <link data-trilha-meta rel="alternate" type="application/json" href="/data/${
    catalog.id
  }.json" title="Dados da trilha">
  <link data-trilha-meta rel="alternate" type="text/markdown" href="/data/${
    catalog.id
  }.md" title="Trilha em Markdown">
  <link data-trilha-meta rel="alternate" type="text/html" href="/read/${
    catalog.id
  }/" title="Leitura sem JavaScript">
  <script data-trilha-meta type="application/ld+json">${jsonScript(
    learningMetadata(catalog),
  )}</script>
  <style>${staticStyles}</style>`;
}

export function staticCatalogHTML(catalog: RoadmapCatalog): string {
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Trilha de ${escapeHTML(
    catalog.title,
  )} | Trilha Info</title><meta name="description" content="${escapeHTML(
    catalog.outcome,
  )}">${metadataHead(catalog)}</head><body style="margin:0">${staticCatalogBody(
    catalog,
  )}</body></html>`;
}

export function enrichAppHTML(html: string, catalog: RoadmapCatalog): string {
  return html
    .replace(
      /<title>[\s\S]*?<\/title>/,
      `<title>Trilha de ${escapeHTML(catalog.title)} | Trilha Info</title>`,
    )
    .replace(
      /<meta\s+(?:name|property)="description"\s+content="[^"]*"\s*\/?\s*>/,
      `<meta name="description" content="${escapeHTML(catalog.outcome)}">`,
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*/,
      `$1Trilha de ${escapeHTML(catalog.title)} | Trilha Info`,
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*/,
      `$1${escapeHTML(catalog.outcome)}`,
    )
    .replace('</head>', `${metadataHead(catalog)}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${staticCatalogBody(catalog)}</div>`);
}
