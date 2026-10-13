import { GuideCategory, GuideCategoryId, GuideMeta } from './types';

export type { GuideMeta, GuideCategory, GuideCategoryId } from './types';

export const guideCategories: GuideCategory[] = [
  {
    id: 'web',
    title: 'Web e navegador',
    description: 'Como a página chega, é montada e responde a quem usa.',
  },
  {
    id: 'apis',
    title: 'APIs e segurança',
    description: 'Contratos HTTP, autenticação e controle de acesso.',
  },
  {
    id: 'dados',
    title: 'Dados e algoritmos',
    description: 'Consultas, custo de algoritmos e raciocínio sobre dados.',
  },
  {
    id: 'operacao',
    title: 'Qualidade e operação',
    description: 'Testes, containers e confiabilidade de serviços.',
  },
  {
    id: 'carreira',
    title: 'Carreira e colaboração',
    description: 'Trabalho em equipe, entrevistas e uso responsável de IA.',
  },
];

const updatedAt = '2026-10-13';

export const guides: GuideMeta[] = [
  {
    id: 'urlToPage',
    title: 'Do endereço à página na tela',
    summary:
      'O que acontece entre digitar uma URL e ver a página: DNS, conexão segura, HTTP e renderização.',
    category: 'web',
    level: 'Iniciante',
    minutes: 8,
    trails: ['frontend', 'fullstack', 'test'],
    topics: ['curriculum.internet-e-http'],
    updatedAt,
    load: () => import('./content/urlToPage'),
  },
  {
    id: 'jsAsyncDefer',
    title: 'Scripts: normal, async e defer',
    summary:
      'Como cada forma de carregar JavaScript afeta a leitura do HTML e quando usar cada uma.',
    category: 'web',
    level: 'Iniciante',
    minutes: 5,
    trails: ['frontend', 'react'],
    topics: ['curriculum.javascript'],
    poster: true,
    updatedAt,
    load: () => import('./content/jsAsyncDefer'),
  },
  {
    id: 'eventLoop',
    title: 'Event loop do JavaScript',
    summary:
      'Pilha de chamadas, microtarefas e tarefas: por que um código assíncrono roda na ordem que roda.',
    category: 'web',
    level: 'Intermediário',
    minutes: 8,
    trails: ['frontend', 'react', 'fullstack'],
    topics: ['curriculum.javascript', 'react.revise-javascript'],
    updatedAt,
    load: () => import('./content/eventLoop'),
  },
  {
    id: 'flexboxGrid',
    title: 'Flexbox ou Grid?',
    summary:
      'Uma dimensão ou duas: como escolher o modelo de layout e as propriedades que resolvem a maioria dos casos.',
    category: 'web',
    level: 'Iniciante',
    minutes: 6,
    trails: ['frontend', 'fullstack'],
    topics: ['curriculum.css'],
    updatedAt,
    load: () => import('./content/flexboxGrid'),
  },
  {
    id: 'accessibilityChecks',
    title: 'Acessibilidade em 10 verificações',
    summary:
      'Testes rápidos com teclado, zoom e leitor de tela que encontram os problemas mais comuns.',
    category: 'web',
    level: 'Iniciante',
    minutes: 7,
    trails: ['frontend', 'react', 'fullstack', 'test'],
    topics: ['curriculum.acessibilidade'],
    updatedAt,
    load: () => import('./content/accessibilityChecks'),
  },
  {
    id: 'httpApis',
    title: 'HTTP para APIs: métodos e status',
    summary:
      'Métodos, idempotência e códigos de status para desenhar e depurar uma API sem surpresas.',
    category: 'apis',
    level: 'Iniciante',
    minutes: 8,
    trails: ['backend', 'fullstack', 'frontend', 'test', 'entrevistas'],
    topics: [
      'curriculum.internet-e-http',
      'backend.api-rest-e-contratos',
      'fullstack.integracao-http',
      'test.testes-de-api',
      'entrevistas.http-dados-e-seguranca',
    ],
    updatedAt,
    load: () => import('./content/httpApis'),
  },
  {
    id: 'basicAuth',
    title: 'Autenticação Básica (Basic Auth)',
    summary:
      'Usuário e senha em Base64 no cabeçalho Authorization: como funciona, quando faz sentido e os riscos.',
    category: 'apis',
    level: 'Iniciante',
    minutes: 5,
    trails: ['backend', 'test'],
    topics: ['backend.autenticacao-e-autorizacao'],
    poster: true,
    updatedAt,
    load: () => import('./content/basicAuth'),
  },
  {
    id: 'sessionsTokens',
    title: 'Sessões, JWT e OAuth 2.0',
    summary:
      'Como manter alguém autenticado e como delegar acesso a outra aplicação, com as armadilhas de cada abordagem.',
    category: 'apis',
    level: 'Intermediário',
    minutes: 10,
    trails: ['backend', 'fullstack', 'entrevistas'],
    topics: [
      'backend.autenticacao-e-autorizacao',
      'fullstack.sessoes-e-permissoes',
      'entrevistas.http-dados-e-seguranca',
    ],
    updatedAt,
    load: () => import('./content/sessionsTokens'),
  },
  {
    id: 'sso',
    title: 'SSO e SAML',
    summary:
      'Um login para vários sistemas: os papéis de usuário, provedor de identidade e provedor de serviço.',
    category: 'apis',
    level: 'Intermediário',
    minutes: 6,
    trails: ['backend', 'devops'],
    topics: ['backend.autenticacao-e-autorizacao'],
    poster: true,
    updatedAt,
    load: () => import('./content/sso'),
  },
  {
    id: 'bigO',
    title: 'Notação Big O',
    summary:
      'Como o tempo ou a memória de um algoritmo crescem com a entrada, com exemplos de cada complexidade.',
    category: 'dados',
    level: 'Iniciante',
    minutes: 6,
    trails: ['entrevistas', 'backend'],
    topics: ['entrevistas.arrays-mapas-e-complexidade'],
    poster: true,
    updatedAt,
    load: () => import('./content/bigO'),
  },
  {
    id: 'sqlJoins',
    title: 'JOINs em SQL',
    summary:
      'INNER, LEFT, RIGHT e FULL com o mesmo exemplo, e como evitar a dupla contagem depois de um JOIN.',
    category: 'dados',
    level: 'Iniciante',
    minutes: 7,
    trails: ['backend', 'data-engineer', 'test', 'entrevistas'],
    topics: [
      'curriculum.sql-e-postgresql',
      'dataEngineering.sql-analitico',
      'test.api-e-sql-basicos',
      'entrevistas.http-dados-e-seguranca',
    ],
    updatedAt,
    load: () => import('./content/sqlJoins'),
  },
  {
    id: 'testTypes',
    title: 'Que teste escrever?',
    summary:
      'Unidade, integração e ponta a ponta: o que cada um prova, quanto custa e como equilibrar a suíte.',
    category: 'operacao',
    level: 'Iniciante',
    minutes: 8,
    trails: ['test', 'backend', 'react', 'fullstack'],
    topics: [
      'test.fundamentos-de-teste',
      'backend.testes-e-design-simples',
      'react.testes-com-testing-library',
      'fullstack.testes-de-ponta-a-ponta',
    ],
    updatedAt,
    load: () => import('./content/testTypes'),
  },
  {
    id: 'dockerBasics',
    title: 'Docker: imagem, container e Compose',
    summary:
      'Os conceitos que mais confundem no começo, um Dockerfile comentado e os comandos do dia a dia.',
    category: 'operacao',
    level: 'Iniciante',
    minutes: 8,
    trails: ['devops', 'backend', 'data-engineer'],
    topics: [
      'devops.docker-e-compose',
      'backend.containers-e-observabilidade',
      'dataEngineering.containers-ci-e-nuvem',
    ],
    updatedAt,
    load: () => import('./content/dockerBasics'),
  },
  {
    id: 'slaSloSli',
    title: 'SLA, SLO e SLI',
    summary:
      'A diferença entre o que se promete, o que se persegue e o que se mede, e como o error budget usa os três.',
    category: 'operacao',
    level: 'Intermediário',
    minutes: 5,
    trails: ['devops', 'backend'],
    topics: ['devops.observabilidade-e-incidentes'],
    poster: true,
    updatedAt,
    load: () => import('./content/slaSloSli'),
  },
  {
    id: 'gitDaily',
    title: 'Git no dia a dia',
    summary:
      'Do clone ao pull request: os comandos que você vai usar toda semana e como resolver um conflito.',
    category: 'carreira',
    level: 'Iniciante',
    minutes: 8,
    trails: ['frontend', 'backend', 'fullstack', 'devops', 'test', 'data-engineer'],
    topics: ['curriculum.controle-de-versao'],
    updatedAt,
    load: () => import('./content/gitDaily'),
  },
  {
    id: 'onboarding',
    title: 'Onboarding em um projeto novo',
    summary:
      'Um roteiro para entender um projeto existente e fazer a primeira contribuição com segurança.',
    category: 'carreira',
    level: 'Iniciante',
    minutes: 5,
    trails: ['frontend', 'backend', 'fullstack', 'devops', 'test', 'data-engineer'],
    topics: [],
    poster: true,
    updatedAt,
    load: () => import('./content/onboarding'),
  },
  {
    id: 'star',
    title: 'Método STAR para entrevistas',
    summary:
      'Situação, tarefa, ação e resultado: uma estrutura para contar experiências com começo, meio e fim.',
    category: 'carreira',
    level: 'Iniciante',
    minutes: 6,
    trails: ['entrevistas'],
    topics: ['entrevistas.curriculo-vaga-e-apresentacao'],
    poster: true,
    updatedAt,
    load: () => import('./content/star'),
  },
  {
    id: 'aiStudy',
    title: 'Estudar e programar com IA',
    summary:
      'Como usar assistentes de IA para aprender mais rápido sem terceirizar o entendimento nem vazar dados.',
    category: 'carreira',
    level: 'Iniciante',
    minutes: 7,
    trails: ['frontend', 'backend', 'fullstack', 'devops', 'test', 'data-engineer', 'react'],
    topics: ['curriculum.ia-no-fluxo-de-trabalho'],
    updatedAt,
    load: () => import('./content/aiStudy'),
  },
];

