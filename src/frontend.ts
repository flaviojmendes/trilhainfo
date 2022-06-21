import { LinkType, RoadmapItem } from "./entity/RoadmapItem";

export const data: RoadmapItem[][] = [
  [
    {
      label: "HTML",
      children: [
        {
          label: "O básico",
          links: [
            {
              url: "https://www.youtube.com/watch?v=CZPa3-1BKnY&list=PLirko8T4cEmzrH3jIJi7R7ufeqcpXYaLa",
              label: "Marco Bruno HTML e CSS Feliz",
              votes: 0,
              type: LinkType.FREE,
            },
            {
              url: "https://www.youtube.com/watch?v=IOfxZFgUjt8",
              label: "HTML Básico Parte 1 - Dev Lucas Lopes",
              votes: 0,
              type: LinkType.FREE,
            },
            {
              url: "https://www.youtube.com/watch?v=jU7gyfsQx9Y",
              label: "HTML Básico Parte 2 - Dev Lucas Lopes",
              votes: 0,
              type: LinkType.FREE,
            },
          ],
        },
        { label: "Formulários e Validações", links: [] },
        { label: "Convenções e Melhores Práticas", links: [] },
        { label: "Acessibilidade", links: [] },
      ],
    },
    {
      label: "CSS",
      children: [
        { label: "O básico", links: [{url: "https://www.youtube.com/watch?v=5PS6ku8NzIE&list=PLirko8T4cEmx5eBb1-9j6T6Gl4aBtZ_5x", label: 'Pare de Chutar o CSS - Marco Bruno', votes: 0, type: LinkType.FREE }, {url: 'https://www.youtube.com/watch?v=hSfSw4kJHxY&t=3s', label: 'Primeiros Passos CSS - Dev Lucas Lopes', votes:0, type: LinkType.FREE}] },
        { label: "Fazendo Layouts", links: [] },
        { label: "Design Responsivo e Media Queries", links: [] },
      ],
    },
    {
      label: "Javascript",
      children: [
        { label: "Sintaxe e o Básico", links: [{url: 'https://www.youtube.com/watch?v=bXim6-jCflk&list=PLz_pSrQW_5xJexe74z50HXLCkYDKfks8S', label: 'Desafios Javascript - Fabio Bergmann', votes: 0, type: LinkType.FREE}] },
        { label: "Manipulação de DOM", links: [] },
        { label: "Fetch API / Ajax (XHR)", links: [] },
        { label: "ES6+ e JS Modular", links: [] },
        {
          label:
            "Conceitos de Hoisting, Event Bubbling, Escopo, Prototype, Shadow DOM, strict",
          links: [],
        },
      ],
    },
  ],
  [
    {
      label: "Controle de Versão",
      children: [
        {
          label: "Conceitos de Git",
          links: [
            {
              url: "https://www.youtube.com/watch?v=IBClN6VpJDw&list=PLlAbYrWSYTiPA2iEiQ2PF_A9j__C4hi0A",
              label: "Git e Github para Iniciantes - Willian Justen",
              type: LinkType.FREE,
              votes: 0,
            },
          ],
        },
        {
          label: "Serviçoes de Hospedagem de Git",
          children: [
            { label: "Github", links: [] },
            { label: "Gitlab", links: [] },
            { label: "Bitbucket", links: [] },
          ],
        },
      ],
    },
  ],
  [
    {
      label: "Segurança",
      children: [
        { label: "HTTPS", links: [] },
        { label: "CORS", links: [] },
        { label: "Content Security Policy", links: [] },
        { label: "OWASP", links: [] },
      ],
    },
  ],
  [
    {
      label: "Gerenciadores de Pacote",
      children: [
        { label: "npm", links: [] },
        { label: "yarn", links: [] },
      ],
    },
  ],
  [
    {
      label: "Pre Processadores CSS",
      children: [
        { label: "Sass", links: [] },
        { label: "PostCSS", links: [] },
        { label: "Less", links: [] },
      ],
    },
  ],
  [
    {
      label: "Task Runners",
      children: [{ label: "npm scripts", links: [] }],
    },
    {
      label: "Module Bundlers",
      children: [
        { label: "Webpack", links: [] },
        { label: "esbuild", links: [] },
        { label: "Rollup", links: [] },
        { label: "Parcel", links: [] },
        { label: "Vite", links: [] },
      ],
    },
    {
      label: "Formatadores e Linters",
      children: [
        { label: "Prettier", links: [] },
        { label: "ESLint", links: [] },
        { label: "StandardJS", links: [] },
      ],
    },
  ],
  [
    {
      label: "React",
      children: [
        { label: "O Básico", links: [{url: 'https://www.youtube.com/watch?v=aUDgoPsrPNg&list=PLirko8T4cEmzWZVn_ZKQbfDOuCnSZJ4va', label: 'Javascript para React - Marco Bruno', votes: 0, type: LinkType.FREE}] },
        { label: "Redux", links: [] },
      ],
    },
    {
      label: "Angular",
      children: [
        { label: "O Básico", links: [{url: "https://www.youtube.com/playlist?list=PLGxZ4Rq3BOBoSRcKWEdQACbUCNWLczg2G", label: "Curso de Angular - Loiane Groner", votes: 0, type: LinkType.FREE}]},
        { label: "RxJS", links: [] },
        { label: "NgRx", links: [] },
      ],
    },
    {
      label: "Vue.js",
      children: [{ label: "VueX", links: [] }],
    },
  ],

  [
    {
      label: "CSS Moderno",
      children: [
        { label: "Styled Components", links: [] },
        { label: "Módulos CSS", links: [] },
        { label: "Styled JSX", links: [] },
        { label: "Emotion", links: [] },
      ],
    }
  ],

  [
    {
      label: "Web Components",
      children: [
        { label: "Templates HTML", links: [] },
        { label: "Custom Elements", links: [] },
        { label: "Shadow DOM", links: [] },
      ],
    }
  ],

  [
    {
      label: "Frameworks CSS",
      children: [
        { label: "Bootstrap", links: [] },
        { label: "Bulma", links: [] },
        { label: "Tailwind CSS", links: [{url: 'https://www.youtube.com/watch?v=1eLaBow7Zbo&list=PLcoYAcR89n-r1m-tMfV4qndrRWpT_rb9u', label: 'Curso Gratuito Tailwind CSS - Tiago Matos', votes: 0, type: LinkType.FREE}] },
        { label: "Chakra UI", links: [] },
        { label: "Material UI", links: [] },
        { label: "Radix UI", links: [] },
      ],
    }
  ],

  [
    {
      label: "Testes",
      children: [
        { label: "Jest", links: [] },
        { label: "react-testing-library", links: [] },
        { label: "Cypress", links: [] },
        { label: "Enzyme", links: [] },
      ],
    }
  ],

  [
    {
      label: "Type Checkers",
      children: [
        { label: "Typescript", links: [{url: "https://www.youtube.com/playlist?list=PLlAbYrWSYTiPanrzauGa7vMuve7_vnXG_", label: 'Mini Curso de Typescript - Willian Justen', votes: 0, type: LinkType.FREE}] },
        { label: "Flow", links: [] }
      ],
    }
  ],

  [
    {
      label: "PWA (Progressive Web Apps)",
      children: [
        { label: "Storage", links: [] },
        { label: "Web Sockets", links: [] },
        { label: "Service Workers", links: [] },
        { label: "Localização", links: [] },
        { label: "Notificações", links: [] },
        { label: "Orientação", links: [] },
        { label: "Pagamentos", links: [] },
        { label: "Credenciais", links: [] }
      ],
    }
  ],
  [
    {
      label: "SSR (Renderização no Servidor)",
      children: [
        { label: "React - Next.js", links: [] },
        { label: "React - After.js", links: [] },
        { label: "Angular - Universal", links: [] },
        { label: "Vue.js - Nuxt.js", links: [] },
      ],
    }
  ],
  [
    {
      label: "GraphQL",
      children: [
        { label: "Apollo", links: [] },
        { label: "Relay Modern", links: [] },
      ],
    }
  ],
  [
    {
      label: "Geradores de Sites Estáticos",
      children: [
        { label: "Next.js", links: [{url: 'https://www.youtube.com/playlist?list=PLkFMdTTdI9c3m6R-JinONx3ha3CsBy2hB', label: 'Next.js - Lucas Nhimi', votes: 0, type: LinkType.FREE}] },
        { label: "GatsbyJS", links: [] },
        { label: "Nuxt.js", links: [] },
        { label: "Vuepress", links: [] },
        { label: "Jekyll", links: [] },
        { label: "Hugo", links: [] },
        { label: "Gridsome", links: [] },
        { label: "Eleventy", links: [] },
      ],
    }
  ],
  [
    {
      label: "Aplicações Mobile",
      children: [
        { label: "React Native", links: [] },
        { label: "NativeScript", links: [] },
        { label: "Flutter", links: [] },
        { label: "Ionic", links: [] },
      ],
    }
  ],
  [
    {
      label: "Aplicações Desktop",
      children: [
        { label: "Electron", links: [] },
      ],
    }
  ],
  [
    {
      label: "Web Assembly",
      children: [
        { label: "O básico", links: [] },
      ],
    }
  ],
];
