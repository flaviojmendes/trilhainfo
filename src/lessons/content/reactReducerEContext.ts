import { LessonContent } from '../types';

const verificar = (corpo: string) => `const anterior = window.__fila || Promise.resolve();
let liberar;
window.__fila = new Promise((r) => (liberar = r));
await anterior;
await new Promise((r) => setTimeout(r, 300));
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
const texto = (el) => (el?.textContent || '').replace(/\\s+/g, ' ').trim();
const botao = (rotulo) => [...document.querySelectorAll('button')].find((b) => texto(b) === rotulo);
const numero = (el) => Number(texto(el).replace(/[^\\d,.]/g, '').replace(',', '.')) || 0;
try {
${corpo}
} finally {
  liberar();
}`;

export const content: LessonContent = {
  hook: 'Um carrinho de compras parece simples até você listar tudo o que ele faz: adicionar, remover, mudar quantidade, aplicar cupom, esvaziar. E o número de itens precisa aparecer no topo da página, longe da lista de produtos. Com `useState` espalhado e props passando de mão em mão, isso vira um emaranhado rápido. Nesta aula você vai aprender as duas ferramentas que o React oferece para organizar esse tipo de estado, e quando é melhor não usá-las.',
  sections: [
    {
      id: 'estado-baguncado',
      title: 'Quando o useState começa a embolar',
      blocks: [
        {
          type: 'text',
          text: 'Na aula de estado e eventos você usou `useState` para guardar um valor de cada vez. Isso é ótimo enquanto cada valor muda sozinho. O problema aparece quando vários valores precisam mudar **juntos**, e cada clique tem que lembrar de atualizar todos eles.',
        },
        {
          type: 'analogy',
          title: 'O caixa da padaria com cinco cadernos',
          text: 'Imagine um caixa que anota a venda em um caderno, o estoque em outro, o troco em outro. Se ele esquece de atualizar um dos cadernos, os números deixam de bater. Seria melhor ter **uma ficha** por venda e **uma pessoa** responsável por aplicar cada ficha a todos os registros, sempre do mesmo jeito.',
        },
        {
          type: 'code',
          language: 'jsx',
          caption: 'Quatro estados que deveriam andar juntos, atualizados em lugares diferentes',
          code: `const [itens, setItens] = useState([]);
const [total, setTotal] = useState(0);
const [cupom, setCupom] = useState(null);
const [carregando, setCarregando] = useState(false);

function adicionar(produto) {
  setItens([...itens, produto]);
  setTotal(total + produto.preco);
  // esqueceu de recalcular o desconto do cupom
}`,
        },
        {
          type: 'text',
          text: 'Repare nos sinais de alerta: estados que dependem uns dos outros, regras repetidas em vários manipuladores de evento e combinações impossíveis, como `carregando` e `erro` verdadeiros ao mesmo tempo. Quando isso acontece, vale juntar a lógica em um lugar só.',
        },
        {
          type: 'quiz',
          question:
            'Qual destes componentes é o melhor candidato para trocar vários `useState` por uma lógica centralizada?',
          options: [
            {
              text: 'Um botão de curtir que alterna entre curtido e não curtido',
              feedback:
                'Um único valor verdadeiro ou falso, que muda de um jeito só. `useState` resolve com uma linha; centralizar aqui só adicionaria cerimônia.',
            },
            {
              text: 'Um formulário de checkout com itens, cupom, frete e etapas que mudam juntos',
              correct: true,
              feedback:
                'Isso. Vários valores dependentes e muitas formas de mudá-los. É exatamente o cenário em que uma função central de transições evita números que não batem.',
            },
            {
              text: 'Um campo de busca que guarda o texto digitado',
              feedback:
                'É um valor só, ligado a um campo. `useState` é a escolha natural. Complexidade vem de **transições** entrelaçadas, não da importância do campo.',
            },
          ],
        },
      ],
    },
    {
      id: 'use-reducer',
      title: 'useReducer: fichas de pedido e uma função que decide',
      blocks: [
        {
          type: 'text',
          text: "Com `useReducer`, o componente deixa de dizer **como** mudar o estado e passa a dizer **o que aconteceu**. Ele envia uma **ação**, um objeto como `{ type: 'adicionar', produto }`. Uma função chamada **reducer** recebe o estado atual e a ação, e devolve o próximo estado.",
        },
        {
          type: 'anatomy',
          caption: 'As peças do useReducer.',
          language: 'jsx',
          parts: [
            { text: 'function ' },
            {
              text: 'filaReducer(estado, acao)',
              label: 'Reducer',
              note: 'Uma função comum, fora do componente. Recebe o estado atual e a ação e devolve o próximo estado. Ela não clica em nada nem busca dados: só calcula.',
            },
            { text: ' {\n  switch (' },
            {
              text: 'acao.type',
              label: 'Tipo da ação',
              note: 'O nome do que aconteceu, escrito como um fato: `chamar`, `adicionar`, `esvaziar`. O `switch` escolhe a regra certa para cada tipo.',
            },
            { text: ") {\n    case 'chamar':\n      " },
            {
              text: 'return { ...estado, senha: estado.senha + 1 };',
              label: 'Próximo estado',
              note: 'Um objeto **novo**. O `...estado` copia o que não mudou e a senha recebe o valor novo. O estado antigo fica intacto.',
            },
            { text: '\n    default:\n      return estado;\n  }\n}\n\nconst [fila, ' },
            {
              text: 'dispatch',
              label: 'Enviar ação',
              note: 'A função que entrega uma ação ao reducer. Depois que ele devolve o novo estado, o React renderiza o componente de novo.',
            },
            { text: '] = useReducer(filaReducer, ' },
            {
              text: '{ senha: 0, guiche: 1 }',
              label: 'Estado inicial',
              note: 'O valor da primeira renderização, como o argumento de `useState`.',
            },
            { text: ');\n\n' },
            {
              text: "dispatch({ type: 'chamar' });",
              label: 'Ação',
              note: 'O componente só conta o que aconteceu. Quem decide o efeito disso no estado é o reducer.',
            },
          ],
        },
        {
          type: 'trace',
          caption:
            'Acompanhe as ações passando pelo reducer, como as senhas chamadas no posto de saúde.',
          code: `function filaReducer(estado, acao) {
  switch (acao.type) {
    case 'chamar':
      return { ...estado, senha: estado.senha + 1 };
    case 'zerar':
      return { ...estado, senha: 0 };
    default:
      return estado;
  }
}
let fila = { senha: 0, guiche: 1 };
fila = filaReducer(fila, { type: 'chamar' });
fila = filaReducer(fila, { type: 'chamar' });
fila = filaReducer(fila, { type: 'zerar' });
console.log(fila.senha, fila.guiche);`,
          steps: [
            {
              line: 11,
              note: 'O estado inicial: nenhuma senha chamada, guichê 1. No React, este é o segundo argumento de `useReducer`.',
              memory: [['fila', '{ senha: 0, guiche: 1 }']],
            },
            {
              line: 2,
              note: 'A primeira ação chega. O `switch` olha o tipo: `chamar`.',
              memory: [
                ['fila', '{ senha: 0, guiche: 1 }'],
                ['acao', "{ type: 'chamar' }"],
              ],
            },
            {
              line: 4,
              note: 'O reducer monta um objeto novo: copia tudo com `...estado` e soma 1 na senha. O guichê veio junto, sem ninguém precisar lembrar dele.',
            },
            {
              line: 12,
              note: 'O resultado vira o estado atual. No React, é aqui que a tela seria renderizada de novo.',
              memory: [['fila', '{ senha: 1, guiche: 1 }']],
            },
            {
              line: 13,
              note: 'Mesma ação, mesma regra, resultado previsível.',
              memory: [['fila', '{ senha: 2, guiche: 1 }']],
            },
            {
              line: 6,
              note: 'A ação `zerar` cai em outro `case`. Se chegasse um tipo desconhecido, o `default` devolveria o estado sem mudança.',
              memory: [
                ['fila', '{ senha: 2, guiche: 1 }'],
                ['acao', "{ type: 'zerar' }"],
              ],
            },
            {
              line: 14,
              note: 'A senha voltou a zero, o guichê continua 1.',
              memory: [['fila', '{ senha: 0, guiche: 1 }']],
            },
            {
              line: 15,
              note: 'Toda a história do estado pode ser recontada a partir da lista de ações. Isso facilita muito depurar.',
              output: '0 1',
            },
          ],
        },
        {
          type: 'playground',
          title: 'Placar do jogo da várzea',
          framework: 'react',
          task: 'Os botões já enviam as ações. Falta o reducer saber tratá-las: crie os casos `ponto_visitante` (soma 1 no visitante) e `zerar` (volta os dois para 0). Clique nos botões e veja o placar mudar.',
          html: '<div id="root"></div>',
          css: `body { font-family: system-ui, sans-serif; margin: 16px; }
.placar { font-size: 1.4rem; }
button { margin-right: 8px; padding: 6px 12px; cursor: pointer; }`,
          js: `const { useReducer } = React;

const inicial = { casa: 0, visitante: 0 };

function placarReducer(estado, acao) {
  switch (acao.type) {
    case 'ponto_casa':
      return { ...estado, casa: estado.casa + 1 };
    // crie aqui os casos 'ponto_visitante' e 'zerar'
    default:
      return estado;
  }
}

function Placar() {
  const [placar, dispatch] = useReducer(placarReducer, inicial);
  return (
    <div>
      <p className="placar">
        Casa <strong id="casa">{placar.casa}</strong> x <strong id="visitante">{placar.visitante}</strong> Visitante
      </p>
      <button onClick={() => dispatch({ type: 'ponto_casa' })}>Ponto Casa</button>
      <button onClick={() => dispatch({ type: 'ponto_visitante' })}>Ponto Visitante</button>
      <button onClick={() => dispatch({ type: 'zerar' })}>Zerar</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Placar />);`,
          checks: [
            {
              label: 'Dois cliques em **Ponto Visitante** somam 2 ao visitante',
              test: verificar(`const visitante = () => numero(document.querySelector('#visitante'));
const b = botao('Ponto Visitante');
if (!b) return false;
const antes = visitante();
b.click();
await esperar(40);
b.click();
await esperar(40);
return visitante() === antes + 2;`),
            },
            {
              label: '**Zerar** volta os dois times para 0',
              test: verificar(`const casa = botao('Ponto Casa');
const zerar = botao('Zerar');
if (!casa || !zerar) return false;
casa.click();
await esperar(40);
if (numero(document.querySelector('#casa')) === 0) return false;
zerar.click();
await esperar(40);
return texto(document.querySelector('#casa')) === '0' && texto(document.querySelector('#visitante')) === '0';`),
            },
            {
              label: '**Ponto Casa** continua funcionando',
              test: verificar(`const casa = () => numero(document.querySelector('#casa'));
const b = botao('Ponto Casa');
if (!b) return false;
const antes = casa();
b.click();
await esperar(40);
return casa() === antes + 1;`),
            },
          ],
          solution: {
            js: `const { useReducer } = React;

const inicial = { casa: 0, visitante: 0 };

function placarReducer(estado, acao) {
  switch (acao.type) {
    case 'ponto_casa':
      return { ...estado, casa: estado.casa + 1 };
    case 'ponto_visitante':
      return { ...estado, visitante: estado.visitante + 1 };
    case 'zerar':
      return inicial;
    default:
      return estado;
  }
}

function Placar() {
  const [placar, dispatch] = useReducer(placarReducer, inicial);
  return (
    <div>
      <p className="placar">
        Casa <strong id="casa">{placar.casa}</strong> x <strong id="visitante">{placar.visitante}</strong> Visitante
      </p>
      <button onClick={() => dispatch({ type: 'ponto_casa' })}>Ponto Casa</button>
      <button onClick={() => dispatch({ type: 'ponto_visitante' })}>Ponto Visitante</button>
      <button onClick={() => dispatch({ type: 'zerar' })}>Zerar</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Placar />);`,
          },
        },
      ],
    },
    {
      id: 'reducer-puro',
      title: 'O reducer é uma função pura',
      blocks: [
        {
          type: 'text',
          text: 'Uma **função pura** sempre devolve o mesmo resultado para as mesmas entradas e não mexe em nada fora dela. Dado o placar 2 x 1 e a ação `ponto_casa`, a resposta é sempre 3 x 1. É essa previsibilidade que torna o reducer fácil de entender e de testar.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns dentro do reducer',
          text: 'Alterar o estado recebido com `estado.itens.push(produto)` ou `estado.total = 10`: o React compara o objeto antigo com o novo, vê que é o mesmo e pode não atualizar a tela. Também não chame `fetch`, `Math.random()`, `Date.now()` ou `localStorage` lá dentro. Busque ou sorteie fora, no evento ou no efeito, e envie o resultado dentro da ação.',
        },
        {
          type: 'classify',
          prompt: 'Cada linha abaixo está dentro de um reducer. Pode ficar lá ou deveria sair?',
          buckets: ['Pode ficar no reducer', 'Deve sair do reducer'],
          items: [
            { text: '`return { ...estado, senha: estado.senha + 1 };`', bucket: 0 },
            { text: '`return estado.filter((item) => item.id !== acao.id);`', bucket: 0 },
            { text: '`return [...estado, acao.produto];`', bucket: 0 },
            { text: '`estado.itens.push(acao.produto); return estado;`', bucket: 1 },
            { text: "`fetch('/api/carrinho', { method: 'POST' });`", bucket: 1 },
            { text: '`return { ...estado, id: Math.random() };`', bucket: 1 },
          ],
          explanation:
            'Copiar e devolver algo novo é seguro. Mutar o estado recebido, conversar com a rede ou sortear valores tornam o resultado imprevisível. Gere o id ou faça a requisição antes e mande o valor pronto na ação.',
        },
        {
          type: 'text',
          text: 'Como o reducer é só uma função, você testa sem renderizar nada: chama com um estado e uma ação e confere o retorno. Na aula de testes você usou o Vitest com a tela; aqui ele fica ainda mais simples.',
        },
        {
          type: 'terminal',
          title: 'Um teste pegando uma mutação',
          task: 'O carrinho às vezes mostra itens “fantasmas”. Rode os testes do reducer e leia a falha.',
          prompt: '~/padaria$',
          steps: [
            {
              goal: 'Rode só os testes do arquivo `carrinhoReducer` com o Vitest.',
              command: [
                'npx vitest run carrinhoReducer',
                'npx vitest run src/carrinho/carrinhoReducer.test.js',
                'npm test -- carrinhoReducer',
              ],
              output: ` RUN  v2.1.8 /home/voce/padaria

 ❯ src/carrinho/carrinhoReducer.test.js (2 tests | 1 failed)
   ✓ adicionar coloca o produto no carrinho
   × adicionar não altera o estado anterior
     → expected [ { id: 1, nome: 'Pão de queijo' } ] to deeply equal []

 Test Files  1 failed (1)
      Tests  1 failed | 1 passed (2)`,
              hint: 'O comando é `npx vitest run` seguido de parte do nome do arquivo.',
            },
            {
              goal: 'O teste diz que o estado antigo ganhou um item. Mostre o conteúdo de `src/carrinho/carrinhoReducer.js` para achar o motivo.',
              command: [
                'cat src/carrinho/carrinhoReducer.js',
                'less src/carrinho/carrinhoReducer.js',
              ],
              output: `export function carrinhoReducer(estado, acao) {
  switch (acao.type) {
    case 'adicionar':
      estado.push(acao.produto);
      return estado;
    default:
      return estado;
  }
}`,
              hint: 'Use `cat` seguido do caminho do arquivo.',
            },
            {
              goal: 'Achou: o `push` altera o array recebido. Você trocou as duas linhas por `return [...estado, acao.produto];` no editor. Rode os testes de novo.',
              command: [
                'npx vitest run carrinhoReducer',
                'npx vitest run src/carrinho/carrinhoReducer.test.js',
                'npm test -- carrinhoReducer',
              ],
              output: ` RUN  v2.1.8 /home/voce/padaria

 ✓ src/carrinho/carrinhoReducer.test.js (2 tests) 3ms

 Test Files  1 passed (1)
      Tests  2 passed (2)`,
              hint: 'O mesmo comando do primeiro passo.',
            },
          ],
        },
      ],
    },
    {
      id: 'context',
      title: 'Context: o fim do telefone sem fio de props',
      blocks: [
        {
          type: 'text',
          text: 'Outro problema, diferente do primeiro: um dado que muitos componentes distantes precisam, como o tema claro ou escuro, ou a pessoa que está logada. Passar esse valor por props de pai para filho, por componentes que nem usam, tem nome: **prop drilling** (perfurar com props).',
        },
        {
          type: 'analogy',
          title: 'Recado de vizinho em vizinho ou aviso no elevador',
          text: 'Para avisar o 8º andar sobre a reunião do condomínio, você pode pedir ao 1º andar que avise o 2º, que avisa o 3º... e torcer para ninguém esquecer. Ou cola um aviso no elevador: quem precisa, lê. O **Context** é esse aviso. Um componente lá em cima publica o valor e qualquer descendente pode lê-lo direto.',
        },
        {
          type: 'codeTabs',
          caption: 'O mesmo tema, antes e depois do Context',
          tabs: [
            {
              label: 'Prop drilling',
              language: 'jsx',
              code: `function App() {
  const [tema, setTema] = useState('claro');
  return <Layout tema={tema} />;
}

function Layout({ tema }) {
  // Layout não usa tema, só repassa
  return <Cabecalho tema={tema} />;
}

function Cabecalho({ tema }) {
  return <BotaoMenu tema={tema} />;
}

function BotaoMenu({ tema }) {
  return <button className={tema}>Menu</button>;
}`,
            },
            {
              label: 'Com Context',
              language: 'jsx',
              code: `const TemaContext = createContext('claro');

function App() {
  const [tema, setTema] = useState('claro');
  return (
    <TemaContext.Provider value={tema}>
      <Layout />
    </TemaContext.Provider>
  );
}

function Layout() {
  return <Cabecalho />;
}

function Cabecalho() {
  return <BotaoMenu />;
}

function BotaoMenu() {
  const tema = useContext(TemaContext);
  return <button className={tema}>Menu</button>;
}`,
            },
          ],
        },
        {
          type: 'terms',
          items: [
            {
              term: 'createContext',
              text: 'Cria o “quadro de avisos”. O argumento é o valor padrão, usado quando não existe nenhum Provider acima.',
            },
            {
              term: 'Provider',
              text: 'O componente que publica o valor com a prop `value`. Tudo o que estiver dentro dele, em qualquer profundidade, pode ler.',
            },
            {
              term: 'useContext',
              text: 'O hook que lê o valor do Provider mais próximo acima. Quando o `value` muda, quem usa `useContext` renderiza de novo.',
            },
          ],
        },
        {
          type: 'fill',
          prompt: 'Complete para que `Avatar` leia a pessoa logada sem receber props.',
          language: 'jsx',
          template: `const UsuarioContext = [[createContext|React.createContext]](null);

function App() {
  const usuario = { nome: 'Dandara' };
  return (
    <UsuarioContext.[[Provider]] value={usuario}>
      <Pagina />
    </UsuarioContext.Provider>
  );
}

function Avatar() {
  const usuario = [[useContext|React.useContext]](UsuarioContext);
  return <span>Olá, {usuario.nome}</span>;
}`,
          explanation:
            '`createContext` cria, o `Provider` publica com `value` e `useContext` lê. `Pagina` e quem estiver entre ela e o `Avatar` não precisam saber que o usuário existe.',
        },
        {
          type: 'quiz',
          question:
            'O `BotaoMenu` usa `useContext(TemaContext)`, mas está fora de qualquer `TemaContext.Provider`. O que ele recebe?',
          options: [
            {
              text: 'O valor padrão passado para `createContext`',
              correct: true,
              feedback:
                'Isso. Sem Provider acima, vale o valor padrão. É uma fonte comum de bug: o componente “funciona”, mas nunca vê as mudanças, porque o Provider foi colocado no lugar errado da árvore.',
            },
            {
              text: 'Um erro que impede a página de abrir',
              feedback:
                'O React não reclama: ele usa o valor padrão em silêncio. Por isso vale conferir onde o Provider está quando o valor parece “travado”.',
            },
            {
              text: 'O valor do Provider mais próximo em qualquer lugar da página',
              feedback:
                'O Context só desce pela árvore. Um Provider num componente vizinho, que não é ancestral, não alcança o `BotaoMenu`.',
            },
          ],
        },
      ],
    },
    {
      id: 'quando-nao-usar',
      title: 'Quando o Context não é a resposta',
      blocks: [
        {
          type: 'text',
          text: 'Context resolve distância, não complexidade. E tem um custo: todo componente que lê um contexto renderiza de novo quando o valor muda. Um contexto gigante, com tudo do app, faz a página inteira se mexer a cada tecla digitada.',
        },
        {
          type: 'list',
          items: [
            '**Prefira estado local.** Se só um componente usa o valor, ele fica nesse componente.',
            '**Tente props primeiro.** Passar por dois ou três níveis é normal e deixa claro de onde o dado vem.',
            '**Considere `children`.** Às vezes o componente do meio pode receber o filho já pronto, e a prop deixa de atravessá-lo.',
            '**Separe dados do servidor.** Lista de produtos vinda da API é cópia de algo que vive no backend; ela pede carregamento, erro e atualização. Guarde no componente que busca ou use uma biblioteca feita para isso, não um contexto genérico.',
          ],
        },
        {
          type: 'classify',
          prompt: 'Onde cada estado deveria morar?',
          buckets: ['Estado local', 'Context', 'Dados do servidor'],
          items: [
            { text: 'Se o menu sanfona está aberto', bucket: 0 },
            { text: 'Texto digitado no campo de busca', bucket: 0 },
            { text: 'Tema claro ou escuro escolhido', bucket: 1 },
            { text: 'Pessoa logada e idioma da interface', bucket: 1 },
            { text: 'Lista de produtos retornada pela API', bucket: 2 },
            { text: 'Histórico de pedidos da conta', bucket: 2 },
          ],
          explanation:
            'Local é o padrão. Context é para o que muitos componentes distantes precisam e muda pouco. Dados do servidor têm ciclo próprio (buscar, carregar, falhar, atualizar) e merecem tratamento separado do estado da interface.',
        },
        {
          type: 'quiz',
          question:
            'Uma colega colocou tudo do app num único `AppContext`: tema, usuário, carrinho e o texto da busca. O que tende a acontecer?',
          options: [
            {
              text: 'Nada de especial: Context foi feito para guardar o estado do app inteiro',
              feedback:
                'É uma crença comum, mas Context é um meio de **entregar** valores, não um banco de estado. Misturar tudo acopla partes que não têm relação.',
            },
            {
              text: 'Cada letra digitada na busca renderiza de novo todos os componentes que leem o contexto',
              correct: true,
              feedback:
                'Exato. O `value` muda a cada tecla e todos os leitores reagem, mesmo os que só queriam o tema. Separar em contextos menores, ou manter a busca local, resolve.',
            },
            {
              text: 'A busca para de funcionar, porque Context só aceita valores que não mudam',
              feedback:
                'Context aceita valores que mudam, como o tema alternando. O problema não é funcionar, é renderizar mais do que o necessário.',
            },
          ],
        },
      ],
    },
    {
      id: 'carrinho',
      title: 'Juntando os dois: um carrinho de compras',
      blocks: [
        {
          type: 'text',
          text: 'Agora os dois problemas aparecem juntos. O carrinho tem transições complexas (reducer) e precisa ser lido em lugares distantes (Context). A combinação é comum: o Provider guarda o `useReducer` e publica o estado e o `dispatch`.',
        },
        {
          type: 'flow',
          caption: 'Um clique em “Adicionar” atravessando o carrinho',
          actors: ['Vitrine', 'Reducer', 'Provider', 'Cabeçalho'],
          steps: [
            {
              from: 0,
              to: 1,
              label: "dispatch({ type: 'adicionar' })",
              text: 'A vitrine pega o `dispatch` do contexto e envia a ação com o produto. Ela não sabe como o carrinho é guardado.',
            },
            {
              from: 1,
              to: 2,
              label: 'Novo array de itens',
              text: 'O reducer calcula o próximo estado: uma cópia com o produto a mais.',
              tone: 'ok',
            },
            {
              from: 2,
              to: 3,
              label: 'value muda',
              text: 'O Provider publica o novo estado. Quem lê o contexto renderiza de novo.',
            },
            {
              from: 3,
              to: 3,
              label: 'Mostra 1 item',
              text: 'O cabeçalho, do outro lado da página, mostra a quantidade e o total atualizados sem nenhuma prop.',
              tone: 'ok',
            },
          ],
        },
        {
          type: 'playground',
          title: 'O carrinho da padaria',
          framework: 'react',
          task: 'A vitrine já adiciona produtos, mas o cabeçalho mostra números fixos. No `Cabecalho`, leia `itens` e `dispatch` com `useContext`, mostre a quantidade em `#contador` e a soma dos preços em `#total`. Depois crie a ação `esvaziar` no reducer e ligue o botão **Esvaziar**.',
          html: '<div id="root"></div>',
          css: `body { font-family: system-ui, sans-serif; margin: 16px; }
header { display: flex; gap: 8px; align-items: center; padding: 8px; background: #fef3c7; border-radius: 8px; }
li { margin: 6px 0; }
button { margin-left: 8px; padding: 4px 10px; cursor: pointer; }`,
          js: `const { createContext, useContext, useReducer } = React;

const produtos = [
  { id: 1, nome: 'Pão de queijo', preco: 6 },
  { id: 2, nome: 'Café coado', preco: 5 },
  { id: 3, nome: 'Bolo de fubá', preco: 8 },
];

function carrinhoReducer(estado, acao) {
  switch (acao.type) {
    case 'adicionar':
      return [...estado, acao.produto];
    // crie o caso 'esvaziar'
    default:
      return estado;
  }
}

const CarrinhoContext = createContext(null);

function CarrinhoProvider({ children }) {
  const [itens, dispatch] = useReducer(carrinhoReducer, []);
  return (
    <CarrinhoContext.Provider value={{ itens, dispatch }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

function Cabecalho() {
  // leia o carrinho do contexto aqui
  return (
    <header>
      <span>Carrinho: <strong id="contador">0</strong> itens</span>
      <span>Total: <strong id="total">R$ 0</strong></span>
      <button>Esvaziar</button>
    </header>
  );
}

function Vitrine() {
  const { dispatch } = useContext(CarrinhoContext);
  return (
    <ul>
      {produtos.map((p) => (
        <li key={p.id}>
          {p.nome} (R$ {p.preco})
          <button onClick={() => dispatch({ type: 'adicionar', produto: p })}>Adicionar {p.nome}</button>
        </li>
      ))}
    </ul>
  );
}

function App() {
  return (
    <CarrinhoProvider>
      <Cabecalho />
      <Vitrine />
    </CarrinhoProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
          checks: [
            {
              label: 'Adicionar dois produtos faz `#contador` subir 2',
              test: verificar(`const contador = () => numero(document.querySelector('#contador'));
const pao = botao('Adicionar Pão de queijo');
const cafe = botao('Adicionar Café coado');
if (!pao || !cafe) return false;
const antes = contador();
pao.click();
await esperar(40);
cafe.click();
await esperar(40);
return contador() === antes + 2;`),
            },
            {
              label: 'Adicionar um bolo de fubá soma R$ 8 em `#total`',
              test: verificar(`const total = () => numero(document.querySelector('#total'));
const bolo = botao('Adicionar Bolo de fubá');
if (!bolo) return false;
const antes = total();
bolo.click();
await esperar(40);
return Math.abs(total() - (antes + 8)) < 0.01;`),
            },
            {
              label: '**Esvaziar** zera a quantidade e o total',
              test: verificar(`const pao = botao('Adicionar Pão de queijo');
const esvaziar = botao('Esvaziar');
if (!pao || !esvaziar) return false;
pao.click();
await esperar(40);
if (numero(document.querySelector('#contador')) === 0) return false;
esvaziar.click();
await esperar(40);
return numero(document.querySelector('#contador')) === 0 && numero(document.querySelector('#total')) === 0;`),
            },
          ],
          solution: {
            js: `const { createContext, useContext, useReducer } = React;

const produtos = [
  { id: 1, nome: 'Pão de queijo', preco: 6 },
  { id: 2, nome: 'Café coado', preco: 5 },
  { id: 3, nome: 'Bolo de fubá', preco: 8 },
];

function carrinhoReducer(estado, acao) {
  switch (acao.type) {
    case 'adicionar':
      return [...estado, acao.produto];
    case 'esvaziar':
      return [];
    default:
      return estado;
  }
}

const CarrinhoContext = createContext(null);

function CarrinhoProvider({ children }) {
  const [itens, dispatch] = useReducer(carrinhoReducer, []);
  return (
    <CarrinhoContext.Provider value={{ itens, dispatch }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

function Cabecalho() {
  const { itens, dispatch } = useContext(CarrinhoContext);
  const total = itens.reduce((soma, item) => soma + item.preco, 0);
  return (
    <header>
      <span>Carrinho: <strong id="contador">{itens.length}</strong> itens</span>
      <span>Total: <strong id="total">R$ {total}</strong></span>
      <button onClick={() => dispatch({ type: 'esvaziar' })}>Esvaziar</button>
    </header>
  );
}

function Vitrine() {
  const { dispatch } = useContext(CarrinhoContext);
  return (
    <ul>
      {produtos.map((p) => (
        <li key={p.id}>
          {p.nome} (R$ {p.preco})
          <button onClick={() => dispatch({ type: 'adicionar', produto: p })}>Adicionar {p.nome}</button>
        </li>
      ))}
    </ul>
  );
}

function App() {
  return (
    <CarrinhoProvider>
      <Cabecalho />
      <Vitrine />
    </CarrinhoProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
          },
        },
        {
          type: 'reveal',
          question:
            'No carrinho, o total não ficou guardado no estado: ele é calculado a partir dos itens a cada renderização. Por que isso é melhor do que ter um `total` no reducer?',
          answer:
            'Porque um valor que pode ser calculado a partir de outro nunca fica desatualizado. Se o total estivesse no estado, cada ação teria que lembrar de recalculá-lo, e um esquecimento faria a soma mentir. Guarde o mínimo e derive o resto.',
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem o caminho de uma ação até a tela.',
          items: [
            'A pessoa clica em um botão',
            'O componente chama `dispatch` com uma ação',
            'O reducer recebe o estado atual e a ação',
            'O reducer devolve um novo estado',
            'O Provider publica o novo valor no contexto',
            'Os componentes que leem o contexto renderizam de novo',
          ],
          explanation:
            'Quando algo der errado, percorra esse caminho: a ação saiu? O reducer tratou o tipo? Devolveu um objeto novo? O componente está dentro do Provider?',
        },
      ],
    },
  ],
  recap: [
    'Use `useReducer` quando vários valores mudam juntos: o componente envia **ações** e o reducer decide o próximo estado.',
    'O reducer é uma **função pura**: não muta o estado recebido, não busca dados e não sorteia valores, o que o torna fácil de testar.',
    '**Context** entrega um valor a componentes distantes sem prop drilling: `createContext`, `Provider` com `value` e `useContext`.',
    'Estado local continua sendo o padrão; dados do servidor merecem tratamento próprio e contextos gigantes renderizam demais.',
    'Reducer dentro de um Provider é a combinação clássica para estados como o carrinho de compras.',
  ],
  cards: [
    {
      id: 'quando-reducer',
      front: 'Quando vale trocar vários `useState` por `useReducer`?',
      back: 'Quando valores dependem uns dos outros e há muitas formas de mudá-los, como num carrinho ou formulário em etapas.',
    },
    {
      id: 'o-que-e-acao',
      front: 'O que é uma ação no `useReducer`?',
      back: 'Um objeto que descreve o que aconteceu, com um `type` e dados extras, enviado com `dispatch`.',
    },
    {
      id: 'reducer-puro',
      front: 'O que um reducer nunca deve fazer?',
      back: 'Mutar o estado recebido, fazer requisições ou usar valores aleatórios. Ele só calcula e devolve um estado novo.',
    },
    {
      id: 'prop-drilling',
      front: 'O que é prop drilling?',
      back: 'Passar uma prop por vários componentes que não a usam, só para ela chegar a um descendente distante.',
    },
    {
      id: 'sem-provider',
      front: 'O que `useContext` devolve se não houver Provider acima?',
      back: 'O valor padrão passado para `createContext`.',
    },
    {
      id: 'custo-context',
      front: 'Qual o custo de colocar muita coisa num único contexto?',
      back: 'Todos os componentes que o leem renderizam de novo sempre que qualquer parte do valor muda.',
    },
  ],
  mission: {
    title: 'Monte o carrinho do seu projeto',
    text: 'Leve o carrinho para o projeto React que você vem construindo e documente as decisões. Explicar onde cada estado mora é tão importante quanto o código.',
    steps: [
      'Escreva um `carrinhoReducer` com as ações adicionar, remover, mudar quantidade e esvaziar',
      'Escreva testes do reducer com Vitest, incluindo um que garanta que o estado anterior não é alterado',
      'Crie um `CarrinhoProvider` com o reducer e mostre a quantidade de itens no cabeçalho usando `useContext`',
      'Liste no README cada estado da aplicação e explique por que ele é local, compartilhado ou dado do servidor',
    ],
  },
  sources: [
    {
      title: 'React: Extraindo a lógica de estado em um reducer',
      url: 'https://pt-br.react.dev/learn/extracting-state-logic-into-a-reducer',
    },
    {
      title: 'React: Passando dados profundamente com Context',
      url: 'https://pt-br.react.dev/learn/passing-data-deeply-with-context',
    },
    {
      title: 'React: Escalando com Reducer e Context',
      url: 'https://pt-br.react.dev/learn/scaling-up-with-reducer-and-context',
    },
  ],
};
