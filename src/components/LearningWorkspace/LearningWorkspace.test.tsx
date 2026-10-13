import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import LearningWorkspace from '.';
import { createCatalog } from '../../learning/catalog';
import { Level, LinkContentType } from '../../entity/RoadmapModel';
import { initialPreferences } from '../../learning/progress';

const data: Level[] = [
  {
    id: 'stage.base',
    label: 'Primeiros passos',
    items: [
      {
        id: 'topic.html',
        label: 'HTML',
        description: 'Estruture uma página.',
        children: [
          {
            id: 'html.basics',
            label: 'O básico',
            links: [
              {
                id: 'resource.html',
                label: 'Documentação',
                url: 'https://example.com/html',
                contentType: LinkContentType.READ,
              },
            ],
          },
          {
            id: 'html.practice',
            label: 'Pratique e confira',
            description: 'Publique sua página.',
            links: [],
          },
        ],
      },
    ],
  },
];
const catalog = createCatalog('sample', 'Exemplo', data);

beforeEach(() => {
  localStorage.clear();
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({
      matches: false,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
  Element.prototype.scrollIntoView = vi.fn();
});
afterEach(() => vi.unstubAllGlobals());
const mount = (study = true) => {
  const result = render(
    <MemoryRouter>
      <LearningWorkspace catalog={catalog} />
    </MemoryRouter>,
  );
  if (study) fireEvent.click(screen.getByRole('button', { name: 'Estudar', exact: true }));
  return result;
};

it('adapta o ramo mantendo foco, progresso e desfazer', async () => {
  mount();
  const completion = screen.getByRole('checkbox', { name: /Estudei: HTML/ });
  fireEvent.click(completion);
  const deepen = screen.getByRole('button', { name: 'Aprofundar' });
  deepen.focus();
  fireEvent.click(deepen);
  expect(screen.getByRole('heading', { name: 'Desafio de aprofundamento' })).toBeVisible();
  expect(deepen).toHaveFocus();
  expect(completion).toBeChecked();
  fireEvent.click(screen.getByRole('button', { name: 'Desfazer adaptação' }));
  expect(
    screen.queryByRole('heading', { name: 'Desafio de aprofundamento' }),
  ).not.toBeInTheDocument();
  expect(screen.getByRole('checkbox', { name: /Estudei: HTML/ })).toBeChecked();
  await waitFor(() => expect(screen.getByRole('button', { name: 'Ver completo' })).toHaveFocus());
  await waitFor(() =>
    expect(
      JSON.parse(localStorage.getItem('trilha-study:v1:sample') || '{}').completedNodeIds,
    ).toContain('html.basics'),
  );
});

it('adapta a profundidade ao nível declarado sem concluir práticas', () => {
  mount();
  fireEvent.change(screen.getByRole('combobox', { name: 'Minha familiaridade com HTML' }), {
    target: { value: 'demonstrated' },
  });
  expect(screen.getByRole('heading', { name: 'Desafio de aprofundamento' })).toBeVisible();
  screen
    .getAllByRole('checkbox', { name: /Demonstrei: HTML/ })
    .forEach((checkbox) => expect(checkbox).not.toBeChecked());
  fireEvent.change(screen.getByRole('combobox', { name: 'Minha familiaridade com HTML' }), {
    target: { value: 'unknown' },
  });
  expect(screen.getByRole('button', { name: 'Simplificar' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  expect(
    screen.queryByRole('heading', { name: 'Desafio de aprofundamento' }),
  ).not.toBeInTheDocument();
});

it('compartilha conclusão entre Estudar, Mapa e Lista e oferece estado vazio de busca', () => {
  mount();
  fireEvent.click(screen.getByRole('checkbox', { name: /Estudei: HTML/ }));
  fireEvent.click(screen.getByRole('button', { name: 'Mapa', exact: true }));
  expect(screen.getByRole('button', { name: /HTML.*passos essenciais/ })).toBeVisible();
  fireEvent.click(screen.getByRole('button', { name: 'Lista', exact: true }));
  expect(screen.getByRole('checkbox', { name: /Estudei: HTML/ })).toBeChecked();
  fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'nenhum-assunto' } });
  expect(screen.getByText(/Nenhum assunto encontrado/)).toBeVisible();
});

it('preserva um registro ilegível e mantém a sessão utilizável', () => {
  localStorage.setItem('trilha-study:v1:sample', '{broken');
  mount();
  fireEvent.click(screen.getByRole('checkbox', { name: /Estudei: HTML/ }));
  expect(screen.getByRole('checkbox', { name: /Estudei: HTML/ })).toBeChecked();
  expect(localStorage.getItem('trilha-study:v1:sample')).toBe('{broken');
  expect(screen.getByText(/registros originais foram preservados/)).toBeVisible();
});

it('migra o progresso antigo sem apagar a origem', async () => {
  const legacy = JSON.stringify([
    {
      label: 'Base',
      children: [{ label: 'Base-HTML', children: [{ label: 'HTML-O básico', read: true }] }],
    },
  ]);
  localStorage.setItem('selectedItems-sample', legacy);
  mount();
  expect(screen.getByRole('checkbox', { name: /Estudei: HTML/ })).toBeChecked();
  await waitFor(() => expect(localStorage.getItem('trilha-study:v1:sample')).not.toBeNull());
  expect(localStorage.getItem('selectedItems-sample')).toBe(legacy);
});

it('permite desfazer a remoção de um plano e retoma o plano salvo', async () => {
  const first = mount();
  fireEvent.click(screen.getByText('Organizar meus estudos'));
  fireEvent.click(screen.getByRole('button', { name: 'Montar meu plano' }));
  expect(screen.getByRole('heading', { name: 'Revise seu plano' })).toBeVisible();
  fireEvent.click(screen.getByRole('button', { name: 'Aplicar plano' }));
  const saved = localStorage.getItem('trilha-study:v1:sample:plan');
  expect(saved).not.toBeNull();
  expect(screen.getByRole('checkbox', { name: /Estudei: HTML/ })).not.toBeChecked();

  fireEvent.click(screen.getByRole('button', { name: 'Remover plano' }));
  expect(localStorage.getItem('trilha-study:v1:sample:plan')).toBeNull();
  const undo = screen.getByRole('button', { name: 'Desfazer alteração do plano' });
  expect(undo).toBeVisible();
  await waitFor(() => expect(undo).toHaveFocus());
  fireEvent.click(undo);
  expect(localStorage.getItem('trilha-study:v1:sample:plan')).toBe(saved);
  await waitFor(() =>
    expect(screen.getByRole('button', { name: 'Montar meu plano' })).toHaveFocus(),
  );

  first.unmount();
  mount();
  fireEvent.click(screen.getByText('Organizar meus estudos'));
  expect(screen.getByRole('heading', { name: 'Seu plano de estudos' })).toBeVisible();
});

it('preserva formatos desconhecidos recebidos de outra aba sem perder a sessão', () => {
  mount();
  fireEvent.click(screen.getByRole('checkbox', { name: /Estudei: HTML/ }));
  const key = 'trilha-study:v1:sample';
  const newerRecord = JSON.stringify({ schemaVersion: 2 });
  localStorage.setItem(key, newerRecord);
  fireEvent(window, new StorageEvent('storage', { key, newValue: newerRecord }));
  expect(screen.getByRole('checkbox', { name: /Estudei: HTML/ })).toBeChecked();
  fireEvent.click(screen.getByRole('checkbox', { name: /Demonstrei: HTML/ }));
  expect(screen.getByRole('checkbox', { name: /Demonstrei: HTML/ })).toBeChecked();
  expect(localStorage.getItem(key)).toBe(newerRecord);
});

it('começa pelo trajeto completo e preserva a visualização escolhida nas sessões anteriores', () => {
  const first = mount(false);
  expect(screen.getByRole('heading', { name: 'Seu trajeto, do começo à entrega' })).toBeVisible();
  expect(screen.getByRole('button', { name: 'Mapa', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  expect(document.querySelector('.journey-ai-lane')).toBeNull();
  first.unmount();
  localStorage.setItem(
    'trilha-study:v1:sample',
    JSON.stringify({ ...initialPreferences(catalog), view: 'list' }),
  );
  mount(false);
  expect(screen.getByRole('button', { name: 'Lista', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});

it('marca o ponto atual do trajeto e registra o resumo do progresso para a página inicial', async () => {
  mount(false);
  expect(screen.getByRole('button', { name: /HTML.*Você está aqui/ })).toHaveAttribute(
    'aria-current',
    'step',
  );
  expect(screen.getByText('Destino')).toBeVisible();
  await waitFor(() =>
    expect(JSON.parse(localStorage.getItem('trilha-progress:v1') || '{}').sample).toMatchObject({
      done: 0,
      percent: 0,
    }),
  );
  fireEvent.click(screen.getByRole('button', { name: 'Estudar', exact: true }));
  fireEvent.click(screen.getByRole('checkbox', { name: /Estudei: HTML/ }));
  await waitFor(() =>
    expect(JSON.parse(localStorage.getItem('trilha-progress:v1') || '{}').sample.done).toBe(1),
  );
});

it('abre um assunto e volta ao mapa com foco e conclusão preservados', async () => {
  mount(false);
  fireEvent.click(screen.getByRole('button', { name: /HTML.*Obrigatório/ }));
  await waitFor(() =>
    expect(screen.getByRole('heading', { name: 'HTML', exact: true })).toHaveFocus(),
  );
  fireEvent.click(screen.getByRole('checkbox', { name: /Estudei: HTML/ }));
  fireEvent.click(screen.getByRole('button', { name: /Voltar ao mapa/ }));
  const origin = screen.getByRole('button', { name: /HTML.*Obrigatório/ });
  await waitFor(() => expect(origin).toHaveFocus());
  expect(
    JSON.parse(localStorage.getItem('trilha-study:v1:sample') || '{}').completedNodeIds,
  ).toContain('html.basics');
  fireEvent.click(origin);
  fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'sem-correspondencia' } });
  fireEvent.click(screen.getByRole('button', { name: 'Voltar ao mapa' }));
  await waitFor(() =>
    expect(screen.getByRole('heading', { name: 'Seu trajeto, do começo à entrega' })).toHaveFocus(),
  );
  expect(screen.getByRole('button', { name: 'Limpar busca' })).toBeVisible();
});

it('mostra opcionais e IA como informações independentes e abre a prática exata do projeto', async () => {
  const enriched: Level[] = [
    {
      ...data[0],
      items: [
        ...data[0].items,
        {
          id: 'ai.tutor',
          label: 'Tutoria',
          ai: 'focused',
          children: [{ id: 'ai.tutor.basics', label: 'Peça uma pista', links: [] }],
        },
      ],
    },
    {
      id: 'stage.project',
      label: 'Projeto',
      kind: 'project',
      items: [
        {
          id: 'project.page',
          label: 'Minha página',
          ai: 'assisted',
          children: [
            { id: 'project.page.criteria', label: 'Critérios de conclusão', links: [] },
            {
              id: 'project.page.ai-practice',
              label: 'Prática de IA neste projeto',
              ai: 'assisted',
              links: [],
            },
          ],
        },
      ],
    },
    {
      id: 'stage.optional',
      label: 'Especialização',
      optional: true,
      items: [
        {
          id: 'optional.css',
          label: 'CSS avançado',
          children: [{ id: 'optional.css.basics', label: 'O básico', links: [] }],
        },
      ],
    },
  ];
  const richCatalog = createCatalog('rich', 'Trilha', enriched);
  render(
    <MemoryRouter>
      <LearningWorkspace catalog={richCatalog} />
    </MemoryRouter>,
  );
  expect(screen.getByRole('heading', { name: 'Aprofundamentos opcionais' })).toBeVisible();
  expect(screen.getByRole('button', { name: /CSS avançado.*Opcional/ })).toBeVisible();
  expect(screen.getByRole('button', { name: /Tutoria.*Obrigatório.*Com IA/ })).toBeVisible();
  expect(
    screen.queryByRole('checkbox', { name: 'Mostrar etapas opcionais' }),
  ).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /Praticar IA no projeto: Minha página/ }));
  const practice = document.getElementById('node-title-project.page.ai-practice');
  await waitFor(() => expect(practice).toHaveFocus());
  expect(practice?.closest('li')).toHaveAttribute('data-ai', 'assisted');
  expect(
    screen.getByRole('checkbox', { name: /Demonstrei: Minha página, Prática de IA/ }),
  ).not.toBeChecked();
  fireEvent.click(screen.getByRole('button', { name: 'Voltar ao mapa' }));
  await waitFor(() =>
    expect(
      screen.getByRole('button', { name: /Praticar IA no projeto: Minha página/ }),
    ).toHaveFocus(),
  );
});
