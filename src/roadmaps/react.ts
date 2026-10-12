import { withAILearning } from './aiLearning';
import { Level } from '../entity/RoadmapModel';
import { accessibility, career, project, topic, typescript } from './curriculum';
import { resources as r } from './resources';

export const data: Level[] = withAILearning(
  [
    {
      label: 'Antes de React',
      description:
        'Esta é uma especialização de frontend. Comece após HTML, CSS, JavaScript, módulos, async/await e Git; consulte a trilha Frontend se faltar essa base.',
      items: [
        topic(
          'Revise JavaScript',
          'Pratique map/filter, objetos, destructuring, imports, promises e imutabilidade. React não substitui a base da web.',
          [r.js, r.fetch],
          'Renderize e filtre uma lista com JavaScript e trate uma falha de requisição.',
        ),
        typescript,
      ],
    },
    {
      label: 'Crie o primeiro projeto',
      description:
        'Para estudar componentes, use React com TypeScript e Vite. Em um produto, avalie também um framework conforme as necessidades de roteamento e servidor.',
      items: [
        topic(
          'Configuração com Vite',
          'Create React App foi descontinuado para novos projetos. Aprenda scripts, dependências e build sem começar por configuração avançada.',
          [r.vite, r.reactSetup, r.cra],
          'Crie um projeto React + TypeScript e execute desenvolvimento, checagem de tipos e build.',
        ),
      ],
    },
    {
      label: 'Fundamentos de componentes',
      items: [
        topic(
          'JSX, componentes e props',
          'Construa funções de componente, composição, renderização condicional e listas com keys estáveis. Prefira composição a herança.',
          [r.react],
          'Divida um catálogo em componentes e passe dados por props, sem alterar os dados recebidos.',
        ),
        topic(
          'Estado e eventos',
          'Use useState, eventos e formulários controlados. Entenda snapshots, atualização funcional e estado derivado.',
          [r.react],
          'Implemente busca e favoritos sem duplicar estado que pode ser calculado.',
        ),
      ],
    },
    project(
      'Interface com estado',
      'Crie um catálogo com formulário, busca, favoritos e validação usando componentes funcionais.',
      'Use keys estáveis, mantenha estado perto de quem precisa dele e faça o formulário funcionar com teclado. Explique cada atualização de estado.',
      [r.react, r.accessibility],
    ),
    {
      label: 'Sincronização e dados',
      items: [
        topic(
          'Effects e refs',
          'Use useEffect para sincronizar com sistemas externos, com cleanup. Eventos e valores derivados normalmente dispensam Effects. Use refs para DOM e valores que não renderizam.',
          [r.effects, r.react],
          'Remova um Effect desnecessário e demonstre a limpeza de uma assinatura ou requisição.',
        ),
        topic(
          'Rotas e requisições',
          'Aprenda rotas, parâmetros, loading, erro, cancelamento e cache. Comece com fetch; adote bibliotecas de dados quando houver necessidade real.',
          [r.router, r.fetch],
          'Crie uma tela de detalhe acessível pela URL e trate resposta vazia, falha e mudanças rápidas de rota.',
        ),
      ],
    },
    {
      label: 'Qualidade de uma aplicação',
      items: [
        accessibility,
        topic(
          'Testes com Testing Library',
          'Teste comportamento visível ao usuário com Vitest e Testing Library; cubra navegação com Playwright. Evite testes que apenas repetem a implementação.',
          [r.testingLibrary, r.vitest, r.playwright],
          'Teste envio inválido, carregamento e recuperação de erro; execute um fluxo completo no navegador.',
        ),
      ],
    },
    {
      label: 'Estado compartilhado e entrega',
      items: [
        topic(
          'Reducer e Context',
          'Prefira estado local. Use reducer para transições complexas e Context para dependências compartilhadas; separe estado do servidor do estado da interface.',
          [r.react],
          'Implemente um carrinho com reducer e explique por que cada estado é local ou compartilhado.',
        ),
        topic(
          'Build e desempenho',
          'Publique uma versão de produção com CI. Meça antes de aplicar memoização e lazy loading; aprenda os limites entre cliente e servidor.',
          [r.vite, r.performance, r.actions],
          'Demonstre build reproduzível e uma melhoria de desempenho com evidência.',
        ),
      ],
    },
    project(
      'Aplicação React publicável',
      'Entregue um catálogo ou painel com rotas, API, TypeScript, testes e estados de falha.',
      'Publique uma demo, automatize build e testes, valide teclado e documente decisões de estado e dados. Corrija uma issue relatada por outra pessoa.',
      [r.react, r.router, r.actions],
    ),
    career,
    {
      label: 'Especialização opcional',
      description:
        'Aprofunde depois de entregar a aplicação. Componentes de classe, HOCs e render props são úteis para manutenção de código legado.',
      items: [
        topic(
          'Frameworks e React no servidor',
          'Explore SSR, geração estática, Server Components, Actions, formulários e fronteiras cliente/servidor em um framework. Use a documentação compatível com a versão escolhida.',
          [r.next, r.reactSetup],
          'Compare uma rota renderizada no servidor com a versão cliente e explique segurança, cache e custo de complexidade.',
        ),
        topic(
          'Arquitetura e recursos avançados',
          'Estude error boundaries, portais, custom hooks e profiling conforme surgirem necessidades. Mobile é uma especialização própria.',
          [r.react],
          'Extraia um hook com responsabilidade clara e demonstre um tratamento de erro útil ao usuário.',
        ),
      ],
    },
  ],
  'react',
);
