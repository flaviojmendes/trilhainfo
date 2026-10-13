import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'conceitos',
      title: 'Os conceitos que mais confundem',
      blocks: [
        {
          type: 'text',
          text: 'Docker empacota uma aplicação com tudo o que ela precisa para rodar: sistema base, bibliotecas e configuração. Assim, ela roda igual no seu computador, na CI e no servidor.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Imagem',
              text: 'Um pacote **somente leitura** com o sistema de arquivos e o comando de início. Como uma receita pronta, ou uma classe.',
            },
            {
              term: 'Container',
              text: 'Um **processo em execução**, isolado, criado a partir de uma imagem. Como uma instância da classe. Pode haver vários da mesma imagem.',
            },
            {
              term: 'Dockerfile',
              text: 'O arquivo de texto com os passos para **construir** uma imagem.',
            },
            {
              term: 'Registro',
              text: 'Onde as imagens são publicadas e baixadas, como Docker Hub ou GitHub Container Registry.',
            },
            {
              term: 'Volume',
              text: 'Uma pasta que **sobrevive** ao container. Sem volume, os dados somem quando o container é removido.',
            },
            {
              term: 'Compose',
              text: 'Um arquivo YAML que descreve vários containers que trabalham juntos.',
            },
          ],
        },
      ],
    },
    {
      id: 'dockerfile',
      title: 'Um Dockerfile comentado',
      blocks: [
        {
          type: 'code',
          language: 'dockerfile',
          caption: 'API em Node.js',
          code: '# Imagem base pequena, com versão fixa\nFROM node:22-alpine\n\nWORKDIR /app\n\n# Copie só os manifestos primeiro: a instalação fica em cache\nCOPY package.json package-lock.json ./\nRUN npm ci --omit=dev\n\n# Depois, o código\nCOPY . .\n\n# Não rode como root\nUSER node\n\nEXPOSE 3000\nCMD ["node", "server.js"]',
        },
        {
          type: 'code',
          language: 'text',
          caption: '.dockerignore: o que não deve ir para a imagem',
          code: 'node_modules\n.git\n.env\ncoverage',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Por que a ordem importa',
          text: 'Cada instrução vira uma camada em cache. Se o `COPY . .` viesse antes do `npm ci`, qualquer mudança no código refaria a instalação inteira.',
        },
      ],
    },
    {
      id: 'comandos',
      title: 'Comandos do dia a dia',
      blocks: [
        {
          type: 'table',
          caption: 'O ciclo de vida de uma imagem e de um container',
          head: ['Comando', 'O que faz'],
          rows: [
            [
              '`docker build -t api:dev .`',
              'Constrói a imagem a partir do Dockerfile da pasta atual.',
            ],
            [
              '`docker run --rm -p 3000:3000 api:dev`',
              'Cria e inicia um container. `-p porta-da-máquina:porta-do-container`.',
            ],
            ['`docker ps`', 'Lista os containers em execução. Com `-a`, inclui os parados.'],
            ['`docker logs -f <container>`', 'Acompanha a saída do processo.'],
            ['`docker exec -it <container> sh`', 'Abre um terminal dentro do container.'],
            ['`docker stop <container>`', 'Para o container.'],
            [
              '`docker compose up -d`',
              'Sobe todos os serviços do `compose.yaml` em segundo plano.',
            ],
            [
              '`docker compose down`',
              'Para e remove os containers. Os volumes nomeados continuam.',
            ],
          ],
        },
      ],
    },
    {
      id: 'compose',
      title: 'API e banco com Compose',
      blocks: [
        {
          type: 'code',
          language: 'yaml',
          caption: 'compose.yaml',
          code: 'services:\n  api:\n    build: .\n    ports:\n      - "3000:3000"\n    environment:\n      DATABASE_URL: postgres://app:app@db:5432/app\n    depends_on:\n      db:\n        condition: service_healthy\n\n  db:\n    image: postgres:16\n    environment:\n      POSTGRES_USER: app\n      POSTGRES_PASSWORD: app\n      POSTGRES_DB: app\n    volumes:\n      - dados:/var/lib/postgresql/data\n    healthcheck:\n      test: ["CMD-SHELL", "pg_isready -U app"]\n      interval: 5s\n      retries: 5\n\nvolumes:\n  dados:',
        },
        {
          type: 'list',
          items: [
            'Dentro da rede do Compose, cada serviço é encontrado **pelo nome**. Por isso a API acessa o banco em `db:5432`.',
            '`depends_on` com `service_healthy` espera o banco aceitar conexões antes de iniciar a API.',
            'O volume `dados` guarda o banco entre reinicializações.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Senhas no arquivo servem só para desenvolvimento local. Em produção, use variáveis do ambiente ou um gerenciador de segredos, e nunca copie o `.env` para dentro da imagem.',
        },
      ],
    },
    {
      id: 'problemas',
      title: 'Problemas comuns',
      blocks: [
        {
          type: 'cards',
          items: [
            {
              title: 'Roda, mas o navegador não abre',
              text: 'A aplicação provavelmente escuta em `127.0.0.1`. Dentro do container, ela precisa escutar em `0.0.0.0`, e a porta precisa estar publicada com `-p`.',
            },
            {
              title: 'Os dados do banco sumiram',
              text: 'Faltou um volume. Sem ele, remover o container apaga tudo o que estava dentro.',
            },
            {
              title: 'O build demora sempre',
              text: 'Uma instrução que muda com frequência está antes da instalação de dependências e invalida o cache.',
            },
            {
              title: 'A imagem tem 1 GB',
              text: 'Use imagens base `alpine` ou `slim`, um `.dockerignore` e builds em múltiplos estágios.',
            },
          ],
        },
      ],
    },
  ],
  sources: [
    {
      title: 'Docker: o que é um container',
      url: 'https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/',
    },
    {
      title: 'Docker: boas práticas de build',
      url: 'https://docs.docker.com/build/building/best-practices/',
    },
    {
      title: 'Docker: referência do arquivo Compose',
      url: 'https://docs.docker.com/reference/compose-file/',
    },
  ],
};
