import { LessonMeta } from '../types';

const updatedAt = '2026-10-14';

export const lessons: LessonMeta[] = [
  {
    id: 'codigo-depuracao-e-revisao',
    title: 'Código, depuração e revisão na entrevista',
    summary:
      'Como conduzir um live coding em voz alta, depurar com método sob pressão, revisar código priorizando riscos e provar a correção com um teste.',
    minutes: 16,
    groupIds: ['entrevistas.codigo-depuracao-e-revisao'],
    objectives: [
      'Seguir um roteiro de live coding: entender, criar exemplos, explicar o plano, codificar e testar',
      'Ler um traceback de baixo para cima e formular uma hipótese a partir do tipo do erro',
      'Isolar um bug com uma reprodução mínima e corrigi-lo mudando uma coisa de cada vez',
      'Classificar problemas de uma revisão em bug, legibilidade, segurança e desempenho, priorizando o que causa dano',
      'Escrever um teste de regressão e explicar causa, correção, prova e limitação',
    ],
    updatedAt,
    load: () => import('../content/codigoDepuracaoERevisao'),
  },
  {
    id: 'http-dados-e-seguranca-na-entrevista',
    title: 'HTTP, dados e segurança na entrevista',
    summary:
      'Responda com clareza às perguntas clássicas sobre o caminho de uma URL, status HTTP, login, JOINs, índices, transações e as falhas de segurança mais comuns.',
    minutes: 16,
    groupIds: ['entrevistas.http-dados-e-seguranca'],
    objectives: [
      'Responder perguntas conceituais com definição, exemplo concreto e um cuidado',
      'Explicar o que acontece entre digitar uma URL e ver a página, do DNS ao banco de dados',
      'Diferenciar autenticação de autorização e escolher entre os status 401 e 403',
      'Corrigir consultas com LEFT JOIN e dupla contagem, e explicar índices e transações',
      'Reconhecer SQL injection, XSS, CSRF e acesso indevido e dizer como prevenir cada um',
    ],
    updatedAt,
    load: () => import('../content/httpDadosESegurancaNaEntrevista'),
  },
  {
    id: 'arrays-mapas-e-complexidade',
    title: 'Arrays, mapas e complexidade',
    summary:
      'Entenda Big O pela intuição, escolha entre lista, set e dicionário e resolva os padrões mais cobrados em entrevistas explicando o custo.',
    minutes: 16,
    groupIds: ['entrevistas.arrays-mapas-e-complexidade'],
    objectives: [
      'Classificar trechos de código em O(1), O(log n), O(n) e O(n²)',
      'Escolher set ou dicionário em vez de lista para buscas e explicar a troca entre tempo e espaço',
      'Resolver deduplicação, contagem de frequência e soma de pares com uma única passada pela lista',
      'Aplicar dois ponteiros e janela deslizante a problemas de pontas e de trechos seguidos',
      'Testar soluções com lista vazia, valores repetidos e limites',
    ],
    updatedAt,
    load: () => import('../content/arraysMapasEComplexidade'),
  },
];
