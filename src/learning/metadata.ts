import { RoadmapCatalog } from './types';

export function learningMetadata(catalog: RoadmapCatalog) {
  const canonical = `https://trilha.info/roadmap/${catalog.id}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    '@id': canonical,
    name: `Trilha de ${catalog.title}`,
    url: canonical,
    inLanguage: catalog.language,
    description: catalog.outcome,
    learningResourceType: 'Roadmap de estudos',
    isAccessibleForFree: true,
    license: 'https://spdx.org/licenses/MIT.html',
    version: catalog.version,
    audience: { '@type': 'Audience', audienceType: catalog.audience },
    teaches: Object.values(catalog.groups).map((group) => group.title),
    hasPart: Object.values(catalog.nodes).map((node) => ({
      '@type': 'LearningResource',
      '@id': `${canonical}#${node.id}`,
      name: node.title,
      description: node.description,
      citation: node.resourceIds.map((id) => catalog.resources[id].url),
    })),
  };
}
