import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Duas pessoas fazem a mesma dúvida para a mesma IA e recebem respostas completamente diferentes: uma sai com uma explicação que resolve, a outra com um texto genérico que não ajuda em nada. A diferença quase nunca é a ferramenta, é o pedido. Nesta aula você aprende a transformar uma dúvida solta em uma tarefa clara e verificável, e a ajustar o pedido quando a resposta não serve.',
  sections: [
    {
      id: 'pedido-vago',
      title: 'O problema do pedido vago',
      blocks: [
        {
          type: 'analogy',
          title: 'O mecânico e o “barulho estranho”',
          text: 'Chegar na oficina e dizer “o carro está fazendo um barulho” obriga o mecânico a adivinhar. Agora compare com “quando freio a mais de 60 km/h, faz um chiado na roda da frente direita, começou depois que troquei a pastilha”. Com isso, ele já sabe onde olhar. A IA também não enxerga seu problema: ela só tem o que você escreve.',
        },
        {
          type: 'text',
          text: 'Na aula anterior você viu que a IA gera a continuação mais provável do seu texto. Se o texto é vago, a continuação provável é uma resposta genérica, feita para “qualquer pessoa”. Quanto mais específico o pedido, mais a resposta serve para **você**.',
        },
        {
          type: 'codeTabs',
          caption: 'A mesma dúvida, pedida de dois jeitos',
          tabs: [
            {
              label: 'Pedido fraco',
              language: 'text',
              code: `Meu código de média não funciona. Arruma.`,
            },
            {
              label: 'Pedido forte',
              language: 'text',
              code: `Estou aprendendo Python há duas semanas.
Quero calcular a média das notas [7, 8, 9]; o esperado é 8.0.
Meu código:
    notas = [7, 8, 9]
    media = sum(notas) / 2
    print(media)
Ele imprime 12.0.
Não me dê o código pronto: me ajude a achar o erro com uma pergunta
e explique o conceito por trás em poucas linhas.`,
            },
          ],
        },
        {
          type: 'quiz',
          question: 'No pedido forte, qual informação mais ajuda a IA a achar o erro rapidamente?',
          options: [
            {
              text: 'O resultado esperado (8.0) junto com o resultado observado (12.0)',
              correct: true,
              feedback:
                'Isso. A diferença entre esperado e observado é a pista principal: 24 dividido por 2 dá 12. Com esses dois números, qualquer pessoa, ou ferramenta, enxerga que a divisão está errada.',
            },
            {
              text: 'A frase “estou aprendendo Python há duas semanas”',
              feedback:
                'Ajuda a ajustar o nível da explicação, mas não aponta o erro. Sem esperado e observado, a IA ainda teria de adivinhar o que está errado.',
            },
            {
              text: 'O pedido para não dar o código pronto',
              feedback:
                'Ajuda você a aprender, mas não ajuda a encontrar o problema. É uma instrução sobre o formato da ajuda.',
            },
          ],
        },
      ],
    },
    {
      id: 'seis-pecas',
      title: 'As seis peças de um bom pedido',
      blocks: [
        {
          type: 'text',
          text: 'Não existe fórmula mágica, mas os pedidos que funcionam costumam ter algumas peças em comum. Você não precisa usar todas sempre: para uma dúvida rápida, duas ou três bastam. Conhecer as peças ajuda a perceber o que faltou quando a resposta não serve.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Papel',
              text: 'Como a IA deve agir: “seja um tutor paciente”, “revise como alguém do time de testes”. Ajusta o tom e o foco.',
            },
            {
              term: 'Contexto',
              text: 'Quem você é, o que está construindo, o trecho relevante, a versão usada e o que já tentou.',
            },
            {
              term: 'Tarefa',
              text: 'O que você quer, com um verbo claro: explicar, comparar, achar o erro, sugerir casos de teste.',
            },
            {
              term: 'Formato',
              text: 'Como quer receber: em até cinco linhas, em tabela, com um exemplo, uma pergunta por vez.',
            },
            {
              term: 'Restrições',
              text: 'Limites: “sem bibliotecas externas”, “não reescreva o arquivo inteiro”, “use só o que vimos: listas e laços”.',
            },
            {
              term: 'Exemplos',
              text: 'Uma entrada e a saída esperada. Exemplos dizem mais do que parágrafos de descrição.',
            },
          ],
        },
        {
          type: 'anatomy',
          caption: 'Um pedido com as seis peças. Explore cada uma.',
          language: 'text',
          parts: [
            {
              text: 'Seja um tutor paciente de programação para iniciantes.',
              label: 'Papel',
              note: 'Uma linha basta. Ela ajuda a ferramenta a escolher vocabulário e profundidade.',
            },
            { text: '\n' },
            {
              text: 'Estou na trilha de Backend e acabei de ver funções em JavaScript.',
              label: 'Contexto',
              note: 'Seu momento de estudo. A ferramenta evita usar coisas que você ainda não viu.',
            },
            { text: '\n' },
            {
              text: 'Explique a diferença entre `return` e `console.log` dentro de uma função.',
              label: 'Tarefa',
              note: 'Uma tarefa só, com um verbo claro. Várias perguntas misturadas geram respostas rasas para cada uma.',
            },
            { text: '\n' },
            {
              text: 'Responda em até seis linhas, com um exemplo de código curto.',
              label: 'Formato',
              note: 'Respostas longas cansam e escondem o essencial. Pedir um tamanho força o foco.',
            },
            { text: '\n' },
            {
              text: 'Não use classes nem async, que eu ainda não estudei.',
              label: 'Restrições',
              note: 'Evita uma resposta “certa” que você não consegue acompanhar.',
            },
            { text: '\n' },
            {
              text: 'Exemplo: dobro(4) deveria me devolver 8 para eu usar depois.',
              label: 'Exemplo',
              note: 'Mostra o caso concreto que você quer entender. A explicação vai girar em torno dele.',
            },
          ],
        },
        {
          type: 'classify',
          prompt: 'Cada trecho de pedido abaixo é principalmente qual peça?',
          buckets: ['Contexto', 'Tarefa', 'Formato', 'Restrições'],
          items: [
            { text: 'Uso Node 22 e o erro aparece ao rodar `npm start`', bucket: 0 },
            { text: 'Já tentei apagar a pasta `node_modules` e instalar de novo', bucket: 0 },
            { text: 'Liste três hipóteses para esse erro', bucket: 1 },
            { text: 'Explique o que esta consulta SQL faz', bucket: 1 },
            { text: 'Responda em uma tabela com hipótese e como testar', bucket: 2 },
            { text: 'Faça uma pergunta por vez', bucket: 2 },
            { text: 'Não mude os nomes das funções existentes', bucket: 3 },
            { text: 'Use apenas a biblioteca padrão do Python', bucket: 3 },
          ],
          explanation:
            'Contexto descreve a situação, tarefa diz o que fazer, formato diz como entregar e restrições dizem o que não pode. Quando uma resposta vem “certa, mas inútil”, quase sempre faltou uma dessas peças.',
        },
      ],
    },
    {
      id: 'tentativa-e-criterios',
      title: 'Mostre sua tentativa e como conferir',
      blocks: [
        {
          type: 'text',
          text: 'Duas peças valem ouro para quem aprende. A primeira é a **sua tentativa**: o código que você escreveu e o que aconteceu. A segunda é o **critério de verificação**: como você vai saber se a resposta está certa, de preferência com um exemplo de entrada e saída.',
        },
        {
          type: 'text',
          text: 'Mostrar a tentativa faz a IA corrigir o **seu** raciocínio, em vez de entregar outro do zero. E o critério transforma a resposta em algo testável: você roda o exemplo e vê se bate.',
        },
        {
          type: 'fill',
          prompt:
            'Complete o modelo de pedido de estudo com as palavras que faltam: o que você já fez, o que viu acontecer e o que a IA deve esperar antes do feedback.',
          language: 'text',
          template: `Estou aprendendo [conceito] na trilha [nome].
Meu objetivo é [resultado pequeno e observável].
Já [[tentei|testei|fiz]] [tentativa] e [[observei|vi|obtive]] [resultado ou erro].
Exemplo: para a entrada [x], a saída [[esperada|correta]] é [y].
Explique a ideia com um exemplo curto e faça uma [[pergunta]] para conferir minha compreensão.
Depois proponha uma variação do exercício. Aguarde minha [[tentativa|resposta]] antes de dar feedback.`,
          explanation:
            'Esse modelo junta as peças que mais ajudam no estudo: objetivo, tentativa, resultado, exemplo verificável e um pedido para a IA devolver trabalho. Guarde-o num arquivo de anotações e adapte a cada dúvida, sem tratar como fórmula fixa.',
        },
        {
          type: 'quiz',
          question:
            'Você pede ajuda com uma função que filtra pedidos acima de R$ 50, mas não diz nada sobre como conferir. A IA devolve uma função diferente da sua. O que faltou no pedido?',
          options: [
            {
              text: 'Sua tentativa e um exemplo: a lista de pedidos de entrada e quais deveriam sobrar',
              correct: true,
              feedback:
                'Isso. Com sua tentativa, a ajuda parte do seu código. Com o exemplo de entrada e saída, você roda e confere em segundos se a resposta está certa.',
            },
            {
              text: 'Um papel mais detalhado, como “seja uma pessoa sênior com 20 anos de experiência”',
              feedback:
                'O papel ajusta o tom, mas não substitui informação. Sem saber o que você fez e o que espera, nem a pessoa mais experiente acertaria o alvo.',
            },
            {
              text: 'Pedir com mais educação',
              feedback:
                'Ser educado não atrapalha, mas não muda o que a ferramenta sabe sobre o problema. O que melhora a resposta é informação concreta.',
            },
          ],
        },
      ],
    },
    {
      id: 'perguntas-de-volta',
      title: 'Deixe a IA perguntar',
      blocks: [
        {
          type: 'text',
          text: 'Às vezes você nem sabe que informação está faltando. Um truque simples resolve: peça que a IA **faça perguntas antes de responder**. Algo como “antes de sugerir qualquer coisa, me faça até três perguntas sobre o que não ficou claro”.',
        },
        {
          type: 'flow',
          caption: 'Um pedido que começa com perguntas de volta',
          actors: ['Você', 'IA', 'Seu código'],
          steps: [
            {
              from: 0,
              to: 1,
              label: 'Formulário não envia',
              text: 'Você descreve o problema e pede: “antes de responder, me pergunte o que precisar saber”.',
            },
            {
              from: 1,
              to: 0,
              label: 'Aparece algum erro?',
              text: 'A IA pergunta se há mensagem no console e se o botão está dentro do formulário.',
            },
            {
              from: 0,
              to: 2,
              label: 'Abre o console',
              text: 'Para responder, você vai olhar. Muitas vezes, só de procurar a resposta, você já acha o problema.',
            },
            {
              from: 2,
              to: 0,
              label: 'TypeError na linha 12',
              text: 'O console mostra um erro que você não tinha percebido.',
              tone: 'error',
            },
            {
              from: 0,
              to: 1,
              label: 'Erro completo + trecho',
              text: 'Agora o pedido tem a evidência certa, e a explicação vem focada no que realmente aconteceu.',
              tone: 'ok',
            },
          ],
        },
        {
          type: 'reveal',
          question:
            'Por que pedir perguntas de volta ajuda até quando a IA já poderia responder de primeira?',
          answer:
            'Porque uma resposta de primeira se baseia em suposições, e você nem vê quais foram. As perguntas tornam essas suposições visíveis: se a IA pergunta “você está usando React?” e você não está, ela ia responder sobre a coisa errada. Além disso, responder perguntas sobre o próprio problema obriga você a observá-lo melhor.',
        },
        {
          type: 'quiz',
          question:
            'Em que situação faz mais sentido pedir que a IA faça perguntas antes de responder?',
          options: [
            {
              text: 'Quando o problema é confuso e você não sabe bem o que é relevante contar',
              correct: true,
              feedback:
                'Isso. As perguntas guiam você até a informação que importa, e a resposta seguinte fica muito mais certeira.',
            },
            {
              text: 'Quando você quer só saber o que significa a sigla HTML',
              feedback:
                'Para uma dúvida simples e direta, perguntas de volta só atrasam. Use o truque quando o contexto for incerto.',
            },
            {
              text: 'Nunca: a IA deveria adivinhar o que você quer',
              feedback:
                'Ela vai adivinhar, sim, e sem avisar quais suposições fez. Pedir perguntas é a forma de controlar isso.',
            },
          ],
        },
      ],
    },
    {
      id: 'iterar',
      title: 'Ajuste o pedido a partir da resposta',
      blocks: [
        {
          type: 'analogy',
          title: 'Temperar a comida',
          text: 'Ninguém acerta o sal de primeira em uma receita nova. Você prova, ajusta um pouco, prova de novo. Com prompts é igual: a primeira resposta é uma prova. Se veio avançada demais, longa demais ou fora do assunto, você muda **uma coisa** no pedido e tenta de novo.',
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem o ciclo de melhorar um pedido.',
          items: [
            'Escrever o pedido com objetivo, contexto e critério de verificação',
            'Ler a resposta e rodar o exemplo que veio nela',
            'Comparar o resultado com o critério que você definiu',
            'Identificar o que faltou ou sobrou no pedido',
            'Mudar uma coisa no pedido e perguntar de novo',
            'Anotar qual informação melhorou a resposta',
          ],
          explanation:
            'O último passo é o que faz você melhorar com o tempo: depois de algumas semanas, você sabe quais informações sempre ajudam no seu tipo de dúvida. Mudar uma coisa por vez mostra qual mudança fez diferença.',
        },
        {
          type: 'quiz',
          question:
            'A resposta da IA usou `map`, `filter` e `reduce`, e você só estudou laços `for`. Qual é o melhor ajuste?',
          options: [
            {
              text: 'Acrescentar uma restrição: “use apenas laços for, que é o que eu já estudei”',
              correct: true,
              feedback:
                'Isso. Uma restrição clara resolve o problema na próxima tentativa. Depois, se quiser, peça uma comparação com `map` para aprender a próxima ferramenta.',
            },
            {
              text: 'Copiar a resposta mesmo assim, já que funciona',
              feedback:
                'Funciona, mas você não consegue explicar nem alterar. Na primeira mudança, você fica preso ao código que não entende.',
            },
            {
              text: 'Abrir uma conversa nova e mandar o mesmo pedido de novo',
              feedback:
                'Pode vir algo parecido, porque o pedido continua sem dizer o que você já sabe. Mude o pedido, não só a tentativa.',
            },
            {
              text: 'Trocar de ferramenta de IA',
              feedback:
                'Outra ferramenta, com o mesmo pedido, tende a cometer o mesmo desencontro. O problema estava na falta de restrição.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Armadilhas comuns',
          text: 'Decorar “prompts mágicos” da internet em vez de entender as peças. Escrever um pedido gigante com dez tarefas misturadas. Mudar tudo de uma vez e não saber o que funcionou. E aceitar uma resposta sem rodar o exemplo: um pedido ótimo continua gerando respostas que precisam ser conferidas.',
        },
      ],
    },
  ],
  recap: [
    'A IA só sabe o que você escreve: pedidos vagos geram respostas genéricas.',
    'Bons pedidos combinam papel, contexto, tarefa, formato, restrições e exemplos, na medida que a dúvida pede.',
    'Mostrar sua tentativa e um exemplo de entrada e saída torna a resposta focada e fácil de conferir.',
    'Pedir que a IA faça perguntas antes de responder revela suposições escondidas.',
    'Trate a primeira resposta como uma prova: mude uma coisa no pedido por vez e anote o que melhorou.',
  ],
  cards: [
    {
      id: 'seis-pecas',
      front: 'Quais são as seis peças que costumam aparecer em um bom pedido?',
      back: 'Papel, contexto, tarefa, formato, restrições e exemplos.',
    },
    {
      id: 'esperado-observado',
      front: 'Qual par de informações mais ajuda a IA a achar um erro?',
      back: 'O resultado esperado e o resultado observado, com o exemplo de entrada.',
    },
    {
      id: 'por-que-tentativa',
      front: 'Por que mostrar sua tentativa no pedido?',
      back: 'Para a ajuda partir do seu raciocínio e corrigir o seu erro, em vez de entregar outra solução do zero.',
    },
    {
      id: 'perguntas-de-volta',
      front: 'Para que serve pedir que a IA faça perguntas antes de responder?',
      back: 'Revela suposições escondidas e guia você até a informação que faltava.',
    },
    {
      id: 'restricao',
      front: 'A resposta usou algo que você não estudou. Que peça do pedido ajustar?',
      back: 'As restrições, por exemplo: “use apenas o que já estudei: listas e laços”.',
    },
    {
      id: 'iterar-uma-coisa',
      front: 'Por que mudar uma coisa por vez ao ajustar um pedido?',
      back: 'Para saber qual mudança melhorou a resposta e aprender o que sempre ajuda.',
    },
  ],
  mission: {
    title: 'Compare um pedido vago com um pedido completo',
    text: 'Pegue uma dúvida real da sua trilha desta semana, de preferência um exercício em que você travou, e faça a mesma pergunta de dois jeitos. O objetivo é descobrir, com evidência, qual informação melhora a resposta.',
    steps: [
      'Escreva um pedido vago, de uma linha, e salve a resposta',
      'Escreva um pedido com objetivo, sua tentativa, o resultado observado e um exemplo de entrada e saída esperada',
      'Rode os exemplos das duas respostas e confira qual bate com o seu critério',
      'Ajuste uma única coisa no pedido completo, como uma restrição ou o formato, e pergunte de novo',
      'Anote em duas linhas qual informação mais melhorou a resposta',
    ],
  },
  sources: [
    {
      title: 'OpenAI: prompting para tarefas de código (inglês)',
      url: 'https://developers.openai.com/codex/prompting/',
    },
    {
      title: 'Cursor: prompts e contexto (inglês)',
      url: 'https://cursor.com/docs/agent/prompting',
    },
    {
      title: 'Claude Code: boas práticas (inglês)',
      url: 'https://code.claude.com/docs/en/best-practices',
    },
  ],
};
