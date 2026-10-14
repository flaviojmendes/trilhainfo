import { LessonContent } from '../types';

const comToken = (resto: string) => [
  `curl -i -H "Authorization: Bearer tok_ana" ${resto}`,
  `curl -i -H 'Authorization: Bearer tok_ana' ${resto}`,
  `curl -H "Authorization: Bearer tok_ana" -i ${resto}`,
  `curl -i ${resto} -H "Authorization: Bearer tok_ana"`,
];

export const content: LessonContent = {
  hook: 'Muitos vazamentos de dados que viram notícia não exigiram nenhum ataque genial: bastava trocar o número no fim da URL para ver o cadastro de outra pessoa. O login funcionava; o que faltava era perguntar "essa pessoa pode ver isso?". Nesta aula você aprende a responder as duas perguntas que todo backend faz em cada requisição, quem é você e o que você pode fazer, e a evitar os erros que mais vazam dados.',
  sections: [
    {
      id: 'portaria-e-cracha',
      title: 'Quem é você e o que pode fazer',
      blocks: [
        {
          type: 'analogy',
          title: 'A portaria e o crachá',
          text: 'Na portaria de uma empresa, você mostra o documento e a pessoa confere que você é você. Isso é a **identificação**. Depois, o crachá que você recebe abre só alguns andares: visitante não entra no financeiro. Isso é a **permissão**. São duas conferências diferentes, e um prédio seguro faz as duas.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Autenticação',
              text: 'Confirmar **quem** está fazendo o pedido: senha, código por SMS, biometria, login com Google. Em inglês, authentication ou authn.',
            },
            {
              term: 'Autorização',
              text: 'Decidir **o que** essa pessoa pode fazer: ler esta despesa, apagar aquela, acessar o painel de administração. Em inglês, authorization ou authz.',
            },
            {
              term: 'Credencial',
              text: 'O que a pessoa apresenta para provar a identidade, como e-mail e senha.',
            },
          ],
        },
        {
          type: 'classify',
          prompt: 'Cada verificação é de autenticação ou de autorização?',
          buckets: ['Autenticação: quem é', 'Autorização: o que pode'],
          items: [
            { text: 'Conferir a senha digitada no login', bucket: 0 },
            { text: 'Validar o código de 6 dígitos enviado por SMS', bucket: 0 },
            { text: 'Ler o cookie de sessão e descobrir de quem é', bucket: 0 },
            { text: 'Checar se a despesa 7 pertence a quem pediu', bucket: 1 },
            { text: 'Esconder o botão "Excluir usuário" de quem não é admin', bucket: 1 },
            { text: 'Impedir que uma pessoa do suporte edite despesas', bucket: 1 },
          ],
          explanation:
            'A autenticação acontece primeiro e responde uma pergunta só. A autorização acontece em cada ação, com uma pergunta diferente a cada vez: esta pessoa, este recurso, esta ação.',
        },
        {
          type: 'text',
          text: 'Cada pergunta tem seu status HTTP. **401 Unauthorized** (o nome engana) significa "não sei quem você é": faltou login ou ele expirou. **403 Forbidden** significa "sei quem você é, e você não pode fazer isso".',
        },
        {
          type: 'quiz',
          question:
            'A Ana está logada e tenta abrir `/admin/usuarios`, que é só para administração. Qual status a API deve devolver?',
          options: [
            {
              text: '`401 Unauthorized`',
              feedback:
                'O 401 é para quando a API não sabe quem está pedindo. Aqui ela sabe: é a Ana, logada. Pedir para ela fazer login de novo não resolveria nada.',
            },
            {
              text: '`403 Forbidden`',
              correct: true,
              feedback:
                'Isso. A identidade foi confirmada, mas a Ana não tem permissão para aquela área. Fazer login de novo não muda a resposta.',
            },
            {
              text: '`400 Bad Request`',
              feedback:
                'O pedido está bem formado: rota existe, formato correto. O problema não está nos dados, e sim em quem pede.',
            },
            {
              text: '`500 Internal Server Error`',
              feedback:
                'Nada quebrou no servidor. Recusar um acesso é o funcionamento correto, não uma falha.',
            },
          ],
        },
      ],
    },
    {
      id: 'senhas',
      title: 'Guardar senhas sem guardá-las',
      blocks: [
        {
          type: 'text',
          text: 'A regra número um: o banco **nunca** guarda a senha como ela foi digitada. Bancos de dados vazam: por backup esquecido, por funcionário curioso, por ataque. Se as senhas estiverem lá em texto, quem pegar o arquivo entra na conta de todo mundo, e em outros sites onde as pessoas repetem a senha.',
        },
        {
          type: 'analogy',
          title: 'O moedor de carne',
          text: 'Um **hash** é como um moedor: a mesma peça de carne sempre vira a mesma carne moída, mas ninguém transforma carne moída de volta na peça. No cadastro, o servidor guarda só o resultado do moedor. No login, mói a senha digitada de novo e compara os dois resultados.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Sal (salt)',
              text: 'Um valor aleatório, diferente para cada pessoa, misturado à senha antes do hash. Duas pessoas com a senha `123456` ficam com registros diferentes, e tabelas prontas de senhas comuns deixam de funcionar.',
            },
            {
              term: 'Hash lento',
              text: 'Algoritmos feitos de propósito para demorar, como Argon2, bcrypt e PBKDF2. Um login leva milissegundos a mais; quem tenta bilhões de senhas num arquivo vazado leva anos a mais.',
            },
          ],
        },
        {
          type: 'python',
          title: 'Pare de guardar a senha em texto',
          task: 'Hoje `cadastrar_senha` guarda a senha como veio. Reescreva usando a função pronta `calcular_hash`: gere um sal com `secrets.token_hex(16)` e devolva o texto `sal$hash`. Depois, em `conferir_senha`, separe o sal do hash com `guardado.split("$")`, recalcule e compare com `hmac.compare_digest`.',
          code: "import hashlib\nimport hmac\nimport secrets\n\n\ndef calcular_hash(senha, sal):\n    # Versão didática de um hash lento. Em projetos reais, use Argon2 ou bcrypt.\n    resultado = (sal + senha).encode()\n    for _ in range(10_000):\n        resultado = hashlib.sha256(resultado).digest()\n    return resultado.hex()\n\n\ndef cadastrar_senha(senha):\n    return senha\n\n\ndef conferir_senha(senha, guardado):\n    return senha == guardado\n\n\nguardado = cadastrar_senha('pao-de-queijo-42')\nprint('No banco:', guardado)\nprint('Senha certa:', conferir_senha('pao-de-queijo-42', guardado))\nprint('Senha errada:', conferir_senha('123456', guardado))",
          solution:
            "import hashlib\nimport hmac\nimport secrets\n\n\ndef calcular_hash(senha, sal):\n    # Versão didática de um hash lento. Em projetos reais, use Argon2 ou bcrypt.\n    resultado = (sal + senha).encode()\n    for _ in range(10_000):\n        resultado = hashlib.sha256(resultado).digest()\n    return resultado.hex()\n\n\ndef cadastrar_senha(senha):\n    sal = secrets.token_hex(16)\n    return sal + '$' + calcular_hash(senha, sal)\n\n\ndef conferir_senha(senha, guardado):\n    sal, esperado = guardado.split('$')\n    return hmac.compare_digest(calcular_hash(senha, sal), esperado)\n\n\nguardado = cadastrar_senha('pao-de-queijo-42')\nprint('No banco:', guardado)\nprint('Senha certa:', conferir_senha('pao-de-queijo-42', guardado))\nprint('Senha errada:', conferir_senha('123456', guardado))",
          checks: [
            {
              label: 'A senha certa continua entrando',
              test: "conferir_senha('pao-de-queijo-42', cadastrar_senha('pao-de-queijo-42'))",
            },
            {
              label: 'Uma senha errada é recusada',
              test: "not conferir_senha('pao-de-queijo-43', cadastrar_senha('pao-de-queijo-42'))",
            },
            {
              label: 'O que vai para o banco não contém a senha',
              test: "'pao-de-queijo-42' not in cadastrar_senha('pao-de-queijo-42')",
            },
            {
              label: 'A mesma senha gera registros diferentes (sal)',
              test: "cadastrar_senha('123456') != cadastrar_senha('123456')",
            },
          ],
        },
        {
          type: 'code',
          language: 'python',
          caption:
            'No projeto de verdade: uma biblioteca mantida faz tudo isso (aqui, argon2-cffi)',
          code: 'from argon2 import PasswordHasher\n\nph = PasswordHasher()\nguardado = ph.hash("pao-de-queijo-42")   # já inclui sal e parâmetros\nph.verify(guardado, "pao-de-queijo-42")   # lança erro se não bater',
        },
        {
          type: 'quiz',
          question: 'Por que não usar só `sha256(senha)`, sem sal e de uma vez só?',
          options: [
            {
              text: 'Porque o SHA-256 pode ser revertido para descobrir a senha',
              feedback:
                'Não dá para reverter um hash. O problema é outro: dá para **adivinhar** muito rápido, testando senhas comuns e comparando os resultados.',
            },
            {
              text: 'Porque ele é rápido demais e, sem sal, senhas iguais geram hashes iguais',
              correct: true,
              feedback:
                'Isso. Placas de vídeo calculam bilhões de SHA-256 por segundo, e sem sal basta uma tabela pronta com o hash das senhas mais usadas. Hash lento com sal torna os dois ataques caros.',
            },
            {
              text: 'Porque o resultado fica muito grande para o banco',
              feedback:
                'Um SHA-256 tem 64 caracteres em hexadecimal, pequeno para qualquer banco. O problema é de segurança, não de espaço.',
            },
          ],
        },
      ],
    },
    {
      id: 'sessoes-e-tokens',
      title: 'Lembrar quem entrou: sessão ou token',
      blocks: [
        {
          type: 'text',
          text: 'O HTTP não tem memória: cada requisição chega sozinha. Para a pessoa não digitar a senha a cada clique, o login entrega uma **prova** que o cliente reapresenta nos pedidos seguintes. Há dois jeitos principais de fazer isso.',
        },
        {
          type: 'analogy',
          title: 'A comanda e a pulseira',
          text: 'Na **sessão**, o servidor é como o restaurante que dá uma comanda numerada: o número sozinho não diz nada, e o caixa consulta o caderno para saber o que é seu. No **token**, como a pulseira de um show, a própria pulseira traz as informações escritas e um selo difícil de falsificar, e o segurança confere o selo sem consultar ninguém.',
        },
        {
          type: 'flow',
          caption: 'Login com sessão guardada no servidor e enviada por cookie',
          actors: ['Navegador', 'API', 'Sessões'],
          steps: [
            {
              from: 0,
              to: 1,
              label: 'POST /login',
              text: 'O navegador envia e-mail e senha, sempre por HTTPS.',
            },
            {
              from: 1,
              to: 2,
              label: 'Cria sessão 8f3a…',
              text: 'A senha confere. A API cria um identificador aleatório e anota: sessão `8f3a…` pertence à pessoa 1, válida por uma hora.',
              tone: 'ok',
            },
            {
              from: 1,
              to: 0,
              label: 'Set-Cookie: sessao=8f3a…',
              text: 'A resposta pede ao navegador que guarde um **cookie** com o identificador.',
            },
            {
              from: 0,
              to: 1,
              label: 'GET /despesas + Cookie',
              text: 'Daqui em diante, o navegador envia o cookie sozinho em cada pedido para esse site.',
            },
            {
              from: 1,
              to: 2,
              label: 'De quem é 8f3a…?',
              text: 'A API consulta o registro de sessões e descobre quem está pedindo. Para encerrar o acesso, basta apagar a sessão.',
              tone: 'ok',
            },
          ],
        },
        {
          type: 'text',
          text: 'O token mais conhecido é o **JWT** (JSON Web Token): três pedaços separados por pontos. Ele é **assinado**, não criptografado: qualquer pessoa consegue ler o conteúdo, mas só o servidor, com a chave secreta, consegue produzir uma assinatura válida.',
        },
        {
          type: 'anatomy',
          caption: 'Um JWT. Explore os três pedaços.',
          language: 'text',
          parts: [
            {
              text: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
              label: 'Cabeçalho',
              note: 'Em base64, que é só uma forma de escrever bytes como texto: `{"alg":"HS256","typ":"JWT"}`. Diz qual algoritmo assinou. O servidor deve aceitar apenas o algoritmo que ele mesmo usa.',
            },
            { text: '.' },
            {
              text: 'eyJzdWIiOiIxIiwibm9tZSI6IkFuYSIsInBhcGVsIjoicGVzc29hIiwiZXhwIjoxNzkyMDAwMDAwfQ',
              label: 'Conteúdo (payload)',
              note: 'Decodificado: `{"sub":"1","nome":"Ana","papel":"pessoa","exp":1792000000}`. `sub` é quem, `exp` é quando expira. Qualquer pessoa lê isso: nunca coloque senha ou dado sensível aqui.',
            },
            { text: '.' },
            {
              text: 'Xy9p2kQm7rT4vB1nL8sW3eF6hJ0aZ5cD',
              label: 'Assinatura',
              note: 'Calculada com o cabeçalho, o conteúdo e a chave secreta do servidor. Se alguém trocar `pessoa` por `admin` no conteúdo, a assinatura deixa de bater e o token é recusado.',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Uma pessoa decodifica o próprio JWT, troca `"papel":"pessoa"` por `"papel":"admin"` e envia de volta. O que acontece numa API bem feita?',
          options: [
            {
              text: 'Ela vira admin, porque o token estava no computador dela',
              feedback:
                'Só aconteceria se a API não verificasse a assinatura, um erro grave e real. Verificar a assinatura em toda requisição é obrigatório.',
            },
            {
              text: 'Nada muda, porque o conteúdo do JWT é criptografado',
              feedback:
                'O conteúdo não é criptografado: ela conseguiu ler e trocar. O que a protege é a assinatura, não o segredo do conteúdo.',
            },
            {
              text: 'A API recusa com 401, porque a assinatura não confere mais',
              correct: true,
              feedback:
                'Isso. A assinatura foi feita sobre o conteúdo original. Qualquer alteração invalida o token, e a API não sabe mais quem está pedindo.',
            },
          ],
        },
        {
          type: 'anatomy',
          caption: 'Um cookie de sessão bem configurado',
          language: 'http',
          parts: [
            { text: 'Set-Cookie: sessao=8f3a91c2e7; ' },
            {
              text: 'HttpOnly',
              label: 'HttpOnly',
              note: 'O JavaScript da página não consegue ler o cookie. Se um ataque de XSS rodar código na página, ele não rouba a sessão.',
            },
            { text: '; ' },
            {
              text: 'Secure',
              label: 'Secure',
              note: 'O cookie só viaja por HTTPS. Numa rede Wi-Fi pública, ninguém o captura no caminho.',
            },
            { text: '; ' },
            {
              text: 'SameSite=Lax',
              label: 'SameSite',
              note: 'Limita o envio do cookie quando o pedido vem de outro site. É a principal defesa contra **CSRF**: um site malicioso que faz o seu navegador enviar pedidos para a API usando o seu login.',
            },
            { text: '; Path=/; ' },
            {
              text: 'Max-Age=3600',
              label: 'Validade',
              note: 'O cookie expira em uma hora (3600 segundos). Sessões que nunca expiram são um presente para quem rouba um computador desbloqueado.',
            },
          ],
        },
        {
          type: 'fill',
          prompt:
            'Complete o cookie: ele não pode ser lido por JavaScript, só pode viajar por HTTPS e não deve ir em pedidos disparados por outros sites.',
          language: 'http',
          template:
            'Set-Cookie: sessao=8f3a91c2e7; [[HttpOnly]]; [[Secure]]; SameSite=[[Lax|Strict]]',
          explanation:
            'Os três atributos juntos protegem contra roubo por script, captura na rede e pedidos forjados. Os frameworks costumam ter essas opções prontas: confira se estão ligadas.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'E o CORS?',
          text: '**CORS** é a regra do navegador que decide se o JavaScript de um site pode ler respostas da API de outro endereço. Ele não protege a API de ninguém com `curl`, só controla navegadores. Libere apenas os endereços do seu frontend, nunca `*` junto com cookies.',
        },
      ],
    },
    {
      id: 'permissoes',
      title: 'Papéis e permissões: cada um com o seu',
      blocks: [
        {
          type: 'text',
          text: 'Autorização costuma combinar duas ideias. **Papéis** (roles) agrupam permissões: `pessoa`, `suporte`, `admin`. E a **posse**: mesmo sem papel especial, a dona de uma despesa pode lê-la e alterá-la, e mais ninguém.',
        },
        {
          type: 'text',
          text: 'A falha mais comum em APIs, primeira da lista de riscos de API da OWASP, é checar só o login e esquecer a posse. A rota `GET /despesas/12` confere que existe alguém logado e devolve a despesa, sem perguntar de quem ela é. Trocar o 12 por 13 na URL basta para ler dados alheios.',
        },
        {
          type: 'python',
          title: 'Escreva a regra de acesso às despesas',
          task: 'Complete `verificar_acesso`. Regras: sem usuário, devolve 401. A dona da despesa (`despesa["dono_id"]` igual a `usuario["id"]`) pode qualquer ação: devolve 200. Quem tem papel `suporte` pode **ler** qualquer despesa (200), mas não editar nem apagar. Todo o resto devolve 403.',
          code: "ana = {'id': 1, 'papel': 'pessoa'}\nbruno = {'id': 2, 'papel': 'pessoa'}\nsuporte = {'id': 9, 'papel': 'suporte'}\ndespesa_da_ana = {'id': 7, 'dono_id': 1, 'valor': 412.9}\n\n\ndef verificar_acesso(usuario, acao, despesa):\n    if usuario is None:\n        return 401\n    return 200\n\n\nprint('Bruno lendo a despesa da Ana:', verificar_acesso(bruno, 'ler', despesa_da_ana))",
          solution:
            "ana = {'id': 1, 'papel': 'pessoa'}\nbruno = {'id': 2, 'papel': 'pessoa'}\nsuporte = {'id': 9, 'papel': 'suporte'}\ndespesa_da_ana = {'id': 7, 'dono_id': 1, 'valor': 412.9}\n\n\ndef verificar_acesso(usuario, acao, despesa):\n    if usuario is None:\n        return 401\n    if despesa['dono_id'] == usuario['id']:\n        return 200\n    if usuario['papel'] == 'suporte' and acao == 'ler':\n        return 200\n    return 403\n\n\nprint('Bruno lendo a despesa da Ana:', verificar_acesso(bruno, 'ler', despesa_da_ana))",
          checks: [
            {
              label: 'Sem login: 401',
              test: "verificar_acesso(None, 'ler', despesa_da_ana) == 401",
            },
            {
              label: 'A dona pode editar a própria despesa',
              test: "verificar_acesso(ana, 'editar', despesa_da_ana) == 200",
            },
            {
              label: 'Outra pessoa não lê a despesa da Ana: 403',
              test: "verificar_acesso(bruno, 'ler', despesa_da_ana) == 403",
            },
            {
              label: 'Outra pessoa não apaga a despesa da Ana: 403',
              test: "verificar_acesso(bruno, 'apagar', despesa_da_ana) == 403",
            },
            {
              label: 'O suporte lê, mas não edita',
              test: "verificar_acesso(suporte, 'ler', despesa_da_ana) == 200 and verificar_acesso(suporte, 'editar', despesa_da_ana) == 403",
            },
          ],
        },
        {
          type: 'terminal',
          title: 'Teste os acessos como quem ataca',
          task: 'Uma API de laboratório está no ar. A despesa 7 é da Ana; a despesa 12 é do Bruno. Para facilitar, o token da Ana é o texto curto `tok_ana`, enviado no cabeçalho `Authorization: Bearer tok_ana`. Teste o acesso sem login, o acesso legítimo e as tentativas de mexer no que não é dela.',
          prompt: '~/testes$',
          steps: [
            {
              goal: 'Peça a despesa 7 sem enviar token nenhum, mostrando o status com `-i`.',
              command: [
                'curl -i http://localhost:8000/despesas/7',
                'curl -i localhost:8000/despesas/7',
                'curl http://localhost:8000/despesas/7 -i',
              ],
              output:
                'HTTP/1.1 401 Unauthorized\nwww-authenticate: Bearer\ncontent-type: application/json\n\n{"erro":"nao_autenticado","mensagem":"Faça login para continuar."}',
              hint: '`curl -i http://localhost:8000/despesas/7`',
            },
            {
              goal: 'Agora peça a mesma despesa com o token da Ana, usando `-H "Authorization: Bearer tok_ana"`.',
              command: comToken('http://localhost:8000/despesas/7'),
              output:
                'HTTP/1.1 200 OK\ncontent-type: application/json\n\n{"id":7,"descricao":"Mercado do mês","valor":412.9,"dono_id":1}',
              hint: '`curl -i -H "Authorization: Bearer tok_ana" http://localhost:8000/despesas/7`',
            },
            {
              goal: 'Com o token da Ana, tente ler a despesa 12, que é do Bruno.',
              command: comToken('http://localhost:8000/despesas/12'),
              output:
                'HTTP/1.1 403 Forbidden\ncontent-type: application/json\n\n{"erro":"sem_permissao","mensagem":"Você não tem acesso a esta despesa."}',
              hint: 'O mesmo comando do passo anterior, trocando 7 por 12.',
            },
            {
              goal: 'Ainda com o token da Ana, tente apagar a despesa 12 com `-X DELETE`.',
              command: comToken('-X DELETE http://localhost:8000/despesas/12').concat([
                'curl -i -X DELETE -H "Authorization: Bearer tok_ana" http://localhost:8000/despesas/12',
              ]),
              output:
                'HTTP/1.1 403 Forbidden\ncontent-type: application/json\n\n{"erro":"sem_permissao","mensagem":"Você não tem acesso a esta despesa."}',
              hint: '`curl -i -H "Authorization: Bearer tok_ana" -X DELETE http://localhost:8000/despesas/12`',
            },
            {
              goal: 'Confirme que a despesa 12 continua lá, pedindo-a com o token do Bruno, `tok_bruno`.',
              command: [
                'curl -i -H "Authorization: Bearer tok_bruno" http://localhost:8000/despesas/12',
                "curl -i -H 'Authorization: Bearer tok_bruno' http://localhost:8000/despesas/12",
                'curl -H "Authorization: Bearer tok_bruno" -i http://localhost:8000/despesas/12',
                'curl -i http://localhost:8000/despesas/12 -H "Authorization: Bearer tok_bruno"',
              ],
              output:
                'HTTP/1.1 200 OK\ncontent-type: application/json\n\n{"id":12,"descricao":"Conta de luz","valor":138.4,"dono_id":2}',
              hint: '`curl -i -H "Authorization: Bearer tok_bruno" http://localhost:8000/despesas/12`',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: '403 ou 404?',
          text: 'Algumas APIs respondem `404` quando a pessoa pede um recurso alheio, para nem revelar que ele existe. As duas escolhas são aceitas; o que não pode é devolver `200` com os dados.',
        },
      ],
    },
    {
      id: 'erros-comuns',
      title: 'Os erros que mais aparecem',
      blocks: [
        {
          type: 'text',
          text: 'A OWASP, uma comunidade aberta de segurança, mantém listas dos problemas mais frequentes em aplicações e APIs. Quase todos os de autenticação e autorização se repetem nos projetos de quem está começando, e todos têm solução conhecida.',
        },
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              title: 'Senha em texto ou com hash rápido',
              text: 'Um vazamento vira acesso imediato a todas as contas. Use Argon2 ou bcrypt por meio de uma biblioteca mantida.',
            },
            {
              title: 'Checar só o login',
              text: 'Toda rota que recebe um `id` precisa conferir se o recurso pertence a quem pede, no servidor.',
            },
            {
              title: 'Esconder o botão e achar que protegeu',
              text: 'Esconder no frontend é conforto. A API precisa recusar mesmo que alguém chame a rota com `curl`.',
            },
            {
              title: 'Segredos no repositório',
              text: 'Chave do JWT, senha do banco e chaves de API ficam em variáveis de ambiente ou num cofre, nunca no Git.',
            },
            {
              title: 'Tentativas ilimitadas',
              text: 'Sem **limite de requisições** (rate limit) no login, um robô testa milhares de senhas por minuto.',
            },
            {
              title: 'Mensagens que entregam demais',
              text: '"E-mail não cadastrado" conta a quem ataca quais e-mails existem. Prefira "E-mail ou senha inválidos".',
            },
          ],
        },
        {
          type: 'classify',
          prompt: 'Cada prática deixa o sistema mais seguro ou mais exposto?',
          buckets: ['Mais seguro', 'Mais exposto'],
          items: [
            { text: 'Cookie de sessão com `HttpOnly`, `Secure` e `SameSite`', bucket: 0 },
            { text: 'Bloquear o login por alguns minutos após várias senhas erradas', bucket: 0 },
            { text: 'Conferir o dono da despesa em toda rota com `id`', bucket: 0 },
            { text: 'Usar a biblioteca de autenticação do framework', bucket: 0 },
            { text: 'Guardar a chave do JWT no arquivo `config.py` do Git', bucket: 1 },
            { text: 'Colocar o CPF da pessoa no conteúdo do JWT', bucket: 1 },
            { text: 'Aceitar API sem HTTPS na rede interna da empresa', bucket: 1 },
            { text: 'Responder "este e-mail não existe" no login', bucket: 1 },
          ],
          explanation:
            'Repare que a maioria das proteções é configuração, não código novo. Bibliotecas e frameworks mantidos já trazem quase tudo; o trabalho é ligar, testar e não desligar.',
        },
        {
          type: 'reveal',
          question:
            'Se a autorização é tão importante, por que tantos sistemas falham nela mesmo com login bem feito?',
          answer:
            'Porque o login é feito uma vez, num lugar só, e a autorização precisa ser lembrada em cada rota. Basta uma rota nova sem a verificação. Por isso vale centralizar a regra numa função, como a `verificar_acesso` que você escreveu, e ter testes que tentam acessar dados alheios.',
        },
      ],
    },
  ],
  recap: [
    '**Autenticação** confirma quem é; **autorização** decide o que essa pessoa pode fazer. Falhas respondem `401` e `403`, respectivamente.',
    'Senhas nunca são guardadas em texto: use um **hash lento com sal**, de preferência por uma biblioteca mantida como Argon2 ou bcrypt.',
    'Depois do login, o cliente reapresenta uma prova: um **cookie de sessão** (com `HttpOnly`, `Secure` e `SameSite`) ou um **token** assinado como o JWT, que pode ser lido por qualquer pessoa.',
    'Autorização combina **papéis** e **posse**, e precisa ser verificada no servidor em toda rota que acessa um recurso.',
    'Os erros mais comuns têm solução conhecida: segredos fora do Git, limite de tentativas, mensagens discretas e testes que tentam acessar dados alheios.',
  ],
  cards: [
    {
      id: 'authn-authz',
      front: 'Qual a diferença entre autenticação e autorização?',
      back: 'Autenticação confirma quem é a pessoa. Autorização decide o que ela pode fazer.',
    },
    {
      id: '401-403',
      front: 'Quando usar `401` e quando usar `403`?',
      back: '`401`: a API não sabe quem está pedindo. `403`: sabe quem é, e essa pessoa não tem permissão.',
    },
    {
      id: 'sal',
      front: 'Para que serve o sal no hash de senhas?',
      back: 'Tornar diferente o registro de senhas iguais e inutilizar tabelas prontas de hashes de senhas comuns.',
    },
    {
      id: 'jwt-legivel',
      front: 'O conteúdo de um JWT é secreto?',
      back: 'Não. Ele é só assinado: qualquer pessoa lê, mas não consegue alterar sem invalidar a assinatura.',
    },
    {
      id: 'httponly',
      front: 'O que o atributo `HttpOnly` faz num cookie?',
      back: 'Impede que o JavaScript da página leia o cookie, protegendo a sessão contra roubo por XSS.',
    },
    {
      id: 'samesite',
      front: 'Contra qual ataque o `SameSite` protege?',
      back: 'CSRF: outro site fazendo o seu navegador enviar pedidos à API usando o seu login.',
    },
    {
      id: 'checar-posse',
      front: 'Qual a falha de autorização mais comum em APIs?',
      back: 'Checar só se há alguém logado e não conferir se o recurso pedido pertence a essa pessoa.',
    },
  ],
  mission: {
    title: 'Prove que ninguém mexe nas despesas de outra pessoa',
    text: 'Na API de despesas que você está construindo, ou numa API de laboratório autorizada, implemente ou verifique o acesso por usuário. Use a biblioteca de autenticação da sua stack em vez de escrever criptografia à mão.',
    steps: [
      'Crie duas contas de teste, cada uma com algumas despesas',
      'Confirme que as senhas estão guardadas com hash e sal, olhando a tabela de usuários no banco',
      'Chame as rotas de ler, alterar e apagar sem login e anote se todas respondem `401`',
      'Com o login de uma conta, tente ler, alterar e apagar uma despesa da outra e confira se nada vaza nem muda',
      'Se usar cookies, verifique no painel de rede do navegador se `HttpOnly`, `Secure` e `SameSite` estão presentes',
      'Transforme essas tentativas em testes automatizados que rodam a cada mudança',
    ],
  },
  sources: [
    {
      title: 'OWASP: Authentication Cheat Sheet',
      url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html',
    },
    {
      title: 'OWASP: Password Storage Cheat Sheet',
      url: 'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html',
    },
    {
      title: 'OWASP API Security Top 10',
      url: 'https://owasp.org/API-Security/',
    },
    {
      title: 'MDN: Cookies HTTP',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Cookies',
    },
  ],
};
