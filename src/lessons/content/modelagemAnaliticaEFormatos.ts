import { LessonContent } from '../types';

const estrela = `CREATE TABLE dim_produto (
  produto_id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  categoria TEXT NOT NULL
);
CREATE TABLE dim_loja (
  loja_id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  cidade TEXT NOT NULL,
  regiao TEXT NOT NULL
);
CREATE TABLE dim_data (
  data_id TEXT PRIMARY KEY,
  mes TEXT NOT NULL,
  dia_semana TEXT NOT NULL,
  feriado INTEGER NOT NULL
);
CREATE TABLE fato_vendas (
  venda_id INTEGER PRIMARY KEY,
  data_id TEXT NOT NULL REFERENCES dim_data(data_id),
  loja_id INTEGER NOT NULL REFERENCES dim_loja(loja_id),
  produto_id INTEGER NOT NULL REFERENCES dim_produto(produto_id),
  quantidade INTEGER NOT NULL,
  valor REAL NOT NULL
);
INSERT INTO dim_produto VALUES
  (1, 'Pão francês', 'Padaria'),
  (2, 'Bolo de milho', 'Padaria'),
  (3, 'Café 500g', 'Mercearia'),
  (4, 'Leite 1L', 'Laticínios'),
  (5, 'Queijo coalho', 'Laticínios');
INSERT INTO dim_loja VALUES
  (1, 'Loja Boa Viagem', 'Recife', 'Nordeste'),
  (2, 'Loja Pituba', 'Salvador', 'Nordeste'),
  (3, 'Loja Nazaré', 'Belém', 'Norte');
INSERT INTO dim_data VALUES
  ('2026-09-07', '2026-09', 'segunda', 1),
  ('2026-09-08', '2026-09', 'terça', 0),
  ('2026-10-12', '2026-10', 'segunda', 1),
  ('2026-10-13', '2026-10', 'terça', 0);
INSERT INTO fato_vendas VALUES
  (1, '2026-09-07', 1, 1, 20, 15.0),
  (2, '2026-09-07', 1, 3, 2, 36.0),
  (3, '2026-09-08', 2, 2, 1, 18.0),
  (4, '2026-09-08', 3, 4, 6, 33.0),
  (5, '2026-10-12', 1, 5, 2, 50.0),
  (6, '2026-10-12', 2, 1, 30, 22.5),
  (7, '2026-10-13', 3, 3, 1, 18.0),
  (8, '2026-10-13', 3, 2, 2, 36.0),
  (9, '2026-10-13', 2, 4, 4, 22.0);`;

const acha = `if (!result) return false;
const col = (n) => result.columns.map((c) => c.toLowerCase()).indexOf(n);
const perto = (a, b) => a !== null && a !== undefined && Math.abs(Number(a) - b) < 0.01;`;

