import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Na vida real, ninguém trabalha com um valor só. É a lista de pedidos do dia, o cadastro de cada cliente, a planilha que o financeiro manda por e-mail, a resposta em JSON de um sistema. Nesta aula você aprende a guardar muitos dados de uma vez, ler e escrever arquivos CSV e JSON, e fazer o programa sobreviver quando os dados vêm errados. É o que separa um exercício de um script que alguém usa no trabalho.',
  sections: [
    {
      id: 'listas',
      title: 'Listas: muitos valores em ordem',
      blocks: [
        {
          type: 'analogy',
          title: 'A fila da padaria',
          text: 'Uma **lista** é como a fila de senhas da padaria: os itens ficam em ordem, cada um numa posição, e dá para chegar gente nova no fim. A diferença é que, em Python, a contagem das posições começa no **zero**: quem está na frente da fila está na posição 0.',
        },
        {
          type: 'code',
          language: 'python',
          caption: 'Criar, ler, acrescentar e percorrer uma lista',
          code: 'compras = ["arroz", "feijão", "café"]\nprint(compras[0])        # primeira posição\nprint(compras[-1])       # -1 é a última\ncompras.append("leite")  # acrescenta no fim\nprint(len(compras))      # quantos itens\nprint("café" in compras) # existe na lista?\nfor item in compras:\n    print("-", item)',
          output: 'arroz\ncafé\n4\nTrue\n- arroz\n- feijão\n- café\n- leite',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Índice',
              text: 'A posição de um item, entre colchetes: `compras[0]`. Pedir uma posição que não existe dá `IndexError`.',
            },
            {
              term: 'Método',
              text: 'Uma ação que o próprio valor sabe fazer, chamada com ponto: `compras.append("leite")`. Listas também têm `.remove()`, `.sort()` e outros.',
            },
            {
              term: 'Funções de lista',
              text: '`len(lista)` conta itens, `sum(lista)` soma números, `max` e `min` acham o maior e o menor.',
            },
          ],
        },
        {
          type: 'quiz',
          question: 'O que este código mostra?',
          code: 'linhas = ["101", "202", "303", "404"]\nprint(linhas[1])',
          language: 'python',
          options: [
            {
              text: '`202`',
              correct: true,
              feedback:
                'Isso. A contagem começa no 0: `linhas[0]` é `"101"` e `linhas[1]` é o segundo item, `"202"`.',
            },
            {
              text: '`101`',
              feedback:
                'Esse é `linhas[0]`. Em Python, o primeiro item fica na posição zero, então o índice 1 é o **segundo**.',
            },
            {
              text: 'Um `IndexError`',
              feedback:
                'A lista tem 4 itens, nas posições 0 a 3. A posição 1 existe. O `IndexError` apareceria com `linhas[4]`.',
            },
          ],
        },
        {
          type: 'python',
          title: 'Temperaturas da semana',
          task: 'Acrescente a temperatura `27` no fim da lista, calcule a `media` com `sum` e `len`, e mostre a maior temperatura no formato `Maior: 33`.',
          code: 'temperaturas = [28, 31, 25, 33, 30]\n\n# 1. acrescente 27 no fim\n\n# 2. calcule a média\nmedia = 0\n\n# 3. mostre a maior temperatura\n\nprint(f"Média: {media}")\n',
          solution:
            'temperaturas = [28, 31, 25, 33, 30]\n\ntemperaturas.append(27)\n\nmedia = sum(temperaturas) / len(temperaturas)\n\nprint(f"Maior: {max(temperaturas)}")\n\nprint(f"Média: {media}")\n',
          checks: [
            {
              label: 'A lista termina com 27 e tem 6 itens',
              test: 'len(temperaturas) == 6 and temperaturas[-1] == 27',
            },
            { label: 'A média é 29', test: 'media == 29' },
            { label: 'Mostra Maior: 33', test: "'Maior: 33' in __saida__" },
          ],
        },
      ],
    },
    {
      id: 'dicionarios',
      title: 'Dicionários: dados com nome',
      blocks: [
        {
          type: 'analogy',
          title: 'A ficha de cadastro',
          text: 'Na recepção do posto de saúde, sua ficha tem campos com nome: “Nome”, “Cartão SUS”, “Telefone”. Ninguém procura “o terceiro campo”: procura pelo nome do campo. Um **dicionário** guarda dados assim, em pares de **chave** (o nome do campo) e **valor** (o que está escrito nele).',
        },
        {
          type: 'anatomy',
          caption: 'Um dicionário com três pares de chave e valor',
          language: 'python',
          parts: [
            { text: 'cliente = ' },
            {
              text: '{',
              label: 'Chaves { }',
              note: 'Dicionários são escritos entre chaves. Listas usam colchetes `[ ]`; dicionários, `{ }`.',
            },
            { text: '\n    ' },
            {
              text: '"nome"',
              label: 'Chave',
              note: 'O nome do campo, quase sempre um texto. Cada chave aparece uma vez só no dicionário.',
            },
            { text: ': ' },
            {
              text: '"Ana"',
              label: 'Valor',
              note: 'Pode ser de qualquer tipo: texto, número, booleano, até outra lista ou outro dicionário.',
            },
            { text: ',\n    "cidade": "Recife",\n    "pontos": 120,\n}\n' },
            {
              text: 'print(cliente["nome"])',
              label: 'Ler pela chave',
              note: 'Colchetes com a chave devolvem o valor. Se a chave não existir, dá `KeyError`.',
            },
            { text: '\n' },
            {
              text: 'print(cliente.get("email", "sem e-mail"))',
              label: '.get()',
              note: 'Leitura segura: se a chave não existir, devolve o valor padrão (aqui, `"sem e-mail"`) em vez de quebrar o programa.',
            },
          ],
        },
        {
          type: 'code',
          language: 'python',
          caption: 'Alterar, acrescentar e percorrer um dicionário',
          code: 'cliente = {"nome": "Ana", "cidade": "Recife", "pontos": 120}\ncliente["cidade"] = "Olinda"   # chave existente: troca o valor\ncliente["telefone"] = "81 99999-0000"  # chave nova: acrescenta\nfor chave, valor in cliente.items():\n    print(f"{chave}: {valor}")',
          output: 'nome: Ana\ncidade: Olinda\npontos: 120\ntelefone: 81 99999-0000',
        },
        {
          type: 'python',
          title: 'Programa de pontos',
          task: 'A Ana fez uma compra e ganhou 30 pontos. Some os pontos no dicionário, acrescente a chave `"email"` com qualquer endereço e mostre a frase `Ana tem 150 pontos` usando os valores do dicionário.',
          code: 'cliente = {"nome": "Ana", "cidade": "Recife", "pontos": 120}\n\n# some 30 pontos\n\n# acrescente o e-mail\n\n# mostre a frase\n',
          solution:
            'cliente = {"nome": "Ana", "cidade": "Recife", "pontos": 120}\n\ncliente["pontos"] = cliente["pontos"] + 30\n\ncliente["email"] = "ana@exemplo.com"\n\nprint(f"{cliente[\'nome\']} tem {cliente[\'pontos\']} pontos")\n',
          checks: [
            { label: 'Os pontos agora são 150', test: "cliente['pontos'] == 150" },
            { label: 'O dicionário tem a chave email', test: "'email' in cliente" },
            { label: 'Mostra Ana tem 150 pontos', test: "'Ana tem 150 pontos' in __saida__" },
          ],
        },
        {
          type: 'classify',
          prompt: 'Para cada situação, é melhor usar uma lista ou um dicionário?',
          buckets: ['Lista', 'Dicionário'],
          items: [
            { text: 'As notas de um aluno em ordem de prova', bucket: 0 },
            { text: 'Os dados de um produto: nome, preço e estoque', bucket: 1 },
            { text: 'Os servidores que um script de DevOps precisa checar', bucket: 0 },
            { text: 'A configuração de um sistema: porta, host e modo de depuração', bucket: 1 },
            { text: 'Os CEPs que chegaram num arquivo, um por linha', bucket: 0 },
            { text: 'Uma resposta de API com id, nome e e-mail', bucket: 1 },
          ],
          explanation:
            'Lista quando os itens são do mesmo tipo e a ordem importa ("vários de uma coisa"). Dicionário quando cada valor tem um significado diferente e você quer achar pelo nome ("uma coisa com vários campos").',
        },
      ],
    },
    {
      id: 'lista-de-dicionarios',
      title: 'Listas de dicionários: a tabela do dia a dia',
      blocks: [
        {
          type: 'text',
          text: 'Junte os dois e você tem a estrutura mais comum da programação: uma **lista de dicionários**. Cada dicionário é uma linha (um pedido, um cliente), e as chaves são as colunas. É assim que chegam respostas de APIs, linhas de CSV e resultados de banco de dados.',
        },
        {
          type: 'trace',
          caption: 'Somando só os pedidos entregues.',
          code: 'pedidos = [{"valor": 45, "status": "entregue"}, {"valor": 120, "status": "cancelado"}, {"valor": 30, "status": "entregue"}]\ntotal = 0\nfor pedido in pedidos:\n    if pedido["status"] == "entregue":\n        total = total + pedido["valor"]\nprint("Faturamento:", total)',
          steps: [
            {
              line: 1,
              note: 'Uma lista com três dicionários.',
              memory: [['pedidos', '[3 pedidos]']],
            },
            {
              line: 2,
              note: 'O acumulador começa em zero.',
              memory: [
                ['pedidos', '[3 pedidos]'],
                ['total', '0'],
              ],
            },
            {
              line: 3,
              note: 'Primeira volta: `pedido` é o primeiro dicionário inteiro.',
              memory: [
                ['pedidos', '[3 pedidos]'],
                ['total', '0'],
                ['pedido', '{"valor": 45, "status": "entregue"}'],
              ],
            },
            { line: 4, note: '`pedido["status"]` é `"entregue"`: a condição é verdadeira.' },
            {
              line: 5,
              note: 'Soma o valor deste pedido.',
              memory: [
                ['pedidos', '[3 pedidos]'],
                ['total', '45'],
                ['pedido', '{"valor": 45, "status": "entregue"}'],
              ],
            },
            {
              line: 3,
              note: 'Segunda volta: o pedido cancelado.',
              memory: [
                ['pedidos', '[3 pedidos]'],
                ['total', '45'],
                ['pedido', '{"valor": 120, "status": "cancelado"}'],
              ],
            },
            {
              line: 4,
              note: '`"cancelado" == "entregue"` é falso: a linha 5 é pulada e o total não muda.',
            },
            {
              line: 3,
              note: 'Terceira volta.',
              memory: [
                ['pedidos', '[3 pedidos]'],
                ['total', '45'],
                ['pedido', '{"valor": 30, "status": "entregue"}'],
              ],
            },
            { line: 4, note: 'Entregue de novo.' },
            {
              line: 5,
              note: '`45 + 30` dá `75`.',
              memory: [
                ['pedidos', '[3 pedidos]'],
                ['total', '75'],
                ['pedido', '{"valor": 30, "status": "entregue"}'],
              ],
            },
            { line: 6, note: 'Acabaram os pedidos. Resultado final.', output: 'Faturamento: 75' },
          ],
        },
        {
          type: 'text',
          text: 'Filtrar uma lista é tão comum que o Python tem um atalho: a **list comprehension** (compreensão de lista). Ela cria uma lista nova numa linha só, lida quase como uma frase: “o pedido, para cada pedido em pedidos, se o status for entregue”.',
        },
        {
          type: 'codeTabs',
          caption: 'O mesmo filtro, de dois jeitos',
          tabs: [
            {
              label: 'Com for',
              language: 'python',
              code: 'entregues = []\nfor p in pedidos:\n    if p["status"] == "entregue":\n        entregues.append(p)',
            },
            {
              label: 'List comprehension',
              language: 'python',
              code: 'entregues = [p for p in pedidos if p["status"] == "entregue"]\n\n# também serve para transformar:\nvalores = [p["valor"] for p in pedidos]',
            },
          ],
        },
        {
          type: 'python',
          title: 'Relatório de pedidos do dia',
          task: 'Crie `entregues` só com os pedidos de status `"entregue"`, some o `faturamento` deles e monte `por_cliente`, um dicionário com o total entregue de cada cliente (por exemplo, `{"Ana": 75.0, ...}`).',
          code: 'pedidos = [\n    {"id": 1, "cliente": "Ana", "valor": 45.0, "status": "entregue"},\n    {"id": 2, "cliente": "Bruno", "valor": 120.0, "status": "cancelado"},\n    {"id": 3, "cliente": "Ana", "valor": 30.0, "status": "entregue"},\n    {"id": 4, "cliente": "Carla", "valor": 80.0, "status": "entregue"},\n    {"id": 5, "cliente": "Bruno", "valor": 25.0, "status": "a caminho"},\n]\n\nentregues = []\nfaturamento = 0\npor_cliente = {}\n\n# dica para por_cliente: por_cliente.get(nome, 0) devolve 0 se a chave ainda não existe\n\nprint("Entregues:", len(entregues))\nprint("Faturamento:", faturamento)\nprint("Por cliente:", por_cliente)\n',
          solution:
            'pedidos = [\n    {"id": 1, "cliente": "Ana", "valor": 45.0, "status": "entregue"},\n    {"id": 2, "cliente": "Bruno", "valor": 120.0, "status": "cancelado"},\n    {"id": 3, "cliente": "Ana", "valor": 30.0, "status": "entregue"},\n    {"id": 4, "cliente": "Carla", "valor": 80.0, "status": "entregue"},\n    {"id": 5, "cliente": "Bruno", "valor": 25.0, "status": "a caminho"},\n]\n\nentregues = [p for p in pedidos if p["status"] == "entregue"]\nfaturamento = sum(p["valor"] for p in entregues)\npor_cliente = {}\nfor p in entregues:\n    nome = p["cliente"]\n    por_cliente[nome] = por_cliente.get(nome, 0) + p["valor"]\n\nprint("Entregues:", len(entregues))\nprint("Faturamento:", faturamento)\nprint("Por cliente:", por_cliente)\n',
          checks: [
            { label: 'entregues tem os 3 pedidos entregues', test: 'len(entregues) == 3' },
            { label: 'O faturamento é 155', test: 'faturamento == 155' },
            {
              label: 'por_cliente tem Ana com 75 e Carla com 80',
              test: "por_cliente == {'Ana': 75.0, 'Carla': 80.0}",
            },
          ],
        },
      ],
    },
    {
      id: 'arquivos',
      title: 'Ler e escrever arquivos: texto, CSV e JSON',
      blocks: [
        {
          type: 'text',
          text: 'Variáveis somem quando o programa termina. Para guardar dados ou receber dados de outra pessoa, você usa **arquivos**. Abrir um arquivo é como pegar um caderno na estante: você abre, lê ou escreve, e precisa devolver (fechar) quando acaba. O `with` faz essa devolução por você, mesmo se der erro no meio.',
        },
        {
          type: 'anatomy',
          caption: 'Escrever e depois ler um arquivo de texto',
          language: 'python',
          parts: [
            {
              text: 'with',
              label: 'with',
              note: 'Abre um bloco que garante que o arquivo será fechado no fim, aconteça o que acontecer. Sempre prefira esta forma.',
            },
            { text: ' ' },
            {
              text: 'open("notas.txt", "w", encoding="utf-8")',
              label: 'open()',
              note: 'O nome do arquivo, o **modo** e a codificação. `"w"` escreve (apaga o que havia), `"a"` acrescenta no fim e `"r"` lê (o padrão). `utf-8` garante acentos e ç corretos.',
            },
            { text: ' as ' },
            {
              text: 'arquivo',
              label: 'Variável do arquivo',
              note: 'O nome que você usa dentro do bloco para mexer no arquivo aberto.',
            },
            { text: ':\n    arquivo.write("Ana;9\\n")\n    arquivo.write("Bruno;7\\n")\n\n' },
            {
              text: 'with open("notas.txt", encoding="utf-8") as arquivo:\n    for linha in arquivo:\n        print(linha.strip())',
              label: 'Ler linha a linha',
              note: 'Um `for` sobre o arquivo entrega uma linha por volta, já com o `\\n` (quebra de linha) no fim. `.strip()` tira espaços e quebras das pontas.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Um **CSV** é uma planilha em texto puro: uma linha por registro, valores separados por vírgula, e a primeira linha com os nomes das colunas. O módulo `csv` do Python lê esse formato, e `csv.DictReader` entrega cada linha como um dicionário, com as colunas como chaves.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Tudo que vem de arquivo é texto',
          text: 'Mesmo que a coluna tenha números, o `csv` entrega `"10"` e `"0.75"` como `str`. Se você fizer conta sem converter, vai ver textos colados ou um `TypeError`. Converta com `int()` e `float()` antes.',
        },
        {
          type: 'python',
          title: 'A nota da padaria em CSV',
          task: 'O programa escreve um CSV e depois lê de volta (aqui no navegador o arquivo existe só enquanto o programa roda). Dentro do laço, some `quantidade * preco` de cada linha em `total`, convertendo os textos para números.',
          code: 'import csv\n\nconteudo = "produto,quantidade,preco\\nPão francês,10,0.75\\nCafé,2,18.90\\nLeite,3,5.49\\n"\nwith open("compras.csv", "w", encoding="utf-8") as arquivo:\n    arquivo.write(conteudo)\n\ntotal = 0\nwith open("compras.csv", encoding="utf-8") as arquivo:\n    leitor = csv.DictReader(arquivo)\n    for linha in leitor:\n        print(linha)\n        # some quantidade * preco em total\n\nprint(f"Total: R$ {total:.2f}")\n',
          solution:
            'import csv\n\nconteudo = "produto,quantidade,preco\\nPão francês,10,0.75\\nCafé,2,18.90\\nLeite,3,5.49\\n"\nwith open("compras.csv", "w", encoding="utf-8") as arquivo:\n    arquivo.write(conteudo)\n\ntotal = 0\nwith open("compras.csv", encoding="utf-8") as arquivo:\n    leitor = csv.DictReader(arquivo)\n    for linha in leitor:\n        print(linha)\n        total = total + int(linha["quantidade"]) * float(linha["preco"])\n\nprint(f"Total: R$ {total:.2f}")\n',
          checks: [
            { label: 'total vale 61.77', test: 'round(total, 2) == 61.77' },
            { label: 'Mostra Total: R$ 61.77', test: "'Total: R$ 61.77' in __saida__" },
          ],
        },
        {
          type: 'text',
          text: 'O **JSON** é o formato das APIs: parece um dicionário do Python escrito como texto. O módulo `json` traduz nos dois sentidos: `json.loads(texto)` transforma texto em dicionário, e `json.dumps(dicionario)` faz o caminho contrário. Para arquivos, existem `json.load(arquivo)` e `json.dump(dados, arquivo)`.',
        },
        {
          type: 'python',
          title: 'Faltou algum campo na resposta?',
          task: 'Uma API devolveu este texto JSON. Converta para dicionário com `json.loads`, monte a lista `faltando` com os campos obrigatórios que não vieram e mostre `Faltando: telefone`. É o que um teste automatizado de API faz.',
          code: 'import json\n\nresposta = \'{"id": 7, "nome": "Ana", "email": "ana@exemplo.com", "ativo": true}\'\nobrigatorios = ["id", "nome", "email", "telefone"]\n\ndados = resposta  # cuidado: isto ainda é texto\nfaltando = []\n\nprint("Faltando:", ", ".join(faltando))\n',
          solution:
            'import json\n\nresposta = \'{"id": 7, "nome": "Ana", "email": "ana@exemplo.com", "ativo": true}\'\nobrigatorios = ["id", "nome", "email", "telefone"]\n\ndados = json.loads(resposta)\nfaltando = [campo for campo in obrigatorios if campo not in dados]\n\nprint("Faltando:", ", ".join(faltando))\n',
          checks: [
            { label: 'dados virou um dicionário com o nome Ana', test: "dados['nome'] == 'Ana'" },
            { label: 'faltando tem só o telefone', test: "faltando == ['telefone']" },
            { label: 'Mostra Faltando: telefone', test: "'Faltando: telefone' in __saida__" },
          ],
        },
        {
          type: 'quiz',
          question:
            'Você abriu um arquivo com `open("log.txt", "w")` para registrar um evento novo, e o histórico antigo sumiu. O que aconteceu?',
          options: [
            {
              text: 'O modo `"w"` apaga o conteúdo antes de escrever; para acrescentar, o certo é `"a"`',
              correct: true,
              feedback:
                'Isso. `"w"` começa um arquivo do zero. `"a"` (de append) mantém o que existe e escreve no fim, que é o que se quer num log.',
            },
            {
              text: 'Faltou fechar o arquivo com `close()`',
              feedback:
                'Não fechar pode deixar dados sem gravar, mas não apaga o que já existia. Quem apagou foi o modo `"w"`.',
            },
            {
              text: 'Faltou `encoding="utf-8"`',
              feedback:
                'A codificação afeta acentos, não se o conteúdo antigo é mantido. O problema é o modo de abertura.',
            },
          ],
        },
      ],
    },
    {
      id: 'erros-e-modulos',
      title: 'Quando dá errado: exceções e módulos',
      blocks: [
        {
          type: 'text',
          text: 'Dados reais vêm sujos: uma idade escrita “vinte”, um campo vazio, um arquivo que alguém esqueceu de enviar. Quando o Python encontra algo impossível, ele lança uma **exceção** e, se ninguém tratar, o programa para. Com `try`/`except` você diz: “tente isto; se der este erro, faça aquilo”.',
        },
        {
          type: 'code',
          language: 'python',
          caption: 'Tratando um arquivo que não existe',
          code: 'try:\n    with open("relatorio_ontem.csv", encoding="utf-8") as arquivo:\n        print(arquivo.read())\nexcept FileNotFoundError:\n    print("Arquivo de ontem não encontrado. Pulando esta etapa.")',
          output: 'Arquivo de ontem não encontrado. Pulando esta etapa.',
        },
        {
          type: 'classify',
          prompt: 'Qual exceção cada linha provoca?',
          buckets: ['ValueError', 'KeyError', 'FileNotFoundError', 'IndexError'],
          items: [
            { text: '`int("vinte")`', bucket: 0 },
            { text: '`float("")`', bucket: 0 },
            { text: '`{"nome": "Ana"}["email"]`', bucket: 1 },
            { text: '`open("nao_existe.txt")`', bucket: 2 },
            { text: '`[10, 20, 30][3]`', bucket: 3 },
          ],
          explanation:
            '`ValueError`: o tipo está certo (é texto), mas o valor não serve para conversão. `KeyError`: chave que não existe. `FileNotFoundError`: arquivo que não existe. `IndexError`: posição além do fim da lista.',
        },
        {
          type: 'python',
          title: 'Validar linhas e separar as rejeitadas',
          task: 'Rode primeiro e veja o programa quebrar em `"Bruno,vinte"`. Depois, envolva a conversão com `try`/`except ValueError`: linhas boas vão para `validos`, linhas ruins vão inteiras para `rejeitados`. No fim, mostre `2 válidos, 2 rejeitados`.',
          code: 'linhas = ["Ana,32", "Bruno,vinte", "Carla,", "Davi,45"]\nvalidos = []\nrejeitados = []\n\nfor linha in linhas:\n    nome, idade_texto = linha.split(",")\n    idade = int(idade_texto)\n    validos.append({"nome": nome, "idade": idade})\n\nprint(f"{len(validos)} válidos, {len(rejeitados)} rejeitados")\n',
          solution:
            'linhas = ["Ana,32", "Bruno,vinte", "Carla,", "Davi,45"]\nvalidos = []\nrejeitados = []\n\nfor linha in linhas:\n    nome, idade_texto = linha.split(",")\n    try:\n        idade = int(idade_texto)\n        validos.append({"nome": nome, "idade": idade})\n    except ValueError:\n        rejeitados.append(linha)\n\nprint(f"{len(validos)} válidos, {len(rejeitados)} rejeitados")\n',
          checks: [
            { label: 'Ana e Davi ficam em validos', test: 'len(validos) == 2' },
            {
              label: 'As linhas de Bruno e Carla vão para rejeitados',
              test: "rejeitados == ['Bruno,vinte', 'Carla,']",
            },
            {
              label: 'Mostra 2 válidos, 2 rejeitados',
              test: "'2 válidos, 2 rejeitados' in __saida__",
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Não engula todos os erros',
          text: 'Um `except:` sozinho, sem dizer qual erro, esconde também os seus bugs, como um nome de variável digitado errado. Capture só o erro que você espera (`ValueError`, `FileNotFoundError`) e registre o que foi rejeitado, para alguém poder investigar depois.',
        },
        {
          type: 'text',
          text: 'Por fim, ninguém escreve tudo do zero. Um **módulo** é um arquivo `.py` com funções prontas, e `import` traz essas funções para o seu programa. O Python já vem com dezenas deles (a **biblioteca padrão**): `csv`, `json`, `math`, `datetime`, `os`. Seus próprios arquivos também viram módulos.',
        },
        {
          type: 'codeTabs',
          caption: 'Separando o código em dois arquivos',
          tabs: [
            {
              label: 'precos.py',
              language: 'python',
              code: 'def aplicar_desconto(valor, percentual):\n    return valor * (1 - percentual / 100)',
            },
            {
              label: 'main.py',
              language: 'python',
              code: 'import math\nfrom datetime import date\nfrom precos import aplicar_desconto\n\nprint(date.today())\nprint(math.ceil(4.2))  # arredonda para cima: 5\nprint(aplicar_desconto(200, 10))  # 180.0',
            },
          ],
        },
        {
          type: 'fill',
          prompt: 'Complete o leitor de JSON que não quebra se o arquivo faltar.',
          language: 'python',
          template:
            '[[import]] json\n\n[[try]]:\n    with open("config.json", encoding="utf-8") as arquivo:\n        config = json.[[load]](arquivo)\n[[except]] FileNotFoundError:\n    config = {"porta": 8000}',
          explanation:
            '`import` traz o módulo, `try` marca o trecho arriscado, `json.load` lê de um arquivo (o `loads`, com s, lê de um texto) e `except` define o plano B: uma configuração padrão.',
        },
      ],
    },
  ],
  recap: [
    'Listas guardam vários valores em ordem, com posições começando em 0; dicionários guardam pares de chave e valor para achar dados pelo nome.',
    'Uma lista de dicionários é a forma mais comum de representar registros, e list comprehensions filtram e transformam numa linha.',
    'Arquivos são abertos com `with open(...)`, que fecha sozinho; os módulos `csv` e `json` leem e escrevem esses formatos, e tudo que vem de arquivo chega como texto.',
    '`try`/`except` trata exceções esperadas como `ValueError` e `FileNotFoundError` sem derrubar o programa.',
    '`import` reaproveita módulos da biblioteca padrão e os seus próprios arquivos.',
  ],
  cards: [
    {
      id: 'indice-zero',
      front: 'Em `lista = ["a", "b", "c"]`, como pegar o primeiro e o último item?',
      back: '`lista[0]` para o primeiro e `lista[-1]` para o último.',
    },
    {
      id: 'dict-get',
      front: 'Como ler uma chave de dicionário sem quebrar se ela não existir?',
      back: '`dados.get("chave", padrao)`: devolve o padrão em vez de lançar `KeyError`.',
    },
    {
      id: 'list-comprehension',
      front: 'Como criar a lista dos preços acima de 10 com list comprehension?',
      back: '`[p for p in precos if p > 10]`',
    },
    {
      id: 'with-open',
      front: 'Por que usar `with open(...)` para abrir arquivos?',
      back: 'Porque o arquivo é fechado automaticamente no fim do bloco, mesmo se acontecer um erro.',
    },
    {
      id: 'modos-arquivo',
      front: 'Qual a diferença entre os modos `"w"` e `"a"` do `open`?',
      back: '`"w"` apaga o conteúdo e escreve do zero; `"a"` acrescenta no fim.',
    },
    {
      id: 'csv-texto',
      front: 'Que tipo têm os valores lidos com `csv.DictReader`?',
      back: 'Todos são `str`. Converta com `int()` ou `float()` antes de fazer contas.',
    },
    {
      id: 'json-loads-load',
      front: 'Qual a diferença entre `json.loads` e `json.load`?',
      back: '`loads` lê de um texto (string); `load` lê de um arquivo aberto.',
    },
    {
      id: 'value-error',
      front: 'Que exceção `int("vinte")` lança e como tratar?',
      back: '`ValueError`. Envolva em `try:` ... `except ValueError:` e decida o que fazer com o dado ruim.',
    },
  ],
  mission: {
    title: 'Um leitor de CSV com relatório de rejeições',
    text: 'No seu computador, escreva um script que lê um CSV real e separa o que está certo do que está errado. Serve para todas as trilhas: despesas (backend), lista de servidores para checar (DevOps), dados de vendas (dados) ou massa de testes (QA).',
    steps: [
      'Crie à mão um arquivo `dados.csv` com cabeçalho e pelo menos oito linhas, incluindo duas com valores inválidos (texto no lugar de número, campo vazio)',
      'Leia o arquivo com `csv.DictReader` dentro de `with open(...)`, convertendo os números com `try`/`except ValueError`',
      'Separe as linhas em `validos` e `rejeitados` e calcule um total ou uma média com os válidos',
      'Grave os rejeitados em `rejeitados.json` com `json.dump`, incluindo o motivo de cada rejeição',
      'Trate o caso de o arquivo não existir com `FileNotFoundError` e uma mensagem clara',
      'Coloque as funções num arquivo separado e importe no programa principal',
    ],
  },
  sources: [
    {
      title: 'Python: estruturas de dados (listas e dicionários)',
      url: 'https://docs.python.org/pt-br/3/tutorial/datastructures.html',
    },
    {
      title: 'Python: entrada e saída (arquivos e JSON)',
      url: 'https://docs.python.org/pt-br/3/tutorial/inputoutput.html',
    },
    {
      title: 'Python: erros e exceções',
      url: 'https://docs.python.org/pt-br/3/tutorial/errors.html',
    },
    {
      title: 'Módulo csv',
      url: 'https://docs.python.org/pt-br/3/library/csv.html',
    },
  ],
};
