import { LessonMeta } from '../types';

const updatedAt = '2026-10-14';

export const lessons: LessonMeta[] = [
  {
    id: 'pipelines-batch',
    title: 'Pipelines batch',
    summary:
      'Como trazer dados de uma fonte, tratar e carregar num destino todo dia, sem duplicar, sem perder nada e se recuperando de falhas.',
    minutes: 16,
    groupIds: ['dataEngineering.pipelines-batch'],
    objectives: [
      'Diferenciar as etapas de extrair, transformar e carregar, e as abordagens ETL e ELT',
      'Escrever um pipeline em Python que separa registros válidos de rejeitados',
      'Gravar dados de forma idempotente com `INSERT ... ON CONFLICT`',
      'Explicar carga completa e incremental com marca d’água, e quando salvar a marca',
      'Distinguir falhas passageiras de permanentes e ler um log de execução',
    ],
    updatedAt,
    load: () => import('../content/pipelinesBatch'),
  },
  {
    id: 'transformacoes-com-dbt',
    title: 'Transformações com dbt',
    summary:
      'Organize suas transformações SQL em modelos versionados, com dependências, camadas, testes e linhagem documentada.',
    minutes: 16,
    groupIds: ['dataEngineering.transformacoes-com-dbt'],
    objectives: [
      'Escrever um modelo dbt usando `source()` e `ref()`',
      'Escrever a consulta de um modelo de staging que renomeia, converte e padroniza dados brutos',
      'Organizar modelos nas camadas staging, intermediate e marts e escolher a materialização',
      'Declarar os testes `unique`, `not_null`, `relationships` e `accepted_values` em YAML',
      'Usar `dbt run`, `dbt test` e `dbt build` e interpretar a linhagem',
    ],
    updatedAt,
    load: () => import('../content/transformacoesComDbt'),
  },
  {
    id: 'orquestracao-com-airflow',
    title: 'Orquestração com Airflow',
    summary:
      'Agende pipelines com dependências, novas tentativas e reprocessamento, entendendo DAGs, backfill, sensores e XCom.',
    minutes: 16,
    groupIds: ['dataEngineering.orquestracao-com-airflow'],
    objectives: [
      'Explicar o que um orquestrador faz que o cron não faz',
      'Ordenar tarefas de um DAG respeitando dependências e detectar ciclos',
      'Ler um arquivo de DAG com TaskFlow e configurar agendamento, `catchup` e `retries`',
      'Testar uma tarefa, limpar só a etapa que falhou e fazer um backfill pela linha de comando',
      'Decidir o que pode passar por XCom e quando usar um sensor',
    ],
    updatedAt,
    load: () => import('../content/orquestracaoComAirflow'),
  },
  {
    id: 'qualidade-e-governanca',
    title: 'Qualidade e governança de dados',
    summary:
      'Meça a qualidade dos dados, bloqueie cargas inválidas com contratos e proteja dados pessoais com acesso e retenção definidos.',
    minutes: 16,
    groupIds: ['dataEngineering.qualidade-e-governanca'],
    objectives: [
      'Classificar problemas pelas dimensões de qualidade: completude, unicidade, validade, atualidade e consistência',
      'Escrever checagens em SQL para duplicados, nulos e registros órfãos',
      'Validar um lote contra um contrato de dados e bloquear a carga quando ele não bate',
      'Diferenciar dado pessoal, sensível, anonimizado e pseudonimizado segundo a LGPD',
      'Aplicar o menor privilégio e a retenção ao decidir quem acessa cada tabela',
    ],
    updatedAt,
    load: () => import('../content/qualidadeEGovernanca'),
  },
];
