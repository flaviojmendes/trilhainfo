import { LearningCredit, RoadmapCatalog } from '../learning/types';
import { Contribution, ContributionResource, resourceKindLabels } from './types';

export function contributionNodeId(contribution: Pick<Contribution, 'groupId' | 'id'>): string {
  return `${contribution.groupId}.comunidade.${contribution.id}`;
}

// Community entries never become required steps, so approving one cannot lower anyone's progress.
export function applyContributions(catalog: RoadmapCatalog, contributions: Contribution[]): void {
  for (const contribution of contributions) {
    const group = catalog.groups[contribution.groupId];
    if (!group) continue;
    const credit: LearningCredit = {
      id: contribution.id,
      ...(contribution.author?.name ? { author: contribution.author.name } : {}),
      ...(contribution.author?.github ? { github: contribution.author.github } : {}),
    };
    const addResource = (resource: ContributionResource) => {
      const id = `contribution.${contribution.id}`;
      catalog.resources[id] = {
        id,
        title: resource.title,
        url: resource.url,
        language: resource.language,
        kind: resourceKindLabels[resource.kind],
        free: true,
        estimatedMinutes: null,
        lastReviewedAt: contribution.createdAt,
        contribution: credit,
      };
      return id;
    };

    if (contribution.kind === 'resource') {
      const node = catalog.nodes[contribution.nodeId];
      if (!node || node.groupId !== group.id) continue;
      if (node.resourceIds.some((id) => catalog.resources[id]?.url === contribution.resource.url))
        continue;
      node.resourceIds.push(addResource(contribution.resource));
    } else {
      const id = contributionNodeId(contribution);
      catalog.nodes[id] = {
        id,
        groupId: group.id,
        title: contribution.step.title,
        description: contribution.step.description,
        requires: [],
        resourceIds: [addResource(contribution.step.resource)],
        kind: 'concept',
        legacyIds: [],
        contribution: credit,
      };
      group.variants.standard.stepIds.push(id);
      group.variants.deep.stepIds.push(id);
    }
  }
}
