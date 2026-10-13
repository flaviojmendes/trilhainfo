import { roadmaps } from '../roadmaps/roadmaps';
import { roadmapGuides } from '../roadmaps/guides';
import { createCatalog } from './catalog';
import { buildJourney, groupMatches, journeyProgress } from './journey';
import { initialPreferences, progressSummary } from './progress';

const catalogs = Object.entries(roadmaps).map(([id, roadmap]) =>
  createCatalog(id, roadmap.title, roadmap.file, roadmapGuides[id as keyof typeof roadmapGuides]),
);

function frontendCatalog() {
  const catalog = catalogs.find((catalog) => catalog.id === 'frontend');
  if (!catalog) throw new Error('Missing frontend fixture');
  return catalog;
}

it.each(catalogs.map((catalog) => [catalog.id, catalog] as const))(
  'mostra todo o percurso obrigatório de %s uma vez, na ordem editorial',
  (_, catalog) => {
    const expected = catalog.stages
      .filter((stage) => !stage.optional)
      .flatMap((stage) => stage.groupIds);
    const journey = buildJourney(catalog);
    const shown = journey.flatMap((phase) => phase.groupIds);
    expect(shown).toEqual(expected);
    expect(new Set(shown).size).toBe(shown.length);
    const prefs = initialPreferences(catalog);
    prefs.completedNodeIds = shown.flatMap((id) => catalog.groups[id].requiredIds);
    expect(journeyProgress(catalog, shown, prefs)).toEqual({
      done: progressSummary(catalog, prefs).total,
      total: progressSummary(catalog, prefs).total,
    });
  },
);

it('organiza Frontend nas três entregas sem transformar IA em um desvio opcional', () => {
  const catalog = frontendCatalog();
  const journey = buildJourney(catalog);
  expect(journey.map((phase) => phase.projectGroupIds)).toEqual([
    ['frontend.pagina-responsiva'],
    ['frontend.aplicacao-com-api'],
    ['frontend.produto-frontend'],
  ]);
  expect(journey[0].aiGroupIds).toContain('aiLearning.seu-assistente-de-estudos');
  expect(journey[2].aiGroupIds).toContain('aiLearning.validar-trabalho-gerado-por-ia');
  expect(journey[2].afterProjectGroupIds).toContain('curriculum.portfolio-e-candidatura');
  expect(journey[2].studyGroupIds).not.toContain('curriculum.portfolio-e-candidatura');
  const optional = catalog.stages
    .filter((stage) => stage.optional)
    .flatMap((stage) => stage.groupIds);
  expect(optional.length).toBeGreaterThan(0);
  expect(journey.flatMap((phase) => phase.groupIds).some((id) => optional.includes(id))).toBe(
    false,
  );
});

it('classifica IA por metadata editorial e permite encontrá-la pela busca', () => {
  const source = frontendCatalog();
  const catalog = JSON.parse(JSON.stringify(source)) as typeof source;
  catalog.groups['curriculum.html'].title = 'IA no título de um assunto comum';
  catalog.groups['aiLearning.seu-assistente-de-estudos'].title = 'Um título novo';
  const first = buildJourney(catalog)[0];
  expect(first.studyGroupIds).toContain('curriculum.html');
  expect(first.aiGroupIds).toContain('aiLearning.seu-assistente-de-estudos');
  expect(
    groupMatches(
      catalog,
      catalog.groups['aiLearning.seu-assistente-de-estudos'],
      'inteligência artificial',
    ),
  ).toBe(true);
});
