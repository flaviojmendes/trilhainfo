import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Se você já salvou um trabalho como `projeto-final.html`, depois `projeto-final-2.html` e por fim `projeto-final-AGORA-VAI.html`, você já sentiu o problema que o Git resolve. Com ele, cada versão do projeto fica guardada com data, autoria e uma explicação, e você volta a qualquer uma quando quiser. Praticamente toda empresa de tecnologia usa Git, e saber usá-lo é uma das primeiras coisas que perguntam numa vaga.',
  sections: [
    {
      id: 'por-que-git',
      title: 'Chega de projeto-final-AGORA-VAI',
      blocks: [
        {
          type: 'analogy',
          title: 'Os pontos de salvamento de um jogo',
          text: 'Em muitos videogames você salva antes de enfrentar o chefão. Se perder, volta para aquele ponto em vez de recomeçar do zero. O **Git** dá isso ao seu código: você marca pontos de salvamento, e cada um guarda o projeto inteiro exatamente como estava naquele momento.',
        },
        {
          type: 'text',
          text: 'Copiar arquivos com nomes diferentes até funciona, mas logo ninguém sabe qual é o certo nem o que mudou entre um e outro. O Git guarda todas as versões numa pasta escondida, sem bagunçar a sua, e responde perguntas como “o que mudou desde ontem?” e “quem escreveu esta linha?”.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Git',
              text: 'Um programa gratuito que roda no seu computador e registra a história do projeto. Funciona sem internet.',
            },
            {
              term: 'Repositório',
              text: 'Uma pasta de projeto que o Git está acompanhando, junto com todo o histórico dela. O apelido é **repo**.',
            },
            {
              term: 'Commit',
              text: 'Um ponto de salvamento: uma foto do projeto num momento, com uma mensagem explicando o que mudou.',
            },
            {
              term: 'GitHub',
              text: 'Um site que guarda cópias de repositórios na internet, para fazer backup, mostrar seu trabalho e colaborar. Existem alternativas, como GitLab e Bitbucket.',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Uma colega diz: “Não consigo usar Git porque estou sem internet hoje”. Ela tem razão?',
          options: [
            {
              text: 'Não. O Git roda no computador dela; só enviar para o GitHub precisa de internet',
              correct: true,
              feedback:
                'Isso. Git e GitHub são coisas diferentes. Ela pode fazer commits o dia todo offline e enviar tudo quando a conexão voltar.',
            },
            {
              text: 'Sim. Git é um site e precisa de conexão',
              feedback:
                'Essa é uma confusão muito comum. O site é o **GitHub**. O Git é um programa instalado no computador.',
            },
            {
              text: 'Sim. Cada commit é enviado na hora para a nuvem',
              feedback:
                'O commit fica só no seu computador. Enviar para a nuvem é um passo separado, que você faz quando quiser, com `git push`.',
            },
          ],
        },
      ],
    },
    {
      id: 'tres-areas',
      title: 'As três áreas do Git',
      blocks: [
        {
          type: 'analogy',
          title: 'Despachando uma encomenda',
          text: 'Você espalha na mesa as coisas que quer mandar pela transportadora. Escolhe algumas e coloca na caixa aberta. Quando está tudo certo, fecha a caixa, cola uma etiqueta descrevendo o conteúdo e guarda na prateleira. Depois, leva as caixas para o depósito da transportadora, em outra cidade. O Git funciona do mesmo jeito.',
        },
        {
          type: 'table',
          caption: 'Cada parte da encomenda tem um nome no Git',
          head: ['Na encomenda', 'No Git', 'O que é'],
          rows: [
            [
              'A mesa',
              '**Pasta de trabalho**',
              'Os arquivos como estão agora, que você edita no VS Code',
            ],
            [
              'A caixa aberta',
              '**Staging**',
              'A área de preparação: as mudanças escolhidas para o próximo commit',
            ],
            [
              'Caixas lacradas na prateleira',
              '**Histórico**',
              'Os commits guardados no repositório, no seu computador',
            ],
            [
              'O depósito em outra cidade',
              '**GitHub**',
              'Uma cópia do repositório na internet, chamada de **remoto**',
            ],
          ],
        },
        {
          type: 'flow',
          caption: 'Uma mudança viajando pelas áreas do Git',
          actors: ['Pasta', 'Staging', 'Histórico', 'GitHub'],
          steps: [
            {
              from: 0,
              to: 0,
              label: 'Edita index.html',
              text: 'Você muda o título da página e salva. O Git percebe que o arquivo está diferente do último commit, mas ainda não guarda nada.',
            },
            {
              from: 0,
              to: 1,
              label: 'git add index.html',
              text: 'Você coloca essa mudança na caixa. Só o que passa pelo staging entra no próximo commit, então dá para escolher o que vai junto.',
            },
            {
              from: 1,
              to: 2,
              label: 'git commit -m "..."',
              text: 'A caixa é lacrada com uma mensagem. Agora existe um ponto de salvamento no histórico, no seu computador.',
              tone: 'ok',
            },
            {
              from: 2,
              to: 3,
              label: 'git push',
              text: 'Você envia os commits novos para o GitHub. Agora existe uma cópia na internet, que outras pessoas podem ver.',
              tone: 'ok',
            },
            {
              from: 3,
              to: 2,
              label: 'git pull',
              text: 'Uma colega enviou commits dela para o GitHub. Com `git pull`, você traz esses commits para o seu histórico.',
            },
            {
              from: 2,
              to: 0,
              label: 'Arquivos atualizados',
              text: 'Junto com o `pull`, sua pasta de trabalho é atualizada com as mudanças dela. Você continua trabalhando a partir daí.',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Você editou `index.html`, salvou e rodou `git commit -m "Muda título"`, sem usar `git add`. O que acontece?',
          options: [
            {
              text: 'O Git avisa que não há nada preparado para o commit',
              correct: true,
              feedback:
                'Isso. Sem `git add`, a caixa está vazia. A mudança continua na pasta de trabalho, esperando você escolher colocá-la no staging.',
            },
            {
              text: 'O commit é feito com todas as mudanças',
              feedback:
                'O Git não pega mudanças sozinho. Essa etapa existe justamente para você escolher o que entra em cada commit.',
            },
            {
              text: 'A mudança vai direto para o GitHub',
              feedback:
                'Nem o commit vai para o GitHub sozinho. Enviar é sempre um passo separado, com `git push`.',
            },
            {
              text: 'O arquivo é apagado',
              feedback:
                'O Git nunca apaga seu trabalho por causa de um commit vazio. Ele só avisa que não havia nada para guardar.',
            },
          ],
        },
      ],
    },
    {
      id: 'primeiros-comandos',
      title: 'Seu primeiro repositório',
      blocks: [
        {
          type: 'text',
          text: 'Tudo isso acontece no terminal que você conheceu na aula anterior. Primeiro, instale o Git pelo site `git-scm.com`. No Windows, ele vem com um terminal próprio, o **Git Bash**. Depois, entre na pasta do projeto com `cd` e siga os passos.',
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Apresente-se ao Git (só uma vez por computador)',
              text: 'Cada commit leva nome e e-mail de quem fez. Use o mesmo e-mail da sua conta no GitHub.',
              code: 'git config --global user.name "Ana Souza"\ngit config --global user.email "ana@exemplo.com"',
            },
            {
              title: 'Transforme a pasta num repositório',
              text: 'Rode dentro da pasta do projeto. O Git cria uma pasta escondida chamada `.git`, onde guarda o histórico. Não mexa nela.',
              code: 'git init -b main',
            },
            {
              title: 'Pergunte como estão as coisas',
              text: '`git status` mostra o que mudou e o que está no staging. Use sempre que estiver em dúvida: ele nunca altera nada.',
              code: 'git status',
            },
            {
              title: 'Coloque as mudanças no staging',
              text: 'Escolha um arquivo pelo nome, ou use o ponto para incluir tudo o que mudou na pasta.',
              code: 'git add index.html\n# ou, para tudo:\ngit add .',
            },
            {
              title: 'Faça o commit',
              text: 'O `-m` vem de mensagem. Escreva entre aspas o que esse commit faz.',
              code: 'git commit -m "Cria página inicial com título e parágrafo"',
            },
            {
              title: 'Veja o histórico',
              text: 'Cada linha é um commit, com um código de identificação e a mensagem. O mais recente aparece primeiro.',
              code: 'git log --oneline',
            },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          caption: 'O que o `git status` mostra depois de editar um arquivo',
          code: 'git status',
          output:
            'On branch main\nChanges not staged for commit:\n  modified:   index.html\n\nno changes added to commit (use "git add")',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'O Git fala inglês, mas é legível',
          text: '`modified` quer dizer modificado. `Changes not staged` são mudanças fora da caixa. `Changes to be committed` são mudanças na caixa, prontas para o commit. Se o seu Git criou a branch com o nome `master`, rode `git branch -M main` para seguir o padrão atual.',
        },
        {
          type: 'fill',
          prompt:
            'Complete a sequência: criar o repositório, conferir o estado, preparar todos os arquivos, fazer o commit e ver o histórico.',
          language: 'bash',
          template:
            'git [[init]] -b main\ngit [[status]]\ngit [[add]] .\ngit [[commit]] -m "Primeira versão da página"\ngit [[log]] --oneline',
          explanation:
            'Essa é a sequência que você vai repetir no dia a dia, só que sem o `init`: editar, `status`, `add`, `commit`. O `init` acontece uma vez por projeto.',
        },
      ],
    },
    {
      id: 'bons-commits',
      title: 'Commits pequenos, mensagens úteis',
      blocks: [
        {
          type: 'text',
          text: 'Um bom commit faz **uma coisa só** e diz qual coisa é. Daqui a três meses, você ou outra pessoa vai ler o histórico procurando quando algo quebrou. Mensagens como “ajustes” não ajudam ninguém.',
        },
        {
          type: 'text',
          text: 'Uma regra prática: a mensagem completa a frase “Este commit vai...”. “Adiciona formulário de contato” funciona. “Mexi em umas coisas” não funciona.',
        },
        {
          type: 'classify',
          prompt: 'Quais mensagens de commit ajudam quem lê o histórico depois?',
          buckets: ['Mensagem útil', 'Mensagem ruim'],
          items: [
            { text: '`Adiciona formulário de contato na página inicial`', bucket: 0 },
            { text: '`Corrige link quebrado do cardápio`', bucket: 0 },
            { text: '`Aumenta contraste do texto do rodapé`', bucket: 0 },
            { text: '`Remove imagem duplicada da galeria`', bucket: 0 },
            { text: '`ajustes`', bucket: 1 },
            { text: '`agora vai`', bucket: 1 },
            { text: '`asdfgh`', bucket: 1 },
            {
              text: '`Muda cores, cria página sobre, corrige formulário e troca fonte`',
              bucket: 1,
            },
          ],
          explanation:
            'A última mensagem até é descritiva, mas mostra um commit grande demais: quatro mudanças juntas. Se uma delas quebrar algo, fica difícil desfazer só aquela. Prefira quatro commits pequenos.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Nunca faça commit de senhas e chaves',
          text: 'O histórico guarda tudo para sempre, e repositórios públicos são lidos por robôs que caçam senhas. Mesmo que você apague o arquivo depois, ele continua nos commits antigos. Guarde segredos num arquivo `.env` e coloque o nome dele no `.gitignore`, um arquivo que lista o que o Git deve ignorar.',
        },
        {
          type: 'code',
          language: 'gitignore',
          caption: 'Um `.gitignore` simples, na raiz do projeto',
          code: '# Segredos: nunca vão para o repositório\n.env\n\n# Pastas geradas por ferramentas\nnode_modules/\ndist/\n\n# Arquivos do sistema\n.DS_Store',
        },
        {
          type: 'reveal',
          question:
            'Você fez commit de uma senha, percebeu e apagou o arquivo num commit seguinte. Está resolvido?',
          answer:
            'Não. A senha continua visível em qualquer commit antigo, e se já houve `push`, pode ter sido copiada. O certo é trocar a senha imediatamente e considerar a antiga perdida. Por isso o `.gitignore` vem **antes** do primeiro commit.',
        },
      ],
    },
    {
      id: 'branches-e-conflitos',
      title: 'Branches, merge e conflitos',
      blocks: [
        {
          type: 'analogy',
          title: 'Um rascunho paralelo',
          text: 'Imagine que você quer testar outra versão de uma redação sem estragar a que já está boa. Você tira uma cópia, rabisca à vontade e, se gostar, passa as melhorias para a versão oficial. Uma **branch** (ramo) é essa cópia paralela do projeto, só que sem duplicar arquivos.',
        },
        {
          type: 'text',
          text: 'A branch principal se chama `main`. Para cada tarefa nova você cria uma branch, faz seus commits nela e, no fim, junta tudo de volta na `main`. Juntar uma branch na outra se chama **merge** (mesclar).',
        },
        {
          type: 'code',
          language: 'bash',
          caption: 'Criar uma branch, trabalhar nela e juntar na main',
          code: '# cria a branch e já entra nela\ngit switch -c titulo-novo\n\n# edita, depois:\ngit add index.html\ngit commit -m "Troca título da página inicial"\n\n# volta para a main e junta as mudanças\ngit switch main\ngit merge titulo-novo',
        },
        {
          type: 'text',
          text: 'Na maioria das vezes o Git junta tudo sozinho. Mas se as duas branches mudaram **a mesma linha** de jeitos diferentes, ele não sabe qual escolher e para tudo para perguntar a você. Isso é um **conflito**. Não é um erro grave: é o Git sendo cuidadoso.',
        },
        {
          type: 'anatomy',
          caption: 'Como um conflito aparece dentro do arquivo',
          language: 'html',
          parts: [
            { text: '<h1>\n' },
            {
              text: '<<<<<<< HEAD',
              label: 'Início do conflito',
              note: 'Daqui até a divisória está a versão da branch onde você está agora. `HEAD` é o nome que o Git dá para “onde você está”, nesse caso a `main`.',
            },
            { text: '\n' },
            {
              text: 'Padaria Pão Quente',
              label: 'A sua versão',
              note: 'O conteúdo que já estava na `main`.',
            },
            { text: '\n' },
            {
              text: '=======',
              label: 'Divisória',
              note: 'Separa as duas versões. Acima, a sua; abaixo, a que está chegando.',
            },
            { text: '\n' },
            {
              text: 'Padaria Pão Quente: desde 1998',
              label: 'A versão que está chegando',
              note: 'O conteúdo da branch que você pediu para juntar.',
            },
            { text: '\n' },
            {
              text: '>>>>>>> titulo-novo',
              label: 'Fim do conflito',
              note: 'Marca o fim do trecho em disputa, com o nome da branch de onde veio a outra versão.',
            },
            { text: '\n</h1>' },
          ],
        },
        {
          type: 'text',
          text: 'Para resolver, você edita o arquivo e deixa o texto do jeito final: pode ficar com uma versão, com a outra ou misturar as duas. Depois **apaga as três linhas de marcação**, salva, roda `git add` no arquivo e faz um commit. O VS Code mostra botões para ajudar nessa escolha.',
        },
        {
          type: 'quiz',
          question:
            'Você resolveu o conflito escolhendo o título “Padaria Pão Quente: desde 1998”. Como o trecho deve ficar antes do commit?',
          options: [
            {
              text: 'Só `<h1>Padaria Pão Quente: desde 1998</h1>`, sem nenhuma linha de marcação',
              correct: true,
              feedback:
                'Isso. O arquivo deve ficar exatamente como você quer que ele seja. As marcações são só um aviso do Git e precisam sair.',
            },
            {
              text: 'As duas versões, mantendo `=======` entre elas',
              feedback:
                'Se a divisória ficar, ela vai aparecer na página como texto. Todas as marcas `<<<<<<<`, `=======` e `>>>>>>>` precisam ser apagadas.',
            },
            {
              text: 'Basta rodar `git commit`; o Git escolhe a versão mais nova',
              feedback:
                'O Git não escolhe por você em um conflito. Se você fizer commit sem editar, as marcações vão junto para o histórico.',
            },
            {
              text: 'É preciso apagar a branch `titulo-novo` e começar de novo',
              feedback:
                'Não precisa jogar trabalho fora. Conflitos são normais quando várias pessoas trabalham juntas, e resolver é editar o arquivo.',
            },
          ],
        },
      ],
    },
    {
      id: 'github-e-pull-request',
      title: 'GitHub e o pull request',
      blocks: [
        {
          type: 'text',
          text: 'Até aqui tudo ficou no seu computador. Para ter um backup, mostrar seu trabalho em entrevistas e colaborar, você envia o repositório para o **GitHub**. Crie uma conta gratuita em `github.com` e um repositório novo e vazio por lá.',
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Ligue seu repositório ao GitHub',
              text: 'O GitHub mostra esse endereço quando você cria o repositório. `origin` é o apelido padrão do remoto.',
              code: 'git remote add origin https://github.com/seu-usuario/meu-site.git',
            },
            {
              title: 'Envie a branch main',
              text: 'O `-u` faz o Git lembrar desse caminho; das próximas vezes, basta `git push`. Na primeira vez, o GitHub vai pedir para você entrar na sua conta.',
              code: 'git push -u origin main',
            },
            {
              title: 'Escreva um README',
              text: 'Um arquivo `README.md` na raiz aparece como a capa do repositório. Explique o que é o projeto e como abrir.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Em equipes, ninguém faz merge direto na `main`. Você envia sua branch e abre um **pull request** (PR): um pedido para juntar suas mudanças, com uma página onde outras pessoas veem cada linha alterada e comentam antes de aprovar.',
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem o caminho de uma mudança até a main, usando pull request.',
          items: [
            'Criar uma branch com `git switch -c`',
            'Fazer commits pequenos na branch',
            'Enviar a branch com `git push -u origin nome-da-branch`',
            'Abrir o pull request no GitHub, explicando o que mudou e por quê',
            'Receber a revisão e ajustar com novos commits',
            'Fazer o merge do pull request na main',
          ],
          explanation:
            'Esse é o fluxo de quase toda empresa. Treinar com seus projetos pessoais, mesmo sozinho, deixa você pronto para o primeiro dia.',
        },
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              label: 'Quem pede revisão',
              title: 'Facilite a vida de quem lê',
              text: 'PRs pequenos são revisados mais rápido e com mais atenção.',
              points: [
                'Explique o que mudou e por quê',
                'Inclua prints quando a mudança é visual',
                'Releia o próprio diff antes de pedir revisão',
              ],
            },
            {
              label: 'Quem revisa',
              title: 'Comente o código, não a pessoa',
              text: 'Revisão é colaboração, não prova. Todo mundo, inclusive gente experiente, recebe sugestões.',
              points: [
                'Faça perguntas em vez de ordens',
                'Diga o motivo de cada sugestão',
                'Elogie o que ficou bom',
              ],
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Num pull request, alguém comenta: “Essa função ficou difícil de ler, que tal dividir em duas?”. Qual a melhor reação?',
          options: [
            {
              text: 'Avaliar a sugestão, responder e, se fizer sentido, ajustar com um novo commit na mesma branch',
              correct: true,
              feedback:
                'Isso. Novos commits na branch aparecem automaticamente no PR. Se discordar, explique seu motivo: a conversa faz parte da revisão.',
            },
            {
              text: 'Fechar o PR e abrir outro do zero',
              feedback:
                'Não precisa. O PR acompanha a branch, então basta continuar fazendo commits nela.',
            },
            {
              text: 'Entender o comentário como crítica pessoal e ignorar',
              feedback:
                'Comentários de revisão são sobre o código, não sobre você. Receber sugestões é a forma mais rápida de aprender com quem tem mais experiência.',
            },
          ],
        },
      ],
    },
  ],
  recap: [
    'O Git guarda o histórico do projeto em **commits**, pontos de salvamento com mensagem; o GitHub guarda uma cópia na internet.',
    'Uma mudança passa pela **pasta de trabalho**, vai para o **staging** com `git add` e entra no **histórico** com `git commit`.',
    'Bons commits são pequenos e têm mensagens que dizem o que fazem; senhas e o arquivo `.env` ficam no `.gitignore`.',
    'Branches são linhas de trabalho paralelas; um **conflito** acontece quando duas mudam a mesma linha e se resolve editando o arquivo e apagando as marcações.',
    'Com `git push` você envia commits ao GitHub e, num **pull request**, pede revisão antes de juntar na `main`.',
  ],
  cards: [
    {
      id: 'git-vs-github',
      front: 'Qual a diferença entre Git e GitHub?',
      back: 'Git é o programa que registra o histórico no seu computador. GitHub é um site que guarda cópias de repositórios na internet.',
    },
    {
      id: 'tres-areas',
      front: 'Quais são as três áreas locais do Git?',
      back: 'Pasta de trabalho, staging (área de preparação) e histórico (os commits do repositório).',
    },
    {
      id: 'add-commit',
      front: 'O que fazem `git add` e `git commit`?',
      back: '`git add` coloca mudanças no staging. `git commit` guarda o que está no staging como um ponto do histórico.',
    },
    {
      id: 'push-pull',
      front: 'O que fazem `git push` e `git pull`?',
      back: '`push` envia seus commits para o remoto, como o GitHub. `pull` traz os commits do remoto e atualiza sua pasta.',
    },
    {
      id: 'conflito',
      front: 'Quando acontece um conflito de merge?',
      back: 'Quando duas branches mudaram a mesma linha de jeitos diferentes e o Git não sabe qual versão manter.',
    },
    {
      id: 'resolver-conflito',
      front: 'Como resolver um conflito?',
      back: 'Editar o arquivo até o texto final, apagar `<<<<<<<`, `=======` e `>>>>>>>`, rodar `git add` e fazer commit.',
    },
    {
      id: 'gitignore',
      front: 'Para que serve o `.gitignore`?',
      back: 'Listar arquivos que o Git deve ignorar, como o `.env` com segredos e pastas geradas.',
    },
    {
      id: 'pull-request',
      front: 'O que é um pull request?',
      back: 'Um pedido para juntar uma branch em outra, com espaço para revisão e comentários antes do merge.',
    },
  ],
  mission: {
    title: 'Seu primeiro repositório público',
    text: 'Coloque a pasta `meu-site` da aula anterior no Git e no GitHub, e pratique o fluxo completo de uma equipe, incluindo um conflito de propósito. Se algo der errado, `git status` é sempre o primeiro passo.',
    steps: [
      'Transforme a pasta num repositório, crie um `.gitignore` com `.env` e um `README.md` explicando o projeto, e faça o primeiro commit',
      'Crie o repositório no GitHub e envie a `main` com `git push -u origin main`',
      'Crie uma branch, faça dois commits pequenos com mensagens claras, envie e abra um pull request',
      'Crie uma branch de exercício que mude o título da página e, na `main`, mude o mesmo título de outro jeito; faça o merge e resolva o conflito',
      'Peça a uma IA para explicar o diff do seu pull request e confira a explicação comparando com `git log` e com a aba de arquivos alterados do PR',
    ],
  },
  sources: [
    {
      title: 'Pro Git, o livro oficial em português',
      url: 'https://git-scm.com/book/pt-br/v2',
    },
    {
      title: 'GitHub Docs: sobre pull requests',
      url: 'https://docs.github.com/pt/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests',
    },
    {
      title: 'GitHub Docs: resolver um conflito de merge pela linha de comando',
      url: 'https://docs.github.com/pt/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line',
    },
    {
      title: 'GitHub Docs: ignorar arquivos',
      url: 'https://docs.github.com/pt/get-started/getting-started-with-git/ignoring-files',
    },
  ],
};
