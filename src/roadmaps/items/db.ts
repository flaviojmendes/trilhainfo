import { Level, LinkContentType } from '../../entity/RoadmapModel';

export const db: Level = {
  label: 'Bancos de Dados',
  items: [
    {
      label: 'Relacionais',
      description:
        'Um banco de dados relacional é um tipo de banco de dados que armazena e fornece acesso a pontos de dados relacionados entre si. Os bancos de dados relacionais armazenam dados em uma série de tabelas. As interconexões entre as tabelas são especificadas como chaves estrangeiras. Uma chave estrangeira é uma referência exclusiva de uma linha em uma tabela relacional para outra linha em uma tabela, que pode ser a mesma tabela, mas geralmente é uma tabela diferente.',
      children: [
        {
          label: 'PostgreSQL',
          links: [
            {
              label: 'PostgreSQL - Boson Treinamentos',
              url: 'https://www.youtube.com/watch?v=Z_SPrzlT4Fc&list=PLucm8g_ezqNoAkYKXN_zWupyH6hQCAwxY',
              contentType: LinkContentType.WATCH,
            },
          ],
        },
        {
          label: 'MySQL',
          links: [
            {
              label: 'Mysql - Curso em Video',
              url: 'https://www.cursoemvideo.com/curso/mysql/',
              contentType: LinkContentType.VISIT,
            },
          ],
        },
        { label: 'MariaDB', links: [] },
        {
          label: 'MS SQL',
          links: [
            {
              label: 'MS SQL 2014 - Curso de SQL com SQL Server (T-SQL) - Bóson Treinamentos',
              url: 'https://www.youtube.com/playlist?list=PLucm8g_ezqNqI5cW3alteV5olcMCcHYRK',
              contentType: LinkContentType.VISIT,
            },
          ],
        },
        { label: 'Oracle', links: [] },
      ],
    },
    {
      label: 'NoSQL',
      description:
        "Os bancos de dados NoSQL oferecem armazenamento e recuperação de dados modelados de forma diferente dos bancos de dados relacionais 'tradicionais'. Os bancos de dados NoSQL normalmente se concentram mais em dimensionamento horizontal, consistência eventual, velocidade e flexibilidade e são usados comumente para aplicativos de big data e streaming em tempo real. O NoSQL é frequentemente descrito como um sistema BASE (basicamente disponível, estado suave, consistência eventual) em oposição ao SQL/relacional que normalmente se concentra em ACID (atomicidade, consistência, isolamento, durabilidade). Estruturas de dados NoSQL comuns incluem par chave-valor, coluna larga, gráfico e documento.",
      children: [
        {
          label: 'MongoDB',
          links: [
            {
              label: 'MongoDB para iniciantes - Nataniel Paiva',
              url: 'https://www.youtube.com/watch?v=u3sVM3viDtQ&list=PLxuFqIk29JL0DMM0Z-S9_XEHAexXvhYyb',
              contentType: LinkContentType.WATCH,
            },
            {
              label: 'Introdução ao NoSQL: MongoDB - Ricardo Leme',
              url: 'https://www.youtube.com/watch?v=kedLyo95fGU&list=PLyqlZW5s3wkoMhARQKp3s4YtaeKucb0Xj',
              contentType: LinkContentType.WATCH,
            },
          ],
        },
        {
          label: 'Cassandra',
          links: [
            {
              label: 'Apache Cassandra - Tutorial 1 - Introduction to Apache Cassandra',
              url: 'https://www.youtube.com/watch?v=s1xc1HVsRk0&list=PLalrWAGybpB-L1PGA-NfFu2uiWHEsdscD',
              contentType: LinkContentType.WATCH,
            },
          ],
        },
        { label: 'InfluxDB', links: [] },
        {
          label: 'Firebase',
          links: [
            {
              label: 'Introdução ao Firebase - Aula 1 - Introdução',
              url: 'https://www.youtube.com/watch?v=uP_v6RhnP5U&list=PLHlHvK2lnJnccBL9grcoRxv8CsLa9Q_4q',
              contentType: LinkContentType.WATCH,
            },
          ],
        },
      ],
    },
  ],
};
