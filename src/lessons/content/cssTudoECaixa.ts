import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Sabe quando um botão fica grudado no texto, um card vaza para fora da tela do celular ou dois blocos teimam em não ficar lado a lado? Quase sempre o problema é o mesmo: o tamanho de uma caixa não é o que você imaginava. Nesta aula você aprende a enxergar essas caixas e a calcular o tamanho delas antes de abrir o navegador.',
  sections: [
    {
      id: 'raio-x',
      title: 'O raio-x da página',
      blocks: [
        {
          type: 'text',
          text: 'Para o navegador, cada elemento da página é um **retângulo**. Um título, um parágrafo, um link, uma imagem: todos ocupam uma caixa. Mesmo um botão redondo é uma caixa com os cantos arredondados.',
        },
        {
          type: 'text',
          text: 'Existe um truque para enxergar todas essas caixas de uma vez. Cole a regra abaixo no CSS de qualquer página, ou no painel Styles do DevTools, e veja o esqueleto aparecer.',
        },
        {
          type: 'code',
          language: 'css',
          caption:
            'O asterisco seleciona todos os elementos. `outline` desenha uma linha sem mudar o tamanho de nada.',
          code: '* {\n  outline: 1px solid red;\n}',
        },
        {
          type: 'reveal',
          question: 'Por que usar `outline` nesse truque, e não `border`?',
          answer:
            'Porque a borda faz parte do tamanho da caixa: somar 1px em cada lado de cada elemento empurraria tudo e mudaria o layout que você quer investigar. O `outline` é desenhado por cima, sem ocupar espaço.',
        },
        {
          type: 'quiz',
          question:
            'Você aplicou o truque numa página com um parágrafo que tem um link no meio. O que espera ver?',
          options: [
            {
              text: 'Um retângulo em volta do parágrafo e outro, menor, em volta do link',
              correct: true,
              feedback:
                'Isso. Cada elemento tem a sua caixa, e caixas ficam umas dentro das outras, do mesmo jeito que as tags no HTML.',
            },
            {
              text: 'Um retângulo só em volta do parágrafo, porque o link é texto',
              feedback:
                'O link também é um elemento, então também tem caixa. Ela fica dentro da caixa do parágrafo.',
            },
            {
              text: 'Retângulos só nas imagens',
              feedback:
                'Imagens têm caixa, mas não só elas. Para o navegador, **todo** elemento é uma caixa, inclusive textos e links.',
            },
          ],
        },
      ],
    },
    {
      id: 'quatro-camadas',
      title: 'As quatro camadas de uma caixa',
      blocks: [
        {
          type: 'analogy',
          title: 'Uma caixa de mudança',
          text: 'Pense num copo embalado para uma mudança. O copo é o **conteúdo**. Em volta dele vai o plástico bolha: o **padding**. Depois vem o papelão: a **borda**. E o espaço que você deixa entre uma caixa e outra no caminhão é a **margem**.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Conteúdo',
              text: 'Onde ficam o texto ou a imagem. É o tamanho que `width` e `height` controlam, a menos que você mude o `box-sizing`.',
            },
            {
              term: 'Padding',
              text: 'O espaço **por dentro**, entre o conteúdo e a borda. Ele pega a cor de fundo da caixa.',
            },
            {
              term: 'Borda (border)',
              text: 'A linha em volta do padding. Tem espessura, estilo e cor, como em `border: 2px solid gray`.',
            },
            {
              term: 'Margem (margin)',
              text: 'O espaço **por fora**, que afasta a caixa das vizinhas. É sempre transparente.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Mexa nos controles do laboratório. Observe a conta embaixo: a largura que aparece na tela é a soma de todas as camadas, e não só o `width`.',
        },
        { type: 'boxModel' },
        {
          type: 'quiz',
          question:
            'Com o `box-sizing` padrão, qual a largura visível desta caixa, da borda esquerda à direita?',
          code: '.caixa {\n  width: 200px;\n  padding: 20px;\n  border: 2px solid black;\n  margin: 20px;\n}',
          language: 'css',
          options: [
            {
              text: '200px',
              feedback:
                'Esse é só o conteúdo. No modo padrão, `content-box`, padding e borda são somados **por fora** do `width`.',
            },
            {
              text: '222px',
              feedback:
                'Você somou cada valor uma vez só. Padding e borda existem dos **dois lados**: esquerda e direita.',
            },
            {
              text: '244px',
              correct: true,
              feedback:
                'Isso: 200 de conteúdo, mais 20 + 20 de padding, mais 2 + 2 de borda. A margem fica fora da parte visível.',
            },
            {
              text: '284px',
              feedback:
                'Você incluiu a margem. Ela conta para o espaço ocupado na página, mas é transparente: não faz parte da caixa que você vê.',
            },
          ],
        },
      ],
    },
    {
      id: 'border-box',
      title: 'border-box e o espaço por dentro e por fora',
      blocks: [
        {
          type: 'text',
          text: 'Somar padding e borda toda vez é cansativo e causa um problema clássico: uma caixa com `width: 100%` e `padding: 16px` fica 32px mais larga que o espaço disponível e estoura para fora da tela.',
        },
        {
          type: 'text',
          text: 'Com `box-sizing: border-box`, o `width` passa a incluir padding e borda. Você pede 300px e a caixa fica com 300px. O conteúdo é que encolhe para caber. Por isso quase todo projeto começa com esta regra:',
        },
        {
          type: 'code',
          language: 'css',
          caption: 'O reset de tamanho mais usado da web. Coloque no topo do seu CSS.',
          code: '*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}',
        },
        {
          type: 'quiz',
          question: 'Com `border-box`, quanto sobra para o **conteúdo** desta caixa?',
          code: '.caixa {\n  box-sizing: border-box;\n  width: 300px;\n  padding: 24px;\n  border: 1px solid gray;\n}',
          language: 'css',
          options: [
            {
              text: '300px',
              feedback:
                '300px é a caixa inteira, já com padding e borda. O conteúdo é o que sobra depois de descontá-los.',
            },
            {
              text: '250px',
              correct: true,
              feedback:
                'Isso: 300 menos 48 de padding (24 de cada lado) menos 2 de borda. A caixa mantém os 300px que você pediu.',
            },
            {
              text: '275px',
              feedback:
                'Você descontou o padding de um lado só. Ele existe à esquerda **e** à direita.',
            },
            {
              text: '350px',
              feedback:
                'Essa seria a largura visível em `content-box`, somando por fora. Em `border-box`, nada é somado: tudo é descontado por dentro.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Agora a pergunta que todo mundo faz: quando usar padding e quando usar margin? Se o espaço deve ficar **dentro** da caixa, pegando a cor de fundo e a área clicável, é padding. Se o espaço é para **afastar** uma caixa da outra, é margin.',
        },
        {
          type: 'classify',
          prompt: 'Qual propriedade resolve cada situação?',
          buckets: ['padding (por dentro)', 'margin (por fora)'],
          items: [
            { text: 'Afastar o texto da borda de um botão', bucket: 0 },
            { text: 'Aumentar a área que dá para tocar num link', bucket: 0 },
            {
              text: 'Fazer o fundo colorido do card cobrir mais espaço em volta do texto',
              bucket: 0,
            },
            { text: 'Separar um card do card de baixo', bucket: 1 },
            { text: 'Afastar um título do parágrafo seguinte', bucket: 1 },
            { text: 'Centralizar um bloco com `auto` nas laterais', bucket: 1 },
          ],
          explanation:
            'Teste rápido: pinte o fundo da caixa. Se o espaço deve ficar colorido, é padding. Se deve ficar vazio, mostrando o que está atrás, é margin.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Margens verticais se juntam',
          text: 'Um parágrafo com `margin-bottom: 24px` seguido de outro com `margin-top: 16px` não fica com 40px entre eles, e sim 24px: vale a maior. Isso se chama **colapso de margens** e só acontece na vertical, entre blocos. Se um espaço parecer menor do que a soma, é isso.',
        },
      ],
    },
    {
      id: 'block-e-inline',
      title: 'Block, inline e inline-block',
      blocks: [
        {
          type: 'analogy',
          title: 'Parágrafos e palavras',
          text: 'Num livro, cada parágrafo começa numa linha nova e ocupa a largura toda da página: ele é **block**. As palavras dentro dele ficam uma ao lado da outra e quebram linha quando acaba o espaço: elas são **inline**.',
        },
        {
          type: 'table',
          caption: 'Os três comportamentos de `display` que você mais vai ver',
          head: ['display', 'Como se comporta', 'Aceita width e height?'],
          rows: [
            ['`block`', 'Começa numa linha nova e ocupa toda a largura disponível.', 'Sim'],
            [
              '`inline`',
              'Fica no meio do texto, só do tamanho do conteúdo.',
              'Não. Padding vertical aparece, mas não empurra as linhas.',
            ],
            [
              '`inline-block`',
              'Fica no meio do texto, como inline, mas é uma caixa de verdade.',
              'Sim',
            ],
          ],
        },
        {
          type: 'classify',
          prompt: 'Qual é o `display` padrão de cada elemento, antes de qualquer CSS seu?',
          buckets: ['block', 'inline', 'inline-block'],
          items: [
            { text: '`<p>`', bucket: 0 },
            { text: '`<div>`', bucket: 0 },
            { text: '`<h1>`', bucket: 0 },
            { text: '`<section>`', bucket: 0 },
            { text: '`<a>`', bucket: 1 },
            { text: '`<span>`', bucket: 1 },
            { text: '`<strong>`', bucket: 1 },
            { text: '`<button>`', bucket: 2 },
          ],
          explanation:
            'Elementos de estrutura são block; elementos que marcam um pedaço de texto são inline. O botão é inline-block: fica na linha do texto, mas respeita tamanho e espaço interno.',
        },
        {
          type: 'quiz',
          question: 'Você escreveu `span.etiqueta { width: 120px; }` e nada mudou. Por quê?',
          options: [
            {
              text: 'O `<span>` é inline, e elementos inline ignoram `width`',
              correct: true,
              feedback:
                'Isso. Inline acompanha o texto e fica do tamanho dele. Com `display: inline-block`, o `width` passa a valer.',
            },
            {
              text: 'Faltou `!important`',
              feedback:
                'Não há conflito nenhum aqui: nenhuma outra regra está vencendo. O `width` é simplesmente ignorado em elementos inline.',
            },
            {
              text: 'É preciso definir `height` junto',
              feedback:
                '`width` e `height` funcionam de forma independente. O problema é o tipo de caixa, não a falta da altura.',
            },
            {
              text: 'Pixels não funcionam em `<span>`',
              feedback:
                'Unidades valem para qualquer elemento. O que muda o comportamento é o `display`.',
            },
          ],
        },
        {
          type: 'playground',
          title: 'Etiquetas do mesmo tamanho',
          task: 'As etiquetas da loja deveriam ter todas pelo menos 120px de largura, mas o `width` não pega. Mude o `display` delas.',
          html: '<p>\n  Bolo de fubá\n  <span class="etiqueta">Novo</span>\n  <span class="etiqueta">Promoção</span>\n  <span class="etiqueta">Frete grátis</span>\n</p>',
          css: '.etiqueta {\n  width: 120px;\n  padding: 4px 8px;\n  background: #ffe8a3;\n  border-radius: 999px;\n  text-align: center;\n}\n',
          checks: [
            {
              label: 'As etiquetas são `inline-block`',
              test: 'const items = Array.from(document.querySelectorAll(".etiqueta")); return items.length === 3 && items.every(function (el) { return getComputedStyle(el).display === "inline-block"; });',
            },
            {
              label: 'Todas têm pelo menos 120px de largura',
              test: 'const items = Array.from(document.querySelectorAll(".etiqueta")); return items.length === 3 && items.every(function (el) { return el.getBoundingClientRect().width >= 119; });',
            },
          ],
          solution: {
            css: '.etiqueta {\n  display: inline-block;\n  width: 120px;\n  padding: 4px 8px;\n  background: #ffe8a3;\n  border-radius: 999px;\n  text-align: center;\n}\n',
          },
        },
      ],
    },
    {
      id: 'unidades',
      title: 'Unidades: px, rem, em, % e viewport',
      blocks: [
        {
          type: 'text',
          text: 'Todo tamanho em CSS precisa de uma unidade. `px` é fixo e fácil de entender, mas não é sempre a melhor escolha. Cada unidade responde a uma pergunta diferente: relativo a quê?',
        },
        {
          type: 'table',
          caption: 'As unidades mais comuns e quando usar cada uma',
          head: ['Unidade', 'Relativa a', 'Bom para'],
          rows: [
            ['`px`', 'Nada: é um valor fixo.', 'Bordas finas e detalhes que não devem crescer.'],
            [
              '`rem`',
              'O tamanho de fonte da raiz (o `<html>`), 16px por padrão.',
              'Tamanho de fonte e espaçamentos em geral.',
            ],
            [
              '`em`',
              'O tamanho de fonte do próprio elemento.',
              'Padding de botão que cresce junto com o texto dele.',
            ],
            [
              '`%`',
              'A largura do elemento pai.',
              'Larguras fluidas, como `max-width: 100%` numa imagem.',
            ],
            [
              '`vw` e `vh`',
              '1% da largura ou da altura da janela.',
              'Seções que ocupam a tela inteira.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'rem respeita quem precisa de letra maior',
          text: 'Muitas pessoas com baixa visão aumentam o tamanho da fonte nas configurações do navegador. Textos em `rem` crescem junto. Textos em `px` ficam do mesmo tamanho e ignoram essa escolha. Use `rem` para fonte.',
        },
        {
          type: 'quiz',
          question: 'Com a fonte padrão do navegador em 16px, quanto vale `1.5rem`?',
          options: [
            {
              text: '24px',
              correct: true,
              feedback:
                'Isso: 1,5 vezes 16. E se a pessoa mudar a fonte padrão para 20px, o mesmo `1.5rem` vira 30px sozinho.',
            },
            {
              text: '1,5px',
              feedback:
                '`rem` não é um pixel. É um múltiplo do tamanho de fonte da raiz: 1 rem são 16px no padrão.',
            },
            {
              text: 'Depende da fonte do elemento pai',
              feedback:
                'Essa é a regra do `em`, que depende da fonte do próprio elemento e por isso pode se acumular. O `rem` olha sempre para a raiz.',
            },
          ],
        },
        {
          type: 'classify',
          prompt: 'Qual unidade combina melhor com cada caso?',
          buckets: ['rem', '%', 'vh', 'px'],
          items: [
            { text: 'Tamanho da fonte dos parágrafos', bucket: 0 },
            { text: 'Espaço entre as seções da página', bucket: 0 },
            { text: 'Uma coluna com metade da largura do pai', bucket: 1 },
            { text: 'Uma imagem que nunca passa da largura do card', bucket: 1 },
            { text: 'Uma capa que ocupa a altura toda da tela', bucket: 2 },
            { text: 'Uma borda de 1 pixel', bucket: 3 },
          ],
          explanation:
            'Texto e espaçamento em `rem`, larguras em relação ao pai em `%`, tamanho da tela em `vw` e `vh`, detalhes fixos em `px`. Não existe unidade proibida, existe a que responde à pergunta certa.',
        },
        {
          type: 'text',
          text: 'Uma última dica de tamanho: linhas de texto muito longas cansam a leitura, porque o olho se perde ao voltar para o começo da linha seguinte. Limite a largura com `max-width`.',
        },
        {
          type: 'code',
          language: 'css',
          caption:
            '`ch` é a largura de um caractere. Entre 60 e 75 por linha é confortável de ler.',
          code: '.artigo {\n  max-width: 65ch;\n  margin: 0 auto;\n}',
        },
      ],
    },
    {
      id: 'mao-na-massa',
      title: 'Mão na massa: um botão e um card',
      blocks: [
        {
          type: 'text',
          text: 'Hora de juntar tudo. Você vai transformar um link comum num botão de verdade e montar um card com espaço interno, borda, cantos arredondados e largura máxima, centralizado na página.',
        },
        {
          type: 'playground',
          title: 'Card de inscrição',
          task: 'Siga os comentários no CSS. Dica: `margin: 0 auto` centraliza um bloco que tem largura menor que o pai.',
          html: '<article class="card">\n  <h2>Curso gratuito de informática</h2>\n  <p>Aulas aos sábados na biblioteca do bairro. Traga só a vontade de aprender.</p>\n  <a class="botao" href="#inscricao">Quero me inscrever</a>\n</article>',
          css: '*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: system-ui, sans-serif;\n  background: #f4f1ea;\n}\n\n.card {\n  background: white;\n  /* 1. espaço interno, borda e cantos arredondados */\n  /* 2. largura máxima de 22rem, centralizado */\n}\n\n.botao {\n  background: #1f6f50;\n  color: white;\n  text-decoration: none;\n  /* 3. vire uma caixa de verdade, com espaço interno */\n}\n',
          height: 320,
          checks: [
            {
              label: 'O card tem pelo menos 12px de padding',
              test: 'const el = document.querySelector(".card"); if (!el) return false; const s = getComputedStyle(el); return parseFloat(s.paddingTop) >= 12 && parseFloat(s.paddingLeft) >= 12;',
            },
            {
              label: 'O card tem borda e cantos arredondados',
              test: 'const el = document.querySelector(".card"); if (!el) return false; const s = getComputedStyle(el); return parseFloat(s.borderTopWidth) > 0 && parseFloat(s.borderTopLeftRadius) > 0;',
            },
            {
              label: 'O card tem `max-width` de até 22rem e está centralizado',
              test: 'const el = document.querySelector(".card"); if (!el) return false; const r = el.getBoundingClientRect(); const w = document.documentElement.clientWidth; return getComputedStyle(el).maxWidth !== "none" && r.width <= 360 && Math.abs(r.left - (w - r.right)) < 4;',
            },
            {
              label: 'O botão não é mais `inline` e tem espaço interno',
              test: 'const el = document.querySelector(".botao"); if (!el) return false; const s = getComputedStyle(el); return s.display !== "inline" && parseFloat(s.paddingTop) >= 8 && parseFloat(s.paddingLeft) >= 12;',
            },
          ],
          solution: {
            css: '*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: system-ui, sans-serif;\n  background: #f4f1ea;\n}\n\n.card {\n  background: white;\n  padding: 1.5rem;\n  border: 1px solid #d8d2c4;\n  border-radius: 12px;\n  max-width: 22rem;\n  margin: 2rem auto;\n}\n\n.botao {\n  background: #1f6f50;\n  color: white;\n  text-decoration: none;\n  display: inline-block;\n  padding: 0.75rem 1.25rem;\n  border-radius: 8px;\n}\n',
          },
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns com caixas',
          text: '`border: 2px` sozinho não desenha nada: falta o estilo, como `solid`. `margin: 0 auto` não centraliza elementos inline, só blocos com largura definida. E `width: 100%` com padding estoura a tela se você esqueceu o `border-box`.',
        },
        {
          type: 'reveal',
          question:
            'Você aplicou `margin: 0 auto` num card e ele não centralizou, mesmo sendo block. O que provavelmente está faltando?',
          answer:
            'Uma largura menor que a do pai, com `width` ou `max-width`. Um bloco sem largura definida já ocupa 100% do espaço, então não sobra nada para as margens automáticas dividirem entre os lados.',
        },
      ],
    },
  ],
  recap: [
    'Todo elemento é uma caixa com quatro camadas: conteúdo, padding, borda e margem.',
    'No modo padrão, padding e borda somam por fora do `width`; com `box-sizing: border-box`, o `width` já inclui os dois.',
    'Padding é espaço por dentro, que pega o fundo; margin é espaço por fora, que afasta as vizinhas.',
    'Elementos block ocupam a linha toda e aceitam largura; inline acompanham o texto e ignoram `width`; inline-block fica na linha e aceita tamanho.',
    'Use `rem` para texto e espaços, `%` para larguras relativas ao pai, `vw` e `vh` para a tela e `px` para detalhes fixos.',
  ],
  cards: [
    {
      id: 'camadas-da-caixa',
      front: 'Quais são as quatro camadas do box model, de dentro para fora?',
      back: 'Conteúdo, padding, borda e margem.',
    },
    {
      id: 'conta-content-box',
      front:
        'Em `content-box`, qual a largura visível de `width: 200px; padding: 10px; border: 1px solid;`?',
      back: '222px: 200 + 10 + 10 + 1 + 1. A margem não entra na parte visível.',
    },
    {
      id: 'border-box',
      front: 'O que `box-sizing: border-box` muda?',
      back: 'O `width` passa a incluir padding e borda. A caixa fica do tamanho que você pediu e o conteúdo encolhe para caber.',
    },
    {
      id: 'padding-ou-margin',
      front: 'Como decidir entre padding e margin?',
      back: 'Se o espaço deve ficar dentro da caixa, com a cor de fundo, é padding. Se é para afastar uma caixa da outra, é margin.',
    },
    {
      id: 'width-em-span',
      front: 'Por que `width` não funciona num `<span>`?',
      back: 'Porque ele é inline e acompanha o tamanho do texto. Com `display: inline-block` ou `block`, o `width` passa a valer.',
    },
    {
      id: 'rem',
      front: 'Por que usar `rem` em vez de `px` para fonte?',
      back: '`rem` acompanha o tamanho de fonte que a pessoa escolheu no navegador. `px` ignora essa preferência.',
    },
    {
      id: 'margin-auto',
      front: 'O que é preciso para `margin: 0 auto` centralizar um bloco?',
      back: 'Que ele tenha uma largura menor que a do pai, com `width` ou `max-width`.',
    },
  ],
  mission: {
    title: 'Coloque sua página no raio-x',
    text: 'Use a página que você estilizou na aula anterior para praticar o olhar de caixa. Anote o que mudou em cada passo.',
    steps: [
      'Aplique `* { outline: 1px solid red; }` e identifique quais elementos são block e quais são inline',
      'Adicione o reset de `box-sizing: border-box` no topo do CSS',
      'Inspecione um elemento no DevTools e confira o diagrama de caixa na aba Computed',
      'Limite a largura do texto principal com `max-width` e centralize com `margin: 0 auto`',
      'Troque os tamanhos de fonte para `rem`, aumente a fonte padrão nas configurações do navegador e veja a página acompanhar',
    ],
  },
  sources: [
    {
      title: 'MDN: O modelo de caixa',
      url: 'https://developer.mozilla.org/pt-BR/docs/Learn/CSS/Building_blocks/The_box_model',
    },
    {
      title: 'MDN: box-sizing',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/box-sizing',
    },
    { title: 'web.dev: Learn CSS, box model', url: 'https://web.dev/learn/css/box-model' },
    { title: 'web.dev: Learn CSS, tamanhos e unidades', url: 'https://web.dev/learn/css/sizing' },
  ],
};
