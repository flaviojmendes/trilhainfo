import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Pense na última vez que você preencheu um cadastro no celular e o teclado de números não apareceu no campo de CPF, ou tocou num botão que não fazia nada. Muitas vezes o problema não está no visual, mas na escolha das tags. Nesta aula você vai aprender a escolher cada elemento pelo que ele significa, para que a página funcione para todo mundo: quem enxerga, quem usa leitor de tela, quem navega só pelo teclado e até o Google.',
  sections: [
    {
      id: 'sopa-de-divs',
      title: 'Sopa de divs ou página com significado',
      blocks: [
        {
          type: 'analogy',
          title: 'Um supermercado sem placas',
          text: 'Imagine um supermercado onde os corredores não têm placas. Os produtos estão lá, mas você precisa andar por todos para achar o café. Com placas de “Bebidas”, “Limpeza” e “Padaria”, você vai direto. As tags com significado são as placas de uma página.',
        },
        {
          type: 'text',
          text: 'O elemento `div` é uma caixa genérica: ele agrupa coisas, mas não diz nada sobre o que elas são. Uma página feita só de `div` funciona na tela, mas para um leitor de tela é um corredor sem placas. Quem programa chama isso, com carinho, de **sopa de divs**.',
        },
        {
          type: 'text',
          text: 'HTML **semântico** é escolher a tag pelo significado do conteúdo. Um leitor de tela é um programa que lê a página em voz alta para pessoas cegas ou com baixa visão; com tags semânticas, ele permite pular direto para o menu ou para o conteúdo principal.',
        },
        {
          type: 'codeTabs',
          caption: 'A mesma página, escrita de dois jeitos',
          tabs: [
            {
              label: 'Sopa de divs',
              language: 'html',
              code: '<div class="topo">\n  <div class="logo">Padaria Pão Quente</div>\n  <div class="menu">\n    <a href="/">Início</a>\n    <a href="/cardapio">Cardápio</a>\n  </div>\n</div>\n<div class="conteudo">\n  <div class="titulo">Pão fresquinho no seu bairro</div>\n</div>\n<div class="rodape">Rua das Flores, 123</div>',
            },
            {
              label: 'Semântico',
              language: 'html',
              code: '<header>\n  <p>Padaria Pão Quente</p>\n  <nav>\n    <a href="/">Início</a>\n    <a href="/cardapio">Cardápio</a>\n  </nav>\n</header>\n<main>\n  <h1>Pão fresquinho no seu bairro</h1>\n</main>\n<footer>Rua das Flores, 123</footer>',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'As duas versões acima ficam idênticas na tela. Então por que a semântica importa?',
          options: [
            {
              text: 'Porque leitores de tela, buscadores e o próprio navegador entendem o papel de cada parte',
              correct: true,
              feedback:
                'Isso. A tela é só uma das formas de usar a página. As tags semânticas informam a estrutura para quem não enxerga a tela e para programas que leem a página.',
            },
            {
              text: 'Porque a versão semântica carrega muito mais rápido',
              feedback:
                'A diferença de velocidade é desprezível. O ganho está em significado: quem usa leitor de tela consegue entender e navegar pela página.',
            },
            {
              text: 'Não importa: se ficou igual na tela, está certo',
              feedback:
                'Essa é a armadilha. Muita gente não vê a tela, ou não usa mouse. Para essas pessoas, a versão com `div` é bem pior.',
            },
            {
              text: 'Porque `div` está proibido no HTML moderno',
              feedback:
                '`div` continua válido e útil para agrupar coisas só por causa do visual. O problema é usá-lo quando existe uma tag que diz o que o conteúdo é.',
            },
          ],
        },
      ],
    },
    {
      id: 'marcos-da-pagina',
      title: 'Os marcos da página',
      blocks: [
        {
          type: 'text',
          text: 'Algumas tags criam **marcos**: regiões que o leitor de tela lista num menu para a pessoa saltar direto até elas. São as placas principais do supermercado.',
        },
        {
          type: 'table',
          caption: 'As tags de estrutura e quando usar cada uma',
          head: ['Tag', 'Para quê', 'Exemplo'],
          rows: [
            [
              '`header`',
              'Cabeçalho: a apresentação da página ou de uma seção',
              'Logo, nome do site, menu',
            ],
            ['`nav`', 'Um grupo de links de navegação principal', 'Início, Cardápio, Contato'],
            ['`main`', 'O conteúdo principal. Só um por página', 'O que a página veio mostrar'],
            ['`section`', 'Uma seção temática, normalmente com um título', 'A seção “Cardápio”'],
            [
              '`article`',
              'Algo que faz sentido sozinho, fora da página',
              'Uma notícia, um post, um produto',
            ],
            ['`aside`', 'Conteúdo complementar, ao lado do principal', 'Dicas, “leia também”'],
            ['`footer`', 'Rodapé: informações de fechamento', 'Endereço, CNPJ, redes sociais'],
          ],
        },
        {
          type: 'classify',
          prompt: 'Num site de padaria, em que marco cada parte deveria ficar?',
          buckets: ['header', 'nav', 'main', 'footer'],
          items: [
            { text: 'Logo e nome da padaria, no topo', bucket: 0 },
            { text: 'Slogan ao lado do logo', bucket: 0 },
            { text: 'Links para Início, Cardápio e Contato', bucket: 1 },
            { text: 'Menu com as categorias de produtos', bucket: 1 },
            { text: 'A lista de pães e preços', bucket: 2 },
            { text: 'O título principal da página, em `h1`', bucket: 2 },
            { text: 'Endereço e telefone no fim da página', bucket: 3 },
            { text: 'Aviso de direitos autorais', bucket: 3 },
          ],
          explanation:
            'O `h1` fica no `main` porque descreve o conteúdo principal daquela página. O logo se repete em todas as páginas do site, por isso mora no `header`.',
        },
        {
          type: 'playground',
          title: 'Coloque placas na sopa de divs',
          task: 'Reescreva a página trocando as `div` pelas tags certas: `header` com um `nav` para os links, `main` com o conteúdo, `footer` no fim. Transforme os textos com classe `titulo` em títulos de verdade: um único `h1` e um `h2` para a seção do cardápio.',
          html: '<div class="topo">\n  <div class="logo">Padaria Pão Quente</div>\n  <div class="menu">\n    <a href="#cardapio">Cardápio</a>\n    <a href="#contato">Contato</a>\n  </div>\n</div>\n<div class="conteudo">\n  <div class="titulo">Pão fresquinho no seu bairro</div>\n  <p>Abrimos todos os dias às 6h.</p>\n  <div class="titulo" id="cardapio">Cardápio</div>\n  <p>Pão francês, pão de queijo e bolo de milho.</p>\n</div>\n<div class="rodape" id="contato">Rua das Flores, 123. CEP 01000-000.</div>\n',
          height: 300,
          checks: [
            {
              label: 'A página tem um `header`',
              test: "return !!document.querySelector('header');",
            },
            {
              label: 'Os links estão dentro de um `nav`',
              test: "return !!document.querySelector('nav a[href]');",
            },
            {
              label: 'Existe exatamente um `main`',
              test: "return document.querySelectorAll('main').length === 1;",
            },
            {
              label: 'A página tem um `footer`',
              test: "return !!document.querySelector('footer');",
            },
            {
              label: 'Existe um único `h1`, com texto',
              test: "const titles = document.querySelectorAll('h1'); return titles.length === 1 && titles[0].textContent.trim().length > 0;",
            },
            {
              label: 'A seção do cardápio tem um `h2` dentro do `main`',
              test: "return !!document.querySelector('main h2');",
            },
          ],
          solution: {
            html: '<header>\n  <p>Padaria Pão Quente</p>\n  <nav>\n    <a href="#cardapio">Cardápio</a>\n    <a href="#contato">Contato</a>\n  </nav>\n</header>\n<main>\n  <h1>Pão fresquinho no seu bairro</h1>\n  <p>Abrimos todos os dias às 6h.</p>\n  <section id="cardapio">\n    <h2>Cardápio</h2>\n    <p>Pão francês, pão de queijo e bolo de milho.</p>\n  </section>\n</main>\n<footer id="contato">Rua das Flores, 123. CEP 01000-000.</footer>\n',
          },
        },
      ],
    },
    {
      id: 'link-ou-botao',
      title: 'Link ou botão?',
      blocks: [
        {
          type: 'text',
          text: 'Os dois são clicáveis e podem ter a mesma aparência, mas significam coisas diferentes. A regra é simples: se **leva a outro lugar**, é link, com `a href`. Se **faz alguma coisa** na página atual, como enviar, abrir um menu ou adicionar ao carrinho, é botão, com `button`.',
        },
        {
          type: 'text',
          text: 'Um erro comum é criar um botão com `div` e um clique em JavaScript. Na tela parece igual, mas a `div` não recebe foco pela tecla `Tab`, não responde ao `Enter` e o leitor de tela não avisa que dá para clicar. O `button` já vem com tudo isso de graça.',
        },
        {
          type: 'screenReader',
          caption: 'Uma receita com um botão de favoritar, escrito de dois jeitos',
          variants: [
            {
              label: 'Com div',
              code: '<h2>Bolo de milho</h2>\n<div class="botao" onclick="favoritar()">\n  Favoritar\n</div>',
              speech: ['Bolo de milho, título nível 2', 'Favoritar'],
              verdict: 'bad',
            },
            {
              label: 'Com button',
              code: '<h2>Bolo de milho</h2>\n<button type="button" onclick="favoritar()">\n  Favoritar\n</button>',
              speech: ['Bolo de milho, título nível 2', 'Favoritar, botão'],
              verdict: 'good',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Numa loja online, “Ver detalhes” abre a página do produto e “Adicionar ao carrinho” coloca o item no carrinho sem sair da página. Que elementos usar?',
          options: [
            {
              text: '“Ver detalhes” com `a href` e “Adicionar ao carrinho” com `button`',
              correct: true,
              feedback:
                'Isso. Um leva a outro endereço, então é link. O outro faz uma ação na página, então é botão.',
            },
            {
              text: 'Os dois com `button`, porque ambos parecem botões no visual',
              feedback:
                'A aparência é escolha do CSS. Um link com cara de botão continua sendo link. “Ver detalhes” leva a outra página, e só o link permite abrir em nova aba ou copiar o endereço.',
            },
            {
              text: 'Os dois com `a href`, porque são clicáveis',
              feedback:
                'Adicionar ao carrinho não leva a lugar nenhum: é uma ação. Usar link aqui confunde o leitor de tela, que anuncia que algo vai mudar de página.',
            },
            {
              text: 'Os dois com `div` e um clique em JavaScript',
              feedback:
                'Assim nenhum dos dois funciona pelo teclado nem é anunciado como clicável. Use as tags que já trazem esse comportamento.',
            },
          ],
        },
      ],
    },
    {
      id: 'texto-alternativo',
      title: 'Imagens que falam: texto alternativo',
      blocks: [
        {
          type: 'analogy',
          title: 'Descrever a foto por áudio',
          text: 'Alguém manda uma foto no grupo da família, e a sua avó, que não enxerga bem, pergunta por áudio: “o que tem na foto?”. Você não responde “uma imagem”. Responde “o Pedro soprando as velas do bolo de 5 anos”. O atributo `alt` é essa resposta.',
        },
        {
          type: 'text',
          text: 'Pergunte: se a imagem sumisse, que informação faltaria? Essa é a resposta que vai no `alt`. Uma imagem **informativa** precisa de uma descrição curta e direta. Não comece com “imagem de” ou “foto de”, porque o leitor de tela já avisa que é uma imagem.',
        },
        {
          type: 'text',
          text: 'Já uma imagem **decorativa**, que só enfeita, leva `alt=""`, com as aspas vazias. Assim o leitor de tela pula a imagem. Sem nenhum atributo `alt`, muitos leitores leem o nome do arquivo, como “I M G 2 0 4 7 ponto jota pê gê”.',
        },
        {
          type: 'classify',
          prompt: 'Para cada caso, o texto alternativo está bom ou precisa melhorar?',
          buckets: ['Está bom', 'Precisa melhorar'],
          items: [
            {
              text: 'Foto do produto num site de loja: `alt="Bolo de milho cortado em fatias num prato branco"`',
              bucket: 0,
            },
            { text: 'Ícone de telefone ao lado do texto “(81) 3333-4444”: `alt=""`', bucket: 0 },
            {
              text: 'Gráfico de vendas: `alt="Vendas de pão subiram de 200 para 260 por dia entre janeiro e março"`',
              bucket: 0,
            },
            { text: 'Foto do produto: `alt="imagem"`', bucket: 1 },
            { text: 'Foto do produto: `alt="IMG_2047.jpg"`', bucket: 1 },
            { text: 'Gráfico de vendas: `alt="Gráfico"`', bucket: 1 },
            { text: 'Foto do produto sem nenhum atributo `alt`', bucket: 1 },
            {
              text: 'Enfeite de flores no canto da página: `alt="Enfeite decorativo de flores"`',
              bucket: 1,
            },
          ],
          explanation:
            'O ícone de telefone é decorativo porque o número já está escrito ao lado; descrever o ícone só repetiria a informação. Já o enfeite de flores atrapalha quando é descrito: a pessoa ouve algo que não acrescenta nada.',
        },
      ],
    },
    {
      id: 'formularios',
      title: 'Formulários que qualquer pessoa preenche',
      blocks: [
        {
          type: 'text',
          text: 'Formulários são onde a pessoa faz o que veio fazer: se inscrever, comprar, pedir ajuda. Um campo sem nome claro, para quem usa leitor de tela, é como uma ficha de papel com espaços em branco e nenhuma pergunta escrita.',
        },
        {
          type: 'text',
          text: 'Todo campo precisa de um `label`, o rótulo que diz o que preencher. Para ligar os dois, o `for` do label recebe o mesmo valor do `id` do campo. Outra forma é colocar o campo **dentro** do label. Com isso, o leitor de tela anuncia o nome do campo e clicar no texto também coloca o cursor no campo.',
        },
        {
          type: 'screenReader',
          caption: 'O que o leitor de tela anuncia quando o foco chega no campo de e-mail',
          variants: [
            {
              label: 'Sem label',
              code: '<p>E-mail</p>\n<input type="email" placeholder="voce@exemplo.com">',
              speech: ['Editar texto', 'Em branco'],
              verdict: 'bad',
            },
            {
              label: 'Com label ligado ao campo',
              code: '<label for="email">E-mail</label>\n<input type="email" id="email" required>',
              speech: ['E-mail, editar texto, obrigatório', 'Em branco'],
              verdict: 'good',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Placeholder não é rótulo',
          text: 'O `placeholder` é aquele texto cinza dentro do campo. Ele some assim que a pessoa começa a digitar, tem pouco contraste e nem todo leitor de tela anuncia. Use-o só para dar um exemplo, como `voce@exemplo.com`, e sempre junto com um `label`.',
        },
        {
          type: 'table',
          caption: 'Tipos de campo que ajudam a pessoa a preencher',
          head: ['Tipo', 'Para quê', 'O que ganha'],
          rows: [
            [
              '`type="email"`',
              'Endereço de e-mail',
              'Teclado com `@` no celular e verificação de formato',
            ],
            ['`type="tel"`', 'Telefone', 'Teclado numérico de telefone'],
            [
              '`type="number"`',
              'Quantidades para contas, como “quantos pães”',
              'Setinhas para aumentar e diminuir',
            ],
            ['`type="password"`', 'Senha', 'Esconde o que é digitado'],
            ['`type="date"`', 'Datas', 'Um calendário para escolher o dia'],
          ],
        },
        {
          type: 'text',
          text: 'O navegador também valida sem nenhum JavaScript. O atributo `required` torna o campo obrigatório, e `minlength="3"` exige pelo menos três caracteres. Se faltar algo, o navegador não envia e mostra um aviso ao lado do campo.',
        },
        {
          type: 'code',
          language: 'html',
          caption:
            'Opções de escolha única: os radios ficam num fieldset, e a pergunta vai no legend',
          code: '<fieldset>\n  <legend>Turno preferido</legend>\n  <label><input type="radio" name="turno" value="manha"> Manhã</label>\n  <label><input type="radio" name="turno" value="noite"> Noite</label>\n</fieldset>\n\n<button type="submit">Enviar inscrição</button>',
        },
        {
          type: 'text',
          text: 'O `fieldset` agrupa as opções e o `legend` é a pergunta, que o leitor de tela anuncia junto com cada opção. O mesmo `name` em todos os radios garante que só uma possa ser escolhida. Por fim, o `button type="submit"` envia o formulário.',
        },
        {
          type: 'quiz',
          question: 'Qual tipo de campo usar para o CEP, como `01001-000`?',
          options: [
            {
              text: '`type="text"` com `inputmode="numeric"`',
              correct: true,
              feedback:
                'Isso. CEP é feito de dígitos, mas não é um número para fazer contas. O `inputmode="numeric"` mostra o teclado de números no celular sem tratar o valor como quantidade.',
            },
            {
              text: '`type="number"`',
              feedback:
                'Parece natural, mas `number` é para quantidades: pode sumir com o zero do começo, aceita setinhas que mudam o valor e não aceita o hífen. CEP, CPF e cartão não são números de conta.',
            },
            {
              text: '`type="email"`',
              feedback:
                'O navegador ia exigir um `@` no campo e recusar qualquer CEP como inválido.',
            },
            {
              text: 'Tanto faz, todos os tipos funcionam igual',
              feedback:
                'Cada tipo muda o teclado no celular e a validação do navegador. A escolha certa poupa trabalho de quem preenche.',
            },
          ],
        },
        {
          type: 'fill',
          prompt:
            'Complete o formulário: o label do telefone ligado ao campo, um campo com teclado de telefone e uma data de nascimento obrigatória.',
          language: 'html',
          template:
            '<label [[for]]="telefone">Telefone</label>\n<input type="[[tel]]" id="[[telefone]]" name="telefone">\n\n<label for="nascimento">Data de nascimento</label>\n<input type="[[date]]" id="nascimento" name="nascimento" [[required]]>',
          explanation:
            'O `for` do label e o `id` do campo precisam ser idênticos, letra por letra. É essa ligação que faz o leitor de tela anunciar “Telefone” quando o foco chega no campo.',
        },
      ],
    },
    {
      id: 'formulario-na-pratica',
      title: 'Mão na massa: um formulário de inscrição',
      blocks: [
        {
          type: 'text',
          text: 'Uma ONG do bairro vai abrir uma oficina gratuita de programação e precisa de um formulário de inscrição. O rascunho abaixo funciona na tela, mas tem vários problemas escondidos. Conserte um por um.',
        },
        {
          type: 'playground',
          title: 'Formulário de inscrição acessível',
          task: 'Ligue cada campo a um `label`, troque o campo de e-mail para `type="email"` e deixe-o obrigatório com `required`, e troque a `div` de envio por um `button` de envio. Se quiser ir além, adicione a escolha de turno com `fieldset` e `legend`. Ao enviar, a prévia simula o envio.',
          html: '<form>\n  <h2>Inscrição na oficina de programação</h2>\n\n  <p>Nome completo</p>\n  <input type="text" id="nome" name="nome">\n\n  <input type="text" name="email" placeholder="Seu e-mail">\n\n  <div class="enviar">Enviar</div>\n</form>\n',
          height: 320,
          checks: [
            {
              label: 'Todo campo tem um `label` ligado a ele',
              test: "const fields = Array.from(document.querySelectorAll('input, select, textarea')).filter((field) => !['hidden', 'submit', 'button', 'reset'].includes(field.type)); return fields.length > 0 && fields.every((field) => Array.from(field.labels || []).some((label) => label.textContent.trim().length > 0));",
            },
            {
              label: 'Existe um campo `type="email"`',
              test: 'return !!document.querySelector(\'input[type="email"]\');',
            },
            {
              label: 'O e-mail é obrigatório (`required`)',
              test: 'return document.querySelector(\'input[type="email"]\')?.required === true;',
            },
            {
              label: 'Existe um botão de envio com texto',
              test: "return Array.from(document.querySelectorAll('form button')).some((button) => button.type === 'submit' && button.textContent.trim().length > 0) || !!document.querySelector('form input[type=\"submit\"][value]');",
            },
          ],
          solution: {
            html: '<form>\n  <h2>Inscrição na oficina de programação</h2>\n\n  <label for="nome">Nome completo</label>\n  <input type="text" id="nome" name="nome" required minlength="3">\n\n  <label for="email">E-mail</label>\n  <input type="email" id="email" name="email" placeholder="voce@exemplo.com" required>\n\n  <fieldset>\n    <legend>Turno preferido</legend>\n    <label><input type="radio" name="turno" value="manha"> Manhã</label>\n    <label><input type="radio" name="turno" value="noite"> Noite</label>\n  </fieldset>\n\n  <button type="submit">Enviar inscrição</button>\n</form>\n',
          },
        },
        {
          type: 'reveal',
          question:
            'Na prévia da sua solução, clique no texto “E-mail” em vez de clicar no campo. O que acontece, e o que isso prova?',
          answer:
            'O cursor vai para o campo de e-mail. Isso prova que o label está ligado ao campo, e é a mesma ligação que o leitor de tela usa para anunciar o nome. De quebra, a área de toque fica maior, o que ajuda muito no celular e para quem tem tremor nas mãos.',
        },
      ],
    },
  ],
  recap: [
    'HTML semântico escolhe a tag pelo significado; `div` é só uma caixa sem significado.',
    'Os marcos `header`, `nav`, `main` e `footer`, junto com `section`, `article` e `aside`, organizam a página e permitem saltar entre regiões.',
    'Link (`a href`) leva a outro lugar; botão (`button`) faz uma ação na página.',
    'Imagens informativas levam um `alt` que diz o que se perderia sem elas; imagens decorativas levam `alt=""`.',
    'Todo campo de formulário tem um `label` ligado pelo `for` e `id`, o tipo certo e validação nativa como `required`; o `placeholder` não substitui o rótulo.',
  ],
  cards: [
    {
      id: 'semantica',
      front: 'O que é HTML semântico?',
      back: 'Escolher cada tag pelo significado do conteúdo, e não pela aparência.',
    },
    {
      id: 'marcos',
      front: 'Quais tags criam as regiões principais de uma página?',
      back: '`header`, `nav`, `main` (só um por página) e `footer`.',
    },
    {
      id: 'link-botao',
      front: 'Quando usar link e quando usar botão?',
      back: 'Link (`a href`) quando leva a outro lugar. Botão (`button`) quando faz uma ação na página.',
    },
    {
      id: 'div-botao',
      front: 'Por que não fazer um botão com `div` e clique em JavaScript?',
      back: 'A `div` não recebe foco pelo teclado, não responde ao `Enter` e o leitor de tela não anuncia que é clicável.',
    },
    {
      id: 'alt-decorativo',
      front: 'Que `alt` usar numa imagem só decorativa?',
      back: '`alt=""`, com aspas vazias, para o leitor de tela pular a imagem.',
    },
    {
      id: 'label-for',
      front: 'Como ligar um `label` a um campo?',
      back: 'O `for` do label recebe o mesmo valor do `id` do campo, ou o campo fica dentro do label.',
    },
    {
      id: 'placeholder',
      front: 'Por que o `placeholder` não substitui o `label`?',
      back: 'Ele some ao digitar, tem pouco contraste e nem sempre é anunciado pelo leitor de tela.',
    },
    {
      id: 'fieldset-legend',
      front: 'Para que servem `fieldset` e `legend`?',
      back: 'Agrupar opções relacionadas, como radios, e dar a elas uma pergunta que é anunciada junto com cada opção.',
    },
  ],
  mission: {
    title: 'Uma página que funciona sem mouse',
    text: 'Construa uma página completa com navegação, formulário e imagens, e prove que ela funciona só com o teclado. Coloque no repositório do seu projeto.',
    steps: [
      'Monte uma página com `header`, `nav` com pelo menos três links, `main` com um único `h1` e `footer`',
      'Inclua duas imagens: uma informativa, com `alt` descritivo, e uma decorativa, com `alt=""`',
      'Crie um formulário de contato com nome, e-mail e telefone, cada um com `label`, tipo certo e `required` onde fizer sentido',
      'Percorra a página só com `Tab`, `Shift` + `Tab`, `Enter` e `Espaço`: todo link, campo e botão precisa ser alcançado e usado',
      'Peça a uma IA uma revisão da semântica e dos labels, confira cada sugestão na MDN e aplique só as que você entender',
    ],
  },
  sources: [
    {
      title: 'MDN: HTML, uma boa base para acessibilidade',
      url: 'https://developer.mozilla.org/pt-BR/docs/Learn/Accessibility/HTML',
    },
    {
      title: 'MDN: Formulários da web',
      url: 'https://developer.mozilla.org/pt-BR/docs/Learn/Forms',
    },
    {
      title: 'web.dev: Learn Forms',
      url: 'https://web.dev/learn/forms',
    },
    {
      title: 'W3C WAI: árvore de decisão para o atributo alt',
      url: 'https://www.w3.org/WAI/tutorials/images/decision-tree/',
    },
  ],
};
