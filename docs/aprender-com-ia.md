# Aprender programação com auxílio de IA

Decisão editorial de 12 de outubro de 2026: ensinar fundamentos e colaboração com IA em paralelo, aumentando o escopo conforme a pessoa consegue explicar, alterar e verificar o código. Esta é uma proposta pedagógica da Trilha Info, não uma garantia de aprendizagem nem uma exigência universal de vagas.

## Sequência de aprendizagem

| Momento                    | Uso da IA                                                                                  | Evidência de aprendizagem                                                |
| -------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| Primeiro contato           | Escolher uma ferramenta; pedir explicações, pistas e perguntas com um trecho como contexto | Executar o exemplo, explicar seu comportamento e resolver uma variação   |
| Antes do primeiro projeto  | Pedidos com objetivo, contexto, limites e verificação                                      | Comparar respostas e corrigir uma suposição com evidência                |
| Depois do primeiro projeto | Implementar um recorte em parceria; depurar com hipóteses                                  | Ler o diff, modificar a solução e conferir um resultado esperado         |
| Antes do projeto final     | Instruções do projeto e uma tarefa pequena delegada ao agente                              | Revisar escopo, comandos e casos negativos, com conferência independente |
| Portfólio                  | Explicar decisões e a assistência recebida                                                 | Demonstrar a contribuição e uma melhoria após feedback                   |

Código gerado pode fazer parte dos exercícios. A pessoa precisa compreender a mudança, conferir o resultado e conseguir adaptar uma pequena parte. Pedir uma pista, gerar uma função, solicitar testes e delegar uma tarefa têm objetivos diferentes. O crescimento do escopo acompanha a capacidade de revisão e a etapa técnica da trilha.

QA começa com análise e exploração antes de automatizar. DevOps usa um laboratório local antes de operar recursos de nuvem. Dados começa com amostras e SQL antes de pipelines distribuídos. React exige JavaScript básico. Em Entrevistas, a prática é simulação com uma pergunta por vez e feedback; o uso em uma avaliação real depende das regras do processo.

## Ferramentas e prompting

Cursor, Claude/Claude Code e Codex aparecem como alternativas. A etapa inicial exige escolher uma opção e localizar conversa, contexto e revisão. Não são três instalações obrigatórias nem três assinaturas. Um chat com trechos fornecidos manualmente também serve para tutoria e prompting. Sem acesso disponível, a pessoa pode seguir os exercícios de programação e retomar as práticas de IA depois.

A documentação é gratuita. Funcionalidades, limites e cobrança do serviço dependem da conta e podem mudar. A trilha indica os quickstarts atuais, sem fixar preços, modelos ou prometer acesso gratuito permanente.

A estrutura objetivo/contexto/limites/verificação considera a orientação oficial de [prompting para Codex](https://developers.openai.com/codex/prompting/). O fornecimento de arquivos, trechos e mensagens de erro é explicado em [prompting no Cursor](https://cursor.com/docs/agent/prompting). Explorar, planejar, implementar e verificar também aparece nas [boas práticas do Claude Code](https://code.claude.com/docs/en/best-practices). A sequência pedagógica e os exercícios por carreira são decisões editoriais próprias.

Para começar, consulte o [agente do Cursor](https://cursor.com/docs/agent/overview), o [quickstart do Claude Code](https://code.claude.com/docs/en/quickstart) ou o [quickstart do Codex](https://developers.openai.com/codex/quickstart/). Para instruções persistentes, pratique as [regras do Cursor](https://cursor.com/docs/rules), CLAUDE.md nas boas práticas do Claude Code ou [AGENTS.md no Codex](https://developers.openai.com/codex/guides/agents-md/), conforme a ferramenta escolhida.

## Prática por carreira

| Trilha      | Colaboração com IA                                        | Conferência independente                                  |
| ----------- | --------------------------------------------------------- | --------------------------------------------------------- |
| Frontend    | Revisar semântica, layout e estados                       | Teclado, tamanhos de tela e erros                         |
| React       | Investigar estado duplicado e Effects, quando estudados   | Eventos, cleanup e comportamento visível                  |
| Backend     | Revisar uma regra ou endpoint                             | Entradas inválidas, SQL e permissões, conforme a etapa    |
| Fullstack   | Implementar um recorte entre cliente, API e banco         | Contrato, validação, erro visível e segredos no servidor  |
| DevOps      | Investigar uma falha simulada com logs sanitizados        | Reprodução, correção mínima e retorno ao estado anterior  |
| Dados       | Procurar dupla contagem, nulos e duplicação na reexecução | Amostra calculada manualmente e idempotência              |
| QA          | Propor casos priorizados e resultados esperados           | Requisitos como referência e um caso que a IA não sugeriu |
| Entrevistas | Simular apresentação e perguntas                          | Resposta própria, evidência e conferência do feedback     |

Cada projeto inclui “Prática de IA neste projeto” e “Registre sua verificação”. Os prompts têm campos para adaptar ao que já existe naquela etapa. No começo, o foco é planejar e explicar; depois, implementar em parceria; no projeto final, delegar uma tarefa pequena e revisar evidências.

Registre um prompt sanitizado, uma sugestão aceita ou corrigida, a verificação executada e seu resultado. Não publique conversas inteiras com credenciais ou dados privados. Copiar um prompt não conclui automaticamente o exercício.

## Implementação e manutenção

`src/roadmaps/aiLearning.ts` insere as etapas nos marcos dos projetos e define práticas por carreira. `curriculum.ts` inclui IA nos exercícios dos fundamentos. O campo opcional `prompt` é exibido nas duas visualizações por `LearningPrompt`, com cópia e alternativa de seleção manual.

Os testes cobrem introdução no início, prompting antes do primeiro projeto, parceria e agentes após a primeira entrega, práticas nos projetos, adaptação para Entrevistas e exibição/cópia dos prompts. A revisão visual automatizada permanece limitada pelo bloqueio de inicialização de navegadores neste ambiente.
