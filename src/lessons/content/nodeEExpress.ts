import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Até aqui, todo o seu JavaScript rodou dentro do navegador, numa aba que some quando a pessoa fecha. Mas a lista de despesas, o login e o carrinho precisam morar em algum lugar que fique ligado o tempo todo e atenda muita gente ao mesmo tempo. Com Node.js e Express você usa a mesma linguagem para escrever esse outro lado: o servidor que recebe pedidos e devolve respostas. É o primeiro passo para dizer em uma entrevista “eu fiz o front e a API”.',
  sections: [
    {
      id: 'javascript-fora-do-navegador',
      title: 'JavaScript fora do navegador',
      blocks: [
        {
          type: 'analogy',
          title: 'A mesma receita, outra cozinha',
          text: 'Uma cozinheira que aprendeu a receita de pão em casa pode fazer o mesmo pão na padaria. A receita é igual, mas a cozinha muda: na padaria tem forno industrial e balcão de atendimento, e não tem a geladeira de casa. O JavaScript é a receita. O navegador é a cozinha de casa; o Node.js é a padaria.',
        },
        {
          type: 'text',
          text: '**Node.js** é um programa que roda JavaScript direto no computador, sem navegador. Ele usa o mesmo motor de JavaScript do Chrome, chamado V8, mas troca as ferramentas em volta. Esse conjunto de motor e ferramentas se chama **ambiente de execução** (em inglês, runtime).',
        },
        {
          type: 'text',
          text: 'No navegador existem `document`, `window` e `localStorage`, porque lá há uma página para mexer. No Node não há página: no lugar, ele oferece acesso a arquivos (`fs`), à rede (`http`) e às variáveis do sistema (`process.env`). A linguagem é a mesma; o que muda é o que está disponível.',
        },
        {
          type: 'classify',
          prompt: 'Onde cada recurso existe?',
          buckets: ['Só no navegador', 'Só no Node.js', 'Nos dois'],
          items: [
            { text: '`document.querySelector`', bucket: 0 },
            { text: '`localStorage`', bucket: 0 },
            { text: '`fs.readFile` para ler um arquivo do disco', bucket: 1 },
            { text: '`process.env.PORT`', bucket: 1 },
            { text: '`console.log`', bucket: 2 },
            { text: '`JSON.parse`', bucket: 2 },
            { text: '`setTimeout`', bucket: 2 },
          ],
          explanation:
            'Tudo o que faz parte da linguagem (`JSON`, funções, arrays) e alguns utilitários comuns (`console`, `setTimeout`, `fetch`) existem nos dois. O que mexe na página é exclusivo do navegador; o que mexe em arquivos e no sistema é exclusivo do Node.',
        },
        {
          type: 'terminal',
          title: 'Seu primeiro JavaScript no terminal',
          task: 'Confira se o Node está instalado e rode uma linha de JavaScript sem abrir navegador nenhum.',
          prompt: '~$',
          steps: [
            {
              goal: 'Veja qual versão do Node está instalada.',
              command: ['node -v', 'node --version'],
              output: 'v22.11.0',
              hint: 'Use `node -v`. Se aparecer “command not found”, o Node ainda não foi instalado.',
            },
            {
              goal: 'Rode uma conta direto no terminal com a opção `-e` (de “execute”): `node -e "console.log(230 + 4.4)"`.',
              command: [
                'node -e "console.log(230 + 4.4)"',
                "node -e 'console.log(230 + 4.4)'",
                'node -e "console.log(230+4.4)"',
              ],
              output: '234.4',
              hint: 'Escreva exatamente `node -e "console.log(230 + 4.4)"`.',
            },
            {
              goal: 'Agora tente usar `document`, que só existe no navegador: `node -e "document.title"`.',
              command: ['node -e "document.title"', "node -e 'document.title'"],
              output: `[eval]:1
document.title
^

ReferenceError: document is not defined
    at [eval]:1:1

Node.js v22.11.0`,
              hint: 'Escreva `node -e "document.title"`. O erro é esperado: é ele que você quer ler.',
            },
          ],
        },
      ],
    },
    {
      id: 'projeto-e-modulos',
      title: 'Um projeto Node e seus módulos',
      blocks: [
        {
          type: 'text',
          text: 'Na aula de npm e Vite você conheceu o `package.json`, a ficha do projeto. Um servidor Node usa a mesma ficha. A diferença é que agora você vai instalar o **Express**, uma biblioteca que cuida do trabalho chato de receber pedidos HTTP, para você só escrever o que cada endereço responde.',
        },
        {
          type: 'terminal',
          title: 'Comece a API de despesas',
          task: 'Crie a pasta do projeto, gere o `package.json`, instale o Express e ligue o servidor.',
          prompt: '~$',
          steps: [
            {
              goal: 'Crie a pasta `api-despesas` e entre nela, numa linha só, com `&&` entre os comandos.',
              command: [
                'mkdir api-despesas && cd api-despesas',
                'mkdir api-despesas&&cd api-despesas',
              ],
              output: '',
              hint: 'Escreva `mkdir api-despesas && cd api-despesas`.',
              prompt: '~/api-despesas$',
            },
            {
              goal: 'Gere o `package.json` aceitando as respostas padrão.',
              command: ['npm init -y', 'npm init --yes'],
              output: `Wrote to /home/voce/api-despesas/package.json:

{
  "name": "api-despesas",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "license": "ISC"
}`,
              hint: 'O `-y` responde “sim” para todas as perguntas: `npm init -y`.',
            },
            {
              goal: 'Instale o Express como dependência do projeto.',
              command: ['npm install express', 'npm i express'],
              output: `added 66 packages, and audited 67 packages in 3s

14 packages are looking for funding
  run \`npm fund\` for details

found 0 vulnerabilities`,
              hint: 'Use `npm install express`. Ele entra em `dependencies`, porque o servidor precisa dele para funcionar.',
            },
            {
              goal: 'Você já criou o `server.js` (o código está logo abaixo). Ligue o servidor com o Node.',
              command: ['node server.js', 'node ./server.js', 'npm run dev'],
              output: 'API ouvindo em http://localhost:3000',
              hint: 'Escreva `node server.js`. O terminal fica “preso”: é o servidor esperando pedidos. Para desligar, `Ctrl+C`.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Um **módulo** é um arquivo que exporta coisas para outros arquivos usarem. Para usar `import` e `export` no Node, como você faz no Vite, adicione `"type": "module"` no `package.json`. Sem isso, o Node usa o formato antigo, com `require`.',
        },
        {
          type: 'codeTabs',
          caption: 'Separar os dados do servidor em módulos',
          tabs: [
            {
              label: 'package.json',
              language: 'json',
              code: `{
  "name": "api-despesas",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "node --watch server.js"
  },
  "dependencies": {
    "express": "^5.1.0"
  }
}`,
            },
            {
              label: 'despesas.js',
              language: 'js',
              code: `export const despesas = [
  { id: 1, descricao: 'Mercado', valor: 230 },
  { id: 2, descricao: 'Ônibus', valor: 4.4 },
];

export function buscarPorId(id) {
  return despesas.find((despesa) => despesa.id === id);
}`,
            },
            {
              label: 'server.js',
              language: 'js',
              code: `import express from 'express';
import { despesas, buscarPorId } from './despesas.js';

// ...rotas usam despesas e buscarPorId`,
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'node --watch',
          text: 'O script `dev` usa `node --watch`: ele reinicia o servidor sozinho toda vez que você salva um arquivo. Sem isso, cada mudança exige `Ctrl+C` e `node server.js` de novo.',
        },
        {
          type: 'quiz',
          question:
            'Você rodou `node server.js` e apareceu `SyntaxError: Cannot use import statement outside a module`. O que está faltando?',
          options: [
            {
              text: 'A linha `"type": "module"` no `package.json`',
              correct: true,
              feedback:
                'Isso. Sem essa linha, o Node lê arquivos `.js` no formato antigo (CommonJS), que usa `require`, e não reconhece `import`.',
            },
            {
              text: 'Rodar `npm install express` de novo',
              feedback:
                "Se o Express não estivesse instalado, o erro seria outro: “Cannot find package 'express'”. Esta mensagem fala do formato do arquivo, não do pacote.",
            },
            {
              text: 'Abrir o `server.js` no navegador, que entende `import`',
              feedback:
                'O navegador não consegue rodar um servidor: ele não abre portas nem fica esperando pedidos. O servidor precisa rodar no Node.',
            },
            {
              text: 'Trocar a extensão do arquivo para `.html`',
              feedback:
                'A extensão `.html` é para páginas. O Node roda arquivos JavaScript; o ajuste é avisar que eles usam o formato de módulos.',
            },
          ],
        },
      ],
    },
    {
      id: 'anatomia-do-servidor',
      title: 'A anatomia de um servidor Express',
      blocks: [
        {
          type: 'analogy',
          title: 'O balcão da padaria',
          text: 'Na padaria, a pessoa no balcão escuta o pedido, confere a vitrine e entrega o pão ou diz “acabou”. Ela nunca sai procurando cliente: fica parada esperando alguém chegar. Um servidor faz igual. Ele **escuta** uma porta e, a cada pedido, decide a resposta.',
        },
        {
          type: 'anatomy',
          caption: 'O menor servidor útil da API de despesas. Explore cada parte.',
          language: 'js',
          parts: [
            {
              text: "import express from 'express';",
              label: 'Importar',
              note: 'Traz a biblioteca instalada em `node_modules`. O `express` importado é uma função que cria aplicações.',
            },
            { text: '\n\n' },
            {
              text: 'const app = express();',
              label: 'Criar a aplicação',
              note: '`app` é o seu servidor. Nele você registra o que fazer com cada pedido.',
            },
            { text: '\n' },
            {
              text: 'app.use(express.json());',
              label: 'Middleware de JSON',
              note: 'Lê o corpo dos pedidos que chegam em JSON e coloca o resultado em `req.body`. Sem ele, `req.body` fica `undefined`.',
            },
            {
              text: `

const despesas = [
  { id: 1, descricao: 'Mercado', valor: 230 },
  { id: 2, descricao: 'Ônibus', valor: 4.4 },
];

`,
            },
            {
              text: "app.get('/despesas', ",
              label: 'Rota',
              note: 'Uma **rota** junta um método HTTP (`get`) e um caminho (`/despesas`). Só pedidos `GET /despesas` caem aqui.',
            },
            {
              text: '(req, res) => {',
              label: 'Handler',
              note: 'A função que trata o pedido. `req` (requisição) traz o que chegou: caminho, parâmetros, corpo. `res` (resposta) tem os métodos para responder.',
            },
            { text: '\n  ' },
            {
              text: 'res.json(despesas);',
              label: 'Responder',
              note: 'Transforma o array em texto JSON, coloca o cabeçalho `Content-Type: application/json` e envia com status 200. Cada pedido precisa de exatamente uma resposta.',
            },
            { text: '\n});\n\n' },
            {
              text: 'app.listen(3000, ',
              label: 'Escutar a porta',
              note: 'Liga o servidor na porta 3000. Porta é como o número do guichê: o mesmo computador pode ter vários programas, cada um escutando a sua.',
            },
            {
              text: `() => {
  console.log('API ouvindo em http://localhost:3000');
});`,
            },
          ],
        },
        {
          type: 'flow',
          caption: 'O que acontece quando alguém pede a lista de despesas',
          actors: ['Cliente', 'Express', 'Handler'],
          steps: [
            {
              from: 0,
              to: 1,
              label: 'GET /despesas',
              text: 'O cliente pode ser o navegador, o `curl` ou o seu app React. Para o servidor, tanto faz: chega um pedido HTTP na porta 3000.',
            },
            {
              from: 1,
              to: 1,
              label: 'procura a rota',
              text: 'O Express compara método e caminho com as rotas registradas, na ordem em que foram escritas, e passa pelos middlewares no caminho.',
            },
            {
              from: 1,
              to: 2,
              label: 'chama (req, res)',
              text: "Achou `app.get('/despesas')`. O Express chama o handler entregando os objetos `req` e `res`.",
            },
            {
              from: 2,
              to: 0,
              label: '200 + JSON',
              text: '`res.json(despesas)` envia o status 200, o cabeçalho de JSON e a lista. A conversa termina.',
              tone: 'ok',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Um handler faz `console.log(despesas)` mas esquece o `res.json(...)`. O que acontece com quem pediu?',
          options: [
            {
              text: 'O pedido fica esperando, sem resposta, até desistir por tempo',
              correct: true,
              feedback:
                'Isso. O `console.log` escreve no terminal do **servidor**, não envia nada ao cliente. Sem `res.json` ou `res.send`, o cliente fica “carregando” até estourar o tempo limite.',
            },
            {
              text: 'O cliente recebe a lista, porque ela foi impressa',
              feedback:
                'O `console.log` aparece no terminal onde o servidor está rodando. Para algo chegar ao cliente, é preciso usar os métodos de `res`.',
            },
            {
              text: 'O Express responde 404 automaticamente',
              feedback:
                'O 404 automático só acontece quando nenhuma rota combina. Aqui a rota combinou; o Express espera o handler responder e ele nunca responde.',
            },
          ],
        },
      ],
    },
    {
      id: 'rotas-e-status',
      title: 'Parâmetros, corpo e status',
      blocks: [
        {
          type: 'text',
          text: 'Uma API de verdade precisa de mais do que a lista. Na aula de API REST você viu recursos, métodos e status. Agora você escreve isso em código. Três lugares guardam informação do pedido: `req.params` (pedaços variáveis do caminho, como o `2` em `/despesas/2`), `req.query` (o que vem depois do `?`) e `req.body` (o corpo, num POST).',
        },
        {
          type: 'code',
          language: 'js',
          caption: 'Buscar uma despesa e criar uma nova',
          code: `app.get('/despesas/:id', (req, res) => {
  const id = Number(req.params.id); // params sempre chegam como texto
  const despesa = despesas.find((d) => d.id === id);
  if (!despesa) {
    return res.status(404).json({ erro: 'Despesa não encontrada' });
  }
  res.json(despesa);
});

app.post('/despesas', (req, res) => {
  const { descricao, valor } = req.body;
  if (typeof descricao !== 'string' || descricao.trim() === '') {
    return res.status(400).json({ erro: 'Informe a descrição' });
  }
  if (typeof valor !== 'number' || valor <= 0) {
    return res.status(400).json({ erro: 'O valor deve ser maior que zero' });
  }
  const nova = { id: despesas.length + 1, descricao: descricao.trim(), valor };
  despesas.push(nova);
  res.status(201).json(nova);
});`,
        },
        {
          type: 'text',
          text: 'Repare no `return` antes de `res.status(...)`. Ele encerra a função ali. Sem ele, o código continuaria e tentaria responder duas vezes ao mesmo pedido.',
        },
        {
          type: 'terminal',
          title: 'Converse com a API pelo curl',
          task: 'O servidor está rodando em outro terminal. Use o `curl`, um cliente HTTP de linha de comando, para testar cada rota.',
          prompt: '~$',
          steps: [
            {
              goal: 'Peça a lista de despesas.',
              command: ['curl http://localhost:3000/despesas', 'curl localhost:3000/despesas'],
              output:
                '[{"id":1,"descricao":"Mercado","valor":230},{"id":2,"descricao":"Ônibus","valor":4.4}]',
              hint: 'Escreva `curl http://localhost:3000/despesas`.',
            },
            {
              goal: 'Peça uma despesa que não existe, a de id 99, e use `-i` para ver também o status e os cabeçalhos.',
              command: [
                'curl -i http://localhost:3000/despesas/99',
                'curl -i localhost:3000/despesas/99',
                'curl http://localhost:3000/despesas/99 -i',
              ],
              output: `HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 32
Date: Wed, 14 Oct 2026 15:10:02 GMT

{"erro":"Despesa não encontrada"}`,
              hint: 'O `-i` mostra a primeira linha da resposta: `curl -i http://localhost:3000/despesas/99`.',
            },
            {
              goal: 'Crie uma despesa com POST. Envie o cabeçalho de JSON e o corpo: `curl -i -X POST http://localhost:3000/despesas -H "Content-Type: application/json" -d \'{"descricao":"Farmácia","valor":37.9}\'`.',
              command: [
                'curl -i -X POST http://localhost:3000/despesas -H "Content-Type: application/json" -d \'{"descricao":"Farmácia","valor":37.9}\'',
                'curl -i -X POST localhost:3000/despesas -H "Content-Type: application/json" -d \'{"descricao":"Farmácia","valor":37.9}\'',
                'curl -X POST -i http://localhost:3000/despesas -H "Content-Type: application/json" -d \'{"descricao":"Farmácia","valor":37.9}\'',
                'curl -i -X POST -H "Content-Type: application/json" -d \'{"descricao":"Farmácia","valor":37.9}\' http://localhost:3000/despesas',
              ],
              output: `HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 47

{"id":3,"descricao":"Farmácia","valor":37.9}`,
              hint: '`-X POST` escolhe o método, `-H` adiciona o cabeçalho e `-d` envia o corpo. Copie o comando do objetivo.',
            },
            {
              goal: 'Agora envie um valor negativo para ver a validação do servidor em ação: troque o corpo por `\'{"descricao":"Pix","valor":-5}\'`.',
              command: [
                'curl -i -X POST http://localhost:3000/despesas -H "Content-Type: application/json" -d \'{"descricao":"Pix","valor":-5}\'',
                'curl -i -X POST localhost:3000/despesas -H "Content-Type: application/json" -d \'{"descricao":"Pix","valor":-5}\'',
                'curl -X POST -i http://localhost:3000/despesas -H "Content-Type: application/json" -d \'{"descricao":"Pix","valor":-5}\'',
                'curl -i -X POST -H "Content-Type: application/json" -d \'{"descricao":"Pix","valor":-5}\' http://localhost:3000/despesas',
              ],
              output: `HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 43

{"erro":"O valor deve ser maior que zero"}`,
              hint: 'É o mesmo comando anterior, só muda o que vem depois de `-d`.',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Alguém escreveu `despesas.find((d) => d.id === req.params.id)` e a rota `/despesas/2` sempre responde 404, mesmo com a despesa 2 existindo. Por quê?',
          options: [
            {
              text: '`req.params.id` é o texto `"2"`, e `2 === "2"` é falso',
              correct: true,
              feedback:
                'Isso. Tudo o que vem na URL chega como texto. O `===` compara tipo e valor, então o número 2 nunca é igual ao texto "2". Converta com `Number(req.params.id)`.',
            },
            {
              text: 'O certo seria `req.body.id`, porque o id vem no corpo',
              feedback:
                'Num GET o id está no caminho, não no corpo. `req.body` é para o que o cliente envia num POST ou PUT.',
            },
            {
              text: 'A rota deveria ser `/despesas/id`, sem os dois-pontos',
              feedback:
                'Sem os dois-pontos, a rota só combinaria com o texto literal `/despesas/id`. O `:id` é o que diz ao Express “aqui vem um valor variável”.',
            },
          ],
        },
        {
          type: 'fill',
          prompt:
            'Complete a rota que apaga uma despesa: ela lê o id do caminho, responde 404 se não achar e 204 (sem corpo) se apagar.',
          language: 'js',
          template: `app.[[delete]]('/despesas/[[:id]]', (req, res) => {
  const id = Number(req.[[params]].id);
  const posicao = despesas.findIndex((d) => d.id === id);
  if (posicao === -1) {
    return res.[[status]](404).json({ erro: 'Despesa não encontrada' });
  }
  despesas.splice(posicao, 1);
  res.status([[204]]).end();
});`,
          explanation:
            'O método da rota (`delete`) combina com o método HTTP. O `:id` marca o trecho variável, que aparece em `req.params.id`. O 204 significa “deu certo e não há nada para mostrar”, por isso a resposta termina com `end()` em vez de `json()`.',
        },
      ],
    },
    {
      id: 'middleware-e-erros',
      title: 'Middleware e tratamento de erros',
      blocks: [
        {
          type: 'analogy',
          title: 'A fila do posto de saúde',
          text: 'No posto, ninguém vai direto ao consultório. A recepção confere o cartão do SUS, a triagem mede a pressão e só então o médico atende. Cada etapa pode mandar você para a próxima ou resolver ali mesmo: “sem cartão, volte amanhã”.',
        },
        {
          type: 'text',
          text: 'Um **middleware** é uma etapa dessas. É uma função `(req, res, next)` que roda antes da rota. Ela pode olhar o pedido, mudar algo e chamar `next()` para passar adiante, ou responder e encerrar ali. O `express.json()` que você já usou é um middleware.',
        },
        {
          type: 'code',
          language: 'js',
          caption:
            'Um middleware de registro, a resposta para rota desconhecida e o tratador de erros',
          code: `function registrar(req, res, next) {
  console.log(new Date().toISOString(), req.method, req.url);
  next(); // sem isso, o pedido para aqui
}

app.use(registrar);
app.use(express.json());

// ...todas as rotas...

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

app.use((erro, req, res, next) => {
  console.error(erro);
  res.status(500).json({ erro: 'Erro interno. Tente de novo mais tarde.' });
});`,
        },
        {
          type: 'text',
          text: 'O último bloco é especial: um **middleware de erro** tem quatro parâmetros, com o erro primeiro. Quando uma rota lança uma exceção, o Express pula direto para ele. No Express 5, isso vale também para handlers `async` que falham. Assim a pessoa recebe uma mensagem genérica, e o detalhe técnico fica só no terminal do servidor.',
        },
        {
          type: 'order',
          prompt: 'Coloque as partes do `server.js` na ordem em que precisam aparecer.',
          items: [
            "import express from 'express'",
            'const app = express()',
            'app.use(express.json())',
            "app.get('/despesas', ...) e as outras rotas",
            'app.use((req, res) => ...) para rota não encontrada',
            'app.use((erro, req, res, next) => ...) para erros',
            'app.listen(3000, ...)',
          ],
          explanation:
            'O Express passa pelas etapas na ordem em que foram registradas. O leitor de JSON vem antes das rotas, senão elas recebem `req.body` vazio. O 404 vem depois de todas as rotas, para só pegar o que ninguém atendeu. O tratador de erros fica por último, e o `listen` liga tudo no final.',
        },
        {
          type: 'quiz',
          question:
            "O POST de despesas quebra com `TypeError: Cannot destructure property 'descricao' of 'req.body' as it is undefined`. O `curl` envia o cabeçalho de JSON corretamente. Qual a causa mais provável?",
          options: [
            {
              text: 'Falta `app.use(express.json())`, ou ele foi registrado depois das rotas',
              correct: true,
              feedback:
                'Isso. É o `express.json()` que lê o corpo e preenche `req.body`. Sem ele, ou vindo tarde demais na ordem, a rota recebe `undefined`.',
            },
            {
              text: 'O cliente deveria mandar os dados na URL, e não no corpo',
              feedback:
                'Corpo é o lugar certo para criar um recurso com POST. O problema é que o servidor não está lendo esse corpo.',
            },
            {
              text: 'A despesa ainda não existe, então `req.body` é vazio',
              feedback:
                '`req.body` é o que o cliente enviou, não algo que vem do banco. Ele existe mesmo para recursos novos, desde que o servidor saiba ler JSON.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns',
          text: 'Esquecer o `return` antes de responder um erro e ver `Cannot set headers after they are sent to the client`, que significa “você respondeu duas vezes”. Esquecer o `next()` num middleware e deixar o pedido pendurado. Comparar `req.params.id` com número sem converter. Mandar a mensagem técnica do erro para o cliente, o que expõe detalhes do servidor. Rodar o servidor e esquecer que precisa reiniciar (ou usar `--watch`) depois de mudar o código.',
        },
      ],
    },
    {
      id: 'mini-roteador',
      title: 'Monte o coração de uma rota',
      blocks: [
        {
          type: 'text',
          text: 'O Express não roda dentro do navegador, porque o navegador não abre portas. Mas o coração de uma rota é só uma função: recebe um objeto de pedido e devolve uma resposta. É isso que você vai escrever agora, em JavaScript puro, com a mesma lógica que usaria num handler.',
        },
        {
          type: 'playground',
          title: 'O tratador da API de despesas',
          task: "Complete a função `tratar(req)`. Ela recebe `{ method, path, body }` e devolve `{ status, body }`. Faça `GET /despesas/2` devolver a despesa (ou 404 com `{ erro: 'Despesa não encontrada' }` se não existir) e `POST /despesas` validar `descricao` e `valor`, respondendo 400 com `erro` quando algo estiver errado e 201 com a despesa criada quando estiver certo. Veja os resultados no console.",
          height: 200,
          html: '<p>Abra o console para ver as respostas da função <code>tratar</code>.</p>',
          css: 'body { font-family: system-ui, sans-serif; padding: 16px; color: #334155; }',
          js: `// O "banco" em memória, como na API de verdade
const despesas = [
  { id: 1, descricao: 'Mercado', valor: 230 },
  { id: 2, descricao: 'Ônibus', valor: 4.4 },
];

// req: { method, path, body }  ->  devolve { status, body }
function tratar(req) {
  if (req.method === 'GET' && req.path === '/despesas') {
    return { status: 200, body: despesas };
  }

  // 1. GET /despesas/:id
  //    dica: req.path.startsWith('/despesas/') e Number(req.path.split('/')[2])
  //    achou: 200 com a despesa | não achou: 404 { erro: 'Despesa não encontrada' }

  // 2. POST /despesas
  //    descricao precisa ser texto não vazio; valor, número maior que zero
  //    inválido: 400 { erro: '...' } | válido: 201 com a nova despesa (id novo)

  return { status: 404, body: { erro: 'Rota não encontrada' } };
}

console.log(tratar({ method: 'GET', path: '/despesas' }));
console.log(tratar({ method: 'GET', path: '/despesas/2' }));
console.log(tratar({ method: 'POST', path: '/despesas', body: { descricao: 'Pix', valor: -5 } }));`,
          checks: [
            {
              label: '`GET /despesas/2` devolve 200 com a despesa do Ônibus',
              test: `if (typeof tratar !== 'function') return false;
try {
  const r = tratar({ method: 'GET', path: '/despesas/2' });
  return r?.status === 200 && r?.body?.descricao === 'Ônibus';
} catch (e) {
  return false;
}`,
            },
            {
              label: '`GET /despesas/99` devolve 404 avisando que a despesa não foi encontrada',
              test: `if (typeof tratar !== 'function') return false;
try {
  const r = tratar({ method: 'GET', path: '/despesas/99' });
  return r?.status === 404 && /despesa/i.test(String(r?.body?.erro ?? ''));
} catch (e) {
  return false;
}`,
            },
            {
              label: 'POST com valor negativo ou sem descrição devolve 400 com `erro`',
              test: `if (typeof tratar !== 'function') return false;
try {
  const a = tratar({ method: 'POST', path: '/despesas', body: { descricao: 'Pix da luz', valor: -5 } });
  const b = tratar({ method: 'POST', path: '/despesas', body: { valor: 50 } });
  const c = tratar({ method: 'POST', path: '/despesas', body: { descricao: '   ', valor: 10 } });
  return [a, b, c].every((r) => r?.status === 400 && typeof r?.body?.erro === 'string' && r.body.erro.length > 0);
} catch (e) {
  return false;
}`,
            },
            {
              label: 'POST válido devolve 201 com a despesa nova, que passa a aparecer na lista',
              test: `if (typeof tratar !== 'function') return false;
try {
  const r = tratar({ method: 'POST', path: '/despesas', body: { descricao: 'Farmácia', valor: 37.9 } });
  if (r?.status !== 201 || r?.body?.descricao !== 'Farmácia' || typeof r?.body?.id !== 'number') return false;
  if (r.body.id === 1 || r.body.id === 2) return false;
  const lista = tratar({ method: 'GET', path: '/despesas' });
  return Array.isArray(lista?.body) && lista.body.some((d) => d.descricao === 'Farmácia' && d.id === r.body.id);
} catch (e) {
  return false;
}`,
            },
          ],
          solution: {
            js: `const despesas = [
  { id: 1, descricao: 'Mercado', valor: 230 },
  { id: 2, descricao: 'Ônibus', valor: 4.4 },
];

function tratar(req) {
  if (req.method === 'GET' && req.path === '/despesas') {
    return { status: 200, body: despesas };
  }

  if (req.method === 'GET' && req.path.startsWith('/despesas/')) {
    const id = Number(req.path.split('/')[2]);
    const despesa = despesas.find((d) => d.id === id);
    if (!despesa) {
      return { status: 404, body: { erro: 'Despesa não encontrada' } };
    }
    return { status: 200, body: despesa };
  }

  if (req.method === 'POST' && req.path === '/despesas') {
    const { descricao, valor } = req.body || {};
    if (typeof descricao !== 'string' || descricao.trim() === '') {
      return { status: 400, body: { erro: 'Informe a descrição' } };
    }
    if (typeof valor !== 'number' || valor <= 0) {
      return { status: 400, body: { erro: 'O valor deve ser maior que zero' } };
    }
    const maiorId = Math.max(0, ...despesas.map((d) => d.id));
    const nova = { id: maiorId + 1, descricao: descricao.trim(), valor };
    despesas.push(nova);
    return { status: 201, body: nova };
  }

  return { status: 404, body: { erro: 'Rota não encontrada' } };
}

console.log(tratar({ method: 'GET', path: '/despesas' }));
console.log(tratar({ method: 'GET', path: '/despesas/2' }));
console.log(tratar({ method: 'POST', path: '/despesas', body: { descricao: 'Pix', valor: -5 } }));`,
          },
        },
        {
          type: 'reveal',
          question:
            'Sua função já decide a resposta de cada pedido. O que o Express faz que ela ainda não faz?',
          answer:
            'Ele abre a porta e escuta a rede, transforma o texto HTTP que chega no objeto `req`, lê o corpo JSON, compara padrões como `/despesas/:id` sem você precisar cortar o caminho na mão, roda os middlewares em ordem e transforma o seu `{ status, body }` em uma resposta HTTP de verdade. A regra de negócio, que é a parte que você escreveu, continua sendo sua.',
        },
        {
          type: 'quiz',
          question:
            'Na sua API, quem precisa validar que o valor é maior que zero, se o formulário React já tem `min="0.01"` no campo?',
          options: [
            {
              text: 'O servidor, sempre. A validação do formulário é só conforto para a pessoa',
              correct: true,
              feedback:
                'Isso. Qualquer pessoa pode chamar a API pelo `curl`, como você fez, e pular o formulário. O front valida para ajudar quem digita; o servidor valida para proteger os dados.',
            },
            {
              text: 'Só o formulário, porque é por ele que as pessoas cadastram',
              feedback:
                'Você mesmo cadastrou uma despesa sem formulário nenhum, com `curl`. Uma API aceita pedidos de qualquer cliente.',
            },
            {
              text: 'Ninguém: o banco de dados recusa números negativos sozinho',
              feedback:
                'O banco só recusa o que você mandar ele recusar, e hoje a lista está em memória. Mesmo com banco, a API deve responder 400 com uma mensagem clara.',
            },
          ],
        },
      ],
    },
  ],
  recap: [
    'Node.js roda JavaScript fora do navegador: não tem `document`, mas tem arquivos, rede e `process.env`.',
    'Um projeto Node começa com `npm init -y`; com `"type": "module"` você usa `import` e `export` como no Vite.',
    'No Express, uma rota junta método e caminho; o handler recebe `req` (params, query, body) e responde uma vez com `res.status(...).json(...)`.',
    'Middlewares rodam em ordem e chamam `next()`; o de quatro parâmetros trata erros e devolve uma mensagem genérica com status 500.',
    'O servidor sempre valida a entrada e responde com o status certo, porque qualquer cliente pode chamar a API.',
  ],
  cards: [
    {
      id: 'node-runtime',
      front: 'O que é o Node.js?',
      back: 'Um ambiente de execução que roda JavaScript fora do navegador, com acesso a arquivos, rede e sistema, mas sem `document`.',
    },
    {
      id: 'type-module',
      front: 'O que permite usar `import` e `export` num projeto Node?',
      back: 'A linha `"type": "module"` no `package.json`.',
    },
    {
      id: 'req-params-query-body',
      front: 'Onde ficam o id do caminho, os filtros depois do `?` e o corpo do POST?',
      back: 'Em `req.params`, `req.query` e `req.body`. Os dois primeiros sempre chegam como texto.',
    },
    {
      id: 'express-json',
      front: 'Por que `req.body` chega `undefined` num POST?',
      back: 'Falta `app.use(express.json())` antes das rotas. É esse middleware que lê o corpo JSON.',
    },
    {
      id: 'middleware-next',
      front: 'O que um middleware faz com `next()`?',
      back: 'Passa o pedido para a próxima etapa. Sem `next()` e sem resposta, o pedido fica pendurado.',
    },
    {
      id: 'middleware-erro',
      front: 'Como o Express reconhece um middleware de erro?',
      back: 'Pela assinatura com quatro parâmetros: `(erro, req, res, next)`. Ele fica depois de todas as rotas.',
    },
    {
      id: 'headers-sent',
      front: 'O que significa `Cannot set headers after they are sent to the client`?',
      back: 'Que o handler respondeu duas vezes. Normalmente falta um `return` antes de responder um erro.',
    },
  ],
  mission: {
    title: 'Sua API de despesas rodando de verdade',
    text: 'Construa no seu computador a API que o seu app React vai consumir na próxima aula e explique, com o terminal aberto, o caminho de uma requisição.',
    steps: [
      'Crie o projeto com `npm init -y`, adicione `"type": "module"` e um script `dev` com `node --watch`',
      'Implemente `GET /despesas`, `GET /despesas/:id` e `POST /despesas` com validação e status 200, 201, 400 e 404',
      'Adicione um middleware que registra método e caminho de cada pedido e um middleware de erro com resposta 500 genérica',
      'Teste cada rota com `curl -i`, incluindo um id inexistente e um corpo inválido, e guarde as saídas',
      'Explique em voz alta, ou por escrito no README, o caminho de um POST desde o `curl` até a resposta',
    ],
  },
  sources: [
    {
      title: 'Node.js: Introdução ao Node.js',
      url: 'https://nodejs.org/en/learn/getting-started/introduction-to-nodejs',
    },
    { title: 'Express: Roteamento', url: 'https://expressjs.com/en/guide/routing.html' },
    {
      title: 'Express: Usando middlewares',
      url: 'https://expressjs.com/en/guide/using-middleware.html',
    },
    {
      title: 'Express: Tratamento de erros',
      url: 'https://expressjs.com/en/guide/error-handling.html',
    },
  ],
};
