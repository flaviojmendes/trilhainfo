import { LinkContentType, RoadmapItem } from '../../entity/RoadmapModel';

export const http: RoadmapItem = {
  label: 'HTTP',
  description:
    'HTTP é o protocolo da Web, sendo backend ou frontend você deve saber pelo menos como esse protocolo funciona',
  children: [
    {
      label: 'HTTP',
      links: [
        {
          label: 'Conceitos Essenciais: O Básico de HTTP - Cod3r',
          url: 'https://www.youtube.com/watch?v=CXzbUwK6lc8',
          contentType: LinkContentType.WATCH,
        },
        {
          label: 'Mozilla Developer Network - HTTP',
          url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP',
          contentType: LinkContentType.READ,
        },
        {
          label: 'Mozilla Developer Network - Métodos HTTP',
          url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods',
          contentType: LinkContentType.READ,
        },
        {
          label: 'Como funciona a Web? - A internet por baixo dos panos | Dias de Dev',
          url: 'https://youtu.be/B2IWlnJ_dt0',
          contentType: LinkContentType.WATCH,
        },
      ],
    },
  ],
};
