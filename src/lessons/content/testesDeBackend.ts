import { LessonContent } from '../types';

const dividirInicial = `def dividir_conta(total_centavos, pessoas):
    """Divide uma conta em partes que somam exatamente o total."""
    base, resto = divmod(total_centavos, pessoas)
    return [base + 1 if i < resto else base for i in range(pessoas)]


def dividir_conta_com_bug(total_centavos, pessoas):
    return [total_centavos // pessoas] * pessoas


def testar(dividir):
    # Organizar
    total = 10000  # R$ 100,00 em centavos
    # Agir
    partes = dividir(total, 4)
    # Verificar
    assert partes == [2500, 2500, 2500, 2500]
    # Escreva aqui o caso de 3 pessoas


# ---- Não altere daqui para baixo: roda o seu teste nas duas versões ----
def passa(funcao):
    try:
        testar(funcao)
        return True
    except AssertionError:
        return False


passa_na_versao_certa = passa(dividir_conta)
pega_o_bug = not passa(dividir_conta_com_bug)
print('A versão certa passa no teste:', passa_na_versao_certa)
print('O teste pega a versão com bug:', pega_o_bug)`;

const dividirSolucao = dividirInicial.replace(
  '    # Escreva aqui o caso de 3 pessoas',
  `    partes = dividir(total, 3)
    assert sum(partes) == total
    assert max(partes) - min(partes) <= 1`,
);

const dublesInicial = `# Código de produção (não altere)
LIMITE_ALERTA = 500


def registrar_despesa(dados, repositorio, avisar):
    despesa = {'descricao': dados['descricao'], 'valor': dados['valor']}
    novo_id = repositorio.salvar(despesa)
    if dados['valor'] > LIMITE_ALERTA:
        avisar(f"Despesa alta: {dados['descricao']} de R$ {dados['valor']}")
    return {'id': novo_id, **despesa}


# Dublês para o teste: complete os dois
class RepositorioFalso:
    def __init__(self):
        self.itens = []

    def salvar(self, despesa):
        pass


avisos = []


def avisar_falso(mensagem):
    pass


# O teste (não altere)
repo = RepositorioFalso()
primeira = registrar_despesa({'descricao': 'Feira', 'valor': 52.3}, repo, avisar_falso)
segunda = registrar_despesa({'descricao': 'Notebook', 'valor': 3200}, repo, avisar_falso)
print('Salvas:', repo.itens)
print('Avisos:', avisos)
print('Ids:', primeira['id'], segunda['id'])`;

const dublesSolucao = dublesInicial
  .replace(
    `    def salvar(self, despesa):
        pass`,
    `    def salvar(self, despesa):
        self.itens.append(despesa)
        return len(self.itens)`,
  )
  .replace(
    `def avisar_falso(mensagem):
    pass`,
    `def avisar_falso(mensagem):
    avisos.append(mensagem)`,
  );

