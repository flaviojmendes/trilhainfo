import { Level, LinkContentType } from '../entity/RoadmapModel';

export const data: Level[] = [
  { items: [{ label: 'Ande o Roadmap de Frontend até React em Frameworks' }] },
  {
    label: 'Fundamentos',
    description:
      'Tenha em mente aprender esses fundamentos essenciais para escrever uma aplicação em React',
    items: [
      {
        label: 'Create React App',
        children: [
          {
            label: 'O básico',
            links: [
              {
                label:
                  'Create-react-app: A forma mais simples de iniciar um novo projeto em ReactJS - DevPleno',
                url: 'https://www.youtube.com/watch?v=jNJmp7iic8c',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: 'JSX/TSX',
        children: [
          {
            label: 'O básico',
            links: [
              {
                label: 'O que é JSX (Série React) - On Bit Code',
                url: 'https://www.youtube.com/watch?v=OHyMmeLfBLE',
                contentType: LinkContentType.WATCH,
              },
              {
                label: 'Entendendo o JSX - Matheus Battisti',
                url: 'https://www.youtube.com/watch?v=9iKNxnFJY_Q',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: 'Components',
        children: [
          {
            label: 'O básico',
            links: [
              {
                label: 'Criando seu primeiro Component - One Bit Code',
                url: 'https://www.youtube.com/watch?v=AOubJEl02SQ',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: 'Props x States',
        children: [
          {
            label: 'O básico',
            links: [
              {
                label: 'Tutorial de React.JS Iniciante - Components, Props, State',
                url: 'https://www.youtube.com/watch?v=WPYI2CcRX7c',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: 'Conditional Rendering',
        children: [
          {
            label: 'O básico',
            links: [
              {
                label: 'Curso React: Renderização condicional (if)',
                url: 'https://www.youtube.com/watch?v=7ewepbLCvHc',
                contentType: LinkContentType.WATCH,
              },
              {
                label:
                  'Renderização Condicional - Como mostrar e esconder elementos no React - Vinicius Dacal',
                url: 'https://www.youtube.com/watch?v=rF6guBbfTl0',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: 'Ciclo de Vida de Components',
        children: [
          {
            label: 'O básico',
            links: [
              {
                label: 'Ciclo de Vida dos componentes em REACT - CFB Cursos',
                url: 'https://www.youtube.com/watch?v=aeCiOmLlr94',
                contentType: LinkContentType.WATCH,
              },
              {
                label: 'ReactJS Básico 19 - Ciclo de vida (Lifecycle) - Ralf Lima',
                url: 'https://www.youtube.com/watch?v=TGIKm23yHNM',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: 'Lists e Keys',
        children: [
          {
            label: 'O básico',
            links: [
              {
                label: 'ReactJS Básico 16 - Listas e chaves - Ralf Lima',
                url: 'https://www.youtube.com/watch?v=0GSgG0opMDk',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: 'Composition vs Herança',
        children: [
          {
            label: 'O básico',
            links: [
              {
                label: 'Aprendendo REACT #12 - Composição vs Herança - Guilherme Chinaglia',
                url: 'https://www.youtube.com/watch?v=WwJLnm5PYWw',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: 'Hooks Básicos',
        children: [
          {
            label: 'useState',
            links: [
              {
                label: 'useState na prática - Matheus Battisti',
                url: 'https://www.youtube.com/watch?v=keEUn64Ceig',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: 'useEffect',
            links: [
              {
                label: 'Você sabe MESMO usar o hook useEffect? - AlgaWorks',
                url: 'https://www.youtube.com/watch?v=ndwM9djDRLg',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Conceitos mais Avançados',
    description: 'Componentes em React',
    items: [
      {
        label: 'Hooks',
        children: [
          {
            label: 'O básico',
            links: [
              {
                url: 'https://reactjs.org/docs/hooks-reference.html',
                label: 'Documentação oficial',
                contentType: LinkContentType.READ,
              },
            ],
          },
          {
            label: 'Hooks avançados',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=kzAMDNBiAzs',
                label: 'React Hook useCallback - Huriel',
                contentType: LinkContentType.WATCH,
              },
              {
                url: 'https://www.youtube.com/watch?v=eypNvly4s3Q',
                label: 'React Hook useRef - Huriel',
                contentType: LinkContentType.WATCH,
              },
              {
                url: 'https://www.youtube.com/watch?v=LdYZ-QI0ztM',
                label: 'React Hook useMemo - Huriel',
                contentType: LinkContentType.WATCH,
              },
              {
                url: 'https://www.youtube.com/watch?v=UCUL2JrjZ3c',
                label: 'React Hook useReducer - Huriel',
                contentType: LinkContentType.WATCH,
              },
              {
                url: 'https://www.youtube.com/watch?v=2cTAR3EkvQ8',
                label: 'Hooks Personalizados - Huriel',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: 'Context',
        children: [
          {
            label: 'O básico',
            links: [
              {
                url: 'https://pt-br.reactjs.org/docs/context.html',
                label: 'Documentação oficial',
                contentType: LinkContentType.READ,
              },
              {
                url: 'https://www.youtube.com/watch?v=0UVYtx_C87w&t=1405s',
                label: 'React Hook useContext - Huriel',
                contentType: LinkContentType.WATCH,
              },
              {
                url: 'https://www.youtube.com/watch?v=iHZIZ2wA1U4',
                label: 'O Guia Definitivo de React Context - Dev Samurai',
                contentType: LinkContentType.PRACTICE,
              },
            ],
          },
        ],
      },
      {
        label: 'Refs',
        children: [
          {
            label: 'O básico',
            links: [
              {
                url: 'https://pt-br.reactjs.org/docs/refs-and-the-dom.html',
                label: 'Documentação oficial',
                contentType: LinkContentType.READ,
              },
              {
                url: 'https://www.youtube.com/watch?v=eypNvly4s3Q',
                label: 'Entenda DE VEZ o useRef - Huriel',
                contentType: LinkContentType.WATCH,
              },
              {
                url: 'https://www.youtube.com/watch?v=lA8o3kUl1TA',
                label: 'Utilizando as refs no React de forma avançada - Rocketseat',
                contentType: LinkContentType.PRACTICE,
              },
            ],
          },
        ],
      },
      {
        label: 'Render Props',
        children: [
          {
            label: 'O básico',
            links: [
              {
                url: 'https://pt-br.reactjs.org/docs/render-props.html',
                label: 'Documentação oficial',
                contentType: LinkContentType.READ,
              },
              {
                url: 'https://medium.com/collabcode/react-patterns-come%C3%A7ando-pelo-render-props-e0040ef723ce',
                label:
                  'React Patterns | Começando pelo Render Props - CollabCode (por Caio Alcantara)',
                contentType: LinkContentType.READ,
              },
            ],
          },
        ],
      },
      {
        label: 'High Order Components (HOC)',
        children: [
          {
            label: 'O básico',
            links: [
              {
                url: 'https://pt-br.reactjs.org/docs/higher-order-components.html',
                label: 'Documentação oficial',
                contentType: LinkContentType.READ,
              },
              {
                url: 'https://medium.com/reactbrasil/meu-primeiro-higher-order-component-a376efc654a8',
                label: 'Meu primeiro Higher Order Component - React Brasil (por Rafael Maruta)',
                contentType: LinkContentType.PRACTICE,
              },
            ],
          },
        ],
      },
      {
        label: 'Portals',
        children: [
          {
            label: 'O básico',
            links: [
              {
                label: 'Documentação Oficial',
                url: 'https://reactjs.org/docs/portals.html',
                contentType: LinkContentType.READ,
              },
              {
                label: 'Renderizando componentes com Portals -  Matheus Castiglioni',
                url: 'https://www.youtube.com/watch?v=t2GCO637Oik',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: 'Error Boundaries',
        children: [
          {
            label: 'O básico',
            links: [
              {
                url: 'https://pt-br.reactjs.org/docs/error-boundaries.html',
                label: 'Documentação oficial',
                contentType: LinkContentType.READ,
              },
              {
                url: 'https://www.youtube.com/watch?v=vfwbOgpSvQA',
                label: 'Trate erros de JavaScript no React com Error Boundaries - AlgaWorks',
                contentType: LinkContentType.PRACTICE,
              },
            ],
          },
        ],
      },
      {
        label: 'Arquiteturas',
        children: [
          {
            label: 'Fiber Architecture',
            links: [
              {
                url: 'https://github.com/acdlite/react-fiber-architecture',
                label: 'Visão Geral da Fiber Architecture',
                contentType: LinkContentType.READ,
              },
              {
                url: 'https://raphamorim.io/entendendo-react-fiber',
                label: 'Entendendo React Fiber - Raphael Morim',
                contentType: LinkContentType.READ,
              },
            ],
          },
          {
            label: 'Arquitetura Limpa',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=iUQVZHzqGuc',
                label: 'Clean Architecture no ReactJs - Mango',
                contentType: LinkContentType.WATCH,
              },
              {
                url: 'https://dev.to/rubemfsv/arquitetura-limpa-aplicando-com-react-1eo0',
                label: 'Arquitetura Limpa: Aplicando com React - Rubem Vasconcelos',
                contentType: LinkContentType.READ,
              },
            ],
          },
          {
            label: 'Arquitetura Flux',
            links: [
              {
                url: 'https://facebook.github.io/flux/',
                label: 'Documentação Oficial',
                contentType: LinkContentType.READ,
              },
              {
                url: 'https://tableless.com.br/flux-entenda-como-funciona-arquitetura-flux-com-react/',
                label: 'Flux: Entenda como funciona a arquitetura Flux com React - Tableless',
                contentType: LinkContentType.READ,
              },
              {
                url: 'https://www.youtube.com/watch?v=cgKRHTm7mPk',
                label: 'Masterclass sobre Arquitetura Flux com Redux - Patryck Gratão',
                contentType: LinkContentType.PRACTICE,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Ecossistema',
    items: [
      {
        label: 'Routers',
        children: [
          {
            label: 'React Router',
            links: [
              {
                url: 'https://reactrouter.com/en/main',
                label: 'Documentação Oficial',
                contentType: LinkContentType.READ,
              },
              {
                url: 'https://youtu.be/7b42lVMdEjE',
                label: 'React Router: O guia completo para navegação em aplicativos React',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: 'Reach Router',
            links: [
              {
                url: 'https://reach.tech/router/',
                label: 'Documentação Oficial',
                contentType: LinkContentType.READ,
              },
            ],
          },
          {
            label: 'Tanstack Router',
            links: [
              {
                url: 'https://tanstack.com/router/v1/docs/overview',
                label: 'Documentação Oficial',
                contentType: LinkContentType.READ,
              },
              {
                url: 'https://youtu.be/XDPcqApu-yk',
                label: 'Testando a nova Lib de Roteamento para o ReactJS - dogcode',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      { label: 'SSR', children: [{ label: 'Next.js', links: [] }] },
      {
        label: 'SSG',
        children: [
          { label: 'Next.js', links: [] },
          { label: 'Gatsby', links: [] },
          { label: 'Remix', links: [] },
        ],
      },
      {
        label: 'API Calls',
        children: [
          { label: 'react-query', links: [] },
          { label: 'Apollo', links: [] },
          { label: 'Relay Modern', links: [] },
          { label: 'Axios', links: [] },
          { label: 'Unfetch', links: [] },
          { label: 'superagent', links: [] },
          { label: 'use-http', links: [] },
        ],
      },
      { label: 'Mobile', children: [{ label: 'React Native', links: [] }] },
      {
        label: 'Forms',
        children: [
          { label: 'React Hook Form', links: [] },
          { label: 'Formik', links: [] },
          { label: 'Final Form', links: [] },
        ],
      },
      {
        label: 'Testes',
        children: [
          { label: 'Jest', links: [] },
          { label: 'React Testing Library', links: [] },
          { label: 'Cypress', links: [] },
        ],
      },
      {
        label: 'Gerenciamento de Estado',
        children: [
          { label: 'Context/State', links: [] },
          {
            label: 'Redux',
            links: [
              {
                label: 'Desvendando o Redux na prática - Diego Fernandes',
                url: 'https://www.youtube.com/watch?v=u99tNt3TZf8',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          { label: 'MobX', links: [] },
        ],
      },
      {
        label: 'Styling',
        children: [
          {
            label: 'Chakra UI',
            links: [
              {
                label: 'Conhecendo Chakra UI - OmniLabs',
                url: 'https://www.youtube.com/watch?v=VWKNNZ31GV0',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          { label: 'Material UI', links: [] },
          { label: 'Ant Design', links: [] },
          {
            label: 'Styled Components',
            links: [
              {
                label: 'Utilizando Styled Components - Diego Fernandes',
                url: 'https://www.youtube.com/watch?v=R3S8DEzEn6s',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          { label: 'Emotion', links: [] },
        ],
      },
    ],
  },
  {
    items: [{ label: 'Continue o Roadmap de Frontend após a caixa de Frameworks' }],
  },
];
