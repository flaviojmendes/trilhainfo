import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Abra o site do seu banco e depois o de uma loja de roupas. Os dois têm títulos, parágrafos e botões, mas um parece sério e o outro parece uma vitrine colorida. Quem faz essa diferença é o CSS. E quando você escreve uma cor e ela simplesmente não aparece, quase sempre é a cascata decidindo por você: nesta aula você aprende a ler essa decisão.',
  sections: [
    {
      id: 'aparencia',
      title: 'O HTML diz o que é, o CSS diz como parece',
      blocks: [
        {
          type: 'analogy',
          title: 'A casa e a decoração',
          text: 'O HTML é a planta da casa: aqui fica a sala, ali a cozinha, esta parede tem uma porta. O CSS é a decoração: cor da parede, tamanho do sofá, onde fica cada móvel. Você pode pintar a casa inteira de novo sem derrubar nenhuma parede.',
        },
        {
          type: 'text',
          text: '**CSS** (folhas de estilo em cascata) é a linguagem que define a aparência da página: cores, fontes, espaços, tamanhos e posições. Ele não muda o significado do conteúdo. Um título continua sendo um título, mesmo que você o deixe pequeno e cinza.',
        },
        {
          type: 'text',
          text: 'O jeito recomendado de usar CSS é num arquivo separado, terminado em `.css`. O HTML aponta para ele com a tag `<link>`, dentro do `<head>`. Assim, um único arquivo de estilo pode vestir todas as páginas do site.',
        },
        {
          type: 'codeTabs',
          caption: 'Dois arquivos na mesma pasta, ligados pelo `<link>`.',
          tabs: [
            {
              label: 'index.html',
              language: 'html',
              code: '<!doctype html>\n<html lang="pt-BR">\n  <head>\n    <meta charset="utf-8">\n    <title>Padaria do Bairro</title>\n    <link rel="stylesheet" href="estilo.css">\n  </head>\n  <body>\n    <h1>Pão quentinho às 6h</h1>\n  </body>\n</html>',
            },
            {
              label: 'estilo.css',
              language: 'css',
              code: 'h1 {\n  color: tomato;\n}',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Evite o atributo style',
          text: 'Também dá para escrever `<h1 style="color: tomato">`, direto na tag. Funciona, mas mistura aparência com conteúdo, não pode ser reaproveitado e ganha de quase todas as outras regras, o que vira dor de cabeça depois. Use só em testes rápidos.',
        },
        {
          type: 'quiz',
          question:
            'Você quer que as 20 páginas do seu site tenham a mesma cor de fundo. Qual é o melhor caminho?',
          options: [
            {
              text: 'Um arquivo `estilo.css` ligado com `<link rel="stylesheet">` em cada página',
              correct: true,
              feedback:
                'Isso. A regra fica escrita em um lugar só. Para trocar a cor do site inteiro, você muda uma linha.',
            },
            {
              text: 'Um atributo `style` no `<body>` de cada página',
              feedback:
                'Funciona, mas você teria 20 cópias da mesma regra. Para mudar a cor, seriam 20 edições, e é fácil esquecer uma.',
            },
            {
              text: 'Trocar as tags por outras que já venham com a cor certa',
              feedback:
                'Tags escolhem significado, não aparência. Nenhuma tag existe para dar cor; isso é trabalho do CSS.',
            },
          ],
        },
      ],
    },
    {
      id: 'anatomia-da-regra',
      title: 'A anatomia de uma regra',
      blocks: [
        {
          type: 'text',
          text: 'Todo CSS é feito de **regras**. Cada regra responde a duas perguntas: quem vai mudar e o que vai mudar. Clique nas partes abaixo para ver o nome de cada uma.',
        },
        {
          type: 'anatomy',
          caption: 'Uma regra CSS com duas declarações.',
          language: 'css',
          parts: [
            {
              text: 'h1',
              label: 'Seletor',
              note: 'Diz **quem** vai mudar. Aqui, todos os elementos `<h1>` da página.',
            },
            { text: ' ' },
            {
              text: '{',
              label: 'Chaves',
              note: 'Abrem e fecham o bloco. Tudo o que estiver entre `{` e `}` vale para o seletor.',
            },
            { text: '\n  ' },
            {
              text: 'color',
              label: 'Propriedade',
              note: '**O que** você quer mudar. `color` é a cor do texto. Existem centenas de propriedades, e as mais comuns você aprende com o uso, sem decorar.',
            },
            {
              text: ':',
              label: 'Dois-pontos',
              note: 'Separa a propriedade do valor.',
            },
            { text: ' ' },
            {
              text: 'tomato',
              label: 'Valor',
              note: '**Como** fica. `tomato` é um dos nomes de cor que o CSS conhece. Também valeria `#ff6347` ou `rgb(255, 99, 71)`.',
            },
            {
              text: ';',
              label: 'Ponto e vírgula',
              note: 'Termina a declaração. Se você esquecer, a linha seguinte gruda nesta e as duas deixam de funcionar.',
            },
            { text: '\n  ' },
            {
              text: 'font-size: 2rem;',
              label: 'Declaração',
              note: 'Propriedade, dois-pontos, valor e ponto e vírgula formam uma **declaração**. Uma regra pode ter quantas você quiser.',
            },
            { text: '\n}' },
          ],
        },
        {
          type: 'fill',
          prompt:
            'Complete a regra para que todo elemento com a classe `aviso` fique com o texto vermelho e em negrito.',
          language: 'css',
          template: '[[.aviso]] {\n  [[color]]: red;\n  font-weight: [[bold|700]];\n}',
          explanation:
            'O ponto antes de `aviso` diz que é uma classe. `color` muda a cor do texto, e `font-weight` muda a espessura da letra: `bold` e `700` são o mesmo negrito.',
        },
      ],
    },
    {
      id: 'seletores',
      title: 'Seletores: escolhendo quem vai mudar',
      blocks: [
        {
          type: 'text',
          text: 'O seletor é como o endereço de uma carta: ele diz a quais elementos a regra vai chegar. Com meia dúzia de tipos você resolve quase tudo.',
        },
        {
          type: 'table',
          caption: 'Os seletores que você vai usar todo dia',
          head: ['Seletor', 'Exemplo', 'O que escolhe'],
          rows: [
            ['Tipo', '`p`', 'Todos os elementos `<p>`.'],
            [
              'Classe',
              '`.destaque`',
              'Elementos com `class="destaque"`. Vários elementos podem ter a mesma classe.',
            ],
            ['Id', '`#topo`', 'O único elemento com `id="topo"`. Um id não se repete na página.'],
            [
              'Descendente',
              '`nav a`',
              'Links que estão **dentro** de um `<nav>`, em qualquer nível. O espaço significa "dentro de".',
            ],
            [
              'Agrupamento',
              '`h1, h2`',
              'Os dois. A vírgula aplica a mesma regra a seletores diferentes.',
            ],
            [
              'Pseudo-classe',
              '`a:hover`',
              'O link enquanto o mouse está sobre ele. `:focus-visible` vale quando ele recebe foco pelo teclado.',
            ],
          ],
        },
        {
          type: 'code',
          language: 'css',
          caption: 'Um link que reage ao mouse e ao teclado',
          code: '.link {\n  color: #1f6f50;\n}\n\n.link:hover,\n.link:focus-visible {\n  text-decoration: underline;\n  outline: 2px solid #1f6f50;\n}',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Não esqueça do teclado',
          text: 'Muita gente navega pela tecla `Tab`, sem mouse. Sempre que você estilizar `:hover`, estilize também `:focus-visible`, para que essa pessoa veja onde está.',
        },
        {
          type: 'classify',
          prompt: 'Que tipo de seletor é cada um?',
          buckets: ['Tipo', 'Classe', 'Id', 'Descendente'],
          items: [
            { text: '`h2`', bucket: 0 },
            { text: '`.botao`', bucket: 1 },
            { text: '`#rodape`', bucket: 2 },
            { text: '`nav a`', bucket: 3 },
            { text: '`button`', bucket: 0 },
            { text: '`.card .titulo`', bucket: 3 },
            { text: '`#busca`', bucket: 2 },
            { text: '`.alerta`', bucket: 1 },
          ],
          explanation:
            'Ponto é classe, cerquilha é id, nome puro é tag. Quando há um espaço entre dois seletores, é descendente: o segundo precisa estar dentro do primeiro.',
        },
        {
          type: 'quiz',
          question:
            'Uma loja mostra 12 cards de produto, todos com o mesmo visual. Qual seletor faz mais sentido para estilizá-los?',
          options: [
            {
              text: '`.produto`, com `class="produto"` em cada card',
              correct: true,
              feedback:
                'Isso. Classe foi feita para ser repetida: todos os cards recebem o mesmo estilo e você pode reaproveitar em outras páginas.',
            },
            {
              text: '`#produto`, com `id="produto"` em cada card',
              feedback:
                'Um id deve ser **único** na página. Repetir o mesmo id em 12 elementos quebra links internos, formulários e leitores de tela.',
            },
            {
              text: '`article`, porque cada card é um `<article>`',
              feedback:
                'Funcionaria hoje, mas atingiria **todo** `<article>` do site, inclusive um post de blog que não tem nada a ver com produto.',
            },
            {
              text: '`.produto1`, `.produto2` e assim por diante, uma classe para cada card',
              feedback:
                'Você escreveria 12 regras iguais. A ideia da classe é justamente dar o mesmo nome ao que tem o mesmo visual.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Classe para estilo, id para identificar',
          text: 'Prefira classes no CSS. Guarde o id para o que precisa ser único: o alvo de um link como `#contato` ou a ligação entre `<label for>` e um campo. Você vai ver na cascata que o id também pesa demais.',
        },
        {
          type: 'playground',
          title: 'Vista um card usando classes',
          task: 'O HTML já tem as classes. Escreva as regras no CSS para cada objetivo e veja a prévia mudar.',
          html: '<article class="card">\n  <h2 class="card-titulo">Feira de domingo</h2>\n  <p class="card-texto">Frutas e verduras fresquinhas a partir das 7h, na praça central.</p>\n  <a class="card-link" href="#mapa">Ver no mapa</a>\n</article>',
          css: '/* 1. Dê ao .card uma cor de fundo (background-color) */\n/* 2. Mude a cor do título .card-titulo */\n/* 3. Tire o sublinhado do .card-link (text-decoration: none) */\n/* 4. Crie uma regra .card-link:hover para o mouse */\n\n.card {\n  padding: 16px;\n}\n',
          checks: [
            {
              label: 'O `.card` tem uma cor de fundo',
              test: 'const el = document.querySelector(".card"); if (!el) return false; const bg = getComputedStyle(el).backgroundColor; return bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent";',
            },
            {
              label: 'O título tem uma cor diferente do texto do card',
              test: 'const t = document.querySelector(".card-titulo"); const p = document.querySelector(".card-texto"); return !!t && !!p && getComputedStyle(t).color !== getComputedStyle(p).color;',
            },
            {
              label: 'O link não tem mais sublinhado',
              test: 'const a = document.querySelector(".card-link"); return !!a && getComputedStyle(a).textDecorationLine === "none";',
            },
            {
              label: 'Existe uma regra `.card-link:hover` (ou `:focus-visible`)',
              test: 'return Array.from(document.styleSheets).some(function (sheet) { try { return Array.from(sheet.cssRules).some(function (rule) { return /\\.card-link:(hover|focus-visible)/.test(rule.selectorText || ""); }); } catch (e) { return false; } });',
            },
          ],
          solution: {
            css: '.card {\n  padding: 16px;\n  background-color: #fff4e5;\n  border-radius: 8px;\n}\n\n.card-titulo {\n  color: #b33c00;\n}\n\n.card-link {\n  color: #b33c00;\n  text-decoration: none;\n}\n\n.card-link:hover,\n.card-link:focus-visible {\n  text-decoration: underline;\n}\n',
          },
        },
      ],
    },
    {
      id: 'cascata',
      title: 'Quando duas regras brigam: a cascata',
      blocks: [
        {
          type: 'text',
          text: 'Muitas vezes duas regras querem mudar a mesma propriedade do mesmo elemento. Uma diz que o parágrafo é preto, outra diz que é verde. O navegador não mistura: ele escolhe **uma** vencedora. O conjunto de critérios dessa escolha se chama **cascata**.',
        },
        {
          type: 'analogy',
          title: 'Os critérios de desempate do campeonato',
          text: 'No Brasileirão, primeiro conta o número de pontos. Só se empatar, olha-se o número de vitórias, depois o saldo de gols. A cascata é igual: um critério só entra em jogo quando o anterior empata.',
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Origem e importância',
              text: 'Seus estilos vencem os estilos padrão do navegador. E uma declaração marcada com `!important` passa na frente das normais.',
            },
            {
              title: 'Especificidade',
              text: 'Entre as suas regras, vence o seletor mais **específico**: o que aponta para o elemento com mais precisão. Ids pesam mais que classes, que pesam mais que tags.',
            },
            {
              title: 'Ordem no código',
              text: 'Se tudo empatar, vence a regra que aparece **por último**. Isso inclui a ordem dos arquivos: um CSS ligado depois ganha de um ligado antes.',
            },
          ],
        },
        {
          type: 'text',
          text: 'A **especificidade** é uma pontuação em três colunas: ids, depois classes (e pseudo-classes como `:hover`), depois tags. Compare da esquerda para a direita, como números de três dígitos. Use o laboratório e clique nos exemplos.',
        },
        {
          type: 'specificity',
          pairs: [
            ['p', '.destaque'],
            ['#topo', '.menu .link'],
            ['ul li a', '.link'],
            ['.btn', '.btn:hover'],
            ['#avisos p', '.alerta'],
          ],
        },
        {
          type: 'reveal',
          question:
            'Em `#topo` contra `.menu .link`, o segundo tem duas classes e o primeiro só um id. Por que o id vence?',
          answer:
            'Porque as colunas não se somam. `#topo` vale (1, 0, 0) e `.menu .link` vale (0, 2, 0). A primeira coluna já desempata: um id ganha de qualquer quantidade de classes, assim como 3 pontos ganham de qualquer saldo de gols.',
        },
        {
          type: 'quiz',
          question: 'O HTML é `<p class="preco">R$ 9,90</p>`. De que cor o preço aparece?',
          code: '.preco {\n  color: green;\n}\n\np {\n  color: black;\n}',
          language: 'css',
          options: [
            {
              text: 'Verde',
              correct: true,
              feedback:
                'Isso. `.preco` tem especificidade (0, 1, 0) e `p` tem (0, 0, 1). A classe vence, e a ordem nem chega a ser consultada.',
            },
            {
              text: 'Preto, porque a regra do `p` vem depois',
              feedback:
                'A ordem só desempata quando a especificidade é igual. Aqui a classe já venceu no critério anterior.',
            },
            {
              text: 'Uma mistura das duas cores',
              feedback:
                'O navegador nunca mistura valores de regras diferentes. Para cada propriedade, uma única declaração vence.',
            },
          ],
        },
        {
          type: 'quiz',
          question: 'O botão é `<button class="botao">`. Qual será a cor de fundo?',
          code: '.botao {\n  background: blue;\n}\n\n.botao {\n  background: orange;\n}',
          language: 'css',
          options: [
            {
              text: 'Azul, porque foi escrita primeiro',
              feedback:
                'É o contrário: no empate, a regra que aparece **por último** vence. Pense nela como a palavra final.',
            },
            {
              text: 'Laranja',
              correct: true,
              feedback:
                'Isso. Mesmo seletor, mesma especificidade, então a ordem decide: a última vence.',
            },
            {
              text: 'Nenhuma: regras repetidas se anulam',
              feedback:
                'Repetir não anula. O navegador aplica a vencedora e ignora a outra, que aparece riscada no DevTools.',
            },
          ],
        },
        {
          type: 'order',
          prompt: 'Ordene os seletores do **menos** específico para o **mais** específico.',
          items: [
            '`p`',
            '`nav ul li a`',
            '`.link`',
            '`nav .link:hover`',
            '`#menu`',
            '`#menu .link`',
          ],
          explanation:
            'Em pontos: (0,0,1), (0,0,4), (0,1,0), (0,2,1), (1,0,0), (1,1,0). Repare que quatro tags juntas ainda perdem para uma única classe.',
        },
        {
          type: 'playground',
          title: 'Conserte o alerta cinza',
          task: 'O parágrafo `.alerta` deveria ficar vermelho, mas aparece cinza. Descubra qual regra está vencendo e conserte **sem** usar `!important`.',
          html: '<section id="avisos">\n  <p class="alerta">A biblioteca fecha mais cedo nesta sexta.</p>\n  <p>No sábado, horário normal.</p>\n</section>',
          css: '#avisos p {\n  color: #555555;\n}\n\n.alerta {\n  color: #c0392b;\n  font-weight: bold;\n}\n',
          checks: [
            {
              label: 'O alerta está vermelho (`#c0392b`)',
              test: 'const el = document.querySelector(".alerta"); return !!el && getComputedStyle(el).color === "rgb(192, 57, 43)";',
            },
            {
              label: 'O outro parágrafo continua cinza',
              test: 'const el = document.querySelector("#avisos p:not(.alerta)"); return !!el && getComputedStyle(el).color === "rgb(85, 85, 85)";',
            },
            {
              label: 'Nenhuma declaração usa `!important`',
              test: 'try { return Array.from(document.styleSheets).every(function (sheet) { return Array.from(sheet.cssRules).every(function (rule) { var s = rule.style; if (!s) return true; for (var i = 0; i < s.length; i++) { if (s.getPropertyPriority(s[i]) === "important") return false; } return true; }); }); } catch (e) { return false; }',
            },
          ],
          solution: {
            css: '#avisos p {\n  color: #555555;\n}\n\n#avisos .alerta {\n  color: #c0392b;\n  font-weight: bold;\n}\n',
          },
        },
      ],
    },
    {
      id: 'heranca',
      title: 'Herança: o que passa de pai para filho',
      blocks: [
        {
          type: 'text',
          text: 'Escreva `body { color: #333; font-family: Georgia, serif; }` e todo o texto da página muda, mesmo que você não tenha escrito nenhuma regra para `p` ou `li`. Isso é **herança**: algumas propriedades descem do elemento pai para os filhos, como um sobrenome.',
        },
        {
          type: 'text',
          text: 'A regra prática: o que é sobre **texto** costuma ser herdado (cor, fonte, tamanho da letra, altura da linha). O que é sobre a **caixa** não é (borda, espaço interno, margem, fundo). Imagine se uma borda no `<body>` fosse herdada: cada parágrafo ganharia uma borda também.',
        },
        {
          type: 'classify',
          prompt: 'Essa propriedade, aplicada num elemento pai, passa para os filhos?',
          buckets: ['Herdada pelos filhos', 'Não herdada'],
          items: [
            { text: '`color`', bucket: 0 },
            { text: '`font-family`', bucket: 0 },
            { text: '`line-height`', bucket: 0 },
            { text: '`text-align`', bucket: 0 },
            { text: '`border`', bucket: 1 },
            { text: '`padding`', bucket: 1 },
            { text: '`margin`', bucket: 1 },
            { text: '`background-color`', bucket: 1 },
          ],
          explanation:
            'Texto herda, caixa não. O fundo parece passar para os filhos, mas é só porque eles são transparentes por padrão: o fundo do pai aparece por trás deles.',
        },
        {
          type: 'quiz',
          question:
            'Você escreveu `.card { color: navy; }`. Dentro do card há um `<p>` sem nenhuma regra própria. De que cor fica o texto do parágrafo?',
          options: [
            {
              text: 'Azul-marinho, herdado do card',
              correct: true,
              feedback:
                'Isso. `color` é herdada. Por isso basta definir a cor e a fonte no `body` para a página inteira.',
            },
            {
              text: 'Preto, porque a regra não fala de `p`',
              feedback:
                'A regra não fala de `p`, mas o `p` está dentro do card e `color` passa para os descendentes. Esse é o ponto da herança.',
            },
            {
              text: 'Depende de o `<p>` ter a classe `card` também',
              feedback:
                'Não precisa. A herança vem de estar **dentro** do elemento, não de ter a mesma classe.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: '`!important` é uma marreta',
          text: 'Escrever `color: red !important;` faz a declaração passar na frente de quase tudo. Parece uma solução, mas quando alguém precisar mudar aquela cor, vai precisar de outro `!important`, e a guerra começa. Quando uma regra não pega, descubra quem está vencendo e ajuste o seletor.',
        },
      ],
    },
    {
      id: 'devtools-styles',
      title: 'Investigue no painel Styles',
      blocks: [
        {
          type: 'text',
          text: 'Você não precisa calcular a cascata de cabeça. O DevTools mostra, para cada elemento, todas as regras que tentaram estilizá-lo, da mais forte para a mais fraca. As declarações que perderam aparecem **riscadas**.',
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Inspecione o elemento',
              text: 'Clique com o botão direito sobre ele na página e escolha **Inspecionar**. O DevTools abre com o elemento já selecionado no painel Elements.',
            },
            {
              title: 'Leia o painel Styles',
              text: 'Ao lado do HTML fica o painel **Styles** (Estilos). A regra do topo é a que mais pesa. Ao lado de cada uma aparece o arquivo e a linha onde ela foi escrita.',
            },
            {
              title: 'Procure o risco',
              text: 'Uma declaração riscada perdeu a cascata para outra mais acima. Um ícone de aviso amarelo indica propriedade ou valor inválido, como um erro de digitação.',
            },
            {
              title: 'Teste sem medo',
              text: 'Clique num valor para editá-lo ou desmarque a caixinha ao lado para desligá-lo. Nada é salvo no arquivo: recarregou, voltou ao original.',
            },
            {
              title: 'Confira o valor final',
              text: 'A aba **Computed** (Calculado) mostra o valor que ficou para cada propriedade e de onde ele veio, inclusive quando é herdado.',
            },
          ],
        },
        {
          type: 'list',
          items: [
            '**Esqueceu o ponto**: `card { }` procura uma tag `<card>`, que não existe. Para classe é `.card { }`.',
            '**Colocou o ponto no HTML**: o certo é `class="card"`, sem ponto. O ponto só existe no CSS.',
            '**Maiúsculas diferentes**: `.Card` e `class="card"` não combinam. Nomes de classe diferenciam maiúsculas.',
            '**Faltou ponto e vírgula**: a declaração seguinte para de funcionar junto.',
            '**Caminho errado no `<link>`**: se nada do CSS funciona, veja no painel Network se o arquivo voltou com 404.',
          ],
        },
        {
          type: 'quiz',
          question:
            'Você escreveu `.titulo { color: purple; }`, mas o título continua preto. No painel Styles, a sua declaração aparece riscada. O que isso indica?',
          options: [
            {
              text: 'Outra regra mais forte também define `color` para esse elemento',
              correct: true,
              feedback:
                'Isso. Riscado quer dizer "perdeu a cascata". Olhe a regra acima dela no painel: ela é a vencedora, e você ajusta a especificidade ou a ordem.',
            },
            {
              text: 'O arquivo CSS não foi carregado',
              feedback:
                'Se o arquivo não tivesse carregado, a regra nem apareceria no painel. Ela aparece, então o arquivo chegou.',
            },
            {
              text: 'A propriedade `color` não existe',
              feedback:
                'Propriedade inválida aparece com um ícone de aviso, não apenas riscada. `color` existe e está certa.',
            },
          ],
        },
      ],
    },
  ],
  recap: [
    'O HTML diz o que cada coisa é; o CSS, ligado com `<link rel="stylesheet">`, diz como ela aparece.',
    'Uma regra tem seletor e declarações, e cada declaração é propriedade, dois-pontos, valor e ponto e vírgula.',
    'Classes servem para estilo e podem se repetir; ids são únicos e pesam muito na especificidade.',
    'Quando regras brigam, a cascata decide por importância, depois especificidade (ids, classes, tags) e por fim ordem: a última vence.',
    'Propriedades de texto são herdadas pelos filhos; propriedades de caixa, como borda e margem, não.',
  ],
  cards: [
    {
      id: 'partes-da-regra',
      front: 'Quais são as partes de `p { color: red; }`?',
      back: '`p` é o seletor; `color: red;` é uma declaração, com a propriedade `color` e o valor `red`.',
    },
    {
      id: 'classe-ou-id',
      front: 'Quando usar classe e quando usar id?',
      back: 'Classe para estilo, pode se repetir. Id para algo único, como o alvo de um link ou o `for` de um label.',
    },
    {
      id: 'especificidade',
      front: 'Como se compara a especificidade de dois seletores?',
      back: 'Em três colunas, da esquerda para a direita: ids, depois classes e pseudo-classes, depois tags. Uma coluna só conta se as anteriores empatarem.',
    },
    {
      id: 'empate-na-cascata',
      front: 'Duas regras têm a mesma especificidade. Qual vence?',
      back: 'A que aparece por último no CSS.',
    },
    {
      id: 'heranca',
      front: 'Que tipo de propriedade costuma ser herdada?',
      back: 'As de texto, como `color`, `font-family` e `line-height`. Borda, padding, margem e fundo não são herdados.',
    },
    {
      id: 'important',
      front: 'Por que evitar `!important`?',
      back: 'Ele fura a especificidade, e a única forma de vencê-lo é outro `!important`. Melhor descobrir quem está vencendo e ajustar o seletor.',
    },
    {
      id: 'riscado-no-devtools',
      front: 'O que significa uma declaração riscada no painel Styles?',
      back: 'Que ela perdeu a cascata para outra regra mais forte sobre o mesmo elemento.',
    },
  ],
  mission: {
    title: 'Dê estilo à sua página de HTML',
    text: 'Volte à página que você montou nas aulas de HTML e dê a ela uma identidade visual, usando só classes e um arquivo separado.',
    steps: [
      'Crie um arquivo `estilo.css` na mesma pasta e ligue-o com `<link rel="stylesheet">` no `<head>`',
      'Defina cor e fonte no `body` e confira que todos os textos herdaram',
      'Crie pelo menos três classes e aplique-as no HTML, sem usar `style` nem ids para estilo',
      'Estilize `:hover` e `:focus-visible` nos links e teste navegando com a tecla `Tab`',
      'Provoque um conflito de propósito, encontre a declaração riscada no painel Styles e explique por escrito por que ela perdeu',
    ],
  },
  sources: [
    {
      title: 'MDN: CSS básico',
      url: 'https://developer.mozilla.org/pt-BR/docs/Learn/Getting_started_with_the_web/CSS_basics',
    },
    {
      title: 'MDN: Especificidade',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/Specificity',
    },
    { title: 'web.dev: Learn CSS, a cascata', url: 'https://web.dev/learn/css/the-cascade' },
    { title: 'web.dev: Learn CSS, herança', url: 'https://web.dev/learn/css/inheritance' },
  ],
};
