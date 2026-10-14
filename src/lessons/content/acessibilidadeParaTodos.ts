import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Agora mesmo, alguém está tentando marcar uma consulta pelo celular sem enxergar a tela, e outra pessoa está pagando um boleto só com o teclado porque não consegue usar o mouse. Se o site foi bem feito, as duas conseguem. Se não foi, a página simplesmente fecha a porta para elas. Nesta aula você aprende a construir páginas que deixam todo mundo entrar e a testar isso com as próprias mãos.',
  sections: [
    {
      id: 'quem-usa-a-web',
      title: 'Quem usa a web de um jeito diferente do seu',
      blocks: [
        {
          type: 'text',
          text: '**Acessibilidade** é garantir que qualquer pessoa consiga perceber, entender e usar uma página, com ou sem deficiência. Não é um recurso extra para poucas pessoas: é parte de fazer o trabalho direito.',
        },
        {
          type: 'analogy',
          title: 'A rampa da calçada',
          text: 'O rebaixamento da guia na esquina foi pensado para quem usa cadeira de rodas. Mas quem passa por ele todo dia? A mãe com carrinho de bebê, o entregador com o carrinho de mão, o turista com a mala, a senhora com o carrinho da feira. Na web é igual: o que você faz para incluir alguém acaba ajudando muito mais gente.',
        },
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              label: 'Visão',
              title: 'Pessoas cegas',
              text: 'Usam um **leitor de tela**, um programa que lê a página em voz alta, e navegam pelo teclado ou por gestos no celular.',
            },
            {
              label: 'Visão',
              title: 'Baixa visão',
              text: 'Aumentam o zoom, usam letras grandes e dependem de bom contraste entre o texto e o fundo.',
            },
            {
              label: 'Visão',
              title: 'Daltonismo',
              text: 'Não distinguem certas cores, como vermelho e verde. Um aviso que depende só da cor passa despercebido.',
            },
            {
              label: 'Movimento',
              title: 'Deficiência motora',
              text: 'Podem não usar mouse: navegam só pelo teclado, por um acionador com a cabeça ou por comandos de voz.',
            },
            {
              label: 'Audição',
              title: 'Pessoas surdas',
              text: 'Precisam de legendas e transcrições. Para muitas, a primeira língua é a Libras, e textos simples ajudam.',
            },
            {
              label: 'Cognição',
              title: 'Deficiência intelectual, TDAH, dislexia',
              text: 'Ganham com frases curtas, passos claros, mensagens de erro que explicam o que fazer e páginas sem distrações piscando.',
            },
            {
              label: 'Idade',
              title: 'Pessoas idosas',
              text: 'A visão, a audição e a precisão das mãos mudam com o tempo. Botões pequenos e texto miúdo viram barreira.',
            },
            {
              label: 'Todo mundo',
              title: 'Temporária ou situacional',
              text: 'Um braço quebrado, o sol batendo na tela, um bebê no colo, um ônibus barulhento sem fone. Qualquer pessoa passa por isso.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Segundo o IBGE, em 2022 o Brasil tinha cerca de **18,6 milhões de pessoas com deficiência**. E a **Lei Brasileira de Inclusão** (Lei 13.146/2015) diz que sites de empresas que atuam no país e de órgãos de governo precisam ser acessíveis. Ou seja: além de justo, é obrigatório.',
        },
        {
          type: 'classify',
          prompt:
            'Cada situação abaixo dificulta usar uma página. Ela é permanente, temporária ou situacional?',
          buckets: ['Permanente', 'Temporária', 'Situacional'],
          items: [
            { text: 'Pessoa cega desde o nascimento', bucket: 0 },
            { text: 'Pessoa surda', bucket: 0 },
            { text: 'Braço engessado por seis semanas', bucket: 1 },
            { text: 'Recuperação de uma cirurgia nos olhos', bucket: 1 },
            { text: 'Segurando um bebê com um dos braços', bucket: 2 },
            { text: 'Sol forte batendo na tela do celular', bucket: 2 },
            { text: 'Ônibus barulhento e nenhum fone de ouvido', bucket: 2 },
          ],
          explanation:
            'Repare que as colunas “temporária” e “situacional” podem incluir você hoje mesmo. Por isso acessibilidade não é sobre “os outros”: é sobre qualquer pessoa, em algum momento.',
        },
      ],
    },
    {
      id: 'quatro-principios',
      title: 'Quatro perguntas para qualquer página',
      blocks: [
        {
          type: 'text',
          text: 'Existe um guia internacional de acessibilidade na web, chamado **WCAG** (Diretrizes de Acessibilidade para Conteúdo Web). Ele é grande, mas cabe em quatro princípios. Pense neles como quatro perguntas que você faz a cada tela.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Perceptível',
              text: 'A pessoa consegue **perceber** o conteúdo com algum sentido? Imagem precisa de descrição em texto, vídeo precisa de legenda, texto precisa de contraste.',
            },
            {
              term: 'Operável',
              text: 'A pessoa consegue **usar** todos os controles? Tudo deve funcionar pelo teclado, sem exigir mouse, e sem prazos impossíveis.',
            },
            {
              term: 'Compreensível',
              text: 'A pessoa consegue **entender** o que está escrito e o que acontece? Linguagem clara, navegação previsível, erros que explicam como corrigir.',
            },
            {
              term: 'Robusto',
              text: 'A página funciona com diferentes **tecnologias assistivas**, os programas e aparelhos que ajudam pessoas com deficiência? Isso depende de HTML correto, que esses programas sabem ler.',
            },
          ],
        },
        {
          type: 'classify',
          prompt: 'Qual dos quatro princípios cada problema quebra?',
          buckets: ['Perceptível', 'Operável', 'Compreensível', 'Robusto'],
          items: [
            { text: 'Vídeo de aula sem legenda', bucket: 0 },
            { text: 'Gráfico importante sem texto alternativo', bucket: 0 },
            { text: 'Menu que só abre passando o mouse por cima', bucket: 1 },
            { text: 'Formulário que expira em 20 segundos', bucket: 1 },
            { text: 'Mensagem de erro dizendo só “Erro 0x34”', bucket: 2 },
            { text: 'Menu que muda de ordem em cada página', bucket: 2 },
            {
              text: 'Botão feito com `<div>` que o leitor de tela não reconhece como botão',
              bucket: 3,
            },
            { text: 'Caixa de seleção inventada que não informa se está marcada', bucket: 3 },
          ],
          explanation:
            'Alguns problemas tocam mais de um princípio, e tudo bem. O valor das quatro perguntas é lembrar você de olhar a página por ângulos diferentes: ver, usar, entender e funcionar com outros programas.',
        },
      ],
    },
    {
      id: 'teclado-e-foco',
      title: 'Só com o teclado',
      blocks: [
        {
          type: 'text',
          text: 'Muita gente navega sem mouse. Para isso, a página precisa de duas coisas: todo controle deve ser alcançável pelo teclado, e deve ficar claro **onde** você está. Esse “onde” se chama **foco**: o elemento que vai receber a próxima tecla.',
        },
        {
          type: 'table',
          caption: 'As teclas que você vai usar o tempo todo',
          head: ['Tecla', 'O que faz'],
          rows: [
            ['`Tab`', 'Leva o foco para o próximo link, botão ou campo'],
            ['`Shift` + `Tab`', 'Volta para o elemento anterior'],
            ['`Enter`', 'Abre um link ou aciona um botão'],
            ['`Espaço`', 'Aciona um botão, marca uma caixa de seleção ou rola a página'],
            [
              'Setas',
              'Escolhem entre opções de um mesmo grupo, como botões de rádio e listas de seleção',
            ],
            ['`Esc`', 'Fecha janelas e menus abertos'],
          ],
        },
        {
          type: 'analogy',
          title: 'A lanterna no escuro',
          text: 'Navegar pelo teclado é como andar por uma casa escura com uma lanterna: você só sabe onde está porque a luz mostra. O **indicador de foco**, aquele contorno em volta do elemento, é a lanterna. Tirar o contorno é apagar a luz e deixar a pessoa adivinhando.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'O erro mais comum',
          text: 'Muita gente acha o contorno de foco feio e escreve `outline: none` no CSS. A página fica “mais limpa” para quem usa mouse e impossível para quem usa teclado. Você pode mudar o visual do foco, nunca removê-lo.',
        },
        {
          type: 'text',
          text: 'A pseudo-classe `:focus-visible` aplica um estilo quando o elemento recebe foco e o navegador entende que a pessoa precisa vê-lo, como ao usar o teclado. Assim você desenha um foco bonito e bem visível.',
        },
        {
          type: 'playground',
          title: 'Acenda a lanterna',
          task: 'Clique na prévia e aperte `Tab` algumas vezes: você não sabe onde está. Apague a regra com `outline: none` e crie um estilo para `a:focus-visible` e `button:focus-visible` com um `outline` bem visível, por exemplo `outline: 3px solid #1d4ed8;`. Depois teste de novo com `Tab`.',
          html: '<nav>\n  <a href="#inicio">Início</a>\n  <a href="#cardapio">Cardápio</a>\n  <a href="#contato">Contato</a>\n</nav>\n<p>Pão de queijo quentinho saindo agora.</p>\n<button type="button">Fazer pedido</button>\n<button type="button">Ver promoções</button>',
          css: 'body {\n  font-family: system-ui, sans-serif;\n  padding: 16px;\n}\n\nnav {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 12px;\n}\n\na {\n  color: #1d4ed8;\n}\n\nbutton {\n  padding: 10px 16px;\n  margin-right: 8px;\n  border: 0;\n  border-radius: 8px;\n  background: #1e293b;\n  color: #ffffff;\n}\n\na,\nbutton {\n  outline: none;\n}\n',
          checks: [
            {
              label: 'Existe um estilo em `:focus-visible` com `outline` ou `box-shadow`',
              test: "try {\n  const rules = [...document.styleSheets].flatMap((s) => [...s.cssRules]).filter((r) => r.style && r.selectorText);\n  return rules.some((r) => r.selectorText.includes(':focus-visible') && ((r.style.outlineStyle && r.style.outlineStyle !== 'none') || (r.style.boxShadow && r.style.boxShadow !== 'none')));\n} catch (e) {\n  return false;\n}",
            },
            {
              label: 'O foco visível vale para links e para botões',
              test: "try {\n  const rules = [...document.styleSheets].flatMap((s) => [...s.cssRules]).filter((r) => r.style && r.selectorText);\n  const visible = rules.filter((r) => r.selectorText.includes(':focus-visible') && ((r.style.outlineStyle && r.style.outlineStyle !== 'none') || (r.style.boxShadow && r.style.boxShadow !== 'none')));\n  const selectors = visible.map((r) => r.selectorText).join(', ');\n  const everyone = /(^|,)\\s*\\*?:focus-visible/.test(selectors);\n  return everyone || (/(^|[\\s,])a:focus-visible/.test(selectors) && /button:focus-visible/.test(selectors));\n} catch (e) {\n  return false;\n}",
            },
            {
              label: 'Nenhuma regra apaga o contorno com `outline: none`',
              test: "try {\n  const rules = [...document.styleSheets].flatMap((s) => [...s.cssRules]).filter((r) => r.style && r.selectorText);\n  return !rules.some((r) => r.style.outlineStyle === 'none' && !r.selectorText.includes(':not(:focus-visible)'));\n} catch (e) {\n  return false;\n}",
            },
          ],
          solution: {
            css: 'body {\n  font-family: system-ui, sans-serif;\n  padding: 16px;\n}\n\nnav {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 12px;\n}\n\na {\n  color: #1d4ed8;\n}\n\nbutton {\n  padding: 10px 16px;\n  margin-right: 8px;\n  border: 0;\n  border-radius: 8px;\n  background: #1e293b;\n  color: #ffffff;\n}\n\na:focus-visible,\nbutton:focus-visible {\n  outline: 3px solid #1d4ed8;\n  outline-offset: 3px;\n}\n',
          },
        },
        {
          type: 'quiz',
          question:
            'Alguém fez o botão “Comprar” com `<div onclick="comprar()">Comprar</div>`. O que acontece com quem usa só o teclado?',
          options: [
            {
              text: 'Nada muda: o `Tab` chega no botão e o `Enter` funciona',
              feedback:
                'Uma `<div>` não é interativa por padrão. O `Tab` só para em links, botões e campos, então ele pula essa `<div>`.',
            },
            {
              text: 'O `Tab` passa direto e a pessoa nunca consegue comprar',
              correct: true,
              feedback:
                'Isso. A `<div>` não recebe foco nem responde ao `Enter` ou ao `Espaço`. Com `<button>`, tudo isso vem pronto, de graça.',
            },
            {
              text: 'Funciona, desde que a página tenha um bom contraste',
              feedback:
                'Contraste ajuda quem enxerga pouco, mas não torna nada alcançável pelo teclado. São problemas diferentes.',
            },
          ],
        },
      ],
    },
    {
      id: 'contraste-e-cor',
      title: 'Contraste e cor',
      blocks: [
        {
          type: 'text',
          text: '**Contraste** é a diferença de claridade entre o texto e o fundo. Ele é medido por uma razão: `1:1` é cor igual sobre cor igual, e `21:1` é preto sobre branco. Quanto maior, mais fácil de ler.',
        },
        {
          type: 'list',
          items: [
            'Texto comum precisa de pelo menos **4,5:1**.',
            'Texto grande (a partir de uns 24px, ou 19px em negrito) e ícones importantes precisam de pelo menos **3:1**.',
          ],
        },
        {
          type: 'text',
          text: 'O cinza clarinho sobre branco está na moda e reprova quase sempre. Experimente: este laboratório começa com uma combinação ruim. Escureça a cor do texto até passar no nível AA de texto normal.',
        },
        { type: 'contrast', foreground: '#a3a3a3', background: '#ffffff' },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Onde conferir no dia a dia',
          text: 'No Chrome, inspecione um texto com o DevTools e clique na amostra de cor: ele mostra a razão de contraste e se ela passa. Faça isso antes de escolher a paleta, não depois.',
        },
        {
          type: 'text',
          text: 'Outra regra: **nunca use só a cor** para passar uma informação. Quem tem daltonismo pode não ver a diferença entre o vermelho e o verde. Junte a cor com texto, ícone ou forma.',
        },
        {
          type: 'quiz',
          question:
            'Num formulário de cadastro, os campos com erro ficam só com a borda vermelha. Qual é o problema?',
          options: [
            {
              text: 'Nenhum: vermelho é a cor universal de erro',
              feedback:
                'Para quem distingue vermelho, sim. Mas pessoas com daltonismo e leitores de tela não recebem essa informação.',
            },
            {
              text: 'Quem não distingue vermelho, ou não enxerga, não sabe qual campo errou nem por quê',
              correct: true,
              feedback:
                'Exato. A correção é escrever a mensagem perto do campo, como “Informe um e-mail com @”, e manter a borda como reforço.',
            },
            {
              text: 'A borda deveria ser amarela, que chama mais atenção',
              feedback:
                'Trocar a cor não resolve: a informação continua dependendo só da cor. O que falta é texto explicando o erro.',
            },
          ],
        },
      ],
    },
    {
      id: 'leitor-de-tela',
      title: 'Como um leitor de tela lê sua página',
      blocks: [
        {
          type: 'text',
          text: 'Um **leitor de tela** transforma a página em fala, ou em braile num aparelho próprio. Ele não “vê” o desenho: ele lê o HTML. Para cada elemento, anuncia o **nome** (o que é escrito ou descrito), o **papel** (botão, link, campo, imagem) e o **estado** (obrigatório, marcado, expandido).',
        },
        {
          type: 'analogy',
          title: 'O amigo que lê o cardápio',
          text: 'Imagine pedir a um amigo que leia o cardápio do restaurante para você pelo telefone. Se o cardápio tem só fotos sem nome, ele vai dizer “tem uma foto aqui, outra aqui”. O leitor de tela é esse amigo: ele só consegue dizer o que está escrito no código.',
        },
        {
          type: 'screenReader',
          caption: 'A mesma imagem, sem e com texto alternativo. Ouça as duas versões.',
          variants: [
            {
              label: 'Sem alt',
              code: '<img src="IMG_2041.jpg">',
              speech: ['Imagem, IMG_2041.jpg'],
              verdict: 'bad',
            },
            {
              label: 'Com alt útil',
              code: '<img\n  src="IMG_2041.jpg"\n  alt="Gráfico de vendas de março: alta de 20% em relação a fevereiro">',
              speech: ['Gráfico de vendas de março: alta de 20% em relação a fevereiro, imagem'],
              verdict: 'good',
            },
          ],
        },
        {
          type: 'screenReader',
          caption:
            'Um formulário de newsletter. Na primeira versão, o texto “E-mail” está solto e o botão é uma `<div>`.',
          variants: [
            {
              label: 'Sem label e com div',
              code: '<p>E-mail</p>\n<input type="email" required>\n<div class="botao" onclick="assinar()">\n  Assinar\n</div>',
              speech: ['Editar texto, obrigatório', 'Assinar'],
              verdict: 'bad',
            },
            {
              label: 'Com label e button',
              code: '<label for="email">E-mail</label>\n<input id="email" type="email" required>\n<button type="submit">Assinar</button>',
              speech: ['Editar texto, E-mail, obrigatório', 'Assinar, botão'],
              verdict: 'good',
            },
          ],
        },
        {
          type: 'reveal',
          question:
            'Na primeira versão do formulário, a pessoa ouviu “Assinar”. Por que isso não basta?',
          answer:
            'Porque ela não sabe que é um botão, e o `Tab` nem chega nele. Além disso, o campo foi anunciado sem nome: “editar texto” de quê? O `<label>` ligado pelo `for` e o `<button>` resolvem os dois problemas sem nenhum código extra.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'A primeira regra do ARIA',
          text: '**ARIA** é um conjunto de atributos, como `role` e `aria-label`, que dá informações extras aos leitores de tela. A primeira regra dele é: se existe um elemento HTML nativo que já faz o que você quer, use o elemento. ARIA mal usado piora a página.',
        },
        {
          type: 'codeTabs',
          caption: 'Dois botões que soam parecidos, mas dão trabalhos muito diferentes',
          tabs: [
            {
              label: 'Remendo com ARIA',
              language: 'html',
              code: '<!-- Precisa de role, tabindex e ainda de JavaScript\n     para responder ao Enter e ao Espaço -->\n<div role="button" tabindex="0" onclick="assinar()">\n  Assinar\n</div>',
            },
            {
              label: 'HTML nativo',
              language: 'html',
              code: '<!-- Foco, Enter, Espaço e o anúncio "botão" já vêm prontos -->\n<button type="button" onclick="assinar()">Assinar</button>',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'O logotipo da Padaria Pão Quente fica no topo e é um link para a página inicial. Qual o melhor `alt` para essa imagem?',
          options: [
            {
              text: '`alt="logo.png"`',
              feedback:
                'Nome de arquivo não diz nada a ninguém. O leitor vai anunciar “link, logo.png”.',
            },
            {
              text: '`alt="Imagem do logotipo"`',
              feedback:
                'O leitor já anuncia que é uma imagem, então “imagem de” é repetido. E não diz para onde o link leva.',
            },
            {
              text: '`alt="Padaria Pão Quente, página inicial"`',
              correct: true,
              feedback:
                'Isso. Quando a imagem é um link, o `alt` vira o nome do link: diga o que ele faz. A pessoa ouve “Padaria Pão Quente, página inicial, link”.',
            },
            {
              text: '`alt=""`',
              feedback:
                '`alt` vazio serve para imagens decorativas, que o leitor deve ignorar. Aqui a imagem é o único conteúdo do link, que ficaria sem nome.',
            },
          ],
        },
      ],
    },
    {
      id: 'como-testar',
      title: 'Uma rotina para testar qualquer página',
      blocks: [
        {
          type: 'text',
          text: 'Ferramentas automáticas, como o **Lighthouse** do Chrome, encontram parte dos problemas em segundos: imagem sem `alt`, campo sem label, contraste baixo. Mas elas não entendem significado. Elas sabem que existe um `alt`, não se ele faz sentido.',
        },
        {
          type: 'quiz',
          question:
            'Qual destes problemas uma ferramenta automática **não** consegue confirmar sozinha?',
          options: [
            {
              text: 'Uma imagem sem o atributo `alt`',
              feedback:
                'Esse é fácil de detectar: basta olhar se o atributo existe. As ferramentas pegam na hora.',
            },
            {
              text: 'Um campo de formulário sem `<label>`',
              feedback:
                'Também é detectável pelo código: a ferramenta vê que o campo não tem nome acessível.',
            },
            {
              text: 'Se o texto alternativo descreve bem a imagem',
              correct: true,
              feedback:
                'Exato. `alt="foto"` passa no teste automático e não ajuda ninguém. Só uma pessoa olhando a imagem e ouvindo o texto consegue julgar.',
            },
            {
              text: 'Texto cinza-claro sobre fundo branco',
              feedback:
                'Contraste é uma conta com as duas cores. Na maioria dos casos, a ferramenta calcula e avisa.',
            },
          ],
        },
        {
          type: 'steps',
          items: [
            {
              title: '1. Teclado',
              text: 'Deixe o mouse de lado e use a página com `Tab`, `Shift` + `Tab`, `Enter` e `Espaço`. O foco aparece sempre? Segue a ordem da leitura? Você consegue sair de toda janela aberta?',
            },
            {
              title: '2. Zoom de 200%',
              text: 'Aperte `Ctrl` e `+` (no Mac, `Cmd` e `+`) até 200%. Nenhum texto pode sumir, ficar cortado ou por cima de outro.',
            },
            {
              title: '3. Contraste e cor',
              text: 'Confira textos, botões e ícones no DevTools. Procure informações passadas só pela cor.',
            },
            {
              title: '4. Leitor de tela',
              text: 'Ouça a página: imagens, campos, botões e mensagens de erro são anunciados com nomes que fazem sentido?',
            },
          ],
        },
        {
          type: 'order',
          prompt: 'Coloque a rotina de teste desta aula na ordem.',
          items: [
            'Usar a página só com o teclado, observando o foco',
            'Aumentar o zoom para 200%',
            'Conferir o contraste e o uso de cor',
            'Ouvir a página com um leitor de tela',
          ],
          explanation:
            'A ordem vai do teste mais rápido, que não exige nada instalado, ao que pede mais prática. O teclado sozinho já revela muitos problemas em um minuto.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros que aparecem em quase todo projeto iniciante',
          text: '`outline: none` sem substituto. Botões feitos com `<div>` ou `<span>`. Texto do campo escrito só no `placeholder`, que some ao digitar. Links com o texto “clique aqui”, que não dizem para onde vão. Avisos que dependem só da cor.',
        },
      ],
    },
  ],
  recap: [
    'Acessibilidade beneficia pessoas com deficiência, pessoas idosas e qualquer pessoa numa limitação temporária ou situacional; no Brasil, a Lei Brasileira de Inclusão a torna obrigatória.',
    'As quatro perguntas são: dá para **perceber**, **operar**, **compreender** e funciona de forma **robusta** com tecnologias assistivas?',
    'Tudo deve funcionar só com o teclado, e o foco precisa estar sempre visível: estilize com `:focus-visible`, nunca remova.',
    'Texto comum precisa de contraste de pelo menos 4,5:1, e nenhuma informação pode depender só da cor.',
    'O leitor de tela lê o HTML: `alt` útil, `<label>` nos campos e elementos nativos como `<button>` fazem a página falar direito.',
  ],
  cards: [
    {
      id: 'quem-se-beneficia',
      front: 'Dê um exemplo de limitação temporária e um de limitação situacional.',
      back: 'Temporária: um braço engessado. Situacional: sol forte na tela ou um bebê no colo.',
    },
    {
      id: 'quatro-principios',
      front: 'Quais são os quatro princípios da acessibilidade na web?',
      back: 'Perceptível, operável, compreensível e robusto.',
    },
    {
      id: 'teclas-navegacao',
      front: 'Para que servem `Tab`, `Shift` + `Tab`, `Enter` e `Espaço`?',
      back: '`Tab` avança o foco, `Shift` + `Tab` volta, `Enter` abre links e aciona botões, `Espaço` aciona botões e marca caixas.',
    },
    {
      id: 'foco-visivel',
      front: 'Por que nunca usar `outline: none` sem colocar outro estilo de foco?',
      back: 'Porque quem usa teclado perde a noção de onde está. Use `:focus-visible` para desenhar um foco bem visível.',
    },
    {
      id: 'contraste-minimo',
      front: 'Qual o contraste mínimo para texto comum e para texto grande?',
      back: 'Texto comum: 4,5:1. Texto grande e ícones importantes: 3:1.',
    },
    {
      id: 'o-que-o-leitor-anuncia',
      front: 'O que um leitor de tela anuncia para cada elemento?',
      back: 'O nome, o papel (botão, link, campo, imagem) e o estado (obrigatório, marcado, expandido).',
    },
    {
      id: 'primeira-regra-aria',
      front: 'Qual é a primeira regra do ARIA?',
      back: 'Se existe um elemento HTML nativo que faz o que você precisa, use ele em vez de inventar com `role` e atributos ARIA.',
    },
  ],
  mission: {
    title: 'Faça uma tarefa real sem mouse e sem olhar',
    text: 'Escolha um site que você usa, como o de uma loja, de um serviço público ou de um banco, e complete uma tarefa de verdade usando a página de formas diferentes. Ler o código não confirma a acessibilidade: só o teste confirma.',
    steps: [
      'Escolha uma tarefa curta, como buscar um produto e colocá-lo no carrinho ou preencher um formulário de contato',
      'Faça a tarefa inteira só com o teclado e anote onde o foco sumiu, pulou fora de ordem ou ficou preso',
      'Ative um leitor de tela gratuito: NVDA no Windows, VoiceOver no Mac ou no iPhone, TalkBack no Android',
      'Repita a tarefa ouvindo: os campos têm nome? Os botões são anunciados como botões? As mensagens de erro são lidas?',
      'Peça a uma IA uma lista de verificações de acessibilidade e compare com o que você encontrou: o que ela só saberia testando?',
      'Escreva três problemas que você encontrou e como corrigiria cada um no HTML ou no CSS',
    ],
  },
  sources: [
    {
      title: 'W3C WAI: introdução à acessibilidade na web',
      url: 'https://www.w3.org/WAI/fundamentals/accessibility-intro/',
    },
    {
      title: 'web.dev: Learn Accessibility',
      url: 'https://web.dev/learn/accessibility',
    },
    {
      title: 'MDN: Acessibilidade',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/Accessibility',
    },
    {
      title: 'Lei Brasileira de Inclusão (Lei 13.146/2015)',
      url: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm',
    },
  ],
};
