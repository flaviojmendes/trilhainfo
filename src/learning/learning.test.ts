import { createCatalog, projectBranch, validateCatalog } from './catalog';
import { exportStudyContext, generateStudyPlan, validateStudyPlan } from './agents';
import {
  initialPreferences,
  migrateLegacyProgress,
  progressSummary,
  restorePreferences,
} from './progress';
import { roadmaps } from '../roadmaps/roadmaps';
import { roadmapGuides } from '../roadmaps/guides';
import { Level, LinkContentType, LinkType } from '../entity/RoadmapModel';
import { enrichAppHTML, roadmapMarkdown, staticCatalogHTML } from '../../scripts/roadmapArtifacts';

export const fixture: Level[] = [
  {
    id: 'stage.base',
    label: 'Base',
    items: [
      {
        id: 'topic.html',
        label: 'HTML',
        description: 'Estruture uma página acessível.',
        children: [
          {
            id: 'html.basics',
            label: 'O básico',
            links: [
              {
                id: 'resource.html',
                label: 'Referência de HTML',
                url: 'https://example.com/html',
                contentType: LinkContentType.READ,
                type: LinkType.FREE,
              },
            ],
          },
          {
            id: 'html.practice',
            label: 'Pratique e confira',
            description: 'Publique uma página com títulos e labels.',
            links: [],
          },
        ],
      },
    ],
  },
  {
    id: 'stage.optional',
    label: 'Mais tarde',
    optional: true,
    items: [
      {
        id: 'topic.optional',
        label: 'Tema opcional',
        children: [{ id: 'optional.basics', label: 'Explore', links: [] }],
      },
    ],
  },
];

function sample() {
  return createCatalog('sample', 'Exemplo', fixture);
}

describe('Catálogo canônico e projeções', () => {
  it.each(Object.keys(roadmaps))(
    'valida a trilha %s e mantém objetivos essenciais em todos os modos',
    (id) => {
      const roadmap = roadmaps[id as keyof typeof roadmaps];
      const catalog = createCatalog(
        id,
        roadmap.title,
        roadmap.file,
        roadmapGuides[id as keyof typeof roadmapGuides],
      );
      expect(() => validateCatalog(catalog)).not.toThrow();
      for (const group of Object.values(catalog.groups))
        for (const depth of ['simple', 'standard', 'deep'] as const) {
          const nodes = projectBranch(catalog, group.id, depth);
          const ids = nodes.map((node) => node.id);
          expect(new Set(ids).size).toBe(ids.length);
          group.requiredIds.forEach((id) => expect(ids).toContain(id));
          nodes.forEach((node, index) =>
            node.requires.forEach((id) => expect(ids.indexOf(id)).toBeLessThan(index)),
          );
        }
    },
  );

  it('preserva a identidade após renomear e mover um assunto', () => {
    const previous = sample();
    const moved = [
      {
        ...fixture[0],
        id: 'stage.new',
        label: 'Nova etapa',
        items: [{ ...fixture[0].items[0], label: 'Estrutura da página' }],
      },
    ];
    const next = createCatalog('sample', 'Exemplo', moved);
    expect(next.groups['topic.html'].id).toBe(previous.groups['topic.html'].id);
    expect(next.nodes['html.practice'].id).toBe(previous.nodes['html.practice'].id);
    expect(next.version).not.toBe(previous.version);
    expect(
      restorePreferences(next, {
        ...initialPreferences(previous),
        completedNodeIds: ['html.practice'],
      }).completedNodeIds,
    ).toContain('html.practice');
  });

  it('rejeita ciclos, IDs repetidos e referências inexistentes', () => {
    const catalog = sample();
    catalog.nodes['html.basics'].requires = ['html.practice'];
    expect(() => validateCatalog(catalog)).toThrow(/Ciclo/);
    catalog.nodes['html.basics'].requires = ['absent'];
    expect(() => validateCatalog(catalog)).toThrow(/inexistente/);
    expect(() => createCatalog('sample', 'Exemplo', [fixture[0], fixture[0]])).toThrow(/duplicado/);
  });
});

