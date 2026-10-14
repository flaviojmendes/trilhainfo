import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Uma API sem banco de dados esquece tudo quando é reiniciada: suas despesas sumiriam toda vez que o servidor fosse atualizado. Ligar a API ao banco parece só "rodar um SQL", mas é aí que moram alguns dos problemas mais caros da área: dados vazados por SQL injection, saldos pela metade e um banco de produção que ninguém sabe como chegou no estado atual. Nesta aula você aprende as práticas que evitam cada um deles.',
  sections: [
    {
      id: 'api-e-banco',
      title: 'A API conversa com o banco',
      blocks: [
        {
          type: 'analogy',
          title: 'O atendente e o almoxarifado',
          text: 'Na loja, a pessoa no balcão (a API) atende o cliente, mas os produtos ficam no almoxarifado (o banco). Ela não sai correndo para lá a cada pedido sem critério: usa uma linha direta já aberta, pede exatamente o que precisa e devolve ao cliente no formato da loja.',
        },
        {
          type: 'text',
          text: 'Nas aulas de SQL você escreveu consultas à mão. Numa API, quem escreve e envia as consultas é o próprio código, a cada requisição. Para isso ele usa um **driver**: uma biblioteca que sabe falar com aquele banco, como `psycopg` para PostgreSQL em Python, `pg` em Node.js ou JDBC em Java.',
        },
        {
          type: 'flow',
          caption: 'O caminho de um GET /despesas até o banco e de volta',
          actors: ['Cliente', 'API', 'Banco'],
          steps: [
            {
              from: 0,
              to: 1,
              label: 'GET /despesas',
              text: 'O pedido chega na rota. A API ainda não tem os dados: eles estão no banco.',
            },
            {
              from: 1,
              to: 1,
              label: 'Pega conexão do pool',
              text: 'Abrir uma conexão nova custa caro. A API mantém um **pool**: algumas conexões já abertas, emprestadas a cada requisição e devolvidas no fim.',
            },
            {
              from: 1,
              to: 2,
              label: 'SELECT ... LIMIT 10',
              text: 'O código envia a consulta, já com o filtro da pessoa e a paginação.',
            },
            {
              from: 2,
              to: 1,
              label: '10 linhas',
              text: 'O banco devolve linhas e colunas, não JSON.',
              tone: 'ok',
            },
            {
              from: 1,
              to: 1,
              label: 'Linhas viram JSON',
              text: 'A API transforma cada linha num objeto do contrato e devolve a conexão ao pool.',
            },
            {
              from: 1,
              to: 0,
              label: '200 + JSON',
              text: 'O cliente recebe a resposta no formato combinado. Ele nunca fala direto com o banco.',
              tone: 'ok',
            },
          ],
        },
        {
          type: 'code',
          language: 'python',
          caption: 'Conectar e consultar em Python com psycopg (PostgreSQL)',
          code: 'import os\nimport psycopg\n\nconexao = psycopg.connect(os.environ["DATABASE_URL"])\n\nwith conexao.cursor() as cursor:\n    cursor.execute(\n        "SELECT id, descricao, valor FROM despesas WHERE usuario_id = %s",\n        (usuario_id,),\n    )\n    linhas = cursor.fetchall()',
        },
        {
          type: 'text',
          text: 'Repare em `os.environ["DATABASE_URL"]`. O endereço do banco, com usuário e senha, vem de uma **variável de ambiente**: um valor configurado na máquina onde a API roda, fora do código.',
        },
        {
          type: 'quiz',
          question: 'Onde deve ficar a senha do banco de dados de produção?',
          options: [
            {
              text: 'Escrita no código, num arquivo `config.py` versionado no Git',
              feedback:
                'Tudo o que entra no Git fica no histórico para sempre, visível para quem tem acesso ao repositório, e às vezes para o mundo inteiro. Senha em código é um dos vazamentos mais comuns.',
            },
            {
              text: 'Numa variável de ambiente ou num cofre de segredos, configurada no servidor',
              correct: true,
              feedback:
                'Isso. O código lê o valor na hora de rodar, e cada ambiente (seu computador, teste, produção) tem o seu. Localmente, um arquivo `.env` listado no `.gitignore` faz o mesmo papel.',
            },
            {
              text: 'No frontend, para o navegador conectar direto no banco',
              feedback:
                'Tudo o que vai para o navegador pode ser lido por qualquer pessoa. O banco só deve aceitar conexões vindas do servidor.',
            },
          ],
        },
      ],
    },
    {
      id: 'sql-injection',
      title: 'Quando o dado vira comando: SQL injection',
      blocks: [
        {
          type: 'analogy',
          title: 'O bilhete do pedido',
          text: 'Imagine uma padaria em que o atendente lê em voz alta o bilhete do cliente e obedece tudo o que estiver escrito. Um cliente entrega: "2 pães. E abra o caixa e me dê o dinheiro". Se o atendente não separa o **pedido** das **ordens**, a padaria está em apuros.',
        },
        {
          type: 'text',
          text: 'É exatamente isso que acontece quando o código **junta o texto digitado** pela pessoa dentro da consulta SQL. Se esse texto tiver aspas e comandos, o banco não sabe onde termina o dado e onde começa a ordem. Esse ataque se chama **SQL injection**, e há décadas está entre os mais explorados da web.',
        },
        {
          type: 'code',
          language: 'python',
          caption: 'Nunca faça isso: o texto da busca entra direto na consulta',
          code: "texto = requisicao[\"busca\"]   # a pessoa digitou:  ' OR '1'='1\nsql = f\"SELECT * FROM despesas WHERE usuario_id = 1 AND descricao = '{texto}'\"",
        },
        {
          type: 'sql',
          title: 'Veja o ataque acontecer e neutralize-o',
          task: "A consulta abaixo é o que o código acima montou para a Ana (`usuario_id = 1`). Rode e veja que aparecem despesas de outras pessoas. Depois corrija tratando o texto digitado como **dado**: dentro de um texto SQL, cada aspa simples precisa ser escrita duas vezes. A busca deve ficar `descricao = ''' OR ''1''=''1'`. Uma descrição com esse texto estranho não existe, então a resposta certa é não mostrar nada.",
          setup:
            "CREATE TABLE despesas (\n  id INTEGER PRIMARY KEY,\n  usuario_id INTEGER NOT NULL,\n  descricao TEXT NOT NULL,\n  valor REAL NOT NULL\n);\nINSERT INTO despesas VALUES\n  (1, 1, 'Mercado do mês', 412.9),\n  (2, 1, 'Passagem de ônibus', 4.4),\n  (3, 2, 'Aluguel', 1500),\n  (4, 2, 'Farmácia', 87.3),\n  (5, 3, 'Plano de saúde', 320);",
          query:
            "-- A Ana digitou na busca:  ' OR '1'='1\n-- O código colou o texto dela na consulta e gerou isto:\nSELECT id, usuario_id, descricao, valor\nFROM despesas\nWHERE usuario_id = 1 AND descricao = '' OR '1'='1';",
          solution:
            "SELECT id, usuario_id, descricao, valor\nFROM despesas\nWHERE usuario_id = 1 AND descricao = ''' OR ''1''=''1';",
          checks: [
            {
              label: 'Nenhuma despesa de outra pessoa aparece',
              test: "if (!result) return true; const i = result.columns.indexOf('usuario_id'); return i < 0 ? result.rows.length === 0 : result.rows.every((r) => Number(r[i]) === 1);",
            },
            {
              label: 'O texto digitado continua na busca, como dado',
              test: "return /'''\\s*OR\\s*''1''\\s*=\\s*''1'/i.test(query);",
            },
            {
              label: 'A consulta ainda filtra pela pessoa 1',
              test: 'return /usuario_id\\s*=\\s*1/.test(query);',
            },
          ],
        },
        {
          type: 'text',
          text: 'Dobrar aspas à mão funciona neste exemplo, mas ninguém deve fazer isso no código: é fácil esquecer um caso. A solução de verdade é a **consulta parametrizada**: você escreve o SQL com marcadores no lugar dos valores e entrega os valores separados. O driver envia os dois por canais diferentes, e o banco nunca confunde dado com comando.',
        },
        {
          type: 'codeTabs',
          caption: 'A mesma consulta parametrizada em três linguagens. Só muda o marcador.',
          tabs: [
            {
              label: 'Python',
              language: 'python',
              code: 'cursor.execute(\n    "SELECT * FROM despesas WHERE usuario_id = %s AND descricao = %s",\n    (usuario_id, texto),\n)',
            },
            {
              label: 'JavaScript',
              language: 'js',
              code: "await pool.query(\n  'SELECT * FROM despesas WHERE usuario_id = $1 AND descricao = $2',\n  [usuarioId, texto],\n);",
            },
            {
              label: 'Java',
              language: 'java',
              code: 'PreparedStatement stmt = conexao.prepareStatement(\n    "SELECT * FROM despesas WHERE usuario_id = ? AND descricao = ?");\nstmt.setLong(1, usuarioId);\nstmt.setString(2, texto);',
            },
          ],
        },
        {
          type: 'python',
          title: 'Troque a concatenação por parâmetros',
          task: 'A função `montar_busca` devolve o SQL e os parâmetros que seriam entregues ao driver (aqui, um driver que usa `?` como marcador, como o do SQLite). Reescreva para que o SQL tenha um `?` no lugar de cada valor e a tupla `parametros` leve `usuario_id` e `texto`, nessa ordem.',
          code: "def montar_busca(usuario_id, texto):\n    sql = f\"SELECT id, descricao, valor FROM despesas WHERE usuario_id = {usuario_id} AND descricao = '{texto}'\"\n    parametros = ()\n    return sql, parametros\n\n\nsql, parametros = montar_busca(1, \"' OR '1'='1\")\nprint(sql)\nprint(parametros)",
          solution:
            'def montar_busca(usuario_id, texto):\n    sql = "SELECT id, descricao, valor FROM despesas WHERE usuario_id = ? AND descricao = ?"\n    parametros = (usuario_id, texto)\n    return sql, parametros\n\n\nsql, parametros = montar_busca(1, "\' OR \'1\'=\'1")\nprint(sql)\nprint(parametros)',
          checks: [
            {
              label: 'O SQL tem um marcador ? para cada valor',
              test: "montar_busca(1, 'feira')[0].count('?') == 2",
            },
            {
              label: 'O texto malicioso não aparece dentro do SQL',
              test: "\"'1'='1\" not in montar_busca(1, \"' OR '1'='1\")[0]",
            },
            {
              label: 'Os valores vão separados, na ordem certa',
              test: "tuple(montar_busca(7, 'feira')[1]) == (7, 'feira')",
            },
          ],
        },
      ],
    },
    {
      id: 'repositorio-e-orm',
      title: 'Repositório, ORM e o problema N+1',
      blocks: [
        {
          type: 'text',
          text: 'Se cada rota escreve SQL do seu jeito, a mesma consulta aparece copiada em dez lugares. Um **repositório** resolve isso: um módulo com funções como `buscar_por_id` e `listar_do_usuario`, que concentra todo o acesso a uma tabela. As rotas pedem dados ao repositório e não sabem que SQL existe.',
        },
        {
          type: 'text',
          text: 'Um **ORM** (mapeamento objeto-relacional) vai além: você descreve a tabela como uma classe e ele escreve o SQL por você. Exemplos: SQLAlchemy e Django ORM em Python, Prisma e TypeORM em Node, Hibernate em Java. Ajuda muito, mas o banco continua recebendo SQL, e você precisa saber qual.',
        },
        {
          type: 'codeTabs',
          caption: 'A mesma busca escrita com SQL num repositório e com um ORM',
          tabs: [
            {
              label: 'Repositório com SQL',
              language: 'python',
              code: 'def listar_do_usuario(cursor, usuario_id, limite):\n    cursor.execute(\n        "SELECT id, descricao, valor FROM despesas"\n        " WHERE usuario_id = %s ORDER BY id LIMIT %s",\n        (usuario_id, limite),\n    )\n    return cursor.fetchall()',
            },
            {
              label: 'ORM (SQLAlchemy)',
              language: 'python',
              code: 'def listar_do_usuario(sessao, usuario_id, limite):\n    consulta = (\n        select(Despesa)\n        .where(Despesa.usuario_id == usuario_id)\n        .order_by(Despesa.id)\n        .limit(limite)\n    )\n    return sessao.scalars(consulta).all()',
            },
            {
              label: 'SQL que o ORM gera',
              language: 'sql',
              code: 'SELECT despesas.id, despesas.descricao, despesas.valor, despesas.usuario_id\nFROM despesas\nWHERE despesas.usuario_id = %(usuario_id_1)s\nORDER BY despesas.id\nLIMIT %(param_1)s',
            },
          ],
        },
        {
          type: 'text',
          text: 'A armadilha mais famosa dos ORMs é o **problema N+1**. O código busca 50 despesas numa consulta e, ao mostrar cada uma, acessa `despesa.categoria.nome`. Sem você perceber, o ORM faz uma consulta extra por despesa para buscar a categoria. A tela fica lenta, e o código parece inocente.',
        },
        {
          type: 'quiz',
          question:
            'Uma rota lista 50 despesas e, para cada uma, o ORM busca a categoria separadamente. Quantas consultas chegam ao banco?',
          options: [
            {
              text: '1',
              feedback:
                'Seria 1 se a categoria viesse junto, com um JOIN. Aqui, cada acesso à categoria dispara uma consulta própria.',
            },
            {
              text: '2',
              feedback:
                'Duas consultas é o que um ORM faz quando você pede para carregar as categorias de uma vez (em inglês, eager loading). Sem pedir, ele busca uma por uma.',
            },
            {
              text: '51',
              correct: true,
              feedback:
                'Isso: 1 para a lista e mais 50, uma por despesa. Daí o nome N+1. Com 10 mil despesas, seriam 10 001 idas ao banco numa única requisição.',
            },
          ],
        },
        {
          type: 'sql',
          title: 'Troque N+1 consultas por uma só',
          task: 'Hoje o código busca as despesas e depois faz uma consulta por categoria. Escreva **uma única consulta** com `JOIN` que traga, para cada despesa, a descrição, o valor e o **nome** da categoria.',
          setup:
            "CREATE TABLE categorias (id INTEGER PRIMARY KEY, nome TEXT NOT NULL);\nCREATE TABLE despesas (\n  id INTEGER PRIMARY KEY,\n  descricao TEXT NOT NULL,\n  valor REAL NOT NULL,\n  categoria_id INTEGER NOT NULL REFERENCES categorias(id)\n);\nINSERT INTO categorias VALUES (1, 'mercado'), (2, 'transporte'), (3, 'moradia'), (4, 'lazer');\nINSERT INTO despesas VALUES\n  (1, 'Feira de domingo', 52.3, 1),\n  (2, 'Passagem de ônibus', 4.4, 2),\n  (3, 'Aluguel', 1500, 3),\n  (4, 'Cinema', 32, 4),\n  (5, 'Padaria', 18.5, 1),\n  (6, 'Metrô', 5, 2);",
          query:
            '-- Consulta 1: a lista\nSELECT id, descricao, valor, categoria_id FROM despesas\n-- Depois, uma consulta para CADA despesa, como:\n-- SELECT nome FROM categorias WHERE id = 1\n-- SELECT nome FROM categorias WHERE id = 2\n',
          solution:
            'SELECT d.descricao, d.valor, c.nome AS categoria\nFROM despesas d\nJOIN categorias c ON c.id = d.categoria_id;',
          checks: [
            {
              label: 'Todas as 6 despesas aparecem',
              test: 'return !!result && result.rows.length === 6;',
            },
            {
              label: 'Cada linha traz o nome da categoria',
              test: "return !!result && result.rows.some((r) => r.includes('Aluguel') && r.includes('moradia')) && result.rows.some((r) => r.includes('Metrô') && r.includes('transporte'));",
            },
            {
              label: 'É uma única consulta, com JOIN',
              test: "const comandos = query.replace(/--.*$/gm, '').split(';').filter((s) => s.trim()); return comandos.length === 1 && /\\bjoin\\b/i.test(query);",
            },
          ],
        },
      ],
    },
    {
      id: 'transacoes',
      title: 'Tudo ou nada: transações',
      blocks: [
        {
          type: 'analogy',
          title: 'O Pix pela metade',
          text: 'Um Pix tem dois passos: tirar o dinheiro da sua conta e colocar na conta de quem recebe. Se o sistema cair entre um passo e outro, o dinheiro some do mundo. Ninguém aceitaria isso: ou os dois passos acontecem, ou nenhum.',
        },
        {
          type: 'text',
          text: 'Uma **transação** agrupa vários comandos para que valham **juntos**. Você começa com `BEGIN`, executa os comandos e termina com `COMMIT` (confirmar tudo) ou `ROLLBACK` (desfazer tudo). Se o servidor cair antes do `COMMIT`, o banco descarta o que estava pela metade.',
        },
        {
          type: 'code',
          language: 'sql',
          caption: 'Uma transferência protegida por transação',
          code: "BEGIN;\nUPDATE contas SET saldo = saldo - 50 WHERE nome = 'Ana';\nUPDATE contas SET saldo = saldo + 50 WHERE nome = 'Bruno';\nCOMMIT;",
        },
        {
          type: 'sql',
          title: 'Teste um rollback',
          task: 'Comece uma transação com `BEGIN`, faça as duas atualizações da transferência de R$ 50 da Ana para o Bruno e mostre os saldos com um `SELECT`. Agora imagine que o servidor detectou um problema antes de confirmar: desfaça tudo com `ROLLBACK` e termine com outro `SELECT nome, saldo FROM contas;` para provar que nada mudou.',
          setup:
            "CREATE TABLE contas (\n  nome TEXT PRIMARY KEY,\n  saldo REAL NOT NULL CHECK (saldo >= 0)\n);\nINSERT INTO contas VALUES ('Ana', 100), ('Bruno', 20);",
          query:
            "UPDATE contas SET saldo = saldo - 50 WHERE nome = 'Ana';\nUPDATE contas SET saldo = saldo + 50 WHERE nome = 'Bruno';\nSELECT nome, saldo FROM contas;",
          solution:
            "BEGIN;\nUPDATE contas SET saldo = saldo - 50 WHERE nome = 'Ana';\nUPDATE contas SET saldo = saldo + 50 WHERE nome = 'Bruno';\nSELECT nome, saldo FROM contas;\nROLLBACK;\nSELECT nome, saldo FROM contas;",
          checks: [
            {
              label: 'A transferência foi feita dentro de uma transação',
              test: 'return /\\bbegin\\b/i.test(query) && /update\\s+contas/i.test(query);',
            },
            {
              label: 'A transação foi desfeita com ROLLBACK',
              test: 'return /\\brollback\\b/i.test(query) && !/\\bcommit\\b/i.test(query);',
            },
            {
              label: 'Os saldos voltaram a ser 100 e 20',
              test: "const r = run('SELECT nome, saldo FROM contas ORDER BY nome'); return !!r && Number(r.rows[0][1]) === 100 && Number(r.rows[1][1]) === 20;",
            },
            {
              label: 'O último SELECT mostra as duas contas',
              test: 'return !!result && result.rows.length === 2;',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'A API faz as duas atualizações da transferência **sem** transação, e o servidor reinicia logo depois da primeira. Como fica o banco?',
          options: [
            {
              text: 'Ana perdeu R$ 50 e Bruno não recebeu nada',
              correct: true,
              feedback:
                'Exato. Sem transação, cada comando vale sozinho assim que termina. O primeiro já foi gravado e o segundo nunca aconteceu.',
            },
            {
              text: 'O banco desfaz o primeiro comando sozinho',
              feedback:
                'O banco só desfaz automaticamente o que está dentro de uma transação não confirmada. Fora dela, cada comando é confirmado na hora.',
            },
            {
              text: 'O segundo comando roda quando o servidor voltar',
              feedback:
                'O banco não guarda a intenção do seu código. O comando que não foi enviado simplesmente não existe para ele.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Transações nos testes',
          text: 'Um truque comum em testes de integração: abrir uma transação antes de cada teste e dar `ROLLBACK` no fim. Cada teste começa com o banco limpo, sem apagar nada à mão. Você vai ver isso na aula de testes de backend.',
        },
      ],
    },
    {
      id: 'migracoes',
      title: 'Migrações: o histórico do banco',
      blocks: [
        {
          type: 'analogy',
          title: 'O livro de obras do prédio',
          text: 'Num prédio bem administrado, toda reforma fica registrada: o que mudou, quando e em que ordem. Assim, quem chega depois sabe exatamente como o prédio ficou daquele jeito, e um prédio novo igual pode ser construído seguindo o livro do começo ao fim.',
        },
        {
          type: 'text',
          text: 'O esquema do banco (tabelas, colunas, índices) muda junto com o código. Uma **migração** é um arquivo versionado que descreve uma mudança: o `upgrade` (ou up) aplica, o `downgrade` (ou down) desfaz. As migrações ficam no Git, numeradas, e uma ferramenta anota no próprio banco qual foi a última aplicada.',
        },
        {
          type: 'anatomy',
          caption: 'Uma migração do Alembic, a ferramenta mais usada com SQLAlchemy',
          language: 'python',
          parts: [
            {
              text: 'revision = "d4e5f6"\ndown_revision = "a1b2c3"\n',
              label: 'Posição no histórico',
              note: 'Cada migração tem um identificador e aponta para a anterior. É isso que garante que elas rodem sempre na mesma ordem, em qualquer máquina.',
            },
            { text: '\n\n' },
            {
              text: 'def upgrade():\n    op.add_column(\n        "despesas",\n        sa.Column("pago", sa.Boolean(), nullable=False, server_default=sa.false()),\n    )\n',
              label: 'Upgrade',
              note: 'O que esta versão muda: acrescenta a coluna `pago`. O valor padrão `false` evita erro nas linhas que já existem, que não teriam valor para uma coluna obrigatória.',
            },
            { text: '\n\n' },
            {
              text: 'def downgrade():\n    op.drop_column("despesas", "pago")',
              label: 'Downgrade',
              note: 'Como desfazer. Precisa deixar o banco exatamente como estava antes do upgrade. Atenção: aqui, desfazer apaga a informação de quais despesas foram pagas.',
            },
          ],
        },
        {
          type: 'codeTabs',
          caption: 'A mesma migração em outras ferramentas populares',
          tabs: [
            {
              label: 'Knex (Node.js)',
              language: 'js',
              code: "exports.up = (knex) =>\n  knex.schema.alterTable('despesas', (t) => {\n    t.boolean('pago').notNullable().defaultTo(false);\n  });\n\nexports.down = (knex) =>\n  knex.schema.alterTable('despesas', (t) => {\n    t.dropColumn('pago');\n  });",
            },
            {
              label: 'Flyway (Java, SQL puro)',
              language: 'sql',
              code: '-- arquivo V2__adiciona_coluna_pago.sql\nALTER TABLE despesas ADD COLUMN pago BOOLEAN NOT NULL DEFAULT false;',
            },
          ],
        },
        {
          type: 'terminal',
          title: 'Aplicando migrações num banco vazio',
          task: 'O projeto da API já tem duas migrações: uma cria a tabela `despesas`, a outra acrescenta a coluna `pago`. O banco local acabou de ser criado e está vazio. Use o Alembic para inspecionar, aplicar e desfazer.',
          prompt: '~/api-despesas$',
          steps: [
            {
              goal: 'Veja em que versão o banco está agora.',
              command: 'alembic current',
              output:
                'INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.\nINFO  [alembic.runtime.migration] Will assume transactional DDL.',
              hint: 'O subcomando é `current`. Nenhuma versão aparece porque o banco está vazio.',
            },
            {
              goal: 'Liste o histórico de migrações do projeto.',
              command: ['alembic history', 'alembic history --verbose'],
              output:
                'a1b2c3 -> d4e5f6 (head), adiciona coluna pago\n<base> -> a1b2c3, cria tabela despesas',
              hint: 'O subcomando é `history`. A mais recente, chamada `head`, aparece primeiro.',
            },
            {
              goal: 'Aplique todas as migrações até a mais recente.',
              command: 'alembic upgrade head',
              output:
                'INFO  [alembic.runtime.migration] Running upgrade  -> a1b2c3, cria tabela despesas\nINFO  [alembic.runtime.migration] Running upgrade a1b2c3 -> d4e5f6, adiciona coluna pago',
              hint: '`alembic upgrade` seguido do destino, `head`.',
            },
            {
              goal: 'Confirme a versão atual do banco.',
              command: 'alembic current',
              output: 'd4e5f6 (head)',
              hint: 'O mesmo comando do primeiro passo.',
            },
            {
              goal: 'Desfaça só a última migração, voltando um passo.',
              command: ['alembic downgrade -1', 'alembic downgrade a1b2c3'],
              output:
                'INFO  [alembic.runtime.migration] Running downgrade d4e5f6 -> a1b2c3, adiciona coluna pago',
              hint: '`alembic downgrade -1` volta uma migração.',
            },
            {
              goal: 'Aplique de novo até a mais recente, provando que ida e volta funcionam.',
              command: 'alembic upgrade head',
              output:
                'INFO  [alembic.runtime.migration] Running upgrade a1b2c3 -> d4e5f6, adiciona coluna pago',
              hint: 'O mesmo comando do terceiro passo. Só a migração que faltava roda.',
            },
          ],
        },
        {
          type: 'order',
          prompt: 'Você precisa acrescentar uma coluna. Coloque em ordem o caminho seguro.',
          items: [
            'Gerar um arquivo de migração novo',
            'Escrever o upgrade e o downgrade',
            'Aplicar no banco local e rodar os testes',
            'Testar o downgrade e aplicar de novo',
            'Fazer commit da migração junto com o código que usa a coluna',
            'Deixar o processo de deploy aplicar a migração em produção',
          ],
          explanation:
            'Todo ambiente, do seu computador à produção, passa pelos mesmos arquivos na mesma ordem. É isso que torna o banco reproduzível.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns com migrações',
          text: 'Editar uma migração que já rodou em outra máquina: quem já aplicou nunca verá a mudança. Alterar o banco de produção à mão: o histórico deixa de contar a verdade. Renomear uma coluna de uma vez só: a versão antiga da API, ainda no ar durante o deploy, quebra. Nesse caso, crie a coluna nova, copie os dados e só remova a antiga numa migração posterior.',
        },
      ],
    },
  ],
  recap: [
    'A API fala com o banco por um **driver**, reaproveitando conexões de um **pool**, e lê a senha de uma variável de ambiente.',
    'Juntar texto digitado no SQL abre espaço para **SQL injection**; **consultas parametrizadas** enviam dado e comando separados.',
    'Um **repositório** concentra o acesso aos dados, e um **ORM** escreve o SQL por você, mas cuidado com o problema **N+1**.',
    '**Transações** fazem vários comandos valerem juntos: `COMMIT` confirma, `ROLLBACK` desfaz.',
    '**Migrações** versionadas, com upgrade e downgrade, contam a história do esquema e reconstroem o banco em qualquer ambiente.',
  ],
  cards: [
    {
      id: 'pool',
      front: 'O que é um pool de conexões?',
      back: 'Um conjunto de conexões com o banco já abertas, emprestadas a cada requisição e devolvidas no fim, para não abrir uma nova a cada pedido.',
    },
    {
      id: 'sql-injection',
      front: 'Como acontece um SQL injection?',
      back: 'Quando o texto vindo de fora é colado dentro do SQL, e aspas ou comandos nele mudam o sentido da consulta.',
    },
    {
      id: 'parametrizada',
      front: 'Como uma consulta parametrizada evita SQL injection?',
      back: 'O SQL leva marcadores como `?` ou `%s`, e os valores vão separados; o banco nunca os interpreta como comando.',
    },
    {
      id: 'n-mais-um',
      front: 'O que é o problema N+1?',
      back: 'Fazer 1 consulta para a lista e mais 1 para cada item. Resolve-se com JOIN ou carregamento antecipado no ORM.',
    },
    {
      id: 'rollback',
      front: 'O que fazem `COMMIT` e `ROLLBACK` numa transação?',
      back: '`COMMIT` confirma todos os comandos desde o `BEGIN`; `ROLLBACK` desfaz todos eles.',
    },
    {
      id: 'migracao',
      front: 'O que é uma migração de banco de dados?',
      back: 'Um arquivo versionado que muda o esquema (upgrade) e sabe desfazer a mudança (downgrade), aplicado na mesma ordem em todo ambiente.',
    },
    {
      id: 'migracao-aplicada',
      front: 'Posso editar uma migração que já foi aplicada em outro ambiente?',
      back: 'Não. Crie uma nova migração com a correção; quem já aplicou a antiga nunca veria a edição.',
    },
  ],
  mission: {
    title: 'Ligue a API de despesas a um banco de verdade',
    text: 'Use PostgreSQL (ou SQLite, se for mais fácil no seu computador) com a ferramenta de migração da sua stack: Alembic, Knex, Prisma, Flyway ou outra. O objetivo é provar, com comandos, que o banco é reproduzível e que os dados estão protegidos.',
    steps: [
      'Crie as migrações da tabela de despesas e aplique num banco vazio, do zero até a mais recente',
      'Rode o downgrade da última migração e aplique de novo, conferindo o esquema nas duas pontas',
      "Escreva o repositório de despesas usando apenas consultas parametrizadas, e tente o texto `' OR '1'='1` na busca para confirmar que nada vaza",
      'Faça uma operação com dois comandos dentro de uma transação, force um erro no meio e confirme que o rollback desfez tudo',
      'Ligue o log de SQL do driver ou do ORM e verifique se alguma rota sofre de N+1',
    ],
  },
  sources: [
    {
      title: 'OWASP: SQL Injection Prevention Cheat Sheet',
      url: 'https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html',
    },
    {
      title: 'PostgreSQL: Transações (tutorial)',
      url: 'https://www.postgresql.org/docs/current/tutorial-transactions.html',
    },
    {
      title: 'Alembic: tutorial',
      url: 'https://alembic.sqlalchemy.org/en/latest/tutorial.html',
    },
    {
      title: 'Psycopg: passando parâmetros para consultas SQL',
      url: 'https://www.psycopg.org/psycopg3/docs/basic/params.html',
    },
  ],
};
