import { GuideContent } from '../types';

const select = 'SELECT c.nome, p.id AS pedido, p.total\nFROM clientes c';
const order = '\nORDER BY c.nome, p.id;';

export const content: GuideContent = {
  sections: [
    {
      id: 'dados',
      title: 'Os dados do exemplo',
      blocks: [
        {
          type: 'text',
          text: 'Um `JOIN` combina linhas de duas tabelas a partir de uma condição, quase sempre uma chave estrangeira. Todos os exemplos usam estas duas tabelas. Repare na Carla, que não tem pedidos, e no pedido 13, feito sem cadastro.',
        },
        {
          type: 'table',
          caption: 'Tabela clientes',
          head: ['id', 'nome'],
          rows: [
            ['1', 'Ana'],
            ['2', 'Bruno'],
            ['3', 'Carla'],
          ],
        },
        {
          type: 'table',
          caption: 'Tabela pedidos',
          head: ['id', 'cliente_id', 'total'],
          rows: [
            ['10', '1', '120'],
            ['11', '1', '80'],
            ['12', '2', '45'],
            ['13', 'NULL', '60'],
          ],
        },
      ],
    },
    {
      id: 'tipos',
      title: 'Os quatro tipos',
      blocks: [
        {
          type: 'joins',
          tables: ['clientes', 'pedidos'],
          items: [
            {
              kind: 'inner',
              title: 'INNER JOIN',
              text: 'Só as linhas que **têm par nas duas tabelas**. Carla e o pedido 13 ficam de fora.',
              sql: `${select}\nINNER JOIN pedidos p ON p.cliente_id = c.id${order}`,
              result:
                'nome  | pedido | total\nAna   |     10 |   120\nAna   |     11 |    80\nBruno |     12 |    45',
            },
            {
              kind: 'left',
              title: 'LEFT JOIN',
              text: '**Todas as linhas da esquerda**, com par ou não. Sem par, as colunas da direita vêm `NULL`.',
              sql: `${select}\nLEFT JOIN pedidos p ON p.cliente_id = c.id${order}`,
              result:
                'nome  | pedido | total\nAna   |     10 |   120\nAna   |     11 |    80\nBruno |     12 |    45\nCarla |   NULL |  NULL',
            },
            {
              kind: 'right',
              title: 'RIGHT JOIN',
              text: 'O espelho do LEFT: **todas as linhas da direita**. Na prática, quase sempre se inverte a ordem e usa LEFT.',
              sql: `${select}\nRIGHT JOIN pedidos p ON p.cliente_id = c.id${order}`,
              result:
                'nome  | pedido | total\nAna   |     10 |   120\nAna   |     11 |    80\nBruno |     12 |    45\nNULL  |     13 |    60',
            },
            {
              kind: 'full',
              title: 'FULL OUTER JOIN',
              text: '**Tudo das duas tabelas**, juntando quando há par. O MySQL não tem FULL JOIN: use LEFT e RIGHT com `UNION`.',
              sql: `${select}\nFULL OUTER JOIN pedidos p ON p.cliente_id = c.id${order}`,
              result:
                'nome  | pedido | total\nAna   |     10 |   120\nAna   |     11 |    80\nBruno |     12 |    45\nCarla |   NULL |  NULL\nNULL  |     13 |    60',
            },
          ],
        },
      ],
    },
    {
      id: 'armadilhas',
      title: 'Duas armadilhas comuns',
      blocks: [
        {
          type: 'cards',
          items: [
            {
              label: 'Armadilha 1',
              title: 'Um filtro no WHERE transforma LEFT em INNER',
              text: 'Com `LEFT JOIN pedidos p ... WHERE p.total > 50`, só a Ana sobra. A Carla some porque `NULL > 50` não é verdadeiro, e o Bruno porque 45 não passa no filtro. Para manter todos os clientes, com `NULL` onde não houver pedido acima de 50, coloque a condição no `ON`.',
              code: 'LEFT JOIN pedidos p\n  ON p.cliente_id = c.id\n AND p.total > 50',
            },
            {
              label: 'Armadilha 2',
              title: 'Dupla contagem',
              text: 'Juntar duas tabelas "um para muitos" ao mesmo tempo multiplica as linhas. Se a Ana tiver dois endereços, `SUM(p.total)` com `JOIN enderecos` devolve 400 em vez de 200.',
            },
          ],
        },
        {
          type: 'code',
          language: 'sql',
          caption: 'Agregue antes de juntar',
          code: 'WITH totais AS (\n  SELECT cliente_id, SUM(total) AS gasto\n  FROM pedidos\n  GROUP BY cliente_id\n)\nSELECT c.nome, COALESCE(t.gasto, 0) AS gasto\nFROM clientes c\nLEFT JOIN totais t ON t.cliente_id = c.id\nORDER BY c.nome;',
          output: 'nome  | gasto\nAna   |   200\nBruno |    45\nCarla |     0',
        },
        {
          type: 'callout',
          tone: 'tip',
          text: 'Antes de confiar em um JOIN, compare `COUNT(*)` antes e depois. Se o número de linhas cresceu sem você esperar, há uma relação um para muitos no caminho.',
        },
      ],
    },
  ],
  sources: [
    {
      title: 'PostgreSQL: joins entre tabelas (tutorial)',
      url: 'https://www.postgresql.org/docs/current/tutorial-join.html',
    },
    {
      title: 'PostgreSQL: tabelas combinadas na cláusula FROM',
      url: 'https://www.postgresql.org/docs/current/queries-table-expressions.html',
    },
    {
      title: 'SQLBolt: exercícios interativos de JOIN',
      url: 'https://sqlbolt.com/lesson/select_queries_with_joins',
    },
  ],
};
