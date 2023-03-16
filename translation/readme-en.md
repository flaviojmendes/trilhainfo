[![Discord Server](https://img.shields.io/discord/989882634358390794?style=flat-square)](https://discord.gg/HJ3Spm6R)
|
[![pt](https://img.shields.io/badge/🇧🇷-Português-blue?style=flat-square)](https://github.com/flaviojmendes/trilhainfo/blob/main/translation/readme.md)
|
[![en](https://img.shields.io/badge/🇬🇧-English-blue?style=flat-square)](https://github.com/flaviojmendes/trilhainfo/blob/main/translation/readme-en.md)


# Trilha Info

Hi 👋

If you've reached this repo it's because you're wondering how to contribute to the [Trilha Info](https://www.trilha.info/). It's pretty simple!

I am currently asking for contributions to the Frontend Roadmap. Just send a Pull Request to edit the [JSON](https://github.com/flaviojmendes/trilhainfo/tree/main/src/roadmaps) that contains all the information.

![Preview](/public/preview.png)

## Disclaimer

The idea is to initially engage the community and then we can evolve the portal as we have the need. 😀

## How to run locally?

To run the project you can simply clone/fork the project and execute the following steps:

Copy the example env variables:

```sh
cp .env.example .env.local
```

In the env.local file, you have the option to use a local running API or the trilha's own API, just uncomment and use whatever you find better.

Para rodar o projeto em desenvolvimento, você vai do Yarn para instalar as dependências e iniciar o servidor:

To run the project in development, you need to have Yarn installed to install the dependencies and start the server:

```sh
# Install the dependencies with:
$ yarn

# Run in developer mode:
$ yarn dev

```

Running with Docker:

You must have the docker-compmose installed on your computer, then execute:
```sh
# on the root of the project
docker-compose up
```

With the API running locally:
```sh
# reutilize the same .env.local as mentioned before, then run:
docker-compose --env-file ./.env.local up
```

## Translations
<img src = "https://imgur.com/saBa4s8.png" alt="Readme in Portuguese" width="20" height="16">・<b>Brazilian Portuguese — </b> [Click here](https://github.com/flaviojmendes/trilhainfo)<br>


## Who has already contributed:


<a href = "https://github.com/flaviojmendes/trilhainfo/graphs/contributors">
  <img src = "https://contrib.rocks/image?repo=flaviojmendes/trilhainfo"/>
</a>

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
