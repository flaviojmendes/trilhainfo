import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Uma função que funciona com 10 clientes pode travar o sistema com 1 milhão. Em entrevistas, depois de “funciona?”, a pergunta seguinte quase sempre é “e se a lista tiver um milhão de itens?”. Saber responder isso não exige matemática avançada: exige reconhecer meia dúzia de padrões e escolher a estrutura certa para guardar os dados.',
  sections: [
    {
      id: 'como-o-custo-cresce',
      title: 'Procurar um nome: lista solta ou agenda',
      blocks: [
        {
          type: 'analogy',
          title: 'O caderno de fiado e a agenda com abas',
          text: 'Na padaria, o caderno de fiado tem os nomes na ordem em que as pessoas compraram. Para achar a dona Lúcia, você folheia página por página: com 500 clientes, pode olhar 500 nomes. Já uma agenda com abas de A a Z deixa você abrir direto na letra L. Mesmo problema, esforço muito diferente, e a diferença cresce conforme o caderno engorda.',
        },
        {
          type: 'text',
          text: 'Um **algoritmo** é a receita de passos que resolve um problema. Chamamos de `n` o tamanho da entrada: quantos itens tem a lista, quantos clientes tem o cadastro. A pergunta que importa é: quando `n` dobra, o trabalho dobra, quadruplica ou quase não muda?',
        },
        {
          type: 'text',
          text: 'A **notação Big O** (lê-se “ó grande”) responde exatamente isso. `O(n)` quer dizer “o trabalho cresce na mesma proporção da entrada”. Ela ignora detalhes como a velocidade do computador e olha o **pior caso**: a entrada que mais faz o código trabalhar.',
        },
        {
          type: 'complexity',
          items: [
            {
              id: '1',
              name: 'constante',
              text: 'O trabalho **não depende** do tamanho da entrada.',
              example: 'pegar a posição 3 de uma lista, ou abrir a agenda direto na aba certa.',
              code: 'const notas = [7, 9, 6, 10];\nconsole.log(notas[3]);',
            },
            {
              id: 'log n',
              name: 'logarítmica',
              text: 'A cada passo, o problema **cai pela metade**. Dobrar a entrada acrescenta um passo só.',
              example:
                'procurar uma palavra no dicionário de papel abrindo no meio e descartando metade.',
              code: 'let n = 1000000;\nwhile (n > 1) {\n  n = Math.floor(n / 2);\n}',
            },
            {
              id: 'n',
              name: 'linear',
              text: 'O trabalho cresce **na mesma proporção** da entrada.',
              example: 'folhear o caderno de fiado inteiro procurando um nome.',
              code: 'for (const nome of caderno) {\n  if (nome === "Lúcia") console.log("achei");\n}',
            },
            {
              id: 'n²',
              name: 'quadrática',
              text: 'Para cada item, o código percorre **todos os itens de novo**. Dobrar a entrada quadruplica o trabalho.',
              example: 'comparar cada cliente com todos os outros para achar repetidos.',
              code: 'for (const a of clientes) {\n  for (const b of clientes) {\n    comparar(a, b);\n  }\n}',
            },
          ],
        },
        {
          type: 'table',
          caption: 'Quantos passos, aproximadamente, para cada tamanho de entrada',
          head: ['Complexidade', 'n = 10', 'n = 1.000', 'n = 1.000.000'],
          rows: [
            ['`O(1)`', '1', '1', '1'],
            ['`O(log n)`', '3', '10', '20'],
            ['`O(n)`', '10', '1.000', '1.000.000'],
            ['`O(n²)`', '100', '1.000.000', '1.000.000.000.000'],
          ],
        },
        {
          type: 'classify',
          prompt:
            'Classifique cada trecho pela forma como o trabalho cresce com o tamanho da lista.',
          buckets: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
          items: [
            { text: '`notas[3]`: pegar uma posição da lista', bucket: 0 },
            { text: '`cpf in cadastrados`, sendo `cadastrados` um `set`', bucket: 0 },
            { text: 'Repetir `n = n // 2` até `n` chegar a 1', bucket: 1 },
            {
              text: 'Busca binária: abrir no meio de uma lista ordenada e descartar metade',
              bucket: 1,
            },
            { text: '`sum(precos)`: somar todos os preços', bucket: 2 },
            { text: '`"Ana" in nomes`, sendo `nomes` uma lista', bucket: 2 },
            { text: 'Um laço dentro de outro comparando todos os pares de clientes', bucket: 3 },
            { text: 'Para cada pedido, procurar o cliente dele numa lista com `in`', bucket: 3 },
          ],
          explanation:
            'Repare nos dois `in`: na lista, o Python confere item por item (`O(n)`); no `set`, ele vai direto (`O(1)`). E o último item engana: parece um laço só, mas o `in` na lista esconde um segundo laço, então vira `O(n²)`.',
        },
        {
          type: 'reveal',
          question:
            'Percorrer uma lista de 1.000 nomes leva 1 segundo. Quanto tempo, mais ou menos, leva com 2.000 nomes num código `O(n)`? E num código `O(n²)`?',
          answer:
            'No `O(n)`, cerca de 2 segundos: o dobro da entrada, o dobro do trabalho. No `O(n²)`, cerca de 4 segundos, porque 2 × 2 = 4. Com 10 vezes mais nomes, seriam 10 segundos contra 100. É por isso que `O(n²)` costuma ser o alvo da pergunta “dá para melhorar?”.',
        },
      ],
    },
    {
      id: 'lista-set-e-dicionario',
      title: 'Lista, set e dicionário: onde procurar rápido',
      blocks: [
        {
          type: 'analogy',
          title: 'O guarda-volumes com número',
          text: 'No guarda-volumes da rodoviária, você entrega a mochila e recebe a ficha 47. Na volta, o atendente não abre todos os armários: vai direto no 47. Um `set` e um dicionário funcionam assim. Eles calculam, a partir do próprio valor, em que “armário” ele fica, e vão direto lá.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Lista (array)',
              text: 'Itens em ordem, acessados pela posição: `nomes[0]`. Pegar pela posição é `O(1)`, mas perguntar “este valor está aqui?” obriga a olhar um por um: `O(n)`.',
            },
            {
              term: 'Set (conjunto)',
              text: 'Guarda valores **sem repetição** e sem posição. Perguntar se um valor está no `set` é `O(1)` em média. Em JavaScript, `new Set()`.',
            },
            {
              term: 'Dicionário (mapa)',
              text: 'Guarda pares **chave e valor**, como CEP e endereço. Buscar pela chave é `O(1)` em média. Em JavaScript, `new Map()` ou um objeto.',
            },
            {
              term: 'Complexidade de espaço',
              text: 'Quanta memória extra o algoritmo usa. Um `set` com todos os itens vistos custa `O(n)` de espaço: você troca memória por velocidade.',
            },
          ],
        },
        {
          type: 'codeTabs',
          caption: 'A mesma pergunta, “este CPF já está cadastrado?”, com lista e com set.',
          tabs: [
            {
              label: 'Python',
              language: 'python',
              code: 'cadastrados_lista = ["111", "222", "333"]\ncadastrados_set = set(cadastrados_lista)\n\n"333" in cadastrados_lista  # O(n): confere um por um\n"333" in cadastrados_set    # O(1): vai direto',
            },
            {
              label: 'JavaScript',
              language: 'js',
              code: 'const cadastradosLista = ["111", "222", "333"];\nconst cadastradosSet = new Set(cadastradosLista);\n\ncadastradosLista.includes("333"); // O(n)\ncadastradosSet.has("333");        // O(1)',
            },
          ],
        },
        {
          type: 'quiz',
          question: 'Qual é a complexidade de tempo desta função, para uma lista com `n` itens?',
          code: 'def remover_repetidos(itens):\n    resultado = []\n    for item in itens:\n        if item not in resultado:\n            resultado.append(item)\n    return resultado',
          language: 'python',
          options: [
            {
              text: '`O(n²)`',
              correct: true,
              feedback:
                'Isso. O `for` visita `n` itens e, em cada volta, `not in resultado` percorre a lista `resultado`, que pode ter até `n` itens. Um laço escondido dentro de outro.',
            },
            {
              text: '`O(n)`, porque só tem um `for`',
              feedback:
                'É o engano mais comum. Contar os `for` não basta: `in` em lista também é um laço, só que escrito pelo Python para você.',
            },
            {
              text: '`O(1)`, porque `append` é instantâneo',
              feedback:
                '`append` é mesmo `O(1)`, mas ele roda dentro de um laço sobre a entrada inteira. Uma função que olha todos os itens nunca é `O(1)`.',
            },
            {
              text: '`O(log n)`, porque a lista resultado é menor que a original',
              feedback:
                '`O(log n)` exige descartar metade do problema a cada passo. Aqui nada é descartado: a lista resultado só cresce.',
            },
          ],
        },
        {
          type: 'python',
          title: 'Deduplicar a lista do mutirão',
          task: 'A planilha de inscrições do mutirão tem e-mails repetidos. Escreva `remover_repetidos(itens)` que mantém a **primeira aparição** de cada item, na ordem original, guardando o que já viu num `set` (crie com `set()`). O atalho `list(set(itens))` perde a ordem.',
          code: 'def remover_repetidos(itens):\n    return list(set(itens))\n\n\nprint(remover_repetidos([3, 1, 3, 2, 1]))  # esperado: [3, 1, 2]',
          solution:
            'def remover_repetidos(itens):\n    vistos = set()\n    resultado = []\n    for item in itens:\n        if item not in vistos:\n            vistos.add(item)\n            resultado.append(item)\n    return resultado\n\n\nprint(remover_repetidos([3, 1, 3, 2, 1]))  # esperado: [3, 1, 2]',
          checks: [
            {
              label: 'Mantém a ordem da primeira aparição',
              test: 'remover_repetidos([3, 1, 3, 2, 1]) == [3, 1, 2]',
            },
            {
              label: 'Lista sem repetidos volta igual',
              test: 'remover_repetidos([5, 4]) == [5, 4]',
            },
            {
              label: 'Funciona com e-mails',
              test: 'remover_repetidos(["bia@x.com", "ana@x.com", "bia@x.com"]) == ["bia@x.com", "ana@x.com"]',
            },
            { label: 'Lista vazia devolve lista vazia', test: 'remover_repetidos([]) == []' },
            { label: 'Usa um set para lembrar o que já viu', test: "'set()' in __codigo__" },
          ],
        },
      ],
    },
    {
      id: 'contagem-de-frequencia',
      title: 'Padrão 1: contar com um dicionário',
      blocks: [
        {
          type: 'text',
          text: 'Muitos problemas de entrevista são, no fundo, “quantas vezes cada coisa aparece?”: a palavra mais repetida, o produto mais vendido, se duas palavras são anagramas. O padrão é sempre o mesmo: percorrer a lista uma vez e ir somando num dicionário, como alguém marcando tracinhos ao lado de cada nome na apuração da eleição do grêmio.',
        },
        {
          type: 'trace',
          caption: 'Contando votos com um dicionário. Observe a memória mudar a cada volta.',
          code: 'votos = ["frango", "atum", "frango"]\ncontagem = {}\nfor voto in votos:\n    contagem[voto] = contagem.get(voto, 0) + 1\nprint(contagem)',
          steps: [
            {
              line: 1,
              note: 'A lista de votos é criada.',
              memory: [['votos', '["frango", "atum", "frango"]']],
            },
            {
              line: 2,
              note: 'O dicionário começa vazio: ninguém tem votos ainda.',
              memory: [
                ['votos', '["frango", "atum", "frango"]'],
                ['contagem', '{}'],
              ],
            },
            {
              line: 3,
              note: 'Primeira volta: `voto` recebe `"frango"`.',
              memory: [
                ['votos', '["frango", "atum", "frango"]'],
                ['contagem', '{}'],
                ['voto', '"frango"'],
              ],
            },
            {
              line: 4,
              note: '`contagem.get("frango", 0)` devolve 0, porque a chave ainda não existe. Somando 1, fica 1.',
              memory: [
                ['votos', '["frango", "atum", "frango"]'],
                ['contagem', '{"frango": 1}'],
                ['voto', '"frango"'],
              ],
            },
            {
              line: 4,
              note: 'Segunda volta, com `"atum"`: mesma ideia, nova chave com 1.',
              memory: [
                ['votos', '["frango", "atum", "frango"]'],
                ['contagem', '{"frango": 1, "atum": 1}'],
                ['voto', '"atum"'],
              ],
            },
            {
              line: 4,
              note: 'Terceira volta: agora `get` encontra `"frango"` com 1 e soma mais 1. Cada voto custou um acesso `O(1)` ao dicionário.',
              memory: [
                ['votos', '["frango", "atum", "frango"]'],
                ['contagem', '{"frango": 2, "atum": 1}'],
                ['voto', '"frango"'],
              ],
            },
            {
              line: 5,
              note: 'Uma passada só pela lista: `O(n)` de tempo e, no pior caso, `O(n)` de espaço, se todos os votos forem diferentes.',
              output: "{'frango': 2, 'atum': 1}",
            },
          ],
        },
        {
          type: 'fill',
          prompt:
            'Complete a linha que conta cada item, usando o valor padrão para chaves que ainda não existem.',
          language: 'python',
          template:
            'contagem = {}\nfor item in itens:\n    contagem[item] = contagem.[[get]](item, [[0]]) + 1',
          explanation:
            'Sem o `get` com valor padrão, `contagem[item] + 1` dá `KeyError` na primeira vez que o item aparece. O módulo `collections` também tem o `Counter`, que faz essa contagem pronta; vale citar na entrevista, mas saiba escrever o laço.',
        },
        {
          type: 'codeTabs',
          caption: 'Contagem de frequência em Python e em JavaScript.',
          tabs: [
            {
              label: 'Python',
              language: 'python',
              code: 'contagem = {}\nfor voto in votos:\n    contagem[voto] = contagem.get(voto, 0) + 1\n\n# atalho da biblioteca padrão\nfrom collections import Counter\nCounter(votos).most_common(1)',
            },
            {
              label: 'JavaScript',
              language: 'js',
              code: 'const contagem = new Map();\nfor (const voto of votos) {\n  contagem.set(voto, (contagem.get(voto) || 0) + 1);\n}',
            },
          ],
        },
        {
          type: 'python',
          title: 'A apuração do sabor de pizza',
          task: 'A turma votou no sabor da pizza da confraternização. Corrija `contar(votos)` para devolver quantos votos cada sabor teve e `mais_votado(votos)` para devolver o vencedor. Em empate, vence o que apareceu primeiro; se ninguém votou, devolva `None`.',
          code: 'def contar(votos):\n    contagem = {}\n    for voto in votos:\n        contagem[voto] = 1\n    return contagem\n\n\ndef mais_votado(votos):\n    contagem = contar(votos)\n    return max(contagem, key=contagem.get)\n\n\nprint(contar(["calabresa", "mussarela", "calabresa"]))',
          solution:
            'def contar(votos):\n    contagem = {}\n    for voto in votos:\n        contagem[voto] = contagem.get(voto, 0) + 1\n    return contagem\n\n\ndef mais_votado(votos):\n    if not votos:\n        return None\n    contagem = contar(votos)\n    return max(contagem, key=contagem.get)\n\n\nprint(contar(["calabresa", "mussarela", "calabresa"]))',
          checks: [
            {
              label: 'Conta os votos repetidos',
              test: 'contar(["calabresa", "mussarela", "calabresa"]) == {"calabresa": 2, "mussarela": 1}',
            },
            {
              label: 'Encontra o sabor mais votado',
              test: 'mais_votado(["frango", "calabresa", "calabresa"]) == "calabresa"',
            },
            {
              label: 'Em empate, vence quem apareceu primeiro',
              test: 'mais_votado(["frango", "atum", "atum", "frango"]) == "frango"',
            },
            { label: 'Sem votos, devolve None', test: 'mais_votado([]) is None' },
            {
              label: 'Contar uma lista vazia devolve um dicionário vazio',
              test: 'contar([]) == {}',
            },
          ],
        },
      ],
    },
    {
      id: 'dois-somam-o-alvo',
      title: 'Padrão 2: lembrar o que já viu',
      blocks: [
        {
          type: 'text',
          text: 'Um clássico de entrevista: dada uma lista de preços e um valor, achar dois produtos que somam exatamente esse valor. Pense num vale-presente de R$ 100 que você quer gastar sem sobrar troco. A solução óbvia testa todos os pares com dois laços: `O(n²)`. Com 100 mil produtos, são cerca de 5 bilhões de comparações.',
        },
        {
          type: 'text',
          text: 'O truque é inverter a pergunta. Ao olhar um produto de R$ 30, você não precisa testar todos os outros: precisa saber se **já passou** por um de R$ 70. Guardando cada preço visto num dicionário (preço e posição), essa pergunta custa `O(1)`, e a lista é percorrida uma vez só.',
        },
        {
          type: 'trace',
          caption:
            'Procurando dois preços que somam 100. Repare que a pergunta vem antes de guardar.',
          code: 'def dois_somam(precos, alvo):\n    vistos = {}\n    for i, preco in enumerate(precos):\n        falta = alvo - preco\n        if falta in vistos:\n            return (vistos[falta], i)\n        vistos[preco] = i\n    return None\n\nprint(dois_somam([30, 50, 70], 100))',
          steps: [
            {
              line: 1,
              note: 'O Python guarda a função. Nada roda ainda.',
              memory: [['dois_somam', 'função']],
            },
            {
              line: 10,
              note: 'A chamada: preços 30, 50 e 70, alvo 100.',
            },
            {
              line: 2,
              note: 'O dicionário `vistos` vai guardar cada preço já visitado e a posição dele.',
              memory: [
                ['precos', '[30, 50, 70]'],
                ['alvo', '100'],
                ['vistos', '{}'],
              ],
            },
            {
              line: 4,
              note: 'Posição 0, preço 30. Para fechar 100, falta 70.',
              memory: [
                ['precos', '[30, 50, 70]'],
                ['alvo', '100'],
                ['vistos', '{}'],
                ['i', '0'],
                ['preco', '30'],
                ['falta', '70'],
              ],
            },
            {
              line: 7,
              note: 'Nenhum 70 visto ainda. Guardamos o 30 e seguimos.',
              memory: [
                ['precos', '[30, 50, 70]'],
                ['alvo', '100'],
                ['vistos', '{30: 0}'],
                ['i', '0'],
                ['preco', '30'],
                ['falta', '70'],
              ],
            },
            {
              line: 7,
              note: 'Posição 1, preço 50, falta 50. O 50 ainda não está em `vistos` (ele mesmo não conta), então é guardado.',
              memory: [
                ['precos', '[30, 50, 70]'],
                ['alvo', '100'],
                ['vistos', '{30: 0, 50: 1}'],
                ['i', '1'],
                ['preco', '50'],
                ['falta', '50'],
              ],
            },
            {
              line: 5,
              note: 'Posição 2, preço 70, falta 30. E o 30 está em `vistos`, na posição 0.',
              memory: [
                ['precos', '[30, 50, 70]'],
                ['alvo', '100'],
                ['vistos', '{30: 0, 50: 1}'],
                ['i', '2'],
                ['preco', '70'],
                ['falta', '30'],
              ],
            },
            {
              line: 10,
              note: 'A função devolve as posições 0 e 2. Três visitas, nenhum laço aninhado: `O(n)` de tempo.',
              memory: [['dois_somam', 'função']],
              output: '(0, 2)',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Depois que você explica a versão com dicionário, a pessoa entrevistadora pergunta: “e quanto ela gasta de memória?”. Qual é a melhor resposta?',
          options: [
            {
              text: '`O(n)` de espaço, porque no pior caso o dicionário guarda todos os preços. Troquei memória por tempo: a versão com dois laços usa `O(1)` de espaço, mas `O(n²)` de tempo',
              correct: true,
              feedback:
                'Isso. Você responde a pergunta e ainda mostra a troca entre as duas soluções. Se memória for apertada, a conversa pode seguir para ordenar a lista e usar dois ponteiros.',
            },
            {
              text: '`O(1)`, porque o dicionário é rápido',
              feedback:
                'O dicionário é rápido para **buscar**, mas ocupa espaço proporcional ao que você guarda nele. Tempo e espaço são perguntas diferentes.',
            },
            {
              text: '`O(n²)`, porque guarda pares de valores',
              feedback:
                'Cada preço vira uma entrada com sua posição: `n` entradas, não `n × n`. Guardar pares chave e valor não multiplica o tamanho.',
            },
            {
              text: 'Memória não importa hoje em dia',
              feedback:
                'Em celulares, funções na nuvem cobradas por memória e bases com bilhões de linhas, importa sim. E a pergunta é justamente para ver se você enxerga a troca.',
            },
          ],
        },
        {
          type: 'python',
          title: 'Conserte o vale-presente',
          task: 'Esta versão às vezes usa o **mesmo produto duas vezes**: com o preço 50 e alvo 100, ela responde `(0, 0)`. Descubra a causa comparando com o rastreamento acima e corrija. A função devolve as duas posições, a menor primeiro, ou `None` se não houver par.',
          code: 'def dois_somam(precos, alvo):\n    vistos = {}\n    for i, preco in enumerate(precos):\n        vistos[preco] = i\n        falta = alvo - preco\n        if falta in vistos:\n            return (vistos[falta], i)\n    return None\n\n\nprint(dois_somam([30, 50, 70], 100))  # esperado: (0, 2)',
          solution:
            'def dois_somam(precos, alvo):\n    vistos = {}\n    for i, preco in enumerate(precos):\n        falta = alvo - preco\n        if falta in vistos:\n            return (vistos[falta], i)\n        vistos[preco] = i\n    return None\n\n\nprint(dois_somam([30, 50, 70], 100))  # esperado: (0, 2)',
          checks: [
            { label: 'Encontra 30 + 70 = 100', test: 'dois_somam([30, 50, 70], 100) == (0, 2)' },
            {
              label: 'Preços repetidos funcionam: 50 + 50',
              test: 'dois_somam([50, 20, 50], 100) == (0, 2)',
            },
            { label: 'Não usa o mesmo produto duas vezes', test: 'dois_somam([50], 100) is None' },
            { label: 'Sem par possível, devolve None', test: 'dois_somam([10, 20], 100) is None' },
            { label: 'Lista vazia devolve None', test: 'dois_somam([], 100) is None' },
          ],
        },
        {
          type: 'codeTabs',
          caption: 'A versão corrigida em JavaScript, para vagas de frontend ou Node.js.',
          tabs: [
            {
              label: 'JavaScript',
              language: 'js',
              code: 'function doisSomam(precos, alvo) {\n  const vistos = new Map();\n  for (let i = 0; i < precos.length; i++) {\n    const falta = alvo - precos[i];\n    if (vistos.has(falta)) return [vistos.get(falta), i];\n    vistos.set(precos[i], i);\n  }\n  return null;\n}',
            },
            {
              label: 'Python',
              language: 'python',
              code: 'def dois_somam(precos, alvo):\n    vistos = {}\n    for i, preco in enumerate(precos):\n        falta = alvo - preco\n        if falta in vistos:\n            return (vistos[falta], i)\n        vistos[preco] = i\n    return None',
            },
          ],
        },
      ],
    },
    {
      id: 'ponteiros-e-janela',
      title: 'Padrões 3 e 4: dois ponteiros e janela deslizante',
      blocks: [
        {
          type: 'analogy',
          title: 'Duas pessoas arrumando a estante',
          text: 'Para conferir se uma fileira de livros está espelhada, duas pessoas começam uma em cada ponta e andam para o meio, comparando o que cada uma segura. Ninguém precisa voltar ao começo. Isso é a técnica de **dois ponteiros**: duas posições na lista que se movem de forma combinada.',
        },
        {
          type: 'codeTabs',
          caption:
            'Dois ponteiros para saber se uma palavra é um palíndromo (lida igual de trás para frente, como “arara”). Tempo `O(n)`, espaço `O(1)`.',
          tabs: [
            {
              label: 'Python',
              language: 'python',
              code: 'def eh_palindromo(texto):\n    esquerda, direita = 0, len(texto) - 1\n    while esquerda < direita:\n        if texto[esquerda] != texto[direita]:\n            return False\n        esquerda += 1\n        direita -= 1\n    return True',
            },
            {
              label: 'JavaScript',
              language: 'js',
              code: 'function ehPalindromo(texto) {\n  let esquerda = 0;\n  let direita = texto.length - 1;\n  while (esquerda < direita) {\n    if (texto[esquerda] !== texto[direita]) return false;\n    esquerda++;\n    direita--;\n  }\n  return true;\n}',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Você quer achar dois preços que somam 100 usando dois ponteiros: um no início, outro no fim, andando para o meio conforme a soma fica maior ou menor que o alvo. O que a lista precisa ter para isso funcionar?',
          options: [
            {
              text: 'Estar ordenada',
              correct: true,
              feedback:
                'Isso. Só numa lista ordenada dá para saber que, se a soma passou de 100, o jeito de diminuir é andar com o ponteiro da direita. Se precisar ordenar antes, o custo total vira `O(n log n)`.',
            },
            {
              text: 'Não ter números repetidos',
              feedback:
                'Repetidos não atrapalham: 50 e 50 em posições diferentes formam um par válido. A exigência é outra.',
            },
            {
              text: 'Ter um número par de itens',
              feedback:
                'Os ponteiros param quando se encontram, com qualquer quantidade de itens. A paridade não importa.',
            },
            {
              text: 'Estar guardada num dicionário',
              feedback:
                'Dicionário não tem posições para os ponteiros andarem. Essa é a outra solução, a do padrão anterior.',
            },
          ],
        },
        {
          type: 'text',
          text: 'A **janela deslizante** serve para perguntas sobre trechos seguidos: os 7 dias com mais vendas, as 3 horas com mais passageiros no ônibus. Em vez de somar cada trecho do zero, você soma o primeiro e depois “desliza”: entra o próximo valor, sai o mais antigo.',
        },
        {
          type: 'trace',
          caption:
            'Maior soma de vendas em 2 dias seguidos. Cada deslize custa uma soma e uma subtração, não uma soma inteira.',
          code: 'vendas = [100, 200, 300, 50]\nk = 2\nsoma = sum(vendas[:k])\nmelhor = soma\nfor i in range(k, len(vendas)):\n    soma += vendas[i] - vendas[i - k]\n    melhor = max(melhor, soma)\nprint(melhor)',
          steps: [
            {
              line: 1,
              note: 'Vendas de quatro dias.',
              memory: [['vendas', '[100, 200, 300, 50]']],
            },
            {
              line: 2,
              note: 'A janela tem 2 dias.',
              memory: [
                ['vendas', '[100, 200, 300, 50]'],
                ['k', '2'],
              ],
            },
            {
              line: 3,
              note: 'A primeira janela, dias 0 e 1: 100 + 200 = 300.',
              memory: [
                ['vendas', '[100, 200, 300, 50]'],
                ['k', '2'],
                ['soma', '300'],
              ],
            },
            {
              line: 4,
              note: 'Por enquanto, a melhor janela é a primeira.',
              memory: [
                ['vendas', '[100, 200, 300, 50]'],
                ['k', '2'],
                ['soma', '300'],
                ['melhor', '300'],
              ],
            },
            {
              line: 6,
              note: 'Desliza: entra `vendas[2]` (300), sai `vendas[0]` (100). A soma vira 500, sem somar a janela de novo.',
              memory: [
                ['vendas', '[100, 200, 300, 50]'],
                ['k', '2'],
                ['soma', '500'],
                ['melhor', '300'],
                ['i', '2'],
              ],
            },
            {
              line: 7,
              note: '500 é maior que 300: nova melhor janela.',
              memory: [
                ['vendas', '[100, 200, 300, 50]'],
                ['k', '2'],
                ['soma', '500'],
                ['melhor', '500'],
                ['i', '2'],
              ],
            },
            {
              line: 6,
              note: 'Desliza de novo: entra 50, sai 200. A soma cai para 350.',
              memory: [
                ['vendas', '[100, 200, 300, 50]'],
                ['k', '2'],
                ['soma', '350'],
                ['melhor', '500'],
                ['i', '3'],
              ],
            },
            {
              line: 8,
              note: 'O laço acabou. Tempo `O(n)`, não importa o tamanho da janela.',
              output: '500',
            },
          ],
        },
        {
          type: 'python',
          title: 'A melhor sequência de vendas',
          task: 'Complete `maior_soma_janela(vendas, k)` deslizando a janela dentro do laço. Trate os limites: se `k` for menor ou igual a zero, ou maior que a quantidade de dias (inclusive lista vazia), devolva `None`. Não some a janela inteira de novo a cada volta.',
          code: 'def maior_soma_janela(vendas, k):\n    soma = sum(vendas[:k])\n    melhor = soma\n    for i in range(k, len(vendas)):\n        # entra vendas[i], sai vendas[i - k]\n        pass\n    return melhor\n\n\nprint(maior_soma_janela([100, 200, 300, 50], 2))  # esperado: 500',
          solution:
            'def maior_soma_janela(vendas, k):\n    if k <= 0 or k > len(vendas):\n        return None\n    soma = sum(vendas[:k])\n    melhor = soma\n    for i in range(k, len(vendas)):\n        soma += vendas[i] - vendas[i - k]\n        melhor = max(melhor, soma)\n    return melhor\n\n\nprint(maior_soma_janela([100, 200, 300, 50], 2))  # esperado: 500',
          checks: [
            {
              label: 'Acha a melhor janela de 2 dias',
              test: 'maior_soma_janela([100, 200, 300, 50], 2) == 500',
            },
            {
              label: 'Acha a melhor janela de 3 dias',
              test: 'maior_soma_janela([5, 1, 2, 9, 1], 3) == 12',
            },
            {
              label: 'Funciona com valores negativos (prejuízo)',
              test: 'maior_soma_janela([-3, -1, -2], 2) == -3',
            },
            { label: 'Lista vazia devolve None', test: 'maior_soma_janela([], 2) is None' },
            {
              label: 'Janela maior que a lista devolve None',
              test: 'maior_soma_janela([10, 20], 5) is None',
            },
            {
              label: 'Soma a lista inteira só uma vez, antes do laço',
              test: "__codigo__.count('sum(') <= 1",
            },
          ],
        },
      ],
    },
    {
      id: 'escolher-o-padrao',
      title: 'Escolher o padrão e explicar o custo',
      blocks: [
        {
          type: 'classify',
          prompt: 'Qual padrão resolve cada problema de forma eficiente?',
          buckets: [
            'Contagem com dicionário',
            'Busca com set ou dicionário',
            'Dois ponteiros',
            'Janela deslizante',
          ],
          items: [
            { text: 'Descobrir a palavra mais repetida nos comentários de um produto', bucket: 0 },
            { text: 'Saber quantas viagens cada linha de ônibus fez no dia', bucket: 0 },
            { text: 'Checar se um CPF já está entre 2 milhões de cadastrados', bucket: 1 },
            {
              text: 'Achar dois produtos que fecham o vale-presente, numa lista fora de ordem',
              bucket: 1,
            },
            { text: 'Conferir se uma frase é palíndromo comparando as pontas', bucket: 2 },
            {
              text: 'Achar o par que soma o alvo numa lista já ordenada, sem memória extra',
              bucket: 2,
            },
            { text: 'Encontrar a semana (7 dias seguidos) com mais vendas no ano', bucket: 3 },
            { text: 'Maior média de passageiros em 3 horas consecutivas', bucket: 3 },
          ],
          explanation:
            'Pistas no enunciado ajudam: “quantas vezes” pede contagem; “já existe?” ou “o complemento” pede busca com `set` ou dicionário; “ordenada” ou “pontas” sugere dois ponteiros; “seguidos” ou “consecutivos” sugere janela.',
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem uma boa explicação de complexidade durante a entrevista.',
          items: [
            'Apresentar a solução direta e dizer o custo dela',
            'Apontar o gargalo: o trecho que se repete dentro do laço',
            'Propor a estrutura que elimina o gargalo, como um set ou dicionário',
            'Dizer o novo custo de tempo e o custo de espaço',
            'Testar com lista vazia, valores repetidos e limites',
          ],
          explanation:
            'Começar pela solução direta não é fraqueza: mostra que você resolve o problema primeiro e otimiza com motivo. Muitas pessoas entrevistadoras preferem esse caminho a uma solução “esperta” que surge sem explicação.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns',
          text: 'Contar só os `for` e esquecer que `in`, `index` e `remove` em lista também percorrem a lista. Achar que `list(set(itens))` mantém a ordem. Usar o mesmo item duas vezes no par. Errar o primeiro ou o último índice da janela. E nunca testar a lista vazia: é o primeiro caso que quem entrevista vai digitar.',
        },
        {
          type: 'reveal',
          question:
            'A pessoa entrevistadora pergunta: “sua solução é `O(n)`. Ela é sempre mais rápida que a `O(n²)`?”. O que você responde?',
          answer:
            'Não necessariamente. Big O descreve como o custo cresce, não o tempo exato. Para listas pequenas, a versão com dois laços pode ser tão rápida quanto, e às vezes mais simples de ler. A `O(n)` ganha com folga quando a entrada cresce. Dizer isso mostra que você entende o que a notação mede, e quando vale a pena otimizar.',
        },
      ],
    },
  ],
  recap: [
    'Big O descreve como o trabalho cresce quando a entrada cresce: `O(1)` não muda, `O(log n)` corta pela metade, `O(n)` acompanha, `O(n²)` explode.',
    'Perguntar se um valor está numa lista é `O(n)`; num `set` ou dicionário, é `O(1)` em média, ao custo de `O(n)` de memória.',
    'Contagem com dicionário e “lembrar o que já viu” transformam muitos problemas `O(n²)` em `O(n)`.',
    'Dois ponteiros funcionam bem com pontas ou listas ordenadas; a janela deslizante resolve perguntas sobre trechos seguidos.',
    'Toda solução de entrevista termina com o custo de tempo e espaço explicado e testes com vazio, repetidos e limites.',
  ],
  cards: [
    {
      id: 'big-o-definicao',
      front: 'O que a notação Big O descreve?',
      back: 'Como o trabalho (tempo ou memória) cresce quando o tamanho da entrada cresce, olhando o pior caso.',
    },
    {
      id: 'in-lista-vs-set',
      front: 'Qual o custo de `x in lista` e de `x in conjunto`?',
      back: 'Na lista, `O(n)`, porque confere item por item. No `set`, `O(1)` em média, porque vai direto.',
    },
    {
      id: 'laco-escondido',
      front: 'Por que um `for` com `if item not in resultado` (uma lista) é `O(n²)`?',
      back: 'Porque o `in` em lista é um segundo laço escondido dentro do primeiro.',
    },
    {
      id: 'dois-somam-ideia',
      front: 'Qual a ideia da solução `O(n)` para achar dois valores que somam um alvo?',
      back: 'Para cada valor, perguntar se o complemento (alvo menos valor) já foi visto num dicionário, e só depois guardar o valor.',
    },
    {
      id: 'troca-tempo-espaco',
      front: 'O que significa trocar tempo por espaço?',
      back: 'Usar memória extra, como um `set` com `O(n)` itens, para deixar o algoritmo mais rápido.',
    },
    {
      id: 'janela-deslizante',
      front: 'Como a janela deslizante evita somar cada trecho do zero?',
      back: 'Soma a primeira janela e, a cada passo, adiciona o valor que entra e subtrai o que sai.',
    },
    {
      id: 'dois-ponteiros-requisito',
      front: 'Para buscar um par que soma o alvo com dois ponteiros, o que a lista precisa ter?',
      back: 'Estar ordenada. Se precisar ordenar antes, o custo total vira `O(n log n)`.',
    },
  ],
  mission: {
    title: 'Deduplique e busque, explicando o custo',
    text: 'Resolva dois problemas sobre uma coleção de verdade, como os contatos exportados do seu celular, uma lista de compras ou os dados de um projeto seu. Escreva as soluções em Python ou JavaScript e explique, em voz alta ou por escrito, como numa entrevista.',
    steps: [
      'Escreva uma função que remove itens repetidos mantendo a ordem, primeiro com lista e depois com `set`',
      'Escreva uma busca, como “dois valores que somam um alvo” ou “este item já existe?”, em versão direta e em versão com dicionário',
      'Diga a complexidade de tempo e de espaço de cada versão e qual foi o gargalo removido',
      'Teste cada função com lista vazia, itens repetidos, um único item e um caso sem resposta',
      'Gere uma lista com 100 mil números e compare o tempo das duas versões',
    ],
  },
  sources: [
    {
      title: 'Tutorial do Python: estruturas de dados (listas, conjuntos e dicionários)',
      url: 'https://docs.python.org/pt-br/3/tutorial/datastructures.html',
    },
    {
      title: 'Python Wiki: complexidade das operações nas coleções',
      url: 'https://wiki.python.org/moin/TimeComplexity',
    },
    {
      title: 'MDN: Map',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Map',
    },
    {
      title: 'MDN: Set',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Set',
    },
  ],
};
