import { LessonContent } from '../types';

const verificar = (corpo: string) => `const anterior = window.__fila || Promise.resolve();
let liberar;
window.__fila = new Promise((r) => (liberar = r));
await anterior;
await new Promise((r) => setTimeout(r, 300));
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
const texto = (el) => (el?.textContent || '').replace(/\\s+/g, ' ').trim();
const botao = (rotulo) => [...document.querySelectorAll('button')].find((b) => texto(b) === rotulo);
const link = (rotulo) => [...document.querySelectorAll('a')].find((a) => texto(a) === rotulo);
const tique = () => new Promise((r) => {
  const canal = new MessageChannel();
  canal.port1.onmessage = () => r();
  canal.port2.postMessage(null);
});
const ate = async (condicao, limite = 3500) => {
  const fim = performance.now() + limite;
  while (performance.now() < fim) {
    if (condicao()) return true;
    await esperar(50);
  }
  return !!condicao();
};
try {
${corpo}
} finally {
  liberar();
}`;

export const content: LessonContent = {
  hook: 'No app do banco, você vai do extrato para a área Pix e volta, e a tela troca sem aquela piscada de página nova. Você pode mandar o link de um produto para alguém no grupo da família e a pessoa cai direto nele. E, quando a internet do ônibus oscila, um app bem-feito mostra “carregando” e “tente de novo” em vez de ficar em branco. Nesta aula você junta rotas e dados do servidor, o par que transforma componentes soltos numa aplicação.',
  sections: [
    {
      id: 'spa-e-rotas',
      title: 'Uma aplicação, várias telas',
      blocks: [
        {
          type: 'text',
          text: 'Num site tradicional, cada clique num link pede uma página HTML nova ao servidor, e o navegador joga fora a anterior. Uma **SPA** (sigla em inglês para aplicação de página única) carrega uma vez só e, a partir daí, o próprio JavaScript troca os componentes na tela quando a URL muda.',
        },
        {
          type: 'analogy',
          title: 'O shopping e a rua de lojas',
          text: 'Numa rua de lojas, para ir de uma loja à outra você sai na calçada, anda e entra de novo. Num shopping, você só troca de corredor: o ar-condicionado, o estacionamento e a sacola continuam com você. A SPA é o shopping: a página fica, só a “loja” da vez muda, e o estado da aplicação não se perde.',
        },
        {
          type: 'text',
          text: 'Quem decide qual componente aparecer para cada endereço é o **roteador**. Ele faz duas coisas: lê a URL atual e escolhe a tela, e intercepta os cliques nos links para trocar a URL sem recarregar. A URL continua importante: é ela que permite favoritar, compartilhar e usar o botão voltar.',
        },
        {
          type: 'flow',
          caption: 'O que acontece ao clicar num link dentro de uma SPA',
          actors: ['Pessoa', 'Roteador', 'Componentes', 'Servidor'],
          steps: [
            {
              from: 0,
              to: 1,
              label: 'Clica em “Camiseta”',
              text: 'O link aponta para `/produtos/2`. O roteador intercepta o clique antes de o navegador pedir uma página nova.',
            },
            {
              from: 1,
              to: 1,
              label: 'Troca a URL',
              text: 'Ele muda o endereço com a History API do navegador. A barra mostra `/produtos/2` e o botão voltar passa a funcionar, sem recarregar nada.',
            },
            {
              from: 1,
              to: 2,
              label: 'Mostra DetalheProduto',
              text: 'O roteador compara a URL com as rotas declaradas e renderiza o componente da rota `/produtos/:id`, entregando `id = 2`.',
              tone: 'ok',
            },
            {
              from: 2,
              to: 3,
              label: 'GET /api/produtos/2',
              text: 'O HTML não é pedido de novo. Só os **dados** do produto vão e voltam, normalmente em JSON.',
            },
            {
              from: 3,
              to: 2,
              label: '200 + JSON',
              text: 'Com os dados, o componente sai do “carregando” e mostra o produto.',
              tone: 'ok',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Numa SPA, você está em `/produtos/2` e aperta F5. A página mostra “Cannot GET /produtos/2” só no servidor de produção. O que provavelmente aconteceu?',
          options: [
            {
              text: 'O servidor procurou um arquivo chamado `/produtos/2` em vez de devolver o `index.html` da SPA para qualquer caminho',
              correct: true,
              feedback:
                'Isso. Ao recarregar, quem recebe o pedido é o servidor, não o roteador. Ele precisa ser configurado para devolver o `index.html` em qualquer rota, e aí o roteador do React assume.',
            },
            {
              text: 'O React Router apagou a rota ao recarregar',
              feedback:
                'As rotas estão no código e são lidas de novo a cada carregamento. O problema é anterior: o JavaScript nem chegou ao navegador.',
            },
            {
              text: 'Links de SPA não podem ser abertos diretamente',
              feedback:
                'Podem e devem: abrir um link compartilhado é uma das grandes vantagens de ter rotas. Só exige o servidor configurado.',
            },
          ],
        },
      ],
    },
    {
      id: 'react-router',
      title: 'Rotas com React Router',
      blocks: [
        {
          type: 'text',
          text: 'O React não vem com roteador. A biblioteca mais usada é o **React Router**. Nas versões atuais ela é instalada com o nome `react-router`; em projetos mais antigos você vai ver `react-router-dom`, com os mesmos componentes.',
        },
        {
          type: 'terminal',
          title: 'Instalando o roteador num projeto Vite',
          task: 'Você está na pasta de um projeto React criado com Vite. Instale o roteador e suba o servidor de desenvolvimento.',
          prompt: '~/catalogo$',
          steps: [
            {
              goal: 'Instale o pacote do React Router com o npm',
              command: ['npm install react-router', 'npm i react-router'],
              output:
                '\nadded 3 packages, and audited 215 packages in 2s\n\nfound 0 vulnerabilities',
              hint: 'O comando é `npm install` seguido do nome do pacote.',
            },
            {
              goal: 'Confira que ele entrou nas dependências do `package.json`',
              command: ['grep react-router package.json', 'cat package.json'],
              output: '    "react-router": "^7.9.1",',
              hint: 'Use `grep react-router package.json` para achar a linha.',
            },
            {
              goal: 'Rode o servidor de desenvolvimento',
              command: 'npm run dev',
              output:
                '\n  VITE v6.3.5  ready in 412 ms\n\n  ➜  Local:   http://localhost:5173/\n  ➜  press h + enter to show help',
              hint: 'O script de desenvolvimento do Vite se chama `dev`.',
            },
          ],
        },
        {
          type: 'codeTabs',
          caption: 'As três peças: declarar rotas, criar links e ler parâmetros',
          tabs: [
            {
              label: 'main.jsx',
              language: 'jsx',
              code: `import { BrowserRouter, Routes, Route } from 'react-router';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/produtos/:id" element={<DetalheProduto />} />
      <Route path="*" element={<NaoEncontrada />} />
    </Routes>
  </BrowserRouter>
);`,
            },
            {
              label: 'Menu.jsx',
              language: 'jsx',
              code: `import { Link } from 'react-router';

function Menu() {
  return (
    <nav>
      <Link to="/">Início</Link>
      <Link to="/produtos/2">Camiseta</Link>
    </nav>
  );
}`,
            },
            {
              label: 'DetalheProduto.jsx',
              language: 'jsx',
              code: `import { useParams } from 'react-router';

function DetalheProduto() {
  const { id } = useParams(); // em /produtos/2, id vale "2"
  return <h1>Produto {id}</h1>;
}`,
            },
          ],
        },
        {
          type: 'anatomy',
          caption: 'Uma rota com parâmetro.',
          language: 'jsx',
          parts: [
            { text: '<Route path="' },
            {
              text: '/produtos/',
              label: 'Parte fixa',
              note: 'Precisa aparecer igualzinha na URL para a rota combinar.',
            },
            {
              text: ':id',
              label: 'Parâmetro',
              note: 'Os dois-pontos dizem “aqui vale qualquer valor”. Em `/produtos/42`, `useParams()` devolve `{ id: "42" }`. Repare que vem como **texto**: converta com `Number(id)` se for comparar com números.',
            },
            { text: '" ' },
            {
              text: 'element={<DetalheProduto />}',
              label: 'O que mostrar',
              note: 'O componente renderizado quando a rota combina. Ele lê o parâmetro com `useParams`.',
            },
            { text: ' />\n<Route ' },
            {
              text: 'path="*"',
              label: 'Qualquer outra',
              note: 'O asterisco combina com qualquer caminho que nenhuma outra rota pegou. É onde fica a página de não encontrado.',
            },
            { text: ' element={<NaoEncontrada />} />' },
          ],
        },
        {
          type: 'quiz',
          question:
            'Dentro da SPA, um colega usou `<a href="/produtos/2">` em vez de `<Link to="/produtos/2">`. O link funciona, mas o que se perde?',
          options: [
            {
              text: 'A página recarrega inteira: o navegador pede tudo de novo ao servidor e o estado da aplicação, como o carrinho em memória, é perdido',
              correct: true,
              feedback:
                'Isso. O `<a>` comum faz uma navegação de verdade. O `Link` renderiza um `<a>` também, mas intercepta o clique e só troca a URL e os componentes.',
            },
            {
              text: 'O endereço não muda na barra do navegador',
              feedback:
                'Muda sim, e a página até abre. O problema é que ela é baixada e montada do zero.',
            },
            {
              text: 'Nada: `<a>` e `Link` são exatamente iguais',
              feedback:
                'Na tela parecem iguais, porque o `Link` gera um `<a>`. A diferença está no clique: o `Link` evita o recarregamento.',
            },
          ],
        },
        {
          type: 'fill',
          prompt: 'Complete a rota de detalhe de pedido e o componente que lê o número do pedido.',
          language: 'jsx',
          template: `<Route path="/pedidos/[[:numero]]" element={<Pedido />} />

function Pedido() {
  const { numero } = [[useParams]]();
  return <h1>Pedido {numero}</h1>;
}`,
          explanation:
            'O nome depois dos dois-pontos é o nome da chave no objeto que `useParams` devolve. Se a rota diz `:numero`, você lê `numero`.',
        },
      ],
    },
    {
      id: 'mini-roteador',
      title: 'Construa um mini roteador',
      blocks: [
        {
          type: 'text',
          text: 'O React Router não roda nos exercícios desta página, mas a ideia dele cabe em poucas linhas, e construir a sua versão é o melhor jeito de entender. O caminho atual vira um **estado**; o `Link` muda esse estado no clique; e uma função escolhe a tela comparando o caminho com padrões. O React Router tem até um modo assim, o `MemoryRouter`, usado em testes.',
        },
        {
          type: 'playground',
          title: 'Catálogo com rotas',
          framework: 'react',
          task: 'Complete o roteador. Para caminhos como `/produtos/2`, mostre `DetalheProduto` com um `<h1>` com o nome, o preço e um `Link` **Voltar** para `/`. Para qualquer outro caminho, inclusive um id que não existe, mostre **Página não encontrada**. Dica: `caminho.match(/^\\/produtos\\/(\\d+)$/)` devolve o id na posição 1.',
          html: '<div id="root"></div>',
          css: `body { font-family: system-ui, sans-serif; margin: 16px; }
nav { display: flex; gap: 12px; }
.endereco { font-family: monospace; background: #f1f5f9; padding: 4px 8px; display: inline-block; }
a { color: #1d4ed8; }`,
          js: `const { useState } = React;

const produtos = [
  { id: 1, nome: 'Caneca', preco: 39 },
  { id: 2, nome: 'Camiseta', preco: 59 },
  { id: 3, nome: 'Boné', preco: 45 },
];

function Link({ para, navegar, children }) {
  return (
    <a
      href={'#' + para}
      onClick={(evento) => {
        evento.preventDefault();
        navegar(para);
      }}
    >
      {children}
    </a>
  );
}

function Inicio({ navegar }) {
  return (
    <>
      <h1>Produtos</h1>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>
            <Link para={'/produtos/' + produto.id} navegar={navegar}>{produto.nome}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

// TODO 1: crie DetalheProduto({ id, navegar }) com <h1> do nome,
// o preço e <Link para="/" navegar={navegar}>Voltar</Link>

// TODO 2: crie NaoEncontrada, com o texto "Página não encontrada"

function App() {
  const [caminho, setCaminho] = useState('/');

  function telaAtual() {
    if (caminho === '/') return <Inicio navegar={setCaminho} />;
    // TODO 3: se o caminho for /produtos/<número>, mostre DetalheProduto
    // TODO 4: para qualquer outro caminho, mostre NaoEncontrada
    return null;
  }

  return (
    <div>
      <nav>
        <Link para="/" navegar={setCaminho}>Início</Link>
        <Link para="/sobre" navegar={setCaminho}>Sobre</Link>
      </nav>
      <p className="endereco">{caminho}</p>
      {telaAtual()}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
          checks: [
            {
              label: 'Clicar em **Camiseta** abre a tela de detalhe com o nome e o preço',
              test: verificar(`if (link('Início')) {
  link('Início').click();
  await esperar(60);
}
const camiseta = link('Camiseta');
if (!camiseta) return false;
camiseta.click();
await esperar(80);
const titulo = document.querySelector('h1');
return texto(titulo) === 'Camiseta' && texto(document.querySelector('#root')).includes('59');`),
            },
            {
              label: '**Voltar** leva de volta para a lista de produtos',
              test: verificar(`if (!link('Voltar')) {
  const caneca = link('Caneca');
  if (!caneca) return false;
  caneca.click();
  await esperar(80);
}
const voltar = link('Voltar');
if (!voltar) return false;
voltar.click();
await esperar(80);
return texto(document.querySelector('h1')) === 'Produtos';`),
            },
            {
              label: 'Um caminho que não existe mostra **Página não encontrada**',
              test: verificar(`const sobre = link('Sobre');
if (!sobre) return false;
sobre.click();
await esperar(80);
const achou = /página não encontrada/i.test(texto(document.querySelector('#root')));
if (link('Início')) link('Início').click();
await esperar(60);
return achou;`),
            },
          ],
          solution: {
            js: `const { useState } = React;

const produtos = [
  { id: 1, nome: 'Caneca', preco: 39 },
  { id: 2, nome: 'Camiseta', preco: 59 },
  { id: 3, nome: 'Boné', preco: 45 },
];

function Link({ para, navegar, children }) {
  return (
    <a
      href={'#' + para}
      onClick={(evento) => {
        evento.preventDefault();
        navegar(para);
      }}
    >
      {children}
    </a>
  );
}

function Inicio({ navegar }) {
  return (
    <>
      <h1>Produtos</h1>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>
            <Link para={'/produtos/' + produto.id} navegar={navegar}>{produto.nome}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function NaoEncontrada() {
  return <h1>Página não encontrada</h1>;
}

function DetalheProduto({ id, navegar }) {
  const produto = produtos.find((p) => p.id === id);
  if (!produto) return <NaoEncontrada />;
  return (
    <>
      <h1>{produto.nome}</h1>
      <p>R$ {produto.preco}</p>
      <Link para="/" navegar={navegar}>Voltar</Link>
    </>
  );
}

function App() {
  const [caminho, setCaminho] = useState('/');

  function telaAtual() {
    if (caminho === '/') return <Inicio navegar={setCaminho} />;
    const achou = caminho.match(/^\\/produtos\\/(\\d+)$/);
    if (achou) return <DetalheProduto id={Number(achou[1])} navegar={setCaminho} />;
    return <NaoEncontrada />;
  }

  return (
    <div>
      <nav>
        <Link para="/" navegar={setCaminho}>Início</Link>
        <Link para="/sobre" navegar={setCaminho}>Sobre</Link>
      </nav>
      <p className="endereco">{caminho}</p>
      {telaAtual()}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
          },
          height: 260,
        },
        {
          type: 'reveal',
          question:
            'No mini roteador, o caminho mora só num estado. O que ele ainda não faz que o React Router com `BrowserRouter` faz?',
          answer:
            'Ele não muda a barra de endereço do navegador, então não dá para favoritar, compartilhar o link nem usar o botão voltar. O `BrowserRouter` guarda o caminho na própria URL com a History API (`history.pushState`) e escuta o evento `popstate` para reagir ao voltar e avançar. A lógica de combinar caminhos com padrões é a mesma que você escreveu.',
        },
      ],
    },
    {
      id: 'dados-no-efeito',
      title: 'Buscar dados quando a tela abre',
      blocks: [
        {
          type: 'text',
          text: 'Na aula de JavaScript assíncrono você viu os quatro estados de uma tela com dados: carregando, sucesso, vazio e erro. Em React eles viram **estados do componente**, e a busca vira um **efeito**: abrir a tela de detalhe é “sincronizar a tela com o servidor para este id”.',
        },
        {
          type: 'code',
          language: 'jsx',
          caption: 'O formato básico: um efeito que depende do id e três estados',
          code: `function DetalheProduto() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    setCarregando(true);
    setErro(null);
    buscarProduto(id)
      .then((dados) => setProduto(dados))
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false));
  }, [id]);

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p role="alert">{erro}</p>;
  return <h1>{produto.nome}</h1>;
}`,
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Por que uma API falsa nos exercícios',
          text: 'Os exercícios desta página não acessam a internet com confiança, então você vai usar uma função que devolve uma Promise e responde depois de um `setTimeout`, como um servidor lento. Para o componente, não faz diferença: trocar pela `fetch` de verdade é mudar uma linha.',
        },
        {
          type: 'playground',
          title: 'Pedidos por cliente',
          framework: 'react',
          task: 'Crie os estados `carregando` e `erro`. No efeito, ligue o carregando antes de buscar, trate a falha com `.catch` e desligue o carregando no `.finally`. Na tela, mostre **Carregando...** durante a busca; o erro num elemento com `role="alert"`, sem a lista; e **Nenhum pedido ainda.** quando a lista vier vazia.',
          html: '<div id="root"></div>',
          css: `body { font-family: system-ui, sans-serif; margin: 16px; }
button { margin-right: 6px; padding: 4px 12px; cursor: pointer; }
[role="alert"] { color: #991b1b; background: #fee2e2; padding: 8px; border-radius: 6px; }`,
          js: `const { useState, useEffect } = React;

const banco = {
  Ana: ['Pão francês', 'Café'],
  Bruno: ['Coxinha', 'Suco de laranja', 'Pudim'],
  Carla: [],
};

// Uma API falsa: responde em 400 ms e falha para clientes desconhecidos.
function buscarPedidos(cliente) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (cliente in banco) resolve(banco[cliente]);
      else reject(new Error('Servidor fora do ar. Tente de novo.'));
    }, 400);
  });
}

function Pedidos() {
  const [cliente, setCliente] = useState('Ana');
  const [pedidos, setPedidos] = useState([]);
  // TODO 1: crie os estados carregando e erro

  useEffect(() => {
    // TODO 2: antes de buscar, ligue o carregando e limpe o erro
    buscarPedidos(cliente).then((lista) => {
      setPedidos(lista);
    });
    // TODO 3: trate a falha com .catch e desligue o carregando com .finally
  }, [cliente]);

  return (
    <div>
      {['Ana', 'Bruno', 'Carla', 'Davi'].map((nome) => (
        <button key={nome} onClick={() => setCliente(nome)}>{nome}</button>
      ))}
      <h2>Pedidos de {cliente}</h2>
      {/* TODO 4: Carregando..., erro com role="alert" ou Nenhum pedido ainda. */}
      <ul id="pedidos">
        {pedidos.map((pedido) => <li key={pedido}>{pedido}</li>)}
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Pedidos />);`,
          checks: [
            {
              label: 'Enquanto espera, aparece **Carregando**; depois, os 3 pedidos de Bruno',
              test: verificar(`const bruno = botao('Bruno');
if (!bruno) return false;
bruno.click();
await tique();
const durante = await ate(() => /carregando/i.test(texto(document.querySelector('#root'))), 1000);
const chegou = await ate(() => document.querySelectorAll('#pedidos li').length === 3 && !/carregando/i.test(texto(document.querySelector('#root'))));
return durante && chegou;`),
            },
            {
              label: 'Carla, sem pedidos, vê **Nenhum pedido ainda.**',
              test: verificar(`const carla = botao('Carla');
if (!carla) return false;
carla.click();
return await ate(() => /nenhum pedido ainda/i.test(texto(document.querySelector('#root'))) && document.querySelectorAll('#pedidos li').length === 0);`),
            },
            {
              label:
                'Se o servidor falha, aparece um aviso com `role="alert"` e a lista antiga some',
              test: verificar(`const ana = botao('Ana');
const davi = botao('Davi');
if (!ana || !davi) return false;
ana.click();
if (!(await ate(() => document.querySelectorAll('#pedidos li').length === 2))) return false;
davi.click();
return await ate(() => {
  const aviso = document.querySelector('[role="alert"]');
  return !!aviso && /fora do ar/i.test(texto(aviso)) && document.querySelectorAll('#pedidos li').length === 0;
});`),
            },
          ],
          solution: {
            js: `const { useState, useEffect } = React;

const banco = {
  Ana: ['Pão francês', 'Café'],
  Bruno: ['Coxinha', 'Suco de laranja', 'Pudim'],
  Carla: [],
};

function buscarPedidos(cliente) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (cliente in banco) resolve(banco[cliente]);
      else reject(new Error('Servidor fora do ar. Tente de novo.'));
    }, 400);
  });
}

function Pedidos() {
  const [cliente, setCliente] = useState('Ana');
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    setCarregando(true);
    setErro(null);
    buscarPedidos(cliente)
      .then((lista) => setPedidos(lista))
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false));
  }, [cliente]);

  function conteudo() {
    if (carregando) return <p>Carregando...</p>;
    if (erro) return <p role="alert">{erro}</p>;
    if (pedidos.length === 0) return <p>Nenhum pedido ainda.</p>;
    return (
      <ul id="pedidos">
        {pedidos.map((pedido) => <li key={pedido}>{pedido}</li>)}
      </ul>
    );
  }

  return (
    <div>
      {['Ana', 'Bruno', 'Carla', 'Davi'].map((nome) => (
        <button key={nome} onClick={() => setCliente(nome)}>{nome}</button>
      ))}
      <h2>Pedidos de {cliente}</h2>
      {conteudo()}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Pedidos />);`,
          },
          height: 240,
        },
        {
          type: 'order',
          prompt:
            'A pessoa abre `/produtos/7`. Coloque em ordem o que acontece num componente bem-feito.',
          items: [
            'O roteador renderiza `DetalheProduto` com o parâmetro `id` igual a "7"',
            'A primeira renderização mostra “Carregando...”',
            'Depois da renderização, o efeito chama a API com o id 7',
            'A resposta chega e o efeito guarda o produto no estado',
            'O componente renderiza de novo, agora com o produto na tela',
          ],
          explanation:
            'Repare que a tela aparece **antes** dos dados: o efeito só roda depois da primeira renderização. Por isso o estado de carregando não é opcional, ele é a primeira coisa que a pessoa vê.',
        },
      ],
    },
    {
      id: 'corrida-e-cancelamento',
      title: 'Respostas fora de ordem',
      blocks: [
        {
          type: 'text',
          text: 'Pedidos de rede não chegam na ordem em que saíram. Se a pessoa clica em Ana e logo depois em Bruno, e o servidor demora mais para responder Ana, a resposta de Ana chega **por último** e sobrescreve a de Bruno. A tela diz “Bruno” no título e mostra os dados de Ana. Isso se chama **condição de corrida**.',
        },
        {
          type: 'flow',
          caption: 'Duas buscas disputando a mesma tela',
          actors: ['Pessoa', 'Componente', 'Servidor'],
          steps: [
            {
              from: 0,
              to: 1,
              label: 'Clica em Ana',
              text: 'O estado muda para Ana e o efeito dispara a primeira busca.',
            },
            {
              from: 1,
              to: 2,
              label: 'Busca Ana (lenta)',
              text: 'Essa resposta vai demorar quase um segundo.',
            },
            {
              from: 0,
              to: 1,
              label: 'Clica em Bruno',
              text: 'Logo depois, a pessoa muda de ideia. O efeito dispara a segunda busca.',
            },
            {
              from: 1,
              to: 2,
              label: 'Busca Bruno (rápida)',
              text: 'Essa volta em poucos milissegundos.',
            },
            {
              from: 2,
              to: 1,
              label: 'Chega Bruno',
              text: 'A tela mostra Bruno. Até aqui, tudo certo.',
              tone: 'ok',
            },
            {
              from: 2,
              to: 1,
              label: 'Chega Ana, atrasada',
              text: 'Sem proteção, o `.then` antigo ainda roda e troca os dados para Ana, embora a pessoa tenha escolhido Bruno.',
              tone: 'error',
            },
          ],
        },
        {
          type: 'text',
          text: 'A correção usa a limpeza do efeito, que você conheceu na aula anterior. Quando o cliente muda, o React limpa o efeito antigo antes de rodar o novo. Se a limpeza marcar “ignore a resposta antiga”, a resposta atrasada chega e é descartada.',
        },
        {
          type: 'playground',
          title: 'Ignorar a resposta atrasada',
          framework: 'react',
          task: 'Clique em **Ana** e logo depois em **Bruno**: a tela termina mostrando Ana. Dentro do efeito, crie `let ignorar = false`, só chame `setPerfil` se `ignorar` for falso e devolva uma limpeza que faz `ignorar = true`.',
          html: '<div id="root"></div>',
          css: `body { font-family: system-ui, sans-serif; margin: 16px; }
button { margin-right: 6px; padding: 4px 12px; cursor: pointer; }`,
          js: `const { useState, useEffect } = React;

const cidades = { Ana: 'Recife', Bruno: 'Porto Alegre', Carla: 'Belém' };
const atrasos = { Ana: 900, Bruno: 150, Carla: 300 };

function buscarPerfil(nome) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ nome, cidade: cidades[nome] }), atrasos[nome]);
  });
}

function Perfil() {
  const [escolhido, setEscolhido] = useState('Carla');
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    setPerfil(null);
    buscarPerfil(escolhido).then((dados) => {
      setPerfil(dados);
    });
    // TODO: ignore respostas que chegarem depois que escolhido mudar
  }, [escolhido]);

  return (
    <div>
      {['Ana', 'Bruno', 'Carla'].map((nome) => (
        <button key={nome} onClick={() => setEscolhido(nome)}>{nome}</button>
      ))}
      <p>Você escolheu: {escolhido}</p>
      <h2 id="perfil">{perfil ? perfil.nome + ', de ' + perfil.cidade : 'Carregando...'}</h2>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Perfil />);`,
          checks: [
            {
              label: 'Clicar em **Ana** e logo depois em **Bruno** termina mostrando Bruno',
              test: verificar(`const ana = botao('Ana');
const bruno = botao('Bruno');
if (!ana || !bruno) return false;
ana.click();
await tique();
bruno.click();
const inicio = performance.now();
while (performance.now() - inicio < 1300) await esperar(100);
await esperar(50);
await esperar(50);
const atual = texto(document.querySelector('#perfil'));
return atual.includes('Bruno') && !atual.includes('Ana');`),
            },
            {
              label: 'Escolher uma pessoa só continua funcionando',
              test: verificar(`const carla = botao('Carla');
if (!carla) return false;
carla.click();
return await ate(() => texto(document.querySelector('#perfil')).includes('Carla, de Belém'));`),
            },
          ],
          solution: {
            js: `const { useState, useEffect } = React;

const cidades = { Ana: 'Recife', Bruno: 'Porto Alegre', Carla: 'Belém' };
const atrasos = { Ana: 900, Bruno: 150, Carla: 300 };

function buscarPerfil(nome) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ nome, cidade: cidades[nome] }), atrasos[nome]);
  });
}

function Perfil() {
  const [escolhido, setEscolhido] = useState('Carla');
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    let ignorar = false;
    setPerfil(null);
    buscarPerfil(escolhido).then((dados) => {
      if (!ignorar) setPerfil(dados);
    });
    return () => {
      ignorar = true;
    };
  }, [escolhido]);

  return (
    <div>
      {['Ana', 'Bruno', 'Carla'].map((nome) => (
        <button key={nome} onClick={() => setEscolhido(nome)}>{nome}</button>
      ))}
      <p>Você escolheu: {escolhido}</p>
      <h2 id="perfil">{perfil ? perfil.nome + ', de ' + perfil.cidade : 'Carregando...'}</h2>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Perfil />);`,
          },
          height: 200,
        },
        {
          type: 'anatomy',
          caption: 'Com `fetch` de verdade, dá para cancelar o pedido, não só ignorar a resposta.',
          language: 'jsx',
          parts: [
            { text: 'useEffect(() => {\n  ' },
            {
              text: 'const controle = new AbortController();',
              label: 'O controle remoto',
              note: '`AbortController` é do próprio navegador. Ele cria um sinal que pode ser disparado para cancelar operações.',
            },
            { text: '\n  fetch(`/api/perfis/${id}`, ' },
            {
              text: '{ signal: controle.signal }',
              label: 'Ligar o sinal',
              note: 'O `fetch` passa a escutar esse sinal. Se ele for disparado, a requisição é interrompida, inclusive no painel Network, onde aparece como cancelada.',
            },
            {
              text: ')\n    .then((resposta) => resposta.json())\n    .then(setPerfil)\n    .catch((erro) => {\n      ',
            },
            {
              text: "if (erro.name !== 'AbortError') setErro(erro.message);",
              label: 'Cancelamento não é erro',
              note: 'Cancelar faz a Promise rejeitar com um erro chamado `AbortError`. Ele é esperado, então não deve virar mensagem de erro na tela.',
            },
            { text: '\n    });\n  ' },
            {
              text: 'return () => controle.abort();',
              label: 'Cancelar na limpeza',
              note: 'Quando o id muda ou a tela fecha, o pedido antigo é cancelado. Economiza dados móveis da pessoa e trabalho do servidor.',
            },
            { text: '\n}, [id]);' },
          ],
        },
        {
          type: 'quiz',
          question:
            'Por que o `ignorar = true` dentro da limpeza resolve a corrida, se a busca antiga continua acontecendo?',
          options: [
            {
              text: 'Porque cada execução do efeito tem sua própria variável `ignorar`; a limpeza marca a da execução antiga, e o `.then` antigo vê esse valor',
              correct: true,
              feedback:
                'Exato. Cada execução cria uma variável nova, presa à sua função (uma closure). A limpeza só afeta a busca que ficou velha; a nova começa com `ignorar = false`.',
            },
            {
              text: 'Porque o React cancela as Promises automaticamente quando a dependência muda',
              feedback:
                'O React não cancela nada sozinho: a Promise antiga resolve normalmente. É a sua limpeza que decide ignorar o resultado.',
            },
            {
              text: 'Porque `let` faz a variável ser compartilhada entre todas as execuções do efeito',
              feedback:
                'É o contrário: `let` dentro do efeito cria uma variável nova a cada execução. Se fosse compartilhada, a limpeza bloquearia também a busca nova.',
            },
          ],
        },
      ],
    },
    {
      id: 'bibliotecas-de-dados',
      title: 'Quando usar uma biblioteca de dados',
      blocks: [
        {
          type: 'text',
          text: 'Você acabou de escrever, à mão, carregando, erro, vazio e proteção contra corrida. Numa aplicação com dezenas de telas, ainda aparecem novas necessidades: guardar respostas em **cache** (uma cópia local para não pedir de novo), tentar outra vez quando falha, atualizar quando a pessoa volta para a aba.',
        },
        {
          type: 'text',
          text: 'Bibliotecas como **TanStack Query** (antes chamada React Query) e **SWR** cuidam disso. O próprio React Router também pode carregar dados antes de mostrar a rota, com os **loaders**. A recomendação da trilha: comece com `fetch` e efeito para entender o problema, e adote uma biblioteca quando a repetição aparecer.',
        },
        {
          type: 'codeTabs',
          caption: 'A mesma tela com efeito à mão e com TanStack Query',
          tabs: [
            {
              label: 'Efeito à mão',
              language: 'jsx',
              code: `const [dados, setDados] = useState(null);
const [carregando, setCarregando] = useState(true);
const [erro, setErro] = useState(null);

useEffect(() => {
  let ignorar = false;
  setCarregando(true);
  buscarPedidos(cliente)
    .then((lista) => { if (!ignorar) setDados(lista); })
    .catch((e) => { if (!ignorar) setErro(e); })
    .finally(() => { if (!ignorar) setCarregando(false); });
  return () => { ignorar = true; };
}, [cliente]);`,
            },
            {
              label: 'TanStack Query',
              language: 'jsx',
              code: `import { useQuery } from '@tanstack/react-query';

const { data: dados, isPending: carregando, error: erro } = useQuery({
  queryKey: ['pedidos', cliente],
  queryFn: () => buscarPedidos(cliente),
});
// Corrida, cache, nova tentativa e atualização ao voltar
// para a aba já vêm resolvidos.`,
            },
          ],
        },
        {
          type: 'classify',
          prompt: 'Quem resolve cada necessidade, com menos código?',
          buckets: ['React Router', 'Efeito com fetch basta', 'Biblioteca de dados'],
          items: [
            { text: 'Ler o id do produto a partir da URL', bucket: 0 },
            { text: 'Mostrar uma página de não encontrado para caminhos desconhecidos', bucket: 0 },
            { text: 'Uma única tela que busca uma lista uma vez ao abrir', bucket: 1 },
            { text: 'Ignorar a resposta antiga ao trocar de cliente numa tela simples', bucket: 1 },
            {
              text: 'Não pedir de novo os dados de uma tela que a pessoa visitou há 10 segundos',
              bucket: 2,
            },
            { text: 'Atualizar os dados sozinho quando a pessoa volta para a aba', bucket: 2 },
          ],
          explanation:
            'Rotas são do roteador. Uma busca isolada cabe num efeito, como você fez. Quando entram cache e atualização automática em muitas telas, uma biblioteca de dados economiza código e bugs.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns com dados',
          text: 'Esquecer o estado de carregando e mostrar uma tela quebrada no primeiro instante. Tratar só o sucesso e deixar a tela em branco quando a internet cai. Deixar uma resposta atrasada sobrescrever a atual. Transformar o cancelamento (`AbortError`) em mensagem de erro para a pessoa.',
        },
      ],
    },
  ],
  recap: [
    'Numa SPA, o roteador lê a URL, escolhe o componente e intercepta os links para trocar de tela sem recarregar.',
    'No React Router, `Route` declara caminhos como `/produtos/:id`, `Link` navega e `useParams` lê os parâmetros, que chegam como texto.',
    'Buscar dados é um efeito que depende do parâmetro, com estados de carregando, erro e vazio, como os quatro estados da aula de JavaScript assíncrono.',
    'Respostas podem chegar fora de ordem: use a limpeza do efeito para ignorar respostas antigas ou um `AbortController` para cancelar o `fetch`.',
    'Bibliotecas como TanStack Query trazem cache e novas tentativas; adote quando a repetição de código de busca aparecer.',
  ],
  cards: [
    {
      id: 'spa',
      front: 'O que é uma SPA?',
      back: 'Uma aplicação que carrega uma vez e troca as telas pelo JavaScript conforme a URL, sem baixar páginas novas.',
    },
    {
      id: 'link-vs-a',
      front: 'Por que usar `Link` em vez de `<a href>` dentro de uma SPA?',
      back: 'O `Link` troca a URL e os componentes sem recarregar a página, mantendo o estado da aplicação.',
    },
    {
      id: 'use-params',
      front: 'Em `/produtos/42` com a rota `/produtos/:id`, o que `useParams()` devolve?',
      back: '`{ id: "42" }`, com o valor como texto.',
    },
    {
      id: 'quatro-estados-react',
      front: 'Quais estados um componente que busca dados deve tratar?',
      back: 'Carregando, sucesso, vazio e erro.',
    },
    {
      id: 'condicao-de-corrida',
      front: 'O que é uma condição de corrida ao buscar dados?',
      back: 'Uma resposta antiga chega depois da atual e sobrescreve a tela com dados errados.',
    },
    {
      id: 'abort-controller',
      front: 'Como cancelar um `fetch` quando o efeito é limpo?',
      back: 'Passe `signal` de um `AbortController` ao `fetch` e chame `controle.abort()` na limpeza; ignore o `AbortError`.',
    },
    {
      id: 'tanstack-query',
      front: 'Quando vale adotar uma biblioteca como TanStack Query?',
      back: 'Quando muitas telas precisam de cache, novas tentativas e atualização automática, e o código de busca começa a se repetir.',
    },
  ],
  mission: {
    title: 'Tela de detalhe pela URL',
    text: 'No seu projeto React com Vite, crie uma lista e uma tela de detalhe acessível pela URL, com dados vindos de uma API pública ou de um arquivo JSON servido pelo próprio Vite.',
    steps: [
      'Instale o React Router e crie as rotas `/`, `/itens/:id` e uma rota `*` de não encontrado',
      'Na tela de detalhe, leia o id com `useParams` e busque os dados num efeito que depende dele',
      'Mostre carregando, erro com botão de tentar de novo e uma mensagem para item inexistente',
      'Proteja a busca contra corrida com `AbortController` e confira no painel Network que pedidos antigos aparecem como cancelados',
      'Abra a tela de detalhe colando a URL numa aba nova e verifique que ela carrega direto',
    ],
  },
  sources: [
    { title: 'React Router: documentação', url: 'https://reactrouter.com/home' },
    {
      title: 'React: Buscando dados com efeitos',
      url: 'https://react.dev/learn/synchronizing-with-effects#fetching-data',
    },
    {
      title: 'MDN: AbortController',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/API/AbortController',
    },
    {
      title: 'TanStack Query: visão geral',
      url: 'https://tanstack.com/query/latest/docs/framework/react/overview',
    },
  ],
};
