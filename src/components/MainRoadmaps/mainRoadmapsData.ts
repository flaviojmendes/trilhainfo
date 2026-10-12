import { roadmapGuides } from '../../roadmaps/guides';
import { roadmaps } from '../../roadmaps/roadmaps';

// Carreiras primeiro; especialização e preparação complementar depois.
const featuredRoadmaps = [
  'frontend',
  'backend',
  'fullstack',
  'test',
  'devops',
  'data-engineer',
  'react',
  'entrevistas',
] as const;

export const mainRoadmapsData = featuredRoadmaps.map((name) => {
  const guide = roadmapGuides[name];
  return {
    title: roadmaps[name].title,
    description: guide ? `${guide.audience} ${guide.start}` : '',
    url: `/roadmap/${name}`,
  };
});
