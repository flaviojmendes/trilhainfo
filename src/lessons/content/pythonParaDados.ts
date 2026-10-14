import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Quase todo trabalho com dados começa com um arquivo que alguém exportou: a planilha de vendas da loja, o CSV do DATASUS, o JSON de uma API. Esses arquivos chegam com espaços sobrando, vírgula no lugar de ponto, datas em formatos diferentes e células vazias. Nesta aula você vai escrever, com Python puro, o programa que lê esse arquivo, separa o que presta do que não presta e entrega um resumo confiável. É o primeiro pipeline de verdade da sua carreira.',
  sections: [
    {
      id: 'ler-csv',
      title: 'Arquivos reais: separador, decimal e codificação',
      blocks: [
        {
          type: 'analogy',
          title: 'O mesmo idioma, outro sotaque',
          text: 'Um gaúcho e um baiano falam português, mas com sotaques e palavras diferentes. CSV também: o formato é o mesmo, mas um arquivo exportado pelo Excel em português costuma separar colunas com **ponto e vírgula** e escrever decimais com **vírgula**. Quem lê precisa reconhecer o sotaque, ou entende tudo errado.',
        },
        {
          type: 'anatomy',
          caption: 'Um CSV exportado de um sistema brasileiro. Explore as partes.',
          language: 'csv',
          parts: [
            {
              text: 'data;cidade;produto;valor',
              label: 'Cabeçalho',
              note: 'Os nomes das colunas. O módulo `csv` usa essa linha para que cada linha vire um dicionário com essas chaves.',
            },
            { text: '\n' },
            {
              text: '14/10/2026',
              label: 'Data em formato brasileiro',
              note: 'Dia, mês e ano. Para o Python isso é só texto até você converter com `datetime`.',
            },
            {
              text: ';',
              label: 'Separador',
              note: 'No Brasil, o Excel costuma usar ponto e vírgula, porque a vírgula já é usada nos decimais. Você precisa avisar isso ao ler o arquivo.',
            },
            { text: 'Recife;Pão de queijo;' },
            {
              text: '12,50',
              label: 'Decimal com vírgula',
              note: "Para o Python, número decimal usa ponto. `float('12,50')` dá erro; é preciso trocar a vírgula antes.",
            },
          ],
        },
        {
          type: 'text',
          text: 'Na aula de listas, dicionários e arquivos você já leu um CSV com `csv.DictReader`, que entrega cada linha como dicionário. Aquele arquivo era bem comportado. Agora você vai lidar com arquivos como eles chegam de verdade. Para isso, o navegador vai simular o arquivo com `io.StringIO`, que faz um texto se comportar como um arquivo aberto.',
        },
        {
          type: 'python',
          title: 'Seu primeiro leitor de CSV',
          task: "Rode o código e veja o primeiro dicionário: as colunas não foram separadas. Corrija o leitor para usar o separador certo (`delimiter=';'`) e imprima `Total de linhas: 4`.",
          code: `import csv
import io

arquivo = io.StringIO("""data;cidade;produto;valor;pagamento
14/10/2026;Recife;Pão de queijo;12,50;pix
14/10/2026;Salvador;Café;6,00;dinheiro
15/10/2026;Recife;Bolo;25,90;cartao
15/10/2026;Belém;Café;6,00;pix
""")

leitor = csv.DictReader(arquivo)
linhas = list(leitor)
print(linhas[0])
`,
          solution: `import csv
import io

arquivo = io.StringIO("""data;cidade;produto;valor;pagamento
14/10/2026;Recife;Pão de queijo;12,50;pix
14/10/2026;Salvador;Café;6,00;dinheiro
15/10/2026;Recife;Bolo;25,90;cartao
15/10/2026;Belém;Café;6,00;pix
""")

leitor = csv.DictReader(arquivo, delimiter=';')
linhas = list(leitor)
print(linhas[0])
print('Total de linhas:', len(linhas))
`,
          checks: [
            {
              label: 'Cada linha tem a chave `cidade`',
              test: "linhas[0]['cidade'] == 'Recife'",
            },
            {
              label: 'A terceira venda é do produto `Bolo`',
              test: "linhas[2]['produto'] == 'Bolo'",
            },
            { label: 'Imprimiu `Total de linhas: 4`', test: "'Total de linhas: 4' in __saida__" },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'No seu computador',
          text: "Com um arquivo de verdade, abra assim: `open('vendas.csv', encoding='utf-8', newline='')` e passe o arquivo para o `DictReader`. Se a primeira coluna aparecer com um caractere estranho no nome, use `encoding='utf-8-sig'`: o arquivo veio do Excel com uma marca invisível no começo.",
        },
      ],
    },
    {
      id: 'limpeza-e-tipos',
      title: 'Tudo chega como texto: limpeza e tipos',
      blocks: [
        {
          type: 'text',
          text: "Você já sabe que **tudo que sai de um CSV é texto** e que é preciso converter antes de calcular. O que muda com dados reais é que, antes de converter, quase sempre é preciso **limpar**: `float('12,50')` quebra por causa da vírgula, e uma cidade escrita `' Recife '` não é igual a `'Recife'` na hora de agrupar.",
        },
        {
          type: 'trace',
          caption: 'A limpeza de um valor, passo a passo',
          code: "bruto = '  12,50 '\nlimpo = bruto.strip()\ncom_ponto = limpo.replace(',', '.')\nvalor = float(com_ponto)\nprint(valor * 2)",
          steps: [
            {
              line: 1,
              note: 'O valor chegou do arquivo com espaços antes e depois. Isso é comum em exportações feitas à mão.',
              memory: [['bruto', "'  12,50 '"]],
            },
            {
              line: 2,
              note: '`strip()` remove espaços (e quebras de linha) das pontas. O texto do meio não muda.',
              memory: [
                ['bruto', "'  12,50 '"],
                ['limpo', "'12,50'"],
              ],
            },
            {
              line: 3,
              note: 'Troca a vírgula decimal brasileira pelo ponto que o Python entende. Ainda é texto.',
              memory: [
                ['bruto', "'  12,50 '"],
                ['limpo', "'12,50'"],
                ['com_ponto', "'12.50'"],
              ],
            },
            {
              line: 4,
              note: 'Agora sim, `float()` converte para número. Repare que não há mais aspas no valor.',
              memory: [
                ['bruto', "'  12,50 '"],
                ['limpo', "'12,50'"],
                ['com_ponto', "'12.50'"],
                ['valor', '12.5'],
              ],
            },
            {
              line: 5,
              note: 'Com um número de verdade, a conta funciona.',
              output: '25.0',
            },
          ],
        },
        {
          type: 'text',
          text: 'Datas seguem a mesma ideia. O módulo `datetime` converte texto em data com `datetime.strptime(texto, formato)`. No formato, `%d` é o dia, `%m` o mês e `%Y` o ano com quatro dígitos. Com uma data de verdade, você consegue pegar o mês, comparar e ordenar corretamente.',
        },
        {
          type: 'text',
          text: 'E as células vazias? Um **valor faltante** é diferente de zero: uma venda sem valor não é uma venda grátis. Em Python, o jeito comum de representar “não sei” é `None`.',
        },
        {
          type: 'quiz',
          question:
            'No CSV de pacientes de uma UBS, a coluna `peso` está vazia em algumas linhas. Como o seu programa deve guardar esse valor?',
          options: [
            {
              text: 'Como `None`, e decidir depois se a linha é rejeitada ou fica fora da média',
              correct: true,
              feedback:
                'Isso. `None` diz “não sabemos”, e quem calcula a média consegue ignorar esses casos de propósito. A informação de que faltou dado não se perde.',
            },
            {
              text: 'Como `0`, para não dar erro na conta',
              feedback:
                'Ninguém pesa 0 kg. A conta roda, mas a média de peso cai e ninguém percebe o porquê. Zero é um valor real; faltante é ausência de valor.',
            },
            {
              text: "Como o texto vazio `''`, do jeito que veio",
              feedback:
                "Deixar como texto adia o problema: em algum momento alguém vai tentar `float('')` e o programa quebra longe da origem do erro.",
            },
            {
              text: 'Com a média dos outros pacientes, para completar a tabela',
              feedback:
                'Preencher com estimativas (imputar) é uma decisão de análise, que precisa ser explícita e documentada. Na leitura, o pipeline deve registrar a falta, não inventar valores.',
            },
          ],
        },
        {
          type: 'python',
          title: 'Funções de limpeza reutilizáveis',
          task: 'Complete `para_numero` (tira espaços, devolve `None` se ficar vazio, senão converte com vírgula trocada por ponto) e `para_data` (converte `dd/mm/aaaa` em data).',
          code: `from datetime import datetime

def para_numero(texto):
    # 1. tire os espaços com strip()
    # 2. se sobrar texto vazio, devolva None
    # 3. troque a vírgula por ponto e converta com float()
    return texto

def para_data(texto):
    # use datetime.strptime(texto.strip(), '%d/%m/%Y').date()
    return texto

print(para_numero(' 12,50 '))
print(para_numero('   '))
print(para_data('03/10/2026'))
`,
          solution: `from datetime import datetime

def para_numero(texto):
    texto = texto.strip()
    if texto == '':
        return None
    return float(texto.replace(',', '.'))

def para_data(texto):
    return datetime.strptime(texto.strip(), '%d/%m/%Y').date()

print(para_numero(' 12,50 '))
print(para_numero('   '))
print(para_data('03/10/2026'))
`,
          checks: [
            {
              label: "`para_numero(' 12,50 ')` devolve `12.5`",
              test: "para_numero(' 12,50 ') == 12.5",
            },
            { label: 'Texto vazio vira `None`', test: "para_numero('   ') is None" },
            {
              label: '`para_data` devolve uma data com mês 10',
              test: "para_data('03/10/2026').month == 10",
            },
            {
              label: '`para_data` ignora espaços nas pontas',
              test: "para_data(' 25/12/2026 ').day == 25",
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns na limpeza',
          text: "Trocar valor vazio por `0` (isso esconde o problema e puxa a média para baixo). Usar o formato `%m/%d/%Y` americano numa data brasileira, o que funciona até o dia 12 e quebra no dia 13. E comparar datas como texto: `'02/11/2026' < '15/10/2026'` dá `True`, porque texto é comparado letra por letra.",
        },
      ],
    },
    {
      id: 'validar-e-rejeitar',
      title: 'Validar linhas e guardar as rejeitadas',
      blocks: [
        {
          type: 'analogy',
          title: 'A triagem do posto de saúde',
          text: 'Na triagem, ninguém é mandado embora em silêncio: quem não pode ser atendido ali recebe um encaminhamento dizendo o motivo. Um bom pipeline faz o mesmo com as linhas. Linha ruim não some; ela vai para uma lista de **rejeitadas**, com o número da linha e o motivo, para alguém corrigir na fonte.',
        },
        {
          type: 'text',
          text: 'Você já separou válidos e rejeitados com `try` e `except ValueError`. Num pipeline de verdade, faltam duas coisas: saber **qual linha** do arquivo falhou e **por quê**. Sem isso, quem recebe a lista de rejeitadas não consegue corrigir nada na fonte.',
        },
        {
          type: 'text',
          text: 'Para o número da linha, use `enumerate(leitor, start=2)`: a linha 1 do arquivo é o cabeçalho, então a primeira linha de dados é a 2. Para o motivo, faça uma verificação por vez e pare na primeira que falhar com `continue`, que pula direto para a próxima volta do laço.',
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem o que o programa faz com cada linha do arquivo.',
          items: [
            'Ler a linha como dicionário com o `DictReader`',
            'Tirar os espaços das pontas de cada campo',
            'Verificar se algum campo obrigatório está vazio',
            'Converter valor e data, capturando `ValueError`',
            'Guardar a linha em `validos` ou em `rejeitados` com o motivo',
          ],
          explanation:
            'Limpar antes de checar vazios evita que um campo com só espaços pareça preenchido. Checar vazios antes de converter dá um motivo de rejeição mais claro do que um erro genérico de conversão.',
        },
        {
          type: 'python',
          title: 'Triagem de vendas',
          task: "O código aceita tudo. Faça a validação: valor vazio vira motivo `valor faltando`, valor que não converte vira `valor inválido`, data que não converte vira `data inválida`. Rejeitadas vão para `rejeitados` como `{'linha': numero, 'motivo': ...}`; válidas guardam `valor` como `float` e a cidade sem espaços.",
          code: `import csv
import io
from datetime import datetime

arquivo = io.StringIO("""data;cidade;valor
14/10/2026;Recife;12,50
15/10/2026;Salvador;
31/02/2026;Belém;8,00
16/10/2026;Recife;abc
16/10/2026; Manaus ;30,00
""")

validos = []
rejeitados = []

# start=2 porque a linha 1 do arquivo é o cabeçalho
for numero, linha in enumerate(csv.DictReader(arquivo, delimiter=';'), start=2):
    cidade = linha['cidade'].strip()
    texto_valor = linha['valor'].strip()
    # Complete: valide o valor e a data.
    # Se algo falhar, adicione {'linha': numero, 'motivo': '...'} em rejeitados e use continue.
    validos.append({'cidade': cidade, 'valor': texto_valor})

print(len(validos), 'válidas,', len(rejeitados), 'rejeitadas')
for r in rejeitados:
    print('Linha', r['linha'], '->', r['motivo'])
`,
          solution: `import csv
import io
from datetime import datetime

arquivo = io.StringIO("""data;cidade;valor
14/10/2026;Recife;12,50
15/10/2026;Salvador;
31/02/2026;Belém;8,00
16/10/2026;Recife;abc
16/10/2026; Manaus ;30,00
""")

validos = []
rejeitados = []

for numero, linha in enumerate(csv.DictReader(arquivo, delimiter=';'), start=2):
    cidade = linha['cidade'].strip()
    texto_valor = linha['valor'].strip()
    if texto_valor == '':
        rejeitados.append({'linha': numero, 'motivo': 'valor faltando'})
        continue
    try:
        valor = float(texto_valor.replace(',', '.'))
    except ValueError:
        rejeitados.append({'linha': numero, 'motivo': 'valor inválido'})
        continue
    try:
        data = datetime.strptime(linha['data'].strip(), '%d/%m/%Y').date()
    except ValueError:
        rejeitados.append({'linha': numero, 'motivo': 'data inválida'})
        continue
    validos.append({'data': data, 'cidade': cidade, 'valor': valor})

print(len(validos), 'válidas,', len(rejeitados), 'rejeitadas')
for r in rejeitados:
    print('Linha', r['linha'], '->', r['motivo'])
`,
          checks: [
            { label: 'Sobraram 2 linhas válidas', test: 'len(validos) == 2' },
            {
              label: 'As linhas 3, 4 e 5 foram rejeitadas',
              test: "sorted(r['linha'] for r in rejeitados) == [3, 4, 5]",
            },
            {
              label: 'Os valores válidos são números (`float`)',
              test: "len(validos) > 0 and all(isinstance(v['valor'], float) for v in validos)",
            },
            {
              label: 'A cidade ` Manaus ` foi guardada sem espaços',
              test: "any(v['cidade'] == 'Manaus' for v in validos)",
            },
            {
              label: 'A linha 4 foi rejeitada por data inválida',
              test: "any(r['linha'] == 4 and r['motivo'] == 'data inválida' for r in rejeitados)",
            },
          ],
        },
        {
          type: 'reveal',
          question: 'A data `31/02/2026` parece bem escrita. Por que ela é rejeitada?',
          answer:
            'Porque fevereiro não tem dia 31. O formato está certo, mas o valor é impossível, e `strptime` verifica isso. É por isso que converter é melhor do que só conferir o formato com os olhos: a conversão valida o significado.',
        },
      ],
    },
    {
      id: 'agregar',
      title: 'Resumir: somas, contagens e grupos',
      blocks: [
        {
          type: 'text',
          text: 'Com as linhas limpas, vem a pergunta de negócio: quanto cada cidade vendeu? Qual forma de pagamento é a mais usada? Isso se chama **agregar**: transformar muitas linhas em poucos números, agrupando por alguma coluna.',
        },
        {
          type: 'text',
          text: 'Com um dicionário comum, somar por cidade esbarra num problema: na primeira vez que uma cidade aparece, ela ainda não é chave, e `total[cidade] += valor` dá `KeyError`. O módulo `collections` tem duas ferramentas que resolvem isso.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'defaultdict',
              text: 'Um dicionário que cria um valor inicial sozinho quando a chave não existe. `defaultdict(float)` começa cada chave em `0.0`; `defaultdict(list)`, numa lista vazia.',
            },
            {
              term: 'Counter',
              text: "Um dicionário feito para contar. `Counter(['pix', 'pix', 'cartao'])` vira `{'pix': 2, 'cartao': 1}`, e `most_common(1)` devolve o mais frequente.",
            },
          ],
        },
        {
          type: 'python',
          title: 'Vendas por cidade e forma de pagamento',
          task: 'Rode e veja o `KeyError`. Corrija `total_por_cidade` usando `defaultdict(float)`, conte as formas de pagamento com `Counter` e imprima `Mais usado: pix` usando `most_common`.',
          code: `from collections import Counter, defaultdict

vendas = [
    {'cidade': 'Recife', 'pagamento': 'pix', 'valor': 12.5},
    {'cidade': 'Salvador', 'pagamento': 'dinheiro', 'valor': 6.0},
    {'cidade': 'Recife', 'pagamento': 'cartao', 'valor': 25.9},
    {'cidade': 'Belém', 'pagamento': 'pix', 'valor': 6.0},
    {'cidade': 'Recife', 'pagamento': 'pix', 'valor': 9.6},
    {'cidade': 'Salvador', 'pagamento': 'pix', 'valor': 14.0},
]

total_por_cidade = {}
for venda in vendas:
    total_por_cidade[venda['cidade']] += venda['valor']

pagamentos = Counter()  # conte as formas de pagamento das vendas

print(dict(total_por_cidade))
# print('Mais usado:', pagamentos.most_common(1)[0][0])
`,
          solution: `from collections import Counter, defaultdict

vendas = [
    {'cidade': 'Recife', 'pagamento': 'pix', 'valor': 12.5},
    {'cidade': 'Salvador', 'pagamento': 'dinheiro', 'valor': 6.0},
    {'cidade': 'Recife', 'pagamento': 'cartao', 'valor': 25.9},
    {'cidade': 'Belém', 'pagamento': 'pix', 'valor': 6.0},
    {'cidade': 'Recife', 'pagamento': 'pix', 'valor': 9.6},
    {'cidade': 'Salvador', 'pagamento': 'pix', 'valor': 14.0},
]

total_por_cidade = defaultdict(float)
for venda in vendas:
    total_por_cidade[venda['cidade']] += venda['valor']

pagamentos = Counter(venda['pagamento'] for venda in vendas)

print(dict(total_por_cidade))
print('Mais usado:', pagamentos.most_common(1)[0][0])
`,
          checks: [
            {
              label: 'Recife vendeu 48,00 no total',
              test: "round(total_por_cidade['Recife'], 2) == 48.0",
            },
            {
              label: 'Salvador vendeu 20,00 no total',
              test: "round(total_por_cidade['Salvador'], 2) == 20.0",
            },
            { label: 'Pix aparece 4 vezes em `pagamentos`', test: "pagamentos['pix'] == 4" },
            { label: 'Imprimiu `Mais usado: pix`', test: "'Mais usado: pix' in __saida__" },
          ],
        },
        {
          type: 'fill',
          prompt:
            'Complete o código que agrupa os produtos vendidos por cidade e conta os produtos.',
          language: 'python',
          template:
            "from collections import Counter, [[defaultdict]]\n\nprodutos_por_cidade = defaultdict([[list]])\nfor venda in vendas:\n    produtos_por_cidade[venda['cidade']].[[append]](venda['produto'])\n\ncontagem = [[Counter]](venda['produto'] for venda in vendas)",
          explanation:
            '`defaultdict(list)` cria uma lista vazia para cada cidade nova, então `append` funciona desde a primeira venda. `Counter` recebe qualquer sequência e conta quantas vezes cada item aparece.',
        },
      ],
    },
    {
      id: 'escrever-saida',
      title: 'Entregar o resultado: CSV e JSON',
      blocks: [
        {
          type: 'text',
          text: 'Um pipeline termina quando outra pessoa, ou outro programa, consegue usar o que você produziu. Os dois formatos de saída mais comuns são CSV, para tabelas, e JSON, que você já conhece das APIs, para relatórios com estrutura. Para escrever CSV a partir de dicionários existe o par do `DictReader`: o `csv.DictWriter`, que recebe a lista de colunas (`fieldnames`), escreve o cabeçalho com `writeheader()` e uma linha por `writerow()`.',
        },
        {
          type: 'codeTabs',
          caption: 'O mesmo resumo nos dois formatos',
          tabs: [
            {
              label: 'resumo.csv',
              language: 'csv',
              code: 'cidade,total\nRecife,48.0\nSalvador,20.0\nBelém,6.0',
            },
            {
              label: 'rejeicoes.json',
              language: 'json',
              code: '{\n  "total_rejeitados": 2,\n  "rejeitados": [\n    { "linha": 3, "motivo": "valor faltando" },\n    { "linha": 5, "motivo": "valor inválido" }\n  ]\n}',
            },
          ],
        },
        {
          type: 'python',
          title: 'Resumo em CSV e relatório de rejeições em JSON',
          task: 'Escreva uma linha por cidade no CSV com `escritor.writerow`. Depois gere `relatorio` com `json.dumps` contendo `total_rejeitados` e a lista `rejeitados`, usando `ensure_ascii=False` para manter os acentos.',
          code: `import csv
import io
import json

resumo = {'Recife': 48.0, 'Salvador': 20.0, 'Belém': 6.0}
rejeitados = [
    {'linha': 3, 'motivo': 'valor faltando'},
    {'linha': 5, 'motivo': 'valor inválido'},
]

saida = io.StringIO()
escritor = csv.DictWriter(saida, fieldnames=['cidade', 'total'])
escritor.writeheader()
# escreva uma linha por cidade: escritor.writerow({'cidade': ..., 'total': ...})

texto_csv = saida.getvalue()
print(texto_csv)

relatorio = ''  # use json.dumps({...}, ensure_ascii=False, indent=2)
print(relatorio)
`,
          solution: `import csv
import io
import json

resumo = {'Recife': 48.0, 'Salvador': 20.0, 'Belém': 6.0}
rejeitados = [
    {'linha': 3, 'motivo': 'valor faltando'},
    {'linha': 5, 'motivo': 'valor inválido'},
]

saida = io.StringIO()
escritor = csv.DictWriter(saida, fieldnames=['cidade', 'total'])
escritor.writeheader()
for cidade, total in resumo.items():
    escritor.writerow({'cidade': cidade, 'total': total})

texto_csv = saida.getvalue()
print(texto_csv)

relatorio = json.dumps(
    {'total_rejeitados': len(rejeitados), 'rejeitados': rejeitados},
    ensure_ascii=False,
    indent=2,
)
print(relatorio)
`,
          checks: [
            {
              label: 'O CSV tem o cabeçalho e uma linha por cidade',
              test: 'len(texto_csv.splitlines()) == 4',
            },
            {
              label: 'A segunda linha do CSV é `Recife,48.0`',
              test: "texto_csv.splitlines()[1] == 'Recife,48.0'",
            },
            {
              label: 'O JSON informa 2 rejeitados',
              test: "json.loads(relatorio)['total_rejeitados'] == 2",
            },
            { label: 'Os acentos foram mantidos no JSON', test: "'inválido' in relatorio" },
          ],
        },
      ],
    },
    {
      id: 'e-o-pandas',
      title: 'E o pandas? O mesmo trabalho em menos linhas',
      blocks: [
        {
          type: 'text',
          text: 'O **pandas** é a biblioteca mais usada para dados em Python. Ele trabalha com um **DataFrame**: uma tabela inteira na memória, com colunas que têm tipo. Em vez de percorrer linha por linha, você dá ordens para colunas inteiras de uma vez.',
        },
        {
          type: 'codeTabs',
          caption: 'Ler, limpar, separar rejeitadas e somar por cidade',
          tabs: [
            {
              label: 'Biblioteca padrão',
              language: 'python',
              code: "validos, rejeitados = [], []\nfor numero, linha in enumerate(csv.DictReader(arquivo, delimiter=';'), start=2):\n    try:\n        valor = float(linha['valor'].strip().replace(',', '.'))\n        data = datetime.strptime(linha['data'].strip(), '%d/%m/%Y')\n    except ValueError:\n        rejeitados.append(numero)\n        continue\n    validos.append({'cidade': linha['cidade'].strip(), 'valor': valor})\n\ntotal = defaultdict(float)\nfor v in validos:\n    total[v['cidade']] += v['valor']",
            },
            {
              label: 'pandas',
              language: 'python',
              code: "import pandas as pd\n\ndf = pd.read_csv('vendas.csv', sep=';', dtype=str)\ndf['cidade'] = df['cidade'].str.strip()\ndf['valor'] = pd.to_numeric(df['valor'].str.replace(',', '.'), errors='coerce')\ndf['data'] = pd.to_datetime(df['data'], format='%d/%m/%Y', errors='coerce')\n\nruins = df['valor'].isna() | df['data'].isna()\nrejeitados = df[ruins]\ntotal = df[~ruins].groupby('cidade')['valor'].sum()",
            },
          ],
        },
        {
          type: 'text',
          text: "Repare que as ideias são as mesmas: separador, limpeza, conversão, rejeição e agrupamento. No pandas, `errors='coerce'` transforma o que não converte em valor vazio (`NaN`), e `groupby` faz o papel do `defaultdict`. Quem entende a versão em Python puro sabe exatamente o que o pandas faz por baixo.",
        },
        {
          type: 'table',
          caption: 'Quando usar cada um',
          head: ['', 'Biblioteca padrão', 'pandas'],
          rows: [
            [
              'Instalação',
              'Nenhuma, já vem com o Python',
              'Precisa instalar (`pip install pandas`)',
            ],
            [
              'Código',
              'Mais longo, cada passo explícito',
              'Mais curto, operações em colunas inteiras',
            ],
            [
              'Memória',
              'Pode ler linha a linha, arquivos de qualquer tamanho',
              'Carrega a tabela toda na memória',
            ],
            [
              'Bom para',
              'Scripts pequenos, validações linha a linha, ambientes sem dependências',
              'Exploração, análises e transformações em tabelas que cabem na memória',
            ],
          ],
        },
        {
          type: 'quiz',
          question:
            'Você precisa validar um CSV de 40 GB num servidor com 8 GB de memória. Qual abordagem tem mais chance de funcionar sem travar?',
          options: [
            {
              text: 'Ler com `csv.DictReader` linha a linha, sem guardar todas as linhas numa lista',
              correct: true,
              feedback:
                'Isso. Lendo uma linha por vez, a memória usada fica pequena, não importa o tamanho do arquivo. Basta não acumular tudo num `list()`.',
            },
            {
              text: 'Abrir com `pd.read_csv` de uma vez, porque o pandas é mais rápido',
              feedback:
                'O pandas carrega a tabela inteira na memória, e 40 GB não cabem em 8 GB. Ele até tem leitura em pedaços (`chunksize`), mas o padrão vai travar.',
            },
            {
              text: 'Abrir o arquivo no Excel e salvar uma cópia menor',
              feedback:
                'O Excel tem limite de cerca de um milhão de linhas e cortaria o resto sem avisar direito. Em pipelines, a leitura precisa ser automática e completa.',
            },
          ],
        },
      ],
    },
  ],
  recap: [
    '`csv.DictReader` transforma cada linha de um CSV num dicionário; confira o separador, que no Brasil costuma ser `;`.',
    'Tudo que vem de um arquivo é texto: limpe com `strip()`, troque a vírgula decimal e converta com `float()` e `datetime.strptime()`.',
    'Valores faltantes viram `None`, nunca zero, e linhas inválidas vão para um relatório de rejeições com número e motivo.',
    '`defaultdict` e `Counter` resumem dados por grupo; `csv.DictWriter` e `json.dumps` entregam o resultado.',
    'O pandas faz o mesmo com menos código, mas carrega tudo na memória; entender a versão em Python puro mostra o que ele faz por baixo.',
  ],
  cards: [
    {
      id: 'dictreader',
      front: 'O que `csv.DictReader` faz com cada linha do arquivo?',
      back: 'Transforma a linha num dicionário, usando o cabeçalho como chaves.',
    },
    {
      id: 'tipo-do-csv',
      front: 'Qual é o tipo de todo valor lido de um CSV?',
      back: 'Texto (`str`). É preciso converter para número ou data antes de calcular.',
    },
    {
      id: 'virgula-decimal',
      front: 'Como converter o texto `12,50` em número no Python?',
      back: "`float('12,50'.replace(',', '.'))`, depois de tirar espaços com `strip()`.",
    },
    {
      id: 'faltante',
      front: 'Por que não trocar um valor faltante por zero?',
      back: 'Porque zero é um valor real e distorce somas e médias. Use `None` e trate ou rejeite a linha.',
    },
    {
      id: 'defaultdict',
      front: 'Que problema o `defaultdict(float)` resolve ao somar por grupo?',
      back: 'O `KeyError` na primeira vez que um grupo aparece: ele cria a chave com `0.0` automaticamente.',
    },
    {
      id: 'relatorio-rejeicoes',
      front: 'O que um relatório de rejeições deve ter?',
      back: 'O número da linha e o motivo de cada rejeição, para alguém corrigir na fonte.',
    },
    {
      id: 'pandas-memoria',
      front: 'Qual a principal limitação do pandas para arquivos enormes?',
      back: 'Ele carrega a tabela inteira na memória, a não ser que você leia em pedaços.',
    },
  ],
  mission: {
    title: 'Valide um CSV público de verdade',
    text: 'Leve o que você fez aqui para o seu computador, com um arquivo real. Escolha um CSV pequeno do Portal Brasileiro de Dados Abertos ou do OpenDataSUS.',
    steps: [
      'Crie uma pasta de projeto e um ambiente virtual com `python -m venv .venv`',
      'Baixe um CSV público e anote a origem, a data do download e a licença num README',
      'Leia o arquivo com `csv.DictReader`, descobrindo o separador e o encoding corretos',
      'Valide tipos e valores faltantes de pelo menos três colunas e separe as linhas rejeitadas',
      'Grave um CSV com as linhas válidas e um JSON com o relatório de rejeições (linha e motivo)',
      'Publique o projeto no GitHub sem o arquivo de dados se ele for grande, explicando como baixá-lo',
    ],
  },
  sources: [
    { title: 'Python: módulo csv', url: 'https://docs.python.org/pt-br/3/library/csv.html' },
    {
      title: 'Python: módulo collections',
      url: 'https://docs.python.org/pt-br/3/library/collections.html',
    },
    {
      title: 'Python: módulo datetime',
      url: 'https://docs.python.org/pt-br/3/library/datetime.html',
    },
    { title: 'Documentação do pandas', url: 'https://pandas.pydata.org/docs/' },
  ],
};
