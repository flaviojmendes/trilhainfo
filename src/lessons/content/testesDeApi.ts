import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Por trás de cada tela de aplicativo existe uma API respondendo pedidos: o saldo do banco, o status da entrega, a lista de consultas do SUS. Quando ela erra, toda tela que depende dela erra junto, e às vezes do jeito mais perigoso: mostrando o pedido de uma pessoa para outra. Testar a API direto, sem tela, é rápido, estável e pega esses defeitos antes de qualquer clique. É uma das habilidades mais pedidas em vagas de QA.',
  sections: [
    {
      id: 'o-que-conferir',
      title: 'O que conferir numa resposta',
      blocks: [
        {
          type: 'analogy',
          title: 'Conferir a entrega do iFood',
          text: 'Quando a entrega chega, você confere várias coisas sem perceber. Chegou mesmo ou veio um aviso de cancelamento? É o seu pedido, completo, com o refrigerante certo? A etiqueta tem o seu nome e o lacre está intacto? E se o restaurante não tinha o prato, avisaram direito? Testar uma API é fazer essas perguntas de propósito, sempre do mesmo jeito.',
        },
        {
          type: 'text',
          text: 'Na aula sobre API REST e contratos você viu que uma **resposta HTTP** tem três partes: o **status** (um número que resume o resultado), os **cabeçalhos** (informações sobre a resposta) e o **corpo** (os dados, quase sempre em JSON). Um **teste de API** é um programa que faz um pedido e confere as três, sem abrir nenhuma tela.',
        },
        {
          type: 'anatomy',
          caption: 'Uma resposta de `GET /pedidos/1`, do jeito que ela chega.',
          language: 'http',
          parts: [
            {
              text: 'HTTP/1.1 200 OK',
              label: 'Status',
              note: 'A primeira coisa a conferir. `200` significa sucesso. Mas um status certo com corpo errado continua sendo bug, por isso ele é só o começo.',
            },
            { text: '\n' },
            {
              text: 'Content-Type: application/json',
              label: 'Cabeçalho de tipo',
              note: 'Diz em que formato o corpo veio. Se uma mudança fizer a API responder `text/html` (uma página de erro do servidor, por exemplo), o aplicativo que espera JSON quebra.',
            },
            { text: '\n' },
            {
              text: 'X-Request-Id: 7f3a9c',
              label: 'Identificador do pedido',
              note: 'Muitas APIs mandam um código único por requisição. Guarde ele no relato de bug: com esse número, quem cuida do servidor acha o registro exato nos logs.',
            },
            { text: '\n\n{"id": 1, "cliente": "Ana", ' },
            {
              text: '"total": 59.9',
              label: 'Campo e tipo',
              note: 'Confira se o campo existe e se tem o tipo combinado: `59.9` é número. Se virar o texto `"59,90"`, a conta do carrinho no aplicativo deixa de funcionar.',
            },
            { text: ', ' },
            {
              text: '"pago": true',
              label: 'Valor',
              note: 'Além do formato, confira o valor que a regra de negócio promete. Um pedido recém-pago deveria vir com `true`.',
            },
            { text: '}' },
          ],
        },
        {
          type: 'table',
          caption: 'As cinco perguntas de um teste de API',
          head: ['O que conferir', 'Pergunta', 'Exemplo de defeito'],
          rows: [
            ['Status', 'O resultado é o esperado?', 'Pedido inexistente devolve `200`'],
            [
              'Corpo e esquema',
              'Os campos obrigatórios estão lá, com o tipo certo?',
              '`total` sumiu ou virou texto',
            ],
            ['Cabeçalhos', 'O formato e as regras de cache estão certos?', 'Corpo em HTML'],
            [
              'Casos de erro',
              'Entrada inválida recebe uma resposta clara?',
              'CEP com letras derruba o servidor com `500`',
            ],
            [
              'Login e permissão',
              'Só quem pode vê e muda os dados?',
              'Uma pessoa lê o pedido de outra',
            ],
          ],
        },
        {
          type: 'quiz',
          question:
            'Ao finalizar uma compra, a API responde `200 OK` com o corpo `{"erro": "Estoque insuficiente"}`. O teste confere só o status. O que está acontecendo?',
          options: [
            {
              text: 'O teste passa mesmo com a compra falhando, e a API deveria responder com um status de erro, como `409` ou `422`',
              correct: true,
              feedback:
                'Isso. São dois problemas: a API mente no status, e o teste confia só nele. Quem consome a API (o aplicativo, outro serviço) também olha o status primeiro, então vai achar que deu certo.',
            },
            {
              text: 'Nenhum: se o status é `200`, a operação deu certo',
              feedback:
                'Era para ser assim, mas o corpo diz outra coisa. Status e corpo precisam contar a mesma história; um teste que olha só o status deixa essa contradição passar.',
            },
            {
              text: 'O problema é só do aplicativo, que deveria ler a mensagem de erro',
              feedback:
                'O aplicativo pode até ler, mas cada cliente da API teria que adivinhar que um `200` às vezes é erro. O contrato combinado é usar status `4xx` para erro de quem pediu.',
            },
            {
              text: 'Basta o teste conferir que o corpo não está vazio',
              feedback:
                'O corpo não está vazio: ele traz um erro. Conferir “tem alguma coisa” é fraco demais; confira os campos e valores que importam.',
            },
          ],
        },
      ],
    },
    {
      id: 'api-pelo-terminal',
      title: 'Conversando com a API sem tela',
      blocks: [
        {
          type: 'text',
          text: 'Antes de automatizar, você explora. O jeito mais direto é o `curl`, um programa de terminal que faz requisições HTTP. Com a opção `-i`, ele mostra o status e os cabeçalhos além do corpo. Com `-H`, você manda um cabeçalho, como o token de login.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Postman e Insomnia',
          text: 'São programas com janelas para montar requisições sem decorar comandos. Você salva pedidos em **coleções** e guarda valores que mudam (endereço da API, token) em **ambientes**. São ótimos para explorar e mostrar um bug para alguém. O teste que protege o projeto, porém, mora no código: versionado no Git e rodando na CI.',
        },
        {
          type: 'terminal',
          title: 'Explore a API da loja com curl',
          task: 'A API está rodando no seu computador, na porta 3000. Leia cada resposta antes de seguir: o status da primeira linha diz muito.',
          intro: 'API da loja rodando em http://localhost:3000',
          steps: [
            {
              goal: 'Peça o pedido 1 sem estar logado e veja status e cabeçalhos: `curl -i http://localhost:3000/pedidos/1`',
              command: [
                'curl -i http://localhost:3000/pedidos/1',
                'curl -i localhost:3000/pedidos/1',
              ],
              output: `HTTP/1.1 401 Unauthorized
Content-Type: application/json; charset=utf-8
Content-Length: 22

{"erro":"Faça login"}`,
              hint: 'Escreva `curl -i` seguido do endereço completo.',
            },
            {
              goal: 'Repita o pedido mandando o token da Ana no cabeçalho `Authorization` com o valor `Bearer token-ana`.',
              command: [
                'curl -i -H "Authorization: Bearer token-ana" http://localhost:3000/pedidos/1',
                'curl -i http://localhost:3000/pedidos/1 -H "Authorization: Bearer token-ana"',
                "curl -i -H 'Authorization: Bearer token-ana' http://localhost:3000/pedidos/1",
                "curl -i http://localhost:3000/pedidos/1 -H 'Authorization: Bearer token-ana'",
              ],
              output: `HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
X-Request-Id: 7f3a9c
Content-Length: 49

{"id":1,"cliente":"Ana","total":59.9,"pago":true}`,
              hint: 'Use `curl -i -H "Authorization: Bearer token-ana" http://localhost:3000/pedidos/1`.',
            },
            {
              goal: 'Ainda com o token da Ana, peça um pedido que não existe: o `999`.',
              command: [
                'curl -i -H "Authorization: Bearer token-ana" http://localhost:3000/pedidos/999',
                'curl -i http://localhost:3000/pedidos/999 -H "Authorization: Bearer token-ana"',
                "curl -i -H 'Authorization: Bearer token-ana' http://localhost:3000/pedidos/999",
                "curl -i http://localhost:3000/pedidos/999 -H 'Authorization: Bearer token-ana'",
              ],
              output: `HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8
Content-Length: 33

{"erro":"Pedido não encontrado"}`,
              hint: 'É o mesmo comando do passo anterior, trocando `1` por `999` no final do endereço.',
            },
            {
              goal: 'Agora tente ver o pedido 1, que é da Ana, usando o token do Bruno: `Bearer token-bruno`.',
              command: [
                'curl -i -H "Authorization: Bearer token-bruno" http://localhost:3000/pedidos/1',
                'curl -i http://localhost:3000/pedidos/1 -H "Authorization: Bearer token-bruno"',
                "curl -i -H 'Authorization: Bearer token-bruno' http://localhost:3000/pedidos/1",
                "curl -i http://localhost:3000/pedidos/1 -H 'Authorization: Bearer token-bruno'",
              ],
              output: `HTTP/1.1 403 Forbidden
Content-Type: application/json; charset=utf-8
Content-Length: 34

{"erro":"Este pedido não é seu"}`,
              hint: 'Troque `token-ana` por `token-bruno` e volte o pedido para `1`.',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'No terceiro passo, o pedido `999` voltou `404 Not Found`. Você deveria abrir um relato de bug?',
          options: [
            {
              text: 'Não. Esse é o comportamento esperado, e vale um teste para garantir que continue assim',
              correct: true,
              feedback:
                'Isso. Status de erro não é sinônimo de bug. Bug é a API fazer algo diferente do combinado, como devolver `200` ou `500` para um pedido que não existe.',
            },
            {
              text: 'Sim. Qualquer status que não seja `200` é um defeito',
              feedback:
                'Respostas de erro fazem parte do contrato. Uma API que nunca devolve `404` seria esquisita: ela teria que inventar um pedido.',
            },
            {
              text: 'Só se a mensagem de erro estiver em inglês',
              feedback:
                'O idioma da mensagem pode até ser combinado no contrato, mas não é isso que decide se há bug. O que importa é o status e o corpo baterem com o combinado.',
            },
          ],
        },
      ],
    },
    {
      id: 'assercoes-em-codigo',
      title: 'Do olho para o código',
      blocks: [
        {
          type: 'text',
          text: 'Conferir no terminal funciona uma vez. Para conferir a cada mudança, você escreve as verificações em código. Cada verificação é uma **asserção**: uma afirmação que precisa ser verdadeira, senão o teste para e falha. Em Python, ela se escreve `assert condição`.',
        },
        {
          type: 'codeTabs',
          caption: 'O mesmo teste de API em duas ferramentas comuns',
          tabs: [
            {
              label: 'Playwright (TypeScript)',
              language: 'ts',
              code: `import { test, expect } from '@playwright/test';

test('devolve o pedido da pessoa logada', async ({ request }) => {
  const resposta = await request.get('/pedidos/1', {
    headers: { Authorization: 'Bearer ' + process.env.TOKEN_ANA },
  });

  expect(resposta.status()).toBe(200);
  expect(resposta.headers()['content-type']).toContain('application/json');

  const pedido = await resposta.json();
  expect(pedido).toMatchObject({ id: 1, cliente: 'Ana' });
  expect(typeof pedido.total).toBe('number');
});`,
            },
            {
              label: 'pytest (Python)',
              language: 'python',
              code: `import os
import requests

BASE = 'http://localhost:3000'

def test_devolve_o_pedido_da_pessoa_logada():
    resposta = requests.get(
        BASE + '/pedidos/1',
        headers={'Authorization': 'Bearer ' + os.environ['TOKEN_ANA']},
    )

    assert resposta.status_code == 200
    assert resposta.headers['Content-Type'].startswith('application/json')

    pedido = resposta.json()
    assert pedido['id'] == 1
    assert isinstance(pedido['total'], (int, float))`,
            },
          ],
        },
        {
          type: 'text',
          text: 'Conferir o **esquema** é conferir a forma da resposta: quais campos são obrigatórios e de que tipo cada um é. Ele pega a maioria das quebras causadas por mudanças apressadas, como um campo renomeado ou um número que virou texto.',
        },
        {
          type: 'python',
          title: 'Escreva um teste que pegue APIs quebradas',
          task: 'A API falsa devolve dicionários parecidos com respostas HTTP. Complete `testar(api)` com `assert` até ele **passar** com a API correta e **falhar** com cada uma das quatro versões com defeito. Confira também o pedido `999`, que deve voltar `404`. Rode e leia o placar no final.',
          code: `# Uma API falsa: devolve um dicionário no formato de uma resposta HTTP
def api_correta(pedido_id):
    if pedido_id == 1:
        return {
            'status': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': {'id': 1, 'cliente': 'Ana', 'total': 59.9, 'pago': True},
        }
    return {
        'status': 404,
        'headers': {'Content-Type': 'application/json'},
        'body': {'erro': 'Pedido não encontrado'},
    }

# Versões com defeito, como as que aparecem depois de uma mudança apressada
def api_sem_total(pedido_id):
    resposta = api_correta(pedido_id)
    resposta['body'].pop('total', None)
    return resposta

def api_total_texto(pedido_id):
    resposta = api_correta(pedido_id)
    if 'total' in resposta['body']:
        resposta['body']['total'] = '59,90'
    return resposta

def api_html(pedido_id):
    resposta = api_correta(pedido_id)
    resposta['headers']['Content-Type'] = 'text/html'
    return resposta

def api_erro_disfarcado(pedido_id):
    resposta = api_correta(pedido_id)
    resposta['status'] = 200
    return resposta

# Seu teste: recebe uma API e confere a resposta com assert
def testar(api):
    resposta = api(1)
    assert resposta['status'] == 200
    # Escreva aqui as outras verificações

# Placar (não precisa mexer)
def pega_defeito(api):
    try:
        testar(api)
    except Exception:
        return True
    return False

print('API correta passa:', not pega_defeito(api_correta))
for defeito in [api_sem_total, api_total_texto, api_html, api_erro_disfarcado]:
    print(defeito.__name__, '->', 'pegou' if pega_defeito(defeito) else 'deixou passar')`,
          solution: `def api_correta(pedido_id):
    if pedido_id == 1:
        return {
            'status': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': {'id': 1, 'cliente': 'Ana', 'total': 59.9, 'pago': True},
        }
    return {
        'status': 404,
        'headers': {'Content-Type': 'application/json'},
        'body': {'erro': 'Pedido não encontrado'},
    }

def api_sem_total(pedido_id):
    resposta = api_correta(pedido_id)
    resposta['body'].pop('total', None)
    return resposta

def api_total_texto(pedido_id):
    resposta = api_correta(pedido_id)
    if 'total' in resposta['body']:
        resposta['body']['total'] = '59,90'
    return resposta

def api_html(pedido_id):
    resposta = api_correta(pedido_id)
    resposta['headers']['Content-Type'] = 'text/html'
    return resposta

def api_erro_disfarcado(pedido_id):
    resposta = api_correta(pedido_id)
    resposta['status'] = 200
    return resposta

def testar(api):
    resposta = api(1)
    assert resposta['status'] == 200
    assert resposta['headers']['Content-Type'].startswith('application/json')
    corpo = resposta['body']
    assert corpo['id'] == 1
    assert 'total' in corpo
    assert isinstance(corpo['total'], (int, float))
    assert corpo['total'] > 0

    inexistente = api(999)
    assert inexistente['status'] == 404
    assert 'erro' in inexistente['body']

def pega_defeito(api):
    try:
        testar(api)
    except Exception:
        return True
    return False

print('API correta passa:', not pega_defeito(api_correta))
for defeito in [api_sem_total, api_total_texto, api_html, api_erro_disfarcado]:
    print(defeito.__name__, '->', 'pegou' if pega_defeito(defeito) else 'deixou passar')`,
          checks: [
            { label: 'O teste passa com a API correta', test: 'not pega_defeito(api_correta)' },
            {
              label: 'Pega a resposta sem o campo `total`',
              test: 'pega_defeito(api_sem_total)',
            },
            {
              label: 'Pega o `total` que virou texto',
              test: 'pega_defeito(api_total_texto)',
            },
            {
              label: 'Pega o cabeçalho `Content-Type` errado',
              test: 'pega_defeito(api_html)',
            },
            {
              label: 'Pega o pedido inexistente respondido com `200`',
              test: 'pega_defeito(api_erro_disfarcado)',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Um teste se prova falhando',
          text: 'As versões com defeito do exercício são uma técnica de verdade: estragar o sistema de propósito e ver se o teste reclama. Se nada fica vermelho, o teste está passando por educação, não porque confere algo.',
        },
      ],
    },
    {
      id: 'erros-e-acesso',
      title: 'Erros, login e permissão',
      blocks: [
        {
          type: 'text',
          text: '**Caminho feliz** é o uso em que tudo dá certo: dados válidos, pessoa logada, pedido existente. Ele é o primeiro a ser testado e o que menos esconde bugs. Os defeitos mais caros moram nos outros caminhos: dado inválido, sessão expirada, pessoa tentando ver o que não é dela.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Autenticação',
              text: 'Descobrir **quem** está pedindo. É o crachá na portaria do prédio. Na API, costuma ser um token no cabeçalho `Authorization`. Sem ele, ou com ele vencido, a resposta é `401`.',
            },
            {
              term: 'Autorização',
              text: 'Decidir **o que** essa pessoa pode fazer. O crachá abre o seu andar, não o do vizinho. Logada mas sem permissão, a resposta é `403`.',
            },
            {
              term: 'Validação',
              text: 'Conferir se os dados enviados fazem sentido: CEP com 8 dígitos, quantidade positiva. Dado inválido deve receber `400` ou `422` com uma mensagem clara, nunca um `500`.',
            },
          ],
        },
        {
          type: 'classify',
          prompt: 'Qual status a API deveria devolver em cada situação?',
          buckets: ['401 sem login', '403 sem permissão', '404 não existe', '422 dado inválido'],
          items: [
            { text: 'Pedir a lista de pedidos sem mandar token', bucket: 0 },
            { text: 'Usar um token que venceu ontem', bucket: 0 },
            { text: 'Bruno, logado, pede o pedido da Ana', bucket: 1 },
            { text: 'Pessoa cliente tenta acessar a rota de administração', bucket: 1 },
            { text: 'Pedir o produto `99999`, que nunca foi cadastrado', bucket: 2 },
            { text: 'Cadastrar endereço com CEP `abc12`', bucket: 3 },
            { text: 'Fazer um pedido com quantidade `-2`', bucket: 3 },
          ],
          explanation:
            'A pergunta-chave para separar `401` de `403`: a API sabe quem é você? Se não sabe, `401`. Se sabe e mesmo assim não deixa, `403`. Algumas equipes usam `400` em vez de `422` para dado inválido; o importante é ser um `4xx` com mensagem útil.',
        },
        {
          type: 'python',
          title: 'Teste quem pode ver o pedido',
          task: 'Complete `testar_acesso(api)`: sem token a resposta deve ser `401`; com o token do Bruno, o pedido da Ana deve voltar `403` **e sem nenhum dado do pedido** no corpo. O teste precisa passar com a API correta e pegar as três versões com defeito.',
          code: `CONTAS = {'token-ana': 'Ana', 'token-bruno': 'Bruno'}
PEDIDOS = {1: {'id': 1, 'cliente': 'Ana', 'total': 59.9}}

def api_correta(pedido_id, token=None):
    pessoa = CONTAS.get(token)
    if pessoa is None:
        return {'status': 401, 'body': {'erro': 'Faça login'}}
    pedido = PEDIDOS.get(pedido_id)
    if pedido is None:
        return {'status': 404, 'body': {'erro': 'Pedido não encontrado'}}
    if pedido['cliente'] != pessoa:
        return {'status': 403, 'body': {'erro': 'Este pedido não é seu'}}
    return {'status': 200, 'body': dict(pedido)}

# Defeito 1: esqueceram de exigir login
def api_sem_login(pedido_id, token=None):
    return {'status': 200, 'body': dict(PEDIDOS[pedido_id])}

# Defeito 2: exige login, mas não confere de quem é o pedido
def api_vaza_pedido(pedido_id, token=None):
    if CONTAS.get(token) is None:
        return {'status': 401, 'body': {'erro': 'Faça login'}}
    return {'status': 200, 'body': dict(PEDIDOS[pedido_id])}

# Defeito 3: responde 403, mas manda os dados junto
def api_403_com_dados(pedido_id, token=None):
    resposta = api_correta(pedido_id, token)
    if resposta['status'] == 403:
        resposta['body'] = dict(PEDIDOS[pedido_id], erro='Este pedido não é seu')
    return resposta

def testar_acesso(api):
    da_ana = api(1, 'token-ana')
    assert da_ana['status'] == 200
    # 1. Sem token, a API deve responder 401
    # 2. Com o token do Bruno: 403 e nenhum dado do pedido no corpo

# Placar (não precisa mexer)
def pega_defeito(api):
    try:
        testar_acesso(api)
    except Exception:
        return True
    return False

print('API correta passa:', not pega_defeito(api_correta))
for defeito in [api_sem_login, api_vaza_pedido, api_403_com_dados]:
    print(defeito.__name__, '->', 'pegou' if pega_defeito(defeito) else 'deixou passar')`,
          solution: `CONTAS = {'token-ana': 'Ana', 'token-bruno': 'Bruno'}
PEDIDOS = {1: {'id': 1, 'cliente': 'Ana', 'total': 59.9}}

def api_correta(pedido_id, token=None):
    pessoa = CONTAS.get(token)
    if pessoa is None:
        return {'status': 401, 'body': {'erro': 'Faça login'}}
    pedido = PEDIDOS.get(pedido_id)
    if pedido is None:
        return {'status': 404, 'body': {'erro': 'Pedido não encontrado'}}
    if pedido['cliente'] != pessoa:
        return {'status': 403, 'body': {'erro': 'Este pedido não é seu'}}
    return {'status': 200, 'body': dict(pedido)}

def api_sem_login(pedido_id, token=None):
    return {'status': 200, 'body': dict(PEDIDOS[pedido_id])}

def api_vaza_pedido(pedido_id, token=None):
    if CONTAS.get(token) is None:
        return {'status': 401, 'body': {'erro': 'Faça login'}}
    return {'status': 200, 'body': dict(PEDIDOS[pedido_id])}

def api_403_com_dados(pedido_id, token=None):
    resposta = api_correta(pedido_id, token)
    if resposta['status'] == 403:
        resposta['body'] = dict(PEDIDOS[pedido_id], erro='Este pedido não é seu')
    return resposta

def testar_acesso(api):
    da_ana = api(1, 'token-ana')
    assert da_ana['status'] == 200

    sem_login = api(1)
    assert sem_login['status'] == 401

    do_bruno = api(1, 'token-bruno')
    assert do_bruno['status'] == 403
    assert 'total' not in do_bruno['body']
    assert 'cliente' not in do_bruno['body']

def pega_defeito(api):
    try:
        testar_acesso(api)
    except Exception:
        return True
    return False

print('API correta passa:', not pega_defeito(api_correta))
for defeito in [api_sem_login, api_vaza_pedido, api_403_com_dados]:
    print(defeito.__name__, '->', 'pegou' if pega_defeito(defeito) else 'deixou passar')`,
          checks: [
            {
              label: 'O teste passa com a API correta',
              test: 'not pega_defeito(api_correta)',
            },
            { label: 'Pega a API que não exige login', test: 'pega_defeito(api_sem_login)' },
            {
              label: 'Pega a API que mostra o pedido da Ana para o Bruno',
              test: 'pega_defeito(api_vaza_pedido)',
            },
            {
              label: 'Pega o `403` que vaza os dados no corpo',
              test: 'pega_defeito(api_403_com_dados)',
            },
          ],
        },
        {
          type: 'reveal',
          question:
            'Algumas APIs respondem `404` (não existe) quando alguém pede o pedido de outra pessoa, em vez de `403`. Por quê?',
          answer:
            'Para não confirmar que o recurso existe. Com `403`, quem está tentando adivinhar números de pedido descobre quais são reais. O importante para o teste é saber qual das duas a equipe escolheu, porque essa decisão faz parte do contrato, e conferir que nenhum dado vazou.',
        },
      ],
    },
    {
      id: 'contrato',
      title: 'O contrato entre quem pede e quem responde',
      blocks: [
        {
          type: 'analogy',
          title: 'A tomada de três pinos',
          text: 'Qualquer aparelho vendido no Brasil encaixa na tomada da sua casa porque existe um padrão combinado. Se uma fábrica resolvesse mudar o formato por conta própria, todos os aparelhos parariam de funcionar de uma vez, mesmo que a nova tomada fosse “melhor”. Uma API também tem um padrão combinado com quem a usa: o **contrato**.',
        },
        {
          type: 'text',
          text: 'O contrato descreve as rotas, o que cada uma recebe, os campos e tipos da resposta e os status possíveis. Um formato muito usado para escrevê-lo é o **OpenAPI**, um arquivo YAML ou JSON que também gera documentação navegável.',
        },
        {
          type: 'anatomy',
          caption: 'Um trecho do contrato da rota de pedidos em OpenAPI.',
          language: 'yaml',
          parts: [
            {
              text: '/pedidos/{id}:',
              label: 'Rota',
              note: 'O caminho, com `{id}` no lugar do número do pedido.',
            },
            { text: '\n  ' },
            {
              text: 'get:',
              label: 'Método',
              note: 'O que se pode fazer nessa rota: aqui, consultar.',
            },
            { text: '\n    responses:\n      ' },
            {
              text: "'200':",
              label: 'Status prometido',
              note: 'Cada status possível é listado com o formato da resposta. Um status que não está aqui é uma quebra de contrato.',
            },
            {
              text: '\n        content:\n          application/json:\n            schema:\n              type: object\n              ',
            },
            {
              text: 'required: [id, cliente, total]',
              label: 'Campos obrigatórios',
              note: 'Se algum desses faltar, quem consome a API pode quebrar. É exatamente o que o seu teste do exercício conferia.',
            },
            {
              text: '\n              properties:\n                id: { type: integer }\n                ',
            },
            {
              text: 'total: { type: number }',
              label: 'Tipo',
              note: '`number` aceita `59.9`, não aceita `"59,90"`. O tipo é parte da promessa.',
            },
            { text: '\n      ' },
            {
              text: "'404':\n        description: Pedido não encontrado",
              label: 'Erro previsto',
              note: 'Erros também são combinados. Testar que eles acontecem do jeito descrito é tão importante quanto testar o sucesso.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Um **teste de contrato** confere se a API real cumpre o combinado. Há dois jeitos comuns. No mais simples, os testes validam cada resposta contra o esquema do OpenAPI. No outro, chamado de contrato guiado pelo consumidor, o aplicativo registra quais campos usa, e a API roda essas expectativas na própria CI antes de publicar (a ferramenta Pact é a mais conhecida).',
        },
        {
          type: 'quiz',
          question:
            'A equipe da API renomeou `total` para `valor_total`, atualizou os próprios testes e publicou. Tudo verde. No dia seguinte, o carrinho do aplicativo mostra `R$ NaN`. Qual teste teria evitado isso?',
          options: [
            {
              text: 'Um teste de contrato, que conferiria a resposta contra os campos que o aplicativo usa',
              correct: true,
              feedback:
                'Isso. Os testes da API foram atualizados junto com a mudança, então confirmaram o novo formato. Só uma verificação que representa quem consome a API acusaria que o combinado foi quebrado.',
            },
            {
              text: 'Mais testes de unidade na API',
              feedback:
                'Eles seriam atualizados junto com a mudança, como os outros foram. O problema não é a API estar errada consigo mesma, é ela ter mudado o combinado com o aplicativo.',
            },
            {
              text: 'Nenhum: renomear campo é normal e o aplicativo deveria se adaptar sozinho',
              feedback:
                'Mudanças acontecem, mas são combinadas: a API pode manter os dois campos por um tempo ou lançar uma nova versão. Mudar sem aviso quebra quem depende dela.',
            },
          ],
        },
      ],
    },
    {
      id: 'dados-e-isolamento',
      title: 'Dados de teste que não atrapalham ninguém',
      blocks: [
        {
          type: 'analogy',
          title: 'A geladeira do escritório',
          text: 'Se todo mundo usa o mesmo pote sem nome na geladeira, um dia alguém come o seu almoço. Testes que mexem nos mesmos dados fazem isso uns com os outros: um apaga o pedido que o outro ia conferir, e a falha aparece num teste que não tem culpa.',
        },
        {
          type: 'text',
          text: 'Um teste **isolado** não depende de outro teste nem do que sobrou de uma execução anterior. A receita: cada teste cria os dados de que precisa, com nomes únicos, usa o identificador que a API devolveu e apaga o que criou no final, mesmo se falhar. E tudo isso num **ambiente de teste**, nunca no sistema que as pessoas usam de verdade.',
        },
        {
          type: 'code',
          language: 'ts',
          caption: 'Criar, usar e limpar: o `finally` roda mesmo quando a verificação falha.',
          code: `test('cancela um pedido', async ({ request }) => {
  const criado = await request.post('/pedidos', {
    data: { cliente: 'teste-' + Date.now(), itens: [{ produto: 'Caneca', quantidade: 1 }] },
  });
  const { id } = await criado.json();

  try {
    const resposta = await request.post('/pedidos/' + id + '/cancelar');
    expect(resposta.status()).toBe(200);
  } finally {
    await request.delete('/pedidos/' + id);
  }
});`,
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem o ciclo de um teste de API isolado.',
          items: [
            'Criar os dados próprios do teste, com um nome único',
            'Guardar o identificador que a API devolveu',
            'Fazer a requisição que está sendo testada',
            'Conferir status, corpo e cabeçalhos',
            'Apagar o que foi criado, mesmo se a verificação falhou',
          ],
          explanation:
            'Usar o identificador devolvido, em vez de um número fixo como `42`, evita depender de dados que alguém pode ter apagado. E limpar no final impede que a próxima execução comece com lixo.',
        },
        {
          type: 'classify',
          prompt: 'Quais práticas deixam a suíte confiável e quais criam problemas?',
          buckets: ['Deixa confiável', 'Cria problemas'],
          items: [
            { text: 'Cada teste cria a própria pessoa usuária', bucket: 0 },
            { text: 'Ler o token de uma variável de ambiente', bucket: 0 },
            { text: 'Rodar contra um banco de laboratório que pode ser recriado', bucket: 0 },
            { text: 'Usar o identificador que a API devolveu ao criar', bucket: 0 },
            { text: 'O teste B usa o pedido que o teste A criou', bucket: 1 },
            { text: 'Escrever o token direto no código e enviar ao GitHub', bucket: 1 },
            { text: 'Testar o cadastro no sistema de produção', bucket: 1 },
          ],
          explanation:
            'Dependência entre testes faz um falhar por culpa do outro e impede rodar em paralelo. Token no repositório vira vazamento: qualquer pessoa com acesso ao código passa a ter acesso à API. Guarde segredos em variáveis de ambiente e nos segredos da CI.',
        },
        {
          type: 'text',
          text: 'Uma última promessa de contrato que vale testar é a **idempotência**: repetir o mesmo pedido não muda o resultado além da primeira vez. Apagar o pedido 7 duas vezes deixa o sistema igual a apagar uma vez. Em pagamentos, isso é questão de dinheiro.',
        },
        {
          type: 'quiz',
          question:
            'A internet falha no meio de um Pix e o aplicativo reenvia o mesmo pagamento automaticamente. Que teste de API protege a pessoa de pagar duas vezes?',
          options: [
            {
              text: 'Enviar duas vezes o mesmo pagamento, com a mesma chave de idempotência, e conferir que só uma cobrança existe',
              correct: true,
              feedback:
                'Isso. Muitas APIs de pagamento aceitam uma chave única por operação: se o mesmo pedido chegar de novo com ela, a API devolve o resultado da primeira vez em vez de cobrar outra.',
            },
            {
              text: 'Enviar um pagamento e conferir que voltou `201`',
              feedback:
                'Esse é o caminho feliz. Ele não diz nada sobre o que acontece quando o mesmo pedido chega duas vezes, que é exatamente o risco aqui.',
            },
            {
              text: 'Conferir que a API responde em menos de um segundo',
              feedback:
                'Uma API rápida diminui as chances de reenvio, mas não impede. Redes falham; o comportamento na repetição precisa ser testado diretamente.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns',
          text: 'Conferir só o status e nunca o corpo. Testar só o caminho feliz. Usar um número de pedido fixo que alguém apaga. Deixar dados de teste acumulando no banco. E o mais grave: colocar tokens e senhas no código versionado.',
        },
      ],
    },
  ],
  recap: [
    'Um teste de API faz um pedido e confere status, corpo (campos e tipos) e cabeçalhos, sem abrir tela.',
    'Os bugs mais caros ficam fora do caminho feliz: teste dado inválido, falta de login (`401`) e falta de permissão (`403`), conferindo que nenhum dado vaza.',
    '`curl`, Postman e Insomnia servem para explorar; a proteção de verdade é o teste em código, que roda a cada mudança.',
    'O contrato, muitas vezes escrito em OpenAPI, é o combinado com quem usa a API; testes de contrato acusam quando ele é quebrado.',
    'Testes isolados criam os próprios dados, limpam no final e leem segredos de variáveis de ambiente.',
  ],
  cards: [
    {
      id: 'tres-partes-resposta',
      front: 'Quais são as três partes de uma resposta HTTP que um teste de API confere?',
      back: 'Status (o resultado), cabeçalhos (como o tipo `Content-Type`) e corpo (os dados, com campos e tipos).',
    },
    {
      id: '401-ou-403',
      front: 'Qual a diferença entre `401` e `403`?',
      back: '`401`: a API não sabe quem você é (sem login ou token vencido). `403`: sabe quem é, mas você não tem permissão.',
    },
    {
      id: 'esquema',
      front: 'O que é conferir o esquema de uma resposta?',
      back: 'Conferir a forma dos dados: quais campos são obrigatórios e de que tipo cada um é.',
    },
    {
      id: 'teste-de-contrato',
      front: 'O que um teste de contrato pega que os testes internos da API não pegam?',
      back: 'Uma mudança que quebra o combinado com quem usa a API, como renomear um campo que o aplicativo lê.',
    },
    {
      id: 'teste-isolado',
      front: 'O que torna um teste de API isolado?',
      back: 'Ele cria os próprios dados com nomes únicos, usa os identificadores devolvidos e apaga o que criou, sem depender de outros testes.',
    },
    {
      id: 'idempotencia',
      front: 'O que é idempotência numa API?',
      back: 'Repetir o mesmo pedido não muda o resultado além da primeira vez. Essencial em pagamentos, para não cobrar duas vezes.',
    },
    {
      id: 'segredos-em-teste',
      front: 'Onde guardar o token usado pelos testes de API?',
      back: 'Em variáveis de ambiente e nos segredos da CI, nunca escrito no código versionado.',
    },
  ],
  mission: {
    title: 'Automatize três respostas de uma API',
    text: 'Escolha uma API de laboratório que você possa rodar no seu computador, como a de um projeto seu ou um exemplo de curso, e escreva testes automatizados para o sucesso, o erro e o acesso negado.',
    steps: [
      'Explore as rotas com `curl -i` ou Postman e anote os status e campos de cada resposta',
      'Automatize um caso de sucesso conferindo status, `Content-Type` e os tipos dos campos obrigatórios',
      'Automatize uma entrada inválida e confira que a resposta é `4xx` com mensagem clara',
      'Automatize um acesso negado: sem token e com o token de outra pessoa, sem vazar dados',
      'Faça os testes criarem os próprios dados e apagarem tudo no final, com o token lido de variável de ambiente',
    ],
  },
  sources: [
    { title: 'Playwright: testes de API', url: 'https://playwright.dev/docs/api-testing' },
    {
      title: 'MDN: códigos de status de respostas HTTP',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status',
    },
    { title: 'Introdução ao OpenAPI', url: 'https://learn.openapis.org/' },
    { title: 'Manual do curl', url: 'https://curl.se/docs/manpage.html' },
  ],
};
