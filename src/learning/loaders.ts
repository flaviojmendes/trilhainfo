import { roadmapTitles } from '../roadmaps/titles';
import { createCatalog } from './catalog';
import { roadmapGuides } from '../roadmaps/guides';
import { Level } from '../entity/RoadmapModel';
import { approvedContributions } from '../contributions/approved';

const loaders: Record<string, () => Promise<{ data: Level[] }>> = {
  frontend: () => import('../roadmaps/frontend'),
  react: () => import('../roadmaps/react'),
  backend: () => import('../roadmaps/backend'),
  devops: () => import('../roadmaps/devops'),
  fullstack: () => import('../roadmaps/fullstack'),
  test: () => import('../roadmaps/test'),
  entrevistas: () => import('../roadmaps/entrevistas'),
  'data-engineer': async () => ({
    data: (await import('../roadmaps/dataEngineering')).dataEngineeringData,
  }),
};

export { roadmapTitles } from '../roadmaps/titles';

export async function loadCatalog(id: string) {
  if (!Object.prototype.hasOwnProperty.call(loaders, id)) return undefined;
  const { data } = await loaders[id]();
  return createCatalog(
    id,
    roadmapTitles[id],
    data,
    roadmapGuides[id as keyof typeof roadmapGuides],
    approvedContributions,
  );
}
