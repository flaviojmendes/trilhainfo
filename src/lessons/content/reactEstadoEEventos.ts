import { LessonContent } from '../types';

const verificar = (corpo: string) => `const anterior = window.__fila || Promise.resolve();
let liberar;
window.__fila = new Promise((r) => (liberar = r));
await anterior;
await new Promise((r) => setTimeout(r, 300));
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
const texto = (el) => (el?.textContent || '').replace(/\\s+/g, ' ').trim();
const botao = (rotulo, dentro = document) => [...dentro.querySelectorAll('button')].find((b) => texto(b) === rotulo);
const digitar = (campo, valor) => {
  const definir = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(campo), 'value').set;
  definir.call(campo, valor);
  campo.dispatchEvent(new Event('input', { bubbles: true }));
};
try {
${corpo}
} finally {
  liberar();
}`;

export const content: LessonContent = {
  hook: 'Curtir uma foto, escolher o tamanho da pizza, digitar o CEP e ver o endereço aparecer: tudo isso é uma tela reagindo ao que a pessoa faz. Na aula anterior seus componentes só mostravam dados fixos. Agora eles vão lembrar de coisas e mudar quando alguém clica ou digita, que é o que faz uma interface parecer viva.',
  sections: [
    {
      id: 'variavel-nao-basta',
      title: 'Por que uma variável comum não basta',
      blocks: [
        {
          type: 'text',
          text: 'Primeira tentativa natural de fazer um contador: uma variável `let` e um botão que soma 1. O console mostra o número subindo, mas a tela continua no zero. Rode o exercício abaixo e veja com seus olhos antes de consertar.',
        },
        {
          type: 'analogy',
          title: 'Cada renderização é uma foto',
          text: 'Quando o React chama seu componente, ele tira uma **foto** da tela com os valores daquele momento. Mudar uma variável depois da foto não muda a foto. E na próxima vez que o componente for chamado, a variável nasce de novo valendo zero, como se você nunca tivesse clicado.',
        },
        {
          type: 'text',
          text: 'O **estado** resolve os dois problemas. É um valor que o React guarda **fora** da sua função, entre uma chamada e outra. E, quando você pede para trocá-lo, o React chama o componente de novo, tirando uma foto nova. Isso se chama **re-renderizar**.',
        },
        {
          type: 'anatomy',
          caption: 'A linha que cria um estado.',
          language: 'jsx',
          parts: [
            { text: 'const [' },
            {
              text: 'copos',
              label: 'Valor atual',
              note: 'O valor desta renderização. Trate como somente leitura: escrever `copos = 5` não avisa ninguém.',
            },
            { text: ', ' },
            {
              text: 'setCopos',
              label: 'Função de troca',
              note: 'O único jeito certo de mudar o estado. Ela guarda o valor novo e agenda uma nova renderização. Por convenção, o nome é `set` + o nome do valor.',
            },
            { text: '] = ' },
            {
              text: 'useState',
              label: 'Hook',
              note: 'Funções que começam com `use` são **hooks**: dão ao componente recursos do React. Chame sempre no topo do componente, nunca dentro de `if`, laço ou função interna.',
            },
            { text: '(' },
            {
              text: '0',
              label: 'Valor inicial',
              note: 'Usado só na primeira renderização. Depois, o React devolve o valor guardado.',
            },
            { text: ');' },
          ],
        },
        {
          type: 'playground',
          title: 'Contador de copos de água',
          framework: 'react',
          task: 'Clique em **+1 copo** e repare: o console mostra o número subindo, a tela não. Troque a variável `let` por `useState` e chame `setCopos` no clique. Depois crie um botão **Zerar** que volta o total para 0.',
          html: '<div id="root"></div>',
          css: `body { font-family: system-ui, sans-serif; margin: 16px; }
button { margin-right: 8px; padding: 6px 14px; cursor: pointer; }
#total { font-size: 1.5rem; }`,
          js: `const { useState } = React;

function Contador() {
  let copos = 0;

  function somar() {
    copos = copos + 1;
    console.log('copos agora vale', copos);
  }

  return (
    <div>
      <p>Copos de água hoje: <strong id="total">{copos}</strong></p>
      <button onClick={somar}>+1 copo</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Contador />);`,
          checks: [
            {
              label: 'Três cliques em **+1 copo** fazem a tela mostrar 3 a mais',
              test: verificar(`const total = () => Number(texto(document.querySelector('#total')));
const mais = botao('+1 copo');
if (!mais) return false;
const antes = total();
for (let i = 0; i < 3; i++) {
  mais.click();
  await esperar(40);
}
return total() === antes + 3;`),
            },
            {
              label: 'O botão **Zerar** volta o total para 0',
              test: verificar(`const zerar = botao('Zerar');
const mais = botao('+1 copo');
if (!zerar || !mais) return false;
mais.click();
await esperar(40);
zerar.click();
await esperar(60);
return texto(document.querySelector('#total')) === '0';`),
            },
          ],
          solution: {
            js: `const { useState } = React;

function Contador() {
  const [copos, setCopos] = useState(0);

  function somar() {
    setCopos(copos + 1);
  }

  return (
    <div>
      <p>Copos de água hoje: <strong id="total">{copos}</strong></p>
      <button onClick={somar}>+1 copo</button>
      <button onClick={() => setCopos(0)}>Zerar</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Contador />);`,
          },
          height: 180,
        },
      ],
    },
    {
      id: 'eventos',
      title: 'Eventos: entregue a função, não o resultado',
      blocks: [
        {
          type: 'text',
          text: 'Na aula de DOM você usou `addEventListener`. No React, o evento vira um atributo em camelCase direto no JSX: `onClick`, `onChange`, `onSubmit`, `onKeyDown`. O valor é uma **função** que o React vai chamar quando o evento acontecer.',
        },
        {
          type: 'code',
          language: 'jsx',
          caption: 'Três jeitos corretos de tratar um clique',
          code: `// 1. Função declarada no componente
function curtir() { setCurtidas(curtidas + 1); }
<button onClick={curtir}>Curtir</button>

// 2. Função anônima, ótima para passar argumentos
<button onClick={() => remover(produto.id)}>Remover</button>

// 3. Usando o objeto do evento
<input onChange={(evento) => setBusca(evento.target.value)} />`,
        },
        {
          type: 'quiz',
          question:
            'A tela trava com o erro “Too many re-renders” assim que abre. Qual destas linhas causa isso?',
          options: [
            {
              text: '`<button onClick={setAberto(true)}>Abrir</button>`',
              correct: true,
              feedback:
                'Isso. Com parênteses, `setAberto(true)` roda **durante** a renderização, que agenda outra renderização, que roda de novo... Escreva `onClick={() => setAberto(true)}`.',
            },
            {
              text: '`<button onClick={() => setAberto(true)}>Abrir</button>`',
              feedback:
                'Esta está certa: a seta cria uma função que só roda no clique. Nada acontece durante a renderização.',
            },
            {
              text: '`<button onClick={abrir}>Abrir</button>`',
              feedback:
                'Também está certa: você entrega a função `abrir`, sem chamar. O React chama quando houver clique.',
            },
          ],
        },
        {
          type: 'fill',
          prompt:
            'Complete para que o clique remova o item certo e o campo atualize o estado `nome` a cada tecla.',
          language: 'jsx',
          template: `<button [[onClick]]={() => remover(item.id)}>Remover</button>

<input
  value={nome}
  onChange={(evento) => setNome(evento.[[target.value]])}
/>`,
          explanation:
            'O nome do evento é `onClick`, em camelCase. No `onChange`, o texto digitado está em `evento.target.value`: `target` é o elemento que disparou o evento, e `value` é o que tem nele agora.',
        },
      ],
    },
    {
      id: 'foto-e-atualizacao-funcional',
      title: 'O estado é uma foto: atualização funcional',
      blocks: [
        {
          type: 'text',
          text: 'Uma surpresa comum: chamar `setPontos(pontos + 1)` três vezes seguidas soma só 1. O motivo é a foto. Durante todo aquele clique, `pontos` vale o número da foto atual, e a função de troca não muda a variável na hora: ela **agenda** o valor novo para a próxima renderização.',
        },
        {
          type: 'trace',
          caption: 'Um clique em “+3” com `pontos` valendo 0.',
          code: `function somarTres() {
  setPontos(pontos + 1);
  setPontos(pontos + 1);
  setPontos(pontos + 1);
}
// próxima renderização`,
          steps: [
            {
              line: 1,
              note: 'O clique chama `somarTres`. Nesta foto, `pontos` vale 0, e vai valer 0 até a função terminar.',
              memory: [
                ['pontos', '0'],
                ['agendado', '(nada)'],
              ],
            },
            {
              line: 2,
              note: '`pontos + 1` é `0 + 1`. O React anota: o próximo valor é 1.',
              memory: [
                ['pontos', '0'],
                ['agendado', '1'],
              ],
            },
            {
              line: 3,
              note: '`pontos` ainda é 0 nesta foto. De novo `0 + 1`: o React anota 1 outra vez.',
              memory: [
                ['pontos', '0'],
                ['agendado', '1'],
              ],
            },
            {
              line: 4,
              note: 'Mesma conta, mesmo resultado. Três chamadas, todas pedindo 1.',
              memory: [
                ['pontos', '0'],
                ['agendado', '1'],
              ],
            },
            {
              line: 6,
              note: 'O React renderiza de novo com o valor agendado. A tela mostra 1, não 3.',
              memory: [['pontos', '1']],
              output: 'Tela: 1 ponto',
            },
          ],
        },
        {
          type: 'text',
          text: 'Quando o valor novo depende do anterior, passe uma **função** para o `set`: `setPontos((anterior) => anterior + 1)`. O React guarda essas funções numa fila e entrega a cada uma o resultado da anterior. Três chamadas assim somam 3.',
        },
        {
          type: 'fill',
          prompt: 'Reescreva a soma com atualização funcional, para que as três chamadas somem 3.',
          language: 'jsx',
          template: `function somarTres() {
  setPontos(([[anterior|p|valor]]) => [[anterior + 1|p + 1|valor + 1]]);
  setPontos((anterior) => anterior + 1);
  setPontos((anterior) => anterior + 1);
}`,
          explanation:
            'O nome do parâmetro é escolha sua (`anterior`, `p`, `n`). O que importa é usar o valor que o React entrega, e não o da foto. Use esse formato sempre que o novo estado depender do anterior, principalmente dentro de timers e callbacks.',
        },
        {
          type: 'reveal',
          question:
            'Logo depois de `setPontos(10)`, você escreve `console.log(pontos)`. O que aparece, se `pontos` valia 0?',
          answer:
            'Aparece 0. A troca só vale para a próxima renderização; nesta foto, `pontos` continua 0. Se você precisa do valor novo ainda na mesma função, guarde-o numa variável: `const novo = 10; setPontos(novo); console.log(novo);`.',
        },
      ],
    },
    {
      id: 'arrays-e-objetos',
      title: 'Arrays e objetos: sempre uma cópia nova',
      blocks: [
        {
          type: 'analogy',
          title: 'A lista de compras na geladeira',
          text: 'Imagine que o React só confere se o **papel** da lista mudou, sem ler o conteúdo. Se você rabisca no mesmo papel, ele olha, vê o mesmo papel e acha que nada mudou. Para ele perceber, você entrega uma folha nova, com tudo copiado e a mudança feita.',
        },
        {
          type: 'text',
          text: 'É exatamente assim: o React compara o estado antigo com o novo usando `Object.is`, que diz se é o **mesmo** objeto, não se o conteúdo é igual. Por isso `itens.push(novo)` seguido de `setItens(itens)` não atualiza a tela: é o mesmo array. Atualizar sem modificar o original se chama atualização **imutável**.',
        },
        {
          type: 'table',
          caption: 'As receitas imutáveis do dia a dia',
          head: ['Quero', 'Evite (modifica o original)', 'Use (cria um novo)'],
          rows: [
            ['Adicionar no fim', '`itens.push(x)`', '`[...itens, x]`'],
            ['Remover', '`itens.splice(i, 1)`', '`itens.filter((i) => i.id !== id)`'],
            [
              'Alterar um item',
              '`itens[0].feito = true`',
              '`itens.map((i) => i.id === id ? { ...i, feito: true } : i)`',
            ],
            ['Ordenar', '`itens.sort()`', '`[...itens].sort()`'],
            [
              'Mudar campo de objeto',
              '`perfil.cidade = "Recife"`',
              '`{ ...perfil, cidade: "Recife" }`',
            ],
          ],
        },
        {
          type: 'classify',
          prompt: 'Qual destas atualizações o React percebe, e qual passa despercebida?',
          buckets: ['O React percebe', 'Passa despercebida'],
          items: [
            { text: '`setItens([...itens, novo])`', bucket: 0 },
            { text: '`setItens(itens.filter((i) => i.id !== 3))`', bucket: 0 },
            { text: '`setPerfil({ ...perfil, nome: "Ana" })`', bucket: 0 },
            { text: '`setItens([...itens].reverse())`', bucket: 0 },
            { text: '`itens.push(novo); setItens(itens)`', bucket: 1 },
            { text: '`perfil.nome = "Ana"; setPerfil(perfil)`', bucket: 1 },
            { text: '`itens.sort(); setItens(itens)`', bucket: 1 },
          ],
          explanation:
            'Nos três últimos casos o conteúdo até mudou, mas o objeto é o mesmo, então o React pula a renderização. Repare que `reverse` e `sort` modificam o original: copie com `[...itens]` antes.',
        },
      ],
    },
    {
      id: 'formularios-controlados',
      title: 'Formulários controlados',
      blocks: [
        {
          type: 'text',
          text: 'Num campo de texto comum, quem guarda o que foi digitado é o navegador. No React, o mais comum é o estado guardar, e o campo apenas mostrar. Esse é o **input controlado**: o React é a fonte da verdade, e o que está na tela é sempre igual ao estado.',
        },
        {
          type: 'anatomy',
          caption: 'Um formulário controlado, do campo ao envio.',
          language: 'jsx',
          parts: [
            { text: "const [cep, setCep] = useState('');\n\nfunction enviar(evento) {\n  " },
            {
              text: 'evento.preventDefault();',
              label: 'Sem recarregar',
              note: 'Por padrão, enviar um formulário recarrega a página. Numa aplicação React, você impede isso e trata os dados no JavaScript.',
            },
            { text: '\n  buscarEndereco(cep);\n}\n\n<form ' },
            {
              text: 'onSubmit={enviar}',
              label: 'onSubmit no form',
              note: 'Trate o envio no `form`, não no clique do botão. Assim, apertar `Enter` no campo também envia, e quem usa teclado agradece.',
            },
            { text: '>\n  <label htmlFor="cep">CEP</label>\n  <input\n    id="cep"\n    ' },
            {
              text: 'value={cep}',
              label: 'value vem do estado',
              note: 'O campo mostra o que está no estado. Se você trocar o estado por código (por exemplo, limpar depois de enviar), o campo acompanha.',
            },
            { text: '\n    ' },
            {
              text: 'onChange={(evento) => setCep(evento.target.value)}',
              label: 'onChange atualiza o estado',
              note: 'A cada tecla o estado muda e o componente renderiza de novo. Sem o `onChange`, o campo fica travado: o React sempre volta para o valor do estado.',
            },
            { text: '\n  />\n  <button type="submit">Buscar</button>\n</form>' },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Bônus do controlado',
          text: 'Como o valor está no estado, fica fácil validar enquanto a pessoa digita, limpar o campo depois de enviar ou desabilitar o botão: `disabled={cep.length !== 8}`.',
        },
        {
          type: 'playground',
          title: 'Lista de compras',
          framework: 'react',
          task: 'Transforme o campo em controlado (crie o estado `texto`). No envio, se o texto sem espaços nas pontas não estiver vazio, crie um array **novo** com o item no fim e limpe o campo. Faça o **Remover** criar um array novo sem aquele item. Use `Date.now()` como id dos itens novos.',
          html: '<div id="root"></div>',
          css: `body { font-family: system-ui, sans-serif; margin: 16px; }
form { display: flex; gap: 8px; align-items: center; }
input { padding: 6px; }
ul { padding: 0; list-style: none; }
li { display: flex; justify-content: space-between; max-width: 280px; padding: 6px 0; border-bottom: 1px solid #e5e7eb; }`,
          js: `const { useState } = React;

function ListaDeCompras() {
  const [itens, setItens] = useState([
    { id: 1, nome: 'Feijão' },
    { id: 2, nome: 'Café' },
  ]);
  // TODO 1: crie o estado do texto digitado

  function adicionar(evento) {
    evento.preventDefault();
    // TODO 2: ignore texto vazio, adicione com um array novo e limpe o campo
  }

  function remover(id) {
    // TODO 3: crie um array novo sem o item desse id
  }

  return (
    <div>
      <form onSubmit={adicionar}>
        <label htmlFor="item">Item</label>
        <input id="item" />
        <button type="submit">Adicionar</button>
      </form>
      <ul id="itens">
        {itens.map((item) => (
          <li key={item.id}>
            {item.nome}
            <button type="button" onClick={() => remover(item.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ListaDeCompras />);`,
          checks: [
            {
              label:
                'Digitar **Arroz** e clicar em **Adicionar** põe o item na lista e limpa o campo',
              test: verificar(`const campo = document.querySelector('#item');
const adicionar = botao('Adicionar');
if (!campo || !adicionar) return false;
digitar(campo, 'Arroz');
await esperar(50);
adicionar.click();
await esperar(80);
const nomes = [...document.querySelectorAll('#itens li')].map(texto);
return nomes.some((n) => n.startsWith('Arroz')) && document.querySelector('#item').value === '';`),
            },
            {
              label: 'Texto vazio ou só com espaços é ignorado, mas **Leite** entra',
              test: verificar(`const campo = document.querySelector('#item');
const adicionar = botao('Adicionar');
if (!campo || !adicionar) return false;
const contar = () => document.querySelectorAll('#itens li').length;
const antes = contar();
digitar(campo, '   ');
await esperar(50);
adicionar.click();
await esperar(80);
const ignorou = contar() === antes;
digitar(document.querySelector('#item'), 'Leite');
await esperar(50);
adicionar.click();
await esperar(80);
const nomes = [...document.querySelectorAll('#itens li')].map(texto);
return ignorou && contar() === antes + 1 && nomes.some((n) => n.startsWith('Leite'));`),
            },
            {
              label: '**Remover** tira só o item clicado',
              test: verificar(`const itens = [...document.querySelectorAll('#itens li')];
const feijao = itens.find((li) => texto(li).startsWith('Feijão'));
const remover = feijao && botao('Remover', feijao);
if (!remover) return false;
remover.click();
await esperar(80);
const depois = [...document.querySelectorAll('#itens li')].map(texto);
return depois.length === itens.length - 1 && !depois.some((n) => n.startsWith('Feijão')) && depois.some((n) => n.startsWith('Café'));`),
            },
          ],
          solution: {
            js: `const { useState } = React;

function ListaDeCompras() {
  const [itens, setItens] = useState([
    { id: 1, nome: 'Feijão' },
    { id: 2, nome: 'Café' },
  ]);
  const [texto, setTexto] = useState('');

  function adicionar(evento) {
    evento.preventDefault();
    const nome = texto.trim();
    if (nome === '') return;
    setItens([...itens, { id: Date.now(), nome }]);
    setTexto('');
  }

  function remover(id) {
    setItens(itens.filter((item) => item.id !== id));
  }

  return (
    <div>
      <form onSubmit={adicionar}>
        <label htmlFor="item">Item</label>
        <input id="item" value={texto} onChange={(evento) => setTexto(evento.target.value)} />
        <button type="submit">Adicionar</button>
      </form>
      <ul id="itens">
        {itens.map((item) => (
          <li key={item.id}>
            {item.nome}
            <button type="button" onClick={() => remover(item.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ListaDeCompras />);`,
          },
          height: 260,
        },
      ],
    },
    {
      id: 'elevar-e-derivar',
      title: 'Elevar o estado e calcular o resto',
      blocks: [
        {
          type: 'text',
          text: 'Na aula Componentes e estado você viu duas regras: o estado mora no **pai comum** de quem precisa dele, e o que dá para calcular **não vira estado**. Agora é hora de aplicar as duas em React, onde elas aparecem em quase todo componente.',
        },
        {
          type: 'code',
          language: 'jsx',
          caption: 'Elevar o estado: o pai guarda, o filho recebe valor e função por props',
          code: `function Loja() {
  const [busca, setBusca] = useState('');
  const visiveis = produtos.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  ); // calculado a cada renderização, não é estado

  return (
    <>
      <BarraDeBusca valor={busca} aoMudar={setBusca} />
      <ListaDeProdutos produtos={visiveis} />
    </>
  );
}

function BarraDeBusca({ valor, aoMudar }) {
  return <input value={valor} onChange={(e) => aoMudar(e.target.value)} />;
}`,
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erro comum: estado espelho',
          text: 'Guardar `quantidade` ao lado de `favoritos`, ou `listaFiltrada` ao lado de `busca`, obriga você a lembrar de atualizar os dois em todo lugar. Um dia você esquece, e a tela mente. Se um valor sai de uma conta com outro estado ou com props, calcule na renderização.',
        },
        {
          type: 'playground',
          title: 'Busca e favoritos',
          framework: 'react',
          task: 'Este código tem dois defeitos. A busca mora dentro de `BarraDeBusca`, então a lista não consegue filtrar: eleve o estado para `Loja` e passe valor e função por props. E o contador usa um estado espelho, `quantidade`, que não diminui ao desfavoritar: apague esse estado e mostre `favoritos.length`. A busca não deve diferenciar maiúsculas de minúsculas.',
          html: '<div id="root"></div>',
          css: `body { font-family: system-ui, sans-serif; margin: 16px; }
input { padding: 6px; width: 220px; }
ul { padding: 0; list-style: none; }
li { display: flex; justify-content: space-between; max-width: 300px; padding: 6px 0; border-bottom: 1px solid #e5e7eb; }`,
          js: `const { useState } = React;

const produtos = [
  { id: 1, nome: 'Caneca' },
  { id: 2, nome: 'Camiseta' },
  { id: 3, nome: 'Boné' },
  { id: 4, nome: 'Caderno' },
];

function BarraDeBusca() {
  const [busca, setBusca] = useState('');
  return (
    <input
      aria-label="Buscar produto"
      placeholder="Buscar produto"
      value={busca}
      onChange={(evento) => setBusca(evento.target.value)}
    />
  );
}

function Loja() {
  const [favoritos, setFavoritos] = useState([]);
  const [quantidade, setQuantidade] = useState(0);

  function alternar(id) {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((f) => f !== id));
    } else {
      setFavoritos([...favoritos, id]);
      setQuantidade(quantidade + 1);
    }
  }

  return (
    <div>
      <p>Favoritos: <strong id="quantidade">{quantidade}</strong></p>
      <BarraDeBusca />
      <ul id="produtos">
        {produtos.map((produto) => (
          <li key={produto.id}>
            {produto.nome}
            <button onClick={() => alternar(produto.id)}>
              {favoritos.includes(produto.id) ? 'Desfavoritar' : 'Favoritar'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Loja />);`,
          checks: [
            {
              label: 'Digitar **ca** na busca deixa só Caneca, Camiseta e Caderno',
              test: verificar(`const campo = document.querySelector('input');
if (!campo) return false;
digitar(campo, 'ca');
await esperar(80);
const nomes = [...document.querySelectorAll('#produtos li')].map(texto);
const certo = nomes.length === 3 && !nomes.some((n) => n.includes('Boné')) && nomes.some((n) => n.includes('Camiseta'));
digitar(document.querySelector('input'), '');
await esperar(80);
return certo;`),
            },
            {
              label: 'Favoritar e desfavoritar o mesmo produto volta o contador para **0**',
              test: verificar(`const quantidade = () => texto(document.querySelector('#quantidade'));
const item = () => [...document.querySelectorAll('#produtos li')].find((li) => texto(li).includes('Caneca'));
const primeiro = item() && item().querySelector('button');
if (!primeiro) return false;
primeiro.click();
await esperar(60);
const subiu = quantidade() === '1';
item().querySelector('button').click();
await esperar(60);
return subiu && quantidade() === '0';`),
            },
            {
              label: 'Um favorito continua marcado enquanto você busca',
              test: verificar(`const campo = document.querySelector('input');
const bone = () => [...document.querySelectorAll('#produtos li')].find((li) => texto(li).includes('Boné'));
if (!campo || !bone()) return false;
bone().querySelector('button').click();
await esperar(60);
digitar(campo, 'bo');
await esperar(80);
const lista = [...document.querySelectorAll('#produtos li')];
const marcado = lista.length === 1 && texto(lista[0]).includes('Desfavoritar');
digitar(document.querySelector('input'), '');
await esperar(80);
return marcado && texto(document.querySelector('#quantidade')) === '1';`),
            },
          ],
          solution: {
            js: `const { useState } = React;

const produtos = [
  { id: 1, nome: 'Caneca' },
  { id: 2, nome: 'Camiseta' },
  { id: 3, nome: 'Boné' },
  { id: 4, nome: 'Caderno' },
];

function BarraDeBusca({ valor, aoMudar }) {
  return (
    <input
      aria-label="Buscar produto"
      placeholder="Buscar produto"
      value={valor}
      onChange={(evento) => aoMudar(evento.target.value)}
    />
  );
}

function Loja() {
  const [favoritos, setFavoritos] = useState([]);
  const [busca, setBusca] = useState('');

  const visiveis = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  function alternar(id) {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((f) => f !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  }

  return (
    <div>
      <p>Favoritos: <strong id="quantidade">{favoritos.length}</strong></p>
      <BarraDeBusca valor={busca} aoMudar={setBusca} />
      <ul id="produtos">
        {visiveis.map((produto) => (
          <li key={produto.id}>
            {produto.nome}
            <button onClick={() => alternar(produto.id)}>
              {favoritos.includes(produto.id) ? 'Desfavoritar' : 'Favoritar'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Loja />);`,
          },
          height: 260,
        },
        {
          type: 'quiz',
          question:
            'Um formulário tem os estados `nome` e `sobrenome`. Onde deve ficar o nome completo mostrado no topo?',
          options: [
            {
              text: 'Numa variável calculada na renderização: `const completo = nome + " " + sobrenome`',
              correct: true,
              feedback:
                'Isso. A conta é barata e sempre fica certa, porque roda a cada renderização com os valores atuais.',
            },
            {
              text: 'Num terceiro estado, `completo`, atualizado em cada `onChange`',
              feedback:
                'É o estado espelho: você precisa lembrar de atualizá-lo nos dois campos, e qualquer esquecimento deixa a tela errada.',
            },
            {
              text: 'Num estado no componente pai, só para garantir',
              feedback:
                'Mudar de lugar não resolve: continua sendo uma cópia de algo que dá para calcular. Estado é só o mínimo que não dá para descobrir de outro jeito.',
            },
          ],
        },
      ],
    },
  ],
  recap: [
    'Variáveis comuns não sobrevivem entre renderizações nem avisam o React; `useState` guarda o valor e, ao trocar, re-renderiza o componente.',
    'Eventos recebem uma função, como `onClick={() => remover(id)}`; com parênteses direto, ela rodaria durante a renderização.',
    'Cada renderização é uma foto: quando o novo valor depende do anterior, use a atualização funcional `setX((anterior) => ...)`.',
    'Arrays e objetos no estado são trocados por cópias novas, com spread, `map` e `filter`, nunca modificados no lugar.',
    'Inputs controlados usam `value` e `onChange`; o estado sobe para o pai comum e o que dá para calcular não vira estado.',
  ],
  cards: [
    {
      id: 'let-nao-atualiza',
      front: 'Por que mudar uma variável `let` dentro do componente não atualiza a tela?',
      back: 'Porque o React não fica sabendo da mudança, e a variável nasce de novo a cada renderização. Use `useState`.',
    },
    {
      id: 'onclick-parenteses',
      front: 'Qual a diferença entre `onClick={salvar}` e `onClick={salvar()}`?',
      back: 'O primeiro entrega a função para o clique. O segundo chama `salvar` durante a renderização.',
    },
    {
      id: 'atualizacao-funcional',
      front: 'Quando usar `setContador((anterior) => anterior + 1)`?',
      back: 'Quando o novo valor depende do anterior, principalmente com várias atualizações seguidas ou em timers.',
    },
    {
      id: 'push-no-estado',
      front: 'Por que `itens.push(x); setItens(itens)` não re-renderiza?',
      back: 'Porque é o mesmo array. O React compara a referência. Use `setItens([...itens, x])`.',
    },
    {
      id: 'input-controlado',
      front: 'O que é um input controlado?',
      back: 'Um campo cujo `value` vem do estado e que atualiza o estado no `onChange`. O estado é a fonte da verdade.',
    },
    {
      id: 'estado-espelho',
      front: 'Tenho `favoritos` no estado. Devo guardar também `quantidade`?',
      back: 'Não. Calcule `favoritos.length` na renderização. Estado espelho acaba desatualizado.',
    },
  ],
  mission: {
    title: 'Busca e favoritos de verdade',
    text: 'No catálogo que você montou na aula anterior, adicione interação. A meta é ter o mínimo de estado possível e saber explicar cada atualização.',
    steps: [
      'Adicione um campo de busca controlado no componente pai da lista',
      'Calcule a lista filtrada na renderização, sem criar um estado para ela',
      'Implemente favoritar e desfavoritar com arrays novos e mostre a quantidade com `favoritos.length`',
      'Crie um formulário para cadastrar produto que funcione com `Enter` e ignore campos vazios',
      'Escreva num comentário no topo do componente quais estados existem e por que cada um é necessário',
    ],
  },
  sources: [
    {
      title: 'React: Estado, a memória de um componente',
      url: 'https://react.dev/learn/state-a-components-memory',
    },
    {
      title: 'React: Enfileirando uma série de atualizações de estado',
      url: 'https://react.dev/learn/queueing-a-series-of-state-updates',
    },
    {
      title: 'React: Atualizando arrays no estado',
      url: 'https://react.dev/learn/updating-arrays-in-state',
    },
    {
      title: 'React: Escolhendo a estrutura do estado',
      url: 'https://react.dev/learn/choosing-the-state-structure',
    },
  ],
};
