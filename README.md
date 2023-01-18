[![Discord Server](https://discordapp.com/api/guilds/989882634358390794/widget.png?style=banner2)](https://discord.gg/HJ3Spm6R)

# Trilha Info

Olá 👋

A [Trilha Info](https://trilha.info) é um projeto Open Source que nasceu em Junho/2022 com o objetivo de agregar e organizar conteúdos gratuitos em português para pessoas que querem ingressar na área de Tecnologia.

![Preview](/public/preview.png)

A motivação em criar esse aplicativo é por acreditar que a educação e o conhecimento devem ser democráticos. Qualquer pessoa deveria ter acesso aos assuntos que se interessa para que garanta um futuro cada vez mais próspero.

Encontrou um Bug 🐛, tem uma ideia 💡? É só abrir uma [issue](https://github.com/flaviojmendes/trilhainfo/issues).

Portanto, se você também acredita nisso compartilhe para que o conhecimento chegue cada vez mais longe. E participe da nossa comunidade no Discord


## Disclaimer

A ideia é inicialmente engajar a comunidade e então podemos ir evoluindo o portal à medida em que vamos tendo a necessidade. 😀

## Como rodar localmente?

Para rodar o projeto basta clonar/fork o projeto executar os seguintes passos:

Na raiz do projeto criar um aquivo `.env.local` com:

```
# Para usar o backend da Trilha Info:
VITE_API_URL=https://api.trilha.info/api
VITE_PUBLIC_URL=https://api.trilha.info/public

# Se possuir o backend rodando localmente:
VITE_API_URL=http://localhost:8000/api
VITE_PUBLIC_URL=http://localhost:8000/public
```

Então, no terminal executar:

```
# Instalar as dependências com:
$ yarn 

# Rodar em modo de desenvolvimento com:
$ yarn dev

```

## Traduções
<img src = "https://i.imgur.com/lpP9V2p.png" alt="Readme em Inglês" width="16" height="15">・<b>Inglês — </b> [Clique aqui](https://github.com/flaviojmendes/trilhainfo/blob/main/translation/readme-en.md)<br>


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
