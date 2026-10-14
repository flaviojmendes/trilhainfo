import { LessonContent } from '../types';

const padaria = `CREATE TABLE produtos (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL UNIQUE,
  preco REAL NOT NULL CHECK (preco > 0),
  estoque INTEGER NOT NULL DEFAULT 0
);
INSERT INTO produtos (nome, preco, estoque) VALUES
  ('Pão francês', 0.75, 200),
  ('Café 500g', 18.9, 12),
  ('Bolo de milho', 25.0, 4),
  ('Leite 1L', 5.49, 30);`;

const clientes = `CREATE TABLE clientes (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);
INSERT INTO clientes VALUES
  (1, 'Ana Souza', 'ana@exemplo.com'),
  (2, 'Bruno Lima', 'bruno@exemplo.com'),
  (3, 'Carla Dias', 'carla@exemplo.com'),
  (4, 'Davi Melo', 'davi@exemplo.com');`;

const loja = `${clientes}
CREATE TABLE pedidos (
  id INTEGER PRIMARY KEY,
  cliente_id INTEGER NOT NULL REFERENCES clientes (id),
  valor REAL NOT NULL,
  data TEXT NOT NULL
);
INSERT INTO pedidos VALUES
  (10, 1, 120.0, '2026-10-01'),
  (11, 1, 80.0, '2026-10-03'),
  (12, 2, 45.0, '2026-10-03'),
  (13, 4, 60.0, '2026-10-05');`;

const contas = `CREATE TABLE contas (
  id INTEGER PRIMARY KEY,
  titular TEXT NOT NULL,
  saldo REAL NOT NULL CHECK (saldo >= 0)
);
INSERT INTO contas VALUES (1, 'Ana', 150.0), (2, 'Bruno', 80.0);`;

const columnInfo = (table: string) =>
  `const info = run("PRAGMA table_info(${table})"); const cols = info ? info.rows : [];`;

