import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { findGuide } from '../../guides';
import GuidePage from '../../pages/GuidePage';
import GuidesPage from '../../pages/GuidesPage';
import { GuideView } from './GuideView';

function renderGuide(id: string) {
  const guide = findGuide(id);
  if (!guide) throw new Error(`Guia ausente: ${id}`);
  return render(
    <MemoryRouter>
      <GuideView guide={guide} />
    </MemoryRouter>,
  );
}

describe('Página de guia', () => {
  beforeEach(() => localStorage.clear());

  it('mostra resumo, sumário, diagrama e cartaz para baixar', async () => {
    renderGuide('basicAuth');
    expect(
      screen.getByRole('heading', { level: 1, name: 'Autenticação Básica (Basic Auth)' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Backend' })).toHaveAttribute(
      'href',
      '/roadmap/backend',
    );

    const toc = screen.getByRole('navigation', { name: 'Neste guia' });
    expect(await within(toc).findByRole('link', { name: /O fluxo no navegador/ })).toHaveAttribute(
      'href',
      '#fluxo',
    );
    expect(within(toc).getByRole('link', { name: /Baixar versão em imagem/ })).toHaveAttribute(
      'href',
      '/guides/basicAuth.jpg',
    );

    const flow = screen
      .getByText('Primeiro acesso a um recurso protegido por Basic Auth')
      .closest('figure');
    expect(flow).not.toBeNull();
    const steps = within(flow as HTMLElement).getAllByRole('listitem');
    expect(steps).toHaveLength(6);
    expect(steps[1]).toHaveTextContent('Servidor → Navegador');
    expect(steps[1]).toHaveTextContent('401 Unauthorized');
  });

  it('guarda as verificações do checklist neste navegador', async () => {
    renderGuide('accessibilityChecks');
    const status = await screen.findByText(/de 10 verificados/);
    expect(status).toHaveTextContent('0 de 10 verificados');

    fireEvent.click(screen.getByRole('checkbox', { name: /Foco visível/ }));
    expect(status).toHaveTextContent('1 de 10 verificados');
    expect(
      JSON.parse(localStorage.getItem('trilha-guide-checks:v1:accessibilityChecks:dez') || '[]'),
    ).toEqual([1]);

    fireEvent.click(screen.getByRole('button', { name: 'Recomeçar' }));
    expect(status).toHaveTextContent('0 de 10 verificados');
  });

  it('indica quando o guia não existe', () => {
    render(
      <MemoryRouter initialEntries={['/guide/inexistente']}>
        <Routes>
          <Route path="/guide/:guide" element={<GuidePage />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(
      screen.getByRole('heading', { name: 'Este guia não existe, ou mudou de nome' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver todos os guias' })).toHaveAttribute(
      'href',
      '/guias',
    );
  });
});

describe('Índice de guias', () => {
  const count = () => screen.getByText(/^(\d+ de )?18 guias$/);

  it('filtra por tema e por busca, e permite limpar', () => {
    render(
      <MemoryRouter initialEntries={['/guias']}>
        <GuidesPage />
      </MemoryRouter>,
    );
    expect(count()).toHaveTextContent('18 guias');

    fireEvent.click(screen.getByRole('button', { name: 'APIs e segurança' }));
    expect(screen.getByRole('button', { name: 'APIs e segurança' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(count()).toHaveTextContent('4 de 18 guias');
    expect(screen.queryByRole('heading', { name: 'Web e navegador' })).not.toBeInTheDocument();

    fireEvent.change(screen.getByRole('searchbox', { name: 'Buscar guia' }), {
      target: { value: 'kubernetes' },
    });
    expect(screen.getByText(/Nenhum guia encontrado/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Limpar filtros' }));
    expect(count()).toHaveTextContent('18 guias');
  });
});
