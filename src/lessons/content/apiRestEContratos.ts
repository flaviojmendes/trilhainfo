import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Quando você paga um Pix, pede um lanche no iFood ou consulta o saldo no app do banco, a tela do celular não guarda nada: ela pergunta a uma **API**, um programa no servidor que responde a pedidos de outros programas. Quem trabalha com backend constrói essas APIs; quem faz frontend e quem testa conversa com elas todo dia. Saber pedir do jeito certo e entender cada resposta é o idioma comum entre essas três profissões.',
  sections: [
    {
      id: 'recursos-e-metodos',
      title: 'Coisas e ações: recursos e métodos',
      blocks: [
        {
          type: 'analogy',
          title: 'Uma API é o balcão dos Correios',
          text: 'Você não entra no centro de distribuição para pegar sua encomenda. Você vai ao balcão e diz **o que** quer (aquela encomenda, aquele código de rastreio) e **o que fazer** com ela (enviar, rastrear, cancelar). O balcão tem regras fixas, e qualquer pessoa que segue as regras é atendida do mesmo jeito.',
        },
        {
          type: 'text',
          text: 'Na web, esse balcão é uma **API** (Interface de Programação de Aplicações): um conjunto de endereços que um programa oferece para outros programas usarem. A forma mais comum de organizar esses endereços se chama **REST**.',
        },
        {
          type: 'text',
          text: 'No REST, a URL nomeia uma **coisa**, chamada **recurso**: `/despesas` é a coleção de despesas, `/despesas/42` é a despesa número 42. A **ação** não fica na URL: quem diz o que fazer é o **método** HTTP, que você conheceu na aula sobre como a web funciona.',
        },
        {
          type: 'table',
          caption: 'Os cinco métodos que você mais vai usar',
          head: ['Método', 'O que pede', 'Exemplo', 'Leva corpo?'],
          rows: [
            ['`GET`', 'Ler, sem mudar nada', '`GET /despesas/42`', 'Não'],
            ['`POST`', 'Criar algo novo na coleção', '`POST /despesas`', 'Sim'],
            ['`PUT`', 'Substituir o recurso inteiro', '`PUT /despesas/42`', 'Sim, completo'],
            ['`PATCH`', 'Alterar só alguns campos', '`PATCH /despesas/42`', 'Sim, parcial'],
            ['`DELETE`', 'Apagar', '`DELETE /despesas/42`', 'Não'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'PUT ou PATCH?',
          text: 'Se você manda `PUT` só com o valor novo, o servidor entende que os outros campos sumiram. Para corrigir só o valor de uma despesa, o natural é `PATCH` com `{"valor": 30}`.',
        },
        {
          type: 'fill',
          prompt: 'Complete o método de cada rota da API de despesas.',
          language: 'http',
          template:
            '[[GET]]    /despesas      → lista as despesas\n[[POST]]   /despesas      → cria uma despesa\n[[PATCH|PUT]]  /despesas/42   → corrige o valor da despesa 42\n[[DELETE]] /despesas/42   → apaga a despesa 42',
          explanation:
            'Repare que as URLs se repetem: `/despesas` serve para listar e criar, `/despesas/42` serve para ler, alterar e apagar. É o método que muda o sentido do pedido.',
        },
        {
          type: 'quiz',
          question: 'Qual destas rotas segue melhor o estilo REST para apagar a despesa 42?',
          options: [
            {
              text: '`POST /apagarDespesa?id=42`',
              feedback:
                'Funciona, mas coloca a ação no nome da URL. Em REST, a URL diz qual coisa e o método diz a ação: assim qualquer pessoa adivinha a rota sem ler a documentação.',
            },
            {
              text: '`GET /despesas/42/apagar`',
              feedback:
                'Perigoso: `GET` deveria só ler. Ferramentas que pré-carregam links, como buscadores e antivírus de e-mail, poderiam apagar dados sem ninguém clicar.',
            },
            {
              text: '`DELETE /despesas/42`',
              correct: true,
              feedback:
                'Isso. O recurso é `/despesas/42` e a ação é o método `DELETE`. Simples, previsível e igual em qualquer API REST.',
            },
          ],
        },
      ],
    },
    {
      id: 'json-e-status',
      title: 'O corpo em JSON e o status certo',
      blocks: [
        {
          type: 'text',
          text: 'Os dados que vão e voltam ficam no **corpo** da mensagem. Quase toda API moderna usa **JSON**, um formato de texto com chaves e valores que qualquer linguagem entende: Python vira dicionário, JavaScript vira objeto, Java vira uma classe.',
        },
        {
          type: 'anatomy',
          caption: 'Uma despesa em JSON. Explore cada parte.',
          language: 'json',
          parts: [
            { text: '{\n  ' },
            {
              text: '"id": 42',
              label: 'Identificador',
              note: 'Quem cria o `id` é o servidor, nunca o cliente. Ele é o que vai no final da URL: `/despesas/42`.',
            },
            { text: ',\n  ' },
            {
              text: '"descricao": "Pão e café na padaria"',
              label: 'Texto (string)',
              note: 'Textos sempre entre aspas duplas. Aspas simples não são JSON válido.',
            },
            { text: ',\n  ' },
            {
              text: '"valor": 18.5',
              label: 'Número',
              note: 'Sem aspas e com ponto decimal, nunca vírgula. `"18,50"` entre aspas é um texto, e somar textos dá resultados estranhos.',
            },
            { text: ',\n  ' },
            {
              text: '"pago": true',
              label: 'Verdadeiro ou falso',
              note: '`true` e `false`, em minúsculas e sem aspas.',
            },
            { text: ',\n  ' },
            {
              text: '"data": "2026-10-14"',
              label: 'Data',
              note: 'JSON não tem tipo de data. A convenção é um texto no formato ano-mês-dia (ISO 8601), que ordena certo e não confunde dia com mês.',
            },
            { text: '\n}' },
          ],
        },
        {
          type: 'text',
          text: 'Junto com o corpo, toda resposta traz um **status**. Em APIs, ele é o primeiro lugar que o programa do outro lado olha para decidir o que fazer, então escolher o número certo faz parte do trabalho.',
        },
        {
          type: 'table',
          caption: 'Os status mais comuns em uma API',
          head: ['Status', 'Quando usar'],
          rows: [
            ['`200 OK`', 'Leitura ou alteração que deu certo, com corpo na resposta'],
            ['`201 Created`', 'Um `POST` criou um recurso novo'],
            ['`204 No Content`', 'Deu certo e não há nada para devolver, comum em `DELETE`'],
            ['`400 Bad Request`', 'Os dados enviados estão errados ou incompletos'],
            ['`401` e `403`', 'Falta identificação ou falta permissão (tema de outra aula)'],
            ['`404 Not Found`', 'O recurso pedido não existe'],
            ['`409 Conflict`', 'O pedido choca com o estado atual, como um e-mail já cadastrado'],
            ['`500 Internal Server Error`', 'O servidor quebrou: a culpa não é de quem pediu'],
          ],
        },
        {
          type: 'classify',
          prompt: 'Que família de status a API deveria devolver em cada situação?',
          buckets: ['2xx: deu certo', '4xx: problema no pedido', '5xx: falha no servidor'],
          items: [
            { text: 'Uma despesa nova foi salva', bucket: 0 },
            { text: 'A despesa 7 foi apagada', bucket: 0 },
            { text: 'O valor veio como `"abc"`', bucket: 1 },
            { text: 'Pediram a despesa 9999, que não existe', bucket: 1 },
            { text: 'Tentaram cadastrar um e-mail que já existe', bucket: 1 },
            { text: 'O banco de dados caiu no meio da consulta', bucket: 2 },
            { text: 'Um erro de programação no servidor quebrou a rota', bucket: 2 },
          ],
          explanation:
            'A pergunta que decide é: de quem é a culpa? Se o mesmo pedido, enviado de novo, daria certo depois que o servidor fosse consertado, é 5xx. Se quem pediu precisa mudar o pedido, é 4xx.',
        },
        {
          type: 'terminal',
          title: 'Conversando com a API pelo terminal',
          task: 'O `curl` é um programa que faz requisições HTTP pelo terminal, sem navegador. Use-o para conversar com uma API de despesas que está rodando no seu computador, na porta 8000.',
          prompt: '~/despesas$',
          intro:
            'API de despesas rodando em http://localhost:8000\nNesta pasta há dois arquivos: despesa.json e invalida.json',
          steps: [
            {
              goal: 'Liste as despesas com um `GET` em `http://localhost:8000/despesas`.',
              command: [
                'curl http://localhost:8000/despesas',
                'curl localhost:8000/despesas',
                'curl -X GET http://localhost:8000/despesas',
              ],
              output:
                '{"itens":[{"id":7,"descricao":"Mercado do mês","valor":412.9},{"id":8,"descricao":"Passagem de ônibus","valor":4.4}],"pagina":1,"total":2}',
              hint: 'Basta `curl` seguido do endereço completo.',
            },
            {
              goal: 'Peça a despesa 7 e mostre também o status e os cabeçalhos com a opção `-i`.',
              command: [
                'curl -i http://localhost:8000/despesas/7',
                'curl -i localhost:8000/despesas/7',
                'curl http://localhost:8000/despesas/7 -i',
              ],
              output:
                'HTTP/1.1 200 OK\ncontent-type: application/json\n\n{"id":7,"descricao":"Mercado do mês","valor":412.9,"categoria":"mercado"}',
              hint: '`curl -i` seguido de `http://localhost:8000/despesas/7`.',
            },
            {
              goal: 'Agora peça a despesa 999, que não existe, ainda com `-i`.',
              command: [
                'curl -i http://localhost:8000/despesas/999',
                'curl -i localhost:8000/despesas/999',
                'curl http://localhost:8000/despesas/999 -i',
              ],
              output:
                'HTTP/1.1 404 Not Found\ncontent-type: application/json\n\n{"erro":"nao_encontrado","mensagem":"Despesa 999 não existe."}',
              hint: 'Igual ao passo anterior, trocando 7 por 999.',
            },
            {
              goal: 'Veja o que há no arquivo `despesa.json`.',
              command: 'cat despesa.json',
              output:
                '{"descricao": "Passagem de ônibus", "valor": 4.4, "categoria": "transporte"}',
              hint: 'O comando `cat` mostra o conteúdo de um arquivo.',
            },
            {
              goal: 'Crie a despesa enviando o arquivo com `curl -i --json @despesa.json` para `/despesas`. A opção `--json` já usa `POST` e avisa que o corpo é JSON.',
              command: [
                'curl -i --json @despesa.json http://localhost:8000/despesas',
                'curl -i --json @despesa.json localhost:8000/despesas',
                'curl -i -X POST -H "Content-Type: application/json" -d @despesa.json http://localhost:8000/despesas',
                'curl -i -X POST http://localhost:8000/despesas -H "Content-Type: application/json" -d @despesa.json',
              ],
              output:
                'HTTP/1.1 201 Created\nlocation: /despesas/9\ncontent-type: application/json\n\n{"id":9,"descricao":"Passagem de ônibus","valor":4.4,"categoria":"transporte"}',
              hint: '`curl -i --json @despesa.json http://localhost:8000/despesas`. O `@` diz ao curl para ler o corpo de um arquivo.',
            },
            {
              goal: 'Faça o mesmo com `invalida.json` e leia com atenção o que a API responde.',
              command: [
                'curl -i --json @invalida.json http://localhost:8000/despesas',
                'curl -i --json @invalida.json localhost:8000/despesas',
                'curl -i -X POST -H "Content-Type: application/json" -d @invalida.json http://localhost:8000/despesas',
                'curl -i -X POST http://localhost:8000/despesas -H "Content-Type: application/json" -d @invalida.json',
              ],
              output:
                'HTTP/1.1 400 Bad Request\ncontent-type: application/json\n\n{"erro":"validacao","detalhes":[{"campo":"valor","mensagem":"Deve ser um número maior que zero."},{"campo":"categoria","mensagem":"Use uma de: mercado, transporte, moradia, lazer, saude."}]}',
              hint: 'Repita o comando anterior trocando o nome do arquivo.',
            },
            {
              goal: 'Apague a despesa 7 com o método `DELETE`, mostrando o status.',
              command: [
                'curl -i -X DELETE http://localhost:8000/despesas/7',
                'curl -i -X DELETE localhost:8000/despesas/7',
                'curl -X DELETE -i http://localhost:8000/despesas/7',
              ],
              output: 'HTTP/1.1 204 No Content',
              hint: 'Use `-X DELETE` para escolher o método: `curl -i -X DELETE http://localhost:8000/despesas/7`.',
            },
          ],
        },
      ],
    },
    {
      id: 'idempotencia',
      title: 'Repetir sem estragar: idempotência',
      blocks: [
        {
          type: 'analogy',
          title: 'O botão do elevador e o botão de pedir',
          text: 'Apertar o botão do elevador cinco vezes não chama cinco elevadores: o resultado é o mesmo de apertar uma vez. Já tocar cinco vezes em "Fazer pedido" no app de delivery, se o app não se proteger, gera cinco pedidos e cinco cobranças.',
        },
        {
          type: 'text',
          text: 'Uma operação é **idempotente** quando repeti-la deixa o sistema no mesmo estado que fazê-la uma vez. Isso importa porque a internet falha: o celular perde sinal, a resposta não chega e o app tenta de novo, sem saber se o primeiro pedido foi processado.',
        },
        {
          type: 'table',
          caption: 'O que o HTTP promete sobre cada método',
          head: ['Método', 'Seguro (não muda nada)', 'Idempotente'],
          rows: [
            ['`GET`', 'Sim', 'Sim'],
            ['`PUT`', 'Não', 'Sim: substituir duas vezes pelo mesmo conteúdo dá no mesmo'],
            ['`DELETE`', 'Não', 'Sim: depois da primeira vez, a despesa já não existe'],
            ['`PATCH`', 'Não', 'Depende: `valor = 30` é; `somar 10 ao valor` não é'],
            ['`POST`', 'Não', 'Não: cada envio pode criar um recurso novo'],
          ],
        },
        {
          type: 'flow',
          caption: 'Um POST repetido, protegido por uma chave de idempotência',
          actors: ['App', 'API', 'Banco'],
          steps: [
            {
              from: 0,
              to: 1,
              label: 'POST /despesas + chave',
              text: 'O app gera uma chave única para esta tentativa, por exemplo no cabeçalho `Idempotency-Key: 5f1c`, e envia junto com a despesa.',
            },
            {
              from: 1,
              to: 2,
              label: 'Salva despesa e chave',
              text: 'A API grava a despesa e anota que a chave `5f1c` já gerou a despesa 9.',
              tone: 'ok',
            },
            {
              from: 1,
              to: 0,
              label: '201 (perdida no caminho)',
              text: 'O sinal do celular cai e a resposta nunca chega. O app não sabe se deu certo.',
              tone: 'error',
            },
            {
              from: 0,
              to: 1,
              label: 'Mesmo POST, mesma chave',
              text: 'O app tenta de novo, com a mesma chave. Sem ela, a API criaria uma segunda despesa igual.',
            },
            {
              from: 1,
              to: 0,
              label: '201: despesa 9',
              text: 'A API reconhece a chave e devolve o mesmo resultado da primeira vez, sem gravar nada novo.',
              tone: 'ok',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'O app envia `DELETE /despesas/7`, a conexão cai e ele repete o pedido. O que deve acontecer?',
          options: [
            {
              text: 'Nada de ruim: a despesa 7 continua apagada, e a segunda resposta pode ser `204` ou `404`',
              correct: true,
              feedback:
                'Isso. O estado final é o mesmo: a despesa não existe. O status pode variar entre as tentativas, mas o efeito no sistema não muda. Isso é idempotência.',
            },
            {
              text: 'A API apaga a despesa 8, a próxima da lista',
              feedback:
                'O `DELETE` aponta para um recurso específico pela URL. Ele nunca escolhe outro registro sozinho.',
            },
            {
              text: 'A API deve responder `500`, porque o pedido foi repetido',
              feedback:
                'Repetir um pedido não é uma falha do servidor. Para métodos idempotentes, repetir é justamente o comportamento esperado de clientes que perderam a resposta.',
            },
          ],
        },
        {
          type: 'reveal',
          question:
            'Por que um botão "Pagar" deveria ficar desabilitado logo após o primeiro toque, mesmo que a API use chave de idempotência?',
          answer:
            'Porque proteção boa tem camadas. O botão evita a maioria dos toques repetidos na tela; a chave protege contra as repetições que o botão não vê, como novas tentativas automáticas depois de uma queda de rede.',
        },
      ],
    },
    {
      id: 'paginacao',
      title: 'Listas longas: paginação',
      blocks: [
        {
          type: 'text',
          text: 'Em três anos, uma pessoa organizada lança milhares de despesas. Devolver todas em um único `GET /despesas` deixa a resposta lenta, gasta o plano de dados do celular e pode derrubar o servidor. A saída é **paginar**: entregar a lista em pedaços.',
        },
        {
          type: 'analogy',
          title: 'O extrato do banco',
          text: 'O app do banco não mostra todas as transações desde que você abriu a conta. Ele mostra as mais recentes e um "ver mais". Cada página é um pedido novo, e a resposta diz se ainda existe mais coisa.',
        },
        {
          type: 'code',
          language: 'http',
          caption: 'O cliente pede a página nos parâmetros; a resposta traz os itens e o contexto',
          code: 'GET /despesas?pagina=2&por_pagina=10\n\nHTTP/1.1 200 OK\n{\n  "itens": [ ...10 despesas... ],\n  "pagina": 2,\n  "por_pagina": 10,\n  "total": 23\n}',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Sempre com um limite máximo',
          text: 'Se a API aceitar `por_pagina=1000000`, alguém vai pedir isso. Defina um teto, como 50, e um valor padrão. Em listas enormes ou que mudam rápido, muitas APIs usam **cursor** (um marcador de "continue daqui") no lugar do número da página.',
        },
        {
          type: 'python',
          title: 'Implemente a paginação',
          task: 'A função `listar` recebe a página (começando em 1) e quantos itens por página. Hoje ela sempre devolve os 10 primeiros. Calcule `inicio` e `fim` a partir de `pagina` e `por_pagina`, e limite `por_pagina` a no máximo 50 antes do cálculo. Dica: a página 2 com 10 por página começa no índice 10.',
          code: "despesas = [{'id': n, 'descricao': f'Despesa {n}'} for n in range(1, 24)]  # 23 despesas\n\n\ndef listar(pagina=1, por_pagina=10):\n    inicio = 0\n    fim = 10\n    return {\n        'itens': despesas[inicio:fim],\n        'pagina': pagina,\n        'por_pagina': por_pagina,\n        'total': len(despesas),\n    }\n\n\nresposta = listar(pagina=3, por_pagina=10)\nprint([d['id'] for d in resposta['itens']])",
          solution:
            "despesas = [{'id': n, 'descricao': f'Despesa {n}'} for n in range(1, 24)]  # 23 despesas\n\n\ndef listar(pagina=1, por_pagina=10):\n    por_pagina = min(por_pagina, 50)\n    inicio = (pagina - 1) * por_pagina\n    fim = inicio + por_pagina\n    return {\n        'itens': despesas[inicio:fim],\n        'pagina': pagina,\n        'por_pagina': por_pagina,\n        'total': len(despesas),\n    }\n\n\nresposta = listar(pagina=3, por_pagina=10)\nprint([d['id'] for d in resposta['itens']])",
          checks: [
            {
              label: 'A página 2 começa na despesa 11',
              test: "listar(2, 10)['itens'][0]['id'] == 11",
            },
            {
              label: 'A última página traz só as 3 que sobraram',
              test: "[d['id'] for d in listar(3, 10)['itens']] == [21, 22, 23]",
            },
            {
              label: 'Uma página além do fim volta vazia, sem erro',
              test: "listar(9, 10)['itens'] == []",
            },
            {
              label: 'Funciona com outro tamanho de página',
              test: "[d['id'] for d in listar(2, 5)['itens']] == [6, 7, 8, 9, 10]",
            },
            {
              label: 'Ninguém consegue pedir mais de 50 por página',
              test: "listar(1, 1000)['por_pagina'] == 50",
            },
          ],
        },
      ],
    },
    {
      id: 'validacao-e-erros',
      title: 'Nunca confie na entrada',
      blocks: [
        {
          type: 'text',
          text: 'Seu formulário pode impedir valor negativo, mas qualquer pessoa consegue chamar a API direto com `curl`, como você fez agora há pouco. Validar no navegador é **conforto** para quem usa; validar no servidor é **proteção**. As duas coisas são necessárias.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tipos não validam nada em tempo de execução',
          text: 'Em projetos com TypeScript no cliente e no servidor, é tentador achar que um tipo compartilhado garante os dados. Ele só existe enquanto você programa: na hora em que o JSON chega pela rede, pode ter qualquer coisa. Quem protege é a validação no servidor.',
        },
        {
          type: 'text',
          text: 'Quando a validação falha, a resposta precisa dizer **o que** está errado e **onde**, num formato que se repete em todas as rotas. Assim o frontend mostra a mensagem ao lado do campo certo, e quem testa consegue conferir cada regra.',
        },
        {
          type: 'code',
          language: 'json',
          caption: 'Um formato de erro consistente, usado em toda a API',
          code: '{\n  "erro": "validacao",\n  "detalhes": [\n    { "campo": "valor", "mensagem": "Deve ser um número maior que zero." }\n  ]\n}',
        },
        {
          type: 'python',
          title: 'Escreva a validação da rota POST /despesas',
          task: 'A função `criar_despesa` recebe a requisição como um dicionário e devolve a resposta como outro dicionário, como um framework faria. Hoje ela aceita qualquer coisa. Adicione à lista `erros` um item `{"campo": ..., "mensagem": ...}` quando: a `descricao` não for um texto com algo além de espaços; o `valor` não for um número (`int` ou `float`) maior que zero; a `categoria` não estiver em `CATEGORIAS`. Com qualquer erro, a função já devolve 400 e não salva nada.',
          code: "CATEGORIAS = {'mercado', 'transporte', 'moradia', 'lazer', 'saude'}\ndespesas = []\n\n\ndef criar_despesa(requisicao):\n    corpo = requisicao.get('corpo') or {}\n    descricao = corpo.get('descricao')\n    valor = corpo.get('valor')\n    categoria = corpo.get('categoria')\n    erros = []\n\n    # Escreva as validações aqui\n\n    if erros:\n        return {'status': 400, 'corpo': {'erro': 'validacao', 'detalhes': erros}}\n\n    despesa = {\n        'id': len(despesas) + 1,\n        'descricao': descricao,\n        'valor': valor,\n        'categoria': categoria,\n    }\n    despesas.append(despesa)\n    return {'status': 201, 'corpo': despesa}\n\n\nprint(criar_despesa({'corpo': {'descricao': 'Feira', 'valor': 52.3, 'categoria': 'mercado'}}))\nprint(criar_despesa({'corpo': {'descricao': '', 'valor': -5, 'categoria': 'viagem'}}))",
          solution:
            "CATEGORIAS = {'mercado', 'transporte', 'moradia', 'lazer', 'saude'}\ndespesas = []\n\n\ndef criar_despesa(requisicao):\n    corpo = requisicao.get('corpo') or {}\n    descricao = corpo.get('descricao')\n    valor = corpo.get('valor')\n    categoria = corpo.get('categoria')\n    erros = []\n\n    if not isinstance(descricao, str) or not descricao.strip():\n        erros.append({'campo': 'descricao', 'mensagem': 'Escreva uma descrição.'})\n    if not isinstance(valor, (int, float)) or isinstance(valor, bool) or valor <= 0:\n        erros.append({'campo': 'valor', 'mensagem': 'Deve ser um número maior que zero.'})\n    if categoria not in CATEGORIAS:\n        erros.append({'campo': 'categoria', 'mensagem': 'Categoria desconhecida.'})\n\n    if erros:\n        return {'status': 400, 'corpo': {'erro': 'validacao', 'detalhes': erros}}\n\n    despesa = {\n        'id': len(despesas) + 1,\n        'descricao': descricao,\n        'valor': valor,\n        'categoria': categoria,\n    }\n    despesas.append(despesa)\n    return {'status': 201, 'corpo': despesa}\n\n\nprint(criar_despesa({'corpo': {'descricao': 'Feira', 'valor': 52.3, 'categoria': 'mercado'}}))\nprint(criar_despesa({'corpo': {'descricao': '', 'valor': -5, 'categoria': 'viagem'}}))",
          checks: [
            {
              label: 'Uma despesa correta é criada com 201',
              test: "criar_despesa({'corpo': {'descricao': 'Ônibus', 'valor': 4.4, 'categoria': 'transporte'}})['status'] == 201",
            },
            {
              label: 'Valor negativo devolve 400 apontando o campo valor',
              test: "(lambda r: r['status'] == 400 and any(e['campo'] == 'valor' for e in r['corpo']['detalhes']))(criar_despesa({'corpo': {'descricao': 'Aluguel', 'valor': -10, 'categoria': 'moradia'}}))",
            },
            {
              label: 'Valor em texto, como "25", também é recusado',
              test: "criar_despesa({'corpo': {'descricao': 'Cinema', 'valor': '25', 'categoria': 'lazer'}})['status'] == 400",
            },
            {
              label: 'Descrição só com espaços é recusada',
              test: "criar_despesa({'corpo': {'descricao': '   ', 'valor': 10, 'categoria': 'lazer'}})['status'] == 400",
            },
            {
              label: 'Categoria fora da lista é recusada',
              test: "criar_despesa({'corpo': {'descricao': 'Hotel', 'valor': 300, 'categoria': 'viagem'}})['status'] == 400",
            },
            {
              label: 'Uma requisição sem corpo não salva nada',
              test: "(lambda antes: criar_despesa({})['status'] == 400 and len(despesas) == antes)(len(despesas))",
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns em respostas de erro',
          text: 'Devolver `200` com `{"sucesso": false}` esconde a falha de quem monitora. Devolver `500` para dado inválido culpa o servidor por um erro do pedido. Mostrar o rastro do erro (stack trace) entrega detalhes internos a quem quer atacar. E uma mensagem que diz só "Erro" não ajuda ninguém a corrigir.',
        },
        {
          type: 'quiz',
          question:
            'A pessoa preencheu um formulário longo e a API devolveu `400` com `detalhes` dizendo que o campo `valor` está errado. O que a tela deveria fazer?',
          options: [
            {
              text: 'Limpar o formulário e mostrar "Algo deu errado"',
              feedback:
                'A pessoa perde tudo o que digitou e não sabe o que corrigir. A resposta da API trazia exatamente a informação que faltava.',
            },
            {
              text: 'Manter o que foi digitado e mostrar a mensagem ao lado do campo valor',
              correct: true,
              feedback:
                'Isso. O `400` diz que o pedido precisa mudar, e `detalhes` diz onde. Preservar os dados e apontar o campo transforma um erro em uma correção de segundos.',
            },
            {
              text: 'Reenviar o mesmo pedido automaticamente até dar certo',
              feedback:
                'Repetir faz sentido para falhas passageiras, como queda de rede ou `503`. Um `400` vai voltar igual para sempre, porque o problema está nos dados.',
            },
          ],
        },
      ],
    },
    {
      id: 'contrato-e-versoes',
      title: 'O contrato: OpenAPI e versões',
      blocks: [
        {
          type: 'text',
          text: 'Rotas, campos, tipos, status e formato de erro formam o **contrato** da API: a promessa de como ela se comporta. Quem faz o frontend programa em cima dessa promessa, quem testa verifica se ela é cumprida, e outras empresas podem depender dela.',
        },
        {
          type: 'text',
          text: 'O jeito mais usado de escrever esse contrato é o **OpenAPI**: um arquivo YAML ou JSON que descreve cada rota. Muitos frameworks geram esse arquivo a partir do código (o FastAPI em Python, o springdoc em Java, bibliotecas como o fastify-swagger em Node) e mostram uma página interativa para testar as rotas.',
        },
        {
          type: 'anatomy',
          caption: 'Um trecho de contrato OpenAPI. Explore as partes.',
          language: 'yaml',
          parts: [
            {
              text: 'paths:\n  /despesas/{id}:\n',
              label: 'Rota',
              note: 'O caminho, com `{id}` marcando a parte que muda. Cada rota lista os métodos que aceita.',
            },
            {
              text: '    get:\n      summary: Busca uma despesa\n',
              label: 'Método',
              note: 'Aqui está o `GET`. A mesma rota poderia ter `patch` e `delete` logo abaixo.',
            },
            {
              text: '      parameters:\n        - name: id\n          in: path\n          required: true\n          schema: { type: integer }\n',
              label: 'Parâmetros',
              note: 'O que vem na URL e de que tipo. `id` é obrigatório e é um número inteiro, então `/despesas/abc` deve ser recusado.',
            },
            {
              text: '      responses:\n        "200":\n          content:\n            application/json:\n              schema: { $ref: "#/components/schemas/Despesa" }\n',
              label: 'Resposta de sucesso',
              note: 'Diz o formato do corpo quando dá certo. O `$ref` aponta para a definição de Despesa, escrita uma vez e reaproveitada.',
            },
            {
              text: '        "404":\n          description: Despesa não encontrada',
              label: 'Respostas de erro',
              note: 'Um bom contrato também documenta os erros. Sem isso, o frontend não sabe o que tratar e quem testa não sabe o que esperar.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Contratos mudam. Uma mudança **compatível** não quebra quem já usa a API, como acrescentar um campo novo na resposta. Uma mudança **incompatível** (em inglês, breaking change) quebra: renomear ou remover campos, mudar tipos, passar a exigir algo novo. Para essas, cria-se uma nova versão, como `/v2/despesas`, e a `/v1` continua funcionando por um tempo combinado.',
        },
        {
          type: 'classify',
          prompt: 'Cada mudança quebra os clientes atuais da API?',
          buckets: ['Compatível: pode publicar', 'Incompatível: precisa de nova versão'],
          items: [
            { text: 'Acrescentar o campo `criada_em` na resposta', bucket: 0 },
            { text: 'Criar a rota nova `GET /categorias`', bucket: 0 },
            { text: 'Aceitar um filtro opcional `?categoria=`', bucket: 0 },
            { text: 'Renomear `valor` para `montante`', bucket: 1 },
            { text: 'Mudar `valor` de número para texto', bucket: 1 },
            { text: 'Tornar obrigatório o campo `data` no POST', bucket: 1 },
          ],
          explanation:
            'A regra prática: acrescentar algo opcional costuma ser seguro; tirar, renomear, mudar tipo ou passar a exigir algo quebra quem já estava usando.',
        },
        {
          type: 'quiz',
          question:
            'Quem testa a API percebe que `GET /despesas/7` devolve `valor` como `"412,90"` (texto), mas o contrato diz que é um número. O que isso é?',
          options: [
            {
              text: 'Um defeito: a API descumpre o próprio contrato',
              correct: true,
              feedback:
                'Exato. O contrato é a referência. Um cliente que soma valores vai concatenar textos ou quebrar. É um bug a relatar com a requisição, a resposta e o trecho do contrato.',
            },
            {
              text: 'Normal: JSON transforma números em texto',
              feedback:
                'JSON tem tipo número próprio, sem aspas. Se veio entre aspas, foi o servidor que gerou um texto.',
            },
            {
              text: 'Problema do frontend, que deveria converter',
              feedback:
                'Converter esconderia o problema e cada cliente teria que fazer o mesmo remendo. Quem descumpre o combinado é a API.',
            },
          ],
        },
      ],
    },
  ],
  recap: [
    'Em REST, a URL nomeia o **recurso** e o **método** diz a ação: `GET` lê, `POST` cria, `PUT` e `PATCH` alteram, `DELETE` apaga.',
    'Os dados viajam em **JSON**, e o **status** resume o resultado: 2xx deu certo, 4xx o pedido precisa mudar, 5xx o servidor falhou.',
    '`GET`, `PUT` e `DELETE` são **idempotentes**; `POST` não é, e pode ser protegido por uma chave de idempotência.',
    'Listas são **paginadas** com limite máximo, e toda entrada é **validada no servidor**, com erros num formato consistente.',
    'O **contrato** (por exemplo em OpenAPI) é a promessa da API; mudanças incompatíveis pedem uma nova **versão**.',
  ],
  cards: [
    {
      id: 'recurso-e-metodo',
      front: 'Em uma API REST, o que fica na URL e o que fica no método?',
      back: 'A URL nomeia o recurso, como `/despesas/42`. O método diz a ação: `GET`, `POST`, `PATCH`, `DELETE`.',
    },
    {
      id: 'put-patch',
      front: 'Qual a diferença entre `PUT` e `PATCH`?',
      back: '`PUT` substitui o recurso inteiro. `PATCH` altera só os campos enviados.',
    },
    {
      id: 'status-criado',
      front:
        'Qual status uma API devolve quando um `POST` cria algo? E quando um `DELETE` dá certo sem corpo?',
      back: '`201 Created` para a criação. `204 No Content` para o `DELETE` sem corpo.',
    },
    {
      id: 'idempotente',
      front: 'O que significa uma operação ser idempotente?',
      back: 'Repetir a operação deixa o sistema no mesmo estado que fazê-la uma vez. `DELETE` é; `POST` não é.',
    },
    {
      id: 'paginacao-limite',
      front: 'Por que uma API paginada precisa de um limite máximo por página?',
      back: 'Sem teto, alguém pede um milhão de itens e a resposta fica lenta ou derruba o servidor.',
    },
    {
      id: 'validar-no-servidor',
      front: 'Se o formulário já valida, por que validar de novo no servidor?',
      back: 'Porque qualquer pessoa chama a API sem passar pelo formulário, por exemplo com `curl`. A validação do servidor é a proteção.',
    },
    {
      id: 'mudanca-incompativel',
      front: 'Dê um exemplo de mudança incompatível em um contrato de API.',
      back: 'Renomear ou remover um campo, mudar seu tipo ou tornar obrigatório algo que era opcional.',
    },
  ],
  mission: {
    title: 'Desenhe e teste o contrato da API de despesas',
    text: 'Use a stack que você está estudando: um framework como FastAPI, Express ou Spring se você está no backend ou fullstack, ou uma API de laboratório já pronta se você está na trilha de testes. O importante é ver cada resposta com seus próprios olhos.',
    steps: [
      'Escreva, num arquivo de texto ou OpenAPI, as rotas de listar, criar, buscar, alterar e apagar despesas, com os status de sucesso e de erro de cada uma',
      'Implemente ou suba a API e chame cada rota com `curl -i`, anotando status e corpo',
      'Provoque três erros: valor negativo, categoria inválida e um `id` que não existe; confira se a resposta aponta o campo e usa o status certo',
      'Liste com paginação e verifique a primeira página, a última e uma página além do fim',
      'Compare uma resposta da API com o registro correspondente no banco de dados e anote qualquer divergência de campo ou tipo',
    ],
  },
  sources: [
    {
      title: 'MDN: Métodos de requisição HTTP',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods',
    },
    {
      title: 'MDN: Códigos de status de respostas HTTP',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status',
    },
    {
      title: 'OpenAPI Initiative: Getting Started',
      url: 'https://learn.openapis.org/',
    },
    {
      title: 'FastAPI: tutorial em português',
      url: 'https://fastapi.tiangolo.com/pt/tutorial/',
    },
  ],
};
