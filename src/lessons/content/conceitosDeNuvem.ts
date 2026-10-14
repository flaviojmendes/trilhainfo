import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'O app do seu banco, o streaming que você assiste e o sistema de agendamento do posto de saúde provavelmente rodam em computadores que essas empresas nem possuem: elas alugam. Quase toda vaga de DevOps, backend ou dados pede “experiência com nuvem”. E quase toda história de conta de nuvem de milhares de reais começa com alguém que não entendia o que estava ligando. Aqui você aprende o mapa antes de abrir o console.',
  sections: [
    {
      id: 'aluguel-de-computador',
      title: 'Nuvem é computador alugado',
      blocks: [
        {
          type: 'analogy',
          title: 'Comprar um carro ou chamar um carro por aplicativo',
          text: 'Com carro próprio, você paga tudo de uma vez, cuida da manutenção e ele fica parado na garagem a maior parte do dia. Com aplicativo, você paga pela corrida, não se preocupa com o motor e, se precisar de dez carros amanhã, chama dez. A **nuvem** é o aplicativo de transporte dos computadores.',
        },
        {
          type: 'text',
          text: '**Computação em nuvem** é usar, pela internet, servidores, armazenamento e bancos de dados de um **provedor** (como AWS, Google Cloud ou Azure) e pagar pelo que usar. Os computadores existem, ficam em prédios enormes chamados **data centers**; você só não precisa comprá-los nem cuidar deles.',
        },
        {
          type: 'text',
          text: 'As vantagens são criar recursos em minutos, aumentar ou diminuir conforme a demanda (**elasticidade**) e não pagar por máquina parada. O preço é depender do provedor e precisar vigiar a conta, porque tudo que fica ligado é cobrado.',
        },
        {
          type: 'quiz',
          question:
            'Uma loja online vende 10 vezes mais na Black Friday do que no resto do ano. Por que a nuvem ajuda especialmente esse caso?',
          options: [
            {
              text: 'Porque dá para aumentar os servidores só na semana do pico e diminuir depois',
              correct: true,
              feedback:
                'Isso. Com servidores próprios, a loja precisaria comprar máquinas para o pico e deixá-las paradas o resto do ano. A elasticidade é o ponto forte da nuvem.',
            },
            {
              text: 'Porque na nuvem o site nunca cai',
              feedback:
                'A nuvem também tem falhas, e um sistema mal configurado cai em qualquer lugar. Ela oferece ferramentas para resistir a falhas, mas é preciso usá-las.',
            },
            {
              text: 'Porque a nuvem é sempre mais barata',
              feedback:
                'Nem sempre. Uma carga constante e previsível pode sair mais cara na nuvem do que em máquinas próprias. O ganho aparece quando a demanda varia.',
            },
          ],
        },
      ],
    },
    {
      id: 'modelos-de-servico',
      title: 'Quanto você quer fazer sozinho',
      blocks: [
        {
          type: 'analogy',
          title: 'Quatro jeitos de comer feijoada no sábado',
          text: 'Você pode comprar os ingredientes e cozinhar tudo. Pode comprar a feijoada pronta e só esquentar em casa. Pode pedir pelo iFood e só pôr a mesa. Ou pode ir ao restaurante e só comer. Quanto mais pronto, menos trabalho e menos controle. Os modelos de nuvem seguem a mesma lógica.',
        },
        {
          type: 'table',
          caption: 'Os modelos de serviço',
          head: ['Modelo', 'O provedor cuida de', 'Você cuida de', 'Exemplos'],
          rows: [
            [
              '**IaaS** (infraestrutura)',
              'Hardware, rede, data center',
              'Sistema operacional, atualizações, aplicação',
              'Amazon EC2, Compute Engine, Azure VMs',
            ],
            [
              '**PaaS** (plataforma)',
              'Tudo acima e o sistema operacional',
              'O código e a configuração',
              'Heroku, Google App Engine, Azure App Service',
            ],
            [
              '**Serverless** (funções)',
              'Servidores, escala e execução',
              'Só a função que roda em cada evento',
              'AWS Lambda, Cloud Functions, Azure Functions',
            ],
            [
              '**SaaS** (software pronto)',
              'O programa inteiro',
              'Usar e configurar sua conta',
              'Gmail, Google Planilhas, Slack',
            ],
          ],
        },
        {
          type: 'text',
          text: '**Serverless** não quer dizer “sem servidor”: quer dizer que você não vê nem gerencia o servidor. Você entrega uma função, ela roda quando algo acontece (um arquivo enviado, uma requisição) e você paga por execução.',
        },
        {
          type: 'classify',
          prompt: 'Classifique cada situação pelo modelo de serviço.',
          buckets: ['IaaS', 'PaaS', 'Serverless', 'SaaS'],
          items: [
            { text: 'Alugar uma máquina virtual Linux e instalar o PostgreSQL nela', bucket: 0 },
            { text: 'Enviar o código da API e a plataforma cuidar de rodar e escalar', bucket: 1 },
            { text: 'Uma função que gera a miniatura sempre que uma foto é enviada', bucket: 2 },
            { text: 'O time usa o Google Planilhas para controlar o estoque', bucket: 3 },
            { text: 'Ter acesso SSH ao servidor e atualizar o sistema você mesmo', bucket: 0 },
            {
              text: 'Uma função que roda todo dia às 6h e é cobrada só nesses segundos',
              bucket: 2,
            },
          ],
          explanation:
            'A pergunta que separa os modelos é: “quem atualiza o sistema operacional e quem decide quantas máquinas rodam?”. Em IaaS é você; nos outros, cada vez mais o provedor.',
        },
      ],
    },
    {
      id: 'regioes-e-zonas',
      title: 'Onde ficam as máquinas',
      blocks: [
        {
          type: 'text',
          text: 'Os provedores organizam data centers em **regiões**: áreas geográficas, como São Paulo, Virgínia ou Frankfurt. Cada região tem várias **zonas de disponibilidade**: prédios separados, com energia e rede independentes, perto o bastante para conversar rápido.',
        },
        {
          type: 'text',
          text: 'Na AWS, a região de São Paulo se chama `sa-east-1` e suas zonas, `sa-east-1a`, `sa-east-1b` e assim por diante. Espalhar a aplicação em duas zonas faz ela sobreviver se um prédio inteiro ficar sem energia.',
        },
        {
          type: 'quiz',
          question:
            'Uma clínica em Belo Horizonte vai guardar prontuários na nuvem. Qual é o critério que mais pesa na escolha da região?',
          options: [
            {
              text: 'Ficar perto das pessoas usuárias e atender às regras de proteção de dados',
              correct: true,
              feedback:
                'Isso. Região perto reduz a **latência** (o tempo de ida e volta dos dados), e dados de saúde têm exigências da LGPD e de contratos sobre onde e como são tratados. Preço também varia por região, mas vem depois.',
            },
            {
              text: 'Escolher a região mais barata, mesmo do outro lado do mundo',
              feedback:
                'Economia importa, mas aqui a latência aumentaria para todo mundo e o tratamento de dados sensíveis fora do país pode exigir cuidados legais extras.',
            },
            {
              text: 'Tanto faz, a nuvem está em todo lugar',
              feedback:
                'A nuvem tem endereço. Cada recurso que você cria fica numa região específica, e isso afeta velocidade, preço e regras legais.',
            },
          ],
        },
      ],
    },
    {
      id: 'blocos-de-construcao',
      title: 'As quatro peças básicas',
      blocks: [
        {
          type: 'text',
          text: 'Os provedores oferecem centenas de serviços, mas quase tudo é montado com quatro peças: **computação** (onde o código roda), **armazenamento** (onde ficam arquivos), **rede** (como as peças se conectam e quem entra) e **banco de dados** gerenciado.',
        },
        {
          type: 'table',
          caption: 'Os mesmos blocos com nomes diferentes em cada provedor',
          head: ['Bloco', 'AWS', 'Google Cloud', 'Azure'],
          rows: [
            ['Máquina virtual', 'EC2', 'Compute Engine', 'Virtual Machines'],
            ['Containers gerenciados', 'ECS / Fargate', 'Cloud Run', 'Container Apps'],
            ['Funções serverless', 'Lambda', 'Cloud Functions', 'Azure Functions'],
            ['Armazenamento de objetos', 'S3', 'Cloud Storage', 'Blob Storage'],
            ['Rede privada', 'VPC', 'VPC', 'Virtual Network'],
            ['Banco relacional gerenciado', 'RDS', 'Cloud SQL', 'Azure Database'],
            ['Data warehouse', 'Redshift', 'BigQuery', 'Synapse'],
          ],
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Armazenamento de objetos',
              text: 'Guarda arquivos inteiros (fotos, CSVs, backups) em “baldes” (**buckets**), acessados por endereço. Barato e quase sem limite. Em engenharia de dados, é onde costumam ficar os dados brutos.',
            },
            {
              term: 'Banco gerenciado',
              text: 'Um PostgreSQL ou MySQL em que o provedor cuida de instalação, backup e atualização. Você só usa.',
            },
            {
              term: 'Data warehouse',
              text: 'Um banco feito para análises sobre muitos dados, como somar as vendas de cinco anos. Cobra pelo volume processado ou armazenado.',
            },
          ],
        },
        {
          type: 'terminal',
          title: 'Explorando a conta pela linha de comando',
          task: 'Você recebeu acesso à conta de laboratório da empresa. Use a AWS CLI (`aws`) para descobrir quem você é e o que existe lá.',
          prompt: 'voce@computador:~$',
          steps: [
            {
              goal: 'Descubra com qual identidade a CLI está autenticada.',
              command: ['aws sts get-caller-identity'],
              output:
                '{\n    "UserId": "AIDAEXEMPLO123",\n    "Account": "123456789012",\n    "Arn": "arn:aws:iam::123456789012:user/ana-lab"\n}',
              hint: '`aws sts get-caller-identity`. É sempre o primeiro comando: ele evita mexer na conta errada.',
            },
            {
              goal: 'Liste os buckets de armazenamento de objetos.',
              command: ['aws s3 ls'],
              output:
                '2026-09-02 10:14:31 loja-lab-backups\n2026-09-02 10:15:02 loja-lab-dados-brutos',
              hint: '`aws s3 ls`.',
            },
            {
              goal: 'Envie o arquivo `vendas.csv` para o bucket `loja-lab-dados-brutos`.',
              command: [
                'aws s3 cp vendas.csv s3://loja-lab-dados-brutos/',
                'aws s3 cp vendas.csv s3://loja-lab-dados-brutos/vendas.csv',
              ],
              output: 'upload: ./vendas.csv to s3://loja-lab-dados-brutos/vendas.csv',
              hint: '`aws s3 cp arquivo s3://nome-do-bucket/`.',
            },
            {
              goal: 'Liste as máquinas virtuais da região de São Paulo em formato de tabela.',
              command: [
                'aws ec2 describe-instances --region sa-east-1 --output table',
                'aws ec2 describe-instances --output table --region sa-east-1',
              ],
              output:
                '----------------------------------------------------\n|                 DescribeInstances                |\n+---------------------+-----------+----------------+\n|  InstanceId         |  Type     |  State         |\n+---------------------+-----------+----------------+\n|  i-0a1b2c3d4e5f     |  t3.micro |  running       |\n|  i-09f8e7d6c5b4     |  t3.large |  running       |\n+---------------------+-----------+----------------+',
              hint: '`aws ec2 describe-instances --region sa-east-1 --output table`.',
            },
            {
              goal: 'A `t3.large` era um teste esquecido. Desligue e apague a instância `i-09f8e7d6c5b4`.',
              command: [
                'aws ec2 terminate-instances --instance-ids i-09f8e7d6c5b4 --region sa-east-1',
              ],
              output:
                '{\n    "TerminatingInstances": [\n        {\n            "InstanceId": "i-09f8e7d6c5b4",\n            "CurrentState": { "Name": "shutting-down" },\n            "PreviousState": { "Name": "running" }\n        }\n    ]\n}',
              hint: '`aws ec2 terminate-instances --instance-ids i-09f8e7d6c5b4 --region sa-east-1`.',
            },
          ],
        },
      ],
    },
    {
      id: 'iam-e-responsabilidade',
      title: 'Quem pode o quê, e quem cuida de quê',
      blocks: [
        {
          type: 'text',
          text: '**IAM** (gestão de identidade e acesso) é o porteiro da conta: diz quem entra e o que cada um pode fazer. Pessoas, programas e serviços recebem permissões descritas em **políticas**.',
        },
        {
          type: 'analogy',
          title: 'O chaveiro do prédio',
          text: 'O entregador do iFood recebe acesso ao portão, não às chaves de todos os apartamentos. A faxineira do condomínio tem a chave do salão de festas, não a do cofre da administração. **Privilégio mínimo** é isso: cada um com a menor chave que resolve o seu trabalho.',
        },
        {
          type: 'anatomy',
          caption: 'Uma política de IAM da AWS que só deixa ler um bucket.',
          language: 'json',
          parts: [
            { text: '{\n  "Version": "2012-10-17",\n  "Statement": [\n    {\n' },
            {
              text: '      "Effect": "Allow",',
              label: 'Effect',
              note: '`Allow` permite, `Deny` proíbe. Tudo que não foi permitido explicitamente já é proibido.',
            },
            { text: '\n' },
            {
              text: '      "Action": ["s3:GetObject", "s3:ListBucket"],',
              label: 'Action',
              note: 'O que pode ser feito: ler arquivos e listar o bucket. Não pode apagar nem escrever. Um `"s3:*"` aqui daria tudo, inclusive apagar.',
            },
            { text: '\n' },
            {
              text: '      "Resource": [\n        "arn:aws:s3:::loja-lab-dados-brutos",\n        "arn:aws:s3:::loja-lab-dados-brutos/*"\n      ]',
              label: 'Resource',
              note: 'Sobre o quê: só este bucket e o que está dentro dele. Um `"*"` aqui valeria para todos os buckets da conta.',
            },
            { text: '\n    }\n  ]\n}' },
          ],
        },
        {
          type: 'text',
          text: 'Segurança na nuvem segue o **modelo de responsabilidade compartilhada**. O provedor cuida da segurança **da** nuvem: prédios, hardware, a rede física. Você cuida da segurança **na** nuvem: quem tem acesso, o que está público, senhas, atualizações do seu sistema e dos seus dados.',
        },
        {
          type: 'quiz',
          question:
            'Um bucket com CPFs de clientes foi configurado como público e os dados vazaram. De quem é a responsabilidade?',
          options: [
            {
              text: 'Da empresa que configurou o bucket',
              correct: true,
              feedback:
                'Isso. A permissão de acesso é parte da segurança **na** nuvem, que é sempre do cliente. O provedor entregou exatamente o que foi configurado.',
            },
            {
              text: 'Do provedor, porque o dado estava no data center dele',
              feedback:
                'O provedor responde pelo prédio, pelos discos e pela rede física. Quem decide se um bucket é público é quem o configura.',
            },
            {
              text: 'De ninguém, porque a nuvem é pública por natureza',
              feedback:
                '“Nuvem pública” significa que o serviço está à venda para qualquer empresa, não que os dados ficam abertos. Os buckets nascem privados por padrão.',
            },
          ],
        },
      ],
    },
    {
      id: 'custos',
      title: 'A conta chega todo mês',
      blocks: [
        {
          type: 'text',
          text: 'Na nuvem, quase tudo é cobrado por uso: horas de máquina ligada, gigabytes guardados, gigabytes que **saem** do provedor para a internet. Isso é ótimo para começar barato e perigoso para quem esquece coisas ligadas.',
        },
        {
          type: 'python',
          title: 'Estimando a conta antes de criar',
          task: 'Calcule o custo mensal estimado de um ambiente simples. Os preços são ilustrativos, em dólar. Preencha `custo_servidores`, `custo_armazenamento`, `custo_transferencia` e `total`, e imprima o total.',
          code: 'horas_no_mes = 730\n\nservidores = 2\npreco_hora_servidor = 0.0208\n\narmazenamento_gb = 50\npreco_gb_mes = 0.023\n\ntransferencia_gb = 100\npreco_gb_saida = 0.09\n\n# custo = quantidade x preço (servidores também multiplicam pelas horas)\ncusto_servidores = 0\ncusto_armazenamento = 0\ncusto_transferencia = 0\ntotal = 0\n\nprint(f"Servidores: US$ {custo_servidores:.2f}")\nprint(f"Total: US$ {total:.2f}")\n',
          solution:
            'horas_no_mes = 730\n\nservidores = 2\npreco_hora_servidor = 0.0208\n\narmazenamento_gb = 50\npreco_gb_mes = 0.023\n\ntransferencia_gb = 100\npreco_gb_saida = 0.09\n\ncusto_servidores = servidores * horas_no_mes * preco_hora_servidor\ncusto_armazenamento = armazenamento_gb * preco_gb_mes\ncusto_transferencia = transferencia_gb * preco_gb_saida\ntotal = custo_servidores + custo_armazenamento + custo_transferencia\n\nprint(f"Servidores: US$ {custo_servidores:.2f}")\nprint(f"Total: US$ {total:.2f}")\n',
          checks: [
            {
              label: 'Os servidores custam 2 x 730 horas x 0,0208',
              test: 'abs(custo_servidores - 30.368) < 0.01',
            },
            {
              label: 'O armazenamento e a transferência estão calculados',
              test: 'abs(custo_armazenamento - 1.15) < 0.01 and abs(custo_transferencia - 9.0) < 0.01',
            },
            {
              label: 'O total soma as três partes',
              test: 'abs(total - 40.518) < 0.01',
            },
            {
              label: 'O total aparece impresso',
              test: "'Total: US$ 40.52' in __saida__",
            },
          ],
        },
        {
          type: 'reveal',
          question:
            'No cálculo acima, uma máquina `t3.large` de teste esquecida ligada custaria cerca de US$ 0,08 por hora. Quanto isso dá no mês, e por que é um susto comum?',
          answer:
            'Cerca de US$ 60 (0,08 x 730 horas), mais que o ambiente inteiro. É comum porque a máquina não avisa que está ociosa: ela só aparece na fatura. Alertas de orçamento e apagar recursos ao terminar evitam isso.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Os sustos mais comuns na fatura',
          text: 'Máquinas de teste esquecidas ligadas. Discos e backups que sobram depois de apagar a máquina. Transferência de dados para fora do provedor. Consultas num data warehouse que leem a tabela inteira. Chaves de acesso vazadas usadas para minerar criptomoeda. Antes de qualquer laboratório, crie um **alerta de orçamento** e marque os recursos com **tags** (etiquetas como `projeto=lab`).',
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem um laboratório seguro na nuvem.',
          items: [
            'Criar um alerta de orçamento com valor baixo',
            'Usar uma identidade com permissões mínimas, não a conta principal',
            'Criar os recursos com uma tag do projeto',
            'Fazer o experimento',
            'Apagar todos os recursos com aquela tag',
            'Conferir no painel de custos que nada ficou cobrando',
          ],
          explanation:
            'O orçamento e as permissões vêm antes porque protegem você dos próprios erros. A conferência final pega o que escapou da limpeza.',
        },
      ],
    },
  ],
  recap: [
    'Nuvem é usar computadores de um provedor pela internet e pagar pelo uso, com elasticidade para crescer e diminuir.',
    'IaaS, PaaS, serverless e SaaS diferem em quanto o provedor cuida por você; quanto mais pronto, menos controle.',
    'Recursos ficam em regiões e zonas; computação, armazenamento, rede e banco são as peças básicas em qualquer provedor.',
    'IAM aplica privilégio mínimo, e pela responsabilidade compartilhada a configuração de acesso é sempre sua.',
    'Custos são por uso: estime antes, crie alertas de orçamento e apague o que não usa.',
  ],
  cards: [
    {
      id: 'elasticidade',
      front: 'O que é elasticidade na nuvem?',
      back: 'Aumentar ou diminuir recursos conforme a demanda, pagando só pelo que usa.',
    },
    {
      id: 'iaas-paas-saas',
      front: 'Qual a diferença entre IaaS, PaaS e SaaS?',
      back: 'IaaS: você cuida do sistema e da aplicação. PaaS: só do código. SaaS: só usa o programa pronto.',
    },
    {
      id: 'serverless',
      front: 'O que significa serverless?',
      back: 'Você entrega funções e não gerencia servidores; elas rodam por evento e são cobradas por execução.',
    },
    {
      id: 'regiao-zona',
      front: 'Qual a diferença entre região e zona de disponibilidade?',
      back: 'Região é uma área geográfica; zonas são data centers independentes dentro dela.',
    },
    {
      id: 'privilegio-minimo',
      front: 'O que é privilégio mínimo?',
      back: 'Dar a cada pessoa ou programa só as permissões necessárias para seu trabalho.',
    },
    {
      id: 'responsabilidade',
      front: 'No modelo de responsabilidade compartilhada, o que é seu?',
      back: 'A segurança na nuvem: acessos, dados, configurações e o que você instala.',
    },
    {
      id: 'objetos',
      front: 'Para que serve o armazenamento de objetos, como o S3?',
      back: 'Guardar arquivos inteiros em buckets, barato e em grande volume: fotos, CSVs, backups.',
    },
  ],
  mission: {
    title: 'Desenhe o ambiente antes de criar',
    text: 'Pegue uma aplicação sua (um site com API e banco, ou um pipeline de dados) e planeje como ela rodaria na nuvem. Tudo pode ficar no papel; se decidir criar de verdade, comece pelo orçamento.',
    steps: [
      'Escolha um provedor e uma região, justificando pela localização das pessoas usuárias',
      'Desenhe as peças: onde roda o código, onde ficam arquivos, qual banco, como entram os acessos',
      'Estime o custo mensal com a calculadora oficial do provedor',
      'Escreva as permissões mínimas que a aplicação precisa, recurso por recurso',
      'Se criar recursos, configure um alerta de orçamento antes e apague tudo ao terminar',
    ],
  },
  sources: [
    {
      title: 'AWS: O que é computação em nuvem?',
      url: 'https://aws.amazon.com/pt/what-is-cloud-computing/',
    },
    {
      title: 'AWS: Modelo de responsabilidade compartilhada',
      url: 'https://aws.amazon.com/compliance/shared-responsibility-model/',
    },
    {
      title: 'AWS IAM: práticas recomendadas de segurança',
      url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html',
    },
  ],
};
