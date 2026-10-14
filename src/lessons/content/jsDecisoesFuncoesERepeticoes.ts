import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Na aula passada, seu programa seguia sempre em linha reta: guardava valores e fazia contas. Programas de verdade tomam decisões (“o saldo dá para pagar?”), reaproveitam passos (“calcule o frete deste CEP”) e repetem tarefas (“some o preço de cada item do carrinho”). Com três ferramentas, `if`, funções e laços, você passa a escrever programas que resolvem problemas de verdade.',
  sections: [
    {
      id: 'decisoes-com-if',
      title: 'Decidir um caminho com if',
      blocks: [
        {
          type: 'analogy',
          title: 'Se chover, levo guarda-chuva',
          text: 'Antes de sair, você pensa: “**se** estiver chovendo, levo o guarda-chuva; **senão**, levo os óculos de sol”. Você faz uma pergunta de sim ou não e, dependendo da resposta, segue um caminho ou outro. Nunca os dois. O `if` é essa frase em JavaScript.',
        },
        {
          type: 'anatomy',
          caption: 'Um `if` com `else`',
          language: 'javascript',
          parts: [
            {
              text: 'if',
              label: 'Se',
              note: 'A palavra `if` quer dizer “se”. Ela sempre vem acompanhada de uma condição entre parênteses.',
            },
            { text: ' (' },
            {
              text: 'saldo >= preco',
              label: 'Condição',
              note: 'Uma pergunta que vale `true` ou `false`. Normalmente é uma comparação, como as da aula anterior.',
            },
            { text: ') {\n' },
            {
              text: '  console.log("Pagamento aprovado");',
              label: 'Bloco do sim',
              note: 'Entre as chaves `{ }` ficam as instruções que só rodam quando a condição é verdadeira. O recuo de dois espaços não é obrigatório, mas mostra o que está dentro.',
            },
            { text: '\n} ' },
            {
              text: 'else',
              label: 'Senão',
              note: '`else` quer dizer “senão”. É opcional: sem ele, quando a condição é falsa, o programa simplesmente segue em frente.',
            },
            { text: ' {\n' },
            {
              text: '  console.log("Saldo insuficiente");',
              label: 'Bloco do não',
              note: 'Roda só quando a condição é falsa.',
            },
            { text: '\n}' },
          ],
        },
        {
          type: 'trace',
          caption: 'Siga o programa decidindo o que levar no passeio.',
          code: 'const temperatura = 31;\nif (temperatura > 28) {\n  console.log("Leve água e protetor solar");\n} else {\n  console.log("Leve um casaco");\n}\nconsole.log("Bom passeio!");',
          steps: [
            {
              line: 1,
              note: 'Guarda `31` na variável `temperatura`.',
              memory: [['temperatura', '31']],
            },
            {
              line: 2,
              note: 'Hora da pergunta: `31 > 28`? A resposta é `true`, então o computador entra no primeiro bloco.',
            },
            {
              line: 3,
              note: 'Executa o que está dentro do bloco do sim.',
              output: 'Leve água e protetor solar',
            },
            {
              line: 4,
              note: 'Chegou no `else`. Como a condição foi verdadeira, o bloco do não é **pulado inteiro**: a linha 5 nunca roda.',
            },
            {
              line: 7,
              note: 'Depois do `if`, o programa volta a seguir em linha reta. Esta linha roda sempre, qualquer que seja a temperatura.',
              output: 'Bom passeio!',
            },
          ],
        },
        {
          type: 'quiz',
          question: 'Agora a temperatura mudou. O que aparece primeiro no console?',
          code: 'const temperatura = 28;\nif (temperatura > 28) {\n  console.log("Leve água e protetor solar");\n} else {\n  console.log("Leve um casaco");\n}',
          language: 'javascript',
          options: [
            {
              text: '`Leve água e protetor solar`',
              feedback:
                '`28 > 28` é falso: 28 não é **maior** que 28. Para incluir o 28, a condição teria que ser `temperatura >= 28`.',
            },
            {
              text: '`Leve um casaco`',
              correct: true,
              feedback:
                'Isso. A condição é falsa, então só o bloco do `else` roda. Diferenças entre `>` e `>=` causam muitos erros: sempre teste o valor do limite.',
            },
            {
              text: 'As duas mensagens',
              feedback: 'Um `if` com `else` escolhe **um** caminho só. Nunca os dois.',
            },
          ],
        },
      ],
    },
    {
      id: 'combinando-condicoes',
      title: 'E, ou, não: juntar perguntas',
      blocks: [
        {
          type: 'text',
          text: 'Às vezes uma pergunta só não basta. Para entrar no ônibus, você precisa ter um cartão **e** ter saldo. Para pagar meia-entrada no cinema, basta ser estudante **ou** ter mais de 60 anos. O JavaScript tem três **operadores lógicos** para isso.',
        },
        {
          type: 'table',
          caption: 'Operadores lógicos',
          head: ['Operador', 'Lê-se', 'É verdadeiro quando…', 'Exemplo'],
          rows: [
            ['`&&`', 'e', 'os dois lados são verdadeiros', '`temCartao && temSaldo`'],
            ['`||`', 'ou', 'pelo menos um lado é verdadeiro', '`ehEstudante || idade >= 60`'],
            ['`!`', 'não', 'inverte: verdadeiro vira falso e vice-versa', '`!estaLogado`'],
          ],
        },
        {
          type: 'code',
          language: 'javascript',
          code: 'const ehEstudante = false;\nconst idade = 65;\n\nif (ehEstudante || idade >= 60) {\n  console.log("Meia-entrada");\n} else {\n  console.log("Inteira");\n}',
          output: 'Meia-entrada',
          caption: 'Não é estudante, mas tem mais de 60: com `||`, um lado verdadeiro basta.',
        },
        {
          type: 'classify',
          prompt:
            'Com `const idade = 17;` e `const temIngresso = true;`, cada expressão vale `true` ou `false`?',
          buckets: ['true', 'false'],
          items: [
            { text: '`idade >= 18 || temIngresso`', bucket: 0 },
            { text: '`idade < 18 && temIngresso`', bucket: 0 },
            { text: '`!(idade >= 18)`', bucket: 0 },
            { text: '`idade >= 18 && temIngresso`', bucket: 1 },
            { text: '`!temIngresso`', bucket: 1 },
            { text: '`idade !== 17 || !temIngresso`', bucket: 1 },
          ],
          explanation:
            'Resolva por partes: primeiro cada comparação vira `true` ou `false`, depois junte. `idade >= 18` é `false`, então com `&&` tudo fica falso, mas com `||` o `temIngresso` salva.',
        },
        {
          type: 'text',
          text: 'Quando há mais de dois caminhos, você encadeia com `else if` (“senão, se”). O computador testa as condições **de cima para baixo** e entra só na **primeira** verdadeira. As outras são puladas.',
        },
        {
          type: 'code',
          language: 'javascript',
          caption: 'O boletim escolar',
          code: 'const nota = 6.5;\n\nif (nota >= 9) {\n  console.log("Excelente");\n} else if (nota >= 7) {\n  console.log("Aprovado");\n} else if (nota >= 5) {\n  console.log("Recuperação");\n} else {\n  console.log("Reprovado");\n}',
          output: 'Recuperação',
        },
        {
          type: 'quiz',
          question: 'Se a nota fosse `9.5`, o que apareceria no console?',
          code: 'const nota = 9.5;\n\nif (nota >= 9) {\n  console.log("Excelente");\n} else if (nota >= 7) {\n  console.log("Aprovado");\n} else if (nota >= 5) {\n  console.log("Recuperação");\n} else {\n  console.log("Reprovado");\n}',
          language: 'javascript',
          options: [
            {
              text: '`Excelente`',
              correct: true,
              feedback:
                'Isso. A primeira condição já é verdadeira, então o computador entra nela e pula todo o resto da corrente.',
            },
            {
              text: '`Excelente`, `Aprovado` e `Recuperação`',
              feedback:
                'É verdade que 9.5 é maior que 7 e que 5, mas numa corrente de `else if` só a **primeira** condição verdadeira roda.',
            },
            {
              text: '`Recuperação`',
              feedback:
                'Esse foi o resultado com 6.5. Com 9.5, o teste `nota >= 9` já é verdadeiro na primeira linha.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Um sinal de igual a menos',
          text: '`if (nota = 10)` não compara: ele **guarda** 10 em `nota`, e a condição passa a ser sempre verdadeira. Para comparar, são três sinais: `if (nota === 10)`.',
        },
      ],
    },
    {
      id: 'funcoes',
      title: 'Funções: receitas que você escreve uma vez',
      blocks: [
        {
          type: 'analogy',
          title: 'O caderno de receitas',
          text: 'A receita de bolo de fubá fica anotada no caderno. Quando você quer um bolo, não reinventa a receita: abre o caderno e segue. Os **ingredientes** mudam (às vezes mais fubá, às vezes menos) e no fim você recebe um **bolo pronto**. Uma **função** é uma receita com nome: você escreve uma vez e usa quantas vezes quiser.',
        },
        {
          type: 'anatomy',
          caption: 'Uma função que calcula o troco',
          language: 'javascript',
          parts: [
            {
              text: 'function',
              label: 'Palavra-chave',
              note: 'Avisa: “vou criar uma função”. Isso **guarda** a receita, mas ainda não executa nada.',
            },
            { text: ' ' },
            {
              text: 'calcularTroco',
              label: 'Nome',
              note: 'Como você vai chamar a função depois. Costuma ser um verbo, porque função faz algo: `calcularTroco`, `mostrarAviso`.',
            },
            { text: '(' },
            {
              text: 'pago, preco',
              label: 'Parâmetros',
              note: 'Os ingredientes: variáveis que recebem valores no momento em que a função é usada. Só existem dentro da função.',
            },
            { text: ') ' },
            {
              text: '{',
              label: 'Corpo',
              note: 'Tudo entre `{` e `}` é o corpo: os passos da receita. Eles só rodam quando a função é chamada.',
            },
            { text: '\n  ' },
            {
              text: 'return',
              label: 'Retorno',
              note: '`return` entrega o resultado para quem chamou a função, e encerra a função ali mesmo. É o bolo pronto saindo do forno.',
            },
            { text: ' ' },
            {
              text: 'pago - preco',
              label: 'Valor devolvido',
              note: 'A conta é feita com os valores que chegaram nos parâmetros, e o resultado é o que volta.',
            },
            { text: ';\n}' },
          ],
        },
        {
          type: 'text',
          text: 'Para usar a função, você a **chama**: escreve o nome e, entre parênteses, os valores. Esses valores se chamam **argumentos**. Na chamada `calcularTroco(50, 32)`, o `50` vai para `pago` e o `32` vai para `preco`, nessa ordem.',
        },
        {
          type: 'trace',
          caption:
            'O que acontece numa chamada de função. Repare como a execução “pula” para dentro da função e volta.',
          code: 'function calcularTroco(pago, preco) {\n  return pago - preco;\n}\n\nconst troco = calcularTroco(50, 32);\nconsole.log("Troco:", troco);',
          steps: [
            {
              line: 1,
              note: 'O computador guarda a receita com o nome `calcularTroco`. A linha 2 **não** roda agora: ninguém pediu o bolo ainda.',
              memory: [['calcularTroco', 'função']],
            },
            {
              line: 5,
              note: 'Para guardar algo em `troco`, ele precisa calcular `calcularTroco(50, 32)`. A linha fica em pausa e a execução vai para a função.',
            },
            {
              line: 1,
              note: 'Dentro da função, os parâmetros recebem os argumentos: `pago` vale `50` e `preco` vale `32`.',
              memory: [
                ['calcularTroco', 'função'],
                ['pago', '50'],
                ['preco', '32'],
              ],
            },
            {
              line: 2,
              note: 'Calcula `50 - 32`, que dá `18`, e o `return` entrega esse valor de volta para a linha 5. A função termina.',
            },
            {
              line: 5,
              note: 'De volta à linha 5, a chamada é trocada pelo resultado: é como se estivesse escrito `const troco = 18;`. `pago` e `preco` somem: só existiam durante a chamada.',
              memory: [
                ['calcularTroco', 'função'],
                ['troco', '18'],
              ],
            },
            {
              line: 6,
              note: 'Mostra o resultado.',
              output: 'Troco: 18',
            },
          ],
        },
        {
          type: 'text',
          text: 'Agora é só chamar de novo com outros valores: `calcularTroco(20, 13)` dá `7`, `calcularTroco(100, 64)` dá `36`. A receita é a mesma, os ingredientes mudam.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Mostrar não é devolver',
          text: '`console.log` só **mostra** um valor para você ler. `return` **entrega** o valor para o programa continuar usando. Uma função sem `return` devolve `undefined`. Essa é a confusão mais comum de quem está começando.',
        },
        {
          type: 'quiz',
          question: 'O que aparece no console, em ordem?',
          code: 'function dobro(numero) {\n  console.log(numero * 2);\n}\n\nconst resultado = dobro(5);\nconsole.log(resultado);',
          language: 'javascript',
          options: [
            {
              text: '`10` e depois `10`',
              feedback:
                'A função mostra `10`, mas não devolve nada. Por isso `resultado` não recebe o 10.',
            },
            {
              text: '`10` e depois `undefined`',
              correct: true,
              feedback:
                'Exato. O `console.log` de dentro mostra `10`, mas sem `return` a função devolve `undefined`. Trocando por `return numero * 2;`, `resultado` passaria a valer `10`.',
            },
            {
              text: 'Só `10`',
              feedback:
                'A última linha também roda e mostra o valor de `resultado`, que é `undefined`.',
            },
            {
              text: 'Um erro, porque a função não tem `return`',
              feedback:
                '`return` não é obrigatório. Sem ele, a função roda normalmente e devolve `undefined`.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Você vai encontrar muito uma forma mais curta de escrever funções, a **arrow function** (função de seta), com `=>`. Quando o corpo é só um valor devolvido, nem precisa de chaves nem de `return`.',
        },
        {
          type: 'codeTabs',
          caption: 'A mesma função escrita de dois jeitos',
          tabs: [
            {
              label: 'function',
              language: 'javascript',
              code: 'function calcularTroco(pago, preco) {\n  return pago - preco;\n}',
            },
            {
              label: 'Arrow function',
              language: 'javascript',
              code: 'const calcularTroco = (pago, preco) => pago - preco;',
            },
          ],
        },
        {
          type: 'fill',
          prompt: 'Complete a função para devolver a soma e depois chame-a com 4 e 6.',
          language: 'javascript',
          template:
            'function somar(a, b) {\n  [[return]] a + b;\n}\n\nconst total = [[somar]](4, 6);\nconsole.log(total); // 10',
          explanation:
            'O `return` entrega o resultado, e a chamada usa o nome da função seguido dos argumentos entre parênteses. Sem o `return`, `total` seria `undefined`.',
        },
      ],
    },
    {
      id: 'repeticoes',
      title: 'Repetir sem copiar: os laços',
      blocks: [
        {
          type: 'analogy',
          title: 'A pilha de pratos',
          text: 'Para lavar a louça, ninguém pensa “lavar o prato 1, lavar o prato 2, lavar o prato 3…”. Você pensa: “**enquanto** tiver prato na pia, pego um e lavo”. Um **laço** (em inglês, loop) é isso: um bloco de instruções que se repete, sem você copiar o código.',
        },
        {
          type: 'text',
          text: 'O laço mais clássico é o `for`. Ele tem três partes entre parênteses, separadas por `;`: onde o contador começa, até quando repetir e como o contador muda a cada volta.',
        },
        {
          type: 'code',
          language: 'javascript',
          code: '//   começo     condição   passo\nfor (let i = 1; i <= 3; i++) {\n  console.log("Volta número", i);\n}',
          output: 'Volta número 1\nVolta número 2\nVolta número 3',
          caption: '`i++` é um atalho para `i = i + 1`.',
        },
        {
          type: 'order',
          prompt: 'Em que ordem o `for` faz o trabalho dele?',
          items: [
            'Cria o contador com `let i = 1`, uma vez só',
            'Testa a condição `i <= 3`',
            'Se for verdadeira, executa o bloco entre chaves',
            'Atualiza o contador com `i++`',
            'Volta a testar a condição e, quando ela for falsa, sai do laço',
          ],
          explanation:
            'O começo roda uma vez só. Depois o ciclo é sempre testar, executar, atualizar. Quando o teste dá falso, o programa segue para a linha depois do laço.',
        },
        {
          type: 'trace',
          caption: 'Um laço que soma de 1 a 3. Repare como `soma` cresce a cada volta.',
          code: 'let soma = 0;\nfor (let i = 1; i <= 3; i++) {\n  soma = soma + i;\n}\nconsole.log("Soma:", soma);',
          steps: [
            {
              line: 1,
              note: 'A soma começa em zero. Ela precisa ser `let`, porque vai mudar.',
              memory: [['soma', '0']],
            },
            {
              line: 2,
              note: 'Começo do laço: cria `i` com `1`. Testa `1 <= 3`: verdadeiro, então entra.',
              memory: [
                ['soma', '0'],
                ['i', '1'],
              ],
            },
            {
              line: 3,
              note: '`soma` recebe `0 + 1`.',
              memory: [
                ['soma', '1'],
                ['i', '1'],
              ],
            },
            {
              line: 2,
              note: 'Fim da volta: `i++` faz `i` virar `2`. Testa `2 <= 3`: verdadeiro, mais uma volta.',
              memory: [
                ['soma', '1'],
                ['i', '2'],
              ],
            },
            {
              line: 3,
              note: '`soma` recebe `1 + 2`.',
              memory: [
                ['soma', '3'],
                ['i', '2'],
              ],
            },
            {
              line: 2,
              note: '`i` vira `3`. Testa `3 <= 3`: ainda verdadeiro, porque é **menor ou igual**.',
              memory: [
                ['soma', '3'],
                ['i', '3'],
              ],
            },
            {
              line: 3,
              note: '`soma` recebe `3 + 3`.',
              memory: [
                ['soma', '6'],
                ['i', '3'],
              ],
            },
            {
              line: 2,
              note: '`i` vira `4`. Testa `4 <= 3`: falso. O laço termina e `i` deixa de existir: ele só vivia dentro do `for`.',
              memory: [['soma', '6']],
            },
            {
              line: 5,
              note: 'O programa segue depois do laço e mostra o total acumulado.',
              output: 'Soma: 6',
            },
          ],
        },
        {
          type: 'quiz',
          question: 'O que aparece no console?',
          code: 'for (let i = 0; i < 3; i++) {\n  console.log(i);\n}',
          language: 'javascript',
          options: [
            {
              text: '`1`, `2` e `3`',
              feedback: 'O contador começa em `0`, não em `1`. A primeira volta mostra `0`.',
            },
            {
              text: '`0`, `1` e `2`',
              correct: true,
              feedback:
                'Isso. Começa em 0 e para quando `i < 3` fica falso, ou seja, quando `i` chega a 3. São três voltas: 0, 1 e 2.',
            },
            {
              text: '`0`, `1`, `2` e `3`',
              feedback:
                'Quando `i` vale 3, o teste `3 < 3` é falso e o laço para antes de mostrar. Seria assim com `i <= 3`.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Muitas vezes você quer passar por cada item de uma lista. Uma lista em JavaScript se escreve entre colchetes, como `[4, 10, 6]`, e a próxima aula vai a fundo nelas. Para percorrer cada item, o `for...of` é mais simples: “**para cada** preço **de** precos, faça isso”.',
        },
        {
          type: 'code',
          language: 'javascript',
          caption: 'Somando o carrinho com `for...of`',
          code: 'const precos = [4, 10, 6];\nlet total = 0;\n\nfor (const preco of precos) {\n  total = total + preco;\n}\n\nconsole.log("Total do carrinho:", total);',
          output: 'Total do carrinho: 20',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'O laço infinito',
          text: 'Se a condição nunca fica falsa, o laço nunca para. Esquecer o `i++` ou escrever `i >= 0` com `i` crescendo trava a aba do navegador. Se acontecer, feche a aba, corrija a condição e tente de novo. Acontece com todo mundo.',
        },
      ],
    },
    {
      id: 'juntando-tudo',
      title: 'Juntando tudo',
      blocks: [
        {
          type: 'text',
          text: 'Funções, decisões e laços quase sempre andam juntos: uma função decide algo com `if`, e um laço chama essa função para cada item. Antes de praticar, veja os tropeços mais comuns.',
        },
        {
          type: 'table',
          caption: 'Erros comuns e como corrigir',
          head: ['Escrito assim', 'O problema', 'Corrija para'],
          rows: [
            ['`if (idade = 18)`', 'Guarda em vez de comparar', '`if (idade === 18)`'],
            ['Função sem `return`', 'Devolve `undefined`', 'Termine com `return resultado;`'],
            [
              '`console.log` depois do `return`',
              'Nunca roda: o `return` encerra a função',
              'Mova a linha para antes do `return`',
            ],
            [
              '`for (let i = 0; i < 3; )`',
              'Falta o passo: laço infinito',
              '`for (let i = 0; i < 3; i++)`',
            ],
            [
              '`calcularTroco` sem parênteses',
              'Não chama a função, só fala dela',
              '`calcularTroco(50, 32)`',
            ],
          ],
        },
        {
          type: 'reveal',
          question:
            'Esta função deveria dizer se um número é par, mas `ehPar(4)` devolve `undefined`. Por quê? `function ehPar(numero) { numero % 2 === 0; }`',
          answer:
            'Falta o `return`. A comparação é calculada e jogada fora. Com `return numero % 2 === 0;`, a função devolve `true` para 4 e `false` para 7.',
        },
        {
          type: 'playground',
          title: 'Classificar idades',
          task: 'Complete a função `classificarIdade(idade)` para devolver `"criança"` para menos de 12 anos, `"adolescente"` de 12 a 17 e `"adulto"` a partir de 18. Depois use `for...of` para mostrar no console a classificação de cada idade da lista.',
          js: 'function classificarIdade(idade) {\n  // Use if, else if e else, e devolva o texto com return\n}\n\nconst idades = [5, 15, 30];\n\n// Use for...of para mostrar cada idade e sua classificação\n',
          checks: [
            {
              label: '`classificarIdade(5)` e `classificarIdade(11)` devolvem `"criança"`',
              test: "try {\n  if (typeof classificarIdade !== 'function') return false;\n  const ok = (valor) => valor === 'criança' || valor === 'crianca';\n  return ok(classificarIdade(5)) && ok(classificarIdade(11));\n} catch (e) {\n  return false;\n}",
            },
            {
              label: '`classificarIdade(12)` e `classificarIdade(17)` devolvem `"adolescente"`',
              test: "try {\n  if (typeof classificarIdade !== 'function') return false;\n  return classificarIdade(12) === 'adolescente' && classificarIdade(17) === 'adolescente';\n} catch (e) {\n  return false;\n}",
            },
            {
              label: '`classificarIdade(18)` e `classificarIdade(70)` devolvem `"adulto"`',
              test: "try {\n  if (typeof classificarIdade !== 'function') return false;\n  return classificarIdade(18) === 'adulto' && classificarIdade(70) === 'adulto';\n} catch (e) {\n  return false;\n}",
            },
            {
              label: 'O console mostra a classificação das três idades da lista',
              test: "try {\n  const texto = window.__trilhaLogs.join(' ');\n  return /crian[cç]a/.test(texto) && texto.includes('adolescente') && texto.includes('adulto');\n} catch (e) {\n  return false;\n}",
            },
          ],
          solution: {
            js: 'function classificarIdade(idade) {\n  if (idade < 12) {\n    return "criança";\n  } else if (idade < 18) {\n    return "adolescente";\n  } else {\n    return "adulto";\n  }\n}\n\nconst idades = [5, 15, 30];\n\nfor (const idade of idades) {\n  console.log(idade, classificarIdade(idade));\n}\n',
          },
        },
      ],
    },
  ],
  recap: [
    '`if` testa uma condição e escolhe um caminho; `else if` encadeia opções e só a primeira verdadeira roda.',
    '`&&` exige que os dois lados sejam verdadeiros, `||` aceita um só, e `!` inverte o valor.',
    'Uma função guarda passos com um nome; parâmetros recebem os argumentos da chamada e `return` devolve o resultado.',
    '`console.log` só mostra; `return` entrega. Sem `return`, a função devolve `undefined`.',
    '`for` repete com um contador e `for...of` percorre cada item de uma lista; a condição precisa ficar falsa em algum momento.',
  ],
  cards: [
    {
      id: 'else-if',
      front: 'Numa corrente de `if` e `else if`, quantos blocos rodam?',
      back: 'No máximo um: o da primeira condição verdadeira, testando de cima para baixo.',
    },
    {
      id: 'e-ou-nao',
      front: 'Quando `a && b` é verdadeiro? E `a || b`?',
      back: '`a && b`: quando os dois são verdadeiros. `a || b`: quando pelo menos um é verdadeiro.',
    },
    {
      id: 'parametro-argumento',
      front: 'Qual a diferença entre parâmetro e argumento?',
      back: 'Parâmetro é o nome na definição da função, como `pago`. Argumento é o valor passado na chamada, como `50`.',
    },
    {
      id: 'return-ou-log',
      front: 'O que uma função devolve se não tiver `return`?',
      back: '`undefined`. `console.log` dentro dela só mostra o valor, não o entrega.',
    },
    {
      id: 'partes-do-for',
      front: 'Quais são as três partes de `for (let i = 0; i < 3; i++)`?',
      back: 'Começo (`let i = 0`, roda uma vez), condição (`i < 3`, testada a cada volta) e passo (`i++`, depois de cada volta).',
    },
    {
      id: 'for-of',
      front: 'Para que serve o `for...of`?',
      back: 'Para percorrer cada item de uma lista, um de cada vez, sem precisar de contador.',
    },
    {
      id: 'laco-infinito',
      front: 'O que causa um laço infinito?',
      back: 'Uma condição que nunca fica falsa, por exemplo quando o contador não é atualizado.',
    },
  ],
  mission: {
    title: 'Uma calculadora de frete no console',
    text: 'Abra o console do navegador numa aba vazia e escreva um pequeno programa de verdade. Escreva primeiro no editor de código e cole no console, para não perder o trabalho.',
    steps: [
      'Crie a função `calcularFrete(valorCompra)`: compras de R$ 100 ou mais têm frete grátis, as outras pagam R$ 15',
      'Antes de rodar, escreva num papel o que você espera para 99, 100 e 250. Depois confira',
      'Crie uma lista com cinco valores de compra e use `for...of` para mostrar o frete de cada um',
      'Use um laço para somar todos os fretes e mostre o total no final',
      'Peça a uma IA para mudar sua função (por exemplo, frete de R$ 10 para compras abaixo de R$ 50) e preveja o resultado antes de testar o código dela',
    ],
  },
  sources: [
    {
      title: 'MDN: Tomando decisões no seu código',
      url: 'https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Building_blocks/conditionals',
    },
    {
      title: 'MDN: Funções',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Functions',
    },
    {
      title: 'MDN: Laços e iterações',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Loops_and_iteration',
    },
    {
      title: 'javascript.info: Functions',
      url: 'https://javascript.info/function-basics',
    },
  ],
};
