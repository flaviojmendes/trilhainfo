import { withAILearning } from './aiLearning';
import { Level } from '../entity/RoadmapModel';
import { career, git, project, sql, topic } from './curriculum';
import { resources as r } from './resources';

export const dataEngineeringData: Level[] = withAILearning(
  [
    {
      label: 'Comece com programação e dados',
      description:
        'Engenharia de Dados exige programação, SQL e operação de pipelines. Análise de dados, BI e estágio em dados também podem servir como etapas de entrada.',
      items: [
        topic(
          'Python para dados',
          'Aprenda funções, coleções, arquivos, ambientes virtuais, dependências, erros e testes. Use pandas depois de conseguir ler CSV e JSON com Python.',
          [r.pythonCourse, r.python, r.pandas],
          'Leia um CSV, valide tipos e valores faltantes e produza uma saída com um relatório de rejeições.',
        ),
        git,
      ],
    },
    {
      label: 'SQL antes de ferramentas distribuídas',
      items: [
        sql,
        topic(
          'SQL analítico',
          'Pratique agregações, CTEs, window functions, deduplicação e análise de plano. Diferencie granularidade e chaves ao combinar tabelas.',
          [r.postgres, r.sql],
          'Calcule totais por período e ranking, evitando dupla contagem em JOINs. Explique a granularidade do resultado.',
        ),
      ],
    },
    project(
      'Análise reproduzível',
      'Importe um conjunto de dados públicos em PostgreSQL ou DuckDB e responda perguntas de negócio com SQL.',
      'Registre origem e licença, valide dados, explique granularidade e entregue consultas reproduzíveis com resultados e limitações.',
      [r.postgres, r.duckdb, r.pandas],
    ),
    {
      label: 'Modelagem e armazenamento',
      items: [
        topic(
          'Modelagem analítica e formatos',
          'Entenda tabelas fato/dimensão, esquema estrela, granularidade, histórico e particionamento. Compare CSV, JSON e Parquet; diferencie OLTP de OLAP.',
          [r.dbt, r.duckdb],
          'Modele vendas com fato e dimensões e compare tamanho e leitura do mesmo conjunto em CSV e Parquet.',
        ),
      ],
    },
    {
      label: 'Ingestão e transformação',
      items: [
        topic(
          'Pipelines batch',
          'Extraia arquivos ou APIs, valide esquema e separe dados brutos de transformados. Trate paginação, limites, carga incremental e idempotência.',
          [r.python, r.pandas, r.duckdb],
          'Execute a mesma carga duas vezes sem duplicar registros e reprocesse um período com falha.',
        ),
        topic(
          'Transformações com dbt',
          'Versione transformações SQL, dependências, testes e documentação. Comece com um banco local e uma ferramenta por vez; a documentação não exige contratar uma plataforma.',
          [r.dbt, r.postgres],
          'Crie modelos staging e analíticos, teste unicidade e relacionamentos e documente a linhagem.',
        ),
      ],
    },
    project(
      'Pipeline local de dados',
      'Construa uma carga batch de dados públicos com camadas bruta, tratada e analítica.',
      'A execução é reproduzível e idempotente, tem testes de qualidade e produz uma tabela para consumo. Documente como corrigir uma carga inválida.',
      [r.python, r.duckdb, r.dbt],
    ),
    {
      label: 'Orquestração e confiabilidade',
      items: [
        topic(
          'Orquestração com Airflow',
          'Aprenda tarefas, dependências, agendamento, retries, backfill e logs. Use Airflow ou uma alternativa depois de ter um pipeline que funciona sem o orquestrador.',
          [r.airflow],
          'Agende o pipeline, simule uma falha e recupere apenas a etapa necessária; execute um backfill sem duplicar dados.',
        ),
        topic(
          'Qualidade e governança',
          'Defina contratos, testes de completude e atualidade, linhagem, controle de acesso e retenção. Use dados públicos ou sintéticos; reduza a exposição de dados pessoais.',
          [r.dbt, r.otel, r.security],
          'Bloqueie uma carga com esquema inválido, alerte sobre atraso e documente acesso e retenção das tabelas.',
        ),
      ],
    },
    {
      label: 'Entrega e armazenamento em nuvem',
      description:
        'Conceitos de nuvem são úteis, mas o portfólio pode rodar localmente. Serviços e warehouses podem ter custo.',
      items: [
        topic(
          'Containers, CI e nuvem',
          'Empacote o pipeline, rode testes em CI e entenda object storage, IAM, custos e warehouse. Escolha um provedor conforme o contexto.',
          [r.compose, r.actions, r.cloud],
          'Reproduza o ambiente local por Compose e faça um teste de qualidade falhar na CI. Estime custos antes de criar recursos externos.',
        ),
      ],
    },
    project(
      'Pipeline operável',
      'Entregue ingestão incremental, transformação, orquestração e uma camada analítica documentada.',
      'Demonstre idempotência, testes, backfill, logs, recuperação de falha e uma consulta de negócio. Inclua diagrama, origem/licença dos dados e execução local.',
      [r.airflow, r.dbt, r.compose],
    ),
    career,
    {
      label: 'Escala e streaming opcionais',
      description:
        'Spark, Kafka, lakehouse e processamento distribuído vêm depois de SQL e pipelines locais. Escolha quando volume ou latência justificarem.',
      items: [
        topic(
          'Spark e streaming',
          'Compare batch e streaming, particionamento, checkpoints, eventos atrasados e semântica de entrega. Meça o problema antes de distribuir.',
          [r.spark, r.kafka],
          'Compare uma transformação local com a versão distribuída e documente quando o custo adicional se justifica.',
        ),
      ],
    },
  ],
  'data-engineer',
);
