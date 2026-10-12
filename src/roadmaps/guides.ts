import { RoadmapFileModel } from '../entity/RoadmapFileModel';

export interface RoadmapGuide {
  kind: string;
  audience: string;
  outcome: string;
  start: string;
  prerequisite?: { label: string; path: string };
}

export const curriculumReviewedAt = '2026-10-12';
export const curriculumReviewLabel = 'outubro de 2026';

export const roadmapGuides: Partial<Record<keyof RoadmapFileModel, RoadmapGuide>> = {
  frontend: {
    kind: 'Carreira',
    audience: 'Para quem quer criar interfaces web e está começando a programar.',
    start: 'Comece por web, Git, HTML e CSS. Pratique JavaScript antes de escolher um framework.',
    outcome: 'Uma aplicação responsiva e acessível, com API, testes e demonstração publicada.',
  },
  backend: {
    kind: 'Carreira',
    audience: 'Para quem quer construir APIs, regras de negócio e persistência de dados.',
    start: 'Aprenda lógica e escolha uma linguagem. Depois pratique SQL e uma API simples.',
    outcome: 'Uma API com banco, permissões, testes e execução reproduzível.',
  },
  fullstack: {
    kind: 'Carreira',
    audience: 'Para quem quer conectar interface, API e banco em um produto pequeno.',
    start: 'Aprofunde primeiro um lado da aplicação e evolua o mesmo projeto até integrar os dois.',
    outcome: 'Um produto completo com acesso por usuário, persistência, CI e documentação.',
    prerequisite: { label: 'Começar pela trilha Frontend', path: '/roadmap/frontend' },
  },
  react: {
    kind: 'Especialização',
    audience: 'Para quem já praticou HTML, CSS, JavaScript, requisições e Git.',
    start:
      'Revise a base e crie um projeto com TypeScript e Vite. Aprenda componentes e estado antes de recursos avançados.',
    outcome: 'Uma aplicação React com rotas, API, acessibilidade, testes e publicação.',
    prerequisite: { label: 'Estudar a base na trilha Frontend', path: '/roadmap/frontend' },
  },
  devops: {
    kind: 'Carreira com base técnica',
    audience: 'Para quem quer automatizar entregas e operar serviços com confiabilidade.',
    start:
      'Pratique Linux, redes, Git e scripts. Use um laboratório local antes de contratar serviços de nuvem.',
    outcome: 'Um serviço reproduzível com CI, logs, rollback e recuperação de backup demonstrados.',
  },
  'data-engineer': {
    kind: 'Carreira com base técnica',
    audience: 'Para quem quer construir pipelines e preparar dados para análise.',
    start:
      'Comece com Python e SQL. Entregue uma carga local antes de orquestração, Spark ou streaming.',
    outcome:
      'Um pipeline incremental com testes de qualidade, agendamento e recuperação de falhas.',
  },
  test: {
    kind: 'Carreira',
    audience: 'Para quem quer investigar riscos e melhorar a qualidade de software.',
    start:
      'Comece com critérios de aceite, testes exploratórios e relato de bugs. Aprenda programação antes de automatizar.',
    outcome: 'Um portfólio com análise de risco, evidências, testes de API e web executados em CI.',
  },
  entrevistas: {
    kind: 'Preparação complementar',
    audience: 'Para quem já construiu um projeto e vai participar de processos seletivos.',
    start:
      'Escolha vagas compatíveis com seu nível e pratique explicar, depurar e testar seu projeto.',
    outcome:
      'Uma apresentação de projeto, uma simulação com feedback e um plano para corrigir lacunas.',
  },
};
