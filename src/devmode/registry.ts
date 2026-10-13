import { DevComponentId } from './titles';

export type SourceLanguage = 'tsx' | 'typescript' | 'css';

export interface Source {
  path: string;
  language: SourceLanguage;
  load: () => Promise<{ default: string }>;
}

export interface Endpoint {
  method?: 'GET' | 'POST';
  url: string;
  match: RegExp;
  when: string;
  detail?: string;
  server?: string;
  replay?: string;
}

export interface DevEntry {
  summary: string;
  notes: string[];
  files: Source[];
  styles: Array<{ file: Source; needles: string[] }>;
  endpoints: Endpoint[];
  modules?: { match: RegExp; label: string };
}

function source(path: string, load: Source['load']): Source {
  const language = path.endsWith('.tsx') ? 'tsx' : path.endsWith('.css') ? 'css' : 'typescript';
  return { path, language, load };
}

const css = {
  site: source('src/site.css', () => import('../site.css?raw')),
  workspace: source(
    'src/components/LearningWorkspace/workspace.css',
    () => import('../components/LearningWorkspace/workspace.css?raw'),
  ),
  contribute: source(
    'src/components/Contribute/contribute.css',
    () => import('../components/Contribute/contribute.css?raw'),
  ),
  devmode: source('src/devmode/devmode.css', () => import('./devmode.css?raw')),
};

const progressSnapshot = source(
  'src/learning/progressSnapshot.ts',
  () => import('../learning/progressSnapshot.ts?raw'),
);

const github = 'https://api.github.com/repos/flaviojmendes/trilhainfo';

