# Contribuindo com a Trilha Info

A Trilha Info está sempre aberta a contribuições da [comunidade](https://github.com/flaviojmendes/trilhainfo/graphs/contributors). Ok, mas se eu quiser contribuir, o que eu devo saber antes?

## Contribuindo com conteúdo nas trilhas

Para contribuir com conteúdo nas trilhas, você pode fazer um fork do projeto e abrir um pull request com as alterações que deseja fazer. As trilhas estão localizadas na pasta `[src/roadmaps](https://github.com/flaviojmendes/trilhainfo/tree/main/src/roadmaps)`.

Atualmente as trilhas são:

- [Frontend](https://github.com/flaviojmendes/trilhainfo/blob/main/src/roadmaps/frontend.ts)
- [Backend](https://github.com/flaviojmendes/trilhainfo/blob/main/src/roadmaps/backend.ts)
- [DevOps](https://github.com/flaviojmendes/trilhainfo/blob/main/src/roadmaps/devops.ts)
- [Teste/QA](https://github.com/flaviojmendes/trilhainfo/blob/main/src/roadmaps/test.ts)
- [React](https://github.com/flaviojmendes/trilhainfo/blob/main/src/roadmaps/react.ts)
- [Fullstack](https://github.com/flaviojmendes/trilhainfo/blob/main/src/roadmaps/fullstack.ts)
- [Engenharia de Dados](https://github.com/flaviojmendes/trilhainfo/blob/main/src/roadmaps/dataEngineering.ts)
- [Entrevistas](https://github.com/flaviojmendes/trilhainfo/blob/main/src/roadmaps/entrevistas.ts)

O currículo ativo foi [revisado em outubro de 2026](docs/revisao-trilhas-2026-10.md). Ao contribuir, mantenha a ordem dos pré-requisitos, acrescente uma prática verificável e indique os critérios dos projetos. Separe aprofundamentos opcionais da preparação inicial para oportunidades. Use fontes gratuitas, identifique o idioma e confira o link. Os helpers estão em `src/roadmaps/curriculum.ts`, os materiais em `src/roadmaps/resources.ts` e as orientações de entrada em `src/roadmaps/guides.ts`.

As práticas de IA devem acompanhar a etapa e a carreira, com contexto, critérios de verificação e uma tarefa pequena. Cursor, Claude e Codex são opções, sem exigir acesso a todos. Consulte [Aprender programação com auxílio de IA](docs/aprender-com-ia.md) e `src/roadmaps/aiLearning.ts`. Um prompt de exemplo pode ser definido no campo `prompt` de uma seção.

Preserve os IDs editoriais ao renomear ou mover conteúdo. Os helpers `topic` e `project` recebem o ID no quinto argumento. Consulte [Trilhas adaptativas e contratos para agentes](docs/aplicativo-adaptativo.md) e sua [versão em inglês](docs/adaptive-learning.en.md) para personalização, migração e arquivos gerados.

## Contribuindo com o código

Para contribuir com código, você deve antes abrir uma issue descrevendo o que pretende alterar/adicionar.

Existem dois modelos de issues que você pode usar:

- Bug Report: para reportar um bug, ou seja, um comportamento inesperado do sistema.
- Feature Request: para solicitar uma nova funcionalidade ou alteração no sistema.

## Contribuindo com a documentação

Para contribuir com a documentação, você pode fazer um fork do projeto e abrir um pull request com as alterações que deseja fazer.

Para toda mudança, tenha certeza que foi alterado o arquivo correspondente em inglês e português.
