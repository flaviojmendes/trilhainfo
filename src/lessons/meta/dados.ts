import { LessonMeta } from '../types';

const updatedAt = '2026-10-14';

export const lessons: LessonMeta[] = [
  {
    id: 'carreira-em-dados',
    title: 'Carreira em dados',
    summary:
      'O que faz uma pessoa engenheira de dados, como um dado vai da fonte ao painel e o que as vagas de entrada pedem.',
    minutes: 14,
    groupIds: ['dataEngineering.carreira-em-dados'],
    objectives: [
      'Diferenciar engenharia, análise, ciência de dados e analytics engineering pelas tarefas de cada papel',
      'Descrever as etapas do ciclo de vida dos dados, da fonte ao consumo',
      'Explicar a diferença entre bancos OLTP e OLAP e entre processamento batch e streaming',
      'Identificar as habilidades de base de uma vaga júnior e escolher dados abertos brasileiros para um projeto',
    ],
    updatedAt,
    load: () => import('../content/carreiraEmDados'),
  },
  {
    id: 'python-para-dados',
    title: 'Python para dados',
    summary:
      'Ler CSVs reais com a biblioteca padrão, limpar tipos e datas, rejeitar linhas inválidas com motivo, resumir por grupo e entender o que o pandas faz por baixo.',
    minutes: 16,
    groupIds: ['dataEngineering.python-para-dados'],
    objectives: [
      'Ler um CSV com separador e decimal brasileiros usando `csv.DictReader`',
      'Limpar e converter textos em números, datas e valores faltantes (`None`)',
      'Validar linhas e produzir um relatório de rejeições com número da linha e motivo',
      'Agregar dados com `defaultdict` e `Counter` e gravar a saída em CSV e JSON',
      'Comparar o código em Python puro com o equivalente em pandas',
    ],
    updatedAt,
    load: () => import('../content/pythonParaDados'),
  },
  {
    id: 'sql-analitico',
    title: 'SQL analítico',
    summary:
      'Granularidade, CTEs, CASE WHEN, datas, window functions, deduplicação e funis: o SQL que responde perguntas de negócio sem dupla contagem.',
    minutes: 16,
    groupIds: ['dataEngineering.sql-analitico'],
    objectives: [
      'Identificar a granularidade de uma consulta e evitar dupla contagem em JOINs',
      'Organizar consultas em etapas com CTEs e classificar linhas com `CASE WHEN`',
      'Agrupar por mês com `strftime` e calcular rankings, acumulados e variações com window functions',
      'Deduplicar registros com `ROW_NUMBER()` e montar um funil com `COUNT(DISTINCT ...)`',
    ],
    updatedAt,
    load: () => import('../content/sqlAnalitico'),
  },
  {
    id: 'modelagem-analitica-e-formatos',
    title: 'Modelagem analítica e formatos',
    summary:
      'Tabelas fato e dimensão, esquema estrela, granularidade, histórico com SCD tipo 2, formatos por linha e por coluna, particionamento e onde guardar os dados.',
    minutes: 16,
    groupIds: ['dataEngineering.modelagem-analitica-e-formatos'],
    objectives: [
      'Separar medidas e contexto em tabelas fato e dimensão de um esquema estrela',
      'Consultar um esquema estrela e definir a granularidade de uma tabela fato',
      'Explicar quando usar SCD tipo 1 ou tipo 2 e consultar uma dimensão com histórico',
      'Comparar CSV, JSON, Avro e Parquet e escolher uma coluna de particionamento',
      'Diferenciar data lake, data warehouse e lakehouse',
    ],
    updatedAt,
    load: () => import('../content/modelagemAnaliticaEFormatos'),
  },
];
