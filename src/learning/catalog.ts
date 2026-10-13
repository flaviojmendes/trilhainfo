import { Level, Link, LinkType, RoadmapItem } from '../entity/RoadmapModel';
import { RoadmapGuide, curriculumReviewedAt } from '../roadmaps/guides';
import { LearningNode, RoadmapCatalog } from './types';
import { applyContributions } from '../contributions/apply';
import { Contribution } from '../contributions/types';

export function contentHash(value: string): string {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index++) {
    hash = Math.imul(hash ^ value.charCodeAt(index), 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

const foundations: Record<string, string[]> = {
  'curriculum.html': ['curriculum.internet-e-http'],
  'curriculum.css': ['curriculum.html'],
  'curriculum.javascript': ['curriculum.html'],
  'curriculum.typescript': ['curriculum.javascript'],
  'curriculum.acessibilidade': ['curriculum.html'],
};

const challenges: Record<string, string> = {
  'curriculum.html':
    'Compare a semântica de duas estruturas para a mesma página. Implemente um formulário com validação nativa, confira a árvore de acessibilidade e justifique suas escolhas.',
  'curriculum.css':
    'Resolva o mesmo layout com Flexbox e Grid. Teste a 320px, com zoom e texto longo; compare o comportamento e documente quando escolher cada abordagem.',
  'curriculum.javascript':
    'Implemente busca com cancelamento de requisições e tratamento de respostas fora de ordem. Reproduza uma conexão lenta e explique como evitar dados desatualizados.',
  'curriculum.typescript':
    'Modele estados de carregamento, sucesso e falha com uma union discriminada. Valide dados externos em tempo de execução e demonstre um caso que o compilador sozinho não detecta.',
  'curriculum.internet-e-http':
    'Compare cabeçalhos de cache em duas requisições reais. Explique idempotência e demonstre como distinguir uma falha de rede de um erro HTTP.',
  'curriculum.sql-e-postgresql':
    'Compare o plano de uma consulta com e sem índice. Demonstre uma transação que falha, verifique o rollback e justifique as constraints escolhidas.',
  'curriculum.acessibilidade':
    'Conclua o fluxo usando somente teclado e leitor de tela. Introduza e corrija uma falha de foco ou anúncio de erro, registrando a evidência.',
};

function permanentId(item: { id?: string }, context: string): string {
  if (!item.id || !/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(item.id))
    throw new Error(`Falta um ID editorial permanente válido: ${context}`);
  return item.id;
}

export function createCatalog(
  id: string,
  title: string,
  levels: Level[],
  guide?: RoadmapGuide,
  contributions: Contribution[] = [],
): RoadmapCatalog {
  const catalog: RoadmapCatalog = {
    schemaVersion: 1,
    id,
    title,
    version: `${curriculumReviewedAt}.${contentHash(JSON.stringify(levels))}`,
    language: 'pt-BR',
    license: 'MIT',
    source: `https://github.com/flaviojmendes/trilhainfo/tree/main/src/roadmaps`,
    audience: guide?.audience || 'Pessoas que estudam tecnologia e participam da comunidade.',
    outcome: guide?.outcome || 'Consultar referências e participar da comunidade.',
    ...(guide?.prerequisite ? { prerequisite: guide.prerequisite } : {}),
    stages: [],
    groups: {},
    nodes: {},
    resources: {},
  };

  function addResource(link: Link): string {
    const resourceId = link.id || `resource.url.${contentHash(link.url)}`;
    const previous = catalog.resources[resourceId];
    if (previous && previous.url !== link.url) throw new Error(`Recurso duplicado: ${resourceId}`);
    catalog.resources[resourceId] = {
      id: resourceId,
      title: link.label,
      url: link.url,
      language:
        link.language ??
        (/português/.test(link.label) ? 'pt-BR' : /inglês/.test(link.label) ? 'en' : null),
      kind: link.contentType,
      free: link.type === LinkType.FREE ? true : link.type === LinkType.PAID ? false : null,
      estimatedMinutes: link.estimatedMinutes ?? null,
      lastReviewedAt: link.lastReviewedAt ?? null,
    };
    return resourceId;
  }

  function addNode(section: RoadmapItem, parent: RoadmapItem): string {
    const nodeId = permanentId(section, `${parent.label} / ${section.label}`);
    if (catalog.nodes[nodeId]) throw new Error(`Nó duplicado: ${nodeId}`);
    catalog.nodes[nodeId] = {
      id: nodeId,
      groupId: permanentId(parent, parent.label),
      title: section.label,
      description: section.description || '',
      requires: [],
      resourceIds: [...new Set((section.links || []).map(addResource))],
      kind: /Critérios/.test(section.label)
        ? 'criteria'
        : /Pratique|Prática|Registre|Treine/.test(section.label)
        ? 'practice'
        : 'concept',
      ...(section.ai || parent.ai === 'focused' ? { ai: section.ai || parent.ai } : {}),
      ...(section.prompt ? { prompt: section.prompt } : {}),
      legacyIds: [`${parent.label}-${section.label}`, `${section.label}-${parent.label}`],
    };
    return nodeId;
  }

  levels.forEach((level) => {
    const stageId = permanentId(level, level.label || title);
    const stage = {
      id: stageId,
      title: level.label || title,
      description: level.description || '',
      optional: level.optional === true,
      kind: level.kind || 'study',
      groupIds: [] as string[],
    };
    level.items.forEach((item) => {
      const groupId = permanentId(item, item.label);
      if (catalog.groups[groupId]) throw new Error(`Grupo duplicado: ${groupId}`);
      const sections = item.children?.length
        ? item.children
        : [
            {
              id: `${groupId}.overview`,
              label: 'Conheça o assunto',
              description: item.description,
              links: item.links,
            },
          ];
      const nodeIds = sections.map((section) => addNode(section, item));
      // First explanation + all practice/criteria remain visible in every depth.
      const requiredIds = nodeIds.filter(
        (nodeId, index) =>
          index === 0 || ['practice', 'criteria'].includes(catalog.nodes[nodeId].kind),
      );
      requiredIds.slice(1).forEach((nodeId) => {
        catalog.nodes[nodeId].requires = [nodeIds[0]];
      });
      const challengeId = `${groupId}.deepening`;
      const deepIds = [...nodeIds];
      if (catalog.nodes[challengeId]) throw new Error(`Nó duplicado: ${challengeId}`);
      catalog.nodes[challengeId] = {
        id: challengeId,
        groupId,
        title: 'Desafio de aprofundamento',
        kind: 'challenge',
        ...(item.ai === 'focused' ? { ai: item.ai } : {}),
        description:
          challenges[groupId] ||
          `Escolha uma decisão de ${item.label} no seu projeto. Construa uma segunda solução, compare os resultados com um caso de teste e explique os limites de cada abordagem. Use as referências para verificar sua conclusão.`,
        requires: [...requiredIds],
        resourceIds: [...new Set(nodeIds.flatMap((nodeId) => catalog.nodes[nodeId].resourceIds))],
        legacyIds: [],
      };
      deepIds.push(challengeId);
      catalog.groups[groupId] = {
        id: groupId,
        title: item.label,
        description: item.description || '',
        stageId,
        ...(item.ai ? { ai: item.ai } : {}),
        ...(item.url ? { href: item.url } : {}),
        requiredIds,
        variants: {
          simple: {
            summary: `Comece por uma referência de ${item.label} e faça a prática essencial.`,
            stepIds: requiredIds,
          },
          standard: {
            summary:
              item.description || `Explore os materiais de ${item.label} e confira o que aprendeu.`,
            stepIds: nodeIds,
          },
          deep: {
            summary: `Aprofunde ${item.label} comparando soluções e demonstrando suas decisões.`,
            stepIds: deepIds,
          },
        },
      };
      stage.groupIds.push(groupId);
    });
    catalog.stages.push(stage);
  });

  Object.entries(foundations).forEach(([groupId, prerequisiteGroups]) => {
    const group = catalog.groups[groupId];
    if (!group) return;
    const first = catalog.nodes[group.requiredIds[0]];
    first.requires = prerequisiteGroups.flatMap(
      (required) => catalog.groups[required]?.requiredIds.slice(0, 1) || [],
    );
  });
  applyContributions(catalog, contributions);
  validateCatalog(catalog);
  catalog.version = `${curriculumReviewedAt}.${contentHash(
    JSON.stringify({ ...catalog, version: '' }),
  )}`;
  return catalog;
}

export function validateCatalog(catalog: RoadmapCatalog): void {
  if (!catalog.stages.length || !Object.keys(catalog.groups).length)
    throw new Error('A trilha precisa conter pelo menos uma etapa e um assunto.');
  const stageIds = new Set<string>();
  const membership = new Set<string>();
  for (const stage of catalog.stages) {
    if (stageIds.has(stage.id)) throw new Error(`Etapa duplicada: ${stage.id}`);
    stageIds.add(stage.id);
    for (const id of stage.groupIds) {
      if (!catalog.groups[id] || membership.has(id)) throw new Error(`Grupo inválido: ${id}`);
      membership.add(id);
    }
  }
  for (const group of Object.values(catalog.groups)) {
    if (
      !group.requiredIds.length ||
      !catalog.stages.some(
        (stage) => stage.id === group.stageId && stage.groupIds.includes(group.id),
      )
    )
      throw new Error(`Grupo sem objetivos ou etapa correspondente: ${group.id}`);
    if (!membership.has(group.id)) throw new Error(`Grupo sem etapa: ${group.id}`);
    for (const variant of Object.values(group.variants)) {
      for (const id of [...group.requiredIds, ...variant.stepIds]) {
        if (!catalog.nodes[id]) throw new Error(`Referência a nó inexistente: ${id}`);
      }
    }
  }
  const done = new Set<string>();
  const visiting = new Set<string>();
  function visit(node: LearningNode) {
    if (!catalog.groups[node.groupId]) throw new Error(`Nó sem grupo: ${node.id}`);
    if (visiting.has(node.id)) throw new Error(`Ciclo de pré-requisitos: ${node.id}`);
    if (done.has(node.id)) return;
    visiting.add(node.id);
    node.requires.forEach((id) => {
      if (!catalog.nodes[id]) throw new Error(`Pré-requisito inexistente: ${id}`);
      visit(catalog.nodes[id]);
    });
    visiting.delete(node.id);
    done.add(node.id);
    node.resourceIds.forEach((id) => {
      if (!catalog.resources[id]) throw new Error(`Recurso inexistente: ${id}`);
    });
  }
  Object.values(catalog.nodes).forEach(visit);
  Object.values(catalog.resources).forEach((resource) => {
    if (!/^https:\/\//.test(resource.url)) throw new Error(`URL inválida: ${resource.id}`);
  });
}

export function projectBranch(
  catalog: RoadmapCatalog,
  groupId: string,
  depth: import('./types').Depth,
): LearningNode[] {
  const group = catalog.groups[groupId];
  if (!group) return [];
  const seen = new Set<string>();
  const result: LearningNode[] = [];
  function include(id: string) {
    if (seen.has(id)) return;
    seen.add(id);
    const node = catalog.nodes[id];
    node.requires.forEach(include);
    result.push(node);
  }
  [...group.requiredIds, ...group.variants[depth].stepIds].forEach(include);
  return result;
}
