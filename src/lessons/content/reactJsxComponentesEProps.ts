import { LessonContent } from '../types';

const verificar = (corpo: string) => `const anterior = window.__fila || Promise.resolve();
let liberar;
window.__fila = new Promise((r) => (liberar = r));
await anterior;
await new Promise((r) => setTimeout(r, 300));
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
const texto = (el) => (el?.textContent || '').replace(/\\s+/g, ' ').trim();
try {
${corpo}
} finally {
  liberar();
}`;

export const content: LessonContent = {
  hook: 'Abra o iFood, o app do banco ou o Instagram no navegador: boa parte dessas telas é feita com React. Ele é a biblioteca de interface mais pedida em vagas de frontend no Brasil, e também é o lado cliente da maioria das stacks fullstack com Node.js. Nesta aula você escreve seus primeiros componentes de verdade e entende o que acontece quando o React desenha a tela.',
  sections: [
    {
      id: 'por-que-react',
      title: 'Descrever a tela em vez de editá-la',
      blocks: [
        {
          type: 'text',
          text: 'Na aula Componentes e estado você viu a ideia central: a tela é calculada a partir dos dados, **interface = função(estado)**. Lá, você mesmo escreveu a função `render()` que apagava e redesenhava a lista. O React é uma biblioteca que faz esse trabalho por você, e de um jeito eficiente.',
        },
        {
          type: 'analogy',
          title: 'A planta da reforma',
          text: 'Numa reforma, você não diz ao pedreiro “tire o tijolo 37, depois pinte a parede 2”. Você entrega a **planta** de como a casa deve ficar. O mestre de obras compara com a casa atual e mexe só no que é diferente. No React, seus componentes desenham a planta; o React é o mestre de obras que mexe no DOM.',
        },
        {
          type: 'text',
          text: 'Essa planta é escrita em **JSX**: um jeito de escrever, dentro do JavaScript, algo que parece HTML. O navegador não entende JSX. Antes de rodar, uma ferramenta (o Vite, no seu projeto, ou o Babel, nos exercícios desta aula) traduz cada tag para uma chamada de função comum.',
        },
        {
          type: 'codeTabs',
          caption: 'O mesmo trecho escrito em JSX e no JavaScript que ele vira',
          tabs: [
            {
              label: 'Você escreve (JSX)',
              language: 'jsx',
              code: `const titulo = (
  <h1 className="titulo">
    Olá, {nome}!
  </h1>
);`,
            },
            {
              label: 'O navegador recebe',
              language: 'js',
              code: `const titulo = React.createElement(
  'h1',
  { className: 'titulo' },
  'Olá, ',
  nome,
  '!'
);`,
            },
          ],
        },
        {
          type: 'text',
          text: 'Repare: `React.createElement` não cria nada na página. Ele devolve um **objeto** simples que descreve o elemento, como uma linha da planta. Só depois o React compara esses objetos com a tela atual e aplica as diferenças.',
        },
        {
          type: 'quiz',
          question: 'O que é, de fato, o resultado de `<h1>Olá</h1>` dentro de um arquivo React?',
          options: [
            {
              text: 'Um objeto JavaScript que descreve um `h1`; o React decide depois se e como colocá-lo na página',
              correct: true,
              feedback:
                'Isso. JSX vira `React.createElement`, que devolve uma descrição. É por isso que você pode guardar JSX em variáveis, passar para funções e devolver de componentes.',
            },
            {
              text: 'Um elemento `h1` que já foi inserido na página',
              feedback:
                'Seria o caso de `document.createElement` seguido de `append`. Com React, você descreve; quem insere no DOM é o React, quando for a hora.',
            },
            {
              text: 'Um texto em HTML, como se fosse uma string',
              feedback:
                'Parece HTML, mas não é uma string. Se fosse, você não conseguiria colocar expressões como `{nome}` com segurança nem passar funções em `onClick`.',
            },
          ],
        },
      ],
    },
    {
      id: 'regras-do-jsx',
      title: 'As regras do JSX',
      blocks: [
        {
          type: 'text',
          text: 'JSX é parecido com HTML, mas tem regras próprias, porque no fim é JavaScript. São poucas, e o editor ou o console avisam quando você quebra uma delas. Explore cada parte destacada.',
        },
        {
          type: 'anatomy',
          caption: 'Um componente com as principais regras do JSX.',
          language: 'jsx',
          parts: [
            { text: "function CartaoPerfil() {\n  const nome = 'Joana';\n  return (\n    " },
            {
              text: '<>',
              label: 'Uma raiz só',
              note: 'Um componente devolve **um** elemento. Para juntar vários sem criar uma `div` extra, use o fragmento `<>...</>`. Duas tags soltas lado a lado dão erro.',
            },
            { text: '\n      <img src="foto.jpg" alt="Foto de Joana" ' },
            {
              text: '/>',
              label: 'Tags fechadas',
              note: 'Toda tag precisa ser fechada. Tags que no HTML não têm fechamento, como `img`, `input` e `br`, terminam em `/>`.',
            },
            { text: '\n      <h2 ' },
            {
              text: 'className="nome"',
              label: 'className',
              note: '`class` é uma palavra reservada do JavaScript, então no JSX o atributo se chama `className`. Pelo mesmo motivo, o `for` do `label` vira `htmlFor`.',
            },
            { text: '>' },
            {
              text: '{nome.toUpperCase()}',
              label: 'Expressão entre chaves',
              note: 'Entre chaves vai qualquer **expressão** JavaScript: variável, conta, chamada de função, ternário. Comandos como `if` e `for` não cabem aqui, porque não produzem um valor.',
            },
            { text: '</h2>\n      <p ' },
            {
              text: "style={{ color: 'gray' }}",
              label: 'Estilo como objeto',
              note: 'O atributo `style` recebe um objeto, por isso as chaves duplas: as de fora abrem a expressão, as de dentro são o objeto. As propriedades usam camelCase, como `fontSize`.',
            },
            { text: '>Desenvolvedora</p>\n    ' },
            {
              text: '</>',
              label: 'Fecha o fragmento',
              note: 'O fragmento não aparece no HTML final. Ele só agrupa.',
            },
            { text: '\n  );\n}' },
          ],
        },
        {
          type: 'classify',
          prompt: 'Qual destes trechos de JSX funciona e qual quebra?',
          buckets: ['Funciona', 'Quebra ou não faz o esperado'],
          items: [
            { text: '`<input type="text" />`', bucket: 0 },
            { text: '`<p>Total: {2 + 3}</p>`', bucket: 0 },
            { text: '`<label htmlFor="email">E-mail</label>`', bucket: 0 },
            { text: '`<><h1>Oi</h1><p>Tudo bem?</p></>`', bucket: 0 },
            { text: '`<br>`', bucket: 1 },
            { text: '`<p>{if (logado) { "Oi" }}</p>`', bucket: 1 },
            { text: '`<div style="color: red">Erro</div>`', bucket: 1 },
            { text: '`<h1>Oi</h1><p>Tudo bem?</p>` como retorno', bucket: 1 },
          ],
          explanation:
            '`<br>` precisa ser `<br />`. `if` é um comando, não uma expressão: use um ternário. `style` recebe objeto, não texto. E duas tags soltas precisam de uma raiz comum, como o fragmento.',
        },
        {
          type: 'fill',
          prompt:
            'Complete o JSX para que ele funcione: atributo de classe, valor do nome e fechamento da imagem.',
          language: 'jsx',
          template: `<div [[className]]="avatar">
  <img src={foto} alt="" [[/>]]
  <span>{[[nome]]}</span>
</div>`,
          explanation:
            '`className` no lugar de `class`, `/>` para fechar tags sem conteúdo e chaves para mostrar o valor de uma variável. Com essas três regras você já escreve a maior parte do JSX do dia a dia.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Comentários no JSX',
          text: 'Dentro do JSX, comentário também vai entre chaves: `{/* assim */}`. O `<!-- -->` do HTML aparece como texto ou quebra o código.',
        },
      ],
    },
    {
      id: 'componentes-e-props',
      title: 'Componentes são funções; props são os argumentos',
      blocks: [
        {
          type: 'text',
          text: 'No React, um **componente** é uma função JavaScript que devolve JSX. O nome começa com letra maiúscula, e é assim que o React diferencia `<Saudacao />` (seu componente) de `<section>` (uma tag do HTML).',
        },
        {
          type: 'text',
          text: 'Os atributos que você escreve ao usar o componente chegam juntos num objeto, as **props**. É comum já desmontar esse objeto nos parâmetros, com a desestruturação que você viu na aula de arrays e objetos.',
        },
        {
          type: 'code',
          language: 'jsx',
          caption: 'Cada tipo de valor tem um jeito de ser passado',
          code: `function Produto({ nome, preco, emPromocao, aoComprar }) {
  return (
    <article>
      <h3>{nome}</h3>
      <p>R$ {preco}</p>
      {emPromocao ? <strong>Promoção</strong> : null}
      <button onClick={aoComprar}>Comprar</button>
    </article>
  );
}

<Produto
  nome="Caneca"              // texto: entre aspas
  preco={39.9}               // número: entre chaves
  emPromocao={true}          // booleano: entre chaves
  aoComprar={() => alert('Comprou!')}  // função: entre chaves
/>`,
        },
        {
          type: 'quiz',
          question:
            'Alguém escreve `<Saudacao nome={Ana} />` e a tela fica em branco, com um erro no console. Qual é o problema?',
          options: [
            {
              text: 'Entre chaves, `Ana` é lido como o nome de uma variável que não existe; texto fixo vai entre aspas: `nome="Ana"`',
              correct: true,
              feedback:
                'Exato. Dentro das chaves vale a regra do JavaScript: palavra sem aspas é variável. O erro no console é algo como `Ana is not defined`.',
            },
            {
              text: 'Props só aceitam números entre chaves',
              feedback:
                'Chaves aceitam qualquer expressão: `{"Ana"}` também funcionaria. O problema é que `Ana` sem aspas não é um texto, é uma variável.',
            },
            {
              text: 'O nome da prop deveria começar com letra maiúscula',
              feedback:
                'Quem começa com maiúscula é o **componente**. Props costumam ser em camelCase minúsculo, como `nome` ou `aoComprar`.',
            },
          ],
        },
        {
          type: 'playground',
          title: 'Seu primeiro componente',
          framework: 'react',
          task: 'Crie o componente `Saudacao`. Ele recebe a prop `nome` e devolve `<p className="saudacao">Olá, {nome}!</p>`. Depois use `<Saudacao />` duas vezes dentro de `App`: uma para Ana e outra para Bruno.',
          html: '<div id="root"></div>',
          css: `body { font-family: system-ui, sans-serif; margin: 16px; }
.saudacao { padding: 8px 12px; border-left: 4px solid #2563eb; background: #eff6ff; }`,
          js: `// Crie aqui o componente Saudacao.
// Ele recebe a prop nome e devolve um <p className="saudacao">.

function App() {
  return (
    <main>
      <h1>Boas-vindas à turma</h1>
      {/* Use <Saudacao /> duas vezes aqui, com nomes diferentes */}
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
          checks: [
            {
              label: 'Existe um componente `Saudacao` que mostra o nome recebido na prop',
              test: verificar(`if (typeof Saudacao !== 'function') return false;
const caixa = document.createElement('div');
ReactDOM.createRoot(caixa).render(React.createElement(Saudacao, { nome: 'Zezé' }));
await esperar(80);
return texto(caixa).includes('Zezé');`),
            },
            {
              label:
                'A página mostra **Olá, Ana!** e **Olá, Bruno!** em parágrafos com a classe `saudacao`',
              test: verificar(`const textos = [...document.querySelectorAll('#root p.saudacao')].map(texto);
return textos.some((t) => t.includes('Olá, Ana')) && textos.some((t) => t.includes('Olá, Bruno'));`),
            },
          ],
          solution: {
            js: `function Saudacao({ nome }) {
  return <p className="saudacao">Olá, {nome}!</p>;
}

function App() {
  return (
    <main>
      <h1>Boas-vindas à turma</h1>
      <Saudacao nome="Ana" />
      <Saudacao nome="Bruno" />
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
          },
          height: 220,
        },
      ],
    },
    {
      id: 'children-e-composicao',
      title: 'Children: componentes que embrulham outros',
      blocks: [
        {
          type: 'analogy',
          title: 'A moldura do quadro',
          text: 'Uma moldura não sabe qual foto vai receber. Ela cuida da borda, do vidro e do pendurador; a foto é você que coloca dentro. Um componente pode funcionar assim: ele desenha a “moldura” e mostra o que for colocado entre a tag de abertura e a de fechamento.',
        },
        {
          type: 'text',
          text: 'Tudo o que fica entre `<Cartao>` e `</Cartao>` chega ao componente numa prop especial chamada **children** (filhos). Assim, o mesmo `Cartao` serve para um aviso, um formulário ou uma foto, sem uma prop para cada caso.',
        },
        {
          type: 'codeTabs',
          caption: 'Um componente de moldura e dois usos diferentes',
          tabs: [
            {
              label: 'Cartao.jsx',
              language: 'jsx',
              code: `function Cartao({ titulo, children }) {
  return (
    <section className="cartao">
      <h2>{titulo}</h2>
      <div className="cartao-corpo">{children}</div>
    </section>
  );
}`,
            },
            {
              label: 'Usando',
              language: 'jsx',
              code: `<Cartao titulo="Aviso">
  <p>A padaria fecha às 20h no feriado.</p>
</Cartao>

<Cartao titulo="Seu pedido">
  <ul>
    <li>2 pães de queijo</li>
    <li>1 café</li>
  </ul>
  <button>Pagar com Pix</button>
</Cartao>`,
            },
          ],
        },
        {
          type: 'text',
          text: 'Esse jeito de montar telas encaixando componentes se chama **composição**. É a forma principal de reaproveitar código no React: em vez de criar um componente “especial” que herda de outro, você combina peças pequenas.',
        },
        {
          type: 'quiz',
          question:
            'Você tem `<Modal>` usado com um formulário de login numa tela e com uma foto ampliada em outra. Qual desenho de componente é mais fácil de manter?',
          code: `// Opção A
<Modal tipo="login" />
<Modal tipo="foto" url="praia.jpg" />

// Opção B
<Modal><FormLogin /></Modal>
<Modal><img src="praia.jpg" alt="Praia" /></Modal>`,
          language: 'jsx',
          options: [
            {
              text: 'A opção B: o `Modal` cuida da moldura e recebe o conteúdo em `children`',
              correct: true,
              feedback:
                'Isso. O `Modal` não precisa conhecer login nem fotos. Um terceiro uso amanhã não exige mexer nele.',
            },
            {
              text: 'A opção A: tudo fica concentrado num lugar só',
              feedback:
                'Concentrar parece organizado, mas cada novo tipo vira mais um `if` dentro do `Modal`. Em pouco tempo ele sabe demais sobre a aplicação inteira.',
            },
            {
              text: 'Tanto faz, as duas geram exatamente o mesmo esforço de manutenção',
              feedback:
                'Para dois casos até parece, mas a opção A cresce a cada tipo novo, e a B não. Composição escala melhor.',
            },
          ],
        },
      ],
    },
    {
      id: 'listas-e-keys',
      title: 'Listas com map e key',
      blocks: [
        {
          type: 'text',
          text: 'Dados de verdade vêm em listas: produtos, mensagens, pedidos. Para transformar um array de dados num array de elementos, use o `map` que você conhece da aula de arrays. O React sabe desenhar um array de JSX.',
        },
        {
          type: 'code',
          language: 'jsx',
          caption: 'De um array de objetos para uma lista na tela',
          code: `const linhas = [
  { id: '8700', nome: 'Terminal Pinheiros' },
  { id: '875A', nome: 'Perdizes' },
  { id: '702U', nome: 'Butantã' },
];

function Linhas() {
  return (
    <ul>
      {linhas.map((linha) => (
        <li key={linha.id}>{linha.id} — {linha.nome}</li>
      ))}
    </ul>
  );
}`,
        },
        {
          type: 'analogy',
          title: 'A senha do atendimento',
          text: 'No posto de saúde, cada pessoa recebe uma senha. Se alguém desiste e sai da fila, a atendente não confunde quem é quem, porque segue a senha, não a posição na cadeira. A `key` é a senha de cada item da lista: o React usa para saber qual item é qual entre uma renderização e outra.',
        },
        {
          type: 'text',
          text: 'A **key** precisa ser única entre os irmãos e **estável**: o mesmo item deve ter sempre a mesma key. O melhor candidato é o id que vem dos dados. Sem key, o React avisa no console: `Each child in a list should have a unique "key" prop`.',
        },
        {
          type: 'reveal',
          question:
            'Por que usar a posição no array (`key={indice}`) é perigoso quando a lista pode mudar de ordem ou ganhar itens no começo?',
          answer:
            'Porque a posição muda e o item não. Se um item novo entra no topo, o antigo item 0 vira 1, e o React acha que o “item 0” só mudou de texto. Se cada linha tiver um campo de texto ou uma caixa marcada, o que você digitou fica grudado na linha errada. Com um id estável, isso não acontece.',
        },
        {
          type: 'trace',
          caption: 'Siga o React desenhando uma lista de um item só.',
          code: `function Preco({ valor }) {
  return <span>R$ {valor}</span>;
}
function Item({ nome, preco }) {
  return <li>{nome} <Preco valor={preco} /></li>;
}
function App() {
  const itens = [{ id: 1, nome: 'Café', preco: 5 }];
  return <ul>{itens.map((i) => <Item key={i.id} nome={i.nome} preco={i.preco} />)}</ul>;
}
root.render(<App />);`,
          steps: [
            {
              line: 11,
              note: 'Tudo começa aqui: o React recebe `<App />` e chama a função `App`.',
              memory: [],
            },
            {
              line: 8,
              note: '`App` cria o array de dados. Ele existe só durante esta chamada.',
              memory: [['itens', '[{ id: 1, nome: "Café", preco: 5 }]']],
            },
            {
              line: 9,
              note: '`App` devolve a planta: um `ul` com um `Item` dentro. O `Item` ainda não foi chamado, é só uma descrição com a key 1.',
            },
            {
              line: 5,
              note: 'O React chama `Item` com as props que `App` escreveu. A key não chega como prop: ela é do React.',
              memory: [
                ['nome', '"Café"'],
                ['preco', '5'],
              ],
            },
            {
              line: 2,
              note: 'Dentro do `Item` existe um `Preco`, então o React chama `Preco` com `valor` igual a 5.',
              memory: [['valor', '5']],
            },
            {
              line: 11,
              note: 'Sem mais componentes para chamar, o React tem a planta completa só com tags de HTML e coloca no DOM.',
              memory: [],
              output: '<ul><li>Café <span>R$ 5</span></li></ul>',
            },
          ],
        },
        {
          type: 'quiz',
          question: 'Qual destas é a melhor key para uma lista de pedidos vinda da API?',
          options: [
            {
              text: '`key={pedido.id}`',
              correct: true,
              feedback:
                'Isso. O id é único e não muda quando a lista é reordenada, filtrada ou ganha itens novos.',
            },
            {
              text: '`key={indice}`',
              feedback:
                'Funciona enquanto a lista nunca muda de ordem. Na primeira filtragem ou inserção no topo, os itens trocam de key e o estado de cada linha se embaralha.',
            },
            {
              text: '`key={Math.random()}`',
              feedback:
                'Uma key nova a cada renderização faz o React achar que todos os itens são novos: ele destrói e recria a lista inteira toda vez, perdendo foco e o que foi digitado.',
            },
            {
              text: '`key={pedido.cliente}`',
              feedback:
                'A mesma pessoa pode ter vários pedidos, então a key se repete. Ela precisa ser única entre os irmãos.',
            },
          ],
        },
      ],
    },
    {
      id: 'renderizacao-condicional',
      title: 'Mostrar ou esconder',
      blocks: [
        {
          type: 'text',
          text: 'Muitas partes da tela só aparecem em certas condições: o selo de “Esgotado”, a mensagem de lista vazia, o botão de sair para quem fez login. Como `if` não cabe dentro do JSX, você usa expressões.',
        },
        {
          type: 'table',
          caption: 'Três formas de renderização condicional',
          head: ['Quando', 'Forma', 'Exemplo'],
          rows: [
            ['Mostrar algo ou nada', '`condição && <JSX />`', '`{novo && <span>Novo</span>}`'],
            ['Escolher entre duas coisas', 'ternário `? :`', '`{logado ? <Sair /> : <Entrar />}`'],
            [
              'Um caso muda a tela toda',
              '`if` antes do `return`',
              '`if (!itens.length) return <p>Vazio</p>;`',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erro comum: o zero que aparece na tela',
          text: 'Com `{produto.estoque && <span>Disponível</span>}`, quando o estoque é `0` o React desenha o número **0**, porque `0 && ...` vale `0`, e números aparecem na tela. Escreva a condição como booleano: `{produto.estoque > 0 && ...}`.',
        },
        {
          type: 'quiz',
          question:
            'O carrinho está vazio (`itens.length` é `0`). O que aparece na tela com o código abaixo?',
          code: '<p>{itens.length && `Você tem ${itens.length} itens`}</p>',
          language: 'jsx',
          options: [
            {
              text: 'O número `0`',
              correct: true,
              feedback:
                'Isso. `0 && qualquerCoisa` devolve `0`, e o React mostra números. Troque por `itens.length > 0 && ...`.',
            },
            {
              text: 'Nada: o parágrafo fica vazio',
              feedback:
                'Seria verdade se a condição fosse `false`, `null` ou `undefined`, que o React ignora. O `0` é um número e é desenhado.',
            },
            {
              text: 'O texto “Você tem 0 itens”',
              feedback:
                'O `&&` para no primeiro valor falso e devolve ele. Como `0` é falso, o texto da direita nem é calculado.',
            },
          ],
        },
        {
          type: 'playground',
          title: 'Cardápio da padaria',
          framework: 'react',
          task: 'Complete `Cardapio`. Use `map` para criar um `<li>` por produto, com `key={produto.id}`, o nome e o preço. Quando o estoque for zero, mostre dentro do `<li>` um `<span className="esgotado">Esgotado</span>`. Se a lista vier vazia, o componente deve mostrar `<p>Nada no cardápio hoje.</p>`.',
          html: '<div id="root"></div>',
          css: `body { font-family: system-ui, sans-serif; margin: 16px; }
ul { list-style: none; padding: 0; }
li { padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
.esgotado { margin-left: 8px; padding: 2px 8px; border-radius: 99px; background: #fee2e2; color: #991b1b; font-size: 0.8rem; }`,
          js: `const produtos = [
  { id: 'p1', nome: 'Pão francês', preco: 0.8, estoque: 120 },
  { id: 'p2', nome: 'Pão de queijo', preco: 4.5, estoque: 0 },
  { id: 'p3', nome: 'Coxinha', preco: 7, estoque: 15 },
  { id: 'p4', nome: 'Bolo de fubá', preco: 25, estoque: 0 },
];

function formatarPreco(valor) {
  return valor.toFixed(2).replace('.', ',');
}

function Cardapio({ produtos }) {
  // TODO 1: se produtos estiver vazio, devolva <p>Nada no cardápio hoje.</p>
  return (
    <ul id="cardapio">
      {/* TODO 2: um <li key={...}> por produto, com nome e R$ preço */}
      {/* TODO 3: selo Esgotado quando o estoque for zero */}
    </ul>
  );
}

function App() {
  return (
    <main>
      <h1>Padaria Pão Quente</h1>
      <Cardapio produtos={produtos} />
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
          checks: [
            {
              label: 'Aparece um item para cada produto, sem aviso de `key` no console',
              test: verificar(`const itens = document.querySelectorAll('#cardapio li');
const avisos = (window.__trilhaLogs || []).filter((linha) => linha.includes('"key"'));
return itens.length === 4 && avisos.length === 0;`),
            },
            {
              label: 'Só os produtos com estoque zero mostram o selo **Esgotado**',
              test: verificar(`const itens = [...document.querySelectorAll('#cardapio li')];
if (itens.length !== 4) return false;
const esgotado = (nome) => {
  const item = itens.find((li) => texto(li).includes(nome));
  return !!item && !!item.querySelector('.esgotado') && texto(item).includes('Esgotado');
};
return esgotado('Pão de queijo') && esgotado('Bolo de fubá') && !esgotado('Pão francês') && !esgotado('Coxinha') && !texto(document.querySelector('#cardapio')).match(/(^|\\s)0(\\s|$)/);`),
            },
            {
              label: 'Com a lista vazia, aparece **Nada no cardápio hoje**',
              test: verificar(`if (typeof Cardapio !== 'function') return false;
const caixa = document.createElement('div');
ReactDOM.createRoot(caixa).render(React.createElement(Cardapio, { produtos: [] }));
await esperar(80);
return texto(caixa).includes('Nada no cardápio hoje');`),
            },
          ],
          solution: {
            js: `const produtos = [
  { id: 'p1', nome: 'Pão francês', preco: 0.8, estoque: 120 },
  { id: 'p2', nome: 'Pão de queijo', preco: 4.5, estoque: 0 },
  { id: 'p3', nome: 'Coxinha', preco: 7, estoque: 15 },
  { id: 'p4', nome: 'Bolo de fubá', preco: 25, estoque: 0 },
];

function formatarPreco(valor) {
  return valor.toFixed(2).replace('.', ',');
}

function Cardapio({ produtos }) {
  if (produtos.length === 0) {
    return <p>Nada no cardápio hoje.</p>;
  }
  return (
    <ul id="cardapio">
      {produtos.map((produto) => (
        <li key={produto.id}>
          {produto.nome} — R$ {formatarPreco(produto.preco)}
          {produto.estoque === 0 && <span className="esgotado">Esgotado</span>}
        </li>
      ))}
    </ul>
  );
}

function App() {
  return (
    <main>
      <h1>Padaria Pão Quente</h1>
      <Cardapio produtos={produtos} />
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
          },
          height: 280,
        },
        {
          type: 'order',
          prompt:
            'Você vai transformar uma tela de catálogo em componentes React. Coloque os passos na ordem que mais ajuda.',
          items: [
            'Desenhar a tela no papel e circular os pedaços que se repetem',
            'Dar nome aos componentes e montar a árvore de quem fica dentro de quem',
            'Decidir quais dados cada componente recebe por props',
            'Escrever o componente da peça repetida, como `CartaoProduto`, com dados fixos',
            'Trocar os dados fixos por um `map` sobre o array de produtos, com `key`',
          ],
          explanation:
            'Primeiro a estrutura, depois os dados. Começar pela peça repetida com dados fixos deixa você ver o resultado rápido; só então ela passa a receber os dados reais pela lista.',
        },
      ],
    },
  ],
  recap: [
    'O React recebe uma descrição da tela, escrita em JSX, e atualiza o DOM só onde há diferença.',
    'JSX tem regras próprias: uma raiz, `className`, tags fechadas, `style` como objeto e expressões entre chaves.',
    'Componentes são funções com nome em maiúscula; props são o objeto de argumentos, e `children` é o conteúdo entre as tags.',
    'Listas vêm de `map`, e cada item precisa de uma `key` única e estável, de preferência o id dos dados.',
    'Para mostrar ou esconder, use `&&` com uma condição booleana, o ternário ou um `if` antes do `return`.',
  ],
  cards: [
    {
      id: 'jsx-vira',
      front: 'Em que o JSX é transformado antes de rodar no navegador?',
      back: 'Em chamadas `React.createElement`, que devolvem objetos descrevendo os elementos.',
    },
    {
      id: 'classname',
      front: 'Por que no JSX se escreve `className` em vez de `class`?',
      back: 'Porque `class` é palavra reservada do JavaScript. Pelo mesmo motivo, `for` vira `htmlFor`.',
    },
    {
      id: 'maiuscula',
      front: 'Por que o nome de um componente começa com letra maiúscula?',
      back: 'Para o React diferenciar seu componente (`<Cartao />`) de uma tag do HTML (`<section>`).',
    },
    {
      id: 'children',
      front: 'O que é a prop `children`?',
      back: 'O conteúdo colocado entre a tag de abertura e a de fechamento do componente.',
    },
    {
      id: 'key',
      front: 'Para que serve a `key` em uma lista?',
      back: 'Para o React saber qual item é qual entre renderizações. Use um id único e estável, não o índice.',
    },
    {
      id: 'zero-na-tela',
      front: 'Por que `{lista.length && <Itens />}` pode mostrar um 0 na tela?',
      back: 'Porque `0 && ...` vale `0`, e o React desenha números. Use `lista.length > 0 && ...`.',
    },
  ],
  mission: {
    title: 'Monte um catálogo com componentes',
    text: 'Crie um projeto React com Vite e divida a tela de um catálogo que você conhece (uma padaria, uma loja de roupas, uma livraria) em componentes que recebem dados por props.',
    steps: [
      'Desenhe a tela e a árvore de componentes antes de abrir o editor',
      'Guarde os produtos num array de objetos com `id`, nome, preço e estoque',
      'Crie `CartaoProduto` recebendo os dados por props, sem alterar nenhuma delas',
      'Renderize a lista com `map` e `key={produto.id}` e confira que o console não mostra avisos',
      'Mostre um selo quando o estoque for zero e uma mensagem quando a lista estiver vazia',
      'Use um componente de moldura com `children` em pelo menos dois lugares',
    ],
  },
  sources: [
    { title: 'React: Descrevendo a interface', url: 'https://react.dev/learn/describing-the-ui' },
    {
      title: 'React: Escrevendo marcação com JSX',
      url: 'https://react.dev/learn/writing-markup-with-jsx',
    },
    {
      title: 'React: Passando props para um componente',
      url: 'https://react.dev/learn/passing-props-to-a-component',
    },
    { title: 'React: Renderizando listas', url: 'https://react.dev/learn/rendering-lists' },
  ],
};