export const content: LessonContent = {
  hook: 'Na aula anterior você fez perguntas a uma tabela que já existia. Agora você passa para o outro lado: decidir como os dados são guardados. Uma tabela mal desenhada deixa entrar um pedido sem cliente, um e-mail repetido ou um Pix que sai de uma conta e não chega na outra. As regras que você aprende aqui são as que protegem o dinheiro e os dados de quem usa o sistema, e são assunto certo em entrevista de backend e de dados.',
  sections: [
    {
      id: 'criando-tabelas',
      title: 'Criar uma tabela com regras',
      blocks: [
        {
          type: 'analogy',
          title: 'O formulário do cartório',
          text: 'Um formulário de cartório não aceita qualquer coisa: o CPF tem campo próprio e não pode repetir, a data de nascimento é obrigatória, e cada documento ganha um número de protocolo único. Uma tabela bem criada é esse formulário: as regras ficam **no banco**, então nenhum programa com bug consegue gravar um dado impossível.',
        },
        {
          type: 'anatomy',
          caption: 'Um CREATE TABLE com as regras mais usadas',
          language: 'sql',
          parts: [
            { text: 'CREATE TABLE produtos (\n  ' },
            {
              text: 'id INTEGER PRIMARY KEY',
              label: 'Chave primária',
              note: 'A **PRIMARY KEY** identifica cada linha de forma única, como o número de protocolo. Nunca se repete e nunca é nula. No SQLite, `INTEGER PRIMARY KEY` é preenchida sozinha com o próximo número.',
            },
            { text: ',\n  ' },
            {
              text: 'nome TEXT NOT NULL',
              label: 'NOT NULL',
              note: 'Campo obrigatório. Uma tentativa de gravar um produto sem nome é recusada com erro.',
            },
            { text: ',\n  ' },
            {
              text: 'preco REAL NOT NULL CHECK (preco > 0)',
              label: 'Tipo e CHECK',
              note: 'O **tipo** diz que tipo de valor a coluna guarda. O `CHECK` acrescenta uma regra de negócio: preço precisa ser positivo.',
            },
            { text: ',\n  ' },
            {
              text: 'codigo TEXT UNIQUE',
              label: 'UNIQUE',
              note: 'Não aceita dois produtos com o mesmo código de barras. Diferente da chave primária, uma coluna `UNIQUE` pode ficar vazia (`NULL`).',
            },
            { text: ',\n  ' },
            {
              text: 'estoque INTEGER NOT NULL DEFAULT 0',
              label: 'DEFAULT',
              note: 'Se ninguém informar o estoque, o banco grava `0`.',
            },
            { text: '\n);' },
          ],
        },
        {
          type: 'table',
          caption: 'Tipos de coluna mais comuns',
          head: ['Para guardar', 'SQLite', 'PostgreSQL'],
          rows: [
            ['números inteiros', '`INTEGER`', '`INTEGER`, `BIGINT`'],
            ['dinheiro', '`REAL` ou centavos em `INTEGER`', '`NUMERIC(10, 2)`'],
            ['textos', '`TEXT`', '`TEXT`, `VARCHAR(100)`'],
            ['datas', '`TEXT` no formato `2026-10-14`', '`DATE`, `TIMESTAMP`'],
            ['sim ou não', '`INTEGER` com 0 ou 1', '`BOOLEAN`'],
            [
              'id automático',
              '`INTEGER PRIMARY KEY`',
              '`GENERATED ALWAYS AS IDENTITY` ou `SERIAL`',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dinheiro não combina com REAL',
          text: 'Tipos como `REAL` e `FLOAT` guardam aproximações: `0.1 + 0.2` vira `0.30000000000000004`. Para valores pequenos de exemplo tudo bem, mas num sistema de pagamento use `NUMERIC(10, 2)` no PostgreSQL ou guarde centavos como inteiro.',
        },
        {
          type: 'sql',
          title: 'A tabela de produtos',
          task: 'Complete o `CREATE TABLE`: `nome` e `preco` devem ser obrigatórios, e `codigo` não pode se repetir entre produtos.',
          setup: '-- banco vazio: a tabela é você que cria',
          query:
            'CREATE TABLE produtos (\n  id INTEGER PRIMARY KEY,\n  nome TEXT,\n  preco REAL,\n  codigo TEXT\n);',
          solution:
            'CREATE TABLE produtos (\n  id INTEGER PRIMARY KEY,\n  nome TEXT NOT NULL,\n  preco REAL NOT NULL,\n  codigo TEXT UNIQUE\n);',
          checks: [
            {
              label: 'A tabela produtos tem as colunas id, nome, preco e codigo',
              test: `${columnInfo(
                'produtos',
              )} return ['id', 'nome', 'preco', 'codigo'].every((n) => cols.some((c) => c[1] === n));`,
            },
            {
              label: 'id é a chave primária',
              test: `${columnInfo(
                'produtos',
              )} return cols.some((c) => c[1] === 'id' && c[5] === 1);`,
            },
            {
              label: 'nome e preco são obrigatórios (NOT NULL)',
              test: `${columnInfo(
                'produtos',
              )} return ['nome', 'preco'].every((n) => cols.some((c) => c[1] === n && c[3] === 1));`,
            },
            {
              label: 'Dois produtos com o mesmo código são recusados (UNIQUE)',
              test: "try { run(\"INSERT INTO produtos (nome, preco, codigo) VALUES ('Pão', 1, '789')\"); run(\"INSERT INTO produtos (nome, preco, codigo) VALUES ('Bolo', 2, '789')\"); return false; } catch (e) { return /UNIQUE/.test(String(e)); }",
            },
          ],
        },
      ],
    },
    {
      id: 'inserir-alterar-apagar',
      title: 'Inserir, alterar e apagar linhas',
      blocks: [
        {
          type: 'text',
          text: 'Três comandos mudam os dados: `INSERT` acrescenta linhas, `UPDATE` altera valores de linhas que já existem e `DELETE` apaga linhas. Junto com o `SELECT`, formam o famoso **CRUD**: criar, ler, atualizar e apagar.',
        },
        {
          type: 'code',
          language: 'sql',
          caption: 'Os três comandos de escrita',
          code: "INSERT INTO produtos (nome, preco, estoque)\nVALUES ('Sonho', 4.5, 20);\n\nUPDATE produtos\nSET estoque = estoque - 1\nWHERE nome = 'Sonho';\n\nDELETE FROM produtos\nWHERE estoque = 0;",
        },
        {
          type: 'sql',
          title: 'Produto novo na vitrine',
          task: 'Cadastre o produto `Pão de queijo`, com preço `1.5` e estoque `80`. A consulta inicial esquece o estoque: veja o que o banco grava quando falta um valor.',
          setup: padaria,
          query:
            "INSERT INTO produtos (nome, preco)\nVALUES ('Pão de queijo', 1.5);\n\nSELECT * FROM produtos;",
          solution:
            "INSERT INTO produtos (nome, preco, estoque)\nVALUES ('Pão de queijo', 1.5, 80);\n\nSELECT * FROM produtos;",
          checks: [
            {
              label: 'O Pão de queijo existe com preço 1.5 e estoque 80',
              test: 'const r = run("SELECT preco, estoque FROM produtos WHERE nome = \'Pão de queijo\'"); return !!r && r.rows.length === 1 && Math.abs(r.rows[0][0] - 1.5) < 0.001 && r.rows[0][1] === 80;',
            },
            {
              label: 'Os quatro produtos antigos continuam lá',
              test: 'const r = run("SELECT COUNT(*) FROM produtos"); return !!r && r.rows[0][0] === 5;',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'UPDATE e DELETE sem WHERE',
          text: 'O `WHERE` é o que diz **quais** linhas mudam. Sem ele, `UPDATE produtos SET preco = 21.9` muda o preço de **todos** os produtos, e `DELETE FROM produtos` apaga a tabela inteira. Não existe “desfazer”. Hábito profissional: escreva primeiro um `SELECT` com o mesmo `WHERE`, confira as linhas, e só então troque pelo `UPDATE` ou `DELETE`.',
        },
        {
          type: 'sql',
          title: 'O reajuste que saiu do controle',
          task: 'O café subiu para `21.9` e o bolo de milho saiu do cardápio. A consulta inicial tem o erro mais perigoso do SQL: rode, veja o estrago, e corrija para mudar **só** o café. Depois, apague o `Bolo de milho`.',
          setup: padaria,
          query: 'UPDATE produtos SET preco = 21.9;\n\nSELECT * FROM produtos;',
          solution:
            "UPDATE produtos SET preco = 21.9 WHERE nome = 'Café 500g';\nDELETE FROM produtos WHERE nome = 'Bolo de milho';\n\nSELECT * FROM produtos;",
          checks: [
            {
              label: 'O café custa 21.9',
              test: 'const r = run("SELECT preco FROM produtos WHERE nome = \'Café 500g\'"); return !!r && Math.abs(r.rows[0][0] - 21.9) < 0.001;',
            },
            {
              label: 'O pão e o leite mantêm os preços antigos',
              test: "const r = run(\"SELECT nome, preco FROM produtos WHERE nome IN ('Pão francês', 'Leite 1L') ORDER BY nome\"); return !!r && r.rows.length === 2 && Math.abs(r.rows[0][1] - 5.49) < 0.001 && Math.abs(r.rows[1][1] - 0.75) < 0.001;",
            },
            {
              label: 'O bolo de milho foi apagado e sobraram 3 produtos',
              test: 'const r = run("SELECT COUNT(*), SUM(nome = \'Bolo de milho\') FROM produtos"); return !!r && r.rows[0][0] === 3 && !r.rows[0][1];',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Uma pessoa precisa desativar o cliente de id 42 e roda `UPDATE clientes SET ativo = 0;`. O banco responde “15.320 linhas alteradas”. O que aconteceu?',
          options: [
            {
              text: 'Faltou o `WHERE id = 42`, então todos os clientes foram desativados',
              correct: true,
              feedback:
                'Exato. Sem `WHERE`, o comando vale para a tabela inteira. O número de linhas alteradas é o alarme: se ele for maior que o esperado, algo está errado. Uma transação, que você verá no fim da aula, permitiria desfazer.',
            },
            {
              text: 'O banco desativou só o cliente 42 e contou as linhas que leu',
              feedback:
                'O banco informa quantas linhas **alterou**. 15.320 linhas alteradas significa 15.320 clientes desativados.',
            },
            {
              text: 'Nada, porque o banco pede confirmação antes de alterar várias linhas',
              feedback:
                'O banco não pede confirmação: ele faz exatamente o que foi escrito. Algumas ferramentas gráficas avisam, mas não conte com isso.',
            },
          ],
        },
      ],
    },
    {
      id: 'chaves-estrangeiras',
      title: 'Relacionar tabelas com chaves estrangeiras',
      blocks: [
        {
          type: 'text',
          text: 'Imagine guardar pedidos numa tabela só, repetindo nome, e-mail e telefone da cliente em cada pedido. Se a Ana trocar de e-mail, você precisa alterar 30 linhas, e se esquecer uma, o sistema passa a ter duas Anas. Separar os dados em tabelas que se apontam resolve isso. Essa organização tem nome: **normalização**.',
        },
        {
          type: 'codeTabs',
          caption: 'Da planilha repetida para duas tabelas',
          tabs: [
            {
              label: 'Tudo junto (repetido)',
              language: 'text',
              code: 'pedido | cliente   | email           | valor\n10     | Ana Souza | ana@exemplo.com | 120.00\n11     | Ana Souza | ana@exemplo.com |  80.00\n12     | Bruno     | bruno@exemplo...|  45.00',
            },
            {
              label: 'Normalizado',
              language: 'text',
              code: 'clientes                         pedidos\nid | nome      | email           id | cliente_id | valor\n1  | Ana Souza | ana@exemplo.com 10 | 1          | 120.00\n2  | Bruno     | bruno@exemplo   11 | 1          |  80.00\n                                 12 | 2          |  45.00',
            },
          ],
        },
        {
          type: 'analogy',
          title: 'O número do cartão do SUS',
          text: 'O prontuário de um atendimento não copia todo o seu cadastro: ele anota o número do seu cartão do SUS, e quem precisar dos seus dados vai ao cadastro buscá-los. A coluna `cliente_id` faz o mesmo: guarda o número do cliente. Uma **chave estrangeira** (FOREIGN KEY) é a regra que garante que esse número existe de verdade na outra tabela.',
        },
        {
          type: 'sql',
          title: 'Pedidos que apontam para clientes',
          task: 'A tabela `clientes` já existe. Crie `pedidos` de forma que `cliente_id` seja obrigatório e uma chave estrangeira para `clientes (id)`, usando `REFERENCES`.',
          setup: clientes,
          query:
            'CREATE TABLE pedidos (\n  id INTEGER PRIMARY KEY,\n  cliente_id INTEGER,\n  valor REAL NOT NULL,\n  data TEXT NOT NULL\n);',
          solution:
            'CREATE TABLE pedidos (\n  id INTEGER PRIMARY KEY,\n  cliente_id INTEGER NOT NULL REFERENCES clientes (id),\n  valor REAL NOT NULL,\n  data TEXT NOT NULL\n);',
          checks: [
            {
              label: 'cliente_id é uma chave estrangeira para clientes',
              test: "const r = run('PRAGMA foreign_key_list(pedidos)'); return !!r && r.rows.some((f) => f[2] === 'clientes' && f[3] === 'cliente_id');",
            },
            {
              label: 'cliente_id é obrigatório',
              test: `${columnInfo(
                'pedidos',
              )} return cols.some((c) => c[1] === 'cliente_id' && c[3] === 1);`,
            },
            {
              label: 'Um pedido de cliente inexistente é recusado',
              test: 'try { run("INSERT INTO pedidos (cliente_id, valor, data) VALUES (99, 50, \'2026-10-01\')"); return false; } catch (e) { return /FOREIGN KEY/.test(String(e)); }',
            },
          ],
        },
        {
          type: 'classify',
          prompt:
            'Num sistema de delivery, cada informação deve ficar na tabela de clientes ou na tabela de pedidos?',
          buckets: ['clientes', 'pedidos'],
          items: [
            { text: 'E-mail', bucket: 0 },
            { text: 'Data de nascimento', bucket: 0 },
            { text: 'Valor total', bucket: 1 },
            { text: 'Data e hora da compra', bucket: 1 },
            { text: 'Telefone', bucket: 0 },
            { text: 'Status da entrega', bucket: 1 },
          ],
          explanation:
            'Pergunte: essa informação é da pessoa (não muda a cada compra) ou da compra? O que é da pessoa fica em `clientes`, uma vez só. O pedido guarda apenas `cliente_id` para saber de quem é.',
        },
      ],
    },
    {
      id: 'juntando-tabelas',
      title: 'Juntar tabelas com JOIN',
      blocks: [
        {
          type: 'text',
          text: 'Separar em tabelas evita repetição, mas a pergunta “quem fez cada pedido?” precisa dos dois lados. O `JOIN` junta as tabelas na hora da consulta, casando as linhas pela condição do `ON`, normalmente a chave estrangeira com a chave primária.',
        },
        {
          type: 'flow',
          caption: 'Como o banco monta cada linha de um INNER JOIN',
          actors: ['pedidos', 'clientes', 'Resultado'],
          steps: [
            {
              from: 0,
              to: 1,
              label: 'pedido 10: cliente_id 1',
              text: 'O banco pega um pedido e procura em `clientes` a linha cujo `id` é igual ao `cliente_id` dele.',
            },
            {
              from: 1,
              to: 2,
              label: 'Ana Souza + 120.00',
              text: 'Achou: a cliente 1 é a Ana. As colunas das duas linhas viram uma linha só no resultado.',
              tone: 'ok',
            },
            {
              from: 0,
              to: 1,
              label: 'pedido 13: cliente_id 4',
              text: 'Mesmo processo para cada pedido. A cliente 4 é o Davi.',
            },
            {
              from: 1,
              to: 2,
              label: 'Davi Melo + 60.00',
              text: 'Mais uma linha no resultado.',
              tone: 'ok',
            },
            {
              from: 1,
              to: 1,
              label: 'Carla: nenhum pedido',
              text: 'A Carla não aparece em nenhum `cliente_id`. No **INNER JOIN**, quem não tem par fica de fora. No **LEFT JOIN**, ela entraria com as colunas de pedido em `NULL`.',
              tone: 'error',
            },
          ],
        },
        {
          type: 'joins',
          tables: ['clientes', 'pedidos'],
          items: [
            {
              kind: 'inner',
              title: 'INNER JOIN',
              text: 'Só as linhas que **têm par nas duas tabelas**. A Carla, sem pedidos, fica de fora.',
              sql: 'SELECT c.nome, p.id AS pedido, p.valor\nFROM clientes c\nINNER JOIN pedidos p ON p.cliente_id = c.id;',
              result:
                'nome       | pedido | valor\nAna Souza  |     10 |   120\nAna Souza  |     11 |    80\nBruno Lima |     12 |    45\nDavi Melo  |     13 |    60',
            },
            {
              kind: 'left',
              title: 'LEFT JOIN',
              text: '**Todas as linhas da tabela da esquerda** (a do `FROM`), com par ou não. Sem par, as colunas da direita vêm `NULL`.',
              sql: 'SELECT c.nome, p.id AS pedido, p.valor\nFROM clientes c\nLEFT JOIN pedidos p ON p.cliente_id = c.id;',
              result:
                'nome       | pedido | valor\nAna Souza  |     10 |   120\nAna Souza  |     11 |    80\nBruno Lima |     12 |    45\nCarla Dias |   NULL |  NULL\nDavi Melo  |     13 |    60',
            },
          ],
        },
        {
          type: 'sql',
          title: 'Quem fez cada pedido?',
          task: 'A consulta mostra só o número do cliente. Junte com `clientes` para mostrar o `id` do pedido, o **nome** do cliente e o `valor`. Dica: `c.nome` quer dizer “a coluna nome da tabela apelidada de c”.',
          setup: loja,
          query: 'SELECT id, cliente_id, valor\nFROM pedidos;',
          solution:
            'SELECT p.id, c.nome, p.valor\nFROM pedidos p\nINNER JOIN clientes c ON c.id = p.cliente_id;',
          checks: [
            {
              label: 'Mostra os 4 pedidos',
              test: 'return !!result && result.rows.length === 4;',
            },
            {
              label: 'Mostra o nome dos clientes',
              test: "return !!result && result.rows.some((r) => r.includes('Ana Souza')) && result.rows.some((r) => r.includes('Davi Melo'));",
            },
          ],
        },
        {
          type: 'sql',
          title: 'Pedidos por cliente, inclusive zero',
          task: 'O time de marketing quer **todos** os clientes com a quantidade de pedidos de cada um, para mandar um cupom a quem nunca comprou. A consulta inicial esquece a Carla. Troque o tipo de JOIN e confira se a Carla aparece com 0.',
          setup: loja,
          query:
            'SELECT c.nome, COUNT(*) AS pedidos\nFROM clientes c\nINNER JOIN pedidos p ON p.cliente_id = c.id\nGROUP BY c.id, c.nome;',
          solution:
            'SELECT c.nome, COUNT(p.id) AS pedidos\nFROM clientes c\nLEFT JOIN pedidos p ON p.cliente_id = c.id\nGROUP BY c.id, c.nome;',
          checks: [
            {
              label: 'Mostra os 4 clientes',
              test: 'return !!result && result.rows.length === 4;',
            },
            {
              label: 'Carla Dias aparece com 0 pedidos',
              test: "return !!result && result.rows.some((r) => r.includes('Carla Dias') && r.includes(0));",
            },
            {
              label: 'Ana Souza aparece com 2 pedidos',
              test: "return !!result && result.rows.some((r) => r.includes('Ana Souza') && r.includes(2));",
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'A armadilha do COUNT(*) no LEFT JOIN',
          text: 'Com `LEFT JOIN`, a Carla vira uma linha com as colunas de pedido em `NULL`. `COUNT(*)` conta essa linha e diz que ela tem **1** pedido. `COUNT(p.id)` conta só valores não nulos e devolve o correto: 0.',
        },
      ],
    },
    {
      id: 'indices-e-transacoes',
      title: 'Índices para buscar rápido, transações para não perder dinheiro',
      blocks: [
        {
          type: 'analogy',
          title: 'O índice remissivo do livro',
          text: 'Para achar “fotossíntese” num livro de biologia, você não lê as 400 páginas: vai ao índice no fim, que diz “página 132”. Um **índice** de banco de dados é isso: uma estrutura extra, mantida pelo banco, que aponta direto para as linhas com um certo valor. Sem ele, o banco lê a tabela inteira, o que se chama **varredura** (scan).',
        },
        {
          type: 'text',
          text: 'Índices aceleram leituras, mas custam espaço e deixam cada `INSERT` e `UPDATE` um pouco mais lento, porque o índice também precisa ser atualizado. Crie índices para colunas muito usadas em `WHERE` e `JOIN`, como chaves estrangeiras. Para ver se o banco usa um índice, peça o **plano da consulta**: `EXPLAIN QUERY PLAN` no SQLite, `EXPLAIN` no PostgreSQL.',
        },
        {
          type: 'sql',
          title: 'Do scan ao índice',
          task: 'Rode e leia a coluna `detail`: `SCAN pedidos` quer dizer que o banco leu tudo. Antes do `EXPLAIN`, crie um índice na coluna `cliente_id` com `CREATE INDEX nome_do_indice ON pedidos (cliente_id);` e rode de novo.',
          setup: loja,
          query: 'EXPLAIN QUERY PLAN\nSELECT * FROM pedidos WHERE cliente_id = 2;',
          solution:
            'CREATE INDEX idx_pedidos_cliente ON pedidos (cliente_id);\n\nEXPLAIN QUERY PLAN\nSELECT * FROM pedidos WHERE cliente_id = 2;',
          checks: [
            {
              label: 'Existe um índice na coluna cliente_id',
              test: "const l = run('PRAGMA index_list(pedidos)'); if (!l) return false; return l.rows.some((i) => { const info = run('PRAGMA index_info(\"' + i[1] + '\")'); return !!info && info.rows.some((c) => c[2] === 'cliente_id'); });",
            },
            {
              label: 'O plano mostra a busca usando o índice',
              test: "return !!result && result.rows.some((r) => String(r[r.length - 1]).includes('USING INDEX'));",
            },
          ],
        },
        {
          type: 'text',
          text: 'Agora pense num Pix de R$ 50 da Ana para o Bruno. São dois comandos: tirar da Ana e pôr no Bruno. Se o sistema cair entre os dois, o dinheiro some. Uma **transação** agrupa comandos para que **todos aconteçam ou nenhum aconteça**: `BEGIN` abre, `COMMIT` confirma tudo, `ROLLBACK` desfaz tudo desde o `BEGIN`.',
        },
        {
          type: 'sequence',
          caption: 'Uma transferência dentro de uma transação',
          actors: ['Aplicação', 'Banco de dados'],
          messages: [
            { from: 0, to: 1, label: 'BEGIN', text: 'Daqui em diante, nada é definitivo.' },
            {
              from: 0,
              to: 1,
              label: 'UPDATE saldo da Ana - 50',
              text: 'Outras conexões ainda veem o saldo antigo da Ana.',
            },
            {
              from: 0,
              to: 1,
              label: 'UPDATE saldo do Bruno + 50',
              text: 'As duas mudanças estão preparadas, mas não confirmadas.',
            },
            {
              from: 0,
              to: 1,
              label: 'COMMIT',
              text: 'As duas mudanças passam a valer juntas. Se algo tivesse falhado antes, um ROLLBACK desfaria tudo.',
              tone: 'ok',
            },
          ],
        },
        {
          type: 'sql',
          title: 'Um Pix que não some no caminho',
          task: 'A consulta inicial só tira o dinheiro da Ana. Faça a transferência completa de 50 da Ana para o Bruno, dentro de uma transação com `BEGIN;` e `COMMIT;`.',
          setup: contas,
          query:
            "UPDATE contas SET saldo = saldo - 50 WHERE titular = 'Ana';\n\nSELECT * FROM contas;",
          solution:
            "BEGIN;\nUPDATE contas SET saldo = saldo - 50 WHERE titular = 'Ana';\nUPDATE contas SET saldo = saldo + 50 WHERE titular = 'Bruno';\nCOMMIT;\n\nSELECT * FROM contas;",
          checks: [
            {
              label: 'Ana fica com 100 e Bruno com 130',
              test: "const r = run('SELECT titular, saldo FROM contas ORDER BY id'); return !!r && r.rows[0][1] === 100 && r.rows[1][1] === 130;",
            },
            {
              label: 'O total de dinheiro continua 230',
              test: "const r = run('SELECT SUM(saldo) FROM contas'); return !!r && r.rows[0][0] === 230;",
            },
            {
              label: 'Usa BEGIN e COMMIT',
              test: 'return /\\bBEGIN\\b/i.test(query) && /\\bCOMMIT\\b/i.test(query);',
            },
          ],
        },
        {
          type: 'reveal',
          question:
            'A Ana tem R$ 100 e tenta mandar R$ 300. A tabela tem `CHECK (saldo >= 0)`. Dentro de uma transação, o primeiro `UPDATE` falha. O que a aplicação deve fazer, e por que a regra no banco ajuda?',
          answer:
            'Mandar `ROLLBACK`, desfazendo qualquer coisa feita desde o `BEGIN`, e avisar a pessoa que o saldo é insuficiente. O `CHECK` garante que, mesmo se a aplicação tiver um bug e esquecer de conferir o saldo, o banco recusa deixar a conta negativa.',
        },
        {
          type: 'quiz',
          question:
            'Uma consulta que busca pedidos por `cliente_id` ficou lenta depois que a tabela passou de 5 milhões de linhas. O que você investiga primeiro?',
          options: [
            {
              text: 'O plano da consulta, para ver se há um índice em `cliente_id` ou se o banco faz scan',
              correct: true,
              feedback:
                'Isso. O `EXPLAIN` mostra o que o banco realmente faz. Um scan numa tabela grande é a causa mais comum, e um índice na coluna do filtro costuma resolver.',
            },
            {
              text: 'Criar índices em todas as colunas da tabela, por garantia',
              feedback:
                'Cada índice custa espaço e deixa as escritas mais lentas. Índices são escolhidos a partir das consultas reais, olhando o plano.',
            },
            {
              text: 'Trocar o banco por outro mais rápido',
              feedback:
                'Bancos relacionais lidam bem com bilhões de linhas quando bem indexados. Antes de trocar a ferramenta, entenda o que a consulta está fazendo.',
            },
          ],
        },
      ],
    },
  ],
  recap: [
    '`CREATE TABLE` define colunas, tipos e regras: `PRIMARY KEY` identifica cada linha, `NOT NULL` torna obrigatório, `UNIQUE` proíbe repetidos e `CHECK` valida regras de negócio.',
    '`INSERT`, `UPDATE` e `DELETE` mudam os dados; `UPDATE` e `DELETE` sem `WHERE` atingem a tabela inteira.',
    'Normalizar é guardar cada informação num lugar só; uma `FOREIGN KEY` liga as tabelas e impede referências a registros que não existem.',
    '`INNER JOIN` traz só as linhas com par nas duas tabelas; `LEFT JOIN` mantém todas as da esquerda, com `NULL` onde não há par.',
    'Índices aceleram buscas ao custo de escritas mais lentas; transações com `BEGIN`, `COMMIT` e `ROLLBACK` garantem que um grupo de mudanças acontece por inteiro ou não acontece.',
  ],
  cards: [
    {
      id: 'primary-key',
      front: 'O que é uma chave primária?',
      back: 'A coluna que identifica cada linha de forma única: nunca repete e nunca é nula.',
    },
    {
      id: 'foreign-key',
      front: 'Para que serve uma chave estrangeira?',
      back: 'Para garantir que um valor, como `cliente_id`, aponta para uma linha que existe em outra tabela.',
    },
    {
      id: 'update-sem-where',
      front: 'O que acontece com `UPDATE produtos SET preco = 10;`?',
      back: 'Todos os produtos passam a custar 10. Sem `WHERE`, o comando vale para a tabela inteira.',
    },
    {
      id: 'inner-left',
      front: 'Qual a diferença entre `INNER JOIN` e `LEFT JOIN`?',
      back: '`INNER` traz só linhas com par nas duas tabelas; `LEFT` traz todas as da esquerda, com `NULL` onde não há par.',
    },
    {
      id: 'count-left-join',
      front: 'Num `LEFT JOIN`, por que usar `COUNT(p.id)` em vez de `COUNT(*)`?',
      back: 'Porque `COUNT(*)` conta a linha com `NULL` como 1; `COUNT(p.id)` ignora nulos e devolve 0 para quem não tem pedidos.',
    },
    {
      id: 'indice-custo',
      front: 'Qual o custo de criar um índice?',
      back: 'Espaço extra e escritas (`INSERT`, `UPDATE`) um pouco mais lentas.',
    },
    {
      id: 'transacao',
      front: 'O que garantem `BEGIN`, `COMMIT` e `ROLLBACK`?',
      back: 'Que um grupo de comandos acontece por inteiro (`COMMIT`) ou é todo desfeito (`ROLLBACK`).',
    },
    {
      id: 'normalizacao',
      front: 'O que é normalizar um banco, em uma frase?',
      back: 'Guardar cada informação num lugar só e ligar as tabelas por chaves, em vez de repetir dados.',
    },
  ],
  mission: {
    title: 'Modele usuários e pedidos no PostgreSQL',
    text: 'Monte um banco pequeno de verdade, com as regras desta aula, e prove que elas funcionam tentando quebrá-las.',
    steps: [
      'Instale o PostgreSQL (ou rode com Docker) e crie as tabelas `clientes` e `pedidos` com chave primária, `NOT NULL`, `UNIQUE` no e-mail e chave estrangeira em `cliente_id`, usando `NUMERIC(10, 2)` para valores',
      'Insira dados e tente gravar um e-mail repetido e um pedido de cliente inexistente; anote as mensagens de erro',
      'Escreva uma consulta com `LEFT JOIN` que mostre cada cliente com a quantidade e o total de pedidos, e confira à mão para dois clientes',
      'Execute uma transação com `BEGIN`, faça um `UPDATE` errado de propósito, rode `ROLLBACK` e verifique que nada mudou',
      'Compare o `EXPLAIN` de uma busca por `cliente_id` antes e depois de criar um índice (com poucas linhas, o PostgreSQL pode preferir o scan; insira alguns milhares com `generate_series`)',
    ],
  },
  sources: [
    {
      title: 'PostgreSQL: restrições (constraints)',
      url: 'https://www.postgresql.org/docs/current/ddl-constraints.html',
    },
    {
      title: 'PostgreSQL: junções entre tabelas',
      url: 'https://www.postgresql.org/docs/current/tutorial-join.html',
    },
    {
      title: 'PostgreSQL: transações',
      url: 'https://www.postgresql.org/docs/current/tutorial-transactions.html',
    },
    {
      title: 'PostgreSQL: introdução a índices',
      url: 'https://www.postgresql.org/docs/current/indexes-intro.html',
    },
  ],
};
