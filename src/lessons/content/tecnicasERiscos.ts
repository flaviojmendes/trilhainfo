import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Um formulário com um campo de idade e um de valor da compra já tem milhões de combinações possíveis. Ninguém testa todas, e mesmo assim os melhores profissionais de QA acham os bugs que importam em poucos minutos. O segredo não é sorte nem testar mais: são técnicas simples para escolher **quais** testes fazer e um jeito honesto de decidir **o que vem primeiro**.',
  sections: [
    {
      id: 'escolher-bem',
      title: 'Testar tudo é impossível, então escolha bem',
      blocks: [
        {
          type: 'analogy',
          title: 'A banca de laranjas na feira',
          text: 'Você não prova cada laranja da banca antes de comprar. Prova uma de cada caixa, porque as laranjas de uma mesma caixa vieram do mesmo lugar e devem ser parecidas. E olha com mais cuidado as do fundo, onde costumam estar as amassadas. Técnicas de teste fazem exatamente isso com as entradas de um sistema.',
        },
        {
          type: 'text',
          text: 'Na aula de fundamentos você viu que testar tudo é impossível. As técnicas desta aula são de **caixa-preta**: você olha para a regra e para o comportamento, sem precisar ler o código. Elas funcionam para quem está começando e são usadas por profissionais experientes todos os dias.',
        },
        {
          type: 'quiz',
          question:
            'O campo “quantidade” de uma loja aceita de 1 a 99 unidades. Qual destas estratégias é a mais inteligente para testá-lo?',
          options: [
            {
              text: 'Escolher alguns valores representativos e os valores nas bordas da regra',
              correct: true,
              feedback:
                'Isso. Com poucos valores bem escolhidos, como 0, 1, 50, 99 e 100, você cobre os comportamentos diferentes do campo. É o que as próximas seções ensinam.',
            },
            {
              text: 'Testar os 99 valores, um por um, para ter certeza',
              feedback:
                'Seria lento e ainda deixaria de fora 0, 100, números negativos e letras, justamente onde os bugs costumam estar.',
            },
            {
              text: 'Testar só o valor 1, que é o mais usado',
              feedback:
                'O caminho mais comum importa, mas um único valor não diz nada sobre os limites nem sobre entradas inválidas.',
            },
          ],
        },
      ],
    },
    {
      id: 'particao-de-equivalencia',
      title: 'Partição de equivalência: um de cada grupo',
      blocks: [
        {
          type: 'text',
          text: 'Imagine um seguro de vida on-line com esta regra: **aceita pessoas de 18 a 65 anos**. Para o sistema, 25 e 40 anos dão o mesmo resultado: aceito. Os dois estão na mesma **partição**, um grupo de entradas que o sistema deve tratar do mesmo jeito.',
        },
        {
          type: 'table',
          caption: 'As partições da regra “aceita de 18 a 65 anos”',
          head: ['Partição', 'Exemplo de valores', 'Resultado esperado'],
          rows: [
            ['Menor de 18', '`5`, `12`, `17`', 'Recusada'],
            ['De 18 a 65', '`18`, `40`, `65`', 'Aceita'],
            ['Maior de 65', '`66`, `80`, `101`', 'Recusada'],
            ['Não é uma idade', '`-3`, `abc`, campo vazio', 'Mensagem de erro no campo'],
          ],
        },
        {
          type: 'text',
          text: 'A técnica de **partição de equivalência** diz: escolha **um valor de cada partição**. Se 40 funciona, testar 41, 42 e 43 provavelmente não ensina nada novo. Repare que entradas inválidas, como letras e campo vazio, também formam partições e merecem teste.',
        },
        {
          type: 'classify',
          prompt:
            'Uma lanchonete dá desconto conforme o valor do pedido: até R$ 29,99 sem desconto, de R$ 30 a R$ 99,99 com 5%, a partir de R$ 100 com 10%. Em que partição cai cada valor?',
          buckets: ['Sem desconto', '5% de desconto', '10% de desconto', 'Inválido'],
          items: [
            { text: 'R$ 12,00', bucket: 0 },
            { text: 'R$ 29,99', bucket: 0 },
            { text: 'R$ 30,00', bucket: 1 },
            { text: 'R$ 75,50', bucket: 1 },
            { text: 'R$ 100,00', bucket: 2 },
            { text: 'R$ 340,00', bucket: 2 },
            { text: 'R$ -10,00', bucket: 3 },
          ],
          explanation:
            'Quatro partições, então no mínimo quatro testes. Repare que valores como R$ 29,99 e R$ 30,00 estão colados, mas em partições diferentes: é ali, na fronteira, que mora a próxima técnica.',
        },
      ],
    },
    {
      id: 'valor-limite',
      title: 'Valor-limite: os bugs moram nas bordas',
      blocks: [
        {
          type: 'text',
          text: 'Pessoas programadoras escrevem regras com sinais como `>` (maior que) e `>=` (maior ou igual). Trocar um pelo outro é um dos enganos mais comuns que existem, e ele só aparece exatamente na borda. A **análise de valor-limite** testa os valores de cada lado de cada fronteira.',
        },
        {
          type: 'table',
          caption: 'Os valores-limite da regra de 18 a 65 anos',
          head: ['Fronteira', 'Logo antes', 'Na borda', 'Resultado esperado'],
          rows: [
            [
              'Limite de baixo',
              '`17` (recusada)',
              '`18` (aceita)',
              'Os dois resultados são diferentes',
            ],
            [
              'Limite de cima',
              '`65` (aceita)',
              '`66` (recusada)',
              'Os dois resultados são diferentes',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: '“Acima de R$ 100” inclui os R$ 100?',
          text: 'A loja diz “frete grátis acima de R$ 100”. Quem paga exatamente R$ 100,00 ganha o frete? A frase não diz. Pensar em valores-limite revela regras ambíguas **antes** do código: pergunte ao time e peça que o critério de aceite fique explícito, como “a partir de R$ 100,00, inclusive”.',
        },
        {
          type: 'text',
          text: 'Agora é com você. O código abaixo é o sistema do seguro, com um defeito escondido. Você não precisa entender como ele funciona por dentro: use a função `testar(idade)`, que mostra no console se aquela idade foi aceita ou recusada.',
        },
        {
          type: 'playground',
          title: 'Caçando o defeito na borda',
          task: 'A regra é: aceita de 18 a 65 anos, incluindo 18 e 65. Escreva uma linha `testar(...)` para cada valor-limite (17, 18, 65 e 66) e clique em executar. Leia o console: qual idade teve o resultado errado? Escreva essa idade no lugar de `null` em `idadeComDefeito`.',
          js: `// O sistema sob teste (não precisa mexer aqui)
function podeContratar(idade) {
  return idade > 18 && idade <= 65;
}

function testar(idade) {
  const resposta = podeContratar(idade) ? 'aceita' : 'recusada';
  console.log('idade ' + idade + ': ' + resposta);
}

// Seus testes: um testar(...) por linha
testar(30);

// Quando achar a idade com resultado errado, escreva no lugar de null
let idadeComDefeito = null;`,
          checks: [
            {
              label: 'Testou os dois lados do limite de baixo: 17 e 18',
              test: `const logs = window.__trilhaLogs || [];
return logs.some((l) => l.startsWith('idade 17:')) && logs.some((l) => l.startsWith('idade 18:'));`,
            },
            {
              label: 'Testou os dois lados do limite de cima: 65 e 66',
              test: `const logs = window.__trilhaLogs || [];
return logs.some((l) => l.startsWith('idade 65:')) && logs.some((l) => l.startsWith('idade 66:'));`,
            },
            {
              label: 'Apontou a idade em que o sistema erra',
              test: `try {
  return Number(idadeComDefeito) === 18;
} catch (erro) {
  return false;
}`,
            },
          ],
          solution: {
            js: `// O sistema sob teste (não precisa mexer aqui)
function podeContratar(idade) {
  return idade > 18 && idade <= 65;
}

function testar(idade) {
  const resposta = podeContratar(idade) ? 'aceita' : 'recusada';
  console.log('idade ' + idade + ': ' + resposta);
}

// Seus testes: um testar(...) por linha
testar(30);
testar(17);
testar(18);
testar(65);
testar(66);

// Quando achar a idade com resultado errado, escreva no lugar de null
let idadeComDefeito = 18;`,
          },
        },
        {
          type: 'reveal',
          question:
            'O teste com `testar(30)` dizia “aceita”, que é o certo. Se você tivesse parado nele, o que teria acontecido?',
          answer:
            'Você teria aprovado um sistema que recusa todas as pessoas de exatamente 18 anos, justo quem acabou de atingir a idade mínima. O defeito está em `idade > 18`, que deveria ser `idade >= 18`. Um valor do meio da partição nunca revela esse tipo de engano; só a borda revela.',
        },
      ],
    },
    {
      id: 'tabela-de-decisao',
      title: 'Tabela de decisão: quando as regras se combinam',
      blocks: [
        {
          type: 'text',
          text: 'Algumas regras dependem de duas ou mais condições ao mesmo tempo. Uma loja diz: “frete grátis para quem é assinante **ou** para compras a partir de R$ 100”. Testar cada condição sozinha não basta: é na combinação que as regras se contradizem.',
        },
        {
          type: 'text',
          text: 'Uma **tabela de decisão** lista todas as combinações de condições e o resultado esperado de cada uma. Com duas condições de sim ou não, são quatro combinações; com três, oito. Cada coluna vira um caso de teste.',
        },
        {
          type: 'table',
          caption: 'Tabela de decisão do frete grátis',
          head: ['Condição', 'Regra 1', 'Regra 2', 'Regra 3', 'Regra 4'],
          rows: [
            ['É assinante?', 'Sim', 'Sim', 'Não', 'Não'],
            ['Compra a partir de R$ 100?', 'Sim', 'Não', 'Sim', 'Não'],
            ['**Resultado: frete**', 'Grátis', 'Grátis', 'Grátis', 'Cobrado'],
          ],
        },
        {
          type: 'quiz',
          question:
            'Você testou: assinante com compra de R$ 150 (grátis) e não assinante com compra de R$ 40 (cobrado). Tudo passou. Qual teste da tabela mais faz falta?',
          options: [
            {
              text: 'Assinante com compra abaixo de R$ 100, que deve ter frete grátis',
              correct: true,
              feedback:
                'Isso. Nos seus dois testes, as condições andaram juntas, então você não sabe qual delas o sistema está usando. Se o código exigir as duas ao mesmo tempo (um “e” no lugar do “ou”), só as regras 2 e 3 mostram.',
            },
            {
              text: 'Mais um assinante com compra de R$ 300',
              feedback:
                'É a mesma combinação da regra 1, que você já testou. Não acrescenta informação nova.',
            },
            {
              text: 'Nenhum, porque as duas condições já apareceram nos testes',
              feedback:
                'Apareceram, mas sempre juntas. Para saber se cada condição funciona sozinha, você precisa das combinações em que uma é “sim” e a outra é “não”.',
            },
          ],
        },
      ],
    },
    {
      id: 'transicao-de-estados',
      title: 'Transição de estados: o que pode vir depois',
      blocks: [
        {
          type: 'text',
          text: 'Pense num pedido no iFood. Ele passa por **estados**: recebido, em preparo, a caminho, entregue. Nem todo salto é permitido: um pedido entregue não volta para a cozinha. O **teste de transição de estados** confere as mudanças permitidas e, principalmente, as proibidas.',
        },
        {
          type: 'flow',
          caption: 'A vida de um pedido de delivery e uma transição que não deveria existir',
          actors: ['Recebido', 'Em preparo', 'A caminho', 'Entregue'],
          steps: [
            {
              from: 0,
              to: 1,
              label: 'Restaurante aceita',
              text: 'O restaurante confirma o pedido. Ainda dá para cancelar sem custo, então quem testa confere o botão de cancelar neste estado.',
              tone: 'ok',
            },
            {
              from: 1,
              to: 2,
              label: 'Entregador retira',
              text: 'O pedido sai da cozinha. A partir daqui, a regra diz que o cancelamento não é mais permitido.',
              tone: 'ok',
            },
            {
              from: 2,
              to: 3,
              label: 'Entrega confirmada',
              text: 'O estado final. Nada mais deveria mudar o pedido, só a avaliação.',
              tone: 'ok',
            },
            {
              from: 3,
              to: 1,
              label: 'Voltar a preparar?',
              text: 'Uma transição proibida. Se uma tela antiga do restaurante ainda tiver o botão “Iniciar preparo”, isso pode bagunçar o pedido. Quem testa tenta provocar exatamente esse salto.',
              tone: 'error',
            },
          ],
        },
        {
          type: 'classify',
          prompt:
            'Regras do pedido: só pode ser cancelado enquanto estiver recebido ou em preparo, e nunca volta a um estado anterior. Classifique cada transição.',
          buckets: ['Permitida', 'Proibida'],
          items: [
            { text: 'Recebido para cancelado', bucket: 0 },
            { text: 'Em preparo para cancelado', bucket: 0 },
            { text: 'Em preparo para a caminho', bucket: 0 },
            { text: 'A caminho para cancelado', bucket: 1 },
            { text: 'Entregue para em preparo', bucket: 1 },
            { text: 'Cancelado para a caminho', bucket: 1 },
          ],
          explanation:
            'Testar só o caminho feliz (recebido, em preparo, a caminho, entregue) deixa de fora metade dos riscos. Os bugs mais caros costumam estar nas transições proibidas que o sistema aceita sem reclamar, como entregar um pedido cancelado.',
        },
      ],
    },
    {
      id: 'prioridade-por-risco',
      title: 'Prioridade por risco: o que testar primeiro',
      blocks: [
        {
          type: 'text',
          text: 'As técnicas geram dezenas de casos, e o tempo nunca dá para todos. Para decidir a ordem, use o **risco**: a chance de algo dar errado (**probabilidade**) combinada com o tamanho do estrago se der (**impacto**).',
        },
        {
          type: 'table',
          caption: 'Matriz de risco: probabilidade vezes impacto',
          head: ['Probabilidade / Impacto', 'Impacto baixo', 'Impacto médio', 'Impacto alto'],
          rows: [
            ['**Alta**', 'Média', 'Alta', 'Alta'],
            ['**Média**', 'Baixa', 'Média', 'Alta'],
            ['**Baixa**', 'Baixa', 'Baixa', 'Média'],
          ],
        },
        {
          type: 'text',
          text: 'Para estimar a probabilidade, pergunte: a parte é nova, mudou muito, é complexa, já teve bugs? Para o impacto: afeta dinheiro, dados pessoais, saúde, muitas pessoas, a imagem da empresa? Não existe conta exata; o valor está em discutir com o time e deixar a decisão escrita.',
        },
        {
          type: 'classify',
          prompt:
            'Você testa o checkout novo de uma farmácia on-line na véspera do lançamento. Qual a prioridade de cada risco?',
          buckets: ['Prioridade alta', 'Prioridade média', 'Prioridade baixa'],
          items: [
            {
              text: 'O cálculo de desconto foi reescrito ontem e mexe no valor cobrado no Pix',
              bucket: 0,
            },
            {
              text: 'O desconto para pessoas idosas no limite de 60 anos pode estar errado e afeta milhares de clientes',
              bucket: 0,
            },
            {
              text: 'A página de “Quem somos” tem um erro de digitação e não mudou há dois anos',
              bucket: 2,
            },
            { text: 'A cor do rodapé ficou um pouco diferente no navegador Firefox', bucket: 2 },
            {
              text: 'O filtro de busca por marca é antigo, mas recebeu uma pequena mudança nesta versão',
              bucket: 1,
            },
          ],
          explanation:
            'Dinheiro cobrado errado e regras com limite que atingem muita gente combinam alta probabilidade (código novo ou borda) com alto impacto. A página parada há anos e a cor do rodapé são baixas nas duas dimensões. Nesta ordem, se o tempo acabar, o que ficou sem teste é o que menos dói.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns',
          text: 'Testar só valores do meio, como 30 anos, e nunca as bordas. Esquecer as partições inválidas: letras, vazio, negativo. Testar só o caminho feliz dos estados. E priorizar pelo que é mais fácil de testar, em vez do que é mais arriscado.',
        },
        {
          type: 'quiz',
          question:
            'Faltam duas horas para o lançamento e você tem casos para seis. A gerente pergunta o que vai ficar de fora. Qual a melhor resposta?',
          options: [
            {
              text: 'Mostrar a lista ordenada por risco, dizer o que será testado e quais riscos menores ficam sem teste',
              correct: true,
              feedback:
                'Isso. Você transforma falta de tempo em uma decisão consciente do time. Quem decide se aceita o risco restante é o time com a área de negócio, com base na sua informação.',
            },
            {
              text: 'Testar os casos mais rápidos primeiro, para executar o maior número possível',
              feedback:
                'Muitos casos executados não significa pouco risco. Dez testes fáceis de baixo impacto valem menos que um teste do pagamento.',
            },
            {
              text: 'Dizer que vai dar tempo de testar tudo, trabalhando mais rápido',
              feedback:
                'Correr aumenta a chance de pular passos e esconde o problema. Ser transparente sobre o que não foi testado é parte do trabalho de QA.',
            },
          ],
        },
      ],
    },
  ],
  recap: [
    'Como testar tudo é impossível, técnicas de caixa-preta ajudam a escolher poucos casos que revelam muito.',
    '**Partição de equivalência**: um valor de cada grupo que o sistema trata igual, incluindo os inválidos.',
    '**Valor-limite**: os valores de cada lado de cada fronteira, onde enganos como `>` no lugar de `>=` aparecem.',
    '**Tabela de decisão** cobre combinações de condições; **transição de estados** confere mudanças permitidas e proibidas.',
    'Priorize pelo **risco**, probabilidade vezes impacto, e deixe claro o que ficou sem teste.',
  ],
  cards: [
    {
      id: 'particao',
      front: 'O que é partição de equivalência?',
      back: 'Dividir as entradas em grupos que o sistema deve tratar igual e testar um valor de cada grupo, válido ou inválido.',
    },
    {
      id: 'valor-limite',
      front: 'Quais valores-limite testar para a regra “aceita de 18 a 65 anos”?',
      back: '17 e 18 no limite de baixo; 65 e 66 no limite de cima.',
    },
    {
      id: 'por-que-bordas',
      front: 'Por que os bugs aparecem tanto nas bordas?',
      back: 'Porque trocar `>` por `>=` (ou `<` por `<=`) é um engano comum e só muda o resultado exatamente no limite.',
    },
    {
      id: 'tabela-decisao',
      front: 'Quantas regras tem uma tabela de decisão com três condições de sim ou não?',
      back: 'Oito: duas possibilidades para cada condição, 2 × 2 × 2.',
    },
    {
      id: 'transicao',
      front: 'O que o teste de transição de estados confere além do caminho feliz?',
      back: 'As transições proibidas, como um pedido entregue voltar para o preparo ou um cancelado sair para entrega.',
    },
    {
      id: 'risco',
      front: 'Como se calcula a prioridade por risco?',
      back: 'Combinando a probabilidade de dar errado com o impacto se der. Alta nas duas, testa primeiro.',
    },
  ],
  mission: {
    title: 'Casos priorizados para um formulário com limites',
    text: 'Escolha um formulário com regras de idade ou valor, real ou inventado, como a inscrição num curso gratuito para pessoas de 16 a 29 anos ou o frete grátis de uma loja. Desenhe os testes como faria no trabalho.',
    steps: [
      'Escreva a regra do formulário como critério de aceite, sem ambiguidade nas bordas',
      'Liste as partições de equivalência, incluindo pelo menos duas inválidas',
      'Liste os valores-limite de cada fronteira e o resultado esperado de cada um',
      'Se houver duas condições combinadas, monte a tabela de decisão',
      'Dê uma prioridade (alta, média ou baixa) a cada caso e justifique pela probabilidade e pelo impacto',
    ],
  },
  sources: [
    {
      title: 'BSTQB: syllabus e materiais de estudo',
      url: 'https://bstqb.org.br/b9/sobre/syllabus',
    },
    { title: 'Glossário oficial do ISTQB', url: 'https://glossary.istqb.org/' },
  ],
};