describe('Migração e significado do progresso', () => {
  it('migra a conclusão vertical e conserva práticas e aprofundamentos novos pendentes', () => {
    const before = [
      {
        label: 'Base',
        children: [
          {
            label: 'Base-HTML',
            children: [
              {
                label: 'HTML-O básico',
                read: true,
                children: [{ label: 'HTML-O básico-Referência de HTML', read: true }],
              },
            ],
          },
        ],
      },
    ];
    const snapshot = JSON.stringify(before);
    const prefs = migrateLegacyProgress(sample(), before, undefined);
    expect(prefs.completedNodeIds).toEqual(['html.basics']);
    expect(prefs.studiedResourceIds).toEqual(['resource.html']);
    expect(prefs.completedNodeIds).not.toContain('html.practice');
    expect(JSON.stringify(before)).toBe(snapshot);
  });

  it('mantém referências novas pendentes mesmo quando a seção antiga estava concluída', () => {
    const revised = JSON.parse(JSON.stringify(fixture)) as Level[];
    revised[0].items[0].children?.[0].links?.push({
      id: 'resource.new',
      label: 'Novo material',
      url: 'https://example.com/new',
      contentType: LinkContentType.READ,
    });
    const catalog = createCatalog('sample', 'Exemplo', revised);
    const old = [
      {
        label: 'HTML-O básico',
        read: true,
        children: [{ label: 'HTML-O básico-Referência de HTML', read: true }],
      },
    ];
    const prefs = migrateLegacyProgress(catalog, old, undefined);
    expect(prefs.completedNodeIds).toContain('html.basics');
    expect(prefs.studiedResourceIds).toEqual(['resource.html']);
    expect(prefs.studiedResourceIds).not.toContain('resource.new');
  });

  it('migra o mapa horizontal e recursos parciais do formato histórico', () => {
    const partial = [
      {
        label: 'Base',
        children: [
          {
            label: 'Base-HTML',
            children: [
              {
                label: 'HTML-O básico',
                read: false,
                children: [{ label: 'O básico-Referência de HTML', read: true }],
              },
            ],
          },
        ],
      },
    ];
    const prefs = migrateLegacyProgress(sample(), partial, { 'Pratique e confira-HTML': true });
    expect(prefs.completedNodeIds).toEqual(['html.practice']);
    expect(prefs.studiedResourceIds).toContain('resource.html');
    expect(
      migrateLegacyProgress(sample(), [null, 4, { label: 'HTML', children: [null] }], null)
        .completedNodeIds,
    ).toEqual([]);
  });

  it('mantém o denominador ao simplificar e separa estudo de recursos de conclusão', () => {
    const catalog = sample();
    const prefs = { ...initialPreferences(catalog), studiedResourceIds: ['resource.html'] };
    expect(progressSummary(catalog, prefs)).toEqual({ done: 0, total: 2, percent: 0 });
    expect(
      progressSummary(catalog, { ...prefs, depthByGroup: { 'topic.html': 'simple' } }),
    ).toEqual(progressSummary(catalog, prefs));
  });

  it('restaura preferências válidas e conserva IDs históricos', () => {
    const prefs = restorePreferences(sample(), {
      ...initialPreferences(sample()),
      weeklyMinutes: -50,
      depthByGroup: { 'topic.html': 'deep', absent: 'deep' },
      completedNodeIds: ['retired.node', 'retired.node'],
    });
    expect(prefs.weeklyMinutes).toBe(30);
    expect(prefs.depthByGroup).toEqual({ 'topic.html': 'deep' });
    expect(prefs.completedNodeIds).toEqual(['retired.node']);
  });
});

