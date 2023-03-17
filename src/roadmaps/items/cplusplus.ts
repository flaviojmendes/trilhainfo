import { LinkContentType, RoadmapItem } from '../../entity/RoadmapModel';

export const cplusplus: RoadmapItem = {
  label: 'C++',
  description:
    'C++ é uma linguagem de programação compilada multi-paradigma e de uso geral. Desde os anos 1990 é uma das linguagens comerciais mais populares, sendo bastante usada também na academia por seu grande desempenho e base de utilizadores.',
  children: [
    {
      label: 'O Básico',
      links: [
        {
          label: 'UFPR - CI208 - Programação de Computadores',
          url: 'https://youtube.com/playlist?list=PLS5eXCRgrGwfjkRdyQp_pm4TVYzEVKbpc',
          contentType: LinkContentType.WATCH,
        },
        {
          label: 'C++: Uma abordagem minimalista',
          url: 'http://www.inf.ufpr.br/ci208/C++-UmaAbordagemMinimalista.pdf',
          contentType: LinkContentType.WATCH,
        },
        {
          label: 'Linguagem C++ - Notas de Aula',
          url: 'http://www.inf.ufpr.br/ci208/NotasAula/',
          contentType: LinkContentType.WATCH,
        },
      ],
    },
  ],
};