export const registry: Record<DevComponentId, DevEntry> = {
  hero: {
    summary:
      'A primeira dobra da página inicial: título, chamada para escolher uma trilha e um desenho da jornada.',
    notes: [
      'O desenho da trilha é um SVG estático dentro de `HeroTrail`, marcado com `aria-hidden` porque é decoração. O texto ao lado carrega o conteúdo.',
      'O botão "Continuar" só aparece se houver progresso salvo neste navegador. `latestSnapshot()` lê a chave `trilha-progress:v1` do `localStorage` uma única vez, no `useState`.',
      'O traço sob a palavra "caminho" é um `path` com `pathLength={1}`: assim o CSS anima `stroke-dashoffset` de 1 a 0 sem conhecer o comprimento real da curva.',
      'Nenhuma chamada de rede: o conteúdo vem do bundle e do próprio navegador.',
    ],
    files: [
      source('src/components/Hero/index.tsx', () => import('../components/Hero/index.tsx?raw')),
      progressSnapshot,
    ],
    styles: [
      {
        file: css.site,
        needles: [
          '.home-hero',
          '.hero-',
          '.home-eyebrow',
          '.home-lead',
          '.home-actions',
          '.home-facts',
        ],
      },
    ],
    endpoints: [],
  },
  'roadmap-card': {
    summary: 'Cada card leva a uma trilha e mostra o seu progresso nela, se você já começou.',
    notes: [
      'O card inteiro é um `Link` do React Router: a navegação troca a rota sem recarregar a página.',
      'O brilho que segue o mouse não passa pelo React. `onPointerMove` grava `--mx` e `--my` direto no estilo do elemento, e o `radial-gradient` do CSS usa essas variáveis.',
      'O percentual vem de `readProgressSnapshots()`, que lê o progresso salvo no `localStorage`. Nada é enviado a um servidor.',
      'O desenho da rota (`RouteGlyph`) é gerado a partir do índice do card: o mesmo número sempre produz as mesmas curvas Bézier.',
      'Ao abrir a trilha, o site baixa só o módulo dela, com `import()` em `src/learning/loaders.ts`.',
    ],
    files: [
      source(
        'src/components/MainRoadmaps/index.tsx',
        () => import('../components/MainRoadmaps/index.tsx?raw'),
      ),
      source(
        'src/components/MainRoadmaps/mainRoadmapsData.ts',
        () => import('../components/MainRoadmaps/mainRoadmapsData.ts?raw'),
      ),
      progressSnapshot,
    ],
    styles: [{ file: css.site, needles: ['.roadmap-card', '.roadmap-grid', '.route-glyph'] }],
    endpoints: [],
  },
  'guide-card': {
    summary: 'Atalho para um guia rápido, com categoria, tempo de leitura e nível.',
    notes: [
      'O card usa só os metadados leves do guia (`GuideMeta`). O conteúdo fica em outro arquivo e é baixado com `import()` quando a página do guia abre.',
      'O nível do título é configurável (`as="h2"` ou `"h3"`) para manter a hierarquia correta em cada página onde o card aparece.',
      'O atributo `data-category` deixa o CSS variar o destaque por categoria sem classes extras.',
    ],
    files: [
      source(
        'src/components/Guide/GuideCard.tsx',
        () => import('../components/Guide/GuideCard.tsx?raw'),
      ),
      source('src/guides/index.ts', () => import('../guides/index.ts?raw')),
    ],
    styles: [{ file: css.site, needles: ['.guide-tile'] }],
    endpoints: [],
  },
  'open-source': {
    summary:
      'Mostra números do projeto e caminhos para participar, incluindo as estrelas do GitHub.',
    notes: [
      'O número de estrelas vem da API pública do GitHub, sem autenticação. Ela aceita 60 requisições por hora por IP, por isso o resultado fica em cache por 12 horas.',
      'O cache mora no `localStorage`, na chave `trilha:github-stars`, junto com o horário da consulta.',
      'Se a API falhar, o item some em vez de mostrar um erro: o resto do card continua útil.',
      'Um `AbortController` cancela a requisição se o componente sair da tela antes da resposta.',
    ],
    files: [
      source(
        'src/components/ProjectInfo/index.tsx',
        () => import('../components/ProjectInfo/index.tsx?raw'),
      ),
      source(
        'src/components/ProjectInfo/useGithubStars.ts',
        () => import('../components/ProjectInfo/useGithubStars.ts?raw'),
      ),
    ],
    styles: [{ file: css.site, needles: ['.open-'] }],
    endpoints: [
      {
        method: 'GET',
        url: github,
        match: /api\.github\.com\/repos\/flaviojmendes\/trilhainfo/,
        when: 'Quando o card aparece e não há cache válido.',
        detail: 'Usa só o campo `stargazers_count` da resposta.',
        replay: github,
      },
    ],
  },
  'learning-group': {
    summary:
      'O assunto que você está estudando: passos, referências, prompts de estudo e progresso.',
    notes: [
      'A trilha é escrita em TypeScript (`src/roadmaps/*.ts`) e convertida num catálogo normalizado, com grupos, passos e referências por id, em `src/learning/catalog.ts`.',
      '`projectBranch` escolhe quais passos aparecem em cada modo: essencial, completo ou aprofundado.',
      'As caixas de "Estudei" e "Demonstrei" salvam no `localStorage` (`trilha-study:v1:<trilha>`) pelo `useStudyState`. Nada vai para um servidor.',
      'O `motion.li` do framer-motion anima a reordenação dos passos e é desligado quando o sistema pede menos movimento.',
      'O módulo da trilha é baixado sob demanda. A aba Rede mostra o arquivo que o navegador carregou.',
    ],
    files: [
      source(
        'src/components/LearningWorkspace/GroupContent.tsx',
        () => import('../components/LearningWorkspace/GroupContent.tsx?raw'),
      ),
      source('src/learning/catalog.ts', () => import('../learning/catalog.ts?raw')),
      source('src/learning/loaders.ts', () => import('../learning/loaders.ts?raw')),
      source('src/learning/useStudyState.ts', () => import('../learning/useStudyState.ts?raw')),
    ],
    styles: [
      {
        file: css.workspace,
        needles: [
          '.learning-group',
          '.group-',
          '.learning-step',
          '.node-',
          '.depth-controls',
          '.prerequisite-tag',
          '.completed-prerequisite',
          '.learning-footnote',
          '.related-roadmap',
        ],
      },
    ],
    endpoints: [],
    modules: {
      match:
        /(\/src\/roadmaps\/[\w]+\.ts|\/assets\/(frontend|backend|fullstack|test|devops|dataEngineering|react|entrevistas)[.-][\w-]+\.js)/,
      label: 'Módulos da trilha baixados com import()',
    },
  },
  resources: {
    summary: 'As referências de um passo: vídeos, documentação e exercícios.',
    notes: [
      'No modo essencial, a lista mostra só a primeira referência em português e guarda o resto num `<details>` nativo, que abre e fecha sem JavaScript.',
      'Cada link abre em nova aba e avisa isso aos leitores de tela com um texto `sr-only`.',
      'Os links vêm do catálogo central `src/roadmaps/resources.ts`. Vídeos usam o helper `watch`; documentação usa `read`.',
      'Marcar uma referência como estudada é separado de concluir o passo: ler não é o mesmo que demonstrar a habilidade.',
    ],
    files: [
      source(
        'src/components/LearningWorkspace/ResourceList.tsx',
        () => import('../components/LearningWorkspace/ResourceList.tsx?raw'),
      ),
      source('src/roadmaps/resources.ts', () => import('../roadmaps/resources.ts?raw')),
    ],
    styles: [
      {
        file: css.workspace,
        needles: ['.learning-resources', '.resource-', '.more-references', '.community-credit'],
      },
    ],
    endpoints: [],
  },
  contribute: {
    summary:
      'Abre o formulário para sugerir um conteúdo. Ao enviar, o servidor abre um pull request no GitHub.',
    notes: [
      'O formulário valida no navegador com as mesmas regras do servidor: `src/contributions/validate.ts` é importado pelos dois lados.',
      'O servidor não confia no navegador. Ele valida de novo, limita envios por IP, confere o Cloudflare Turnstile e compara a sugestão com o catálogo publicado em `/data/<trilha>.json`.',
      'Antes de abrir o PR, o servidor procura pull requests abertos com o mesmo link para evitar duplicatas.',
      'O PR é aberto por um GitHub App. O servidor assina um JWT com a chave privada e troca por um token da instalação; a chave nunca chega ao navegador.',
      'O diálogo é um Radix Dialog: o foco fica preso dentro dele, Esc fecha e o foco volta ao botão que o abriu.',
    ],
    files: [
      source(
        'src/components/Contribute/ContributeDialog.tsx',
        () => import('../components/Contribute/ContributeDialog.tsx?raw'),
      ),
      source('src/contributions/client.ts', () => import('../contributions/client.ts?raw')),
      source('src/contributions/validate.ts', () => import('../contributions/validate.ts?raw')),
      source('api/contributions.ts', () => import('../../api/contributions.ts?raw')),
      source('server/contributions.ts', () => import('../../server/contributions.ts?raw')),
      source('server/github.ts', () => import('../../server/github.ts?raw')),
    ],
    styles: [{ file: css.contribute, needles: ['.group-contribute', '.contribute'] }],
    endpoints: [
      {
        method: 'GET',
        url: '/api/link-info?url=…',
        match: /\/api\/link-info/,
        when: 'Quando você sai do campo de link com um endereço do YouTube.',
        detail: 'O servidor consulta o oEmbed do YouTube e devolve o título do vídeo.',
        server: 'server/contributions.ts',
      },
      {
        method: 'POST',
        url: '/api/contributions',
        match: /\/api\/contributions/,
        when: 'Quando você envia a sugestão.',
        detail:
          'Respostas: 201 com o pull request, 409 se o link já está em revisão, 422 com erros por campo, 403 se o Turnstile falhar e 429 se houver envios demais.',
        server: 'server/contributions.ts',
      },
    ],
  },
  header: {
    summary: 'Navegação principal, links do projeto e a conta de quem entrou.',
    notes: [
      'O cabeçalho é `position: fixed` com `backdrop-filter` para o efeito de vidro. O `<main>` compensa a altura com `padding-top: var(--site-header)`.',
      '`NavLink` marca a página atual com `aria-current="page"` sem código extra.',
      'O login usa Auth0 (`useAuth0`). Os botões de conta só aparecem com uma sessão ativa.',
      'Em telas pequenas, a navegação passa para o `MobileMenu`.',
    ],
    files: [
      source('src/components/Header/index.tsx', () => import('../components/Header/index.tsx?raw')),
      source(
        'src/components/MobileMenu/index.tsx',
        () => import('../components/MobileMenu/index.tsx?raw'),
      ),
      source('src/components/Logo/index.tsx', () => import('../components/Logo/index.tsx?raw')),
    ],
    styles: [
      {
        file: css.site,
        needles: [
          '.site-header',
          '.site-nav',
          '.site-logo',
          '.site-icon-link',
          '.site-user',
          '.site-ghost-button',
          '.site-menu',
        ],
      },
    ],
    endpoints: [
      {
        method: 'GET',
        url: 'https://trilha-info.us.auth0.com/…',
        match: /auth0\.com/,
        when: 'Quando o SDK do Auth0 confere se existe uma sessão.',
      },
    ],
  },
  footer: {
    summary: 'O rodapé de todas as páginas e o interruptor deste modo desenvolvedor.',
    notes: [
      'O rodapé faz parte do `MainLayout`, que envolve as páginas do site.',
      'O botão `</>` liga este modo. O estado fica no `localStorage` (`trilha:dev-mode`) e chega aos componentes por um store pequeno com `useSyncExternalStore`.',
      'Com o modo ligado, `window.fetch` é envolvido por um gravador. Ele anota método, URL, status, tempo e uma cópia da resposta, e esconde campos com "token" ou "secret" no nome.',
      'O verso de cada card é carregado só quando você o vira: o código-fonte vem de importações `?raw` do Vite, que viram arquivos separados no build.',
    ],
    files: [
      source(
        'src/components/layouts/MainLayout.tsx',
        () => import('../components/layouts/MainLayout.tsx?raw'),
      ),
      source('src/devmode/state.ts', () => import('./state.ts?raw')),
      source('src/devmode/network.ts', () => import('./network.ts?raw')),
      source('src/devmode/DevFlip.tsx', () => import('./DevFlip.tsx?raw')),
    ],
    styles: [
      { file: css.site, needles: ['.site-footer'] },
      { file: css.devmode, needles: ['.dev-'] },
    ],
    endpoints: [
      {
        url: 'Qualquer endereço',
        match: /./,
        when: 'Todas as chamadas feitas por esta página desde que o modo foi ligado.',
      },
    ],
  },
};
