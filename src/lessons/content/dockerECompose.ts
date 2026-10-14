import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: '“Na minha máquina funciona” é provavelmente a frase mais repetida da história da programação. A API roda no seu notebook, mas quebra no servidor porque lá a versão do Python é outra, falta uma biblioteca ou o banco está configurado diferente. Containers resolvem isso empacotando o programa junto com tudo de que ele precisa. Hoje, quase toda vaga de backend, DevOps ou engenharia de dados espera que você saiba subir um projeto com Docker.',
  sections: [
    {
      id: 'na-minha-maquina',
      title: 'O problema do “na minha máquina funciona”',
      blocks: [
        {
          type: 'text',
          text: 'Pense numa API de pedidos escrita em Python. Para rodar, ela precisa do Python 3.12, de cinco bibliotecas em versões específicas, de uma variável com o endereço do banco e de um PostgreSQL 16. No seu notebook está tudo instalado. No notebook da colega, o Python é 3.9. No servidor, o PostgreSQL é 13.',
        },
        {
          type: 'analogy',
          title: 'A marmita pronta',
          text: 'Você pode mandar para alguém a lista de ingredientes e torcer para a pessoa ter o mesmo fogão, a mesma panela e o mesmo tempero. Ou pode mandar a marmita pronta, fechada, que esquenta igual em qualquer micro-ondas. O **container** é a marmita: o programa vai junto com a versão certa da linguagem, as bibliotecas e os arquivos, e roda igual em qualquer máquina com Docker.',
        },
        {
          type: 'text',
          text: 'O **Docker** é a ferramenta mais popular para criar e rodar containers. Um container não é um computador inteiro simulado, como uma máquina virtual: ele compartilha o núcleo do sistema da máquina e isola só o necessário. Por isso liga em segundos e ocupa pouco espaço.',
        },
        {
          type: 'quiz',
          question:
            "A API funciona no seu notebook e falha no servidor com `ModuleNotFoundError: No module named 'fastapi'`. Como um container ajudaria?",
          options: [
            {
              text: 'A biblioteca iria dentro do pacote do container, então o servidor não precisaria tê-la instalada',
              correct: true,
              feedback:
                'Isso. O container leva junto as dependências na versão certa. O servidor só precisa ter o Docker.',
            },
            {
              text: 'O Docker instala automaticamente no servidor tudo o que existe no seu notebook',
              feedback:
                'O Docker não copia o seu computador. Ele monta o pacote seguindo uma receita que você escreve, com só o que a aplicação precisa.',
            },
            {
              text: 'Não ajudaria: erros de biblioteca só se resolvem instalando à mão no servidor',
              feedback:
                'Instalar à mão funciona uma vez, mas a próxima máquina terá o mesmo problema. O container torna a instalação parte do pacote, igual em todo lugar.',
            },
          ],
        },
      ],
    },
    {
      id: 'imagem-e-container',
      title: 'Imagem e container: a receita e o bolo',
      blocks: [
        {
          type: 'analogy',
          title: 'Uma receita, muitos bolos',
          text: 'A **imagem** é a receita com os ingredientes já separados: fica guardada e não muda. O **container** é o bolo assado a partir dela. Com uma receita, você assa quantos bolos quiser; se um bolo cai no chão, você joga fora e assa outro igual. Comer um pedaço do bolo não altera a receita.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Imagem',
              text: 'Um pacote somente leitura com sistema básico, linguagem, bibliotecas e o código. Tem nome e **tag** (versão), como `postgres:16` ou `api-pedidos:1.0`.',
            },
            {
              term: 'Container',
              text: 'Uma imagem em execução. Ganha uma camada própria onde pode escrever, mas essa camada some quando o container é removido.',
            },
            {
              term: 'Registro',
              text: 'Um depósito de imagens na internet. O mais conhecido é o Docker Hub, de onde vêm imagens oficiais como `nginx`, `python` e `postgres`.',
            },
          ],
        },
        {
          type: 'terminal',
          title: 'Seu primeiro container',
          task: 'Rode um servidor web nginx num container, sem instalar o nginx no computador.',
          prompt: 'ana@notebook:~$',
          steps: [
            {
              goal: 'Rode a imagem `nginx:1.27` em segundo plano (`-d`), com o nome `web`, ligando a porta 8080 do seu computador à porta 80 do container.',
              command: [
                'docker run -d --name web -p 8080:80 nginx:1.27',
                'docker run -d -p 8080:80 --name web nginx:1.27',
                'docker run --name web -d -p 8080:80 nginx:1.27',
              ],
              output:
                "Unable to find image 'nginx:1.27' locally\n1.27: Pulling from library/nginx\na2318d6c47ec: Pull complete\n095d327c79ae: Pull complete\nStatus: Downloaded newer image for nginx:1.27\n3f9c2a7e81d40b6f5c1e9a2d7b8e4f60a1c3d5e7f9b2a4c6d8e0f1a3b5c7d9e2",
              hint: 'A ordem é `docker run -d --name web -p 8080:80 nginx:1.27`.',
            },
            {
              goal: 'Liste os containers em execução.',
              command: ['docker ps', 'docker container ls'],
              output:
                'CONTAINER ID   IMAGE        COMMAND                  STATUS         PORTS                  NAMES\n3f9c2a7e81d4   nginx:1.27   "/docker-entrypoint.…"   Up 8 seconds   0.0.0.0:8080->80/tcp   web',
              hint: '`docker ps` mostra os containers que estão rodando.',
            },
            {
              goal: 'Acesse o servidor pela porta do seu computador e veja só os cabeçalhos da resposta.',
              command: [
                'curl -I localhost:8080',
                'curl -I http://localhost:8080',
                'curl -I http://127.0.0.1:8080',
              ],
              output:
                'HTTP/1.1 200 OK\nServer: nginx/1.27.2\nContent-Type: text/html\nContent-Length: 615',
              hint: 'Use `curl -I localhost:8080`. O `-I` pede só os cabeçalhos.',
            },
            {
              goal: 'Pare e remova o container de uma vez, com `rm -f`.',
              command: ['docker rm -f web', 'docker rm --force web'],
              output: 'web',
              hint: 'Use `docker rm -f web`.',
            },
            {
              goal: 'Liste as imagens guardadas no seu computador.',
              command: ['docker images', 'docker image ls'],
              output:
                'REPOSITORY   TAG       IMAGE ID       CREATED       SIZE\nnginx        1.27      9bea9f2796e2   2 weeks ago   192MB',
              hint: 'O comando é `docker images`.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Repare no final: o container foi apagado, mas a imagem continua lá. Na próxima vez, o `docker run` não precisa baixar nada e liga em menos de um segundo. O bolo foi embora, a receita ficou.',
        },
        {
          type: 'classify',
          prompt: 'Cada frase descreve a imagem ou o container?',
          buckets: ['Imagem (a receita)', 'Container (o bolo)'],
          items: [
            { text: 'Fica guardada e não muda depois de criada', bucket: 0 },
            { text: 'Tem nome e tag, como `postgres:16`', bucket: 0 },
            { text: 'É construída a partir de um Dockerfile', bucket: 0 },
            { text: 'Aparece no `docker ps` com status `Up`', bucket: 1 },
            { text: 'Perde os arquivos escritos quando é removido', bucket: 1 },
            {
              text: 'Pode existir em várias cópias ao mesmo tempo, vindas da mesma origem',
              bucket: 1,
            },
          ],
          explanation:
            'Guarde a regra: imagens são construídas e guardadas; containers são criados, rodam e são descartados. Tratar containers como descartáveis é o que permite recriá-los sem medo.',
        },
      ],
    },
    {
      id: 'dockerfile',
      title: 'O Dockerfile: escrevendo a receita',
      blocks: [
        {
          type: 'text',
          text: 'Para empacotar a sua aplicação, você escreve um **Dockerfile**: um arquivo de texto, chamado exatamente assim, sem extensão, com as instruções para montar a imagem. Cada instrução vira uma **camada**, como as camadas de um bolo.',
        },
        {
          type: 'anatomy',
          caption: 'O Dockerfile da API de pedidos',
          language: 'dockerfile',
          parts: [
            {
              text: 'FROM python:3.12-slim',
              label: 'FROM',
              note: 'A imagem de partida. Aqui, um Linux enxuto com Python 3.12 já instalado. Fixar a versão evita surpresas quando sair uma nova.',
            },
            { text: '\n\n' },
            {
              text: 'WORKDIR /app',
              label: 'WORKDIR',
              note: 'Cria e entra na pasta `/app` dentro da imagem. Os comandos seguintes acontecem nela, como um `cd`.',
            },
            { text: '\n\n' },
            {
              text: 'COPY requirements.txt .',
              label: 'COPY das dependências',
              note: 'Copia só a lista de bibliotecas do seu computador para a imagem. Vem antes do resto do código de propósito, por causa do cache.',
            },
            { text: '\n' },
            {
              text: 'RUN pip install --no-cache-dir -r requirements.txt',
              label: 'RUN',
              note: 'Executa um comando durante a construção da imagem. Instalar bibliotecas é a etapa mais lenta, e o resultado fica guardado numa camada.',
            },
            { text: '\n\n' },
            {
              text: 'COPY . .',
              label: 'COPY do código',
              note: 'Copia o resto do projeto. Como o código muda o tempo todo, essa camada é refeita quase sempre, mas é rápida.',
            },
            { text: '\n\n' },
            {
              text: 'USER 1000',
              label: 'USER',
              note: 'Daqui em diante, tudo roda como uma conta comum, não como root. Se alguém invadir a aplicação, encontra menos poder nas mãos.',
            },
            { text: '\n' },
            {
              text: 'EXPOSE 8000',
              label: 'EXPOSE',
              note: 'Documenta em que porta a aplicação escuta dentro do container. Não abre nada sozinho: quem liga a porta ao computador é o `-p` do `docker run`.',
            },
            { text: '\n' },
            {
              text: 'CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]',
              label: 'CMD',
              note: 'O comando que roda quando um container nasce dessa imagem. O `0.0.0.0` é essencial: como você viu na aula de redes, ouvir só em `127.0.0.1` deixaria a API inacessível de fora do container.',
            },
          ],
        },
        {
          type: 'reveal',
          question:
            'Por que copiar o `requirements.txt` e instalar as bibliotecas antes de copiar o resto do código?',
          answer:
            'Por causa do **cache de camadas**. O Docker reaproveita uma camada se nada mudou nela nem antes dela. Você muda o código dez vezes por dia, mas a lista de bibliotecas quase nunca. Com essa ordem, a instalação lenta fica no cache e cada nova construção leva segundos. Com `COPY . .` antes do `pip install`, qualquer vírgula alterada reinstalaria tudo.',
        },
        {
          type: 'terminal',
          title: 'Construindo a imagem e vendo o cache',
          task: 'Construa a imagem da API, altere uma linha do código e construa de novo.',
          prompt: 'ana@notebook:~/api-pedidos$',
          steps: [
            {
              goal: 'Construa a imagem a partir do Dockerfile desta pasta (o ponto final), com o nome e a tag `api-pedidos:1.0`.',
              command: [
                'docker build -t api-pedidos:1.0 .',
                'docker build --tag api-pedidos:1.0 .',
              ],
              output:
                '[+] Building 21.6s (10/10) FINISHED\n => [internal] load build definition from Dockerfile        0.0s\n => [1/5] FROM docker.io/library/python:3.12-slim            6.3s\n => [2/5] WORKDIR /app                                       0.1s\n => [3/5] COPY requirements.txt .                            0.0s\n => [4/5] RUN pip install --no-cache-dir -r requirements.txt 13.9s\n => [5/5] COPY . .                                           0.1s\n => exporting to image                                       1.1s\n => => naming to docker.io/library/api-pedidos:1.0           0.0s',
              hint: 'Use `docker build -t api-pedidos:1.0 .` sem esquecer o ponto.',
            },
            {
              goal: 'Você corrigiu um texto em `main.py`. Construa de novo, agora com a tag `1.1`.',
              command: [
                'docker build -t api-pedidos:1.1 .',
                'docker build --tag api-pedidos:1.1 .',
              ],
              output:
                '[+] Building 1.4s (10/10) FINISHED\n => [internal] load build definition from Dockerfile        0.0s\n => [1/5] FROM docker.io/library/python:3.12-slim            0.0s\n => CACHED [2/5] WORKDIR /app                                0.0s\n => CACHED [3/5] COPY requirements.txt .                     0.0s\n => CACHED [4/5] RUN pip install --no-cache-dir -r requirements.txt 0.0s\n => [5/5] COPY . .                                           0.1s\n => exporting to image                                       0.6s\n => => naming to docker.io/library/api-pedidos:1.1           0.0s',
              hint: 'O mesmo comando, trocando a tag para `1.1`.',
            },
          ],
        },
        {
          type: 'text',
          text: 'De 21,6 segundos para 1,4. As linhas com `CACHED` foram reaproveitadas, e só a cópia do código foi refeita. Em projetos grandes, essa diferença é de minutos a cada construção.',
        },
        {
          type: 'order',
          prompt: 'Coloque as instruções de um Dockerfile na ordem que aproveita melhor o cache.',
          items: [
            '`FROM python:3.12-slim`',
            '`WORKDIR /app`',
            '`COPY requirements.txt .`',
            '`RUN pip install -r requirements.txt`',
            '`COPY . .`',
            '`CMD ["python", "main.py"]`',
          ],
          explanation:
            'Do que muda menos para o que muda mais: a base, a pasta, as dependências e por fim o código. O `CMD` fica no final porque só diz o que rodar quando o container nascer.',
        },
      ],
    },
    {
      id: 'rodar-e-investigar',
      title: 'Portas, variáveis, logs e volumes',
      blocks: [
        {
          type: 'text',
          text: 'Um container é isolado: tem rede, pastas e processos próprios. Para usá-lo de verdade, você abre portas de propósito com `-p`, passa configurações com `-e` e, quando algo falha, olha os logs e entra nele para investigar.',
        },
        {
          type: 'terms',
          items: [
            {
              term: '`-p 8080:8000`',
              text: 'Liga a porta `8080` do seu computador à porta `8000` do container. A ordem é sempre **computador:container**.',
            },
            {
              term: '`-e NOME=valor`',
              text: 'Cria uma variável de ambiente dentro do container. É assim que a mesma imagem recebe o endereço do banco de teste ou de produção.',
            },
            {
              term: '`docker logs nome`',
              text: 'Mostra tudo o que a aplicação escreveu na tela. Com `-f`, acompanha ao vivo, como o `tail -f`.',
            },
            {
              term: '`docker exec -it nome sh`',
              text: 'Abre um terminal dentro do container em execução, para olhar arquivos e variáveis por dentro.',
            },
          ],
        },
        {
          type: 'terminal',
          title: 'A API que liga e cai',
          task: 'Rode a imagem da API e descubra por que ela não fica de pé.',
          prompt: 'ana@notebook:~/api-pedidos$',
          steps: [
            {
              goal: 'Rode `api-pedidos:1.1` em segundo plano com o nome `api`, ligando a porta 8000 do computador à 8000 do container.',
              command: [
                'docker run -d --name api -p 8000:8000 api-pedidos:1.1',
                'docker run -d -p 8000:8000 --name api api-pedidos:1.1',
                'docker run --name api -d -p 8000:8000 api-pedidos:1.1',
              ],
              output: 'b71e04c9d3a25f8e6b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a',
              hint: 'Use `docker run -d --name api -p 8000:8000 api-pedidos:1.1`.',
            },
            {
              goal: 'Liste todos os containers, inclusive os que pararam (`-a`).',
              command: ['docker ps -a', 'docker container ls -a', 'docker ps --all'],
              output:
                'CONTAINER ID   IMAGE             COMMAND                  STATUS                     NAMES\nb71e04c9d3a2   api-pedidos:1.1   "uvicorn main:app --…"   Exited (1) 4 seconds ago   api',
              hint: 'Acrescente `-a` ao `docker ps`.',
            },
            {
              goal: 'O container saiu com código 1. Leia os logs dele.',
              command: ['docker logs api', 'docker container logs api'],
              output:
                'INFO:     Started server process [1]\nINFO:     Waiting for application startup.\nERROR:    Traceback (most recent call last):\n  File "/app/main.py", line 9, in <module>\n    DATABASE_URL = os.environ["DATABASE_URL"]\nKeyError: \'DATABASE_URL\'\nERROR:    Application startup failed. Exiting.',
              hint: 'Use `docker logs api`.',
            },
            {
              goal: 'Faltou a variável `DATABASE_URL`. Remova o container quebrado.',
              command: ['docker rm api', 'docker rm -f api', 'docker container rm api'],
              output: 'api',
              hint: 'Use `docker rm api`.',
            },
            {
              goal: 'Rode de novo passando `-e DATABASE_URL=postgresql://loja:segredo@db:5432/loja`.',
              command: [
                'docker run -d --name api -p 8000:8000 -e DATABASE_URL=postgresql://loja:segredo@db:5432/loja api-pedidos:1.1',
                'docker run -d -p 8000:8000 --name api -e DATABASE_URL=postgresql://loja:segredo@db:5432/loja api-pedidos:1.1',
                'docker run -d --name api -e DATABASE_URL=postgresql://loja:segredo@db:5432/loja -p 8000:8000 api-pedidos:1.1',
              ],
              output: '5c2d8e1f0a9b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d',
              hint: 'O mesmo `docker run` de antes, com `-e DATABASE_URL=...` antes do nome da imagem.',
            },
            {
              goal: 'Entre no container e confira a variável por dentro.',
              command: [
                'docker exec api env | grep DATABASE',
                'docker exec api env | grep DATABASE_URL',
                'docker exec api printenv | grep DATABASE',
              ],
              output: 'DATABASE_URL=postgresql://loja:segredo@db:5432/loja',
              hint: '`docker exec api env | grep DATABASE` roda o `env` dentro do container e filtra.',
            },
          ],
        },
        {
          type: 'text',
          text: 'A variável chegou e a API ligou. Mas o nome `db` no endereço ainda não existe, e o primeiro pedido vai falhar: falta um banco de dados para a API conversar. Para investigar por dentro com calma, `docker exec -it api sh` abre um terminal no container (saia com `exit`). O banco entra com o Compose, na próxima seção. Antes, um ponto crucial sobre dados.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Container removido leva os dados junto',
          text: 'Tudo o que um container escreve fica na camada dele, e some no `docker rm`. Para um banco de dados, isso seria perder todos os pedidos. A solução é um **volume**: uma pasta guardada pelo Docker fora do container, ligada a ele com `-v nome-do-volume:/caminho/no/container`. O container pode ser recriado mil vezes; o volume continua.',
        },
        {
          type: 'quiz',
          question:
            'Você roda `docker run -d -p 3000:8000 api-pedidos:1.1`. Qual endereço abre a API no navegador do seu computador?',
          options: [
            {
              text: '`http://localhost:3000`',
              correct: true,
              feedback:
                'Isso. No `-p`, o primeiro número é a porta do seu computador e o segundo, a porta dentro do container. O Docker repassa o que chega na `3000` para a `8000` lá dentro.',
            },
            {
              text: '`http://localhost:8000`',
              feedback:
                '`8000` é a porta do lado de dentro do container. Do seu computador, nada escuta nela, a menos que outra coisa esteja usando essa porta.',
            },
            {
              text: '`http://localhost:3000:8000`',
              feedback:
                'Um endereço tem uma porta só. O par `3000:8000` é a regra de ligação que o Docker usa, não algo para digitar no navegador.',
            },
          ],
        },
      ],
    },
    {
      id: 'compose',
      title: 'Docker Compose: a aplicação inteira num arquivo',
      blocks: [
        {
          type: 'text',
          text: 'Uma aplicação real tem várias peças: a API, o banco, às vezes um cache ou um job de dados. Subir cada uma com um `docker run` enorme é fácil de errar. O **Docker Compose** descreve todas as peças num arquivo YAML, `compose.yaml`, e sobe tudo com um comando. Ele também cria uma rede onde cada serviço encontra o outro **pelo nome**.',
        },
        {
          type: 'anatomy',
          caption: '`compose.yaml` com a API e um PostgreSQL',
          language: 'yaml',
          parts: [
            {
              text: 'services:',
              label: 'services',
              note: 'A lista das peças da aplicação. Cada nome logo abaixo vira um serviço e também um nome na rede interna.',
            },
            { text: '\n  ' },
            {
              text: 'api:\n    build: .',
              label: 'build',
              note: 'O serviço `api` é construído a partir do Dockerfile desta pasta, igual ao `docker build`.',
            },
            { text: '\n    ' },
            {
              text: 'ports:\n      - "8000:8000"',
              label: 'ports',
              note: 'O mesmo `-p` do `docker run`: computador à esquerda, container à direita.',
            },
            { text: '\n    ' },
            {
              text: 'environment:\n      DATABASE_URL: postgresql://loja:${DB_SENHA}@db:5432/loja',
              label: 'environment',
              note: 'Variáveis de ambiente. Repare no `db`: é o nome do outro serviço. Dentro da rede do Compose, ele funciona como um endereço. A senha vem de `${DB_SENHA}`, lida de um arquivo `.env` que não vai para o Git.',
            },
            { text: '\n    ' },
            {
              text: 'depends_on:\n      db:\n        condition: service_healthy',
              label: 'depends_on',
              note: 'Só liga a API depois que o banco estiver saudável, conforme o health check dele. Sem isso, a API pode tentar conectar antes de o banco aceitar conexões.',
            },
            { text: '\n\n  ' },
            {
              text: 'db:\n    image: postgres:16',
              label: 'image',
              note: 'O banco usa a imagem oficial pronta, com versão fixa. Não há nada para construir.',
            },
            {
              text: '\n    environment:\n      POSTGRES_USER: loja\n      POSTGRES_PASSWORD: ${DB_SENHA}\n      POSTGRES_DB: loja\n    ',
            },
            {
              text: 'volumes:\n      - dados-pg:/var/lib/postgresql/data',
              label: 'volumes',
              note: 'Liga o volume `dados-pg` à pasta onde o PostgreSQL guarda os dados. Recriar o container não apaga os pedidos.',
            },
            { text: '\n    ' },
            {
              text: 'healthcheck:\n      test: ["CMD", "pg_isready", "-U", "loja"]\n      interval: 5s\n      retries: 5',
              label: 'healthcheck',
              note: 'Um teste que o Docker roda de tempos em tempos para saber se o serviço está pronto de verdade, não só ligado.',
            },
            { text: '\n\n' },
            {
              text: 'volumes:\n  dados-pg:',
              label: 'Declaração do volume',
              note: 'Os volumes nomeados precisam ser declarados no fim do arquivo.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'O mesmo arquivo serve a várias trilhas',
          text: 'No backend, as peças costumam ser API e banco. Em engenharia de dados, o par vira um job de ingestão em Python e um PostgreSQL ou um orquestrador. A ideia é igual: o ambiente inteiro descrito em arquivos versionados no Git, que qualquer pessoa recria com um comando.',
        },
        {
          type: 'terminal',
          title: 'Subindo, investigando e recriando',
          task: 'Suba a aplicação, confira os serviços, leia os logs e prove que os dados sobrevivem à recriação.',
          prompt: 'ana@notebook:~/api-pedidos$',
          steps: [
            {
              goal: 'Suba todos os serviços em segundo plano.',
              command: [
                'docker compose up -d',
                'docker compose up --detach',
                'docker compose up -d --build',
              ],
              output:
                '[+] Running 4/4\n ✔ Network api-pedidos_default     Created   0.1s\n ✔ Volume "api-pedidos_dados-pg"   Created   0.0s\n ✔ Container api-pedidos-db-1      Healthy   6.2s\n ✔ Container api-pedidos-api-1     Started   6.4s',
              hint: 'Use `docker compose up -d`. Repare: `docker compose`, com espaço.',
            },
            {
              goal: 'Veja o estado dos serviços.',
              command: ['docker compose ps', 'docker compose ps -a'],
              output:
                'NAME                IMAGE             SERVICE   STATUS                    PORTS\napi-pedidos-api-1   api-pedidos-api   api       Up 12 seconds             0.0.0.0:8000->8000/tcp\napi-pedidos-db-1    postgres:16       db        Up 18 seconds (healthy)   5432/tcp',
              hint: 'Use `docker compose ps`.',
            },
            {
              goal: 'Leia os logs só do serviço `api`.',
              command: ['docker compose logs api', 'docker compose logs -f api'],
              output:
                'api-1  | INFO:     Started server process [1]\napi-1  | INFO:     Conectado ao banco em db:5432\napi-1  | INFO:     Uvicorn running on http://0.0.0.0:8000',
              hint: 'Use `docker compose logs` seguido do nome do serviço.',
            },
            {
              goal: 'Crie um pedido de teste pela API, com um `POST`.',
              command: [
                'curl -X POST localhost:8000/pedidos -d \'{"item":"pao de queijo","qtd":6}\'',
                'curl -X POST http://localhost:8000/pedidos -d \'{"item":"pao de queijo","qtd":6}\'',
              ],
              output: '{"id":1,"item":"pao de queijo","qtd":6}',
              hint: 'Copie: `curl -X POST localhost:8000/pedidos -d \'{"item":"pao de queijo","qtd":6}\'`.',
            },
            {
              goal: 'Derrube tudo: containers e rede. Sem `-v`, os volumes ficam.',
              command: 'docker compose down',
              output:
                '[+] Running 3/3\n ✔ Container api-pedidos-api-1   Removed   0.4s\n ✔ Container api-pedidos-db-1    Removed   0.3s\n ✔ Network api-pedidos_default   Removed   0.1s',
              hint: 'O contrário de `up` é `down`.',
            },
            {
              goal: 'Suba tudo de novo e confira se o pedido sobreviveu.',
              command: [
                'docker compose up -d && curl localhost:8000/pedidos',
                'docker compose up -d && curl http://localhost:8000/pedidos',
              ],
              output:
                '[+] Running 3/3\n ✔ Network api-pedidos_default   Created   0.1s\n ✔ Container api-pedidos-db-1    Healthy   5.8s\n ✔ Container api-pedidos-api-1   Started   6.0s\n[{"id":1,"item":"pao de queijo","qtd":6}]',
              hint: 'Junte os dois comandos com `&&`: `docker compose up -d && curl localhost:8000/pedidos`.',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Dentro do container da API, a configuração do banco está como `localhost:5432` e a conexão falha. O banco está de pé no serviço `db`. O que corrigir?',
          options: [
            {
              text: 'Trocar `localhost` por `db`, o nome do serviço no Compose',
              correct: true,
              feedback:
                'Isso. Dentro de um container, `localhost` é o próprio container da API, onde não há banco nenhum. Na rede do Compose, cada serviço é encontrado pelo nome.',
            },
            {
              text: 'Publicar a porta `5432` do banco com `ports`',
              feedback:
                '`ports` liga o banco ao seu computador, não à API. Dentro da rede do Compose os serviços já se enxergam, sem publicar nada.',
            },
            {
              text: 'Rodar a API como root',
              feedback:
                'Permissão não tem nada a ver com encontrar o endereço. O problema é que `localhost` aponta para o lugar errado.',
            },
          ],
        },
      ],
    },
    {
      id: 'erros-comuns',
      title: 'Os erros que todo mundo comete no começo',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              label: 'Segredo na imagem',
              title: 'Senhas no Dockerfile ou copiadas com o código',
              text: 'Qualquer pessoa com acesso à imagem consegue extrair o que está dentro dela, mesmo de camadas antigas. Passe segredos por variáveis de ambiente na hora de rodar e coloque `.env` no `.dockerignore` e no `.gitignore`.',
            },
            {
              label: 'Tag latest',
              title: 'Usar `latest` ou nenhuma tag',
              text: '`latest` não quer dizer “estável”, só “a mais recente que alguém publicou”. Hoje é a 16, amanhã é a 17 e seu banco não sobe. Fixe versões, como `postgres:16`.',
            },
            {
              label: 'Root',
              title: 'Rodar a aplicação como root',
              text: 'Por padrão, o processo dentro do container é root. Se a aplicação for invadida, o atacante começa com poder máximo. Use `USER` no Dockerfile com uma conta comum.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'docker compose down -v apaga os dados',
          text: 'O `-v` remove também os volumes. Num banco de desenvolvimento pode ser o que você quer, para começar do zero. Em qualquer outro lugar, é o equivalente a apagar o banco. Leia o comando antes do `Enter`.',
        },
        {
          type: 'classify',
          prompt: 'Boa prática ou risco?',
          buckets: ['Boa prática', 'Risco'],
          items: [
            { text: '`FROM python:3.12-slim`', bucket: 0 },
            { text: '`FROM python:latest`', bucket: 1 },
            { text: '`ENV DB_SENHA=minhasenha123` no Dockerfile', bucket: 1 },
            { text: 'Senha passada com `-e` ou num `.env` fora do Git', bucket: 0 },
            { text: '`USER 1000` antes do `CMD`', bucket: 0 },
            { text: 'Banco sem volume, “porque é só um teste”', bucket: 1 },
            { text: '`.dockerignore` com `.env` e `.git`', bucket: 0 },
          ],
          explanation:
            'Os três erros clássicos são segredos dentro da imagem, versões que mudam sozinhas e privilégios demais. Um quarto, muito comum em desenvolvimento, é esquecer o volume e perder o banco ao recriar o container.',
        },
      ],
    },
  ],
  recap: [
    'Containers acabam com o “na minha máquina funciona” ao empacotar a aplicação com tudo de que ela precisa.',
    'A **imagem** é a receita, guardada e imutável; o **container** é o bolo, criado, executado e descartável.',
    'O **Dockerfile** monta a imagem em camadas: `FROM`, `WORKDIR`, `COPY`, `RUN` e `CMD`, das que mudam menos para as que mudam mais, para aproveitar o cache.',
    '`-p computador:container` abre portas, `-e` passa configurações, `docker logs` e `docker exec` investigam e **volumes** guardam dados além da vida do container.',
    'O **Compose** descreve a aplicação inteira num `compose.yaml`, onde os serviços se encontram pelo nome; evite segredos na imagem, a tag `latest` e rodar como root.',
  ],
  cards: [
    {
      id: 'imagem-container',
      front: 'Qual a diferença entre imagem e container?',
      back: 'A imagem é o pacote guardado e imutável (a receita). O container é uma imagem em execução (o bolo).',
    },
    {
      id: 'porta-p',
      front: 'Em `-p 8080:80`, qual número é a porta do seu computador?',
      back: 'O primeiro, `8080`. O segundo, `80`, é a porta dentro do container.',
    },
    {
      id: 'cache-camadas',
      front: 'Por que copiar `requirements.txt` antes do resto do código no Dockerfile?',
      back: 'Para a instalação das bibliotecas ficar no cache e só ser refeita quando a lista mudar.',
    },
    {
      id: 'volume',
      front: 'O que acontece com os dados de um container sem volume quando ele é removido?',
      back: 'Somem junto. Um volume guarda os dados fora do container e sobrevive à recriação.',
    },
    {
      id: 'container-saiu',
      front: 'Um container aparece como `Exited (1)`. Qual o primeiro comando para investigar?',
      back: '`docker logs nome-do-container`, para ler o erro que a aplicação escreveu.',
    },
    {
      id: 'compose-nome',
      front: 'No Compose, como a API encontra o banco?',
      back: 'Pelo nome do serviço, como `db:5432`. `localhost` dentro do container é o próprio container.',
    },
    {
      id: 'tag-latest',
      front: 'Por que evitar a tag `latest`?',
      back: 'Porque ela muda sem aviso para a versão mais nova e pode quebrar a aplicação. Fixe versões.',
    },
  ],
  mission: {
    title: 'Recrie seu ambiente a partir dos arquivos',
    text: 'A prática pedida nas trilhas de DevOps, Backend e Engenharia de Dados é a mesma no fundo: subir aplicação e banco com Compose, investigar uma falha pelos logs e provar que os dados sobrevivem. Use uma API sua, a de um tutorial ou um script de dados simples.',
    steps: [
      'Escreva um Dockerfile para a aplicação com versão fixa no `FROM`, dependências antes do código e `USER` sem root',
      'Crie um `compose.yaml` com a aplicação e um `postgres:16` com volume e health check, e a senha vinda de um `.env` fora do Git',
      'Suba com `docker compose up -d`, provoque uma falha (como apagar uma variável de ambiente) e encontre a causa com `docker compose logs`',
      'Grave um dado, rode `docker compose down` e `up -d` de novo e confirme que ele continua lá',
      'Clone o repositório numa pasta nova e suba tudo só com os arquivos versionados, anotando no README os comandos usados',
    ],
  },
  sources: [
    {
      title: 'Docker: Get started',
      url: 'https://docs.docker.com/get-started/',
    },
    {
      title: 'Docker: boas práticas para construir imagens',
      url: 'https://docs.docker.com/build/building/best-practices/',
    },
    {
      title: 'Docker Compose: documentação',
      url: 'https://docs.docker.com/compose/',
    },
  ],
};
