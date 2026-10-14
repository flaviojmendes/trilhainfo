import { LessonMeta } from '../types';

const updatedAt = '2026-10-14';

export const lessons: LessonMeta[] = [
  {
    id: 'react-testes-com-testing-library',
    title: 'Testes com Testing Library',
    summary:
      'Testar telas React pelo que a pessoa vê e faz: Vitest, buscas por papel e rótulo, userEvent e mocks de fetch para sucesso, carregamento e falha.',
    minutes: 15,
    groupIds: ['react.testes-com-testing-library'],
    objectives: [
      'Configurar Vitest, jsdom e Testing Library num projeto Vite',
      'Escolher buscas por papel e rótulo antes de classes e data-testid',
      'Simular a pessoa com userEvent e esperar com findBy o que chega depois',
      'Simular sucesso, carregamento e falha da API com mocks de fetch',
      'Ler a mensagem de falha da Testing Library para encontrar a causa',
    ],
    updatedAt,
    load: () => import('../content/reactTestesComTestingLibrary'),
  },
  {
    id: 'node-e-express',
    title: 'Node.js e Express',
    summary:
      'JavaScript fora do navegador: criar um projeto Node, montar uma API com Express, rotas, middlewares, status e tratamento de erros.',
    minutes: 16,
    groupIds: ['fullstack.react-e-node-js'],
    objectives: [
      'Explicar o que muda ao rodar JavaScript no Node em vez do navegador',
      'Criar um projeto com npm init, módulos e Express e ligar o servidor',
      'Escrever rotas com parâmetros e corpo que respondem com o status certo',
      'Usar middlewares em ordem, incluindo express.json e um tratador de erros',
      'Testar as rotas de uma API com curl e ler status e cabeçalhos',
    ],
    updatedAt,
    load: () => import('../content/nodeEExpress'),
  },
  {
    id: 'integracao-front-e-api',
    title: 'Integração entre front e API',
    summary:
      'Ligar o app React à API: fetch com JSON, CORS, proxy do Vite, endereços por ambiente, estados de erro e atualização otimista.',
    minutes: 16,
    groupIds: ['fullstack.integracao-http'],
    objectives: [
      'Descrever o caminho de um cadastro do clique até a resposta da API',
      'Enviar dados com fetch usando método, cabeçalho e corpo em JSON',
      'Ler uma mensagem de erro de CORS e corrigi-la no servidor ou com o proxy do Vite',
      'Configurar o endereço da API por ambiente com VITE_API_URL',
      'Tratar tempo esgotado, recusa da API e resposta inválida sem perder os dados, com atualização otimista',
    ],
    updatedAt,
    load: () => import('../content/integracaoFrontEApi'),
  },
];
