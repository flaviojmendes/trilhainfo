import { render, screen } from '@testing-library/react';
import { AccordionContainer, HorizontalRoadmapAccordion, RoadmapAccordion } from '.';
import { LevelProvider } from '../HorizontalRoadmap/LevelProvider';
import { RoadmapItem, LinkContentType } from '../../entity/RoadmapModel';

const criteria = 'Demonstre recuperação de uma falha e documente as decisões.';
const section: RoadmapItem = {
  label: 'Critérios de conclusão',
  description: criteria,
  prompt: 'Contexto: [projeto].\nVerifique a recuperação de uma falha.',
  links: [
    {
      label: 'Documentação de apoio',
      url: 'https://example.com',
      contentType: LinkContentType.READ,
    },
  ],
};

describe('Critérios de projeto nas duas visualizações', () => {
  it('exibe os critérios no drawer da visualização vertical', () => {
    render(
      <AccordionContainer type="single" defaultValue={section.label}>
        <RoadmapAccordion section={section} isRead={false} saveRead={() => undefined} />
      </AccordionContainer>,
    );
    expect(screen.getByText(criteria)).toBeVisible();
    expect(screen.getByRole('textbox', { name: 'Prompt de Critérios de conclusão' })).toHaveValue(
      section.prompt,
    );
    expect(screen.getByRole('link', { name: 'Documentação de apoio' })).toHaveAttribute(
      'href',
      'https://example.com',
    );
  });

  it('exibe os mesmos critérios na visualização horizontal', () => {
    render(
      <LevelProvider>
        <AccordionContainer type="single" defaultValue={section.label}>
          <HorizontalRoadmapAccordion section={section} />
        </AccordionContainer>
      </LevelProvider>,
    );
    expect(screen.getByText(criteria)).toBeVisible();
    expect(screen.getByRole('textbox', { name: 'Prompt de Critérios de conclusão' })).toHaveValue(
      section.prompt,
    );
  });
});
