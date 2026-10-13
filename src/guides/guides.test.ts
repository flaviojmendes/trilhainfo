import { existsSync } from 'fs';
import { resolve } from 'path';
import { guideCategories, guideMatches, guides, guidesForTopic, relatedGuides } from '.';
import { GuideContent } from './types';
import { loadCatalog } from '../learning/loaders';
import { roadmapTitles } from '../roadmaps/titles';

const reservedIds = [
  'main-content',
  'guide-title',
  'guide-trails-label',
  'guide-sources-title',
  'guide-related-title',
];

async function loadAll(): Promise<Array<[string, GuideContent]>> {
  return Promise.all(
    guides.map(async (guide) => [guide.id, (await guide.load()).content] as [string, GuideContent]),
  );
}

describe('Guias rápidos', () => {
  it('mantém os endereços dos guias que já existiam', () => {
    const ids = guides.map((guide) => guide.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const legacy of [
      'bigO',
      'basicAuth',
      'onboarding',
      'sso',
      'star',
      'slaSloSli',
      'jsAsyncDefer',
    ])
      expect(ids).toContain(legacy);
  });

  it('liga cada guia a temas, trilhas e assuntos que existem', async () => {
    const categoryIds = guideCategories.map((category) => category.id);
    const catalogs = await Promise.all(Object.keys(roadmapTitles).map((id) => loadCatalog(id)));
    const groupIds = new Set(catalogs.flatMap((catalog) => Object.keys(catalog?.groups || {})));

    const problems: string[] = [];
    for (const guide of guides) {
      if (!categoryIds.includes(guide.category))
        problems.push(`${guide.id}: tema ${guide.category}`);
      for (const trail of guide.trails)
        if (!(trail in roadmapTitles)) problems.push(`${guide.id}: trilha ${trail}`);
      for (const topic of guide.topics)
        if (!groupIds.has(topic)) problems.push(`${guide.id}: assunto ${topic}`);
      if (guide.poster && !existsSync(resolve(__dirname, `../../public/guides/${guide.id}.jpg`)))
        problems.push(`${guide.id}: cartaz ausente`);
    }
    for (const category of categoryIds)
      if (!guides.some((guide) => guide.category === category))
        problems.push(`tema vazio: ${category}`);
    expect(problems).toEqual([]);
  });

  it('descreve seções e diagramas consistentes', async () => {
    const problems: string[] = [];
    for (const [id, content] of await loadAll()) {
      const sectionIds = content.sections.map((section) => section.id);
      if (!sectionIds.length) problems.push(`${id}: sem seções`);
      if (new Set(sectionIds).size !== sectionIds.length) problems.push(`${id}: seções repetidas`);
      for (const sectionId of sectionIds)
        if (!/^[a-z0-9-]+$/.test(sectionId) || reservedIds.includes(sectionId))
          problems.push(`${id}: id de seção ${sectionId}`);

      const blocks = content.sections.flatMap((section) => section.blocks);
      if (content.sections.some((section) => !section.blocks.length))
        problems.push(`${id}: seção vazia`);
      const checklists = blocks.flatMap((block) => (block.type === 'checklist' ? [block.id] : []));
      if (new Set(checklists).size !== checklists.length)
        problems.push(`${id}: checklists repetidos`);

      for (const block of blocks) {
        if (block.type === 'sequence')
          for (const message of block.messages)
            if (!block.actors[message.from] || !block.actors[message.to])
              problems.push(`${id}: mensagem fora dos atores (${message.label})`);
        if (block.type === 'scripts')
          for (const segment of block.variants.flatMap((variant) => [
            ...variant.html,
            ...variant.script,
          ]))
            if (segment.from < 0 || segment.to > 100 || segment.to <= segment.from)
              problems.push(`${id}: trecho ${segment.from}–${segment.to}`);
        if (block.type === 'table')
          for (const row of block.rows)
            if (row.length !== block.head.length)
              problems.push(`${id}: linha com colunas a mais ou a menos`);
      }

      for (const source of content.sources || [])
        if (!source.url.startsWith('https://')) problems.push(`${id}: fonte sem https`);
    }
    expect(problems).toEqual([]);
  });

  it('encontra guias por assunto da trilha e por busca sem acento', () => {
    expect(guidesForTopic('curriculum.internet-e-http').map((guide) => guide.id)).toEqual([
      'urlToPage',
      'httpApis',
    ]);
    const http = guides.find((guide) => guide.id === 'httpApis');
    expect(http && guideMatches(http, 'METODOS')).toBe(true);
    expect(http && guideMatches(http, 'docker')).toBe(false);
  });

  it('sugere guias relacionados sem repetir o atual', () => {
    const sso = guides.find((guide) => guide.id === 'sso');
    const related = sso ? relatedGuides(sso) : [];
    expect(related.map((guide) => guide.id)).not.toContain('sso');
    expect(related[0]?.category).toBe('apis');
  });
});
