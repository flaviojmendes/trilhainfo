import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'oltp-olap',
      title: 'Dois bancos, dois objetivos',
      blocks: [
        {
          type: 'table',
          caption: 'O banco da aplicação e o banco de análise',
          head: ['', 'Transacional (OLTP)', 'Analítico (OLAP)'],
          rows: [
            ['Pergunta típica', 'Qual é o pedido 42?', 'Quanto vendemos por região em cada mês?'],
            [
              'Acesso',
              'Poucas linhas, muitas vezes por segundo',
              'Milhões de linhas, poucas colunas',
            ],
            ['Modelo', 'Normalizado, sem repetição', 'Dimensional, com alguma repetição'],
            ['Exemplos', 'PostgreSQL, MySQL', 'BigQuery, Snowflake, DuckDB, Redshift'],
          ],
        },
        {
          type: 'text',
          text: 'Rodar relatórios pesados no banco da aplicação deixa o sistema lento para todo mundo. Por isso os dados são copiados para um armazém (data warehouse) e **remodelados para leitura**.',
        },
      ],
    },
    {
      id: 'estrela',
      title: 'O modelo estrela',
      blocks: [
        {
          type: 'terms',
          items: [
            {
              term: 'Fato',
              text: 'Um evento que aconteceu e pode ser medido: uma venda, um clique, um pagamento. Tem números (valor, quantidade) e chaves para as dimensões.',
            },
            {
              term: 'Dimensão',
              text: 'O contexto do fato: quem, o quê, onde, quando. Cliente, produto, loja, data. Tem textos usados para filtrar e agrupar.',
            },
            {
              term: 'Grão',
              text: 'O que **uma linha** da tabela fato representa. Ex.: "um item de um pedido". Defina antes de qualquer coluna.',
            },
          ],
        },
        {
          type: 'code',
          language: 'sql',
          caption: 'Fato no centro, dimensões em volta',
          code: '-- grão: um item vendido em um pedido\nCREATE TABLE fato_vendas (\n  data_id      INT REFERENCES dim_data,\n  produto_id   INT REFERENCES dim_produto,\n  cliente_id   INT REFERENCES dim_cliente,\n  pedido_id    TEXT,\n  quantidade   INT,\n  valor_total  NUMERIC(12, 2)\n);\n\nCREATE TABLE dim_produto (\n  produto_id INT PRIMARY KEY,\n  nome       TEXT,\n  categoria  TEXT,\n  marca      TEXT\n);',
        },
        {
          type: 'code',
          language: 'sql',
          caption: 'A pergunta de negócio vira uma consulta simples',
          code: 'SELECT d.ano_mes, p.categoria, SUM(f.valor_total) AS receita\nFROM fato_vendas f\nJOIN dim_data d    ON d.data_id = f.data_id\nJOIN dim_produto p ON p.produto_id = f.produto_id\nGROUP BY d.ano_mes, p.categoria\nORDER BY d.ano_mes;',
        },
      ],
    },
    {
      id: 'historico',
      title: 'Quando a dimensão muda',
      blocks: [
        {
          type: 'text',
          text: 'Uma cliente se muda de São Paulo para Recife. As vendas antigas devem contar para qual cidade? A resposta define o tipo de **dimensão de mudança lenta** (SCD).',
        },
        {
          type: 'table',
          caption: 'As duas estratégias mais usadas',
          head: ['Tipo', 'Como funciona', 'Resultado'],
          rows: [
            ['SCD 1', 'Sobrescreve o valor', 'Todas as vendas passam a contar para Recife'],
            [
              'SCD 2',
              'Fecha a linha antiga e cria uma nova, com `valido_de` e `valido_ate`',
              'Vendas antigas ficam em São Paulo, novas em Recife',
            ],
          ],
        },
      ],
    },
    {
      id: 'formatos',
      title: 'Formatos de arquivo',
      blocks: [
        {
          type: 'table',
          caption: 'Onde cada formato brilha',
          head: ['Formato', 'Organização', 'Bom para'],
          rows: [
            ['CSV', 'Linhas de texto', 'Trocar dados com pessoas e planilhas. Sem tipos.'],
            [
              'JSON',
              'Documentos de texto',
              'APIs e dados aninhados. Grande e lento para analisar.',
            ],
            ['Parquet', 'Colunas, comprimido, com tipos', 'Análise: lê só as colunas da consulta.'],
            [
              'Avro',
              'Linhas binárias, com esquema',
              'Eventos e streaming, com evolução de esquema.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Por que colunar é mais rápido',
          text: 'Para somar `valor_total` de 100 milhões de linhas, o Parquet lê só essa coluna, já comprimida. Um CSV obriga a ler todas as colunas de todas as linhas.',
        },
        {
          type: 'checklist',
          id: 'modelagem',
          items: [
            'O grão de cada tabela fato está escrito em uma frase.',
            'Fatos guardam números e chaves; textos ficam nas dimensões.',
            'Existe uma dimensão de data com ano, mês, dia da semana e feriados.',
            'Decidi, para cada dimensão, se o histórico importa (SCD 1 ou 2).',
            'Dados de análise estão em formato colunar, como Parquet.',
          ],
        },
      ],
    },
  ],
  sources: [
    {
      title: 'Kimball Group: técnicas de modelagem dimensional',
      url: 'https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/',
    },
    {
      title: 'dbt: modelagem dimensional',
      url: 'https://docs.getdbt.com/blog/kimball-dimensional-model',
    },
    { title: 'Apache Parquet', url: 'https://parquet.apache.org/docs/' },
  ],
};
