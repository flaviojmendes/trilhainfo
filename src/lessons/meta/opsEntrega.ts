import { LessonMeta } from '../types';

const updatedAt = '2026-10-14';

export const lessons: LessonMeta[] = [
  {
    id: 'ci-e-publicacao',
    title: 'CI e publicação',
    summary:
      'Como um robô confere cada mudança antes de ela seguir: workflows do GitHub Actions, leitura de falhas, segredos e publicação de um site.',
    minutes: 15,
    groupIds: [
      'curriculum.ci-e-publicacao',
      'dataEngineering.containers-ci-e-nuvem',
      'test.ci-e-estrategia-de-cobertura',
    ],
    objectives: [
      'Explicar o que a CI faz e por que ela roda em cada pull request',
      'Ler e completar um workflow do GitHub Actions com `on`, `jobs`, `runs-on`, `uses` e `run`',
      'Encontrar o erro no log de uma CI que falhou e reproduzi-lo localmente',
      'Separar o que vai no repositório do que deve ser um segredo',
      'Descrever como um site estático é publicado a partir do build',
    ],
    updatedAt,
    load: () => import('../content/ciEPublicacao'),
  },
  {
    id: 'pipeline-de-entrega',
    title: 'Pipeline de entrega',
    summary:
      'Do commit à produção sem susto: etapas do pipeline, artefatos versionados, ambientes, estratégias de deploy, rollback e feature flags.',
    minutes: 15,
    groupIds: ['devops.pipeline-de-entrega'],
    objectives: [
      'Diferenciar CI, entrega contínua e implantação contínua',
      'Ordenar as etapas de um pipeline, do build até produção',
      'Gerar um artefato versionado e separar o que é artefato do que é configuração de ambiente',
      'Comparar deploys rolling, blue-green e canary e escolher um para um cenário',
      'Fazer rollback para uma versão anterior e explicar quando usar uma feature flag',
    ],
    updatedAt,
    load: () => import('../content/pipelineDeEntrega'),
  },
  {
    id: 'conceitos-de-nuvem',
    title: 'Conceitos de nuvem',
    summary:
      'O mapa da nuvem antes de abrir o console: modelos de serviço, regiões, peças básicas, IAM, responsabilidade compartilhada e custos.',
    minutes: 16,
    groupIds: ['devops.conceitos-de-nuvem', 'dataEngineering.containers-ci-e-nuvem'],
    objectives: [
      'Classificar serviços como IaaS, PaaS, serverless ou SaaS',
      'Explicar regiões e zonas de disponibilidade e escolher uma região para um caso',
      'Relacionar computação, armazenamento, rede e banco aos nomes de AWS, Google Cloud e Azure',
      'Ler uma política de IAM e aplicar o princípio do privilégio mínimo',
      'Estimar o custo mensal de um ambiente simples e listar os sustos mais comuns na fatura',
    ],
    updatedAt,
    load: () => import('../content/conceitosDeNuvem'),
  },
  {
    id: 'terraform-e-estado',
    title: 'Terraform e estado',
    summary:
      'Infraestrutura como código na prática: ler HCL, planejar, aplicar e destruir recursos, e cuidar do arquivo de estado.',
    minutes: 16,
    groupIds: ['devops.terraform-e-estado'],
    objectives: [
      'Explicar o que é infraestrutura como código e o estilo declarativo',
      'Identificar `provider`, `resource`, `variable` e `output` num arquivo HCL',
      'Rodar `init`, `plan`, `apply` e `destroy` e interpretar os símbolos do plano',
      'Explicar o que o estado guarda, por que fica fora do Git e para que servem estado remoto e trava',
      'Reconhecer drift e saber quando usar um módulo',
    ],
    updatedAt,
    load: () => import('../content/terraformEEstado'),
  },
  {
    id: 'observabilidade-e-incidentes',
    title: 'Observabilidade e incidentes',
    summary:
      'Enxergar o sistema por dentro e reagir quando ele falha: logs, métricas, traces, SLOs, alertas úteis e relatos sem culpados.',
    minutes: 16,
    groupIds: [
      'devops.observabilidade-e-incidentes',
      'backend.containers-e-observabilidade',
      'fullstack.configuracao-e-monitoramento',
    ],
    objectives: [
      'Classificar informações como métricas, logs ou traces',
      'Escrever e analisar logs estruturados sem dados pessoais',
      'Calcular SLI e orçamento de erros a partir de um SLO',
      'Distinguir um alerta de sintoma acionável de um alerta de ruído',
      'Conduzir um incidente da detecção ao relato pós-incidente sem culpados',
    ],
    updatedAt,
    load: () => import('../content/observabilidadeEIncidentes'),
  },
];
