import { LessonContent } from '../types';

const setup = `CREATE TABLE pedidos (
  id INTEGER PRIMARY KEY,
  cliente TEXT NOT NULL,
  cidade TEXT NOT NULL,
  categoria TEXT NOT NULL,
  valor REAL NOT NULL,
  data TEXT NOT NULL,
  cupom TEXT
);
INSERT INTO pedidos VALUES
  (1, 'Ana Souza', 'Recife', 'lanche', 32.5, '2026-09-01', NULL),
  (2, 'Bruno Lima', 'São Paulo', 'pizza', 58.0, '2026-09-01', 'PRIMEIRA'),
  (3, 'Carla Dias', 'Recife', 'açaí', 18.0, '2026-09-02', NULL),
  (4, 'Diego Alves', 'Salvador', 'pizza', 64.9, '2026-09-03', NULL),
  (5, 'Ana Souza', 'Recife', 'mercado', 120.0, '2026-09-05', 'FRETE10'),
  (6, 'Elisa Rocha', 'São Paulo', 'lanche', 27.0, '2026-09-06', NULL),
  (7, 'Bruno Lima', 'São Paulo', 'mercado', 210.4, '2026-09-08', NULL),
  (8, 'Fábio Nunes', 'Salvador', 'açaí', 22.5, '2026-09-10', 'FRETE10'),
  (9, 'Carla Dias', 'Recife', 'pizza', 49.9, '2026-09-12', NULL),
  (10, 'Gabi Costa', 'Belém', 'lanche', 35.0, '2026-09-15', NULL),
  (11, 'Diego Alves', 'Salvador', 'mercado', 89.0, '2026-09-20', NULL),
  (12, 'Elisa Rocha', 'São Paulo', 'açaí', 15.0, '2026-09-28', 'PRIMEIRA');`;

/** Check body: the result has an `id` column whose values, sorted, are exactly `ids`. */
const idsAre = (ids: number[]) =>
  `if (!result || !result.columns.includes('id')) return false; const i = result.columns.indexOf('id'); return result.rows.map((r) => Number(r[i])).sort((a, b) => a - b).join(',') === '${ids.join(
    ',',
  )}';`;

