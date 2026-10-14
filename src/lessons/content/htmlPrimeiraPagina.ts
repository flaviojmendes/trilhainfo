import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Todo site que você já visitou, do aplicativo do banco ao cardápio online da pizzaria, começa com um arquivo HTML. É a primeira coisa que o navegador recebe e a base sobre a qual todo o resto se apoia. Nesta aula você vai entender como ele é escrito e terminar com uma página de perfil feita por você.',
  sections: [
    {
      id: 'estrutura-e-significado',
      title: 'HTML é estrutura, não aparência',
      blocks: [
        {
          type: 'analogy',
          title: 'Uma receita de bolo bem organizada',
          text: 'Uma receita tem partes que você reconhece de longe: o nome do bolo, a lista de ingredientes, o modo de preparo em passos. Mesmo escrita à mão, sem nenhum enfeite, dá para entender o que é cada coisa. O **HTML** faz isso com o conteúdo de uma página: diz o que é título, o que é lista, o que é parágrafo.',
        },
        {
          type: 'text',
          text: 'HTML quer dizer **HyperText Markup Language**, linguagem de marcação de hipertexto. “Marcação” porque você marca cada pedaço do texto com o papel dele. “Hipertexto” porque textos podem ter links que levam a outros textos.',
        },
        {
          type: 'text',
          text: 'O HTML não decide cores, tamanhos nem posições. Isso é trabalho do CSS, assunto das próximas aulas. Uma boa página em HTML faz sentido mesmo sem nenhum estilo, e é assim que leitores de tela, buscadores como o Google e tradutores automáticos a leem.',
        },
        {
          type: 'quiz',
          question:
            'Você quer que uma frase apareça bem grande na página, mas ela não é o título de nada. O que fazer?',
          options: [
            {
              text: 'Marcar como parágrafo e deixar o tamanho para o CSS',
              correct: true,
              feedback:
                'Isso. A tag diz o que o conteúdo **é**. O tamanho é aparência, e aparência fica no CSS.',
            },
            {
              text: 'Marcar como título principal, porque ele já aparece grande',
              feedback:
                'Esse é um dos erros mais comuns. O navegador mostra títulos grandes por padrão, mas o papel da tag é dizer que aquilo é um título. Leitores de tela e o Google vão tratar a frase como título da página.',
            },
            {
              text: 'Não tem como: HTML só faz texto pequeno',
              feedback:
                'Tem como, mas com CSS. O HTML descreve o conteúdo; o CSS cuida de como ele aparece, incluindo o tamanho.',
            },
          ],
        },
      ],
    },
    {
      id: 'anatomia-do-elemento',
      title: 'Anatomia de um elemento',
      blocks: [
        {
          type: 'text',
          text: 'Você marca o conteúdo com **tags**: palavras entre os sinais `<` e `>`. A maioria vem em par, uma abrindo e outra fechando, com o conteúdo no meio. O conjunto inteiro, da abertura ao fechamento, é um **elemento**.',
        },
        {
          type: 'anatomy',
          caption: 'Um link, peça por peça.',
          language: 'html',
          parts: [
            {
              text: '<a',
              label: 'Tag de abertura',
              note: 'Começa o elemento e diz qual é: `a` vem de “âncora”, o nome histórico do link. A tag de abertura vai do `<` até o `>`.',
            },
            { text: ' ' },
            {
              text: 'href',
              label: 'Atributo',
              note: 'Uma informação extra sobre o elemento, sempre dentro da tag de abertura. `href` diz para onde o link leva. Um elemento pode ter vários atributos, separados por espaço.',
            },
            { text: '="' },
            {
              text: 'https://www.ibge.gov.br',
              label: 'Valor do atributo',
              note: 'O conteúdo do atributo, entre aspas. Aqui é o endereço de destino. As aspas podem ser duplas ou simples, mas use sempre o mesmo par.',
            },
            { text: '">' },
            {
              text: 'Site do IBGE',
              label: 'Conteúdo',
              note: 'O que aparece na tela e o que a pessoa clica. Um bom texto de link diz para onde ele leva, em vez de “clique aqui”.',
            },
            {
              text: '</a>',
              label: 'Tag de fechamento',
              note: 'Igual à de abertura, mas com uma barra `/` antes do nome. Ela avisa onde o elemento termina. Atributos nunca vão aqui.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Alguns elementos não têm conteúdo e, por isso, não têm tag de fechamento. São os **elementos vazios**. Os mais comuns são `<img>`, que mostra uma imagem, e `<br>`, que quebra a linha.',
        },
        {
          type: 'code',
          language: 'html',
          caption: 'Uma imagem: tudo o que ela precisa está nos atributos',
          code: '<img src="padaria.jpg" alt="Fachada amarela da Padaria Pão Quente">',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'src',
              text: 'De source, fonte: o endereço do arquivo da imagem.',
            },
            {
              term: 'alt',
              text: 'De alternativo: um texto que descreve a imagem para quem não consegue vê-la, por exemplo, quem usa leitor de tela ou quando a imagem não carrega.',
            },
          ],
        },
        {
          type: 'quiz',
          question: 'Em `<p class="aviso">Loja fechada no feriado</p>`, o que é `class="aviso"`?',
          code: '<p class="aviso">Loja fechada no feriado</p>',
          language: 'html',
          options: [
            {
              text: 'Um atributo com seu valor',
              correct: true,
              feedback:
                'Isso. Está dentro da tag de abertura, no formato `nome="valor"`. O atributo `class` dá um nome ao elemento, útil depois no CSS.',
            },
            {
              text: 'O conteúdo do elemento',
              feedback:
                'O conteúdo é o que fica **entre** as tags, aqui “Loja fechada no feriado”. É o que aparece na tela.',
            },
            {
              text: 'Uma segunda tag',
              feedback:
                'Tags começam com `<`. Dentro de uma tag só existem o nome do elemento e seus atributos.',
            },
            {
              text: 'A tag de fechamento',
              feedback: 'A tag de fechamento é `</p>`, com a barra. Ela nunca leva atributos.',
            },
          ],
        },
      ],
    },
    {
      id: 'esqueleto',
      title: 'O esqueleto de todo documento',
      blocks: [
        {
          type: 'text',
          text: 'Uma página completa segue sempre a mesma estrutura básica. Ela avisa ao navegador que o arquivo é HTML, em que língua está escrito e separa as informações **sobre** a página do conteúdo que aparece **na** página.',
        },
        {
          type: 'anatomy',
          caption: 'A estrutura mínima de um documento HTML.',
          language: 'html',
          parts: [
            {
              text: '<!doctype html>',
              label: 'Doctype',
              note: 'A primeira linha de todo arquivo. Avisa ao navegador que é HTML moderno. Não é um elemento e não fecha.',
            },
            { text: '\n' },
            {
              text: '<html lang="pt-BR">',
              label: 'Elemento html e idioma',
              note: 'Envolve todo o documento. O atributo `lang` diz a língua do conteúdo, para o leitor de tela usar a pronúncia certa e o navegador oferecer tradução quando fizer sentido.',
            },
            { text: '\n  ' },
            {
              text: '<head>',
              label: 'Cabeça (head)',
              note: 'Informações sobre a página que não aparecem no corpo: título da aba, codificação, links para arquivos de estilo.',
            },
            { text: '\n    ' },
            {
              text: '<meta charset="utf-8">',
              label: 'Codificação',
              note: 'Diz como os caracteres foram gravados. Sem ela, acentos e cedilha podem virar símbolos estranhos, como “padaria PÃ£o”.',
            },
            { text: '\n    ' },
            {
              text: '<title>Padaria Pão Quente</title>',
              label: 'Título da aba',
              note: 'O texto que aparece na aba do navegador, nos favoritos e nos resultados do Google. Não aparece dentro da página.',
            },
            { text: '\n  </head>\n  ' },
            {
              text: '<body>',
              label: 'Corpo (body)',
              note: 'Tudo o que aparece na tela fica aqui dentro: títulos, textos, imagens, links.',
            },
            { text: '\n    <h1>Padaria Pão Quente</h1>\n  </body>\n</html>' },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Um atalho no VS Code',
          text: 'Num arquivo `.html` vazio, digite `!` e aperte `Tab`. O editor escreve o esqueleto inteiro. Depois, só troque `lang="en"` por `lang="pt-BR"`.',
        },
        {
          type: 'order',
          prompt: 'Coloque as linhas do começo de um documento HTML na ordem certa.',
          items: [
            '`<!doctype html>`',
            '`<html lang="pt-BR">`',
            '`<head>`',
            '`<meta charset="utf-8">`',
            '`<title>Minha página</title>`',
            '`</head>`',
            '`<body>`',
          ],
          explanation:
            'Primeiro o aviso de tipo, depois o elemento que envolve tudo, a cabeça com as informações sobre a página e, por fim, o corpo com o conteúdo visível.',
        },
      ],
    },
    {
      id: 'elementos-essenciais',
      title: 'Títulos, parágrafos, listas, links e imagens',
      blocks: [
        {
          type: 'text',
          text: 'Com um punhado de elementos você já escreve a maior parte das páginas. Explore cada aba para ver como são usados.',
        },
        {
          type: 'codeTabs',
          caption: 'Os elementos que você vai usar em toda página',
          tabs: [
            {
              label: 'Títulos e parágrafos',
              language: 'html',
              code: '<h1>Padaria Pão Quente</h1>\n<p>Pão fresquinho desde as 6h da manhã.</p>\n\n<h2>Cardápio</h2>\n<h3>Salgados</h3>\n<p>Coxinha, esfiha e pão de queijo.</p>\n\n<h2>Como chegar</h2>\n<p>Rua das Flores, 123.</p>',
            },
            {
              label: 'Listas',
              language: 'html',
              code: '<!-- Sem ordem: a sequência não importa -->\n<ul>\n  <li>Pão francês</li>\n  <li>Pão de queijo</li>\n  <li>Bolo de milho</li>\n</ul>\n\n<!-- Ordenada: a sequência importa -->\n<ol>\n  <li>Faça o pedido no balcão</li>\n  <li>Pague no caixa ou no Pix</li>\n  <li>Retire o pedido</li>\n</ol>',
            },
            {
              label: 'Links e imagens',
              language: 'html',
              code: '<!-- Link para outro site -->\n<a href="https://www.ibge.gov.br">Site do IBGE</a>\n\n<!-- Link para outra página do mesmo site -->\n<a href="cardapio.html">Ver o cardápio completo</a>\n\n<!-- Imagem: elemento vazio, sem fechamento -->\n<img src="bolo.jpg" alt="Bolo de milho cortado em fatias">',
            },
          ],
        },
        {
          type: 'terms',
          items: [
            {
              term: 'h1 a h6',
              text: 'Títulos, do mais importante (`h1`) ao menos importante (`h6`). Funcionam como o sumário de um livro: capítulos, seções e subseções. Cada página tem um único `h1`.',
            },
            {
              term: 'p',
              text: 'Um parágrafo de texto.',
            },
            {
              term: 'ul, ol e li',
              text: '`ul` é uma lista sem ordem, `ol` é uma lista ordenada, e cada item das duas é um `li`.',
            },
            {
              term: '<!-- -->',
              text: 'Um comentário: uma anotação para quem lê o código. O navegador não mostra.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns com títulos',
          text: 'Não escolha o título pelo tamanho: `h3` não é “um título menor”, é uma subseção de um `h2`. Não pule níveis, indo de `h1` direto para `h4`, porque quem navega por títulos com leitor de tela fica perdido. E não esqueça de fechar as tags: um `<h2>` sem `</h2>` transforma todo o resto da página em título.',
        },
        {
          type: 'quiz',
          question: 'Qual destas estruturas de títulos está correta para uma página de receitas?',
          options: [
            {
              text: '`h1` Receitas da vó, `h2` Bolos, `h3` Bolo de milho, `h2` Salgados',
              correct: true,
              feedback:
                'Isso. Um único `h1`, seções em `h2` e uma subseção em `h3`. Depois de uma subseção, você pode voltar para o nível `h2` à vontade.',
            },
            {
              text: '`h1` Receitas da vó, `h4` Bolos, `h4` Salgados',
              feedback:
                'Pula os níveis `h2` e `h3`. Se a ideia era deixar o texto menor, isso é trabalho do CSS. Bolos e Salgados são seções principais, então são `h2`.',
            },
            {
              text: '`h1` Receitas da vó, `h1` Bolos, `h1` Salgados',
              feedback:
                'Três títulos principais deixam a página sem um assunto central. O `h1` é único; as seções ficam em `h2`.',
            },
            {
              text: '`h2` Receitas da vó, `h1` Bolos, `h1` Salgados',
              feedback:
                'A hierarquia está invertida: o assunto da página inteira deve ser o `h1`, e as seções vêm abaixo dele.',
            },
          ],
        },
        {
          type: 'fill',
          prompt:
            'Complete o código: um link para a página `contato.html` e uma imagem `mapa.png` com texto alternativo.',
          language: 'html',
          template:
            '<[[a]] [[href]]="contato.html">Fale com a gente</[[a]]>\n\n<[[img]] [[src]]="mapa.png" [[alt]]="Mapa com a padaria na esquina da Rua das Flores">',
          explanation:
            'Link usa `a` com `href` e precisa de fechamento. Imagem usa `img` com `src` e `alt` e não fecha, porque é um elemento vazio.',
        },
      ],
    },
    {
      id: 'aninhamento-e-arvore',
      title: 'Caixas dentro de caixas: a árvore DOM',
      blocks: [
        {
          type: 'analogy',
          title: 'Caixas de mudança',
          text: 'Numa mudança, você põe os copos numa caixa pequena, a caixa pequena numa caixa maior e a maior no caminhão. Para tirar os copos, abre na ordem inversa. Elementos HTML funcionam assim: um elemento pode ficar **dentro** de outro, e o de dentro precisa fechar antes do de fora.',
        },
        {
          type: 'text',
          text: 'Colocar um elemento dentro de outro se chama **aninhar**. Quem está dentro é o **filho**; quem envolve é o **pai**. Por isso o código costuma ser recuado com espaços: o recuo mostra quem está dentro de quem.',
        },
        {
          type: 'quiz',
          question: 'Qual destas linhas está aninhada corretamente?',
          options: [
            {
              text: '`<p>Pão <strong>quentinho</strong> agora</p>`',
              correct: true,
              feedback:
                'Isso. O `strong`, que marca um trecho importante, abre e fecha inteiro dentro do parágrafo. A última caixa aberta é a primeira a fechar.',
            },
            {
              text: '`<p>Pão <strong>quentinho agora</p></strong>`',
              feedback:
                'As tags se cruzam: o parágrafo fecha enquanto o `strong` ainda está aberto. O navegador tenta adivinhar o que você quis dizer, e cada um pode adivinhar diferente.',
            },
            {
              text: '`<ul>Pão francês<li>Pão de queijo</li></ul>`',
              feedback:
                'Uma lista só pode ter itens `li` como filhos diretos. “Pão francês” ficou solto dentro do `ul`, fora de um item.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Quando o navegador lê o HTML, ele transforma esse encaixe numa estrutura em forma de árvore, chamada **DOM** (Modelo de Objetos do Documento). Cada elemento vira um galho, e os textos são as folhas. É essa árvore, e não o arquivo, que o navegador desenha, e é nela que o JavaScript mexe mais adiante na trilha.',
        },
        {
          type: 'domTree',
          caption: 'Uma página pequena e a árvore que o navegador monta a partir dela',
          html: '<html lang="pt-BR">\n  <head>\n    <title>Padaria</title>\n  </head>\n  <body>\n    <h1>Padaria Pão Quente</h1>\n    <p>Pão fresco <strong>toda manhã</strong></p>\n    <ul>\n      <li>Pão francês</li>\n      <li>Pão de queijo</li>\n    </ul>\n  </body>\n</html>',
        },
        {
          type: 'reveal',
          question:
            'Na árvore acima, quem é o pai do elemento `strong`? E quantos filhos tem o `ul`?',
          answer:
            'O pai do `strong` é o `p`, porque ele está dentro do parágrafo. O `ul` tem dois filhos, os dois `li`. Ler parentesco na árvore vai ser útil quando você selecionar elementos com CSS e JavaScript.',
        },
      ],
    },
    {
      id: 'pagina-de-perfil',
      title: 'Mão na massa: sua página de perfil',
      blocks: [
        {
          type: 'text',
          text: 'Agora é com você. No editor abaixo, a prévia já cuida do esqueleto (`doctype`, `head` e `body`), então você escreve só o que vai dentro do `body`. Erre à vontade: a prévia atualiza enquanto você digita.',
        },
        {
          type: 'playground',
          title: 'Uma página sobre você',
          task: 'Transforme o rascunho numa página de perfil: um título com seu nome, um parágrafo sobre você, uma lista com pelo menos três itens, um link e uma imagem com texto alternativo. Para a imagem, pode usar o endereço `https://picsum.photos/120`.',
          html: '<h1>Seu nome aqui</h1>\n\n<!-- Escreva um parágrafo contando quem você é -->\n\n<h2>Coisas de que eu gosto</h2>\n<ul>\n  <li>Primeira coisa</li>\n</ul>\n\n<!-- Coloque aqui um link e uma imagem -->\n',
          height: 360,
          checks: [
            {
              label: 'Existe um título `h1` com texto',
              test: "return (document.querySelector('h1')?.textContent || '').trim().length > 0;",
            },
            {
              label: 'Existe um parágrafo `p` com texto',
              test: "return Array.from(document.querySelectorAll('p')).some((p) => p.textContent.trim().length > 0);",
            },
            {
              label: 'Uma lista tem pelo menos três itens `li`',
              test: "return Array.from(document.querySelectorAll('ul, ol')).some((list) => Array.from(list.children).filter((child) => child.tagName === 'LI').length >= 3);",
            },
            {
              label: 'Um link `a` tem um destino no `href`',
              test: "return Array.from(document.querySelectorAll('a')).some((a) => (a.getAttribute('href') || '').trim().length > 0);",
            },
            {
              label: 'Existe uma imagem e toda imagem tem `alt` preenchido',
              test: "const images = Array.from(document.querySelectorAll('img')); return images.length > 0 && images.every((img) => (img.getAttribute('alt') || '').trim().length > 0);",
            },
          ],
          solution: {
            html: '<h1>Ana Souza</h1>\n\n<p>Moro em Recife, trabalho no comércio e estou aprendendo a criar sites à noite.</p>\n\n<img src="https://picsum.photos/120" alt="Foto de uma paisagem com montanhas ao entardecer">\n\n<h2>Coisas de que eu gosto</h2>\n<ul>\n  <li>Forró pé de serra</li>\n  <li>Cozinhar para a família</li>\n  <li>Jogar bola no domingo</li>\n</ul>\n\n<p>Veja meus projetos no <a href="https://github.com/ana-souza">meu GitHub</a>.</p>\n',
          },
        },
        {
          type: 'reveal',
          question: 'Apague o `</h2>` do seu código e olhe a prévia. O que aconteceu, e por quê?',
          answer:
            'Tudo depois do título ficou com cara de título, porque o navegador não sabe onde ele termina e continua tratando o resto como parte dele. Quando a página ficar estranha de repente, procure uma tag sem fechamento perto do ponto onde o problema começa.',
        },
      ],
    },
  ],
  recap: [
    'HTML descreve **o que** é cada parte do conteúdo; a aparência fica para o CSS.',
    'Um elemento tem tag de abertura, atributos com valores, conteúdo e tag de fechamento; elementos vazios como `img` e `br` não fecham.',
    'Todo documento tem `doctype`, `html` com `lang`, um `head` com `meta charset` e `title`, e um `body` com o conteúdo visível.',
    'Títulos de `h1` a `h6` formam uma hierarquia sem pular níveis; listas usam `ul` ou `ol` com `li`; links usam `a href` e imagens, `img` com `alt`.',
    'Elementos se aninham como caixas, e o navegador transforma esse encaixe na **árvore DOM**.',
  ],
  cards: [
    {
      id: 'html-papel',
      front: 'O HTML define a aparência ou o significado do conteúdo?',
      back: 'O significado e a estrutura. A aparência é papel do CSS.',
    },
    {
      id: 'anatomia-elemento',
      front: 'Quais são as partes de `<a href="/x">Texto</a>`?',
      back: 'Tag de abertura, atributo `href`, valor `/x`, conteúdo `Texto` e tag de fechamento `</a>`.',
    },
    {
      id: 'elemento-vazio',
      front: 'O que é um elemento vazio? Cite dois.',
      back: 'Um elemento sem conteúdo e sem tag de fechamento, como `<img>` e `<br>`.',
    },
    {
      id: 'head-body',
      front: 'Qual a diferença entre `head` e `body`?',
      back: '`head` guarda informações sobre a página, como `title` e `meta`. `body` guarda o conteúdo que aparece na tela.',
    },
    {
      id: 'hierarquia-titulos',
      front: 'Como usar os títulos de `h1` a `h6`?',
      back: 'Um único `h1` por página e níveis em sequência, sem pular, escolhidos pela hierarquia e não pelo tamanho.',
    },
    {
      id: 'ul-ol',
      front: 'Quando usar `ul` e quando usar `ol`?',
      back: '`ul` quando a ordem dos itens não importa; `ol` quando importa, como passos.',
    },
    {
      id: 'alt',
      front: 'Para que serve o atributo `alt` de uma imagem?',
      back: 'Descrever a imagem para quem não consegue vê-la, como quem usa leitor de tela ou quando ela não carrega.',
    },
    {
      id: 'dom',
      front: 'O que é o DOM?',
      back: 'A árvore de elementos que o navegador monta a partir do HTML e usa para desenhar a página.',
    },
  ],
  mission: {
    title: 'Sua página de perfil de verdade',
    text: 'Leve o exercício para fora da aula: crie a página no seu computador, dentro do projeto que você colocou no Git, e confira a árvore no DevTools.',
    steps: [
      'Crie um arquivo `perfil.html` com o esqueleto completo: `doctype`, `html lang="pt-BR"`, `meta charset` e um `title`',
      'Escreva um `h1` com seu nome, seções em `h2` e pelo menos um parágrafo, uma lista e um link',
      'Coloque uma imagem sua ou de algo de que você gosta na pasta do projeto e mostre-a com `img` e um `alt` que a descreva',
      'Abra a página, inspecione com o painel Elements e confira se a árvore bate com o que você imaginou',
      'Faça um commit com uma mensagem como “Cria página de perfil” e envie para o GitHub',
    ],
  },
  sources: [
    {
      title: 'MDN: Noções básicas de HTML',
      url: 'https://developer.mozilla.org/pt-BR/docs/Learn/Getting_started_with_the_web/HTML_basics',
    },
    {
      title: 'MDN: Referência de elementos HTML',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element',
    },
    {
      title: 'web.dev: Learn HTML',
      url: 'https://web.dev/learn/html',
    },
    {
      title: 'MDN: Introdução ao DOM',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/API/Document_Object_Model/Introduction',
    },
  ],
};
