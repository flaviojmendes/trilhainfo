import { LessonContent } from '../types';

const delivery = `CREATE TABLE clientes (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  cidade TEXT NOT NULL,
  cadastro TEXT NOT NULL
);
CREATE TABLE pedidos (
  id INTEGER PRIMARY KEY,
  cliente_id INTEGER NOT NULL REFERENCES clientes(id),
  data TEXT NOT NULL,
  frete REAL NOT NULL,
  status TEXT NOT NULL
);
CREATE TABLE itens (
  pedido_id INTEGER NOT NULL REFERENCES pedidos(id),
  produto TEXT NOT NULL,
  quantidade INTEGER NOT NULL,
  preco REAL NOT NULL
);
INSERT INTO clientes VALUES
  (1, 'Ana', 'Recife', '2026-08-03'),
  (2, 'Bruno', 'Recife', '2026-08-20'),
  (3, 'Carla', 'Salvador', '2026-09-02'),
  (4, 'Diego', 'Salvador', '2026-09-15'),
  (5, 'Elisa', 'Belém', '2026-09-28');
INSERT INTO pedidos VALUES
  (1, 1, '2026-08-05', 5.0, 'entregue'),
  (2, 2, '2026-08-21', 7.0, 'entregue'),
  (3, 1, '2026-09-03', 5.0, 'entregue'),
  (4, 3, '2026-09-04', 6.0, 'entregue'),
  (5, 4, '2026-09-16', 0.0, 'cancelado'),
  (6, 2, '2026-09-20', 7.0, 'entregue'),
  (7, 5, '2026-10-01', 8.0, 'entregue'),
  (8, 3, '2026-10-02', 6.0, 'entregue'),
  (9, 1, '2026-10-05', 5.0, 'entregue'),
  (10, 4, '2026-10-06', 4.0, 'entregue');
INSERT INTO itens VALUES
  (1, 'Açaí', 1, 20.0), (1, 'Tapioca', 2, 8.0),
  (2, 'Pizza', 1, 45.0),
  (3, 'Açaí', 2, 20.0),
  (4, 'Acarajé', 3, 10.0), (4, 'Suco', 1, 7.0),
  (5, 'Pizza', 1, 45.0),
  (6, 'Pizza', 1, 45.0), (6, 'Suco', 2, 7.0),
  (7, 'Açaí', 1, 20.0), (7, 'Tapioca', 1, 8.0), (7, 'Suco', 1, 7.0),
  (8, 'Acarajé', 2, 10.0),
  (9, 'Tapioca', 3, 8.0),
  (10, 'Pizza', 1, 45.0), (10, 'Suco', 1, 7.0);`;

const totaisCte = `WITH totais AS (
  SELECT p.id AS pedido_id, p.cliente_id, p.data, SUM(i.quantidade * i.preco) AS total
  FROM pedidos p
  JOIN itens i ON i.pedido_id = p.id
  WHERE p.status = 'entregue'
  GROUP BY p.id, p.cliente_id, p.data
)`;

const mensalCte = `WITH mensal AS (
  SELECT strftime('%Y-%m', p.data) AS mes, SUM(i.quantidade * i.preco) AS faturamento
  FROM pedidos p
  JOIN itens i ON i.pedido_id = p.id
  WHERE p.status = 'entregue'
  GROUP BY mes
)`;

const acha = `if (!result) return false;
const col = (n) => result.columns.map((c) => c.toLowerCase()).indexOf(n);
const linha = (n, v) => result.rows.find((r) => String(r[col(n)]) === v);
const perto = (a, b) => a !== null && a !== undefined && Math.abs(Number(a) - b) < 0.01;`;

