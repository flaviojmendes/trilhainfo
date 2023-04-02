import { LinkContentType, LinkType, RoadmapItem } from '../../entity/RoadmapModel';

export const html: RoadmapItem = {
  label: 'HTML',
  certification: 'html',
  description:
    'HTML significa HyperText Markup Language. Ele é usado no frontend e fornece a estrutura da página da Web que você pode estilizar usando CSS e tornar interativa usando JavaScript.',
  children: [
    {
      label: 'O básico',
      links: [
        {
          url: 'https://www.youtube.com/watch?v=CZPa3-1BKnY&list=PLirko8T4cEmzrH3jIJi7R7ufeqcpXYaLa',
          label: 'Marco Bruno HTML e CSS Feliz',
          votes: 0,
          type: LinkType.FREE,
          contentType: LinkContentType.WATCH,
        },
        {
          url: 'https://www.youtube.com/watch?v=Ejkb_YpuHWs&list=PLHz_AreHm4dkZ9-atkcmcBaMZdmLHft8n',
          label: 'Curso Completo de HTML e CSS - Gustavo Guanabara',
          votes: 0,
          type: LinkType.FREE,
          contentType: LinkContentType.WATCH,
        },
        {
          url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Structuring_a_page_of_content',
          label: 'Estruturando uma página de conteúdo (em inglês)',
          votes: 0,
          type: LinkType.FREE,
          contentType: LinkContentType.PRACTICE,
        },
        {
          url: 'https://github.com/gustavoguanabara/html-css/tree/master/aulas-pdf',
          label: 'Aulas PDF do Curso Completo de HTML e CSS - Gustavo Guanabara',
          votes: 0,
          type: LinkType.FREE,
          contentType: LinkContentType.PRACTICE,
        },
        {
          url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Howto',
          label: 'Use CSS para resolver problemas comuns (em inglês)',
          votes: 0,
          type: LinkType.FREE,
          contentType: LinkContentType.PRACTICE,
        },
      ],
    },
    {
      label: 'Formulários e Validações',
      links: [
        {
          url: 'https://www.youtube.com/watch?v=uvzFT-TCVFM',
          label: 'Validação de campos em formulários HTML - Edicursos',
          votes: 0,
          type: LinkType.FREE,
          contentType: LinkContentType.WATCH,
        },
        {
          url: 'https://www.youtube.com/watch?v=wwqOJ2o84S4',
          label: 'Formulários com HTML e CSS - Rafaella Ballerini',
          votes: 0,
          type: LinkType.FREE,
          contentType: LinkContentType.WATCH,
        },
        {
          url: 'https://www.freecodecamp.org/portuguese/news/validacao-de-dados-como-verificar-dados-enviados-pelo-usuario-em-formularios-html-utilizando-javascript/',
          label: 'Validação de dados em formulários HTML - com exemplos',
          votes: 0,
          type: LinkType.FREE,
          contentType: LinkContentType.PRACTICE,
        },
      ],
    },
    {
      label: 'Convenções e Melhores Práticas',
      links: [
        {
          url: 'https://www.youtube.com/watch?v=TBplwrsUj4s',
          label: 'Boas práticas para escrever um HTML profissional - Mayk Brito',
          votes: 0,
          type: LinkType.FREE,
          contentType: LinkContentType.WATCH,
        },
        {
          url: 'https://blog.dankicode.com/melhores-praticas-desenvolvimento-web/#html',
          label: 'Melhores práticas de desenvolvimento Web – HTML e CSS',
          votes: 0,
          type: LinkType.FREE,
          contentType: LinkContentType.READ,
        },
      ],
    },
    {
      label: 'Acessibilidade',
      links: [
        {
          url: 'https://www.youtube.com/watch?v=ZfUwFCCCDh0',
          label:
            'HTML e Acessibilidade. 6 erros comuns que até devs mais experientes podem cometer - Ser Frontend',
          votes: 0,
          type: LinkType.FREE,
          contentType: LinkContentType.WATCH,
        },
        {
          url: 'https://www.youtube.com/watch?v=pOmdL9LzDJg',
          label: 'Acessibilidade em páginas web - Matheus Castiglioni',
          votes: 0,
          type: LinkType.FREE,
          contentType: LinkContentType.WATCH,
        },
        {
          url: 'https://developer.mozilla.org/pt-BR/docs/Learn/Accessibility',
          label: 'Acessibilidade - vários guias',
          votes: 0,
          type: LinkType.FREE,
          contentType: LinkContentType.READ,
        },
        {
          url: 'https://developer.mozilla.org/pt-BR/docs/Learn/Accessibility/Accessibility_troubleshooting',
          label: 'Avaliação: solucionando problemas de acessibilidade',
          votes: 0,
          type: LinkType.FREE,
          contentType: LinkContentType.PRACTICE,
        },
      ],
    },
  ],
};
