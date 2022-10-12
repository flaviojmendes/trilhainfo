import {
  Level,
  LinkType,
  LinkContentType,
  RoadmapItem,
} from "../entity/RoadmapItem";

export const data: Level[] = [
  {
    label: "Escolha uma linguagem",
    description:
      "Tente aprender alguma dessas com a finalidade de usar para automação de tarefas.",
    items: [
      {
        label: "Javascript",
        description:
          "JavaScript permite adicionar interatividade às suas páginas. Exemplos comuns que você pode ter visto nos sites são controles deslizantes, interações de clique, pop-ups e assim por diante. Além de ser usado no front-end em navegadores, existe o Node.js, que é um ambiente de tempo de execução JavaScript back-end de código aberto, multiplataforma e executado no mecanismo V8 e executa código JavaScript fora de um navegador da web.",
        children: [{ label: "O básico", links: [] }],
      },
      {
        label: "Python",
        description:
          "Python é uma linguagem de programação bem conhecida que é uma linguagem fortemente tipada e uma linguagem tipada dinamicamente. Sendo uma linguagem interpretada, o código é executado assim que é escrito e a sintaxe do Python permite escrever código de forma programática funcional, procedural ou orientada a objetos.",
        children: [
          {
            label: "Python",
            links: [
              {
                label: "Curso Python - Curso em Video (Gustavo Guanabara)",
                url: "https://www.youtube.com/watch?v=S9uPNppGsGo&list=PLvE-ZAFRgX8hnECDn1v9HNTI71veL3oW0",
                contentType: LinkContentType.WATCH,
              },
              {
                label: "Curso Python - Robert Silva",
                url: "https://www.youtube.com/watch?v=md1vkPxwNNE&list=PLg7nVxv7fa6c9kHOFxJEBXnQMHa-_ATzk",
                contentType: LinkContentType.WATCH,
              },
              {
                label: "Python Week - Linux Tips e Bruno Rocha",
                url: "https://www.youtube.com/watch?v=spIRwXEF3XY&list=PLf-O3X2-mxDlfAv8IOfic1sHArdwrrkgh&index=2",
                contentType: LinkContentType.WATCH,
              },
              {
                label: "Selenium com Python - Dunossauro",
                url: "https://www.youtube.com/watch?v=PHHXksljGNA&list=PLOQgLBuj2-3LqnMYKZZgzeC7CKCPF375B",
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: "Go",
        description:
          "Go é uma linguagem de programação de código aberto suportada pelo Google. Go pode ser usado para escrever serviços em nuvem, ferramentas CLI, usadas para desenvolvimento de API e muito mais.",
        children: [
          {
            label: "Go",
            links: [
              {
                label: "Aprenda Go",
                url: "https://www.youtube.com/watch?v=WiGU_ZB-u0w&list=PLCKpcjBB_VlBsxJ9IseNxFllf-UFEXOdg",
                contentType: LinkContentType.WATCH,
              },
              {
                label: "Go 101 - Tiago Temporin",
                url: "https://tiago-temporin.notion.site/Go-101-1fe9cef0ccc94ed3bed7f38e7dd5815d",
                contentType: LinkContentType.VISIT,
              },
            ],
          },
        ],
      },
      {
        label: "Rust",
        description:
          "Rust é uma linguagem de programação de sistemas moderna com foco em segurança, velocidade e simultaneidade. Ele atinge esses objetivos sendo seguro para a memória sem usar o garbage collector.",
        children: [
          {
            label: "Rust",
            links: [
              {
                label: "Aprenda com quem não sabe - Fernando Daciuk",
                url: "https://www.youtube.com/watch?v=mWh49ZpmQwk&list=PLr4c053wuXU-igL9KSptwKK5XdyGX13FB",
                contentType: LinkContentType.WATCH,
              },
              {
                label: "A Linguagem de Programação Rust - Bruno Rocha",
                url: "https://www.youtube.com/watch?v=K5Zt804f9tg&list=PLjSf4DcGBdiHC1rf9rXR9orU3wvGjgtpm",
                contentType: LinkContentType.WATCH,
              },
            ],
          },
        ],
      },
      {
        label: "Ruby",
        description:
          "Ruby é uma linguagem de programação interpretada de alto nível que combina Perl, Smalltalk, Eiffel, Ada e Lisp. Ruby foca na simplicidade e produtividade junto com uma sintaxe que lê e escreve naturalmente. Ruby suporta programação procedural, orientada a objetos e funcional e é tipada dinamicamente.",
        children: [{ label: "O básico", links: [] }],
      },
      {
        label: "C++",
        description:
          "C++ é uma linguagem de programação compilada multi-paradigma e de uso geral. Desde os anos 1990 é uma das linguagens comerciais mais populares, sendo bastante usada também na academia por seu grande desempenho e base de utilizadores.",
        children: [{ label: "O básico", links: [] }],
      },
    ],
  },
  {
    label: "Conceitos de Sistemas Operacionais",
    description: "Aqui você vai aprenser Conceitos referente a Sistema Operacionais, como Processos, Threads, Sockets, Rede",
    items: [
      {
        label: "Gerenciamento de Processos",
        description:
          "Aqui Você vai entender mais sobre o gerenciamento de processos no Sistema Operacional",
          children: [
            {
              label: "Linux",
              links: [
                {
                  label: "Gerenciamento de Processos - LinuxTips",
                  url: "https://www.youtube.com/watch?v=-bEVlQv_O-8&list=PLf-O3X2-mxDlx6sRx2WB-xv3Q9YHJ23ZN",
                  contentType: LinkContentType.WATCH,
                }]
          }]
      },
      { label: "Threads e Concorrência", links: [] },
      { label: "Sockets", links: [] },
      { label: "Básico POSIX", links: [] },
      { label: "Conceitos de Rede", links: [] },
      { label: "initd (Gerenciamento de Inicialização)", links: [] },
      {
        label: "systemd (Gerenciamento de Serviço)",
        description: "Systemd é um sistema gerenciador de serviços para Linux.",
          children: [
            {
              label: "systemd (Gerenciamento de Serviço)",
              links: [
                {
                  label: "O que é Systemd? - LinuxTips",
                  url: "https://www.youtube.com/watch?v=1uGqXhhberk&t",
                  contentType: LinkContentType.WATCH,
                },
                {
                  label: "O que é Systemd? - Diolinux",
                  url: "https://www.youtube.com/watch?v=7mXCxj4SWqU",
                  contentType: LinkContentType.WATCH,
                }]
          }]
      },
      { label: "I/O", links: [] },
      { label: "Virtualização", links: [] },
      { label: "Memória/Storage", links: [] },
      { label: "Sistemas de Arquivos", links: [] },
    ],
  },
  {
    label: "Aprenda a gerenciar servidores",
    description:
      "Aprenda conceitos de administração em algum Sistema Operacional.",
    items: [
      {
        label: "Linux",
        children: [
          {
            label: "Arch",
            links: [
              {
                label: "Documentação Oficial",
                url: "https://wiki.archlinux.org/title/Main_page_(Portugu%C3%AAs)",
                contentType: LinkContentType.READ,
              },
            ],
          },
          { label: "Debian", links: [] },
          { label: "Fedora", links: [] },
          {
            label: "Ubuntu",
            links: [
              {
                label: "Documentação Oficial",
                url: "https://help.ubuntu.com/community/PortugueseDocumentation",
                contentType: LinkContentType.READ,
              }
            ]
          },
          { label: "CentOS", links: [] },
          { label: "RHEL", links: [] },
        ],
      },
      {
        label: "Unix",
        children: [
          { label: "FreeBSD", links: [] },
          { label: "OpenBSD", links: [] },
          { label: "NetBSD", links: [] },
        ],
      },
      { label: "Windows", children: [{ label: "O básico", links: [] }] },
    ],
  },
  {
    items: [
      {
        label: "Usando o Terminal",
        children: [
          {
            label: "Bash Script",
            links: [
                {
                  label: "Curso Shell GNU - debxp (Blau Araujo)",
                  url: "https://www.youtube.com/watch?v=Daasn9IjwMQ&list=PLXoSGejyuQGqJEEyo2fY3SA-QCKlF2rxO",
                  contentType: LinkContentType.WATCH,
                },
                {
                  label: "Além do Bash - debxp (Blau Araujo)",
                  url: "https://www.youtube.com/watch?v=_W51nj5JTwk&list=PLXoSGejyuQGpen1lAlhngkpuldmot8DV0",
                  contentType: LinkContentType.WATCH,
                },
                {
                  label: "Curso Básico de Programação em Bash - debxp (Blau Araujo)",
                  url: "https://www.youtube.com/watch?v=spIRwXEF3XY&list=PLf-O3X2-mxDlfAv8IOfic1sHArdwrrkgh&index",
                  contentType: LinkContentType.WATCH,
                },
                {
                  label: "Shell Scripting - Boson Treinamentos",
                  url: "https://www.youtube.com/watch?v=EOLPUc6oo-w&list=PLucm8g_ezqNrYgjXC8_CgbvHbvI7dDfhs",
                  contentType: LinkContentType.WATCH,
                }
              ]
          },
          { label: "Ferramentas de Texto", links: [] },
          { label: "Editores de Texto", links: [] },
          { label: "Compilação", links: [] },
          { label: "System Performance", links: [] },
          { label: "Monitoramento de Processos", links: [] },
          { label: "Rede", links: [] },
          { label: "Outros", links: [] },
        ],
      },
    ],
  },
  {
    items: [
      {
        label: "Rede, Segurança e Protocolos",
        children: [
          { label: "HTTP", links: [] },
          { label: "HTTPS", links: [] },
          { label: "FTP", links: [] },
          { label: "SSL/TLS", links: [] },
          { label: "SSH", links: [] },
          { label: "Port Forwarding", links: [] },
          { label: "SMTP", links: [] },
          { label: "IMAPS", links: [] },
          { label: "POP3", links: [] },
        ],
      },
    ],
  },
  {
    label: "O que é, e como configurar:",
    items: [
      { label: "Proxy Reverso", children: [{ label: "O Básico", links: [] }] },
      { label: "Caching Server", children: [{ label: "O Básico", links: [] }] },
      { label: "Forward Proxy", children: [{ label: "O Básico", links: [] }] },
      { label: "Load Balancer", children: [{ label: "O Básico", links: [] }] },
      { label: "Firewall", children: [{ label: "O Básico", links: [] }] },
      {
        label: "Web Server",
        children: [
          { label: "Nginx", links: [] },
          { label: "Apache", links: [] },
          { label: "IIS", links: [] },
          { label: "Tomcat", links: [] },
          { label: "Caddy", links: [] },
        ],
      },
    ],
  },
  {
    label: "Infraestrutura como Código",
    items: [
      {
        label: "Containers",
        children: [
          { label: "Docker",
            links: [
              {
                label: "Descomplicando Docker - LinuxTips",
                url: "https://www.youtube.com/watch?v=qZevFPMtQho&list=PLf-O3X2-mxDn1VpyU2q3fuI6YYeIWp5rR",
                contentType: LinkContentType.WATCH,
              }]
          },
          { label: "LXC", links: [] },
        ],
      },
      {
        label: "Gerenciamento de Configuração",
        children: [
          {
            label: "Ansible",
            links: [
              {
                label: "Curso Ansible -  Mário Santana",
                url: "https://www.youtube.com/watch?v=Os0Uo5VXxNU&list=PLORF-y_edVoDQnky9u2OgyrfirE1dhutX",
                contentType: LinkContentType.WATCH,
              }]
          },
          { label: "Chef", links: [] },
          { label: "Salt", links: [] },
          { label: "Puppet", links: [] },
        ],
      },
      {
        label: "Orquestração de Containers",
        children: [
          { label: "Kubernetes", links: [] },
          { label: "Mesos", links: [] },
          { label: "Docker Swarm", links: [] },
          { label: "Nomad", links: [] },
        ],
      },
      {
        label: "Provisionamento de Infraestrutura",
        children: [
          { label: "Terraform",
            links: [
            {
              label: "Curso de Terraform com AWS  - Cleber Gasparoto",
              url: "https://www.youtube.com/watch?v=bIPF_hzmQGE&list=PLWQmZVQayUUIgSmOj3GPH2BJcn0hOzIaP",
              contentType: LinkContentType.WATCH,
            }]
          },
          { label: "CloudFormation", links: [] },
          { label: "Pulumi", links: [] },
        ],
      },
    ],
  },
  {
    label: "Escolha alguma ferramenta de CI/CD",
    items: [
      { label: "Gitlab CI", children: [{ label: "O básico", links: [] }] },
      { label: "Github Actions", children: [{ label: "O básico", links: [] }] },
      { label: "Jenkins", children: [{ label: "O básico", links: [] }] },
      { label: "Circle CI", children: [{ label: "O básico", links: [] }] },
      { label: "Travis CI", children: [{ label: "O básico", links: [] }] },
      { label: "Bamboo", children: [{ label: "O básico", links: [] }] },
      { label: "Azure DevOps", children: [{ label: "O básico", links: [] }] },
      { label: "TeamCity", children: [{ label: "O básico", links: [] }] },
    ],
  },
  {
    items: [
      {
        label: "Monitoramento de Infraestrutura",
        children: [
          { label: "Prometheus", links: [] },
          { label: "Nagios", links: [] },
          { label: "Grafana", links: [] },
          { label: "Zabbix",
            links: [
            {
              label: "Treinamento base Zabbix 5.0  - Magno Monte Cerqueira",
              url: "https://www.youtube.com/watch?v=vf5LidtostQ&list=PLCFBm2AvdHoCObUAfon9WL9E1q3C5-UKB",
              contentType: LinkContentType.WATCH,
            }]
          },
          { label: "Monit", links: [] },
          { label: "Datadog", links: [] },
        ],
      },
      {
        label: "Monitoramento de Aplicação",
        children: [
          { label: "Jaeger", links: [] },
          { label: "New Relic", links: [] },
          { label: "AppDynamics", links: [] },
          { label: "Instana", links: [] },
          { label: "OpenTracing", links: [] },
        ],
      },
      {
        label: "Gerenciamento de Logs",
        children: [
          { label: "Elastic Stack", links: [] },
          { label: "Graylog", links: [] },
          { label: "Splunk", links: [] },
          { label: "Papertrail", links: [] },
        ],
      },
    ],
  },
  {
    label: "Escolha um provedor de Nuvem",
    items: [
      {
        label: "AWS",
        children: [
          {
            label: "Certificação",
            links: [{
              label: "#BondeDaAWS - Treinamento preparatório para a certificação da AWS - LinuxTips",
              url: "https://www.youtube.com/watch?v=VrQVDbgwFDs&t",
              contentType: LinkContentType.WATCH,
            }]
          }
        ]
      },
      { label: "Google Cloud", children: [{ label: "O básico", links: [] }] },
      { label: "Azure", children: [{ label: "O básico", links: [] }] },
      { label: "Heroku", children: [{ label: "O básico", links: [] }] },
      { label: "Digital Ocean", children: [{ label: "O básico", links: [] }] },
      { label: "Linode", children: [{ label: "O básico", links: [] }] },
      { label: "Vultr", children: [{ label: "O básico", links: [] }] },
    ],
  },
  {
    items: [
      {
        label: "Design Patterns para Nuvem",
        children: [
          { label: "Disponibilidade", links: [] },
          { label: "Gerenciamento de Dados", links: [] },
          { label: "Design e Implementação", links: [] },
          { label: "Gerenciamento e Monitoramento", links: [] },
        ],
      },
    ],
  },
];
