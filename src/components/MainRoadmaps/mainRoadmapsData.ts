import { roadmapGuides } from '../../roadmaps/guides';
import { roadmapTitles } from '../../roadmaps/titles';

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

const complementary: readonly string[] = ['react', 'entrevistas'];

export const mainRoadmapsData = featuredRoadmaps.map((name) => {
  const guide = roadmapGuides[name];
  return {
    id: name,
    title: roadmapTitles[name],
    kind: guide?.kind || 'Trilha',
    audience: guide?.audience || '',
    outcome: guide?.outcome || '',
    description: guide ? `${guide.audience} ${guide.start}` : '',
    url: `/roadmap/${name}`,
    group: complementary.includes(name) ? ('complement' as const) : ('career' as const),
  };
});
