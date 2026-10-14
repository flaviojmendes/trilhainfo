import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'O carrinho que soma o total sozinho, o aviso de “senha fraca” que aparece enquanto você digita, o Pix que calcula o troco: tudo isso é JavaScript. Até aqui, suas páginas mostravam coisas; a partir de agora, elas vão fazer coisas. E a boa notícia é que programar começa com ideias que você já usa no dia a dia: guardar um valor, fazer uma conta, comparar dois números.',
  sections: [
    {
      id: 'o-que-e-programar',
      title: 'O que é programar',
      blocks: [
        {
          type: 'analogy',
          title: 'Uma receita para alguém muito obediente',
          text: 'Uma receita de bolo diz “uma pitada de sal” e “asse até dourar”, e você entende. Agora imagine passar a receita para alguém que faz **exatamente** o que está escrito, na ordem escrita, e não adivinha nada. Se faltar “desligue o forno”, o forno fica ligado. Esse alguém é o computador.',
        },
        {
          type: 'text',
          text: '**Programar** é escrever essas instruções numa língua que o computador entende. Cada instrução é uma linha, e o computador executa uma de cada vez, **de cima para baixo**. Um conjunto de instruções é um **programa**.',
        },
        {
          type: 'text',
          text: 'Você já conhece duas camadas de uma página: o HTML dá a **estrutura** e o CSS dá a **aparência**. O **JavaScript** é a terceira camada: o **comportamento**, o que acontece quando a pessoa clica, digita ou espera.',
        },
        {
          type: 'codeTabs',
          caption: 'Um botão de curtir nas três camadas',
          tabs: [
            {
              label: 'HTML: o que é',
              language: 'html',
              code: '<button id="curtir">Curtir</button>\n<p id="contagem">0 curtidas</p>',
            },
            {
              label: 'CSS: como parece',
              language: 'css',
              code: '#curtir {\n  background: #e11d48;\n  color: #ffffff;\n  border-radius: 999px;\n}',
            },
            {
              label: 'JavaScript: o que faz',
              language: 'javascript',
              code: 'let curtidas = 0;\n\n// A cada clique, soma 1 e atualiza o texto\ncurtidas = curtidas + 1;\nconsole.log(curtidas + " curtidas");',
            },
          ],
        },
        {
          type: 'classify',
          prompt: 'Qual camada cuida de cada parte da página?',
          buckets: ['HTML', 'CSS', 'JavaScript'],
          items: [
            { text: 'Dizer que um texto é um título', bucket: 0 },
            { text: 'Colocar um campo de e-mail no formulário', bucket: 0 },
            { text: 'Deixar o botão vermelho e arredondado', bucket: 1 },
            { text: 'Organizar os cards em três colunas', bucket: 1 },
            { text: 'Somar o total do carrinho quando um item entra', bucket: 2 },
            { text: 'Mostrar “senha fraca” enquanto a pessoa digita', bucket: 2 },
          ],
          explanation:
            'Uma boa pergunta para separar: “isso **é** alguma coisa, **parece** alguma coisa ou **faz** alguma coisa?”. Estrutura, aparência e comportamento.',
        },
      ],
    },
    {
      id: 'console',
      title: 'O console: a janela para ver o que o programa pensa',
      blocks: [
        {
          type: 'text',
          text: 'Um programa trabalha escondido. Para ver o que está acontecendo lá dentro, você pede para ele escrever no **console**, aquela aba das ferramentas de desenvolvimento que você abriu na aula do kit. O comando é `console.log()`: o que você colocar entre os parênteses aparece lá.',
        },
        {
          type: 'code',
          language: 'javascript',
          caption: 'Três instruções, executadas na ordem',
          code: '// Linhas que começam com // são comentários: o computador ignora\nconsole.log("Bom dia!");\nconsole.log(2 + 3);\nconsole.log("O ônibus passa às", 7, "horas");',
          output: 'Bom dia!\n5\nO ônibus passa às 7 horas',
        },
        {
          type: 'text',
          text: 'Repare: o texto `"Bom dia!"` está entre aspas e aparece igual. A conta `2 + 3` não tem aspas, então o computador **calcula** e mostra o resultado. Separando por vírgula, você mostra vários valores numa linha só.',
        },
        {
          type: 'quiz',
          question: 'O que aparece no console?',
          code: 'console.log("2 + 3");',
          language: 'javascript',
          options: [
            {
              text: '`5`',
              feedback:
                'Seria `5` sem as aspas. Com aspas, `"2 + 3"` é um texto, e o computador mostra o texto como ele é, sem fazer conta.',
            },
            {
              text: '`2 + 3`',
              correct: true,
              feedback: 'Isso. Tudo entre aspas é texto e aparece exatamente como foi escrito.',
            },
            {
              text: 'Um erro, porque não se pode escrever contas entre aspas',
              feedback:
                'Pode sim: entre aspas cabe qualquer texto, inclusive algo que parece uma conta. Ele só não é calculado.',
            },
          ],
        },
        {
          type: 'playground',
          title: 'Suas primeiras linhas de código',
          task: 'Este exercício só tem JavaScript: o que importa é o console. Escreva mais duas linhas com `console.log`: uma com o seu nome entre aspas e outra com a conta `7 * 8` (o `*` é a multiplicação), sem aspas.',
          js: 'console.log("Olá, Trilha Info");\n\n// Escreva suas linhas aqui embaixo\n',
          checks: [
            {
              label: 'O console mostra pelo menos três mensagens',
              test: 'return Array.isArray(window.__trilhaLogs) && window.__trilhaLogs.length >= 3;',
            },
            {
              label: 'Uma das mensagens é o resultado de `7 * 8`',
              test: "return Array.isArray(window.__trilhaLogs) && window.__trilhaLogs.includes('56');",
            },
          ],
          solution: {
            js: 'console.log("Olá, Trilha Info");\n\n// Escreva suas linhas aqui embaixo\nconsole.log("Ana");\nconsole.log(7 * 8);\n',
          },
        },
      ],
    },
    {
      id: 'tipos-de-valor',
      title: 'Os tipos de valor',
      blocks: [
        {
          type: 'text',
          text: 'Tudo que um programa manipula é um **valor**: um nome, um preço, uma resposta de sim ou não. Cada valor tem um **tipo**, e o tipo decide o que dá para fazer com ele. Você multiplica um preço, mas não multiplica um nome.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'string',
              text: 'Texto, sempre entre aspas: `"Ana"`, `"Rua das Flores, 10"`, `"42"`. Aspas duplas ou simples funcionam igual.',
            },
            {
              term: 'number',
              text: 'Número, sem aspas: `42`, `3.5`, `-10`. Atenção: a casa decimal usa **ponto**, não vírgula, como na calculadora do celular.',
            },
            {
              term: 'boolean',
              text: 'Só dois valores possíveis: `true` (verdadeiro) ou `false` (falso). É a resposta de perguntas como “a pessoa está logada?”.',
            },
            {
              term: 'undefined',
              text: 'Quer dizer “ainda não tem valor”. Aparece quando você cria algo e não coloca nada dentro.',
            },
            {
              term: 'null',
              text: 'Quer dizer “vazio de propósito”. Você usa quando quer dizer “não há valor aqui”, como um campo de apelido que a pessoa deixou em branco.',
            },
          ],
        },
        {
          type: 'classify',
          prompt: 'Qual é o tipo de cada valor?',
          buckets: ['string', 'number', 'boolean', 'null ou undefined'],
          items: [
            { text: '`"Ana"`', bucket: 0 },
            { text: '`"42"`', bucket: 0 },
            { text: '`"false"`', bucket: 0 },
            { text: '`42`', bucket: 1 },
            { text: '`3.5`', bucket: 1 },
            { text: '`true`', bucket: 2 },
            { text: '`null`', bucket: 3 },
            { text: '`undefined`', bucket: 3 },
          ],
          explanation:
            'As aspas mandam: `"42"` e `"false"` são textos, mesmo parecendo número e booleano. Essa diferença vai causar um erro famoso daqui a pouco.',
        },
        {
          type: 'text',
          text: 'Quando estiver em dúvida, pergunte ao próprio JavaScript com `typeof`: ele responde o tipo do valor, como texto.',
        },
        {
          type: 'code',
          language: 'javascript',
          code: 'console.log(typeof "Ana");\nconsole.log(typeof 42);\nconsole.log(typeof "42");\nconsole.log(typeof true);\nconsole.log(typeof undefined);',
          output: 'string\nnumber\nstring\nboolean\nundefined',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Uma esquisitice antiga',
          text: '`typeof null` responde `"object"`. É um erro da primeira versão do JavaScript, de 1995, que nunca foi corrigido para não quebrar sites antigos. Não é você que entendeu errado.',
        },
      ],
    },
    {
      id: 'variaveis',
      title: 'Variáveis: caixas com etiqueta',
      blocks: [
        {
          type: 'analogy',
          title: 'Os potes da cozinha',
          text: 'Na cozinha, você guarda o açúcar num pote e cola uma etiqueta “açúcar”. Depois, para fazer o café, não precisa lembrar onde ele está: você procura a etiqueta. Uma **variável** é isso: um espaço na memória do computador com um nome colado, onde você guarda um valor para usar depois.',
        },
        {
          type: 'anatomy',
          caption: 'Criar uma variável é chamado de **declarar**.',
          language: 'javascript',
          parts: [
            {
              text: 'let',
              label: 'Palavra-chave',
              note: 'Avisa ao JavaScript: “vou criar uma variável”. Pode ser `let` ou `const`, você vai ver a diferença já já.',
            },
            { text: ' ' },
            {
              text: 'saldo',
              label: 'Nome',
              note: 'A etiqueta do pote. É por esse nome que você vai usar o valor no resto do programa.',
            },
            { text: ' ' },
            {
              text: '=',
              label: 'Atribuição',
              note: 'Aqui `=` não é “igual” da matemática. Ele quer dizer “guarde o valor da direita no nome da esquerda”.',
            },
            { text: ' ' },
            {
              text: '50',
              label: 'Valor',
              note: 'O que vai dentro do pote. Pode ser um número, um texto, um booleano ou até uma conta, que é calculada antes de guardar.',
            },
            {
              text: ';',
              label: 'Fim da instrução',
              note: 'O ponto e vírgula fecha a instrução, como o ponto final de uma frase. Muitas vezes é opcional, mas é um bom hábito.',
            },
          ],
        },
        {
          type: 'trace',
          caption: 'Acompanhe a memória mudando. Use os controles para avançar linha a linha.',
          code: 'let saldo = 50;\nconst nome = "Ana";\nconsole.log(nome, saldo);\nsaldo = saldo - 12;\nconsole.log(saldo);\nsaldo = saldo + 30;\nconsole.log("Saldo final:", saldo);',
          steps: [
            {
              line: 1,
              note: 'O computador cria uma caixa chamada `saldo` e guarda `50` nela.',
              memory: [['saldo', '50']],
            },
            {
              line: 2,
              note: 'Outra caixa, `nome`, com o texto `"Ana"`. Agora há dois valores na memória.',
              memory: [
                ['saldo', '50'],
                ['nome', '"Ana"'],
              ],
            },
            {
              line: 3,
              note: 'Para mostrar, ele abre as caixas e lê o que tem dentro. A memória não muda.',
              output: 'Ana 50',
            },
            {
              line: 4,
              note: 'Primeiro o lado direito: ele lê `saldo` (50) e calcula `50 - 12`, que dá `38`. Só depois guarda o resultado de volta em `saldo`. O valor antigo é substituído.',
              memory: [
                ['saldo', '38'],
                ['nome', '"Ana"'],
              ],
            },
            {
              line: 5,
              note: 'Mostra o valor atual, não o original.',
              output: '38',
            },
            {
              line: 6,
              note: 'De novo: calcula `38 + 30` e guarda `68` em `saldo`. Mudar o valor de uma variável que já existe se chama **reatribuir**. Repare que aqui não tem `let`: a caixa já existe.',
              memory: [
                ['saldo', '68'],
                ['nome', '"Ana"'],
              ],
            },
            {
              line: 7,
              note: 'Um texto e o valor da caixa, lado a lado.',
              output: 'Saldo final: 68',
            },
          ],
        },
        {
          type: 'text',
          text: 'Existem duas palavras para declarar: `const` cria uma variável que **não pode** receber outro valor depois, e `let` cria uma que **pode**. A regra prática: comece com `const`. Troque para `let` só quando o valor realmente precisar mudar, como um saldo ou um contador.',
        },
        {
          type: 'quiz',
          question: 'O que acontece quando este código roda?',
          code: 'const preco = 10;\npreco = 12;\nconsole.log(preco);',
          language: 'javascript',
          options: [
            {
              text: 'Mostra `12`',
              feedback:
                'Com `let`, seria `12`. Mas `const` não aceita receber outro valor: o programa para na linha 2.',
            },
            {
              text: 'Mostra `10`, porque o `const` ignora a mudança',
              feedback:
                'O JavaScript não ignora em silêncio: ele avisa com um erro. Isso é bom, porque você descobre o problema na hora.',
            },
            {
              text: 'Dá erro: `TypeError: Assignment to constant variable.`',
              correct: true,
              feedback:
                'Isso. A mensagem diz “atribuição a uma variável constante”. Se o preço precisa mudar, declare com `let preco = 10;`.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Nomes de variáveis têm regras. Podem ter letras, números, `_` e `$`, mas **não podem começar com número**, não podem ter espaço nem hífen, e não podem ser palavras reservadas como `let` e `const`. Para juntar palavras, o costume é o **camelCase**: a primeira minúscula e as seguintes com inicial maiúscula, como `precoTotal`.',
        },
        {
          type: 'classify',
          prompt: 'Quais destes nomes de variável o JavaScript aceita?',
          buckets: ['Nome válido', 'Nome inválido'],
          items: [
            { text: '`precoTotal`', bucket: 0 },
            { text: '`_contador`', bucket: 0 },
            { text: '`nomeCliente2`', bucket: 0 },
            { text: '`idadeDaPessoa`', bucket: 0 },
            { text: '`2lugar`', bucket: 1 },
            { text: '`nome completo`', bucket: 1 },
            { text: '`total-geral`', bucket: 1 },
            { text: '`const`', bucket: 1 },
          ],
          explanation:
            '`2lugar` começa com número, `nome completo` tem espaço, `total-geral` seria lido como “total menos geral” e `const` é palavra reservada. Lembre também que maiúsculas importam: `nome` e `Nome` são duas variáveis diferentes.',
        },
      ],
    },
    {
      id: 'operacoes',
      title: 'Fazendo contas',
      blocks: [
        {
          type: 'table',
          caption: 'Os operadores matemáticos',
          head: ['Operador', 'Faz', 'Exemplo', 'Resultado'],
          rows: [
            ['`+`', 'Soma', '`8 + 2`', '`10`'],
            ['`-`', 'Subtração', '`8 - 2`', '`6`'],
            ['`*`', 'Multiplicação', '`8 * 2`', '`16`'],
            ['`/`', 'Divisão', '`8 / 2`', '`4`'],
            ['`%`', 'Resto da divisão', '`8 % 3`', '`2`'],
          ],
        },
        {
          type: 'analogy',
          title: 'O resto é o que sobra',
          text: 'Dez pães de queijo para três pessoas: cada uma come três e **sobra um**. Em JavaScript, `10 % 3` dá `1`. Parece estranho no começo, mas serve muito: um número é par quando `numero % 2` dá `0`.',
        },
        {
          type: 'text',
          text: 'A ordem das contas é a mesma da escola: multiplicação e divisão vêm antes de soma e subtração. Os parênteses mudam a ordem.',
        },
        {
          type: 'quiz',
          question: 'Qual valor aparece no console?',
          code: 'console.log(2 + 3 * 4);',
          language: 'javascript',
          options: [
            {
              text: '`20`',
              feedback:
                'Isso seria `(2 + 3) * 4`. Sem parênteses, a multiplicação vem primeiro: `3 * 4` é `12`, mais `2`.',
            },
            {
              text: '`14`',
              correct: true,
              feedback:
                'Certo. Primeiro `3 * 4 = 12`, depois `2 + 12 = 14`. Na dúvida, use parênteses: eles também deixam o código mais fácil de ler.',
            },
            {
              text: '`234`',
              feedback:
                'Isso seria juntar textos. Aqui são números, então o computador faz as contas.',
            },
          ],
        },
        {
          type: 'trace',
          caption: 'Na padaria: quanto volta de troco?',
          code: 'const precoPao = 0.75;\nconst quantidade = 8;\nconst total = precoPao * quantidade;\nconst pago = 10;\nconst troco = pago - total;\nconsole.log("Troco:", troco);',
          steps: [
            {
              line: 1,
              note: 'Guarda o preço de um pão. Repare no ponto como separador decimal.',
              memory: [['precoPao', '0.75']],
            },
            {
              line: 2,
              note: 'Guarda quantos pães a pessoa levou.',
              memory: [
                ['precoPao', '0.75'],
                ['quantidade', '8'],
              ],
            },
            {
              line: 3,
              note: 'Lê as duas caixas, calcula `0.75 * 8` e guarda o resultado, `6`, numa caixa nova. A conta acontece **uma vez**, aqui.',
              memory: [
                ['precoPao', '0.75'],
                ['quantidade', '8'],
                ['total', '6'],
              ],
            },
            {
              line: 4,
              note: 'A pessoa pagou com uma nota de 10.',
              memory: [
                ['precoPao', '0.75'],
                ['quantidade', '8'],
                ['total', '6'],
                ['pago', '10'],
              ],
            },
            {
              line: 5,
              note: 'Calcula `10 - 6` e guarda `4` em `troco`. Usar variáveis com bons nomes faz o código se explicar sozinho.',
              memory: [
                ['precoPao', '0.75'],
                ['quantidade', '8'],
                ['total', '6'],
                ['pago', '10'],
                ['troco', '4'],
              ],
            },
            {
              line: 6,
              note: 'Mostra o texto e o valor de `troco`.',
              output: 'Troco: 4',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'A armadilha do `+` com texto',
          text: 'O `+` tem dois trabalhos: com dois números, ele soma; se **um dos lados é texto**, ele junta os dois como texto. Isso se chama **concatenar**. Valores digitados em formulários chegam como texto, então essa armadilha aparece muito.',
        },
        {
          type: 'quiz',
          question: 'O que aparece no console?',
          code: 'const quantidade = "2";\nconsole.log(quantidade + 2);',
          language: 'javascript',
          options: [
            {
              text: '`4`',
              feedback:
                'Seria `4` se `quantidade` fosse o número `2`. Mas ela é o texto `"2"`, e texto mais qualquer coisa vira texto.',
            },
            {
              text: '`22`',
              correct: true,
              feedback:
                'Isso. O `+` juntou `"2"` com `2` e formou o texto `"22"`. Para somar, converta antes: `Number(quantidade) + 2` dá `4`.',
            },
            {
              text: 'Um erro, porque não dá para somar texto com número',
              feedback:
                'O JavaScript não reclama: ele converte o número em texto e junta. Por isso o erro passa despercebido.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Para montar frases com valores, existe um jeito mais legível que ficar juntando com `+`: o **template literal**. Você escreve o texto entre **crases**, o acento grave do teclado, no lugar das aspas, e coloca cada valor dentro de `${ }`.',
        },
        {
          type: 'code',
          language: 'javascript',
          code: 'const nome = "Bia";\nconst pontos = 30;\nconsole.log("Olá, " + nome + "! Você tem " + pontos + " pontos.");\nconsole.log(`Olá, ${nome}! Você tem ${pontos} pontos.`);',
          output: 'Olá, Bia! Você tem 30 pontos.\nOlá, Bia! Você tem 30 pontos.',
        },
        {
          type: 'fill',
          prompt:
            'Complete o template literal para mostrar `O café custa R$ 18`, usando as variáveis.',
          language: 'javascript',
          template:
            'const produto = "café";\nconst preco = 18;\nconsole.log(`O [[${produto}]] custa R$ [[${preco}]]`);',
          explanation:
            'Dentro das crases, tudo é texto, menos o que está em `${ }`: ali o JavaScript coloca o valor da variável. Sem o `$` e as chaves, apareceria a palavra “produto”.',
        },
      ],
    },
    {
      id: 'comparacoes',
      title: 'Comparar valores',
      blocks: [
        {
          type: 'text',
          text: 'Programas vivem fazendo perguntas: o saldo dá? A senha tem 8 caracteres? A resposta de uma comparação é sempre um **boolean**: `true` ou `false`.',
        },
        {
          type: 'table',
          caption: 'Operadores de comparação',
          head: ['Operador', 'Pergunta', 'Exemplo', 'Resultado'],
          rows: [
            ['`===`', 'É igual, com o mesmo tipo?', '`5 === 5`', '`true`'],
            ['`!==`', 'É diferente?', '`5 !== 3`', '`true`'],
            ['`>`', 'É maior?', '`10 > 12`', '`false`'],
            ['`<`', 'É menor?', '`10 < 12`', '`true`'],
            ['`>=`', 'É maior ou igual?', '`18 >= 18`', '`true`'],
            ['`<=`', 'É menor ou igual?', '`7 <= 6`', '`false`'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Três sinais de igual',
          text: 'Um `=` guarda um valor. Três, `===`, comparam. Existe também o `==`, com dois, que tenta converter os tipos antes de comparar: `"5" == 5` dá `true`. Isso esconde erros, então use sempre `===` e `!==`.',
        },
        {
          type: 'quiz',
          question: 'O que aparece no console?',
          code: 'const idadeDigitada = "18";\nconsole.log(idadeDigitada === 18);',
          language: 'javascript',
          options: [
            {
              text: '`true`',
              feedback:
                'Os dois parecem 18, mas um é texto e o outro é número. O `===` confere o tipo também, então eles não são iguais.',
            },
            {
              text: '`false`',
              correct: true,
              feedback:
                'Certo. `"18"` é string e `18` é number. É exatamente o caso de um valor que veio de um campo de formulário: converta com `Number()` antes de comparar.',
            },
            {
              text: '`"18"`',
              feedback:
                'Uma comparação nunca devolve o valor comparado: ela responde sempre `true` ou `false`.',
            },
          ],
        },
        {
          type: 'playground',
          title: 'O total com desconto',
          task: 'Uma papelaria vende 4 cadernos de R$ 15 com 10% de desconto. Crie as variáveis `subtotal` (preço vezes quantidade), `desconto` (`subtotal * percentualDesconto / 100`) e `total` (subtotal menos desconto). Depois mostre no console uma frase com o total, por exemplo `Total: R$ 54`.',
          js: 'const precoCaderno = 15;\nconst quantidade = 4;\nconst percentualDesconto = 10;\n\n// 1. Crie a variável subtotal\n\n// 2. Crie a variável desconto\n\n// 3. Crie a variável total\n\n// 4. Mostre o total no console\n',
          checks: [
            {
              label: '`subtotal` vale `60`',
              test: "try {\n  return typeof subtotal !== 'undefined' && subtotal === 60;\n} catch (e) {\n  return false;\n}",
            },
            {
              label: '`desconto` vale `6`',
              test: "try {\n  return typeof desconto === 'number' && Math.abs(desconto - 6) < 0.001;\n} catch (e) {\n  return false;\n}",
            },
            {
              label: '`total` vale `54`',
              test: "try {\n  return typeof total === 'number' && Math.abs(total - 54) < 0.001;\n} catch (e) {\n  return false;\n}",
            },
            {
              label: 'O console mostra uma mensagem com o total',
              test: 'return Array.isArray(window.__trilhaLogs) && window.__trilhaLogs.some((linha) => /54|53\\.99/.test(linha));',
            },
          ],
          solution: {
            js: 'const precoCaderno = 15;\nconst quantidade = 4;\nconst percentualDesconto = 10;\n\nconst subtotal = precoCaderno * quantidade;\nconst desconto = (subtotal * percentualDesconto) / 100;\nconst total = subtotal - desconto;\n\nconsole.log(`Total: R$ ${total}`);\n',
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Quando der erro, leia a mensagem',
          text: 'Os tropeços mais comuns do começo: esquecer as aspas de um texto (`ReferenceError: Ana is not defined`), escrever `Nome` em vez de `nome`, usar vírgula como decimal (`3,5`) e somar um número com um texto. O console diz a linha e o motivo: ele é seu aliado, não um castigo.',
        },
      ],
    },
  ],
  recap: [
    'Um programa é uma lista de instruções executadas de cima para baixo; o JavaScript é a camada de comportamento da página.',
    '`console.log()` mostra valores no console, e é a forma mais simples de ver o que o programa está fazendo.',
    'Os tipos básicos são string, number, boolean, null e undefined; aspas fazem qualquer coisa virar texto.',
    'Variáveis guardam valores com um nome: use `const` por padrão e `let` quando o valor precisa mudar.',
    'O `+` com texto concatena em vez de somar, e para comparar use sempre `===` e `!==`, que conferem também o tipo.',
  ],
  cards: [
    {
      id: 'console-log',
      front: 'Para que serve `console.log()`?',
      back: 'Para mostrar no console o valor do que está entre os parênteses, e assim ver o que o programa está fazendo.',
    },
    {
      id: 'tipos-basicos',
      front: 'Quais são os cinco tipos básicos vistos nesta aula?',
      back: 'string (texto), number (número), boolean (`true` ou `false`), undefined (ainda sem valor) e null (vazio de propósito).',
    },
    {
      id: 'const-ou-let',
      front: 'Quando usar `const` e quando usar `let`?',
      back: '`const` por padrão. `let` só quando o valor precisa mudar depois, como um contador ou um saldo.',
    },
    {
      id: 'atribuicao',
      front: 'O que significa o `=` em `saldo = saldo - 12`?',
      back: 'Calcule o lado direito e guarde o resultado na variável da esquerda. Não é o “igual” da matemática.',
    },
    {
      id: 'texto-mais-numero',
      front: 'Quanto dá `"2" + 2` em JavaScript?',
      back: 'O texto `"22"`. Se um dos lados é texto, o `+` junta em vez de somar.',
    },
    {
      id: 'resto',
      front: 'O que o operador `%` calcula?',
      back: 'O resto da divisão. `10 % 3` dá `1`; um número é par quando `numero % 2` dá `0`.',
    },
    {
      id: 'tres-iguais',
      front: 'Por que preferir `===` a `==`?',
      back: 'Porque `===` compara valor e tipo. `==` converte antes e faz `"5" == 5` dar `true`, escondendo erros.',
    },
  ],
  mission: {
    title: 'Sua lista de compras no console',
    text: 'Abra o console do navegador numa aba vazia (digite `about:blank` na barra de endereço) e transforme uma compra real sua em código. Escreva uma linha por vez e aperte Enter para ver o resultado.',
    steps: [
      'Crie uma variável com `const` para o preço de três itens da sua lista, como arroz, feijão e café',
      'Calcule o total numa nova variável e mostre com um template literal: `Total: R$ ...`',
      'Crie um `let` para o dinheiro que você tem, desconte o total e mostre quanto sobra',
      'Tente mudar o valor de uma variável `const` e leia com calma a mensagem de erro',
      'Use `typeof` em cada variável e confira se os tipos são os que você esperava',
    ],
  },
  sources: [
    {
      title: 'MDN: Primeiros passos com JavaScript',
      url: 'https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/First_steps',
    },
    {
      title: 'MDN: Sintaxe e tipos',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Grammar_and_types',
    },
    {
      title: 'javascript.info: Variables',
      url: 'https://javascript.info/variables',
    },
    {
      title: 'javascript.info: Data types',
      url: 'https://javascript.info/types',
    },
  ],
};
