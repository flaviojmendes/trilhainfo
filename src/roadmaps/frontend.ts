import { withAILearning } from './aiLearning';
import { Level } from '../entity/RoadmapModel';
import {
  accessibility,
  career,
  css,
  git,
  html,
  javascript,
  project,
  topic,
  typescript,
  web,
} from './curriculum';
import { resources as r } from './resources';

export const data: Level[] = withAILearning(
  [
    {
      id: 'frontend.comece-pela-web',
      label: 'Comece pela web',
      description:
        'Sem pré-requisito de programação. Use um editor, o navegador e o terminal; publique pequenos exercícios desde o início.',
      items: [web, git],
    },
    {
      id: 'frontend.paginas-sem-framework',
      label: 'Páginas sem framework',
      description: 'Aprenda estrutura e layout antes de abstrações. Faça os exercícios em etapas.',
      items: [html, css],
    },
    {
      id: 'frontend.interfaces-que-todos-podem-usar',
      label: 'Interfaces que todos podem usar',
      items: [accessibility],
    },
    project(
      'Página responsiva',
      'Crie um site para um serviço ou iniciativa real com formulário e publique uma demonstração.',
      'A página funciona em celular e desktop, usa HTML semântico, permite navegação por teclado e tem README com decisões e URL publicada.',
      [r.html, r.css, r.pages],
      'frontend.pagina-responsiva',
    ),
    {
      id: 'frontend.interatividade-e-dados',
      label: 'Interatividade e dados',
      items: [javascript],
    },
    project(
      'Aplicação com API',
      'Construa um catálogo com busca, filtros e favoritos usando JavaScript sem framework.',
      'Trate carregamento, falhas e lista vazia. Persista favoritos localmente, valide entradas e explique uma requisição no painel Network.',
      [r.js, r.fetch],
      'frontend.aplicacao-com-api',
    ),
    {
      id: 'frontend.ferramentas-do-projeto',
      label: 'Ferramentas do projeto',
      description:
        'Automatize tarefas que você já entende. Aprenda um gerenciador de pacotes e um build tool.',
      items: [
        typescript,
        topic(
          'Vite, pacotes e qualidade',
          'Use npm, scripts, lockfile, Vite, lint e formatação. Separe variáveis públicas do cliente de segredos do servidor.',
          [r.vite, r.node],
          'Crie scripts de desenvolvimento, build e checagem de tipos. Reproduza a instalação a partir do lockfile.',
          'frontend.vite-pacotes-e-qualidade',
        ),
      ],
    },
    {
      id: 'frontend.escolha-um-framework',
      label: 'Escolha um framework',
      description:
        'React é uma opção de especialização. Vue ou Angular também podem fazer sentido conforme as vagas locais; escolha um para o primeiro projeto.',
      items: [
        topic(
          'Componentes com React',
          'Estude componentes, props, estado, eventos e composição depois de dominar JavaScript. Continue pela trilha React para aprofundar.',
          [r.react, r.reactSetup, r.youtubeHoraDeCodarReact, r.youtubeRocketseatReact],
          'Recrie uma tela do catálogo com componentes pequenos e explique onde o estado deve ficar.',
          'frontend.componentes-com-react',
        ),
        topic(
          'Componentes com Angular',
          'Estude componentes, templates, signals, serviços, injeção de dependência e rotas depois de dominar JavaScript e TypeScript.',
          [r.angular, r.youtubeLoiane],
          'Recrie uma tela do catálogo com componentes standalone e um serviço para os dados; explique onde o estado deve ficar.',
          'frontend.componentes-com-angular',
        ),
        topic(
          'Componentes com Vue',
          'Estude componentes, props, reatividade, eventos e composables depois de dominar JavaScript.',
          [r.vue, r.youtubeTiagoMatos],
          'Recrie uma tela do catálogo com componentes pequenos e explique onde o estado deve ficar.',
          'frontend.componentes-com-vue',
        ),
      ],
    },
    {
      id: 'frontend.qualidade-e-entrega',
      label: 'Qualidade e entrega',
      items: [
        topic(
          'Testes de interface',
          'Teste funções e comportamento de componentes. Cubra o fluxo principal com um teste de ponta a ponta, sem depender de detalhes internos.',
          [r.vitest, r.testingLibrary, r.playwright],
          'Teste busca, uma falha de API e um formulário inválido; rode os testes em CI.',
          'frontend.testes-de-interface',
        ),
        topic(
          'Desempenho e segurança web',
          'Meça carregamento e interação, reduza imagens e JavaScript desnecessários. Entenda XSS, dependências e por que um segredo não pode ficar no frontend.',
          [r.performance, r.security, r.actions],
          'Compare uma medição antes e depois da otimização e revise dados externos antes de inseri-los na página.',
          'frontend.desempenho-e-seguranca-web',
        ),
      ],
    },
    project(
      'Produto frontend',
      'Evolua o catálogo para uma aplicação tipada, acessível, testada e publicada. Peça feedback de alguém que possa usá-la.',
      'Documente o problema, rode build e testes na CI, demonstre busca e erros pelo teclado e registre uma melhoria feita após feedback.',
      [r.vite, r.playwright, r.actions],
      'frontend.produto-frontend',
    ),
    career,
    {
      optional: true,
      id: 'frontend.aprofundamento-opcional',
      label: 'Aprofundamento opcional',
      description:
        'Depois do projeto completo, escolha temas necessários ao produto ou à vaga. Não é preciso dominar todos para começar a se candidatar.',
      items: [
        topic(
          'Renderização, design system e CSS avançado',
          'Compare SPA, SSR e geração estática. Explore componentes reutilizáveis, CSS moderno e SEO. PWA, mobile, desktop e WebAssembly são caminhos separados.',
          [r.next, r.css, r.curriculum, r.youtubeRocketseatTailwind, r.youtubeHoraDeCodarCss],
          'Justifique a estratégia de renderização de uma página e implemente uma melhoria mensurável.',
          'frontend.renderizacao-design-system-e-css-avancado',
        ),
      ],
    },
  ],
  'frontend',
);
