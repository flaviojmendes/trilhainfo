import { Level, LinkContentType } from '../entity/RoadmapModel';
import { convertToRoadmapRead, reconcileRoadmapRead, updateReadAttribute } from './roadmapUtils';

const link = (label: string) => ({
  label,
  url: 'https://example.com',
  contentType: LinkContentType.READ,
});
const initial: Level[] = [
  {
    label: 'Base',
    items: [{ label: 'HTML', children: [{ label: 'O básico', links: [link('Semântica')] }] }],
  },
];

function completed() {
  const saved = convertToRoadmapRead(initial);
  updateReadAttribute('Base-HTML', true, () => undefined, saved);
  return saved;
}

describe('Reconciliação do progresso em trilhas revisadas', () => {
  it('migra os identificadores antigos usando o tópico do pai', () => {
    const saved = completed();
    const resource = saved[0].children?.[0].children?.[0].children?.[0];
    if (!resource) throw new Error('Missing fixture resource');
    resource.label = 'O básico-Semântica';
    const restored = reconcileRoadmapRead(initial, saved);
    expect(restored[0].read).toBe(true);
    expect(restored[0].children?.[0].children?.[0].children?.[0].label).toBe(
      'HTML-O básico-Semântica',
    );
  });

  it('mantém práticas diferentes independentes quando compartilham uma referência', () => {
    const levels: Level[] = [
      {
        label: 'Base',
        items: [
          { label: 'HTML', children: [{ label: 'Pratique', links: [link('Documentação')] }] },
          { label: 'CSS', children: [{ label: 'Pratique', links: [link('Documentação')] }] },
        ],
      },
    ];
    const saved = convertToRoadmapRead(levels);
    updateReadAttribute('HTML-Pratique', true, () => undefined, saved);
    const restored = reconcileRoadmapRead(levels, saved);
    expect(restored[0].children?.map((child) => child.read)).toEqual([true, false]);
  });

  it('preserva recursos concluídos após mover e acrescentar etapas', () => {
    const revised: Level[] = [
      { ...initial[0], label: 'Primeiros passos' },
      { label: 'Projeto', items: [{ label: 'Demo' }] },
    ];
    const restored = reconcileRoadmapRead(revised, completed());
    expect(restored[0].children?.[0].children?.[0].children?.[0].read).toBe(true);
    expect(restored[0].read).toBe(true);
    expect(restored[1].read).toBe(false);
  });

  it('não conclui material novo mesmo quando a quantidade de etapas não muda', () => {
    const revised: Level[] = [
      {
        label: 'Base',
        items: [
          {
            label: 'HTML',
            children: [{ label: 'O básico', links: [link('Semântica'), link('Formulários')] }],
          },
        ],
      },
    ];
    const restored = reconcileRoadmapRead(revised, completed());
    const section = restored[0].children?.[0].children?.[0];
    expect(section?.children?.map((child) => child.read)).toEqual([true, false]);
    expect(section?.read).toBe(false);
    expect(restored[0].read).toBe(false);
  });

  it('não altera os registros recebidos e é estável após a reconciliação', () => {
    const saved = completed();
    const snapshot = JSON.stringify(saved);
    const restored = reconcileRoadmapRead(initial, saved);
    expect(JSON.stringify(saved)).toBe(snapshot);
    expect(reconcileRoadmapRead(initial, restored)).toEqual(restored);
  });
});
