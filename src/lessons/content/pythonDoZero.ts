import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Toda semana alguém perde horas fazendo à mão o que um programa de dez linhas faria em um segundo: somar a planilha do caixa, conferir se um site está no ar, checar se a resposta de um sistema veio com todos os campos. Python é a linguagem mais usada para esse tipo de tarefa no backend, em DevOps, em dados e em automação de testes, porque se lê quase como português. Nesta aula você escreve seus primeiros programas de verdade, rodando aqui mesmo no navegador.',
  sections: [
    {
      id: 'primeiro-programa',
      title: 'Seu primeiro programa',
      blocks: [
        {
          type: 'analogy',
          title: 'Um programa é uma receita',
          text: 'Uma receita de bolo é uma lista de instruções seguidas **de cima para baixo**, uma de cada vez: “misture os ovos”, “adicione a farinha”, “asse por 40 minutos”. Um programa é a mesma coisa, só que quem segue as instruções é o computador. Ele não adivinha nada: faz exatamente o que está escrito, na ordem em que está escrito.',
        },
        {
          type: 'text',
          text: 'A primeira instrução que todo mundo aprende é `print`, que mostra algo na tela. O texto vai entre aspas e dentro de parênteses. Linhas que começam com `#` são **comentários**: o Python ignora, elas existem para pessoas lerem.',
        },
        {
          type: 'code',
          language: 'python',
          caption: 'Três instruções, executadas de cima para baixo',
          code: '# Isto é um comentário: o Python pula esta linha\nprint("Bom dia!")\nprint("Hoje o pão francês custa", 0.75, "reais")\nprint(2 + 3)',
          output: 'Bom dia!\nHoje o pão francês custa 0.75 reais\n5',
        },
        {
          type: 'text',
          text: 'Repare em dois detalhes. Com vírgulas, o `print` junta vários valores e coloca um espaço entre eles. E `2 + 3` sem aspas é uma **conta**: o Python calcula e mostra `5`. Com aspas, `"2 + 3"` seria só um texto.',
        },
        {
          type: 'python',
          title: 'Escreva suas primeiras linhas',
          task: 'Complete o programa para mostrar três linhas: a saudação que já está lá, a frase `Estou aprendendo Python` e o resultado da conta `7 * 8` (o `*` é a multiplicação).',
          code: 'print("Olá, Trilha Info")\n# escreva as outras duas linhas abaixo\n',
          solution: 'print("Olá, Trilha Info")\nprint("Estou aprendendo Python")\nprint(7 * 8)\n',
          checks: [
            {
              label: 'Mostra a frase Estou aprendendo Python',
              test: "'Estou aprendendo Python' in __saida__",
            },
            { label: 'Mostra o resultado de 7 * 8', test: "'56' in __saida__" },
          ],
        },
        {
          type: 'quiz',
          question: 'O que este programa mostra?',
          code: 'print("10 + 5")\nprint(10 + 5)',
          language: 'python',
          options: [
            {
              text: '`10 + 5` e depois `15`',
              correct: true,
              feedback:
                'Isso. Entre aspas é texto e aparece do jeito que foi escrito. Sem aspas, é uma conta, e o Python mostra o resultado.',
            },
            {
              text: '`15` duas vezes',
              feedback:
                'As aspas mudam tudo: `"10 + 5"` é um texto com os caracteres 1, 0, espaço, +... O Python não faz conta dentro de texto.',
            },
            {
              text: '`10 + 5` duas vezes',
              feedback:
                'A segunda linha não tem aspas, então o Python trata como uma expressão matemática e calcula `15`.',
            },
            {
              text: 'Um erro, porque não dá para misturar texto e número',
              feedback:
                'Cada `print` aqui mostra um valor só, de um tipo só. O erro de misturar tipos aparece em outra situação, que você vai ver daqui a pouco.',
            },
          ],
        },
      ],
    },
    {
      id: 'variaveis-e-tipos',
      title: 'Guardar valores: variáveis e tipos',
      blocks: [
        {
          type: 'text',
          text: 'Uma **variável** é um nome que aponta para um valor guardado na memória, como uma etiqueta colada numa caixa. Você cria com `=`: o nome à esquerda, o valor à direita. Depois, usa o nome no lugar do valor.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'O `=` não é “igual”',
          text: 'Em Python, `=` quer dizer **guarde**. A linha `idade = idade + 1` não é uma equação impossível: o Python calcula o lado direito primeiro (o valor atual mais 1) e depois guarda o resultado de volta em `idade`.',
        },
        {
          type: 'trace',
          caption: 'Acompanhe a memória mudando linha a linha.',
          code: 'nome = "Ana"\nidade = 17\nidade = idade + 1\nmaior = idade >= 18\nprint(f"{nome} tem {idade} anos. Maior de idade: {maior}")',
          steps: [
            {
              line: 1,
              note: 'Cria a variável `nome` e guarda o texto `"Ana"`.',
              memory: [['nome', '"Ana"']],
            },
            {
              line: 2,
              note: 'Cria `idade` com o número inteiro `17`.',
              memory: [
                ['nome', '"Ana"'],
                ['idade', '17'],
              ],
            },
            {
              line: 3,
              note: 'Primeiro o lado direito: `17 + 1` dá `18`. Depois, o resultado substitui o valor antigo de `idade`.',
              memory: [
                ['nome', '"Ana"'],
                ['idade', '18'],
              ],
            },
            {
              line: 4,
              note: '`18 >= 18` é uma pergunta de sim ou não. A resposta, `True`, fica guardada em `maior`.',
              memory: [
                ['nome', '"Ana"'],
                ['idade', '18'],
                ['maior', 'True'],
              ],
            },
            {
              line: 5,
              note: 'A **f-string** troca cada `{nome_da_variavel}` pelo valor atual dela.',
              output: 'Ana tem 18 anos. Maior de idade: True',
            },
          ],
        },
        {
          type: 'text',
          text: 'Todo valor tem um **tipo**, que diz o que dá para fazer com ele. Você não precisa declarar o tipo: o Python descobre pelo jeito que o valor foi escrito. Para conferir, use `type(valor)`.',
        },
        {
          type: 'table',
          caption: 'Os quatro tipos básicos',
          head: ['Tipo', 'Nome', 'Exemplos', 'Serve para'],
          rows: [
            ['`str`', 'texto (string)', '`"Recife"`, `"01310-100"`', 'nomes, CEPs, mensagens'],
            ['`int`', 'número inteiro', '`17`, `-3`, `200`', 'quantidades, idades, contagens'],
            ['`float`', 'número com casas decimais', '`0.75`, `19.9`', 'preços, médias, medidas'],
            ['`bool`', 'verdadeiro ou falso', '`True`, `False`', 'respostas de sim ou não'],
          ],
        },
        {
          type: 'classify',
          prompt: 'Qual é o tipo de cada valor?',
          buckets: ['str', 'int', 'float', 'bool'],
          items: [
            { text: '`"Maria"`', bucket: 0 },
            { text: '`"42"`', bucket: 0 },
            { text: '`42`', bucket: 1 },
            { text: '`3.5`', bucket: 2 },
            { text: '`10 / 2`', bucket: 2 },
            { text: '`False`', bucket: 3 },
            { text: '`5 > 3`', bucket: 3 },
          ],
          explanation:
            'Aspas sempre fazem um texto, mesmo com números dentro: `"42"` é `str`. A divisão com `/` sempre devolve `float` (`10 / 2` é `5.0`). E uma comparação devolve `bool`.',
        },
        {
          type: 'text',
          text: 'Texto e número não se misturam com `+`. Quando um valor chega como texto (de um arquivo, de um formulário), você converte com `int("42")` ou `float("19.90")`. Para o caminho contrário, `str(42)`. A forma mais confortável de montar frases com números é a **f-string**: um `f` antes das aspas e as variáveis entre chaves. Dentro das chaves, `:.2f` formata com duas casas decimais.',
        },
        {
          type: 'code',
          language: 'python',
          caption: 'O erro clássico e duas formas de resolver',
          code: 'quantidade = 3\nprint("Itens: " + str(quantidade))\nprint(f"Itens: {quantidade}")\nprint(f"Preço: R$ {6.5:.2f}")\nprint("Itens: " + quantidade)',
          output:
            'Itens: 3\nItens: 3\nPreço: R$ 6.50\nTypeError: can only concatenate str (not "int") to str',
        },
        {
          type: 'python',
          title: 'A conta da lanchonete',
          task: 'Crie a variável `total` com o preço vezes a quantidade e mostre exatamente a frase `3 x Coxinha = R$ 19.50`, usando uma f-string com as variáveis (não escreva os números à mão).',
          code: 'produto = "Coxinha"\npreco = 6.5\nquantidade = 3\n\n# crie a variável total\n\n# mostre: 3 x Coxinha = R$ 19.50\n',
          solution:
            'produto = "Coxinha"\npreco = 6.5\nquantidade = 3\n\ntotal = preco * quantidade\n\nprint(f"{quantidade} x {produto} = R$ {total:.2f}")\n',
          checks: [
            { label: 'A variável total vale 19.5', test: 'total == 19.5' },
            {
              label: 'Mostra a frase no formato pedido, com duas casas decimais',
              test: "'3 x Coxinha = R$ 19.50' in __saida__",
            },
          ],
        },
        {
          type: 'quiz',
          question: 'Qual o resultado de `print("2" + "3")`?',
          options: [
            {
              text: '`23`',
              correct: true,
              feedback:
                'Exato. Entre textos, `+` **junta** (concatena). Por isso dados lidos de arquivos precisam ser convertidos com `int()` ou `float()` antes de qualquer conta.',
            },
            {
              text: '`5`',
              feedback:
                'Seria `5` com `2 + 3`, sem aspas. Com aspas, são dois textos, e `+` cola um no outro.',
            },
            {
              text: 'Um `TypeError`',
              feedback:
                'O `TypeError` aparece quando você mistura texto com número. Aqui os dois lados são texto, então o Python sabe o que fazer: juntar.',
            },
          ],
        },
      ],
    },
    {
      id: 'decisoes',
      title: 'Tomar decisões: if, elif e else',
      blocks: [
        {
          type: 'analogy',
          title: 'O frete da loja',
          text: 'Uma loja on-line diz: “compras acima de R$ 200 têm frete grátis; de R$ 100 a R$ 200, frete de R$ 10; abaixo disso, R$ 25”. Quem calcula o frete faz perguntas **em ordem** e para na primeira resposta “sim”. O `if` do Python funciona exatamente assim.',
        },
        {
          type: 'anatomy',
          caption: 'Uma decisão com três caminhos',
          language: 'python',
          parts: [
            {
              text: 'if',
              label: 'if (se)',
              note: 'Faz a primeira pergunta. A condição é qualquer expressão que dê `True` ou `False`, normalmente uma comparação: `>`, `<`, `>=`, `<=`, `==` (igual) ou `!=` (diferente).',
            },
            { text: ' valor > 200' },
            {
              text: ':',
              label: 'Dois-pontos',
              note: 'Toda linha que abre um bloco termina com `:`. Esquecer é um dos erros mais comuns, e o Python responde com `SyntaxError`.',
            },
            { text: '\n' },
            {
              text: '    frete = 0',
              label: 'Recuo (indentação)',
              note: 'Os 4 espaços no começo dizem “esta linha pertence ao `if`”. Em Python, o recuo **não é enfeite**: é ele que define o que está dentro do bloco.',
            },
            { text: '\n' },
            {
              text: 'elif',
              label: 'elif (senão, se)',
              note: 'Só é testado se as perguntas anteriores deram `False`. Você pode ter quantos `elif` quiser.',
            },
            { text: ' valor >= 100:\n    frete = 10\n' },
            {
              text: 'else',
              label: 'else (senão)',
              note: 'Pega tudo que sobrou. Não tem condição. É opcional.',
            },
            { text: ':\n    frete = 25\nprint(f"Frete: R$ {frete}")' },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns com if',
          text: 'Usar `=` (guardar) no lugar de `==` (comparar) dá `SyntaxError`. Misturar tabs e espaços, ou recuar 3 espaços numa linha e 4 na outra, dá `IndentationError`. E a ordem importa: se você perguntar `valor >= 100` antes de `valor > 200`, uma compra de 300 cai no frete de 10.',
        },
        {
          type: 'python',
          title: 'Calcule o frete',
          task: 'Escreva o `if`/`elif`/`else` com as regras da loja (acima de 200: grátis; de 100 a 200: R$ 10; abaixo de 100: R$ 25) e mostre `Frete: R$ 10` para a compra de 150. Depois, troque `valor_compra` para 250 e 40 e confira se o resultado muda.',
          code: 'valor_compra = 150\nfrete = 0\n\n# escreva as regras aqui\n\nprint(f"Frete: R$ {frete}")\n',
          solution:
            'valor_compra = 150\nfrete = 0\n\nif valor_compra > 200:\n    frete = 0\nelif valor_compra >= 100:\n    frete = 10\nelse:\n    frete = 25\n\nprint(f"Frete: R$ {frete}")\n',
          checks: [
            { label: 'Para uma compra de 150, o frete é 10', test: 'frete == 10' },
            { label: 'Mostra Frete: R$ 10', test: "'Frete: R$ 10' in __saida__" },
            {
              label: 'As regras usam if, elif e else',
              test: "all(palavra in __codigo__ for palavra in ('if ', 'elif ', 'else:'))",
            },
          ],
        },
        {
          type: 'quiz',
          question: 'Qual linha este programa mostra?',
          code: 'nota = 7\nif nota >= 5:\n    print("Recuperação")\nelif nota >= 7:\n    print("Aprovado")\nelse:\n    print("Reprovado")',
          language: 'python',
          options: [
            {
              text: '`Recuperação`',
              correct: true,
              feedback:
                'Isso, e é um bug. `7 >= 5` já é verdadeiro, então o Python entra no primeiro bloco e ignora o resto. A pergunta mais exigente (`>= 7`) precisa vir primeiro.',
            },
            {
              text: '`Aprovado`',
              feedback:
                'Parece o certo para nota 7, mas o Python para na **primeira** condição verdadeira. `7 >= 5` vem antes e já é verdadeira.',
            },
            {
              text: '`Recuperação` e `Aprovado`',
              feedback:
                'Num encadeamento `if`/`elif`/`else`, só um bloco roda. Depois que um caminho é escolhido, os outros são pulados.',
            },
          ],
        },
      ],
    },
    {
      id: 'repeticoes',
      title: 'Repetir sem copiar: for e while',
      blocks: [
        {
          type: 'text',
          text: 'Imagine mostrar a tabuada do 7 escrevendo dez `print`. Funciona, mas e se fossem mil linhas? Um **laço** (ou loop) repete um bloco de código. O Python tem dois: `for`, quando você sabe quantas vezes ou sobre o que repetir, e `while`, quando repete **enquanto** uma condição for verdadeira.',
        },
        {
          type: 'text',
          text: '`range(1, 4)` gera os números 1, 2 e 3: começa no primeiro e **para antes** do segundo. O `for` pega cada número, guarda na variável do laço e roda o bloco recuado.',
        },
        {
          type: 'trace',
          caption: 'Um for somando de 1 a 3, volta a volta.',
          code: 'total = 0\nfor numero in range(1, 4):\n    total = total + numero\n    print(f"Somei {numero}, total = {total}")\nprint("Fim:", total)',
          steps: [
            { line: 1, note: 'O acumulador começa em zero.', memory: [['total', '0']] },
            {
              line: 2,
              note: 'Primeira volta: `numero` recebe o primeiro valor do `range`, que é `1`.',
              memory: [
                ['total', '0'],
                ['numero', '1'],
              ],
            },
            {
              line: 3,
              note: '`0 + 1` dá `1`.',
              memory: [
                ['total', '1'],
                ['numero', '1'],
              ],
            },
            { line: 4, note: 'Mostra o andamento.', output: 'Somei 1, total = 1' },
            {
              line: 2,
              note: 'Fim do bloco recuado: o Python volta ao `for`, e `numero` passa a valer `2`.',
              memory: [
                ['total', '1'],
                ['numero', '2'],
              ],
            },
            {
              line: 3,
              note: '`1 + 2` dá `3`.',
              memory: [
                ['total', '3'],
                ['numero', '2'],
              ],
            },
            { line: 4, note: 'Mostra de novo.', output: 'Somei 2, total = 3' },
            {
              line: 2,
              note: 'Terceira volta, `numero` vale `3`.',
              memory: [
                ['total', '3'],
                ['numero', '3'],
              ],
            },
            {
              line: 3,
              note: '`3 + 3` dá `6`.',
              memory: [
                ['total', '6'],
                ['numero', '3'],
              ],
            },
            { line: 4, note: 'Última volta.', output: 'Somei 3, total = 6' },
            {
              line: 5,
              note: 'O `range` acabou (o 4 nunca entra). A linha sem recuo roda uma vez só, depois do laço.',
              output: 'Fim: 6',
            },
          ],
        },
        {
          type: 'python',
          title: 'A tabuada que parou cedo',
          task: 'Este programa deveria mostrar a tabuada do 7 de `7 x 1` até `7 x 10`, mas tem um erro clássico. Rode, descubra o que falta e corrija.',
          code: 'for i in range(1, 10):\n    print(f"7 x {i} = {7 * i}")\n',
          solution: 'for i in range(1, 11):\n    print(f"7 x {i} = {7 * i}")\n',
          checks: [
            { label: 'Começa em 7 x 1 = 7', test: "'7 x 1 = 7' in __saida__" },
            { label: 'Chega até 7 x 10 = 70', test: "'7 x 10 = 70' in __saida__" },
            { label: 'Mostra exatamente dez linhas', test: "__saida__.count('7 x ') == 10" },
          ],
        },
        {
          type: 'text',
          text: 'O `while` serve quando você não sabe de antemão quantas voltas serão. Ele testa a condição antes de cada volta e para quando ela fica falsa. Por isso, algo dentro do bloco **precisa** mudar a condição, senão o laço nunca termina.',
        },
        {
          type: 'python',
          title: 'Quantos meses para juntar mil reais?',
          task: 'Você guarda R$ 150 por mês e quer chegar a R$ 1000. O laço já soma o dinheiro, mas esquece de contar os meses. Faça `meses` aumentar 1 a cada volta e rode: a resposta deve ser `7 meses`.',
          code: 'meta = 1000\nguardado = 0\nmeses = 0\n\nwhile guardado < meta:\n    guardado = guardado + 150\n\nprint(f"Você chega lá em {meses} meses, com R$ {guardado}")\n',
          solution:
            'meta = 1000\nguardado = 0\nmeses = 0\n\nwhile guardado < meta:\n    guardado = guardado + 150\n    meses = meses + 1\n\nprint(f"Você chega lá em {meses} meses, com R$ {guardado}")\n',
          checks: [
            { label: 'meses termina valendo 7', test: 'meses == 7' },
            { label: 'Mostra 7 meses na frase final', test: "'7 meses' in __saida__" },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'O laço infinito',
          text: 'Se você apagar a linha `guardado = guardado + 150`, `guardado` fica em 0 para sempre e o `while` nunca para. Aqui o navegador interrompe depois de 8 segundos; no seu computador, use `Ctrl` + `C` no terminal para parar o programa.',
        },
        {
          type: 'quiz',
          question: 'Quantas vezes a palavra `oi` aparece?',
          code: 'for i in range(2, 6):\n    print("oi")',
          language: 'python',
          options: [
            {
              text: '4',
              correct: true,
              feedback:
                'Isso. `range(2, 6)` gera 2, 3, 4 e 5: começa no 2 e para **antes** do 6. Uma conta rápida: 6 menos 2.',
            },
            {
              text: '5',
              feedback:
                'Você contou o 6, mas o `range` para antes do segundo número. Os valores são 2, 3, 4 e 5.',
            },
            {
              text: '6',
              feedback:
                'Seria 6 com `range(6)`, que começa no 0. Com `range(2, 6)`, a contagem começa no 2.',
            },
          ],
        },
      ],
    },
    {
      id: 'funcoes',
      title: 'Dar nome a uma tarefa: funções',
      blocks: [
        {
          type: 'analogy',
          title: 'A máquina de suco',
          text: 'Você coloca laranjas (a **entrada**), aperta o botão e sai suco (a **saída**). Não precisa saber o que acontece lá dentro, e pode usar a máquina quantas vezes quiser. Uma **função** é isso: um bloco de código com nome, que recebe valores, faz um trabalho e devolve um resultado.',
        },
        {
          type: 'anatomy',
          caption: 'Uma função que calcula a média de três notas',
          language: 'python',
          parts: [
            {
              text: 'def',
              label: 'def',
              note: 'Vem de “define”. Avisa que aqui começa a definição de uma função. Definir **não executa** nada: só ensina ao Python uma nova tarefa.',
            },
            { text: ' ' },
            {
              text: 'calcular_media',
              label: 'Nome',
              note: 'Use um verbo que diga o que ela faz. Em Python, nomes compostos usam `_` entre as palavras (o estilo snake_case).',
            },
            { text: '(' },
            {
              text: 'n1, n2, n3',
              label: 'Parâmetros',
              note: 'As entradas. São variáveis que só existem dentro da função e recebem os valores passados na chamada.',
            },
            { text: '):\n    soma = n1 + n2 + n3\n    ' },
            {
              text: 'return soma / 3',
              label: 'return',
              note: 'Devolve o resultado para quem chamou e encerra a função. Sem `return`, a função devolve `None`, que significa “nada”.',
            },
            { text: '\n\n' },
            {
              text: 'media = calcular_media(7, 8, 9)',
              label: 'Chamada',
              note: 'Aqui a função roda de verdade: `n1` vale 7, `n2` vale 8, `n3` vale 9. O valor devolvido, `8.0`, é guardado em `media`.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'print não é return',
          text: '`print` mostra um valor na tela para uma pessoa ler. `return` entrega o valor para o programa continuar usando. Uma função que só faz `print` parece funcionar, mas `resultado = funcao()` guarda `None`, e a próxima conta quebra.',
        },
        {
          type: 'python',
          title: 'Boletim automático',
          task: 'Corrija `calcular_media` para **devolver** a média em vez de mostrar. Depois, complete `situacao(media)`: devolve `"Aprovado"` se a média for 7 ou mais, `"Recuperação"` se for 5 ou mais, e `"Reprovado"` nos outros casos.',
          code: 'def calcular_media(n1, n2, n3):\n    media = (n1 + n2 + n3) / 3\n    print(media)\n\n\ndef situacao(media):\n    return ""\n\n\nm = calcular_media(7, 8, 9)\nprint("Média:", m)\nprint("Situação:", situacao(m))\n',
          solution:
            'def calcular_media(n1, n2, n3):\n    media = (n1 + n2 + n3) / 3\n    return media\n\n\ndef situacao(media):\n    if media >= 7:\n        return "Aprovado"\n    elif media >= 5:\n        return "Recuperação"\n    else:\n        return "Reprovado"\n\n\nm = calcular_media(7, 8, 9)\nprint("Média:", m)\nprint("Situação:", situacao(m))\n',
          checks: [
            { label: 'calcular_media(7, 8, 9) devolve 8', test: 'calcular_media(7, 8, 9) == 8' },
            { label: 'Média 7 é Aprovado', test: "situacao(7) == 'Aprovado'" },
            { label: 'Média 5.5 é Recuperação', test: "situacao(5.5) == 'Recuperação'" },
            { label: 'Média 4.9 é Reprovado', test: "situacao(4.9) == 'Reprovado'" },
          ],
        },
        {
          type: 'fill',
          prompt: 'Complete a função que calcula o troco de uma compra.',
          language: 'python',
          template:
            '[[def]] calcular_troco(pago, total):\n    troco = pago - total\n    [[return]] troco\n\nvalor = calcular_troco(50, 32.5)\nprint(f"Troco: R$ {[[valor]]:.2f}")',
          explanation:
            '`def` abre a definição, `return` devolve o resultado e a chamada guarda o valor em `valor`, que a f-string mostra como `Troco: R$ 17.50`.',
        },
        {
          type: 'order',
          prompt:
            'Você quer um programa que diga se cada produto de uma lista de preços está em promoção. Em que ordem faz sentido construir?',
          items: [
            'Escrever um valor de exemplo numa variável e mostrar com `print`',
            'Escrever o `if` que decide se aquele valor é promoção',
            'Colocar a decisão dentro de uma função com `def` e `return`',
            'Chamar a função com alguns valores e conferir as respostas',
            'Usar um laço para chamar a função para vários valores',
          ],
          explanation:
            'Programar bem é crescer aos poucos: faça funcionar para um caso, confira, e só então generalize. Quem escreve tudo de uma vez costuma passar mais tempo caçando o erro.',
        },
        {
          type: 'reveal',
          question:
            'Uma pessoa de DevOps, uma de dados e uma de QA vão usar Python de jeitos diferentes. O que esta aula tem em comum para as três?',
          answer:
            'Todas vão escrever funções que recebem algo (um endereço de servidor, uma linha de planilha, uma resposta de API), decidem com `if` se está tudo certo e repetem isso com laços para muitos itens. Muda o assunto, não as ferramentas.',
        },
      ],
    },
  ],
  recap: [
    'Um programa é uma sequência de instruções executadas de cima para baixo; `print` mostra valores na tela.',
    'Variáveis guardam valores com `=`; cada valor tem um tipo (`str`, `int`, `float`, `bool`) e texto precisa ser convertido antes de entrar em contas.',
    '`if`/`elif`/`else` escolhe um caminho só, e o recuo de 4 espaços define o que está dentro de cada bloco.',
    '`for` repete sobre uma sequência como `range(1, 11)`; `while` repete enquanto uma condição for verdadeira e precisa de algo que a torne falsa.',
    'Funções com `def` dão nome a uma tarefa; `return` devolve o resultado, `print` só mostra.',
  ],
  cards: [
    {
      id: 'igual-guarda',
      front: 'O que o `=` faz em Python?',
      back: 'Guarda o valor da direita na variável da esquerda. Para comparar, use `==`.',
    },
    {
      id: 'tipos-basicos',
      front: 'Quais são os quatro tipos básicos de valor em Python?',
      back: '`str` (texto), `int` (inteiro), `float` (com casas decimais) e `bool` (`True` ou `False`).',
    },
    {
      id: 'f-string',
      front: 'Como mostrar o preço `6.5` como `R$ 6.50` com uma f-string?',
      back: '`f"R$ {preco:.2f}"`: o `f` antes das aspas e `:.2f` para duas casas decimais.',
    },
    {
      id: 'range-limite',
      front: 'Quais números `range(1, 5)` gera?',
      back: '1, 2, 3 e 4. O segundo número fica de fora.',
    },
    {
      id: 'indentacao',
      front: 'Para que servem os espaços no começo da linha em Python?',
      back: 'Definem o que está dentro de um bloco (`if`, `for`, `while`, `def`). O padrão é 4 espaços.',
    },
    {
      id: 'print-return',
      front: 'Qual a diferença entre `print` e `return` numa função?',
      back: '`print` mostra na tela; `return` devolve o valor para o programa usar. Sem `return`, a função devolve `None`.',
    },
    {
      id: 'while-infinito',
      front: 'Por que um `while` pode nunca terminar?',
      back: 'Porque nada dentro do bloco faz a condição ficar falsa. Algo precisa mudar a cada volta.',
    },
  ],
  mission: {
    title: 'Seu primeiro script de verdade',
    text: 'Instale o Python 3 no seu computador e escreva um pequeno programa de linha de comando ligado à carreira que você escolheu. Exemplos: calcular despesas do mês (backend), decidir se um tempo de resposta de servidor está aceitável (DevOps), classificar notas ou valores (dados), validar se um código de produto tem o tamanho certo (QA).',
    steps: [
      'Instale o Python 3 pelo site oficial e confira com `python3 --version` (no Windows, `py --version`)',
      'Crie um arquivo `programa.py` no editor e rode com `python3 programa.py`',
      'Escreva pelo menos uma função com `def` e `return` que tome uma decisão com `if`/`elif`/`else`',
      'Chame a função dentro de um laço `for` com pelo menos cinco valores de teste e mostre os resultados com f-strings',
      'Provoque um erro de propósito (tire um `:` ou um recuo), leia a mensagem e corrija',
    ],
  },
  sources: [
    {
      title: 'Tutorial oficial do Python (em português)',
      url: 'https://docs.python.org/pt-br/3/tutorial/',
    },
    {
      title: 'Python: mais ferramentas de controle de fluxo',
      url: 'https://docs.python.org/pt-br/3/tutorial/controlflow.html',
    },
    {
      title: 'Python: uma introdução informal (números e textos)',
      url: 'https://docs.python.org/pt-br/3/tutorial/introduction.html',
    },
  ],
};
