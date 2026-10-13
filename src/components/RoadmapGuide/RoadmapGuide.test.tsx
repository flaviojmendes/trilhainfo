import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RoadmapGuide from '.';

describe('Orientação da trilha', () => {
  it('explica o pré-requisito de React e permite voltar à base', () => {
    render(
      <BrowserRouter>
        <RoadmapGuide name="react" />
      </BrowserRouter>,
    );
    expect(screen.getByText(/Para quem já praticou HTML/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Estudar a base na trilha Frontend' })).toHaveAttribute(
      'href',
      '/roadmap/frontend',
    );
    expect(screen.getByText('outubro de 2026')).toHaveAttribute('datetime', '2026-10-12');
  });
});
