import { Level, LinkType, LinkContentType } from '../entity/RoadmapModel';

export const data: Level[] = [
  {
    id: 'community.comunidade',
    label: 'Comunidade',
    description:
      'A Trilha Info só é possível graças a comunidade que acredita nela e apoia o projeto. Além disso, conectar-se com devs vai acelerar sua jornada do aprendizado, seja para tirar/responder dúvidas ou conversar com pessoas mais e menos experientes que você.',
    items: [
      {
        id: 'community.quem-contribui',
        label: 'quem contribui',
        description:
          'Essas são as pessoas que estão sempre por perto para ajudar a comunidade da Trilha Info.',
        children: [
          {
            id: 'community.twitter',
            label: 'Twitter',
            links: [
              {
                id: 'resource.community.flaviojmendes',
                url: 'https://twitter.com/flaviojmendes',
                label: 'flaviojmendes',
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.VISIT,
              },
              {
                id: 'resource.community.nicholascosta',
                url: 'https://twitter.com/NicholasCosta04',
                label: 'Nicholas M',
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.VISIT,
              },
              {
                id: 'resource.community.joaom',
                url: 'https://twitter.com/joaom__00',
                label: 'João Pedro Magalhães',
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.VISIT,
              },
              {
                id: 'resource.community.jhonatasmatos',
                url: 'https://twitter.com/jhonatasmatoss',
                label: 'Jhonatas Matos',
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.VISIT,
              },
            ],
          },
        ],
      },
      {
        id: 'community.quem-apoia',
        label: 'quem apoia',
        description: 'Essas são as pessoas que estão sempre ajudando a divulgar a Trilha Info.',
        children: [
          {
            id: 'community.twitter.2',
            label: 'Twitter',
            links: [
              {
                id: 'resource.community.marcobruno',
                url: 'https://twitter.com/marcobrunodev',
                label: 'Marco Bruno',
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.VISIT,
              },
              {
                id: 'resource.community.jeffersonfernando',
                url: 'https://twitter.com/badtux_',
                label: 'Jefferson Fernando',
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.VISIT,
              },
              {
                id: 'resource.community.caioemidio',
                url: 'https://twitter.com/CaioEm1dio',
                label: 'Caio Emídio',
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.VISIT,
              },
              {
                id: 'resource.community.leovargas',
                url: 'https://twitter.com/leovargasdev',
                label: 'Leo Vargas',
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.VISIT,
              },
            ],
          },
        ],
      },
    ],
  },
];
