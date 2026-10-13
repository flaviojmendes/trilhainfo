# Sugestões da comunidade

Cada arquivo `.json` desta pasta é uma sugestão enviada pelo botão **Sugerir conteúdo** da tela de estudo. O bot da Trilha Info abre um pull request com um arquivo por sugestão; depois do merge, o conteúdo aparece na trilha no próximo deploy.

- `kind: "resource"` adiciona uma referência ao passo `nodeId` do assunto `groupId`.
- `kind: "step"` adiciona um passo opcional ao assunto `groupId`, nos modos completo e aprofundado. Ele não conta no progresso essencial.
- Assuntos compartilhados entre trilhas (por exemplo, `curriculum.html`) recebem a sugestão em todas as trilhas que os usam.

Para revisar, confira se o link abre, se o conteúdo é gratuito e se ele está no passo certo. Dá para editar o título ou o passo direto no arquivo antes do merge. `yarn test:run` valida o formato e confere se o assunto e o passo existem.

Quando uma sugestão for incorporada ao arquivo da trilha em `src/roadmaps/`, apague o `.json` correspondente.
