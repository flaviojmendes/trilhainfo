import { Link, LinkContentType, LinkType } from '../entity/RoadmapModel';

// Documentação gratuita. O idioma faz parte do título para orientar iniciantes.
const read = (label: string, url: string, id: string): Link => ({
  id,
  language: /português/.test(label) ? 'pt-BR' : /inglês/.test(label) ? 'en' : null,
  estimatedMinutes: null,
  lastReviewedAt: null,
  label,
  url,
  type: LinkType.FREE,
  contentType: LinkContentType.READ,
});

const watch = (label: string, url: string, id: string): Link => ({
  ...read(label, url, id),
  contentType: LinkContentType.WATCH,
});

export const resources = {
  cursor: read(
    'Cursor: uso do agente (inglês; documentação gratuita)',
    'https://cursor.com/docs/agent/overview',
    'resource.cursor',
  ),
  cursorPrompts: read(
    'Cursor: prompts e contexto (inglês; documentação gratuita)',
    'https://cursor.com/docs/agent/prompting',
    'resource.cursorPrompts',
  ),
  cursorRules: read(
    'Cursor: regras do projeto (inglês; documentação gratuita)',
    'https://cursor.com/docs/rules',
    'resource.cursorRules',
  ),
  claude: read(
    'Claude Code: primeiros passos (inglês; documentação gratuita)',
    'https://code.claude.com/docs/en/quickstart',
    'resource.claude',
  ),
  claudePractices: read(
    'Claude Code: boas práticas (inglês; documentação gratuita)',
    'https://code.claude.com/docs/en/best-practices',
    'resource.claudePractices',
  ),
  codex: read(
    'OpenAI: primeiros passos com Codex (inglês; documentação gratuita)',
    'https://developers.openai.com/codex/quickstart/',
    'resource.codex',
  ),
  codexPrompts: read(
    'OpenAI: prompting para tarefas de código (inglês; documentação gratuita)',
    'https://developers.openai.com/codex/prompting/',
    'resource.codexPrompts',
  ),
  codexRules: read(
    'OpenAI: instruções de projeto com AGENTS.md (inglês; documentação gratuita)',
    'https://developers.openai.com/codex/guides/agents-md/',
    'resource.codexRules',
  ),
  web: read(
    'MDN: como a web funciona (português)',
    'https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works',
    'resource.web',
  ),
  curriculum: read(
    'MDN: currículo de desenvolvimento web (inglês)',
    'https://developer.mozilla.org/en-US/curriculum/',
    'resource.curriculum',
  ),
  html: read(
    'MDN: HTML (português)',
    'https://developer.mozilla.org/pt-BR/docs/Web/HTML',
    'resource.html',
  ),
  css: read(
    'MDN: CSS (português)',
    'https://developer.mozilla.org/pt-BR/docs/Web/CSS',
    'resource.css',
  ),
  js: read(
    'MDN: guia de JavaScript (português)',
    'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide',
    'resource.js',
  ),
  htmlCourse: read(
    'Curso em Vídeo: HTML e CSS, módulo 1 (português; conteúdo gratuito, certificado opcional pago)',
    'https://www.cursoemvideo.com/curso/html5-css3-modulo1/',
    'resource.htmlCourse',
  ),
  jsCourse: read(
    'Curso em Vídeo: JavaScript (português; conteúdo gratuito, certificado opcional pago)',
    'https://www.cursoemvideo.com/curso/javascript/',
    'resource.jsCourse',
  ),
  git: read(
    'Pro Git: livro gratuito (português)',
    'https://git-scm.com/book/pt-br/v2',
    'resource.git',
  ),
  http: read(
    'MDN: HTTP (português)',
    'https://developer.mozilla.org/pt-BR/docs/Web/HTTP',
    'resource.http',
  ),
  fetch: read(
    'MDN: usando Fetch (português)',
    'https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch',
    'resource.fetch',
  ),
  accessibility: read(
    'MDN: acessibilidade (português)',
    'https://developer.mozilla.org/pt-BR/docs/Web/Accessibility',
    'resource.accessibility',
  ),
  ts: read(
    'TypeScript: handbook (inglês)',
    'https://www.typescriptlang.org/docs/handbook/intro.html',
    'resource.ts',
  ),
  vite: read('Vite: primeiros passos (português)', 'https://pt.vite.dev/guide/', 'resource.vite'),
  react: read(
    'React: aprenda React (português)',
    'https://pt-br.react.dev/learn',
    'resource.react',
  ),
  effects: read(
    'React: talvez você não precise de um Effect (português)',
    'https://pt-br.react.dev/learn/you-might-not-need-an-effect',
    'resource.effects',
  ),
  reactSetup: read(
    'React: criar um projeto (português)',
    'https://pt-br.react.dev/learn/creating-a-react-app',
    'resource.reactSetup',
  ),
  cra: read(
    'React: descontinuação do Create React App (inglês)',
    'https://react.dev/blog/2025/02/14/sunsetting-create-react-app',
    'resource.cra',
  ),
  router: read(
    'React Router: modos e primeiros passos (inglês)',
    'https://reactrouter.com/start/modes',
    'resource.router',
  ),
  next: read(
    'Next.js: curso oficial de aplicação completa (inglês)',
    'https://nextjs.org/learn',
    'resource.next',
  ),
  angular: read(
    'Angular: tutorial interativo (inglês)',
    'https://angular.dev/tutorials/learn-angular',
    'resource.angular',
  ),
  vue: read(
    'Vue.js: introdução (inglês)',
    'https://vuejs.org/guide/introduction.html',
    'resource.vue',
  ),
  testingLibrary: read(
    'Testing Library: testes centrados no usuário (inglês)',
    'https://testing-library.com/docs/react-testing-library/intro/',
    'resource.testingLibrary',
  ),
  vitest: read('Vitest: primeiros passos (inglês)', 'https://vitest.dev/guide/', 'resource.vitest'),
  playwright: read(
    'Playwright: testes de ponta a ponta (inglês)',
    'https://playwright.dev/docs/intro',
    'resource.playwright',
  ),
  playwrightApi: read(
    'Playwright: testes de API (inglês)',
    'https://playwright.dev/docs/api-testing',
    'resource.playwrightApi',
  ),
  performance: read(
    'web.dev: métricas de desempenho (português)',
    'https://web.dev/articles/vitals?hl=pt-br',
    'resource.performance',
  ),
  node: read(
    'Node.js: introdução (inglês)',
    'https://nodejs.org/en/learn/getting-started/introduction-to-nodejs',
    'resource.node',
  ),
  python: read(
    'Python: tutorial oficial (português)',
    'https://docs.python.org/pt-br/3/tutorial/',
    'resource.python',
  ),
  pythonCourse: read(
    'Curso em Vídeo: Python, mundo 1 (português; conteúdo gratuito, certificado opcional pago)',
    'https://www.cursoemvideo.com/curso/python-3-mundo-1/',
    'resource.pythonCourse',
  ),
  fastapi: read(
    'FastAPI: tutorial (português)',
    'https://fastapi.tiangolo.com/pt/tutorial/',
    'resource.fastapi',
  ),
  java: read('Java: primeiros passos (inglês)', 'https://dev.java/learn/', 'resource.java'),
  spring: read(
    'Spring: construindo uma API REST (inglês)',
    'https://spring.io/guides/gs/rest-service',
    'resource.spring',
  ),
  dotnet: read(
    'Microsoft Learn: C# (português)',
    'https://learn.microsoft.com/pt-br/dotnet/csharp/',
    'resource.dotnet',
  ),
  aspnet: read(
    'Microsoft Learn: APIs com ASP.NET Core (português)',
    'https://learn.microsoft.com/pt-br/aspnet/core/tutorials/first-web-api',
    'resource.aspnet',
  ),
  postgres: read(
    'PostgreSQL: tutorial de SQL (inglês)',
    'https://www.postgresql.org/docs/current/tutorial.html',
    'resource.postgres',
  ),
  sql: read(
    'Microsoft Learn: introdução a Transact-SQL (português)',
    'https://learn.microsoft.com/pt-br/training/paths/get-started-querying-with-transact-sql/',
    'resource.sql',
  ),
  openapi: read(
    'OpenAPI: especificação de contratos HTTP (inglês)',
    'https://spec.openapis.org/oas/latest.html',
    'resource.openapi',
  ),
  security: read(
    'OWASP: guia de segurança de aplicações (inglês)',
    'https://cheatsheetseries.owasp.org/',
    'resource.security',
  ),
  docker: read(
    'Docker: primeiros passos (inglês)',
    'https://docs.docker.com/get-started/',
    'resource.docker',
  ),
  compose: read(
    'Docker Compose: primeiros passos (inglês)',
    'https://docs.docker.com/compose/gettingstarted/',
    'resource.compose',
  ),
  actions: read(
    'GitHub Actions: integração contínua (português)',
    'https://docs.github.com/pt/actions/get-started/continuous-integration',
    'resource.actions',
  ),
  pages: read(
    'GitHub Pages: publicação de um site (português)',
    'https://docs.github.com/pt/pages/getting-started-with-github-pages/creating-a-github-pages-site',
    'resource.pages',
  ),
  linux: read(
    'Ubuntu: terminal para iniciantes (inglês)',
    'https://ubuntu.com/tutorials/command-line-for-beginners',
    'resource.linux',
  ),
  bash: read(
    'GNU Bash: manual (inglês)',
    'https://www.gnu.org/software/bash/manual/bash.html',
    'resource.bash',
  ),
  cloud: read(
    'Microsoft Learn: conceitos de nuvem (português; laboratório local recomendado)',
    'https://learn.microsoft.com/pt-br/training/paths/microsoft-azure-fundamentals-describe-cloud-concepts/',
    'resource.cloud',
  ),
  terraform: read(
    'Terraform: infraestrutura como código com Docker local (inglês)',
    'https://developer.hashicorp.com/terraform/tutorials/docker-get-started',
    'resource.terraform',
  ),
  otel: read(
    'OpenTelemetry: conceitos de observabilidade (português)',
    'https://opentelemetry.io/pt/docs/concepts/observability-primer/',
    'resource.otel',
  ),
  sre: read(
    'Google SRE: livro gratuito (inglês)',
    'https://sre.google/sre-book/table-of-contents/',
    'resource.sre',
  ),
  kubernetes: read(
    'Kubernetes: conceitos (português)',
    'https://kubernetes.io/pt-br/docs/concepts/',
    'resource.kubernetes',
  ),
  istqb: read(
    'BSTQB: syllabus e materiais de estudo gratuitos (português; exame opcional pago)',
    'https://bstqb.org.br/b9/sobre/syllabus',
    'resource.istqb',
  ),
  pytest: read(
    'pytest: primeiros passos (inglês)',
    'https://docs.pytest.org/en/stable/getting-started.html',
    'resource.pytest',
  ),
  k6: read(
    'Grafana k6: primeiros passos com testes de carga (inglês)',
    'https://grafana.com/docs/k6/latest/get-started/',
    'resource.k6',
  ),
  pandas: read(
    'pandas: tutoriais introdutórios (inglês)',
    'https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html',
    'resource.pandas',
  ),
  duckdb: read('DuckDB: introdução (inglês)', 'https://duckdb.org/docs/stable/', 'resource.duckdb'),
  dbt: read(
    'dbt: introdução às transformações de dados (inglês)',
    'https://docs.getdbt.com/docs/introduction',
    'resource.dbt',
  ),
  airflow: read(
    'Apache Airflow: tutoriais de orquestração (inglês)',
    'https://airflow.apache.org/docs/apache-airflow/stable/tutorial/index.html',
    'resource.airflow',
  ),
  spark: read(
    'Apache Spark: primeiros passos (inglês)',
    'https://spark.apache.org/docs/latest/quick-start.html',
    'resource.spark',
  ),
  kafka: read(
    'Apache Kafka: introdução e primeiros passos (inglês)',
    'https://kafka.apache.org/quickstart',
    'resource.kafka',
  ),
  algorithms: read(
    'Python: estruturas de dados (português)',
    'https://docs.python.org/pt-br/3/tutorial/datastructures.html',
    'resource.algorithms',
  ),
  algorithmsCourse: read(
    'MIT OpenCourseWare: algoritmos, complexidade e grafos (inglês)',
    'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/pages/lecture-notes/',
    'resource.algorithmsCourse',
  ),
  contribute: read(
    'GitHub: como contribuir com projetos (português)',
    'https://docs.github.com/pt/get-started/exploring-projects-on-github/contributing-to-a-project',
    'resource.contribute',
  ),
  ai: read(
    'GitHub: uso responsável de sugestões de IA (português)',
    'https://docs.github.com/pt/copilot/responsible-use/copilot-code-completion',
    'resource.ai',
  ),
  youtubeLinuxtips: watch(
    'LINUXtips: Linux e terminal (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/linuxtips',
    'resource.youtubeLinuxtips',
  ),
  youtubeBosonLinux: watch(
    'Bóson Treinamentos: sistemas operacionais e Linux (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/bosontreinamentos',
    'resource.youtubeBosonLinux',
  ),
  youtubeRocketseat: watch(
    'Rocketseat: Node.js (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/rocketseat',
    'resource.youtubeRocketseat',
  ),
  youtubeErickWendel: watch(
    'Erick Wendel: Node.js avançado (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/ErickWendelTreinamentos',
    'resource.youtubeErickWendel',
  ),
  youtubeDevDojo: watch(
    'DevDojo: Maratona Java (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/DevDojoBrasil',
    'resource.youtubeDevDojo',
  ),
  youtubeMichelliSpring: watch(
    'Michelli Brito: Spring Boot e microsserviços (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/MichelliBrito',
    'resource.youtubeMichelliSpring',
  ),
  youtubePythonCourse: watch(
    'Curso em Vídeo: Python 3, mundo 1 (português; playlist gratuita no YouTube)',
    'https://www.youtube.com/playlist?list=PLHz_AreHm4dlKP6QQCekuIPky1CiwmdI6',
    'resource.youtubePythonCourse',
  ),
  youtubeDunossauro: watch(
    'Eduardo Mendes: Python profundo (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/@Dunossauro',
    'resource.youtubeDunossauro',
  ),
  youtubeAprendaGo: watch(
    'Ellen Körbes: Aprenda Go (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/@AprendaGo',
    'resource.youtubeAprendaGo',
  ),
  youtubeAprendaGolang: watch(
    'Aprenda Golang: Go para backend (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/@tiago.temporin',
    'resource.youtubeAprendaGolang',
  ),
  youtubeDesenvolvedorIo: watch(
    'desenvolvedor.io: C# e arquitetura (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/Desenvolvedorio',
    'resource.youtubeDesenvolvedorIo',
  ),
  youtubeLuisDev: watch(
    'LuisDev: APIs em .NET (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/luisdev',
    'resource.youtubeLuisDev',
  ),
  youtubeMysqlCourse: watch(
    'Curso em Vídeo: bancos de dados e MySQL (português; playlist gratuita no YouTube)',
    'https://www.youtube.com/playlist?list=PLHz_AreHm4dkBs-795Dsgvau_ekxg8g1r',
    'resource.youtubeMysqlCourse',
  ),
  youtubeBosonModeling: watch(
    'Bóson Treinamentos: modelagem de dados (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/bosontreinamentos',
    'resource.youtubeBosonModeling',
  ),
  youtubeBranas: watch(
    'Rodrigo Branas: padrões de API e Clean Architecture (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/RodrigoBranas',
    'resource.youtubeBranas',
  ),
  youtubeFullCycleApis: watch(
    'Full Cycle: REST, gRPC e GraphQL (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/FullCycle',
    'resource.youtubeFullCycleApis',
  ),
  youtubeTrilhaInfo: watch(
    'Flávio Mendes (Trilha Info): arquitetura e carreira (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/@atrilhainfo',
    'resource.youtubeTrilhaInfo',
  ),
  youtubeFullCycleArchitecture: watch(
    'Full Cycle: arquitetura e microsserviços (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/FullCycle',
    'resource.youtubeFullCycleArchitecture',
  ),
  youtubeManguinho: watch(
    'Rodrigo Manguinho: Clean Architecture na prática (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/@rmanguinho',
    'resource.youtubeManguinho',
  ),
  youtubeMichelliMessaging: watch(
    'Michelli Brito: RabbitMQ e Kafka na prática (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/MichelliBrito',
    'resource.youtubeMichelliMessaging',
  ),
  youtubeFullCycleMessaging: watch(
    'Full Cycle: mensageria para alta escalabilidade (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/FullCycle',
    'resource.youtubeFullCycleMessaging',
  ),
  youtubeLinuxtipsContainers: watch(
    'LINUXtips: Docker e Kubernetes (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/linuxtips',
    'resource.youtubeLinuxtipsContainers',
  ),
  youtubeVeronez: watch(
    'Fabricio Veronez: Docker e Kubernetes descomplicados (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/FabricioVeronez',
    'resource.youtubeVeronez',
  ),
  youtubeAlgorithmsCourse: watch(
    'Curso em Vídeo: algoritmos e lógica de programação (português; playlist gratuita no YouTube)',
    'https://www.youtube.com/playlist?list=PLHz_AreHm4dmSj0MHol_aoNYCSGFqvfXV',
    'resource.youtubeAlgorithmsCourse',
  ),
  youtubeAkita: watch(
    'Fabio Akita: base da computação e algoritmos (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/FabioAkita1990',
    'resource.youtubeAkita',
  ),
  youtubeDeschamps: watch(
    'Filipe Deschamps: carreira, atitude e soft skills (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/FilipeDeschamps',
    'resource.youtubeDeschamps',
  ),
  youtubeMontanoInterviews: watch(
    'Lucas Montano: entrevistas em big techs e carreira (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/LucasMontano',
    'resource.youtubeMontanoInterviews',
  ),
  youtubeSoutinhoLiveCoding: watch(
    'Mario Souto (DevSoutinho): live coding e desafios (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/DevSoutinho',
    'resource.youtubeSoutinhoLiveCoding',
  ),
  youtubeRocketseatChallenges: watch(
    'Rocketseat: resolução de desafios técnicos (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/rocketseat',
    'resource.youtubeRocketseatChallenges',
  ),
  youtubeSoutinhoPortfolio: watch(
    'Mario Souto (DevSoutinho): como montar um portfólio (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/DevSoutinho',
    'resource.youtubeSoutinhoPortfolio',
  ),
  youtubeMontanoResume: watch(
    'Lucas Montano: revisão de currículos e contratação (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/LucasMontano',
    'resource.youtubeMontanoResume',
  ),
  youtubeDeschampsWeb: watch(
    'Filipe Deschamps: como a internet funciona e APIs (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/FilipeDeschamps',
    'resource.youtubeDeschampsWeb',
  ),
  youtubeCodigoFonte: watch(
    'Código Fonte TV: Dicionário do Programador (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/codigofontetv',
    'resource.youtubeCodigoFonte',
  ),
  youtubeHtmlCourse: watch(
    'Curso em Vídeo: HTML5 completo (português; playlist gratuita no YouTube)',
    'https://www.youtube.com/playlist?list=PLHz_AreHm4dlAnJ_jJtV29RFxnPHDuk9o',
    'resource.youtubeHtmlCourse',
  ),
  youtubeCssCourse: watch(
    'Curso em Vídeo: HTML5 e CSS3, módulo 2 (português; playlist gratuita no YouTube)',
    'https://www.youtube.com/playlist?list=PLHz_AreHm4dlUpEXkY1AyVLQGcpSgVF8s',
    'resource.youtubeCssCourse',
  ),
  youtubeOrigamid: watch(
    'Origamid: CSS avançado e interfaces (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/Origamid',
    'resource.youtubeOrigamid',
  ),
  youtubeJsCourse: watch(
    'Curso em Vídeo: JavaScript para iniciantes (português; playlist gratuita no YouTube)',
    'https://www.youtube.com/playlist?list=PLHz_AreHm4dlsK3Nr9GVvXCbpQyHQl1o1',
    'resource.youtubeJsCourse',
  ),
  youtubeHoraDeCodarJs: watch(
    'Hora de Codar: JavaScript e projetos (português; playlist gratuita no YouTube)',
    'https://www.youtube.com/playlist?list=PLnDvRpP8BneysKU8KivhnrVaKpILD3gZ6',
    'resource.youtubeHoraDeCodarJs',
  ),
  youtubeBranasTs: watch(
    'Rodrigo Branas: masterclass de TypeScript (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/RodrigoBranas',
    'resource.youtubeBranasTs',
  ),
  youtubeRocketseatTs: watch(
    'Rocketseat: TypeScript na prática (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/rocketseat',
    'resource.youtubeRocketseatTs',
  ),
  youtubeGitJusten: watch(
    'Willian Justen: Git e GitHub para iniciantes (português; playlist gratuita no YouTube)',
    'https://www.youtube.com/playlist?list=PLlAbYrWSYTiPA2iEiQ2PF_A9j__C4hi0A',
    'resource.youtubeGitJusten',
  ),
  youtubeGitCourse: watch(
    'Curso em Vídeo: Git e GitHub (português; playlist gratuita no YouTube)',
    'https://www.youtube.com/playlist?list=PLHz_AreHm4dm7ZULPAmadvNhH6vk9oNZA',
    'resource.youtubeGitCourse',
  ),
  youtubeHoraDeCodarReact: watch(
    'Hora de Codar: curso de React (português; playlist gratuita no YouTube)',
    'https://www.youtube.com/playlist?list=PLnDvRpP8BneyVA0SZ2okm-QBojomniQVO',
    'resource.youtubeHoraDeCodarReact',
  ),
  youtubeRocketseatReact: watch(
    'Rocketseat: ecossistema React e Next.js (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/rocketseat',
    'resource.youtubeRocketseatReact',
  ),
  youtubeRocketseatTailwind: watch(
    'Rocketseat: projetos com Tailwind CSS (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/rocketseat',
    'resource.youtubeRocketseatTailwind',
  ),
  youtubeHoraDeCodarCss: watch(
    'Hora de Codar: Bootstrap e Tailwind (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/@MatheusBattisti',
    'resource.youtubeHoraDeCodarCss',
  ),
  youtubeLoiane: watch(
    'Loiane Groner: curso completo de Angular (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/loianegroner',
    'resource.youtubeLoiane',
  ),
  youtubeTiagoMatos: watch(
    'Tiago Matos: cursos de Vue.js (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/tiagomatosweb',
    'resource.youtubeTiagoMatos',
  ),
  youtubeSionekCareer: watch(
    'André Sionek: carreira em engenharia de dados (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/AndreSionek',
    'resource.youtubeSionekCareer',
  ),
  youtubeComunidadeDsCareer: watch(
    'Comunidade DS: jornada e profissões em dados (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/@ComunidadeDS',
    'resource.youtubeComunidadeDsCareer',
  ),
  youtubeLetsData: watch(
    "Let's Data: Python para dados (português; vídeos gratuitos no YouTube)",
    'https://www.youtube.com/@letsdataAI',
    'resource.youtubeLetsData',
  ),
  youtubeHashtagSql: watch(
    'Hashtag Treinamentos: SQL para análise de dados (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/HashtagTreinamentos',
    'resource.youtubeHashtagSql',
  ),
  youtubeComunidadeDsWarehouse: watch(
    'Comunidade DS: data warehouse e data lake (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/@ComunidadeDS',
    'resource.youtubeComunidadeDsWarehouse',
  ),
  youtubeDataHackers: watch(
    'Data Hackers: arquitetura de dados modernas (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/DataHackers',
    'resource.youtubeDataHackers',
  ),
  youtubeSionekSpark: watch(
    'André Sionek: Apache Spark e Databricks (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/AndreSionek',
    'resource.youtubeSionekSpark',
  ),
  youtubeLuanMorenoSpark: watch(
    'Luan Moreno: engenharia de dados na prática (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/@LuanMorenoMMaciel',
    'resource.youtubeLuanMorenoSpark',
  ),
  youtubeSionekAirflow: watch(
    'André Sionek: Apache Airflow (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/AndreSionek',
    'resource.youtubeSionekAirflow',
  ),
  youtubeComunidadeDsCloud: watch(
    'Comunidade DS: cloud AWS para dados (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/@ComunidadeDS',
    'resource.youtubeComunidadeDsCloud',
  ),
  youtubeLinuxtipsAzure: watch(
    'LINUXtips: certificações de nuvem e Azure (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/linuxtips',
    'resource.youtubeLinuxtipsAzure',
  ),
  youtubeFullCycleKafka: watch(
    'Full Cycle: Apache Kafka descomplicado (português; vídeos gratuitos no YouTube)',
    'https://www.youtube.com/c/FullCycle',
    'resource.youtubeFullCycleKafka',
  ),
};