export const content: LessonContent = {
  hook: 'Quase todo sistema que você usa guarda dados num banco: o extrato do Pix, o histórico do iFood, a fila do SUS. Para perguntar coisas a esse banco, “quanto vendemos ontem?”, “quais pedidos ficaram sem entregar?”, existe uma língua que tem mais de 40 anos e continua em todo lugar: o **SQL**. Quem faz backend escreve SQL para a aplicação, quem trabalha com dados vive dentro dele e quem testa usa para conferir se o sistema gravou o que devia.',
  sections: [
    {
      id: 'tabelas-sao-planilhas',
      title: 'Tabelas são planilhas com regras',
      blocks: [
        {
          type: 'analogy',
          title: 'Uma planilha muito disciplinada',
          text: 'Pense numa planilha de pedidos: cada **linha** é um pedido, cada **coluna** é uma informação (cliente, cidade, valor). Um banco de dados relacional guarda os dados assim, em **tabelas**, mas com regras que a planilha não tem: a coluna `valor` só aceita números, toda linha tem um identificador único e ninguém pinta uma célula de amarelo para dizer “cancelado”.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Banco de dados',
              text: 'Um programa que guarda dados de forma organizada e segura e responde a perguntas sobre eles. PostgreSQL, MySQL e SQLite são exemplos.',
            },
            {
              term: 'Tabela',
              text: 'Um conjunto de linhas com as mesmas colunas, como `pedidos` ou `clientes`.',
            },
            {
              term: 'Consulta (query)',
              text: 'Uma pergunta escrita em SQL. O banco devolve uma tabela de resposta, chamada **resultado**.',
            },
            {
              term: 'NULL',
              text: 'O valor “não sei” ou “não tem”. Não é zero nem texto vazio: é ausência de valor. Na tabela abaixo, `cupom` é `NULL` quando o pedido não usou cupom.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Toda consulta de leitura começa com duas palavras: `SELECT` diz **quais colunas** você quer, e `FROM` diz **de qual tabela**. O `*` quer dizer “todas as colunas”. Neste exercício, e em todos desta aula, o banco é real e roda no seu navegador: pode errar à vontade, os dados voltam ao original a cada execução.',
        },
        {
          type: 'sql',
          title: 'Sua primeira consulta',
          task: 'Rode a consulta como está e observe a tabela `pedidos`. Depois, troque o `*` para mostrar **só** as colunas `cliente` e `valor`, separadas por vírgula.',
          setup,
          query: 'SELECT * FROM pedidos;',
          solution: 'SELECT cliente, valor FROM pedidos;',
          checks: [
            {
              label: 'Mostra só as colunas cliente e valor',
              test: "return !!result && result.columns.length === 2 && result.columns.map((c) => c.toLowerCase()).sort().join() === 'cliente,valor';",
            },
            {
              label: 'Mostra todos os 12 pedidos',
              test: 'return !!result && result.rows.length === 12;',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Convenções que ajudam a ler',
          text: 'O SQL não diferencia maiúsculas nas palavras-chave: `select` funciona. Mas escrever `SELECT`, `FROM` e `WHERE` em maiúsculas e os nomes de tabelas em minúsculas deixa claro o que é comando e o que é dado. O `;` no fim marca onde a consulta termina.',
        },
      ],
    },
    {
      id: 'filtrando-com-where',
      title: 'Filtrar linhas com WHERE',
      blocks: [
        {
          type: 'text',
          text: 'Raramente você quer a tabela inteira. O `WHERE` filtra as linhas: só entram no resultado as que fazem a condição ser verdadeira. Textos e datas vão entre **aspas simples**; números, sem aspas.',
        },
        {
          type: 'code',
          language: 'sql',
          caption: 'Comparações e combinações no WHERE',
          code: "SELECT id, cliente, valor\nFROM pedidos\nWHERE cidade = 'Recife'\n  AND valor >= 30;\n\n-- OR: basta uma das condições\nSELECT id, cidade FROM pedidos\nWHERE cidade = 'Belém' OR cidade = 'Salvador';\n\n-- diferente de: <> (ou !=)\nSELECT id FROM pedidos WHERE categoria <> 'mercado';",
        },
        {
          type: 'sql',
          title: 'Pedidos grandes de Recife',
          task: 'Mostre `id`, `cliente` e `valor` dos pedidos da cidade de Recife com valor **acima de 30**. A consulta inicial ainda traz todas as cidades.',
          setup,
          query: 'SELECT id, cliente, valor\nFROM pedidos\nWHERE valor > 30;',
          solution:
            "SELECT id, cliente, valor\nFROM pedidos\nWHERE cidade = 'Recife' AND valor > 30;",
          checks: [{ label: 'Traz exatamente os pedidos 1, 5 e 9', test: idsAre([1, 5, 9]) }],
        },
        {
          type: 'table',
          caption: 'Atalhos do WHERE que você vai usar toda semana',
          head: ['Operador', 'Pergunta', 'Exemplo'],
          rows: [
            ['`IN`', 'está nesta lista?', "`categoria IN ('pizza', 'açaí')`"],
            [
              '`BETWEEN`',
              'está neste intervalo (inclusive)?',
              "`data BETWEEN '2026-09-01' AND '2026-09-10'`",
            ],
            [
              '`LIKE`',
              'combina com este padrão?',
              "`cliente LIKE 'Ana%'` (`%` = qualquer coisa; `_` = um caractere)",
            ],
            ['`IS NULL`', 'está sem valor?', '`cupom IS NULL` (e o contrário: `IS NOT NULL`)'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'O erro mais comum com NULL',
          text: '`cupom = NULL` **nunca** é verdadeiro, nem quando o cupom está vazio. Como `NULL` quer dizer “não sei”, comparar qualquer coisa com ele dá “não sei” também, e a linha fica de fora. Para perguntar se algo está vazio, use sempre `IS NULL`.',
        },
        {
          type: 'sql',
          title: 'Pizzas e açaís sem cupom',
          task: 'A consulta deveria listar os pedidos de **pizza ou açaí** que **não usaram cupom**, mas volta vazia. Corrija a condição do cupom e use `IN` para as categorias.',
          setup,
          query:
            "SELECT id, cliente, categoria, cupom\nFROM pedidos\nWHERE cupom = NULL\n  AND (categoria = 'pizza' OR categoria = 'açaí');",
          solution:
            "SELECT id, cliente, categoria, cupom\nFROM pedidos\nWHERE cupom IS NULL\n  AND categoria IN ('pizza', 'açaí');",
          checks: [{ label: 'Traz exatamente os pedidos 3, 4 e 9', test: idsAre([3, 4, 9]) }],
        },
        {
          type: 'fill',
          prompt: 'Complete para achar os pedidos de clientes cujo nome começa com “Ana”.',
          language: 'sql',
          template: "SELECT id, cliente FROM pedidos\nWHERE cliente [[LIKE|like]] '[[Ana%]]';",
          explanation:
            '`LIKE` compara com um padrão, e `%` significa “qualquer sequência de caracteres, inclusive nenhuma”. `Ana%` pega Ana Souza, Ana Paula e Anabela. No SQLite, `LIKE` ignora maiúsculas em letras sem acento; no PostgreSQL ele diferencia, e existe o `ILIKE` para ignorar.',
        },
        {
          type: 'quiz',
          question:
            "O que esta consulta devolve? `SELECT id FROM pedidos WHERE cidade = 'Recife' OR cidade = 'Salvador' AND valor > 100;`",
          options: [
            {
              text: 'Todos os pedidos de Recife, mais os de Salvador acima de 100',
              correct: true,
              feedback:
                "Isso. O `AND` é resolvido antes do `OR`, como multiplicação antes de soma. Se a intenção era “Recife ou Salvador, acima de 100”, escreva `(cidade = 'Recife' OR cidade = 'Salvador') AND valor > 100`. Na dúvida, use parênteses.",
            },
            {
              text: 'Os pedidos de Recife ou Salvador, todos acima de 100',
              feedback:
                "Era isso que a pessoa provavelmente queria, mas o `AND` tem prioridade e se aplica só a `cidade = 'Salvador'`. Faltam parênteses em volta do `OR`.",
            },
            {
              text: 'Nenhum pedido, porque uma cidade não pode ser Recife e Salvador ao mesmo tempo',
              feedback:
                'Seria verdade se fosse tudo `AND`. Com o `OR` no meio, basta um dos lados ser verdadeiro.',
            },
          ],
        },
      ],
    },
    {
      id: 'ordenar-e-limitar',
      title: 'Ordenar e limitar o resultado',
      blocks: [
        {
          type: 'text',
          text: 'Sem instrução, o banco devolve as linhas na ordem que for mais rápida para ele, e essa ordem pode mudar. Se a ordem importa, diga com `ORDER BY`: `ASC` (crescente, o padrão) ou `DESC` (decrescente). Para pegar só as primeiras linhas, `LIMIT`.',
        },
        {
          type: 'code',
          language: 'sql',
          caption: 'Os 5 pedidos mais recentes; empate na data é desfeito pelo valor',
          code: 'SELECT id, data, valor\nFROM pedidos\nORDER BY data DESC, valor DESC\nLIMIT 5;',
        },
        {
          type: 'sql',
          title: 'Ranking dos maiores pedidos',
          task: 'Mostre `id`, `cliente` e `valor` dos **3 maiores pedidos**, do maior para o menor.',
          setup,
          query: 'SELECT id, cliente, valor\nFROM pedidos\nORDER BY valor;',
          solution: 'SELECT id, cliente, valor\nFROM pedidos\nORDER BY valor DESC\nLIMIT 3;',
          checks: [
            {
              label: 'Traz só 3 linhas',
              test: 'return !!result && result.rows.length === 3;',
            },
            {
              label: 'Na ordem: pedidos 7, 5 e 11',
              test: "if (!result || !result.columns.includes('id')) return false; const i = result.columns.indexOf('id'); return result.rows.map((r) => r[i]).join(',') === '7,5,11';",
            },
          ],
        },
        {
          type: 'reveal',
          question:
            'Uma tela mostra “últimos pedidos” com `SELECT * FROM pedidos LIMIT 10;` e, em produção, às vezes aparecem pedidos antigos. Por quê?',
          answer:
            'Sem `ORDER BY`, “os 10 primeiros” são quaisquer 10 que o banco encontrar primeiro. Em tabelas pequenas parece funcionar; com milhões de linhas, a ordem muda. Sempre combine `LIMIT` com `ORDER BY`.',
        },
      ],
    },
    {
      id: 'contar-e-somar',
      title: 'Contar, somar e tirar médias',
      blocks: [
        {
          type: 'text',
          text: 'Muitas perguntas não querem linhas, querem um número: quantos pedidos, quanto faturamos, qual o ticket médio. As **funções de agregação** transformam várias linhas numa só. Com `AS` você dá um nome legível para a coluna do resultado.',
        },
        {
          type: 'table',
          caption: 'Funções de agregação',
          head: ['Função', 'Devolve', 'Exemplo'],
          rows: [
            ['`COUNT(*)`', 'quantidade de linhas', '`SELECT COUNT(*) FROM pedidos`'],
            [
              '`COUNT(coluna)`',
              'quantidade de valores não nulos',
              '`COUNT(cupom)`: pedidos com cupom',
            ],
            ['`SUM(coluna)`', 'a soma', '`SUM(valor) AS faturamento`'],
            ['`AVG(coluna)`', 'a média', '`ROUND(AVG(valor), 2) AS ticket_medio`'],
            ['`MIN` / `MAX`', 'o menor e o maior', '`MAX(data) AS ultimo_pedido`'],
          ],
        },
        {
          type: 'sql',
          title: 'O mês em São Paulo',
          task: 'Numa única linha de resultado, mostre a **quantidade** de pedidos e o **faturamento total** (soma dos valores) da cidade de São Paulo.',
          setup,
          query: 'SELECT COUNT(*) AS quantidade\nFROM pedidos;',
          solution:
            "SELECT COUNT(*) AS quantidade, SUM(valor) AS faturamento\nFROM pedidos\nWHERE cidade = 'São Paulo';",
          checks: [
            {
              label: 'O resultado tem uma linha só',
              test: 'return !!result && result.rows.length === 1;',
            },
            {
              label: 'Mostra 4 pedidos',
              test: 'return !!result && result.rows[0].some((v) => v === 4);',
            },
            {
              label: 'Mostra o faturamento de 310,40',
              test: "return !!result && result.rows[0].some((v) => typeof v === 'number' && Math.abs(v - 310.4) < 0.01);",
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Na tabela de pedidos, 12 linhas no total, 4 usaram cupom. O que `SELECT COUNT(cupom) FROM pedidos;` devolve?',
          options: [
            {
              text: '4',
              correct: true,
              feedback:
                'Isso. `COUNT(coluna)` conta só os valores que **não são NULL**. Para contar linhas, independentemente do conteúdo, use `COUNT(*)`.',
            },
            {
              text: '12',
              feedback:
                'Esse seria o resultado de `COUNT(*)`, que conta linhas. Com o nome de uma coluna, os `NULL` ficam de fora.',
            },
            {
              text: '8',
              feedback:
                'Esses são os pedidos **sem** cupom. Para contá-los: `SELECT COUNT(*) FROM pedidos WHERE cupom IS NULL;`.',
            },
          ],
        },
      ],
    },
    {
      id: 'agrupar',
      title: 'Agrupar com GROUP BY e filtrar grupos com HAVING',
      blocks: [
        {
          type: 'analogy',
          title: 'Separar as notas por pilha',
          text: 'No fim do dia, a pessoa do caixa separa os comprovantes em pilhas, uma por forma de pagamento, e soma cada pilha. `GROUP BY` faz isso: junta as linhas que têm o mesmo valor numa coluna e aplica a agregação **em cada grupo**.',
        },
        {
          type: 'code',
          language: 'sql',
          caption: 'Uma linha por categoria',
          code: 'SELECT categoria, COUNT(*) AS pedidos, SUM(valor) AS total\nFROM pedidos\nGROUP BY categoria\nORDER BY total DESC;',
          output:
            'categoria | pedidos | total\nmercado   |       3 | 419.4\npizza     |       3 | 172.8\nlanche    |       3 |  94.5\naçaí      |       3 |  55.5',
        },
        {
          type: 'text',
          text: '`WHERE` filtra **linhas** antes de agrupar; ele não enxerga somas e contagens, porque elas ainda não existem. Para filtrar **grupos** depois de agrupar, use `HAVING`, por exemplo `HAVING COUNT(*) > 1`.',
        },
        {
          type: 'classify',
          prompt: 'Cada filtro vai no WHERE ou no HAVING?',
          buckets: ['WHERE', 'HAVING'],
          items: [
            { text: 'Só pedidos de setembro', bucket: 0 },
            { text: 'Só cidades com mais de 3 pedidos', bucket: 1 },
            { text: 'Ignorar pedidos com cupom', bucket: 0 },
            { text: 'Só categorias que faturaram mais de 100', bucket: 1 },
            { text: 'Só pedidos acima de 20 reais', bucket: 0 },
            { text: 'Clientes com ticket médio acima de 50', bucket: 1 },
          ],
          explanation:
            'Se a condição fala de uma linha individual (a data, o cupom, o valor de um pedido), é `WHERE`. Se fala de um resultado do grupo (`COUNT`, `SUM`, `AVG`), é `HAVING`.',
        },
        {
          type: 'sql',
          title: 'Faturamento por cidade',
          task: 'Mostre cada `cidade` com o total faturado, do maior para o menor, mas **só as cidades com mais de um pedido**.',
          setup,
          query: 'SELECT cidade, SUM(valor) AS total\nFROM pedidos\nGROUP BY cidade;',
          solution:
            'SELECT cidade, SUM(valor) AS total\nFROM pedidos\nGROUP BY cidade\nHAVING COUNT(*) > 1\nORDER BY total DESC;',
          checks: [
            {
              label: 'Belém, com um pedido só, fica de fora',
              test: "return !!result && result.rows.length === 3 && !result.rows.some((r) => r.includes('Belém'));",
            },
            {
              label: 'São Paulo aparece primeiro, com o maior total',
              test: "return !!result && result.rows.length > 0 && result.rows[0].includes('São Paulo');",
            },
          ],
        },
        {
          type: 'order',
          prompt: 'Coloque as partes de uma consulta na ordem em que elas precisam ser escritas.',
          items: ['SELECT', 'FROM', 'WHERE', 'GROUP BY', 'HAVING', 'ORDER BY', 'LIMIT'],
          explanation:
            'Uma frase para lembrar: escolha as colunas, da tabela, filtre linhas, agrupe, filtre grupos, ordene, corte. Trocar a ordem dá erro de sintaxe na hora.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'SQLite aqui, PostgreSQL no trabalho',
          text: 'Os exercícios rodam em **SQLite**, um banco que cabe num arquivo. No mercado, o mais comum é o **PostgreSQL**. Quase tudo desta aula é igual nos dois. As diferenças que mais aparecem: o PostgreSQL é rigoroso com tipos e recusa um `SELECT cliente, SUM(valor) ... GROUP BY cidade` (coluna fora do grupo), que o SQLite aceita em silêncio; datas têm tipo próprio (`DATE`) e funções como `date_trunc`, enquanto aqui são texto com `strftime`; e existe `ILIKE` para buscar ignorando maiúsculas.',
        },
      ],
    },
  ],
  recap: [
    'Um banco relacional guarda dados em tabelas de linhas e colunas; `SELECT ... FROM ...` lê as colunas que você escolher.',
    '`WHERE` filtra linhas com comparações, `AND`/`OR`, `IN`, `BETWEEN`, `LIKE` e `IS NULL`, nunca `= NULL`.',
    '`ORDER BY` define a ordem e `LIMIT` corta o resultado; sem `ORDER BY`, a ordem não é garantida.',
    '`COUNT`, `SUM`, `AVG`, `MIN` e `MAX` resumem várias linhas; `GROUP BY` aplica o resumo por grupo e `HAVING` filtra os grupos.',
  ],
  cards: [
    {
      id: 'select-from',
      front: 'O que dizem o `SELECT` e o `FROM` numa consulta?',
      back: '`SELECT` diz quais colunas mostrar; `FROM`, de qual tabela.',
    },
    {
      id: 'is-null',
      front: 'Como achar linhas em que a coluna `cupom` está vazia?',
      back: '`WHERE cupom IS NULL`. Com `= NULL` a condição nunca é verdadeira.',
    },
    {
      id: 'like-percent',
      front: "O que significa o `%` em `LIKE 'Ana%'`?",
      back: 'Qualquer sequência de caracteres, inclusive nenhuma.',
    },
    {
      id: 'count-coluna',
      front: 'Qual a diferença entre `COUNT(*)` e `COUNT(cupom)`?',
      back: '`COUNT(*)` conta linhas; `COUNT(cupom)` conta só os valores não nulos da coluna.',
    },
    {
      id: 'where-having',
      front: 'Quando usar `WHERE` e quando usar `HAVING`?',
      back: '`WHERE` filtra linhas antes de agrupar; `HAVING` filtra grupos depois, usando agregações como `COUNT` e `SUM`.',
    },
    {
      id: 'ordem-clausulas',
      front: 'Em que ordem se escrevem as cláusulas de uma consulta?',
      back: '`SELECT`, `FROM`, `WHERE`, `GROUP BY`, `HAVING`, `ORDER BY`, `LIMIT`.',
    },
    {
      id: 'and-or',
      front: 'Num `WHERE`, quem é resolvido primeiro: `AND` ou `OR`?',
      back: 'O `AND`. Use parênteses para deixar a intenção explícita.',
    },
  ],
  mission: {
    title: 'Investigue um banco de laboratório',
    text: 'Instale um banco de verdade e faça perguntas a dados que você mesmo montou. Se você está na trilha de Testes, use as consultas para conferir dados de um sistema de exemplo; se está em Backend ou Dados, use para responder perguntas de negócio.',
    steps: [
      'Instale o PostgreSQL (ou use o DB Browser for SQLite, mais simples) e crie uma tabela parecida com a de pedidos desta aula',
      'Insira pelo menos 20 linhas com cidades, categorias e alguns valores nulos',
      'Escreva cinco perguntas de negócio em português e responda cada uma com uma consulta',
      'Para uma das respostas, calcule à mão (ou numa planilha) e confira se bate com o resultado do SQL',
      'Peça a uma IA uma consulta para uma das perguntas e compare com a sua: mesmo resultado? Qual é mais fácil de ler?',
    ],
  },
  sources: [
    {
      title: 'PostgreSQL: consultando uma tabela (tutorial oficial)',
      url: 'https://www.postgresql.org/docs/current/tutorial-select.html',
    },
    {
      title: 'PostgreSQL: funções de agregação',
      url: 'https://www.postgresql.org/docs/current/tutorial-agg.html',
    },
    {
      title: 'SQLite: o comando SELECT',
      url: 'https://www.sqlite.org/lang_select.html',
    },
  ],
};
