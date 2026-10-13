import { LinkType, RoadmapItem } from '../entity/RoadmapModel';
import { roadmaps } from './roadmaps';
import { roadmapGuides } from './guides';
import { mainRoadmapsData } from '../components/MainRoadmaps/mainRoadmapsData';
import { convertToRoadmapRead } from '../support/roadmapUtils';
import { RoadmapRead } from '../entity/RoadmapReadModel';

describe('Currículo de outubro de 2026', () => {
  const careerNames = Object.keys(roadmaps) as Array<keyof typeof roadmaps>;

  it.each(careerNames)(
    '%s tem orientação, projeto, prática e recursos acessíveis pela interface',
    (name) => {
      const levels = roadmaps[name].file;
      expect(roadmapGuides[name]?.start).toBeTruthy();
      expect(mainRoadmapsData.some((entry) => entry.url === `/roadmap/${name}`)).toBe(true);
      expect(levels.some((level) => level.label?.startsWith('Projeto: '))).toBe(true);

      const itemLabels = new Set<string>();
      const progressLabels = new Set<string>();
      function checkProgressLabels(items: RoadmapRead[]) {
        items.forEach((item) => {
          expect(progressLabels.has(item.label)).toBe(false);
          progressLabels.add(item.label);
          if (item.children) checkProgressLabels(item.children);
        });
      }
      checkProgressLabels(convertToRoadmapRead(levels));
      levels.forEach((level) => {
        expect(level.label).toBeTruthy();
        expect(level.items.length).toBeGreaterThan(0);
        level.items.forEach((item: RoadmapItem) => {
          // Labels are used for anchors and saved progress, so repeated topics are ambiguous.
          expect(itemLabels.has(item.label)).toBe(false);
          itemLabels.add(item.label);
          expect(item.description).toBeTruthy();
          expect(item.children?.length).toBeGreaterThan(0);
          expect(item.children?.some((child) => child.description)).toBe(true);
          item.children?.forEach((child) => {
            expect(child.children).toBeUndefined(); // Both views render one section depth.
            expect(child.links?.length).toBeGreaterThan(0);
            child.links?.forEach((link) => {
              expect(new URL(link.url).protocol).toBe('https:');
              expect(link.type).toBe(LinkType.FREE);
              expect(link.label).toMatch(/português|inglês/);
            });
          });
        });
      });
    },
  );

  it('apresenta recursos avançados após a preparação para oportunidades', () => {
    careerNames
      .filter((name) => name !== 'entrevistas')
      .forEach((name) => {
        const levels = roadmaps[name].file;
        const career = levels.findIndex((level) => level.label === 'Preparação para oportunidades');
        const optional = levels.findIndex((level) => level.label?.match(/opciona/));
        expect(career).toBeGreaterThan(0);
        expect(optional).toBeGreaterThan(career);
      });
  });

  it.each(careerNames)('%s introduz IA cedo e tem prática contextual nos projetos', (name) => {
    const levels = roadmaps[name].file;
    const introduction = levels[0].items.find((item) => item.label === 'Seu assistente de estudos');
    expect(introduction).toBeDefined();
    expect(
      introduction?.children?.find((child) => child.label === 'Escolha uma ferramenta')
        ?.description,
    ).toContain('basta');
    const projects = levels.filter((level) => level.label?.startsWith('Projeto: '));
    const firstProject = levels.indexOf(projects[0]);
    expect(levels.findIndex((level) => level.label === 'IA: prompting e contexto')).toBeLessThan(
      firstProject,
    );
    projects.forEach((level) => {
      const lab = level.items[0].children?.find(
        (child) => child.label === 'Prática de IA neste projeto',
      );
      expect(lab?.prompt).toContain(level.items[0].label);
      expect(lab?.prompt).toContain('Critérios:');
      expect(
        level.items[0].children?.find((child) => child.label === 'Registre sua verificação'),
      ).toBeDefined();
    });
    if (name !== 'entrevistas') {
      const firstPractice = levels.findIndex(
        (level) => level.label === 'IA: programação em parceria',
      );
      const agents = levels.findIndex(
        (level) => level.label === 'IA: agentes, regras e verificação',
      );
      expect(firstPractice).toBeGreaterThan(firstProject);
      expect(agents).toBeGreaterThan(firstPractice);
      expect(agents).toBeLessThan(levels.indexOf(projects[projects.length - 1]));
    } else {
      expect(levels.some((level) => level.label === 'IA: simulação e feedback')).toBe(true);
      expect(levels.some((level) => level.label === 'IA: agentes, regras e verificação')).toBe(
        false,
      );
    }
  });
});
