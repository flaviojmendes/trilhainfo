import { LessonContent } from '../types';

const lojaSetup = `CREATE TABLE clientes (id INTEGER PRIMARY KEY, nome TEXT, cidade TEXT);
INSERT INTO clientes VALUES
  (1, 'Ana Souza', 'Recife'),
  (2, 'Bruno Lima', 'Belém'),
  (3, 'Carla Dias', 'Curitiba'),
  (4, 'Davi Rocha', 'Natal');

CREATE TABLE pedidos (
  pedido_id INTEGER,
  cliente_id INTEGER,
  valor REAL,
  status TEXT,
  criado_em TEXT
);
INSERT INTO pedidos VALUES
  (1001, 1, 59.90, 'pago', '2026-10-10'),
  (1002, 2, 120.00, 'pago', '2026-10-10'),
  (1002, 2, 120.00, 'pago', '2026-10-10'),
  (1003, 3, NULL, 'pendente', '2026-10-11'),
  (1004, 9, 35.00, 'pago', '2026-10-11'),
  (1005, 4, 80.00, 'pago', '2026-10-12'),
  (1005, 4, 80.00, 'pago', '2026-10-12'),
  (1006, 1, 15.50, 'estornado', '2026-10-12'),
  (1007, 7, 42.00, 'pago', '2026-10-13');`;

