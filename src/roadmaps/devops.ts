import { withAILearning } from './aiLearning';
import { Level } from '../entity/RoadmapModel';
import { career, git, project, topic, web } from './curriculum';
import { resources as r } from './resources';

export const data: Level[] = withAILearning(
  [
    {
      label: 'Base para operar sistemas',
      description:
        'DevOps envolve desenvolvimento e operação. Para começar, pratique Linux, redes, Git e uma aplicação simples; suporte, infraestrutura e desenvolvimento também podem ser portas de entrada.',
      items: [git, web],
    },
    {
      label: 'Linux e redes na prática',
      items: [
        topic(
          'Linux e terminal',
          'Aprenda arquivos, permissões, usuários, processos, serviços, pacotes, logs e SSH. Use uma máquina local ou VM de laboratório.',
          [r.linux],
          'Crie um usuário com permissões limitadas, execute um serviço e encontre o motivo de uma falha nos logs.',
        ),
        topic(
          'Redes e diagnóstico',
          'Entenda IP, portas, DNS, HTTP/TLS, firewall e proxy reverso. Use ferramentas de diagnóstico para seguir uma requisição.',
          [r.http, r.linux],
          'Diagnostique separadamente uma porta fechada, um erro de DNS e um serviço indisponível.',
        ),
      ],
    },
    {
      label: 'Automação simples',
      description:
        'Comece com shell; use Python para scripts com mais lógica. Go, Rust e C++ são especializações, não uma lista obrigatória.',
      items: [
        topic(
          'Shell e Python',
          'Aprenda variáveis, pipes, códigos de saída e scripts idempotentes. Em Python, use arquivos, subprocessos, HTTP e tratamento de erros.',
          [r.bash, r.pythonCourse, r.python],
          'Automatize uma checagem de serviço, produza logs úteis e retorne um código de erro quando a verificação falhar.',
        ),
      ],
    },
    project(
      'Serviço Linux reproduzível',
      'Execute uma aplicação simples em um laboratório local e automatize sua configuração básica.',
      'Documente portas, permissões e comandos. Execute o script duas vezes sem corromper o estado e demonstre como diagnosticar uma falha.',
      [r.linux, r.python],
    ),
    {
      label: 'Containers antes de orquestração',
      items: [
        topic(
          'Docker e Compose',
          'Aprenda imagem, container, volumes, redes, Dockerfile, health check e execução sem root quando possível. Rode uma aplicação e um banco com Compose.',
          [r.docker, r.compose],
          'Recrie a aplicação a partir dos arquivos versionados e confirme que os dados sobrevivem à recriação do container.',
        ),
      ],
    },
    {
      label: 'CI/CD e segurança de entrega',
      items: [
        topic(
          'Pipeline de entrega',
          'Automatize testes, build e artefatos. Separe CI de deploy; use permissões mínimas, segredos protegidos e dependências verificáveis.',
          [r.actions, r.security],
          'Faça a CI validar um pull request e registre um artefato versionado. Demonstre rollback para uma versão anterior.',
        ),
      ],
    },
    {
      label: 'Nuvem e infraestrutura como código',
      description:
        'Aprenda conceitos de um provedor. A documentação é gratuita; serviços podem ser cobrados. Os exercícios principais podem ser feitos localmente.',
      items: [
        topic(
          'Conceitos de nuvem',
          'Entenda IAM, computação, rede, armazenamento, banco gerenciado, responsabilidade compartilhada e custos. Escolha AWS, Azure ou GCP conforme seu contexto.',
          [r.cloud],
          'Desenhe o ambiente da aplicação, estime os recursos e explique as permissões mínimas. Se usar nuvem, defina orçamento e remova recursos ao terminar.',
        ),
        topic(
          'Terraform e estado',
          'Aprenda plano, aplicação, estado, drift e ciclo de vida com Terraform ou outra ferramenta compatível. Comece no laboratório Docker local.',
          [r.terraform],
          'Crie e remova um recurso local por código; explique o plano e proteja o arquivo de estado.',
        ),
      ],
    },
    {
      label: 'Confiabilidade e operação',
      items: [
        topic(
          'Observabilidade e incidentes',
          'Aprenda logs, métricas, traces, SLI/SLO, alertas acionáveis, runbooks, backups e recuperação. Monitore sintomas percebidos pelo usuário.',
          [r.otel, r.sre],
          'Simule indisponibilidade, identifique a causa, recupere o serviço e escreva um relato sem atribuir culpa.',
        ),
      ],
    },
    project(
      'Entrega e recuperação de um serviço',
      'Monte um laboratório com aplicação, banco, containers, CI e documentação operacional.',
      'Outro desenvolvedor consegue reproduzir o ambiente. Demonstre pipeline, rollback, alerta útil e restauração de backup; registre custos se houver nuvem.',
      [r.compose, r.actions, r.otel, r.sre],
    ),
    career,
    {
      label: 'Plataformas e escala opcionais',
      description:
        'Kubernetes, GitOps e plataformas internas ficam depois de saber entregar e operar um serviço simples.',
      items: [
        topic(
          'Kubernetes e engenharia de plataforma',
          'Aprenda deployments, services, configuração, recursos, probes e RBAC em um cluster local. Avalie a complexidade antes de adotar GitOps ou um portal interno.',
          [r.kubernetes, r.sre],
          'Faça deploy local, simule a falha de um pod e compare o custo operacional com Compose.',
        ),
      ],
    },
  ],
  'devops',
);
