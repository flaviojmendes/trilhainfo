import { LinkContentType, LinkType, RoadmapItem } from '../../entity/RoadmapModel';

export const python: RoadmapItem = {
  label: 'Python',
  description:
    'Python é uma linguagem de programação bem conhecida que é uma linguagem fortemente tipada e uma linguagem tipada dinamicamente. Sendo uma linguagem interpretada, o código é executado assim que é escrito e a sintaxe do Python permite escrever código de forma programática funcional, procedural ou orientada a objetos.',
  children: [
    {
      label: 'Python',
      links: [
        {
          label: 'Curso Python - Curso em Video (Gustavo Guanabara)',
          url: 'https://www.youtube.com/watch?v=S9uPNppGsGo&list=PLvE-ZAFRgX8hnECDn1v9HNTI71veL3oW0',
          contentType: LinkContentType.WATCH,
        },
        {
          label: 'Curso Python - Robert Silva',
          url: 'https://www.youtube.com/watch?v=md1vkPxwNNE&list=PLg7nVxv7fa6c9kHOFxJEBXnQMHa-_ATzk',
          contentType: LinkContentType.WATCH,
        },
        {
          label: 'Python Week - Linux Tips e Bruno Rocha',
          url: 'https://www.youtube.com/watch?v=spIRwXEF3XY&list=PLf-O3X2-mxDlfAv8IOfic1sHArdwrrkgh&index=2',
          contentType: LinkContentType.WATCH,
        },
        {
          label: 'Selenium com Python - Dunossauro',
          url: 'https://www.youtube.com/watch?v=PHHXksljGNA&list=PLOQgLBuj2-3LqnMYKZZgzeC7CKCPF375B',
          contentType: LinkContentType.WATCH,
        },
      ],
    },
  ],
};
