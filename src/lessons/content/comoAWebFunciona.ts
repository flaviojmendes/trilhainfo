import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Toda vez que você abre um site, dois computadores conversam em poucos milissegundos, às vezes separados por um oceano. Quem trabalha com frontend constrói a parte dessa conversa que chega até a pessoa. Entender como ela acontece é o que separa quem copia código de quem sabe por que ele funciona, ou por que parou de funcionar.',
  sections: [
    {
      id: 'cliente-servidor',
      title: 'Quem pede e quem responde',
      blocks: [
        {
          type: 'text',
          text: 'A web funciona como uma conversa de duas partes. De um lado está o **cliente**: quase sempre o navegador do seu celular ou computador. Do outro lado está o **servidor**: um computador ligado o tempo todo, guardando arquivos e dados, esperando pedidos.',
        },
        {
          type: 'analogy',
          title: 'A web é um restaurante',
          text: 'Você (o cliente) não entra na cozinha. Você faz um **pedido** ao garçom, a cozinha (o servidor) prepara e devolve uma **resposta**: o prato, ou um aviso de que aquele prato acabou. O cardápio tem regras para pedir; na web, essas regras se chamam **HTTP**.',
        },
        {
          type: 'text',
          text: 'O cliente sempre começa a conversa. O servidor não manda uma página para você do nada: ele só responde a pedidos. Isso tem uma consequência importante: tudo o que aparece na sua tela chegou porque o navegador pediu.',
        },
        {
          type: 'quiz',
          question:
            'Você abre o aplicativo do banco no navegador do celular. Quem é o cliente nessa conversa?',
          options: [
            {
              text: 'O navegador do celular',
              correct: true,
              feedback:
                'Isso. O navegador faz os pedidos e mostra as respostas. O cliente é o programa que inicia a conversa, não a pessoa.',
            },
            {
              text: 'O computador do banco',
              feedback:
                'O computador do banco é o **servidor**: ele guarda os dados e responde. Quem pede é o navegador.',
            },
            {
              text: 'A operadora de internet',
              feedback:
                'A operadora transporta a conversa, como os correios transportam cartas, mas não é nenhuma das duas partes que conversam.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Frontend e backend',
          text: '**Frontend** é o que roda no cliente: a página, os botões, o layout. **Backend** é o que roda no servidor: regras, banco de dados, autenticação. Esta trilha é sobre o primeiro, mas você vai conversar com o segundo o tempo todo.',
        },
      ],
    },
    {
      id: 'url',
      title: 'O endereço: a URL',
      blocks: [
        {
          type: 'text',
          text: 'Para pedir algo, o navegador precisa saber **onde** e **o quê**. É isso que a URL diz. Ela parece um texto qualquer, mas cada pedaço tem uma função.',
        },
        {
          type: 'anatomy',
          caption: 'As partes de uma URL.',
          language: 'url',
          parts: [
            {
              text: 'https',
              label: 'Protocolo',
              note: 'A língua da conversa. `https` é HTTP com criptografia: ninguém no meio do caminho consegue ler ou alterar o conteúdo. Hoje, todo site deveria usar.',
            },
            { text: '://' },
            {
              text: 'loja.exemplo.com.br',
              label: 'Domínio',
              note: 'O nome do servidor, feito para humanos lembrarem. Computadores não usam nomes: o domínio vai ser traduzido para um número, o endereço IP.',
            },
            {
              text: '/produtos/camiseta',
              label: 'Caminho',
              note: 'Qual recurso você quer dentro daquele servidor. Funciona como pastas: a página da camiseta, dentro de produtos.',
            },
            {
              text: '?cor=azul&tamanho=m',
              label: 'Parâmetros de busca',
              note: 'Informações extras do pedido, em pares `nome=valor` separados por `&`. Filtros de loja e termos de busca costumam aparecer aqui.',
            },
            {
              text: '#avaliacoes',
              label: 'Fragmento',
              note: 'Um ponto dentro da página, como a seção de avaliações. Ele **não vai para o servidor**: é o navegador que rola até lá.',
            },
          ],
        },
        {
          type: 'classify',
          prompt:
            'Em `https://busca.exemplo.org/resultados?q=gatos#imagens`, que parte é cada pedaço?',
          buckets: ['Domínio', 'Caminho', 'Parâmetro', 'Fragmento'],
          items: [
            { text: '`busca.exemplo.org`', bucket: 0 },
            { text: '`/resultados`', bucket: 1 },
            { text: '`q=gatos`', bucket: 2 },
            { text: '`#imagens`', bucket: 3 },
          ],
          explanation:
            'Com prática, você lê uma URL em um segundo. Isso ajuda muito a depurar: se a página mostra o filtro errado, o primeiro lugar para olhar são os parâmetros.',
        },
      ],
    },
    {
      id: 'dns',
      title: 'Do nome ao número: DNS',
      blocks: [
        {
          type: 'text',
          text: 'Na internet, cada computador é encontrado por um número, o **endereço IP**, algo como `203.0.113.42`. Ninguém decora isso, então existe um sistema que traduz nomes em números: o **DNS** (Sistema de Nomes de Domínio).',
        },
        {
          type: 'analogy',
          title: 'A agenda de contatos da internet',
          text: 'Você procura “Mãe” na agenda e o celular disca o número dela. O DNS faz o mesmo: o navegador pergunta “qual é o número de `loja.exemplo.com.br`?” e recebe o IP para ligar.',
        },
        {
          type: 'flow',
          caption: 'O caminho completo de uma visita a um site',
          actors: ['Navegador', 'DNS', 'Servidor'],
          steps: [
            {
              from: 0,
              to: 1,
              label: 'Qual o IP de loja.exemplo.com.br?',
              text: 'Antes de qualquer coisa, o navegador precisa do número. Se ele já visitou o site há pouco, a resposta está guardada (em **cache**) e este passo é pulado.',
            },
            {
              from: 1,
              to: 0,
              label: '203.0.113.42',
              text: 'O DNS responde com o endereço IP. Agora o navegador sabe para onde ligar.',
              tone: 'ok',
            },
            {
              from: 0,
              to: 2,
              label: 'Conexão segura',
              text: 'O navegador abre uma conexão com o servidor e combina uma criptografia (é o “S” de HTTPS). A partir daqui, a conversa é privada.',
            },
            {
              from: 0,
              to: 2,
              label: 'GET /produtos/camiseta',
              text: 'O pedido de verdade: “me dê a página da camiseta”. Isso é uma **requisição HTTP**.',
            },
            {
              from: 2,
              to: 0,
              label: '200 OK + HTML',
              text: 'O servidor responde com um status (deu certo) e o conteúdo: um arquivo HTML.',
              tone: 'ok',
            },
            {
              from: 0,
              to: 2,
              label: 'GET estilo.css, foto.jpg…',
              text: 'Lendo o HTML, o navegador descobre que precisa de mais arquivos: estilos, imagens, scripts. Cada um é um novo pedido. Uma página comum faz dezenas.',
            },
            {
              from: 0,
              to: 0,
              label: 'Monta a página',
              text: 'Com tudo em mãos, o navegador monta a estrutura, aplica os estilos, roda os scripts e desenha a página na tela.',
            },
          ],
        },
        {
          type: 'reveal',
          question:
            'Se o DNS de um site parar de responder, o servidor dele continua funcionando. Por que mesmo assim ninguém consegue abrir o site pelo nome?',
          answer:
            'Porque o navegador não sabe para qual número ligar. O servidor está lá, mas é como ter o telefone de alguém só na agenda que você perdeu. Quedas de DNS derrubam sites enormes justamente por isso.',
        },
      ],
    },
    {
      id: 'http',
      title: 'A conversa: requisição e resposta',
      blocks: [
        {
          type: 'text',
          text: 'Toda conversa HTTP tem dois lados com formato fixo. A **requisição** diz o que o cliente quer. A **resposta** diz o que aconteceu e traz o conteúdo. Os dois são texto: dá para ler.',
        },
        {
          type: 'code',
          language: 'http',
          caption: 'Uma requisição, como o navegador envia',
          code: 'GET /produtos/camiseta HTTP/1.1\nHost: loja.exemplo.com.br\nAccept: text/html\nAccept-Language: pt-BR',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Método',
              text: 'O verbo do pedido. `GET` pede para ler algo; `POST` envia dados, como um formulário de cadastro. Existem outros, como `PUT` e `DELETE`.',
            },
            {
              term: 'Cabeçalhos',
              text: 'Informações sobre o pedido, no formato `Nome: valor`. Aqui o navegador avisa que aceita HTML e prefere português.',
            },
            {
              term: 'Corpo',
              text: 'O conteúdo enviado. Um `GET` normalmente não tem; um `POST` leva os dados do formulário.',
            },
          ],
        },
        {
          type: 'code',
          language: 'http',
          caption: 'A resposta do servidor',
          code: 'HTTP/1.1 200 OK\nContent-Type: text/html; charset=utf-8\nCache-Control: max-age=300\n\n<!doctype html>\n<html lang="pt-BR">…',
        },
        {
          type: 'text',
          text: 'O número na primeira linha é o **status**: o resumo do que aconteceu, em três dígitos. Você não precisa decorar todos, só entender as famílias.',
        },
        {
          type: 'table',
          caption: 'As famílias de status HTTP',
          head: ['Família', 'Significado', 'Exemplos comuns'],
          rows: [
            ['**2xx**', 'Deu certo', '`200 OK`, `201 Created` (algo foi criado)'],
            [
              '**3xx**',
              'Está em outro lugar',
              '`301 Moved Permanently`, `304 Not Modified` (use o que você já tem)',
            ],
            [
              '**4xx**',
              'O pedido tem um problema',
              '`400 Bad Request`, `401` (falta login), `403` (sem permissão), `404 Not Found`',
            ],
            [
              '**5xx**',
              'O servidor falhou',
              '`500 Internal Server Error`, `503 Service Unavailable`',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Um atalho para depurar',
          text: 'Erro **4** começa com o cliente: confira o que foi enviado. Erro **5** começa no servidor: o pedido pode estar certo, quem quebrou foi o outro lado.',
        },
        {
          type: 'quiz',
          question:
            'Você envia um formulário de login com a senha errada. Qual status faz mais sentido o servidor devolver?',
          options: [
            {
              text: '`500 Internal Server Error`',
              feedback:
                'O servidor não quebrou: ele entendeu o pedido e decidiu recusar. Erros 5xx são para falhas do próprio servidor.',
            },
            {
              text: '`401 Unauthorized`',
              correct: true,
              feedback:
                'Isso. A identificação não foi aceita. Repare que a culpa é do pedido (família 4xx), e o servidor está funcionando bem.',
            },
            {
              text: '`200 OK`',
              feedback:
                'Alguns sistemas fazem isso e escondem o erro dentro do conteúdo, mas atrapalha quem depura. O status deve dizer o que aconteceu.',
            },
            {
              text: '`404 Not Found`',
              feedback:
                'O endereço de login existe, então não é “não encontrado”. O problema é a credencial.',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Uma página carrega, mas a foto do produto não aparece. Qual destas é a explicação mais provável?',
          options: [
            {
              text: 'A requisição do HTML falhou',
              feedback:
                'Se o HTML tivesse falhado, você não veria a página. A página e a foto são pedidos **separados**.',
            },
            {
              text: 'A requisição da imagem voltou com erro, como um 404',
              correct: true,
              feedback:
                'Exato. Cada arquivo é um pedido próprio. A página chegou, a imagem não. É assim que você vai investigar: olhando requisição por requisição.',
            },
            {
              text: 'O DNS não respondeu',
              feedback:
                'Sem DNS, nada do site carregaria, nem o HTML. Quando parte da página aparece, a tradução do nome funcionou.',
            },
          ],
        },
      ],
    },
    {
      id: 'devtools',
      title: 'Veja com seus próprios olhos',
      blocks: [
        {
          type: 'text',
          text: 'Até aqui foi teoria. Agora você vai assistir a essa conversa de verdade. Todo navegador tem **ferramentas de desenvolvimento** (DevTools), e uma delas, o painel **Network** (Rede), lista cada requisição que a página faz.',
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Abra as ferramentas',
              text: 'No Chrome, Edge ou Firefox, pressione `F12`, ou `Ctrl` + `Shift` + `I` (no Mac, `Cmd` + `Option` + `I`). No celular não há DevTools; use um computador para esta parte.',
            },
            {
              title: 'Vá para a aba Network (Rede)',
              text: 'Ela fica vazia até algo acontecer. Recarregue a página com `F5` e veja a lista se encher.',
            },
            {
              title: 'Clique na primeira linha',
              text: 'Geralmente é o documento HTML. Em **Headers** (Cabeçalhos) você encontra a URL, o método e o status. Em **Response** (Resposta), o conteúdo.',
            },
            {
              title: 'Procure um erro',
              text: 'Linhas em vermelho são pedidos que falharam. A coluna **Status** mostra o código. Abra um site grande e conte quantas requisições ele faz.',
            },
          ],
        },
        {
          type: 'order',
          prompt: 'Você digita um endereço e aperta Enter. Coloque em ordem o que acontece.',
          items: [
            'O navegador descobre o IP do domínio no DNS',
            'O navegador abre uma conexão segura com o servidor',
            'O navegador envia a requisição `GET` da página',
            'O servidor responde com status e HTML',
            'O navegador pede os arquivos citados no HTML: CSS, imagens, scripts',
            'A página é desenhada na tela',
          ],
          explanation:
            'Esse é o roteiro que você usa para investigar qualquer problema de carregamento: em que passo a conversa parou?',
        },
      ],
    },
  ],
  recap: [
    'O **cliente** (navegador) sempre faz o pedido; o **servidor** responde.',
    'A URL diz onde e o quê: protocolo, domínio, caminho, parâmetros e fragmento.',
    'O **DNS** traduz o domínio em um endereço IP antes da conversa começar.',
    'Cada arquivo da página é uma requisição HTTP separada, com método, cabeçalhos e uma resposta com **status**.',
    'Status 4xx apontam para o pedido; 5xx, para o servidor. O painel Network mostra tudo isso.',
  ],
  cards: [
    {
      id: 'cliente',
      front: 'Na web, quem inicia a conversa: o cliente ou o servidor?',
      back: 'O cliente, normalmente o navegador. O servidor só responde a pedidos.',
    },
    {
      id: 'dns',
      front: 'Para que serve o DNS?',
      back: 'Traduzir um nome de domínio, como `exemplo.com`, no endereço IP do servidor.',
    },
    {
      id: 'fragmento',
      front: 'O fragmento de uma URL (a parte depois de `#`) é enviado ao servidor?',
      back: 'Não. Ele é usado só pelo navegador, para ir a um ponto da página.',
    },
    {
      id: 'status',
      front: 'O que indicam os status 2xx, 4xx e 5xx?',
      back: '2xx: deu certo. 4xx: problema no pedido, como `404` ou `401`. 5xx: falha no servidor.',
    },
    {
      id: 'get-post',
      front: 'Qual a diferença entre `GET` e `POST`?',
      back: '`GET` pede para ler algo. `POST` envia dados para o servidor, como um formulário.',
    },
  ],
  mission: {
    title: 'Investigue uma página real',
    text: 'Escolha um site que você usa no dia a dia e observe a conversa no painel Network. Anote o que encontrar: explicar com suas palavras é a melhor prova de que você entendeu.',
    steps: [
      'Abra o painel Network e recarregue a página',
      'Encontre a requisição do documento HTML e anote método, status e o `Content-Type` da resposta',
      'Conte quantas requisições a página fez ao terminar de carregar',
      'Ache uma imagem na lista e confira o tamanho dela',
      'Acesse um endereço inexistente do mesmo site e veja o status que volta',
    ],
  },
  sources: [
    {
      title: 'MDN: Como a web funciona',
      url: 'https://developer.mozilla.org/pt-BR/docs/Learn/Getting_started_with_the_web/How_the_Web_works',
    },
    {
      title: 'MDN: Visão geral do HTTP',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Overview',
    },
    {
      title: 'Chrome DevTools: inspecionar a atividade de rede',
      url: 'https://developer.chrome.com/docs/devtools/network',
    },
  ],
};
