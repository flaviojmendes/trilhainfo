import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Abra o aplicativo de qualquer loja: um menu em linha no topo, uma grade de produtos que vira uma coluna só no celular, um botão com ícone e texto alinhados pelo meio. Até pouco tempo, fazer isso exigia truques frágeis. Hoje, duas ferramentas do CSS resolvem quase todo layout: Flexbox e Grid. Nesta aula você vai mexer em cada propriedade e ver o resultado na hora.',
  sections: [
    {
      id: 'o-problema',
      title: 'O problema: colocar coisas lado a lado',
      blocks: [
        {
          type: 'text',
          text: 'Na aula passada você viu que elementos block começam numa linha nova. Por isso, sem nenhum CSS de layout, três `<div>` ficam empilhadas, uma embaixo da outra. Isso se chama **fluxo normal**: a página é lida de cima para baixo, como um texto.',
        },
        {
          type: 'text',
          text: 'Para montar um menu horizontal ou uma grade de produtos, você precisa mudar a regra do jogo dentro de uma área. É isso que **Flexbox** e **Grid** fazem: você escolhe um elemento pai e diz como os filhos dele devem se organizar.',
        },
        {
          type: 'analogy',
          title: 'A fila e o estacionamento',
          text: 'O **Flexbox** é uma fila: as pessoas ficam uma atrás da outra numa direção só, e você decide se elas ficam juntas, espalhadas ou centralizadas. O **Grid** é um estacionamento com vagas demarcadas: linhas e colunas existem antes dos carros chegarem, e cada um ocupa a sua vaga.',
        },
        {
          type: 'quiz',
          question:
            'Você escreveu três `<div class="card">` seguidas, sem nenhum CSS de layout. Como elas aparecem?',
          options: [
            {
              text: 'Uma embaixo da outra, cada uma com a largura toda',
              correct: true,
              feedback:
                'Isso. `<div>` é block, e blocks começam numa linha nova e ocupam toda a largura. É o fluxo normal.',
            },
            {
              text: 'Lado a lado, dividindo a largura em três',
              feedback:
                'Seria ótimo, mas o navegador não adivinha. Para isso você precisa de `display: flex` ou `display: grid` no elemento pai.',
            },
            {
              text: 'Uma por cima da outra, sobrepostas',
              feedback:
                'Elementos só se sobrepõem com posicionamento especial. No fluxo normal, cada bloco empurra o próximo para baixo.',
            },
          ],
        },
      ],
    },
    {
      id: 'eixos-do-flexbox',
      title: 'Flexbox: container, itens e os dois eixos',
      blocks: [
        {
          type: 'text',
          text: 'Tudo começa com uma linha no elemento **pai**: `display: flex`. Ele vira o **container flex**, e os filhos diretos viram **itens flex**. Os filhos dos filhos não são afetados.',
        },
        {
          type: 'anatomy',
          caption: 'Um container flex com alinhamento nos dois eixos.',
          language: 'css',
          parts: [
            {
              text: '.menu',
              label: 'O container',
              note: 'A regra vai no **pai** dos itens que você quer organizar, nunca nos próprios itens.',
            },
            { text: ' {\n  ' },
            {
              text: 'display: flex;',
              label: 'Liga o Flexbox',
              note: 'Os filhos diretos passam a ficar em linha, lado a lado, na direção do eixo principal.',
            },
            { text: '\n  ' },
            {
              text: 'flex-direction: row;',
              label: 'Direção',
              note: 'Define o **eixo principal**. `row` (o padrão) é horizontal, da esquerda para a direita. `column` é vertical, de cima para baixo.',
            },
            { text: '\n  ' },
            {
              text: 'justify-content: space-between;',
              label: 'Eixo principal',
              note: 'Distribui os itens **ao longo** do eixo principal: no começo, no centro, no fim ou espalhados.',
            },
            { text: '\n  ' },
            {
              text: 'align-items: center;',
              label: 'Eixo cruzado',
              note: 'Alinha os itens no **eixo cruzado**, o perpendicular ao principal. Em `row`, é o alinhamento vertical.',
            },
            { text: '\n  ' },
            {
              text: 'gap: 16px;',
              label: 'Espaço entre itens',
              note: 'Coloca espaço **entre** os itens, sem precisar de margem em cada um e sem sobrar espaço nas pontas.',
            },
            { text: '\n}' },
          ],
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Eixo principal',
              text: 'A direção em que os itens se enfileiram. Quem controla é `justify-content`.',
            },
            {
              term: 'Eixo cruzado',
              text: 'A direção perpendicular à principal. Quem controla é `align-items`.',
            },
          ],
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Espalhe os itens',
              text: 'No laboratório abaixo, escolha `justify-content: space-between`. O primeiro item vai para o começo, o último para o fim, e o espaço é dividido entre eles.',
            },
            {
              title: 'Alinhe pelo meio',
              text: 'Mude `align-items` para `center`. Os itens têm alturas diferentes e agora ficam alinhados pela linha do meio. Em `stretch`, o padrão, todos esticam até a mesma altura.',
            },
            {
              title: 'Gire o eixo',
              text: 'Troque `flex-direction` para `column`. A seta do eixo principal aponta para baixo, e o mesmo `justify-content` agora age na vertical.',
            },
            {
              title: 'Deixe quebrar a linha',
              text: 'Volte para `row`, aumente para 8 itens e ligue `flex-wrap: wrap`. Quando não cabe, a fila continua na linha de baixo em vez de espremer todo mundo.',
            },
          ],
        },
        { type: 'layoutLab', mode: 'flex' },
        {
          type: 'quiz',
          question:
            'Num container com `display: flex` e a direção padrão, você quer os itens **centralizados na horizontal**. Qual propriedade usa?',
          options: [
            {
              text: '`justify-content: center`',
              correct: true,
              feedback:
                'Isso. Em `row`, o eixo principal é horizontal, e `justify-content` distribui os itens nesse eixo.',
            },
            {
              text: '`align-items: center`',
              feedback:
                'Essa centraliza no eixo **cruzado**, que em `row` é o vertical. É a confusão mais comum do Flexbox: lembre que "justify" acompanha a fila.',
            },
            {
              text: '`text-align: center`',
              feedback:
                '`text-align` centraliza texto dentro de cada caixa, mas não move os itens flex de lugar.',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'O container agora tem `flex-direction: column`. O que `justify-content: center` faz?',
          options: [
            {
              text: 'Centraliza os itens na horizontal, como antes',
              feedback:
                '`justify-content` não é horizontal por natureza: ele segue o eixo principal. Com `column`, o eixo principal virou vertical.',
            },
            {
              text: 'Centraliza os itens na vertical, se o container for mais alto que eles',
              correct: true,
              feedback:
                'Isso. O eixo principal girou para baixo e levou o `justify-content` junto. Repare que o container precisa ter altura sobrando para isso aparecer.',
            },
            {
              text: 'Nada, porque `justify-content` só funciona em `row`',
              feedback:
                'Funciona nas duas direções. O que muda é para onde ele age: sempre no eixo principal.',
            },
          ],
        },
      ],
    },
    {
      id: 'navbar',
      title: 'gap, wrap, flex: 1 e uma barra de navegação',
      blocks: [
        {
          type: 'text',
          text: 'Três propriedades completam o kit do dia a dia. `gap` dá espaço entre os itens. `flex-wrap: wrap` deixa a fila quebrar a linha quando não cabe. E `flex: 1`, escrito **no item**, faz ele crescer e ocupar o espaço que sobrou.',
        },
        {
          type: 'fill',
          prompt:
            'Num campo de busca, o botão fica do tamanho do texto e o campo ocupa todo o resto. Complete.',
          language: 'css',
          template:
            '.busca {\n  display: [[flex]];\n  gap: 8px;\n}\n\n.busca input {\n  flex: [[1]];\n}',
          explanation:
            '`display: flex` vai no container. `flex: 1` vai no item que deve crescer: ele pega todo o espaço livre, e o botão fica só com o que precisa.',
        },
        {
          type: 'text',
          text: 'Agora um truque muito útil: `margin-left: auto` num item flex faz a margem esquerda dele engolir todo o espaço livre. O resultado é que ele, e quem vem depois dele, é empurrado para a ponta direita.',
        },
        {
          type: 'playground',
          title: 'O menu da padaria',
          task: 'Deixe o menu em linha, com os itens alinhados pelo meio, espaço entre eles e o botão **Fazer pedido** empurrado para a direita. Os outros links devem continuar perto do logo.',
          html: '<nav class="menu">\n  <a class="logo" href="#inicio">Pão Quente</a>\n  <a href="#cardapio">Cardápio</a>\n  <a href="#horarios">Horários</a>\n  <a class="pedido" href="#pedido">Fazer pedido</a>\n</nav>',
          css: '.menu {\n  background: #3b2416;\n  padding: 12px 16px;\n}\n\n.menu a {\n  color: white;\n  text-decoration: none;\n}\n\n.logo {\n  font-size: 1.25rem;\n  font-weight: bold;\n}\n\n.pedido {\n  background: #f2b33d;\n  color: #3b2416;\n  padding: 8px 12px;\n  border-radius: 6px;\n}\n',
          height: 160,
          checks: [
            {
              label: 'O `.menu` é um container flex',
              test: 'const el = document.querySelector(".menu"); return !!el && getComputedStyle(el).display === "flex";',
            },
            {
              label: 'Há pelo menos 8px de `gap` entre os itens',
              test: 'const el = document.querySelector(".menu"); return !!el && parseFloat(getComputedStyle(el).columnGap) >= 8;',
            },
            {
              label: 'Os itens estão alinhados pelo centro no eixo cruzado',
              test: 'const el = document.querySelector(".menu"); return !!el && getComputedStyle(el).alignItems === "center";',
            },
            {
              label: '**Fazer pedido** está na ponta direita e os outros links continuam juntos',
              test: 'const m = document.querySelector(".menu"); const p = document.querySelector(".pedido"); const links = Array.from(document.querySelectorAll(".menu a")); if (!m || !p || links.length < 4) return false; const edge = m.getBoundingClientRect().right - parseFloat(getComputedStyle(m).paddingRight); const near = links[2].getBoundingClientRect().left - links[1].getBoundingClientRect().right < 40; return Math.abs(edge - p.getBoundingClientRect().right) < 2 && near;',
            },
          ],
          solution: {
            css: '.menu {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  background: #3b2416;\n  padding: 12px 16px;\n}\n\n.menu a {\n  color: white;\n  text-decoration: none;\n}\n\n.logo {\n  font-size: 1.25rem;\n  font-weight: bold;\n}\n\n.pedido {\n  margin-left: auto;\n  background: #f2b33d;\n  color: #3b2416;\n  padding: 8px 12px;\n  border-radius: 6px;\n}\n',
          },
        },
        {
          type: 'reveal',
          question: 'Por que não usar `justify-content: space-between` nesse menu?',
          answer:
            'Porque ele espalharia **todos** os itens pela largura: Cardápio e Horários ficariam soltos no meio, longe do logo. O `margin-left: auto` mexe só no item que você quer empurrar.',
        },
      ],
    },
    {
      id: 'grid',
      title: 'Grid: linhas e colunas ao mesmo tempo',
      blocks: [
        {
          type: 'text',
          text: 'No Grid, você desenha as colunas no container e os itens se encaixam nelas, um por vaga, linha após linha. Cada coluna ou linha da grade se chama **trilha**.',
        },
        {
          type: 'text',
          text: 'A unidade mais importante do Grid é o `fr`, de fração. Ela divide o espaço **que sobra** em partes. `1fr 1fr 1fr` são três colunas iguais. `1fr 2fr` são duas colunas, a segunda com o dobro da primeira.',
        },
        {
          type: 'quiz',
          question:
            'Um container de 800px, sem gap, tem `grid-template-columns: 200px 1fr 1fr`. Qual a largura de cada coluna `1fr`?',
          options: [
            {
              text: '300px',
              correct: true,
              feedback:
                'Isso. Primeiro sai a coluna fixa: 800 menos 200 sobram 600. Os 600 são divididos em 2 frações de 300.',
            },
            {
              text: '266px',
              feedback:
                'Você dividiu 800 por 3. Mas `fr` reparte só o que **sobra** depois das trilhas fixas.',
            },
            {
              text: '400px',
              feedback:
                'Assim a soma daria 1000px, mais do que cabe. Desconte os 200px fixos antes de dividir.',
            },
          ],
        },
        {
          type: 'anatomy',
          caption: 'A receita da grade que se adapta sozinha à largura da tela.',
          language: 'css',
          parts: [
            { text: 'grid-template-columns: ' },
            {
              text: 'repeat(',
              label: 'repeat()',
              note: 'Repete um padrão de colunas, para você não escrever `1fr 1fr 1fr 1fr`. `repeat(4, 1fr)` cria quatro colunas iguais.',
            },
            {
              text: 'auto-fill',
              label: 'auto-fill',
              note: 'No lugar de um número fixo: cria **quantas colunas couberem**. Numa tela larga, várias; no celular, uma.',
            },
            { text: ', ' },
            {
              text: 'minmax(',
              label: 'minmax()',
              note: 'Dá um limite mínimo e um máximo para cada coluna.',
            },
            {
              text: '180px',
              label: 'Mínimo',
              note: 'Nenhuma coluna fica mais estreita que isso. Quando não cabe mais uma coluna de 180px, os itens descem para a linha seguinte.',
            },
            { text: ', ' },
            {
              text: '1fr',
              label: 'Máximo',
              note: 'As colunas crescem para dividir o espaço que sobra, sem deixar um buraco no fim da linha.',
            },
            { text: '));' },
          ],
        },
        {
          type: 'text',
          text: 'Experimente as opções de `grid-template-columns` no laboratório. Na última, aumente o número de itens e veja as linhas se formarem. Depois faça o item 1 ocupar duas colunas.',
        },
        { type: 'layoutLab', mode: 'grid' },
        {
          type: 'playground',
          title: 'A vitrine de produtos',
          task: 'Transforme a lista numa grade com `display: grid`, colunas de pelo menos 180px usando `repeat(auto-fill, minmax(…))` e espaço entre os cards.',
          html: '<ul class="produtos">\n  <li class="produto">Pão francês</li>\n  <li class="produto">Pão de queijo</li>\n  <li class="produto">Bolo de fubá</li>\n  <li class="produto">Sonho</li>\n  <li class="produto">Broa de milho</li>\n  <li class="produto">Rosca doce</li>\n</ul>',
          css: '.produtos {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n\n.produto {\n  background: #fff4e5;\n  border: 1px solid #e8cfa8;\n  border-radius: 8px;\n  padding: 24px 16px;\n  text-align: center;\n}\n',
          height: 300,
          checks: [
            {
              label: 'A lista `.produtos` é um container grid',
              test: 'const el = document.querySelector(".produtos"); return !!el && getComputedStyle(el).display === "grid";',
            },
            {
              label: 'As colunas usam `repeat(auto-fill, minmax(…))` (ou `auto-fit`)',
              test: 'try { return Array.from(document.styleSheets).some(function (sheet) { return Array.from(sheet.cssRules).some(function (rule) { var v = (rule.style && rule.style.gridTemplateColumns) || ""; return /auto-(fill|fit)/.test(v) && v.indexOf("minmax") >= 0; }); }); } catch (e) { return false; }',
            },
            {
              label: 'Há mais de uma coluna na tela',
              test: 'const items = Array.from(document.querySelectorAll(".produto")); return items.length > 1 && Math.abs(items[0].getBoundingClientRect().top - items[1].getBoundingClientRect().top) < 1;',
            },
            {
              label: 'Há pelo menos 12px de `gap` entre os cards',
              test: 'const el = document.querySelector(".produtos"); if (!el) return false; const s = getComputedStyle(el); return parseFloat(s.columnGap) >= 12 && parseFloat(s.rowGap) >= 12;',
            },
          ],
          solution: {
            css: '.produtos {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));\n  gap: 16px;\n}\n\n.produto {\n  background: #fff4e5;\n  border: 1px solid #e8cfa8;\n  border-radius: 8px;\n  padding: 24px 16px;\n  text-align: center;\n}\n',
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Centralizar em duas linhas',
          text: 'Para pôr algo bem no meio de uma área, na horizontal e na vertical, use `display: grid; place-items: center;` no pai. O container precisa ter altura, como `min-height: 100vh`, para haver espaço vertical.',
        },
      ],
    },
    {
      id: 'qual-escolher',
      title: 'Flexbox ou Grid?',
      blocks: [
        {
          type: 'text',
          text: 'A pergunta que decide: você está organizando itens **numa direção só**, deixando cada um ter o tamanho do seu conteúdo? Flexbox. Você quer **linhas e colunas alinhadas** entre si? Grid. E os dois se combinam: Grid na estrutura da página, Flexbox dentro de cada componente.',
        },
        {
          type: 'classify',
          prompt: 'Qual ferramenta resolve cada caso de forma mais simples?',
          buckets: ['Flexbox', 'Grid'],
          items: [
            { text: 'Menu horizontal com links de tamanhos diferentes', bucket: 0 },
            { text: 'Ícone ao lado do texto, alinhados pelo meio', bucket: 0 },
            { text: 'Campo de busca que cresce e um botão ao lado', bucket: 0 },
            { text: 'Grade de fotos com colunas alinhadas', bucket: 1 },
            { text: 'Página com cabeçalho, menu lateral, conteúdo e rodapé', bucket: 1 },
            { text: 'Formulário com todos os rótulos numa coluna e os campos em outra', bucket: 1 },
          ],
          explanation:
            'Uma fila de coisas com tamanhos próprios pede Flexbox. Quando o alinhamento entre linhas importa, como nas fotos ou no formulário, o Grid é mais simples.',
        },
        {
          type: 'quiz',
          question: 'Este CSS não centraliza os itens. Por quê?',
          code: '.lista {\n  display: flex;\n}\n\n.lista li {\n  justify-content: center;\n}',
          language: 'css',
          options: [
            {
              text: '`justify-content` foi escrito nos itens, e ele só funciona no container',
              correct: true,
              feedback:
                'Isso. É o erro mais comum. `justify-content`, `align-items`, `gap` e `flex-wrap` vão no **pai**. No item, só propriedades como `flex: 1` ou `margin-left: auto`.',
            },
            {
              text: 'Faltou `flex-direction: row`',
              feedback:
                '`row` já é o padrão, então escrever ou não dá no mesmo. O problema é onde a propriedade de alinhamento foi parar.',
            },
            {
              text: 'Listas não podem ser containers flex',
              feedback:
                'Qualquer elemento pode virar container flex, inclusive `<ul>`. O `display: flex` está certo.',
            },
          ],
        },
        {
          type: 'list',
          items: [
            '**Propriedade no lugar errado**: alinhamento vai no container; crescimento e empurrão, no item.',
            '**Esperar efeito nos netos**: `display: flex` só organiza os filhos diretos.',
            '**Confundir os eixos**: `justify-content` segue a fila, `align-items` a cruza. Ao trocar para `column`, eles trocam de direção.',
            '**Centralizar na vertical sem altura**: se o container tem só a altura do conteúdo, não há espaço para o item se mover.',
            '**Margens em cada item para separar**: `gap` faz isso sem sobrar espaço nas pontas.',
          ],
        },
        {
          type: 'order',
          prompt:
            'Você vai montar um menu com Flexbox. Coloque os passos na ordem em que faz sentido escrever.',
          items: [
            'Escolher o elemento pai que contém os links',
            'Escrever `display: flex` no pai',
            'Alinhar no eixo cruzado com `align-items: center`',
            'Separar os itens com `gap`',
            'Empurrar o último item com `margin-left: auto` nele',
          ],
          explanation:
            'Primeiro o container, depois o que vale para todos os itens, por último o ajuste de um item específico. Essa ordem evita a maior parte dos erros de "propriedade no lugar errado".',
        },
      ],
    },
  ],
  recap: [
    '`display: flex` ou `display: grid` vai no elemento pai, e organiza só os filhos diretos.',
    'No Flexbox, `justify-content` distribui no eixo principal e `align-items` alinha no eixo cruzado; `flex-direction` decide qual é qual.',
    '`gap` separa os itens, `flex-wrap: wrap` deixa a linha quebrar e `flex: 1` faz um item ocupar o espaço livre.',
    'No Grid, `grid-template-columns` desenha as colunas; `fr` divide o espaço que sobra e `repeat(auto-fill, minmax(…, 1fr))` cria uma grade que se adapta.',
    'Uma direção com tamanhos livres pede Flexbox; linhas e colunas alinhadas pedem Grid.',
  ],
  cards: [
    {
      id: 'container-ou-item',
      front: 'Onde se escreve `display: flex`: no pai ou nos filhos?',
      back: 'No pai, que vira o container. Os filhos diretos viram itens flex.',
    },
    {
      id: 'eixos',
      front: 'Qual propriedade age no eixo principal e qual age no eixo cruzado?',
      back: '`justify-content` no principal, `align-items` no cruzado.',
    },
    {
      id: 'column',
      front: 'O que acontece com os eixos quando você usa `flex-direction: column`?',
      back: 'O eixo principal fica vertical. `justify-content` passa a agir de cima para baixo e `align-items` na horizontal.',
    },
    {
      id: 'margin-left-auto',
      front: 'Como empurrar o último item de um menu flex para a direita?',
      back: 'Com `margin-left: auto` nesse item. A margem engole todo o espaço livre antes dele.',
    },
    {
      id: 'fr',
      front: 'O que a unidade `fr` divide?',
      back: 'O espaço que sobra no container depois das trilhas de tamanho fixo e do gap.',
    },
    {
      id: 'grade-adaptavel',
      front: 'Qual linha cria uma grade de cards que se adapta à largura sem media query?',
      back: '`grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));`',
    },
    {
      id: 'flex-ou-grid',
      front: 'Como decidir entre Flexbox e Grid?',
      back: 'Uma direção, com cada item do tamanho do seu conteúdo: Flexbox. Linhas e colunas alinhadas entre si: Grid.',
    },
  ],
  mission: {
    title: 'Monte o layout da sua página',
    text: 'Pegue a página em que você vem trabalhando e organize-a com as duas ferramentas. Escreva ao lado de cada regra por que escolheu Flexbox ou Grid.',
    steps: [
      'Transforme o menu do `<header>` num container flex, com `gap` e itens alinhados pelo centro',
      'Empurre um link ou botão para a direita com `margin-left: auto`',
      'Monte uma seção de cards com `repeat(auto-fill, minmax(…, 1fr))` e estreite a janela para ver as colunas mudarem',
      'No DevTools, clique no selo `flex` ou `grid` ao lado do elemento no painel Elements para ver as linhas da grade',
      'Centralize um bloco de destaque com `display: grid; place-items: center`',
    ],
  },
  sources: [
    {
      title: 'MDN: Conceitos básicos de Flexbox',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox',
    },
    {
      title: 'MDN: Conceitos básicos de Grid Layout',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout',
    },
    { title: 'web.dev: Learn CSS, Flexbox', url: 'https://web.dev/learn/css/flexbox' },
    { title: 'web.dev: Learn CSS, Grid', url: 'https://web.dev/learn/css/grid' },
  ],
};
