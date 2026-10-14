import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Até agora seu JavaScript conversava só com o console. Nesta aula ele passa a mexer na página: mudar um preço, contar curtidas, filtrar uma lista enquanto a pessoa digita. É assim que funcionam o carrinho do iFood, o botão de favoritar e a busca de qualquer loja. Depois desta aula, a página deixa de ser um cartaz e vira uma conversa.',
  sections: [
    {
      id: 'arvore-viva',
      title: 'A página é uma árvore viva',
      blocks: [
        {
          type: 'text',
          text: 'Quando o navegador lê o seu HTML, ele não guarda o texto do arquivo. Ele monta na memória uma árvore de objetos, um para cada elemento. Essa árvore se chama **DOM** (Modelo de Objetos do Documento).',
        },
        {
          type: 'analogy',
          title: 'A planta e a casa construída',
          text: 'O arquivo HTML é a **planta** da casa. O DOM é a **casa já construída**. Pintar uma parede (mudar o DOM) não altera a planta guardada na gaveta (o arquivo). É na casa que as pessoas moram: a tela mostra sempre o DOM.',
        },
        {
          type: 'domTree',
          caption: 'Um cartão de produto e a árvore que o navegador monta a partir dele.',
          html: '<article class="cartao">\n  <h2>Pastel de feira</h2>\n  <p>R$ <span id="preco">8,00</span></p>\n  <button type="button">Adicionar</button>\n</article>',
        },
        {
          type: 'text',
          text: 'Cada caixinha da árvore é um **nó**. O JavaScript pode encontrar qualquer nó, ler o que tem dentro e mudá-lo. Quando ele muda, o navegador redesenha aquele pedaço da tela na hora, sem recarregar a página.',
        },
        {
          type: 'quiz',
          question:
            'Um script troca o preço do pastel de `8,00` para `7,00`. Você abre o arquivo `index.html` no editor. O que aparece lá?',
          options: [
            {
              text: '`8,00`, o valor original',
              correct: true,
              feedback:
                'Isso. O script mudou o DOM, a casa construída na memória do navegador. O arquivo é só a planta: continua igual até alguém editá-lo.',
            },
            {
              text: '`7,00`, porque o script salvou a mudança',
              feedback:
                'JavaScript no navegador não reescreve seus arquivos. Ele altera a árvore em memória; ao recarregar a página, tudo volta ao que o HTML diz.',
            },
            {
              text: 'Os dois valores, um embaixo do outro',
              feedback:
                'Não há cópia nenhuma no arquivo. O arquivo e o DOM são coisas separadas: o arquivo não sabe o que aconteceu na tela.',
            },
          ],
        },
      ],
    },
    {
      id: 'selecionar-e-alterar',
      title: 'Encontrar um elemento e mudá-lo',
      blocks: [
        {
          type: 'text',
          text: 'Para mudar algo, primeiro você precisa pegar o elemento. A boa notícia: você já sabe a linguagem para isso. `document.querySelector` aceita os mesmos **seletores** do CSS e devolve o primeiro elemento que combina.',
        },
        {
          type: 'anatomy',
          caption: 'Uma linha que encontra o preço e troca o texto dele.',
          language: 'js',
          parts: [
            {
              text: 'const preco',
              label: 'Variável',
              note: 'Guarda o elemento encontrado. Daqui para frente, `preco` é o próprio `<span>` da página, não uma cópia.',
            },
            { text: ' = ' },
            {
              text: 'document',
              label: 'O documento',
              note: 'O objeto que representa a página inteira, a raiz da árvore. Toda busca começa por ele.',
            },
            { text: '.' },
            {
              text: 'querySelector',
              label: 'Buscar um elemento',
              note: 'Procura na árvore e devolve o **primeiro** elemento que combina com o seletor. Se não achar nenhum, devolve `null`.',
            },
            { text: '(' },
            {
              text: "'#preco'",
              label: 'Seletor CSS',
              note: 'O mesmo seletor que você usaria no CSS: `#preco` é o id, `.cartao` é uma classe, `button` é a tag. Sempre entre aspas, porque é um texto.',
            },
            { text: ');\n' },
            { text: 'preco' },
            { text: '.' },
            {
              text: 'textContent',
              label: 'O texto do elemento',
              note: 'Lê ou troca o texto dentro do elemento. Ao atribuir um valor, a tela atualiza imediatamente.',
            },
            { text: " = '7,00';" },
          ],
        },
        {
          type: 'text',
          text: 'Precisa de **todos** os elementos que combinam, e não só do primeiro? Use `document.querySelectorAll`. Ele devolve uma lista que você percorre com `for...of`, como os arrays da aula anterior.',
        },
        {
          type: 'terms',
          items: [
            {
              term: '`elemento.textContent`',
              text: 'O texto de dentro. `titulo.textContent = "Promoção"` troca o que está escrito.',
            },
            {
              term: '`elemento.classList`',
              text: 'As classes do elemento. `.add("ativo")` coloca, `.remove("ativo")` tira e `.toggle("ativo")` alterna: coloca se não tem, tira se tem. O visual fica no CSS; o JavaScript só troca a classe.',
            },
            {
              term: '`elemento.setAttribute`',
              text: 'Define um atributo. `botao.setAttribute("aria-pressed", "true")` avisa ao leitor de tela que o botão está ligado.',
            },
            {
              term: '`campo.value`',
              text: 'O que a pessoa digitou num `<input>`. É sempre texto, mesmo num campo de número: `"3"`, e não `3`.',
            },
          ],
        },
        {
          type: 'code',
          language: 'js',
          caption:
            'Ligar o modo escuro: o CSS define a aparência da classe, o JavaScript só a coloca no lugar.',
          code: `const pagina = document.querySelector('body');
pagina.classList.add('tema-escuro');

const itens = document.querySelectorAll('.produto');
console.log(itens.length);`,
          output: '4',
        },
        {
          type: 'quiz',
          question: 'A página tem três botões com a classe `comprar`. O que este código faz?',
          code: "const botao = document.querySelector('.comprar');\nbotao.textContent = 'Esgotado';",
          language: 'js',
          options: [
            {
              text: 'Troca o texto só do primeiro botão',
              correct: true,
              feedback:
                'Exato. `querySelector` devolve apenas o **primeiro** elemento que combina. Para mudar os três, use `querySelectorAll` e um `for...of`.',
            },
            {
              text: 'Troca o texto dos três botões',
              feedback:
                'Seria o caso com `querySelectorAll` e um laço. `querySelector`, no singular, para no primeiro que encontra.',
            },
            {
              text: 'Dá erro, porque existem três botões',
              feedback:
                'Não há erro: encontrar vários não é problema. Ele simplesmente pega o primeiro da página, de cima para baixo.',
            },
            {
              text: 'Troca o texto do último botão',
              feedback:
                'A busca começa no topo do documento e para na primeira combinação. O último só seria escolhido se fosse o único.',
            },
          ],
        },
        {
          type: 'fill',
          prompt:
            'Complete para marcar o item `#frete` como selecionado: coloque a classe `selecionado` e troque o texto para “Frete grátis”.',
          language: 'js',
          template:
            "const frete = document.[[querySelector]]('#frete');\nfrete.classList.[[add]]('selecionado');\nfrete.[[textContent]] = 'Frete grátis';",
          explanation:
            '`querySelector` encontra, `classList.add` coloca a classe e `textContent` troca o texto. Esses três movimentos resolvem boa parte das interações de uma página.',
        },
      ],
    },
    {
      id: 'eventos',
      title: 'Reagir ao que a pessoa faz',
      blocks: [
        {
          type: 'analogy',
          title: 'A campainha da casa',
          text: 'Você não fica na porta o dia todo esperando visita. Você combina: “quando a campainha tocar, eu vou atender”. No navegador é igual. Você avisa: “quando alguém clicar neste botão, rode esta função”. O toque da campainha é o **evento**; a pessoa que atende é a sua função.',
        },
        {
          type: 'text',
          text: 'Um **evento** é algo que acontece na página: um clique, uma tecla, um formulário enviado. Para reagir, você registra uma função com `addEventListener`. Essa função se chama **ouvinte** (ou handler) e só roda quando o evento acontece.',
        },
        {
          type: 'anatomy',
          caption: 'Registrar uma função para o clique do botão.',
          language: 'js',
          parts: [
            {
              text: 'botaoCurtir',
              label: 'Quem escuta',
              note: 'O elemento que você pegou com `querySelector`. O evento precisa acontecer nele (ou dentro dele).',
            },
            { text: '.' },
            {
              text: 'addEventListener',
              label: 'Registrar um ouvinte',
              note: 'Literalmente “adicionar um ouvinte de evento”. Ele não roda nada agora: só deixa combinado o que fazer depois.',
            },
            { text: '(' },
            {
              text: "'click'",
              label: 'Qual evento',
              note: 'O nome do evento, em texto. Outros comuns: `input` (o valor de um campo mudou), `submit` (formulário enviado), `keydown` (tecla pressionada).',
            },
            { text: ', ' },
            {
              text: 'curtir',
              label: 'A função',
              note: 'O **nome** da função, sem parênteses. Você entrega a função para o navegador chamar na hora certa. Com parênteses, ela rodaria agora, uma vez só.',
            },
            { text: ');' },
          ],
        },
        {
          type: 'flow',
          caption: 'O que acontece entre o clique e a mudança na tela',
          actors: ['Pessoa', 'Navegador', 'Sua função', 'DOM'],
          steps: [
            {
              from: 0,
              to: 1,
              label: 'clique no botão',
              text: 'A pessoa toca no botão Curtir. O navegador percebe o clique e descobre em qual elemento ele aconteceu.',
            },
            {
              from: 1,
              to: 2,
              label: 'chama curtir(evento)',
              text: 'O navegador procura ouvintes de `click` registrados naquele botão e chama cada um, entregando um objeto com detalhes do evento.',
            },
            {
              from: 2,
              to: 2,
              label: 'curtidas = curtidas + 1',
              text: 'Sua função roda do começo ao fim: atualiza a variável com o novo número de curtidas.',
            },
            {
              from: 2,
              to: 3,
              label: 'textContent = 1',
              text: 'A função muda o DOM: troca o texto do contador e coloca a classe `curtido` no botão.',
            },
            {
              from: 3,
              to: 0,
              label: 'tela redesenhada',
              text: 'O navegador redesenha só o que mudou. Para a pessoa, o número subiu no mesmo instante do toque.',
              tone: 'ok',
            },
          ],
        },
        {
          type: 'trace',
          caption: 'Acompanhe quando cada linha roda. Repare que a função só executa nos cliques.',
          code: "const botao = document.querySelector('#curtir');\nlet curtidas = 0;\n\nbotao.addEventListener('click', () => {\n  curtidas = curtidas + 1;\n  console.log('Curtidas:', curtidas);\n});\n\nconsole.log('Pronto, esperando cliques');",
          steps: [
            {
              line: 1,
              note: 'Encontra o botão na árvore e guarda em `botao`.',
              memory: [['botao', '<button>']],
            },
            {
              line: 2,
              note: 'Cria o contador começando em zero.',
              memory: [
                ['botao', '<button>'],
                ['curtidas', '0'],
              ],
            },
            {
              line: 4,
              note: 'Registra a função para o clique. Ela **não roda agora**: o navegador só anota o combinado.',
            },
            {
              line: 9,
              note: 'O script segue e termina. A página fica parada, esperando.',
              output: 'Pronto, esperando cliques',
            },
            {
              line: 5,
              note: 'Primeiro clique: o navegador chama a função e ela soma 1.',
              memory: [
                ['botao', '<button>'],
                ['curtidas', '1'],
              ],
            },
            {
              line: 6,
              note: 'Mostra o valor atual.',
              output: 'Curtidas: 1',
            },
            {
              line: 5,
              note: 'Segundo clique: a mesma função roda de novo. A variável lembra o valor anterior.',
              memory: [
                ['botao', '<button>'],
                ['curtidas', '2'],
              ],
            },
            {
              line: 6,
              note: 'Cada clique é uma nova execução da função.',
              output: 'Curtidas: 2',
            },
          ],
        },
        {
          type: 'text',
          text: 'O navegador entrega à sua função um **objeto de evento**, normalmente chamado `evento`. A propriedade mais útil é `evento.target`: o elemento onde o evento aconteceu. Num campo de texto, `evento.target.value` é o que a pessoa acabou de digitar.',
        },
        {
          type: 'code',
          language: 'js',
          caption: 'Dois eventos que você vai usar o tempo todo: input e submit.',
          code: `const campoNome = document.querySelector('#nome');
campoNome.addEventListener('input', (evento) => {
  console.log('Digitou:', evento.target.value);
});

const formulario = document.querySelector('form');
formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  console.log('Enviado sem recarregar a página');
});`,
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Por que preventDefault?',
          text: 'Por padrão, enviar um formulário faz o navegador ir para outra página, e tudo o que estava na tela se perde. `evento.preventDefault()` cancela esse comportamento padrão para que o seu JavaScript cuide dos dados. Use `submit` no formulário, e não `click` no botão: assim o Enter também funciona.',
        },
        {
          type: 'playground',
          title: 'Um botão de curtir de verdade',
          task: 'Complete a função `curtir` para somar 1, mostrar o número no contador, colocar a classe `curtido` no botão e mudar `aria-pressed` para `"true"`. Depois, ligue a função ao clique. Teste clicando na prévia.',
          html: `<article class="cartao">
  <h2>Pastel de feira</h2>
  <p>Curtidas: <span id="contador">0</span></p>
  <button type="button" id="botao-curtir" aria-pressed="false">Curtir</button>
</article>`,
          css: `body { font-family: system-ui, sans-serif; padding: 16px; }
.cartao { border: 1px solid #ccc; border-radius: 12px; padding: 16px; max-width: 260px; }
button { font: inherit; padding: 8px 16px; border-radius: 999px; border: 2px solid #e11d48; background: white; color: #e11d48; cursor: pointer; }
button.curtido { background: #e11d48; color: white; }`,
          js: `const botaoCurtir = document.querySelector('#botao-curtir');
const contador = document.querySelector('#contador');
let curtidas = 0;

function curtir() {
  // 1. some 1 em curtidas
  // 2. mostre o novo valor no contador com textContent
  // 3. coloque a classe 'curtido' no botão com classList.add
  // 4. mude o atributo aria-pressed do botão para 'true'
}

// 5. ligue a função curtir ao evento 'click' do botão
`,
          checks: [
            {
              label: 'Cada clique soma 1 ao contador',
              test: `const botao = document.querySelector('#botao-curtir');
const alvo = document.querySelector('#contador');
if (!botao || !alvo) return false;
const antes = Number(alvo.textContent);
botao.click();
return Number(alvo.textContent) === antes + 1;`,
            },
            {
              label: 'Depois do clique, o botão tem a classe `curtido`',
              test: `const botao = document.querySelector('#botao-curtir');
if (!botao) return false;
botao.click();
return botao.classList.contains('curtido');`,
            },
            {
              label: 'Depois do clique, `aria-pressed` vale `"true"`',
              test: `const botao = document.querySelector('#botao-curtir');
if (!botao) return false;
botao.click();
return botao.getAttribute('aria-pressed') === 'true';`,
            },
          ],
          solution: {
            js: `const botaoCurtir = document.querySelector('#botao-curtir');
const contador = document.querySelector('#contador');
let curtidas = 0;

function curtir() {
  curtidas = curtidas + 1;
  contador.textContent = curtidas;
  botaoCurtir.classList.add('curtido');
  botaoCurtir.setAttribute('aria-pressed', 'true');
}

botaoCurtir.addEventListener('click', curtir);
`,
          },
          height: 200,
        },
        {
          type: 'quiz',
          question:
            'Uma lista tem um ouvinte de clique. A pessoa clica no terceiro item. O que `evento.target` contém dentro da função?',
          options: [
            {
              text: 'O elemento `<li>` em que a pessoa clicou',
              correct: true,
              feedback:
                'Isso. `target` é o elemento onde o evento nasceu. Por isso um único ouvinte na lista consegue saber qual item foi clicado.',
            },
            {
              text: 'O texto do item clicado',
              feedback:
                '`target` é o elemento inteiro. O texto está em `evento.target.textContent`.',
            },
            {
              text: 'A palavra `"click"`',
              feedback:
                'O nome do evento fica em `evento.type`. `target` responde outra pergunta: onde ele aconteceu.',
            },
            {
              text: 'O número 3, a posição do item',
              feedback:
                'O navegador não calcula posições para você. Ele entrega o elemento; o resto você descobre a partir dele.',
            },
          ],
        },
      ],
    },
    {
      id: 'criar-elementos',
      title: 'Criar elementos a partir de dados',
      blocks: [
        {
          type: 'text',
          text: 'Num catálogo de verdade, os produtos não estão escritos no HTML: eles chegam como um array de dados. O JavaScript percorre o array e cria um elemento para cada item. São sempre três passos.',
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Criar',
              text: '`document.createElement("li")` fabrica um elemento novo. Ele existe na memória, mas ainda não está na página.',
              code: "const item = document.createElement('li');",
            },
            {
              title: 'Preencher',
              text: 'Coloque o conteúdo com `textContent` e, se precisar, classes e atributos.',
              code: "item.textContent = produto.nome;\nitem.classList.add('produto');",
            },
            {
              title: 'Encaixar',
              text: '`lista.append(item)` pendura o elemento na árvore, como filho de `lista`. Só agora ele aparece na tela.',
              code: 'lista.append(item);',
            },
          ],
        },
        {
          type: 'code',
          language: 'js',
          caption: 'Desenhar uma lista inteira a partir de um array.',
          code: `const sabores = ['Calabresa', 'Margherita', 'Portuguesa'];
const lista = document.querySelector('#sabores');

for (const sabor of sabores) {
  const item = document.createElement('li');
  item.textContent = sabor;
  lista.append(item);
}`,
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Cuidado com innerHTML',
          text: 'Existe um atalho, `innerHTML`, que interpreta um texto como HTML. Com texto que veio de fora (o que alguém digitou, uma resposta de API), isso é perigoso: um comentário malicioso vira código rodando na página de outras pessoas. Esse ataque se chama **XSS**. Com `textContent`, o texto é sempre mostrado como texto.',
        },
        {
          type: 'codeTabs',
          caption: 'O mesmo comentário de cliente, mostrado de dois jeitos.',
          tabs: [
            {
              label: 'Perigoso: innerHTML',
              language: 'js',
              code: `// comentario veio de um formulário que qualquer pessoa preenche
const comentario = '<img src="x" onerror="roubarSessao()">';

caixa.innerHTML = comentario;
// O navegador cria uma imagem quebrada e roda roubarSessao().`,
            },
            {
              label: 'Seguro: textContent',
              language: 'js',
              code: `const comentario = '<img src="x" onerror="roubarSessao()">';

caixa.textContent = comentario;
// Na tela aparecem os caracteres <img src=...> como texto comum.
// Nada é executado.`,
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Você vai mostrar o nome que a pessoa digitou no cadastro numa mensagem de boas-vindas. Qual linha usar?',
          options: [
            {
              text: '`saudacao.textContent = "Olá, " + nome;`',
              correct: true,
              feedback:
                'Isso. Qualquer coisa que a pessoa digite, inclusive algo parecido com HTML, aparece como texto. É a escolha padrão para dados de fora.',
            },
            {
              text: '`saudacao.innerHTML = "Olá, " + nome;`',
              feedback:
                'Funciona com nomes comuns, mas se alguém digitar uma tag com código, ela será interpretada. Texto externo nunca deve passar por `innerHTML`.',
            },
            {
              text: 'Tanto faz, os dois são iguais',
              feedback:
                'A diferença é justamente a segurança. `innerHTML` interpreta o texto como HTML; `textContent` não interpreta nada.',
            },
          ],
        },
        {
          type: 'playground',
          title: 'Busca que filtra enquanto você digita',
          task: 'Termine a função `renderizar` (criar, preencher, encaixar) para a lista aparecer. Depois faça `filtrar` mostrar só as frutas que contêm o texto digitado, sem diferenciar maiúsculas, e ligue `filtrar` ao evento `input` do campo.',
          html: `<label for="busca">Buscar fruta</label>
<input id="busca" type="search" placeholder="Ex.: manga">
<ul id="lista"></ul>
<p id="aviso" role="status" hidden>Nenhuma fruta encontrada.</p>`,
          css: `body { font-family: system-ui, sans-serif; padding: 16px; }
input { display: block; font: inherit; padding: 8px; margin: 4px 0 12px; width: 100%; max-width: 280px; }
li { padding: 4px 0; }`,
          js: `const frutas = ['Abacaxi', 'Banana', 'Caju', 'Goiaba', 'Manga', 'Maracujá'];
const campoBusca = document.querySelector('#busca');
const lista = document.querySelector('#lista');
const aviso = document.querySelector('#aviso');

function renderizar(itens) {
  lista.replaceChildren(); // esvazia a lista antes de desenhar de novo
  for (const fruta of itens) {
    const item = document.createElement('li');
    // 1. coloque o nome da fruta no item com textContent
    // 2. encaixe o item na lista com append
  }
  aviso.hidden = itens.length > 0;
}

function filtrar() {
  const termo = campoBusca.value.toLowerCase();
  // 3. crie um array só com as frutas que incluem o termo
  //    dica: frutas.filter((fruta) => fruta.toLowerCase().includes(termo))
  // 4. chame renderizar com esse array
}

// 5. chame filtrar sempre que acontecer o evento 'input' no campo

renderizar(frutas);
`,
          checks: [
            {
              label: 'As seis frutas aparecem na lista ao abrir a página',
              test: `const itens = document.querySelectorAll('#lista li');
return itens.length === 6 && itens[0].textContent.trim() === 'Abacaxi';`,
            },
            {
              label: 'Digitar `ma` deixa só Manga e Maracujá',
              test: `const campo = document.querySelector('#busca');
if (!campo) return false;
campo.value = 'ma';
campo.dispatchEvent(new Event('input', { bubbles: true }));
const textos = Array.from(document.querySelectorAll('#lista li')).map((li) => li.textContent.trim());
return textos.length === 2 && textos.includes('Manga') && textos.includes('Maracujá');`,
            },
            {
              label: 'A busca ignora maiúsculas: `BAN` encontra Banana',
              test: `const campo = document.querySelector('#busca');
if (!campo) return false;
campo.value = 'BAN';
campo.dispatchEvent(new Event('input', { bubbles: true }));
const itens = document.querySelectorAll('#lista li');
return itens.length === 1 && itens[0].textContent.trim() === 'Banana';`,
            },
            {
              label: 'Sem resultados, a lista fica vazia e o aviso aparece',
              test: `const campo = document.querySelector('#busca');
const aviso = document.querySelector('#aviso');
if (!campo || !aviso) return false;
campo.value = 'xyz';
campo.dispatchEvent(new Event('input', { bubbles: true }));
return document.querySelectorAll('#lista li').length === 0 && !aviso.hidden;`,
            },
          ],
          solution: {
            js: `const frutas = ['Abacaxi', 'Banana', 'Caju', 'Goiaba', 'Manga', 'Maracujá'];
const campoBusca = document.querySelector('#busca');
const lista = document.querySelector('#lista');
const aviso = document.querySelector('#aviso');

function renderizar(itens) {
  lista.replaceChildren();
  for (const fruta of itens) {
    const item = document.createElement('li');
    item.textContent = fruta;
    lista.append(item);
  }
  aviso.hidden = itens.length > 0;
}

function filtrar() {
  const termo = campoBusca.value.toLowerCase();
  const encontradas = frutas.filter((fruta) => fruta.toLowerCase().includes(termo));
  renderizar(encontradas);
}

campoBusca.addEventListener('input', filtrar);

renderizar(frutas);
`,
          },
          height: 300,
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem os passos para mostrar um array de produtos na página.',
          items: [
            'Pegar o elemento da lista com `querySelector`',
            'Percorrer o array com `for...of`',
            'Criar um `<li>` com `createElement`',
            'Colocar o nome do produto com `textContent`',
            'Encaixar o item na lista com `append`',
          ],
          explanation:
            'Primeiro você encontra onde vai desenhar, depois repete criar, preencher e encaixar para cada item. É exatamente o que um framework faz por você mais adiante.',
        },
      ],
    },
    {
      id: 'erros-comuns',
      title: 'Os erros que todo mundo comete',
      blocks: [
        {
          type: 'text',
          text: 'Três erros respondem pela maioria dos “meu JavaScript não funciona” de quem está começando. Conhecer cada um economiza horas.',
        },
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              label: 'Erro 1',
              title: 'Buscar antes de o elemento existir',
              text: 'O navegador lê o HTML de cima para baixo. Um `<script>` no `<head>` roda antes de o `<body>` ser montado, e `querySelector` não acha nada.',
              points: [
                'Coloque o script no fim do `<body>`',
                'Ou use `<script src="app.js" defer>`',
              ],
            },
            {
              label: 'Erro 2',
              title: 'querySelector devolveu null',
              text: 'Um seletor errado, como `#Preco` em vez de `#preco`, faz a busca devolver `null`. A linha seguinte quebra com “Cannot read properties of null”.',
              points: ['Confira maiúsculas e o `#` ou `.`', 'Dê um `console.log` no elemento'],
            },
            {
              label: 'Erro 3',
              title: 'Chamar a função em vez de entregá-la',
              text: '`addEventListener("click", curtir())` roda `curtir` uma vez, na hora, e entrega o resultado (`undefined`) como ouvinte. O clique não faz nada.',
              points: ['Passe só o nome: `curtir`', 'Ou uma função: `() => curtir()`'],
            },
          ],
        },
        {
          type: 'quiz',
          question: 'O console mostra este erro ao abrir a página. Qual a causa mais provável?',
          code: "const botao = document.querySelector('#enviar');\nbotao.addEventListener('click', enviar);\n\n// TypeError: Cannot read properties of null\n// (reading 'addEventListener')",
          language: 'js',
          options: [
            {
              text: 'O `querySelector` não encontrou nenhum elemento com id `enviar`',
              correct: true,
              feedback:
                'Isso. “of null” quer dizer que `botao` é `null`. Ou o id está escrito diferente, ou o script rodou antes de o botão existir.',
            },
            {
              text: 'A função `enviar` tem um erro dentro dela',
              feedback:
                'A função nem chegou a rodar: o erro acontece ao tentar registrar o ouvinte, porque não há elemento onde registrá-lo.',
            },
            {
              text: 'O evento `click` não existe em botões',
              feedback:
                '`click` funciona em qualquer elemento. A mensagem fala de `null`: o problema é o elemento que não foi encontrado.',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Ao abrir a página, aparece “Adicionado ao carrinho” no console, mas clicar no botão não faz nada. Por quê?',
          code: "function adicionar() {\n  console.log('Adicionado ao carrinho');\n}\n\nbotao.addEventListener('click', adicionar());",
          language: 'js',
          options: [
            {
              text: 'Os parênteses em `adicionar()` executam a função na hora',
              correct: true,
              feedback:
                'Exato. Com parênteses, a função roda ao registrar e o ouvinte vira o que ela devolve, `undefined`. Tire os parênteses e o navegador chamará a função a cada clique.',
            },
            {
              text: 'Faltou `preventDefault()` dentro da função',
              feedback:
                '`preventDefault` cancela comportamentos padrão, como o envio de formulário. Um botão `type="button"` não tem nada a cancelar.',
            },
            {
              text: 'O console impede que o evento chegue ao botão',
              feedback:
                '`console.log` só escreve uma mensagem. O que aconteceu é que a mensagem saiu cedo demais: na hora do registro, não no clique.',
            },
          ],
        },
        {
          type: 'reveal',
          question: 'Por que `defer` resolve o erro 1, mesmo com o script dentro do `<head>`?',
          answer:
            '`defer` diz ao navegador: “baixe o script agora, mas só execute depois de montar a página inteira”. Quando o código roda, a árvore já está completa e o `querySelector` encontra tudo. O guia Scripts: normal, async e defer mostra essa linha do tempo em detalhe.',
        },
      ],
    },
  ],
  recap: [
    'O **DOM** é a árvore que o navegador monta a partir do HTML; mudar o DOM muda a tela, não o arquivo.',
    '`querySelector` usa seletores CSS para encontrar um elemento; `textContent`, `classList` e `setAttribute` o alteram.',
    '`addEventListener` registra uma função que o navegador chama quando o evento acontece; passe a função sem parênteses.',
    'Para desenhar dados, crie com `createElement`, preencha com `textContent` e encaixe com `append`.',
    'Texto vindo de fora nunca passa por `innerHTML`: isso abre a porta para XSS.',
  ],
  cards: [
    {
      id: 'dom',
      front: 'O que é o DOM?',
      back: 'A árvore de objetos que o navegador monta a partir do HTML. A tela mostra o DOM, e o JavaScript pode alterá-lo.',
    },
    {
      id: 'query-selector',
      front: 'Qual a diferença entre `querySelector` e `querySelectorAll`?',
      back: '`querySelector` devolve o primeiro elemento que combina (ou `null`). `querySelectorAll` devolve todos, numa lista.',
    },
    {
      id: 'class-list-toggle',
      front: 'O que faz `elemento.classList.toggle("ativo")`?',
      back: 'Coloca a classe se o elemento não tem, e tira se já tem.',
    },
    {
      id: 'add-event-listener',
      front: 'Por que `addEventListener("click", salvar())` não funciona?',
      back: 'Os parênteses executam `salvar` na hora. É preciso entregar a função: `addEventListener("click", salvar)`.',
    },
    {
      id: 'event-target',
      front: 'O que é `evento.target`?',
      back: 'O elemento onde o evento aconteceu. Num campo, `evento.target.value` é o texto digitado.',
    },
    {
      id: 'prevent-default',
      front: 'Para que serve `evento.preventDefault()` num `submit`?',
      back: 'Impede o navegador de enviar o formulário e trocar de página, para o JavaScript cuidar dos dados.',
    },
    {
      id: 'inner-html-xss',
      front: 'Por que não usar `innerHTML` com texto digitado por alguém?',
      back: 'Porque o texto é interpretado como HTML e pode executar código malicioso (XSS). Use `textContent`.',
    },
  ],
  mission: {
    title: 'Comece o seu catálogo',
    text: 'Este é o primeiro passo do projeto Aplicação com API da trilha: um catálogo com busca, feito só com HTML, CSS e JavaScript. Por enquanto os dados ficam num array no próprio código; na próxima aula eles virão de uma API.',
    steps: [
      'Crie `index.html`, `estilo.css` e `app.js`, com o script carregado usando `defer`',
      'Escreva um array com pelo menos 6 produtos, cada um com `nome`, `preco` e `categoria`',
      'Desenhe um cartão para cada produto com `createElement`, `textContent` e `append`, sem `innerHTML`',
      'Adicione um campo de busca que filtra os cartões pelo nome a cada evento `input`',
      'Mostre uma mensagem quando nenhum produto combinar com a busca',
      'Coloque um botão de favoritar em cada cartão que alterna uma classe e o `aria-pressed`',
    ],
  },
  sources: [
    {
      title: 'MDN: Introdução ao DOM',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/API/Document_Object_Model/Introduction',
    },
    {
      title: 'MDN: Introdução a eventos',
      url: 'https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Building_blocks/Events',
    },
    {
      title: 'javascript.info: Document',
      url: 'https://javascript.info/document',
    },
  ],
};
