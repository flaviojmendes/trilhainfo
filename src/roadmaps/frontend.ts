import {
  Level,
  LinkType,
  LinkContentType,
  RoadmapItem,
} from "../entity/RoadmapItem";
import { controleDeVersao } from "./items/controleDeVersao";
import { css } from "./items/css";
import { html } from "./items/html";
import { javascript } from "./items/javascript";

export const data: Level[] = [
  {
    label: "Comece por aqui!",
    description:
      "Esse é o básico. Aprendendo esses conceitos você poderá começar a desenvolver um projeto.",
    items: [
      html,
      css,
      javascript,
    ],
  },
  {
    items: [
      controleDeVersao,
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
                label:
                  "Curso Básico de Segurança da Informação - Gustavo Guanabara",
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: "HTTPS",
            links: [
              {
                url: "https://www.techtudo.com.br/noticias/2014/02/o-que-e-https-e-como-ele-pode-proteger-sua-navegacao-na-internet.ghtml",
                label:
                  "O que é HTTPS e como ele pode proteger a sua navegação na Internet",
                contentType: LinkContentType.READ,
              },
            ],
          },
          {
            label: "CORS",
            links: [
              {
                url: "https://www.youtube.com/watch?v=GZV-FUdeVwE",
                label:
                  "Cross-Origin Resource Sharing em 6 minutos - Codigo Fonte TV",
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://www.treinaweb.com.br/blog/o-que-e-cors-e-como-resolver-os-principais-erros",
                label:
                  "O que é CORS e como resolver os principias erros - Gabriel Machado",
                contentType: LinkContentType.READ,
              },
            ],
          },
          {
            label: "Content Security Policy",
            links: [
              {
                url: "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Content-Security-Policy",
                label: "Content-Security-Policy",
                contentType: LinkContentType.READ,
              },
            ],
          },
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
          {
            label: "Cookies",
            links: [
              {
                url: "https://dias.dev/2022-09-27-cookies-e-seguranca/",
                label: "Cookies e Segurança",
                contentType: LinkContentType.READ,
              },
              {
                url: "https://tecnoblog.net/responde/o-que-sao-cookies-como-limpar-ativar-e-bloquear/",
                label:
                  "O que são cookies? [como limpar, ativar e bloquear] - Ronaldo Gogoni",
                contentType: LinkContentType.READ,
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
              {
                url: "https://www.sassmeister.com/",
                label:
                  "Editor e compilador online para praticar a sintaxe do SASS",
                contentType: LinkContentType.PRACTICE,
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
              {
                url: "https://tableless.com.br/comecando-desenvolver-com-o-postcss/",
                label: "Começando desenvolver com o PostCSS",
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
        children: [
          {
            label: "npm scripts",
            links: [
              {
                url: "https://acervolima.com/introducao-aos-scripts-npm/",
                label: "Introdução aos scripts NPM",
                contentType: LinkContentType.READ,
              },
            ],
          },
        ],
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
                url: "https://www.youtube.com/watch?v=sU3W2ZTt-8I",
                label:
                  "Webpack - Curso rápido para iniciantes - Ricardo Sanches",
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://www.youtube.com/watch?v=u0euWX6CeIg",
                label:
                  "Webpack - Aprenda de uma vez por todas - Gean Developer",
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: "esbuild",
            links: [
              {
                url: "https://blog.logrocket.com/getting-started-esbuild/",
                label: "Getting started with esbuild - LogRocket",
                contentType: LinkContentType.READ,
              },
            ],
          },
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
                label:
                  "Vite.js - O build tool que vai facilitar a sua vida - Camilo Micheletto",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.READ,
              },
              {
                url: "https://eduardo-diogo.medium.com/vite-js-killer-na-cria%C3%A7%C3%A3o-de-frontend-9b083f8a77e6",
                label:
                  "ViteJS, O Killer na criação de frontend - Eduardo Garcia",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.READ,
              },
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
                label:
                  "Como instalar o Prettier | CURSO DE HTML E CSS - Front Beginners",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://blog.cod3r.com.br/configurando-a-extensao-prettier-no-visual-studio-code/",
                label: "Configurando a extensão Prettier no Visual Studio Code",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.READ,
              },
            ],
          },
          {
            label: "ESLint",
            links: [
              {
                url: "https://blog.cod3r.com.br/organizacao-e-padronizacao-com-eslint/",
                label: "Organização e padronização com ESLint",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.READ,
              },
              {
                url: "https://www.youtube.com/watch?v=i26sZrPj2zY",
                label: "Eslint para iniciantes - Mayk Brito",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
            ],
          },
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
                url: "https://reactjs.org/docs/state-and-lifecycle.html",
                label: "Aprenda State e Lifecycle - Marco Bruno",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.READ,
              },
              {
                url: "https://www.youtube.com/watch?v=Jxe79XZ9u-Y&list=PL8YNlUoOZkkaCJENGzHFXrRwwjuwEh6nC",
                label: "Aprenda os React Hooks! - Huriel",
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://pt-br.reactjs.org/tutorial/tutorial.html",
                label: "Tutorial: Introdução ao React",
                contentType: LinkContentType.READ,
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
              },
              {
                url: "https://www.w3schools.com/react/react_exercises.asp",
                label: "Exercícios de React",
                contentType: LinkContentType.PRACTICE,
              },
            ],
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
              {
                url: "https://br.bitdegree.org/tutoriais/react-js/",
                label:
                  "Uma lista extensa de perguntas sobre React JS... - Laura M.",
                contentType: LinkContentType.PRACTICE,
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
              {
                url: "https://www.devmedia.com.br/implementando-servicos-com-angularjs/32715",
                label: "Implementando serviços com AngularJS",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.READ,
              },
              {
                url: "https://www.w3schools.com/angular/angular_examples.asp",
                label: "Exemplos de AngularJS",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.PRACTICE,
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
              {
                url: "https://www.devmedia.com.br/vue-js-tutorial/38042",
                label: "Vue.js Tutorial",
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
              {
                url: "https://www.youtube.com/watch?v=4DFrzPTif2E",
                label: "Gerenciando estado com Pinia - Pablo Codes",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
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
          {
            label: "Módulos CSS",
            links: [
              {
                url: "https://medium.com/tableless/css-modules-m%C3%B3dulos-no-seu-css-hoje-cb81c4d51e16",
                label:
                  "CSS Modules: Módulos no seu CSS hoje - Pedro Tacla Yamada",
                contentType: LinkContentType.READ,
              },
            ],
          },
          { label: "Styled JSX", links: [] },
          {
            label: "Emotion",
            links: [
              {
                url: "https://emotion.sh/docs/introduction",
                label: "Introdução ao Emotion (documetação em inglês)",
                contentType: LinkContentType.READ,
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
        label: "Web Components",
        children: [
          {
            label: "Templates HTML",
            links: [
              {
                url: "https://rockcontent.com/br/blog/template/",
                label:
                  "Template: o que é, para que serve e como aplicar no site da sua empresa - Ivan de Souza",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.READ,
              },
            ],
          },
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
              {
                label: "Bootstrap 5 exercícios",
                url: "https://www.w3schools.com/bootstrap5/bootstrap_exercises.php",
                contentType: LinkContentType.PRACTICE,
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
              {
                label: "Bulma | Introdução",
                url: "https://acervolima.com/bulma-introducao/",
                contentType: LinkContentType.READ,
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
              {
                url: "https://www.codigofonte.com.br/artigos/por-que-usar-tailwind-css",
                label: "Por que usar Tailwind CSS",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.READ,
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
              {
                url: " https://medium.com/igor-js/chakra-ui-facilitando-o-front-end-javascript-aabcade75f09",
                label:
                  "Chakra UI — Facilidade no front-end JavaScript - Igor Lourenço",
                contentType: LinkContentType.READ,
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
              {
                url: "https://blog.rocketseat.com.br/react-material-ui/",
                label: "Integração do Material UI com ReactJS",
                contentType: LinkContentType.READ,
              },
            ],
          },
          {
            label: "Radix UI",
            links: [
              {
                url: "https://www.radix-ui.com/docs/primitives/overview/introduction",
                label: "Documentação",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.READ,
              },
              {
                url: "https://www.youtube.com/watch?v=c_hrvOaZRNo",
                label:
                  "Aulão de Stitches e Radix UI - dpw e Pedro Duarte (Radix UI Co-creator)",
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
        label: "Testes",
        description:
          "Antes de entregar seu aplicativo aos usuários, você precisa ter certeza de que seu aplicativo atende aos requisitos para os quais foi projetado e que ele não faz coisas estranhas e não intencionais (chamadas de 'bugs'). Para conseguir isso, 'testamos' nossos aplicativos de diferentes maneiras.",
        children: [
          {
            label: "Jest",
            links: [
              {
                url: "https://jestjs.io/pt-BR/docs/getting-started",
                label: "Documentação",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.READ,
              },
              {
                url: "https://www.devmedia.com.br/teste-unitario-com-jest/41234",
                label: "Teste unitário com Jest",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.READ,
              },
            ],
          },
          {
            label: "react-testing-library",
            links: [
              {
                url: "https://testing-library.com/docs/react-testing-library/intro",
                label: "Documentação",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.READ,
              },
              {
                url: "https://blog.rocketseat.com.br/introducao-a-testing-library-testando-componentes-react/",
                label:
                  "Introdução à Testing Library — Testando componentes React",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.READ,
              },
            ],
          },
          {
            label: "Cypress",
            links: [
              {
                url: "https://docs.cypress.io/guides/getting-started/installing-cypress",
                label: "Documentação",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.READ,
              },
              {
                url: "https://www.youtube.com/playlist?list=PLnUo-Rbc3jjyx5BVnG8MB7vNd5ecu2yP1",
                label: "Minicurso de Cypress - Agilizei",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://softdesign.com.br/blog/cypress_passo_a_passo_para_comecar_a_usar/",
                label:
                  "Cypress: passo a passo para começar a usar - Ederson Meira dos Santos",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.READ,
              },
            ],
          },
          {
            label: "Enzyme",
            links: [
              {
                url: "https://enzymejs.github.io/enzyme/",
                label: "Documentação",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.READ,
              },
              {
                url: "https://medium.com/aurum-tech/testes-de-componentes-react-com-jest-e-enzyme-be3921fae8b1",
                label: "Testes de componentes React com Jest e Enzyme",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.READ,
              },
            ],
          },
          {
            label: "Playwright",
            links: [
              {
                url: "https://playwright.dev/",
                label: "Documentação",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.READ,
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
              {
                url: "https://www.w3schools.com/typescript/typescript_exercises.php",
                label: "Exercícios TypeScript (em inglês)",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.PRACTICE,
              },
            ],
          },
          {
            label: "Flow",
            links: [
              {
                url: "https://pt-br.reactjs.org/docs/static-type-checking.html",
                label: "Verificando Tipos Estáticos",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.READ,
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
        label: "PWA (Progressive Web Apps)",
        description:
          "Progressive Web Apps (PWAs) são sites que são progressivamente aprimorados para funcionar como aplicativos nativos instalados em plataformas de suporte, enquanto funcionam como sites normais em outros navegadores.",
        children: [
          { label: "Storage", links: [] },
          {
            label: "Web Sockets",
            links: [
              {
                url: "https://developer.mozilla.org/pt-BR/docs/Web/API/WebSockets_API",
                label: "Documentação",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.READ,
              },
            ],
          },
          {
            label: "Service Workers",
            links: [
              {
                url: "https://womakerscode.gitbook.io/pwa-workshop/2.-instalando-o-service-worker",
                label: "Instalando o Service Worker",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.READ,
              },
            ],
          },
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
          {
            label: "React - Next.js",
            links: [
              {
                url: "https://www.youtube.com/watch?v=PHKaJlAeNLk",
                label:
                  "Next.JS e React: Curso Intensivo - Masterclass #01 [2021] - Cod3r Cursos",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          { label: "React - After.js", links: [] },
          { label: "Angular - Universal", links: [] },
          {
            label: "Vue.js - Nuxt.js",
            links: [
              {
                url: "https://www.youtube.com/watch?v=jw6tRUGkpmo",
                label: "Curso gratuito de Nuxt.js 2 - Tiago Matos",
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
        label: "GraphQL",
        description:
          "GraphQL é uma linguagem de consulta para APIs e um tempo de execução para atender a essas consultas com seus dados existentes. O GraphQL fornece uma descrição completa e compreensível dos dados em sua API, oferece aos clientes o poder de solicitar exatamente o que eles precisam e nada mais, facilita a evolução de APIs ao longo do tempo e permite ferramentas de desenvolvedor poderosas.",
        children: [
          {
            label: "Introdução",
            links: [
              {
                label:
                  "Curso Completo de GraphQL Básico - Washington Developer",
                url: "https://www.youtube.com/watch?v=RyqLvFhPNy8&list=PLK5FPzMuRKlyeZYiJNA54j4lpfxHGlz0j&index=1",
                contentType: LinkContentType.WATCH,
              },
            ],
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
          {
            label: "Relay Modern",
            links: [
              {
                url: "https://relay.dev/",
                label: "Documentação",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.READ,
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
          {
            label: "Vuepress",
            links: [
              {
                label: "Conheça o Vuepress",
                url: "https://vuejsbrasil.org/conheca-o-vuepress/",
                contentType: LinkContentType.READ,
              },
            ],
          },
          { label: "Jekyll", links: [] },
          { label: "Hugo", links: [] },
          {
            label: "Gridsome",
            links: [
              {
                label: "Introdução ao Gridsome",
                url: "https://br.atsit.in/archives/24295",
                contentType: LinkContentType.READ,
              },
            ],
          },
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
          {
            label: "NativeScript",
            links: [
              {
                label: "Documentação",
                url: "https://nativescript-vue.org/pt-br/docs/introduction/",
                contentType: LinkContentType.READ,
              },
            ],
          },
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
          {
            label: "Ionic",
            links: [
              {
                label: "Introdução ao Ionic",
                url: "https://www.devmedia.com.br/guia/ionic/38372",
                contentType: LinkContentType.READ,
              },
              {
                label: "Ionic // Dicionário do Programador",
                url: "https://www.youtube.com/watch?v=5QqvO_9LPzQ",
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
              {
                label: "Documentação",
                url: "https://www.electronjs.org/pt/docs/latest",
                contentType: LinkContentType.READ,
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
              {
                url: "https://www.youtube.com/watch?v=tCUd82UAVNg",
                label: "WebAssembly // Dicionário do Programador",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
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
  {
    items: [
      {
        label: "SEO",
        description:
          "SEO (Search Engine Optmization) é um conjunto de boas práticas adotadas tanto pelos desenvolvedores quanto por aqueles que inserem algum tipo de conteúdo no site para que este seja listado em melhores posições nos mecanismos de pesquisa (Google, Bing, Baidu, etc).",
        children: [
          {
            label: "O básico",
            links: [
              {
                url: "https://developer.mozilla.org/pt-BR/docs/Glossary/SEO",
                label: "O que é SEO? - Mozilla",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.READ,
              },
              {
                url: "https://university.br.rockcontent.com/courses/search-engine-optimization-seo-cert",
                label: "Curso de Introdução ao SEO - Rock University",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://dev.to/gabrielgomeso/introducao-ao-seo-seo-00-2bh6",
                label: "Introdução ao SEO - Gabriel Gomes",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.READ,
              },
              {
                url: "https://www.youtube.com/watch?v=v8LWhWVW9Ek",
                label:
                  "Guia SEO Completo (Básico ao Avançado) para Desenvolvedor - Rafael Perozin",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.WATCH,
              },
              {
                url: "https://developers.google.com/search",
                label: "Central de Pesquisa - Google",
                votes: 0,
                type: LinkType.FREE,
                contentType: LinkContentType.READ,
              },
            ],
          },
        ],
      },
    ],
  },
];
