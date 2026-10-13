import { Level, RoadmapItem } from '../entity/RoadmapModel';
import { withAILearning } from '../roadmaps/aiLearning';
import { project } from '../roadmaps/curriculum';
import { data as frontend } from '../roadmaps/frontend';
import { roadmapMarkdown, staticCatalogHTML } from '../../scripts/roadmapArtifacts';
import { createCatalog } from './catalog';
import {
  initialPreferences,
  migrateLegacyProgress,
  progressSummary,
  restorePreferences,
} from './progress';

function withoutEditorialMetadata(levels: Level[]): Level[] {
  const copy = JSON.parse(JSON.stringify(levels)) as Level[];
  const strip = (item: RoadmapItem): void => {
    delete item.ai;
    item.children?.forEach(strip);
  };
  copy.forEach((level) => {
    delete level.kind;
    level.items.forEach(strip);
  });
  return copy;
}

describe('Classificação editorial do percurso', () => {
  it('identifica projetos renomeados pelos metadados e mantém o fallback de projetos antigos', () => {
    const milestone = project(
      'Página',
      'Publique uma página.',
      'Funciona pelo teclado.',
      [],
      'demo.page',
    );
    const renamed = { ...milestone, label: 'Minha primeira entrega' };
    const modern = withAILearning([renamed], 'frontend');
    expect(modern.find((level) => level.id === milestone.id)?.items[0].ai).toBe('assisted');
    expect(modern.some((level) => level.id === 'aiLearning.ia-prompting-e-contexto')).toBe(true);

    const legacy = { ...milestone };
    delete legacy.kind;
    expect(
      withAILearning([legacy], 'frontend').find((level) => level.id === legacy.id)?.items[0].ai,
    ).toBe('assisted');
    const explicitStudy: Level = { ...legacy, kind: 'study' };
    expect(withAILearning([explicitStudy], 'frontend')[0].items[0].ai).toBeUndefined();
  });

  it('expõe os marcos de IA e distingue a prática assistida dos critérios gerais do projeto', () => {
    const catalog = createCatalog('frontend', 'Frontend', frontend);
    const aiStages = catalog.stages.filter((stage) => stage.kind === 'ai');
    expect(aiStages.map((stage) => stage.id)).toEqual([
      'aiLearning.ia-prompting-e-contexto',
      'aiLearning.ia-programacao-em-parceria',
      'aiLearning.ia-agentes-regras-e-verificacao',
    ]);
    for (const stage of aiStages)
      for (const id of stage.groupIds) {
        expect(catalog.groups[id].ai).toBe('focused');
        expect(catalog.nodes[catalog.groups[id].requiredIds[0]].ai).toBe('focused');
      }
    expect(catalog.groups['aiLearning.seu-assistente-de-estudos'].ai).toBe('focused');
    expect(catalog.groups['curriculum.ia-no-fluxo-de-trabalho'].ai).toBe('focused');
    for (const stage of catalog.stages.filter((stage) => stage.kind === 'project'))
      for (const id of stage.groupIds) {
        expect(catalog.groups[id].ai).toBe('assisted');
        expect(catalog.nodes[`${id}.ai-practice`].ai).toBe('assisted');
        expect(catalog.nodes[`${id}.verification`].ai).toBe('assisted');
        expect(catalog.nodes[`${id}.criteria`].ai).toBeUndefined();
        expect(catalog.nodes[`${id}.deepening`].ai).toBeUndefined();
      }
  });

  it('mantém IA independente da obrigatoriedade, sem inferir classificação do título ou prompt', () => {
    const levels: Level[] = [
      {
        id: 'demo.required',
        label: 'Base',
        items: [
          { id: 'demo.core', label: 'Conceito com IA no título', prompt: 'Explique.', links: [] },
        ],
      },
      {
        id: 'demo.optional',
        label: 'Mais tarde',
        optional: true,
        kind: 'ai',
        items: [{ id: 'demo.ai', label: 'Explore', ai: 'focused', links: [] }],
      },
    ];
    const catalog = createCatalog('demo', 'Demonstração', levels);
    expect(catalog.stages[0].kind).toBe('study');
    expect(catalog.groups['demo.core'].ai).toBeUndefined();
    expect(catalog.nodes['demo.core.overview'].ai).toBeUndefined();
    expect(catalog.stages[1]).toMatchObject({ optional: true, kind: 'ai' });
    expect(catalog.nodes['demo.ai.overview'].ai).toBe('focused');
    expect(
      progressSummary(catalog, {
        ...initialPreferences(catalog),
        completedNodeIds: catalog.groups['demo.ai'].requiredIds,
      }),
    ).toEqual({ done: 0, total: 1, percent: 0 });
  });

  it('conserva os IDs, requisitos e progresso legado após acrescentar a classificação', () => {
    const original = createCatalog('frontend', 'Frontend', withoutEditorialMetadata(frontend));
    const classified = createCatalog('frontend', 'Frontend', frontend);
    expect(Object.keys(classified.groups)).toEqual(Object.keys(original.groups));
    expect(Object.keys(classified.nodes)).toEqual(Object.keys(original.nodes));
    for (const group of Object.values(classified.groups))
      expect(group.requiredIds).toEqual(original.groups[group.id].requiredIds);
    for (const node of Object.values(classified.nodes))
      expect(node.requires).toEqual(original.nodes[node.id].requires);
    expect(classified.version).not.toBe(original.version);
    const completed = {
      ...initialPreferences(original),
      completedNodeIds: ['curriculum.html.basics', 'curriculum.html.practice'],
    };
    expect(progressSummary(classified, restorePreferences(classified, completed))).toEqual(
      progressSummary(original, completed),
    );
    const legacy = { 'O básico-HTML': true, 'Pratique e confira-HTML': true };
    expect(migrateLegacyProgress(classified, undefined, legacy).completedNodeIds).toEqual(
      migrateLegacyProgress(original, undefined, legacy).completedNodeIds,
    );
  });

  it('preserva as distinções do percurso nos formatos de leitura sem JavaScript', () => {
    const catalog = createCatalog('frontend', 'Frontend', frontend);
    const markdown = roadmapMarkdown(catalog);
    expect(markdown).toContain('Percurso: Obrigatório · Projeto: entrega prática');
    expect(markdown).toContain('Percurso: Obrigatório · Desenvolvimento com IA');
    expect(markdown).toContain('Percurso: Opcional · Fundamentos e prática');
    expect(markdown).toContain('Percurso: Obrigatório · IA aplicada');
    const document = new DOMParser().parseFromString(staticCatalogHTML(catalog), 'text/html');
    expect(
      document.getElementById('frontend.pagina-responsiva.stage')?.nextElementSibling?.textContent,
    ).toBe('Obrigatório · Projeto: entrega prática');
    expect(
      document.getElementById('frontend.pagina-responsiva.ai-practice')?.nextElementSibling
        ?.textContent,
    ).toBe('Obrigatório · IA aplicada');
    expect(
      document.getElementById('frontend.pagina-responsiva.criteria')?.nextElementSibling
        ?.textContent,
    ).toBe('Obrigatório');
    expect(
      document.getElementById('frontend.aprofundamento-opcional')?.nextElementSibling?.textContent,
    ).toContain('Opcional');
  });
});
