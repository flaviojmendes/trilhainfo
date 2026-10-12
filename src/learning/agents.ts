import { projectBranch } from './catalog';
import { downloadBlob } from './downloads';
import { RoadmapCatalog, StudyContext, StudyPlan, StudyPreferences } from './types';

export function exportStudyContext(catalog: RoadmapCatalog, prefs: StudyPreferences): StudyContext {
  return {
    schemaVersion: 1,
    roadmapId: catalog.id,
    roadmapVersion: catalog.version,
    catalogSnapshot: catalog,
    learner: {
      goal: prefs.goal,
      weeklyMinutes: prefs.weeklyMinutes,
      depthByGroup: { ...prefs.depthByGroup },
      knowledgeByGroup: { ...prefs.knowledgeByGroup },
      completedNodeIds: [...prefs.completedNodeIds],
      studiedResourceIds: [...prefs.studiedResourceIds],
    },
  };
}

export function tutorPrompt(catalog: RoadmapCatalog, prefs: StudyPreferences): string {
  return `Quero estudar ${catalog.title}. Meu objetivo: ${prefs.goal}.
Disponibilidade: ${prefs.weeklyMinutes} minutos por semana.
Use o contexto de estudos exportado, que inclui o catálogo completo e meu progresso.
Considere os pré-requisitos, meu conhecimento declarado e os modos de profundidade.
Use somente os IDs de nós e referências presentes no catálogo. Não invente links.
Faça perguntas e proponha exercícios antes de dar a solução. Não trate leitura como domínio.
Para importar um plano no Trilha Info, devolva JSON conforme https://trilha.info/schemas/study-plan.v1.schema.json.
schemaVersion: 1; roadmapId: ${catalog.id}; roadmapVersion: ${catalog.version}.
Cada semana contém title e steps; cada passo contém nodeId, resourceIds, estimatedMinutes e successCriteria.
Respeite o orçamento semanal, a ordem dos pré-requisitos e os critérios dos projetos.
Identifique as durações como estimativas de planejamento. Aguarde minha tentativa antes de avaliar.`;
}

export function generateStudyPlan(catalog: RoadmapCatalog, prefs: StudyPreferences): StudyPlan {
  const visited = new Set(prefs.completedNodeIds);
  for (const [id, knowledge] of Object.entries(prefs.knowledgeByGroup)) {
    if (knowledge === 'demonstrated' && catalog.groups[id]) {
      catalog.groups[id].requiredIds.forEach((nodeId) => visited.add(nodeId));
    }
  }
  const plan: StudyPlan = {
    schemaVersion: 1,
    roadmapId: catalog.id,
    roadmapVersion: catalog.version,
    weeks: [],
  };
  let current: StudyPlan['weeks'][number] = { title: 'Semana 1', steps: [] };
  let minutes = 0;
  for (const stage of catalog.stages)
    for (const groupId of stage.groupIds) {
      const depth = prefs.depthByGroup[groupId] || 'standard';
      if (stage.optional && depth !== 'deep') continue;
      for (const node of projectBranch(catalog, groupId, depth)) {
        if (visited.has(node.id)) continue;
        visited.add(node.id);
        const resources = node.resourceIds.map((id) => catalog.resources[id]);
        const firstResource =
          resources.find((resource) => resource.language === 'pt-BR') || resources[0];
        const estimatedMinutes = Math.min(prefs.weeklyMinutes, node.kind === 'concept' ? 20 : 40);
        if (minutes + estimatedMinutes > prefs.weeklyMinutes && current.steps.length) {
          plan.weeks.push(current);
          current = { title: `Semana ${plan.weeks.length + 1}`, steps: [] };
          minutes = 0;
        }
        current.steps.push({
          nodeId: node.id,
          resourceIds:
            depth === 'simple' ? (firstResource ? [firstResource.id] : []) : node.resourceIds,
          estimatedMinutes,
          successCriteria:
            node.kind === 'concept'
              ? `Explique ${catalog.groups[node.groupId].title}: ${
                  node.title
                } com um exemplo próprio e confira sua explicação na referência.`
              : node.description || 'Demonstre o resultado e registre como verificou.',
        });
        minutes += estimatedMinutes;
      }
    }
  if (current.steps.length) plan.weeks.push(current);
  return plan;
}

