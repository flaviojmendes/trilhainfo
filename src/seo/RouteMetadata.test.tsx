import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Link, MemoryRouter } from 'react-router-dom';
import { RouteMetadata } from './RouteMetadata';

const canonical = () => document.head.querySelector('link[rel="canonical"]')?.getAttribute('href');
const robots = () => document.head.querySelector('meta[name="robots"]')?.getAttribute('content');

it('atualiza canonical, prévia, título e indexação ao navegar entre páginas públicas, pessoais e erros', async () => {
  const original = document.head.innerHTML;
  const view = render(
    <MemoryRouter initialEntries={['/guide/cors']}>
      <RouteMetadata />
      <Link to="/aula/html-primeira-pagina?trilha=frontend">Aula</Link>
      <Link to="/hroadmap/frontend?view=map">Trilha</Link>
      <Link to="/profile">Perfil</Link>
      <Link to="/guide/nao-existe">Erro</Link>
      <Link to="/">Início</Link>
    </MemoryRouter>,
  );
  try {
    await waitFor(() => expect(canonical()).toBe('https://trilha.info/guide/cors'));
    expect(document.head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(document.head.querySelector('meta[property="article:section"]')).not.toBeNull();
    fireEvent.click(screen.getByText('Aula'));
    await waitFor(() => expect(canonical()).toBe('https://trilha.info/aula/html-primeira-pagina'));
    expect(document.head.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe(
      'https://trilha.info/og/aula-html-primeira-pagina.png',
    );
    fireEvent.click(screen.getByText('Trilha'));
    await waitFor(() => expect(canonical()).toBe('https://trilha.info/roadmap/frontend'));
    expect(document.title).toBe('Trilha de Frontend | Trilha Info');
    expect(document.head.querySelector('meta[property="article:section"]')).toBeNull();
    fireEvent.click(screen.getByText('Perfil'));
    await waitFor(() => expect(robots()).toBe('noindex, follow'));
    expect(canonical()).toBeUndefined();
    expect(document.head.querySelector('script[data-seo-schema]')).toBeNull();
    fireEvent.click(screen.getByText('Erro'));
    await waitFor(() => expect(document.title).toBe('Página não encontrada · Trilha Info'));
    expect(robots()).toBe('noindex, follow');
    fireEvent.click(screen.getByText('Início'));
    await waitFor(() => expect(canonical()).toBe('https://trilha.info/'));
    expect(robots()).toBe('index, follow, max-image-preview:large');
    expect(document.head.querySelectorAll('script[data-seo-schema]')).toHaveLength(1);
    expect(document.title).toContain('Cursos e trilhas gratuitas');
  } finally {
    view.unmount();
    document.head.innerHTML = original;
  }
});
