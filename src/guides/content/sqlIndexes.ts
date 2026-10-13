import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'indice',
      title: 'O que é um índice',
      blocks: [
        {
          type: 'text',
          text: 'Sem índice, o banco lê **todas as linhas** da tabela para achar as que você pediu. Um índice é uma estrutura ordenada, normalmente uma árvore B, que leva direto às linhas certas, como o índice remissivo de um livro. A busca passa de O(n) para O(log n).',
        },
        {
          type: 'code',
          language: 'sql',
          caption: 'Criando um índice para a busca mais comum',
          code: '-- A consulta da tela "meus pedidos"\nSELECT id, total, criado_em\nFROM pedidos\nWHERE cliente_id = 42\nORDER BY criado_em DESC\nLIMIT 20;\n\n-- Um índice que atende ao filtro e à ordenação\nCREATE INDEX pedidos_cliente_criado_idx\n  ON pedidos (cliente_id, criado_em DESC);',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Índice tem custo',
          text: 'Cada `INSERT`, `UPDATE` e `DELETE` também atualiza os índices, e eles ocupam espaço. Crie índices para as consultas que você realmente faz, não para todas as colunas.',
        },
      ],
    },
    {
      id: 'explain',
      title: 'Leia o plano com EXPLAIN',
      blocks: [
        {
          type: 'code',
          language: 'sql',
          caption: 'PostgreSQL: executa a consulta e mostra o caminho escolhido',
          code: 'EXPLAIN ANALYZE\nSELECT * FROM pedidos WHERE cliente_id = 42;',
          output:
            'Index Scan using pedidos_cliente_criado_idx on pedidos\n  (actual time=0.031..0.054 rows=18 loops=1)\nExecution Time: 0.081 ms',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Seq Scan',
              text: 'Leu a tabela inteira. Normal em tabelas pequenas; em tabelas grandes, sinal de que falta índice.',
            },
            {
              term: 'Index Scan',
              text: 'Usou o índice para achar as linhas e depois buscou cada uma na tabela.',
            },
            {
              term: 'Index Only Scan',
              text: 'Tudo que a consulta pede está no índice. Nem precisou abrir a tabela.',
            },
            {
              term: 'rows',
              text: 'Compare o estimado com o real. Uma diferença grande indica estatísticas desatualizadas: rode `ANALYZE`.',
            },
          ],
        },
      ],
    },
    {
      id: 'regras',
      title: 'Quando o índice não é usado',
      blocks: [
        {
          type: 'table',
          caption: 'Armadilhas frequentes',
          head: ['Consulta', 'Problema', 'Alternativa'],
          rows: [
            [
              '`WHERE lower(email) = …`',
              'Função na coluna esconde o valor indexado',
              'Índice na expressão: `ON users (lower(email))`',
            ],
            [
              "`WHERE nome LIKE '%silva'`",
              'Curinga no começo impede a busca ordenada',
              'Busca textual ou índice trigram (`pg_trgm`)',
            ],
            [
              '`WHERE criado_em > …` com índice `(cliente_id, criado_em)`',
              'Índice composto só serve a partir da primeira coluna',
              'Filtre por `cliente_id` também, ou crie outro índice',
            ],
            [
              "`WHERE status = 'ativo'` em 95% das linhas",
              'Ler a tabela é mais barato que pular pelo índice',
              "Índice parcial para o caso raro: `WHERE status = 'cancelado'`",
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Chaves estrangeiras',
          text: 'O PostgreSQL indexa a chave primária automaticamente, mas **não** a coluna que aponta para outra tabela. JOINs e exclusões em cascata por `cliente_id` ficam lentos sem um índice nela.',
        },
      ],
    },
    {
      id: 'transacoes',
      title: 'Transações: tudo ou nada',
      blocks: [
        {
          type: 'text',
          text: 'Uma transação agrupa comandos que precisam acontecer juntos. Se algo falha no meio, o `ROLLBACK` desfaz tudo e o banco nunca fica num estado pela metade.',
        },
        {
          type: 'code',
          language: 'sql',
          caption: 'Transferência: debitar e creditar, ou nenhum dos dois',
          code: 'BEGIN;\n\nUPDATE contas SET saldo = saldo - 100\nWHERE id = 1 AND saldo >= 100;\n\nUPDATE contas SET saldo = saldo + 100\nWHERE id = 2;\n\nCOMMIT; -- ou ROLLBACK se algo deu errado',
        },
        {
          type: 'terms',
          items: [
            { term: 'Atomicidade', text: 'Todos os comandos acontecem, ou nenhum.' },
            {
              term: 'Consistência',
              text: 'Restrições como `NOT NULL`, `UNIQUE` e chaves estrangeiras valem no final.',
            },
            {
              term: 'Isolamento',
              text: 'Transações simultâneas não veem o trabalho incompleto umas das outras.',
            },
            {
              term: 'Durabilidade',
              text: 'Depois do `COMMIT`, sobrevive a uma queda do servidor.',
            },
          ],
        },
        {
          type: 'checklist',
          id: 'banco',
          items: [
            'As consultas mais frequentes passaram por `EXPLAIN ANALYZE`.',
            'Colunas de chave estrangeira usadas em JOINs têm índice.',
            'Não há índices duplicados ou que nenhuma consulta usa.',
            'Operações que mudam várias tabelas estão em uma transação.',
            'Migrações que criam índices em tabelas grandes usam `CREATE INDEX CONCURRENTLY`.',
          ],
        },
      ],
    },
  ],
  sources: [
    {
      title: 'PostgreSQL: índices',
      url: 'https://www.postgresql.org/docs/current/indexes.html',
    },
    {
      title: 'PostgreSQL: usando EXPLAIN',
      url: 'https://www.postgresql.org/docs/current/using-explain.html',
    },
    { title: 'Use The Index, Luke', url: 'https://use-the-index-luke.com/' },
    {
      title: 'PostgreSQL: transações',
      url: 'https://www.postgresql.org/docs/current/tutorial-transactions.html',
    },
  ],
};
