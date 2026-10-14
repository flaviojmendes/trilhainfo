import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: '“O que acontece quando você digita uma URL?”, “qual a diferença entre 401 e 403?”, “o que é SQL injection?”. Essas perguntas aparecem em entrevistas de frontend, backend, dados, QA e DevOps, porque toda aplicação conversa por HTTP, guarda dados e precisa se defender. Quem responde com clareza e um exemplo concreto mostra que entende o sistema inteiro, e não só a própria parte.',
  sections: [
    {
      id: 'como-responder',
      title: 'Como responder uma pergunta conceitual',
      blocks: [
        {
          type: 'analogy',
          title: 'Dar informação no ponto de ônibus',
          text: 'Alguém pergunta qual ônibus vai para a rodoviária. A resposta boa é: “o 302, passa aqui a cada 15 minutos, mas desça no ponto antes, que é mais perto da entrada”. Primeiro o essencial, depois um exemplo útil, por fim o cuidado. Ninguém quer ouvir a história da linha.',
        },
        {
          type: 'text',
          text: 'Pergunta conceitual é aquela que pede para você explicar uma ideia, sem código. Responda em três tempos: uma **definição** em uma frase, um **exemplo concreto** do seu dia a dia ou projeto, e um **cuidado** ou troca (o que se ganha e o que se perde). Depois pare e deixe a pessoa aprofundar.',
        },
        {
          type: 'quiz',
          question: 'A pergunta é: “O que é um cookie?”. Qual resposta segue melhor esse roteiro?',
          options: [
            {
              text: 'Um pequeno dado que o servidor pede para o navegador guardar e que volta em cada requisição ao site. É o que mantém você logado na loja. Se guarda sessão, deve ser HttpOnly e Secure.',
              correct: true,
              feedback:
                'Definição, exemplo e cuidado em três frases. A pessoa entrevistadora pode puxar qualquer fio: sessão, HttpOnly, segurança. Você abriu portas sem se perder.',
            },
            {
              text: 'É aquele aviso que o site mostra perguntando se você aceita.',
              feedback:
                'O aviso existe por causa dos cookies, mas não explica o que eles são nem para que servem. Mostra que você viu o efeito, não o mecanismo.',
            },
            {
              text: 'Uma explicação de cinco minutos sobre a história dos navegadores, todas as opções de cookie e as leis de privacidade.',
              feedback:
                'Saber muito é bom, mas falar sem parar impede a conversa e esconde o essencial. Responda curto e deixe a pessoa pedir mais.',
            },
            {
              text: 'Não sei, nunca usei.',
              feedback:
                'Honestidade é ótima, mas dá para ir além: “não usei diretamente, mas sei que o login precisa lembrar quem eu sou entre páginas, então imagino que...”. Raciocinar em voz alta conta ponto.',
            },
          ],
        },
      ],
    },
    {
      id: 'digitar-uma-url',
      title: 'O clássico: o que acontece quando você digita uma URL',
      blocks: [
        {
          type: 'text',
          text: 'Você viu a base disso na aula **Como a web funciona**. Na entrevista, a resposta pede um pouco mais: a conexão, o que o servidor faz por trás e onde entra o banco de dados. Não precisa de todos os detalhes, mas precisa da ordem certa.',
        },
        {
          type: 'flow',
          caption: 'Da tecla Enter até a página desenhada, incluindo o que acontece no backend.',
          actors: ['Navegador', 'DNS', 'Servidor', 'Banco'],
          steps: [
            {
              from: 0,
              to: 0,
              label: 'Confere o cache',
              text: 'O navegador olha se já tem o endereço IP e os arquivos guardados de uma visita recente. O que estiver em cache não precisa ser pedido de novo.',
            },
            {
              from: 0,
              to: 1,
              label: 'Qual o IP do domínio?',
              text: 'O **DNS** traduz o nome, como `loja.exemplo.com.br`, no endereço IP do servidor.',
            },
            {
              from: 1,
              to: 0,
              label: '203.0.113.42',
              text: 'Com o IP em mãos, o navegador sabe para onde ligar.',
              tone: 'ok',
            },
            {
              from: 0,
              to: 2,
              label: 'Conexão TCP + TLS',
              text: '**TCP** abre um canal confiável (os pacotes chegam inteiros e em ordem). **TLS** combina a criptografia: é o que faz o HTTPS ser seguro.',
            },
            {
              from: 0,
              to: 2,
              label: 'GET /pedidos + cookie',
              text: 'A requisição HTTP sai com método, caminho e cabeçalhos. Se a pessoa está logada, o cookie de sessão vai junto.',
            },
            {
              from: 2,
              to: 3,
              label: 'SELECT dos pedidos',
              text: 'O servidor confere quem é a pessoa (autenticação), se ela pode ver aquilo (autorização) e consulta o banco de dados.',
            },
            {
              from: 3,
              to: 2,
              label: 'Linhas da tabela',
              text: 'O banco devolve os dados e o servidor monta a resposta, em HTML ou JSON.',
              tone: 'ok',
            },
            {
              from: 2,
              to: 0,
              label: '200 OK + HTML',
              text: 'A resposta volta com status, cabeçalhos e corpo.',
              tone: 'ok',
            },
            {
              from: 0,
              to: 0,
              label: 'Pede CSS, JS e desenha',
              text: 'O navegador lê o HTML, pede os arquivos que faltam, monta a página e desenha na tela.',
            },
          ],
        },
        {
          type: 'order',
          prompt: 'Organize a resposta para “o que acontece quando digito uma URL?”.',
          items: [
            'O navegador resolve o domínio no DNS e recebe o IP',
            'Abre uma conexão TCP e negocia a criptografia com TLS',
            'Envia a requisição HTTP com método, caminho e cabeçalhos',
            'O servidor verifica a sessão, aplica as regras e consulta o banco',
            'O servidor responde com status, cabeçalhos e corpo',
            'O navegador pede os arquivos restantes e desenha a página',
          ],
          explanation:
            'Com essa espinha, você pode aprofundar onde a vaga pede: frontend fala mais de renderização, backend do servidor e do banco, DevOps de DNS, rede e balanceadores.',
        },
        {
          type: 'reveal',
          question:
            'Se a pessoa entrevistadora interromper: “e onde entra o cache?”, o que você responde?',
          answer:
            'Em vários pontos: o navegador guarda respostas de DNS e arquivos (controlados pelo cabeçalho `Cache-Control`), uma CDN pode servir a página de um servidor mais perto de você, e o próprio backend pode guardar consultas frequentes em memória. Citar duas camadas com um exemplo já é uma ótima resposta.',
        },
      ],
    },
    {
      id: 'http-rest-e-login',
      title: 'Métodos, status, REST e login',
      blocks: [
        {
          type: 'terms',
          items: [
            {
              term: 'REST',
              text: 'Um estilo de organizar APIs em que cada coisa do sistema é um **recurso** com endereço próprio (`/pedidos/42`) e os métodos HTTP dizem a ação. Não é uma biblioteca: é uma convenção.',
            },
            {
              term: 'Idempotente',
              text: 'Uma operação que dá o mesmo resultado se repetida. Apagar o pedido 42 duas vezes deixa o sistema igual a apagar uma vez. Criar um pedido duas vezes gera dois pedidos.',
            },
            {
              term: 'Autenticação',
              text: 'Descobrir **quem** é a pessoa: login com senha, código no celular, biometria.',
            },
            {
              term: 'Autorização',
              text: 'Decidir **o que** essa pessoa pode fazer: cliente vê os próprios pedidos, admin vê todos.',
            },
          ],
        },
        {
          type: 'table',
          caption: 'Os métodos que mais caem em entrevista',
          head: ['Método', 'Para quê', 'Exemplo', 'Idempotente?'],
          rows: [
            ['`GET`', 'Ler', '`GET /pedidos/42`', 'Sim'],
            ['`POST`', 'Criar', '`POST /pedidos`', 'Não'],
            ['`PUT`', 'Substituir inteiro', '`PUT /clientes/7`', 'Sim'],
            ['`PATCH`', 'Alterar uma parte', '`PATCH /clientes/7` só com o e-mail', 'Depende'],
            ['`DELETE`', 'Remover', '`DELETE /pedidos/42`', 'Sim'],
          ],
        },
        {
          type: 'quiz',
          question:
            'Uma pessoa logada como cliente tenta abrir `/admin/relatorios`. Qual status a API deve devolver?',
          options: [
            {
              text: '`403 Forbidden`',
              correct: true,
              feedback:
                'Isso. O servidor sabe quem ela é (autenticação deu certo), mas ela não tem permissão (autorização negada). 403 é “sei quem você é, e não pode”.',
            },
            {
              text: '`401 Unauthorized`',
              feedback:
                'O nome engana, mas 401 significa “não sei quem você é”: falta login ou o token expirou. Aqui a pessoa está logada.',
            },
            {
              text: '`404 Not Found`',
              feedback:
                'Alguns sistemas devolvem 404 para nem revelar que a página existe, e isso é defensável. Mas a resposta esperada numa entrevista é 403; se citar o 404, explique o motivo.',
            },
            {
              text: '`500 Internal Server Error`',
              feedback:
                'Nada quebrou no servidor: ele tomou uma decisão correta de negar o acesso. 5xx é para falhas do próprio servidor.',
            },
          ],
        },
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              label: 'Sessão com cookie',
              title: 'O servidor lembra de você',
              text: 'No login, o servidor cria uma sessão e manda um cookie com o identificador. O navegador envia esse cookie sozinho em toda requisição ao site.',
              points: [
                'Simples para sites tradicionais',
                'Marcar `HttpOnly` impede que JavaScript leia o cookie',
                'Por ir automaticamente, exige proteção contra CSRF',
              ],
            },
            {
              label: 'Token',
              title: 'Você carrega a credencial',
              text: 'No login, o servidor devolve um token (muitas vezes um JWT). O cliente envia no cabeçalho `Authorization: Bearer ...` em cada chamada.',
              points: [
                'Comum em apps de celular e APIs entre serviços',
                'Guardado em `localStorage`, pode ser roubado por XSS',
                'Difícil de revogar antes de expirar',
              ],
            },
          ],
        },
        {
          type: 'classify',
          prompt: 'Cada situação é um problema de autenticação ou de autorização?',
          buckets: ['Autenticação (quem é você)', 'Autorização (o que você pode)'],
          items: [
            { text: 'O código de verificação do SMS expirou', bucket: 0 },
            { text: 'A senha digitada não confere', bucket: 0 },
            { text: 'O token enviado está vencido e a API responde 401', bucket: 0 },
            {
              text: 'Uma atendente tenta excluir a conta de um cliente e só gerentes podem',
              bucket: 1,
            },
            {
              text: 'Um cliente troca `/pedidos/101` por `/pedidos/102` e vê o pedido de outra pessoa',
              bucket: 1,
            },
            { text: 'Uma pessoa do plano grátis acessa um relatório do plano pago', bucket: 1 },
          ],
          explanation:
            'A troca de `/pedidos/101` por `/pedidos/102` é um dos erros mais comuns em APIs reais: o servidor confere que a pessoa está logada, mas esquece de conferir se o pedido é dela.',
        },
      ],
    },
    {
      id: 'sql-e-joins',
      title: 'SQL, JOINs e a dupla contagem',
      blocks: [
        {
          type: 'text',
          text: 'Quase todo processo pede um pouco de SQL, a linguagem para consultar bancos de dados. A pergunta mais comum envolve **JOIN**: combinar linhas de duas tabelas usando uma coluna em comum, quase sempre uma **chave estrangeira** (uma coluna que aponta para o `id` de outra tabela).',
        },
        {
          type: 'joins',
          tables: ['clientes', 'pedidos'],
          items: [
            {
              kind: 'inner',
              title: 'INNER JOIN',
              text: 'Só as linhas que **têm par nas duas tabelas**. Carla não fez pedidos, então some do resultado.',
              sql: 'SELECT c.nome, p.id AS pedido, p.total\nFROM clientes c\nINNER JOIN pedidos p ON p.cliente_id = c.id;',
              result:
                'nome  | pedido | total\nAna   |     10 |   120\nAna   |     11 |    80\nBruno |     12 |    45',
            },
            {
              kind: 'left',
              title: 'LEFT JOIN',
              text: '**Todas as linhas da esquerda**, com par ou não. Sem par, as colunas da direita vêm `NULL`.',
              sql: 'SELECT c.nome, p.id AS pedido, p.total\nFROM clientes c\nLEFT JOIN pedidos p ON p.cliente_id = c.id;',
              result:
                'nome  | pedido | total\nAna   |     10 |   120\nAna   |     11 |    80\nBruno |     12 |    45\nCarla |   NULL |  NULL',
            },
          ],
        },
        {
          type: 'sql',
          title: 'Total gasto por cliente, sem esquecer ninguém',
          task: 'O time de marketing quer **todos** os clientes com o total que cada um gastou, inclusive quem nunca comprou (com 0). A consulta abaixo esquece alguém. Corrija usando `LEFT JOIN` e `COALESCE(valor, 0)`, que troca `NULL` por zero.',
          setup:
            "CREATE TABLE clientes (id INTEGER PRIMARY KEY, nome TEXT NOT NULL);\nCREATE TABLE pedidos (id INTEGER PRIMARY KEY, cliente_id INTEGER NOT NULL REFERENCES clientes(id), total REAL NOT NULL);\nINSERT INTO clientes VALUES (1, 'Ana'), (2, 'Bruno'), (3, 'Carla');\nINSERT INTO pedidos VALUES (10, 1, 120), (11, 1, 80), (12, 2, 45);",
          query:
            'SELECT c.nome, SUM(p.total) AS total_gasto\nFROM clientes c\nJOIN pedidos p ON p.cliente_id = c.id\nGROUP BY c.nome;',
          solution:
            'SELECT c.nome, COALESCE(SUM(p.total), 0) AS total_gasto\nFROM clientes c\nLEFT JOIN pedidos p ON p.cliente_id = c.id\nGROUP BY c.id, c.nome\nORDER BY c.nome;',
          checks: [
            {
              label: 'Os três clientes aparecem',
              test: 'return !!result && result.rows.length === 3;',
            },
            {
              label: 'Carla aparece com total 0, e não NULL',
              test: "return !!result && result.rows.some((r) => r.includes('Carla') && r.some((v) => v !== null && v !== 'Carla' && Number(v) === 0));",
            },
            {
              label: 'Ana continua somando 200',
              test: "return !!result && result.rows.some((r) => r.includes('Ana') && r.some((v) => Number(v) === 200));",
            },
          ],
        },
        {
          type: 'text',
          text: 'Agora a armadilha preferida de quem entrevista para dados e backend: a **dupla contagem**. Quando uma linha de uma tabela tem várias linhas correspondentes na outra, o JOIN repete a primeira. Se você somar uma coluna dela depois, soma várias vezes o mesmo valor.',
        },
        {
          type: 'sql',
          title: 'Encontre a dupla contagem',
          task: 'O relatório diz que o frete total foi R$ 65, mas o financeiro jura que foi R$ 25. A consulta junta pedidos com itens e soma o frete, que se repete em cada item. Mantenha as colunas `frete_total` e `valor_itens`, mas calcule cada soma na sua própria tabela (dica: duas subconsultas, `SELECT (SELECT ...) AS frete_total, (SELECT ...) AS valor_itens`).',
          setup:
            "CREATE TABLE pedidos (id INTEGER PRIMARY KEY, cliente TEXT NOT NULL, frete REAL NOT NULL);\nCREATE TABLE itens (id INTEGER PRIMARY KEY, pedido_id INTEGER NOT NULL REFERENCES pedidos(id), produto TEXT NOT NULL, preco REAL NOT NULL);\nINSERT INTO pedidos VALUES (1, 'Ana', 10), (2, 'Bruno', 15), (3, 'Carla', 0);\nINSERT INTO itens VALUES (1, 1, 'Café 500g', 50), (2, 1, 'Filtro', 30), (3, 2, 'Pão de forma', 20), (4, 2, 'Manteiga', 20), (5, 2, 'Queijo', 40), (6, 3, 'Bolo', 35);",
          query:
            'SELECT SUM(p.frete) AS frete_total, SUM(i.preco) AS valor_itens\nFROM pedidos p\nJOIN itens i ON i.pedido_id = p.id;',
          solution:
            'SELECT\n  (SELECT SUM(frete) FROM pedidos) AS frete_total,\n  (SELECT SUM(preco) FROM itens) AS valor_itens;',
          checks: [
            {
              label: 'O frete total é 25',
              test: "if (!result || result.rows.length !== 1) return false; const i = result.columns.indexOf('frete_total'); return i >= 0 && Number(result.rows[0][i]) === 25;",
            },
            {
              label: 'O valor dos itens continua certo',
              test: "if (!result || result.rows.length !== 1) return false; const i = result.columns.indexOf('valor_itens'); const esperado = run('SELECT SUM(preco) FROM itens').rows[0][0]; return i >= 0 && Number(result.rows[0][i]) === Number(esperado);",
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Como explicar a dupla contagem',
          text: 'Diga a **granularidade**: “cada linha do resultado é um item, não um pedido; o frete é do pedido, então se repete”. Essa frase resolve a maioria das perguntas de JOIN em entrevistas de dados.',
        },
      ],
    },
    {
      id: 'indices-e-transacoes',
      title: 'Índices e transações',
      blocks: [
        {
          type: 'analogy',
          title: 'O índice remissivo do livro',
          text: 'Para achar “fotossíntese” num livro de biologia, você não lê as 400 páginas: vai ao índice no fim, que diz “página 132”. Um **índice** no banco é isso: uma estrutura extra, ordenada, que aponta onde estão as linhas com cada valor.',
        },
        {
          type: 'text',
          text: 'Sem índice, buscar `WHERE cliente_id = 7` obriga o banco a ler a tabela inteira. Com índice, ele vai direto. O preço: o índice ocupa espaço e cada `INSERT` ou `UPDATE` precisa atualizá-lo também, então escrever fica um pouco mais lento.',
        },
        {
          type: 'fill',
          prompt:
            'Complete o comando que cria um índice na coluna usada para buscar os pedidos de um cliente.',
          language: 'sql',
          template: 'CREATE [[INDEX]] idx_pedidos_cliente\n[[ON]] pedidos ([[cliente_id]]);',
          explanation:
            'O nome do índice é livre, mas a convenção `idx_tabela_coluna` ajuda quem lê. Crie índices nas colunas que aparecem muito em `WHERE` e `JOIN`, não em todas.',
        },
        {
          type: 'quiz',
          question: 'Em qual destas situações um índice novo ajuda **menos**?',
          options: [
            {
              text: 'Uma tabela de registros de acesso que recebe milhares de inserções por segundo e quase nunca é consultada',
              correct: true,
              feedback:
                'Isso. Cada inserção pagaria o custo de atualizar o índice, e ninguém aproveita a busca rápida. Índice é troca: leitura mais rápida, escrita mais lenta.',
            },
            {
              text: 'Uma tela que busca clientes por CPF o dia inteiro',
              feedback:
                'Aqui o índice é ideal: muitas leituras pela mesma coluna, com valores quase únicos.',
            },
            {
              text: 'Um JOIN frequente entre pedidos e clientes pela coluna `cliente_id`',
              feedback:
                'Colunas usadas em JOIN são candidatas clássicas a índice. Sem ele, cada junção pode ler a tabela inteira.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Uma **transação** agrupa vários comandos para que aconteçam todos ou nenhum. Pense num Pix: tirar R$ 50 da Ana e colocar R$ 50 na conta do Bruno. Se o sistema cair no meio, o dinheiro não pode sumir. Por isso os dois comandos vão entre `BEGIN` (começa) e `COMMIT` (confirma); se algo der errado, `ROLLBACK` desfaz tudo.',
        },
        {
          type: 'sql',
          title: 'Um Pix em uma transação',
          task: 'Transfira R$ 50 da Ana para o Bruno. Hoje o comando só tira o dinheiro da Ana. Complete com o crédito para o Bruno e coloque os dois comandos dentro de `BEGIN;` e `COMMIT;`.',
          setup:
            "CREATE TABLE contas (titular TEXT PRIMARY KEY, saldo REAL NOT NULL CHECK (saldo >= 0));\nINSERT INTO contas VALUES ('Ana', 200), ('Bruno', 100);",
          query: "UPDATE contas SET saldo = saldo - 50 WHERE titular = 'Ana';",
          solution:
            "BEGIN;\nUPDATE contas SET saldo = saldo - 50 WHERE titular = 'Ana';\nUPDATE contas SET saldo = saldo + 50 WHERE titular = 'Bruno';\nCOMMIT;",
          checks: [
            {
              label: 'Ana fica com 150',
              test: 'const r = run("SELECT saldo FROM contas WHERE titular = \'Ana\'"); return !!r && Number(r.rows[0][0]) === 150;',
            },
            {
              label: 'Bruno fica com 150',
              test: 'const r = run("SELECT saldo FROM contas WHERE titular = \'Bruno\'"); return !!r && Number(r.rows[0][0]) === 150;',
            },
            {
              label: 'Os comandos estão entre BEGIN e COMMIT',
              test: 'return /\\bbegin\\b/i.test(query) && /\\bcommit\\b/i.test(query);',
            },
          ],
        },
      ],
    },
    {
      id: 'owasp-essencial',
      title: 'Segurança: injeção, XSS, CSRF e acesso indevido',
      blocks: [
        {
          type: 'text',
          text: 'A **OWASP** é uma comunidade aberta que publica as falhas de segurança mais comuns na web. Você não precisa decorar a lista, mas precisa reconhecer quatro clássicos e dizer como se previne cada um. O XSS você já viu na aula **Desempenho e segurança web**; aqui ele entra ao lado dos outros.',
        },
        {
          type: 'codeTabs',
          caption:
            'SQL injection: o erro é montar o comando colando texto. A correção, em qualquer linguagem, é a consulta parametrizada.',
          tabs: [
            {
              label: 'Vulnerável',
              language: 'python',
              code: "# Se nome for:  x' OR '1'='1\n# o WHERE vira sempre verdadeiro e devolve todo mundo\nsql = f\"SELECT * FROM clientes WHERE nome = '{nome}'\"\nconn.execute(sql)",
            },
            {
              label: 'Python seguro',
              language: 'python',
              code: '# O banco recebe o valor separado do comando:\n# ele nunca é interpretado como SQL\nconn.execute("SELECT * FROM clientes WHERE nome = ?", (nome,))',
            },
            {
              label: 'JavaScript seguro',
              language: 'js',
              code: '// Com o driver pg (PostgreSQL) no Node.js\nawait db.query("SELECT * FROM clientes WHERE nome = $1", [nome]);',
            },
          ],
        },
        {
          type: 'terms',
          items: [
            {
              term: 'SQL injection',
              text: 'Texto vindo de fora vira parte do comando SQL. Prevenção: consultas parametrizadas, sempre.',
            },
            {
              term: 'XSS',
              text: 'Texto vindo de fora vira código que roda no navegador de outras pessoas. Prevenção: tratar o conteúdo como texto (`textContent`, o padrão do React) e nunca inserir HTML sem limpar.',
            },
            {
              term: 'CSRF',
              text: 'Um site malicioso faz o seu navegador enviar um pedido ao seu banco, aproveitando que o cookie vai sozinho. Prevenção: cookies `SameSite`, tokens anti-CSRF e nunca alterar dados com `GET`.',
            },
            {
              term: 'Controle de acesso quebrado',
              text: 'O servidor não confere se aquele recurso pertence a quem pediu. Prevenção: checar a permissão no servidor em toda requisição, não só esconder o botão.',
            },
          ],
        },
        {
          type: 'classify',
          prompt: 'Classifique cada cenário pelo tipo de ataque.',
          buckets: ['SQL injection', 'XSS', 'CSRF', 'Acesso indevido'],
          items: [
            {
              text: "No campo de busca, alguém digita `' OR 1=1 --` e vê todos os cadastros",
              bucket: 0,
            },
            { text: 'O filtro de cidade é colado direto no `WHERE` da consulta', bucket: 0 },
            { text: 'Um comentário com `<script>` rouba dados de quem abre a página', bucket: 1 },
            { text: 'O nome de perfil com HTML é exibido com `innerHTML`', bucket: 1 },
            {
              text: 'Um site de sorteio envia, escondido, um formulário de transferência ao seu banco',
              bucket: 2,
            },
            {
              text: 'Um link em e-mail troca o e-mail da sua conta enquanto você está logado',
              bucket: 2,
            },
            { text: 'Trocar o número na URL mostra a nota fiscal de outro cliente', bucket: 3 },
            { text: 'A API de exclusão só esconde o botão para quem não é admin', bucket: 3 },
          ],
          explanation:
            'Repare no padrão: injeção e XSS são **dado virando código**; CSRF é **pedido em seu nome**; acesso indevido é **falta de checagem no servidor**. Dizer esse padrão na entrevista mostra que você entende a causa, não só os nomes.',
        },
        {
          type: 'quiz',
          question:
            'Na entrevista, perguntam: “Como você impediria que um cliente visse o pedido de outro trocando o ID na URL?”. Qual é a melhor resposta?',
          options: [
            {
              text: 'No servidor, buscar o pedido filtrando também pelo dono: `WHERE id = ? AND cliente_id = ?`, e devolver 404 ou 403 se não for dele',
              correct: true,
              feedback:
                'Isso. A regra de acesso fica no servidor e vale para qualquer cliente: navegador, app ou alguém usando curl. Citar o status de resposta fecha bem.',
            },
            {
              text: 'Trocar os IDs numéricos por códigos aleatórios difíceis de adivinhar',
              feedback:
                'Ajuda a dificultar, mas não resolve: um código vazado num print ou link continua dando acesso. Esconder não é o mesmo que proteger.',
            },
            {
              text: 'Esconder o link para pedidos de outras pessoas na interface',
              feedback:
                'A interface não é barreira: qualquer pessoa pode chamar a API diretamente. Toda regra de segurança precisa estar no servidor.',
            },
            {
              text: 'Usar HTTPS em todas as páginas',
              feedback:
                'HTTPS protege a conversa contra quem está no meio do caminho, mas aqui o ataque vem da própria pessoa logada. É necessário, mas não resolve este problema.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns nas respostas',
          text: 'Confundir 401 com 403, dizer que HTTPS resolve tudo, achar que esconder botão é segurança e responder “uso um framework que cuida disso” sem explicar o quê. Prefira: o nome do problema, como ele acontece e como você preveniria.',
        },
      ],
    },
  ],
  recap: [
    'Responda perguntas conceituais em três tempos: definição curta, exemplo concreto e um cuidado.',
    'Digitar uma URL envolve DNS, conexão TCP e TLS, requisição HTTP, servidor com banco de dados e renderização, nessa ordem.',
    '401 é “não sei quem você é” (autenticação); 403 é “sei, e você não pode” (autorização).',
    'LEFT JOIN mantém quem não tem par; somar depois de um JOIN pode contar o mesmo valor várias vezes.',
    'Índices aceleram leitura e custam escrita; transações garantem tudo ou nada; injeção, XSS, CSRF e acesso indevido se previnem no servidor e tratando dado como dado.',
  ],
  cards: [
    {
      id: 'roteiro-resposta',
      front: 'Qual o roteiro de resposta para uma pergunta conceitual?',
      back: 'Definição em uma frase, exemplo concreto e um cuidado ou troca. Depois pare.',
    },
    {
      id: 'status-401-403',
      front: 'Diferença entre 401 e 403?',
      back: '401: não autenticado, falta login ou o token expirou. 403: autenticado, mas sem permissão.',
    },
    {
      id: 'idempotente',
      front: 'O que significa um método HTTP ser idempotente?',
      back: 'Repetir a mesma requisição deixa o sistema no mesmo estado. `GET`, `PUT` e `DELETE` são; `POST` não.',
    },
    {
      id: 'dupla-contagem',
      front: 'Por que somar depois de um JOIN pode dar um valor maior que o real?',
      back: 'Se cada linha da esquerda tem várias na direita, ela se repete no resultado e a soma conta o mesmo valor várias vezes.',
    },
    {
      id: 'indice-custo',
      front: 'Qual o custo de criar um índice?',
      back: 'Espaço extra e escrita mais lenta, porque cada INSERT ou UPDATE também atualiza o índice.',
    },
    {
      id: 'transacao',
      front: 'Para que serve uma transação?',
      back: 'Para que vários comandos aconteçam todos ou nenhum, como o débito e o crédito de um Pix.',
    },
    {
      id: 'prevenir-sql-injection',
      front: 'Como prevenir SQL injection?',
      back: 'Com consultas parametrizadas: o valor vai separado do comando e nunca vira SQL.',
    },
  ],
  mission: {
    title: 'Três explicações para a sua carreira',
    text: 'Prepare respostas curtas para três situações concretas, usando um projeto seu ou um sistema que você conhece. Grave em áudio ou escreva como se fosse responder numa entrevista.',
    steps: [
      'Explique uma falha de API: a requisição, o status que voltou e o que ele significa',
      'Escreva uma consulta com JOIN que dá dupla contagem e a versão corrigida, explicando a granularidade',
      'Descreva um caso de acesso indevido e mostre onde o servidor deveria checar a permissão',
      'Responda “o que acontece quando digito uma URL?” em até dois minutos, aprofundando a parte da sua carreira',
      'Revise as três respostas: cada uma tem definição, exemplo e cuidado?',
    ],
  },
  sources: [
    {
      title: 'MDN: códigos de status de respostas HTTP',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status',
    },
    {
      title: 'PostgreSQL: junções entre tabelas',
      url: 'https://www.postgresql.org/docs/current/tutorial-join.html',
    },
    {
      title: 'OWASP Top Ten',
      url: 'https://owasp.org/www-project-top-ten/',
    },
    {
      title: 'OWASP: prevenção de SQL injection',
      url: 'https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html',
    },
  ],
};
