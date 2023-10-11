import { LinkContentType, LinkType, RoadmapItem } from '../../entity/RoadmapModel';

export const css: RoadmapItem = {
  label: 'CSS',
  description:
    'CSS ou Cascading Style Sheets é a linguagem usada para estilizar o frontend de qualquer site. CSS é uma tecnologia fundamental da World Wide Web, juntamente com HTML e JavaScript.',
  children: [
    {
      label: 'O básico',
      links: [
        {
          url: 'https://www.youtube.com/watch?v=5PS6ku8NzIE&list=PLirko8T4cEmx5eBb1-9j6T6Gl4aBtZ_5x',
          label: 'Pare de Chutar o CSS - Marco Bruno',
          votes: 0,
          type: LinkType.FREE,
          contentType: LinkContentType.WATCH,
        },
        {
          url: 'https://www.youtube.com/watch?v=hSfSw4kJHxY&t=3s',
          label: 'Primeiros Passos CSS - Dev Lucas Lopes',
          votes: 0,
          type: LinkType.FREE,
          contentType: LinkContentType.WATCH,
        },
        {
          url: 'https://docplayer.com.br/86848053-Exercicios-praticos-html5-css3-profa-flavia-pereira-de-carvalho.html',
          label: 'Exercícios práticos em HTML5 E CSS3 - Profa Flavia Pereira de Carvalho',
          votes: 0,
          type: LinkType.FREE,
          contentType: LinkContentType.PRACTICE,
        },
      ],
    },
    {
      label: 'Fazendo Layouts',
      links: [
        {
          url: 'https://www.youtube.com/watch?v=z1Hp72GVHJk&list=PLx4x_zx8csUhDWtEa-AtDAgSSmLObBVaz&ab_channel=CFBCursos',
          label: 'Curso completo Flexbox - CFB Cursos',
          votes: 0,
          type: LinkType.FREE,
          contentType: LinkContentType.WATCH,
        },
        {
          url: 'https://www.youtube.com/watch?v=z1Hp72GVHJk&list=PLx4x_zx8csUhDWtEa-AtDAgSSmLObBVaz',
          label: 'CSS Flexbox - CFBCursos',
          contentType: LinkContentType.WATCH,
        },
        {
          url: 'https://www.youtube.com/watch?v=P9TrFDNwor4',
          label: 'Tutorial de Flexbox - Matheus Battisti',
          contentType: LinkContentType.WATCH,
        },
        {
          url: 'https://www.youtube.com/watch?v=8VapN6x897U',
          label: 'Aprenda CSS Grid em 30 minutos - Matheus Battisti',
          contentType: LinkContentType.WATCH,
        },
        {
          url: 'https://www.youtube.com/watch?v=E1tR7sYMEN0',
          label: 'Pare de chutar e aprenda float e sua trupe - Marco Bruno',
          contentType: LinkContentType.WATCH,
        },
        {
          url: 'https://www.youtube.com/watch?v=5PS6ku8NzIE',
          label: 'Pare de chutar e aprenda display: inline - Marco Bruno',
          contentType: LinkContentType.WATCH,
        },
        {
          url: 'https://www.youtube.com/watch?v=HWfhwokS_qg',
          label: 'Pare de chutar e aprenda display: block - Marco Bruno',
          contentType: LinkContentType.WATCH,
        },
        {
          url: 'https://www.youtube.com/watch?v=Yj9-N9BEVeM',
          label: 'Pare de chutar e aprenda display: inline-block - Marco Bruno',
          contentType: LinkContentType.WATCH,
        },
        {
          url: 'http://www.regilan.com.br/wp-content/uploads/2018/08/INTEGRADO_ATIVIDADE_PRATICA_LAYOUT_POSICIONAMENTO.pdf',
          label: 'EXERCÍCIOS PRÁTICOS – POSICIONAMENTO E LAYOUT COM CSS',
          contentType: LinkContentType.PRACTICE,
        },
        {
          url: 'http://www.regilan.com.br/wp-content/uploads/2016/08/Exercicios-Praticos-CSS-Estiliza%C3%A7%C3%A3o-de-Menus.pdf',
          label: 'LISTA DE EXERCÍCIOS 05 - CSS: ESTILIZAÇÃO DE MENUS',
          contentType: LinkContentType.PRACTICE,
        },
      ],
    },
    {
      label: 'Design Responsivo e Media Queries',
      links: [
        {
          url: 'https://www.youtube.com/watch?v=3rrX9w0HhZc',
          label: 'O que é Web Design Responsivo? - Chief of Design',
          contentType: LinkContentType.WATCH,
        },
        {
          url: 'https://www.youtube.com/watch?v=H91DhKPjhPk',
          label: 'Responsividade na Prática - Mayk Brito',
          contentType: LinkContentType.WATCH,
        },
      ],
    },
    {
      label: 'Animações',
      links: [
        {
          url: 'https://www.youtube.com/watch?v=eTELLTacg-8',
          label: 'Minicurso Animações CSS - dpw',
          votes: 0,
          type: LinkType.FREE,
          contentType: LinkContentType.WATCH,
        },
        {
          url: 'https://www.w3schools.com/css/css_exercises.asp',
          label: 'Exercícios de CSS',
          votes: 0,
          type: LinkType.FREE,
          contentType: LinkContentType.PRACTICE,
        },
      ],
    },
  ],
};
