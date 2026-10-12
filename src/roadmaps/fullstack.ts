import { withAILearning } from './aiLearning';
import { Level } from '../entity/RoadmapModel';
import {
  accessibility,
  career,
  css,
  delivery,
  git,
  html,
  javascript,
  project,
  sql,
  topic,
  typescript,
  web,
} from './curriculum';
import { resources as r } from './resources';

export const data: Level[] = withAILearning(
  [
    {
      id: 'fullstack.uma-base-para-os-dois-lados',
      label: 'Uma base para os dois lados',
      description:
        'Construa um produto pequeno de ponta a ponta. Se estiver começando do zero, aprofunde primeiro Frontend ou Backend; não tente dominar duas carreiras de uma vez.',
      items: [web, git],
    },
    {
      id: 'fullstack.interface-sem-abstracoes',
      label: 'Interface sem abstrações',
      items: [html, css, javascript],
    },
    project(
      'Protótipo navegável',
      'Crie uma interface de controle de despesas usando dados locais.',
      'Inclua formulário, lista, filtros, layout responsivo e validação; peça que outra pessoa complete uma tarefa.',
      [r.html, r.css, r.js],
      'fullstack.prototipo-navegavel',
    ),
    {
      id: 'fullstack.uma-stack-para-o-produto',
      label: 'Uma stack para o produto',
      description:
        'TypeScript com React e Node.js permite reutilizar a linguagem. Outra combinação já conhecida também serve; escolha uma e mantenha o foco.',
      items: [
        typescript,
        topic(
          'React e Node.js',
          'Aprenda componentes, estado, rotas e uma API simples. Use Vite para estudar o cliente e entenda o processo separado do servidor.',
          [r.react, r.vite, r.node],
          'Rode frontend e API localmente e explique o caminho de uma requisição entre eles.',
          'fullstack.react-e-node-js',
        ),
      ],
    },
    {
      id: 'fullstack.dados-e-contrato',
      label: 'Dados e contrato',
      items: [
        sql,
        topic(
          'Integração HTTP',
          'Defina o contrato REST, validação no servidor, status, paginação e tratamento de erro no cliente. Tipos compartilhados não substituem validação em runtime.',
          [r.openapi, r.fetch, r.security],
          'Conecte um formulário à API; trate timeout, resposta inválida e falha de validação sem perder os dados digitados.',
          'fullstack.integracao-http',
        ),
      ],
    },
    project(
      'Aplicação com persistência',
      'Substitua os dados locais por uma API com PostgreSQL.',
      'Crie migrações, valide entradas e teste o fluxo de cadastrar e consultar despesas. Documente o contrato entre cliente e servidor.',
      [r.postgres, r.openapi, r.playwright],
      'fullstack.aplicacao-com-persistencia',
    ),
    {
      id: 'fullstack.acesso-inclusao-e-testes',
      label: 'Acesso, inclusão e testes',
      items: [
        topic(
          'Sessões e permissões',
          'Entenda autenticação, autorização, cookies, CSRF e CORS. Mantenha segredos no servidor e use bibliotecas mantidas.',
          [r.security, r.http],
          'Teste que um usuário não acesse despesas de outro e que entradas maliciosas sejam tratadas.',
          'fullstack.sessoes-e-permissoes',
        ),
        accessibility,
        topic(
          'Testes de ponta a ponta',
          'Cubra regras no backend, comportamento do cliente e uma jornada completa. Evite substituir todos os testes por automação de navegador.',
          [r.vitest, r.testingLibrary, r.playwright],
          'Execute testes de cadastro, falha de API e acesso negado com dados isolados.',
          'fullstack.testes-de-ponta-a-ponta',
        ),
      ],
    },
    {
      id: 'fullstack.entrega-e-operacao-basica',
      label: 'Entrega e operação básica',
      items: [
        delivery,
        topic(
          'Configuração e monitoramento',
          'Empacote com Docker Compose, separe ambientes, exponha health checks e logs e planeje backups e rollback. Kubernetes não é necessário para o primeiro produto.',
          [r.compose, r.otel],
          'Reproduza o produto a partir do README e simule restauração dos dados e falha do serviço.',
          'fullstack.configuracao-e-monitoramento',
        ),
      ],
    },
    project(
      'Produto completo',
      'Entregue um controle de despesas utilizável com interface, API, banco e acesso por usuário.',
      'Disponibilize demo local ou hospedada, CI, testes, configuração segura e documentação. Registre feedback de uso e uma correção; explique o fluxo inteiro sem auxílio de IA.',
      [r.compose, r.actions, r.playwright],
      'fullstack.produto-completo',
    ),
    career,
    {
      optional: true,
      id: 'fullstack.proximos-passos-opcionais',
      label: 'Próximos passos opcionais',
      items: [
        topic(
          'Framework de aplicação completa',
          'Depois de compreender a separação cliente/servidor, avalie Next.js ou outro framework. Compare SSR, cache e deploy com sua aplicação atual.',
          [r.next, r.reactSetup],
          'Reimplemente uma rota e justifique quando essa arquitetura ajuda e quando aumenta a complexidade.',
          'fullstack.framework-de-aplicacao-completa',
        ),
      ],
    },
  ],
  'fullstack',
);