describe('Planos e contrato para agentes', () => {
  it.each(Object.keys(roadmaps))(
    'gera um plano válido para %s com orçamento de 30 minutos',
    (id) => {
      const roadmap = roadmaps[id as keyof typeof roadmaps];
      const catalog = createCatalog(id, roadmap.title, roadmap.file);
      const prefs = { ...initialPreferences(catalog), weeklyMinutes: 30 };
      const plan = generateStudyPlan(catalog, prefs);
      expect(validateStudyPlan(plan, catalog, prefs)).toEqual(plan);
      plan.weeks.forEach((week) =>
        expect(
          week.steps.reduce((sum, step) => sum + step.estimatedMinutes, 0),
        ).toBeLessThanOrEqual(30),
      );
    },
  );

  it('usa profundidade e conhecimento sem alterar progresso ou catálogo', () => {
    const catalog = sample();
    const prefs = initialPreferences(catalog);
    const standard = generateStudyPlan(catalog, prefs);
    const deep = generateStudyPlan(catalog, { ...prefs, depthByGroup: { 'topic.html': 'deep' } });
    expect(
      deep.weeks
        .flatMap((week) => week.steps)
        .some((step) => step.nodeId === 'topic.html.deepening'),
    ).toBe(true);
    expect(
      standard.weeks
        .flatMap((week) => week.steps)
        .some((step) => step.nodeId === 'topic.html.deepening'),
    ).toBe(false);
    const demonstrated = generateStudyPlan(catalog, {
      ...prefs,
      knowledgeByGroup: { 'topic.html': 'demonstrated' },
    });
    expect(demonstrated.weeks).toHaveLength(0);
    expect(prefs.completedNodeIds).toEqual([]);
  });

  it('rejeita versões divergentes, referências inventadas, pré-requisitos ausentes e orçamento excedido', () => {
    const catalog = sample();
    const prefs = initialPreferences(catalog);
    const copy = () => JSON.parse(JSON.stringify(generateStudyPlan(catalog, prefs)));
    let plan = copy();
    plan.roadmapVersion = 'old';
    expect(() => validateStudyPlan(plan, catalog, prefs)).toThrow(/versão/);
    plan = copy();
    plan.weeks[0].steps[0].resourceIds = ['invented'];
    expect(() => validateStudyPlan(plan, catalog, prefs)).toThrow(/Referência/);
    plan = copy();
    plan.weeks[0].steps.reverse();
    expect(() => validateStudyPlan(plan, catalog, prefs)).toThrow(/pré-requisitos/);
    plan = copy();
    plan.weeks[0].steps[0].estimatedMinutes = 500;
    expect(() => validateStudyPlan(plan, catalog, prefs)).toThrow(/excedem/);
  });

  it('exporta o snapshot completo sem expor preferências nos artefatos públicos', () => {
    const catalog = sample();
    const prefs = { ...initialPreferences(catalog), goal: 'Meu objetivo privado' };
    const context = exportStudyContext(catalog, prefs);
    expect(context.catalogSnapshot.nodes['topic.html.deepening']).toBeDefined();
    expect(context.learner.goal).toBe(prefs.goal);
    expect(staticCatalogHTML(catalog)).not.toContain(prefs.goal);
    const markdown = roadmapMarkdown(catalog);
    Object.values(catalog.nodes).forEach((node) => expect(markdown).toContain(`ID: ${node.id}`));
    Object.values(catalog.resources).forEach((resource) =>
      expect(markdown).toContain(resource.url),
    );
  });

  it('gera HTML semântico e escapa texto editorial e JSON-LD', () => {
    const catalog = sample();
    catalog.title = '<script>alert(1)</script>';
    const html = staticCatalogHTML(catalog);
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(html).not.toContain('<script>alert(1)</script>');
    expect(html).toContain('application/ld+json');
    expect(html).toContain('\\u003cscript');
    const app = enrichAppHTML(
      '<html><head><title>Trilha Info</title></head><body><div id="root"></div></body></html>',
      catalog,
    );
    expect(app).toContain('application/json');
    expect(app).toContain('html.practice');
  });
});
