# Revisão das trilhas, outubro de 2026

Revisão editorial realizada em 12 de outubro de 2026. A sequência proposta é uma decisão pedagógica baseada em fundamentos, documentação oficial e entregas práticas. Não representa uma pesquisa quantitativa de vagas nem garante contratação. A escolha de stack deve considerar a região, o nível e os requisitos das oportunidades pretendidas.

## Diagnóstico e mudanças

As carreiras continuam pertinentes, mas as trilhas misturavam fundamentos, catálogos de ferramentas e especializações sem critérios claros de avanço. Engenharia de Dados tinha apenas quatro etapas genéricas e não aparecia na página inicial. React começava por uma ferramenta descontinuada. Fullstack incorporava infraestrutura avançada antes de integrar um produto. Entrevistas priorizava algoritmos e sistemas distribuídos sem preparar apresentação de projeto, depuração e testes.

| Trilha              | Sequência proposta                                                                                                 | Evidência de aprendizagem                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| Frontend            | Web e Git → HTML/CSS/acessibilidade → JavaScript e API → TypeScript e um framework → testes e entrega              | Página responsiva, aplicação com API e produto publicado      |
| React               | Pré-requisitos de frontend → Vite/TypeScript → componentes e estado → Effects, rotas e dados → testes e publicação | Aplicação com rotas, falhas tratadas e acessibilidade         |
| Backend             | Git/HTTP → uma linguagem → programa com regras → SQL → API e migrações → segurança, testes e operação              | API com banco, permissões por usuário e execução reproduzível |
| Fullstack           | Base web → interface → uma stack → contrato e banco → integração → segurança, testes e entrega                     | Produto integrado com demonstração e documentação             |
| DevOps              | Linux/redes/Git → scripts → containers → CI/CD → nuvem e IaC → observabilidade e recuperação                       | Serviço com pipeline, rollback e restauração demonstrados     |
| Testes / QA         | Fundamentos e riscos → exploração e bugs → HTTP/SQL/Git → programação → automação de API/web → CI                  | Plano de testes, evidências, bugs e suíte reproduzível        |
| Engenharia de Dados | Python/SQL → análise local → modelagem → ingestão e transformação → orquestração e governança                      | Pipeline incremental, idempotente, testado e recuperável      |
| Entrevistas         | Vaga e apresentação → código/depuração → algoritmos essenciais → simulação → revisão por carreira                  | Demonstração de projeto, feedback e plano de melhoria         |

React é apresentado como especialização e Entrevistas como preparação complementar. DevOps e Engenharia de Dados explicam a base técnica necessária e possíveis etapas de entrada. Kubernetes, Spark, streaming, microserviços, frameworks de renderização e system design distribuído ficam após os primeiros projetos e a preparação para oportunidades.

## Método de estudo

Escolha um material inicial por assunto, escreva código e use a documentação como consulta. Os exercícios têm uma entrega observável. Os projetos têm critérios de conclusão; assistir aulas ou ler links não basta para concluí-los. Use feedback de usuários ou colegas para orientar a próxima melhoria. Não é necessário concluir todas as especializações antes de começar a se candidatar.

Materiais em português têm prioridade na base: Curso em Vídeo, MDN, Pro Git, React, Python, Microsoft Learn e BSTQB. Documentação especializada em inglês tem o idioma indicado. Os links são gratuitos para estudar; certificados, exames e serviços de nuvem podem ser cobrados. Os projetos de backend, DevOps e dados podem ser demonstrados localmente.

IA acompanha o aprendizado desde a primeira etapa: tutoria nos fundamentos, prompting e contexto antes do primeiro projeto, programação em parceria após a primeira entrega e agentes com escopo limitado antes do projeto final. Cada projeto tem uma prática por carreira e um prompt adaptável. A conclusão exige verificar o resultado e explicar a solução. As ferramentas são alternativas; não é preciso assinar três serviços. A sequência e as fontes estão em [Aprender programação com auxílio de IA](aprender-com-ia.md).

## Fontes e limites da verificação

