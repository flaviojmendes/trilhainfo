import { LinkContentType, LinkType, RoadmapItem } from '../../entity/RoadmapModel';

export const cloudComputing: RoadmapItem = {
  label: 'Cloud Computing',
  description:
    'Cloud computing, conhecida também como computação em nuvem, é a tecnologia que permite o uso remoto de recursos da computação por meio da conectividade da Internet.',
  children: [
    {
      label: 'AWS',
      links: [
        {
          url: 'https://www.youtube.com/watch?v=j6yImUbs4OA&list=PLOF5f9_x-OYUaqJar6EKRAonJNSHDFZUm',
          label:
            'O que é AWS e como aprender mais com o Curso Gratuito Amazon Web Services na Prática - Aula 01 - #32',
          type: LinkType.FREE,
          votes: 0,
          contentType: LinkContentType.WATCH,
        },
        {
          url: 'https://www.youtube.com/watch?v=HiBCv9DolxI&list=PLtL97Owd1gkQ0dfqGW8OtJ-155Gs67Ecz',
          label: 'AWS do Zero ao Expert - Mundo da Cloud',
          type: LinkType.FREE,
          votes: 0,
          contentType: LinkContentType.WATCH,
        },
      ],
    },
    {
      label: 'Azure',
      links: [
        {
          url: 'https://www.youtube.com/watch?v=AITM8sTsu-o&list=PLwftZeDnOzt0quETXYfGjfi2AcpeGX-7i',
          label: 'Azure Fundamentals - Introdução ao Curso - Ray Carneiro',
          type: LinkType.FREE,
          votes: 0,
          contentType: LinkContentType.WATCH,
        },
      ],
    },
    {
      label: 'Google Platfom',
      links: [
        {
          url: 'https://www.youtube.com/watch?v=4lZmhCaq13U',
          label: 'Google Cloud, por onde começar e por quê você deveria faze-lo',
          type: LinkType.FREE,
          votes: 0,
          contentType: LinkContentType.WATCH,
        },
      ],
    },
    {
      label: 'Digital Ocean',
      links: [
        {
          url: 'https://www.youtube.com/watch?v=eu6DCSv95MQ&list=PLVKPmJRbmf2Rb2KwvGzRP1eBhQCWrRbhE',
          label: 'Curso Digital Ocean - Introdução ao Curso - Aula 01',
          type: LinkType.FREE,
          votes: 0,
          contentType: LinkContentType.WATCH,
        },
      ],
    },
  ],
};
