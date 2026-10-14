import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Reler tudo o que você estudou na véspera da entrevista dá a sensação de preparo e quase não fica na memória. Quem chega segura numa entrevista técnica revisou pouco por vez, focou no que a carreira cobra e treinou falar em voz alta antes do dia. Nesta aula você monta um plano de revisão para a sua carreira, aprende a registrar lacunas, faz entrevistas simuladas e transforma cada recusa em informação útil.',
  sections: [
    {
      id: 'mapa-da-revisao',
      title: 'O mapa da revisão por carreira',
      blocks: [
        {
          type: 'analogy',
          title: 'Estudar para o ENEM',
          text: 'Ninguém se prepara para o ENEM relendo todos os livros do ensino médio. Quem vai bem olha o que mais cai, faz provas antigas, anota onde errou e volta nesses pontos. A entrevista técnica funciona igual: cada carreira tem os seus “assuntos que mais caem”.',
        },
        {
          type: 'text',
          text: 'As entrevistas de entrada costumam perguntar sobre o que você vai fazer na primeira semana, não sobre tudo o que existe. Por isso a revisão parte da carreira escolhida. A tabela abaixo mostra os temas centrais de cada uma e onde revisar aqui na Trilha Info.',
        },
        {
          type: 'table',
          caption: 'Temas centrais por carreira e onde revisá-los',
          head: ['Carreira', 'Temas que mais aparecem', 'Onde revisar na Trilha Info'],
          rows: [
            [
              '**Frontend e React**',
              'Estado e componentes, acessibilidade, testes de interface, desempenho',
              'Trilhas Frontend e React; aulas Componentes, props e estado, Acessibilidade e Testes de interface',
            ],
            [
              '**Backend**',
              'API e status HTTP, SQL com JOIN, autenticação e permissões',
              'Trilha Backend; aula Como a web funciona; etapa HTTP, dados e segurança desta trilha',
            ],
            [
              '**Dados**',
              'SQL, modelagem de tabelas, pipelines idempotentes',
              'Trilha Engenharia de Dados, nas etapas de SQL e de pipelines',
            ],
            [
              '**QA**',
              'Riscos, investigação de bugs, testes automatizados',
              'Trilha Testes e QA; aula Testes de interface',
            ],
            [
              '**DevOps**',
              'Diagnóstico com logs e métricas, deploy e rollback, recuperação',
              'Trilha DevOps, nas etapas de entrega e operação',
            ],
          ],
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Idempotente',
              text: 'Uma operação que dá o mesmo resultado se rodar uma ou várias vezes. Um pipeline de dados idempotente não duplica as vendas do dia se for executado duas vezes.',
            },
            {
              term: 'Rollback',
              text: 'Voltar o sistema para a versão anterior quando uma nova versão quebrou algo em produção.',
            },
          ],
        },
        {
          type: 'classify',
          prompt: 'Em qual carreira cada situação costuma aparecer numa entrevista?',
          buckets: ['Frontend', 'Backend', 'Dados', 'DevOps'],
          items: [
            { text: 'Um botão que o leitor de tela não anuncia', bucket: 0 },
            { text: 'Um estado que some ao trocar de página', bucket: 0 },
            { text: 'Uma rota que devolve 200 para senha errada', bucket: 1 },
            { text: 'Uma pessoa usuária vendo pedidos de outra', bucket: 1 },
            { text: 'Um pipeline que duplica vendas ao rodar duas vezes', bucket: 2 },
            { text: 'Um relatório com dupla contagem por causa de um JOIN', bucket: 2 },
            { text: 'Um deploy que quebrou e precisa voltar à versão anterior', bucket: 3 },
            { text: 'Um serviço lento cuja causa está nos logs', bucket: 3 },
          ],
          explanation:
            'As fronteiras não são rígidas: quem trabalha com QA investiga todas essas situações, e backend também lida com SQL. Mas saber o que a sua carreira mais cobra diz por onde começar a revisão.',
        },
      ],
    },
    {
      id: 'diario-de-lacunas',
      title: 'Registre as lacunas',
      blocks: [
        {
          type: 'text',
          text: 'Uma **lacuna** é algo que você precisava saber e ainda não sabe bem. Ela aparece numa entrevista, num desafio, num exercício que travou. O erro mais comum é ficar com a sensação ruim e não anotar nada: uma semana depois, você já não lembra qual era a pergunta.',
        },
        {
          type: 'anatomy',
          caption: 'Uma entrada do diário de lacunas',
          language: 'text',
          parts: [
            {
              text: 'Data: 10/10 | Origem: entrevista técnica, vaga de dados',
              label: 'Data e origem',
              note: 'Onde a lacuna apareceu. Com o tempo, você vê se ela se repete em vários processos.',
            },
            { text: '\n' },
            {
              text: 'Pergunta: por que este relatório soma as vendas em dobro?',
              label: 'A pergunta exata',
              note: 'Anote como foi feita, logo depois da entrevista. É ela que você vai tentar responder de novo na revisão.',
            },
            { text: '\n' },
            {
              text: 'O que respondi: achei que era erro na soma.',
              label: 'Sua resposta',
              note: 'Sem julgamento. Comparar com a resposta certa mostra onde o raciocínio desviou.',
            },
            { text: '\n' },
            {
              text: 'Resposta certa: o JOIN com a tabela de itens repete cada venda uma vez por item.',
              label: 'O que faltava',
              note: 'Pesquise depois, na documentação ou nas aulas. Escreva com as suas palavras.',
            },
            { text: '\n' },
            {
              text: 'Próxima ação: refazer o exercício de JOIN e explicar a dupla contagem em voz alta.',
              label: 'Próxima ação',
              note: 'Uma ação concreta e pequena, que cabe numa sessão de estudo. “Estudar SQL” é vago demais para começar.',
            },
          ],
        },
        {
          type: 'fill',
          prompt:
            'Planeje as revisões dessa lacuna em 1, 3 e 7 dias, sempre contando a partir da entrevista, no dia 10/10. Escreva as datas no formato dia/mês, como 10/10.',
          language: 'text',
          template:
            'Lacuna: JOIN e dupla contagem\n1ª revisão, 1 dia depois: [[11/10]]\n2ª revisão, 3 dias depois: [[13/10]]\n3ª revisão, 7 dias depois: [[17/10]]',
          explanation:
            'Os intervalos crescem de propósito: cada revisão acontece quando você está quase esquecendo, e é esse esforço de lembrar que fixa o conteúdo. A próxima seção explica o porquê.',
        },
      ],
    },
    {
      id: 'revisao-espacada',
      title: 'Revisão espaçada e prática ativa',
      blocks: [
        {
          type: 'analogy',
          title: 'O caminho novo para o trabalho',
          text: 'Nos primeiros dias num trabalho novo, você confere o mapa a cada esquina. Se fizer o trajeto todo dia, logo não precisa mais. Mas se ficar um mês sem passar por lá, esquece metade. A memória precisa de voltas espaçadas, e de você tentar lembrar antes de olhar o mapa.',
        },
        {
          type: 'text',
          text: '**Revisão espaçada** é revisar o mesmo assunto em intervalos que vão crescendo: um dia, três, uma semana, duas. **Prática ativa** é tentar responder de memória antes de consultar, em vez de só reler. Juntas, rendem muito mais que horas de leitura na véspera.',
        },
        {
          type: 'classify',
          prompt: 'Quais atividades são prática ativa e quais são revisão passiva?',
          buckets: ['Prática ativa', 'Revisão passiva'],
          items: [
            { text: 'Responder os cartões de revisão sem olhar a resposta', bucket: 0 },
            { text: 'Refazer um exercício sem consultar a solução', bucket: 0 },
            { text: 'Explicar um conceito em voz alta para outra pessoa', bucket: 0 },
            { text: 'Escrever de memória os passos de um deploy', bucket: 0 },
            { text: 'Reler a aula inteira', bucket: 1 },
            { text: 'Assistir de novo a um vídeo em velocidade 2x', bucket: 1 },
            { text: 'Grifar o resumo com marca-texto', bucket: 1 },
          ],
          explanation:
            'Reler dá a sensação de que você sabe, porque o texto parece familiar. Mas na entrevista não há texto na frente: você precisa buscar na memória. Por isso o treino precisa ser de busca. Os cartões no fim de cada aula da Trilha Info existem para isso.',
        },
        {
          type: 'python',
          title: 'Gere o seu calendário de revisão',
          task: 'Complete o laço: para cada tema e cada intervalo, calcule a data com `inicio + timedelta(days=dias)` e adicione a tupla `(data, tema)` ao `plano`. Depois, acrescente em `temas` uma lacuna da sua carreira.',
          code: `from datetime import date, timedelta

inicio = date(2026, 10, 10)
intervalos = [1, 3, 7, 14]
temas = ['JOIN e dupla contagem', 'status 401 e 403']

plano = []
for tema in temas:
    for dias in intervalos:
        # Calcule a data da revisão e adicione (data, tema) ao plano
        pass

plano.sort()
for dia, tema in plano:
    print(dia.strftime('%d/%m'), '-', tema)`,
          solution: `from datetime import date, timedelta

inicio = date(2026, 10, 10)
intervalos = [1, 3, 7, 14]
temas = ['JOIN e dupla contagem', 'status 401 e 403', 'rollback de deploy']

plano = []
for tema in temas:
    for dias in intervalos:
        data = inicio + timedelta(days=dias)
        plano.append((data, tema))

plano.sort()
for dia, tema in plano:
    print(dia.strftime('%d/%m'), '-', tema)`,
          checks: [
            {
              label: 'Há uma revisão para cada tema em cada intervalo',
              test: 'len(plano) == len(temas) * len(intervalos) and len(plano) > 0',
            },
            {
              label: 'A primeira revisão é no dia seguinte e a última, 14 dias depois',
              test: 'plano[0][0] == date(2026, 10, 11) and plano[-1][0] == date(2026, 10, 24)',
            },
            {
              label: 'O plano aparece na tela em ordem de data',
              test: "'11/10 - JOIN e dupla contagem' in __saida__ and __saida__.strip().splitlines()[-1].startswith('24/10')",
            },
            {
              label: 'Você acrescentou uma lacuna sua, com pelo menos três temas no total',
              test: 'len(temas) >= 3',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Pouco e sempre',
          text: 'Trinta minutos de revisão ativa por dia, seguindo o calendário, valem mais que um fim de semana inteiro relendo. Coloque as datas na agenda do celular, como faria com uma consulta.',
        },
      ],
    },
    {
      id: 'entrevista-simulada',
      title: 'Entrevistas simuladas, com pessoas e com IA',
      blocks: [
        {
          type: 'text',
          text: 'Uma **entrevista simulada** é um ensaio: alguém faz o papel de quem entrevista, com tempo e perguntas de verdade. Falar em voz alta sob um pouco de pressão é bem diferente de responder na cabeça, e a primeira vez não deveria ser a que vale.',
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem uma entrevista simulada de uma hora com uma colega.',
          items: [
            'Combinar o formato e o tempo de cada parte',
            'Apresentar um projeto em cinco minutos',
            'Resolver um exercício prático em voz alta',
            'Revisar um trecho de código juntas',
            'Ouvir o feedback sem se defender',
            'Registrar as lacunas no diário',
          ],
          explanation:
            'Esse roteiro imita um processo real: apresentação, exercício e revisão de código. Ouvir sem se defender é difícil e é a parte mais útil. Depois, troquem de papel: entrevistar outra pessoa também ensina muito.',
        },
        {
          type: 'text',
          text: 'Nem sempre há alguém disponível. Um assistente de IA pode fazer o papel de entrevistador para você treinar a qualquer hora, desde que o pedido seja claro sobre o papel, o nível e o formato.',
        },
        {
          type: 'code',
          language: 'text',
          caption: 'Um pedido para treinar com IA',
          code: `Faça o papel de uma pessoa entrevistadora para uma vaga de QA júnior.
Faça uma pergunta por vez e espere a minha resposta antes de continuar.
Comece com duas perguntas comportamentais e depois uma sobre como eu
investigaria um bug que só acontece em alguns celulares.
No final, aponte dois pontos fortes e dois pontos a melhorar nas minhas
respostas, com exemplos do que eu disse.`,
        },
        {
          type: 'quiz',
          question: 'O que torna esse pedido mais útil do que “me faça perguntas de entrevista”?',
          options: [
            {
              text: 'Define vaga e nível, pede uma pergunta por vez e pede feedback com exemplos do que você disse',
              correct: true,
              feedback:
                'Isso. Uma pergunta por vez simula a conversa, e feedback com exemplos permite comparar com o que você falou. Sem isso, a IA despeja uma lista e você só lê.',
            },
            {
              text: 'É mais longo, e pedidos longos sempre dão respostas melhores',
              feedback:
                'Tamanho não é o ponto. O que ajuda é o contexto específico: papel, nível, formato e o tipo de retorno que você quer.',
            },
            {
              text: 'Pede para a IA dar as respostas certas, para você decorar',
              feedback:
                'O pedido faz o contrário: quem responde é você. Decorar respostas prontas não resiste à primeira pergunta de acompanhamento.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Limites do treino com IA',
          text: 'A IA tende a ser gentil demais e pode elogiar uma resposta fraca. Ela também erra fatos técnicos com confiança: confira na documentação. Não cole código da empresa nem dados pessoais. E não deixe de treinar com pessoas, que reagem, interrompem e fazem perguntas inesperadas.',
        },
      ],
    },
    {
      id: 'recusa-e-feedback',
      title: 'Recusa, feedback e o próximo passo',
      blocks: [
        {
          type: 'text',
          text: 'Receber “não” faz parte de qualquer busca por vaga, inclusive para quem hoje é sênior. Muitas recusas têm motivos que você não controla: outra pessoa com mais tempo de casa, a vaga congelada, o orçamento que mudou. O que você controla é o que faz com a informação.',
        },
        {
          type: 'table',
          caption: 'Do feedback à ação',
          head: ['O que você ouviu', 'Ação concreta'],
          rows: [
            [
              '“Faltou testar casos de erro”',
              'Escrever testes de erro no projeto do portfólio e citar no README',
            ],
            [
              '“Ficou difícil acompanhar seu raciocínio”',
              'Gravar um exercício resolvido em voz alta e ouvir onde houve silêncio',
            ],
            [
              '“Não ficou claro o que você fez no projeto em grupo”',
              'Reescrever as histórias no formato STAR, com a ação em primeira pessoa',
            ],
            [
              '“Procuramos alguém com mais experiência”',
              'Nada a corrigir em você: seguir candidatando e anotar o tipo de vaga',
            ],
          ],
        },
        {
          type: 'quiz',
          question:
            'Depois de três processos, você percebe que travou nas três vezes em perguntas de SQL. O que fazer?',
          options: [
            {
              text: 'Tratar SQL como a lacuna prioritária: entradas no diário, revisões espaçadas e uma entrevista simulada só disso',
              correct: true,
              feedback:
                'Isso. Uma lacuna que se repete em vários processos é o melhor sinal de onde estudar. Os registros transformam a frustração num plano.',
            },
            {
              text: 'Concluir que não leva jeito para a área',
              feedback:
                'Três tropeços no mesmo ponto mostram uma lacuna específica, não falta de capacidade. Lacunas específicas se resolvem com prática específica.',
            },
            {
              text: 'Parar de se candidatar até dominar todos os assuntos da carreira',
              feedback:
                'Você nunca vai dominar todos, e as entrevistas são justamente uma fonte de feedback. Siga se candidatando enquanto estuda a lacuna.',
            },
          ],
        },
        {
          type: 'reveal',
          question:
            'Por que a demonstração de uma falha e de como você a corrigiu impressiona mais do que um projeto que “nunca deu erro”?',
          answer:
            'Porque todo sistema real falha, e o trabalho de uma equipe é perceber, investigar, corrigir e confirmar que a correção funcionou. Mostrar esse ciclo no seu projeto, com o teste ou o log que provou a solução, é mostrar o trabalho do dia a dia.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cuide de quem está estudando',
          text: 'Busca por vaga cansa, e mais ainda para quem concilia com outro trabalho, família ou estudos. Defina um número de candidaturas por semana, comemore avanços pequenos e procure comunidades de pessoas parecidas com você na tecnologia. A síndrome do impostor fica menor quando você ouve que outras pessoas sentem a mesma coisa.',
        },
      ],
    },
  ],
  recap: [
    'Revise a partir da carreira escolhida: cada uma tem temas que mais aparecem nas entrevistas de entrada.',
    'Registre cada lacuna com a pergunta exata, sua resposta, o que faltava e uma próxima ação pequena.',
    'Revisão espaçada e prática ativa, tentando lembrar antes de olhar, fixam mais que reler na véspera.',
    'Entrevistas simuladas com pessoas e com IA treinam a fala sob pressão; peça feedback com exemplos.',
    'Recusa é informação: lacunas que se repetem viram a prioridade do próximo plano.',
  ],
  cards: [
    {
      id: 'temas-por-carreira',
      front: 'Cite os temas centrais de revisão para backend.',
      back: 'API e status HTTP, SQL com JOIN, autenticação e permissões.',
    },
    {
      id: 'idempotente',
      front: 'O que é uma operação idempotente?',
      back: 'Uma operação que dá o mesmo resultado se rodar uma ou várias vezes.',
    },
    {
      id: 'diario-de-lacunas',
      front: 'O que anotar no diário de lacunas?',
      back: 'Data e origem, a pergunta exata, o que você respondeu, a resposta certa e uma próxima ação.',
    },
    {
      id: 'revisao-espacada',
      front: 'O que é revisão espaçada?',
      back: 'Revisar o mesmo assunto em intervalos crescentes, como 1, 3, 7 e 14 dias.',
    },
    {
      id: 'pratica-ativa',
      front: 'Por que a prática ativa vence a releitura?',
      back: 'Porque treina buscar na memória, que é o que a entrevista exige. Reler só dá sensação de familiaridade.',
    },
    {
      id: 'simulada-com-ia',
      front: 'Como pedir para uma IA simular uma entrevista?',
      back: 'Diga vaga e nível, peça uma pergunta por vez e feedback com exemplos do que você respondeu.',
    },
    {
      id: 'lacuna-repetida',
      front: 'O que fazer com uma lacuna que aparece em vários processos?',
      back: 'Torná-la prioridade: registrar, revisar com espaçamento e treinar numa entrevista simulada.',
    },
  ],
  mission: {
    title: 'Monte seu plano e demonstre uma recuperação',
    text: 'Prepare a revisão da carreira que você escolheu e uma demonstração de falha e recuperação no seu projeto. Na entrevista, você vai poder dizer o que quebrou, como descobriu, como corrigiu e como verificou.',
    steps: [
      'Escolha três temas centrais da sua carreira na tabela e marque as aulas onde vai revisá-los',
      'Comece um diário de lacunas com pelo menos duas entradas, de exercícios ou entrevistas',
      'Gere um calendário de revisão espaçada e coloque as datas na agenda',
      'Provoque uma falha no seu projeto, como API fora do ar, dado duplicado ou deploy quebrado, e corrija',
      'Explique em cinco minutos como você percebeu, corrigiu e verificou a solução, com um teste ou log',
      'Faça uma entrevista simulada com alguém e registre o feedback no diário',
    ],
  },
  sources: [
    {
      title: 'Wikipédia: repetição espaçada',
      url: 'https://pt.wikipedia.org/wiki/Repeti%C3%A7%C3%A3o_espa%C3%A7ada',
    },
    {
      title: 'Documentação do Python: datetime',
      url: 'https://docs.python.org/pt-br/3/library/datetime.html',
    },
    {
      title: 'Tech Interview Handbook (em inglês)',
      url: 'https://www.techinterviewhandbook.org/',
    },
  ],
};
