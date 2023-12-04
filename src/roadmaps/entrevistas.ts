import { Level, LinkType, LinkContentType } from '../entity/RoadmapModel';
import { http } from './items/http';

export const data: Level[] = [
  {
    label: 'Estruturas de Dados',
    description:
      'Estruturas de dados são formas de organizar dados na memória do computador de forma eficiente. A escolha da estrutura de dados correta pode fazer uma grande diferença na performance de um sistema.',
    items: [
      {
        label: 'Arrays',
        description:
          'Array é uma estrutura de dados linear que armazena uma coleção de elementos. Cada elemento é acessado através de um índice.',
        children: [
          {
            label: 'O Básico',
            links: [
              {
                label: 'O que são arrays? - VelhoBit',
                url: 'https://www.youtube.com/watch?v=rn5EDxbEWpE',
                contentType: LinkContentType.WATCH,
              },
              {
                label: 'O que é ARRAY (Vetor - Matriz) - Sharpax',
                url: 'https://www.youtube.com/watch?v=poDFFYkp6g4',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: 'Stacks',
        description:
          'Stacks (Pilhas) são estruturas de dados que seguem o princípio LIFO (Last In, First Out).',
        children: [
          {
            label: 'O Básico',
            links: [
              {
                label: 'O que são Pilhas - Bóson Treinamentos',
                url: 'https://www.youtube.com/watch?v=EocahNeZcn0',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: 'Hash Tables',
        description: 'Hash Tables (Tabelas Hash)',
        children: [
          {
            label: 'O Básico',
            links: [
              {
                label: 'O que é e como funciona a estrutura de dados Tabela Hash?',
                url: 'https://youtube.com/watch?v=S-GP1UlmstU',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: 'Árvores Binárias',
        description:
          'Árvores binárias são estruturas de dados que permitem a organização de dados de forma hierárquica. Cada nó pode ter no máximo 2 filhos.',
        children: [
          {
            label: 'Busca em Profundidade',
            links: [
              {
                contentType: LinkContentType.WATCH,
                label: 'Busca em Profundidade | Árvores Binárias - Augusto Galego',
                url: 'https://youtu.be/v8eChm8rkx4?si=UvVfvbUemEI_24eG',
              },
            ],
          },
          {
            label: 'Busca em Amplitude',
            links: [
              {
                contentType: LinkContentType.WATCH,
                label: 'Busca em Amplitude | Árvores Binárias - Augusto Galego',
                url: 'https://youtu.be/bN8Fh2562gM?si=URCLXF2PD-n-SNus',
              },
            ],
          },
          {
            label: 'Inverter Árvore Binária',
            links: [
              {
                contentType: LinkContentType.WATCH,
                label: 'Inverter Árvore Binária - Augusto Galego',
                url: 'https://youtu.be/fWQnywbfqBg?si=Zj6jXyizPYiRP5EZ',
              },
            ],
          },
        ],
      },
      {
        label: 'Linked List',
        description:
          'Linked List (Lista Encadeada) é uma estrutura de dados linear e dinâmica. Cada elemento da lista é chamado de nó e possui um valor e uma referência para o próximo elemento da lista.',
        children: [
          {
            label: 'Inverter Lista Encadeada',
            links: [
              {
                label: 'Inverter Lista Encadeada - Augusto Galego',
                url: 'https://youtu.be/8kmAY2O4SBg?si=W3LBPNKDGO09xwob',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: 'Percorrer Lista Encadeada',
            links: [
              {
                label: 'Percorrer Lista Encadeada - Augusto Galego',
                url: 'https://youtube.com/watch?v=7kPkw_fWHew',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    items: [
      {
        label: 'Notação Big O',
        children: [
          {
            label: 'O Básico',
            links: [
              {
                label: 'Big O Notation - Augusto Galego',
                url: 'https://youtu.be/3mwnw3XsEH4?si=MI2YdKf5xyKXwFdP',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Ordenação',
    description:
      'Ordenação é o processo de organizar os elementos de uma coleção de dados em uma determinada ordem.',
    items: [
      {
        label: 'Merge Sort',
        children: [
          {
            label: 'O Básico',
            links: [
              {
                label: 'Merge Sort - Augusto Galego',
                url: 'https://youtu.be/a5LfKZp34d8?si=xYyj7vFVe2pJKis3',
                contentType: LinkContentType.WATCH,
              },
              {
                label: 'Merge Sort - Programação Dinâmica',
                url: 'https://www.youtube.com/watch?v=5prE6Mz8Vh0',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: 'Quick Sort',
        children: [
          {
            label: 'O Básico',
            links: [
              {
                label: 'Lógica do algoritmo de ordenação quick sort',
                url: 'https://www.youtube.com/watch?v=WP7KDljG6IM',
                contentType: LinkContentType.WATCH,
              },
              {
                label: 'QUICKSORT - Programação Dinâmica',
                url: 'https://www.youtube.com/watch?v=wx5juM9bbFo',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },

      {
        label: 'Heap Sort',
        children: [
          {
            label: 'O Básico',
            links: [],
          },
        ],
      },
      {
        label: 'Bubble Sort',
        children: [
          {
            label: 'O Básico',
            links: [
              {
                label: 'Bubble Sort - Programação Dinâmica',
                url: 'https://www.youtube.com/watch?v=GiNPe_678Ms',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: 'Insertion Sort',
        children: [
          {
            label: 'O Básico',
            links: [
              {
                label: 'Insertion Sort - Programação Dinâmica',
                url: 'https://www.youtube.com/watch?v=S5no2qT8_xg',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: 'Radix Sort',
        children: [
          {
            label: 'O Básico',
            links: [
              {
                label: 'Radix Sort - Ordenação por Dígitos',
                url: 'https://www.youtube.com/watch?v=Lb_1R6JGD6o',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    items: [
      {
        label: 'Busca',
        children: [
          {
            label: 'Busca Binária',
            links: [
              {
                label: 'Busca Binária - Augusto Galego',
                url: 'https://youtu.be/YbJKI2Sdwes?si=ne35_4DABa0IE3_i',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: 'Operações com bits',
            children: [
              {
                label: 'XOR',
                links: [
                  {
                    label: 'XOR - Augusto Galego',
                    url: 'https://youtu.be/mVcGSzGxrYM?si=jLbmvjkWmzL_b3Ca',
                    contentType: LinkContentType.WATCH,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'System Design',
    description: 'System Design é a disciplina que estuda como projetar sistemas de software.',
    items: [
      {
        label: 'CDN',
        children: [
          {
            label: 'O Básico',
            links: [
              {
                label: 'CDN - Augusto Galego',
                url: 'https://youtu.be/t7hgO8-egYI?si=43xotFP7e5L7PEse',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: 'DNS',
        children: [
          {
            label: 'O Básico',
            links: [
              {
                label: 'DNS - Augusto Galego',
                url: 'https://youtu.be/b86unKOZrhY?si=XI_wF4-CgBMjU0a4',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: 'Load Balancer',
        children: [
          {
            label: 'O básico',
            links: [
              {
                label: 'Load Balancer - Augusto Galego',
                url: 'https://youtu.be/OIw0kWQwGis?si=R0OljQP0GBwxboxF',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: 'Sequencer',
        children: [
          {
            label: 'O básico',
            links: [
              {
                label: 'Sequencer - Augusto Galego',
                url: 'https://youtu.be/2FbbjssqA9g?si=Ra_EPQRcZ7Pee4Fk',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Decisões técnicas',
    items: [
      {
        label: 'SQL vs NoSQL',
        children: [
          {
            label: 'O básico',
            links: [
              {
                label: 'SQL vs NoSQL - Augusto Galego',
                url: 'https://youtu.be/o8HEfReQ6co?si=gYT7W7S02ycsTmtn',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: 'REST vs GraphQL',
        children: [
          {
            label: 'O básico',
            links: [
              {
                label: 'REST vs GraphQL - Augusto Galego',
                url: 'https://youtu.be/dsarexwqcjc?si=dTZQWnG6FSzvwko2',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
    ],
  },
];
