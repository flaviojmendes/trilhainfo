import { Link, LinkContentType, LinkType } from '../entity/RoadmapModel';

// Documentação gratuita. O idioma faz parte do título para orientar iniciantes.
const read = (label: string, url: string): Link => ({
  label,
  url,
  type: LinkType.FREE,
  contentType: LinkContentType.READ,
});

export const resources = {
  cursor: read(
    'Cursor: uso do agente (inglês; documentação gratuita)',
    'https://cursor.com/docs/agent/overview',
  ),
  cursorPrompts: read(
    'Cursor: prompts e contexto (inglês; documentação gratuita)',
    'https://cursor.com/docs/agent/prompting',
  ),
  cursorRules: read(
    'Cursor: regras do projeto (inglês; documentação gratuita)',
    'https://cursor.com/docs/rules',
  ),
  claude: read(
    'Claude Code: primeiros passos (inglês; documentação gratuita)',
    'https://code.claude.com/docs/en/quickstart',
  ),
  claudePractices: read(
    'Claude Code: boas práticas (inglês; documentação gratuita)',
    'https://code.claude.com/docs/en/best-practices',
  ),
  codex: read(
    'OpenAI: primeiros passos com Codex (inglês; documentação gratuita)',
    'https://developers.openai.com/codex/quickstart/',
  ),
  codexPrompts: read(
    'OpenAI: prompting para tarefas de código (inglês; documentação gratuita)',
    'https://developers.openai.com/codex/prompting/',
  ),
  codexRules: read(
    'OpenAI: instruções de projeto com AGENTS.md (inglês; documentação gratuita)',
    'https://developers.openai.com/codex/guides/agents-md/',
  ),
  web: read(
    'MDN: como a web funciona (português)',
    'https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works',
  ),
  curriculum: read(
    'MDN: currículo de desenvolvimento web (inglês)',
    'https://developer.mozilla.org/en-US/curriculum/',
  ),
  html: read('MDN: HTML (português)', 'https://developer.mozilla.org/pt-BR/docs/Web/HTML'),
  css: read('MDN: CSS (português)', 'https://developer.mozilla.org/pt-BR/docs/Web/CSS'),
  js: read(
    'MDN: guia de JavaScript (português)',
    'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide',
  ),
  htmlCourse: read(
    'Curso em Vídeo: HTML e CSS, módulo 1 (português; conteúdo gratuito, certificado opcional pago)',
    'https://www.cursoemvideo.com/curso/html5-css3-modulo1/',
  ),
  jsCourse: read(
    'Curso em Vídeo: JavaScript (português; conteúdo gratuito, certificado opcional pago)',
    'https://www.cursoemvideo.com/curso/javascript/',
  ),
  git: read('Pro Git: livro gratuito (português)', 'https://git-scm.com/book/pt-br/v2'),
  http: read('MDN: HTTP (português)', 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP'),
  fetch: read(
    'MDN: usando Fetch (português)',
    'https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch',
  ),
  accessibility: read(
    'MDN: acessibilidade (português)',
    'https://developer.mozilla.org/pt-BR/docs/Web/Accessibility',
  ),
  ts: read(
    'TypeScript: handbook (inglês)',
    'https://www.typescriptlang.org/docs/handbook/intro.html',
  ),
  vite: read('Vite: primeiros passos (português)', 'https://pt.vite.dev/guide/'),
  react: read('React: aprenda React (português)', 'https://pt-br.react.dev/learn'),
  effects: read(
    'React: talvez você não precise de um Effect (português)',
    'https://pt-br.react.dev/learn/you-might-not-need-an-effect',
  ),
  reactSetup: read(
    'React: criar um projeto (português)',
    'https://pt-br.react.dev/learn/creating-a-react-app',
  ),
  cra: read(
    'React: descontinuação do Create React App (inglês)',
    'https://react.dev/blog/2025/02/14/sunsetting-create-react-app',
  ),
  router: read(
    'React Router: modos e primeiros passos (inglês)',
    'https://reactrouter.com/start/modes',
  ),
  next: read('Next.js: curso oficial de aplicação completa (inglês)', 'https://nextjs.org/learn'),
  testingLibrary: read(
    'Testing Library: testes centrados no usuário (inglês)',
    'https://testing-library.com/docs/react-testing-library/intro/',
  ),
  vitest: read('Vitest: primeiros passos (inglês)', 'https://vitest.dev/guide/'),
  playwright: read(
    'Playwright: testes de ponta a ponta (inglês)',
    'https://playwright.dev/docs/intro',
  ),
  playwrightApi: read(
    'Playwright: testes de API (inglês)',
    'https://playwright.dev/docs/api-testing',
  ),
  performance: read(
    'web.dev: métricas de desempenho (português)',
    'https://web.dev/articles/vitals?hl=pt-br',
  ),
  node: read(
    'Node.js: introdução (inglês)',
    'https://nodejs.org/en/learn/getting-started/introduction-to-nodejs',
  ),
  python: read('Python: tutorial oficial (português)', 'https://docs.python.org/pt-br/3/tutorial/'),
  pythonCourse: read(
    'Curso em Vídeo: Python, mundo 1 (português; conteúdo gratuito, certificado opcional pago)',
    'https://www.cursoemvideo.com/curso/python-3-mundo-1/',
  ),
  fastapi: read('FastAPI: tutorial (português)', 'https://fastapi.tiangolo.com/pt/tutorial/'),
  java: read('Java: primeiros passos (inglês)', 'https://dev.java/learn/'),
  spring: read(
    'Spring: construindo uma API REST (inglês)',
    'https://spring.io/guides/gs/rest-service',
  ),
  dotnet: read(
    'Microsoft Learn: C# (português)',
    'https://learn.microsoft.com/pt-br/dotnet/csharp/',
  ),
  aspnet: read(
    'Microsoft Learn: APIs com ASP.NET Core (português)',
    'https://learn.microsoft.com/pt-br/aspnet/core/tutorials/first-web-api',
  ),
  postgres: read(
    'PostgreSQL: tutorial de SQL (inglês)',
    'https://www.postgresql.org/docs/current/tutorial.html',
  ),
  sql: read(
    'Microsoft Learn: introdução a Transact-SQL (português)',
    'https://learn.microsoft.com/pt-br/training/paths/get-started-querying-with-transact-sql/',
  ),
  openapi: read(
    'OpenAPI: especificação de contratos HTTP (inglês)',
    'https://spec.openapis.org/oas/latest.html',
  ),
  security: read(
    'OWASP: guia de segurança de aplicações (inglês)',
    'https://cheatsheetseries.owasp.org/',
  ),
  docker: read('Docker: primeiros passos (inglês)', 'https://docs.docker.com/get-started/'),
  compose: read(
    'Docker Compose: primeiros passos (inglês)',
    'https://docs.docker.com/compose/gettingstarted/',
  ),
  actions: read(
    'GitHub Actions: integração contínua (português)',
    'https://docs.github.com/pt/actions/get-started/continuous-integration',
  ),
  pages: read(
    'GitHub Pages: publicação de um site (português)',
    'https://docs.github.com/pt/pages/getting-started-with-github-pages/creating-a-github-pages-site',
  ),
  linux: read(
    'Ubuntu: terminal para iniciantes (inglês)',
    'https://ubuntu.com/tutorials/command-line-for-beginners',
  ),
  bash: read('GNU Bash: manual (inglês)', 'https://www.gnu.org/software/bash/manual/bash.html'),
  cloud: read(
    'Microsoft Learn: conceitos de nuvem (português; laboratório local recomendado)',
    'https://learn.microsoft.com/pt-br/training/paths/microsoft-azure-fundamentals-describe-cloud-concepts/',
  ),
  terraform: read(
    'Terraform: infraestrutura como código com Docker local (inglês)',
    'https://developer.hashicorp.com/terraform/tutorials/docker-get-started',
  ),
  otel: read(
    'OpenTelemetry: conceitos de observabilidade (português)',
    'https://opentelemetry.io/pt/docs/concepts/observability-primer/',
  ),
  sre: read(
    'Google SRE: livro gratuito (inglês)',
    'https://sre.google/sre-book/table-of-contents/',
  ),
  kubernetes: read(
    'Kubernetes: conceitos (português)',
    'https://kubernetes.io/pt-br/docs/concepts/',
  ),
  istqb: read(
    'BSTQB: syllabus e materiais de estudo gratuitos (português; exame opcional pago)',
    'https://bstqb.org.br/b9/sobre/syllabus',
  ),
  pytest: read(
    'pytest: primeiros passos (inglês)',
    'https://docs.pytest.org/en/stable/getting-started.html',
  ),
  k6: read(
    'Grafana k6: primeiros passos com testes de carga (inglês)',
    'https://grafana.com/docs/k6/latest/get-started/',
  ),
  pandas: read(
    'pandas: tutoriais introdutórios (inglês)',
    'https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html',
  ),
  duckdb: read('DuckDB: introdução (inglês)', 'https://duckdb.org/docs/stable/'),
  dbt: read(
    'dbt: introdução às transformações de dados (inglês)',
    'https://docs.getdbt.com/docs/introduction',
  ),
  airflow: read(
    'Apache Airflow: tutoriais de orquestração (inglês)',
    'https://airflow.apache.org/docs/apache-airflow/stable/tutorial/index.html',
  ),
  spark: read(
    'Apache Spark: primeiros passos (inglês)',
    'https://spark.apache.org/docs/latest/quick-start.html',
  ),
  kafka: read(
    'Apache Kafka: introdução e primeiros passos (inglês)',
    'https://kafka.apache.org/quickstart',
  ),
  algorithms: read(
    'Python: estruturas de dados (português)',
    'https://docs.python.org/pt-br/3/tutorial/datastructures.html',
  ),
  algorithmsCourse: read(
    'MIT OpenCourseWare: algoritmos, complexidade e grafos (inglês)',
    'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/pages/lecture-notes/',
  ),
  contribute: read(
    'GitHub: como contribuir com projetos (português)',
    'https://docs.github.com/pt/get-started/exploring-projects-on-github/contributing-to-a-project',
  ),
  ai: read(
    'GitHub: uso responsável de sugestões de IA (português)',
    'https://docs.github.com/pt/copilot/responsible-use/copilot-code-completion',
  ),
};
