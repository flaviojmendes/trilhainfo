import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Hoje você pode conversar a qualquer hora com uma ferramenta que explica código, inventa exercícios e nunca perde a paciência. Isso é um presente para quem estuda sozinho, sem professor por perto. Mas a mesma ferramenta pode fazer você sentir que aprendeu sem ter aprendido nada. Nesta aula você entende o que ela é de verdade e como usá-la para pensar mais, e não menos.',
  sections: [
    {
      id: 'autocompletar-turbinado',
      title: 'Um autocompletar muito turbinado',
      blocks: [
        {
          type: 'analogy',
          title: 'O teclado do seu celular',
          text: 'Quando você digita “bom dia, tudo” no celular, o teclado sugere “bem”. Ele não sabe como você está: ele aprendeu, com muitas mensagens, que “bem” costuma vir depois. Agora imagine esse teclado treinado com uma biblioteca inteira, sites, livros e código. É assim que funciona um assistente de IA como ChatGPT, Claude ou o chat do Cursor.',
        },
        {
          type: 'text',
          text: 'Por trás desses assistentes está um **LLM** (modelo de linguagem grande, na sigla em inglês). Um LLM é um programa que, dado um texto, calcula qual pedaço de texto tem mais chance de vir em seguida. Ele escreve a resposta assim: uma palavra (ou pedaço de palavra) por vez, sempre escolhendo uma continuação provável.',
        },
        {
          type: 'code',
          language: 'text',
          caption: 'Como o modelo enxerga a sua frase: candidatos para a próxima palavra',
          code: `Texto até agora: "Para somar dois números em Python, use o operador"

Próxima palavra provável:
  "+"          muito provável
  "soma"       pouco provável
  "pizza"      quase impossível`,
        },
        {
          type: 'text',
          text: 'Isso explica as duas faces da ferramenta. Como ela leu muito texto bom sobre programação, a continuação provável costuma estar certa. Mas ela não consulta uma fonte nem testa o que diz: ela escreve o que **parece** a resposta certa.',
        },
        {
          type: 'quiz',
          question:
            'Você pergunta a um assistente de IA como criar uma lista em Python. O que ele está fazendo, de fato?',
          options: [
            {
              text: 'Gerando, palavra por palavra, o texto que tem mais chance de ser uma boa continuação da sua pergunta',
              correct: true,
              feedback:
                'Isso. É uma previsão muito sofisticada, mas é previsão. Por isso a resposta costuma ser boa e, às vezes, sai errada com a mesma segurança.',
            },
            {
              text: 'Procurando a resposta na documentação oficial do Python',
              feedback:
                'Um LLM sozinho não consulta documentos. Algumas ferramentas fazem buscas na internet, mas mesmo assim o texto final é gerado por previsão, e pode misturar coisas.',
            },
            {
              text: 'Rodando o código no computador dele para ver se funciona',
              feedback:
                'Na conversa comum, nada é executado. Algumas ferramentas conseguem rodar código quando você permite, mas a resposta de um chat não vem testada por padrão.',
            },
            {
              text: 'Entendendo a pergunta como uma pessoa programadora entenderia',
              feedback:
                'Parece, porque o texto é muito natural. Mas o modelo não tem experiência nem consegue conferir nada sozinho. Tratar a resposta como opinião de especialista é o que leva a erros.',
            },
          ],
        },
      ],
    },
    {
      id: 'bom-e-fraco',
      title: 'No que ela ajuda e onde tropeça',
      blocks: [
        {
          type: 'text',
          text: 'Saber o ponto forte de uma ferramenta é metade do uso. Uma furadeira é ótima para fazer furos e péssima para martelar. Com IA é igual: ela brilha em algumas tarefas e é arriscada em outras.',
        },
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              title: 'Costuma ir bem',
              text: 'Assuntos muito comuns, que aparecem em muito texto de qualidade.',
              points: [
                'Explicar um conceito de várias formas',
                'Traduzir uma mensagem de erro para linguagem simples',
                'Criar exercícios e perguntas de revisão',
                'Comentar um trecho curto de código',
              ],
            },
            {
              title: 'Desconfie mais',
              text: 'Coisas raras, recentes ou que exigem conferência exata.',
              points: [
                'Versões novas de bibliotecas e ferramentas',
                'Nomes exatos de funções, opções e comandos',
                'Contas, datas e números precisos',
                'Fatos sobre pessoas, empresas e leis',
              ],
            },
          ],
        },
        {
          type: 'classify',
          prompt:
            'Em qual destas tarefas um assistente de IA costuma acertar, e em qual você deve conferir com muito cuidado?',
          buckets: ['Costuma ir bem', 'Confira com cuidado'],
          items: [
            { text: 'Explicar o que é uma variável com uma analogia', bucket: 0 },
            { text: 'Dar três exemplos diferentes de um laço `for`', bucket: 0 },
            { text: 'Reescrever uma explicação difícil em palavras simples', bucket: 0 },
            { text: 'Criar cinco perguntas sobre o que você estudou hoje', bucket: 0 },
            { text: 'Dizer qual é a versão mais recente de uma biblioteca', bucket: 1 },
            { text: 'Citar o nome exato de uma opção de um comando', bucket: 1 },
            { text: 'Calcular a média de uma lista longa de números de cabeça', bucket: 1 },
            { text: 'Afirmar o que diz um artigo específico da LGPD', bucket: 1 },
          ],
          explanation:
            'O modelo aprendeu com textos até uma certa data, então novidades podem estar fora do que ele viu. Detalhes exatos, como nomes, números e citações, são onde a previsão “parecida” vira erro. Explicações e exercícios aceitam muitas respostas boas, e ali ele brilha.',
        },
      ],
    },
    {
      id: 'alucinacao',
      title: 'Quando a resposta é inventada',
      blocks: [
        {
          type: 'text',
          text: 'Quando um LLM produz algo falso com cara de verdadeiro, chamamos isso de **alucinação**. Não é mentira de propósito: o modelo simplesmente gerou a continuação mais provável, e ela não corresponde à realidade. O perigo é que o tom é sempre o mesmo, confiante e bem escrito, acerte ou erre.',
        },
        {
          type: 'flow',
          caption: 'Uma alucinação sendo pega a tempo',
          actors: ['Você', 'IA', 'Fonte oficial'],
          steps: [
            {
              from: 0,
              to: 1,
              label: 'Como deixo texto maiúsculo?',
              text: 'Você está estudando Python e quer transformar “recife” em “RECIFE”.',
            },
            {
              from: 1,
              to: 0,
              label: 'Use texto.maiusculo()',
              text: 'A resposta vem confiante, com exemplo e tudo. Mas o nome do método foi traduzido para o português: ele não existe.',
              tone: 'error',
            },
            {
              from: 0,
              to: 0,
              label: 'Roda o código',
              text: "Você testa antes de acreditar. O Python responde `AttributeError: 'str' object has no attribute 'maiusculo'`.",
              tone: 'error',
            },
            {
              from: 0,
              to: 2,
              label: 'Métodos de str',
              text: 'Você abre a documentação oficial do Python e procura a lista de métodos de texto.',
            },
            {
              from: 2,
              to: 0,
              label: 'texto.upper()',
              text: 'A fonte confirma: o método é `upper()`. Agora você sabe a resposta e sabe onde conferir da próxima vez.',
              tone: 'ok',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'A IA responde sua dúvida com um exemplo de código e uma explicação muito segura. Qual é o sinal mais confiável de que a resposta está certa?',
          options: [
            {
              text: 'O código roda e o resultado bate com a documentação oficial',
              correct: true,
              feedback:
                'Isso. Executar e conferir na fonte são evidências que não dependem do tom da resposta. É o hábito que separa quem aprende de quem copia.',
            },
            {
              text: 'A explicação é longa, detalhada e usa termos técnicos',
              feedback:
                'Respostas alucinadas também são longas e cheias de termos. Detalhe não é prova: o modelo escreve com a mesma fluência quando erra.',
            },
            {
              text: 'Você perguntou de novo e ela repetiu a mesma resposta',
              feedback:
                'Repetir não confirma nada: o modelo pode prever o mesmo erro duas vezes. E, se você insistir que está errado, ele pode concordar sem razão.',
            },
            {
              text: 'A IA disse que tem certeza',
              feedback:
                'A “certeza” também é texto previsto. O modelo não tem um medidor interno confiável de quando está certo.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Peça para ela mostrar onde conferir',
          text: 'Uma boa pergunta de seguimento é “em que página da documentação oficial eu confirmo isso?”. Mas abra o link você mesmo: links e citações também podem ser inventados.',
        },
      ],
    },
    {
      id: 'tutor-nao-muleta',
      title: 'Tutor, não muleta',
      blocks: [
        {
          type: 'analogy',
          title: 'Ninguém fica forte vendo outra pessoa levantar peso',
          text: 'Na academia, o personal pode mostrar o movimento, corrigir sua postura e contar as repetições. Mas se ele levantar o peso por você, seu músculo não muda. Aprender funciona igual: o esforço de lembrar, tentar e errar é o que fortalece o “músculo” do raciocínio.',
        },
        {
          type: 'text',
          text: 'Pesquisadores chamam isso de **dificuldade desejável**: um esforço que parece atrapalhar na hora, mas faz você lembrar por muito mais tempo. Tentar resolver antes de ver a resposta é desconfortável, e é justamente por isso que funciona. Se a IA tira toda a dificuldade, tira também o aprendizado.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Explicação em níveis',
              text: 'Peça a mesma ideia em camadas: “explique como se eu tivesse 12 anos”, depois “agora com os termos técnicos”. Você sobe um degrau por vez.',
            },
            {
              term: 'Analogias',
              text: 'Peça uma comparação com algo do seu dia a dia, como fila do banco, receita ou grupo da família. Depois pergunte onde a analogia **falha**: toda comparação tem limites.',
            },
            {
              term: 'Exemplos e contraexemplos',
              text: 'Um exemplo mostra a ideia funcionando; um contraexemplo mostra quando ela não vale. Os dois juntos desenham a fronteira do conceito.',
            },
            {
              term: 'Pista em vez de resposta',
              text: 'Quando travar, peça “uma pista pequena, sem a solução”. Você continua fazendo o trabalho que ensina.',
            },
          ],
        },
        {
          type: 'classify',
          prompt:
            'Quais destes usos fazem você aprender, e quais só fazem parecer que você aprendeu?',
          buckets: ['Faz aprender', 'Ilusão de aprendizado'],
          items: [
            { text: 'Tentar o exercício e só depois pedir uma pista', bucket: 0 },
            {
              text: 'Pedir que ela explique o conceito com uma analogia e onde a analogia falha',
              bucket: 0,
            },
            { text: 'Pedir três perguntas para conferir se você entendeu', bucket: 0 },
            { text: 'Explicar a solução com suas palavras e pedir que aponte lacunas', bucket: 0 },
            { text: 'Colar o enunciado e copiar a solução sem tentar', bucket: 1 },
            { text: 'Ler cinco explicações seguidas sem escrever nenhum código', bucket: 1 },
            { text: 'Pedir para reescrever seu código inteiro sempre que der erro', bucket: 1 },
          ],
          explanation:
            'A pergunta que decide é: quem fez o esforço de pensar? Ler explicações dá uma sensação boa de familiaridade, mas familiaridade não é saber. Saber é conseguir fazer sem ajuda amanhã.',
        },
        {
          type: 'reveal',
          question:
            'Se a IA resolve o exercício em segundos, por que vale a pena gastar vinte minutos tentando sozinho primeiro?',
          answer:
            'Porque o exercício não existe para ter a resposta, e sim para treinar seu cérebro a chegar nela. Quando você tenta antes, a explicação da IA “encaixa” num lugar que você já preparou, e você lembra dela. Num teste, numa entrevista ou no primeiro emprego, a IA pode até estar disponível, mas quem precisa entender o problema é você.',
        },
      ],
    },
    {
      id: 'pedido-de-estudo',
      title: 'A anatomia de um bom pedido de estudo',
      blocks: [
        {
          type: 'text',
          text: 'O que você escreve para a IA se chama **prompt**. Um prompt de estudo bom faz duas coisas: dá contexto suficiente para a resposta servir para você e pede que a ferramenta **devolva trabalho**, em vez de entregar tudo pronto.',
        },
        {
          type: 'anatomy',
          caption: 'Um pedido de estudo completo. Explore cada parte.',
          language: 'text',
          parts: [
            {
              text: 'Estou aprendendo laços de repetição em Python, na trilha de Dados.',
              label: 'O que e onde',
              note: 'Diz o assunto e o seu momento. A mesma dúvida pede respostas diferentes para quem começou ontem e para quem já trabalha na área.',
            },
            { text: '\n' },
            {
              text: 'Meu objetivo é somar os valores de uma lista de compras.',
              label: 'Objetivo pequeno',
              note: 'Um resultado concreto e observável. “Entender laços” é vago; “somar esta lista” é algo que você consegue conferir.',
            },
            { text: '\n' },
            {
              text: 'Já tentei usar `for` e o total sai sempre 0.',
              label: 'Sua tentativa',
              note: 'Mostra que você pensou antes e dá à ferramenta a pista mais valiosa: o que aconteceu de fato.',
            },
            { text: '\n' },
            {
              text: 'Use este trecho: precos = [5, 12, 8]',
              label: 'Contexto sem dados privados',
              note: 'Um exemplo pequeno e inventado basta. Nunca cole senhas, dados de pessoas ou arquivos da empresa.',
            },
            { text: '\n' },
            {
              text: 'Explique com um exemplo curto e me faça uma pergunta para conferir se entendi.',
              label: 'Como quer aprender',
              note: 'Você pede explicação e uma verificação, e não a solução pronta.',
            },
            { text: '\n' },
            {
              text: 'Depois proponha uma variação do exercício e espere minha tentativa.',
              label: 'Trabalho de volta',
              note: 'A parte mais importante: a conversa termina com você praticando, não lendo.',
            },
          ],
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem uma sessão de estudo com IA bem feita.',
          items: [
            'Tentar o exercício sozinho e anotar onde travou',
            'Escrever o pedido com objetivo, tentativa e contexto',
            'Ler a explicação e rodar o exemplo',
            'Responder a pergunta que a IA fez para conferir',
            'Resolver a variação proposta sem olhar a resposta anterior',
          ],
          explanation:
            'Repare que você trabalha no começo e no fim. A IA fica no meio, como apoio. Se a sessão começa e termina na IA, quem treinou foi ela.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns de quem está começando',
          text: 'Aceitar a primeira resposta sem rodar o código. Trocar de ferramenta toda semana em vez de aprender bem uma só. Achar que precisa assinar um plano pago: comece com o que você já tem acesso e consulte os limites da sua conta. E o mais comum: pedir “resolve isso” e pular a parte de tentar.',
        },
        {
          type: 'quiz',
          question: 'Qual destes pedidos segue melhor a ideia de usar a IA como tutor?',
          options: [
            {
              text: '“Estou começando em HTML. Quero entender a diferença entre `div` e `section`. Explique com uma analogia, me dê um exemplo e depois me faça uma pergunta para ver se entendi.”',
              correct: true,
              feedback:
                'Isso. Diz o nível, o objetivo, o formato da explicação e termina com você respondendo uma pergunta.',
            },
            {
              text: '“Me explica HTML.”',
              feedback:
                'É um assunto enorme e sem objetivo. A resposta vai ser genérica e você não sai com nada para praticar.',
            },
            {
              text: '“Faz o exercício 3 da lista para mim.”',
              feedback:
                'Você recebe a resposta e perde o treino. Peça uma pista ou uma explicação do conceito por trás do exercício.',
            },
          ],
        },
      ],
    },
  ],
  recap: [
    'Um **LLM** gera texto prevendo a próxima palavra mais provável, como um autocompletar treinado com muito texto.',
    'Ele costuma ir bem em explicações e exercícios e tropeça em detalhes exatos, novidades e fatos específicos.',
    '**Alucinação** é uma resposta falsa com cara de verdadeira: rode o código e confira na documentação oficial.',
    'Use a IA como tutor: tente antes, peça explicação em níveis, analogias e pistas, e mantenha a **dificuldade desejável**.',
    'Um bom pedido de estudo diz assunto, objetivo, tentativa e contexto, e termina com a IA devolvendo trabalho para você.',
  ],
  cards: [
    {
      id: 'o-que-e-llm',
      front: 'Em uma frase, o que um LLM faz?',
      back: 'Gera texto prevendo, pedaço por pedaço, a continuação mais provável do que foi escrito.',
    },
    {
      id: 'alucinacao',
      front: 'O que é alucinação de IA?',
      back: 'Uma resposta falsa escrita com a mesma confiança de uma resposta certa, como um método que não existe.',
    },
    {
      id: 'como-confirmar',
      front: 'Como confirmar uma resposta de IA sobre código?',
      back: 'Rodando o código e conferindo na documentação oficial, aberta por você.',
    },
    {
      id: 'onde-desconfiar',
      front: 'Em que tipo de resposta a IA mais erra?',
      back: 'Detalhes exatos (nomes de funções, números, versões), novidades e fatos específicos.',
    },
    {
      id: 'dificuldade-desejavel',
      front: 'O que é dificuldade desejável?',
      back: 'Um esforço que parece atrapalhar na hora, como tentar antes de ver a resposta, mas faz você lembrar por mais tempo.',
    },
    {
      id: 'pedido-de-estudo',
      front: 'Quais partes um bom pedido de estudo tem?',
      back: 'Assunto e nível, objetivo pequeno, sua tentativa, contexto sem dados privados e um pedido de pergunta ou variação para você.',
    },
  ],
  mission: {
    title: 'Sua primeira sessão de tutoria',
    text: 'Escolha uma ferramenta de IA a que você já tenha acesso, como um chat gratuito ou o editor que você usa, e faça uma sessão de estudo de verdade sobre o assunto da sua trilha nesta semana. Se ainda não tiver acesso a nenhuma, siga a trilha normalmente e volte aqui quando tiver.',
    steps: [
      'Abra a ferramenta e descubra como conversar e como colar um trecho de código ou texto',
      'Tente um exercício da sua trilha sozinho e anote onde travou',
      'Escreva um pedido com assunto, objetivo, tentativa e contexto, pedindo uma pergunta de conferência no final',
      'Rode o exemplo que a IA der e confira um detalhe na documentação oficial',
      'Responda a pergunta da IA e resolva a variação proposta sem copiar a resposta anterior',
    ],
  },
  sources: [
    {
      title: 'GitHub: uso responsável de sugestões de IA',
      url: 'https://docs.github.com/pt/copilot/responsible-use/copilot-code-completion',
    },
    {
      title: 'OpenAI: prompting para tarefas de código (inglês)',
      url: 'https://developers.openai.com/codex/prompting/',
    },
    {
      title: 'Claude Code: boas práticas (inglês)',
      url: 'https://code.claude.com/docs/en/best-practices',
    },
  ],
};