export const content: LessonContent = {
  hook: 'Imagine mudar uma linha no cálculo de reembolso numa sexta-feira e, na segunda, descobrir que metade das pessoas recebeu valor em dobro. No backend, um erro não quebra só uma tela: ele grava dados errados, cobra a mais e se espalha para todo sistema que usa a API. Testes automatizados são a rede de segurança que deixa você mudar o código sem medo, e saber escrevê-los é uma das primeiras coisas que se espera de quem entra num time.',
  sections: [
    {
      id: 'por-que-testar',
      title: 'Uma rede de segurança para as regras',
      blocks: [
        {
          type: 'analogy',
          title: 'Conferir o troco',
          text: 'Quem trabalha no caixa da padaria confere o troco antes de entregar, toda vez, mesmo sabendo fazer conta. Não é falta de confiança: é que conferir custa um segundo, e errar custa o dinheiro de alguém. Um teste automatizado é essa conferência, feita pelo computador, a cada mudança no código.',
        },
        {
          type: 'text',
          text: 'Um **teste** é um pedaço de código que chama o seu código com uma entrada conhecida e compara o resultado com o esperado. Se bater, passa; se não bater, falha e mostra a diferença. Você escreve uma vez e ele roda milhares de vezes, sem cansar.',
        },
        {
          type: 'text',
          text: 'O valor maior aparece depois. Quando alguém muda o código e quebra algo que funcionava, acontece uma **regressão**. A suíte de testes avisa em segundos, antes de o problema chegar a quem usa.',
        },
        {
          type: 'quiz',
          question: 'Qual é o principal ganho de ter testes automatizados no backend?',
          options: [
            {
              text: 'Provar que o sistema não tem nenhum bug',
              feedback:
                'Testes mostram que os casos testados funcionam, não que todos funcionam. Sempre há casos que ninguém pensou. Mesmo assim, eles reduzem muito o risco.',
            },
            {
              text: 'Avisar rapidamente quando uma mudança quebra algo que funcionava',
              correct: true,
              feedback:
                'Isso. É o que permite mudar código com confiança: você altera, roda a suíte e sabe em segundos se estragou alguma regra.',
            },
            {
              text: 'Dispensar a revisão de código por outras pessoas',
              feedback:
                'Revisão e testes pegam problemas diferentes. Testes conferem comportamento; a revisão olha clareza, design e casos que faltam nos próprios testes.',
            },
          ],
        },
      ],
    },
    {
      id: 'organizar-agir-verificar',
      title: 'Organizar, agir, verificar',
      blocks: [
        {
          type: 'text',
          text: 'Quase todo teste tem três partes, nesta ordem. **Organizar**: preparar os dados de entrada. **Agir**: chamar a função testada, uma vez. **Verificar**: conferir o resultado. Em inglês, arrange, act, assert.',
        },
        {
          type: 'anatomy',
          caption: 'Um teste com pytest, o framework de testes mais usado em Python',
          language: 'python',
          parts: [
            {
              text: 'def test_transporte_tem_teto_de_200_reais():\n',
              label: 'Nome que conta a regra',
              note: 'O pytest roda toda função que começa com `test_`. Um bom nome descreve a regra: quando falhar, você já sabe o que quebrou sem abrir o arquivo.',
            },
            {
              text: '    valor, categoria, dias = 350, "transporte", 3\n',
              label: 'Organizar',
              note: 'Os dados do cenário. Valores concretos e pequenos, escolhidos para exercitar a regra: 350 está acima do teto de 200.',
            },
            { text: '\n' },
            {
              text: '    reembolso = calcular_reembolso(valor, categoria, dias)\n',
              label: 'Agir',
              note: 'Uma única chamada ao que está sendo testado.',
            },
            { text: '\n' },
            {
              text: '    assert reembolso == 200',
              label: 'Verificar',
              note: '`assert` é uma palavra do próprio Python: se a condição for falsa, ele lança um erro e o teste falha. O pytest mostra os dois valores lado a lado.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Os melhores casos de teste ficam nas **bordas**: zero, um, o limite exato, valores que não dividem certinho. É onde moram os bugs. Um teste que só usa números redondos passa até em código errado, como você vai ver agora.',
        },
        {
          type: 'python',
          title: 'Escreva um teste que pegue o bug',
          task: 'Existem duas versões de `dividir_conta`, que racha uma conta entre pessoas (valores em centavos). Uma está certa; a outra perde centavos. O teste atual usa 4 pessoas e R$ 100,00, que divide certinho, então as duas passam. Acrescente em `testar` o caso de **3 pessoas**: verifique que a soma das partes é igual ao total e que nenhuma parte difere da outra em mais de 1 centavo.',
          code: dividirInicial,
          solution: dividirSolucao,
          checks: [
            {
              label: 'O teste passa na versão certa',
              test: 'passa_na_versao_certa',
            },
            {
              label: 'O teste falha na versão com bug',
              test: 'pega_o_bug',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Veja o teste falhar ao menos uma vez',
          text: 'Um teste que nunca falhou pode estar testando nada, por exemplo um `assert` que sempre é verdadeiro. Ao escrever um teste novo, quebre a regra de propósito e confira que ele fica vermelho. Foi o que o exercício fez com a versão com bug.',
        },
      ],
    },
    {
      id: 'tipos-de-teste',
      title: 'Unidade, integração e contrato',
      blocks: [
        {
          type: 'text',
          text: 'Nem todo teste olha o mesmo tamanho de pedaço. Um backend saudável combina vários tipos, em quantidades diferentes, desenhando uma pirâmide.',
        },
        {
          type: 'pyramid',
          caption: 'A pirâmide de testes de um backend',
          levels: [
            {
              title: 'Ponta a ponta',
              text: 'Poucos. Uma jornada completa, do navegador ao banco. Mostram que tudo se encaixa, mas são lentos e difíceis de depurar.',
            },
            {
              title: 'Integração e contrato',
              text: 'Alguns. Rotas HTTP com banco de teste real, migrações, e se as respostas seguem o contrato documentado.',
            },
            {
              title: 'Unidade',
              text: 'Muitos. Funções de regra de negócio isoladas, sem rede nem banco. Rodam aos milhares em segundos.',
            },
          ],
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Teste de unidade',
              text: 'Testa uma função ou classe sozinha, como `calcular_reembolso`. Não acessa banco, rede nem arquivos.',
            },
            {
              term: 'Teste de integração',
              text: 'Testa peças reais trabalhando juntas: a rota recebendo HTTP, o repositório gravando num banco de teste.',
            },
            {
              term: 'Teste de contrato',
              text: 'Confere se as respostas seguem o formato combinado, como o OpenAPI: campos, tipos e status. Protege quem consome a API.',
            },
          ],
        },
        {
          type: 'codeTabs',
          caption: 'Os mesmos tipos de teste, num projeto com FastAPI e pytest',
          tabs: [
            {
              label: 'Unidade',
              language: 'python',
              code: 'def test_mercado_nao_tem_reembolso():\n    assert calcular_reembolso(80, "mercado", dias_desde_a_compra=2) == 0',
            },
            {
              label: 'Integração com banco',
              language: 'python',
              code: '@pytest.fixture\ndef repo():\n    conexao = conectar(os.environ["DATABASE_URL_TESTE"])\n    conexao.execute("BEGIN")\n    yield RepositorioDespesas(conexao)\n    conexao.execute("ROLLBACK")  # cada teste começa com o banco limpo\n\n\ndef test_lista_so_despesas_da_pessoa(repo):\n    repo.salvar(usuario_id=1, descricao="Feira", valor=52.3)\n    repo.salvar(usuario_id=2, descricao="Aluguel", valor=1500)\n\n    despesas = repo.listar_do_usuario(1)\n\n    assert [d.descricao for d in despesas] == ["Feira"]',
            },
            {
              label: 'Rota HTTP',
              language: 'python',
              code: 'def test_post_com_valor_negativo_devolve_400(cliente):\n    resposta = cliente.post("/despesas", json={"descricao": "Feira", "valor": -5})\n\n    assert resposta.status_code == 400\n    assert resposta.json()["detalhes"][0]["campo"] == "valor"',
            },
          ],
        },
        {
          type: 'text',
          text: 'Repare na fixture `repo`: ela abre uma transação antes do teste e desfaz no fim, como você viu na aula de banco. Assim os testes têm **dados isolados**: um não depende do que o outro gravou, e podem rodar em qualquer ordem. Em JavaScript, o mesmo papel é feito por Vitest ou Jest com Supertest; em Java, por JUnit com Spring Boot Test.',
        },
        {
          type: 'classify',
          prompt: 'Que tipo de teste é cada um?',
          buckets: ['Unidade', 'Integração', 'Contrato', 'Ponta a ponta'],
          items: [
            { text: '`calcular_reembolso(350, "transporte", 3)` devolve 200', bucket: 0 },
            { text: '`dividir_conta` nunca perde centavos', bucket: 0 },
            { text: 'O repositório grava e lê despesas num PostgreSQL de teste', bucket: 1 },
            { text: 'A migração mais recente aplica e desfaz num banco vazio', bucket: 1 },
            {
              text: 'Toda resposta de `GET /despesas/{id}` tem os campos e tipos do OpenAPI',
              bucket: 2,
            },
            {
              text: 'A versão nova da API continua aceita pelo app que já está publicado',
              bucket: 2,
            },
            {
              text: 'Uma pessoa entra pelo navegador, cadastra uma despesa e a vê na lista',
              bucket: 3,
            },
          ],
          explanation:
            'A pergunta que separa os tipos é: quantas peças reais estão envolvidas? Uma função sozinha é unidade; peças reais juntas é integração; o formato combinado entre dois sistemas é contrato; o produto inteiro é ponta a ponta.',
        },
      ],
    },
    {
      id: 'dubles',
      title: 'Dublês: quando o teste não pode chamar o mundo real',
      blocks: [
        {
          type: 'analogy',
          title: 'O dublê de cinema',
          text: 'Na cena do carro capotando, quem aparece é um dublê, não o ator principal. O filme continua igual para quem assiste, e ninguém se machuca. Nos testes, um **dublê** ocupa o lugar de uma peça que seria lenta, cara ou perigosa de usar de verdade: mandar e-mail, cobrar um cartão, chamar a API de outra empresa.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Stub',
              text: 'Devolve uma resposta pronta. Por exemplo, uma função de cotação do dólar que sempre responde `5.40`.',
            },
            {
              term: 'Fake',
              text: 'Uma versão simples que funciona de verdade, como um repositório que guarda as despesas numa lista em memória em vez do banco.',
            },
            {
              term: 'Mock ou espião',
              text: 'Anota como foi chamado, para o teste conferir depois: "o aviso foi enviado uma vez, com esta mensagem?".',
            },
          ],
        },
        {
          type: 'text',
          text: 'Para trocar uma peça por um dublê, o código precisa **receber** a peça em vez de criá-la por dentro. Veja a função abaixo: ela recebe o repositório e a função de aviso como parâmetros. Em produção, você passa os reais; no teste, os dublês.',
        },
        {
          type: 'python',
          title: 'Construa um fake e um espião',
          task: 'Complete os dublês. `RepositorioFalso.salvar` deve guardar a despesa em `self.itens` e devolver o id, que é a posição dela começando em 1. `avisar_falso` deve, em vez de mandar um e-mail, anotar a mensagem na lista `avisos`. O teste no fim do código já usa os dois.',
          code: dublesInicial,
          solution: dublesSolucao,
          checks: [
            {
              label: 'O repositório falso guardou as duas despesas',
              test: 'len(repo.itens) == 2',
            },
            {
              label: 'Os ids devolvidos são 1 e 2',
              test: "primeira['id'] == 1 and segunda['id'] == 2",
            },
            {
              label: 'Só a despesa acima do limite gerou aviso',
              test: "len(avisos) == 1 and 'Notebook' in avisos[0]",
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Um time trocou o banco por dublês em **todos** os testes, inclusive nos de rota. A suíte passa, mas uma consulta com erro de SQL chegou à produção. Por quê?',
          options: [
            {
              text: 'Porque dublês nunca deveriam ser usados em testes',
              feedback:
                'Dublês são ótimos para isolar regras e trocar serviços externos. O problema é usá-los no lugar de tudo.',
            },
            {
              text: 'Porque nenhum teste executou o SQL de verdade contra um banco',
              correct: true,
              feedback:
                'Isso. O fake responde o que você mandou, sem nunca rodar a consulta. Por isso a pirâmide tem testes de integração com um banco de teste real: eles pegam exatamente esse tipo de erro.',
            },
            {
              text: 'Porque a suíte deveria ter rodado mais vezes',
              feedback:
                'Rodar de novo daria o mesmo resultado: o SQL continuaria sem ser executado. Falta um tipo de teste, não repetição.',
            },
          ],
        },
      ],
    },
    {
      id: 'design-simples',
      title: 'Design simples: a regra longe do HTTP',
      blocks: [
        {
          type: 'text',
          text: 'Código difícil de testar costuma ser código que faz coisas demais no mesmo lugar. Quando a rota lê a requisição, consulta o banco, calcula a regra e monta a resposta numa função só, testar a regra exige subir servidor e banco.',
        },
        {
          type: 'codeTabs',
          caption: 'A mesma rota de reembolso antes e depois de separar as responsabilidades',
          tabs: [
            {
              label: 'Antes: tudo junto',
              language: 'python',
              code: '@app.post("/despesas/{id}/reembolso")\ndef pedir_reembolso(id: int):\n    linha = banco.execute(\n        "SELECT valor, categoria, data FROM despesas WHERE id = %s", (id,)\n    ).fetchone()\n    if linha is None:\n        raise HTTPException(status_code=404)\n    valor, categoria, data = linha\n    if (date.today() - data).days > 30 or categoria == "mercado":\n        reembolso = 0\n    elif categoria == "transporte":\n        reembolso = min(valor, 200)\n    else:\n        reembolso = valor * 0.5\n    banco.execute("INSERT INTO reembolsos VALUES (%s, %s)", (id, reembolso))\n    return {"reembolso": reembolso}',
            },
            {
              label: 'Depois: regras.py',
              language: 'python',
              code: 'def calcular_reembolso(valor, categoria, dias_desde_a_compra):\n    if dias_desde_a_compra > 30 or categoria == "mercado":\n        return 0\n    if categoria == "transporte":\n        return min(valor, 200)\n    return valor * 0.5',
            },
            {
              label: 'Depois: rotas.py',
              language: 'python',
              code: '@app.post("/despesas/{id}/reembolso")\ndef pedir_reembolso(id: int):\n    despesa = repositorio.buscar(id)\n    if despesa is None:\n        raise HTTPException(status_code=404)\n    dias = (date.today() - despesa.data).days\n    reembolso = calcular_reembolso(despesa.valor, despesa.categoria, dias)\n    repositorio.registrar_reembolso(id, reembolso)\n    return {"reembolso": reembolso}',
            },
          ],
        },
        {
          type: 'text',
          text: 'Depois da separação, `calcular_reembolso` é uma **função pura**: recebe valores, devolve um valor, não mexe em banco nem em data do relógio. Ela é testada com uma linha. A rota ficou fina, só costurando as peças, e o repositório concentra o SQL.',
        },
        {
          type: 'quiz',
          question:
            'A regra nova diz que compras com mais de 30 dias não têm reembolso. Onde vale mais a pena testar os casos de 29, 30 e 31 dias?',
          options: [
            {
              text: 'Em testes de unidade de `calcular_reembolso`',
              correct: true,
              feedback:
                'Isso. A regra mora numa função pura, então cada caso de borda é uma linha de teste que roda em milissegundos. Um teste de rota pode confirmar só que a rota usa a regra.',
            },
            {
              text: 'Num teste de ponta a ponta no navegador',
              feedback:
                'Funcionaria, mas cada caso levaria segundos, dependeria de tela e banco, e controlar a data da compra seria trabalhoso. É o tipo de teste para poucos fluxos completos.',
            },
            {
              text: 'Testando direto no banco de produção',
              feedback:
                'Produção tem dados reais de pessoas reais. Testes usam dados isolados, em ambientes próprios.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Módulos antes de microsserviços',
          text: 'Separar `regras`, `repositorio` e `rotas` dentro de um único projeto já dá quase todos os benefícios de organização. Esse estilo se chama **monólito modular**. Dividir em vários serviços separados traz rede, deploys e falhas parciais para lidar; deixe para quando uma medição mostrar a necessidade.',
        },
      ],
    },
    {
      id: 'rodar-a-suite',
      title: 'Rodando a suíte com pytest',
      blocks: [
        {
          type: 'text',
          text: 'No dia a dia, você roda os testes pelo terminal várias vezes por hora, e a CI roda de novo a cada envio. Saber ler a saída é metade do trabalho: ela diz qual teste falhou, em que linha e com quais valores.',
        },
        {
          type: 'terminal',
          title: 'Encontrando e corrigindo uma falha',
          task: 'O projeto da API de despesas tem testes em `tests/`. Rode a suíte, leia a falha, rode só o teste que falhou e confirme a correção.',
          prompt: '~/api-despesas$',
          steps: [
            {
              goal: 'Rode todos os testes do projeto.',
              command: ['pytest', 'python -m pytest'],
              output:
                '========================= test session starts =========================\ncollected 14 items\n\ntests/test_regras.py ......F.                                    [ 57%]\ntests/test_rotas.py ......                                       [100%]\n\n============================== FAILURES ===============================\n___________________ test_divide_sem_perder_centavo ____________________\n\n    def test_divide_sem_perder_centavo():\n        partes = dividir_conta(10000, 3)\n>       assert sum(partes) == 10000\nE       assert 9999 == 10000\nE        +  where 9999 = sum([3333, 3333, 3333])\n\ntests/test_regras.py:31: AssertionError\n======================= short test summary info =======================\nFAILED tests/test_regras.py::test_divide_sem_perder_centavo - assert 9999 == 10000\n==================== 1 failed, 13 passed in 0.42s =====================',
              hint: 'Basta digitar `pytest` na pasta do projeto.',
            },
            {
              goal: 'Rode só os testes cujo nome contém `centavo`, usando a opção `-k`.',
              command: [
                'pytest -k centavo',
                'pytest -k "centavo"',
                "pytest -k 'centavo'",
                'pytest tests/test_regras.py::test_divide_sem_perder_centavo',
                'pytest -k sem_perder_centavo',
              ],
              output:
                '========================= test session starts =========================\ncollected 14 items / 13 deselected / 1 selected\n\ntests/test_regras.py F                                           [100%]\n\n============================== FAILURES ===============================\nE       assert 9999 == 10000\n\ntests/test_regras.py:31: AssertionError\n=================== 1 failed, 13 deselected in 0.08s ==================',
              hint: '`pytest -k centavo` filtra os testes pelo nome.',
            },
            {
              goal: 'A função `dividir_conta` foi corrigida em `app/regras.py` para distribuir o resto. Rode de novo o mesmo teste.',
              command: [
                'pytest -k centavo',
                'pytest -k "centavo"',
                "pytest -k 'centavo'",
                'pytest tests/test_regras.py::test_divide_sem_perder_centavo',
                'pytest -k sem_perder_centavo',
              ],
              output:
                '========================= test session starts =========================\ncollected 14 items / 13 deselected / 1 selected\n\ntests/test_regras.py .                                           [100%]\n\n=================== 1 passed, 13 deselected in 0.07s ==================',
              hint: 'O mesmo comando do passo anterior.',
            },
            {
              goal: 'Rode a suíte inteira de novo, agora com `-v` para ver o nome de cada teste.',
              command: ['pytest -v', 'python -m pytest -v', 'pytest --verbose'],
              output:
                '========================= test session starts =========================\ncollected 14 items\n\ntests/test_regras.py::test_mercado_nao_tem_reembolso PASSED      [  7%]\ntests/test_regras.py::test_transporte_tem_teto_de_200 PASSED     [ 14%]\ntests/test_regras.py::test_outras_categorias_reembolsam_metade PASSED [ 21%]\ntests/test_regras.py::test_compra_com_30_dias_ainda_reembolsa PASSED [ 28%]\ntests/test_regras.py::test_compra_com_31_dias_nao_reembolsa PASSED [ 35%]\ntests/test_regras.py::test_divide_em_partes_iguais PASSED        [ 42%]\ntests/test_regras.py::test_divide_sem_perder_centavo PASSED      [ 50%]\ntests/test_regras.py::test_divide_para_uma_pessoa PASSED         [ 57%]\ntests/test_rotas.py::test_post_valido_devolve_201 PASSED         [ 64%]\ntests/test_rotas.py::test_post_com_valor_negativo_devolve_400 PASSED [ 71%]\ntests/test_rotas.py::test_get_inexistente_devolve_404 PASSED     [ 78%]\ntests/test_rotas.py::test_sem_login_devolve_401 PASSED           [ 85%]\ntests/test_rotas.py::test_despesa_de_outra_pessoa_devolve_403 PASSED [ 92%]\ntests/test_rotas.py::test_lista_e_paginada PASSED                [100%]\n\n========================= 14 passed in 0.39s ==========================',
              hint: '`pytest -v`',
            },
          ],
        },
        {
          type: 'reveal',
          question:
            'Na lista final aparecem testes de `401` e `403`. De qual aula vieram essas regras, e por que vale tanto tê-las como testes?',
          answer:
            'Da aula de autenticação e autorização. Regras de acesso são fáceis de esquecer numa rota nova e caras quando falham, porque vazam dados. Um teste que tenta ler a despesa de outra pessoa transforma esse esquecimento numa falha vermelha antes do deploy.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns em testes de backend',
          text: 'Testes que dependem da ordem ou de dados deixados por outro teste: isole os dados. Testes que usam a data e a hora reais: passe a data como parâmetro. Testes que conferem detalhes internos em vez do resultado: quebram a cada refatoração. E apertar "rodar de novo" até passar: um teste instável esconde um problema de verdade, no código ou no próprio teste.',
        },
        {
          type: 'order',
          prompt:
            'Você vai mudar uma regra de negócio. Coloque em ordem um fluxo de trabalho seguro.',
          items: [
            'Rodar a suíte e confirmar que tudo passa antes de mexer',
            'Escrever um teste para a regra nova e vê-lo falhar',
            'Alterar o código até o teste novo passar',
            'Rodar a suíte inteira para pegar regressões',
            'Enviar a mudança e deixar a CI rodar os testes de novo',
          ],
          explanation:
            'Começar com a suíte verde garante que qualquer falha depois é sua. Ver o teste novo falhar prova que ele testa algo. Rodar tudo no fim pega o que você quebrou sem querer.',
        },
      ],
    },
  ],
  recap: [
    'Um **teste** chama o código com uma entrada conhecida e compara com o esperado; a suíte avisa rápido sobre **regressões**.',
    'Bons testes seguem **organizar, agir, verificar** e exploram as bordas, onde moram os bugs. Veja cada teste falhar ao menos uma vez.',
    'A **pirâmide** tem muitos testes de unidade, alguns de integração e contrato, e poucos de ponta a ponta, sempre com **dados isolados**.',
    '**Dublês** (stub, fake, mock) substituem peças lentas ou perigosas, mas não substituem testes com um banco de teste real.',
    'Separar a **regra de negócio** do HTTP e do banco deixa o código mais simples de ler e de testar; módulos bem divididos vêm antes de microsserviços.',
  ],
  cards: [
    {
      id: 'regressao',
      front: 'O que é uma regressão?',
      back: 'Quando uma mudança quebra algo que já funcionava. A suíte de testes existe para avisar disso cedo.',
    },
    {
      id: 'aaa',
      front: 'Quais são as três partes de um teste?',
      back: 'Organizar os dados, agir chamando o código testado, e verificar o resultado.',
    },
    {
      id: 'unidade-integracao',
      front: 'Qual a diferença entre teste de unidade e de integração?',
      back: 'Unidade testa uma função sozinha, sem banco nem rede. Integração testa peças reais juntas, como rota e banco de teste.',
    },
    {
      id: 'teste-de-contrato',
      front: 'O que um teste de contrato verifica?',
      back: 'Se as respostas da API seguem o formato combinado, como no OpenAPI: campos, tipos e status.',
    },
    {
      id: 'fake-mock',
      front: 'Qual a diferença entre um fake e um mock?',
      back: 'O fake é uma versão simples que funciona, como um repositório em memória. O mock anota como foi chamado para o teste conferir.',
    },
    {
      id: 'dados-isolados',
      front: 'Como manter os dados isolados em testes com banco?',
      back: 'Cada teste cria os próprios dados e desfaz no fim, por exemplo com uma transação e `ROLLBACK`.',
    },
    {
      id: 'regra-fora-do-http',
      front: 'Por que separar a regra de negócio da rota HTTP?',
      back: 'A regra vira uma função pura, testada em milissegundos, e a rota fica fina, só ligando as peças.',
    },
  ],
  mission: {
    title: 'Monte a rede de segurança da API de despesas',
    text: 'No projeto da sua stack (pytest, Vitest ou Jest com Supertest, JUnit), escreva testes que cubram regras, banco e rotas. Ao final, explique por escrito como os módulos foram divididos e por quê.',
    steps: [
      'Separe pelo menos uma regra de negócio numa função pura e escreva testes de unidade para os casos de borda',
      'Escreva um teste de integração do repositório contra um banco de teste, com dados criados e desfeitos em cada teste',
      'Teste as rotas principais: um sucesso, uma entrada inválida, um recurso inexistente e um acesso negado',
      'Quebre uma regra de propósito e confira que algum teste fica vermelho',
      'Rode a suíte inteira duas vezes, em ordens diferentes, e confirme que o resultado não muda',
    ],
  },
  sources: [
    {
      title: 'pytest: documentação oficial',
      url: 'https://docs.pytest.org/en/stable/',
    },
    {
      title: 'FastAPI: testando aplicações',
      url: 'https://fastapi.tiangolo.com/pt/tutorial/testing/',
    },
    {
      title: 'Martin Fowler: The Practical Test Pyramid',
      url: 'https://martinfowler.com/articles/practical-test-pyramid.html',
    },
  ],
};
