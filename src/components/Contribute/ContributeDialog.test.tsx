import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { createCatalog } from '../../learning/catalog';
import { roadmaps } from '../../roadmaps/roadmaps';
import { roadmapGuides } from '../../roadmaps/guides';
import { ContributeDialog } from './ContributeDialog';

const roadmapId = Object.keys(roadmaps)[0] as keyof typeof roadmaps;
const catalog = createCatalog(
  roadmapId,
  roadmaps[roadmapId].title,
  roadmaps[roadmapId].file,
  roadmapGuides[roadmapId as keyof typeof roadmapGuides],
);
const [group] = Object.values(catalog.groups).filter(
  (item) => item.variants.standard.stepIds.length > 0,
);

function open() {
  render(<ContributeDialog catalog={catalog} group={group} />);
  fireEvent.click(screen.getByRole('button', { name: 'Sugerir conteúdo' }));
}

describe('Sugerir conteúdo', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('mostra os erros e leva o foco ao primeiro campo', async () => {
    open();
    fireEvent.click(screen.getByRole('radio', { name: /Documentação ou artigo/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Enviar sugestão' }));
    expect(screen.getByRole('alert').textContent).toMatch(/Revise \d+ campos/);
    expect(document.activeElement).toBe(screen.getByLabelText('Link'));
    expect(screen.getByLabelText('Link').getAttribute('aria-invalid')).toBe('true');
    fireEvent.change(screen.getByLabelText('Link'), {
      target: { value: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP' },
    });
    expect(screen.getByLabelText('Link').getAttribute('aria-invalid')).toBe('false');
  });

  it('envia a sugestão e mostra o resultado', async () => {
    const fetch = vi.fn<[string, RequestInit?], Promise<Response>>(
      async () =>
        new Response(
          JSON.stringify({ pull: { number: 42, url: 'https://github.com/x/y/pull/42' } }),
          { status: 201 },
        ),
    );
    vi.stubGlobal('fetch', fetch);
    open();
    fireEvent.click(screen.getByRole('radio', { name: /Um passo novo/ }));
    fireEvent.change(screen.getByLabelText('Nome do passo'), {
      target: { value: 'Ferramentas de depuração' },
    });
    fireEvent.change(screen.getByLabelText('O que estudar neste passo'), {
      target: { value: 'Use o DevTools para inspecionar e corrigir problemas reais.' },
    });
    fireEvent.change(screen.getByLabelText('Link'), {
      target: { value: 'https://developer.chrome.com/docs/devtools' },
    });
    fireEvent.change(screen.getByLabelText('Título'), { target: { value: 'Guia do DevTools' } });
    fireEvent.click(screen.getByLabelText(/gratuito/));
    fireEvent.change(screen.getByLabelText('Por que isso ajuda quem estuda?'), {
      target: { value: 'Depurar é uma habilidade que falta nesse assunto.' },
    });
    expect(screen.getByText('Novo passo: Ferramentas de depuração')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Enviar sugestão' }));

    await waitFor(() => expect(screen.getByText('Sugestão enviada')).toBeTruthy());
    const [url, init] = fetch.mock.calls[0];
    expect(url).toBe('/api/contributions');
    expect(JSON.parse(String(init?.body))).toMatchObject({
      kind: 'step',
      roadmapId,
      groupId: group.id,
      step: { title: 'Ferramentas de depuração', resource: { kind: 'read', language: 'pt-BR' } },
    });
    expect(screen.getByRole('link', { name: /Acompanhar no GitHub/ }).getAttribute('href')).toBe(
      'https://github.com/x/y/pull/42',
    );
  });
});
