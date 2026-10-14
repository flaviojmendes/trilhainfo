import { LessonContent } from '../types';

const verificar = (corpo: string) => `const anterior = window.__fila || Promise.resolve();
let liberar;
window.__fila = new Promise((r) => (liberar = r));
await anterior;
await new Promise((r) => setTimeout(r, 300));
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
const texto = (el) => (el?.textContent || '').replace(/\\s+/g, ' ').trim();
const botao = (rotulo) => [...document.querySelectorAll('button')].find((b) => texto(b) === rotulo);
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

const vigiarIntervalos = `if (!window.__intervalos) {
  const ativos = new Set();
  const ligar = window.setInterval.bind(window);
  const desligar = window.clearInterval.bind(window);
  window.setInterval = (...args) => {
    const id = ligar(...args);
    ativos.add(id);
    return id;
  };
  window.clearInterval = (id) => {
    ativos.delete(id);
    return desligar(id);
  };
  window.__intervalos = ativos;
}`;

export const content: LessonContent = {
  hook: 'Aquele número entre parênteses no título da aba do WhatsApp Web, o cronômetro do Pomodoro, o campo de busca que já abre com o cursor piscando: nada disso é desenhar a tela. É o React conversando com coisas que ficam fora dele. Fazer isso do jeito certo evita os bugs mais chatos de React, como timers que aceleram sozinhos e telas que piscam sem parar.',
  sections: [
    {
      id: 'o-que-e-efeito',
      title: 'Renderizar é calcular; efeito é sincronizar',
      blocks: [
        {
          type: 'text',
          text: 'Até aqui seus componentes só faziam uma coisa: receber props e estado e devolver JSX. Essa conta precisa ser **pura**: mesmos dados, mesmo resultado, sem mexer em nada lá fora. Mas às vezes o componente precisa mexer lá fora: no título da aba, num timer, numa conexão de chat.',
        },
        {
          type: 'analogy',
          title: 'O termostato do ar-condicionado',
          text: 'Você escolhe 23 graus no controle: isso é o **estado**. O termostato não decide a temperatura, ele **sincroniza** o aparelho com o que você escolheu. Se você muda para 25, ele ajusta. Se você desliga o controle, ele para o motor. Um efeito é o termostato do seu componente.',
        },
        {
          type: 'text',
          text: 'Um **efeito** (`useEffect`) é um código que o React roda **depois** de colocar a tela no DOM, para manter algum sistema de fora do React igual ao estado. “Fora do React” é qualquer coisa que o JSX não controla: `document.title`, `setInterval`, eventos da `window`, o servidor.',
        },
        {
          type: 'anatomy',
          caption: 'As três partes de um efeito.',
          language: 'jsx',
          parts: [
            { text: 'useEffect(() => {\n  ' },
            {
              text: 'const id = setInterval(atualizarRelogio, 1000);',
              label: 'Configuração',
              note: 'O que liga a sincronização. Roda depois que a tela aparece, nunca durante a renderização.',
            },
            { text: '\n  ' },
            {
              text: 'return () => clearInterval(id);',
              label: 'Limpeza',
              note: 'Uma função opcional que desfaz o que a configuração fez. O React chama antes de rodar o efeito de novo e quando o componente sai da tela.',
            },
            { text: '\n}, ' },
            {
              text: '[]',
              label: 'Dependências',
              note: 'A lista de valores que o efeito usa. O React só roda de novo quando algum deles muda. Lista vazia: só depois da primeira renderização.',
            },
            { text: ');' },
          ],
        },
        {
          type: 'classify',
          prompt: 'Onde cada código deve ficar?',
          buckets: ['Na renderização', 'No tratador do evento', 'Num efeito'],
          items: [
            { text: 'Calcular o total do carrinho', bucket: 0 },
            { text: 'Filtrar a lista pelo texto da busca', bucket: 0 },
            { text: 'Enviar o pedido quando a pessoa clica em Pagar', bucket: 1 },
            { text: 'Mostrar um aviso depois que o formulário é enviado', bucket: 1 },
            { text: 'Manter o título da aba igual ao número de mensagens', bucket: 2 },
            {
              text: 'Ouvir o redimensionamento da janela enquanto o componente está na tela',
              bucket: 2,
            },
            { text: 'Conectar ao chat da sala aberta e desconectar ao trocar de sala', bucket: 2 },
          ],
          explanation:
            'A pergunta-chave é: **por que** esse código roda? Se é porque a pessoa fez algo, vai no evento. Se é só uma conta com os dados, vai na renderização. Se é porque a tela está aparecendo e algo lá fora precisa acompanhar, aí sim é um efeito.',
        },
      ],
    },
    {
      id: 'dependencias',
      title: 'O array de dependências',
      blocks: [
        {
          type: 'text',
          text: 'O segundo argumento do `useEffect` diz ao React **quando** sincronizar de novo. Ele compara cada valor da lista com o da renderização anterior; se nada mudou, o efeito é pulado.',
        },
        {
          type: 'table',
          caption: 'Três formas e quando o efeito roda',
          head: ['Escrita', 'Quando roda', 'Uso típico'],
          rows: [
            ['`useEffect(fn)`', 'Depois de **toda** renderização', 'Raro; quase sempre é engano'],
            [
              '`useEffect(fn, [])`',
              'Só depois da primeira renderização',
              'Ligar algo que não depende de props nem estado',
            ],
            [
              '`useEffect(fn, [sala])`',
              'Na primeira e sempre que `sala` mudar',
              'Sincronizar com um valor que muda',
            ],
          ],
        },
        {
          type: 'text',
          text: 'A regra prática: **todo valor de props ou estado usado dentro do efeito vai na lista**. Você não escolhe as dependências; elas são consequência do código. Num projeto com Vite, o ESLint com o plugin de hooks avisa quando falta alguma.',
        },
        {
          type: 'quiz',
          question:
            'O título da aba mostra o nome da primeira sala, mas não muda quando a pessoa troca de sala. Qual é o defeito?',
          code: `function Chat({ sala }) {
  useEffect(() => {
    document.title = 'Sala ' + sala;
  }, []);
  // ...
}`,
          language: 'jsx',
          options: [
            {
              text: 'Falta `sala` nas dependências: com `[]`, o efeito só roda na primeira renderização',
              correct: true,
              feedback:
                'Isso. O efeito usa `sala`, então `sala` precisa estar na lista: `[sala]`. Assim o React sincroniza o título a cada troca.',
            },
            {
              text: '`document.title` não pode ser alterado dentro de um efeito',
              feedback:
                'Pode e deve: o título da aba é exatamente o tipo de coisa fora do React que um efeito sincroniza.',
            },
            {
              text: 'Faltou uma função de limpeza que apague o título',
              feedback:
                'Limpeza serve para desfazer algo que continua ligado, como um timer. Aqui o problema é o efeito não rodar de novo.',
            },
          ],
        },
        {
          type: 'playground',
          title: 'Título da aba que acompanha o carrinho',
          framework: 'react',
          task: 'Crie um efeito que mantém `document.title` sincronizado com o número de itens: com 0 itens, o título é **Loja**; com 2 itens, **(2) Loja**. Não esqueça a lista de dependências.',
          html: '<div id="root"></div>',
          css: `body { font-family: system-ui, sans-serif; margin: 16px; }
