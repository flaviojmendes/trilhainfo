import {
  Level,
  LinkType,
  LinkContentType,
  RoadmapItem,
} from "../entity/RoadmapItem";

export const data: Level[] = [
  {
    label: "Comece por aqui!",
    description:
      "Esse é o básico. Aprendendo esses conceitos você poderá começar a desenvolver um projeto.",
    items: [
      {
        label: "HTML",
        description:
          "HTML significa HyperText Markup Language. Ele é usado no frontend e fornece a estrutura da página da Web que você pode estilizar usando CSS e tornar interativa usando JavaScript.",
        children: [
          {
            label: "O básico",
            links: [
              {
                url: "https://www.youtube.com/watch?v=CZPa3-1BKnY&list=PLirko8T4cEmzrH3jIJi7R7ufeqcpXYaLa",
                label: "Marco Bruno HTML e CSS Feliz",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://www.youtube.com/watch?v=IOfxZFgUjt8",
                label: "HTML Básico Parte 1 - Dev Lucas Lopes",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://www.youtube.com/watch?v=jU7gyfsQx9Y",
                label: "HTML Básico Parte 2 - Dev Lucas Lopes",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://www.youtube.com/watch?v=Ejkb_YpuHWs&list=PLHz_AreHm4dkZ9-atkcmcBaMZdmLHft8n",
                label: "Curso Completo de HTML e CSS - Gustavo Guanabara",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              }
            ],
          },
          {
            label: "Formulários e Validações",
            links: [
              {
                url: "https://www.youtube.com/watch?v=uvzFT-TCVFM",
                label: "Validação de campos em formulários HTML - Edicursos",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://www.youtube.com/watch?v=wwqOJ2o84S4",
                label: "Formulários com HTML e CSS - Rafaella Ballerini",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: "Convenções e Melhores Práticas",
            links: [
              {
                url: "https://www.youtube.com/watch?v=TBplwrsUj4s",
                label:
                  "Boas práticas para escrever um HTML profissional - Mayk Brito",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: "Acessibilidade",
            links: [
              {
                url: "https://www.youtube.com/watch?v=ZfUwFCCCDh0",
                label:
                  "HTML e Acessibilidade. 6 erros comuns que até devs mais experientes podem cometer - Ser Frontend",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://www.youtube.com/watch?v=pOmdL9LzDJg",
                label: "Acessibilidade em páginas web - Matheus Castiglioni",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: "CSS",
        description:
          "CSS ou Cascading Style Sheets é a linguagem usada para estilizar o frontend de qualquer site. CSS é uma tecnologia fundamental da World Wide Web, juntamente com HTML e JavaScript.",
        children: [
          {
            label: "O básico",
            links: [
              {
                url: "https://www.youtube.com/watch?v=5PS6ku8NzIE&list=PLirko8T4cEmx5eBb1-9j6T6Gl4aBtZ_5x",
                label: "Pare de Chutar o CSS - Marco Bruno",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://www.youtube.com/watch?v=hSfSw4kJHxY&t=3s",
                label: "Primeiros Passos CSS - Dev Lucas Lopes",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: "Fazendo Layouts",
            links: [
              {
                url: "https://www.udemy.com/course/flexbox-guia-completo/",
                label: "Curso completo Flexbox - Udemy",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://www.udemy.com/course/css-grid-layout/",
                label: "Curso completo CSS Grid - Udemy",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://www.youtube.com/watch?v=z1Hp72GVHJk&list=PLx4x_zx8csUhDWtEa-AtDAgSSmLObBVaz",
                label: "CSS Flexbox - CFBCursos",
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://www.youtube.com/watch?v=P9TrFDNwor4",
                label: "Tutorial de Flexbox - Matheus Battisti",
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://www.youtube.com/watch?v=8VapN6x897U",
                label: "Aprenda CSS Grid em 30 minutos - Matheus Battisti",
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://www.youtube.com/watch?v=E1tR7sYMEN0",
                label:
                  "Pare de chutar e aprenda float e sua trupe - Marco Bruno",
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://www.youtube.com/watch?v=5PS6ku8NzIE",
                label: "Pare de chutar e aprenda display: inline - Marco Bruno",
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://www.youtube.com/watch?v=HWfhwokS_qg",
                label: "Pare de chutar e aprenda display: block - Marco Bruno",
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://www.youtube.com/watch?v=Yj9-N9BEVeM",
                label:
                  "Pare de chutar e aprenda display: inline-block - Marco Bruno",
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: "Design Responsivo e Media Queries",
            links: [
              {
                url: "https://www.youtube.com/watch?v=3rrX9w0HhZc",
                label: "O que é Web Design Responsivo? - Chief of Design",
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://www.youtube.com/watch?v=H91DhKPjhPk",
                label: "Responsividade na Prática - Mayk Brito",
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: "Animações",
            links: [
              {
                url: "https://www.youtube.com/watch?v=eTELLTacg-8",
                label: "Minicurso Animações CSS - dpw",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: "Javascript",
        description:
          "JavaScript permite adicionar interatividade às suas páginas. Exemplos comuns que você pode ter visto nos sites são controles deslizantes, interações de clique, pop-ups e assim por diante.",
        children: [
          {
            label: "Sintaxe e o Básico",
            links: [
              {
                url: "https://www.youtube.com/watch?v=bXim6-jCflk&list=PLz_pSrQW_5xJexe74z50HXLCkYDKfks8S",
                label: "Desafios Javascript - Fabio Bergmann",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://www.youtube.com/watch?v=BXqUH86F-kA&list=PLntvgXM11X6pi7mW0O4ZmfUI1xDSIbmTm",
                label: "Curso Grátis de JavaScript Moderno - Gustavo Guanabara",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: "Manipulação de DOM",
            links: [
              {
                url: "https://www.youtube.com/watch?v=xoYFoBtev8A",
                label: "Manipulando o DOM na prática - Dogcode",
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://www.youtube.com/watch?v=aVB67Y31E4A",
                label: "Manipulando a DOM com Vanilla JS - CodarMe",
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://www.youtube.com/watch?v=UftSB4DaRU4",
                label:
                  "Manipulação de DOM com JavaScript, do zero, na prática - Mayk Brito",
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: "Fetch API / Ajax (XHR)",
            links: [
              {
                url: "https://www.youtube.com/watch?v=mmCuNbChZ9I",
                label: "Como consumir de uma API usando a Fetch API - Huriel",
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://www.youtube.com/watch?v=qIGYM4S8x50",
                label:
                  "Aprenda Fetch Api de Javascript - Matheus Battisti (Hora de Codar)",
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: "ES6+ e JS Modular",
            links: [
              {
                url: "https://www.youtube.com/watch?v=-Hc7V1R5bt0",
                label:
                  "Um guia para MÓDULOS JavaScript (ES6 Modules) - Flávio Coutinho",
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://www.youtube.com/watch?v=ihWA4tri1Fc&list=PLDqnSpzNKDvnU__J6Seq2iAhCaRr7nhMP",
                label: "Javascript ES6+ (playlist) - Angelo Luz",
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label:
              "Conceitos de Hoisting, Event Bubbling, Escopo, Prototype, Shadow DOM, strict",
            links: [
              {
                url: "https://www.youtube.com/watch?v=RtfBx90R070&list=PLlAbYrWSYTiPQ1BE8klOtheBC0mtL3hEi",
                label: "Mini-curso JS Moderno (ES6) - Willian Justen",
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
        label: "Controle de Versão",
        description:
          "Os sistemas de controle de versão permitem rastrear alterações em sua base de código/arquivos ao longo do tempo. Eles permitem que você volte para alguma versão anterior da base de código sem problemas. Além disso, eles ajudam na colaboração com pessoas que trabalham no mesmo código – se você já colaborou com outras pessoas em um projeto, você já deve conhecer a frustração de copiar e mesclar as alterações de outra pessoa em sua base de código; sistemas de controle de versão permitem que você se livre desse problema.",
        children: [
          {
            label: "Conceitos de Git",
            links: [
              {
                url: "https://www.youtube.com/watch?v=IBClN6VpJDw&list=PLlAbYrWSYTiPA2iEiQ2PF_A9j__C4hi0A",
                label: "Git e Github para Iniciantes - Willian Justen",
                type: LinkType.FREE,
                votes: 0,
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://www.youtube.com/playlist?list=PLlAbYrWSYTiNqugqFFWWsgONJsmc3eMpg",
                label: "Git e Github na Vida Real - Willian Justen",
                type: LinkType.FREE,
                votes: 0,
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://www.youtube.com/watch?v=6Czd1Yetaac&t=269s",
                label: "Entendendo GIT - Fábio Akita",
                type: LinkType.FREE,
                votes: 0,
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: "Serviços de Hospedagem de Git",
            children: [
              {
                label: "Github",
                links: [
                  {
                    url: "https://www.youtube.com/watch?v=kB5e-gTAl_s",
                    label:
                      "Curso de Git e Github COMPLETO 2021 [Iniciantes] + Desafios + Muita Prática - Dev Aprender",
                    type: LinkType.FREE,
                    votes: 0,
                    contentType: LinkContentType.WATCH,
                  },
                ],
              },
              { label: "Gitlab", links: [] },
              { label: "Bitbucket", links: [] },
            ],
          },
        ],
      },
    ],
  },
  {
    items: [
      {
        label: "Segurança",
        description:
          "A segurança da Web refere-se às medidas de proteção tomadas pelos desenvolvedores para proteger os aplicativos da Web de ameaças que podem afetar os negócios.",
        children: [
          {
            label: "O básico",
            links: [
              {
                url: "https://www.youtube.com/watch?v=KvPtIl-Gz2E&list=PLHz_AreHm4dlaTyjolzCFC6IjLzO8O0XV",
                label: "Curso Básico de Segurança da Informação - Gustavo Guanabara",
                contentType: LinkContentType.WATCH,
              }
            ]
          },
          { label: "HTTPS", links: [] },
          {
            label: "CORS",
            links: [
              {
                url: "https://www.youtube.com/watch?v=GZV-FUdeVwE",
                label:
                  "Cross-Origin Resource Sharing em 6 minutos - Codigo Fonte TV",
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          { label: "Content Security Policy", links: [] },
          {
            label: "Helmet",
            links: [
              {
                url: "https://www.youtube.com/watch?v=Kc2yuSdoxnQ&t=1s",
                label: "Helmet - Node.js & MongoDB Tips 04",
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: "OWASP",
            links: [
              {
                url: "https://www.youtube.com/watch?v=wC_epzVm780",
                label: "Série OWASP Top 10 - Cássio B. Pereira",
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
        label: "Gerenciadores de Pacote",
        description:
          "Os gerenciadores de pacotes permitem que você gerencie as dependências (código externo escrito por você ou outra pessoa) que seu projeto precisa para funcionar corretamente.",
        children: [
          {
            label: "npm",
            links: [
              {
                url: "https://www.youtube.com/watch?v=tFqsmNrWW0M",
                label: "Introdução ao NPM - Fellyph Cintra ",
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: "yarn",
            links: [
              {
                url: "https://www.youtube.com/watch?v=3BPfDo4arHc",
                label: "Yarn - DevPleno",
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
        label: "Pré Processadores CSS",
        description:
          "Os pré-processadores de CSS são linguagens de script que estendem os recursos padrão do CSS. Eles nos permitem usar lógica em nosso código CSS, como variáveis, aninhamento, herança, mixins, funções e operações matemáticas.",
        children: [
          {
            label: "Sass",
            links: [
              {
                url: "https://www.youtube.com/watch?v=Wo5t3uUV8n4",
                label:
                  "Aprenda Sass em 1 hora - Matheus Battisti (Hora de Codar)",
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: "PostCSS",
            links: [
              {
                url: "https://blog.umbler.com/br/introducao-ao-postcss/",
                label: "Introdução ao PostCSS - Umbler Blog",
                contentType: LinkContentType.READ,
              },
            ],
          },
          {
            label: "Less",
            links: [
              {
                url: "http://lesscss.loopinfinito.com.br",
                label: "LessCSS - Loop Infinito",
                contentType: LinkContentType.READ,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: "Ferramentas de Build",
    items: [
      {
        label: "Task Runners",
        children: [{ label: "npm scripts", links: [] }],
      },
      {
        label: "Module Bundlers",
        description:
          "Module Bundlers são ferramentas utilizadas para empacotar todas as dependências e módulos de um projeto em um novo arquivo capaz de ser processado pelo navegador.",
        children: [
          {
            label: "Webpack",
            links: [
              {
                url: "https://www.youtube.com/watch?v=u0euWX6CeIg",
                label: "Webpack - Aprenda de uma vez por todas - Gean Developer",
                contentType: LinkContentType.WATCH,
              },
            ]
          },
          { label: "esbuild", links: [] },
          { label: "Rollup", links: [] },
          { label: "Parcel", links: [] },
          {
            label: "Vite",
            links: [
              {
                url: "https://vitejs.dev/guide/",
                label: "Documentação Oficial",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.READ,
              },
              {
                url: "https://dev.to/lixeletto/vite-js-o-build-tool-que-vai-facilitar-a-sua-vida-15ho",
                label: "Vite.js - O build tool que vai facilitar a sua vida - Camilo Micheletto",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.READ,
              }
            ],
          },
        ],
      },
      {
        label: "Formatadores e Linters",
        description:
          "Um linter é uma ferramenta usada para analisar código e descobrir bugs, erros de sintaxe, inconsistências estilísticas e construções suspeitas. Os linters populares para JavaScript incluem ESLint, JSLint e JSHint.",
        children: [
          {
            label: "Prettier",
            links: [
              {
                url: "https://www.youtube.com/watch?v=uem6ChxImEQ",
                label: "Como instalar o Prettier | CURSO DE HTML E CSS - Front Beginners",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
            ]
          },
          { label: "ESLint", links: [] },
          { label: "StandardJS", links: [] },
        ],
      },
    ],
  },
  {
    label: "Escolha um Framework",
    description:
      "Frameworks são coleções de bibliotecas que auxiliam no desenvolvimento de um produto de software ou site. Os frameworks variam em seus recursos e funções, dependendo do conjunto de tarefas. Eles definem a estrutura, estabelecem as regras e fornecem as ferramentas de desenvolvimento necessárias.",
    items: [
      {
        label: "React",
        description:
          "React é a biblioteca JavaScript front-end mais popular para construir interfaces de usuário. O React também pode renderizar no servidor usando Node e aplicativos móveis de energia usando React Native.",
        children: [
          {
            label: "O Básico",
            links: [
              {
                url: "https://www.youtube.com/watch?v=aUDgoPsrPNg&list=PLirko8T4cEmzWZVn_ZKQbfDOuCnSZJ4va",
                label: "Javascript para React - Marco Bruno",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://www.youtube.com/watch?v=Jxe79XZ9u-Y&list=PL8YNlUoOZkkaCJENGzHFXrRwwjuwEh6nC",
                label: "Aprenda os React Hooks! - Huriel",
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: "React Hooks",
            links: [
              {
                  url: "https://www.youtube.com/watch?v=Jxe79XZ9u-Y",
                  label: "React Hook useState - Huriel",
                  contentType: LinkContentType.WATCH,
              },
              {
                  url: "https://www.youtube.com/watch?v=NPw6OvXh2xk",
                  label: "React Hook useEffect - Huriel",
                  contentType: LinkContentType.WATCH,
              },
              {
                  url: "https://www.youtube.com/watch?v=0UVYtx_C87w&t=1405s",
                  label: "React Hook useContext - Huriel",
                  contentType: LinkContentType.WATCH,
              },
              {
                  url: "https://www.youtube.com/watch?v=kzAMDNBiAzs",
                  label: "React Hook useCallback - Huriel",
                  contentType: LinkContentType.WATCH,
              },
              {
                  url: "https://www.youtube.com/watch?v=eypNvly4s3Q",
                  label: "React Hook useRef - Huriel",
                  contentType: LinkContentType.WATCH,
              },
              {
                  url: "https://www.youtube.com/watch?v=LdYZ-QI0ztM",
                  label: "React Hook useMemo - Huriel",
                  contentType: LinkContentType.WATCH,
              },
              {
                  url: "https://www.youtube.com/watch?v=UCUL2JrjZ3c",
                  label: "React Hook useReducer - Huriel",
                  contentType: LinkContentType.WATCH,
              },
              {
                  url: "https://www.youtube.com/watch?v=2cTAR3EkvQ8",
                  label: "Hooks Personalizados - Huriel",
                  contentType: LinkContentType.WATCH,
              }
            ]
          },
          {
            label: "Redux",
            links: [
              {
                url: "https://www.youtube.com/watch?v=Bg0xlUYAp0c",
                label: "Aprenda Redux em 5 minutos - Flipix",
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://www.youtube.com/watch?v=1xbFstDfUXs",
                label:
                  "Você acha Redux Difícil por causa disso - Programador a Bordo",
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: "Angular",
        description:
          "Angular é uma estrutura de desenvolvimento front-end baseada em componentes construída em TypeScript que inclui uma coleção de bibliotecas bem integradas que incluem recursos como roteamento, gerenciamento de formulários, comunicação cliente-servidor e muito mais.",
        children: [
          {
            label: "O Básico",
            links: [
              {
                url: "https://www.youtube.com/playlist?list=PLGxZ4Rq3BOBoSRcKWEdQACbUCNWLczg2G",
                label: "Curso de Angular - Loiane Groner",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: "RxJS",
            links: [
              {
                url: "https://www.youtube.com/watch?v=DBHpS2CqGZs",
                label: "Programação Reativa com RxJS Parte 1 - Cod3r Cursos",
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://www.youtube.com/watch?v=KXliXSjxC6k",
                label: "Programação Reativa com RxJS Parte 2 - Cod3r Cursos",
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: "NgRx",
            links: [
              {
                url: "https://www.youtube.com/watch?v=yCac7PRG6R4",
                label: "NgRx com Angular - HypeIT Brasil",
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: "Vue.js",
        description:
          "Vue.js é uma estrutura JavaScript de código aberto para criar interfaces de usuário e aplicativos de página única. É focado principalmente no desenvolvimento front-end.",
        children: [
          {
            label: "O Básico",
            links: [
              {
                url: "https://vuejs.org/guide/introduction.html",
                label: "Documentação",
                contentType: LinkContentType.READ,
              },
            ],
          },
          {
            label: "Cursos",
            links: [
              {
                url: "https://treinamento.vuejsbrasil.org/",
                label:
                  "Curso completo e gratuito de Vue 3 do iniciante ao avançado",
                contentType: LinkContentType.VISIT,
              },
            ],
          },
          {
            label: "Pinia",
            links: [
              {
                url: "https://pinia.vuejs.org",
                label: "Documentação oficial",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.READ,
              },
            ],
          },
          {
            label: "VueX",
            links: [
              {
                url: "https://vuex.vuejs.org",
                label: "Documentação oficial",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.READ,
              },
              {
                url: "https://www.youtube.com/watch?v=qq8yJmXys6U",
                label: "Gerenciando estado com Vuex -  Matheus Castiglioni",
                votes: 0,
                type: LinkType.FREE,
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
        label: "CSS Moderno",
        children: [
          {
            label: "Styled Components",
            links: [
              {
                url: "https://www.youtube.com/watch?v=QdfjWRc4ySA",
                label:
                  "Styled Components, por onde começar? - Mario Souto Dev Soutinho",
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          { label: "Módulos CSS", links: [] },
          { label: "Styled JSX", links: [] },
          { label: "Emotion", links: [] },
        ],
      },
    ],
  },

  {
    items: [
      {
        label: "Web Components",
        children: [
          { label: "Templates HTML", links: [] },
          {
            label: "Custom Elements",
            links: [
              {
                url: "https://www.youtube.com/watch?v=fZZAt0Sbz5k",
                label:
                  "Vamos construir um WEB Component e aprender Shadow DOM  - Mayk Brito",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://www.youtube.com/watch?v=hnOpu1Q6qEk&t=1670s",
                label:
                  "Criando Web Components com Stencil JS - Matheus Castiglioni",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: "Shadow DOM",
            links: [
              {
                url: "https://www.youtube.com/watch?v=PMm-VRXz8I8",
                label:
                  "Web Components e Seus Três PRINCIPAIS CONCEITOS: DOM, Shadow DOM e Virtual DOM - Leonardo Leitão",
                votes: 0,
                type: LinkType.FREE,
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
        label: "Frameworks CSS",
        description:
          "Uma estrutura CSS fornece ao usuário uma folha de estilo CSS totalmente funcional, permitindo que eles criem uma página da Web simplesmente codificando o HTML com classes, estrutura e IDs apropriados. As classes para recursos populares do site, como rodapé, controle deslizante, barra de navegação, menu de hambúrguer, layouts baseados em colunas e assim por diante, já estão incluídas na estrutura.",
        children: [
          {
            label: "Bootstrap",
            links: [
              {
                label: "Curso de Bootstrap - Matheus Battisti",
                url: "https://www.youtube.com/playlist?list=PLnDvRpP8Bnexu5wvxogy6N49_S5Xk8Cze",
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: "Bulma",
            links: [
              {
                label:
                  "Criando Apps responsivos com React e Bulma - Escola de Javascript",
                url: "https://www.youtube.com/watch?v=Yxkti4L6-Wk",
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: "Tailwind CSS",
            links: [
              {
                url: "https://www.youtube.com/watch?v=1eLaBow7Zbo&list=PLcoYAcR89n-r1m-tMfV4qndrRWpT_rb9u",
                label: "Curso Gratuito Tailwind CSS - Tiago Matos",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: "Chakra UI",
            links: [
              {
                url: "https://www.youtube.com/watch?v=RjZOUCIwo4M",
                label: "Configurando Chakra UI no React! - Huriel",
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: "Material UI",
            links: [
              {
                url: "https://www.youtube.com/watch?v=uJhqvzK7cWw",
                label: "Conhecendo Material UI no Reactjs - OmniLabs",
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          { label: "Radix UI", links: [] },
        ],
      },
    ],
  },

  {
    items: [
      {
        label: "Testes",
        description:
          "Antes de entregar seu aplicativo aos usuários, você precisa ter certeza de que seu aplicativo atende aos requisitos para os quais foi projetado e que ele não faz coisas estranhas e não intencionais (chamadas de 'bugs'). Para conseguir isso, 'testamos' nossos aplicativos de diferentes maneiras.",
        children: [
          { label: "Jest", links: [] },
          { label: "react-testing-library", links: [] },
          { label: "Cypress", links: [] },
          { label: "Enzyme", links: [] },
        ],
      },
    ],
  },

  {
    items: [
      {
        label: "Type Checkers",
        children: [
          {
            label: "Typescript",
            links: [
              {
                url: "https://www.youtube.com/playlist?list=PLlAbYrWSYTiPanrzauGa7vMuve7_vnXG_",
                label: "Mini Curso de Typescript - Willian Justen",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://www.youtube.com/playlist?list=PLb2HQ45KP0Wsk-p_0c6ImqBAEFEY-LU9H",
                label: "TypeScript - Zero to Hero - Glaucia Lemos",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          { label: "Flow", links: [] },
        ],
      },
    ],
  },

  {
    items: [
      {
        label: "PWA (Progressive Web Apps)",
        description:
          "Progressive Web Apps (PWAs) são sites que são progressivamente aprimorados para funcionar como aplicativos nativos instalados em plataformas de suporte, enquanto funcionam como sites normais em outros navegadores.",
        children: [
          { label: "Storage", links: [] },
          { label: "Web Sockets", links: [] },
          { label: "Service Workers", links: [] },
          { label: "Localização", links: [] },
          { label: "Notificações", links: [] },
          { label: "Orientação", links: [] },
          { label: "Pagamentos", links: [] },
          { label: "Credenciais", links: [] },
        ],
      },
    ],
  },
  {
    items: [
      {
        label: "SSR (Renderização no Servidor)",
        description:
          "SSR é a sigla para Server Side Rendering, ou Renderização do Lado do Servidor. O SSR vem para solucionar um pouco dos problemas das aplicações SPAs, tentando manter suas principais vantagens.",
        children: [
          { label: "React - Next.js", links: [] },
          { label: "React - After.js", links: [] },
          { label: "Angular - Universal", links: [] },
          { label: "Vue.js - Nuxt.js", links: [] },
        ],
      },
    ],
  },
  {
    items: [
      {
        label: "GraphQL",
        description:
          "GraphQL é uma linguagem de consulta para APIs e um tempo de execução para atender a essas consultas com seus dados existentes. O GraphQL fornece uma descrição completa e compreensível dos dados em sua API, oferece aos clientes o poder de solicitar exatamente o que eles precisam e nada mais, facilita a evolução de APIs ao longo do tempo e permite ferramentas de desenvolvedor poderosas.",
        children: [
          {
            label: "Introdução",
            links: [
              {
                label: "Curso Completo de GraphQL Básico - Washington Developer",
                url: "https://www.youtube.com/watch?v=RyqLvFhPNy8&list=PLK5FPzMuRKlyeZYiJNA54j4lpfxHGlz0j&index=1",
                contentType: LinkContentType.WATCH,
              },
            ]
          },
          {
            label: "Apollo",
            links: [
              {
                label: "Pra que serve, conceitos e Hello World - Mateus Silva",
                url: "https://www.youtube.com/watch?v=7RoHxSGVAdU&list=PLPXWI3llyMiK9uw7tfljM2hnQl2qu6CeT",
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          { label: "Relay Modern", links: [] },
        ],
      },
    ],
  },
  {
    items: [
      {
        label: "Geradores de Sites Estáticos",
        description:
          "Um gerador de site estático é uma ferramenta que gera um site HTML estático completo com base em dados brutos e um conjunto de modelos. Essencialmente, um gerador de site estático automatiza a tarefa de codificar páginas HTML individuais e deixa essas páginas prontas para servir aos usuários com antecedência. Como essas páginas HTML são pré-criadas, elas podem ser carregadas muito rapidamente nos navegadores dos usuários.",
        children: [
          {
            label: "Next.js",
            links: [
              {
                url: "https://www.youtube.com/playlist?list=PLkFMdTTdI9c3m6R-JinONx3ha3CsBy2hB",
                label: "Next.js - Lucas Nhimi",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: "GatsbyJS",
            links: [
              {
                label: "GatsbyJS - Thiago Franchin",
                url: "https://www.youtube.com/watch?v=3b2PinXRqYU&list=PLN9uKzK0o3GR3ky2Q6zc2v0Dlej3oOBtT&index=1",
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: "Nuxt.js",
            links: [
              {
                label: "Curso Gratuito de Nuxt.js 2 - Tiago Matos",
                url: "https://www.youtube.com/watch?v=jw6tRUGkpmo&list=PLcoYAcR89n-oU266D5Dy6DT-H8npny_qJ&index=1",
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          { label: "Vuepress", links: [] },
          { label: "Jekyll", links: [] },
          { label: "Hugo", links: [] },
          { label: "Gridsome", links: [] },
          { label: "Eleventy", links: [] },
        ],
      },
    ],
  },
  {
    items: [
      {
        label: "Aplicações Mobile",
        children: [
          {
            label: "React Native",
            links: [
              {
                url: "https://www.youtube.com/playlist?list=PLdDT8if5attEd4sRnZBIkNihR-_tE612_",
                label: "Curso React Native - One Bit Code",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: "React Native",
            links: [
              {
                label: "Primeiros passos no React Native - One Bit Code",
                url: "https://www.youtube.com/watch?v=Y8tP1jbRYHY&list=PLdDT8if5attEd4sRnZBIkNihR-_tE612_&index=1",
                contentType: LinkContentType.WATCH,
              },
              {
                label: "Aprenda React Native - Canal Geek Dev",
                url: "https://www.youtube.com/watch?v=DmUUsTC2YkA&list=PL8fIRnD1uUSnRqz3E2caAWDqbtIFXmNtW",
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          { label: "NativeScript", links: [] },
          {
            label: "Flutter",
            links: [
              {
                label: "Curso de Flutter - Flutterando",
                url: "https://www.youtube.com/watch?v=XeUiJJN0vsE&list=PLlBnICoI-g-d-J57QIz6Tx5xtUDGQdBFB",
                contentType: LinkContentType.WATCH,
              },
              {
                label: "Curso Flutter para Iniciantes - Rodrigo Rahman",
                url: "https://www.youtube.com/watch?v=qt20g3zuVbA&list=PLEXr-WZRgPjwk2v5wYi70WN--pCGvN-9u",
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          { label: "Ionic", links: [] },
        ],
      },
    ],
  },
  {
    items: [
      {
        label: "Aplicações Desktop",
        children: [
          {
            label: "Electron",
            links: [
              {
                label:
                  "Electron: Desenvolvendo uma aplicação desktop com HTML, CSS e JS - WDEV",
                url: "https://www.youtube.com/watch?v=rBeEvzwI11c",
                contentType: LinkContentType.WATCH,
              },
              {
                label:
                  "Criando aplicativo DESKTOP com Electron js 0- Sujeito Programador",
                url: "https://www.youtube.com/watch?v=P1gQ7Ppd48U",
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
        label: "Web Assembly",
        description:
          "WebAssembly é um novo tipo de código que pode ser executado em navegadores da Web modernos — é uma linguagem de baixo nível semelhante a assembly com um formato binário compacto que é executado com desempenho quase nativo e fornece linguagens como C/C++, C# e Rust com um destino de compilação para que possam ser executados na web. Ele também foi projetado para ser executado ao lado do JavaScript, permitindo que ambos trabalhem juntos.",
        children: [
          {
            label: "O básico",
            links: [
              {
                url: "https://developer.mozilla.org/pt-BR/docs/WebAssembly",
                label: "O que é WebAssembly? - Mozilla",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.READ,
              },
            ],
          },
          {
            label: "Blazor",
            links: [
              {
                url: "https://dotnet.microsoft.com/en-us/learn/aspnet/blazor-tutorial/intro",
                label: "Primeiro projeto usando Blazor",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.VISIT,
              },
              {
                url: "https://www.youtube.com/watch?v=6YgtFfzheHY&list=PLJ4k1IC8GhW2v0nCR7K-tZeoHwqfPZs5t",
                label: "Minicurso Blazor",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
    ],
  },
];
