import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Numa entrevista, quem avalia não enxerga dentro da sua cabeça: só ouve o que você diz e vê o que você escreve. Muita gente boa é reprovada porque resolveu em silêncio e errou um detalhe, enquanto outra pessoa, que explicou o caminho e pediu ajuda no ponto certo, avançou. Raciocinar em voz alta, perguntar antes de resolver e contar uma experiência com começo, meio e fim são habilidades que se treinam, como qualquer outra.',
  sections: [
    {
      id: 'pensar-em-voz-alta',
      title: 'Pensar em voz alta',
      blocks: [
        {
          type: 'analogy',
          title: 'O GPS que narra o caminho',
          text: 'Um GPS que só dissesse “chegou” no final deixaria você nervoso o trajeto inteiro. O bom GPS avisa: “em 200 metros, vire à direita; trânsito à frente, recalculando”. Na entrevista técnica, você é o GPS: narrar o caminho deixa quem entrevista tranquilo, e permite que ela ajude quando você pegar a rua errada.',
        },
        {
          type: 'text',
          text: '**Pensar em voz alta** é contar o raciocínio enquanto resolve: o que você entendeu, que ideia vai tentar e por quê. Quem entrevista avalia o processo, não só o resultado. Uma solução incompleta, bem explicada, muitas vezes vale mais que uma completa e muda.',
        },
        {
          type: 'classify',
          prompt: 'Que falas ajudam quem entrevista a acompanhar você, e quais atrapalham?',
          buckets: ['Ajuda', 'Atrapalha'],
          items: [
            { text: '“Vou começar pelo caso simples e depois trato a lista vazia”', bucket: 0 },
            {
              text: '“Pensei em ordenar antes, mas isso muda a ordem, então vou usar um conjunto”',
              bucket: 0,
            },
            { text: '“Acho que tem um erro aqui; vou testar com um exemplo pequeno”', bucket: 0 },
            { text: 'Dez minutos em silêncio até ter a resposta completa', bucket: 1 },
            {
              text: 'Ditar cada caractere: abre parêntese, ponto e vírgula, fecha chave',
              bucket: 1,
            },
            { text: '“Isso é fácil”, sem explicar o porquê', bucket: 1 },
          ],
          explanation:
            'Boa narração fala de **intenção** e **decisão**: o que você vai fazer e por que escolheu isso. Ditar sintaxe não mostra raciocínio, e silêncio longo impede que alguém ajude.',
        },
        {
          type: 'quiz',
          question:
            'No meio de um exercício ao vivo você trava e não sabe como continuar. Qual a melhor atitude?',
          options: [
            {
              text: 'Dizer onde travou, o que já tentou e qual ideia está considerando, e perguntar se pode testar com um exemplo',
              correct: true,
              feedback:
                'Isso. Travar é normal e quem entrevista sabe disso. Mostrar o ponto exato do bloqueio permite uma dica, e saber usar uma dica também é uma habilidade de trabalho.',
            },
            {
              text: 'Ficar em silêncio até a ideia aparecer, para não parecer insegura',
              feedback:
                'O silêncio parece justamente insegurança, e ninguém consegue ajudar. Falar em voz alta é o oposto de parecer perdida.',
            },
            {
              text: 'Apagar tudo e começar outra abordagem sem avisar',
              feedback:
                'Trocar de ideia pode ser ótimo, mas explique por quê. Sem isso, quem assiste não entende se você achou um problema ou entrou em pânico.',
            },
          ],
        },
      ],
    },
    {
      id: 'perguntas-de-esclarecimento',
      title: 'Perguntar antes de resolver',
      blocks: [
        {
          type: 'text',
          text: 'Enunciados de entrevista costumam ser curtos de propósito. Antes de codar, faça **perguntas de esclarecimento**: perguntas que tiram dúvidas sobre o que o problema pede. Elas mostram o que se espera no trabalho de verdade, onde quase nenhum pedido chega completo.',
        },
        {
          type: 'code',
          language: 'text',
          caption: 'O enunciado, como a pessoa entrevistadora falou',
          code: 'Escreva uma função que recebe a lista de números de pedidos do dia\ne devolve a lista sem pedidos duplicados.',
        },
        {
          type: 'classify',
          prompt: 'Quais perguntas ajudam a entender esse problema antes de começar?',
          buckets: ['Ajuda a entender o problema', 'Não ajuda agora'],
          items: [
            { text: 'Preciso manter a ordem em que os pedidos chegaram?', bucket: 0 },
            { text: 'A lista pode vir vazia?', bucket: 0 },
            { text: 'Quantos pedidos, no máximo, chegam num dia?', bucket: 0 },
            { text: 'Posso alterar a lista original ou devo devolver uma nova?', bucket: 0 },
            { text: 'Qual é a resposta certa?', bucket: 1 },
            { text: 'Esse exercício vai cair na próxima etapa também?', bucket: 1 },
          ],
          explanation:
            'As boas perguntas mudam a solução: manter a ordem exclui algumas abordagens, e o tamanho da lista diz se desempenho importa. Perguntas sobre o processo seletivo são legítimas, mas ficam para o fim da conversa.',
        },
        {
          type: 'reveal',
          question:
            'A pessoa entrevistadora responde “você decide”. Isso quer dizer que a pergunta foi inútil?',
          answer:
            'Não. Agora você declara a sua escolha em voz alta: “vou manter a ordem de chegada, porque num relatório do dia isso faz sentido”. Assumir uma premissa e dizer qual é mostra critério, e evita que a sua solução seja julgada por uma regra que você nem conhecia.',
        },
      ],
    },
    {
      id: 'exemplo-e-testes',
      title: 'Um exemplo pequeno e testes antes de terminar',
      blocks: [
        {
          type: 'text',
          text: 'Antes de escrever a solução, resolva **à mão** um exemplo pequeno, com três ou quatro itens. Acompanhe o que cada variável guarda a cada passo. Isso revela a ideia certa e, depois, vira o seu primeiro teste. Veja um problema parecido: achar o primeiro pedido repetido.',
        },
        {
          type: 'trace',
          caption: 'Narrando um exemplo pequeno, passo a passo',
          code: `def primeiro_repetido(pedidos):
    vistos = set()
    for pedido in pedidos:
        if pedido in vistos:
            return pedido
        vistos.add(pedido)
    return None

print(primeiro_repetido([7, 2, 7]))`,
          steps: [
            {
              line: 9,
              note: '“Vou testar com uma lista pequena, onde já sei a resposta: o 7 se repete.”',
              memory: [['pedidos', '[7, 2, 7]']],
            },
            {
              line: 2,
              note: '“Preciso lembrar o que já vi. Um conjunto, `set`, guarda valores sem repetição e responde rápido se um valor está lá.”',
              memory: [
                ['pedidos', '[7, 2, 7]'],
                ['vistos', 'set()'],
              ],
            },
            {
              line: 3,
              note: '“Primeiro pedido: 7.”',
              memory: [
                ['pedidos', '[7, 2, 7]'],
                ['vistos', 'set()'],
                ['pedido', '7'],
              ],
            },
            { line: 4, note: '“Já vi o 7? Ainda não.”' },
            {
              line: 6,
              note: '“Então guardo o 7 como visto.”',
              memory: [
                ['pedidos', '[7, 2, 7]'],
                ['vistos', '{7}'],
                ['pedido', '7'],
              ],
            },
            {
              line: 3,
              note: '“Próximo: 2.”',
              memory: [
                ['pedidos', '[7, 2, 7]'],
                ['vistos', '{7}'],
                ['pedido', '2'],
              ],
            },
            {
              line: 6,
              note: '“Não tinha visto o 2. Guardo.”',
              memory: [
                ['pedidos', '[7, 2, 7]'],
                ['vistos', '{7, 2}'],
                ['pedido', '2'],
              ],
            },
            {
              line: 3,
              note: '“Próximo: 7 de novo.”',
              memory: [
                ['pedidos', '[7, 2, 7]'],
                ['vistos', '{7, 2}'],
                ['pedido', '7'],
              ],
            },
            { line: 4, note: '“Já vi o 7? Sim. Achei o primeiro repetido.”' },
            { line: 5, note: '“Devolvo 7 e paro: não preciso olhar o resto da lista.”' },
            {
              line: 9,
              note: '“Bateu com o que eu esperava. Agora testo a lista vazia e uma lista sem repetidos, que deve dar `None`.”',
              output: '7',
            },
          ],
        },
        {
          type: 'python',
          title: 'Remova os duplicados e prove com testes',
          task: 'A função abaixo usa `set` e perde a ordem de chegada. Corrija para manter a ordem da primeira aparição (a ideia de `vistos` do exemplo ajuda) e escreva pelo menos quatro casos em `casos`, incluindo a lista vazia, uma lista sem repetidos e uma com todos iguais.',
          code: `def remover_duplicados(pedidos):
    return list(set(pedidos))

casos = [
    ([3, 1, 3, 2, 1], [3, 1, 2]),
]

for entrada, esperado in casos:
    resultado = remover_duplicados(entrada)
    status = 'ok' if resultado == esperado else 'FALHOU'
    print(status, entrada, '->', resultado, '| esperado:', esperado)`,
          solution: `def remover_duplicados(pedidos):
    vistos = set()
    resultado = []
    for pedido in pedidos:
        if pedido not in vistos:
            vistos.add(pedido)
            resultado.append(pedido)
    return resultado

casos = [
    ([3, 1, 3, 2, 1], [3, 1, 2]),
    ([], []),
    ([5, 6, 7], [5, 6, 7]),
    ([4, 4, 4], [4]),
]

for entrada, esperado in casos:
    resultado = remover_duplicados(entrada)
    status = 'ok' if resultado == esperado else 'FALHOU'
    print(status, entrada, '->', resultado, '| esperado:', esperado)`,
          checks: [
            {
              label: 'Mantém a ordem da primeira aparição',
              test: 'remover_duplicados([3, 1, 3, 2, 1]) == [3, 1, 2] and remover_duplicados([9, 8, 9]) == [9, 8]',
            },
            {
              label: 'Há pelo menos quatro casos, incluindo a lista vazia',
              test: 'len(casos) >= 4 and any(len(entrada) == 0 for entrada, esperado in casos)',
            },
            {
              label: 'Todos os casos passam',
              test: "all(remover_duplicados(list(entrada)) == esperado for entrada, esperado in casos) and 'FALHOU' not in __saida__",
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Diga os casos em voz alta',
          text: 'Antes de dizer “terminei”, fale: “vou testar vazio, sem repetição e tudo repetido”. Mesmo que não dê tempo de rodar todos, quem entrevista vê que você pensa nos **casos de borda**, as entradas extremas onde o código costuma quebrar.',
        },
      ],
    },
    {
      id: 'metodo-star',
      title: 'Perguntas comportamentais com STAR',
      blocks: [
        {
          type: 'text',
          text: '**Perguntas comportamentais** pedem uma história real: “conte de uma vez em que você errou”, “fale de um conflito no time”. A ideia é que o jeito como você agiu antes diz como vai agir depois. Elas aparecem em processos de todas as carreiras, de frontend a QA.',
        },
        {
          type: 'text',
          text: 'O método **STAR** organiza a resposta em quatro partes: **S**ituação, **T**arefa, **A**ção e **R**esultado. As iniciais vêm do inglês, mas funcionam igual em português. Ele evita os dois erros mais comuns: contar contexto demais e esquecer de dizer o que **você** fez.',
        },
        {
          type: 'anatomy',
          caption: 'Resposta para “conte de um problema difícil que você resolveu”',
          language: 'text',
          parts: [
            {
              text: 'No projeto final do curso técnico, éramos quatro pessoas e, a uma semana da entrega, o login parou de funcionar depois de uma atualização.',
              label: 'Situação',
              note: 'Onde, quando e qual era o problema, em uma ou duas frases. Contexto suficiente para entender, nada mais.',
            },
            { text: ' ' },
            {
              text: 'Eu cuidava da integração com a API, então fiquei responsável por descobrir o que tinha quebrado.',
              label: 'Tarefa',
              note: 'Qual era a **sua** parte. Deixa claro por que você está contando essa história.',
            },
            { text: ' ' },
            {
              text: 'Comparei a versão que funcionava com a nova pelo histórico do Git, achei a mudança no formato do token e escrevi um teste que reproduzia o erro antes de corrigir. Também mandava um resumo para o grupo todo dia.',
              label: 'Ação',
              note: 'A parte mais longa. Fale em primeira pessoa, “eu fiz”, mesmo que o trabalho tenha sido em grupo. Quem entrevista quer saber da sua contribuição.',
            },
            { text: ' ' },
            {
              text: 'Corrigimos em dois dias e entregamos no prazo. O teste passou a rodar em todo push, e eu aprendi a ler o histórico antes de sair mudando código.',
              label: 'Resultado',
              note: 'O que mudou, com número se tiver, e o que você aprendeu. Sem resultado, a história fica sem final.',
            },
          ],
        },
        {
          type: 'order',
          prompt:
            'Organize esta história, de alguém que ainda não trabalhou com tecnologia, na ordem do STAR, terminando pelo aprendizado.',
          items: [
            'Na padaria onde eu trabalhava, o caixa fechava com diferença quase toda semana',
            'A dona me pediu para descobrir de onde vinha a diferença',
            'Anotei cada venda numa planilha por duas semanas e comparei com o relatório do sistema',
            'Achei um produto cadastrado com o preço errado, e a diferença sumiu',
            'Aprendi que olhar os dados com calma resolve o que parecia mistério',
          ],
          explanation:
            'Situação, tarefa, ação, resultado e, por fim, o aprendizado. Repare que a história não tem nenhuma linha de código e mesmo assim mostra investigação, organização e uso de dados: exatamente o que se procura numa pessoa júnior.',
        },
        {
          type: 'fill',
          prompt:
            'Complete o roteiro que você pode usar para preparar suas histórias. Escreva o nome de cada parte do STAR.',
          language: 'text',
          template:
            '[[Situação|situação|Situacao|situacao]]: o que estava acontecendo e onde\n[[Tarefa|tarefa]]: o que cabia a você\n[[Ação|ação|Acao|acao]]: o que você fez, em primeira pessoa\n[[Resultado|resultado]]: o que mudou, com número se tiver',
          explanation:
            'Prepare de quatro a seis histórias nesse formato antes do processo: um erro, um conflito, algo que você aprendeu rápido, uma entrega difícil. Uma mesma história pode responder a várias perguntas.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Sua vida inteira conta',
          text: 'Se você nunca trabalhou na área, use outras experiências: emprego no comércio, trabalho voluntário, projeto da escola, cuidar da casa e da família enquanto estudava. Organizar, resolver conflito e aprender sob pressão são as mesmas habilidades em qualquer lugar.',
        },
      ],
    },
    {
      id: 'nao-sei-e-estrutura',
      title: 'O “não sei” e respostas com começo, meio e fim',
      blocks: [
        {
          type: 'text',
          text: 'Você vai ouvir perguntas que não sabe responder. Isso acontece com qualquer pessoa, em qualquer nível. O que se avalia é o que você faz a seguir: inventar, travar ou **raciocinar a partir do que sabe**.',
        },
        {
          type: 'table',
          caption: 'Trocas que mudam a impressão que você passa',
          head: ['Em vez de', 'Tente'],
          rows: [
            [
              '“Não sei.” e silêncio',
              '“Não usei isso ainda. Pelo nome, imagino que seja…, e eu confirmaria na documentação.”',
            ],
            [
              'Inventar uma resposta confiante',
              '“Não tenho certeza. O que eu sei é… Posso dizer como descobriria?”',
            ],
            [
              '“Desculpa, sou muito ruim nisso”',
              '“Esse ponto ainda é uma lacuna minha; estou estudando com…”',
            ],
          ],
        },
        {
          type: 'quiz',
          question:
            'Numa entrevista de backend perguntam: “o que acontece se duas pessoas atualizarem o mesmo registro ao mesmo tempo?”. Você nunca estudou isso. Qual resposta mostra mais?',
          options: [
            {
              text: '“Não estudei isso a fundo. Imagino que uma atualização possa sobrescrever a outra. Eu pesquisaria como o banco trata isso, talvez com transações ou travas.”',
              correct: true,
              feedback:
                'Isso. Você foi honesta, raciocinou a partir do que sabe e disse onde buscaria. Ninguém espera que uma pessoa júnior conheça tudo; espera que ela saiba avançar.',
            },
            {
              text: '“Isso nunca acontece na prática.”',
              feedback:
                'Acontece, e com frequência, em sistemas com muitos acessos. Negar o problema passa a impressão de que você não vai notá-lo no trabalho.',
            },
            {
              text: '“O banco resolve sozinho, não precisa se preocupar.”',
              feedback:
                'É uma resposta confiante e incompleta: depende de como o código e o banco estão configurados. Afirmar sem saber é pior que admitir a dúvida.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Para perguntas técnicas que você sabe, use uma estrutura de três tempos: **resposta curta** primeiro, depois um **exemplo** concreto e, se houver, uma **ressalva** sobre quando a resposta muda. Começar pela resposta evita que quem pergunta se perca esperando a conclusão.',
        },
        {
          type: 'quiz',
          question:
            'Pergunta: “qual a diferença entre um teste unitário e um teste end-to-end?”. Qual resposta segue a estrutura de três tempos?',
          options: [
            {
              text: '“O unitário testa uma peça isolada; o end-to-end testa o fluxo inteiro, como a pessoa usaria. No meu projeto, testo o cálculo do frete com unitário e o checkout com Playwright. O end-to-end pega mais problemas, mas é mais lento e quebra mais.”',
              correct: true,
              feedback:
                'Isso. Resposta curta, exemplo do seu projeto e uma ressalva que mostra que você entende o custo de cada tipo. Clara e verificável.',
            },
            {
              text: '“Então, quando comecei a estudar testes eu vi um vídeo que falava da pirâmide, e aí…”',
              feedback:
                'Começa pela história e deixa a resposta para depois. Quem pergunta fica esperando o ponto principal.',
            },
            {
              text: '“O end-to-end é melhor, sempre.”',
              feedback:
                'Curta, mas sem exemplo e errada como regra: cada tipo serve a um propósito. Uma ressalva mostraria critério.',
            },
          ],
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem um bom roteiro para um exercício técnico ao vivo.',
          items: [
            'Repetir o problema com suas palavras',
            'Fazer perguntas de esclarecimento e declarar premissas',
            'Resolver um exemplo pequeno à mão',
            'Escrever a solução mais simples que funciona',
            'Testar com casos de borda, falando em voz alta',
            'Discutir uma alternativa ou melhoria',
          ],
          explanation:
            'Repare que o código só aparece no quarto passo. Entender bem o problema economiza tempo e evita a pior situação: uma solução elegante para a pergunta errada.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns',
          text: 'Decorar respostas prontas e recitar sem entender. Começar a codar antes de terminar de ouvir. Dizer “nós fizemos” a história inteira, sem nunca dizer o que você fez. Pedir desculpas o tempo todo. Cada um desses tira de quem entrevista justamente o que ela precisava avaliar.',
        },
      ],
    },
  ],
  recap: [
    'Pensar em voz alta mostra intenção e decisão; silêncio longo impede que alguém acompanhe ou ajude.',
    'Perguntas de esclarecimento e premissas declaradas evitam resolver o problema errado.',
    'Resolva um exemplo pequeno à mão, depois escreva a solução simples e teste vazio, repetição e limites.',
    'Para perguntas comportamentais, use STAR: situação, tarefa, ação em primeira pessoa e resultado.',
    'Diante do “não sei”, seja honesta, raciocine a partir do que sabe e diga como descobriria.',
  ],
  cards: [
    {
      id: 'pensar-em-voz-alta',
      front: 'O que narrar quando você pensa em voz alta?',
      back: 'Intenção e decisão: o que você vai tentar e por que escolheu isso. Não a sintaxe caractere por caractere.',
    },
    {
      id: 'perguntas-esclarecimento',
      front: 'Cite duas perguntas de esclarecimento para “remova duplicados de uma lista”.',
      back: 'Preciso manter a ordem? A lista pode vir vazia? Quantos itens no máximo? Posso alterar a original?',
    },
    {
      id: 'star',
      front: 'O que significa STAR?',
      back: 'Situação, Tarefa, Ação e Resultado: a estrutura para responder perguntas comportamentais.',
    },
    {
      id: 'star-acao',
      front: 'Qual a parte mais longa de uma resposta STAR, e em que pessoa?',
      back: 'A ação, em primeira pessoa: o que você fez, mesmo num trabalho em grupo.',
    },
    {
      id: 'nao-sei',
      front: 'Como responder quando você não sabe?',
      back: 'Admitir com honestidade, raciocinar a partir do que sabe e dizer como descobriria.',
    },
    {
      id: 'tres-tempos',
      front: 'Qual a estrutura de três tempos para perguntas técnicas?',
      back: 'Resposta curta, exemplo concreto e uma ressalva sobre quando a resposta muda.',
    },
    {
      id: 'casos-de-borda',
      front: 'O que são casos de borda?',
      back: 'Entradas extremas onde o código costuma quebrar, como lista vazia, tudo repetido ou valores no limite.',
    },
  ],
  mission: {
    title: 'Resolva um exercício em voz alta',
    text: 'Escolha um exercício pequeno da sua carreira, como deduplicar pedidos, validar um CEP ou contar acessos por dia, e resolva gravando o áudio ou com alguém assistindo. Depois, ouça e avalie a sua comunicação, não só o código.',
    steps: [
      'Antes de codar, diga em voz alta três perguntas de esclarecimento e as premissas que você escolheu',
      'Resolva um exemplo pequeno à mão e escreva os casos de teste antes de finalizar',
      'Discuta em voz alta uma alternativa e o custo de cada uma',
      'Escreva três histórias no formato STAR: um erro, um conflito e algo que você aprendeu rápido',
      'Ouça a gravação e anote um momento de silêncio longo para treinar de novo',
    ],
  },
  sources: [
    {
      title: 'Tech Interview Handbook: técnicas para entrevistas de código (em inglês)',
      url: 'https://www.techinterviewhandbook.org/coding-interview-techniques/',
    },
    {
      title: 'Tech Interview Handbook: entrevistas comportamentais (em inglês)',
      url: 'https://www.techinterviewhandbook.org/behavioral-interview/',
    },
    {
      title: 'Documentação do Python: conjuntos',
      url: 'https://docs.python.org/pt-br/3/tutorial/datastructures.html#sets',
    },
  ],
};
