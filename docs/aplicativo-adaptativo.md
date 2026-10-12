# Trilhas adaptativas e contratos para agentes

As rotas `/roadmap/:name` e `/hroadmap/:name` usam a mesma interface e progresso. Mapa, Estudar e Lista compartilham um catálogo produzido a partir de `src/roadmaps`; os leitores anteriores continuam disponíveis para trilhas personalizadas e previews.

O download da visualização em PNG permanece disponível, com limite de tamanho e carregamento do exportador sob demanda. A exportação de anotações continua disponível para pessoas autenticadas, usando a API existente.

## Conteúdo e identidade

Cada etapa, assunto, seção e referência curada tem um ID editorial. Preserve o ID ao renomear ou mover conteúdo. Nos helpers `topic` e `project`, o quinto argumento é esse ID. Novos assuntos devem receber IDs novos, sem reaproveitar identidades de conteúdos removidos.

```ts
topic('Conceito', 'Explicação', [r.html], 'Prática verificável', 'web.conceito');
```

`src/learning/catalog.ts` normaliza o conteúdo, valida referências e ciclos e calcula a versão a partir do catálogo completo. `requires` representa dependências pedagógicas; etapas e grupos representam a organização. As variantes mantêm explicação e prática essenciais, e o aprofundamento acrescenta um desafio verificável. As tarefas específicas ficam no registro `challenges`.

## Progresso e personalização

O registro `trilha-study:v1:<trilha>` contém profundidade, familiaridade declarada, conclusão por nó, estudo por referência, objetivo, disponibilidade e preferências visuais. A migração lê `selectedItems-<trilha>` e `items` sem apagar os originais. Registros modernos ilegíveis não são sobrescritos; a interface funciona na sessão e permite exportar o contexto.

O denominador do progresso essencial independe da visualização e da profundidade. Material novo e desafios adicionais começam pendentes. Conhecimento declarado e referências estudadas não marcam práticas automaticamente como concluídas.

## Artefatos públicos

O plugin `scripts/catalogPlugin.ts` gera e serve os seguintes arquivos, sem cópias editoriais manuais:

- `/data/index.json` e `/data/<trilha>.json`.
- `/data/<trilha>.md` com IDs, pré-requisitos, variantes, prompts e referências.
- `/read/<trilha>/` com todo o conteúdo sem JavaScript.
- `/schemas/roadmap.v1.schema.json`, `study-context.v1.schema.json` e `study-plan.v1.schema.json`.
- `/llms.txt` e `/sitemap.xml`.
- HTML inicial específico nas rotas públicas, com canonical, alternativas e JSON-LD LearningResource.

Em produção, configure o host para servir arquivos existentes antes do fallback da SPA. Isso é necessário para dados, Markdown, schemas, HTML de leitura e páginas por trilha. O diretório de saída contém esses arquivos prontos para hospedagem estática.

O catálogo é MIT; as referências externas conservam suas próprias licenças. Idioma e gratuidade desconhecidos são `null`, assim como durações e datas de revisão não informadas.

## Planos e IA

“Organizar meus estudos” gera um plano local usando progresso, profundidade e disponibilidade. Durações são estimativas de planejamento, não medidas da curadoria. O contexto exportado inclui o snapshot completo do catálogo e somente os campos pessoais selecionados pelo produto; a página e os arquivos públicos não incluem esse contexto.

Um assistente externo pode devolver um plano conforme o schema. A importação valida versão, IDs, referências permitidas por nó, dependências, duplicações e orçamento semanal. A proposta passa por revisão e aplicação, com opção de desfazer. O plano aplicado fica em `trilha-study:v1:<trilha>:plan`. Um plano de versão antiga precisa ser regenerado; seu registro original permanece preservado.

## Validação

Execute `yarn test --run` e `yarn build`. Os testes cobrem nove catálogos, migração, projeções, contratos de agentes e foco/progresso na interface. `TRILHA_ENV_DIR` pode apontar para uma pasta vazia durante uma validação isolada; sem a variável, o Vite mantém sua resolução usual de configuração. Nenhuma nova dependência de runtime foi necessária.

Confira também desktop, tablet, largura de 320px, teclado, movimento reduzido, persistência após recarregar e leitura com JavaScript desativado. Limites de desempenho em campo devem ser medidos após a publicação.

English: [Adaptive learning and agent contracts](adaptive-learning.en.md).
