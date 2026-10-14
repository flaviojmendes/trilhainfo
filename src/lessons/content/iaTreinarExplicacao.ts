import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Em uma entrevista, ninguém pergunta se você já viu um conceito: pedem que você explique, em voz alta, por que fez o que fez. Muita gente sabe resolver o exercício e trava na hora de contar o raciocínio. Explicar é uma habilidade que se treina, e a IA pode ser uma parceira de treino disponível a qualquer hora, desde que você faça o esforço e ela só faça as perguntas.',
  sections: [
    {
      id: 'explicar-para-aprender',
      title: 'Explicar é o teste do entendimento',
      blocks: [
        {
          type: 'analogy',
          title: 'Explicar o Pix para a sua avó',
          text: 'Você usa Pix todo dia. Mas tente explicar para alguém que nunca usou: o que é a chave, por que cai na hora, o que acontece se digitar errado. Nos pontos em que você gagueja, descobre o que não sabia de verdade. Explicar transforma “acho que sei” em “sei” ou em “preciso estudar isto”.',
        },
        {
          type: 'text',
          text: 'Essa ideia tem nome: **técnica Feynman**, em homenagem ao físico Richard Feynman, famoso por explicar coisas difíceis com palavras simples. O roteiro é curto: escolha um conceito, explique como se fosse para alguém leigo, encontre onde travou, volte à fonte e simplifique de novo.',
        },
        {
          type: 'codeTabs',
          caption: 'Duas explicações do mesmo conceito. Qual mostra entendimento?',
          tabs: [
            {
              label: 'Decorada',
              language: 'text',
              code: `Uma variável é um espaço de memória nomeado que armazena
um valor de um determinado tipo de dado.`,
            },
            {
              label: 'Com suas palavras',
              language: 'text',
              code: `Uma variável é como uma etiqueta numa caixa. Eu escrevo
"total" na etiqueta e guardo 30 dentro. Depois posso abrir a
caixa pelo nome, ou trocar o que tem dentro: total = 45.
Onde a comparação falha: a caixa não "lembra" o valor antigo.`,
            },
          ],
        },
        {
          type: 'text',
          text: 'A primeira está correta, mas poderia ter sido copiada de um livro: não dá para saber se a pessoa entende. A segunda usa um exemplo, mostra como usar e ainda diz onde a analogia deixa de valer. É esse tipo de explicação que a técnica Feynman treina.',
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem a técnica Feynman com ajuda da IA.',
          items: [
            'Escolher um conceito pequeno, como “o que faz um `JOIN`”',
            'Escrever sua explicação em palavras simples, sem consultar nada',
            'Pedir que a IA aponte lacunas e erros na explicação, sem reescrevê-la',
            'Conferir cada crítica na documentação ou no seu código',
            'Reescrever a explicação mais curta e mais simples',
          ],
          explanation:
            'Repare que você escreve primeiro, antes de qualquer ajuda. Se a IA explica antes, você só reconhece a explicação dela, e reconhecer é muito mais fácil do que produzir. É produzir que você vai precisar fazer numa entrevista ou num code review.',
        },
      ],
    },
    {
      id: 'pato-de-borracha',
      title: 'O pato de borracha e o “explique de volta”',
      blocks: [
        {
          type: 'text',
          text: 'Muitas equipes de programação têm um costume curioso: explicar o código, linha por linha, para um **pato de borracha** de brinquedo em cima da mesa. Parece piada, mas funciona. Ao narrar o que cada linha deveria fazer, você mesmo percebe onde a realidade é diferente.',
        },
        {
          type: 'text',
          text: 'A IA pode ser um pato que responde. A diferença é a ordem: **você** explica primeiro, e ela devolve perguntas ou aponta trechos que não ficaram claros. Esse é o “explique de volta”: em vez de pedir uma explicação, você entrega a sua para ser examinada.',
        },
        {
          type: 'flow',
          caption: 'Uma sessão de “explique de volta”, com a crítica conferida',
          actors: ['Você', 'IA', 'Fonte oficial'],
          steps: [
            {
              from: 0,
              to: 1,
              label: 'Minha explicação de await',
              text: 'Você escreve: “o `await` pausa o programa inteiro até a resposta chegar”. E pede: aponte o que está impreciso, sem reescrever.',
            },
            {
              from: 1,
              to: 0,
              label: 'Pausa só a função async',
              text: 'A IA diz que o `await` pausa apenas a função `async` onde está; o resto do programa continua.',
            },
            {
              from: 0,
              to: 2,
              label: 'Confere na MDN',
              text: 'Feedback de IA também pode estar errado. Você procura a página sobre `await` na documentação.',
            },
            {
              from: 2,
              to: 0,
              label: 'Crítica confirmada',
              text: 'A documentação confirma: a execução da função assíncrona é pausada, não o programa todo.',
              tone: 'ok',
            },
            {
              from: 0,
              to: 0,
              label: 'Reescreve com suas palavras',
              text: 'Você corrige a explicação sozinho. Agora ela é sua, e você sabe de onde veio a correção.',
              tone: 'ok',
            },
          ],
        },
        {
          type: 'reveal',
          question: 'Por que pedir que a IA aponte lacunas “sem reescrever” a sua explicação?',
          answer:
            'Porque, se ela reescrever, você recebe uma explicação bonita que não é sua e tende a aceitá-la só porque soa bem. Apontar lacunas deixa o trabalho de corrigir com você. É como o professor que circula o erro na prova em vez de escrever a resposta certa: dá mais trabalho e ensina muito mais.',
        },
      ],
    },
    {
      id: 'ia-faz-perguntas',
      title: 'Peça para ser questionado',
      blocks: [
        {
          type: 'text',
          text: 'Lembrar algo sem olhar, como responder uma pergunta, fixa o conteúdo muito mais do que reler. Pesquisadores chamam isso de **prática de recuperação**. A IA é ótima para criar essas perguntas, contanto que você combine as regras do jogo antes.',
        },
        {
          type: 'fill',
          prompt: 'Complete o pedido de questionário com as palavras que faltam.',
          language: 'text',
          template: `Estudei [assunto] hoje. Me faça perguntas para revisar.
Faça uma pergunta por [[vez]] e espere minha resposta.
Não mostre a [[resposta|solução]] antes de eu tentar.
Se eu pedir ajuda, dê só uma [[pista|dica]] curta.
Depois de cada resposta, diga o que ficou certo e o que faltou.
No final, liste os pontos que eu errei para eu [[revisar|estudar]] depois.`,
          explanation:
            'As regras impedem o atalho: uma pergunta por vez obriga você a responder; esconder a resposta mantém a dificuldade; a pista curta ajuda sem resolver; e a lista final vira seu plano de revisão.',
        },
        {
          type: 'quiz',
          question:
            'Você pediu um questionário, mas a IA mandou dez perguntas de uma vez, já com as respostas embaixo. O que fazer?',
          options: [
            {
              text: 'Repetir as regras: uma pergunta por vez, sem mostrar a resposta, e pedir para recomeçar',
              correct: true,
              feedback:
                'Isso. Com as respostas à vista, você só lê e reconhece, e a recuperação não acontece. Reforçar as regras resolve na maioria das vezes.',
            },
            {
              text: 'Ler as perguntas e as respostas com atenção: é praticamente a mesma coisa',
              feedback:
                'Parece, mas não é. Ler a resposta dá uma sensação de “eu sabia”, que é reconhecimento. O que fixa é o esforço de puxar a resposta da memória.',
            },
            {
              text: 'Desistir: a ferramenta não serve para isso',
              feedback:
                'Ela serve, só não seguiu as regras dessa vez. Ajustar o pedido é parte do uso, como você viu na aula de prompts.',
            },
          ],
        },
      ],
    },
    {
      id: 'pratica-espacada',
      title: 'Pouco e espaçado vence muito de uma vez',
      blocks: [
        {
          type: 'analogy',
          title: 'Regar a planta',
          text: 'Jogar cinco litros de água numa planta no domingo e esquecer o resto da semana não funciona: a água escorre. Um copo por dia, sim. A memória é parecida: revisões curtas, espalhadas ao longo de dias, fixam mais do que uma maratona na véspera.',
        },
        {
          type: 'text',
          text: 'Isso se chama **prática espaçada**: revisar um assunto depois de um dia, depois de alguns dias, depois de uma semana, sempre tentando lembrar antes de olhar. Os cartões de revisão desta plataforma funcionam assim. A IA pode complementar, criando perguntas novas sobre o que você estudou na semana passada.',
        },
        {
          type: 'classify',
          prompt:
            'Quais hábitos fixam o aprendizado, e quais só dão a sensação de que você aprendeu?',
          buckets: ['Fixa o aprendizado', 'Só parece que fixa'],
          items: [
            { text: 'Responder perguntas sem consultar o material', bucket: 0 },
            { text: 'Revisar um assunto três dias depois de estudá-lo', bucket: 0 },
            { text: 'Explicar em voz alta o que um trecho do seu projeto faz', bucket: 0 },
            { text: 'Misturar exercícios de assuntos diferentes na mesma sessão', bucket: 0 },
            { text: 'Reler o mesmo resumo várias vezes seguidas', bucket: 1 },
            { text: 'Grifar o texto inteiro com marca-texto', bucket: 1 },
            { text: 'Estudar oito horas seguidas na véspera da prova', bucket: 1 },
            { text: 'Ler a explicação da IA e pensar “faz sentido”', bucket: 1 },
          ],
          explanation:
            'Os hábitos da esquerda exigem esforço de lembrar ou produzir; os da direita são confortáveis porque só pedem reconhecimento. Se a sessão de estudo está fácil demais, desconfie: é a dificuldade desejável que faz o conteúdo ficar.',
        },
      ],
    },
    {
      id: 'ia-entrevistadora',
      title: 'A IA como entrevistadora de treino',
      blocks: [
        {
          type: 'text',
          text: 'Juntando tudo, você tem um simulador de entrevista: a IA faz perguntas sobre o seu projeto, uma por vez; você responde com suas palavras; ela comenta clareza, raciocínio e evidência. Serve para entrevistas técnicas, comportamentais e para apresentar um projeto de portfólio.',
        },
        {
          type: 'anatomy',
          caption: 'Um pedido de simulação de entrevista. Explore cada parte.',
          language: 'text',
          parts: [
            {
              text: 'Simule uma entrevista para uma vaga júnior de Backend a partir deste projeto:',
              label: 'Vaga e nível',
              note: 'As perguntas para estágio e para uma vaga pleno são bem diferentes. Diga qual é o seu alvo.',
            },
            { text: '\n' },
            {
              text: '[README e um trecho sanitizado do código]',
              label: 'Material do projeto',
              note: 'O README e um trecho que você quer saber explicar. Lembre-se da aula de dados protegidos: nada de chaves ou dados reais.',
            },
            { text: '\n' },
            {
              text: 'Faça uma pergunta por vez e espere minha resposta.',
              label: 'Ritmo de entrevista',
              note: 'É assim numa entrevista de verdade. Dez perguntas de uma vez viram uma lista de leitura.',
            },
            { text: '\n' },
            {
              text: 'Depois avalie clareza, raciocínio e evidência, sem inventar experiências que eu não tive.',
              label: 'Critérios do feedback',
              note: 'Diz o que avaliar e protege contra um risco real: a IA sugerir respostas com experiências falsas. Em entrevista, só conte o que você fez.',
            },
            { text: '\n' },
            {
              text: 'Se eu pedir uma dica, dê uma pista curta.',
              label: 'Ajuda limitada',
              note: 'A pista mantém você pensando. Na entrevista real, a pessoa entrevistadora também costuma dar pistas, não respostas.',
            },
            { text: '\n' },
            {
              text: 'No final, proponha uma lacuna concreta para eu estudar.',
              label: 'Próximo passo',
              note: 'A sessão termina com um plano: um assunto específico para estudar antes da próxima simulação.',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Na simulação, a IA critica sua resposta: “você deveria ter usado índices no banco, por isso a consulta é lenta”. Você não tinha medido nada. O que fazer?',
          options: [
            {
              text: 'Tratar como hipótese: medir o tempo da consulta, testar com e sem índice e só então incorporar a crítica',
              correct: true,
              feedback:
                'Isso. Feedback de IA também erra. Conferir com evidência no código ou na documentação transforma a crítica em algo que você sabe defender, e numa entrevista você pode contar exatamente isso.',
            },
            {
              text: 'Decorar a crítica e repetir na entrevista de verdade',
              feedback:
                'Se a pessoa entrevistadora perguntar “quanto melhorou?”, você não terá resposta. Repetir algo que não verificou é frágil.',
            },
            {
              text: 'Ignorar a crítica, porque a IA não conhece o seu projeto',
              feedback:
                'Ela pode estar certa. O caminho não é aceitar nem descartar, e sim verificar.',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Você vai fazer um teste técnico on-line de um processo seletivo. Pode usar a IA durante o teste?',
          options: [
            {
              text: 'Depende das regras do processo: pergunte à pessoa recrutadora quais usos de IA são permitidos em cada etapa',
              correct: true,
              feedback:
                'Isso. Algumas empresas permitem e até esperam o uso de IA; outras proíbem em certas etapas. Perguntar mostra profissionalismo, e descumprir pode eliminar você.',
            },
            {
              text: 'Sim, sempre: no trabalho todo mundo usa',
              feedback:
                'Cada processo tem suas regras, e algumas etapas existem justamente para ver o que você faz sozinho. Use para treinar antes; durante, siga o combinado.',
            },
            {
              text: 'Sim, desde que ninguém perceba',
              feedback:
                'Além de antiético, costuma ser descoberto na conversa seguinte, quando pedem para explicar a solução. E a confiança perdida custa a vaga.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns ao treinar com IA',
          text: 'Pedir a resposta ideal e decorá-la, em vez de responder com suas palavras. Aceitar todo feedback como verdade. Deixar a IA “melhorar” sua história com experiências que você não teve. E treinar só por escrito: na entrevista você vai falar, então responda em voz alta pelo menos uma vez.',
        },
      ],
    },
  ],
  recap: [
    'Explicar com palavras simples é o melhor teste de entendimento: a **técnica Feynman** mostra onde você trava.',
    'No “explique de volta”, você explica primeiro e a IA aponta lacunas sem reescrever, como um pato de borracha que responde.',
    'Questionários com uma pergunta por vez e sem resposta à vista usam a **prática de recuperação**, que fixa mais do que reler.',
    'Revisões curtas e espaçadas vencem maratonas; desconfie de sessões de estudo fáceis demais.',
    'Na simulação de entrevista, confira as críticas com evidência, responda com suas palavras e siga as regras de IA de cada processo.',
  ],
  cards: [
    {
      id: 'tecnica-feynman',
      front: 'Quais são os passos da técnica Feynman?',
      back: 'Escolher um conceito, explicar em palavras simples, achar onde travou, voltar à fonte e simplificar de novo.',
    },
    {
      id: 'pato-de-borracha',
      front: 'O que é a técnica do pato de borracha?',
      back: 'Explicar o código linha por linha, em voz alta, até perceber onde ele não faz o que você esperava.',
    },
    {
      id: 'explique-de-volta',
      front: 'Como funciona o “explique de volta” com IA?',
      back: 'Você explica primeiro; a IA aponta lacunas e erros sem reescrever; você confere e corrige.',
    },
    {
      id: 'pratica-de-recuperacao',
      front: 'O que é prática de recuperação?',
      back: 'Tentar lembrar algo sem olhar, como responder perguntas, o que fixa mais do que reler.',
    },
    {
      id: 'pratica-espacada',
      front: 'O que é prática espaçada?',
      back: 'Revisar um assunto em intervalos crescentes, como um dia, alguns dias e uma semana depois.',
    },
    {
      id: 'feedback-ia',
      front: 'A IA criticou sua resposta na simulação. Qual o próximo passo?',
      back: 'Tratar como hipótese e conferir com evidência no código ou na documentação antes de incorporar.',
    },
    {
      id: 'ia-no-processo',
      front: 'Posso usar IA durante um processo seletivo?',
      back: 'Depende das regras de cada etapa: pergunte à pessoa recrutadora e siga o combinado.',
    },
  ],
  mission: {
    title: 'Simule uma entrevista sobre o seu projeto',
    text: 'Use um projeto que você já construiu na trilha, mesmo pequeno, e faça uma simulação completa. O objetivo é sair com uma resposta melhor, dita com suas palavras, e uma lacuna concreta para estudar.',
    steps: [
      'Prepare o README e um trecho sanitizado do projeto, sem chaves nem dados reais',
      'Peça a simulação com uma pergunta por vez, feedback sobre clareza, raciocínio e evidência e pistas curtas só quando você pedir',
      'Responda pelo menos três perguntas antes de pedir qualquer dica',
      'Escolha uma crítica recebida e confira com evidência no código ou na documentação',
      'Repita a resposta dessa pergunta em voz alta, com suas palavras e sem consultar nada',
      'Anote quais usos de IA são permitidos no próximo processo seletivo que você fizer, perguntando à pessoa recrutadora',
    ],
  },
  sources: [
    {
      title: 'OpenAI: prompting para tarefas de código (inglês)',
      url: 'https://developers.openai.com/codex/prompting/',
    },
    {
      title: 'Claude Code: boas práticas (inglês)',
      url: 'https://code.claude.com/docs/en/best-practices',
    },
    {
      title: 'MDN: await',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/await',
    },
  ],
};
