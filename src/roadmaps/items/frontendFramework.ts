import { Level, LinkContentType, LinkType } from '../../entity/RoadmapModel';

export const frontendFramework: Level = {
  label: 'Escolha um Framework de Frontend',
  description:
    'Frameworks são coleções de bibliotecas que auxiliam no desenvolvimento de um produto de software ou site. Os frameworks variam em seus recursos e funções, dependendo do conjunto de tarefas. Eles definem a estrutura, estabelecem as regras e fornecem as ferramentas de desenvolvimento necessárias.',
  items: [
    {
      label: 'React',
      url: '/roadmap/react',
    },
    {
      label: 'Angular',
      description:
        'Angular é uma estrutura de desenvolvimento front-end baseada em componentes construída em TypeScript que inclui uma coleção de bibliotecas bem integradas que incluem recursos como roteamento, gerenciamento de formulários, comunicação cliente-servidor e muito mais.',
      children: [
        {
          label: 'O Básico',
          links: [
            {
              url: 'https://www.youtube.com/playlist?list=PLGxZ4Rq3BOBoSRcKWEdQACbUCNWLczg2G',
              label: 'Curso de Angular - Loiane Groner',
              votes: 0,
              type: LinkType.FREE,
              contentType: LinkContentType.WATCH,
            },
            {
              url: 'https://www.devmedia.com.br/implementando-servicos-com-angularjs/32715',
              label: 'Implementando serviços com AngularJS',
              votes: 0,
              type: LinkType.FREE,
              contentType: LinkContentType.READ,
            },
            {
              url: 'https://www.w3schools.com/angular/angular_examples.asp',
              label: 'Exemplos de AngularJS',
              votes: 0,
              type: LinkType.FREE,
              contentType: LinkContentType.PRACTICE,
            },
          ],
        },
        {
          label: 'RxJS',
          links: [
            {
              url: 'https://www.youtube.com/watch?v=DBHpS2CqGZs',
              label: 'Programação Reativa com RxJS Parte 1 - Cod3r Cursos',
              contentType: LinkContentType.WATCH,
            },
            {
              url: 'https://www.youtube.com/watch?v=KXliXSjxC6k',
              label: 'Programação Reativa com RxJS Parte 2 - Cod3r Cursos',
              contentType: LinkContentType.WATCH,
            },
          ],
        },
        {
          label: 'NgRx',
          links: [
            {
              url: 'https://www.youtube.com/watch?v=yCac7PRG6R4',
              label: 'NgRx com Angular - HypeIT Brasil',
              contentType: LinkContentType.WATCH,
            },
          ],
        },
      ],
    },
    {
      label: 'Vue.js',
      description:
        'Vue.js é uma estrutura JavaScript de código aberto para criar interfaces de usuário e aplicativos de página única. É focado principalmente no desenvolvimento front-end.',
      children: [
        {
          label: 'O Básico',
          links: [
            {
              url: 'https://vuejs.org/guide/introduction.html',
              label: 'Documentação',
              contentType: LinkContentType.READ,
            },
            {
              url: 'https://www.devmedia.com.br/vue-js-tutorial/38042',
              label: 'Vue.js Tutorial',
              contentType: LinkContentType.READ,
            },
          ],
        },
        {
          label: 'Cursos',
          links: [
            {
              url: 'https://treinamento.vuejsbrasil.org/',
              label: 'Curso completo e gratuito de Vue 3 do iniciante ao avançado',
              contentType: LinkContentType.VISIT,
            },
          ],
        },
        {
          label: 'Pinia',
          links: [
            {
              url: 'https://pinia.vuejs.org',
              label: 'Documentação oficial',
              votes: 0,
              type: LinkType.FREE,
              contentType: LinkContentType.READ,
            },
            {
              url: 'https://www.youtube.com/watch?v=4DFrzPTif2E',
              label: 'Gerenciando estado com Pinia - Pablo Codes',
              votes: 0,
              type: LinkType.FREE,
              contentType: LinkContentType.WATCH,
            },
          ],
        },
        {
          label: 'VueX',
          links: [
            {
              url: 'https://vuex.vuejs.org',
              label: 'Documentação oficial',
              votes: 0,
              type: LinkType.FREE,
              contentType: LinkContentType.READ,
            },
            {
              url: 'https://www.youtube.com/watch?v=qq8yJmXys6U',
              label: 'Gerenciando estado com Vuex -  Matheus Castiglioni',
              votes: 0,
              type: LinkType.FREE,
              contentType: LinkContentType.WATCH,
            },
          ],
        },
      ],
    },
  ],
};
