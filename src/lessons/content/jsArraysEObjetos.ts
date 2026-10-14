import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Uma loja virtual não tem um produto: tem centenas. Um aplicativo de ônibus não mostra um horário: mostra a lista inteira, cada um com linha, destino e hora. Para guardar muitos valores e descrever coisas do mundo real, o JavaScript tem duas ferramentas, os **arrays** e os **objetos**. Com elas, e com três métodos que você vai aprender aqui, você monta o coração de um catálogo com busca e filtros.',
  sections: [
    {
      id: 'arrays',
      title: 'Arrays: a lista de compras',
      blocks: [
        {
          type: 'analogy',
          title: 'A lista na porta da geladeira',
          text: 'Você não cria um papel para cada item do mercado: escreve todos numa lista só, um embaixo do outro. Dá para ler o primeiro, acrescentar um no fim, riscar um do meio. Um **array** é uma lista de valores guardada numa única variável, com uma ordem.',
        },
        {
          type: 'text',
          text: 'Um array se escreve entre colchetes `[ ]`, com os itens separados por vírgula. Cada item tem uma posição numerada, o **índice**. E aqui vem a primeira surpresa: a contagem começa do **zero**.',
        },
        {
          type: 'anatomy',
          caption: 'Os índices de um array',
          language: 'javascript',
          parts: [
            { text: 'const compras = [' },
            {
              text: '"pão"',
              label: 'Índice 0',
              note: 'O primeiro item fica no índice `0`. Para ler: `compras[0]`. Pense no índice como “quantos passos andar a partir do começo”: para o primeiro, zero passos.',
            },
            { text: ', ' },
            {
              text: '"leite"',
              label: 'Índice 1',
              note: 'O segundo item: `compras[1]`.',
            },
            { text: ', ' },
            {
              text: '"café"',
              label: 'Índice 2',
              note: 'O terceiro e último: `compras[2]`. O array tem 3 itens, mas o último índice é 2. É sempre o tamanho menos um.',
            },
            { text: '];' },
          ],
        },
        {
          type: 'terms',
          items: [
            {
              term: '`lista.length`',
              text: 'Quantos itens a lista tem. Para `compras`, é `3`.',
            },
            {
              term: '`lista[lista.length - 1]`',
              text: 'O último item, qualquer que seja o tamanho da lista.',
            },
            {
              term: '`lista.push(item)`',
              text: 'Acrescenta um item no fim da lista, como escrever mais uma linha no papel.',
            },
            {
              term: '`lista[1] = "novo"`',
              text: 'Troca o item de uma posição.',
            },
          ],
        },
        {
          type: 'trace',
          caption: 'Acompanhe a lista crescendo e mudando.',
          code: 'const compras = ["pão", "leite"];\nconsole.log(compras[0]);\ncompras.push("café");\nconsole.log(compras.length);\nconsole.log(compras[compras.length - 1]);\ncompras[1] = "leite sem lactose";\nconsole.log(compras);',
          steps: [
            {
              line: 1,
              note: 'Cria uma lista com dois itens: `"pão"` no índice 0 e `"leite"` no índice 1.',
              memory: [['compras', '["pão", "leite"]']],
            },
            {
              line: 2,
              note: 'Lê o item do índice 0: o primeiro.',
              output: 'pão',
            },
            {
              line: 3,
              note: '`push` coloca `"café"` no fim. Ele ganha o índice 2.',
              memory: [['compras', '["pão", "leite", "café"]']],
            },
            {
              line: 4,
              note: 'Agora a lista tem três itens.',
              output: '3',
            },
            {
              line: 5,
              note: 'Primeiro calcula o índice: `3 - 1` dá `2`. Depois lê `compras[2]`.',
              output: 'café',
            },
            {
              line: 6,
              note: 'Troca o item do índice 1. Os outros continuam onde estavam.',
              memory: [['compras', '["pão", "leite sem lactose", "café"]']],
            },
            {
              line: 7,
              note: 'Mostra a lista inteira.',
              output: '["pão", "leite sem lactose", "café"]',
            },
          ],
        },
        {
          type: 'quiz',
          question: 'O que aparece no console?',
          code: 'const compras = ["pão", "leite", "café"];\nconsole.log(compras[3]);',
          language: 'javascript',
          options: [
            {
              text: '`café`',
              feedback:
                '`"café"` é o terceiro item, mas o índice dele é `2`, porque a contagem começa do zero.',
            },
            {
              text: '`undefined`',
              correct: true,
              feedback:
                'Isso. Não existe item no índice 3. O JavaScript não dá erro: devolve `undefined`, “não tem nada aqui”. Por isso o último item é `compras[compras.length - 1]`.',
            },
            {
              text: 'Um erro dizendo que o índice não existe',
              feedback:
                'Muitas linguagens fazem isso, mas o JavaScript não. Ele devolve `undefined` em silêncio, e o erro só aparece mais tarde, quando você tentar usar esse valor.',
            },
          ],
        },
      ],
    },
    {
      id: 'objetos',
      title: 'Objetos: a ficha de cadastro',
      blocks: [
        {
          type: 'analogy',
          title: 'A ficha do posto de saúde',
          text: 'Na ficha de cadastro, cada linha tem um **campo** impresso (“Nome”, “Idade”, “Bairro”) e o que foi preenchido ao lado. Você não procura “a terceira linha”: procura o campo pelo nome. Um **objeto** é uma ficha: um conjunto de pares de **chave** e **valor** que descrevem uma coisa.',
        },
        {
          type: 'code',
          language: 'javascript',
          caption:
            'Um objeto se escreve entre chaves `{ }`, com `chave: valor` separados por vírgula.',
          code: 'const pessoa = {\n  nome: "Joana",\n  idade: 34,\n  bairro: "Boa Vista",\n  temCadastro: true,\n};\n\nconsole.log(pessoa.nome);\nconsole.log(pessoa.idade + 1);',
          output: 'Joana\n35',
        },
        {
          type: 'text',
          text: 'Para ler um valor, use o nome do objeto, um ponto e a chave: `pessoa.nome`. Isso se chama **notação de ponto**. Cada par chave e valor também é chamado de **propriedade**. Os valores podem ser de qualquer tipo, inclusive arrays e outros objetos.',
        },
        {
          type: 'code',
          language: 'javascript',
          caption: 'Mudar e acrescentar propriedades',
          code: 'pessoa.bairro = "Centro";\npessoa.telefone = "(81) 99999-0000";\n\nconsole.log(pessoa);',
          output:
            '{ nome: "Joana", idade: 34, bairro: "Centro", temCadastro: true, telefone: "(81) 99999-0000" }',
        },
        {
          type: 'quiz',
          question: 'O que aparece no console?',
          code: 'const pessoa = { nome: "Joana", idade: 34 };\nconsole.log(pessoa.Idade);',
          language: 'javascript',
          options: [
            {
              text: '`34`',
              feedback:
                'A chave é `idade`, com i minúsculo. Para o JavaScript, `Idade` é outra chave, que não existe neste objeto.',
            },
            {
              text: '`undefined`',
              correct: true,
              feedback:
                'Isso. Maiúsculas importam, e uma chave que não existe devolve `undefined`, sem erro. Quando um valor “sumiu”, confira a grafia da chave primeiro.',
            },
            {
              text: 'Um erro, porque `Idade` não existe',
              feedback:
                'Ler uma chave inexistente não é erro em JavaScript: o resultado é `undefined`.',
            },
          ],
        },
        {
          type: 'fill',
          prompt:
            'Complete o objeto: crie a chave `ano` com o valor 1960, mostre a autora no console e marque o livro como emprestado (verdadeiro).',
          language: 'javascript',
          template:
            'const livro = {\n  titulo: "Quarto de Despejo",\n  autora: "Carolina Maria de Jesus",\n  [[ano]]: 1960,\n};\n\nconsole.log(livro.[[autora]]);\nlivro.emprestado = [[true]];',
          explanation:
            'A chave vem antes dos dois-pontos, sem aspas. Para ler, use a notação de ponto. E “verdadeiro” em JavaScript é o boolean `true`, sem aspas: com aspas, seria o texto `"true"`.',
        },
      ],
    },
    {
      id: 'catalogo',
      title: 'Um catálogo: listas de objetos',
      blocks: [
        {
          type: 'text',
          text: 'Arrays e objetos ficam poderosos juntos. Um catálogo de loja é um **array de objetos**: uma lista em que cada item é a ficha de um produto. É exatamente o formato que você vai receber de uma API mais adiante na trilha.',
        },
        {
          type: 'code',
          language: 'javascript',
          code: 'const produtos = [\n  { id: 1, nome: "Caderno", preco: 15, emEstoque: true },\n  { id: 2, nome: "Mochila", preco: 120, emEstoque: false },\n  { id: 3, nome: "Caneta", preco: 3, emEstoque: true },\n];\n\nconsole.log(produtos.length);\nconsole.log(produtos[0].nome);',
          output: '3\nCaderno',
          caption:
            'Primeiro o índice, para escolher o produto; depois o ponto, para escolher o campo.',
        },
        {
          type: 'quiz',
          question: 'Com o catálogo acima, o que mostra `console.log(produtos[1].preco)`?',
          options: [
            {
              text: '`15`',
              feedback:
                '`15` é o preço do Caderno, que está no índice `0`. O índice `1` é o segundo produto.',
            },
            {
              text: '`120`',
              correct: true,
              feedback:
                'Certo. `produtos[1]` é a ficha da Mochila, e `.preco` lê o campo de preço dela.',
            },
            {
              text: '`undefined`',
              feedback:
                'Existem três produtos, então o índice `1` existe. `undefined` apareceria com `produtos[3]`.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Quase tudo que um catálogo faz é uma de três operações sobre a lista: **transformar** cada item, **filtrar** alguns itens ou **encontrar** um item. Os arrays têm um método pronto para cada uma: `map`, `filter` e `find`. Os três recebem uma função, geralmente uma arrow function, que é aplicada a cada item.',
        },
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              label: 'Transformar',
              title: '`map`: a máquina de suco',
              text: 'Entra laranja, sai suco. Cada item passa pela função e vira outra coisa. A lista nova tem **o mesmo tamanho**.',
              code: 'produtos.map((p) => p.nome)\n// ["Caderno", "Mochila", "Caneta"]',
            },
            {
              label: 'Filtrar',
              title: '`filter`: a peneira',
              text: 'Só passa o que atende à condição. A função responde `true` (fica) ou `false` (sai). A lista nova pode ser **menor**.',
              code: 'produtos.filter((p) => p.emEstoque)\n// Caderno e Caneta',
            },
            {
              label: 'Encontrar',
              title: '`find`: os achados e perdidos',
              text: 'Procura item por item e para no **primeiro** que bate. Devolve o próprio item, não uma lista.',
              code: 'produtos.find((p) => p.id === 2)\n// { id: 2, nome: "Mochila", ... }',
            },
          ],
        },
        {
          type: 'trace',
          caption: 'Por dentro do `filter`: a função é chamada uma vez para cada preço.',
          code: 'const precos = [12, 45, 8, 30];\nconst baratos = precos.filter((preco) => preco < 20);\nconsole.log(baratos);',
          steps: [
            {
              line: 1,
              note: 'Uma lista com quatro preços.',
              memory: [['precos', '[12, 45, 8, 30]']],
            },
            {
              line: 2,
              note: 'O `filter` começa pelo primeiro item: chama a função com `preco` valendo `12`. `12 < 20` é `true`, então o 12 **fica**.',
              memory: [
                ['precos', '[12, 45, 8, 30]'],
                ['preco', '12'],
                ['separados', '[12]'],
              ],
            },
            {
              line: 2,
              note: 'Próximo item: `45 < 20` é `false`. O 45 fica de fora.',
              memory: [
                ['precos', '[12, 45, 8, 30]'],
                ['preco', '45'],
                ['separados', '[12]'],
              ],
            },
            {
              line: 2,
              note: '`8 < 20` é `true`: o 8 entra na lista nova.',
              memory: [
                ['precos', '[12, 45, 8, 30]'],
                ['preco', '8'],
                ['separados', '[12, 8]'],
              ],
            },
            {
              line: 2,
              note: '`30 < 20` é `false`: fica de fora. Acabaram os itens.',
              memory: [
                ['precos', '[12, 45, 8, 30]'],
                ['preco', '30'],
                ['separados', '[12, 8]'],
              ],
            },
            {
              line: 2,
              note: 'O `filter` devolve a lista nova, que é guardada em `baratos`. Repare que `precos` **não mudou**: os três métodos criam um resultado novo sem mexer no original.',
              memory: [
                ['precos', '[12, 45, 8, 30]'],
                ['baratos', '[12, 8]'],
              ],
            },
            {
              line: 3,
              note: 'Mostra a lista filtrada.',
              output: '[12, 8]',
            },
          ],
        },
        {
          type: 'classify',
          prompt: 'Qual método resolve cada tarefa do catálogo?',
          buckets: ['map', 'filter', 'find'],
          items: [
            { text: 'Pegar só os nomes dos produtos para montar um menu', bucket: 0 },
            { text: 'Aplicar 10% de desconto no preço de todos os produtos', bucket: 0 },
            { text: 'Mostrar só os produtos em estoque', bucket: 1 },
            { text: 'Listar os produtos da categoria “papelaria”', bucket: 1 },
            { text: 'Abrir a página do produto de id 7', bucket: 2 },
            { text: 'Achar o primeiro pedido que ainda não foi pago', bucket: 2 },
          ],
          explanation:
            'Pergunte: quero **um item para cada item** (map), **alguns itens** (filter) ou **um item só** (find)?',
        },
        {
          type: 'quiz',
          question: 'Nenhum produto custa mais de R$ 500. O que aparece no console?',
          code: 'const caro = produtos.find((p) => p.preco > 500);\nconst caros = produtos.filter((p) => p.preco > 500);\nconsole.log(caro);\nconsole.log(caros);',
          language: 'javascript',
          options: [
            {
              text: '`undefined` e depois `[]`',
              correct: true,
              feedback:
                'Isso. `find` não achou ninguém e devolve `undefined`. `filter` sempre devolve uma lista, que aqui ficou vazia. Sua tela precisa tratar os dois casos, como “produto não encontrado” e “nenhum resultado”.',
            },
            {
              text: '`[]` e depois `[]`',
              feedback:
                '`find` nunca devolve lista: ele devolve um item ou, se não achar, `undefined`.',
            },
            {
              text: 'Um erro, porque nenhum produto atende à condição',
              feedback:
                'Não encontrar nada é um resultado normal, não um erro. Os dois métodos terminam sem problemas.',
            },
          ],
        },
      ],
    },
    {
      id: 'referencias',
      title: 'Referências: duas etiquetas, a mesma caixa',
      blocks: [
        {
          type: 'analogy',
          title: 'O documento compartilhado',
          text: 'Quando você manda o link de um documento compartilhado, a outra pessoa não recebe uma cópia: recebe o caminho para **o mesmo documento**. Se ela escrever nele, você vê a mudança. Arrays e objetos funcionam assim: a variável guarda uma **referência**, o caminho até a lista, e não a lista em si.',
        },
        {
          type: 'quiz',
          question: 'O que aparece no console?',
          code: 'const original = ["arroz", "feijão"];\nconst outra = original;\noutra.push("farofa");\nconsole.log(original);',
          language: 'javascript',
          options: [
            {
              text: '`["arroz", "feijão"]`',
              feedback:
                'Parece que `outra` é uma cópia, mas o `=` copiou só a referência. As duas variáveis apontam para a mesma lista.',
            },
            {
              text: '`["arroz", "feijão", "farofa"]`',
              correct: true,
              feedback:
                'Exato. `original` e `outra` são duas etiquetas na mesma caixa. Mexer por uma é mexer pela outra.',
            },
            {
              text: 'Um erro, porque `original` foi declarada com `const`',
              feedback:
                'O `push` não troca a variável, muda o conteúdo da lista. Isso é permitido mesmo com `const`.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Isso explica outra dúvida comum: um array declarado com `const` pode receber `push`. O `const` só proíbe trocar **qual** lista a variável guarda, como `compras = []`. O conteúdo da lista pode mudar.',
        },
        {
          type: 'text',
          text: 'Para fazer uma cópia de verdade, use o **spread** (espalhar), os três pontos `...`: eles espalham os itens dentro de uma lista ou objeto novo.',
        },
        {
          type: 'code',
          language: 'javascript',
          code: 'const original = ["arroz", "feijão"];\nconst copia = [...original];\ncopia.push("farofa");\n\nconsole.log(original);\nconsole.log(copia);\n\nconst pessoa = { nome: "Joana", idade: 34 };\nconst atualizada = { ...pessoa, idade: 35 };\nconsole.log(pessoa.idade, atualizada.idade);',
          output: '["arroz", "feijão"]\n["arroz", "feijão", "farofa"]\n34 35',
          caption: 'Com spread, a lista e o objeto originais ficam intactos.',
        },
        {
          type: 'reveal',
          question: 'Por que `[1, 2] === [1, 2]` dá `false`, se as duas listas são iguais?',
          answer:
            'Porque o `===` com arrays e objetos compara a referência, não o conteúdo. São duas listas diferentes que só por acaso têm os mesmos itens, como duas cópias impressas do mesmo texto. Para comparar produtos, compare um campo, como o `id`.',
        },
      ],
    },
    {
      id: 'json',
      title: 'JSON: dados que viajam como texto',
      blocks: [
        {
          type: 'text',
          text: 'Na primeira aula você viu que o servidor responde com texto. Quando a resposta são dados, e não uma página, o formato quase sempre é o **JSON** (Notação de Objetos JavaScript). Ele é um texto escrito com a mesma cara de objetos e arrays, que qualquer linguagem consegue ler.',
        },
        {
          type: 'anatomy',
          caption: 'Um produto em JSON',
          language: 'json',
          parts: [
            { text: '{\n  ' },
            {
              text: '"nome"',
              label: 'Chave',
              note: 'Em JSON, as chaves **sempre** levam aspas duplas. Num objeto JavaScript elas são opcionais; aqui são obrigatórias.',
            },
            { text: ': ' },
            {
              text: '"Caderno"',
              label: 'Texto',
              note: 'Strings também só aceitam aspas duplas. Aspas simples tornam o JSON inválido.',
            },
            { text: ',\n  "preco": ' },
            {
              text: '15',
              label: 'Número',
              note: 'Números, `true`, `false` e `null` vão sem aspas, como no JavaScript.',
            },
            { text: ',\n  "cores": ' },
            {
              text: '["azul", "verde"]',
              label: 'Lista',
              note: 'Arrays e objetos podem ficar uns dentro dos outros, quantos níveis precisar.',
            },
            { text: '\n' },
            {
              text: '}',
              label: 'Sem vírgula no fim',
              note: 'Depois do último par não pode haver vírgula. Funções e `undefined` também não existem em JSON: só dados.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Dois comandos fazem a ponte. `JSON.parse(texto)` transforma o texto em objeto ou array, para você usar. `JSON.stringify(valor)` faz o caminho contrário: transforma em texto, para enviar ou guardar.',
        },
        {
          type: 'code',
          language: 'javascript',
          code: 'const recebido = \'{"nome": "Caderno", "preco": 15}\';\nconst produto = JSON.parse(recebido);\nconsole.log(produto.preco * 2);\n\nconst texto = JSON.stringify({ nome: "Caneta", preco: 3 });\nconsole.log(texto);',
          output: '30\n{"nome":"Caneta","preco":3}',
        },
        {
          type: 'quiz',
          question: 'O que aparece no console?',
          code: 'const texto = JSON.stringify({ nome: "Ana" });\nconsole.log(typeof texto);',
          language: 'javascript',
          options: [
            {
              text: '`object`',
              feedback:
                '`stringify` faz o contrário: ele pega o objeto e devolve um **texto** no formato JSON.',
            },
            {
              text: '`string`',
              correct: true,
              feedback:
                'Isso. O resultado é o texto `{"nome":"Ana"}`. Para ler `texto.nome`, seria preciso transformar de volta com `JSON.parse`.',
            },
            {
              text: '`json`',
              feedback:
                'Não existe um tipo `json` em JavaScript. JSON é um formato de texto, então o tipo é string.',
            },
          ],
        },
        {
          type: 'classify',
          prompt: 'Quais destes textos são JSON válido?',
          buckets: ['JSON válido', 'JSON inválido'],
          items: [
            { text: '`{"nome": "Ana"}`', bucket: 0 },
            { text: '`[1, 2, 3]`', bucket: 0 },
            { text: '`{"ativo": true, "apelido": null}`', bucket: 0 },
            { text: '`{nome: "Ana"}`', bucket: 1 },
            { text: "`{'nome': 'Ana'}`", bucket: 1 },
            { text: '`{"idade": 30,}`', bucket: 1 },
          ],
          explanation:
            'As regras que mais pegam: chaves e textos com aspas **duplas**, e nada de vírgula sobrando no fim. Quando `JSON.parse` encontra um texto assim, ele dá erro, e o console mostra a posição do problema.',
        },
      ],
    },
    {
      id: 'mao-na-massa',
      title: 'Mão na massa: o catálogo com busca',
      blocks: [
        {
          type: 'table',
          caption: 'Tropeços comuns com listas e objetos',
          head: ['Escrito assim', 'O que acontece', 'Corrija para'],
          rows: [
            ['`lista[lista.length]`', '`undefined`: passou do fim', '`lista[lista.length - 1]`'],
            [
              '`produtos.map((p) => { p.nome })`',
              'Lista de `undefined`: com chaves, precisa de `return`',
              '`produtos.map((p) => p.nome)`',
            ],
            [
              '`produtos.filter(...)` para achar um item',
              'Devolve uma lista, não o item',
              '`produtos.find(...)`',
            ],
            [
              '`p.id === "3"`',
              'Nunca encontra: texto não é igual a número',
              '`p.id === 3` ou `Number(texto)`',
            ],
            [
              '`const copia = original`',
              'Não copia: compartilha a mesma lista',
              '`const copia = [...original]`',
            ],
          ],
        },
        {
          type: 'playground',
          title: 'Filtrar, transformar e encontrar',
          task: 'Use o array `produtos` para criar três coisas: `baratos`, só com os produtos de preço até R$ 20 (use `filter`); `nomes`, só com os nomes de todos os produtos (use `map`); e a função `buscarPorId(id)`, que devolve o produto com aquele id (use `find`).',
          js: 'const produtos = [\n  { id: 1, nome: "Caderno", preco: 15, emEstoque: true },\n  { id: 2, nome: "Mochila", preco: 120, emEstoque: false },\n  { id: 3, nome: "Caneta", preco: 3, emEstoque: true },\n  { id: 4, nome: "Estojo", preco: 25, emEstoque: true },\n];\n\n// 1. Produtos com preço até 20\nconst baratos = [];\n\n// 2. Os nomes de todos os produtos\nconst nomes = [];\n\n// 3. O produto com o id recebido\nfunction buscarPorId(id) {\n}\n\nconsole.log(baratos);\nconsole.log(nomes);\nconsole.log(buscarPorId(3));\n',
          checks: [
            {
              label: '`baratos` tem só o Caderno e a Caneta',
              test: "try {\n  return typeof baratos !== 'undefined' && Array.isArray(baratos) && baratos.map((p) => p && p.id).join(',') === '1,3';\n} catch (e) {\n  return false;\n}",
            },
            {
              label: '`nomes` é `["Caderno", "Mochila", "Caneta", "Estojo"]`',
              test: "try {\n  return typeof nomes !== 'undefined' && JSON.stringify(nomes) === JSON.stringify(['Caderno', 'Mochila', 'Caneta', 'Estojo']);\n} catch (e) {\n  return false;\n}",
            },
            {
              label: '`buscarPorId(3)` devolve a Caneta e `buscarPorId(2)` devolve a Mochila',
              test: "try {\n  if (typeof buscarPorId !== 'function') return false;\n  const caneta = buscarPorId(3);\n  const mochila = buscarPorId(2);\n  return !!caneta && caneta.nome === 'Caneta' && !!mochila && mochila.nome === 'Mochila';\n} catch (e) {\n  return false;\n}",
            },
            {
              label:
                '`buscarPorId(99)` devolve `undefined`, e a lista original continua com 4 produtos',
              test: "try {\n  if (typeof buscarPorId !== 'function' || typeof produtos === 'undefined') return false;\n  return buscarPorId(1) !== undefined && buscarPorId(99) === undefined && produtos.length === 4;\n} catch (e) {\n  return false;\n}",
            },
          ],
          solution: {
            js: 'const produtos = [\n  { id: 1, nome: "Caderno", preco: 15, emEstoque: true },\n  { id: 2, nome: "Mochila", preco: 120, emEstoque: false },\n  { id: 3, nome: "Caneta", preco: 3, emEstoque: true },\n  { id: 4, nome: "Estojo", preco: 25, emEstoque: true },\n];\n\n// 1. Produtos com preço até 20\nconst baratos = produtos.filter((produto) => produto.preco <= 20);\n\n// 2. Os nomes de todos os produtos\nconst nomes = produtos.map((produto) => produto.nome);\n\n// 3. O produto com o id recebido\nfunction buscarPorId(id) {\n  return produtos.find((produto) => produto.id === id);\n}\n\nconsole.log(baratos);\nconsole.log(nomes);\nconsole.log(buscarPorId(3));\n',
          },
        },
      ],
    },
  ],
  recap: [
    'Um array guarda uma lista em ordem; o índice começa em 0, `length` diz o tamanho e `push` acrescenta no fim.',
    'Um objeto descreve uma coisa com pares de chave e valor, lidos com a notação de ponto, como `produto.preco`.',
    '`map` transforma cada item, `filter` fica só com alguns e `find` devolve o primeiro que bate, ou `undefined`.',
    'Variáveis guardam referências para arrays e objetos: `=` compartilha a mesma lista, e `[...lista]` faz uma cópia.',
    'JSON é texto com formato de objeto: `JSON.parse` lê esse texto e `JSON.stringify` transforma dados em texto.',
  ],
  cards: [
    {
      id: 'indice-zero',
      front: 'Em `["pão", "leite", "café"]`, qual o índice de `"café"`?',
      back: '`2`. A contagem começa do zero, então o último índice é sempre o tamanho menos um.',
    },
    {
      id: 'ultimo-item',
      front: 'Como ler o último item de qualquer array?',
      back: '`lista[lista.length - 1]`.',
    },
    {
      id: 'objeto-chave-valor',
      front: 'Como ler e mudar a propriedade `preco` do objeto `produto`?',
      back: 'Ler: `produto.preco`. Mudar: `produto.preco = 20;`.',
    },
    {
      id: 'map-filter-find',
      front: 'O que `map`, `filter` e `find` devolvem?',
      back: '`map`: uma lista do mesmo tamanho, transformada. `filter`: uma lista com os itens aprovados. `find`: um item só, ou `undefined`.',
    },
    {
      id: 'const-e-push',
      front: 'Um array declarado com `const` pode receber `push`?',
      back: 'Pode. `const` impede trocar a lista guardada na variável, não mudar o conteúdo dela.',
    },
    {
      id: 'copia-com-spread',
      front: 'Como copiar um array em vez de compartilhar a referência?',
      back: 'Com spread: `const copia = [...original];`. Para objetos: `{ ...objeto }`.',
    },
    {
      id: 'json-parse-stringify',
      front: 'Qual a diferença entre `JSON.parse` e `JSON.stringify`?',
      back: '`JSON.parse` transforma texto JSON em dados. `JSON.stringify` transforma dados em texto JSON.',
    },
  ],
  mission: {
    title: 'O motor do seu catálogo',
    text: 'O projeto desta etapa da trilha é uma lista com filtros e dados de uma API. Antes de ter a tela, monte a lógica no console do navegador ou num arquivo `.js`, com um tema que você goste: livros, receitas, jogos, produtos de uma loja do seu bairro.',
    steps: [
      'Crie um array com pelo menos seis objetos, cada um com `id`, `nome`, `categoria` e `preco`',
      'Use `filter` para mostrar só os itens de uma categoria e `map` para listar só os nomes',
      'Escreva `buscarPorId(id)` com `find` e teste com um id que existe e outro que não existe',
      'Faça uma busca por nome com `filter` e `includes`, ignorando maiúsculas com `toLowerCase()`',
      'Transforme a lista em texto com `JSON.stringify`, depois volte com `JSON.parse` e confira se nada se perdeu',
      'Peça a uma IA para escrever um filtro por faixa de preço e preveja o resultado antes de rodar o código dela',
    ],
  },
  sources: [
    {
      title: 'MDN: Array',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array',
    },
    {
      title: 'MDN: Trabalhando com JSON',
      url: 'https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Objects/JSON',
    },
    {
      title: 'javascript.info: Objects',
      url: 'https://javascript.info/object',
    },
    {
      title: 'javascript.info: Array methods',
      url: 'https://javascript.info/array-methods',
    },
  ],
};
