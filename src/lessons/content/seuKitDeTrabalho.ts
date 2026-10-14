import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Uma cozinheira não começa um bolo sem saber onde estão o forno, a batedeira e as colheres. Quem programa também tem um kit: o navegador, as ferramentas de desenvolvimento, o editor de código e o terminal. São quatro programas gratuitos, e nesta aula você vai criar seu primeiro arquivo de site e escrever sua primeira linha de código com eles.',
  sections: [
    {
      id: 'navegador',
      title: 'O navegador: quem lê e desenha',
      blocks: [
        {
          type: 'analogy',
          title: 'O navegador é quem lê a receita em voz alta e cozinha',
          text: 'Uma receita escrita é só texto: “bata três ovos, junte o açúcar”. Alguém precisa ler e transformar aquilo em bolo. O navegador faz isso com os arquivos de um site: lê instruções escritas em texto e **desenha** a página que você vê.',
        },
        {
          type: 'text',
          text: 'Na aula anterior você viu que o navegador é o **cliente**: ele pede arquivos ao servidor. Agora vem a outra metade do trabalho dele. Com os arquivos em mãos, ele monta a estrutura, aplica cores e tamanhos, roda os comportamentos e pinta tudo na tela.',
        },
        {
          type: 'text',
          text: 'Chrome, Edge, Firefox e Safari são navegadores. Qualquer um serve para estudar. Nesta trilha os exemplos usam nomes do Chrome, mas os outros têm as mesmas ferramentas com nomes parecidos.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Sem computador próprio?',
          text: 'Dá para começar. Telecentros, bibliotecas públicas, escolas e ONGs costumam ter computadores com internet. Em qualquer computador emprestado, editores online como **CodePen** e **StackBlitz** funcionam direto no navegador, sem instalar nada. Só com o celular, você consegue ler e fazer as atividades destas aulas; para criar projetos de verdade, um computador faz muita falta, então vale procurar um desses espaços.',
        },
        {
          type: 'quiz',
          question:
            'Você recebe um arquivo `index.html` por e-mail e dá dois cliques nele. Que programa mostra a página?',
          options: [
            {
              text: 'O navegador',
              correct: true,
              feedback:
                'Isso. O navegador sabe ler HTML e transformar em página, mesmo quando o arquivo está no seu computador e não num servidor.',
            },
            {
              text: 'O editor de código',
              feedback:
                'O editor serve para **escrever** o arquivo. Ele mostra o texto cru, com as instruções, não a página desenhada.',
            },
            {
              text: 'O terminal',
              feedback:
                'O terminal serve para dar ordens ao computador por texto. Ele não desenha páginas.',
            },
            {
              text: 'Precisa de internet para abrir',
              feedback:
                'Não precisa. O arquivo já está no seu computador; o navegador abre direto dele. A internet só entra em cena quando a página pede algo de fora.',
            },
          ],
        },
      ],
    },
    {
      id: 'devtools',
      title: 'As ferramentas de desenvolvimento',
      blocks: [
        {
          type: 'text',
          text: 'Todo navegador de computador esconde um painel para quem constrói sites: as **ferramentas de desenvolvimento**, ou **DevTools**. Elas mostram por dentro a página que está aberta. Você já usou uma delas, o painel Network, na aula anterior.',
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Abra qualquer site no computador',
              text: 'Pode ser o site de notícias que você costuma ler.',
            },
            {
              title: 'Pressione F12',
              text: 'Ou `Ctrl` + `Shift` + `I` no Windows e no Linux, `Cmd` + `Option` + `I` no Mac. Também funciona clicar com o botão direito em qualquer ponto e escolher **Inspecionar**.',
            },
            {
              title: 'Repare nas abas no topo do painel',
              text: 'As três que você vai usar o tempo todo são Elements, Console e Network. Em português podem aparecer como Elementos, Console e Rede.',
            },
          ],
        },
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              label: 'Elements',
              title: 'A estrutura da página',
              text: 'Mostra todos os pedaços da página, como títulos, imagens e botões, e os estilos de cada um. Dá para mudar textos e cores para testar.',
            },
            {
              label: 'Console',
              title: 'A conversa com o código',
              text: 'Mostra mensagens e erros do código da página. Também aceita que você digite comandos em JavaScript e veja o resultado na hora.',
            },
            {
              label: 'Network',
              title: 'Os pedidos ao servidor',
              text: 'Lista cada arquivo que a página pediu, com status e tamanho. É onde você descobre o que não chegou.',
            },
          ],
        },
        {
          type: 'reveal',
          question:
            'Você abre o painel Elements, troca o título de um site famoso para o seu nome e recarrega a página. O que acontece?',
          answer:
            'O título original volta. Mudanças no DevTools acontecem só na cópia que está no **seu** navegador, e somem ao recarregar. Ninguém mais vê. Isso é ótimo para testar sem medo, mas lembre: para mudar de verdade, você precisa editar os arquivos do site.',
        },
        {
          type: 'text',
          text: 'Agora a parte especial: sua primeira linha de código. Em JavaScript, a linguagem que dá comportamento às páginas, o comando `console.log()` escreve uma mensagem no Console. O que vai entre aspas é o texto da mensagem.',
        },
        {
          type: 'playground',
          title: 'Sua primeira linha de código',
          task: "Escreva `console.log('Olá, mundo')` no editor e veja a mensagem aparecer no Console ao lado. Os parênteses e as aspas fazem parte do comando. Depois, experimente trocar o texto pelo seu nome.",
          js: '// Esta linha começa com // e é um comentário: o computador ignora.\n// Escreva seu comando na linha de baixo.\n',
          checks: [
            {
              label: 'Uma mensagem aparece no Console',
              test: 'return (window.__trilhaLogs || []).length > 0;',
            },
            {
              label: 'A mensagem diz Olá, mundo',
              test: "return (window.__trilhaLogs || []).some((line) => { const t = String(line).toLowerCase().replace(/[^a-zá]/g, ''); return t === 'olámundo' || t === 'olamundo'; });",
            },
          ],
          solution: {
            js: "// Esta linha começa com // e é um comentário: o computador ignora.\n// Escreva seu comando na linha de baixo.\nconsole.log('Olá, mundo');\n",
          },
        },
        {
          type: 'quiz',
          question:
            'Você quer ver como ficaria o título de uma página em outra cor, só para testar, sem mexer em nenhum arquivo. Qual aba do DevTools usar?',
          options: [
            {
              text: 'Elements',
              correct: true,
              feedback:
                'Isso. Em Elements você seleciona o título e muda o estilo dele na hora. Ao recarregar, tudo volta ao normal.',
            },
            {
              text: 'Console',
              feedback:
                'O Console mostra mensagens e roda comandos. Até daria para mudar a cor por lá com código, mas o caminho natural para mexer em estrutura e estilo é Elements.',
            },
            {
              text: 'Network',
              feedback:
                'Network mostra os pedidos de arquivos ao servidor. Ele não permite editar o que está na tela.',
            },
          ],
        },
      ],
    },
    {
      id: 'editor-arquivos',
      title: 'Editor de código, arquivos e pastas',
      blocks: [
        {
          type: 'analogy',
          title: 'Pastas são gavetas, arquivos são folhas',
          text: 'Pense num arquivo de aço de escritório. Cada **pasta** é uma gaveta com um nome, e pode ter gavetas menores dentro. Cada **arquivo** é uma folha guardada ali. Um site é uma gaveta com algumas folhas: uma com a estrutura, uma com o visual, uma com o comportamento.',
        },
        {
          type: 'text',
          text: 'O nome de todo arquivo termina com uma **extensão**: o pedaço depois do último ponto, como `.html` em `index.html`. A extensão funciona como um sobrenome, avisando ao computador que tipo de conteúdo está ali.',
        },
        {
          type: 'terms',
          items: [
            {
              term: '.html',
              text: 'A estrutura e o conteúdo da página: títulos, textos, imagens, links. O arquivo principal de um site costuma se chamar `index.html`.',
            },
            {
              term: '.css',
              text: 'A aparência: cores, tamanhos, fontes, espaços e a posição de cada coisa.',
            },
            {
              term: '.js',
              text: 'O comportamento, escrito em JavaScript: o que acontece quando alguém clica, digita ou envia um formulário.',
            },
            {
              term: 'Editor de código',
              text: 'Um programa para escrever esses arquivos. Ele colore o código, completa palavras e aponta erros. O mais usado é o **VS Code** (Visual Studio Code), gratuito para Windows, Mac e Linux.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Word e Bloco de Notas não são editores de código',
          text: 'O Word guarda formatação escondida dentro do arquivo, e isso estraga o código. O Bloco de Notas às vezes salva como `index.html.txt` sem avisar. Use o VS Code e, no Windows, ative a opção do Explorador de Arquivos que mostra as extensões, para enxergar o nome completo.',
        },
        {
          type: 'classify',
          prompt: 'Que tipo de conteúdo cada arquivo provavelmente guarda?',
          buckets: [
            'Estrutura (HTML)',
            'Aparência (CSS)',
            'Comportamento (JS)',
            'Não é código de site',
          ],
          items: [
            { text: '`index.html`', bucket: 0 },
            { text: '`contato.html`', bucket: 0 },
            { text: '`estilo.css`', bucket: 1 },
            { text: '`menu.js`', bucket: 2 },
            { text: '`curriculo.docx`', bucket: 3 },
            { text: '`foto-perfil.jpg`', bucket: 3 },
          ],
          explanation:
            'A imagem faz parte do site, mas não é código: ela é um arquivo que o HTML aponta. Já o `.docx` é um documento do Word e não entra num site.',
        },
      ],
    },
    {
      id: 'primeiro-arquivo',
      title: 'Seu primeiro index.html',
      blocks: [
        {
          type: 'text',
          text: 'Hora de juntar navegador e editor. Você vai criar uma pasta para o projeto, um arquivo dentro dela e ver o resultado no navegador. Esse ciclo de **editar, salvar e recarregar** é o que você vai repetir milhares de vezes.',
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Instale o VS Code',
              text: 'Baixe no site oficial, `code.visualstudio.com`. É gratuito. Se estiver num computador público sem permissão para instalar, use o CodePen no navegador e pule para o passo de escrever o código.',
            },
            {
              title: 'Crie uma pasta para o projeto',
              text: 'Em Documentos, crie uma pasta chamada `meu-site`. Use letras minúsculas, sem espaços e sem acentos: alguns programas se confundem com nomes como `Meu Site Ção`.',
            },
            {
              title: 'Abra a pasta no VS Code',
              text: 'No menu **File** (Arquivo), escolha **Open Folder** (Abrir pasta) e selecione `meu-site`. A pasta aparece na barra lateral.',
            },
            {
              title: 'Crie o arquivo index.html',
              text: 'Na barra lateral, clique no ícone de novo arquivo e digite `index.html`. O nome precisa ter a extensão.',
            },
            {
              title: 'Escreva e salve',
              text: 'Digite o código abaixo e salve com `Ctrl` + `S` (no Mac, `Cmd` + `S`). Uma bolinha na aba do arquivo indica que ainda há mudanças sem salvar.',
              code: '<h1>Olá! Este é o meu primeiro site.</h1>\n<p>Estou aprendendo a programar.</p>',
            },
            {
              title: 'Abra no navegador',
              text: 'Vá até a pasta no computador e dê dois cliques em `index.html`, ou arraste o arquivo para uma janela do navegador.',
            },
            {
              title: 'Edite e recarregue',
              text: 'Troque o texto no editor, salve e, no navegador, aperte `F5` (no Mac, `Cmd` + `R`). A página mostra a mudança.',
            },
          ],
        },
        {
          type: 'table',
          caption: 'Atalhos de teclado que economizam horas',
          head: ['Ação', 'Windows e Linux', 'Mac'],
          rows: [
            ['Salvar o arquivo', '`Ctrl` + `S`', '`Cmd` + `S`'],
            ['Desfazer', '`Ctrl` + `Z`', '`Cmd` + `Z`'],
            ['Recarregar a página', '`F5` ou `Ctrl` + `R`', '`Cmd` + `R`'],
            ['Abrir o DevTools', '`F12` ou `Ctrl` + `Shift` + `I`', '`Cmd` + `Option` + `I`'],
            ['Trocar de janela', '`Alt` + `Tab`', '`Cmd` + `Tab`'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Os tropeços mais comuns',
          text: '“Mudei e nada aconteceu” quase sempre é arquivo **não salvo** ou página **não recarregada**. Confira a bolinha na aba do editor e aperte `F5`. Se a página nem abre, veja se o arquivo não ficou com o nome `index.html.txt`.',
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem o caminho do zero até ver uma mudança na sua página.',
          items: [
            'Criar a pasta `meu-site`',
            'Abrir a pasta no VS Code',
            'Criar o arquivo `index.html`',
            'Escrever o código e salvar com `Ctrl` + `S`',
            'Abrir o arquivo no navegador',
            'Editar, salvar de novo e recarregar com `F5`',
          ],
          explanation:
            'Os dois últimos passos viram um ciclo: editar, salvar, recarregar. Com o tempo você faz isso sem pensar.',
        },
      ],
    },
    {
      id: 'terminal',
      title: 'O terminal: conversar com o computador por texto',
      blocks: [
        {
          type: 'analogy',
          title: 'Apontar ou falar',
          text: 'Numa padaria, você pode apontar para o pão na vitrine ou dizer “seis pães franceses, por favor”. O mouse é apontar. O **terminal** é falar: você escreve uma ordem e o computador responde em texto. Muitas ferramentas de programação, como o Git da próxima aula, só aceitam esse jeito.',
        },
        {
          type: 'text',
          text: 'O terminal é uma janela onde você digita **comandos** e aperta `Enter`. No Mac e no Linux, procure o aplicativo **Terminal**. No Windows, use o **Terminal** ou o **PowerShell**. O VS Code também tem um terminal embutido, no menu **Terminal**.',
        },
        {
          type: 'text',
          text: 'O terminal está sempre “dentro” de alguma pasta, como se você estivesse parado numa gaveta. Os primeiros comandos servem para saber onde você está e se mover entre pastas.',
        },
        {
          type: 'table',
          caption: 'Os quatro comandos para se localizar',
          head: ['Comando', 'O que faz', 'No Prompt de Comando antigo do Windows'],
          rows: [
            [
              '`pwd`',
              'Mostra em que pasta você está agora (o caminho completo)',
              '`cd` sem nada depois',
            ],
            ['`ls`', 'Lista o que existe dentro da pasta atual', '`dir`'],
            ['`cd nome-da-pasta`', 'Entra numa pasta. `cd ..` volta para a pasta de cima', 'Igual'],
            ['`mkdir nome`', 'Cria uma pasta nova', 'Igual'],
          ],
        },
        {
          type: 'code',
          language: 'bash',
          caption:
            'Uma conversa de verdade com o terminal. O `$` só marca onde você digita; ele não faz parte do comando.',
          code: '$ pwd\n/home/ana\n$ ls\nDocumentos  Downloads  Imagens\n$ cd Documentos\n$ mkdir meu-site\n$ cd meu-site\n$ pwd\n/home/ana/Documentos/meu-site',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Dois atalhos do terminal',
          text: 'Digite o começo do nome de uma pasta e aperte `Tab`: o terminal completa o resto. A seta para cima traz de volta o último comando, para você não precisar digitar tudo de novo.',
        },
        {
          type: 'fill',
          prompt:
            'Complete os comandos para descobrir onde você está, ver o que tem na pasta, entrar em Documentos, criar a pasta do projeto e entrar nela.',
          language: 'bash',
          template:
            '# Onde eu estou?\n$ [[pwd]]\n/home/ana\n# O que tem aqui?\n$ [[ls|dir]]\nDocumentos  Downloads  Imagens\n# Entrar na pasta Documentos\n$ [[cd]] Documentos\n# Criar a pasta do projeto\n$ [[mkdir]] meu-site\n# Entrar nela\n$ cd [[meu-site]]',
          explanation:
            'Com esses quatro comandos você já anda pelo computador inteiro sem mouse. As linhas que começam com `#` são comentários: explicações para quem lê.',
        },
        {
          type: 'quiz',
          question:
            'Você está em `/home/ana/Documentos/meu-site` e digita `cd ..`. Onde você vai parar?',
          options: [
            {
              text: '`/home/ana/Documentos`',
              correct: true,
              feedback:
                'Isso. Os dois pontos significam “a pasta de cima”, a que contém a pasta atual. É como sair de uma gaveta menor para a gaveta que a guarda.',
            },
            {
              text: '`/home/ana`',
              feedback:
                'Assim você subiria dois níveis. Cada `..` sobe só um. Para chegar em `/home/ana` seria `cd ../..`.',
            },
            {
              text: 'Numa pasta chamada `..`',
              feedback:
                '`..` não é o nome de uma pasta comum: é um apelido reservado para a pasta de cima, que existe em todo lugar.',
            },
            {
              text: 'A pasta `meu-site` é apagada',
              feedback:
                '`cd` só muda o lugar onde você está, nunca apaga nada. Pode explorar sem medo.',
            },
          ],
        },
      ],
    },
  ],
  recap: [
    'O **navegador** lê os arquivos do site e desenha a página; o **DevTools** mostra a página por dentro.',
    'No DevTools, **Elements** mostra a estrutura, **Console** mostra mensagens e roda código, e **Network** lista os pedidos.',
    'Um site é uma pasta com arquivos `.html`, `.css` e `.js`, escritos num **editor de código** como o VS Code.',
    'O ciclo de trabalho é editar, salvar com `Ctrl` + `S` e recarregar com `F5`.',
    'No **terminal**, `pwd` diz onde você está, `ls` lista, `cd` entra numa pasta e `mkdir` cria uma.',
  ],
  cards: [
    {
      id: 'abrir-devtools',
      front: 'Como abrir as ferramentas de desenvolvimento do navegador?',
      back: '`F12`, ou `Ctrl` + `Shift` + `I` (no Mac, `Cmd` + `Option` + `I`), ou botão direito e Inspecionar.',
    },
    {
      id: 'abas-devtools',
      front: 'Para que servem as abas Elements, Console e Network?',
      back: 'Elements: estrutura e estilos. Console: mensagens e comandos. Network: pedidos de arquivos ao servidor.',
    },
    {
      id: 'console-log',
      front: 'O que faz `console.log()`?',
      back: 'Escreve no Console o valor que você colocar entre os parênteses.',
    },
    {
      id: 'extensoes',
      front: 'O que cada extensão guarda: `.html`, `.css` e `.js`?',
      back: 'HTML: estrutura e conteúdo. CSS: aparência. JS: comportamento.',
    },
    {
      id: 'mudanca-nao-aparece',
      front: 'Mudei o arquivo e a página não mudou. O que conferir primeiro?',
      back: 'Se o arquivo foi salvo e se a página foi recarregada.',
    },
    {
      id: 'pwd-ls',
      front: 'No terminal, o que fazem `pwd` e `ls`?',
      back: '`pwd` mostra a pasta atual. `ls` lista o que tem dentro dela (`dir` no Prompt de Comando).',
    },
    {
      id: 'cd-ponto-ponto',
      front: 'O que significa `cd ..`?',
      back: 'Voltar para a pasta de cima, a que contém a pasta atual.',
    },
  ],
  mission: {
    title: 'Monte sua bancada',
    text: 'Deixe o kit pronto no computador que você vai usar para estudar, seja o seu, o da escola ou o de um telecentro. Se não puder instalar nada, faça os passos de editor no CodePen.',
    steps: [
      'Instale o VS Code e crie a pasta `meu-site` com um arquivo `index.html` contendo um título e um parágrafo',
      'Abra o arquivo no navegador, mude o texto, salve e recarregue até ver a mudança',
      'Abra o DevTools nessa página, digite `console.log("Estou programando")` no Console e aperte `Enter`',
      'Abra o terminal, use `pwd`, `ls` e `cd` até chegar dentro da pasta `meu-site` e confirme com `ls` que o `index.html` está lá',
      'Crie pelo terminal, com `mkdir`, uma pasta `imagens` dentro do projeto e veja ela aparecer no VS Code',
    ],
  },
  sources: [
    {
      title: 'MDN: Instalando os programas básicos',
      url: 'https://developer.mozilla.org/pt-BR/docs/Learn/Getting_started_with_the_web/Installing_basic_software',
    },
    {
      title: 'MDN: Lidando com arquivos',
      url: 'https://developer.mozilla.org/pt-BR/docs/Learn/Getting_started_with_the_web/Dealing_with_files',
    },
    {
      title: 'Chrome DevTools: visão geral',
      url: 'https://developer.chrome.com/docs/devtools',
    },
    {
      title: 'Documentação do Visual Studio Code',
      url: 'https://code.visualstudio.com/docs',
    },
  ],
};
