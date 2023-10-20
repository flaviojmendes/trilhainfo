import { Level, LinkContentType, LinkType } from '../../entity/RoadmapModel';

export const frameworksCSS: Level = {
  label: 'Frameworks CSS',
  description:
    'Uma estrutura CSS fornece ao usuário uma folha de estilo CSS totalmente funcional, permitindo que eles criem uma página da Web simplesmente codificando o HTML com classes, estrutura e IDs apropriados. As classes para recursos populares do site, como rodapé, controle deslizante, barra de navegação, menu de hambúrguer, layouts baseados em colunas e assim por diante, já estão incluídas na estrutura.',
  items: [
    {
      label: 'Bootstrap',
      children: [
        {
          label: 'O básico',
          links: [
            {
              label: 'Curso de Bootstrap - Matheus Battisti',
              url: 'https://www.youtube.com/playlist?list=PLnDvRpP8Bnexu5wvxogy6N49_S5Xk8Cze',
              contentType: LinkContentType.WATCH,
            },
            {
              label: 'Bootstrap 5 exercícios',
              url: 'https://www.w3schools.com/bootstrap5/bootstrap_exercises.php',
              contentType: LinkContentType.PRACTICE,
            },
          ],
        },
      ],
    },
    {
      label: 'Bulma',
      children: [
        {
          label: 'O básico',
          links: [
            {
              label: 'Criando Apps responsivos com React e Bulma - Escola de Javascript',
              url: 'https://www.youtube.com/watch?v=Yxkti4L6-Wk',
              contentType: LinkContentType.WATCH,
            },
            {
              label: 'Bulma | Introdução',
              url: 'https://acervolima.com/bulma-introducao/',
              contentType: LinkContentType.READ,
            },
          ],
        },
      ],
    },
    {
      label: 'Tailwind CSS',
      children: [
        {
          label: 'O básico',
          links: [
            {
              url: 'https://www.youtube.com/watch?v=1eLaBow7Zbo&list=PLcoYAcR89n-r1m-tMfV4qndrRWpT_rb9u',
              label: 'Curso Gratuito Tailwind CSS - Tiago Matos',
              votes: 0,
              type: LinkType.FREE,
              contentType: LinkContentType.WATCH,
            },
            {
              url: 'https://www.codigofonte.com.br/artigos/por-que-usar-tailwind-css',
              label: 'Por que usar Tailwind CSS',
              votes: 0,
              type: LinkType.FREE,
              contentType: LinkContentType.READ,
            },
          ],
        },
      ],
    },
    {
      label: 'Chakra UI',
      children: [
        {
          label: 'O básico',
          links: [
            {
              url: 'https://www.youtube.com/watch?v=RjZOUCIwo4M',
              label: 'Configurando Chakra UI no React! - Huriel',
              contentType: LinkContentType.WATCH,
            },
            {
              url: ' https://medium.com/igor-js/chakra-ui-facilitando-o-front-end-javascript-aabcade75f09',
              label: 'Chakra UI — Facilidade no front-end JavaScript - Igor Lourenço',
              contentType: LinkContentType.READ,
            },
          ],
        },
      ],
    },
    {
      label: 'Material UI',
      children: [
        {
          label: 'O básico',
          links: [
            {
              url: 'https://www.youtube.com/watch?v=uJhqvzK7cWw',
              label: 'Conhecendo Material UI no Reactjs - OmniLabs',
              contentType: LinkContentType.WATCH,
            },
            {
              url: 'https://blog.rocketseat.com.br/react-material-ui/',
              label: 'Integração do Material UI com ReactJS',
              contentType: LinkContentType.READ,
            },
          ],
        },
      ],
    },
    {
      label: 'Radix UI',
      children: [
        {
          label: 'O básico',
          links: [
            {
              url: 'https://www.radix-ui.com/docs/primitives/overview/introduction',
              label: 'Documentação',
              votes: 0,
              type: LinkType.FREE,
              contentType: LinkContentType.READ,
            },
            {
              url: 'https://www.youtube.com/watch?v=c_hrvOaZRNo',
              label: 'Aulão de Stitches e Radix UI - dpw e Pedro Duarte (Radix UI Co-creator)',
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
