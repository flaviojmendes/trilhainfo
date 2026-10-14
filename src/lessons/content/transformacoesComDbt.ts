import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Em muita empresa, o “número oficial” de faturamento vive numa consulta SQL de 300 linhas, salva no computador de uma pessoa, que só ela sabe rodar. Quando essa pessoa sai de férias, o relatório para. O **dbt** existe para acabar com isso: transforma consultas soltas em um projeto versionado, testado e documentado, que qualquer pessoa do time consegue rodar com um comando. Ele aparece em boa parte das vagas de engenharia e análise de dados.',
  sections: [
    {
      id: 'por-que-dbt',
      title: 'SQL solto, SQL organizado',
      blocks: [
        {
          type: 'analogy',
          title: 'O caderno de receitas da padaria',
          text: 'Imagine que cada padeiro guarda suas receitas de cabeça. Funciona até alguém faltar. Agora imagine um caderno único: cada receita diz de quais outras ela depende (“use a massa base da página 3”), tem um controle de qualidade (“o pão deve pesar 50 g”) e qualquer pessoa consegue seguir. O dbt é esse caderno para as transformações em SQL.',
        },
        {
          type: 'text',
          text: 'Na aula de pipelines batch você viu o **ELT**: o dado bruto é carregado no banco e transformado lá dentro. O **dbt** (data build tool) cuida desse **T**. Você escreve cada transformação como um `SELECT` num arquivo; ele cria as tabelas e views no banco, na ordem certa, e roda testes sobre o resultado.',
        },
        {
          type: 'text',
          text: 'O dbt **não** busca dados em APIs nem copia arquivos: ele só trabalha com o que já está no banco. A extração continua sendo papel do pipeline. E ele roda em vários bancos: PostgreSQL, DuckDB, BigQuery, Snowflake e outros, por meio de **adaptadores**.',
        },
        {
          type: 'quiz',
          question: 'Qual destas tarefas o dbt faz?',
          options: [
            {
              text: 'Criar uma tabela de faturamento diário a partir de uma tabela de pedidos que já está no banco',
              correct: true,
              feedback:
                'Isso. Transformar dados que já estão no banco, usando SQL, é exatamente o trabalho do dbt.',
            },
            {
              text: 'Baixar os pedidos da API da loja toda madrugada',
              feedback:
                'Buscar dados fora do banco é extração. O dbt começa quando o dado bruto já foi carregado; a extração fica com um script ou ferramenta de ingestão.',
            },
            {
              text: 'Mostrar gráficos de vendas para a diretoria',
              feedback:
                'Gráficos ficam numa ferramenta de BI ou painel. O dbt prepara as tabelas que essas ferramentas leem.',
            },
          ],
        },
      ],
    },
    {
      id: 'modelo-e-ref',
      title: 'Um modelo é só um SELECT',
      blocks: [
        {
          type: 'text',
          text: 'No dbt, cada arquivo `.sql` dentro da pasta `models/` é um **modelo**: um `SELECT` que vira uma tabela ou view com o mesmo nome do arquivo. Você nunca escreve `CREATE TABLE`; o dbt escreve por você.',
        },
        {
          type: 'anatomy',
          caption: 'O arquivo models/staging/stg_pedidos.sql',
          language: 'sql',
          parts: [
            {
              text: "{{ config(materialized='view') }}",
              label: 'Configuração',
              note: 'Diz como o resultado vira objeto no banco. Aqui, uma view. As chaves duplas `{{ }}` são **Jinja**, uma linguagem de modelos que o dbt processa antes de mandar o SQL ao banco.',
            },
            { text: '\n\nwith origem as (\n    select * from ' },
            {
              text: "{{ source('loja', 'pedidos') }}",
              label: 'source()',
              note: 'Aponta para uma tabela bruta, carregada pelo pipeline. As fontes são declaradas num arquivo YAML, então o dbt sabe de onde cada dado vem.',
            },
            { text: '\n),\n\n' },
            {
              text: 'renomeado as (\n    select\n        cast(id as integer) as pedido_id,\n        cast(cliente_id as integer) as cliente_id,\n        valor_centavos / 100.0 as valor,\n        lower(trim(status)) as status,\n        cast(criado_em as date) as data_pedido\n    from origem\n)',
              label: 'CTE de limpeza',
              note: 'Uma **CTE** (`with ... as`) dá nome a um passo intermediário, como você viu em SQL analítico. Aqui ela renomeia colunas, converte tipos e padroniza textos.',
            },
            { text: '\n\n' },
            {
              text: 'select * from renomeado',
              label: 'Resultado',
              note: 'O último `SELECT` é o que vira a view `stg_pedidos`. Nada de `CREATE` ou `INSERT`.',
            },
          ],
        },
        {
          type: 'text',
          text: "Outro modelo usa esse resultado com `ref()`. Escrever `{{ ref('stg_pedidos') }}` em vez do nome da tabela faz duas coisas: o dbt troca pelo nome certo no banco (de desenvolvimento ou de produção) e anota que um modelo depende do outro. É dessas anotações que sai a ordem de execução.",
        },
        {
          type: 'codeTabs',
          caption: 'Fonte, staging e o modelo final, lado a lado',
          tabs: [
            {
              label: '_sources.yml',
              language: 'yaml',
              code: 'version: 2\n\nsources:\n  - name: loja\n    schema: bruto\n    tables:\n      - name: pedidos\n      - name: clientes',
            },
            {
              label: 'fct_vendas_diarias.sql',
              language: 'sql',
              code: "{{ config(materialized='table') }}\n\nselect\n    data_pedido,\n    count(*) as pedidos,\n    sum(valor) as faturamento\nfrom {{ ref('stg_pedidos') }}\nwhere status = 'pago'\ngroup by data_pedido",
            },
          ],
        },
        {
          type: 'fill',
          prompt:
            'Complete o modelo que junta pedidos e clientes. O modelo de clientes se chama `stg_clientes`.',
          language: 'sql',
          template:
            "select\n    p.pedido_id,\n    p.valor,\n    c.cidade\nfrom {{ [[ref]]('stg_pedidos') }} as p\njoin {{ ref('[[stg_clientes]]') }} as c\n    on c.cliente_id = p.cliente_id",
          explanation:
            'Sempre `ref()` para outros modelos e `source()` para tabelas brutas. Com o nome escrito à mão, o dbt não sabe da dependência e pode rodar os modelos na ordem errada.',
        },
      ],
    },
    {
      id: 'camadas',
      title: 'Camadas: staging, intermediate e marts',
      blocks: [
        {
          type: 'text',
          text: 'Projetos dbt costumam organizar os modelos em três camadas, cada uma com uma função. É a mesma ideia de separar bruto e tratado, levada um passo adiante.',
        },
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              label: 'Camada 1',
              title: 'Staging (`stg_`)',
              text: 'Um modelo por tabela bruta. Só limpeza leve: renomear, converter tipos, padronizar. Nada de juntar tabelas.',
            },
            {
              label: 'Camada 2',
              title: 'Intermediate (`int_`)',
              text: 'Passos de lógica reutilizáveis: juntar pedidos com clientes, deduplicar eventos. Ninguém de fora consulta direto.',
            },
            {
              label: 'Camada 3',
              title: 'Marts (`fct_`, `dim_`)',
              text: 'Tabelas prontas para consumo, como fatos e dimensões da aula de modelagem analítica. É o que painéis e analistas leem.',
            },
          ],
        },
        {
          type: 'classify',
          prompt: 'Em que camada cada transformação deve ficar?',
          buckets: ['Staging', 'Intermediate', 'Marts'],
          items: [
            { text: 'Renomear `CLI_ID` para `cliente_id` e converter para inteiro', bucket: 0 },
            { text: 'Converter centavos em reais', bucket: 0 },
            { text: 'Remover da fonte os pedidos marcados como teste', bucket: 0 },
            { text: 'Juntar pedidos com clientes para calcular o frete por cidade', bucket: 1 },
            { text: 'Deduplicar eventos de pagamento antes de combinar com pedidos', bucket: 1 },
            { text: 'A tabela `fct_vendas_diarias` que o financeiro consulta', bucket: 2 },
            { text: 'A tabela `dim_clientes` com cidade e data do primeiro pedido', bucket: 2 },
          ],
          explanation:
            'Se a limpeza de uma coluna aparece em dois modelos de marts, ela provavelmente devia estar no staging, feita uma vez só.',
        },
        {
          type: 'sql',
          title: 'Escreva o modelo de staging',
          task: 'A tabela bruta `raw_pedidos` veio com nomes em maiúsculas, tudo como texto e um pedido de teste. Escreva o `SELECT` do staging com as colunas `pedido_id` e `cliente_id` (inteiros), `valor` (em reais), `status` (minúsculo e sem espaços) e `data_pedido` (só a data), sem o pedido de status `teste`. Este banco é SQLite: use `CAST`, `LOWER`, `TRIM` e `DATE`.',
          setup: `CREATE TABLE raw_pedidos (
  ID TEXT,
  CLIENTE_ID TEXT,
  VALOR_CENTAVOS TEXT,
  STATUS TEXT,
  CRIADO_EM TEXT
);
INSERT INTO raw_pedidos VALUES
  ('101', '7', '3590', ' Pago', '2026-10-01 10:15:00'),
  ('102', '3', '12000', 'pago ', '2026-10-01 11:40:00'),
  ('103', '7', '2500', 'CANCELADO', '2026-10-02 09:05:00'),
  ('104', '12', '5850', 'pendente', '2026-10-02 18:30:00'),
  ('999', '0', '100', 'TESTE', '2026-10-03 00:00:00'),
  ('105', '3', '990', 'Pago', '2026-10-03 08:00:00');`,
          query: `SELECT
  ID AS pedido_id,
  CLIENTE_ID AS cliente_id,
  VALOR_CENTAVOS,
  STATUS,
  CRIADO_EM
FROM raw_pedidos;`,
          solution: `SELECT
  CAST(ID AS INTEGER) AS pedido_id,
  CAST(CLIENTE_ID AS INTEGER) AS cliente_id,
  CAST(VALOR_CENTAVOS AS INTEGER) / 100.0 AS valor,
  LOWER(TRIM(STATUS)) AS status,
  DATE(CRIADO_EM) AS data_pedido
FROM raw_pedidos
WHERE LOWER(TRIM(STATUS)) <> 'teste';`,
          checks: [
            {
              label:
                'O resultado tem as colunas `pedido_id`, `cliente_id`, `valor`, `status` e `data_pedido`',
              test: "return !!result && ['pedido_id', 'cliente_id', 'valor', 'status', 'data_pedido'].every((c) => result.columns.includes(c));",
            },
            {
              label: 'O pedido de teste ficou de fora (5 pedidos)',
              test: 'return !!result && result.rows.length === 5;',
            },
            {
              label: 'Os IDs viraram números',
              test: "if (!result) return false; const p = result.columns.indexOf('pedido_id'); const c = result.columns.indexOf('cliente_id'); return p >= 0 && c >= 0 && result.rows.every((r) => typeof r[p] === 'number' && typeof r[c] === 'number');",
            },
            {
              label: 'O valor está em reais: o pedido 101 vale 35.9',
              test: "if (!result) return false; const p = result.columns.indexOf('pedido_id'); const v = result.columns.indexOf('valor'); const row = result.rows.find((r) => Number(r[p]) === 101); return v >= 0 && !!row && Math.abs(Number(row[v]) - 35.9) < 0.001;",
            },
            {
              label: 'Os status estão padronizados: 3 pedidos `pago`',
              test: "if (!result) return false; const s = result.columns.indexOf('status'); return s >= 0 && result.rows.filter((r) => r[s] === 'pago').length === 3;",
            },
            {
              label: 'A data do pedido não tem hora',
              test: "if (!result) return false; const d = result.columns.indexOf('data_pedido'); return d >= 0 && result.rows.every((r) => String(r[d]).length === 10);",
            },
          ],
        },
      ],
    },
    {
      id: 'materializacoes',
      title: 'View, table ou incremental',
      blocks: [
        {
          type: 'text',
          text: 'A **materialização** é como o dbt guarda o resultado de um modelo no banco. O `SELECT` é o mesmo; muda o custo de construir e o custo de consultar.',
        },
        {
          type: 'table',
          caption: 'As três materializações mais usadas',
          head: ['Materialização', 'O que o dbt cria', 'Bom para'],
          rows: [
            [
              '`view`',
              'Uma consulta salva. Nada é guardado; roda toda vez que alguém lê',
              'Staging e modelos leves',
            ],
            [
              '`table`',
              'Uma tabela de verdade, reconstruída inteira a cada execução',
              'Marts lidos por painéis, de tamanho moderado',
            ],
            [
              '`incremental`',
              'Uma tabela que recebe só as linhas novas ou alteradas a cada execução',
              'Tabelas enormes que crescem todo dia',
            ],
          ],
        },
        {
          type: 'code',
          language: 'sql',
          caption: 'Um modelo incremental: a marca d’água da aula anterior, escrita em dbt',
          code: "{{ config(materialized='incremental', unique_key='pedido_id') }}\n\nselect * from {{ ref('stg_pedidos') }}\n\n{% if is_incremental() %}\nwhere atualizado_em > (select max(atualizado_em) from {{ this }})\n{% endif %}",
        },
        {
          type: 'text',
          text: 'Na primeira execução, `is_incremental()` é falso e a tabela é criada inteira. Nas seguintes, o filtro traz só o que mudou, e o `unique_key` faz o dbt atualizar em vez de duplicar. `{{ this }}` é a própria tabela do modelo.',
        },
        {
          type: 'quiz',
          question:
            'O modelo `fct_cliques` tem 2 bilhões de linhas e recebe 5 milhões por dia. Como `table`, cada execução leva 3 horas. O que você faria?',
          options: [
            {
              text: 'Trocar para `incremental`, com uma chave única e um filtro de data',
              correct: true,
              feedback:
                'Isso. Processar só os 5 milhões novos leva minutos. É o caso clássico para incremental.',
            },
            {
              text: 'Trocar para `view`, que não guarda nada',
              feedback:
                'A view tiraria as 3 horas da execução, mas jogaria esse custo para cada consulta do painel, que ficaria lento para todo mundo.',
            },
            {
              text: 'Manter `table` e rodar uma vez por semana',
              feedback:
                'Reduz o custo, mas os dados ficam até 7 dias atrasados. O problema é reconstruir tudo, não a frequência.',
            },
          ],
        },
      ],
    },
    {
      id: 'testes',
      title: 'Testes que vigiam os dados',
      blocks: [
        {
          type: 'text',
          text: 'Um teste no dbt é uma consulta que procura **linhas problemáticas**. Se ela devolve zero linhas, o teste passa. Os mais comuns vêm prontos e você só declara em YAML, ao lado da descrição de cada coluna.',
        },
        {
          type: 'anatomy',
          caption: 'O arquivo models/staging/_staging.yml',
          language: 'yaml',
          parts: [
            { text: 'version: 2\n\nmodels:\n  - name: stg_pedidos\n    ' },
            {
              text: 'description: Um pedido por linha, já limpo.',
              label: 'Documentação',
              note: 'O texto vai para o site de documentação que o dbt gera. Quem chega no time descobre o que cada tabela significa sem perguntar.',
            },
            { text: '\n    columns:\n      - name: pedido_id\n        data_tests:\n' },
            {
              text: '          - unique\n          - not_null',
              label: 'unique e not_null',
              note: '`unique` procura valores repetidos; `not_null` procura valores vazios. Juntos garantem que `pedido_id` é uma boa chave.',
            },
            { text: '\n      - name: cliente_id\n        data_tests:\n' },
            {
              text: "          - relationships:\n              arguments:\n                to: ref('stg_clientes')\n                field: cliente_id",
              label: 'relationships',
              note: 'Procura pedidos cujo `cliente_id` não existe em `stg_clientes`: os chamados **órfãos**.',
            },
            { text: '\n      - name: status\n        data_tests:\n' },
            {
              text: "          - accepted_values:\n              arguments:\n                values: ['pago', 'pendente', 'cancelado']",
              label: 'accepted_values',
              note: 'Procura qualquer valor fora da lista. Se a fonte começar a mandar `estornado`, você descobre no teste, não no painel. Em versões antigas do dbt, os valores ficam direto, sem `arguments`.',
            },
          ],
        },
        {
          type: 'classify',
          prompt: 'Que teste pegaria cada problema?',
          buckets: ['unique', 'not_null', 'relationships', 'accepted_values'],
          items: [
            { text: 'O pedido 1002 aparece duas vezes', bucket: 0 },
            { text: 'Um cliente foi cadastrado duas vezes com o mesmo `cliente_id`', bucket: 0 },
            { text: 'Um pedido chegou sem `pedido_id`', bucket: 1 },
            { text: 'Um pedido aponta para o cliente 9, que não existe', bucket: 2 },
            { text: 'Um pedido veio com status `Pago!!`', bucket: 3 },
            { text: 'Uma loja aparece com UF `XX`', bucket: 3 },
          ],
          explanation:
            'Comece por `unique` e `not_null` na chave de todo modelo. São baratos e pegam os erros mais frequentes, como duplicação depois de um `JOIN`.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns',
          text: 'Escrever o nome da tabela à mão em vez de `ref()`, o que quebra a ordem e a linhagem. Repetir a mesma limpeza em vários marts em vez de fazer uma vez no staging. Um modelo gigante de 500 linhas que ninguém consegue testar por partes. E, o mais comum, nenhum teste na chave: duplicação depois de um `JOIN` é o bug número um em dados.',
        },
      ],
    },
    {
      id: 'rodar-e-linhagem',
      title: 'Rodar, testar e enxergar a linhagem',
      blocks: [
        {
          type: 'text',
          text: 'O dbt é usado pela linha de comando. Três comandos fazem quase tudo: `dbt run` constrói os modelos, `dbt test` roda os testes e `dbt build` faz os dois juntos, na ordem das dependências, pulando o que depende de algo que falhou.',
        },
        {
          type: 'terminal',
          title: 'Um dia de trabalho com dbt',
          task: 'Construa o projeto, encontre o teste que falha e reconstrua só o que precisa.',
          steps: [
            {
              goal: 'Entre na pasta do projeto `loja_dbt`.',
              command: ['cd loja_dbt', 'cd loja_dbt/'],
              hint: 'Use `cd` seguido do nome da pasta.',
              prompt: 'voce@computador:~/loja_dbt$',
            },
            {
              goal: 'Construa todos os modelos no banco.',
              command: 'dbt run',
              output:
                "Running with dbt=1.10.11\nRegistered adapter: duckdb=1.10.0\nFound 4 models, 7 data tests, 2 sources, 512 macros\n\nConcurrency: 1 threads (target='dev')\n\n1 of 4 OK created sql view model main.stg_clientes ........ [OK in 0.04s]\n2 of 4 OK created sql view model main.stg_pedidos ......... [OK in 0.03s]\n3 of 4 OK created sql view model main.int_pedidos_com_cliente [OK in 0.03s]\n4 of 4 OK created sql table model main.fct_vendas_diarias . [OK in 0.09s]\n\nFinished running 3 view models, 1 table model in 0.52s.\nCompleted successfully\nDone. PASS=4 WARN=0 ERROR=0 SKIP=0 TOTAL=4",
              hint: 'O comando que constrói os modelos é `dbt run`.',
            },
            {
              goal: 'Agora rode os testes declarados no YAML.',
              command: 'dbt test',
              output:
                'Running with dbt=1.10.11\nFound 4 models, 7 data tests, 2 sources, 512 macros\n\n1 of 7 PASS accepted_values_stg_pedidos_status ........ [PASS in 0.03s]\n2 of 7 PASS not_null_stg_clientes_cliente_id ........... [PASS in 0.02s]\n3 of 7 PASS not_null_stg_pedidos_pedido_id ............. [PASS in 0.02s]\n4 of 7 PASS relationships_stg_pedidos_cliente_id ....... [PASS in 0.03s]\n5 of 7 PASS unique_stg_clientes_cliente_id ............. [PASS in 0.02s]\n6 of 7 FAIL 1 unique_stg_pedidos_pedido_id ............. [FAIL 1 in 0.02s]\n7 of 7 PASS not_null_fct_vendas_diarias_data_pedido .... [PASS in 0.02s]\n\nCompleted with 1 error, 0 partial successes, and 0 warnings:\n\nFailure in test unique_stg_pedidos_pedido_id (models/staging/_staging.yml)\n  Got 1 result, configured to fail if != 0\n\nDone. PASS=6 WARN=0 ERROR=1 SKIP=0 TOTAL=7',
              hint: 'O comando é `dbt test`.',
            },
            {
              goal: 'Você investigou: um pedido veio repetido da fonte, e já acrescentou a deduplicação em `stg_pedidos`. Construa e teste só esse modelo e tudo o que depende dele (o `+` depois do nome).',
              command: [
                'dbt build --select stg_pedidos+',
                'dbt build -s stg_pedidos+',
                'dbt build --select "stg_pedidos+"',
              ],
              output:
                'Running with dbt=1.10.11\nFound 4 models, 7 data tests, 2 sources, 512 macros\n\n1 of 8 OK created sql view model main.stg_pedidos ......... [OK in 0.03s]\n2 of 8 PASS accepted_values_stg_pedidos_status ............ [PASS in 0.02s]\n3 of 8 PASS not_null_stg_pedidos_pedido_id ................ [PASS in 0.02s]\n4 of 8 PASS relationships_stg_pedidos_cliente_id .......... [PASS in 0.02s]\n5 of 8 PASS unique_stg_pedidos_pedido_id .................. [PASS in 0.02s]\n6 of 8 OK created sql view model main.int_pedidos_com_cliente [OK in 0.03s]\n7 of 8 OK created sql table model main.fct_vendas_diarias . [OK in 0.08s]\n8 of 8 PASS not_null_fct_vendas_diarias_data_pedido ....... [PASS in 0.02s]\n\nCompleted successfully\nDone. PASS=8 WARN=0 ERROR=0 SKIP=0 TOTAL=8',
              hint: 'Use `dbt build --select stg_pedidos+`.',
            },
            {
              goal: 'Gere o site de documentação, que inclui o gráfico de linhagem.',
              command: 'dbt docs generate',
              output:
                'Running with dbt=1.10.11\nFound 4 models, 7 data tests, 2 sources, 512 macros\n\nBuilding catalog\nCatalog written to /home/voce/loja_dbt/target/catalog.json',
              hint: 'É `dbt docs generate`. Depois, `dbt docs serve` abre o site no navegador.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Repare na ordem do `dbt build`: o teste de `stg_pedidos` rodou **antes** dos modelos que dependem dele. Se tivesse falhado, `fct_vendas_diarias` seria pulado (`SKIP`) e o painel continuaria com os números de ontem, em vez de números errados.',
        },
        {
          type: 'flow',
          caption: 'Linhagem: de onde vem cada número do painel',
          actors: ['loja.pedidos', 'stg_pedidos', 'fct_vendas_dia', 'Painel'],
          steps: [
            {
              from: 0,
              to: 1,
              label: "source('loja','pedidos')",
              text: 'O staging lê a tabela bruta carregada pelo pipeline.',
            },
            {
              from: 1,
              to: 1,
              label: 'unique, not_null: PASS',
              text: 'Os testes do staging rodam antes de qualquer modelo que dependa dele.',
              tone: 'ok',
            },
            {
              from: 1,
              to: 2,
              label: "ref('stg_pedidos')",
              text: 'O mart soma o faturamento por dia a partir do staging.',
            },
            {
              from: 2,
              to: 3,
              label: 'Faturamento por dia',
              text: 'O painel lê só o mart. Quem olha o gráfico pode seguir a linhagem de volta até a fonte.',
              tone: 'ok',
            },
            {
              from: 0,
              to: 1,
              label: 'Pedido 103 repetido',
              text: 'No dia seguinte, a fonte manda um pedido duplicado.',
            },
            {
              from: 1,
              to: 1,
              label: 'unique: FAIL',
              text: 'O teste de unicidade encontra a linha repetida.',
              tone: 'error',
            },
            {
              from: 1,
              to: 2,
              label: 'fct pulado (SKIP)',
              text: 'O `dbt build` não reconstrói o mart. O painel mostra dados de ontem, corretos, em vez de dados de hoje, errados.',
              tone: 'error',
            },
          ],
        },
        {
          type: 'order',
          prompt: 'Em que ordem o `dbt build` executa este projeto?',
          items: [
            'Lê a fonte `loja.pedidos` (declarada em `_sources.yml`)',
            'Cria a view `stg_pedidos`',
            'Testa `stg_pedidos` com `unique` e `not_null`',
            "Cria `int_pedidos_com_cliente`, que usa `ref('stg_pedidos')`",
            'Cria a tabela `fct_vendas_diarias`',
            'Testa `fct_vendas_diarias`',
          ],
          explanation:
            'A ordem não foi escrita em lugar nenhum: o dbt deduz pelos `ref()` e `source()`. Essa rede de dependências é a **linhagem**.',
        },
      ],
    },
  ],
  recap: [
    'O dbt cuida do **T** do ELT: cada modelo é um `SELECT` num arquivo, e o dbt cria a tabela ou view no banco.',
    '`source()` aponta para tabelas brutas e `ref()` para outros modelos; dessas referências saem a ordem de execução e a linhagem.',
    'Staging limpa cada fonte, intermediate combina e reaproveita lógica, marts entregam tabelas prontas para consumo.',
    'A materialização (`view`, `table`, `incremental`) troca custo de construção por custo de consulta.',
    'Testes como `unique`, `not_null`, `relationships` e `accepted_values` procuram linhas problemáticas, e o `dbt build` não deixa um erro chegar aos marts.',
  ],
  cards: [
    {
      id: 'modelo-dbt',
      front: 'O que é um modelo no dbt?',
      back: 'Um arquivo `.sql` com um `SELECT`. O dbt cria uma view ou tabela com o nome do arquivo.',
    },
    {
      id: 'ref-source',
      front: 'Qual a diferença entre `ref()` e `source()`?',
      back: '`source()` aponta para uma tabela bruta carregada pelo pipeline; `ref()` aponta para outro modelo dbt.',
    },
    {
      id: 'camadas-dbt',
      front: 'Para que servem as camadas staging, intermediate e marts?',
      back: 'Staging limpa cada fonte; intermediate combina e reaproveita lógica; marts são as tabelas prontas para consumo.',
    },
    {
      id: 'materializacao',
      front: 'Quando usar a materialização `incremental`?',
      back: 'Em tabelas grandes que crescem todo dia, para processar só as linhas novas ou alteradas.',
    },
    {
      id: 'teste-dbt',
      front: 'Quando um teste do dbt passa?',
      back: 'Quando a consulta do teste, que procura linhas problemáticas, devolve zero linhas.',
    },
    {
      id: 'relationships',
      front: 'O que o teste `relationships` encontra?',
      back: 'Registros órfãos: valores de uma coluna que não existem na tabela relacionada.',
    },
    {
      id: 'dbt-build',
      front: 'O que o `dbt build` faz de diferente do `dbt run`?',
      back: 'Roda modelos e testes juntos, na ordem das dependências, e pula o que depende de algo que falhou.',
    },
  ],
  mission: {
    title: 'Seu primeiro projeto dbt local',
    text: 'Use o dbt com DuckDB, que roda no seu computador sem servidor nem custo, sobre um conjunto de dados público ou sintético já carregado por você.',
    steps: [
      'Instale `dbt-duckdb` num ambiente virtual Python e crie o projeto com `dbt init`',
      'Declare suas tabelas brutas em `_sources.yml` e crie um modelo `stg_` para cada uma',
      'Crie um modelo de marts que junte duas tabelas usando `ref()`',
      'Adicione `unique` e `not_null` na chave de cada modelo e um `relationships` entre eles',
      'Rode `dbt build`, provoque uma falha inserindo uma linha duplicada na fonte e veja o mart ser pulado',
      'Gere a documentação com `dbt docs generate` e tire um print do gráfico de linhagem para o README',
    ],
  },
  sources: [
    {
      title: 'dbt: About models',
      url: 'https://docs.getdbt.com/docs/build/models',
    },
    {
      title: 'dbt: How we structure our dbt projects',
      url: 'https://docs.getdbt.com/best-practices/how-we-structure/1-guide-overview',
    },
    {
      title: 'dbt: Data tests',
      url: 'https://docs.getdbt.com/docs/build/data-tests',
    },
    {
      title: 'dbt: Materializations',
      url: 'https://docs.getdbt.com/docs/build/materializations',
    },
  ],
};