export const content: LessonContent = {
  hook: 'Saber `SELECT`, `WHERE` e `GROUP BY` já responde muita coisa. Mas as perguntas que chegam no trabalho são de outro tipo: qual cliente mais gastou em cada cidade, quanto o faturamento cresceu de um mês para o outro, quantas pessoas desistiram entre o carrinho e o pagamento. Nesta aula você aprende as ferramentas que transformam SQL em análise de verdade, e o cuidado que evita o erro mais caro da área: somar a mesma coisa duas vezes.',
  sections: [
    {
      id: 'granularidade',
      title: 'Antes de somar: o que é uma linha?',
      blocks: [
        {
          type: 'analogy',
          title: 'A nota fiscal do mercado',
          text: 'Uma nota fiscal tem um cabeçalho (loja, data, valor do frete) e várias linhas de itens (arroz, feijão, café). Se você copiar o frete em cada linha de item e depois somar a coluna, vai pagar o frete três vezes. Em SQL, isso acontece toda vez que você junta tabelas com níveis de detalhe diferentes sem perceber.',
        },
        {
          type: 'text',
          text: '**Granularidade** é o que uma linha representa. Na tabela `pedidos` do banco desta aula, cada linha é **um pedido** de delivery. Na tabela `itens`, cada linha é **um produto dentro de um pedido**. Um pedido com três produtos tem uma linha em `pedidos` e três em `itens`.',
        },
        {
          type: 'text',
          text: 'Quando você faz `JOIN` de `pedidos` com `itens`, o resultado fica na granularidade mais fina: uma linha por item. As colunas de pedido, como o `frete`, se **repetem** em cada item. Somar o frete depois desse JOIN conta o mesmo frete várias vezes. Esse erro se chama **dupla contagem**.',
        },
        {
          type: 'sql',
          title: 'O frete que dobrou',
          task: 'A consulta abaixo diz que o frete total dos pedidos entregues é 91, mas o financeiro jura que é 53. Rode, entenda por que a conta inflou e corrija para devolver o valor certo.',
          setup: delivery,
          query: `SELECT SUM(p.frete) AS frete_total
FROM pedidos p
JOIN itens i ON i.pedido_id = p.id
WHERE p.status = 'entregue';`,
          solution: `SELECT SUM(frete) AS frete_total
FROM pedidos
WHERE status = 'entregue';`,
          checks: [
            {
              label: 'O frete total dos entregues é 53',
              test: `return !!result && result.rows.length === 1 && Math.abs(Number(result.rows[0][0]) - 53) < 0.01;`,
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Pergunte sempre: uma linha é o quê?',
          text: 'Antes de cada `SUM`, diga em voz alta a granularidade do resultado: “uma linha por item”, “uma linha por pedido”, “uma linha por cliente e mês”. Se a coluna que você soma pertence a um nível acima, a conta está errada. Essa frase também é o que entrevistas e revisões de código esperam ouvir.',
        },
      ],
    },
    {
      id: 'cte',
      title: 'CTEs: dar nome aos passos',
      blocks: [
        {
          type: 'text',
          text: 'Para não misturar granularidades, a saída é calcular em etapas: primeiro o total de cada pedido, depois a média desses totais. Dá para fazer isso com uma consulta dentro da outra, mas fica difícil de ler. A forma moderna é a **CTE** (Common Table Expression, ou expressão de tabela comum).',
        },
        {
          type: 'anatomy',
          caption: 'Uma CTE é um resultado temporário com nome, usado pela consulta final.',
          language: 'sql',
          parts: [
            {
              text: 'WITH totais AS (',
              label: 'WITH nome AS',
              note: '`WITH` abre a CTE e dá um nome ao resultado. Esse nome só existe durante esta consulta, como uma tabela de rascunho.',
            },
            {
              text: '\n  SELECT p.id, p.cliente_id, SUM(i.quantidade * i.preco) AS total\n  FROM pedidos p\n  JOIN itens i ON i.pedido_id = p.id\n  GROUP BY p.id, p.cliente_id\n',
              label: 'O passo 1',
              note: 'Uma consulta comum que volta a granularidade para **uma linha por pedido**: os itens são somados dentro de cada pedido.',
            },
            { text: ')\n' },
            {
              text: 'SELECT AVG(total) AS ticket_medio\nFROM totais;',
              label: 'A consulta final',
              note: 'Usa `totais` como se fosse uma tabela. Agora a média é por pedido, como a pergunta pede. Você pode encadear várias CTEs separadas por vírgula.',
            },
          ],
        },
        {
          type: 'sql',
          title: 'Ticket médio por cidade',
          task: 'A consulta calcula a média por **item**, não por pedido. Reescreva com uma CTE: primeiro o total de cada pedido entregue, depois a média desses totais por cidade, com as colunas `cidade` e `ticket_medio`.',
          setup: delivery,
          query: `-- Errado: isto é a média por ITEM, não por pedido
SELECT c.cidade, AVG(i.quantidade * i.preco) AS ticket_medio
FROM pedidos p
JOIN clientes c ON c.id = p.cliente_id
JOIN itens i ON i.pedido_id = p.id
WHERE p.status = 'entregue'
GROUP BY c.cidade;`,
          solution: `WITH totais AS (
  SELECT p.id AS pedido_id, p.cliente_id, SUM(i.quantidade * i.preco) AS total
  FROM pedidos p
  JOIN itens i ON i.pedido_id = p.id
  WHERE p.status = 'entregue'
  GROUP BY p.id, p.cliente_id
)
SELECT c.cidade, ROUND(AVG(t.total), 2) AS ticket_medio
FROM totais t
JOIN clientes c ON c.id = t.cliente_id
GROUP BY c.cidade
ORDER BY ticket_medio DESC;`,
          checks: [
            {
              label: 'Uma linha por cidade (3 cidades)',
              test: `${acha}\nreturn result.rows.length === 3 && col('cidade') >= 0;`,
            },
            {
              label: 'O ticket médio de Recife é 40,80',
              test: `${acha}\nconst r = linha('cidade', 'Recife');\nreturn !!r && perto(r[col('ticket_medio')], 40.8);`,
            },
            {
              label: 'O ticket médio de Salvador é 36,33',
              test: `${acha}\nconst r = linha('cidade', 'Salvador');\nreturn !!r && Math.abs(Number(r[col('ticket_medio')]) - 36.33) < 0.01;`,
            },
            { label: 'A consulta usa uma CTE (`WITH`)', test: `return /\\bwith\\b/i.test(query);` },
          ],
        },
        {
          type: 'reveal',
          question:
            'Na consulta errada, Recife tinha ticket médio de cerca de 29. Por que o valor ficou menor que o certo?',
          answer:
            'Porque a média foi feita sobre 7 itens, e não sobre 5 pedidos. O mesmo total, 204 reais, dividido por mais linhas dá um número menor. A soma estava certa; o que estava errado era o que contava como uma linha.',
        },
      ],
    },
    {
      id: 'case-when',
      title: 'CASE WHEN: classificar dentro da consulta',
      blocks: [
        {
          type: 'text',
          text: '`CASE WHEN` é o “se… então…” do SQL. Ele cria uma coluna nova a partir de regras, testadas de cima para baixo: a primeira condição verdadeira decide o valor. Se nenhuma bater, vale o `ELSE`, ou `NULL` se não houver `ELSE`.',
        },
        {
          type: 'fill',
          prompt: 'Complete a consulta que classifica clientes por região.',
          language: 'sql',
          template:
            "SELECT nome,\n  [[CASE|case]]\n    WHEN cidade IN ('Recife', 'Salvador') [[THEN|then]] 'Nordeste'\n    WHEN cidade = 'Belém' THEN 'Norte'\n    [[ELSE|else]] 'Outra'\n  [[END|end]] AS regiao\nFROM clientes;",
          explanation:
            'Toda expressão `CASE` termina com `END`, e o nome da coluna vem depois, com `AS`. Esquecer o `END` é o erro de sintaxe mais comum com `CASE`.',
        },
        {
          type: 'sql',
          title: 'Pedidos por faixa de valor',
          task: 'Complete o `CASE`: total abaixo de 30 é `pequeno` (já feito), de 30 até 50 é `médio`, acima de 50 é `grande`. O resultado deve ter as colunas `faixa` e `pedidos`.',
          setup: delivery,
          query: `${totaisCte}
SELECT
  CASE
    WHEN total < 30 THEN 'pequeno'
    -- complete: até 50 é 'médio'; acima disso, 'grande'
  END AS faixa,
  COUNT(*) AS pedidos
FROM totais
GROUP BY faixa;`,
          solution: `${totaisCte}
SELECT
  CASE
    WHEN total < 30 THEN 'pequeno'
    WHEN total <= 50 THEN 'médio'
    ELSE 'grande'
  END AS faixa,
  COUNT(*) AS pedidos
FROM totais
GROUP BY faixa;`,
          checks: [
            {
              label: 'Há 5 pedidos na faixa `médio`',
              test: `${acha}\nconst r = linha('faixa', 'médio');\nreturn !!r && Number(r[col('pedidos')]) === 5;`,
            },
            {
              label: 'Há 2 pedidos na faixa `grande`',
              test: `${acha}\nconst r = linha('faixa', 'grande');\nreturn !!r && Number(r[col('pedidos')]) === 2;`,
            },
            {
              label: 'Nenhum pedido ficou sem faixa (`NULL`)',
              test: `${acha}\nreturn result.rows.length === 3 && result.rows.every((r) => r[col('faixa')] !== null);`,
            },
          ],
        },
        {
          type: 'quiz',
          question:
            "Num `CASE`, a primeira regra é `WHEN total <= 50 THEN 'médio'` e a segunda é `WHEN total < 30 THEN 'pequeno'`. O que acontece com um pedido de 20 reais?",
          options: [
            {
              text: 'Vira `médio`, porque a primeira condição verdadeira vence',
              correct: true,
              feedback:
                'Isso. 20 é menor ou igual a 50, então a primeira regra já decide e a segunda nunca é testada. Em `CASE`, a ordem importa: coloque as condições mais restritas primeiro.',
            },
            {
              text: 'Vira `pequeno`, porque é a regra mais específica',
              feedback:
                'O SQL não escolhe a regra mais específica; ele testa de cima para baixo e para na primeira verdadeira. Por isso a ordem das regras é parte da lógica.',
            },
            {
              text: 'Dá erro, porque as duas condições são verdadeiras ao mesmo tempo',
              feedback:
                'Não dá erro. Várias condições podem ser verdadeiras; só a primeira conta. O problema é silencioso, e por isso é perigoso.',
            },
          ],
        },
      ],
    },
    {
      id: 'datas',
      title: 'Datas: agrupar por mês e semana',
      blocks: [
        {
          type: 'text',
          text: 'No SQLite, datas são guardadas como texto no formato `AAAA-MM-DD`. Esse formato tem uma vantagem: ordenar o texto é o mesmo que ordenar as datas. Para recortar pedaços de uma data, use `strftime(formato, data)`.',
        },
        {
          type: 'table',
          caption: 'Formatos mais usados do strftime',
          head: ['Formato', 'Resultado para 2026-10-05', 'Uso típico'],
          rows: [
            ["`'%Y-%m'`", '`2026-10`', 'Agrupar por mês'],
            ["`'%Y'`", '`2026`', 'Agrupar por ano'],
            ["`'%W'`", '`40`', 'Número da semana no ano'],
            ["`'%w'`", '`1`', 'Dia da semana (0 é domingo)'],
          ],
        },
        {
          type: 'sql',
          title: 'Faturamento por mês',
          task: 'A consulta agrupa por dia. Mude para agrupar por mês, com as colunas `mes` (no formato `2026-08`) e `faturamento`, ordenada do mês mais antigo para o mais novo.',
          setup: delivery,
          query: `SELECT p.data, SUM(i.quantidade * i.preco) AS faturamento
FROM pedidos p
JOIN itens i ON i.pedido_id = p.id
WHERE p.status = 'entregue'
GROUP BY p.data
ORDER BY p.data;`,
          solution: `SELECT strftime('%Y-%m', p.data) AS mes, SUM(i.quantidade * i.preco) AS faturamento
FROM pedidos p
JOIN itens i ON i.pedido_id = p.id
WHERE p.status = 'entregue'
GROUP BY mes
ORDER BY mes;`,
          checks: [
            {
              label: 'Uma linha por mês (3 meses)',
              test: `${acha}\nreturn result.rows.length === 3 && col('mes') >= 0;`,
            },
            {
              label: 'Setembro de 2026 faturou 136',
              test: `${acha}\nconst r = linha('mes', '2026-09');\nreturn !!r && perto(r[col('faturamento')], 136);`,
            },
            {
              label: 'O primeiro mês é `2026-08`',
              test: `${acha}\nreturn String(result.rows[0][col('mes')]) === '2026-08';`,
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Datas no formato errado',
          text: "Se a data estiver gravada como `05/10/2026`, o `strftime` devolve `NULL` e a ordenação vira bagunça, porque compara o dia primeiro. Converter datas para `AAAA-MM-DD` na carga, como você faz em Python, evita esse problema. No PostgreSQL, datas têm tipo próprio (`DATE`) e a função equivalente para recortar o mês é `date_trunc('month', data)`.",
        },
      ],
    },
    {
      id: 'window-functions',
      title: 'Window functions: comparar sem perder as linhas',
      blocks: [
        {
          type: 'analogy',
          title: 'A tabela do Brasileirão',
          text: 'Na tabela do campeonato, cada time continua aparecendo na sua própria linha, mas ganha uma informação que depende dos outros: a posição. `GROUP BY` faria o contrário, juntando todos os times numa linha só. Uma **window function** (função de janela) calcula algo olhando para um grupo de linhas, sem juntá-las.',
        },
        {
          type: 'anatomy',
          caption: 'Uma window function lida por partes.',
          language: 'sql',
          parts: [
            {
              text: 'RANK()',
              label: 'A função',
              note: 'O que calcular. Pode ser de ranking (`ROW_NUMBER`, `RANK`), de vizinhança (`LAG`, `LEAD`) ou uma agregação comum (`SUM`, `AVG`, `COUNT`).',
            },
            { text: ' ' },
            {
              text: 'OVER (',
              label: 'OVER',
              note: 'É o `OVER` que transforma a função numa função de janela. Sem ele, `SUM` agruparia as linhas; com ele, cada linha continua no resultado.',
            },
            {
              text: 'PARTITION BY cidade',
              label: 'PARTITION BY',
              note: 'Divide as linhas em grupos independentes, como campeonatos separados. O ranking recomeça em cada cidade. É opcional: sem ele, a janela é a tabela toda.',
            },
            { text: ' ' },
            {
              text: 'ORDER BY gasto DESC',
              label: 'ORDER BY da janela',
              note: 'A ordem dentro de cada grupo. Para ranking, decide quem é o primeiro. Para `SUM`, faz a soma ir acumulando linha a linha.',
            },
            { text: ')' },
          ],
        },
        {
          type: 'table',
          caption: 'As window functions que mais aparecem',
          head: ['Função', 'O que faz', 'Exemplo com 100, 100, 90'],
          rows: [
            ['`ROW_NUMBER()`', 'Numera 1, 2, 3… sem repetir', '1, 2, 3'],
            ['`RANK()`', 'Empates dividem a posição e pulam a seguinte', '1, 1, 3'],
            ['`DENSE_RANK()`', 'Empates dividem a posição, sem pular', '1, 1, 2'],
            [
              '`SUM(x) OVER (ORDER BY ...)`',
              'Soma acumulada até a linha atual',
              '100, 200, 290 (ordenando por data)',
            ],
            ['`LAG(x)`', 'Valor da linha anterior na janela', '`NULL`, 100, 100'],
          ],
        },
        {
          type: 'sql',
          title: 'Ranking de clientes em cada cidade',
          task: 'Adicione a coluna `posicao`: o ranking de cada cliente pelo `gasto`, do maior para o menor, recomeçando em cada cidade. Use `RANK() OVER (PARTITION BY ... ORDER BY ...)`.',
          setup: delivery,
          query: `WITH gastos AS (
  SELECT c.nome, c.cidade, SUM(i.quantidade * i.preco) AS gasto
  FROM clientes c
  JOIN pedidos p ON p.cliente_id = c.id
  JOIN itens i ON i.pedido_id = p.id
  WHERE p.status = 'entregue'
  GROUP BY c.id, c.nome, c.cidade
)
SELECT nome, cidade, gasto
FROM gastos
ORDER BY cidade, gasto DESC;`,
          solution: `WITH gastos AS (
  SELECT c.nome, c.cidade, SUM(i.quantidade * i.preco) AS gasto
  FROM clientes c
  JOIN pedidos p ON p.cliente_id = c.id
  JOIN itens i ON i.pedido_id = p.id
  WHERE p.status = 'entregue'
  GROUP BY c.id, c.nome, c.cidade
)
SELECT nome, cidade, gasto,
  RANK() OVER (PARTITION BY cidade ORDER BY gasto DESC) AS posicao
FROM gastos
ORDER BY cidade, posicao;`,
          checks: [
            {
              label: 'Todos os 5 clientes continuam no resultado',
              test: `${acha}\nreturn result.rows.length === 5;`,
            },
            {
              label: 'Bruno é o 1º de Recife',
              test: `${acha}\nconst r = linha('nome', 'Bruno');\nreturn !!r && Number(r[col('posicao')]) === 1;`,
            },
            {
              label: 'Ana é a 2ª de Recife',
              test: `${acha}\nconst r = linha('nome', 'Ana');\nreturn !!r && Number(r[col('posicao')]) === 2;`,
            },
            {
              label: 'Carla é a 1ª de Salvador (o ranking recomeça por cidade)',
              test: `${acha}\nconst r = linha('nome', 'Carla');\nreturn !!r && Number(r[col('posicao')]) === 1;`,
            },
          ],
        },
        {
          type: 'sql',
          title: 'Acumulado e variação mês a mês',
          task: 'A partir da CTE `mensal`, adicione `acumulado` (soma do faturamento até aquele mês, com `SUM(...) OVER (ORDER BY mes)`) e `variacao` (faturamento menos o do mês anterior, com `LAG`).',
          setup: delivery,
          query: `${mensalCte}
SELECT mes, faturamento
FROM mensal
ORDER BY mes;`,
          solution: `${mensalCte}
SELECT mes, faturamento,
  SUM(faturamento) OVER (ORDER BY mes) AS acumulado,
  faturamento - LAG(faturamento) OVER (ORDER BY mes) AS variacao
FROM mensal
ORDER BY mes;`,
          checks: [
            {
              label: 'O acumulado de outubro é 348',
              test: `${acha}\nconst r = linha('mes', '2026-10');\nreturn !!r && perto(r[col('acumulado')], 348);`,
            },
            {
              label: 'Setembro cresceu 55 em relação a agosto',
              test: `${acha}\nconst r = linha('mes', '2026-09');\nreturn !!r && perto(r[col('variacao')], 55);`,
            },
            {
              label: 'Agosto não tem mês anterior, então a variação é `NULL`',
              test: `${acha}\nconst r = linha('mes', '2026-08');\nreturn !!r && col('variacao') >= 0 && r[col('variacao')] === null;`,
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Você quer listar **cada pedido** e, ao lado, o total gasto pelo cliente em todos os pedidos dele. Qual caminho resolve?',
          options: [
            {
              text: '`SUM(total) OVER (PARTITION BY cliente_id)`',
              correct: true,
              feedback:
                'Isso. A janela soma por cliente e repete o resultado em cada pedido dele, sem sumir com as linhas.',
            },
            {
              text: '`SUM(total)` com `GROUP BY cliente_id`',
              feedback:
                'Assim você recebe uma linha por cliente e perde os pedidos individuais. É exatamente a diferença entre agrupar e usar uma janela.',
            },
            {
              text: '`SUM(total)` sem `GROUP BY` nem `OVER`',
              feedback:
                'Sem agrupar nem janela, o SQL soma a tabela inteira e devolve uma única linha com o total geral.',
            },
            {
              text: '`ORDER BY cliente_id` e somar de cabeça',
              feedback:
                'Ordenar ajuda a enxergar, mas não calcula nada. E conta de cabeça não escala para milhões de linhas.',
            },
          ],
        },
      ],
    },
    {
      id: 'deduplicacao-e-funil',
      title: 'Deduplicar, montar funis e coortes',
      blocks: [
        {
          type: 'text',
          text: 'Na aula de SQL básico você viu a ordem em que as cláusulas são **escritas**. O banco as **executa** em outra ordem, e entender essa ordem explica um erro muito comum com window functions.',
        },
        {
          type: 'order',
          prompt: 'Coloque as etapas na ordem em que o banco realmente as executa.',
          items: [
            '`FROM` e `JOIN`: monta as linhas de origem',
            '`WHERE`: filtra as linhas',
            '`GROUP BY`: forma os grupos',
            '`HAVING`: filtra os grupos',
            'Window functions e colunas do `SELECT`',
            '`ORDER BY`: ordena o resultado',
          ],
          explanation:
            'As window functions são calculadas depois do `WHERE`. Por isso `WHERE posicao = 1` não funciona: quando o filtro roda, `posicao` ainda não existe. A saída é calcular a janela numa CTE e filtrar na consulta de fora.',
        },
        {
          type: 'text',
          text: 'Isso é exatamente o que você precisa para **deduplicar**. Quando uma carga roda duas vezes ou um sistema reenvia cadastros atualizados, a tabela fica com várias versões da mesma pessoa. A receita: numere as linhas de cada chave com `ROW_NUMBER()`, da mais recente para a mais antiga, e fique só com a número 1.',
        },
        {
          type: 'sql',
          title: 'Um cadastro por e-mail',
          task: 'A tabela `cadastros_brutos` tem versões repetidas. Devolva **uma linha por e-mail**, a mais recente (`atualizado_em`), com as colunas `email`, `nome` e `cidade`. O `DISTINCT` não resolve: descubra por quê.',
          setup: `CREATE TABLE cadastros_brutos (
  email TEXT NOT NULL,
  nome TEXT NOT NULL,
  cidade TEXT NOT NULL,
  atualizado_em TEXT NOT NULL
);
INSERT INTO cadastros_brutos VALUES
  ('ana@exemplo.com', 'Ana', 'Recife', '2026-08-03'),
  ('ana@exemplo.com', 'Ana Souza', 'Recife', '2026-09-10'),
  ('bruno@exemplo.com', 'Bruno', 'Recife', '2026-08-20'),
  ('carla@exemplo.com', 'Carla', 'Salvador', '2026-09-02'),
  ('carla@exemplo.com', 'Carla', 'Feira de Santana', '2026-10-01'),
  ('carla@exemplo.com', 'Carla', 'Salvador', '2026-09-02'),
  ('elisa@exemplo.com', 'Elisa', 'Belém', '2026-09-28');`,
          query: `SELECT DISTINCT email, nome, cidade
FROM cadastros_brutos;`,
          solution: `WITH numerados AS (
  SELECT email, nome, cidade,
    ROW_NUMBER() OVER (PARTITION BY email ORDER BY atualizado_em DESC) AS versao
  FROM cadastros_brutos
)
SELECT email, nome, cidade
FROM numerados
WHERE versao = 1;`,
          checks: [
            {
              label: 'Uma linha por e-mail (4 pessoas)',
              test: `${acha}\nconst e = result.rows.map((r) => r[col('email')]);\nreturn e.length === 4 && new Set(e).size === 4;`,
            },
            {
              label: 'Carla aparece com a cidade mais recente, Feira de Santana',
              test: `${acha}\nconst r = linha('email', 'carla@exemplo.com');\nreturn !!r && r[col('cidade')] === 'Feira de Santana';`,
            },
            {
              label: 'Ana aparece com o nome atualizado, Ana Souza',
              test: `${acha}\nconst r = linha('email', 'ana@exemplo.com');\nreturn !!r && r[col('nome')] === 'Ana Souza';`,
            },
          ],
        },
        {
          type: 'text',
          text: 'Um **funil** mede quantas pessoas passam por cada etapa de um processo: visitou a loja, colocou no carrinho, pagou. A pergunta é sobre **pessoas**, não sobre eventos, então quem visitou duas vezes conta uma vez só. O truque é combinar `COUNT(DISTINCT ...)` com `CASE WHEN`.',
        },
        {
          type: 'sql',
          title: 'O funil da loja',
          task: 'Devolva uma única linha com `visitaram`, `colocaram_no_carrinho` e `pagaram` (pessoas distintas em cada etapa) e `conversao`: a porcentagem de quem visitou e pagou, arredondada com uma casa (`ROUND(100.0 * pagaram / visitaram, 1)`).',
          setup: `CREATE TABLE eventos (
  usuario INTEGER NOT NULL,
  etapa TEXT NOT NULL,
  data TEXT NOT NULL
);
INSERT INTO eventos VALUES
  (1, 'visitou', '2026-10-01'), (1, 'carrinho', '2026-10-01'), (1, 'pagou', '2026-10-01'),
  (2, 'visitou', '2026-10-01'), (2, 'carrinho', '2026-10-02'),
  (3, 'visitou', '2026-10-02'), (3, 'visitou', '2026-10-03'), (3, 'carrinho', '2026-10-03'), (3, 'pagou', '2026-10-03'),
  (4, 'visitou', '2026-10-03'),
  (5, 'visitou', '2026-10-04'), (5, 'carrinho', '2026-10-04'),
  (6, 'visitou', '2026-10-05');`,
          query: `SELECT etapa, COUNT(*) AS total
FROM eventos
GROUP BY etapa;`,
          solution: `WITH funil AS (
  SELECT
    COUNT(DISTINCT CASE WHEN etapa = 'visitou' THEN usuario END) AS visitaram,
    COUNT(DISTINCT CASE WHEN etapa = 'carrinho' THEN usuario END) AS colocaram_no_carrinho,
    COUNT(DISTINCT CASE WHEN etapa = 'pagou' THEN usuario END) AS pagaram
  FROM eventos
)
SELECT *, ROUND(100.0 * pagaram / visitaram, 1) AS conversao
FROM funil;`,
          checks: [
            {
              label: '6 pessoas visitaram (quem visitou duas vezes conta uma)',
              test: `${acha}\nreturn result.rows.length === 1 && Number(result.rows[0][col('visitaram')]) === 6;`,
            },
            {
              label: '4 colocaram no carrinho e 2 pagaram',
              test: `${acha}\nconst r = result.rows[0];\nreturn !!r && Number(r[col('colocaram_no_carrinho')]) === 4 && Number(r[col('pagaram')]) === 2;`,
            },
            {
              label: 'A conversão é 33,3%',
              test: `${acha}\nreturn !!result.rows[0] && perto(result.rows[0][col('conversao')], 33.3);`,
            },
          ],
        },
        {
          type: 'text',
          text: 'Uma **coorte** é um grupo de pessoas que começou na mesma época, como “quem se cadastrou em agosto”. A análise de coorte acompanha cada grupo ao longo do tempo: quantos de agosto ainda compravam em outubro? Rode a consulta abaixo e leia o resultado linha a linha.',
        },
        {
          type: 'sql',
          title: 'Explore: clientes ativos por coorte de cadastro',
          task: 'Não há objetivo aqui: rode, leia e tente mudar a coorte para semanas com `%W`.',
          setup: delivery,
          query: `SELECT strftime('%Y-%m', c.cadastro) AS coorte,
  strftime('%Y-%m', p.data) AS mes_do_pedido,
  COUNT(DISTINCT c.id) AS clientes_ativos
FROM clientes c
JOIN pedidos p ON p.cliente_id = c.id
WHERE p.status = 'entregue'
GROUP BY coorte, mes_do_pedido
ORDER BY coorte, mes_do_pedido;`,
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns em SQL analítico',
          text: 'Somar uma coluna depois de um JOIN que multiplicou as linhas. Usar `COUNT(*)` quando a pergunta é sobre pessoas e não sobre eventos. Tentar filtrar uma window function no `WHERE`. E confiar em `DISTINCT` para deduplicar versões diferentes do mesmo registro. Quando uma consulta ficar lenta, `EXPLAIN QUERY PLAN` (no PostgreSQL, `EXPLAIN`) mostra como o banco pretende executá-la.',
        },
      ],
    },
  ],
  recap: [
    '**Granularidade** é o que uma linha representa; somar uma coluna depois de um JOIN que multiplica linhas gera dupla contagem.',
    'CTEs (`WITH`) dividem a consulta em passos com nome, como calcular o total por pedido antes da média por cidade.',
    '`CASE WHEN` cria classificações dentro da consulta, testando as regras de cima para baixo.',
    'Window functions (`ROW_NUMBER`, `RANK`, `SUM OVER`, `LAG`) calculam rankings, acumulados e variações sem juntar as linhas.',
    'Para deduplicar, numere as versões com `ROW_NUMBER()` numa CTE e fique com a primeira; para funis, conte pessoas com `COUNT(DISTINCT CASE WHEN ...)`.',
  ],
  cards: [
    {
      id: 'granularidade',
      front: 'O que é a granularidade de uma tabela ou consulta?',
      back: 'O que cada linha representa: um pedido, um item, um cliente por mês.',
    },
    {
      id: 'dupla-contagem',
      front: 'Por que somar `pedidos.frete` depois de um JOIN com `itens` dá errado?',
      back: 'Porque o JOIN repete o frete em cada item do pedido, e a soma conta o mesmo frete várias vezes.',
    },
    {
      id: 'cte',
      front: 'Para que serve uma CTE (`WITH ... AS`)?',
      back: 'Dar nome a um resultado intermediário e usá-lo como tabela na consulta seguinte, deixando os passos legíveis.',
    },
    {
      id: 'rank-vs-row-number',
      front: 'Qual a diferença entre `RANK()` e `ROW_NUMBER()` num empate?',
      back: '`RANK()` dá a mesma posição aos empatados e pula a seguinte; `ROW_NUMBER()` sempre numera 1, 2, 3 sem repetir.',
    },
    {
      id: 'window-no-where',
      front: 'Por que não dá para usar uma window function no `WHERE`?',
      back: 'Porque ela é calculada depois do `WHERE`. Calcule numa CTE e filtre na consulta de fora.',
    },
    {
      id: 'lag',
      front: 'O que `LAG(faturamento) OVER (ORDER BY mes)` devolve?',
      back: 'O faturamento do mês anterior; na primeira linha, `NULL`.',
    },
    {
      id: 'mes-sqlite',
      front: 'Como agrupar por mês uma data `AAAA-MM-DD` no SQLite?',
      back: "Com `strftime('%Y-%m', data)` no `SELECT` e no `GROUP BY`.",
    },
  ],
  mission: {
    title: 'Perguntas de negócio num banco de verdade',
    text: 'Instale o PostgreSQL ou o DuckDB e carregue um conjunto de dados de vendas, de delivery ou um dado aberto com datas. Responda às perguntas abaixo com consultas salvas num arquivo `.sql` versionado no Git.',
    steps: [
      'Escreva, no topo do arquivo, a granularidade de cada tabela que você vai usar',
      'Calcule o total por mês e o acumulado do ano com `SUM() OVER`',
      'Monte um ranking dos 3 maiores clientes ou produtos em cada categoria com `RANK()`',
      'Junte duas tabelas de granularidades diferentes e prove, comparando os totais, que não houve dupla contagem',
      'Remova duplicados de uma tabela com `ROW_NUMBER()` e explique qual versão você manteve e por quê',
    ],
  },
  sources: [
    {
      title: 'PostgreSQL: tutorial de window functions',
      url: 'https://www.postgresql.org/docs/current/tutorial-window.html',
    },
    { title: 'SQLite: window functions', url: 'https://www.sqlite.org/windowfunctions.html' },
    { title: 'SQLite: funções de data e hora', url: 'https://www.sqlite.org/lang_datefunc.html' },
    {
      title: 'PostgreSQL: consultas WITH (CTEs)',
      url: 'https://www.postgresql.org/docs/current/queries-with.html',
    },
  ],
};
