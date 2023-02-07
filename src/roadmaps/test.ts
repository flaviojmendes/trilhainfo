import { Level, LinkContentType } from '../entity/RoadmapModel';

export const data: Level[] = [
  {
    label: 'Fundamentos de teste',
    description:
      'Esse é o básico. Aprendendo esses conceitos você será capaz de identificar um erro, defeito ou falha.',
    items: [
      {
        label: 'O que é teste?',
        children: [
          {
            label: 'Objetivos do teste',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=exof9oWgIIk',
                label: 'TESTE DE SOFTWARE: O que é teste de software? - Julio de Lima',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: 'O que é Teste de Software? (leitura complementar)',
            links: [
              {
                url: 'https://cwi.com.br/blog/o-que-e-teste-de-software-por-que-e-necessario/',
                label: 'O que é Teste de Software? Por que é necessário? - CWI',
                contentType: LinkContentType.READ,
              },
            ],
          },
        ],
      },
      {
        label: 'Por que o teste é necessário?',
        children: [
          {
            label: 'A imoportância do teste de software',
            links: [
              {
                url: 'https://blog.umbler.com/br/qualidade-de-software-1-7-motivos-para-considerar-o-teste-de-software-indispensavel/',
                label: '7 motivos para considerar o teste de software indispensável - Umbler',
                contentType: LinkContentType.READ,
              },
            ],
          },
        ],
      },
      {
        label: 'Os sete princípios de testes',
        children: [
          {
            label: '7 Princípios de teste de software',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=aSgEfWPn638',
                label: '7 PRINCÍPIOS DE TESTES DE SOFTWARE | by Syllabus - Assert+',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: 'Erro, defeito e falha. Entenda a diferença',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=DximzBibKm4',
                label: 'Erro X Defeito X Falha | Entenda a diferença - Qualicode Tech Academy',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: 'Defeitos, causas-raiz e efeitos',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=907R0YMMJDc',
                label: 'O que significa CAUSA RAIZ em testes de software - Mauro de Boni',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    items: [
      {
        label: 'O que é quality Assurance? O que faz um QA?',
        children: [
          {
            label: 'O que é quality Assurance?',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=YoPYL3AWqxg',
                label: 'O que é quality Assurance | O que faz | quem é - Assert+ ',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    items: [
      {
        label: 'Níveis de testes',
        children: [
          {
            label: 'Níveis de teste',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=o3pdNa441Ko',
                label:
                  'Teste de Unidade, Teste de Integração, Teste de Sistema, Teste de Aceite - Assert+ ',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: 'Teste de Unidade',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=9e81T1B5MlI',
                label: 'O que são Testes de Unidade - Vinicius Dias',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: 'Teste de Integração',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=lEjOjPcr_9c',
                label: 'Testes de Integração - Diogo Silveira Mendonça',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: 'Teste de Sistema',
            links: [
              {
                url: 'https://olisipo.pt/blog/niveis-de-teste-tipos-de-teste-e-execucao-de-testes-descubra-as-diferencas/',
                label: 'Teste de Sistema (System Testing) - Olisipo',
                contentType: LinkContentType.READ,
              },
            ],
          },
          {
            label: 'Teste de Aceite',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=nu9gecG7hSk',
                label: 'Testes de Aceitação - Diogo Silveira Mendonça',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Abordagens de teste',
    description:
      'Conhecer cada abordagem de teste nos ajuda a saber qual tipo de teste utilizar na camada em que estamos testando',
    items: [
      {
        label: 'Caixa branca (White-box)',
        children: [
          {
            label: 'Caixa branca (White-box)',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=jDVPtdGveHk',
                label: 'O que é teste caixa-branca e as técnicas descritas no CTFL - Mauro de Boni',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: 'Caixa preta (Black-box)',
        children: [
          {
            label: 'Caixa preta (Black-box)',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=-Ozp8jbeuRI',
                label: 'Teste de Caixa Preta - Gilsandro',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: 'Caixa cinza (Gray-box)',
        children: [
          {
            label: 'Caixa cinza (Gray-box)',
            links: [
              {
                url: 'https://definirtec.com/teste-de-caixa-cinza/',
                label: 'Teste de Caixa Cinza - Definirtec',
                contentType: LinkContentType.READ,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    items: [
      {
        label: 'Técnicas e estratégias de teste',
        children: [
          {
            label: 'Tabela de decisão',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=AW4aOI24b-o',
                label:
                  'Tabela de decisão no mundo dos testes por Vanessa Redes e Jonathan Santiago - 4All tests',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: 'Análise de valor limite',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=BeARZT6ns5Y',
                label:
                  'Análise do valor limite: Conheça essa técnica de testes de software - Mauro de Boni',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: 'Partição de equivalência',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=-IdzE1GoC-g',
                label: 'O que é partição de equivalência: O guia definitivo - Julio de Lima',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: 'Transição de estado',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=jHlUA02E6RI',
                label: 'Transição de estado | Técnica de testes | Estratégia de testes - Assert+',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Tipos de teste',
    description:
      'Conhecer cada abordagem de teste nos ajuda a saber qual tipo de teste utilizar na camada em que estamos testando',
    items: [
      {
        label: 'Testes funcionais',
        children: [
          {
            label: 'Testes funcionais',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=3arc_V7osNo',
                label: 'Engenharia de Software - Teste funcional - UNIVESP',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: 'Testes exploratórios',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=Rz2U8T0uR94',
                label: 'Como fazer testes exploratórios em aplicações WEB - Julio de Lima',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: 'Testes de regressão',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=knOW3QBqlQ8',
                label: 'Testes de regressão - ACCT.global',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: 'Smoke test',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=gthsLzX1jkg',
                label: 'Smoke Tests (Teste de Fumaça) por Luana Terense - 4All tests',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: 'Testes não-funcionais',
        children: [
          {
            label: 'Testes não-funcionais',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=-XrUuNnrS9U',
                label: 'Testes não funcionais usando Loadster - Mirna tá online!',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: 'Testes de stress',
            links: [
              {
                url: 'https://yaman.com.br/pt-br/blog/stress-test/',
                label: 'Stress Test: o que é e por que a sua empresa precisa fazê-lo agora - Yaman',
                contentType: LinkContentType.READ,
              },
            ],
          },
          {
            label: 'Testes de performance',
            links: [
              {
                url: 'https://www.testar.me/teste-de-performance',
                label: 'Testes de performance - Testar.me',
                contentType: LinkContentType.READ,
              },
            ],
          },
          {
            label: 'Testes de carga',
            links: [
              {
                url: 'https://techpost.com.br/engenharia/teste-de-carga-e-a-sua-importancia-na-qualidade-do-software-techpost',
                label: 'Teste de Carga e a sua importância na qualidade do software - Techpost',
                contentType: LinkContentType.READ,
              },
            ],
          },
          {
            label: 'Testes de segurança',
            links: [
              {
                url: 'https://cynoteck.com/pt/blog-post/introduction-to-security-testing/',
                label: 'Uma introdução aos testes de segurança  - Cynoteck',
                contentType: LinkContentType.READ,
              },
            ],
          },
          {
            label: 'Entendendo a diferença entre Testes funcionais e não funcionais',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=YshnAC19nWk',
                label:
                  'Testes Funcionais E Testes não funcionais - Entendo as diferenças | Exemplos de utilização - Assert+',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Gerenciando seus testes',
    description:
      'Conhecer e ter uma boa ferramenta de gestão de testes pode te ajudar a prover um feedback sobre o ciclo de vida do software',
    items: [
      {
        label: 'qTest',
        children: [
          {
            label: 'qTest',
            links: [
              {
                url: 'https://www.tricentis.com/products/unified-test-management-qtest/test-case-manager',
                label: 'Elimine a dor do gerenciamento de testes - Tricentis',
                contentType: LinkContentType.READ,
              },
            ],
          },
        ],
      },
      {
        label: 'TestRail',
        children: [
          {
            label: 'TestRail',
            links: [
              {
                url: 'https://www.gurock.com/testrail/',
                label: 'O Padrão em Gerenciamento de Testes - Gurock',
                contentType: LinkContentType.READ,
              },
            ],
          },
        ],
      },
      {
        label: 'TestLink',
        children: [
          {
            label: 'TestLink',
            links: [
              {
                url: 'https://testlink.org/',
                label: 'Gerenciamento de teste de código aberto TestLink - TestLink',
                contentType: LinkContentType.READ,
              },
            ],
          },
        ],
      },
      {
        label: 'Zephyr',
        children: [
          {
            label: 'Zephyr',
            links: [
              {
                url: 'https://www.zephyrproject.org/',
                label: 'Gerenciamento de teste de código aberto Zephyr - Zephyr',
                contentType: LinkContentType.READ,
              },
            ],
          },
        ],
      },
      {
        label: 'Bugzilla',
        children: [
          {
            label: 'Bugzilla',
            links: [
              {
                url: 'https://www.bugzilla.org/',
                label:
                  'A solução de software projetada para impulsionar o desenvolvimento de software - Bugzilla',
                contentType: LinkContentType.READ,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Métodologias ou Modelos de Desenvolvimento de Software',
    items: [
      {
        label: 'Agile',
        children: [
          {
            label: 'Scrum',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=HcZVxsVZ-48&list=PLRj4UESgCLz1uwaFje483eV8hQiBguW-P',
                label: 'Curso de Scrum - Minutoagil',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: 'Kanban',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=z1drxmwUCJg',
                label: 'O que é Kanban? Como funciona o Kanban? - Moxie',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: 'Extreme programming',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=oicEg7xHy-I',
                label: 'O Que É eXtreme Programming- Celso Kitamura',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: 'Cascata',
        children: [
          {
            label: 'Modelo Cascata',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=luCQslwi8pE',
                label:
                  'Modelo em Cascata - Ciclos de Vida de Desenvolvimento de Software - Bóson treinamentos',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: 'Modelo V',
        children: [
          {
            label: 'Modelo V',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=YGmDFNFO5Kk',
                label: 'Processo de Teste de Software (Tradicional) - Diogo Silveira Mendonça',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: 'Devops',
        children: [
          {
            label: 'RoadMap Devops',
            links: [
              {
                url: 'https://trilha.info/roadmap/devops',
                label: 'RoadMap DevOps - TrilhaInfo',
                contentType: LinkContentType.READ,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Automação de testes',
    description:
      'Automação é uma técnica de teste de software que utiliza ferramentas especiais de teste automatizado para executar um conjunto de casos de teste, complementando assim a execução dos testes planejados',
    items: [
      {
        label: 'Web',
        children: [
          {
            label: 'Selenium WebDriver',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=pLRvqONKcWg',
                label: 'Teste Web com Selenium WebDriver - Iterasys',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: 'Cypress',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=gTRMuWCp8mE',
                label: 'Cypress - passo a passo para criar o primeiro projeto e testes - Agilizei',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: 'Playwright',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=4qEYMnUPGtQ',
                label: 'Fazendo testes de interface com o Playwright - Luciano Ratamero',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: 'Mobile',
        children: [
          {
            label: 'Appium',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=2W_JapwA_jY',
                label: 'Teste de Software - Automação - Appium - Aurea Hileia Melo',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: 'Espresso',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=vJKoTdh9qGk',
                label: 'Automação de testes mobile Android com Espresso - Qazando',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: 'XCUITest',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=-JyD2EMRxVA',
                label: 'Automação de testes NATIVA para iOS com XCUITest - Qazando',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: 'Detox Framework',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=boqCXo6cxcw',
                label:
                  'Detox Framework: Automação de testes saudável para apps em React Native - DevelopersBr',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: 'API',
        children: [
          {
            label: 'Rest Assured',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=EjXimnUwAns',
                label: 'Como testar API usando rest assured | Criando o projeto - QaOps',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: 'HTTParty',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=UxM3AMLAdEw',
                label: "Testes de API's usando Ruby + HTTParty e RSpec - Iterasys",
                contentType: LinkContentType.WATCH,
              },
            ],
          },
          {
            label: 'Restsharp ',
            links: [
              {
                url: 'https://www.youtube.com/watch?v=RQ1W-P0D63E',
                label: 'Testes de API com Restsharp e .Net Core - Iterasys',
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
    ],
  },
];
