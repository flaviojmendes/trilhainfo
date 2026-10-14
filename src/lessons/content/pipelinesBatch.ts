import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'O painel de vendas que a gerente abre às 8h, o relatório de vacinação do SUS e a lista de “pedidos de novo” do iFood dependem de dados que alguém trouxe de um lugar, arrumou e guardou em outro, todo dia, sem ninguém apertar botão. Esse trabalho é um **pipeline**. Construir um que não duplica, não perde dados e se recupera sozinho de falhas é a habilidade central de quem trabalha com engenharia de dados.',
  sections: [
    {
      id: 'extrair-transformar-carregar',
      title: 'Da fonte à tabela: extrair, transformar, carregar',
      blocks: [
        {
          type: 'analogy',
          title: 'A padaria antes do sol nascer',
          text: 'Às 4h da manhã, a farinha chega do fornecedor (**extrair**). O padeiro peneira, descarta o que veio molhado, mistura e assa (**transformar**). Às 6h, o pão está na vitrine, onde os clientes pegam (**carregar**). Ninguém faz isso um pão de cada vez: é uma fornada inteira, todo dia, no mesmo horário.',
        },
        {
          type: 'text',
          text: 'Um **pipeline de dados** é exatamente isso: um programa que pega dados de uma **fonte** (um arquivo, uma API, outro banco), corrige e organiza, e grava num **destino** onde outras pessoas consultam. Quando ele processa um lote de dados de tempos em tempos, como “todos os pedidos de ontem”, chamamos de pipeline **batch** (lote).',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Extrair (Extract)',
              text: 'Buscar os dados na origem: baixar um CSV, chamar uma API página por página, ler uma tabela de outro sistema.',
            },
            {
              term: 'Transformar (Transform)',
              text: 'Converter tipos, padronizar textos, remover duplicados, rejeitar o que está inválido, calcular totais.',
            },
            {
              term: 'Carregar (Load)',
              text: 'Gravar o resultado no destino, normalmente uma tabela num banco ou data warehouse, para ser consultada.',
            },
          ],
        },
        {
          type: 'classify',
          prompt: 'Em que etapa do pipeline cada tarefa acontece?',
          buckets: ['Extrair', 'Transformar', 'Carregar'],
          items: [
            { text: 'Baixar o CSV de vendas do servidor da loja', bucket: 0 },
            { text: 'Chamar a API de pedidos página por página', bucket: 0 },
            { text: 'Converter o texto `35,90` no número `35.9`', bucket: 1 },
            { text: 'Remover linhas repetidas', bucket: 1 },
            { text: 'Padronizar o CEP para 8 dígitos sem traço', bucket: 1 },
            { text: 'Gravar o resultado na tabela `vendas_diarias`', bucket: 2 },
          ],
          explanation:
            'Separar as etapas ajuda a depurar: se o número final está errado, você confere a saída de cada etapa até achar onde o dado estragou.',
        },
        {
          type: 'text',
          text: 'A ordem das letras muda o desenho. No **ETL**, você transforma antes de carregar: só o dado limpo chega ao destino. No **ELT**, você carrega o dado bruto primeiro e transforma depois, dentro do próprio banco, com SQL. Bancos analíticos modernos são rápidos o bastante para isso, e o ELT virou o padrão.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Guarde o bruto',
          text: 'Seja ETL ou ELT, mantenha uma cópia dos dados **exatamente como chegaram** (a camada **bruta**, ou raw), separada da camada **tratada**. Se você descobrir um erro na transformação daqui a um mês, dá para refazer tudo sem pedir os dados de novo à fonte.',
        },
        {
          type: 'quiz',
          question:
            'Sua equipe quer guardar os pedidos exatamente como vieram da API e decidir as regras de limpeza depois, com SQL, dentro do banco analítico. Que abordagem é essa?',
          options: [
            {
              text: 'ELT: carregar primeiro, transformar depois',
              correct: true,
              feedback:
                'Isso. O dado bruto entra no banco e as transformações rodam lá dentro. Se a regra mudar, você só refaz a transformação.',
            },
            {
              text: 'ETL: transformar primeiro, carregar depois',
              feedback:
                'No ETL a limpeza acontece antes de gravar, então o banco nunca vê o dado bruto. O cenário pede justamente guardar o bruto.',
            },
            {
              text: 'Nenhuma: sem transformar, não é pipeline',
              feedback:
                'Um pipeline pode mover dados brutos e transformar depois, em outra etapa. Continua sendo pipeline, só com a ordem trocada.',
            },
          ],
        },
      ],
    },
    {
      id: 'mini-pipeline',
      title: 'Seu primeiro pipeline em Python',
      blocks: [
        {
          type: 'text',
          text: 'Na aula de Python para dados você leu CSV e separou valores inválidos. Agora vamos organizar isso como pipeline: três funções, uma para cada etapa, cada uma recebendo a saída da anterior. Funções pequenas são fáceis de testar e de rodar de novo.',
        },
        {
          type: 'text',
          text: 'Um detalhe importante está na função `carregar`: em vez de uma lista, o destino é um dicionário cuja **chave** é o `id` do pedido. Gravar o mesmo pedido duas vezes apenas substitui o anterior. Guarde essa ideia, ela volta na próxima seção.',
        },
        {
          type: 'python',
          title: 'Pipeline de pedidos da padaria',
          task: 'Complete `transformar`: rejeite pedidos com `valor` vazio ou negativo (guarde o id e o motivo em `rejeitados`) e converta o valor dos válidos para número com `float`. Rode e leia o resumo.',
          code: `import csv
import io

ARQUIVO = """id,cliente,valor,data
1,Ana,35.90,2026-10-01
2,Bruno,,2026-10-01
3,Carla,120.00,2026-10-02
3,Carla,120.00,2026-10-02
4,Davi,-10,2026-10-02
5,Elis,58.50,2026-10-03
"""


def extrair(texto):
    return list(csv.DictReader(io.StringIO(texto)))


def transformar(linhas):
    validos = []
    rejeitados = []
    for linha in linhas:
        # TODO: se o valor estiver vazio ou for negativo,
        # guarde (id, motivo) em rejeitados e pule a linha.
        # Nos válidos, converta linha["valor"] com float().
        validos.append(linha)
    return validos, rejeitados


def carregar(linhas, destino):
    for linha in linhas:
        destino[linha["id"]] = linha  # chave = id: repetir substitui
    return destino


tabela = {}
brutos = extrair(ARQUIVO)
validos, rejeitados = transformar(brutos)
carregar(validos, tabela)

print(f"Lidos: {len(brutos)} | Válidos: {len(validos)} | Rejeitados: {len(rejeitados)}")
print(f"Pedidos na tabela: {len(tabela)}")
print("Rejeições:", rejeitados)
`,
          solution: `import csv
import io

ARQUIVO = """id,cliente,valor,data
1,Ana,35.90,2026-10-01
2,Bruno,,2026-10-01
3,Carla,120.00,2026-10-02
3,Carla,120.00,2026-10-02
4,Davi,-10,2026-10-02
5,Elis,58.50,2026-10-03
"""


def extrair(texto):
    return list(csv.DictReader(io.StringIO(texto)))


def transformar(linhas):
    validos = []
    rejeitados = []
    for linha in linhas:
        texto = linha["valor"].strip()
        if texto == "":
            rejeitados.append((linha["id"], "valor vazio"))
            continue
        valor = float(texto)
        if valor < 0:
            rejeitados.append((linha["id"], "valor negativo"))
            continue
        linha["valor"] = valor
        validos.append(linha)
    return validos, rejeitados


def carregar(linhas, destino):
    for linha in linhas:
        destino[linha["id"]] = linha  # chave = id: repetir substitui
    return destino


tabela = {}
brutos = extrair(ARQUIVO)
validos, rejeitados = transformar(brutos)
carregar(validos, tabela)

print(f"Lidos: {len(brutos)} | Válidos: {len(validos)} | Rejeitados: {len(rejeitados)}")
print(f"Pedidos na tabela: {len(tabela)}")
print("Rejeições:", rejeitados)
`,
          checks: [
            {
              label: 'Os pedidos 2 (vazio) e 4 (negativo) foram rejeitados',
              test: 'sorted(r[0] for r in rejeitados) == ["2", "4"]',
            },
            {
              label: 'Os valores válidos viraram números',
              test: 'len(validos) > 0 and all(isinstance(l["valor"], float) for l in validos)',
            },
            {
              label: 'A tabela tem 3 pedidos, sem o repetido',
              test: 'len(tabela) == 3',
            },
            {
              label: 'O total carregado é 214.40',
              test: 'round(sum(l["valor"] for l in tabela.values()), 2) == 214.4',
            },
          ],
        },
        {
          type: 'reveal',
          question:
            'O arquivo tinha 6 linhas, 4 passaram na validação, mas a tabela ficou com 3 pedidos. Para onde foi o quarto?',
          answer:
            'O pedido 3 veio repetido no arquivo. Como a tabela usa o `id` como chave, a segunda cópia substituiu a primeira em vez de criar outra linha. Fontes reais mandam duplicados o tempo todo; a chave é o que protege o destino.',
        },
      ],
    },
    {
      id: 'idempotencia',
      title: 'Rodar duas vezes sem duplicar',
      blocks: [
        {
          type: 'analogy',
          title: 'O botão do elevador e o botão do Pix',
          text: 'Apertar o botão do elevador cinco vezes chama o elevador uma vez só. Já apertar “enviar” duas vezes num Pix sem proteção manda dinheiro duas vezes. O primeiro é **idempotente**: repetir a ação deixa o resultado igual ao de fazer uma vez.',
        },
        {
          type: 'text',
          text: 'Pipelines rodam de novo o tempo todo: uma nova tentativa automática depois de uma falha, alguém que executa à mão para conferir, um reprocessamento de um mês inteiro. Se cada execução **acrescenta** linhas sem olhar o que já existe, o faturamento do dia aparece em dobro no painel. Por isso a regra de ouro: toda carga precisa ser idempotente.',
        },
        {
          type: 'table',
          caption: 'Três jeitos de gravar no destino',
          head: ['Estratégia', 'Como funciona', 'Rodar de novo...'],
          rows: [
            ['**Append** (acrescentar)', '`INSERT` de tudo, sempre', 'Duplica as linhas'],
            [
              '**Upsert**',
              'Insere se a chave é nova; atualiza se já existe',
              'Deixa igual, e aplica correções',
            ],
            [
              '**Sobrescrever o período**',
              '`DELETE` do dia processado, depois `INSERT` do dia',
              'Deixa igual: o dia é refeito inteiro',
            ],
          ],
        },
        {
          type: 'text',
          text: 'O upsert depende de uma **chave**: a coluna (ou conjunto de colunas) que identifica cada linha de forma única. Em vendas por loja e dia, a chave é o par `(loja, dia)`. No SQLite e no PostgreSQL, o upsert se escreve com `INSERT ... ON CONFLICT`.',
        },
        {
          type: 'sql',
          title: 'Upsert da carga diária',
          task: 'Rode a consulta como está e leia o erro: o par (loja, dia) já existe. Depois acrescente `WHERE true` e `ON CONFLICT (loja, dia) DO UPDATE SET` para atualizar `total` e `carregado_em` com os valores novos (`excluded.total`, `excluded.carregado_em`).',
          setup: `CREATE TABLE vendas_diarias (
  loja TEXT NOT NULL,
  dia TEXT NOT NULL,
  total REAL NOT NULL,
  carregado_em TEXT NOT NULL,
  PRIMARY KEY (loja, dia)
);
INSERT INTO vendas_diarias VALUES
  ('Centro', '2026-10-01', 1520.50, '2026-10-02 03:00'),
  ('Savassi', '2026-10-01', 980.00, '2026-10-02 03:00');

CREATE TABLE staging_vendas (loja TEXT, dia TEXT, total REAL);
INSERT INTO staging_vendas VALUES
  ('Centro', '2026-10-01', 1610.50),
  ('Savassi', '2026-10-01', 980.00),
  ('Pampulha', '2026-10-01', 740.25);`,
          query: `INSERT INTO vendas_diarias (loja, dia, total, carregado_em)
SELECT loja, dia, total, '2026-10-03 03:00'
FROM staging_vendas;

SELECT * FROM vendas_diarias ORDER BY loja;`,
          solution: `INSERT INTO vendas_diarias (loja, dia, total, carregado_em)
SELECT loja, dia, total, '2026-10-03 03:00'
FROM staging_vendas
WHERE true
ON CONFLICT (loja, dia) DO UPDATE SET
  total = excluded.total,
  carregado_em = excluded.carregado_em;

SELECT * FROM vendas_diarias ORDER BY loja;`,
          checks: [
            {
              label: 'A tabela tem as 3 lojas, sem linhas repetidas',
              test: `const r = run("SELECT COUNT(*) FROM vendas_diarias"); return !!r && r.rows[0][0] === 3;`,
            },
            {
              label: 'O total corrigido do Centro (1610.50) foi aplicado',
              test: `const r = run("SELECT total FROM vendas_diarias WHERE loja = 'Centro'"); return !!r && Number(r.rows[0][0]) === 1610.5;`,
            },
            {
              label: 'A consulta final mostra a tabela atualizada',
              test: 'return !!result && result.rows.length === 3;',
            },
            {
              label: 'Rodar a carga de novo não muda nada',
              test: `run(query); const r = run("SELECT COUNT(*), SUM(total) FROM vendas_diarias"); return !!r && r.rows[0][0] === 3 && Math.abs(Number(r.rows[0][1]) - 3330.75) < 0.01;`,
            },
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Por que o `WHERE true`?',
          text: 'Quando o upsert vem de um `SELECT`, o SQLite poderia confundir o `ON` de `ON CONFLICT` com o `ON` de um `JOIN`. O `WHERE true` não filtra nada; só deixa claro onde o `SELECT` termina. No PostgreSQL ele não é necessário.',
        },
        {
          type: 'quiz',
          question:
            'Um pipeline faz `INSERT` de todos os pedidos de ontem, sem chave. Ele falhou na metade e a nova tentativa automática rodou do começo. O que acontece?',
          options: [
            {
              text: 'Os pedidos gravados antes da falha aparecem duas vezes',
              correct: true,
              feedback:
                'Exato. A primeira metade já tinha entrado; a nova tentativa insere tudo de novo. Sem chave e sem apagar o período antes, todo retry duplica.',
            },
            {
              text: 'O banco percebe sozinho e ignora os repetidos',
              feedback:
                'O banco só recusa repetidos se existir uma chave primária ou restrição `UNIQUE`. Sem isso, para ele são linhas novas.',
            },
            {
              text: 'Nada, porque a primeira execução falhou e foi desfeita',
              feedback:
                'Só seria desfeita se toda a carga estivesse dentro de uma única transação. Muitos pipelines gravam em partes, e as partes já gravadas ficam.',
            },
          ],
        },
      ],
    },
    {
      id: 'carga-incremental',
      title: 'Carga completa ou incremental',
      blocks: [
        {
          type: 'text',
          text: 'Existem duas formas de decidir **o que** extrair. Na **carga completa** (full), você traz a tabela inteira toda vez e substitui o destino. Na **carga incremental**, você traz só o que é novo ou mudou desde a última execução.',
        },
        {
          type: 'table',
          caption: 'Quando usar cada uma',
          head: ['', 'Completa (full)', 'Incremental'],
          rows: [
            [
              'Bom para',
              'Tabelas pequenas, como a lista de lojas',
              'Tabelas que crescem todo dia, como pedidos',
            ],
            ['Simplicidade', 'Alta: apaga e recarrega', 'Média: precisa lembrar onde parou'],
            ['Custo', 'Cresce com o tamanho da tabela', 'Cresce com o volume do dia'],
          ],
        },
        {
          type: 'text',
          text: 'Para saber onde parou, o pipeline guarda uma **marca d’água** (watermark): o maior valor de uma coluna como `atualizado_em` que ele já carregou. Na próxima execução, pede só as linhas com `atualizado_em` maior que a marca.',
        },
        {
          type: 'trace',
          caption: 'Uma execução incremental, passo a passo',
          code: 'marca = "2026-10-02 23:00"\nnovos = [p for p in fonte if p["atualizado_em"] > marca]\ncarregar(novos)\nmarca = max(p["atualizado_em"] for p in novos)\nprint(len(novos), "novos; marca agora", marca)',
          steps: [
            {
              line: 1,
              note: 'A marca vem da execução anterior, guardada numa tabela de controle. Tudo até esse instante já foi carregado.',
              memory: [['marca', '"2026-10-02 23:00"']],
            },
            {
              line: 2,
              note: 'Filtra só o que mudou depois da marca. Repare no pedido 7: ele é antigo, mas foi editado (o status virou “entregue”), então volta.',
              memory: [
                ['marca', '"2026-10-02 23:00"'],
                ['novos', '[pedido 18, pedido 19, pedido 7]'],
              ],
            },
            {
              line: 3,
              note: 'Carrega com upsert: 18 e 19 são inseridos, o 7 é atualizado. Se fosse append, o pedido 7 apareceria duas vezes.',
            },
            {
              line: 4,
              note: 'Só depois da carga dar certo, a marca avança para o maior `atualizado_em` carregado.',
              memory: [
                ['marca', '"2026-10-03 22:41"'],
                ['novos', '[pedido 18, pedido 19, pedido 7]'],
              ],
            },
            {
              line: 5,
              note: 'O log registra quantas linhas entraram e a nova marca. Amanhã o filtro começa daqui.',
              output: '3 novos; marca agora 2026-10-03 22:41',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Um colega move a linha que salva a nova marca para **antes** de `carregar(novos)`. Num dia, a carga falha no meio. O que acontece na execução seguinte?',
          options: [
            {
              text: 'Os pedidos daquele lote nunca mais são carregados',
              correct: true,
              feedback:
                'Isso. A marca já avançou, então o filtro pula justamente as linhas que não entraram. É uma perda silenciosa: nada dá erro, só faltam dados.',
            },
            {
              text: 'Os pedidos daquele lote são carregados duas vezes',
              feedback:
                'Duplicar é o risco de recarregar sem chave. Aqui o problema é o contrário: a marca avançada faz o pipeline pular as linhas.',
            },
            {
              text: 'Nada muda, porque a ordem dessas linhas não importa',
              feedback:
                'A ordem importa muito: a marca só pode avançar depois que os dados estiverem gravados com sucesso.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Uma janela de segurança',
          text: 'Alguns registros chegam atrasados: o caixa da loja ficou sem internet e mandou as vendas da tarde à noite. Por isso é comum reler uma janela antes da marca, como as últimas 2 horas. Com upsert, reler o que já existe não duplica nada.',
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem uma execução incremental segura.',
          items: [
            'Ler a última marca d’água na tabela de controle',
            'Extrair da fonte as linhas com `atualizado_em` maior que a marca (menos a janela de segurança)',
            'Validar e transformar as linhas extraídas',
            'Gravar no destino com upsert',
            'Salvar a nova marca d’água',
          ],
          explanation:
            'Salvar a marca por último é o que garante que uma falha no meio só cause trabalho repetido, nunca perda de dados.',
        },
      ],
    },
    {
      id: 'falhas-e-logs',
      title: 'Quando dá errado: falhas, retries e logs',
      blocks: [
        {
          type: 'text',
          text: 'Fontes reais falham. APIs devolvem dados em **páginas** (100 pedidos por vez) e limitam quantos pedidos você pode fazer por minuto. Quando você passa do limite, a resposta é `429 Too Many Requests`. Um bom pipeline espera e tenta de novo, o que se chama **retry**.',
        },
        {
          type: 'flow',
          caption: 'Extraindo pedidos de uma API com paginação e limite',
          actors: ['Pipeline', 'API da loja', 'Banco'],
          steps: [
            {
              from: 0,
              to: 1,
              label: 'GET /pedidos?pagina=1',
              text: 'A API não manda tudo de uma vez: entrega uma página e avisa se há próxima.',
            },
            {
              from: 1,
              to: 0,
              label: '200 OK: 100 pedidos',
              text: 'Primeira página recebida. O pipeline guarda e pede a seguinte.',
              tone: 'ok',
            },
            {
              from: 0,
              to: 1,
              label: 'GET /pedidos?pagina=2',
              text: 'Segundo pedido, logo em seguida.',
            },
            {
              from: 1,
              to: 0,
              label: '429 Too Many Requests',
              text: 'Passou do limite por minuto. Não é um defeito nos dados: é só esperar.',
              tone: 'error',
            },
            {
              from: 0,
              to: 0,
              label: 'Espera 2s, depois 4s…',
              text: 'Cada nova tentativa espera o dobro da anterior (**backoff exponencial**), até um número máximo de tentativas. Assim o pipeline não martela a API.',
            },
            {
              from: 0,
              to: 1,
              label: 'GET pagina=2 (de novo)',
              text: 'Segunda tentativa da mesma página.',
            },
            {
              from: 1,
              to: 0,
              label: '200 OK: 37 pedidos (fim)',
              text: 'Última página: não há próxima. A extração terminou com 137 pedidos.',
              tone: 'ok',
            },
            {
              from: 0,
              to: 2,
              label: 'Upsert de 137 pedidos',
              text: 'Só agora os dados vão para o banco, de forma idempotente.',
              tone: 'ok',
            },
          ],
        },
        {
          type: 'classify',
          prompt: 'Para cada falha, vale a pena tentar de novo automaticamente?',
          buckets: ['Passageira: tentar de novo', 'Permanente: precisa de correção'],
          items: [
            { text: '`429 Too Many Requests`', bucket: 0 },
            { text: 'Tempo esgotado na conexão (timeout)', bucket: 0 },
            { text: '`503 Service Unavailable` durante manutenção', bucket: 0 },
            { text: 'A coluna `valor` sumiu do arquivo de origem', bucket: 1 },
            { text: '`401`: o token de acesso à API foi revogado', bucket: 1 },
            { text: '`400`: a data foi enviada num formato que a API não aceita', bucket: 1 },
          ],
          explanation:
            'Retry resolve problemas de momento. Para erros permanentes, repetir só atrasa o alerta: o certo é falhar rápido, com uma mensagem clara, para alguém corrigir.',
        },
        {
          type: 'text',
          text: 'Quando algo dá errado às 3h da manhã, ninguém está olhando. O que sobra é o **log**: as mensagens que o pipeline escreve enquanto roda. Em Python, use o módulo `logging` em vez de `print`, porque ele registra horário e nível de gravidade.',
        },
        {
          type: 'anatomy',
          caption: 'O log de uma execução que se recuperou sozinha',
          language: 'text',
          parts: [
            {
              text: '2026-10-03 03:00:02',
              label: 'Horário',
              note: 'Quando cada coisa aconteceu. Comparando horários você descobre qual etapa demorou.',
            },
            { text: ' ' },
            {
              text: 'INFO',
              label: 'Nível',
              note: '`INFO` é rotina; `WARNING` é algo estranho mas contornado; `ERROR` é falha. Alertas costumam disparar só a partir de `ERROR`.',
            },
            { text: ' ' },
            {
              text: 'run=2026-10-02',
              label: 'Período processado',
              note: 'Qual dia de dados esta execução carregou. Sem isso, você não sabe o que reprocessar.',
            },
            { text: ' etapa=extrair paginas=2 linhas=137\n2026-10-03 03:00:04 ' },
            {
              text: 'WARNING etapa=extrair pagina=2 status=429 tentativa=1 espera=2s',
              label: 'Retry registrado',
              note: 'O problema foi contornado, mas fica anotado. Se isso aparecer todo dia, talvez seja hora de pedir menos por minuto.',
            },
            { text: '\n2026-10-03 03:00:08 INFO run=2026-10-02 etapa=transformar ' },
            {
              text: 'validas=131 rejeitadas=6',
              label: 'Contagens',
              note: 'O dado mais útil de um log. Se num dia as rejeições pulam de 6 para 6.000, a fonte mudou alguma coisa.',
            },
            { text: '\n2026-10-03 03:00:09 INFO run=2026-10-02 etapa=carregar ' },
            {
              text: 'inseridas=120 atualizadas=11',
              label: 'Resultado da carga',
              note: 'Separar inseridas de atualizadas mostra se o upsert está funcionando como você espera.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns',
          text: 'Usar append em toda execução. Avançar a marca d’água antes da carga terminar. Decidir o período com a hora atual do relógio, o que faz um reprocessamento de ontem carregar dados de hoje. Esconder exceções com `except: pass`, transformando falha em dado faltando. E logs sem contagens, que dizem “terminou” mas não dizem com quantas linhas.',
        },
        {
          type: 'quiz',
          question:
            'Um bug fez a carga do dia 2026-10-05 gravar valores errados. O bug já foi corrigido. Qual a melhor forma de consertar os dados?',
          options: [
            {
              text: 'Reprocessar só o dia 5, recarregando aquele período de forma idempotente',
              correct: true,
              feedback:
                'Isso. Como a carga é idempotente (upsert ou apagar e regravar o dia), rodar de novo para o dia 5 substitui os valores errados sem mexer nos outros dias.',
            },
            {
              text: 'Apagar a tabela inteira e esperar a carga de amanhã',
              feedback:
                'A carga de amanhã traz só os dados de amanhã. O histórico apagado não volta sozinho, e o painel fica vazio até lá.',
            },
            {
              text: 'Corrigir os números à mão direto no banco',
              feedback:
                'Correção manual não deixa rastro, é fácil errar e some na próxima vez que alguém reprocessar. O pipeline deve ser a única forma de escrever na tabela.',
            },
            {
              text: 'Rodar a carga completa de todo o histórico',
              feedback:
                'Funciona, mas pode levar horas e custar caro para consertar um único dia. Reprocessar só o período afetado é mais rápido e seguro.',
            },
          ],
        },
      ],
    },
  ],
  recap: [
    'Um pipeline batch **extrai** dados de uma fonte, **transforma** e **carrega** num destino, em lotes e em horários definidos; no ELT, o bruto é carregado antes da transformação.',
    'Guardar a camada bruta separada da tratada permite refazer transformações sem pedir os dados de novo.',
    'Toda carga deve ser **idempotente**: com upsert por chave ou sobrescrevendo o período, rodar duas vezes dá o mesmo resultado.',
    'Na carga incremental, a **marca d’água** registra até onde já foi carregado e só avança depois que a carga deu certo.',
    'Falhas passageiras pedem retry com espera crescente; permanentes pedem alerta. Logs com período e contagens tornam tudo isso investigável.',
  ],
  cards: [
    {
      id: 'etl-elt',
      front: 'Qual a diferença entre ETL e ELT?',
      back: 'No ETL, transforma antes de carregar. No ELT, carrega o dado bruto e transforma depois, dentro do banco.',
    },
    {
      id: 'idempotente',
      front: 'O que significa uma carga ser idempotente?',
      back: 'Rodar uma ou várias vezes produz o mesmo resultado no destino, sem duplicar linhas.',
    },
    {
      id: 'upsert',
      front: 'Como se escreve um upsert no SQLite ou PostgreSQL?',
      back: '`INSERT ... ON CONFLICT (chave) DO UPDATE SET coluna = excluded.coluna`.',
    },
    {
      id: 'watermark',
      front: 'O que é a marca d’água (watermark) numa carga incremental?',
      back: 'O maior valor de uma coluna como `atualizado_em` já carregado. A próxima execução pede só o que vem depois dele.',
    },
    {
      id: 'ordem-watermark',
      front: 'Quando a marca d’água deve ser salva?',
      back: 'Só depois que a carga terminou com sucesso. Antes disso, uma falha faz o pipeline pular dados.',
    },
    {
      id: 'retry',
      front: 'Que tipo de erro merece retry automático?',
      back: 'Erros passageiros, como timeout, `429` e `503`. Erros permanentes, como coluna faltando, precisam de correção.',
    },
    {
      id: 'camada-bruta',
      front: 'Por que manter uma camada bruta separada da tratada?',
      back: 'Para poder refazer as transformações quando uma regra muda ou um bug aparece, sem buscar os dados na fonte de novo.',
    },
  ],
  mission: {
    title: 'Uma carga que aguenta rodar duas vezes',
    text: 'Escolha um conjunto de dados público pequeno, como um CSV do portal dados.gov.br, e construa um pipeline batch no seu computador usando Python e SQLite ou DuckDB.',
    steps: [
      'Salve o arquivo original numa pasta `bruto/` e nunca altere esse arquivo',
      'Escreva as funções `extrair`, `transformar` e `carregar`, rejeitando linhas inválidas com um motivo',
      'Grave numa tabela com chave primária usando `INSERT ... ON CONFLICT`',
      'Rode a carga duas vezes seguidas e confirme com `SELECT COUNT(*)` que nada duplicou',
      'Simule uma falha no meio (por exemplo, um `raise` depois de metade das linhas), rode de novo e confira que o resultado final está correto',
      'Registre com `logging` o período, as linhas lidas, rejeitadas e gravadas em cada execução',
    ],
  },
  sources: [
    {
      title: 'Documentação do Python: módulo csv',
      url: 'https://docs.python.org/pt-br/3/library/csv.html',
    },
    {
      title: 'Documentação do Python: módulo logging',
      url: 'https://docs.python.org/pt-br/3/library/logging.html',
    },
    {
      title: 'SQLite: UPSERT',
      url: 'https://www.sqlite.org/lang_upsert.html',
    },
  ],
};
