import { LearningGroup, LearningStage, RoadmapCatalog, StudyPreferences } from './types';

export interface JourneyPhase {
  id: string;
  title: string;
  stages: LearningStage[];
  groupIds: string[];
  studyGroupIds: string[];
  afterProjectGroupIds: string[];
  aiGroupIds: string[];
  projectGroupIds: string[];
}

const phaseTitles: Record<string, string> = {
  'frontend.pagina-responsiva': 'Construir a base',
  'frontend.aplicacao-com-api': 'Conectar interface e dados',
  'frontend.produto-frontend': 'Entregar seu produto',
};

/** Project deliveries make the long editorial sequence easier to survey.
 * This projection changes neither prerequisites nor completion requirements.
 */
export function buildJourney(catalog: RoadmapCatalog): JourneyPhase[] {
  const chunks: LearningStage[][] = [];
  let pending: LearningStage[] = [];
  catalog.stages
    .filter((stage) => !stage.optional)
    .forEach((stage) => {
      pending.push(stage);
      if (stage.kind === 'project') {
        chunks.push(pending);
        pending = [];
      }
    });
  if (pending.length) {
    if (chunks.length) chunks[chunks.length - 1].push(...pending);
    else chunks.push(pending);
  }
  return chunks.map((stages) => {
    const groupIds = stages.flatMap((stage) => stage.groupIds);
    const projectGroupIds = stages
      .filter((stage) => stage.kind === 'project')
      .flatMap((stage) => stage.groupIds);
    const aiGroupIds = groupIds.filter((id) => catalog.groups[id].ai === 'focused');
    const projectIndex = stages.findIndex((stage) => stage.kind === 'project');
    const afterProjectGroupIds =
      projectIndex < 0
        ? []
        : stages
            .slice(projectIndex + 1)
            .flatMap((stage) => stage.groupIds)
            .filter((id) => !aiGroupIds.includes(id));
    const firstStudy = stages.find((stage) => stage.kind !== 'ai' && stage.kind !== 'project');
    const project = catalog.groups[projectGroupIds[0]];
    return {
      id: project?.id || stages[0].id,
      title: phaseTitles[project?.id] || firstStudy?.title || project?.title || catalog.title,
      stages,
      groupIds,
      projectGroupIds,
      aiGroupIds,
      afterProjectGroupIds,
      studyGroupIds: groupIds.filter(
        (id) =>
          !projectGroupIds.includes(id) &&
          !aiGroupIds.includes(id) &&
          !afterProjectGroupIds.includes(id),
      ),
    };
  });
}

export function groupMatches(catalog: RoadmapCatalog, group: LearningGroup, query: string) {
  const term = query.trim().toLocaleLowerCase('pt-BR');
  if (!term) return true;
  return [
    group.title,
    group.description,
    group.ai ? 'IA inteligência artificial desenvolvimento com IA' : '',
    ...group.variants.deep.stepIds.map((id) => catalog.nodes[id].title),
  ]
    .join(' ')
    .toLocaleLowerCase('pt-BR')
    .includes(term);
}

export function journeyProgress(
  catalog: RoadmapCatalog,
  groupIds: string[],
  prefs: StudyPreferences,
) {
  const ids = [...new Set(groupIds.flatMap((id) => catalog.groups[id].requiredIds))];
  return {
    done: ids.filter((id) => prefs.completedNodeIds.includes(id)).length,
    total: ids.length,
  };
}

export function aiPracticeNode(catalog: RoadmapCatalog, groupId: string) {
  return catalog.groups[groupId].variants.standard.stepIds.find(
    (id) => catalog.nodes[id].ai === 'assisted',
  );
}