const byId = new Map(guides.map((guide) => [guide.id, guide]));

export function findGuide(id: string | undefined): GuideMeta | undefined {
  return id ? byId.get(id) : undefined;
}

export function guidesInCategory(category: GuideCategoryId): GuideMeta[] {
  return guides.filter((guide) => guide.category === category);
}

export function guidesForTopic(groupId: string): GuideMeta[] {
  return guides.filter((guide) => guide.topics.includes(groupId));
}

export function categoryOf(guide: GuideMeta): GuideCategory {
  return guideCategories.find((category) => category.id === guide.category) as GuideCategory;
}

/** Neighbours in reading order, for "próximo guia" navigation. */
export function adjacentGuides(id: string): { previous?: GuideMeta; next?: GuideMeta } {
  const index = guides.findIndex((guide) => guide.id === id);
  if (index < 0) return {};
  return { previous: guides[index - 1], next: guides[index + 1] };
}

export function relatedGuides(guide: GuideMeta, limit = 3): GuideMeta[] {
  const score = (other: GuideMeta) =>
    (other.category === guide.category ? 2 : 0) +
    other.trails.filter((trail) => guide.trails.includes(trail)).length * 0.5 +
    other.topics.filter((topic) => guide.topics.includes(topic)).length * 3;
  return guides
    .filter((other) => other.id !== guide.id)
    .map((other) => ({ other, value: score(other) }))
    .filter(({ value }) => value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, limit)
    .map(({ other }) => other);
}

export function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function guideMatches(guide: GuideMeta, query: string): boolean {
  const needle = normalize(query.trim());
  if (!needle) return true;
  return normalize(`${guide.title} ${guide.summary}`).includes(needle);
}
