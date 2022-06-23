import { m } from "framer-motion";
import { LinkType, RoadmapItem } from "./entity/RoadmapItem";

export const data: RoadmapItem[][] = [
  [
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
        {
          label: "Formulários e Validações",
          links: [
            {
              url: "https://www.youtube.com/watch?v=uvzFT-TCVFM",
              label: "Validação de campos em formulários HTML - Edicursos",
              votes: 0,
              type: LinkType.FREE,
            },
            {
              url: "https://www.youtube.com/watch?v=wwqOJ2o84S4",
              label: "Formulários com HTML e CSS - Rafaella Ballerini",
              votes: 0,
              type: LinkType.FREE,
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
            },
            {
              url: "https://www.youtube.com/watch?v=pOmdL9LzDJg",
              label: "Acessibilidade em páginas web - Matheus Castiglioni",
              votes: 0,
              type: LinkType.FREE,
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
            },
            {
              url: "https://www.youtube.com/watch?v=hSfSw4kJHxY&t=3s",
              label: "Primeiros Passos CSS - Dev Lucas Lopes",
              votes: 0,
              type: LinkType.FREE,
            },
          ],
        },
        {
          label: "Fazendo Layouts",
          links: [
            {
              url: "https://www.youtube.com/watch?v=z1Hp72GVHJk&list=PLx4x_zx8csUhDWtEa-AtDAgSSmLObBVaz",
              label: "CSS Flexbox - CFBCursos",
            },
            {
              url: "https://www.youtube.com/watch?v=P9TrFDNwor4",
              label: "Tutorial de Flexbox - Matheus Battisti",
            },
            {
              url: "https://www.youtube.com/watch?v=8VapN6x897U",
              label: "Aprenda CSS Grid em 30 minutos - Matheus Battisti",
            },
            {
              url: "https://www.youtube.com/watch?v=E1tR7sYMEN0",
              label: "Pare de chutar e aprenda float e sua trupe - Marco Bruno",
            },
            {
              url: "https://www.youtube.com/watch?v=5PS6ku8NzIE",
              label: "Pare de chutar e aprenda displat: inline - Marco Bruno",
            },
            {
              url: "https://www.youtube.com/watch?v=HWfhwokS_qg",
              label: "Pare de chutar e aprenda displat: block - Marco Bruno",
            },
            {
              url: "https://www.youtube.com/watch?v=Yj9-N9BEVeM",
              label:
                "Pare de chutar e aprenda displat: inline-block - Marco Bruno",
            },
          ],
        },
        {
          label: "Design Responsivo e Media Queries",
          links: [
            {
              url: "https://www.youtube.com/watch?v=3rrX9w0HhZc",
              label: "O que é Web Design Responsivo? - Chief of Design",
            },
            {
              url: "https://www.youtube.com/watch?v=H91DhKPjhPk",
              label: "Responsividade na Prática - Mayk Brito",
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
            },
          ],
        },
        {
          label: "Manipulação de DOM",
          links: [
            {
              url: "https://www.youtube.com/watch?v=xoYFoBtev8A",
              label: "Manipulando o DOM na prática - Dogcode",
            },
            {
              url: "https://www.youtube.com/watch?v=aVB67Y31E4A",
              label: "Manipulando a DOM com Vanilla JS - CodarMe",
            },
            {
              url: "https://www.youtube.com/watch?v=UftSB4DaRU4",
              label:
                "Manipulação de DOM com JavaScript, do zero, na prática - Mayk Brito",
            },
          ],
        },
        {
          label: "Fetch API / Ajax (XHR)",
          links: [
            {
              url: "https://www.youtube.com/watch?v=mmCuNbChZ9I",
              label: "Como consumir de uma API usando a Fetch API - Huriel",
            },
            {
              url: "https://www.youtube.com/watch?v=qIGYM4S8x50",
              label:
                "Aprenda Fetch Api de Javascript - Matheus Battisti (Hora de Codar)",
            },
          ],
        },
        { label: "ES6+ e JS Modular", links: [] },
        {
          label:
            "Conceitos de Hoisting, Event Bubbling, Escopo, Prototype, Shadow DOM, strict",
          links: [
            {
              url: "https://www.youtube.com/watch?v=RtfBx90R070&list=PLlAbYrWSYTiPQ1BE8klOtheBC0mtL3hEi",
              label: "Mini-curso JS Moderno (ES6) - Willian Justen",
            },
          ],
        },
      ],
    },
  ],
  [
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
      description:
        "A segurança da Web refere-se às medidas de proteção tomadas pelos desenvolvedores para proteger os aplicativos da Web de ameaças que podem afetar os negócios.",
      children: [
        { label: "HTTPS", links: [] },
        {
          label: "CORS",
          links: [
            {
              url: "https://www.youtube.com/watch?v=GZV-FUdeVwE",
              label:
                "Cross-Origin Resource Sharing em 6 minutos - Codigo Fonte TV",
            },
          ],
        },
        { label: "Content Security Policy", links: [] },
        {
          label: "OWASP",
          links: [
            {
              url: "https://www.youtube.com/watch?v=wC_epzVm780",
              label: "Série OWASP Top 10 - Cássio B. Pereira",
            },
          ],
        },
      ],
    },
  ],
  [
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
            },
          ],
        },
        {
          label: "yarn",
          links: [
            {
              url: "https://www.youtube.com/watch?v=3BPfDo4arHc",
              label: "Yarn - DevPleno",
            },
          ],
        },
      ],
    },
  ],
  [
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
            },
          ],
        },
        {
          label: "PostCSS",
          links: [
            {
              url: "https://blog.umbler.com/br/introducao-ao-postcss/",
              label: "Introdução ao PostCSS - Umbler Blog",
            },
          ],
        },
        {
          label: "Less",
          links: [
            {
              url: "http://lesscss.loopinfinito.com.br",
              label: "LessCSS - Loop Infinito",
            },
          ],
        },
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
      description:
        "Um linter é uma ferramenta usada para analisar código e descobrir bugs, erros de sintaxe, inconsistências estilísticas e construções suspeitas. Os linters populares para JavaScript incluem ESLint, JSLint e JSHint.",
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
            },
          ],
        },
        {
          label: "Redux",
          links: [
            {
              url: "https://www.youtube.com/watch?v=Bg0xlUYAp0c",
              label: "Aprenda Redux em 5 minutos - Flipix",
            },
            {
              url: "https://www.youtube.com/watch?v=1xbFstDfUXs",
              label:
                "Você acha Redux Difícil por causa disso - Programador a Bordo",
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
            },
          ],
        },
        {
          label: "RxJS",
          links: [
            {
              url: "https://www.youtube.com/watch?v=DBHpS2CqGZs",
              label: "Programação Reativa com RxJS Parte 1 - Cod3r Cursos",
            },
            {
              url: "https://www.youtube.com/watch?v=KXliXSjxC6k",
              label: "Programação Reativa com RxJS Parte 2 - Cod3r Cursos",
            },
          ],
        },
        {
          label: "NgRx",
          links: [
            {
              url: "https://www.youtube.com/watch?v=yCac7PRG6R4",
              label: "NgRx com Angular - HypeIT Brasil",
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
            },
          ],
        },
        { label: "VueX", links: [] },
      ],
    },
  ],

  [
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
            },
          ],
        },
        { label: "Módulos CSS", links: [] },
        { label: "Styled JSX", links: [] },
        { label: "Emotion", links: [] },
      ],
    },
  ],

  [
    {
      label: "Web Components",
      children: [
        { label: "Templates HTML", links: [] },
        { label: "Custom Elements", links: [] },
        { label: "Shadow DOM", links: [] },
      ],
    },
  ],

  [
    {
      label: "Frameworks CSS",
      description:
        "Uma estrutura CSS fornece ao usuário uma folha de estilo CSS totalmente funcional, permitindo que eles criem uma página da Web simplesmente codificando o HTML com classes, estrutura e IDs apropriados. As classes para recursos populares do site, como rodapé, controle deslizante, barra de navegação, menu de hambúrguer, layouts baseados em colunas e assim por diante, já estão incluídas na estrutura.",
      children: [
        { label: "Bootstrap", links: [] },
        { label: "Bulma", links: [] },
        {
          label: "Tailwind CSS",
          links: [
            {
              url: "https://www.youtube.com/watch?v=1eLaBow7Zbo&list=PLcoYAcR89n-r1m-tMfV4qndrRWpT_rb9u",
              label: "Curso Gratuito Tailwind CSS - Tiago Matos",
              votes: 0,
              type: LinkType.FREE,
            },
          ],
        },
        {
          label: "Chakra UI",
          links: [
            {
              url: "https://www.youtube.com/watch?v=RjZOUCIwo4M",
              label: "Configurando Chakra UI no React! - Huriel",
            },
          ],
        },
        { label: "Material UI", links: [] },
        { label: "Radix UI", links: [] },
      ],
    },
  ],

  [
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

  [
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
            },
          ],
        },
        { label: "Flow", links: [] },
      ],
    },
  ],

  [
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
  [
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
  [
    {
      label: "GraphQL",
      description:
        "GraphQL é uma linguagem de consulta para APIs e um tempo de execução para atender a essas consultas com seus dados existentes. O GraphQL fornece uma descrição completa e compreensível dos dados em sua API, oferece aos clientes o poder de solicitar exatamente o que eles precisam e nada mais, facilita a evolução de APIs ao longo do tempo e permite ferramentas de desenvolvedor poderosas.",
      children: [
        { label: "Apollo", links: [] },
        { label: "Relay Modern", links: [] },
      ],
    },
  ],
  [
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
            },
          ],
        },
        { label: "GatsbyJS", links: [] },
        { label: "Nuxt.js", links: [] },
        { label: "Vuepress", links: [] },
        { label: "Jekyll", links: [] },
        { label: "Hugo", links: [] },
        { label: "Gridsome", links: [] },
        { label: "Eleventy", links: [] },
      ],
    },
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
    },
  ],
  [
    {
      label: "Aplicações Desktop",
      children: [{ label: "Electron", links: [] }],
    },
  ],
  [
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
            },
          ],
        },
      ],
    },
  ],
];
