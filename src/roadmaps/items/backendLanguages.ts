import { Level, LinkContentType, LinkType } from '../../entity/RoadmapModel';
import { go } from './go';
import { python } from './python';
import { ruby } from './ruby';
import { rust } from './rust';

export const backendLanguages: Level = {
  label: 'Escolha uma linguagem para o Backend',
  description:
    'Tente aprender a fundo coisas como concorrência, uso de memória e especificidades da que escolher.',
  items: [
    {
      label: 'Javascript',
      description:
        'JavaScript permite adicionar interatividade às suas páginas. Exemplos comuns que você pode ter visto nos sites são controles deslizantes, interações de clique, pop-ups e assim por diante. Além de ser usado no front-end em navegadores, existe o Node.js, que é um ambiente de tempo de execução JavaScript back-end de código aberto, multiplataforma e executado no mecanismo V8 e executa código JavaScript fora de um navegador da web.',
      children: [
        {
          label: 'O básico',
          links: [
            {
              label: 'Curso Grátis de JavaScript e ECMAScript para Iniciantes - Curso em Vídeo',
              url: 'https://www.youtube.com/playlist?list=PLHz_AreHm4dlsK3Nr9GVvXCbpQyHQl1o1',
              contentType: LinkContentType.WATCH,
            },
          ],
        },
      ],
    },
    python,
    {
      label: 'Java',
      description:
        'Java é uma linguagem de uso geral, usada principalmente para aplicativos baseados na Internet. Foi criado em 1995 por James Gosling na Sun Microsystems e é uma das opções mais populares para quem desenvolve back-end.',
      children: [
        {
          label: 'Java',
          links: [
            {
              label: 'Java Básico',
              url: 'https://www.cursoemvideo.com/curso/java-basico/',
              contentType: LinkContentType.VISIT,
            },
          ],
        },
        {
          label: 'Estrutura de Dados com Java - Loiane',
          links: [
            {
              label: 'Estrutura de Dados e Algoritmos com Java #01: Introdução',
              url: 'https://www.youtube.com/watch?v=N3K8PjFOhy4',
              contentType: LinkContentType.VISIT,
            },
          ],
        },
      ],
    },
    go,
    rust,
    ruby,
    {
      label: 'PHP',
      description:
        'PHP é uma linguagem de script de servidor e uma ferramenta poderosa para criar páginas da Web dinâmicas e interativas. Ele foi originalmente criado pelo programador dinamarquês-canadense Rasmus Lerdorf em 1994. A implementação de referência do PHP é agora produzida pelo The PHP Group.',
      children: [
        {
          label: 'PHP',
          links: [
            {
              label: 'PHP Básico - Curso em Video',
              url: 'https://www.cursoemvideo.com/curso/php-basico/',
              contentType: LinkContentType.VISIT,
            },
            {
              label: 'Por que não usar XAMPP',
              url: 'https://dias.dev/2021-04-10-por-que-nao-usar-xampp/',
              contentType: LinkContentType.READ,
            },
            {
              label: 'Como o PHP funciona na Web?',
              url: 'https://dias.dev/2021-06-15-como-o-php-funciona-na-web/',
              contentType: LinkContentType.READ,
            },
            {
              label: 'Como o PHP funciona? - Conheça o OPcache | Dias de Dev',
              url: 'https://youtu.be/6vEspHqjrkI',
              contentType: LinkContentType.WATCH,
            },
            {
              label: 'PHP além da Web',
              url: 'https://dias.dev/2020-10-27-php-alem-da-web/',
              contentType: LinkContentType.READ,
            },
            {
              label: 'PHP.ini: Aprendendo a configurar o comportamento do PHP',
              url: 'https://dias.dev/2023-02-24-php-ini-conhecendo-as-configuracoes-do-php/',
              contentType: LinkContentType.READ,
            },
            {
              label: 'Extensões PHP',
              url: 'https://dias.dev/2022-02-13-extensoes-php/',
              contentType: LinkContentType.READ,
            },
            {
              label: 'Wrapper de Streams php://',
              url: 'https://dias.dev/2020-11-03-wraper-de-streams-php/',
              contentType: LinkContentType.READ,
            },
            {
              label:
                'Entenda o erro "Cannot modify header information - headers already sent" no PHP',
              url: 'https://dias.dev/2023-03-07-entenda-o-erro-cannot-modify-header-information-php/',
              contentType: LinkContentType.READ,
            },
          ],
        },
        {
          label: 'Novidades do PHP',
          links: [
            {
              label: 'Novidades do PHP 8.0 | Dias de Dev',
              url: 'https://www.youtube.com/playlist?list=PL3j2sfzg3FPuQXklYI2LumuG7jgZsj7cK',
              contentType: LinkContentType.WATCH,
            },
            {
              label: 'Novidades do PHP 8.1 | Dias de Dev',
              url: 'https://www.youtube.com/playlist?list=PL3j2sfzg3FPufNI3E8nPq-F-eR-kLheq6',
              contentType: LinkContentType.WATCH,
            },
            {
              label: 'Novidades do PHP 8.2 | Dias de Dev',
              url: 'https://www.youtube.com/playlist?list=PL3j2sfzg3FPtMTSCB5wcsZSMYNW8tEZ_B',
              contentType: LinkContentType.WATCH,
            },
          ],
        },
      ],
    },
    {
      label: 'C#',
      description:
        "C# (pronuncia-se 'C sharp') é uma linguagem de programação de uso geral feita pela Microsoft. Ele é usado para executar diferentes tarefas e pode ser usado para criar aplicativos da web, jogos, aplicativos móveis, etc.",
      children: [
        {
          label: 'C# Básico',
          links: [
            {
              label: 'Download .NET',
              url: 'https://dotnet.microsoft.com/en-us/download',
              type: LinkType.FREE,
              votes: 0,
              contentType: LinkContentType.WATCH,
            },
            {
              label: 'Criando um projeto usando CLI',
              url: 'https://www.youtube.com/watch?v=fvPGTLtP9wg',
              type: LinkType.FREE,
              votes: 0,
              contentType: LinkContentType.WATCH,
            },
            {
              label: 'Como baixar e instalar o Visual Studio 2022',
              url: 'https://www.youtube.com/watch?v=_HgVooVuGOE',
              type: LinkType.FREE,
              votes: 0,
              contentType: LinkContentType.WATCH,
            },
            {
              label: 'Lógica de Programação e Algoritmos com C#',
              url: 'https://www.youtube.com/watch?v=8KOnXlz_-9w&list=PLTyvdsF_vFzLvyKcXNqe785Pk9EVObRgR&index=1',
              type: LinkType.FREE,
              votes: 0,
              contentType: LinkContentType.WATCH,
            },
            {
              label: 'Criando uma aplicação ASP.NET do Zero (Visual Studio)',
              url: 'https://www.youtube.com/watch?v=-v0sfER0po8',
              type: LinkType.FREE,
              votes: 0,
              contentType: LinkContentType.WATCH,
            },
            {
              label: 'Extension Methods no C# | por André Baltieri #balta',
              url: 'https://www.youtube.com/watch?v=xQhiv-bmt9o&list=PLHlHvK2lnJnc4l_Iag26RMpUtV2Yl_X_j&index=6',
              type: LinkType.FREE,
              votes: 0,
              contentType: LinkContentType.WATCH,
            },
            {
              label: 'Playlist Fundamentos do C# | por Milton Sampaio',
              url: 'https://www.youtube.com/playlist?list=PLAwbaTeLc4u0K45DxQjS6ZShLaUSM3BG-',
              type: LinkType.FREE,
              votes: 0,
              contentType: LinkContentType.WATCH,
            },
          ],
        },
        {
          label: 'C# Intermediário',
          links: [
            {
              label: 'Orientação a Objetos com C#',
              url: 'https://www.youtube.com/watch?v=wI6zLJJhnNw&list=PLWXw8Gu52TRKlAqSfkdhSTPtAfAcYko5E',
              type: LinkType.FREE,
              votes: 0,
              contentType: LinkContentType.WATCH,
            },
            {
              label: 'CRUD camada DAL - C# Asp.Net com Bootstrap',
              url: 'https://www.youtube.com/watch?v=s5_83He6HmI&list=PLb2HQ45KP0WuY6bCj-kCSa2LvvnaThRQ_&index=1',
              type: LinkType.FREE,
              votes: 0,
              contentType: LinkContentType.WATCH,
            },
            {
              label: 'Introdução a consultas LINQ e expressões Lambda no C#',
              url: 'https://www.youtube.com/watch?v=-yxrPTlvpz4',
              type: LinkType.FREE,
              votes: 0,
              contentType: LinkContentType.WATCH,
            },
          ],
        },
        {
          label: 'C# Frameworks',
          links: [
            {
              label: 'Criando projeto Windows Forms com Entityframework ORM',
              url: 'https://www.youtube.com/watch?v=Zy_tFVgvkOM',
              type: LinkType.FREE,
              votes: 0,
              contentType: LinkContentType.WATCH,
            },
            {
              label: 'Playlist ASP.NET | por Milton Sampaio',
              url: 'https://www.youtube.com/playlist?list=PLAwbaTeLc4u2u5FpfTJLXAP9JqGTY7Nuf',
              type: LinkType.FREE,
              votes: 0,
              contentType: LinkContentType.WATCH,
            },
            {
              label: 'Playlist Entity Framework | por Milton Sampaio',
              url: 'https://www.youtube.com/playlist?list=PLAwbaTeLc4u3M-3aOIBMasoDNAKMYSGnj',
              type: LinkType.FREE,
              votes: 0,
              contentType: LinkContentType.WATCH,
            },
          ],
        },
        {
          label: 'C# Avançado',
          links: [
            {
              label: 'Criando uma API usando ASP.NET Core 5, EF Core 5 e MySql',
              url: 'https://www.youtube.com/watch?v=L1bJUKZV0b0',
              type: LinkType.FREE,
              votes: 0,
              contentType: LinkContentType.WATCH,
            },
            {
              label:
                'Como fazer um App com ASP.NET (Completo com login, EF e SQLite) | por André Baltieri #balta',
              url: 'https://www.youtube.com/watch?v=NFQAj5bCgd8',
              type: LinkType.FREE,
              votes: 0,
              contentType: LinkContentType.WATCH,
            },
            {
              label: 'Masterclass - Injeção de Dependência no .NET | por André Baltieri #balta',
              url: 'https://www.youtube.com/watch?v=CbAMyaBWzig',
              type: LinkType.FREE,
              votes: 0,
              contentType: LinkContentType.WATCH,
            },
          ],
        },
      ],
    },
  ],
};
