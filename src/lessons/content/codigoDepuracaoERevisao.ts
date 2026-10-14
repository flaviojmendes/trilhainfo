import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Em boa parte dos processos seletivos de tecnologia, alguém vai pedir para você escrever, consertar ou revisar código enquanto observa. Quem avalia raramente espera a solução perfeita: quer ver como você pensa, como reage a um erro e se explica o que está fazendo. A boa notícia é que isso tem método, e método se treina como qualquer outra habilidade.',
  sections: [
    {
      id: 'roteiro-live-coding',
      title: 'Pensar em voz alta: o roteiro do live coding',
      blocks: [
        {
          type: 'analogy',
          title: 'O mecânico que explica antes de abrir o capô',
          text: 'Você leva o carro na oficina. Um mecânico sai trocando peças sem dizer nada; outro pergunta quando o barulho aparece, escuta o motor, diz “acho que é a correia, vou confirmar” e só então mexe. Mesmo que os dois acertem, você confia no segundo. Em uma entrevista, a pessoa entrevistadora é o dono do carro.',
        },
        {
          type: 'text',
          text: '**Live coding** é programar ao vivo, com alguém acompanhando: por videochamada com tela compartilhada, num editor online ou numa lousa. O que conta ponto não é só o código final, mas o caminho: as perguntas que você faz, os exemplos que testa e como corrige o rumo.',
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Entender',
              text: 'Repita o problema com suas palavras e pergunte sobre o que não está claro: que tipo de dado entra, o que deve sair, o que fazer com entrada vazia. Perguntar não é fraqueza, é o que pessoas experientes fazem no trabalho.',
            },
            {
              title: 'Exemplos',
              text: 'Escreva dois ou três casos pequenos com a resposta esperada: um caso comum, um caso de borda (lista vazia, valor repetido, número negativo) e, se couber, um caso grande.',
            },
            {
              title: 'Plano',
              text: 'Antes de digitar, diga o plano em português: “vou percorrer a lista uma vez, guardando o que já vi num dicionário”. Se a pessoa discordar, você descobre agora, e não depois de vinte minutos.',
            },
            {
              title: 'Código',
              text: 'Escreva com nomes claros e vá narrando. Se travar, diga onde travou. Uma solução simples que funciona vale mais do que uma ideia brilhante pela metade.',
            },
            {
              title: 'Testar',
              text: 'Rode seus exemplos, à mão ou no editor. Mostre que você mesmo procura o erro. Termine comentando o que melhoraria com mais tempo.',
            },
          ],
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem o roteiro de um bom live coding.',
          items: [
            'Repetir o problema com suas palavras e tirar dúvidas',
            'Escrever exemplos de entrada e saída, incluindo casos de borda',
            'Explicar o plano em voz alta antes de digitar',
            'Escrever o código narrando as decisões',
            'Rodar os exemplos e corrigir o que falhar',
            'Comentar limitações e o que melhoraria',
          ],
          explanation:
            'Repare que metade do roteiro acontece **antes** do código. É nessa parte que a maioria das pessoas iniciantes economiza tempo e depois perde muito mais.',
        },
        {
          type: 'quiz',
          question:
            'A pessoa entrevistadora diz: “Escreva uma função que remove os itens repetidos de uma lista.” Qual é o melhor primeiro movimento?',
          options: [
            {
              text: 'Começar a digitar logo, para mostrar agilidade',
              feedback:
                'Pressa parece eficiência, mas você ainda não sabe se a ordem importa ou o que fazer com lista vazia. Se errar a interpretação, vai reescrever tudo.',
            },
            {
              text: 'Perguntar se a ordem original precisa ser mantida e combinar o que acontece com uma lista vazia',
              correct: true,
              feedback:
                'Isso. Duas perguntas curtas mudam a solução: se a ordem importa, `list(set(itens))` não serve. E você mostra que pensa em casos de borda.',
            },
            {
              text: 'Dizer que vai usar a solução mais otimizada possível',
              feedback:
                'Prometer a solução ótima antes de entender o problema é arriscado. Primeiro uma solução correta; depois, se houver tempo, você melhora.',
            },
            {
              text: 'Ficar em silêncio pensando até ter a resposta completa',
              feedback:
                'Pensar é ótimo, mas em silêncio ninguém consegue avaliar nem ajudar. Diga o que está considerando, mesmo que ainda esteja incompleto.',
            },
          ],
        },
        {
          type: 'reveal',
          question:
            'Se você travar no meio do código e não souber continuar, o que é melhor dizer em voz alta?',
          answer:
            'Algo como: “Travei em como guardar os itens já vistos. Uma opção é uma lista, mas a busca fica lenta; vou usar um set”. Mostrar onde está a dúvida permite que a pessoa dê uma dica, e muitas entrevistas contam ponto justamente por saber pedir e usar ajuda.',
        },
      ],
    },
    {
      id: 'ler-o-erro',
      title: 'Depurar sob pressão: leia o erro primeiro',
      blocks: [
        {
          type: 'analogy',
          title: 'O exame antes do remédio',
          text: 'Uma boa médica do posto de saúde não receita três remédios ao mesmo tempo para ver qual funciona. Ela pergunta os sintomas, pede um exame e só então trata. Depurar é igual: **depuração** é investigar por que o programa não faz o que deveria, e o primeiro exame é a mensagem de erro.',
        },
        {
          type: 'text',
          text: 'No Python, quando algo quebra aparece um **traceback**: o caminho que o programa percorreu até o erro. Com nervosismo, a tendência é ignorar esse texto e sair mexendo no código. Ler com calma economiza minutos preciosos.',
        },
        {
          type: 'anatomy',
          caption: 'Um traceback real do Python. Leia de baixo para cima.',
          language: 'text',
          parts: [
            {
              text: 'Traceback (most recent call last):\n',
              label: 'Cabeçalho',
              note: '“A chamada mais recente por último”: a pista mais importante fica no **fim**. Por isso se lê de baixo para cima.',
            },
            {
              text: '  File "loja.py", line 9, in <module>\n    print(total_do_carrinho(carrinho))\n',
              label: 'Onde começou',
              note: 'A linha 9 chamou a função. Ela não tem culpa: só acionou o código que quebrou mais adiante.',
            },
            {
              text: '  File "loja.py", line 4, in total_do_carrinho\n    total += item["preco"] * item["qtd"]\n',
              label: 'Onde quebrou',
              note: 'Arquivo, número da linha, nome da função e o próprio código. É aqui que você coloca o olho primeiro.',
            },
            {
              text: 'TypeError',
              label: 'Tipo do erro',
              note: '`TypeError` significa operação com o tipo de dado errado. Outros comuns: `NameError` (nome não existe), `KeyError` (chave que não está no dicionário), `IndexError` (posição fora da lista).',
            },
            {
              text: ": can't multiply sequence by non-int of type 'str'",
              label: 'Mensagem',
              note: '“Não dá para multiplicar uma sequência por algo que não é inteiro, do tipo texto”. Tradução livre: alguém tentou multiplicar texto por texto.',
            },
          ],
        },
        {
          type: 'quiz',
          question: 'Olhando o traceback acima, qual é a hipótese mais provável?',
          options: [
            {
              text: 'O preço ou a quantidade chegaram como texto, por exemplo `"2"` em vez de `2`',
              correct: true,
              feedback:
                'Exato. Valores lidos de formulário, CSV ou API costumam chegar como `str`. A correção é converter com `int()` ou `float()` antes de multiplicar.',
            },
            {
              text: 'A linha 9 está errada, porque é a primeira que aparece',
              feedback:
                'A linha 9 só chamou a função. O traceback mostra o caminho, e o ponto da quebra é a última linha de código listada: a linha 4.',
            },
            {
              text: 'Falta um `try/except` em volta do cálculo',
              feedback:
                'Um `try/except` esconderia o sintoma sem resolver a causa: o total continuaria errado. Primeiro entenda por que o tipo está errado.',
            },
            {
              text: 'A variável `total` não foi criada',
              feedback:
                'Se `total` não existisse, o erro seria `NameError` ou `UnboundLocalError`. O tipo do erro já descarta essa hipótese.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Nem todo bug gera erro. Às vezes o programa roda e devolve a resposta errada, que é mais traiçoeiro. Aí a técnica é comparar: qual era o resultado esperado, qual veio, e em que linha os dois começam a se separar. Um `print` bem colocado mostra isso.',
        },
        {
          type: 'python',
          title: 'Conserte a contagem de aprovações',
          task: 'A regra da escola: aprova quem tira **7 ou mais**. A função abaixo roda sem erro, mas conta errado. Use `print` dentro do laço para ver cada nota visitada, encontre os dois bugs e corrija. Depois apague os prints de investigação.',
          code: 'def contar_aprovados(notas, minimo=7):\n    aprovados = 0\n    for i in range(1, len(notas)):\n        if notas[i] > minimo:\n            aprovados += 1\n    return aprovados\n\n\nprint(contar_aprovados([7, 5, 9]))  # esperado: 2',
          solution:
            'def contar_aprovados(notas, minimo=7):\n    aprovados = 0\n    for nota in notas:\n        if nota >= minimo:\n            aprovados += 1\n    return aprovados\n\n\nprint(contar_aprovados([7, 5, 9]))  # esperado: 2',
          checks: [
            {
              label: 'Quem tirou exatamente 7 conta como aprovado',
              test: 'contar_aprovados([7, 5, 9]) == 2',
            },
            { label: 'A primeira nota da lista não é pulada', test: 'contar_aprovados([8]) == 1' },
            { label: 'Lista vazia devolve zero', test: 'contar_aprovados([]) == 0' },
          ],
        },
      ],
    },
    {
      id: 'reproduzir-e-isolar',
      title: 'Reproduzir pequeno, isolar a causa',
      blocks: [
        {
          type: 'text',
          text: 'Uma **reprodução mínima** é o menor exemplo que ainda mostra o bug. Se o relatório de vendas do mês sai errado, você não investiga com 30 mil pedidos: tenta com dois. Quanto menor o exemplo, mais rápido você enxerga a causa.',
        },
        {
          type: 'trace',
          caption:
            'A função deveria dizer se a lista tem algum número negativo. Com `[3, -1]` ela responde `False`. Siga a execução e encontre o momento exato do erro.',
          code: 'def tem_negativo(valores):\n    for v in valores:\n        if v < 0:\n            return True\n        else:\n            return False\n    return False\n\nprint(tem_negativo([3, -1]))',
          steps: [
            {
              line: 1,
              note: 'O Python guarda a função. Nada dentro dela roda ainda.',
              memory: [['tem_negativo', 'função']],
            },
            {
              line: 9,
              note: 'A chamada com a reprodução mínima: só dois números, um positivo e um negativo.',
            },
            {
              line: 2,
              note: 'Primeira volta do laço: `v` recebe `3`.',
              memory: [
                ['tem_negativo', 'função'],
                ['valores', '[3, -1]'],
                ['v', '3'],
              ],
            },
            {
              line: 3,
              note: '`3 < 0` é falso, então a execução vai para o `else`.',
            },
            {
              line: 6,
              note: 'Aqui está o bug: `return` encerra a função **na primeira volta**. O `-1` nunca é visitado. A pessoa que escreveu queria dizer “se nenhum for negativo”, mas isso só se sabe depois do laço inteiro.',
            },
            {
              line: 9,
              note: 'A função devolve `False` e o resultado é impresso. Correção: apagar o `else` e deixar só o `return False` da linha 7, depois do laço.',
              memory: [['tem_negativo', 'função']],
              output: 'False',
            },
          ],
        },
        {
          type: 'classify',
          prompt:
            'Você está numa entrevista e o teste falhou. Quais atitudes ajudam a isolar a causa e quais atrasam a investigação?',
          buckets: ['Ajuda a isolar', 'Atrasa a investigação'],
          items: [
            { text: 'Reduzir a entrada ao menor exemplo que ainda falha', bucket: 0 },
            { text: 'Imprimir o valor da variável logo antes da linha suspeita', bucket: 0 },
            { text: 'Ler a última linha do traceback antes de mexer no código', bucket: 0 },
            { text: 'Dizer a hipótese em voz alta e testar uma de cada vez', bucket: 0 },
            { text: 'Mudar várias linhas ao mesmo tempo para ver se resolve', bucket: 1 },
            { text: 'Reescrever a função do zero sem entender o erro', bucket: 1 },
            { text: 'Envolver tudo num `try/except` para o erro sumir', bucket: 1 },
            { text: 'Apagar o teste que está falhando', bucket: 1 },
          ],
          explanation:
            'Depurar é eliminar hipóteses. Cada mudança precisa ser pequena e verificável; se você muda cinco coisas e passa a funcionar, não sabe qual delas resolveu, nem se criou outro bug.',
        },
        {
          type: 'python',
          title: 'Corrija a reprodução mínima',
          task: 'Conserte `tem_negativo` para que ela olhe a lista inteira antes de concluir que não há negativos.',
          code: 'def tem_negativo(valores):\n    for v in valores:\n        if v < 0:\n            return True\n        else:\n            return False\n    return False\n\n\nprint(tem_negativo([3, -1]))  # esperado: True',
          solution:
            'def tem_negativo(valores):\n    for v in valores:\n        if v < 0:\n            return True\n    return False\n\n\nprint(tem_negativo([3, -1]))  # esperado: True',
          checks: [
            {
              label: 'Acha o negativo mesmo quando ele não é o primeiro',
              test: 'tem_negativo([3, -1]) is True',
            },
            {
              label: 'Lista só com positivos devolve False',
              test: 'tem_negativo([2, 4, 6]) is False',
            },
            { label: 'Lista vazia devolve False', test: 'tem_negativo([]) is False' },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns sob pressão',
          text: 'Mexer no código antes de ler o erro, testar só o caso feliz, esquecer a lista vazia e ficar em silêncio por minutos. Os quatro têm a mesma cura: desacelerar, dizer o que está vendo e testar um exemplo pequeno.',
        },
      ],
    },
    {
      id: 'entrevista-de-revisao',
      title: 'A entrevista de revisão de código',
      blocks: [
        {
          type: 'text',
          text: 'Em vez de escrever, às vezes você recebe um trecho pronto e a pergunta: “o que você mudaria aqui?”. Isso se chama **revisão de código** (code review), e é parte do dia a dia: antes de entrar no projeto, toda mudança é lida por outra pessoa.',
        },
        {
          type: 'analogy',
          title: 'A vistoria do apartamento',
          text: 'Ao alugar um apartamento, você confere primeiro o que é perigoso (fio desencapado, gás vazando), depois o que não funciona (torneira quebrada), e só no fim o que é estético (parede riscada). Uma boa revisão tem a mesma ordem de prioridade.',
        },
        {
          type: 'anatomy',
          caption: 'Uma função que chegou para revisão. Clique nas partes destacadas.',
          language: 'python',
          parts: [
            { text: 'def relatorio(conn, cidade):\n    ' },
            {
              text: 'sql = f"SELECT nome, email FROM clientes WHERE cidade = \'{cidade}\'"',
              label: 'Segurança',
              note: "O texto que veio da pessoa usuária é colado dentro do SQL. Quem digitar `x' OR '1'='1` lê a tabela inteira. Isso é **SQL injection**; a correção é usar parâmetros: `conn.execute(\"... WHERE cidade = ?\", (cidade,))`.",
            },
            { text: '\n    ' },
            {
              text: 'x',
              label: 'Legibilidade',
              note: 'O nome `x` não diz o que guarda. `clientes` ou `linhas` deixa o resto da função mais fácil de ler.',
            },
            { text: ' = conn.execute(sql).fetchall()\n    unicos = []\n    for c in x:\n        ' },
            {
              text: 'if c not in unicos:',
              label: 'Desempenho',
              note: '`in` numa lista percorre a lista inteira. Dentro de um laço, isso vira trabalho que cresce ao quadrado. Com um `set` de vistos, cada verificação é quase instantânea.',
            },
            {
              text: '\n            unicos.append(c)\n    try:\n        media = len(unicos) / len(x)\n    ',
            },
            {
              text: 'except:',
              label: 'Bug escondido',
              note: 'Um `except` sem tipo engole **qualquer** erro, inclusive os que você nem imaginou. Seja específico (`except ZeroDivisionError`) ou, melhor ainda, trate o caso vazio com um `if`.',
            },
            { text: '\n        media = 0\n    return ' },
            {
              text: 'unicos[1:]',
              label: 'Bug',
              note: '`[1:]` corta o primeiro elemento. Nada no nome da função sugere isso: o primeiro cliente some do relatório.',
            },
            { text: ', media' },
          ],
        },
        {
          type: 'classify',
          prompt: 'Classifique cada problema encontrado em revisões de código.',
          buckets: ['Bug', 'Legibilidade', 'Segurança', 'Desempenho'],
          items: [
            { text: '`unicos[1:]` descarta o primeiro cliente sem motivo', bucket: 0 },
            { text: '`range(1, len(notas))` pula a primeira nota', bucket: 0 },
            { text: 'Variável chamada `x` que guarda a lista de clientes', bucket: 1 },
            { text: 'Função de 80 linhas que faz cinco coisas diferentes', bucket: 1 },
            { text: 'Texto digitado pela pessoa usuária colado dentro do SQL', bucket: 2 },
            { text: 'Senha do banco escrita no código e enviada ao Git', bucket: 2 },
            { text: '`c not in unicos` percorrendo a lista a cada volta', bucket: 3 },
            { text: 'Uma consulta ao banco feita dentro do laço, uma por pedido', bucket: 3 },
          ],
          explanation:
            'Nomear a categoria ajuda a priorizar e a conversar: “isto é um bug”, “isto é segurança, bloqueia a entrega”, “isto é legibilidade, pode ficar para depois”. Na entrevista, falar assim mostra maturidade.',
        },
        {
          type: 'quiz',
          question: 'Você tem tempo para um único comentário sobre a função acima. Qual deve ser?',
          options: [
            {
              text: 'Trocar a montagem do SQL por uma consulta com parâmetros',
              correct: true,
              feedback:
                'Isso. Uma falha de segurança pode expor dados de todos os clientes. É a primeira coisa a resolver, como o gás vazando na vistoria.',
            },
            {
              text: 'Renomear `x` para `clientes`',
              feedback:
                'É uma melhoria real, mas de legibilidade. Com um único comentário, priorize o que pode causar dano.',
            },
            {
              text: 'Usar um `set` para deixar a deduplicação mais rápida',
              feedback:
                'Bom ponto de desempenho, mas só importa com muitos dados. A injeção de SQL é perigosa com qualquer volume.',
            },
            {
              text: 'Padronizar aspas simples ou duplas no arquivo',
              feedback:
                'Estilo é o tipo de coisa que ferramentas como formatadores resolvem sozinhas. Em revisão, foque no que uma pessoa precisa enxergar.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Como falar na revisão',
          text: 'Comente o código, não a pessoa: “esta linha descarta o primeiro item, era a intenção?” funciona melhor do que “você errou”. Diga o problema, o impacto e uma sugestão. E reconheça o que está bom: revisão também é colaboração.',
        },
      ],
    },
    {
      id: 'consertar-e-provar',
      title: 'Conserte, prove e explique',
      blocks: [
        {
          type: 'text',
          text: 'Corrigir um bug tem três partes: entender a causa, mudar o código e **provar** que funcionou. A prova é um **teste de regressão**: um teste que reproduz o bug e passa a falhar se alguém, no futuro, trouxer o erro de volta.',
        },
        {
          type: 'text',
          text: 'Em Python, o jeito mais simples de escrever um teste é com `assert`: ele não faz nada se a condição for verdadeira e para o programa com `AssertionError` se for falsa. Em projetos reais, você usaria uma ferramenta como `pytest` (Python) ou Vitest (JavaScript), mas a ideia é a mesma.',
        },
        {
          type: 'python',
          title: 'Conserte a divisão da conta e escreva a regressão',
          task: 'A função divide a conta do restaurante entre as pessoas. Hoje ela perde os centavos e aceita zero ou menos pessoas. Faça ela devolver o valor com 2 casas (use `round`) e levantar `ValueError` quando `pessoas` for menor ou igual a zero. No fim, escreva pelo menos dois `assert` e imprima `testes ok`.',
          code: 'def dividir_conta(total, pessoas):\n    return total // pessoas\n\n\ndef levanta_valueerror(funcao, *args):\n    try:\n        funcao(*args)\n    except ValueError:\n        return True\n    except Exception:\n        return False\n    return False\n\n\n# Escreva aqui seus testes com assert\n# e, no fim, print("testes ok")',
          solution:
            'def dividir_conta(total, pessoas):\n    if pessoas <= 0:\n        raise ValueError("pessoas precisa ser maior que zero")\n    return round(total / pessoas, 2)\n\n\ndef levanta_valueerror(funcao, *args):\n    try:\n        funcao(*args)\n    except ValueError:\n        return True\n    except Exception:\n        return False\n    return False\n\n\nassert dividir_conta(100, 3) == 33.33\nassert dividir_conta(50, 2) == 25\nassert levanta_valueerror(dividir_conta, 10, 0)\nprint("testes ok")',
          checks: [
            { label: 'R$ 100 para 3 pessoas dá 33.33', test: 'dividir_conta(100, 3) == 33.33' },
            {
              label: 'Zero pessoas levanta ValueError',
              test: 'levanta_valueerror(dividir_conta, 10, 0)',
            },
            {
              label: 'Número negativo de pessoas levanta ValueError',
              test: 'levanta_valueerror(dividir_conta, 10, -2)',
            },
            {
              label: 'Seus testes rodaram até o fim e imprimiram "testes ok"',
              test: "'testes ok' in __saida__",
            },
          ],
        },
        {
          type: 'codeTabs',
          caption:
            'A mesma correção em Python e em JavaScript. Se a vaga for de frontend, a entrevista pode pedir a versão em JS.',
          tabs: [
            {
              label: 'Python',
              language: 'python',
              code: 'def dividir_conta(total, pessoas):\n    if pessoas <= 0:\n        raise ValueError("pessoas precisa ser maior que zero")\n    return round(total / pessoas, 2)\n\nassert dividir_conta(100, 3) == 33.33',
            },
            {
              label: 'JavaScript',
              language: 'js',
              code: 'function dividirConta(total, pessoas) {\n  if (pessoas <= 0) {\n    throw new Error("pessoas precisa ser maior que zero");\n  }\n  return Math.round((total / pessoas) * 100) / 100;\n}\n\nconsole.assert(dividirConta(100, 3) === 33.33);',
            },
          ],
        },
        {
          type: 'fill',
          prompt: 'Complete a explicação que você daria ao final, em voz alta, sobre a correção.',
          language: 'text',
          template:
            'Causa: o operador [[//]] descartava os centavos.\nCorreção: troquei por / e arredondei com [[round]].\nProva: um teste de [[regressão|regressao]] com 100 dividido por 3.\nLimitação: com centavos, a soma das partes pode dar 99.99.',
          explanation:
            'Causa, correção, prova e limitação: quatro frases que mostram domínio. Citar a limitação (os centavos que sobram na divisão) é o tipo de detalhe que impressiona, porque mostra que você pensou além do caso pedido.',
        },
      ],
    },
  ],
  recap: [
    'No live coding, metade do trabalho vem antes do código: entender, criar exemplos e explicar o plano em voz alta.',
    'O traceback se lê de baixo para cima: tipo do erro, mensagem e a última linha de código listada.',
    'Uma reprodução mínima e um `print` bem colocado isolam a causa mais rápido do que mexer em várias linhas.',
    'Na revisão, classifique o problema (bug, legibilidade, segurança, desempenho) e priorize o que causa dano.',
    'Todo conserto termina com um teste de regressão e uma explicação curta da causa, da correção e da limitação.',
  ],
  cards: [
    {
      id: 'roteiro-live-coding',
      front: 'Quais são os cinco passos de um bom live coding?',
      back: 'Entender o problema, escrever exemplos, explicar o plano, codificar narrando e testar.',
    },
    {
      id: 'ler-traceback',
      front: 'Por onde começar a ler um traceback do Python?',
      back: 'Pelo fim: o tipo do erro, a mensagem e a última linha de código listada, onde ele aconteceu.',
    },
    {
      id: 'reproducao-minima',
      front: 'O que é uma reprodução mínima?',
      back: 'O menor exemplo de entrada que ainda mostra o bug. Quanto menor, mais fácil achar a causa.',
    },
    {
      id: 'except-generico',
      front: 'Por que um `except:` sem tipo é perigoso?',
      back: 'Porque engole qualquer erro, inclusive bugs que você não previu, e esconde a causa real.',
    },
    {
      id: 'prioridade-revisao',
      front: 'Em uma revisão de código, qual tipo de problema se resolve primeiro?',
      back: 'Segurança, depois bugs, depois desempenho e legibilidade.',
    },
    {
      id: 'teste-regressao',
      front: 'O que é um teste de regressão?',
      back: 'Um teste que reproduz um bug já corrigido e falha se alguém trouxer o erro de volta.',
    },
  ],
  mission: {
    title: 'Corrija um bug de verdade e explique o diff',
    text: 'Pegue um projeto seu (ou um exercício antigo) e trate-o como uma entrevista: encontre ou provoque um bug, corrija com método e grave você mesmo explicando, como se alguém estivesse assistindo.',
    steps: [
      'Escolha uma função do seu projeto e escreva três exemplos de entrada e saída, incluindo um caso de borda',
      'Encontre um caso em que ela falha e reduza até uma reprodução mínima',
      'Corrija mudando uma coisa de cada vez e escreva um teste de regressão',
      'Leia o diff com `git diff` e explique em voz alta: causa, correção, prova e limitação',
      'Peça para alguém revisar e anote os comentários em bug, legibilidade, segurança ou desempenho',
    ],
  },
  sources: [
    {
      title: 'Tutorial do Python: erros e exceções',
      url: 'https://docs.python.org/pt-br/3/tutorial/errors.html',
    },
    {
      title: 'Google Engineering Practices: como fazer revisão de código',
      url: 'https://google.github.io/eng-practices/review/reviewer/',
    },
    {
      title: 'Documentação do Python: pdb, o depurador',
      url: 'https://docs.python.org/pt-br/3/library/pdb.html',
    },
  ],
};
