import { LessonMeta } from '../types';

const updatedAt = '2026-10-14';

const pythonGroups = [
  'backend.uma-linguagem-de-backend',
  'devops.shell-e-python',
  'dataEngineering.python-para-dados',
  'test.programacao-para-automacao',
];

export const lessons: LessonMeta[] = [
  {
    id: 'python-do-zero',
    title: 'Python do zero',
    summary:
      'Seus primeiros programas em Python: mostrar valores, guardar em variáveis, decidir com if, repetir com laços e criar funções.',
    minutes: 16,
    groupIds: pythonGroups,
    objectives: [
      'Escrever e rodar um programa com print, variáveis e f-strings',
      'Diferenciar os tipos str, int, float e bool e converter texto em número',
      'Escolher um caminho com if, elif e else respeitando a indentação',
      'Repetir tarefas com for e range e com while',
      'Criar funções com def que devolvem resultados com return',
    ],
    updatedAt,
    load: () => import('../content/pythonDoZero'),
  },
  {
    id: 'python-listas-dicionarios-e-arquivos',
    title: 'Listas, dicionários e arquivos em Python',
    summary:
      'Guardar muitos dados com listas e dicionários, ler e escrever CSV e JSON, e tratar dados errados sem derrubar o programa.',
    minutes: 16,
    groupIds: pythonGroups,
    objectives: [
      'Criar, ler e percorrer listas e dicionários',
      'Filtrar e resumir uma lista de dicionários, inclusive com list comprehension',
      'Escrever e ler arquivos com with open e usar os módulos csv e json',
      'Tratar ValueError e FileNotFoundError com try e except',
      'Reaproveitar código com import',
    ],
    updatedAt,
    load: () => import('../content/pythonListasDicionariosEArquivos'),
  },
  {
    id: 'sql-consultas',
    title: 'SQL: fazendo perguntas aos dados',
    summary:
      'Consultar um banco de dados real com SELECT, filtrar, ordenar, contar, somar e agrupar resultados.',
    minutes: 15,
    groupIds: ['curriculum.sql-e-postgresql', 'test.api-e-sql-basicos'],
    objectives: [
      'Escrever consultas com SELECT e FROM escolhendo colunas',
      'Filtrar linhas com WHERE, AND, OR, IN, BETWEEN, LIKE e IS NULL',
      'Ordenar e limitar resultados com ORDER BY e LIMIT',
      'Resumir dados com COUNT, SUM e AVG, agrupando com GROUP BY e filtrando com HAVING',
    ],
    updatedAt,
    load: () => import('../content/sqlConsultas'),
  },
  {
    id: 'sql-tabelas-e-relacoes',
    title: 'SQL: tabelas, relações e transações',
    summary:
      'Criar tabelas com regras, alterar dados com segurança, relacionar tabelas com chaves e JOIN, e proteger mudanças com transações.',
    minutes: 16,
    groupIds: ['curriculum.sql-e-postgresql'],
    objectives: [
      'Criar tabelas com PRIMARY KEY, NOT NULL, UNIQUE e FOREIGN KEY',
      'Inserir, alterar e apagar linhas sem atingir dados por engano',
      'Juntar tabelas com INNER JOIN e LEFT JOIN e explicar a diferença',
      'Explicar quando um índice ajuda e conferir o plano de uma consulta',
      'Agrupar mudanças numa transação com BEGIN, COMMIT e ROLLBACK',
    ],
    updatedAt,
    load: () => import('../content/sqlTabelasERelacoes'),
  },
];
