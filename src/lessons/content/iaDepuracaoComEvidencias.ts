import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Todo mundo que programa passa boa parte do tempo procurando erros, inclusive quem tem anos de experiência. A diferença está no método: quem depura bem não sai mudando coisas até funcionar, e sim junta pistas, testa uma suspeita por vez e confirma a causa. Esse método também muda o que você recebe de uma IA. “Não funciona” rende um chute; a mensagem de erro, os passos e o que você esperava rendem uma investigação de verdade.',
  sections: [
    {
      id: 'nao-funciona',
      title: 'Por que “não funciona” não ajuda',
      blocks: [
        {
          type: 'analogy',
          title: 'A consulta no posto de saúde',
          text: 'Se você chega ao médico e diz só “estou mal”, ele não consegue fazer muita coisa. Se diz “dói aqui do lado direito desde ontem, piora quando eu ando e tive febre de 38 graus”, ele já tem pistas, pede um exame para confirmar a suspeita e só então receita. Depurar é fazer essa consulta com o seu código.',
        },
        {
          type: 'text',
          text: '**Depurar** é encontrar e corrigir a causa de um comportamento errado. O ponto de partida é sempre o mesmo par: o **esperado** (o que deveria acontecer) e o **observado** (o que acontece de fato). Sem os dois escritos, nem você nem a IA sabem o que procurar.',
        },
        {
          type: 'text',
          text: 'Uma **evidência** é algo que qualquer pessoa consegue ver ou repetir: uma mensagem de erro, a saída de um comando, um valor impresso no console. Uma opinião, como “acho que é o servidor”, pode até estar certa, mas ainda não foi confirmada.',
        },
        {
          type: 'classify',
          prompt:
            'Você vai pedir ajuda com um bug. O que é evidência e o que é só suspeita ou ruído?',
          buckets: ['Evidência', 'Suspeita ou ruído'],
          items: [
            { text: 'A mensagem de erro completa, copiada do console', bucket: 0 },
            { text: 'Os passos exatos que fazem o erro aparecer', bucket: 0 },
            { text: 'O valor de uma variável impresso com `console.log`', bucket: 0 },
            { text: 'Esperado: total R$ 16,00. Observado: tela em branco', bucket: 0 },
            { text: '“Deve ser algum problema do navegador”', bucket: 1 },
            { text: '“Funcionava ontem e hoje parou do nada”', bucket: 1 },
            { text: 'Uma captura de tela cortada, sem a mensagem de erro', bucket: 1 },
          ],
          explanation:
            '“Funcionava ontem” só vira evidência quando vem acompanhado do que mudou desde ontem: um commit, uma dependência atualizada, um dado novo. Sem isso, é uma lembrança, não uma pista.',
        },
      ],
    },
    {
      id: 'reproduzir',
      title: 'Primeiro, faça o erro acontecer de novo',
      blocks: [
        {
          type: 'text',
          text: '**Reproduzir** é conseguir fazer o erro aparecer de propósito, quantas vezes quiser. Um erro que você reproduz já está meio resolvido: você consegue testar cada suspeita e, no final, provar que a correção funcionou.',
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Anote os passos',
              text: 'Comece de um estado conhecido, como a página recém-aberta, e escreva cada ação: “abro o carrinho com 3 itens, clico em Ver resumo”.',
            },
            {
              title: 'Escreva esperado e observado',
              text: 'Uma frase para cada. Se aparecer uma mensagem de erro, copie inteira, como texto, e não só o pedaço que parece importante.',
            },
            {
              title: 'Diminua o caso',
              text: 'Tente com menos dados e menos passos até sobrar o mínimo que ainda dá erro. Isso se chama **reprodução mínima**. Muitas vezes, ao diminuir, você já enxerga a causa.',
            },
            {
              title: 'Tire o que é privado',
              text: 'Antes de mostrar para alguém ou para a IA, troque senhas, tokens e dados pessoais por valores de exemplo, como você viu na aula sobre contexto e dados protegidos.',
            },
          ],
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem o método de depuração com evidências.',
          items: [
            'Reproduzir o erro e anotar os passos',
            'Escrever o esperado e o observado',
            'Ler a mensagem de erro e achar a linha onde quebrou',
            'Levantar hipóteses e um jeito de testar cada uma',
            'Mudar uma coisa só e verificar o resultado',
            'Criar um teste que falharia sem a correção',
          ],
          explanation:
            'O último passo é o **teste de regressão**: um teste que garante que esse mesmo erro não volta escondido numa mudança futura. Ele fecha a investigação com uma evidência que fica no projeto.',
        },
      ],
    },
    {
      id: 'anatomia-do-erro',
      title: 'Lendo a mensagem de erro',
      blocks: [
        {
          type: 'text',
          text: 'Mensagens de erro assustam no começo porque são longas e em inglês. Mas elas seguem sempre o mesmo formato, e a parte que importa costuma estar nas duas primeiras linhas. A lista de linhas com `at` se chama **pilha de chamadas** (em inglês, stack trace): o caminho que o programa percorreu até quebrar.',
        },
        {
          type: 'anatomy',
          caption: 'Um erro de JavaScript como aparece no console do navegador.',
          language: 'text',
          parts: [
            {
              text: 'TypeError',
              label: 'Tipo do erro',
              note: '`TypeError` quer dizer que você tentou usar um valor de um jeito que o tipo dele não permite. Outros comuns são `ReferenceError` (nome que não existe) e `SyntaxError` (código escrito errado).',
            },
            { text: ': ' },
            {
              text: "Cannot read properties of undefined (reading 'preco')",
              label: 'Mensagem',
              note: 'Traduzindo: “não dá para ler propriedades de `undefined` (lendo `preco`)”. Ou seja, em algum lugar existe `algo.preco` e esse `algo` está vazio. Já é uma pista enorme.',
            },
            { text: '\n    at ' },
            {
              text: 'somarCarrinho (carrinho.js:4:30)',
              label: 'Onde quebrou',
              note: 'A primeira linha com `at` é o ponto exato da falha: função `somarCarrinho`, arquivo `carrinho.js`, linha 4, coluna 30. Comece a investigação por aqui.',
            },
            { text: '\n    at ' },
            {
              text: 'atualizarResumo (pagina.js:12:17)\n    at HTMLButtonElement.<anonymous> (pagina.js:20:3)',
              label: 'Quem chamou',
              note: 'As linhas seguintes mostram quem chamou quem: um clique no botão chamou `atualizarResumo`, que chamou `somarCarrinho`. Útil para saber de onde vieram os dados que causaram o problema.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Em Python, leia de baixo para cima',
          text: 'No Python, a mensagem se chama **traceback** e vem na ordem contrária: o tipo do erro e a mensagem ficam na **última** linha, e a chamada mais recente fica logo acima dela. Em backend e engenharia de dados você vai ver muito `KeyError` e `TypeError` assim.',
        },
        {
          type: 'quiz',
          question: 'Com o erro acima na tela, qual é o primeiro lugar do código para olhar?',
          options: [
            {
              text: 'A linha 4 de `carrinho.js`, onde algum `algo.preco` encontrou `undefined`',
              correct: true,
              feedback:
                'Isso. O tipo, a mensagem e a primeira linha de `at` juntos apontam o lugar e o que estava errado ali. Daí você pergunta: por que esse valor chegou vazio?',
            },
            {
              text: 'A linha 20 de `pagina.js`, porque é onde tudo começou',
              feedback:
                'Ela é o começo do caminho, não o lugar da falha. Você pode precisar voltar até lá, mas a investigação começa onde quebrou.',
            },
            {
              text: 'O CSS da página, porque o resumo não aparece na tela',
              feedback:
                'O sintoma é visual, mas a mensagem diz que o JavaScript parou antes de mostrar o resumo. O CSS não causa `TypeError`.',
            },
            {
              text: 'Nenhum: a mensagem é técnica demais e é melhor reescrever a função',
              feedback:
                'Reescrever sem entender pode até sumir com o erro, mas você não aprende a causa e ela pode voltar. A mensagem já diz quase tudo.',
            },
          ],
        },
      ],
    },
    {
      id: 'hipoteses',
      title: 'Hipóteses e uma mudança por vez',
      blocks: [
        {
          type: 'text',
          text: 'Uma **hipótese** é uma explicação que pode ser testada: “acho que o laço passa do último item”. O que transforma hipótese em causa confirmada é uma verificação, como um `console.log` no lugar certo, um ponto de parada (breakpoint) no DevTools ou um teste. Acompanhe o código que gerou o erro da seção anterior.',
        },
        {
          type: 'trace',
          caption: 'Seguindo o laço passo a passo até o erro',
          code: `function somarCarrinho(itens) {
  let total = 0;
  for (let i = 0; i <= itens.length; i++) {
    total = total + itens[i].preco;
  }
  return total;
}
console.log(somarCarrinho([{ preco: 5 }, { preco: 8 }, { preco: 3 }]));`,
          steps: [
            {
              line: 8,
              note: 'A função é chamada com três itens. As posições de uma lista começam em 0, então elas são 0, 1 e 2.',
              memory: [['itens.length', '3']],
            },
            {
              line: 2,
              note: 'O total começa em zero.',
              memory: [
                ['itens.length', '3'],
                ['total', '0'],
              ],
            },
            {
              line: 3,
              note: '`i` começa em 0. A condição `0 <= 3` é verdadeira, então o laço roda.',
              memory: [
                ['itens.length', '3'],
                ['total', '0'],
                ['i', '0'],
              ],
            },
            {
              line: 4,
              note: 'Soma o preço do item 0.',
              memory: [
                ['itens.length', '3'],
                ['total', '5'],
                ['i', '0'],
              ],
            },
            {
              line: 4,
              note: 'O laço roda de novo com `i` valendo 1 e depois 2. Os preços 8 e 3 são somados e tudo vai bem.',
              memory: [
                ['itens.length', '3'],
                ['total', '16'],
                ['i', '2'],
              ],
            },
            {
              line: 3,
              note: '`i` vira 3. E `3 <= 3` também é **verdadeiro**: o laço roda mais uma vez, para uma posição que não existe.',
              memory: [
                ['itens.length', '3'],
                ['total', '16'],
                ['i', '3'],
              ],
            },
            {
              line: 4,
              note: '`itens[3]` é `undefined`, e ler `.preco` de `undefined` quebra o programa. A hipótese “o laço passa do último item” está confirmada.',
              memory: [
                ['itens.length', '3'],
                ['total', '16'],
                ['i', '3'],
                ['itens[3]', 'undefined'],
              ],
              output: "TypeError: Cannot read properties of undefined (reading 'preco')",
            },
          ],
        },
        {
          type: 'reveal',
          question: 'Qual é a menor correção possível, e como você provaria que ela funciona?',
          answer:
            'Trocar `<=` por `<` na linha 3: o laço passa a parar no item 2. A prova é rodar de novo o mesmo caso e ver `16` no console, e então criar um teste que soma esses três itens. Repare que a correção é um caractere. Reescrever a função inteira esconderia isso.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns ao depurar',
          text: 'Mudar várias coisas de uma vez e não saber qual resolveu. Aceitar a primeira explicação que soa bem. Envolver o código num `try/catch` vazio para o erro sumir da tela. E esquecer de apagar os `console.log` de investigação antes do commit.',
        },
        {
          type: 'quiz',
          question:
            'Você suspeitava de duas causas, trocou as duas ao mesmo tempo e o erro sumiu. Qual o problema disso?',
          options: [
            {
              text: 'Você não sabe qual das mudanças resolveu, e a outra pode ter criado um problema novo',
              correct: true,
              feedback:
                'Isso. Uma mudança desnecessária fica no código sem motivo, e às vezes quebra outra coisa. Desfaça uma e teste de novo: assim você descobre a causa real.',
            },
            {
              text: 'Nenhum: o importante é que funcionou',
              feedback:
                'Funcionou neste caso. Mas sem saber a causa você não consegue explicar a correção, nem escrever o teste certo para ela.',
            },
            {
              text: 'O problema é só que o commit fica maior',
              feedback:
                'O commit maior é o menor dos problemas. O risco real é manter no código uma mudança que ninguém sabe por que está lá.',
            },
          ],
        },
      ],
    },
    {
      id: 'evidencias-para-a-ia',
      title: 'Levando as evidências para a IA',
      blocks: [
        {
          type: 'text',
          text: 'Com reprodução, esperado, observado e a mensagem de erro em mãos, a IA vira uma boa parceira de investigação. O pedido certo não é “conserta”, e sim “me ajude a confirmar a causa”.',
        },
        {
          type: 'code',
          language: 'text',
          caption: 'Um pedido de depuração com evidências',
          code: `Problema reproduzível: abro o carrinho com 3 itens e clico em "Ver resumo".
Esperado: o resumo mostra o total 16.
Observado: nada aparece e o console mostra:
TypeError: Cannot read properties of undefined (reading 'preco')
    at somarCarrinho (carrinho.js:4:30)
Contexto: [trecho de carrinho.js, sem dados reais].
Liste até três hipóteses e uma verificação para distinguir cada uma.
Primeiro vamos confirmar a causa. Depois proponha a menor correção
e um teste de regressão.`,
        },
        {
          type: 'text',
          text: 'Mesmo com um bom pedido, a resposta da IA é uma hipótese. Ela pode soar convincente e estar errada, porque a ferramenta prevê uma explicação plausível sem ter rodado o seu código.',
        },
        {
          type: 'quiz',
          question:
            'A IA responde: “O problema é que o preço vem como texto. Use `Number(itens[i].preco)`.” O que você faz?',
          options: [
            {
              text: 'Trata como hipótese e confere antes: imprime `i` e `itens[i]` no laço para ver o que chega',
              correct: true,
              feedback:
                'Isso. O log mostraria `i = 3` e `itens[3] = undefined`, derrubando a hipótese. E `Number(undefined.preco)` quebraria do mesmo jeito. Você devolve essa evidência para a IA e a conversa avança.',
            },
            {
              text: 'Aplica a sugestão, porque a explicação faz sentido',
              feedback:
                'Fazer sentido não é estar confirmado. Aqui a mudança nem resolveria: o erro acontece antes de existir um preço para converter.',
            },
            {
              text: 'Pede para a IA reescrever a função inteira de outro jeito',
              feedback:
                'Pode até sumir com o erro, mas você troca uma causa desconhecida por um código novo que também não entende.',
            },
            {
              text: 'Coloca um `try/catch` em volta do laço para o erro parar de aparecer',
              feedback:
                'O erro some da tela, mas o total continua errado e agora silencioso. Esconder o sintoma deixa o problema mais difícil de achar depois.',
            },
          ],
        },
      ],
    },
    {
      id: 'investigue',
      title: 'Mão na massa: investigue com console.log',
      blocks: [
        {
          type: 'text',
          text: 'Agora é com você. O carrinho da padaria deveria contar 5 itens, mas mostra outra coisa. Nada quebra, não há mensagem de erro: só um resultado estranho. Use `console.log` para olhar os valores por dentro antes de mudar qualquer coisa.',
        },
        {
          type: 'playground',
          title: 'O carrinho que conta errado',
          task: 'Rode e compare o observado com o esperado (5). Investigue com `console.log`, por exemplo imprimindo `item.qtd` e `typeof item.qtd` dentro do laço. Depois faça a menor correção.',
          js: `// Os dados chegam de um formulário:
// tudo o que se digita num campo chega como texto.
const carrinho = [
  { nome: 'Pão francês', qtd: '2' },
  { nome: 'Leite', qtd: '1' },
  { nome: 'Café', qtd: '2' },
];

function contarItens(itens) {
  let total = 0;
  for (const item of itens) {
    total = total + item.qtd;
  }
  return total;
}

// Esperado: 5
console.log('Itens no carrinho:', contarItens(carrinho));
`,
          checks: [
            {
              label: 'O console mostra pelo menos uma linha de investigação, além do resultado',
              test: 'try {\n  return Array.isArray(window.__trilhaLogs) && window.__trilhaLogs.length >= 2;\n} catch (e) {\n  return false;\n}',
            },
            {
              label: '`contarItens(carrinho)` devolve o número `5`',
              test: "try {\n  return typeof contarItens === 'function' && contarItens(carrinho) === 5;\n} catch (e) {\n  return false;\n}",
            },
            {
              label: 'O console mostra `Itens no carrinho: 5`',
              test: 'try {\n  return window.__trilhaLogs.some((linha) => /Itens no carrinho:?\\s*5$/.test(linha.trim()));\n} catch (e) {\n  return false;\n}',
            },
            {
              label: 'A função continua certa com outros carrinhos, inclusive vazio',
              test: "try {\n  if (typeof contarItens !== 'function') return false;\n  return contarItens([]) === 0 && contarItens([{ qtd: '10' }, { qtd: '3' }]) === 13 && contarItens([{ qtd: 4 }]) === 4;\n} catch (e) {\n  return false;\n}",
            },
          ],
          solution: {
            js: `const carrinho = [
  { nome: 'Pão francês', qtd: '2' },
  { nome: 'Leite', qtd: '1' },
  { nome: 'Café', qtd: '2' },
];

function contarItens(itens) {
  let total = 0;
  for (const item of itens) {
    total = total + Number(item.qtd);
  }
  return total;
}

// Investigação: qtd chega como texto, e texto + texto junta em vez de somar.
console.log('qtd do primeiro item:', carrinho[0].qtd, typeof carrinho[0].qtd);

// Esperado: 5
console.log('Itens no carrinho:', contarItens(carrinho));
`,
          },
        },
        {
          type: 'reveal',
          question: 'Por que o resultado era `0212`, e não um erro?',
          answer:
            'Porque em JavaScript o `+` entre um número e um texto **junta** os dois como texto: `0 + "2"` vira `"02"`, depois `"021"`, depois `"0212"`. Nenhuma regra foi quebrada, então não há mensagem de erro. Bugs silenciosos como esse só aparecem quando você compara o observado com o esperado, e um `typeof` no console mostra a causa em segundos.',
        },
      ],
    },
  ],
  recap: [
    'Depurar começa com **esperado** e **observado** escritos, e com o erro reproduzido de propósito.',
    'Na mensagem de erro, leia o tipo, a mensagem e a primeira linha da pilha: elas dizem o que quebrou e onde.',
    'Uma hipótese só vira causa depois de verificada com log, breakpoint ou teste; mude uma coisa por vez.',
    'Dê à IA as evidências e peça hipóteses com formas de testá-las; trate a resposta como suspeita até conferir.',
    'Feche a investigação com a menor correção e um teste de regressão.',
  ],
  cards: [
    {
      id: 'esperado-observado',
      front: 'Quais duas frases devem existir antes de qualquer depuração?',
      back: 'O esperado (o que deveria acontecer) e o observado (o que acontece de fato).',
    },
    {
      id: 'reproducao-minima',
      front: 'O que é uma reprodução mínima?',
      back: 'O menor conjunto de passos e dados que ainda faz o erro aparecer.',
    },
    {
      id: 'stack-trace',
      front: 'Num erro de JavaScript, qual linha da pilha mostra onde o programa quebrou?',
      back: 'A primeira linha com `at`, logo abaixo da mensagem.',
    },
    {
      id: 'traceback-python',
      front: 'Num traceback de Python, onde ficam o tipo e a mensagem do erro?',
      back: 'Na última linha. A chamada mais recente fica logo acima dela.',
    },
    {
      id: 'hipotese-causa',
      front: 'Qual a diferença entre uma hipótese e uma causa confirmada?',
      back: 'A causa confirmada passou por uma verificação, como um log, um breakpoint ou um teste.',
    },
    {
      id: 'teste-regressao',
      front: 'Para que serve um teste de regressão?',
      back: 'Para garantir que um erro já corrigido não volte numa mudança futura.',
    },
    {
      id: 'mais-texto',
      front: 'Por que `0 + "2"` dá `"02"` em JavaScript?',
      back: 'Porque `+` com um texto junta os valores como texto em vez de somar.',
    },
  ],
  mission: {
    title: 'Plante um bug e investigue com método',
    text: 'No projeto de laboratório da sua trilha, introduza de propósito um bug pequeno, como um `<=` no lugar de `<`, um campo com nome trocado ou um número que chega como texto. Depois investigue como se não soubesse a causa, com uma IA como parceira.',
    steps: [
      'Escreva os passos para reproduzir, o esperado e o observado, com a mensagem de erro completa e sem dados privados',
      'Peça à IA até três hipóteses e uma forma de testar cada uma',
      'Confirme ou descarte cada hipótese com um log, um breakpoint ou um teste, mudando uma coisa por vez',
      'Aplique a menor correção e escreva um teste que falha antes dela e passa depois',
      'Anote qual sugestão da IA estava certa, qual estava errada e que evidência mostrou isso',
    ],
  },
  sources: [
    {
      title: 'MDN: o que deu errado? Resolvendo problemas no JavaScript',
      url: 'https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/First_steps/What_went_wrong',
    },
    {
      title: 'Chrome DevTools: depurar JavaScript',
      url: 'https://developer.chrome.com/docs/devtools/javascript',
    },
    {
      title: 'Documentação do Python: erros e exceções',
      url: 'https://docs.python.org/pt-br/3/tutorial/errors.html',
    },
  ],
};