A orientação sobre React usa a [descontinuação oficial do Create React App](https://react.dev/blog/2025/02/14/sunsetting-create-react-app), a [criação de uma aplicação](https://pt-br.react.dev/learn/creating-a-react-app) e a [orientação sobre Effects desnecessários](https://pt-br.react.dev/learn/you-might-not-need-an-effect). Vite é a escolha para aprender componentes sem introduzir um framework completo de aplicação; frameworks continuam como opção conforme as necessidades do produto.

A base de frontend foi confrontada com o [currículo da MDN](https://developer.mozilla.org/en-US/curriculum/), incluindo semântica, CSS, JavaScript, acessibilidade e ferramentas. A ordem e os projetos da Trilha Info são escolhas editoriais, não uma reprodução desse currículo.

Para QA, foram consultados os [materiais do BSTQB](https://bstqb.org.br/b9/sobre/syllabus), a documentação de [Playwright](https://playwright.dev/docs/intro) e seus [testes de API](https://playwright.dev/docs/api-testing). Playwright é uma opção de aprendizado para web; Selenium, Cypress e outras stacks podem ser adequados à equipe ou à vaga.

Para DevOps, a revisão consultou [Docker](https://docs.docker.com/get-started/), [Terraform com laboratório Docker local](https://developer.hashicorp.com/terraform/tutorials/docker-get-started), [OpenTelemetry](https://opentelemetry.io/pt/docs/concepts/observability-primer/) e o [livro de SRE do Google](https://sre.google/sre-book/table-of-contents/). Para dados, consultou [PostgreSQL](https://www.postgresql.org/docs/current/tutorial.html), [dbt](https://docs.getdbt.com/docs/introduction) e [Airflow](https://airflow.apache.org/docs/apache-airflow/stable/tutorial/index.html). Nenhuma dessas fontes, isoladamente, determina requisitos universais de uma vaga júnior.

O apoio de IA considera o [guia de uso responsável do GitHub](https://docs.github.com/pt/copilot/responsible-use/copilot-code-completion), especialmente a revisão humana das sugestões e seus limites.

As URLs adicionadas foram consultadas por HTTP com redirecionamentos e leitura das fontes principais. Algumas falharam inicialmente pelo certificado do cliente Python e responderam normalmente via curl com validação TLS. As três páginas do Curso em Vídeo responderam 403 ao acesso automatizado; permanecem como materiais complementares conhecidos, acompanhados de documentação pública acessível. Não foi possível confirmar por automação a reprodução de suas aulas ou as condições de cadastro. Uma resposta HTTP bem-sucedida também não valida cada aula ou a completude de uma tradução.

Os antigos módulos reutilizáveis em `src/roadmaps/items` foram preservados como catálogo histórico; a revisão não auditou integralmente seus links. O currículo ativo usa `curriculum.ts`, `aiLearning.ts`, `resources.ts` e os arquivos de cada trilha.

## Comportamento do aplicativo

A página inicial oferece as oito trilhas educacionais, incluindo Engenharia de Dados. As duas visualizações mostram ponto de partida, entrega esperada e data da revisão. Descrições de exercícios e critérios dos projetos são exibidas dentro das seções.

O progresso da visualização vertical é reconciliado pelos identificadores existentes: recursos ainda presentes mantêm a marcação; recursos novos ficam desmarcados. Pais são recalculados a partir dos filhos. Materiais removidos ou renomeados não são considerados concluídos no novo currículo. A revisão não atribui a data de revisão curricular à página institucional de Comunidade.

Os identificadores de recursos agora incluem o tópico, para que dois exercícios com a mesma referência permaneçam independentes. Identificadores anteriores são reconciliados a partir do pai armazenado. Ao trocar de trilha, o componente é reiniciado com a chave da rota para evitar mistura de conteúdo e progresso.

## Validação da implementação

Os testes cobrem integridade das oito trilhas, orientação de entrada, descoberta na página inicial, ausência de etapas sem material, identificadores únicos, separação de aprofundamentos opcionais, critérios exibidos nas duas visualizações e migração do progresso. Também foram executados TypeScript, lint do currículo e build de produção.

A inspeção visual automatizada não foi concluída: o sistema bloqueou a inicialização de Chromium e Chrome, inclusive na tentativa autorizada fora do sandbox. Os testes de componentes não substituem uma inspeção visual manual. O build mantém os avisos de base Browserslist desatualizada e bundle grande; dependências e divisão de bundles não fizeram parte desta revisão curricular.

O build final foi gerado em um diretório temporário e copiado para `dist`, pois a limpeza de `dist/assets` foi bloqueada pelo ambiente mesmo na tentativa autorizada. TypeScript, lint do currículo e os 29 testes passaram.