export const content: LessonContent = {
  hook: 'Um painel bonito com um número errado é pior do que nenhum painel: alguém vai tomar uma decisão com ele. E uma tabela com CPF e diagnóstico aberta para a empresa inteira pode virar multa e manchete. Qualidade e governança são as práticas que fazem as pessoas **confiarem** nos dados e garantem que eles sejam usados do jeito certo, por quem deve. É o que separa um pipeline que funciona de um pipeline em que dá para apostar o negócio.',
  sections: [
    {
      id: 'dimensoes',
      title: 'O que é um dado de qualidade',
      blocks: [
        {
          type: 'analogy',
          title: 'A entrega do mercado',
          text: 'Você pede 10 itens no app do mercado. Chegam 9 (faltou um). O leite veio duas vezes. O tomate está etiquetado como “banana”. A entrega era para ontem. E a nota diz 3 kg de arroz, mas o pacote tem 2. Cada um é um tipo diferente de problema, e cada um se descobre de um jeito.',
        },
        {
          type: 'text',
          text: 'Com dados é igual. “Dado ruim” é vago demais para ser testado, então a área divide qualidade em **dimensões**, cada uma com uma pergunta objetiva que vira uma checagem automática.',
        },
        {
          type: 'table',
          caption: 'As dimensões de qualidade mais usadas',
          head: ['Dimensão', 'Pergunta', 'Exemplo de checagem'],
          rows: [
            [
              '**Completude**',
              'Está faltando alguma coisa?',
              'Nenhum pedido sem `valor`; chegaram as 27 UFs',
            ],
            ['**Unicidade**', 'Algo aparece repetido?', 'Cada `pedido_id` aparece uma vez só'],
            [
              '**Validade**',
              'O valor respeita as regras?',
              '`valor` maior que zero; CEP com 8 dígitos; status numa lista',
            ],
            ['**Atualidade**', 'O dado chegou a tempo?', 'A carga de ontem terminou antes das 6h'],
            [
              '**Consistência**',
              'Bate com outras fontes ou tabelas?',
              'A soma dos itens é igual ao total do pedido',
            ],
          ],
        },
        {
          type: 'classify',
          prompt: 'Que dimensão de qualidade cada problema fere?',
          buckets: ['Completude', 'Unicidade', 'Validade', 'Atualidade'],
          items: [
            { text: 'Metade dos clientes está sem cidade', bucket: 0 },
            { text: 'O arquivo de ontem trouxe 12 lojas, mas são 40', bucket: 0 },
            { text: 'O mesmo Pix aparece duas vezes no extrato', bucket: 1 },
            { text: 'Dois cadastros com o mesmo CPF', bucket: 1 },
            { text: 'Uma idade de 230 anos', bucket: 2 },
            { text: 'Data de entrega `2026-02-31`', bucket: 2 },
            { text: 'O painel das 8h ainda mostra os números de anteontem', bucket: 3 },
            { text: 'A tabela de estoque não é atualizada há 3 dias', bucket: 3 },
          ],
          explanation:
            'Dar nome ao problema ajuda a escolher a checagem: completude se mede contando, unicidade agrupando, validade com regras e atualidade olhando o horário da última carga.',
        },
        {
          type: 'quiz',
          question:
            'No sistema de vendas, o pedido 5531 custa R$ 89,90. No data warehouse, o mesmo pedido aparece com R$ 8.990,00. Cada tabela, sozinha, parece válida. Qual dimensão está em jogo?',
          options: [
            {
              text: 'Consistência',
              correct: true,
              feedback:
                'Isso. O problema só aparece comparando duas fontes. Provavelmente alguém tratou centavos como reais em uma das pontas.',
            },
            {
              text: 'Completude',
              feedback:
                'Nada está faltando: o pedido existe nas duas tabelas, com valor preenchido. O problema é o valor não bater.',
            },
            {
              text: 'Unicidade',
              feedback: 'O pedido aparece uma vez em cada lugar. Não há repetição, há divergência.',
            },
          ],
        },
      ],
    },
    {
      id: 'checagens-em-sql',
      title: 'Checagens que você escreve em SQL',
      blocks: [
        {
          type: 'text',
          text: 'A maioria das checagens de qualidade é uma consulta que procura **linhas problemáticas**: se ela volta vazia, está tudo certo. É a mesma ideia dos testes do dbt, que você viu na aula anterior, só que escrita à mão. Vamos investigar uma tabela de pedidos que acabou de chegar.',
        },
        {
          type: 'sql',
          title: 'Caça aos duplicados',
          task: 'A consulta conta quantas vezes cada `pedido_id` aparece. Acrescente um `HAVING` para mostrar só os pedidos que aparecem mais de uma vez.',
          setup: lojaSetup,
          query: `SELECT pedido_id, COUNT(*) AS vezes
FROM pedidos
GROUP BY pedido_id;`,
          solution: `SELECT pedido_id, COUNT(*) AS vezes
FROM pedidos
GROUP BY pedido_id
HAVING COUNT(*) > 1;`,
          checks: [
            {
              label: 'Só os pedidos repetidos aparecem (2 linhas)',
              test: 'return !!result && result.rows.length === 2;',
            },
            {
              label: 'São os pedidos 1002 e 1005',
              test: "if (!result) return false; const i = result.columns.indexOf('pedido_id'); return i >= 0 && result.rows.map((r) => Number(r[i])).sort((a, b) => a - b).join(',') === '1002,1005';",
            },
            {
              label: 'O resultado mostra quantas vezes cada um aparece',
              test: "if (!result) return false; const i = result.columns.indexOf('pedido_id'); return result.columns.length >= 2 && result.rows.every((r) => r.some((v, k) => k !== i && Number(v) === 2));",
            },
          ],
        },
        {
          type: 'fill',
          prompt:
            'Complete a checagem de completude: quantos pedidos estão sem valor? Cuidado: em SQL, nada é igual a `NULL`, nem o próprio `NULL`.',
          language: 'sql',
          template: 'SELECT COUNT(*) AS sem_valor\nFROM pedidos\nWHERE valor [[IS NULL|is null]];',
          explanation:
            'Escrever `valor = NULL` não dá erro, só devolve zero linhas, e a checagem passa mentindo. É um dos erros mais traiçoeiros em qualidade de dados.',
        },
        {
          type: 'sql',
          title: 'Pedidos órfãos',
          task: 'Um pedido **órfão** aponta para um cliente que não existe. Troque o `JOIN` por `LEFT JOIN` e filtre as linhas em que o cliente não foi encontrado (`c.id IS NULL`).',
          setup: lojaSetup,
          query: `SELECT p.pedido_id, p.cliente_id
FROM pedidos p
JOIN clientes c ON c.id = p.cliente_id;`,
          solution: `SELECT p.pedido_id, p.cliente_id
FROM pedidos p
LEFT JOIN clientes c ON c.id = p.cliente_id
WHERE c.id IS NULL;`,
          checks: [
            {
              label: 'Encontrou 2 pedidos órfãos',
              test: 'return !!result && result.rows.length === 2;',
            },
            {
              label: 'São os pedidos 1004 e 1007',
              test: "if (!result) return false; const i = result.columns.indexOf('pedido_id'); return i >= 0 && result.rows.map((r) => Number(r[i])).sort((a, b) => a - b).join(',') === '1004,1007';",
            },
          ],
        },
        {
          type: 'code',
          language: 'sql',
          caption: 'Uma checagem de atualidade: a última carga foi há mais de 26 horas?',
          code: "SELECT\n  MAX(carregado_em) AS ultima_carga,\n  CASE\n    WHEN MAX(carregado_em) < datetime('now', '-26 hours') THEN 'ATRASADO'\n    ELSE 'ok'\n  END AS situacao\nFROM controle_cargas\nWHERE tabela = 'pedidos';",
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Bloquear ou só avisar?',
          text: 'Nem toda checagem deve parar o pipeline. Esquema inválido, chave duplicada e tabela vazia são **bloqueantes**: é melhor o painel mostrar os dados de ontem do que dados errados. Já 0,5% de clientes sem cidade pode ser só um **aviso** registrado e enviado ao dono da fonte.',
        },
      ],
    },
    {
      id: 'contratos',
      title: 'Contratos de dados',
      blocks: [
        {
          type: 'analogy',
          title: 'O combinado da quadrilha da escola',
          text: 'Na festa junina, cada família leva um prato. Se ninguém combina nada, vêm cinco bolos de fubá e nenhum refrigerante. Com uma lista (“família Silva: 2 litros de guaraná, até as 18h”), todo mundo sabe o que entregar e o que esperar. Se alguém precisar trocar, avisa antes.',
        },
        {
          type: 'text',
          text: 'Um **contrato de dados** é esse combinado entre quem **produz** uma tabela (o time do sistema de pedidos) e quem **consome** (você, o financeiro, o painel). Ele diz quais colunas existem, de que tipo, que regras valem, até que horas os dados chegam e quem é o dono. Mudanças que quebram o combinado precisam de aviso e de uma nova versão.',
        },
        {
          type: 'anatomy',
          caption: 'Um contrato simples para a tabela de pedidos',
          language: 'yaml',
          parts: [
            { text: 'contrato: pedidos\n' },
            {
              text: 'versao: 2',
              label: 'Versão',
              note: 'Renomear ou remover uma coluna quebra quem consome. Isso exige uma nova versão e um período em que as duas convivem.',
            },
            { text: '\n' },
            {
              text: 'dono: time-checkout',
              label: 'Dono',
              note: 'A quem recorrer quando algo quebra. Sem dono, um problema de qualidade vira uma discussão sem fim.',
            },
            { text: '\ncolunas:\n' },
            {
              text: '  - nome: pedido_id\n    tipo: integer\n    obrigatoria: true\n    unica: true',
              label: 'Esquema',
              note: 'Nome, tipo e regras de cada coluna. É o que o pipeline confere antes de aceitar um lote: se não bate, a carga é bloqueada.',
            },
            { text: '\n  - nome: valor\n    tipo: decimal\n    regra: maior que zero\n' },
            {
              text: '  - nome: status\n    tipo: string\n    valores: [pago, pendente, estornado]',
              label: 'Valores aceitos',
              note: 'Se o sistema começar a mandar `entregue`, o contrato foi quebrado, e você sabe exatamente qual regra.',
            },
            { text: '\n' },
            {
              text: 'atualidade: dados do dia anterior disponíveis até 06:00',
              label: 'Prazo',
              note: 'O compromisso de horário vira uma checagem de atualidade com alerta.',
            },
            { text: '\n' },
            {
              text: 'dados_pessoais: [cliente_id]\nretencao: 5 anos',
              label: 'Privacidade',
              note: 'Quais colunas identificam pessoas e por quanto tempo os dados podem ser guardados. Você vai ver o porquê na seção sobre LGPD.',
            },
          ],
        },
        {
          type: 'python',
          title: 'O portão do contrato',
          task: 'Complete `validar`: para cada coluna do `contrato`, registre um erro com o nome da coluna se ela estiver ausente ou com o tipo errado (`isinstance`). Registre também um erro se o `status` não estiver em `STATUS_VALIDOS`. Se mais de 20% do lote falhar, a carga deve ser bloqueada.',
          code: `contrato = {
    "pedido_id": int,
    "cliente_id": int,
    "valor": float,
    "status": str,
}
STATUS_VALIDOS = {"pago", "pendente", "estornado"}

lote = [
    {"pedido_id": 2001, "cliente_id": 1, "valor": 59.9, "status": "pago"},
    {"pedido_id": 2002, "cliente_id": 2, "valor": "120,00", "status": "pago"},
    {"pedido_id": 2003, "cliente_id": 3, "valor": 35.0, "status": "entregue"},
    {"pedido_id": 2004, "valor": 80.0, "status": "pendente"},
    {"pedido_id": 2005, "cliente_id": 4, "valor": 15.5, "status": "estornado"},
]


def validar(registro):
    erros = []
    # TODO 1: para cada coluna e tipo do contrato,
    #   se a coluna não existir: erros.append(f"{coluna} ausente")
    #   se o tipo estiver errado: erros.append(f"{coluna} com tipo errado")
    # TODO 2: se o status não estiver em STATUS_VALIDOS, registre um erro
    return erros


problemas = {}
for registro in lote:
    erros = validar(registro)
    if erros:
        problemas[registro["pedido_id"]] = erros

if len(problemas) / len(lote) > 0.2:
    print(f"CARGA BLOQUEADA: {len(problemas)} de {len(lote)} registros fora do contrato")
else:
    print("Carga liberada")
for pedido, erros in problemas.items():
    print(pedido, erros)
`,
          solution: `contrato = {
    "pedido_id": int,
    "cliente_id": int,
    "valor": float,
    "status": str,
}
STATUS_VALIDOS = {"pago", "pendente", "estornado"}

lote = [
    {"pedido_id": 2001, "cliente_id": 1, "valor": 59.9, "status": "pago"},
    {"pedido_id": 2002, "cliente_id": 2, "valor": "120,00", "status": "pago"},
    {"pedido_id": 2003, "cliente_id": 3, "valor": 35.0, "status": "entregue"},
    {"pedido_id": 2004, "valor": 80.0, "status": "pendente"},
    {"pedido_id": 2005, "cliente_id": 4, "valor": 15.5, "status": "estornado"},
]


def validar(registro):
    erros = []
    for coluna, tipo in contrato.items():
        if coluna not in registro:
            erros.append(f"{coluna} ausente")
        elif not isinstance(registro[coluna], tipo):
            erros.append(f"{coluna} com tipo errado")
    if registro.get("status") not in STATUS_VALIDOS:
        erros.append("status fora da lista")
    return erros


problemas = {}
for registro in lote:
    erros = validar(registro)
    if erros:
        problemas[registro["pedido_id"]] = erros

if len(problemas) / len(lote) > 0.2:
    print(f"CARGA BLOQUEADA: {len(problemas)} de {len(lote)} registros fora do contrato")
else:
    print("Carga liberada")
for pedido, erros in problemas.items():
    print(pedido, erros)
`,
          checks: [
            {
              label: 'Os pedidos 2002, 2003 e 2004 foram barrados',
              test: 'sorted(problemas) == [2002, 2003, 2004]',
            },
            {
              label: 'O erro do pedido 2004 diz que falta `cliente_id`',
              test: 'any("cliente_id" in e for e in validar(lote[3]))',
            },
            {
              label: 'Um registro correto passa sem erros',
              test: 'validar({"pedido_id": 1, "cliente_id": 1, "valor": 1.0, "status": "pago"}) == []',
            },
            {
              label: 'A carga foi bloqueada',
              test: '"CARGA BLOQUEADA" in __saida__',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'O time de checkout quer renomear a coluna `valor` para `valor_total`. Com um contrato de dados em vigor, o que deveria acontecer?',
          options: [
            {
              text: 'Publicar uma nova versão, avisar os consumidores e manter as duas colunas por um período',
              correct: true,
              feedback:
                'Isso. Mudança incompatível vira nova versão com transição combinada. Ninguém descobre a mudança pelo painel quebrado.',
            },
            {
              text: 'Renomear de uma vez; o pipeline de dados se adapta',
              feedback:
                'É exatamente o que o contrato evita. O pipeline quebra às 3h e o painel fica vazio até alguém investigar.',
            },
            {
              text: 'Proibir a mudança, porque contrato não se altera',
              feedback:
                'Contratos evoluem. A ideia não é congelar o sistema, e sim fazer as mudanças com aviso e versão.',
            },
          ],
        },
      ],
    },
    {
      id: 'catalogo-e-linhagem',
      title: 'Catálogo e linhagem',
      blocks: [
        {
          type: 'text',
          text: 'Numa empresa com centenas de tabelas, a pergunta mais comum é “qual tabela eu uso para faturamento?”. Um **catálogo de dados** responde: lista as tabelas com descrição, dono, colunas, data da última atualização e quem pode acessar. A documentação que o dbt gera já é um catálogo inicial.',
        },
        {
          type: 'text',
          text: '**Linhagem** é o mapa de onde cada dado vem e para onde vai: a coluna `faturamento` do painel vem de `fct_vendas_diarias`, que vem de `stg_pedidos`, que vem da tabela bruta. Ela responde duas perguntas: “de onde veio este número estranho?” e “o que quebra se eu mexer nesta tabela?”.',
        },
        {
          type: 'quiz',
          question:
            'Você precisa remover a coluna `desconto` de `stg_pedidos`. Antes de mexer, o que a linhagem permite descobrir?',
          options: [
            {
              text: 'Quais modelos e painéis usam essa coluna e vão quebrar',
              correct: true,
              feedback:
                'Isso é a **análise de impacto**: seguir as setas para frente e avisar os donos de tudo o que depende da coluna.',
            },
            {
              text: 'Se a coluna tem valores nulos',
              feedback:
                'Isso é uma checagem de completude, feita com uma consulta. A linhagem mostra relações entre tabelas, não o conteúdo.',
            },
            {
              text: 'Quem criou a coluna originalmente',
              feedback:
                'O histórico do Git responde isso. A linhagem mostra as dependências atuais: de onde vem e para onde vai.',
            },
          ],
        },
        {
          type: 'reveal',
          question:
            'O painel mostra o faturamento de ontem 40% abaixo do normal. Como a linhagem ajuda a investigar?',
          answer:
            'Você segue as setas para trás, conferindo cada etapa: o mart tem menos linhas? O staging? A tabela bruta? Na etapa em que a contagem cai está o problema, por exemplo uma loja cujo arquivo não chegou. Sem linhagem, você teria que adivinhar por onde começar.',
        },
      ],
    },
    {
      id: 'lgpd',
      title: 'Dados pessoais e a LGPD',
      blocks: [
        {
          type: 'text',
          text: 'A **LGPD** (Lei Geral de Proteção de Dados, Lei 13.709/2018) regula o uso de dados pessoais no Brasil. Para quem trabalha com dados, ela muda o dia a dia: você precisa saber quais colunas identificam pessoas, guardar só o necessário e pelo tempo necessário, e proteger o acesso.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Dado pessoal',
              text: 'Qualquer informação que identifica uma pessoa ou permite identificá-la: nome, CPF, e-mail, telefone, endereço, placa do carro, até um ID de cliente ligado a esses dados.',
            },
            {
              term: 'Dado pessoal sensível',
              text: 'Uma categoria com proteção extra: origem racial ou étnica, religião, opinião política, filiação sindical, saúde, vida sexual, dados genéticos e biométricos.',
            },
            {
              term: 'Minimização',
              text: 'Coletar e guardar só o que é necessário para a finalidade. Se o painel de vendas por cidade não precisa do nome, o nome não deveria chegar até ele.',
            },
          ],
        },
        {
          type: 'classify',
          prompt: 'Como a LGPD classifica cada informação?',
          buckets: ['Dado pessoal', 'Dado pessoal sensível', 'Não é dado pessoal'],
          items: [
            { text: 'CPF', bucket: 0 },
            { text: 'E-mail `ana.souza@email.com`', bucket: 0 },
            { text: 'Endereço com CEP e número', bucket: 0 },
            { text: 'Diagnóstico de diabetes num prontuário', bucket: 1 },
            { text: 'Religião informada num cadastro', bucket: 1 },
            { text: 'Biometria facial do app do banco', bucket: 1 },
            { text: 'Total de vendas por estado no mês', bucket: 2 },
            { text: 'Preço médio do pão francês em Recife', bucket: 2 },
          ],
          explanation:
            'Agregados sem possibilidade de chegar à pessoa não são dados pessoais. Mas cuidado: “vendas por bairro e idade” numa cidade pequena pode identificar alguém.',
        },
        {
          type: 'table',
          caption: 'Duas técnicas que costumam ser confundidas',
          head: ['', 'Anonimização', 'Pseudonimização'],
          rows: [
            [
              'O que faz',
              'Remove a possibilidade de chegar à pessoa por meios razoáveis',
              'Troca o identificador por um código; quem tem a chave volta à pessoa',
            ],
            [
              'Exemplo',
              'Publicar só “vendas por estado”, sem nenhum identificador',
              'Trocar o CPF por `cli_8f3a` e guardar a tabela de conversão em outro lugar',
            ],
            [
              'Para a LGPD',
              'Deixa de ser dado pessoal',
              'Continua sendo dado pessoal, com risco menor',
            ],
          ],
        },
        {
          type: 'quiz',
          question:
            'Para “anonimizar”, um colega troca cada CPF pelo hash SHA-256 do CPF. Isso é anonimização?',
          options: [
            {
              text: 'Não. Existem só cerca de 1 bilhão de CPFs possíveis: dá para calcular o hash de todos e reverter',
              correct: true,
              feedback:
                'Exato. Com tão poucas possibilidades, o hash funciona como um código reversível: é pseudonimização. Para dificultar, use um segredo junto (como HMAC) e, sempre que der, nem leve o CPF para o ambiente analítico.',
            },
            {
              text: 'Sim, porque um hash não pode ser desfeito',
              feedback:
                'O hash não se desfaz por cálculo, mas dá para testar todas as entradas possíveis. Com CPFs, isso leva pouco tempo num computador comum.',
            },
            {
              text: 'Sim, desde que ninguém de fora saiba qual algoritmo foi usado',
              feedback:
                'Esconder o algoritmo não protege nada: SHA-256 é o primeiro que qualquer pessoa testaria. Segurança não pode depender de segredo sobre o método.',
            },
          ],
        },
      ],
    },
    {
      id: 'acesso-e-retencao',
      title: 'Quem pode ver, e por quanto tempo',
      blocks: [
        {
          type: 'text',
          text: 'O princípio que guia o controle de acesso é o do **menor privilégio**: cada pessoa ou sistema acessa só o que precisa para o seu trabalho. Na prática, você não dá permissões pessoa por pessoa; cria **papéis** (roles), como `analistas`, e dá permissões ao papel.',
        },
        {
          type: 'code',
          language: 'sql',
          caption:
            'No PostgreSQL: analistas leem os marts, mas não o bruto, e veem e-mails mascarados',
          code: "CREATE ROLE analistas;\nGRANT USAGE ON SCHEMA marts TO analistas;\nGRANT SELECT ON ALL TABLES IN SCHEMA marts TO analistas;\n-- nenhuma permissão no schema bruto, onde ficam CPF e e-mail\n\nCREATE VIEW marts.clientes_mascarados AS\nSELECT\n  cliente_id,\n  cidade,\n  left(email, 2) || '***@' || split_part(email, '@', 2) AS email\nFROM tratado.clientes;",
        },
        {
          type: 'text',
          text: 'Acesso também tem prazo. **Retenção** é por quanto tempo cada dado pode ser guardado; depois disso, ele deve ser apagado ou anonimizado. Tabelas particionadas por data facilitam: apagar o que passou do prazo vira remover as partições antigas. E os **logs de acesso** registram quem consultou o quê, para auditoria.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns',
          text: 'Um usuário de banco compartilhado por todo o time, que impede saber quem fez o quê. Copiar a tabela de clientes para uma planilha “só para uma análise rápida”. Usar dados reais de produção em testes, quando dados sintéticos bastariam. Guardar tudo para sempre “porque pode ser útil”. E checagens de qualidade que só alertam, sem dono para receber o alerta.',
        },
        {
          type: 'quiz',
          question:
            'Uma analista de marketing precisa saber quantos clientes existem por cidade. Que acesso faz mais sentido?',
          options: [
            {
              text: 'Leitura numa tabela de marts agregada por cidade, sem dados pessoais',
              correct: true,
              feedback:
                'Isso. Ela recebe exatamente o que precisa. Menor privilégio e minimização juntos: o dado pessoal nem chega ao trabalho dela.',
            },
            {
              text: 'Leitura em todo o banco, para não precisar pedir de novo depois',
              feedback:
                'Prático hoje, arriscado sempre: ela passaria a ver CPF, e-mail e o que mais existir. Acesso amplo “por via das dúvidas” é o que transforma um vazamento pequeno num grande.',
            },
            {
              text: 'O usuário e a senha do time de dados',
              feedback:
                'Credencial compartilhada apaga a auditoria: ninguém sabe quem consultou o quê. Cada pessoa deve ter o próprio acesso.',
            },
            {
              text: 'Um CSV da tabela de clientes enviado por e-mail',
              feedback:
                'O arquivo sai do controle de acesso e da retenção: pode ser encaminhado, esquecido num notebook ou baixado em casa.',
            },
          ],
        },
      ],
    },
  ],
  recap: [
    'Qualidade se mede por dimensões objetivas: completude, unicidade, validade, atualidade e consistência, cada uma virando uma checagem.',
    'A maioria das checagens é uma consulta que procura linhas problemáticas; erros graves bloqueiam a carga, os leves geram aviso para o dono.',
    'Um **contrato de dados** combina esquema, regras, prazo e dono entre quem produz e quem consome; mudanças incompatíveis viram nova versão.',
    'Catálogo responde “o que é e de quem é esta tabela”; linhagem responde “de onde vem e o que quebra se eu mexer”.',
    'Pela LGPD, dados pessoais e sensíveis exigem minimização, retenção definida e acesso por menor privilégio; pseudonimizar não é anonimizar.',
  ],
  cards: [
    {
      id: 'dimensoes-qualidade',
      front: 'Quais são as dimensões de qualidade de dados mais usadas?',
      back: 'Completude, unicidade, validade, atualidade e consistência.',
    },
    {
      id: 'null-sql',
      front: 'Por que `WHERE valor = NULL` não encontra valores vazios?',
      back: 'Em SQL, nada é igual a `NULL`. A comparação certa é `IS NULL`.',
    },
    {
      id: 'orfao',
      front: 'Como encontrar registros órfãos em SQL?',
      back: '`LEFT JOIN` com a tabela relacionada e filtro `WHERE relacionada.id IS NULL`.',
    },
    {
      id: 'contrato-dados',
      front: 'O que um contrato de dados define?',
      back: 'Esquema, regras, prazo de entrega, dono e privacidade de uma tabela, combinados entre produtor e consumidor.',
    },
    {
      id: 'linhagem',
      front: 'Para que serve a linhagem de dados?',
      back: 'Mostrar de onde cada dado vem e o que depende dele: investigar erros e analisar o impacto de mudanças.',
    },
    {
      id: 'dado-sensivel',
      front: 'Cite exemplos de dados pessoais sensíveis pela LGPD.',
      back: 'Saúde, religião, origem racial ou étnica, opinião política, filiação sindical, vida sexual, genética e biometria.',
    },
    {
      id: 'pseudonimizacao',
      front: 'Qual a diferença entre anonimização e pseudonimização?',
      back: 'Anonimizado não volta à pessoa e deixa de ser dado pessoal. Pseudonimizado volta com a chave e continua sendo dado pessoal.',
    },
    {
      id: 'menor-privilegio',
      front: 'O que é o princípio do menor privilégio?',
      back: 'Cada pessoa ou sistema acessa só o que precisa para o seu trabalho, por meio de papéis.',
    },
  ],
  mission: {
    title: 'Um portão de qualidade no seu pipeline',
    text: 'Use o pipeline local que você já construiu, com dados públicos ou sintéticos, e acrescente checagens, contrato e documentação de acesso.',
    steps: [
      'Escreva um contrato em YAML para a tabela principal: colunas, tipos, valores aceitos, prazo e dono',
      'Faça o pipeline validar cada lote contra o contrato e bloquear a carga quando o esquema não bater',
      'Crie checagens em SQL ou testes dbt para duplicados, nulos na chave e órfãos',
      'Adicione uma checagem de atualidade que registre um alerta no log quando a última carga passar do prazo',
      'Liste as colunas com dados pessoais e troque-as por dados sintéticos ou remova-as das camadas analíticas',
      'Documente no README quem pode ler cada camada e por quanto tempo os dados são guardados',
    ],
  },
  sources: [
    {
      title: 'Lei Geral de Proteção de Dados (Lei 13.709/2018)',
      url: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm',
    },
    {
      title: 'ANPD: Autoridade Nacional de Proteção de Dados',
      url: 'https://www.gov.br/anpd/pt-br',
    },
    {
      title: 'dbt: Data tests',
      url: 'https://docs.getdbt.com/docs/build/data-tests',
    },
    {
      title: 'PostgreSQL: GRANT',
      url: 'https://www.postgresql.org/docs/current/sql-grant.html',
    },
  ],
};
