import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'No Brasil, a maior parte das pessoas acessa a internet principalmente pelo celular, e muitas só pelo celular. Uma página que só fica boa no monitor do escritório deixa essas pessoas apertando os olhos, dando zoom e arrastando a tela para os lados. Nesta aula você aprende a fazer a mesma página funcionar bem numa tela de 320 pixels e num monitor largo, sem escrever duas versões.',
  sections: [
    {
      id: 'muitas-telas',
      title: 'Uma página, muitas telas',
      blocks: [
        {
          type: 'text',
          text: 'Pense nas telas em que a sua página pode abrir: um celular antigo e estreito, um celular grande deitado, um tablet, um notebook, uma TV. Você não sabe qual será, e não precisa saber.',
        },
        {
          type: 'analogy',
          title: 'Água toma a forma do copo',
          text: 'Uma página responsiva se comporta como água: num copo estreito, ela sobe; numa bacia larga, ela se espalha. O conteúdo é o mesmo, o que muda é a forma como ele se acomoda no espaço disponível.',
        },
        {
          type: 'text',
          text: '**Design responsivo** é isso: um único HTML e um único CSS que se adaptam à largura da tela. Você já conhece metade das ferramentas: `rem`, `%`, `max-width`, Flexbox com `flex-wrap` e Grid com `auto-fill`. Nesta aula entram as peças que faltam.',
        },
        {
          type: 'quiz',
          question: 'O que significa uma página ser responsiva?',
          options: [
            {
              text: 'O mesmo conteúdo se reorganiza para ficar usável em qualquer largura de tela',
              correct: true,
              feedback:
                'Isso. Não é ter uma versão para cada aparelho: é uma página que se adapta ao espaço que tiver.',
            },
            {
              text: 'Existir uma versão separada do site para celular',
              feedback:
                'Isso já foi comum, mas dá o dobro de trabalho e as versões se desencontram. Responsivo é uma página só, que se adapta.',
            },
            {
              text: 'A página responde rápido aos cliques',
              feedback:
                'Velocidade importa muito, mas é outro assunto. Aqui "responsivo" fala de responder ao tamanho da tela.',
            },
            {
              text: 'A página encolhe inteira para caber na tela do celular',
              feedback:
                'Encolher tudo deixa o texto minúsculo e os botões impossíveis de tocar. Responsivo é reorganizar, não miniaturizar.',
            },
          ],
        },
      ],
    },
    {
      id: 'viewport',
      title: 'A meta tag viewport',
      blocks: [
        {
          type: 'text',
          text: 'Antes de qualquer CSS, há uma linha de HTML que não pode faltar. Sem ela, o navegador do celular finge que a tela tem cerca de 980px de largura, desenha a página como num computador e depois encolhe tudo para caber.',
        },
        {
          type: 'anatomy',
          caption: 'A linha que vai no `<head>` de toda página.',
          language: 'html',
          parts: [
            { text: '<meta ' },
            {
              text: 'name="viewport"',
              label: 'name',
              note: 'O **viewport** é a área da janela onde a página aparece. Esta meta tag dá instruções sobre ela.',
            },
            { text: ' content="' },
            {
              text: 'width=device-width',
              label: 'Largura real',
              note: 'Diz ao navegador para usar a largura real da tela do aparelho, em vez de fingir 980px. É isso que faz as media queries funcionarem no celular.',
            },
            { text: ', ' },
            {
              text: 'initial-scale=1',
              label: 'Sem zoom inicial',
              note: 'A página abre em tamanho normal, sem aproximar nem afastar. A pessoa continua podendo dar zoom com os dedos.',
            },
            { text: '">' },
          ],
        },
        {
          type: 'reveal',
          question:
            'Você fez tudo certo no CSS, mas no celular a página aparece minúscula, como um site de computador encolhido. Qual o suspeito número um?',
          answer:
            'A meta tag viewport está faltando. Sem ela, o celular desenha a página como se tivesse uns 980px de largura e reduz o resultado. Suas media queries para telas pequenas nem são ativadas, porque o navegador acha que a tela é larga.',
        },
        {
          type: 'fill',
          prompt: 'Complete a meta tag viewport.',
          language: 'html',
          template:
            '<meta name="[[viewport]]" content="width=[[device-width]], initial-scale=[[1|1.0]]">',
          explanation:
            'Vale decorar essa linha inteira: ela é igual em praticamente todo projeto. Muitos editores a escrevem sozinhos quando você digita `!` e aperta `Tab` num arquivo HTML vazio.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Nunca bloqueie o zoom',
          text: 'Você pode encontrar `user-scalable=no` ou `maximum-scale=1` em códigos antigos. Isso impede a pessoa de aproximar a tela com os dedos, e quem enxerga pouco depende disso. Não use.',
        },
      ],
    },
    {
      id: 'mobile-first',
      title: 'Mobile first e media queries',
      blocks: [
        {
          type: 'text',
          text: '**Mobile first** quer dizer começar pela tela pequena. Você escreve o CSS básico pensando no celular, geralmente uma coluna só, e depois **acrescenta** mudanças para telas maiores. É mais fácil abrir espaço do que espremer conteúdo.',
        },
        {
          type: 'text',
          text: 'Para acrescentar regras só a partir de certa largura, você usa uma **media query**: um bloco de CSS que só vale quando uma condição sobre a tela é verdadeira.',
        },
        {
          type: 'anatomy',
          caption: 'Uma media query mobile first.',
          language: 'css',
          parts: [
            {
              text: '@media',
              label: '@media',
              note: 'Abre um bloco condicional. As regras de dentro só valem quando a condição é verdadeira.',
            },
            { text: ' ' },
            {
              text: '(min-width: 40rem)',
              label: 'Condição',
              note: 'Verdadeira quando a tela tem **pelo menos** 40rem de largura, 640px no tamanho padrão. Usar `rem` aqui faz o ponto de quebra acompanhar a fonte escolhida pela pessoa.',
            },
            { text: ' {\n  ' },
            {
              text: '.cards {\n    grid-template-columns: 1fr 1fr;\n  }',
              label: 'Regras de dentro',
              note: 'CSS comum, com seletores e declarações. Abaixo de 40rem, é como se este trecho não existisse.',
            },
            { text: '\n}' },
          ],
        },
        {
          type: 'codeTabs',
          caption:
            'O mesmo layout escrito de dois jeitos. Repare como o mobile first só acrescenta.',
          tabs: [
            {
              label: 'Mobile first (min-width)',
              language: 'css',
              code: '.cards {\n  display: grid;\n  gap: 1rem;\n}\n\n@media (min-width: 40rem) {\n  .cards {\n    grid-template-columns: 1fr 1fr;\n  }\n}',
            },
            {
              label: 'Desktop first (max-width)',
              language: 'css',
              code: '.cards {\n  display: grid;\n  gap: 1rem;\n  grid-template-columns: 1fr 1fr;\n}\n\n@media (max-width: 39.99rem) {\n  .cards {\n    grid-template-columns: 1fr;\n  }\n}',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Numa tela de 800px de largura, com a fonte padrão de 16px, quantas colunas os cards terão?',
          code: '.cards {\n  display: grid;\n  grid-template-columns: 1fr;\n}\n\n@media (min-width: 40rem) {\n  .cards {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n\n@media (min-width: 64rem) {\n  .cards {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}',
          language: 'css',
          options: [
            {
              text: 'Uma',
              feedback:
                'A regra de uma coluna é a base, mas 800px é mais que 40rem (640px), então a primeira media query entra e muda para duas.',
            },
            {
              text: 'Duas',
              correct: true,
              feedback:
                'Isso. 800px passa de 640px (40rem), mas não chega a 1024px (64rem). Vale a primeira media query, e a segunda fica desligada.',
            },
            {
              text: 'Três, porque é a última regra',
              feedback:
                'A ordem só importa entre regras que estão valendo. A de três colunas exige pelo menos 1024px, e a tela tem 800px: ela nem participa.',
            },
          ],
        },
        {
          type: 'fill',
          prompt: 'Complete para a galeria ganhar duas colunas a partir de 48rem.',
          language: 'css',
          template:
            '.galeria {\n  display: grid;\n  gap: 1rem;\n}\n\n@[[media]] ([[min-width]]: 48rem) {\n  .galeria {\n    grid-template-columns: 1fr 1fr;\n  }\n}',
          explanation:
            '`@media` abre o bloco e `min-width` faz ele valer de 48rem para cima. A base, sem media query, já serve para o celular.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Quebre onde o conteúdo pede, não onde o aparelho manda',
          text: 'Existem centenas de tamanhos de tela, e todo ano surgem novos. Em vez de copiar a largura de um celular famoso, alargue a janela devagar e coloque o ponto de quebra onde o layout começa a ficar estranho: linhas longas demais, cards esticados, espaço sobrando.',
        },
      ],
    },
    {
      id: 'fluido',
      title: 'Imagens, grades e texto fluidos',
      blocks: [
        {
          type: 'text',
          text: 'O inimigo número um no celular é a **rolagem horizontal**: algo mais largo que a tela obriga a pessoa a arrastar para os lados. O culpado mais comum é uma imagem grande. Uma foto de 1200px dentro de uma tela de 360px estoura.',
        },
        {
          type: 'code',
          language: 'css',
          caption: 'A regra que deixa toda imagem fluida. Coloque no começo do seu CSS.',
          code: 'img {\n  max-width: 100%;\n  height: auto;\n}',
        },
        {
          type: 'text',
          text: '`max-width: 100%` diz: nunca fique mais larga que o elemento pai. Se a imagem for menor, ela mantém o tamanho dela. `height: auto` recalcula a altura para manter a proporção, sem achatar a foto.',
        },
        {
          type: 'classify',
          prompt: 'Cada trecho causa rolagem horizontal num celular de 320px ou ajuda a evitá-la?',
          buckets: ['Pode causar rolagem horizontal', 'Ajuda a evitar'],
          items: [
            { text: '`.caixa { width: 1000px; }`', bucket: 0 },
            { text: 'Uma foto de 1200px sem nenhuma regra', bucket: 0 },
            { text: '`grid-template-columns: repeat(3, 300px)`', bucket: 0 },
            { text: '`img { max-width: 100%; }`', bucket: 1 },
            { text: '`.caixa { max-width: 1000px; }`', bucket: 1 },
            { text: '`flex-wrap: wrap` num menu com muitos links', bucket: 1 },
            { text: '`repeat(auto-fill, minmax(15rem, 1fr))`', bucket: 1 },
          ],
          explanation:
            'Tamanhos fixos e grandes, como `width: 1000px` ou três colunas de 300px, não cabem em 320px. `max-width`, `wrap` e `auto-fill` deixam o conteúdo encolher ou descer de linha.',
        },
        {
          type: 'text',
          text: 'Para o texto, a função `clamp()` deixa um tamanho crescer com a tela, mas dentro de limites. Ela recebe três valores: o mínimo, o preferido e o máximo.',
        },
        {
          type: 'code',
          language: 'css',
          caption: 'Um título que acompanha a largura da tela sem ficar minúsculo nem gigante.',
          code: 'h1 {\n  font-size: clamp(1.75rem, 1rem + 4vw, 3rem);\n}',
        },
        {
          type: 'quiz',
          question: 'O que `clamp(1.75rem, 1rem + 4vw, 3rem)` garante para o tamanho do título?',
          options: [
            {
              text: 'Ele cresce com a largura da tela, mas nunca fica menor que 1.75rem nem maior que 3rem',
              correct: true,
              feedback:
                'Isso. O valor do meio acompanha a tela, e os das pontas são as travas. Como a base está em `rem`, ele também respeita a fonte escolhida pela pessoa.',
            },
            {
              text: 'Ele escolhe aleatoriamente um dos três valores',
              feedback:
                'Não há sorteio: o navegador calcula o valor do meio e só usa as pontas quando ele passa dos limites.',
            },
            {
              text: 'Ele fica sempre em 3rem, o maior valor',
              feedback:
                '3rem é o teto, usado só em telas largas. Num celular, o valor do meio fica menor e pode chegar ao piso de 1.75rem.',
            },
          ],
        },
      ],
    },
    {
      id: 'mao-na-massa',
      title: 'Mão na massa: uma vitrine que se adapta',
      blocks: [
        {
          type: 'text',
          text: 'A vitrine abaixo já está em mobile first: uma coluna só. Use o controle de largura da prévia para ver o problema em 320px, depois resolva com uma imagem fluida e uma media query.',
        },
        {
          type: 'playground',
          title: 'Vitrine da confeitaria',
          task: 'Deixe as imagens fluidas e, a partir de `40rem`, mostre os produtos em duas ou mais colunas com `grid-template-columns` dentro de uma media query `min-width`. Arraste a largura da prévia entre 320px e 1024px para conferir.',
          html: '<main class="vitrine">\n  <article class="item">\n    <img src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22360%22%3E%3Crect width=%22600%22 height=%22360%22 fill=%22%23e8cfa8%22/%3E%3C/svg%3E" alt="Bolo de fubá inteiro numa travessa">\n    <h2>Bolo de fubá</h2>\n    <p>Receita da vó, com erva-doce.</p>\n  </article>\n  <article class="item">\n    <img src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22360%22%3E%3Crect width=%22600%22 height=%22360%22 fill=%22%23d9a066%22/%3E%3C/svg%3E" alt="Fatias de pão de mel com cobertura de chocolate">\n    <h2>Pão de mel</h2>\n    <p>Recheado com doce de leite.</p>\n  </article>\n  <article class="item">\n    <img src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22360%22%3E%3Crect width=%22600%22 height=%22360%22 fill=%22%23f2d27a%22/%3E%3C/svg%3E" alt="Bandeja com quindins dourados">\n    <h2>Quindim</h2>\n    <p>Feito com coco fresco.</p>\n  </article>\n</main>',
          css: '*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\nbody {\n  margin: 0;\n  font-family: system-ui, sans-serif;\n}\n\n.vitrine {\n  display: grid;\n  gap: 1rem;\n  padding: 1rem;\n}\n\n.item {\n  background: #fff7e8;\n  border: 1px solid #e8cfa8;\n  border-radius: 12px;\n  padding: 1rem;\n}\n\n/* 1. Deixe as imagens fluidas */\n\n/* 2. A partir de 40rem, duas colunas ou mais */\n',
          resizable: true,
          height: 380,
          checks: [
            {
              label: 'Existe uma media query `min-width` que muda `grid-template-columns`',
              test: 'try { return Array.from(document.styleSheets).some(function (sheet) { return Array.from(sheet.cssRules).some(function (rule) { var m = rule.media && rule.media.mediaText; if (!m || !/min-width|width\\s*>=?/.test(m) || !rule.cssRules) return false; return Array.from(rule.cssRules).some(function (inner) { return !!(inner.style && inner.style.gridTemplateColumns); }); }); }); } catch (e) { return false; }',
            },
            {
              label: 'Numa tela de 800px, os produtos aparecem em mais de uma coluna',
              test: 'const items = Array.from(document.querySelectorAll(".item")); return items.length > 1 && Math.abs(items[0].getBoundingClientRect().top - items[1].getBoundingClientRect().top) < 1;',
            },
            {
              label: 'As imagens têm `max-width: 100%`',
              test: 'const imgs = Array.from(document.querySelectorAll("img")); return imgs.length > 0 && imgs.every(function (img) { return getComputedStyle(img).maxWidth === "100%"; });',
            },
            {
              label: 'Não há rolagem horizontal',
              test: 'const root = document.documentElement; return root.scrollWidth <= root.clientWidth + 1;',
            },
          ],
          solution: {
            css: '*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\nbody {\n  margin: 0;\n  font-family: system-ui, sans-serif;\n}\n\nimg {\n  display: block;\n  max-width: 100%;\n  height: auto;\n  border-radius: 8px;\n}\n\n.vitrine {\n  display: grid;\n  gap: 1rem;\n  padding: 1rem;\n}\n\n.item {\n  background: #fff7e8;\n  border: 1px solid #e8cfa8;\n  border-radius: 12px;\n  padding: 1rem;\n}\n\n@media (min-width: 40rem) {\n  .vitrine {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n@media (min-width: 60rem) {\n  .vitrine {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n',
          },
        },
        {
          type: 'reveal',
          question:
            'Se você criar as duas colunas mas esquecer o `max-width: 100%` nas imagens, o que acontece em 800px?',
          answer:
            'As fotos têm 600px de largura natural e não cabem em colunas de uns 370px. A grade alarga as colunas para acomodar as fotos e a página passa a ter rolagem horizontal. É por isso que imagem fluida vem antes de qualquer media query.',
        },
      ],
    },
    {
      id: 'testar',
      title: 'Teste como quem usa',
      blocks: [
        {
          type: 'text',
          text: 'Você não precisa de uma gaveta de celulares para testar. O DevTools tem um **modo dispositivo** que simula telas de qualquer largura. Ele não substitui um aparelho de verdade, mas pega a maioria dos problemas.',
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Ligue o modo dispositivo',
              text: 'Abra o DevTools com `F12` e clique no ícone de celular e tablet no canto superior, ou use `Ctrl` + `Shift` + `M` (no Mac, `Cmd` + `Shift` + `M`).',
            },
            {
              title: 'Comece pelo menor',
              text: 'Escolha **Responsive** e digite `320` na largura. Role a página inteira procurando qualquer coisa cortada ou que force rolagem para o lado.',
            },
            {
              title: 'Alargue devagar',
              text: 'Arraste a borda da tela simulada até 1400px. Observe onde o layout fica estranho: é ali que cabe um ponto de quebra.',
            },
            {
              title: 'Teste o zoom',
              text: 'Fora do modo dispositivo, aperte `Ctrl` e `+` até 200%. O texto deve crescer e continuar legível, sem nada se sobrepor nem sumir.',
            },
            {
              title: 'Navegue pelo teclado',
              text: 'Use `Tab` em cada largura. O foco precisa estar sempre visível, inclusive em menus que mudam de forma no celular.',
            },
          ],
        },
        {
          type: 'list',
          items: [
            '**Esquecer a meta tag viewport**: no celular tudo fica minúsculo e as media queries não disparam.',
            '**Larguras fixas em px** em containers, como `width: 960px`: troque por `max-width`.',
            '**Testar só no próprio celular**: o seu pode ser bem maior que o de quem vai usar.',
            '**Texto em px**: não acompanha a fonte que a pessoa escolheu no navegador.',
            '**Esconder conteúdo no celular** para caber: quem usa só o celular perde informação.',
          ],
        },
        {
          type: 'quiz',
          question:
            'A página está ótima no seu celular, mas uma pessoa com um aparelho de 320px relata que precisa arrastar a tela para os lados. Qual o melhor primeiro passo?',
          options: [
            {
              text: 'Abrir o modo dispositivo em 320px e procurar o elemento mais largo que a tela',
              correct: true,
              feedback:
                'Isso. Reproduzir o problema vem antes de qualquer correção. Com o truque `* { outline: 1px solid red; }`, a caixa que estoura aparece na hora.',
            },
            {
              text: 'Adicionar `overflow-x: hidden` no `body`',
              feedback:
                'Isso esconde o sintoma: o conteúdo que estoura continua cortado e a pessoa simplesmente não consegue mais vê-lo. Ache e conserte a causa.',
            },
            {
              text: 'Diminuir o tamanho da fonte da página toda',
              feedback:
                'Texto raramente é o culpado, e letra menor prejudica a leitura. O suspeito costuma ser uma imagem, tabela ou caixa com largura fixa.',
            },
          ],
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem uma rotina de teste responsivo.',
          items: [
            'Confirmar que a meta tag viewport está no `<head>`',
            'Abrir o modo dispositivo em 320px e procurar rolagem horizontal',
            'Alargar a tela devagar e anotar onde o layout quebra',
            'Testar o zoom de 200% numa tela de computador',
            'Percorrer a página com `Tab` conferindo o foco visível',
          ],
          explanation:
            'Primeiro a base que faz tudo funcionar, depois do menor para o maior, por fim zoom e teclado. Se cada etapa passar, a página serve para muito mais gente.',
        },
      ],
    },
  ],
  recap: [
    'A meta tag viewport, com `width=device-width, initial-scale=1`, faz o celular usar a largura real da tela.',
    'Mobile first: o CSS base serve para a tela pequena, e media queries com `min-width` acrescentam mudanças para telas maiores.',
    'Pontos de quebra vêm do conteúdo, não de aparelhos específicos, e ficam melhores em `rem`.',
    'Imagens com `max-width: 100%; height: auto`, grades fluidas e `clamp()` no texto evitam rolagem horizontal e letras minúsculas.',
    'Teste em 320px, com zoom de 200% e pelo teclado, usando o modo dispositivo do DevTools.',
  ],
  cards: [
    {
      id: 'meta-viewport',
      front: 'O que acontece num celular se a página não tem a meta tag viewport?',
      back: 'O navegador finge uma tela de cerca de 980px e encolhe a página. O texto fica minúsculo e as media queries de tela pequena não valem.',
    },
    {
      id: 'mobile-first',
      front: 'O que é mobile first?',
      back: 'Escrever o CSS base para a tela pequena e acrescentar mudanças para telas maiores com `@media (min-width: …)`.',
    },
    {
      id: 'min-width',
      front: 'Quando vale o bloco `@media (min-width: 40rem) { … }`?',
      back: 'Quando a tela tem pelo menos 40rem de largura, 640px com a fonte padrão.',
    },
    {
      id: 'ponto-de-quebra',
      front: 'Como escolher um ponto de quebra?',
      back: 'Alargando a tela devagar e quebrando onde o conteúdo começa a ficar ruim, e não pela largura de um aparelho famoso.',
    },
    {
      id: 'imagem-fluida',
      front: 'Qual regra deixa as imagens fluidas?',
      back: '`img { max-width: 100%; height: auto; }`',
    },
    {
      id: 'clamp',
      front: 'O que significam os três valores de `clamp(1.75rem, 1rem + 4vw, 3rem)`?',
      back: 'Mínimo, valor preferido que acompanha a tela, e máximo.',
    },
    {
      id: 'largura-minima-teste',
      front: 'Qual a menor largura em que vale testar uma página?',
      back: '320px, sem rolagem horizontal. Teste também o zoom de 200% e a navegação por teclado.',
    },
  ],
  mission: {
    title: 'A mesma página no celular e no computador',
    text: 'Adapte a página que você vem construindo para funcionar do celular ao desktop. Quando aparecer um problema de layout, descreva-o para uma IA, teste a hipótese no DevTools e explique com suas palavras a correção que funcionou.',
    steps: [
      'Confira a meta tag viewport e a regra de imagens fluidas',
      'Reescreva o layout em mobile first, com pelo menos uma media query `min-width` em `rem`',
      'Abra em 320px no modo dispositivo e elimine toda rolagem horizontal',
      'Garanta texto legível: fontes em `rem`, linhas com `max-width` e zoom de 200% sem sobreposição',
      'Percorra a página com `Tab` em larguras diferentes e confirme que o foco está sempre visível',
      'Abra a página no seu celular de verdade e compare com o que viu no DevTools',
    ],
  },
  sources: [
    {
      title: 'MDN: Design responsivo',
      url: 'https://developer.mozilla.org/pt-BR/docs/Learn/CSS/CSS_layout/Responsive_Design',
    },
    {
      title: 'MDN: Usando media queries',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_media_queries/Using_media_queries',
    },
    { title: 'web.dev: Learn Responsive Design', url: 'https://web.dev/learn/design/' },
    { title: 'web.dev: Media queries', url: 'https://web.dev/learn/design/media-queries' },
  ],
};