export const content: LessonContent = {
  hook: 'Imagine uma rede de supermercados com milhões de vendas por dia. A diretoria pergunta quanto a categoria Padaria vendeu no Nordeste nos feriados, e quer a resposta em segundos, não em horas. Isso depende de duas decisões que a engenharia de dados toma bem antes da pergunta chegar: como organizar as tabelas e em que formato guardar os arquivos. Nesta aula você aprende as duas.',
  sections: [
    {
      id: 'fato-e-dimensao',
      title: 'Fatos e dimensões: o que aconteceu e o contexto',
      blocks: [
        {
          type: 'analogy',
          title: 'O cupom fiscal',
          text: 'Olhe um cupom do mercado. Cada linha registra algo que **aconteceu** e pode ser somado: 2 pacotes de café, 36 reais. Em volta dessas linhas está o **contexto**: qual loja, que dia, que produto, de que categoria. Os números são os fatos; o contexto são as dimensões.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Tabela fato',
              text: 'Guarda os eventos medidos: vendas, entregas, consultas. Tem muitas linhas, colunas numéricas que se somam (as **medidas**) e chaves que apontam para as dimensões.',
            },
            {
              term: 'Tabela dimensão',
              text: 'Guarda o contexto descritivo: produto, loja, cliente, data. Tem poucas linhas e muitas colunas de texto usadas para filtrar e agrupar.',
            },
            {
              term: 'Medida',
              text: 'Um número do evento que faz sentido somar ou tirar média: quantidade, valor, desconto.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Na aula de tabelas e relações, você viu como separar dados em várias tabelas para evitar repetição: é assim que um banco **OLTP**, o do aplicativo, é organizado. Para análise, a prioridade muda. Você aceita repetir um pouco de texto nas dimensões em troca de consultas simples, com poucos JOINs.',
        },
        {
          type: 'classify',
          prompt:
            'Você está modelando as vendas de uma padaria. Cada informação vai para o fato ou para uma dimensão?',
          buckets: ['Medida no fato', 'Atributo de uma dimensão'],
          items: [
            { text: 'Quantidade vendida', bucket: 0 },
            { text: 'Valor pago', bucket: 0 },
            { text: 'Desconto aplicado', bucket: 0 },
            { text: 'Nome do produto', bucket: 1 },
            { text: 'Categoria do produto', bucket: 1 },
            { text: 'Cidade da loja', bucket: 1 },
            { text: 'Dia da semana', bucket: 1 },
            { text: 'Forma de pagamento', bucket: 1 },
          ],
          explanation:
            'Pergunta-teste: faz sentido somar? Somar quantidades e valores faz; somar nomes de produto ou dias da semana não. O que não se soma costuma ser usado para filtrar e agrupar, e mora numa dimensão.',
        },
      ],
    },
    {
      id: 'esquema-estrela',
      title: 'O esquema estrela na prática',
      blocks: [
        {
          type: 'text',
          text: 'Quando você desenha a tabela fato no centro e as dimensões em volta, cada uma ligada ao fato por uma chave, o desenho parece uma estrela. Daí o nome **esquema estrela** (star schema), o modelo mais usado em data warehouses.',
        },
        {
          type: 'anatomy',
          caption: 'O esquema estrela das vendas usado nos exercícios. Explore cada tabela.',
          language: 'text',
          parts: [
            { text: '              ' },
            {
              text: 'dim_produto',
              label: 'dim_produto',
              note: 'Uma linha por produto: nome e categoria. Para saber vendas por categoria, você agrupa por uma coluna daqui.',
            },
            { text: '\n                   |\n' },
            {
              text: 'dim_data',
              label: 'dim_data',
              note: 'Parece estranho ter uma tabela só de datas, mas ela guarda o que o calendário não diz sozinho: mês, dia da semana, se era feriado ou Black Friday.',
            },
            { text: ' ---- ' },
            {
              text: 'fato_vendas',
              label: 'fato_vendas',
              note: 'O centro. Cada linha é **um produto vendido em uma loja em um dia**, com `quantidade` e `valor`. Tem as chaves `produto_id`, `loja_id` e `data_id`.',
            },
            { text: ' ---- ' },
            {
              text: 'dim_loja',
              label: 'dim_loja',
              note: 'Uma linha por loja, com cidade e região. Se uma loja nova abre, entra uma linha aqui e nada muda no fato.',
            },
          ],
        },
        {
          type: 'sql',
          title: 'Faturamento por categoria e mês',
          task: 'Junte o fato com `dim_produto` e `dim_data` e devolva `categoria`, `mes` e `faturamento` (soma de `valor`), uma linha por categoria e mês.',
          setup: estrela,
          query: `SELECT produto_id, SUM(valor) AS faturamento
FROM fato_vendas
GROUP BY produto_id;`,
          solution: `SELECT p.categoria, d.mes, SUM(f.valor) AS faturamento
FROM fato_vendas f
JOIN dim_produto p ON p.produto_id = f.produto_id
JOIN dim_data d ON d.data_id = f.data_id
GROUP BY p.categoria, d.mes
ORDER BY d.mes, faturamento DESC;`,
          checks: [
            {
              label: 'Uma linha por categoria e mês (6 linhas)',
              test: `${acha}\nreturn result.rows.length === 6 && col('categoria') >= 0 && col('mes') >= 0;`,
            },
            {
              label: 'Padaria faturou 58,50 em outubro',
              test: `${acha}\nconst r = result.rows.find((x) => x[col('categoria')] === 'Padaria' && x[col('mes')] === '2026-10');\nreturn !!r && perto(r[col('faturamento')], 58.5);`,
            },
            {
              label: 'Laticínios faturou 72 em outubro',
              test: `${acha}\nconst r = result.rows.find((x) => x[col('categoria')] === 'Laticínios' && x[col('mes')] === '2026-10');\nreturn !!r && perto(r[col('faturamento')], 72);`,
            },
          ],
        },
        {
          type: 'sql',
          title: 'Feriados por região',
          task: 'Compare o faturamento em feriados e dias normais por região: devolva `regiao`, `feriado` (o 0 ou 1 de `dim_data`) e `faturamento`.',
          setup: estrela,
          query: `SELECT l.regiao, SUM(f.valor) AS faturamento
FROM fato_vendas f
JOIN dim_loja l ON l.loja_id = f.loja_id
GROUP BY l.regiao;`,
          solution: `SELECT l.regiao, d.feriado, SUM(f.valor) AS faturamento
FROM fato_vendas f
JOIN dim_loja l ON l.loja_id = f.loja_id
JOIN dim_data d ON d.data_id = f.data_id
GROUP BY l.regiao, d.feriado
ORDER BY l.regiao, d.feriado;`,
          checks: [
            {
              label: 'Há uma linha por região e tipo de dia (3 combinações com vendas)',
              test: `${acha}\nreturn result.rows.length === 3 && col('feriado') >= 0;`,
            },
            {
              label: 'O Nordeste faturou 123,50 em feriados',
              test: `${acha}\nconst r = result.rows.find((x) => x[col('regiao')] === 'Nordeste' && String(x[col('feriado')]) === '1');\nreturn !!r && perto(r[col('faturamento')], 123.5);`,
            },
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Repare no formato das consultas',
          text: 'Toda pergunta virou o mesmo molde: fato no `FROM`, um `JOIN` por dimensão necessária, `GROUP BY` nas colunas das dimensões, `SUM` nas medidas. É essa previsibilidade que faz ferramentas de painel e analistas gostarem do esquema estrela.',
        },
      ],
    },
    {
      id: 'granularidade-do-fato',
      title: 'Granularidade: decida o que é uma linha',
      blocks: [
        {
          type: 'text',
          text: 'Na aula de SQL analítico você viu que somar coisas de granularidades diferentes gera dupla contagem. Na modelagem, a granularidade é a **primeira decisão**: antes de escolher colunas, você escreve numa frase o que uma linha do fato representa. No exercício anterior: “uma linha por produto vendido, por loja, por dia”.',
        },
        {
          type: 'quiz',
          question:
            'A rede quer descobrir quais produtos são comprados juntos, como café e pão. Qual granularidade da tabela fato permite essa análise?',
          options: [
            {
              text: 'Uma linha por item de cada cupom, com o número do cupom',
              correct: true,
              feedback:
                'Isso. Com o número do cupom em cada item, você agrupa os itens de uma mesma compra e vê o que aparece junto. É a granularidade mais fina possível para vendas.',
            },
            {
              text: 'Uma linha por cupom, com o valor total da compra',
              feedback:
                'Assim você sabe quanto cada compra custou, mas não o que havia nela. Os produtos se perderam ao somar.',
            },
            {
              text: 'Uma linha por produto, por loja, por dia',
              feedback:
                'Essa granularidade, a do exercício, já somou as compras do dia. Você sabe que vendeu 30 pães e 2 cafés, mas não se foram na mesma compra.',
            },
            {
              text: 'Uma linha por loja, por mês',
              feedback:
                'É um resumo útil para a diretoria, mas grosso demais: produto e compra já desapareceram.',
            },
          ],
        },
        {
          type: 'reveal',
          question:
            'Se a granularidade mais fina ocupa mais espaço, por que ela costuma ser a escolha recomendada?',
          answer:
            'Porque dá para somar do fino para o grosso a qualquer momento, mas nunca o contrário. De itens de cupom você chega a vendas por mês; de vendas por mês, nunca volta aos itens. Guardar armazenamento é barato; perder detalhe é irreversível.',
        },
      ],
    },
    {
      id: 'historico-scd',
      title: 'Quando a dimensão muda: histórico com SCD tipo 2',
      blocks: [
        {
          type: 'analogy',
          title: 'A cliente que se mudou',
          text: 'Joana comprou durante meses morando em Recife e, em setembro, se mudou para São Paulo. Se você simplesmente trocar a cidade dela no cadastro, todas as compras antigas passam a contar como vendas de São Paulo. O relatório do ano passado muda sozinho, e ninguém entende por quê.',
        },
        {
          type: 'text',
          text: 'Dimensões que mudam devagar ganharam um nome: **SCD** (slowly changing dimension, dimensão que muda lentamente). No **tipo 1**, você sobrescreve o valor antigo e perde o histórico. No **tipo 2**, você guarda uma nova linha para cada versão, com o período em que ela valeu.',
        },
        {
          type: 'table',
          caption: 'A dimensão de clientes em SCD tipo 2',
          head: ['cliente_sk', 'cliente_id', 'nome', 'cidade', 'valido_de', 'valido_ate', 'atual'],
          rows: [
            ['1', '10', 'Joana', 'Recife', '2026-01-01', '2026-08-31', '0'],
            ['2', '10', 'Joana', 'São Paulo', '2026-09-01', '9999-12-31', '1'],
            ['3', '11', 'Marcos', 'Belém', '2026-01-01', '9999-12-31', '1'],
          ],
        },
        {
          type: 'text',
          text: 'O `cliente_id` é a chave do sistema de origem e se repete entre versões. O `cliente_sk` é uma **chave substituta** (surrogate key): um número criado no warehouse para identificar cada versão. A data `9999-12-31` é uma convenção para “ainda vale”.',
        },
        {
          type: 'sql',
          title: 'Vendas pela cidade da época',
          task: 'A consulta usa a cidade **atual** de cada cliente e joga todas as compras da Joana em São Paulo. Corrija o JOIN para usar a versão válida na data de cada pedido (`f.data BETWEEN d.valido_de AND d.valido_ate`), devolvendo `cidade` e `faturamento`.',
          setup: `CREATE TABLE dim_cliente (
  cliente_sk INTEGER PRIMARY KEY,
  cliente_id INTEGER NOT NULL,
  nome TEXT NOT NULL,
  cidade TEXT NOT NULL,
  valido_de TEXT NOT NULL,
  valido_ate TEXT NOT NULL,
  atual INTEGER NOT NULL
);
CREATE TABLE fato_pedidos (
  pedido_id INTEGER PRIMARY KEY,
  cliente_id INTEGER NOT NULL,
  data TEXT NOT NULL,
  valor REAL NOT NULL
);
INSERT INTO dim_cliente VALUES
  (1, 10, 'Joana', 'Recife', '2026-01-01', '2026-08-31', 0),
  (2, 10, 'Joana', 'São Paulo', '2026-09-01', '9999-12-31', 1),
  (3, 11, 'Marcos', 'Belém', '2026-01-01', '9999-12-31', 1);
INSERT INTO fato_pedidos VALUES
  (1, 10, '2026-07-10', 100.0),
  (2, 10, '2026-08-20', 50.0),
  (3, 10, '2026-09-15', 80.0),
  (4, 11, '2026-09-20', 40.0);`,
          query: `SELECT d.cidade, SUM(f.valor) AS faturamento
FROM fato_pedidos f
JOIN dim_cliente d ON d.cliente_id = f.cliente_id AND d.atual = 1
GROUP BY d.cidade;`,
          solution: `SELECT d.cidade, SUM(f.valor) AS faturamento
FROM fato_pedidos f
JOIN dim_cliente d
  ON d.cliente_id = f.cliente_id
  AND f.data BETWEEN d.valido_de AND d.valido_ate
GROUP BY d.cidade;`,
          checks: [
            {
              label: 'Recife recebe as compras de julho e agosto (150)',
              test: `${acha}\nconst r = result.rows.find((x) => x[col('cidade')] === 'Recife');\nreturn !!r && perto(r[col('faturamento')], 150);`,
            },
            {
              label: 'São Paulo fica só com a compra de setembro (80)',
              test: `${acha}\nconst r = result.rows.find((x) => x[col('cidade')] === 'São Paulo');\nreturn !!r && perto(r[col('faturamento')], 80);`,
            },
            {
              label: 'O total continua 270 (nenhum pedido duplicou nem sumiu)',
              test: `${acha}\nconst t = result.rows.reduce((s, x) => s + Number(x[col('faturamento')]), 0);\nreturn Math.abs(t - 270) < 0.01;`,
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Uma cliente percebeu que o nome dela estava cadastrado como “Mraia” e pediu a correção para “Maria”. Como tratar na dimensão?',
          options: [
            {
              text: 'Sobrescrever o nome (tipo 1), porque é a correção de um erro, não uma mudança real',
              correct: true,
              feedback:
                'Isso. Ela nunca se chamou “Mraia”; guardar essa versão só espalharia o erro pelos relatórios antigos. Histórico serve para mudanças reais, como endereço ou plano.',
            },
            {
              text: 'Criar uma nova versão (tipo 2), para nunca perder nada',
              feedback:
                'Guardar tudo parece seguro, mas aqui o histórico é falso: os relatórios antigos continuariam mostrando um nome que nunca existiu.',
            },
            {
              text: 'Apagar a cliente e criar outra com o nome certo',
              feedback:
                'Apagar quebra a ligação com as compras antigas no fato. A cliente é a mesma; só um atributo mudou.',
            },
          ],
        },
      ],
    },
    {
      id: 'formatos',
      title: 'Formatos de arquivo: por linha ou por coluna',
      blocks: [
        {
          type: 'analogy',
          title: 'Fichas ou gavetas',
          text: 'Imagine um arquivo de fichas de pacientes: cada ficha tem nome, idade, cidade e peso de uma pessoa. Para calcular o peso médio de todos, você abre ficha por ficha. Agora imagine um móvel com uma gaveta só para pesos, outra só para idades. Para a média de peso, você abre uma gaveta e pronto. O primeiro é armazenamento **por linha**; o segundo, **por coluna** (colunar).',
        },
        {
          type: 'table',
          caption: 'Os formatos que você vai encontrar',
          head: ['Formato', 'Organização', 'Tem tipos e esquema?', 'Pontos fortes'],
          rows: [
            [
              '**CSV**',
              'Por linha, texto',
              'Não: tudo é texto',
              'Simples, abre em qualquer lugar, inclusive no Excel',
            ],
            [
              '**JSON**',
              'Por registro, texto',
              'Parcial',
              'Dados aninhados, APIs, legível por humanos',
            ],
            [
              '**Avro**',
              'Por linha, binário',
              'Sim, com esquema junto',
              'Escrever registro a registro, streaming, esquema que evolui',
            ],
            [
              '**Parquet**',
              'Por coluna, binário',
              'Sim',
              'Análise: lê só as colunas pedidas e comprime muito bem',
            ],
          ],
        },
        {
          type: 'text',
          text: 'O Parquet ganha em análise por dois motivos. Primeiro, uma consulta que usa 3 de 50 colunas lê só essas 3. Segundo, valores parecidos ficam juntos (uma coluna inteira de cidades, por exemplo), e dados repetitivos **comprimem** muito melhor. É comum um CSV de 400 MB virar um Parquet de 60 MB.',
        },
        {
          type: 'python',
          title: 'De linhas para colunas',
          task: 'Transforme a lista `vendas` (uma linha por venda) no dicionário `colunas`, com uma lista por coluna (`data`, `cidade`, `valor`), na mesma ordem. Depois calcule `total` somando só a lista de valores. Veja no fim a diferença de tamanho depois de comprimir.',
          code: `import json
import zlib

cidades = ['Recife', 'Salvador', 'Belém']
vendas = [
    {'data': '2026-10-%02d' % (i % 28 + 1), 'cidade': cidades[i % 3], 'valor': float(i % 50)}
    for i in range(1000)
]
print('Primeira linha:', vendas[0])

colunas = {}  # ex.: {'data': [...], 'cidade': [...], 'valor': [...]}
total = 0     # some apenas colunas['valor']

print('Total:', total)
por_linha = len(zlib.compress(json.dumps(vendas).encode()))
por_coluna = len(zlib.compress(json.dumps(colunas).encode()))
print('Por linha, comprimido:', por_linha, 'bytes')
print('Por coluna, comprimido:', por_coluna, 'bytes')
`,
          solution: `import json
import zlib

cidades = ['Recife', 'Salvador', 'Belém']
vendas = [
    {'data': '2026-10-%02d' % (i % 28 + 1), 'cidade': cidades[i % 3], 'valor': float(i % 50)}
    for i in range(1000)
]
print('Primeira linha:', vendas[0])

colunas = {'data': [], 'cidade': [], 'valor': []}
for venda in vendas:
    for nome in colunas:
        colunas[nome].append(venda[nome])
total = sum(colunas['valor'])

print('Total:', total)
por_linha = len(zlib.compress(json.dumps(vendas).encode()))
por_coluna = len(zlib.compress(json.dumps(colunas).encode()))
print('Por linha, comprimido:', por_linha, 'bytes')
print('Por coluna, comprimido:', por_coluna, 'bytes')
`,
          checks: [
            {
              label: '`colunas` tem exatamente as chaves `data`, `cidade` e `valor`',
              test: "set(colunas) == {'data', 'cidade', 'valor'}",
            },
            {
              label: 'As cidades estão na mesma ordem das vendas',
              test: "colunas['cidade'][:3] == ['Recife', 'Salvador', 'Belém'] and len(colunas['cidade']) == 1000",
            },
            {
              label: '`total` é a soma da coluna de valores',
              test: "total == sum(v['valor'] for v in vendas) and total > 0",
            },
            { label: 'O formato por coluna ficou menor', test: 'por_coluna < por_linha' },
          ],
        },
        {
          type: 'classify',
          prompt: 'Qual formato combina melhor com cada situação?',
          buckets: ['CSV', 'JSON', 'Parquet', 'Avro'],
          items: [
            { text: 'Mandar uma planilha para o financeiro abrir no Excel', bucket: 0 },
            { text: 'Exportação simples de um sistema antigo, sem tipos', bucket: 0 },
            { text: 'Guardar a resposta de uma API com endereço dentro do cliente', bucket: 1 },
            { text: 'Um arquivo de configuração com listas, lido por pessoas', bucket: 1 },
            { text: 'Tabela de 2 bilhões de vendas consultada por poucas colunas', bucket: 2 },
            { text: 'Somar o valor das vendas do ano lendo só a coluna de valor', bucket: 2 },
            { text: 'Eventos gravados um a um num fluxo contínuo', bucket: 3 },
            { text: 'Mensagens cujo esquema ganha campos novos com o tempo', bucket: 3 },
          ],
          explanation:
            'CSV e JSON são para troca e leitura humana. Parquet é para análise de muitas linhas por poucas colunas. Avro brilha quando cada registro é escrito inteiro, como em streaming, e o esquema precisa evoluir sem quebrar quem lê.',
        },
      ],
    },
    {
      id: 'particionamento-e-armazenamento',
      title: 'Particionar e escolher onde guardar',
      blocks: [
        {
          type: 'text',
          text: '**Particionar** é dividir uma tabela grande em pastas por uma coluna, quase sempre a data: `ano=2026/mes=10/`. Quando a consulta pede só outubro, o motor de consulta nem abre as outras pastas. É como o arquivo morto de um escritório, com uma caixa por mês.',
        },
        {
          type: 'terminal',
          title: 'Passeio por um data lake local',
          task: 'Explore as camadas do lake, encontre a partição de outubro e compare o tamanho do CSV bruto com o Parquet tratado.',
          prompt: '~/lake$',
          steps: [
            {
              goal: 'Liste o conteúdo da pasta atual',
              command: ['ls', 'ls -1'],
              output: 'analitico  bruto  tratado',
              hint: 'Use `ls`.',
            },
            {
              goal: 'Veja as partições de 2026 da tabela de vendas tratada, em `tratado/vendas/ano=2026`',
              command: ['ls tratado/vendas/ano=2026', 'ls tratado/vendas/ano=2026/'],
              output: 'mes=08  mes=09  mes=10',
              hint: 'Digite `ls tratado/vendas/ano=2026`.',
            },
            {
              goal: 'Liste os arquivos da partição de outubro',
              command: ['ls tratado/vendas/ano=2026/mes=10', 'ls tratado/vendas/ano=2026/mes=10/'],
              output: 'parte-0000.parquet  parte-0001.parquet',
              hint: 'Acrescente `/mes=10` ao caminho anterior.',
            },
            {
              goal: 'Compare o tamanho do CSV bruto de outubro (`bruto/vendas_2026_10.csv`) com a partição em Parquet, usando `du -sh`',
              command: [
                'du -sh bruto/vendas_2026_10.csv tratado/vendas/ano=2026/mes=10',
                'du -sh bruto/vendas_2026_10.csv tratado/vendas/ano=2026/mes=10/',
                'du -hs bruto/vendas_2026_10.csv tratado/vendas/ano=2026/mes=10',
              ],
              output: '412M\tbruto/vendas_2026_10.csv\n 61M\ttratado/vendas/ano=2026/mes=10',
              hint: 'Digite `du -sh bruto/vendas_2026_10.csv tratado/vendas/ano=2026/mes=10`.',
            },
            {
              goal: 'Some o valor das vendas de outubro com o DuckDB lendo só essa partição',
              command: [
                'duckdb -c "SELECT SUM(valor) FROM \'tratado/vendas/ano=2026/mes=10/*.parquet\'"',
                'duckdb -c "SELECT SUM(valor) FROM \'tratado/vendas/ano=2026/mes=10/*.parquet\';"',
              ],
              output:
                '┌──────────────┐\n│ sum(valor)   │\n│    double    │\n├──────────────┤\n│ 18734512.75  │\n└──────────────┘',
              hint: 'Digite `duckdb -c "SELECT SUM(valor) FROM \'tratado/vendas/ano=2026/mes=10/*.parquet\'"`.',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Quase todas as consultas na tabela de vendas filtram por período. Qual coluna faz mais sentido para particionar?',
          options: [
            {
              text: 'A data da venda, por ano e mês',
              correct: true,
              feedback:
                'Isso. Particione pela coluna que mais aparece nos filtros. Com partições mensais, uma consulta de outubro lê só uma pasta.',
            },
            {
              text: 'O id do cliente',
              feedback:
                'Com milhões de clientes, seriam milhões de pastas minúsculas. Muitos arquivos pequenos deixam tudo mais lento, e as consultas por período teriam de abrir todas.',
            },
            {
              text: 'O valor da venda',
              feedback:
                'Quase todo valor é diferente, então cada pasta teria pouquíssimas linhas. E ninguém costuma filtrar por um valor exato.',
            },
          ],
        },
        {
          type: 'table',
          caption: 'Onde os dados analíticos moram',
          head: ['', 'Data lake', 'Data warehouse', 'Lakehouse'],
          rows: [
            [
              'O que é',
              'Arquivos em armazenamento barato (pastas, S3)',
              'Banco analítico com tabelas e SQL',
              'Arquivos do lake com recursos de warehouse',
            ],
            [
              'Formato',
              'Qualquer um: CSV, JSON, Parquet, imagens',
              'Interno, gerenciado pelo banco',
              'Parquet com uma camada de tabela (Delta Lake, Iceberg)',
            ],
            [
              'Pontos fortes',
              'Guarda tudo, inclusive o bruto, a baixo custo',
              'Consultas rápidas, controle de acesso, transações',
              'Um só lugar para bruto e analítico, com SQL e histórico',
            ],
            [
              'Risco',
              'Virar um “pântano” sem organização',
              'Custo maior e menos flexível com dados não tabulares',
              'Mais peças para configurar e entender',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns de modelagem',
          text: 'Começar pelas colunas sem escrever a granularidade do fato. Guardar textos descritivos no fato em vez de numa dimensão. Sobrescrever atributos que precisavam de histórico. Particionar por uma coluna com valores demais. E escolher Parquet para um arquivo que só vai ser aberto no Excel: o formato serve ao uso, não à moda.',
        },
      ],
    },
  ],
  recap: [
    'A **tabela fato** guarda eventos com medidas que se somam; as **dimensões** guardam o contexto usado para filtrar e agrupar.',
    'No **esquema estrela**, o fato fica no centro e cada dimensão se liga a ele por uma chave, deixando as consultas simples e previsíveis.',
    'A granularidade do fato é a primeira decisão de modelagem, e a mais fina permite sempre resumir depois.',
    'SCD tipo 2 guarda uma linha por versão de um atributo que muda, com período de validade, para que relatórios antigos não mudem sozinhos.',
    'Parquet guarda por coluna e comprime bem, ideal para análise; particionar por data faz a consulta ler só as pastas necessárias.',
  ],
  cards: [
    {
      id: 'fato-dimensao',
      front: 'Qual a diferença entre uma tabela fato e uma dimensão?',
      back: 'O fato guarda eventos com medidas numéricas; a dimensão guarda o contexto descritivo, como produto, loja e data.',
    },
    {
      id: 'esquema-estrela',
      front: 'O que é um esquema estrela?',
      back: 'Um modelo com uma tabela fato no centro ligada por chaves a várias tabelas de dimensão.',
    },
    {
      id: 'granularidade-fato',
      front: 'Por que preferir a granularidade mais fina no fato?',
      back: 'Porque do detalhe dá para resumir sempre, mas de um resumo nunca se volta ao detalhe.',
    },
    {
      id: 'scd2',
      front: 'Como funciona uma dimensão SCD tipo 2?',
      back: 'Cada mudança cria uma nova linha com `valido_de`, `valido_ate` e uma marca de versão atual, preservando o histórico.',
    },
    {
      id: 'scd1',
      front: 'Quando sobrescrever um atributo (SCD tipo 1) em vez de versionar?',
      back: 'Quando é a correção de um erro ou o histórico não importa para a análise.',
    },
    {
      id: 'parquet',
      front: 'Por que o Parquet é mais rápido para análise que o CSV?',
      back: 'Guarda por coluna, lê só as colunas pedidas, tem tipos e comprime bem valores parecidos.',
    },
    {
      id: 'particionamento',
      front: 'Por qual coluna costuma-se particionar uma tabela de eventos?',
      back: 'Pela data, a coluna que mais aparece nos filtros, por exemplo `ano=2026/mes=10`.',
    },
    {
      id: 'lake-warehouse',
      front: 'Qual a diferença entre data lake e data warehouse?',
      back: 'O lake guarda arquivos de qualquer formato a baixo custo; o warehouse é um banco analítico com tabelas, SQL e controle de acesso.',
    },
  ],
  mission: {
    title: 'Modele vendas e compare CSV com Parquet',
    text: 'Use o DuckDB no seu computador (ele roda sem servidor e lê CSV e Parquet direto) para montar um pequeno esquema estrela e medir a diferença entre os formatos.',
    steps: [
      'Escreva numa frase a granularidade da sua tabela fato de vendas',
      'Crie `fato_vendas` e pelo menos duas dimensões (produto e data, por exemplo) com dados sintéticos ou públicos',
      'Responda duas perguntas de negócio com o molde fato mais JOINs mais GROUP BY',
      "Exporte o fato para CSV e para Parquet com `COPY fato_vendas TO 'vendas.parquet' (FORMAT parquet)` e compare os tamanhos",
      'Meça o tempo de uma soma lendo o CSV e o Parquet e anote o resultado no README',
    ],
  },
  sources: [
    { title: 'Apache Parquet: documentação', url: 'https://parquet.apache.org/docs/' },
    { title: 'Apache Avro: documentação', url: 'https://avro.apache.org/docs/' },
    {
      title: 'DuckDB: lendo e escrevendo Parquet',
      url: 'https://duckdb.org/docs/data/parquet/overview',
    },
    {
      title: 'dbt: como estruturar um projeto (staging, intermediário e marts)',
      url: 'https://docs.getdbt.com/best-practices/how-we-structure/1-guide-overview',
    },
  ],
};
