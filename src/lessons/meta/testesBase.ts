import { LessonMeta } from '../types';

const updatedAt = '2026-10-14';

export const lessons: LessonMeta[] = [
  {
    id: 'fundamentos-de-teste',
    title: 'Fundamentos de teste',
    summary:
      'Por que testar, a diferença entre erro, defeito e falha, os sete princípios, níveis e tipos de teste e como escrever um caso de teste.',
    minutes: 15,
    groupIds: ['test.fundamentos-de-teste'],
    objectives: [
      'Diferenciar erro, defeito e falha em situações reais',
      'Aplicar os sete princípios do teste para justificar decisões do time',
      'Classificar testes por nível e por tipo (funcional, não funcional, regressão, smoke)',
      'Distinguir verificação de validação e reescrever critérios de aceite vagos',
      'Escrever um caso de teste com pré-condição, passos e resultado esperado',
    ],
    updatedAt,
    load: () => import('../content/fundamentosDeTeste'),
  },
  {
    id: 'tecnicas-e-riscos',
    title: 'Técnicas de teste e riscos',
    summary:
      'Partição de equivalência, valor-limite, tabela de decisão e transição de estados para escolher poucos testes que revelam muito, e risco para decidir o que vem primeiro.',
    minutes: 15,
    groupIds: ['test.tecnicas-e-riscos'],
    objectives: [
      'Dividir as entradas de uma regra em partições de equivalência, incluindo as inválidas',
      'Escolher os valores-limite de cada fronteira e encontrar um defeito na borda',
      'Montar uma tabela de decisão para condições combinadas',
      'Identificar transições de estado permitidas e proibidas',
      'Priorizar casos de teste por probabilidade e impacto',
    ],
    updatedAt,
    load: () => import('../content/tecnicasERiscos'),
  },
  {
    id: 'exploratorio-e-relato-de-bugs',
    title: 'Teste exploratório e relato de bugs',
    summary:
      'Como planejar e conduzir uma sessão exploratória com charter, timebox e heurísticas, e relatar o que encontrou de um jeito reproduzível e sem culpa.',
    minutes: 16,
    groupIds: ['test.testes-exploratorios-e-relato-de-bugs'],
    objectives: [
      'Escrever um charter com alvo, recursos e informação buscada, com timebox definido',
      'Usar a heurística SFDPOT para gerar ideias de teste',
      'Conduzir uma sessão exploratória anotando bugs, perguntas e ideias',
      'Escrever um relato de bug com passos, esperado, obtido, ambiente e evidência',
      'Diferenciar severidade de prioridade e comunicar bugs sem apontar culpados',
    ],
    updatedAt,
    load: () => import('../content/exploratorioERelatoDeBugs'),
  },
];