const record = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export function validateStudyPlan(
  value: unknown,
  catalog: RoadmapCatalog,
  prefs: StudyPreferences,
): StudyPlan {
  if (
    !record(value) ||
    value.schemaVersion !== 1 ||
    value.roadmapId !== catalog.id ||
    value.roadmapVersion !== catalog.version
  ) {
    throw new Error(
      'O plano deve usar esta trilha e a mesma versão do catálogo. Exporte um contexto atualizado.',
    );
  }
  if (!Array.isArray(value.weeks) || value.weeks.length > 200)
    throw new Error('O plano deve conter até 200 semanas.');
  const seen = new Set(prefs.completedNodeIds);
  Object.entries(prefs.knowledgeByGroup).forEach(([id, knowledge]) => {
    if (knowledge === 'demonstrated') catalog.groups[id]?.requiredIds.forEach((id) => seen.add(id));
  });
  let stepCount = 0;
  const planned = new Set<string>();
  const weeks = value.weeks.map((week, index) => {
    if (
      !record(week) ||
      typeof week.title !== 'string' ||
      !week.title.trim() ||
      week.title.length > 160 ||
      !Array.isArray(week.steps) ||
      !week.steps.length
    )
      throw new Error(`Semana ${index + 1}: informe título e passos.`);
    let minutes = 0;
    const steps = week.steps.map((step) => {
      if (
        !record(step) ||
        typeof step.nodeId !== 'string' ||
        !Object.prototype.hasOwnProperty.call(catalog.nodes, step.nodeId)
      )
        throw new Error(`Semana ${index + 1}: conceito fora do catálogo.`);
      const node = catalog.nodes[step.nodeId];
      if (planned.has(node.id)) throw new Error(`Passo duplicado: ${node.title}.`);
      if (node.requires.some((id) => !seen.has(id)))
        throw new Error(`Inclua os pré-requisitos antes de ${node.title}.`);
      if (
        !Array.isArray(step.resourceIds) ||
        step.resourceIds.some((id) => typeof id !== 'string' || !node.resourceIds.includes(id))
      )
        throw new Error(`Referência inválida para ${node.title}.`);
      if (
        typeof step.estimatedMinutes !== 'number' ||
        !Number.isInteger(step.estimatedMinutes) ||
        step.estimatedMinutes < 1 ||
        step.estimatedMinutes > 2400
      )
        throw new Error(`Informe uma duração válida para ${node.title}.`);
      if (
        typeof step.successCriteria !== 'string' ||
        !step.successCriteria.trim() ||
        step.successCriteria.length > 4000
      )
        throw new Error(`Informe um critério de conclusão para ${node.title}.`);
      if (++stepCount > 1000) throw new Error('O plano excede 1000 passos.');
      seen.add(node.id);
      planned.add(node.id);
      minutes += step.estimatedMinutes;
      return {
        nodeId: node.id,
        resourceIds: [...new Set(step.resourceIds)] as string[],
        estimatedMinutes: step.estimatedMinutes,
        successCriteria: step.successCriteria,
      };
    });
    if (minutes > prefs.weeklyMinutes)
      throw new Error(
        `Semana ${index + 1}: ${minutes} minutos excedem sua disponibilidade de ${
          prefs.weeklyMinutes
        }.`,
      );
    return { title: week.title, steps };
  });
  return { schemaVersion: 1, roadmapId: catalog.id, roadmapVersion: catalog.version, weeks };
}

export function downloadJSON(filename: string, value: unknown): void {
  downloadBlob(filename, new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' }));
}
