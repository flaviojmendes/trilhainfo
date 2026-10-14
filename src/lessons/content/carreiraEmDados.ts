import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Cada Pix que você faz, cada consulta marcada no posto de saúde e cada corrida de aplicativo vira uma linha em algum banco de dados. Sozinhas, essas linhas não dizem nada. Alguém precisa juntá-las, limpá-las e entregá-las a quem decide: o gestor do SUS que precisa saber onde faltam vacinas, a loja que quer saber o que vende mais. Esse alguém é a pessoa que trabalha com engenharia de dados, e esta aula mostra como é esse trabalho e por onde começar.',
  sections: [
    {
      id: 'dados-sao-rastros',
      title: 'Dados são rastros do dia a dia',
      blocks: [
        {
          type: 'analogy',
          title: 'O caderno da padaria',
          text: 'Pense na padaria do bairro que anota tudo num caderno: quem comprou, o quê, quanto pagou, se foi fiado. Cada anotação é um **dado**. Um dia a dona pergunta: “o que vende mais na segunda de manhã?”. A resposta está no caderno, mas espalhada em centenas de páginas, com letras diferentes e anotações rasuradas. Transformar o caderno em resposta é o trabalho de dados.',
        },
        {
          type: 'text',
          text: 'Um **dado** é um registro de algo que aconteceu: uma venda, um clique, uma temperatura medida. Hoje quase tudo deixa rastro digital, e os sistemas que registram esses rastros são chamados de **fontes de dados**.',
        },
        {
          type: 'text',
          text: 'O Brasil tem fontes enormes e públicas. O **IBGE** publica censos e pesquisas sobre população, renda e emprego. O **DATASUS** reúne internações, vacinas e nascimentos do SUS. O Portal Brasileiro de Dados Abertos (`dados.gov.br`) junta milhares de conjuntos do governo, de licitações a linhas de ônibus.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Dado não é informação',
          text: 'Uma linha dizendo `2026-10-14, Recife, BCG, 1` é um dado. “Recife aplicou 12% menos BCG em outubro do que em setembro” é **informação**: um dado organizado que responde a uma pergunta. O trabalho com dados é o caminho de um para o outro.',
        },
        {
          type: 'quiz',
          question:
            'Uma prefeitura quer saber quais linhas de ônibus lotam no horário de pico. Qual destas é uma fonte de dados para responder?',
          options: [
            {
              text: 'Os registros das catracas eletrônicas dos ônibus',
              correct: true,
              feedback:
                'Isso. Cada passagem pela catraca registra linha, horário e às vezes o cartão. É um rastro que, somado, mostra a lotação.',
            },
            {
              text: 'Um painel com gráficos de lotação por linha',
              feedback:
                'O painel é o **resultado** do trabalho com dados, não a fonte. Ele só existe porque alguém juntou os registros das catracas antes.',
            },
            {
              text: 'A opinião do secretário de transportes',
              feedback:
                'Opinião ajuda a formular a pergunta, mas não é um registro do que aconteceu. Dados são rastros medidos, que outra pessoa conseguiria conferir.',
            },
          ],
        },
      ],
    },
    {
      id: 'ciclo-de-vida',
      title: 'O caminho de um dado, da fonte ao painel',
      blocks: [
        {
          type: 'analogy',
          title: 'Como a água chega à torneira',
          text: 'A água nasce num rio (a fonte), é captada e levada por canos (ingestão), fica guardada numa caixa d’água (armazenamento), passa por tratamento (transformação) e só então sai limpa na sua torneira (consumo). Se um cano vaza ou o tratamento falha, quem abre a torneira percebe. Com dados é igual.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Fonte',
              text: 'Onde o dado nasce: o banco do aplicativo, uma planilha, uma API (um endereço que entrega dados para outros programas), um arquivo público do IBGE.',
            },
            {
              term: 'Ingestão',
              text: 'Copiar o dado da fonte para um lugar seu, sem atrapalhar o sistema original. É como captar água sem secar o rio.',
            },
            {
              term: 'Armazenamento',
              text: 'Guardar os dados copiados num lugar feito para análise, como um **data warehouse** (armazém de dados) ou um **data lake** (lago de arquivos).',
            },
            {
              term: 'Transformação',
              text: 'Limpar, padronizar e combinar: corrigir datas, remover duplicados, juntar vendas com produtos. Aqui o dado bruto vira dado confiável.',
            },
            {
              term: 'Consumo',
              text: 'Quando alguém usa o resultado: um painel (dashboard), um relatório, um modelo de previsão, outro sistema.',
            },
          ],
        },
        {
          type: 'flow',
          caption: 'A venda de um pão de queijo virando um número no painel da gerência',
          actors: ['App da loja', 'Pipeline', 'Armazém', 'Painel'],
          steps: [
            {
              from: 0,
              to: 0,
              label: 'Venda registrada',
              text: 'O caixa registra a venda no banco do sistema da loja. Essa é a **fonte**: ela existe para a loja funcionar, não para análise.',
            },
            {
              from: 0,
              to: 1,
              label: 'Copia vendas de ontem',
              text: 'De madrugada, um programa chamado **pipeline** (uma sequência automática de passos) lê as vendas do dia anterior. Isso é a **ingestão**.',
            },
            {
              from: 1,
              to: 2,
              label: 'Grava dados brutos',
              text: 'O pipeline guarda uma cópia fiel, do jeito que veio. Se algo der errado depois, dá para recomeçar daqui sem incomodar a loja de novo.',
            },
            {
              from: 2,
              to: 2,
              label: 'Limpa e combina',
              text: 'A **transformação** corrige preços com vírgula, remove vendas canceladas e junta cada venda com o nome do produto e a loja.',
            },
            {
              from: 2,
              to: 3,
              label: 'Vendas por loja e dia',
              text: 'O painel lê a tabela pronta. A gerente abre de manhã e vê o que vendeu ontem: isso é o **consumo**.',
              tone: 'ok',
            },
          ],
        },
        {
          type: 'order',
          prompt:
            'Coloque em ordem o caminho dos dados de vacinação até um relatório do ministério.',
          items: [
            'O posto de saúde registra a vacina aplicada no sistema',
            'Um pipeline copia os registros do dia para o ambiente de dados',
            'Os registros brutos ficam guardados no armazenamento',
            'A transformação remove duplicados e padroniza os nomes das vacinas',
            'O relatório mostra a cobertura vacinal por município',
          ],
          explanation:
            'Fonte, ingestão, armazenamento, transformação e consumo. Quando um número do relatório parece errado, você investiga voltando por esse caminho, etapa por etapa.',
        },
      ],
    },
    {
      id: 'papeis',
      title: 'Quem faz o quê numa equipe de dados',
      blocks: [
        {
          type: 'text',
          text: 'Nas vagas você vai ver vários títulos parecidos. Eles se sobrepõem, e cada empresa usa de um jeito, mas a diferença principal está na pergunta que cada papel responde.',
        },
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              label: 'Constrói o encanamento',
              title: 'Engenharia de dados',
              text: 'Faz os dados chegarem, completos e no horário. Escreve pipelines, cuida do armazenamento, da qualidade e dos custos.',
              points: ['Python e SQL', 'Pipelines e agendamento', 'Bancos e nuvem'],
            },
            {
              label: 'Responde perguntas',
              title: 'Análise de dados',
              text: 'Usa os dados prontos para responder perguntas do negócio: por que as vendas caíram, qual campanha funcionou.',
              points: ['SQL', 'Planilhas e painéis', 'Comunicação'],
            },
            {
              label: 'Prevê e experimenta',
              title: 'Ciência de dados',
              text: 'Cria modelos estatísticos e de aprendizado de máquina: prever demanda, detectar fraude, recomendar produtos.',
              points: ['Estatística', 'Python', 'Experimentos'],
            },
            {
              label: 'Ponte entre os dois',
              title: 'Analytics engineering',
              text: 'Transforma dados brutos em tabelas bem modeladas, testadas e documentadas, prontas para quem analisa.',
              points: ['SQL avançado', 'dbt', 'Modelagem'],
            },
          ],
        },
        {
          type: 'classify',
          prompt: 'Qual papel normalmente faz cada tarefa?',
          buckets: [
            'Engenharia de dados',
            'Análise de dados',
            'Ciência de dados',
            'Analytics engineering',
          ],
          items: [
            { text: 'Agendar a cópia diária das vendas do sistema para o armazém', bucket: 0 },
            { text: 'Descobrir por que o ticket médio caiu em setembro', bucket: 1 },
            { text: 'Treinar um modelo que prevê quais clientes vão cancelar', bucket: 2 },
            { text: 'Criar a tabela de vendas por cliente, com testes de unicidade', bucket: 3 },
            { text: 'Corrigir um pipeline que parou por causa de uma API fora do ar', bucket: 0 },
            { text: 'Montar um painel de vendas por região para a diretoria', bucket: 1 },
            { text: 'Testar se um desconto aumenta as compras com um experimento A/B', bucket: 2 },
            { text: 'Documentar o que significa cada coluna da tabela de pedidos', bucket: 3 },
          ],
          explanation:
            'Em empresas pequenas, uma pessoa faz várias dessas coisas. O que define engenharia de dados é a responsabilidade pelo caminho: se o dado não chegou ou chegou errado, o problema é seu.',
        },
      ],
    },
    {
      id: 'oltp-olap-batch-streaming',
      title: 'Dois tipos de banco e dois ritmos de entrega',
      blocks: [
        {
          type: 'analogy',
          title: 'O caixa e a contadora',
          text: 'O caixa da padaria registra uma venda por vez, rápido, o dia inteiro. A contadora, no fim do mês, lê todas as vendas de uma vez para calcular impostos. Os dois usam os mesmos registros, mas com necessidades opostas. Bancos de dados também se especializam assim.',
        },
        {
          type: 'table',
          caption: 'OLTP e OLAP',
          head: ['', 'OLTP (transacional)', 'OLAP (analítico)'],
          rows: [
            ['Para quê', 'Fazer o sistema funcionar', 'Analisar o que aconteceu'],
            [
              'Operação típica',
              'Gravar ou ler **uma** linha: um pedido, um login',
              'Ler **milhões** de linhas e resumir',
            ],
            [
              'Quem usa',
              'O aplicativo, milhares de vezes por segundo',
              'Analistas, painéis, relatórios',
            ],
            ['Exemplos', 'PostgreSQL, MySQL do app', 'BigQuery, Snowflake, Redshift, DuckDB'],
          ],
        },
        {
          type: 'text',
          text: 'Por isso a engenharia de dados **copia** os dados do banco transacional para um analítico. Rodar um relatório pesado direto no banco do app é como a contadora pedir para o caixa parar de atender enquanto ela confere o mês.',
        },
        {
          type: 'text',
          text: 'O outro eixo é o ritmo. Em **batch** (lote), o pipeline junta dados por um período e processa tudo de uma vez: “todas as vendas de ontem, às 3h”. Em **streaming** (fluxo contínuo), cada evento é processado segundos depois de acontecer.',
        },
        {
          type: 'quiz',
          question:
            'Um banco precisa bloquear um Pix suspeito antes que o dinheiro saia da conta. Que ritmo de processamento faz sentido?',
          options: [
            {
              text: 'Streaming, analisando cada transação assim que ela acontece',
              correct: true,
              feedback:
                'Isso. Se a decisão precisa sair em segundos, esperar o lote da madrugada não serve. Detecção de fraude é o exemplo clássico de streaming.',
            },
            {
              text: 'Batch diário, rodando de madrugada',
              feedback:
                'De madrugada o dinheiro já saiu. Batch é ótimo para relatórios e fechamentos, não para decisões que precisam acontecer na hora.',
            },
            {
              text: 'Tanto faz, desde que os dados estejam num banco OLAP',
              feedback:
                'OLTP e OLAP falam de **onde** e **como** os dados são consultados; batch e streaming falam de **quando** são processados. São perguntas diferentes, e aqui o “quando” é decisivo.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Comece pelo batch',
          text: 'A maior parte dos pipelines do mundo é batch, e quase toda vaga de entrada pede isso primeiro. Streaming exige ferramentas e cuidados extras; deixe para depois que você dominar uma carga diária confiável.',
        },
      ],
    },
    {
      id: 'dia-a-dia-junior',
      title: 'Um dia de quem começa na engenharia de dados',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: '9h: conferir as cargas da noite',
              text: 'A primeira tarefa é ver se os pipelines da madrugada rodaram. Se um falhou, você lê o log (o registro do que o programa fez) para achar o motivo.',
            },
            {
              title: '10h: investigar um número estranho',
              text: 'Alguém do financeiro avisa que as vendas de ontem dobraram no painel. Você descobre com SQL que um arquivo foi carregado duas vezes.',
            },
            {
              title: '14h: tarefa planejada',
              text: 'Adicionar uma fonte nova, por exemplo os dados de entregas, escrevendo a ingestão em Python e a transformação em SQL.',
            },
            {
              title: '16h: revisão de código',
              text: 'Alguém mais experiente lê seu código no Git e sugere melhorias. Você aprende tanto aqui quanto escrevendo.',
            },
          ],
        },
        {
          type: 'anatomy',
          caption: 'Uma vaga de entrada típica. Explore o que cada trecho realmente pede.',
          language: 'text',
          parts: [
            { text: 'Pessoa Engenheira de Dados Júnior\n\nRequisitos:\n- ' },
            {
              text: 'SQL (JOINs, agregações, CTEs)',
              label: 'SQL',
              note: 'O requisito número um, em quase toda vaga. Você vai ler e escrever SQL todos os dias.',
            },
            { text: '\n- ' },
            {
              text: 'Python para manipulação de dados',
              label: 'Python',
              note: 'Ler arquivos, chamar APIs, limpar e validar dados. Não é preciso saber criar sites com Python.',
            },
            { text: '\n- ' },
            {
              text: 'Git e versionamento',
              label: 'Git',
              note: 'Pipelines são código: precisam de histórico, revisão e colaboração.',
            },
            { text: '\nDiferenciais:\n- ' },
            {
              text: 'Airflow, dbt, Spark, nuvem (AWS/GCP/Azure)',
              label: 'Diferenciais',
              note: 'Ferramentas que você aprende depois da base. Uma vaga júnior raramente espera domínio de todas; mostrar que usou uma já destaca.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns de quem está começando',
          text: 'Correr atrás de Spark e Kafka antes de dominar SQL e Python. Montar portfólio só com cursos concluídos, sem um projeto próprio. E achar que o trabalho é só técnico: metade do dia é entender o que a pessoa do negócio realmente quer saber.',
        },
        {
          type: 'reveal',
          question:
            'No caso do painel com vendas dobradas, por que a engenharia de dados é responsável, se quem fez o painel foi a análise?',
          answer:
            'Porque o painel só mostrou o que estava na tabela. O erro aconteceu no caminho, na carga duplicada. Garantir que o mesmo arquivo carregado duas vezes não duplique linhas (o que se chama **idempotência**) é um dos cuidados centrais da engenharia de dados.',
        },
      ],
    },
    {
      id: 'portfolio',
      title: 'Um portfólio que mostra trabalho real',
      blocks: [
        {
          type: 'text',
          text: 'Recrutadores querem ver que você consegue levar um dado da fonte ao consumo. Dados abertos brasileiros são perfeitos para isso: são reais, gratuitos, vêm bagunçados e respondem perguntas que importam.',
        },
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              label: 'Iniciante',
              title: 'Vacinação por município',
              text: 'Baixe dados do OpenDataSUS, limpe com Python e responda com SQL quais cidades estão abaixo da meta.',
            },
            {
              label: 'Intermediário',
              title: 'Gastos públicos',
              text: 'Ingira os dados do Portal da Transparência todo mês e mostre a evolução dos gastos por órgão.',
            },
            {
              label: 'Intermediário',
              title: 'Renda e população',
              text: 'Cruze tabelas do IBGE (pelo SIDRA) com outra fonte, como emprego, e explique a granularidade de cada uma.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Registre a origem e a licença',
          text: 'Todo projeto de dados deve dizer de onde vieram os dados, quando foram baixados e sob qual licença. E evite dados pessoais: a LGPD protege nomes, CPFs e endereços, mesmo que tenham vazado em algum lugar.',
        },
        {
          type: 'quiz',
          question:
            'Qual destes projetos mostra melhor que você está pronto para uma vaga de engenharia de dados?',
          options: [
            {
              text: 'Um pipeline que baixa dados do DATASUS, valida, carrega num banco e tem um README explicando como rodar',
              correct: true,
              feedback:
                'Isso. Ele mostra o caminho completo, da fonte ao consumo, e pode ser reproduzido por outra pessoa. É exatamente o trabalho da vaga.',
            },
            {
              text: 'Dez certificados de cursos online sobre ferramentas de nuvem',
              feedback:
                'Certificados mostram estudo, não prática. Sem um projeto, quem recruta não sabe se você consegue resolver um problema real.',
            },
            {
              text: 'Um notebook com um gráfico bonito feito com um CSV já limpo do Kaggle',
              feedback:
                'É um bom começo para análise, mas pulou a parte da engenharia: buscar o dado na fonte, lidar com sujeira e automatizar a carga.',
            },
          ],
        },
      ],
    },
  ],
  recap: [
    'Dados são rastros do que aconteceu; informação é o dado organizado para responder uma pergunta.',
    'O ciclo de vida dos dados passa por fonte, ingestão, armazenamento, transformação e consumo.',
    'Engenharia de dados constrói e mantém esse caminho; análise, ciência e analytics engineering usam e refinam o que chega.',
    'Bancos **OLTP** fazem o sistema funcionar e bancos **OLAP** servem para análise; **batch** processa em lotes e **streaming**, evento a evento.',
    'SQL, Python e Git são a base de qualquer vaga de entrada, e dados abertos brasileiros dão ótimos projetos de portfólio.',
  ],
  cards: [
    {
      id: 'ciclo-de-vida',
      front: 'Quais são as etapas do ciclo de vida dos dados?',
      back: 'Fonte, ingestão, armazenamento, transformação e consumo.',
    },
    {
      id: 'engenharia-vs-analise',
      front: 'Qual a diferença central entre engenharia e análise de dados?',
      back: 'Engenharia faz os dados chegarem corretos e no horário; análise usa esses dados para responder perguntas do negócio.',
    },
    {
      id: 'oltp-olap',
      front: 'O que diferencia um banco OLTP de um OLAP?',
      back: 'OLTP grava e lê poucas linhas por vez para o sistema funcionar; OLAP lê muitas linhas de uma vez para análise.',
    },
    {
      id: 'batch-streaming',
      front: 'Batch ou streaming: qual processa cada evento segundos depois de acontecer?',
      back: 'Streaming. Batch junta um período, como um dia, e processa tudo de uma vez.',
    },
    {
      id: 'pipeline',
      front: 'O que é um pipeline de dados?',
      back: 'Uma sequência automática de passos que leva dados da fonte até onde serão usados.',
    },
    {
      id: 'base-junior',
      front: 'Quais habilidades aparecem em quase toda vaga júnior de engenharia de dados?',
      back: 'SQL, Python e Git. Ferramentas como Airflow, dbt e Spark costumam ser diferenciais.',
    },
  ],
  mission: {
    title: 'Mapeie a profissão com vagas reais',
    text: 'Use vagas de verdade para descobrir o que o mercado pede e onde você está. Guarde suas anotações: elas vão guiar o que estudar nas próximas aulas.',
    steps: [
      'Escreva em três frases, com suas palavras, o que faz uma pessoa engenheira de dados',
      'Encontre três vagas de entrada (júnior ou estágio) em engenharia de dados',
      'Monte uma tabela com as habilidades pedidas em cada vaga e marque as que se repetem',
      'Marque quais habilidades você já tem, quais está aprendendo e quais faltam',
      'Escolha um conjunto de dados abertos brasileiro que você gostaria de usar num projeto e anote a origem e a licença',
    ],
  },
  sources: [
    { title: 'Portal Brasileiro de Dados Abertos', url: 'https://dados.gov.br' },
    { title: 'IBGE: SIDRA, banco de tabelas estatísticas', url: 'https://sidra.ibge.gov.br' },
    { title: 'OpenDataSUS: dados abertos da saúde', url: 'https://opendatasus.saude.gov.br' },
  ],
};
