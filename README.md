# Trilha Info

[Acesse a plataforma](https://trilha.info) · [English](translation/readme-en.md) · [Como contribuir](CONTRIBUTING.md) · [Discord](https://discord.gg/TmneeHgTBp)

A **Trilha Info** é uma plataforma open source para aprender tecnologia com conteúdo gratuito, em português e organizado em percursos práticos. Criada em junho de 2022, reúne trilhas de carreira, aulas próprias e interativas, guias rápidos e projetos para o portfólio.

O catálogo atual tem **8 trilhas, 8 cursos, 76 aulas e 34 guias**. Você pode começar sem cadastro e continuar de onde parou, com o progresso salvo no navegador.

![Página inicial da Trilha Info, com a interface atual e as trilhas de aprendizado](public/preview.png)

_Captura da versão local em 19 de outubro de 2026._

## O que você encontra

- **Um percurso por carreira:** fundamentos, práticas verificáveis e trechos que terminam em projetos com critérios de conclusão. Aprofundamentos opcionais aparecem separados do percurso essencial.
- **Três formas de estudar:** Mapa, Estudar e Lista usam o mesmo catálogo e compartilham o progresso. Há busca por assunto, indicação do próximo passo e profundidade essencial, completa ou aprofundada por tópico.
- **Aulas interativas em todas as trilhas:** explicações, diagramas, execução passo a passo, perguntas com feedback, ordenação, classificação e exercícios de completar código.
- **Laboratórios no navegador:** HTML, CSS, JavaScript e React com preview; consultas SQLite; Python com Pyodide; e um terminal guiado com comandos e saídas simulados. Os ambientes React e Python carregam dependências externas sob demanda.
- **Revisão espaçada:** cartões de revisão entram no seu baralho ao concluir as aulas. Aulas compartilhadas entre cursos aproveitam o mesmo progresso.
- **Guias rápidos:** 34 referências com exemplos e diagramas sobre web, APIs, segurança, dados, testes, operação, carreira e colaboração.
- **IA ao longo do aprendizado:** tutoria, prompting, depuração, programação em parceria e tarefas pequenas para agentes, com prompts adaptáveis e verificação do resultado.
- **Planos de estudo:** organização local por objetivo e disponibilidade, exportação do contexto para um assistente externo e importação de planos com validação, revisão e opção de desfazer.
- **Participação da comunidade:** o botão “Sugerir conteúdo” envia materiais ou novos passos para revisão por pull request quando a integração está configurada.
- **Modo desenvolvedor:** ative o botão `</>` no rodapé e use “Código” nos componentes para explorar explicações, fontes, CSS, dados e requisições `fetch` registradas durante o uso.

O progresso de estudo, as preferências, os planos e as revisões ficam em `localStorage`, no navegador utilizado. A exportação do contexto de estudo permite levar o catálogo e o progresso da trilha para um assistente de sua escolha. O aplicativo também oferece download da visualização da trilha em PNG.

## Trilhas disponíveis

O currículo foi revisado em outubro de 2026, com materiais em português na base e indicação de idioma nas referências especializadas.

| Trilha                                                           | Percurso                                                                                 |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [Frontend](https://trilha.info/roadmap/frontend)                 | Web, HTML, CSS, acessibilidade, JavaScript, TypeScript, interfaces, testes e publicação. |
| [Backend](https://trilha.info/roadmap/backend)                   | HTTP, programação, SQL, APIs, autenticação, testes e operação.                           |
| [Fullstack](https://trilha.info/roadmap/fullstack)               | Interface, servidor e banco integrados em um produto, com segurança e entrega.           |
| [Testes / QA](https://trilha.info/roadmap/test)                  | Riscos, exploração, relato de bugs, API, SQL, automação e CI.                            |
| [DevOps](https://trilha.info/roadmap/devops)                     | Linux, redes, scripts, containers, CI/CD, infraestrutura e observabilidade.              |
| [Engenharia de Dados](https://trilha.info/roadmap/data-engineer) | Python, SQL, modelagem, pipelines, transformação, orquestração e governança.             |
| [React](https://trilha.info/roadmap/react)                       | Especialização com componentes, estado, Effects, rotas, dados, testes e desempenho.      |
| [Entrevistas](https://trilha.info/roadmap/entrevistas)           | Apresentação de projetos, código, depuração, algoritmos e simulações por carreira.       |

Para começar, escolha uma [trilha](https://trilha.info/#trilhas), abra os [cursos e aulas](https://trilha.info/aulas) ou consulte os [guias](https://trilha.info/guias). Os projetos e exercícios acompanham o conteúdo; concluir uma referência e demonstrar uma prática são registros distintos.

## Executar localmente

Use **Node.js 24** e **Yarn Classic 1.x** ou npm. O repositório contém `yarn.lock` e `package-lock.json`; use o gerenciador escolhido de forma consistente. A validação desta atualização usa Node.js 24.

```sh
git clone https://github.com/flaviojmendes/trilhainfo.git
cd trilhainfo
yarn install --frozen-lockfile
yarn dev
```

Com npm, os comandos equivalentes são `npm ci` e `npm run dev`.

Abra [localhost:5173](http://localhost:5173). Trilhas, aulas, guias, progresso local e planejamento funcionam **sem configurar uma API ou variáveis de ambiente**.

### Integrações opcionais

Os fluxos de conta, perfil, anotações e criação/edição de trilhas personalizadas usam Auth0 e a API externa. Para utilizá-los, configure os endereços em `.env.local` e permita a origem local nos callbacks do Auth0:

```dotenv
VITE_API_URL=https://api.trilha.info/api
VITE_PUBLIC_URL=https://api.trilha.info/public
```

O envio de sugestões usa os endpoints `/api/contributions` e `/api/link-info`, servidos pelo próprio Vite em desenvolvimento e pelas funções em `api/` na Vercel.

| Variável                                  | Uso                                                                       |
| ----------------------------------------- | ------------------------------------------------------------------------- |
| `VITE_TURNSTILE_SITE_KEY`                 | Chave pública do desafio Turnstile no formulário.                         |
| `TURNSTILE_SECRET_KEY`                    | Validação do desafio no servidor.                                         |
| `GITHUB_APP_ID`, `GITHUB_APP_PRIVATE_KEY` | Credenciais do GitHub App que abre os pull requests, somente no servidor. |
| `GITHUB_APP_INSTALLATION_ID`              | Instalação do App; pode ser descoberta automaticamente quando omitida.    |
| `CONTRIBUTIONS_REPOSITORY`                | Repositório de destino; padrão: `flaviojmendes/trilhainfo`.               |
| `CONTRIBUTIONS_BASE_BRANCH`               | Branch de destino; padrão: `main`.                                        |
| `SITE_URL`                                | Origem pública usada pelo servidor para consultar o catálogo.             |

Sem GitHub App, o desenvolvimento local retorna uma simulação e o JSON da sugestão, sem abrir um pull request. Em produção na Vercel, o envio exige GitHub App e Turnstile configurados. Veja o [formato das sugestões](src/contributions/entries/README.md).

Para executar o Vite com uma pasta alternativa de configuração, defina `TRILHA_ENV_DIR`. Uma pasta vazia permite validar o catálogo e o frontend sem carregar a configuração local.

### Docker

O Compose existente publica a porta `80` do computador na porta `3000` do container. Informe essa porta ao Vite:

```sh
docker compose run --build --rm --service-ports trilha-info-front yarn dev --host 0.0.0.0 --port 3000
```

Abra [localhost](http://localhost). Esse container executa o servidor de desenvolvimento.

## Comandos e validação

| Comando           | O que faz                                                                |
| ----------------- | ------------------------------------------------------------------------ |
| `yarn dev`        | Inicia o Vite com os catálogos e endpoints locais.                       |
| `yarn check`      | Verifica os tipos do frontend, scripts e servidor.                       |
| `yarn test`       | Executa o Vitest em modo de observação.                                  |
| `yarn test:run`   | Executa a suíte uma vez.                                                 |
| `yarn coverage`   | Gera a cobertura de testes.                                              |
| `yarn build`      | Verifica os tipos e gera a aplicação e os artefatos públicos em `dist/`. |
| `yarn preview`    | Serve o build localmente para conferência.                               |
| `yarn format:all` | Formata o repositório com Prettier.                                      |
| `yarn icons`      | Regenera os ícones do aplicativo.                                        |

Antes de enviar uma alteração, execute:

```sh
yarn check
yarn test:run
yarn build
```

A suíte cobre integridade do currículo, catálogo e IDs, progresso e migração, planos de estudo, aulas e laboratórios, guias, contribuições, modo desenvolvedor e componentes da interface.

## Stack e organização

O frontend usa **React 18, TypeScript, Vite, React Router, Tailwind CSS, Radix UI e Framer Motion**. Os testes usam **Vitest e Testing Library**. Os laboratórios incluem **sql.js/SQLite e Pyodide**; autenticação usa **Auth0**. Plugins do Vite geram o catálogo público e os previews de compartilhamento.

```text
src/
  pages/                 Páginas e rotas
  components/            Interface, espaço de estudo e laboratórios
  roadmaps/              Currículo, recursos, projetos e práticas de IA
  learning/              Catálogo, progresso, migração, planos e contratos
  lessons/               Metadados, conteúdo das aulas, cursos e revisão
  guides/                Metadados e conteúdo dos guias
  contributions/         Validação e sugestões de conteúdo da comunidade
  devmode/               Inspeção de componentes dentro da plataforma
api/                     Entradas das funções para a Vercel
server/                  Integração com GitHub e processamento de sugestões
scripts/                 Plugins do Vite e geração de artefatos
docs/                    Decisões editoriais e documentação técnica
public/                  Imagens, ícones e conteúdo estático
```

As principais rotas são `/`, `/roadmap/:name`, `/aulas`, `/aulas/:trilha`, `/aula/:lesson`, `/guias` e `/guide/:guide`. `/hroadmap/:name` abre o mesmo espaço de estudo. As rotas de blog, cursos externos, perfil e trilhas personalizadas também permanecem no aplicativo.

### Catálogo público e agentes

O conteúdo editorial é mantido em `src/roadmaps/`. O build gera os formatos abaixo a partir dessa fonte; eles também estão disponíveis durante `yarn dev`:

| Caminho público                         | Conteúdo                                                  |
| --------------------------------------- | --------------------------------------------------------- |
| `/data/index.json`                      | Índice dos catálogos.                                     |
| `/data/<trilha>.json`                   | Catálogo estruturado, com IDs e dependências.             |
| `/data/<trilha>.md`                     | Conteúdo em Markdown com práticas, prompts e referências. |
| `/read/<trilha>/`                       | Leitura completa da trilha sem JavaScript.                |
| `/schemas/roadmap.v1.schema.json`       | Contrato do catálogo.                                     |
| `/schemas/study-context.v1.schema.json` | Contrato do contexto de estudo exportado.                 |
| `/schemas/study-plan.v1.schema.json`    | Contrato dos planos que podem ser importados.             |
| `/llms.txt`, `/sitemap.xml`             | Descoberta por agentes e mecanismos de busca.             |

Na hospedagem, sirva arquivos existentes antes do fallback da SPA e mantenha os handlers de `/api/` quando usar sugestões. `yarn preview` serve o build estático; o plugin dos endpoints locais roda apenas em desenvolvimento.

## Contribuir

Você pode sugerir materiais pelo aplicativo, [relatar um problema](https://github.com/flaviojmendes/trilhainfo/issues) ou enviar um pull request. Para mudanças maiores, abra uma issue para discutir a proposta. Consulte o [guia de contribuição](CONTRIBUTING.md).

Ao editar o currículo, preserve os IDs editoriais, a ordem dos pré-requisitos, a prática verificável e os critérios de conclusão dos projetos. Indique idioma e gratuidade dos materiais. Aulas ficam em `src/lessons/` e guias em `src/guides/`.

Os cursos são derivados das trilhas. Ao alterar o mapeamento de aulas e assuntos, regenere e confira `src/lessons/courses.ts`:

```sh
UPDATE_COURSES=1 yarn test:run src/lessons/courses.test.ts
```

Documentação de apoio:

- [Revisão das trilhas de outubro de 2026](docs/revisao-trilhas-2026-10.md).
- [Aprender programação com auxílio de IA](docs/aprender-com-ia.md).
- [Trilhas adaptativas e contratos para agentes](docs/aplicativo-adaptativo.md), com [versão em inglês](docs/adaptive-learning.en.md).
- [Formato e revisão das sugestões da comunidade](src/contributions/entries/README.md).

Conheça [quem já contribuiu](https://github.com/flaviojmendes/trilhainfo/graphs/contributors) e participe da [comunidade no Discord](https://discord.gg/TmneeHgTBp).

## Licença

O arquivo [LICENSE](LICENSE) do repositório contém a licença **Apache 2.0**. Os catálogos gerados declaram **MIT** em seus metadados. Os materiais externos mantêm suas próprias licenças.
