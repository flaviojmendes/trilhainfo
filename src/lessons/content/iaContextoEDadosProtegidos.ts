import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Uma IA só consegue ajudar com o que você mostra para ela. Mostre de menos e ela chuta; mostre a coisa errada e ela resolve outro problema; mostre o que não devia, como uma senha ou o CPF de alguém, e o problema deixa de ser técnico e vira de segurança, ou até jurídico. Nesta aula você aprende a escolher o que vai para a conversa: o suficiente para uma boa resposta, e nada que precise ser protegido.',
  sections: [
    {
      id: 'mesa-de-trabalho',
      title: 'A mesa de trabalho da IA',
      blocks: [
        {
          type: 'analogy',
          title: 'Uma mesa com espaço limitado',
          text: 'Imagine uma pessoa que trabalha numa mesa pequena. Ela só consegue usar o que está em cima da mesa: o que ficou no armário, ela não vê. Quando a mesa enche, os papéis mais antigos começam a cair pelo outro lado. A IA trabalha assim: tudo o que ela “sabe” sobre o seu problema é o que está na mesa naquele momento.',
        },
        {
          type: 'text',
          text: 'Essa mesa se chama **janela de contexto**: a quantidade máxima de texto que o modelo consegue considerar de uma vez. Ela inclui suas mensagens, as respostas da IA e os arquivos ou trechos que você anexou. O tamanho é medido em **tokens**, pedaços de texto que, em português, costumam ser partes de palavras.',
        },
        {
          type: 'list',
          items: [
            '**A IA não vê seu computador** por padrão. Num chat, ela só conhece o que você colou. Num editor com IA, ela vê os arquivos que a ferramenta incluiu ou que você indicou.',
            '**Conversas longas perdem o começo.** Quando a mesa enche, as ferramentas resumem ou descartam partes antigas, e uma instrução do início pode ser esquecida.',
            '**Mais não é sempre melhor.** Colar o projeto inteiro enche a mesa de coisas irrelevantes e esconde o trecho que importa.',
          ],
        },
        {
          type: 'quiz',
          question:
            'No começo de uma conversa longa você pediu “use apenas laços for”. Cinquenta mensagens depois, a IA começa a usar `map`. Qual é a explicação mais provável?',
          options: [
            {
              text: 'A instrução do início saiu ou perdeu força na janela de contexto, que está cheia',
              correct: true,
              feedback:
                'Isso. Em conversas muito longas, o começo pode ser resumido ou descartado. A saída é repetir a instrução importante ou abrir uma conversa nova com um resumo do que importa.',
            },
            {
              text: 'A IA decidiu ignorar você de propósito',
              feedback:
                'O modelo não tem vontade própria. Ele trabalha com o que está na mesa, e sua instrução ficou longe ou fora dela.',
            },
            {
              text: 'A ferramenta ficou sem internet',
              feedback:
                'Se a conexão caísse, a resposta nem chegaria. O problema é o que está dentro da conversa, não a rede.',
            },
          ],
        },
      ],
    },
    {
      id: 'contexto-util',
      title: 'O que vale colocar na mesa',
      blocks: [
        {
          type: 'text',
          text: 'Contexto útil é a informação que muda a resposta. Para dúvidas de código, quatro coisas quase sempre fazem diferença: o **trecho relevante**, o **erro completo**, a **versão** da linguagem ou ferramenta e **o que você já tentou**. Some a isso o comportamento esperado.',
        },
        {
          type: 'codeTabs',
          caption: 'A mesma dúvida, com e sem contexto útil',
          tabs: [
            {
              label: 'Sem contexto',
              language: 'text',
              code: `Deu erro no meu import, como resolve?`,
            },
            {
              label: 'Com contexto útil',
              language: 'text',
              code: `Uso Python 3.12 no Windows, rodando pelo terminal do VS Code.
Arquivo principal.py, linha 1: from utilidades import calcular_total
Erro completo:
  Traceback (most recent call last):
    File "principal.py", line 1, in <module>
  ModuleNotFoundError: No module named 'utilidades'
Os dois arquivos estão na pasta projeto/.
Já tentei: rodar de dentro da pasta projeto/, e o erro continua.
Esperado: importar a função e imprimir o total.`,
            },
          ],
        },
        {
          type: 'classify',
          prompt: 'Para pedir ajuda com um erro, o que é contexto útil e o que só enche a mesa?',
          buckets: ['Contexto útil', 'Ruído'],
          items: [
            { text: 'A mensagem de erro completa, do começo ao fim', bucket: 0 },
            { text: 'A versão da linguagem ou da biblioteca', bucket: 0 },
            { text: 'O que você já tentou e o que aconteceu', bucket: 0 },
            { text: 'O trecho de código onde o erro aparece', bucket: 0 },
            { text: 'Todos os arquivos do projeto, de uma vez', bucket: 1 },
            { text: 'Um log de 3 mil linhas sem indicar onde está o problema', bucket: 1 },
            { text: 'A história de como você decidiu estudar programação', bucket: 1 },
          ],
          explanation:
            'O erro completo é a peça mais valiosa: a última linha diz o tipo do problema e as de cima dizem onde ele aconteceu. Quem cola só “deu erro” obriga a IA a adivinhar. E muito material irrelevante é quase tão ruim quanto nenhum, porque esconde o que importa.',
        },
        {
          type: 'reveal',
          question:
            'A IA sugere uma solução que usa uma opção que só existe numa versão antiga da ferramenta que você usa. O que você faz antes de aceitar?',
          answer:
            'Você percebeu uma **suposição incorreta**: ela respondeu como se você usasse outra versão. Corrija o contexto (“uso a versão 5, não a 4”) e peça de novo. Depois confira na documentação da sua versão. Aceitar sem corrigir faz você colar código que não funciona, ou que funciona por acidente.',
        },
      ],
    },
    {
      id: 'conversar-ou-editar',
      title: 'Conversar sobre o código ou deixar a IA mexer nele',
      blocks: [
        {
          type: 'text',
          text: 'Existem dois modos bem diferentes de usar IA com código. No **chat**, você cola trechos e conversa: nada muda no seu projeto até você copiar algo. Num **agente**, como os modos de agente do Cursor, do Claude Code ou do Codex, a ferramenta pode ler arquivos, **editar** o projeto e até **executar** comandos no seu computador.',
        },
        {
          type: 'flow',
          caption: 'O que acontece quando você dá permissão para um agente agir',
          actors: ['Você', 'IA', 'Seu projeto'],
          steps: [
            {
              from: 0,
              to: 1,
              label: 'Corrija o teste que falha',
              text: 'Você pede uma tarefa pequena e diz quais arquivos podem mudar.',
            },
            {
              from: 1,
              to: 2,
              label: 'Lê arquivos',
              text: 'O agente procura e lê arquivos do projeto. Tudo o que ele lê entra na janela de contexto e é enviado ao serviço da IA.',
            },
            {
              from: 1,
              to: 2,
              label: 'Edita calculo.js',
              text: 'Ele altera um arquivo. Ferramentas boas mostram a mudança como um **diff** (as linhas removidas e adicionadas) para você revisar.',
            },
            {
              from: 1,
              to: 2,
              label: 'Pede para rodar npm test',
              text: 'Executar comandos é o passo mais sensível: um comando errado pode apagar arquivos. Confira o comando antes de aprovar.',
              tone: 'error',
            },
            {
              from: 0,
              to: 0,
              label: 'Revisa o diff',
              text: 'Você lê a mudança, roda o teste e só então aceita. A responsabilidade pelo resultado continua sendo sua.',
              tone: 'ok',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Você está começando e vai usar um agente de IA pela primeira vez num projeto. Qual configuração é mais segura?',
          options: [
            {
              text: 'Um projeto de estudo, com Git, pedindo aprovação antes de cada edição e cada comando',
              correct: true,
              feedback:
                'Isso. Um projeto de laboratório limita o estrago, o Git deixa você voltar atrás e a aprovação manual mantém você no controle. Mais autonomia vem depois, com experiência.',
            },
            {
              text: 'A pasta de documentos inteira, para o agente ter todo o contexto possível',
              feedback:
                'O agente poderia ler arquivos pessoais e mandá-los ao serviço da IA. Dê acesso só à pasta do projeto.',
            },
            {
              text: 'Aprovação automática de todos os comandos, para ganhar tempo',
              feedback:
                'Ganha minutos e arrisca horas: um comando errado pode apagar arquivos ou instalar algo indesejado. Comece aprovando cada passo.',
            },
          ],
        },
      ],
    },
    {
      id: 'nunca-cole',
      title: 'O que nunca vai para a mesa',
      blocks: [
        {
          type: 'text',
          text: 'Tudo o que você manda para uma ferramenta de IA sai do seu computador e vai para o servidor de uma empresa. Dependendo do serviço e do seu plano, pode ser guardado, revisado por pessoas ou usado para treinar modelos. Por isso, algumas coisas **nunca** entram na conversa.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Senhas e tokens',
              text: 'Um **token** de acesso, ou **chave de API**, é uma senha usada por programas, como `sk-...` ou o conteúdo do arquivo `.env`. Quem tem a chave age como você e pode gerar cobranças na sua conta.',
            },
            {
              term: 'Dados pessoais',
              text: 'Nome, CPF, telefone, endereço, e-mail, dados de saúde de pessoas reais. A **LGPD** (Lei Geral de Proteção de Dados) exige cuidado e motivo legítimo para tratar esses dados, e colar numa ferramenta externa é compartilhar.',
            },
            {
              term: 'Código e dados da empresa',
              text: 'Código, planilhas e documentos do trabalho ou de um cliente só entram se a empresa permitir aquela ferramenta. Muitas têm regras escritas sobre isso: pergunte antes.',
            },
          ],
        },
        {
          type: 'classify',
          prompt: 'Você pode colar isto numa ferramenta de IA externa?',
          buckets: ['Pode, com tranquilidade', 'Não cole'],
          items: [
            { text: 'Um exercício da trilha com dados inventados', bucket: 0 },
            { text: 'Uma mensagem de erro com o caminho `C:\\Users\\aluno\\projeto`', bucket: 0 },
            { text: 'A tabela `pedidos` com três linhas que você criou para teste', bucket: 0 },
            { text: 'O arquivo `.env` com a chave da API de pagamentos', bucket: 1 },
            { text: 'Uma planilha com nome, CPF e telefone de clientes reais', bucket: 1 },
            {
              text: 'O código de um sistema da empresa onde você estagia, sem autorização',
              bucket: 1,
            },
            { text: 'Um print da tela do banco com seu saldo e número da conta', bucket: 1 },
          ],
          explanation:
            'A pergunta-guia é: se isto vazasse, alguém seria prejudicado? Dados de laboratório e erros genéricos não prejudicam ninguém. Chaves, dados pessoais e material da empresa, sim. Na dúvida, troque por exemplos inventados.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Colou uma chave sem querer?',
          text: 'Apagar a mensagem não basta: considere a chave exposta. Entre no serviço que a emitiu, **revogue** a chave e gere uma nova. O mesmo vale para chaves que foram parar num repositório público no GitHub.',
        },
      ],
    },
    {
      id: 'anonimizar',
      title: 'Anonimizar antes de perguntar',
      blocks: [
        {
          type: 'text',
          text: '**Anonimizar** (ou sanitizar) é trocar valores sensíveis por exemplos que mantêm o formato, mas não identificam ninguém. A IA não precisa do CPF verdadeiro para entender por que a validação falha: precisa de um CPF com o mesmo formato.',
        },
        {
          type: 'anatomy',
          caption: 'Um log de erro já sanitizado, pronto para colar. Explore as trocas.',
          language: 'text',
          parts: [
            { text: '2026-10-14 09:12:03 ERROR pagamento falhou\n' },
            {
              text: 'cliente: Maria Exemplo',
              label: 'Nome trocado',
              note: 'O nome real virou um nome claramente fictício. O erro não depende de quem é a pessoa.',
            },
            { text: '\n' },
            {
              text: 'cpf: 000.000.000-00',
              label: 'Formato mantido',
              note: 'Os dígitos sumiram, mas o formato com pontos e traço continua. Se o bug for no formato, a IA ainda consegue ver.',
            },
            { text: '\n' },
            {
              text: 'api_key: <REMOVIDA>',
              label: 'Segredo removido',
              note: 'Chaves nunca são trocadas por outra parecida: são removidas. Um marcador como `<REMOVIDA>` avisa que ali havia algo.',
            },
            { text: '\n' },
            {
              text: 'url: https://api.exemplo.com/v1/cobrancas',
              label: 'Domínio genérico',
              note: 'O domínio interno da empresa virou `exemplo.com`. O caminho `/v1/cobrancas` fica, porque ajuda a entender o erro.',
            },
            { text: '\n' },
            {
              text: 'status: 401 Unauthorized',
              label: 'O que importa',
              note: 'A informação técnica que explica o problema continua intacta. Sanitizar é tirar o sensível, não o útil.',
            },
          ],
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem o preparo de um trecho antes de pedir ajuda.',
          items: [
            'Recortar só a parte do código ou do log ligada ao problema',
            'Procurar senhas, tokens e chaves e removê-los',
            'Trocar nomes, documentos e contatos por exemplos com o mesmo formato',
            'Reler o trecho inteiro procurando algo que escapou',
            'Colar na ferramenta junto com versão, esperado e o que você já tentou',
          ],
          explanation:
            'Recortar primeiro diminui o trabalho: menos texto, menos coisa para sanitizar. A releitura final pega o que escapou, como um e-mail perdido no meio de uma linha.',
        },
        {
          type: 'quiz',
          question:
            'Você estagia em uma clínica e um relatório com dados de pacientes sai com as datas trocadas. Como pedir ajuda à IA?',
          options: [
            {
              text: 'Criar três linhas inventadas com o mesmo formato, reproduzir o erro com elas e colar só esse exemplo e o código, se a clínica permitir essa ferramenta',
              correct: true,
              feedback:
                'Isso. Um exemplo sintético que reproduz o erro protege pacientes e ainda deixa o problema mais claro. E as regras do lugar onde você trabalha valem acima de tudo.',
            },
            {
              text: 'Colar o relatório inteiro, já que a IA não vai contar para ninguém',
              feedback:
                'Dados de saúde são dados pessoais sensíveis pela LGPD. Mandar para um serviço externo é compartilhar, mesmo sem intenção, e pode ser guardado.',
            },
            {
              text: 'Apagar só a coluna de nomes e colar o resto',
              feedback:
                'Data de nascimento, telefone e outras colunas juntas ainda identificam pessoas. Anonimizar é trocar tudo que identifica, ou melhor, usar dados inventados.',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Seu projeto pessoal dá erro ao conectar no banco de dados. A mensagem inclui a URL de conexão com usuário e senha. O que fazer?',
          code: 'Error: connect ECONNREFUSED\n  at postgres://admin:S3nh4Forte@db.meuprojeto.com:5432/loja',
          language: 'text',
          options: [
            {
              text: 'Trocar usuário, senha e domínio por marcadores antes de colar, mantendo o resto da mensagem',
              correct: true,
              feedback:
                'Isso. Algo como `postgres://<usuario>:<senha>@<host>:5432/loja` mantém tudo o que importa para o diagnóstico: o protocolo, a porta e o tipo do erro.',
            },
            {
              text: 'Colar como está, porque é um projeto pessoal',
              feedback:
                'Mesmo num projeto pessoal, quem tem essa senha entra no seu banco. E é comum repetir senhas entre serviços. Sanitize sempre.',
            },
            {
              text: 'Não pedir ajuda, porque não dá para explicar o erro sem a senha',
              feedback:
                '`ECONNREFUSED` quer dizer que a conexão foi recusada, geralmente porque o banco não está rodando ou a porta está errada. A senha não ajuda a diagnosticar isso.',
            },
          ],
        },
      ],
    },
  ],
  recap: [
    'A **janela de contexto** é a mesa de trabalho da IA: ela só considera o que está ali, e conversas longas perdem o começo.',
    'Contexto útil é o trecho relevante, o erro completo, a versão, o esperado e o que você já tentou; o resto vira ruído.',
    'Num chat você só conversa; um **agente** pode ler, editar e executar, então comece em projeto de estudo e aprove cada passo.',
    'Nunca cole senhas, tokens, chaves de API, dados pessoais ou código da empresa sem permissão; chave exposta deve ser revogada.',
    'Anonimizar é trocar o sensível por exemplos com o mesmo formato, mantendo a informação técnica que explica o problema.',
  ],
  cards: [
    {
      id: 'janela-de-contexto',
      front: 'O que é a janela de contexto de uma IA?',
      back: 'A quantidade máxima de texto que o modelo considera de uma vez: mensagens, respostas e arquivos anexados.',
    },
    {
      id: 'contexto-util',
      front: 'Quais quatro informações quase sempre melhoram um pedido de ajuda com erro?',
      back: 'O trecho relevante, o erro completo, a versão usada e o que você já tentou.',
    },
    {
      id: 'chat-vs-agente',
      front: 'Qual a diferença entre usar IA num chat e num agente?',
      back: 'No chat você só conversa e copia trechos; o agente pode ler e editar arquivos e executar comandos no projeto.',
    },
    {
      id: 'nunca-colar',
      front: 'O que nunca deve ser colado numa ferramenta de IA externa?',
      back: 'Senhas, tokens e chaves de API, dados pessoais e código ou dados da empresa sem permissão.',
    },
    {
      id: 'chave-vazou',
      front: 'Você colou uma chave de API sem querer. O que fazer?',
      back: 'Considerar a chave exposta: revogar no serviço que a emitiu e gerar uma nova.',
    },
    {
      id: 'anonimizar',
      front: 'O que é anonimizar um trecho antes de perguntar?',
      back: 'Trocar valores sensíveis por exemplos com o mesmo formato e remover segredos, mantendo a informação técnica.',
    },
    {
      id: 'suposicao-incorreta',
      front: 'A IA respondeu como se você usasse outra versão. O que fazer?',
      back: 'Corrigir o contexto com a versão certa, pedir de novo e conferir na documentação daquela versão.',
    },
  ],
  mission: {
    title: 'A mesma dúvida, com e sem o contexto certo',
    text: 'Use um erro real de um exercício da sua trilha, ou provoque um de propósito no seu projeto de estudo, e descubra na prática como o contexto muda a resposta.',
    steps: [
      'Pergunte sobre o erro só com uma frase, sem trecho nem mensagem, e salve a resposta',
      'Prepare o trecho relevante e o erro completo, sanitizando qualquer senha, token ou dado pessoal',
      'Pergunte de novo com o trecho, a versão, o esperado e o que você já tentou',
      'Encontre uma suposição incorreta em alguma das respostas e corrija o contexto antes de aceitar a solução',
      'Rode a solução final e anote qual informação de contexto fez mais diferença',
    ],
  },
  sources: [
    {
      title: 'Cursor: prompts e contexto (inglês)',
      url: 'https://cursor.com/docs/agent/prompting',
    },
    {
      title: 'GitHub: uso responsável de sugestões de IA',
      url: 'https://docs.github.com/pt/copilot/responsible-use/copilot-code-completion',
    },
    {
      title: 'Governo Federal: Lei Geral de Proteção de Dados (LGPD)',
      url: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm',
    },
    {
      title: 'OWASP: Top 10 para aplicações com LLM (inglês)',
      url: 'https://genai.owasp.org/llm-top-10/',
    },
  ],
};
