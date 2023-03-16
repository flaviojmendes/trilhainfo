[![Discord Server](https://img.shields.io/discord/989882634358390794?style=flat-square)](https://discord.gg/HJ3Spm6R)
|
[![pt](https://img.shields.io/badge/🇧🇷-Português-blue?style=flat-square)](https://github.com/flaviojmendes/trilhainfo/blob/main/translation/readme.md)
|
[![en](https://img.shields.io/badge/🇬🇧-English-blue?style=flat-square)](https://github.com/flaviojmendes/trilhainfo/blob/main/translation/readme-en.md)


# Trilha Info

Olá 👋

A [Trilha Info](https://trilha.info) é um projeto Open Source que nasceu em Junho/2022 com o objetivo de agregar e organizar conteúdos gratuitos em português para pessoas que querem ingressar na área de Tecnologia.

![Preview](/public/preview.png)

A motivação em criar esse aplicativo é por acreditar que a educação e o conhecimento devem ser democráticos. Qualquer pessoa deveria ter acesso aos assuntos que se interessa para que garanta um futuro cada vez mais próspero.

Encontrou um Bug 🐛, tem uma ideia 💡? É só abrir uma [issue](https://github.com/flaviojmendes/trilhainfo/issues).

Portanto, se você também acredita nisso compartilhe para que o conhecimento chegue cada vez mais longe. E participe da nossa comunidade no Discord


## Como contribuir?

Veja o [CONTRIBUTING.md](CONTRIBUTING.md) para mais informações.

## Como rodar localmente?

Para rodar o projeto basta clonar/fork o projeto executar os seguintes passos:

Copie as variaveis de ambiente exemplo:

```sh
cp .env.example .env.local
```

Dentro do .env.local você tem a opção de usar uma API rodando localmente ou utilizar a própria API da trilha, basta descomentar e utilizar o que achar melhor.

Para rodar o projeto em desenvolvimento, você vai precisar do Yarn para instalar as dependências e iniciar o servidor:

```sh
# Instalar as dependências com:
yarn

# Rodar em modo de desenvolvimento com:
yarn dev

```

Rodando com Docker:

Para rodar o este projeto com o docker, você precisará do docker-compose, segue o comando abaixo:

```sh
# na raiz deste repositório
docker-compose up
```

Estando com a API rodando localmente:
```sh
# utilizando o mesmo env mencionado acima, referencie ao comando do docker:
docker-compose --env-file ./.env.local up
```


## Quem já contribuiu:

<p align="center">
  <a href = "https://github.com/flaviojmendes/trilhainfo/graphs/contributors">
    <img src = "https://contributors-img.web.app/image?repo=flaviojmendes/trilhainfo" alt="Quem já contribuiu" />
  </a>
</p>

## Contribuição
Pull requests são bem-vindos. Para grandes mudanças, por favor, abra primeiro uma issue para discutir o que gostaria de mudar.

Por favor, certifique-se de atualizar os testes conforme apropriado.

## Licença
[MIT](https://choosealicense.com/licenses/mit/)
