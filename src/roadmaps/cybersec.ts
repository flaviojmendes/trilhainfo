import { Link } from 'react-router-dom';
import { Level, LinkContentType } from '../entity/RoadmapModel';

export const data: Level[] = [
  {
    label: 'Cibersegurança',
    description:
      'Aprenda sobre cibersegurança, um campo que se concentra na proteção de sistemas, redes e programas de computador contra roubo, danos ou acesso não autorizado.',
    items: [
      {
        label: 'Computação Básica',
        description:
          'A Computação básica compreende a compreensão essencial do funcionamento de computadores, abrangendo desde o sistema binário e a distinção entre software e hardware até conhecimentos sobre sistemas operacionais como Windows e Linux',
        children: [
          {
            label: 'Como o computador funciona?',
            links: [
              {
                label: 'Funcionamento do Computador - Portal Easy Learning',
                url: 'https://www.youtube.com/watch?v=R8rkkkfXThA',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },

      {
        label: 'Rede de Computadores',
        description:
          'A Redes de Computadores compreende a interconexão de dispositivo e suas tecnologias',
        children: [
          {
            label: 'Redes de Computadores',
            links: [
              {
                label: 'Como a internet Funciona? - Curso em Vídeo',
                url: 'https://www.youtube.com/watch?v=nlO5hySqJFA',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: 'Ip Vs Mac - Guia Anônima',
            links: [
              {
                label: 'Ip Vs Mac - Guia Anônima',
                url: 'https://www.youtube.com/watch?v=0CQjQfRZJ2Y',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: 'O que é rede interna e externa? ',
            links: [
              {
                label: 'Rede Interna e Externa - Guia Anônima',
                url: 'https://www.youtube.com/watch?v=chmVvePfU7w&pp=ygUccmVkZSBpbnRlcm5hIHZzIHJlZGUgZXh0ZXJuYQ%3D%3D',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: 'Modelo OSI',
            links: [
              {
                label: 'Modelo OSI -  Guia Anônima',
                url: 'https://youtu.be/FU58q40l_j8?si=1Vv8tveHIsLLHCKZ',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
    ],
  },
];
