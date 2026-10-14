import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Quase todo aplicativo que você usa mostra dados que estão em outro computador: o cardápio do restaurante, o saldo do banco, o endereço de um CEP. Buscar esses dados leva tempo, às vezes alguns segundos, e às vezes dá errado. Nesta aula você aprende a pedir dados sem travar a página e a mostrar para a pessoa, com honestidade, o que está acontecendo.',
  sections: [
    {
      id: 'por-que-esperar',
      title: 'Esperar sem ficar parado',
      blocks: [
        {
          type: 'analogy',
          title: 'Pedir pizza não é ficar na porta',
          text: 'Você pede uma pizza pelo aplicativo. Ninguém fica em pé na porta durante 40 minutos: você arruma a mesa, responde mensagens, vê um episódio. Quando o entregador toca a campainha, aí sim você vai buscar. Programar de forma **assíncrona** é isso: pedir, seguir com a vida e reagir quando a resposta chegar.',
        },
        {
          type: 'text',
          text: 'O JavaScript da página faz **uma coisa de cada vez**. Se ele ficasse parado esperando o servidor responder, nada mais funcionaria: nem clique, nem rolagem, nem animação. A página congelaria.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Síncrono',
              text: 'Cada linha termina antes da próxima começar. Somar dois números ou trocar um `textContent` é síncrono: acontece na hora.',
            },
            {
              term: 'Assíncrono',
              text: 'A operação começa agora e termina depois. O código segue em frente e uma função é chamada quando o resultado fica pronto. Pedidos pela rede, temporizadores e leitura de arquivos funcionam assim.',
            },
          ],
        },
        {
          type: 'classify',
          prompt:
            'Quais destas operações demoram um tempo imprevisível e por isso são assíncronas?',
          buckets: ['Síncrona: acontece na hora', 'Assíncrona: termina depois'],
          items: [
            { text: 'Somar o total do carrinho', bucket: 0 },
            { text: 'Buscar o endereço de um CEP numa API', bucket: 1 },
            { text: 'Trocar o texto de um botão', bucket: 0 },
            { text: 'Esperar 3 segundos para esconder um aviso', bucket: 1 },
            { text: 'Filtrar um array de produtos', bucket: 0 },
            { text: 'Carregar a lista de pedidos do servidor', bucket: 1 },
          ],
          explanation:
            'O que depende só da memória do computador é instantâneo. O que depende da rede, de outro computador ou do relógio tem duração imprevisível: é aí que entra o código assíncrono.',
        },
      ],
    },
    {
      id: 'set-timeout',
      title: 'O primeiro assíncrono: setTimeout',
      blocks: [
        {
          type: 'text',
          text: '`setTimeout(funcao, milissegundos)` pede ao navegador: “daqui a tanto tempo, chame esta função”. O navegador cuida do relógio, e o seu código continua rodando. É o jeito mais simples de ver o assíncrono acontecer.',
        },
        {
          type: 'analogy',
          title: 'A senha do banco',
          text: 'No banco, você pega a senha e senta. O caixa atende quem está na frente e só chama você quando termina o atendimento atual, mesmo que seu número já tenha aparecido no painel. A função do `setTimeout` é a sua senha: ela espera o código que está rodando agora terminar.',
        },
        {
          type: 'trace',
          caption: 'Siga a ordem real de execução. Repare que o tempo zero não fura a fila.',
          code: "console.log('Pedido feito');\n\nsetTimeout(() => {\n  console.log('Pizza chegou');\n}, 0);\n\nconsole.log('Arrumando a mesa');",
          steps: [
            {
              line: 1,
              note: 'Código síncrono: roda na hora.',
              output: 'Pedido feito',
            },
            {
              line: 3,
              note: 'Agenda a função para depois. Mesmo com 0 milissegundos, ela entra na fila e espera a sua vez.',
              memory: [['fila', '[função da pizza]']],
            },
            {
              line: 7,
              note: 'O código continua, sem esperar o temporizador.',
              output: 'Arrumando a mesa',
            },
            {
              line: 7,
              note: 'O script terminou. Agora o JavaScript está livre para atender a fila.',
            },
            {
              line: 4,
              note: 'A função agendada finalmente roda.',
              memory: [['fila', '[]']],
              output: 'Pizza chegou',
            },
          ],
        },
        {
          type: 'playground',
          title: 'Teste a ordem você mesmo',
          task: 'Antes de olhar o console, escreva num papel a ordem em que as quatro mensagens vão aparecer. Depois mude os tempos e veja o que acontece.',
          js: `console.log('1. Peguei a senha');

setTimeout(() => {
  console.log('2. Fui chamado no caixa');
}, 1000);

setTimeout(() => {
  console.log('3. Recebi um SMS');
}, 0);

console.log('4. Sentei para esperar');
`,
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Quer ver a fila por dentro?',
          text: 'O guia Event loop do JavaScript mostra como o navegador organiza tarefas e microtarefas. Para esta aula, a regra basta: o código atual termina primeiro, depois a fila é atendida.',
        },
        {
          type: 'quiz',
          question: 'Em que ordem as mensagens aparecem no console?',
          code: "setTimeout(() => console.log('A'), 500);\nconsole.log('B');\nsetTimeout(() => console.log('C'), 0);\nconsole.log('D');",
          language: 'js',
          options: [
            {
              text: 'B, D, C, A',
              correct: true,
              feedback:
                'Isso. Primeiro roda todo o código síncrono (B e D). Depois a fila: C, que estava pronto em 0 ms, e por fim A, aos 500 ms.',
            },
            {
              text: 'A, B, C, D',
              feedback:
                'Essa seria a ordem se o JavaScript esperasse cada `setTimeout`. Ele não espera: agenda e segue em frente.',
            },
            {
              text: 'B, C, D, A',
              feedback:
                'O `setTimeout` de 0 não interrompe o código atual. C só roda depois que a última linha síncrona (D) terminou.',
            },
            {
              text: 'B, D, A, C',
              feedback:
                'Os dois são assíncronos, mas C fica pronto em 0 ms e A só em 500 ms. Na fila, quem fica pronto primeiro é atendido primeiro.',
            },
          ],
        },
      ],
    },
    {
      id: 'promises',
      title: 'Promises e async/await',
      blocks: [
        {
          type: 'analogy',
          title: 'O acompanhamento do pedido',
          text: 'Ao pedir no iFood, você recebe na hora um acompanhamento do pedido, mesmo sem a comida ainda. Ele começa em “preparando” e termina de um de dois jeitos: “entregue” ou “cancelado”. Uma **Promise** é esse acompanhamento: um objeto que representa um valor que ainda vai chegar.',
        },
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              label: 'pending',
              title: 'Pendente',
              text: 'A operação ainda está em andamento. Ainda não há valor nem erro. É quando a tela mostra “carregando”.',
            },
            {
              label: 'fulfilled',
              title: 'Cumprida',
              text: 'Deu certo e o valor chegou: a lista de produtos, o endereço do CEP. Uma Promise cumprida não muda mais.',
            },
            {
              label: 'rejected',
              title: 'Rejeitada',
              text: 'Deu errado: sem internet, servidor fora do ar. Em vez de valor, há um erro explicando o motivo.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Existem duas formas de usar uma Promise. A mais antiga encadeia funções com `.then` (então) e `.catch` (capturar). A mais nova, `async`/`await`, deixa o código com cara de passo a passo, e é a que você vai usar no dia a dia.',
        },
        {
          type: 'codeTabs',
          caption: 'A mesma busca escrita das duas formas.',
          tabs: [
            {
              label: 'async/await',
              language: 'js',
              code: `async function mostrarCardapio() {
  try {
    const pratos = await buscarCardapio();
    console.log(pratos);
  } catch (erro) {
    console.log('Falhou:', erro.message);
  }
}`,
            },
            {
              label: '.then e .catch',
              language: 'js',
              code: `function mostrarCardapio() {
  buscarCardapio()
    .then((pratos) => {
      console.log(pratos);
    })
    .catch((erro) => {
      console.log('Falhou:', erro.message);
    });
}`,
            },
          ],
        },
        {
          type: 'anatomy',
          caption: 'As peças de uma função assíncrona.',
          language: 'js',
          parts: [
            {
              text: 'async',
              label: 'async',
              note: 'Marca a função como assíncrona. Só dentro dela você pode usar `await`. Ela sempre devolve uma Promise.',
            },
            { text: ' function carregar() {\n  ' },
            {
              text: 'try',
              label: 'try',
              note: '“Tente”: o bloco onde fica o caminho feliz. Se qualquer linha dentro dele falhar, o JavaScript pula direto para o `catch`.',
            },
            { text: ' {\n    const produtos = ' },
            {
              text: 'await',
              label: 'await',
              note: '“Aguarde”: pausa **só esta função** até a Promise terminar e entrega o valor. O resto da página continua funcionando enquanto isso.',
            },
            { text: ' buscarProdutos();\n    mostrar(produtos);\n  } ' },
            {
              text: 'catch (erro)',
              label: 'catch',
              note: '“Capture”: roda quando a Promise é rejeitada ou alguma linha do `try` quebra. `erro.message` traz a explicação.',
            },
            { text: ' {\n    mostrarErro(erro.message);\n  } ' },
            {
              text: 'finally',
              label: 'finally',
              note: '“Por fim”: roda nos dois casos, sucesso ou erro. Ótimo para esconder o “carregando” ou reativar um botão.',
            },
            { text: ' {\n    esconderCarregando();\n  }\n}' },
          ],
        },
        {
          type: 'quiz',
          question: 'O que aparece no console?',
          code: 'async function buscar() {\n  const pratos = buscarCardapio(); // faltou algo aqui\n  console.log(pratos);\n}\n\nbuscar();',
          language: 'js',
          options: [
            {
              text: '`Promise {<pending>}`',
              correct: true,
              feedback:
                'Isso. Sem `await`, você guarda o acompanhamento do pedido, não a comida. É um dos erros mais comuns: o valor só aparece com `await buscarCardapio()`.',
            },
            {
              text: 'A lista de pratos',
              feedback:
                'Para receber a lista, a função precisa esperar com `await`. Sem ele, `pratos` é a Promise ainda pendente.',
            },
            {
              text: 'Um erro dizendo que faltou `await`',
              feedback:
                'O JavaScript não reclama: guardar uma Promise numa variável é válido. Por isso esse erro passa despercebido e só aparece na tela.',
            },
            {
              text: '`undefined`',
              feedback:
                'A função `buscarCardapio` devolve algo, sim: uma Promise. O que falta é esperar que ela se cumpra.',
            },
          ],
        },
        {
          type: 'fill',
          prompt: 'Complete a função para esperar o CEP, mostrar a cidade e avisar se der errado.',
          language: 'js',
          template:
            "[[async]] function mostrarCidade() {\n  [[try]] {\n    const endereco = [[await]] buscarCep();\n    console.log(endereco.cidade);\n  } [[catch]] (erro) {\n    console.log('Não foi possível buscar o CEP');\n  }\n}",
          explanation:
            '`async` libera o uso de `await`; `await` espera a Promise; `try` e `catch` separam o caminho feliz do tratamento de erro.',
        },
      ],
    },
    {
      id: 'fetch',
      title: 'Buscar dados de verdade com fetch',
      blocks: [
        {
          type: 'text',
          text: 'Uma **API** é um endereço na web que responde com dados em vez de páginas, normalmente em **JSON**, o formato que você viu na aula de objetos. Para pedir esses dados, o navegador oferece a função `fetch` (buscar), que devolve uma Promise.',
        },
        {
          type: 'code',
          language: 'js',
          caption: 'O formato que você vai repetir em todo projeto.',
          code: `async function buscarEndereco(cep) {
  const resposta = await fetch('https://viacep.com.br/ws/' + cep + '/json/');

  if (!resposta.ok) {
    throw new Error('Erro ' + resposta.status);
  }

  const endereco = await resposta.json();
  return endereco;
}`,
        },
        {
          type: 'terms',
          items: [
            {
              term: '`await fetch(url)`',
              text: 'Faz a requisição e espera a resposta chegar. O resultado é um objeto com o status e o corpo, ainda não lido.',
            },
            {
              term: '`resposta.ok`',
              text: '`true` quando o status é da família 2xx. Com 404 ou 500, vale `false`.',
            },
            {
              term: '`throw new Error(...)`',
              text: '“Lance um erro”: interrompe a função e manda o erro para o `catch` de quem a chamou.',
            },
            {
              term: '`await resposta.json()`',
              text: 'Lê o corpo e transforma o texto JSON em objetos e arrays. Também é assíncrono, por isso leva `await`.',
            },
          ],
        },
        {
          type: 'flow',
          caption: 'Uma busca bem-sucedida e uma que falha',
          actors: ['Seu código', 'Navegador', 'Servidor'],
          steps: [
            {
              from: 0,
              to: 1,
              label: "fetch('/produtos')",
              text: 'Seu código pede os dados e recebe na hora uma Promise pendente. A página continua respondendo a cliques.',
            },
            {
              from: 1,
              to: 2,
              label: 'GET /produtos',
              text: 'O navegador monta a requisição HTTP e envia ao servidor, exatamente como você viu na aula sobre a web.',
            },
            {
              from: 2,
              to: 1,
              label: '200 OK + JSON',
              text: 'O servidor responde com status 200 e o corpo em JSON.',
              tone: 'ok',
            },
            {
              from: 1,
              to: 0,
              label: 'resposta.ok === true',
              text: 'A Promise se cumpre. Seu código confere `resposta.ok`, lê o corpo com `await resposta.json()` e desenha a lista.',
              tone: 'ok',
            },
            {
              from: 0,
              to: 2,
              label: 'GET /produtos/999',
              text: 'Agora, um pedido por um produto que não existe.',
            },
            {
              from: 2,
              to: 0,
              label: '404 Not Found',
              text: 'O servidor respondeu, só que com um erro. O `fetch` **cumpre** a Promise mesmo assim: houve resposta. Cabe ao seu código ver que `resposta.ok` é `false` e lançar o erro.',
              tone: 'error',
            },
            {
              from: 0,
              to: 0,
              label: 'catch mostra o erro',
              text: 'O `throw` leva a execução para o `catch`, que mostra uma mensagem amigável na tela.',
              tone: 'error',
            },
          ],
        },
        {
          type: 'quiz',
          question: 'A API respondeu `404 Not Found`. O que acontece com a Promise do `fetch`?',
          options: [
            {
              text: 'Ela é cumprida; você precisa conferir `resposta.ok`',
              correct: true,
              feedback:
                'Isso. Para o `fetch`, falha é não conseguir resposta nenhuma. Um 404 é uma resposta válida que traz uma má notícia. Sem conferir `resposta.ok`, seu código tentaria desenhar um erro como se fosse produto.',
            },
            {
              text: 'Ela é rejeitada e o código pula para o `catch`',
              feedback:
                'Esse é o engano mais comum com `fetch`. Ele só rejeita quando não há resposta: sem internet, endereço inexistente, bloqueio de CORS. Status 4xx e 5xx chegam como resposta normal.',
            },
            {
              text: 'Ela fica pendente para sempre',
              feedback:
                'A resposta chegou, então a Promise termina. Ela não fica esperando um status melhor.',
            },
          ],
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem o que uma função de busca faz.',
          items: [
            'Mostrar a mensagem de carregando',
            'Esperar a resposta com `await fetch(url)`',
            'Conferir `resposta.ok` e lançar um erro se for falso',
            'Ler o corpo com `await resposta.json()`',
            'Desenhar os dados na tela',
          ],
          explanation:
            'Avisar, pedir, conferir, ler, mostrar. Pular a conferência é o que faz páginas exibirem “undefined” quando a API falha.',
        },
      ],
    },
    {
      id: 'quatro-estados',
      title: 'Os quatro estados de uma tela com dados',
      blocks: [
        {
          type: 'text',
          text: 'Uma tela que depende de dados nunca tem só um jeito de aparecer. Quem projeta pensando apenas no caminho feliz entrega uma página que fica em branco quando a rede está lenta e quebra quando a API cai.',
        },
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              label: '1',
              title: 'Carregando',
              text: 'O pedido saiu e a resposta não chegou. Mostre que algo está acontecendo, para a pessoa não achar que travou.',
              points: [
                'Texto “Carregando...” ou um esqueleto da lista',
                'Use `role="status"` para leitores de tela',
              ],
            },
            {
              label: '2',
              title: 'Sucesso',
              text: 'Os dados chegaram e há itens. Esconda o carregando e desenhe a lista.',
            },
            {
              label: '3',
              title: 'Vazio',
              text: 'Deu certo, mas a lista veio vazia. Isso não é erro: explique e, se puder, sugira o que fazer.',
              points: ['“Nenhum pedido ainda. Que tal explorar o cardápio?”'],
            },
            {
              label: '4',
              title: 'Erro',
              text: 'Algo falhou. Diga em linguagem simples o que aconteceu e ofereça um caminho, como tentar de novo.',
              points: ['Nada de mostrar “Error 500” cru para a pessoa'],
            },
          ],
        },
        {
          type: 'playground',
          title: 'Cardápio com os quatro estados',
          task: 'A função `buscarProdutos` é uma API de mentira: espera 800 ms e responde. Complete `carregar` para mostrar “Carregando...”, depois os produtos, uma mensagem com “Nenhum produto” se a lista vier vazia, e “Não foi possível carregar. Tente de novo.” se falhar. Troque `falhar` e `vazio` para `true` para ver cada estado na prévia.',
          html: `<h2>Cardápio do dia</h2>
<p id="estado" role="status"></p>
<ul id="produtos"></ul>`,
          css: `body { font-family: system-ui, sans-serif; padding: 16px; }
#estado { color: #555; font-style: italic; }
li { padding: 6px 0; border-bottom: 1px solid #eee; }`,
          js: `// API de mentira: funciona como um fetch que já leu o JSON.
const falhar = false; // troque para true para simular uma falha
const vazio = false;  // troque para true para simular uma lista vazia

function buscarProdutos() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (falhar) {
        reject(new Error('Servidor indisponível'));
      } else if (vazio) {
        resolve([]);
      } else {
        resolve([
          { nome: 'Coxinha', preco: 6.5 },
          { nome: 'Pão de queijo', preco: 4 },
          { nome: 'Pastel', preco: 8 },
        ]);
      }
    }, 800);
  });
}

const textoEstado = document.querySelector('#estado');
const lista = document.querySelector('#produtos');

function mostrarProdutos(produtos) {
  for (const produto of produtos) {
    const item = document.createElement('li');
    item.textContent = produto.nome + ': R$ ' + produto.preco.toFixed(2);
    lista.append(item);
  }
}

async function carregar() {
  // 1. mostre 'Carregando...' em textoEstado
  // 2. dentro de um try, espere (await) buscarProdutos()
  // 3. se a lista vier vazia, mostre 'Nenhum produto por enquanto.'
  //    se não, limpe textoEstado e chame mostrarProdutos
  // 4. no catch, mostre 'Não foi possível carregar. Tente de novo.'
}

carregar();
`,
          checks: [
            {
              label: 'Mostra “Carregando” enquanto espera a resposta',
              test: `const estado = document.querySelector('#estado');
return !!estado && /carregando/i.test(estado.textContent);`,
            },
            {
              label: 'Quando a resposta chega, mostra os 3 produtos',
              test: `await new Promise((r) => setTimeout(r, 1200));
const estado = document.querySelector('#estado');
return document.querySelectorAll('#produtos li').length === 3 && !!estado && !/carregando/i.test(estado.textContent);`,
            },
            {
              label: 'Usa `try` e `catch` para tratar a falha',
              test: `const codigo = (document.scripts[1] && document.scripts[1].textContent) || '';
return /try\\s*\\{/.test(codigo) && /catch\\s*[({]/.test(codigo);`,
            },
            {
              label: 'Mostra a mensagem certa quando a API falha e quando a lista vem vazia',
              test: `await new Promise((r) => setTimeout(r, 1500));
try {
  if (typeof carregar !== 'function') return false;
  const estado = document.querySelector('#estado');
  if (!estado) return false;
  window.buscarProdutos = () => Promise.reject(new Error('Servidor indisponível'));
  await carregar();
  await new Promise((r) => setTimeout(r, 50));
  const mostrouErro = /não foi possível|erro/i.test(estado.textContent);
  window.buscarProdutos = () => Promise.resolve([]);
  await carregar();
  await new Promise((r) => setTimeout(r, 50));
  const mostrouVazio = /nenhum/i.test(estado.textContent);
  return mostrouErro && mostrouVazio;
} catch (e) {
  return false;
}`,
            },
          ],
          solution: {
            js: `// API de mentira: funciona como um fetch que já leu o JSON.
const falhar = false; // troque para true para simular uma falha
const vazio = false;  // troque para true para simular uma lista vazia

function buscarProdutos() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (falhar) {
        reject(new Error('Servidor indisponível'));
      } else if (vazio) {
        resolve([]);
      } else {
        resolve([
          { nome: 'Coxinha', preco: 6.5 },
          { nome: 'Pão de queijo', preco: 4 },
          { nome: 'Pastel', preco: 8 },
        ]);
      }
    }, 800);
  });
}

const textoEstado = document.querySelector('#estado');
const lista = document.querySelector('#produtos');

function mostrarProdutos(produtos) {
  for (const produto of produtos) {
    const item = document.createElement('li');
    item.textContent = produto.nome + ': R$ ' + produto.preco.toFixed(2);
    lista.append(item);
  }
}

async function carregar() {
  textoEstado.textContent = 'Carregando...';
  try {
    const produtos = await buscarProdutos();
    if (produtos.length === 0) {
      textoEstado.textContent = 'Nenhum produto por enquanto.';
    } else {
      textoEstado.textContent = '';
      mostrarProdutos(produtos);
    }
  } catch (erro) {
    textoEstado.textContent = 'Não foi possível carregar. Tente de novo.';
  }
}

carregar();
`,
          },
          height: 240,
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Com uma API de verdade',
          text: 'Para usar uma API real, troque `await buscarProdutos()` por `await fetch(url)`, confira `resposta.ok` e leia com `await resposta.json()`. O resto do código, com os quatro estados, continua igual.',
        },
        {
          type: 'classify',
          prompt: 'Qual estado da tela cada situação representa?',
          buckets: ['Carregando', 'Sucesso', 'Vazio', 'Erro'],
          items: [
            { text: 'O pedido saiu há meio segundo e nada voltou', bucket: 0 },
            { text: 'A API devolveu 12 pedidos', bucket: 1 },
            { text: 'A busca por “sushi vegano” devolveu `[]`', bucket: 2 },
            { text: 'A pessoa está sem internet no metrô', bucket: 3 },
            { text: 'A API respondeu `500 Internal Server Error`', bucket: 3 },
            { text: 'Uma pessoa nova abre a tela de favoritos', bucket: 2 },
          ],
          explanation:
            'Repare que lista vazia e erro são diferentes: no vazio, tudo funcionou e simplesmente não há itens. Misturar os dois faz a pessoa achar que o aplicativo quebrou quando não quebrou, ou o contrário.',
        },
      ],
    },
    {
      id: 'investigar',
      title: 'Investigar quando a busca falha',
      blocks: [
        {
          type: 'text',
          text: 'Com uma API real, o painel **Network** (Rede) das ferramentas de desenvolvimento vira seu melhor amigo. Cada `fetch` aparece como uma linha, com URL, status e o JSON que voltou na aba **Response**.',
        },
        {
          type: 'list',
          items: [
            '**Status 404**: confira a URL que você montou. Um espaço ou uma barra a mais muda tudo.',
            '**Status 500**: o pedido pode estar certo; o problema está no servidor. Mostre o estado de erro.',
            '**Linha vermelha sem status, com aviso de CORS no console**: o servidor não autorizou seu site a ler a resposta. O guia CORS sem mistério explica por que isso se resolve no servidor, não no seu código.',
            '**Tudo 200, mas a tela mostra `undefined`**: abra a aba Response e confira os nomes dos campos. Talvez seja `price`, e não `preco`.',
          ],
        },
        {
          type: 'quiz',
          question:
            'A lista aparece com “undefined: R$ NaN” em cada item. O Network mostra status 200. O que investigar primeiro?',
          options: [
            {
              text: 'Os nomes dos campos no JSON da resposta',
              correct: true,
              feedback:
                'Isso. A busca deu certo (200), mas o código lê campos que não existem. Abra a aba Response e compare com o que o código acessa.',
            },
            {
              text: 'Se o servidor está fora do ar',
              feedback:
                'Um servidor fora do ar não responderia 200. O pedido funcionou; o problema está em como os dados são lidos.',
            },
            {
              text: 'Se faltou o `try`/`catch`',
              feedback:
                'O `catch` trata falhas, mas aqui nada falhou de verdade: o código só leu campos errados. `undefined` é sintoma de propriedade inexistente.',
            },
          ],
        },
      ],
    },
  ],
  recap: [
    'Operações que dependem da rede ou do relógio são **assíncronas**: começam agora, terminam depois, e a página não trava enquanto isso.',
    'Uma **Promise** começa pendente e termina cumprida (com valor) ou rejeitada (com erro); `await` espera esse fim dentro de uma função `async`.',
    '`try`/`catch` separa o caminho feliz do tratamento de erro; `finally` roda nos dois casos.',
    'O `fetch` só rejeita sem resposta: confira `resposta.ok` antes de ler com `await resposta.json()`.',
    'Toda tela com dados precisa de quatro estados: carregando, sucesso, vazio e erro.',
  ],
  cards: [
    {
      id: 'assincrono',
      front: 'O que significa uma operação ser assíncrona?',
      back: 'Ela começa agora e termina depois; o código segue rodando e reage quando o resultado chega.',
    },
    {
      id: 'set-timeout-zero',
      front: 'Com `setTimeout(fn, 0)`, `fn` roda imediatamente?',
      back: 'Não. Ela entra na fila e só roda depois que todo o código síncrono atual terminar.',
    },
    {
      id: 'estados-promise',
      front: 'Quais são os três estados de uma Promise?',
      back: 'Pendente (pending), cumprida (fulfilled) e rejeitada (rejected).',
    },
    {
      id: 'await-esquecido',
      front: 'O que você recebe se esquecer o `await` antes de uma função que devolve Promise?',
      back: 'A própria Promise, algo como `Promise {<pending>}`, e não o valor.',
    },
    {
      id: 'fetch-404',
      front: 'O `fetch` rejeita a Promise quando a resposta é 404?',
      back: 'Não. Ele só rejeita sem resposta. Confira `resposta.ok` e lance um erro se for `false`.',
    },
    {
      id: 'response-json',
      front: 'Por que `resposta.json()` também precisa de `await`?',
      back: 'Porque ler e converter o corpo da resposta é assíncrono: ele devolve uma Promise.',
    },
    {
      id: 'quatro-estados',
      front: 'Quais são os quatro estados de uma tela que depende de dados?',
      back: 'Carregando, sucesso, vazio e erro.',
    },
  ],
  mission: {
    title: 'Busque dados de uma API pública',
    text: 'Continue o projeto Aplicação com API da trilha. Desta vez os dados vêm de um servidor de verdade, e a sua tela precisa lidar com tudo o que pode acontecer no caminho.',
    steps: [
      'Escolha uma API pública e gratuita, como a ViaCEP (`https://viacep.com.br/ws/01001000/json/`) ou a BrasilAPI (`https://brasilapi.com.br/api/cep/v1/01001000`)',
      'Escreva uma função `async` com `fetch`, conferência de `resposta.ok` e `try`/`catch`',
      'Mostre os quatro estados na tela: carregando, sucesso, vazio e erro, com um botão de tentar de novo',
      'Force um erro digitando um CEP inválido e confira como a tela reage',
      'Abra o painel Network, encontre a requisição e anote URL, status e um campo do JSON',
      'Simule internet lenta no Network (opção Slow 4G) e veja se o carregando aparece',
    ],
  },
  sources: [
    {
      title: 'MDN: JavaScript assíncrono',
      url: 'https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Asynchronous',
    },
    {
      title: 'MDN: Usando a Fetch API',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch',
    },
    {
      title: 'javascript.info: Async/await',
      url: 'https://javascript.info/async-await',
    },
  ],
};
