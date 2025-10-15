import { LinkContentType, RoadmapItem } from '../../entity/RoadmapModel';

export const containers: RoadmapItem = {
  label: 'Containers vs Virtualização',
  description:
    'Contêineres e máquinas virtuais são as duas abordagens mais populares para configurar uma infraestrutura de software para sua organização.',
  children: [
    {
      label: 'Docker',
      links: [
        {
          label: 'Descomplicando o Docker - Linux Tips',
          url: 'https://www.youtube.com/watch?v=Wm99C_f7Kxw&list=PLf-O3X2-mxDn1VpyU2q3fuI6YYeIWp5rR',
          contentType: LinkContentType.WATCH,
        },
        {
          label: 'Curso Docker - Robert Silva',
          url: 'https://www.youtube.com/watch?v=c2y_yz9B6_M&list=PLg7nVxv7fa6dxsV1ftKI8FAm4YD6iZuI4',
          contentType: LinkContentType.WATCH,
        },
        {
          label: 'Livro Descomplicando Docker',
          url: 'https://livro.descomplicandodocker.com.br/',
          contentType: LinkContentType.WATCH,
        },
        {
          label: 'Docker - Ayrton Teshima',
          url: 'https://www.youtube.com/playlist?list=PLbA-jMwv0cuVRs8qkXKkeOuL80bdiQ96D',
          contentType: LinkContentType.WATCH,
        },
      ],
    },
    { label: 'rkt', links: [] },
    { label: 'LXC', links: [] },
  ],
};