button { margin-right: 8px; padding: 6px 14px; cursor: pointer; }`,
          js: `const { useState, useEffect } = React;

function Carrinho() {
  const [itens, setItens] = useState(0);

  // TODO: sincronize o título da aba com o número de itens.
  // 0 itens: "Loja". 2 itens: "(2) Loja".

  return (
    <div>
      <p>Itens no carrinho: <strong id="itens">{itens}</strong></p>
      <p>A prévia roda dentro de um quadro, então a aba do seu navegador não muda: os objetivos conferem o título por você.</p>
      <button onClick={() => setItens(itens + 1)}>Adicionar item</button>
      <button onClick={() => setItens(0)}>Esvaziar</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Carrinho />);`,
          checks: [
            {
              label: 'Com 2 itens no carrinho, o título fica **(2) Loja**',
              test: verificar(`const esvaziar = botao('Esvaziar');
const adicionar = botao('Adicionar item');
if (!esvaziar || !adicionar) return false;
esvaziar.click();
await esperar(50);
adicionar.click();
await esperar(50);
adicionar.click();
await esperar(80);
return document.title === '(2) Loja';`),
            },
            {
              label: 'Ao esvaziar, o título volta para **Loja**',
              test: verificar(`const esvaziar = botao('Esvaziar');
const adicionar = botao('Adicionar item');
if (!esvaziar || !adicionar) return false;
adicionar.click();
await esperar(50);
esvaziar.click();
await esperar(80);
return document.title === 'Loja';`),
            },
          ],
          solution: {
            js: `const { useState, useEffect } = React;

function Carrinho() {
  const [itens, setItens] = useState(0);

  useEffect(() => {
    document.title = itens > 0 ? '(' + itens + ') Loja' : 'Loja';
  }, [itens]);

  return (
    <div>
      <p>Itens no carrinho: <strong id="itens">{itens}</strong></p>
      <p>A prévia roda dentro de um quadro, então a aba do seu navegador não muda: os objetivos conferem o título por você.</p>
      <button onClick={() => setItens(itens + 1)}>Adicionar item</button>
      <button onClick={() => setItens(0)}>Esvaziar</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Carrinho />);`,
          },
          height: 180,
        },
      ],
    },
    {
      id: 'limpeza',
      title: 'Limpar o que você ligou',
      blocks: [
        {
          type: 'analogy',
          title: 'A bicicleta de aluguel',
          text: 'Você desbloqueia uma bike compartilhada pelo app e sai pedalando. Se esquecer de devolver na estação, o app continua cobrando, mesmo com você já em casa. Um timer ou um listener sem limpeza é isso: o componente saiu da tela, mas o efeito continua rodando e gastando.',
        },
        {
          type: 'flow',
          caption: 'A vida de um efeito com dependência `[sala]`',
          actors: ['Componente', 'React', 'Servidor'],
          steps: [
            {
              from: 0,
              to: 1,
              label: 'Renderiza sala "geral"',
              text: 'O componente devolve o JSX. O React coloca no DOM e só depois roda o efeito.',
            },
            {
              from: 1,
              to: 2,
              label: 'Conecta em "geral"',
              text: 'A configuração do efeito abre a conexão com a sala atual.',
              tone: 'ok',
            },
            {
              from: 0,
              to: 1,
              label: 'Renderiza sala "vagas"',
              text: 'A pessoa trocou de sala. A dependência mudou, então o efeito precisa sincronizar de novo.',
            },
            {
              from: 1,
              to: 2,
              label: 'Limpeza: sai de "geral"',
              text: 'Antes de rodar de novo, o React chama a limpeza da execução anterior, com os valores antigos.',
            },
            {
              from: 1,
              to: 2,
              label: 'Conecta em "vagas"',
              text: 'Agora sim a configuração roda com o valor novo.',
              tone: 'ok',
            },
            {
              from: 0,
              to: 1,
              label: 'Sai da tela',
              text: 'A pessoa fechou o chat. O componente é desmontado, isto é, removido da tela.',
            },
            {
              from: 1,
              to: 2,
              label: 'Limpeza: sai de "vagas"',
              text: 'A última limpeza roda. Nada fica ligado sem dono.',
            },
          ],
        },
        {
          type: 'code',
          language: 'jsx',
          caption: 'Ouvir a janela enquanto o componente existe',
          code: `useEffect(() => {
  function aoRedimensionar() {
    setLargura(window.innerWidth);
  }
  window.addEventListener('resize', aoRedimensionar);
  return () => window.removeEventListener('resize', aoRedimensionar);
}, []);`,
        },
        {
          type: 'playground',
          title: 'Cronômetro que não acelera',
          framework: 'react',
          task: 'Clique em **Iniciar**, depois em **Pausar**: o tempo não para. Pause e inicie algumas vezes: ele acelera. O efeito liga um `setInterval` e nunca desliga. Guarde o id do intervalo e devolva uma limpeza com `clearInterval`.',
          html: '<div id="root"></div>',
          css: `body { font-family: system-ui, sans-serif; margin: 16px; }
#tempo { font-size: 2rem; font-variant-numeric: tabular-nums; margin: 8px 0; }
button { margin-right: 8px; padding: 6px 14px; cursor: pointer; }`,
          js: `const { useState, useEffect } = React;

function Cronometro() {
  const [decimos, setDecimos] = useState(0);
  const [rodando, setRodando] = useState(false);

  useEffect(() => {
    if (!rodando) return;
    setInterval(() => {
      setDecimos((anterior) => anterior + 1);
    }, 100);
    // TODO: devolva uma função de limpeza que pare o intervalo
  }, [rodando]);

  return (
    <div>
      <p id="tempo">{(decimos / 10).toFixed(1)} s</p>
      <button onClick={() => setRodando(!rodando)}>{rodando ? 'Pausar' : 'Iniciar'}</button>
      <button onClick={() => { setRodando(false); setDecimos(0); }}>Zerar</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Cronometro />);`,
          checks: [
            {
              label: '**Iniciar** faz o tempo andar',
              test: verificar(`${vigiarIntervalos}
const tempo = () => parseFloat(texto(document.querySelector('#tempo')));
const iniciar = botao('Iniciar');
if (!iniciar) return false;
const antes = tempo();
iniciar.click();
return await ate(() => tempo() > antes);`),
            },
            {
              label: '**Pausar** desliga o intervalo, e o tempo para',
              test: verificar(`${vigiarIntervalos}
const tempo = () => parseFloat(texto(document.querySelector('#tempo')));
if (botao('Iniciar')) {
  botao('Iniciar').click();
  await ate(() => tempo() > 0);
}
const pausar = botao('Pausar');
if (!pausar) return false;
pausar.click();
await tique();
await esperar(30);
return tempo() > 0 && window.__intervalos.size === 0;`),
            },
            {
              label: 'Pausar e iniciar várias vezes deixa só um intervalo ligado, sem acelerar',
              test: verificar(`${vigiarIntervalos}
const alternar = async () => {
  const b = botao('Iniciar') || botao('Pausar');
  if (b) b.click();
  await tique();
  await esperar(20);
};
if (botao('Pausar')) await alternar();
for (let i = 0; i < 5; i++) await alternar();
if (!botao('Pausar')) return false;
const umSo = window.__intervalos.size === 1;
await alternar();
return umSo && window.__intervalos.size === 0;`),
            },
          ],
          solution: {
            js: `const { useState, useEffect } = React;

function Cronometro() {
  const [decimos, setDecimos] = useState(0);
  const [rodando, setRodando] = useState(false);

  useEffect(() => {
    if (!rodando) return;
    const id = setInterval(() => {
      setDecimos((anterior) => anterior + 1);
    }, 100);
    return () => clearInterval(id);
  }, [rodando]);

  return (
    <div>
      <p id="tempo">{(decimos / 10).toFixed(1)} s</p>
      <button onClick={() => setRodando(!rodando)}>{rodando ? 'Pausar' : 'Iniciar'}</button>
      <button onClick={() => { setRodando(false); setDecimos(0); }}>Zerar</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Cronometro />);`,
          },
          height: 180,
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Por que meu efeito roda duas vezes?',
          text: 'Em desenvolvimento, com `<StrictMode>` (que o Vite já coloca no `main.tsx`), o React monta o componente, desmonta e monta de novo de propósito. Se o efeito tem a limpeza certa, você nem percebe. Se falta limpeza, o bug aparece na hora, como o cronômetro nascendo em velocidade dobrada. Em produção, isso não acontece. Não desligue o StrictMode: conserte a limpeza.',
        },
      ],
    },
    {
      id: 'armadilhas',
      title: 'Três armadilhas com efeitos',
      blocks: [
        {
          type: 'text',
          text: 'Efeitos são a ferramenta do React mais usada sem necessidade. A documentação oficial tem uma página inteira chamada “Você talvez não precise de um efeito”. Estas são as três armadilhas que mais aparecem em código de iniciante.',
        },
        {
          type: 'quiz',
          question:
            'Ao abrir esta tela, o navegador trava e o console enche de renderizações. Por quê?',
          code: `function Perfil() {
  const [visitas, setVisitas] = useState(0);
  useEffect(() => {
    setVisitas(visitas + 1);
  });
  return <p>{visitas} visitas</p>;
}`,
          language: 'jsx',
          options: [
            {
              text: 'Sem lista de dependências, o efeito roda após toda renderização e muda o estado, que causa outra renderização, sem fim',
              correct: true,
              feedback:
                'Exato: é o laço infinito clássico. Contar visitas, aliás, nem é um efeito sobre a tela; seria um evento ou algo que o servidor faz.',
            },
            {
              text: '`useState(0)` reinicia o contador a cada renderização',
              feedback:
                'O valor inicial só é usado na primeira renderização. Depois o React devolve o valor guardado, que vai subindo sem parar.',
            },
            {
              text: 'Faltou a função de limpeza',
              feedback:
                'Uma limpeza não impediria o efeito de rodar de novo. O problema é efeito sem dependências que altera o estado.',
            },
          ],
        },
        {
          type: 'codeTabs',
          caption: 'Armadilha dois: efeito para calcular algo que já dá para calcular',
          tabs: [
            {
              label: 'Com efeito (evite)',
              language: 'jsx',
              code: `const [busca, setBusca] = useState('');
const [filtrados, setFiltrados] = useState(produtos);

useEffect(() => {
  setFiltrados(produtos.filter((p) => p.nome.includes(busca)));
}, [busca]);
// Duas renderizações a cada tecla, e um estado espelho.`,
            },
            {
              label: 'Sem efeito (prefira)',
              language: 'jsx',
              code: `const [busca, setBusca] = useState('');

const filtrados = produtos.filter((p) => p.nome.includes(busca));
// Calculado na renderização: uma renderização, sempre certo.`,
            },
          ],
        },
        {
          type: 'text',
          text: 'A terceira armadilha é usar um efeito para reagir a uma ação da pessoa: guardar `enviado = true` no clique e ter um efeito que, ao ver `enviado`, faz o envio. Se o motivo do código é um clique, o código vai **no tratador do clique**. Efeito é para o que precisa acontecer porque a tela está aparecendo.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Resumo dos erros comuns',
          text: 'Efeito sem dependências que muda estado: laço infinito. Efeito que copia uma conta para o estado: troque por uma variável. Efeito disparado por uma flag de clique: mova para o evento. Timer, listener ou conexão sem limpeza: devolva a função que desliga.',
        },
        {
          type: 'reveal',
          question:
            'Uma colega diz: “coloquei a lista de dependências vazia para o efeito rodar menos e o aviso do ESLint sumiu quando apaguei a variável de lá”. O que pode dar errado?',
          answer:
            'O efeito passa a usar um valor congelado da primeira renderização. Se esse valor mudar, a tela fica dessincronizada, como o título que não troca de sala. Dependências não são um botão de desempenho: se o efeito roda demais, a solução é rever o código (talvez nem precise de efeito), não esconder as dependências.',
        },
      ],
    },
    {
      id: 'refs',
      title: 'useRef: uma gaveta que não redesenha a tela',
      blocks: [
        {
          type: 'analogy',
          title: 'O bloquinho do caixa',
          text: 'Na padaria, o painel de senhas é o que todo mundo vê (o estado: mudou, a tela muda). Já o bloquinho onde a pessoa do caixa anota o troco é só dela: anotar não muda o painel. Uma **ref** é esse bloquinho: guarda um valor entre renderizações, mas mudar não re-renderiza.',
        },
        {
          type: 'text',
          text: '`useRef(valorInicial)` devolve um objeto `{ current: valorInicial }` que sobrevive às renderizações. Você lê e escreve em `ref.current` à vontade. Dois usos principais: guardar um valor que não aparece na tela (como o id de um timer) e acessar um elemento do DOM.',
        },
        {
          type: 'anatomy',
          caption: 'Colocar o foco num campo com uma ref.',
          language: 'jsx',
          parts: [
            { text: 'function Busca() {\n  ' },
            {
              text: 'const campo = useRef(null);',
              label: 'Criar a ref',
              note: 'Começa com `null` porque, na primeira renderização, o elemento ainda não existe no DOM.',
            },
            { text: '\n\n  return (\n    <>\n      <input ' },
            {
              text: 'ref={campo}',
              label: 'Ligar ao elemento',
              note: 'Depois de colocar o `input` no DOM, o React guarda o elemento em `campo.current`. Quando ele sai da tela, volta a ser `null`.',
            },
            { text: ' />\n      <button onClick={() => ' },
            {
              text: 'campo.current.focus()',
              label: 'Usar o elemento',
              note: 'Aqui `campo.current` é o elemento de verdade, o mesmo que `querySelector` devolveria. Use refs para o que o JSX não expressa: foco, rolagem, medir tamanho, tocar um vídeo.',
            },
            { text: '}>\n        Buscar\n      </button>\n    </>\n  );\n}' },
          ],
        },
        {
          type: 'table',
          caption: 'Estado ou ref?',
          head: ['', 'useState', 'useRef'],
          rows: [
            ['Mudar re-renderiza?', 'Sim', 'Não'],
            ['Como muda', '`setValor(novo)`', '`ref.current = novo`'],
            [
              'Pode ler durante a renderização?',
              'Sim',
              'Evite: o valor pode estar desatualizado na tela',
            ],
            [
              'Exemplos',
              'Texto digitado, item selecionado',
              'Elemento do DOM, id de timer, valor anterior',
            ],
          ],
        },
        {
          type: 'playground',
          title: 'Foco no lugar certo',
          framework: 'react',
          task: 'Crie duas refs. A primeira liga o campo de busca, e o botão **Ir para a busca** coloca o foco nele. A segunda liga o campo de nome; use um efeito com dependência `[editando]` para focar esse campo quando `editando` virar `true`.',
          html: '<div id="root"></div>',
          css: `body { font-family: system-ui, sans-serif; margin: 16px; }
.busca { display: flex; gap: 8px; margin-bottom: 16px; }
input { padding: 6px; }
input:focus { outline: 3px solid #2563eb; }
button { padding: 6px 12px; cursor: pointer; }`,
          js: `const { useState, useEffect, useRef } = React;

function Perfil() {
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState('Maria');
  // TODO 1: crie uma ref para o campo de busca
  // TODO 2: crie uma ref para o campo de nome

  // TODO 3: quando editando for true, coloque o foco no campo de nome

  return (
    <div>
      <div className="busca">
        <input id="busca" placeholder="Buscar na página" />
        <button onClick={() => { /* TODO 4: foque o campo de busca */ }}>Ir para a busca</button>
      </div>
      {editando ? (
        <div>
          <label htmlFor="nome">Nome </label>
          <input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          <button onClick={() => setEditando(false)}>Salvar</button>
        </div>
      ) : (
        <p>
          {nome} <button onClick={() => setEditando(true)}>Editar nome</button>
        </p>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Perfil />);`,
          checks: [
            {
              label: '**Ir para a busca** coloca o foco no campo de busca',
              test: verificar(`const ir = botao('Ir para a busca');
if (!ir) return false;
if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
ir.click();
await esperar(60);
return document.activeElement?.id === 'busca';`),
            },
            {
              label: 'Ao clicar em **Editar nome**, o campo de nome já aparece com foco',
              test: verificar(`const editar = botao('Editar nome');
if (!editar) return false;
if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
editar.click();
await esperar(120);
const focou = document.activeElement?.id === 'nome';
const salvar = botao('Salvar');
if (salvar) salvar.click();
await esperar(60);
return focou;`),
            },
          ],
          solution: {
            js: `const { useState, useEffect, useRef } = React;

function Perfil() {
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState('Maria');
  const busca = useRef(null);
  const campoNome = useRef(null);

  useEffect(() => {
    if (editando) {
      campoNome.current.focus();
    }
  }, [editando]);

  return (
    <div>
      <div className="busca">
        <input id="busca" ref={busca} placeholder="Buscar na página" />
        <button onClick={() => busca.current.focus()}>Ir para a busca</button>
      </div>
      {editando ? (
        <div>
          <label htmlFor="nome">Nome </label>
          <input id="nome" ref={campoNome} value={nome} onChange={(e) => setNome(e.target.value)} />
          <button onClick={() => setEditando(false)}>Salvar</button>
        </div>
      ) : (
        <p>
          {nome} <button onClick={() => setEditando(true)}>Editar nome</button>
        </p>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Perfil />);`,
          },
          height: 200,
        },
        {
          type: 'quiz',
          question:
            'Você quer contar quantas vezes o componente renderizou, só para depurar no console, sem mostrar na tela. O que usar?',
          options: [
            {
              text: 'Uma ref: `const renders = useRef(0)` e `renders.current++` num efeito sem dependências',
              correct: true,
              feedback:
                'Isso. A ref guarda o número entre renderizações e mudar `current` não causa uma renderização nova, então não vira laço.',
            },
            {
              text: 'Um estado: `setRenders(renders + 1)` num efeito sem dependências',
              feedback:
                'Cada `setRenders` causa uma renderização, que roda o efeito, que chama `setRenders`... é o laço infinito da seção anterior.',
            },
            {
              text: 'Uma variável `let renders = 0` dentro do componente',
              feedback:
                'Ela nasce valendo 0 a cada renderização, então nunca passaria de 1. Para guardar algo entre renderizações sem mostrar, use uma ref.',
            },
          ],
        },
      ],
    },
  ],
  recap: [
    'A renderização deve ser pura; um efeito roda depois dela para sincronizar o componente com algo de fora do React.',
    'A lista de dependências diz quando sincronizar de novo, e todo valor de props ou estado usado no efeito entra nela.',
    'Timers, listeners e conexões precisam de limpeza, a função devolvida pelo efeito; o StrictMode roda o efeito duas vezes em desenvolvimento para revelar limpezas faltando.',
    'Contas derivadas ficam na renderização e reações a cliques ficam no evento: muitos efeitos são desnecessários.',
    '`useRef` guarda um valor que sobrevive às renderizações sem causar outra, e dá acesso a elementos do DOM para foco e medidas.',
  ],
  cards: [
    {
      id: 'efeito-o-que-e',
      front: 'Para que serve o `useEffect`?',
      back: 'Para sincronizar o componente com algo de fora do React (título da aba, timer, listener, servidor) depois da renderização.',
    },
    {
      id: 'deps-vazias',
      front: 'Quando roda um efeito com dependências `[]`?',
      back: 'Só depois da primeira renderização (e a limpeza quando o componente sai da tela).',
    },
    {
      id: 'limpeza',
      front: 'Quando o React chama a função de limpeza de um efeito?',
      back: 'Antes de rodar o efeito de novo e quando o componente é desmontado.',
    },
    {
      id: 'strict-mode',
      front: 'Por que meu efeito roda duas vezes em desenvolvimento?',
      back: 'O StrictMode monta, desmonta e monta de novo para revelar efeitos sem limpeza. Em produção roda uma vez.',
    },
    {
      id: 'laco-infinito',
      front: 'O que causa um laço infinito com `useEffect`?',
      back: 'Um efeito sem dependências (ou com dependência que muda sempre) que altera o estado a cada execução.',
    },
    {
      id: 'ref-vs-estado',
      front: 'Qual a diferença entre `useRef` e `useState`?',
      back: 'Os dois sobrevivem às renderizações, mas mudar `ref.current` não re-renderiza; mudar o estado sim.',
    },
    {
      id: 'ref-dom',
      front: 'Como acessar um elemento do DOM no React?',
      back: 'Crie `const campo = useRef(null)`, ligue com `ref={campo}` e use `campo.current`, por exemplo `campo.current.focus()`.',
    },
  ],
  mission: {
    title: 'Faxina de efeitos',
    text: 'Use o projeto das aulas anteriores (ou um projeto React que você tenha) para praticar o que separa efeitos úteis de efeitos desnecessários.',
    steps: [
      'Procure todos os `useEffect` do projeto e escreva ao lado de cada um com que sistema externo ele sincroniza',
      'Remova pelo menos um efeito que só copiava uma conta para o estado, trocando por uma variável',
      'Crie um componente com `setInterval` ou listener de `resize`, com limpeza, e confirme no console que a limpeza roda ao sair da tela',
      'Confira que o `main.tsx` usa `<StrictMode>` e que nenhum efeito se comporta diferente por causa dele',
      'Use uma ref para colocar o foco no primeiro campo de um formulário quando ele abrir',
    ],
  },
  sources: [
    {
      title: 'React: Sincronizando com efeitos',
      url: 'https://react.dev/learn/synchronizing-with-effects',
    },
    {
      title: 'React: Você talvez não precise de um efeito',
      url: 'https://react.dev/learn/you-might-not-need-an-effect',
    },
    {
      title: 'React: Manipulando o DOM com refs',
      url: 'https://react.dev/learn/manipulating-the-dom-with-refs',
    },
  ],
};
