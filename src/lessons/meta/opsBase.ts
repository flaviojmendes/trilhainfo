import { LessonMeta } from '../types';

const updatedAt = '2026-10-14';

export const lessons: LessonMeta[] = [
  {
    id: 'linux-e-terminal',
    title: 'Linux e terminal',
    summary:
      'Ande pelo sistema de arquivos de um servidor, leia permissões, investigue logs com pipes e controle processos pelo terminal.',
    minutes: 16,
    groupIds: ['devops.linux-e-terminal'],
    objectives: [
      'Navegar pelo sistema de arquivos com caminhos absolutos e relativos, reconhecendo /etc, /home e /var/log',
      'Ler as permissões de ls -la e corrigi-las com chmod, usando sudo só quando necessário',
      'Investigar um log com tail, grep, pipes e redirecionamento',
      'Encontrar e encerrar um processo com top, ps e kill',
      'Instalar pacotes com apt, usar variáveis de ambiente e consultar --help e man',
    ],
    updatedAt,
    load: () => import('../content/linuxETerminal'),
  },
  {
    id: 'redes-e-diagnostico',
    title: 'Redes e diagnóstico',
    summary:
      'Entenda IP, portas, DNS e firewall e siga um roteiro de comandos para descobrir em que ponto uma conexão falha.',
    minutes: 15,
    groupIds: ['devops.redes-e-diagnostico'],
    objectives: [
      'Explicar IP, porta, localhost, DNS, TCP, UDP e firewall com exemplos do dia a dia',
      'Aplicar o roteiro ping, dig, curl -v, ss e traceroute na ordem certa',
      'Ler a saída desses comandos para distinguir erro de DNS, porta sem programa e bloqueio de firewall',
      'Classificar um sintoma de rede na camada onde a investigação deve começar',
    ],
    updatedAt,
    load: () => import('../content/redesEDiagnostico'),
  },
  {
    id: 'shell-scripts-e-automacao',
    title: 'Shell scripts e automação',
    summary:
      'Transforme tarefas repetidas em scripts Bash seguros, agende com cron e saiba quando a tarefa pede Python.',
    minutes: 16,
    groupIds: ['devops.shell-e-python'],
    objectives: [
      'Escrever um script Bash com shebang, variáveis, argumentos, if e for',
      'Usar códigos de saída e set -euo pipefail para que falhas não passem despercebidas',
      'Reconhecer comandos idempotentes e agendar um script com cron',
      'Decidir entre Bash e Python e automatizar em Python a contagem de status num log',
    ],
    updatedAt,
    load: () => import('../content/shellScriptsEAutomacao'),
  },
  {
    id: 'docker-e-compose',
    title: 'Docker e Compose',
    summary:
      'Empacote uma aplicação em imagem, rode e investigue containers e suba aplicação e banco juntos com Docker Compose.',
    minutes: 16,
    groupIds: [
      'devops.docker-e-compose',
      'backend.containers-e-observabilidade',
      'dataEngineering.containers-ci-e-nuvem',
    ],
    objectives: [
      'Explicar a diferença entre imagem e container e o problema que os containers resolvem',
      'Escrever um Dockerfile em camadas que aproveita o cache',
      'Rodar e investigar containers com portas, variáveis de ambiente, docker logs e docker exec',
      'Descrever aplicação e banco num compose.yaml com volume para que os dados sobrevivam à recriação',
      'Evitar segredos na imagem, a tag latest e containers rodando como root',
    ],
    updatedAt,
    load: () => import('../content/dockerECompose'),
  },
];
