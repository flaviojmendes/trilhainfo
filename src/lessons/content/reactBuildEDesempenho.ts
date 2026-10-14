import { LessonContent } from '../types';

const verificar = (corpo: string) => `const anterior = window.__fila || Promise.resolve();
let liberar;
window.__fila = new Promise((r) => (liberar = r));
await anterior;
await new Promise((r) => setTimeout(r, 300));
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
const texto = (el) => (el?.textContent || '').replace(/\\s+/g, ' ').trim();
const botao = (rotulo) => [...document.querySelectorAll('button')].find((b) => texto(b) === rotulo);
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
  hook: 'Seu app funciona no seu notebook, com internet boa. Agora imagine a pessoa que abre o mesmo link num celular simples, com 4G oscilando dentro do ônibus: cada megabyte de JavaScript vira segundos olhando uma tela branca. Nesta aula você vai entender o que acontece quando o projeto React vira uma versão de produção, como dividir o código para carregar só o necessário e como provar, com números, que uma otimização valeu a pena.',
  sections: [
    {
      id: 'o-que-o-build-faz',
      title: 'Do seu código ao que o navegador baixa',
      blocks: [
        {
          type: 'text',
          text: 'Na aula de ferramentas você rodou `npm run build` e viu nascer a pasta `dist/`. Agora vamos abrir essa caixa. O Vite pega dezenas de arquivos `.jsx`, mais as bibliotecas de `node_modules`, e entrega poucos arquivos pequenos, prontos para qualquer navegador.',
        },
        {
          type: 'analogy',
          title: 'A cozinha que prepara marmitas',
          text: 'Na sua cozinha, os ingredientes ficam espalhados em potes com etiquetas grandes, fáceis de achar. Para entregar, você junta tudo em poucas marmitas, tira o que ninguém vai comer e fecha bem para ocupar pouco espaço na mochila do entregador. O build faz o mesmo com o código: ele **junta**, **corta sobras** e **compacta**.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Bundling (empacotamento)',
              text: 'Juntar os muitos arquivos e `import`s em poucos arquivos, chamados **chunks** (pedaços). Menos arquivos, menos pedidos ao servidor.',
            },
            {
              term: 'Minificação',
              text: 'Apagar espaços, comentários e encurtar nomes de variáveis. O código continua funcionando, só fica ilegível para humanos e bem menor.',
            },
            {
              term: 'Tree-shaking',
              text: 'Literalmente “sacudir a árvore”: o que foi exportado mas nunca importado cai fora. Se você usa uma função de uma biblioteca com cem, só ela entra.',
            },
            {
              term: 'Hash no nome',
              text: 'O build nomeia arquivos como `index-D3fK9aLm.js`. O código mudou, o nome muda; assim o navegador nunca usa uma versão velha guardada em cache.',
            },
          ],
        },
        {
          type: 'codeTabs',
          caption: 'O mesmo componente antes e depois da minificação',
          tabs: [
            {
              label: 'Você escreve',
              language: 'jsx',
              code: `// Mostra o preço formatado em reais
function Preco({ valor }) {
  const formatado = valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return <span className="preco">{formatado}</span>;
}`,
            },
            {
              label: 'Vai para dist/',
              language: 'js',
              code: `function n({valor:e}){const r=e.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});return t.jsx("span",{className:"preco",children:r})}`,
            },
          ],
        },
        {
          type: 'terminal',
          title: 'Lendo o relatório do build',
          task: 'Este é o catálogo de uma loja, com uma página de relatórios que usa uma biblioteca de gráficos. Gere a versão de produção e leia o que o Vite conta.',
          prompt: '~/catalogo$',
          steps: [
            {
              goal: 'Gere a versão de produção do projeto.',
              command: ['npm run build', 'yarn build', 'pnpm build', 'pnpm run build'],
              output: `> catalogo@0.0.0 build
> tsc -b && vite build

vite v6.0.7 building for production...
✓ 412 modules transformed.
dist/index.html                   0.46 kB │ gzip:   0.30 kB
dist/assets/index-Bx81kd2Q.css    4.12 kB │ gzip:   1.38 kB
dist/assets/index-D3fK9aLm.js   612.48 kB │ gzip: 189.02 kB

(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
✓ built in 3.21s`,
              hint: 'É o script `build` do `package.json`: `npm run build`.',
            },
            {
              goal: 'Leia: tudo virou um único JavaScript de 612 kB. A coluna `gzip` é o que de fato trafega pela rede, comprimido. Liste os arquivos de `dist/assets` com os tamanhos.',
              command: [
                'ls -lh dist/assets',
                'ls -lh dist/assets/',
                'ls -l dist/assets',
                'ls -la dist/assets',
              ],
              output: `total 624K
-rw-r--r-- 1 voce voce 4.1K out 14 15:02 index-Bx81kd2Q.css
-rw-r--r-- 1 voce voce 599K out 14 15:02 index-D3fK9aLm.js`,
              hint: 'Use `ls -lh` seguido da pasta. O `-h` mostra tamanhos legíveis, como `599K`.',
            },
            {
              goal: 'O aviso sugere `import()` dinâmico. Você colocou a página de relatórios em `lazy` no editor (vamos ver como na próxima seção). Gere o build de novo e compare.',
              command: ['npm run build', 'yarn build', 'pnpm build', 'pnpm run build'],
              output: `> catalogo@0.0.0 build
> tsc -b && vite build

vite v6.0.7 building for production...
✓ 413 modules transformed.
dist/index.html                        0.46 kB │ gzip:  0.30 kB
dist/assets/index-Bx81kd2Q.css         4.12 kB │ gzip:  1.38 kB
dist/assets/Relatorios-CkL2p9Qe.js   318.70 kB │ gzip: 97.15 kB
dist/assets/index-Ha7mQ2xT.js        294.03 kB │ gzip: 92.40 kB
✓ built in 3.05s`,
              hint: 'O mesmo comando do primeiro passo.',
            },
            {
              goal: 'Agora a página inicial baixa metade do JavaScript, e os gráficos só vêm quando alguém abre os relatórios. Sirva a pasta `dist/` localmente para testar a versão de produção.',
              command: ['npm run preview', 'yarn preview', 'pnpm preview', 'npx vite preview'],
              output: `> catalogo@0.0.0 preview
> vite preview

  ➜  Local:   http://localhost:4173/
  ➜  Network: use --host to expose`,
              hint: 'O script do Vite para isso se chama `preview`.',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Você importou só a função `format` de uma biblioteca de datas que tem mais de 200 funções. Com tree-shaking, o que vai para o build?',
          options: [
            {
              text: 'A biblioteca inteira, porque ela está no `package.json`',
              feedback:
                'Estar instalada não basta para entrar no build. O empacotador segue os `import`s a partir do seu código e só leva o que é alcançado.',
            },
            {
              text: 'A função `format` e o que ela usa internamente',
              correct: true,
              feedback:
                'Isso. O resto é sacudido para fora. Funciona melhor com bibliotecas que usam `import`/`export` modernos; algumas antigas não permitem esse corte.',
            },
            {
              text: 'Nada: bibliotecas de `node_modules` são baixadas pelo navegador direto do npm',
              feedback:
                'O navegador da pessoa usuária nunca acessa o npm. Tudo o que o app usa precisa estar dentro dos arquivos de `dist/`.',
            },
          ],
        },
      ],
    },
    {
      id: 'code-splitting',
      title: 'Dividir para carregar só o necessário',
      blocks: [
        {
          type: 'text',
          text: 'Mesmo minificado, um app grande pode ter muito JavaScript. Mas quem abre a página inicial não precisa do código dos relatórios, do painel de administração ou do checkout. **Code splitting** (divisão de código) é separar essas partes em chunks que só são baixados quando alguém precisa deles.',
        },
        {
          type: 'code',
          language: 'jsx',
          caption:
            'lazy pede o componente só quando ele vai aparecer; Suspense mostra algo enquanto isso',
          code: `import { lazy, Suspense } from 'react';

const Relatorios = lazy(() => import('./pages/Relatorios'));

function App() {
  return (
    <Suspense fallback={<p>Carregando relatório...</p>}>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/relatorios" element={<Relatorios />} />
      </Routes>
    </Suspense>
  );
}`,
        },
        {
          type: 'terms',
          items: [
            {
              term: 'import() dinâmico',
              text: "Diferente do `import` no topo do arquivo, `import('./arquivo')` é uma função que devolve uma Promise. O Vite vê isso e cria um chunk separado.",
            },
            {
              term: 'lazy',
              text: 'Transforma esse `import()` num componente. Na primeira vez que ele precisa aparecer, o React pede o arquivo e espera.',
            },
            {
              term: 'Suspense',
              text: 'Uma moldura que mostra o `fallback` (um aviso ou esqueleto) enquanto algum componente lazy dentro dela ainda está chegando.',
            },
          ],
        },
        {
          type: 'flow',
          caption: 'A página de relatórios chegando sob demanda',
          actors: ['Navegador', 'Servidor'],
          steps: [
            {
              from: 0,
              to: 1,
              label: 'GET index-Ha7m.js',
              text: 'A pessoa abre a página inicial. Só o chunk principal é baixado.',
            },
            {
              from: 0,
              to: 0,
              label: 'Clique em Relatórios',
              text: 'O componente lazy precisa aparecer pela primeira vez. O Suspense mostra o `fallback`.',
            },
            {
              from: 0,
              to: 1,
              label: 'GET Relatorios-CkL2.js',
              text: 'O navegador pede o chunk dos relatórios, com a biblioteca de gráficos.',
            },
            {
              from: 1,
              to: 0,
              label: '200 OK',
              text: 'O arquivo chega, o React troca o aviso pelo componente. Na próxima visita a essa página, ele já está carregado.',
              tone: 'ok',
            },
          ],
        },
        {
          type: 'playground',
          title: 'Relatório sob demanda',
          framework: 'react',
          task: 'Aqui o `import()` é simulado com uma espera de 0,8 segundo. Clique em **Abrir relatório** e veja o erro no console: um componente lazy precisa de um `Suspense` acima dele. Envolva o `<Relatorio />` num `Suspense` com um fallback que diga “Carregando relatório...”.',
          html: '<div id="root"></div>',
          css: `body { font-family: system-ui, sans-serif; margin: 16px; }
button { padding: 6px 12px; cursor: pointer; }
.relatorio { margin-top: 12px; padding: 12px; background: #e0f2fe; border-radius: 8px; }`,
          js: `const { useState, lazy, Suspense } = React;

function RelatorioDeVendas() {
  return (
    <section id="relatorio" className="relatorio">
      <h2>Vendas da semana</h2>
      <p>Pão de queijo: 312 · Café coado: 198 · Bolo de fubá: 87</p>
    </section>
  );
}

// simula import('./Relatorio'): o arquivo leva 0,8 s para chegar
const Relatorio = lazy(
  () => new Promise((resolve) => setTimeout(() => resolve({ default: RelatorioDeVendas }), 800)),
);

function App() {
  const [aberto, setAberto] = useState(false);
  return (
    <main>
      <h1>Painel da padaria</h1>
      <button onClick={() => setAberto(true)}>Abrir relatório</button>
      {aberto && <Relatorio />}
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
          checks: [
            {
              label: 'Logo após o clique aparece “Carregando relatório...”',
              test: verificar(`const abrir = botao('Abrir relatório');
if (!abrir) return false;
abrir.click();
await esperar(60);
return /carregando/i.test(texto(document.body)) && !document.querySelector('#relatorio');`),
            },
            {
              label: 'Depois de carregar, o relatório de vendas aparece',
              test: verificar(`const abrir = botao('Abrir relatório');
if (abrir) abrir.click();
await esperar(1300);
return !!document.querySelector('#relatorio') && !/carregando/i.test(texto(document.body));`),
            },
          ],
          solution: {
            js: `const { useState, lazy, Suspense } = React;

function RelatorioDeVendas() {
  return (
    <section id="relatorio" className="relatorio">
      <h2>Vendas da semana</h2>
      <p>Pão de queijo: 312 · Café coado: 198 · Bolo de fubá: 87</p>
    </section>
  );
}

// simula import('./Relatorio'): o arquivo leva 0,8 s para chegar
const Relatorio = lazy(
  () => new Promise((resolve) => setTimeout(() => resolve({ default: RelatorioDeVendas }), 800)),
);

function App() {
  const [aberto, setAberto] = useState(false);
  return (
    <main>
      <h1>Painel da padaria</h1>
      <button onClick={() => setAberto(true)}>Abrir relatório</button>
      {aberto && (
        <Suspense fallback={<p>Carregando relatório...</p>}>
          <Relatorio />
        </Suspense>
      )}
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
          },
        },
        {
          type: 'quiz',
          question: 'Qual destas partes de um app de delivery é a melhor candidata a `lazy`?',
          options: [
            {
              text: 'O botão de busca que aparece no topo de todas as telas',
              feedback:
                'Ele aparece logo de cara para todo mundo. Deixar lazy só adicionaria uma espera extra no primeiro carregamento.',
            },
            {
              text: 'A página de histórico de pedidos, com gráficos de gastos do mês',
              correct: true,
              feedback:
                'Isso. É uma página que poucas pessoas abrem, e com bibliotecas pesadas. Dividir por **rota** é o ponto de partida mais seguro para code splitting.',
            },
            {
              text: 'Cada pequeno componente do app, como botões e ícones',
              feedback:
                'Muitos chunks minúsculos geram muitos pedidos e esperas em cascata. Divida em blocos grandes que o usuário só às vezes visita, como rotas e modais pesados.',
            },
          ],
        },
      ],
    },
    {
      id: 'variaveis-de-ambiente',
      title: 'Variáveis de ambiente e a fronteira com o servidor',
      blocks: [
        {
          type: 'text',
          text: 'O mesmo código roda em lugares diferentes: no seu computador, apontando para uma API de teste, e em produção, apontando para a API real. **Variáveis de ambiente** guardam essas diferenças fora do código. Você já viu na aula de ferramentas que o Vite só entrega ao app as que começam com `VITE_`.',
        },
        {
          type: 'codeTabs',
          caption: 'Um valor por ambiente, lido do mesmo jeito no código',
          tabs: [
            {
              label: '.env.development',
              language: 'bash',
              code: 'VITE_API_URL=http://localhost:3000',
            },
            {
              label: '.env.production',
              language: 'bash',
              code: 'VITE_API_URL=https://api.padaria.com.br',
            },
            {
              label: 'api.js',
              language: 'js',
              code: `const base = import.meta.env.VITE_API_URL;

if (import.meta.env.DEV) {
  console.log('Modo desenvolvimento, API em', base);
}

export function buscarProdutos() {
  return fetch(\`\${base}/produtos\`).then((r) => r.json());
}`,
            },
          ],
        },
        {
          type: 'text',
          text: 'No `npm run dev`, vale o `.env.development`; no `npm run build`, o `.env.production`. O Vite **escreve o valor dentro do JavaScript** gerado. Por isso, mudar o `.env` depois do build não muda nada: é preciso gerar o build de novo.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Nunca um segredo no frontend',
          text: 'Tudo o que vai para `dist/` é baixado por qualquer pessoa e pode ser lido no DevTools. Chave de pagamento, senha de banco e token de API privada ficam no **servidor**, que faz a chamada sensível em nome do site. Essa é a fronteira entre cliente e servidor: o navegador é território público.',
        },
        {
          type: 'classify',
          prompt: 'Este valor pode ir para uma variável `VITE_` ou precisa ficar no servidor?',
          buckets: ['Pode ser VITE_ (público)', 'Só no servidor (segredo)'],
          items: [
            { text: 'Endereço da API pública da loja', bucket: 0 },
            { text: 'ID de medição do Google Analytics', bucket: 0 },
            { text: 'Número da versão do app', bucket: 0 },
            { text: 'Chave secreta do gateway de pagamento', bucket: 1 },
            { text: 'Senha do banco de dados', bucket: 1 },
            { text: 'Token pessoal do GitHub para criar issues', bucket: 1 },
          ],
          explanation:
            'A pergunta é: se um estranho copiar o valor, ele consegue gastar seu dinheiro ou agir em seu nome? Se sim, é segredo, e o prefixo `VITE_` o tornaria público na hora.',
        },
        {
          type: 'quiz',
          question:
            'No `.env` está `API_URL=https://api.loja.com.br`, mas `import.meta.env.API_URL` aparece como `undefined` no app. Por quê?',
          options: [
            {
              text: 'Falta o prefixo `VITE_`, então o Vite não expõe a variável ao código',
              correct: true,
              feedback:
                'Isso. É uma proteção: só o que você marcou explicitamente como público chega ao navegador. Renomeie para `VITE_API_URL` e reinicie o servidor.',
            },
            {
              text: 'Variáveis de ambiente só funcionam no backend, nunca no React',
              feedback:
                'Elas funcionam no React com Vite, desde que comecem com `VITE_`. A diferença é que, no frontend, viram texto fixo e público no build.',
            },
            {
              text: 'O endereço precisa estar entre aspas no `.env`',
              feedback:
                'Aspas são opcionais para valores sem espaços. O problema aqui é o nome da variável, não o formato do valor.',
            },
          ],
        },
      ],
    },
    {
      id: 'medir-antes',
      title: 'Meça antes de otimizar',
      blocks: [
        {
          type: 'analogy',
          title: 'O médico pede exame antes de receitar',
          text: 'Uma médica no posto de saúde não receita remédio para todo mundo que diz estar cansado. Ela pede um exame, descobre a causa e trata aquilo. Otimizar sem medir é tomar remédio por conta própria: às vezes não resolve e ainda traz efeitos colaterais, como código mais difícil de manter.',
        },
        {
          type: 'text',
          text: 'Para o carregamento, você já conhece o **Lighthouse** e as métricas da aula de desempenho e segurança. Para lentidão **depois** que a página abriu, como digitar e a tela engasgar, a ferramenta é o **Profiler** do React DevTools, uma extensão do navegador.',
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Instale o React DevTools',
              text: 'Procure “React Developer Tools” na loja de extensões do Chrome, Edge ou Firefox. No DevTools (`F12`) aparecem duas abas novas: **Components** e **Profiler**.',
            },
            {
              title: 'Ligue o destaque de renderizações',
              text: 'Na engrenagem do Profiler, marque “Highlight updates when components render”. Cada componente que renderiza pisca com uma borda colorida.',
            },
            {
              title: 'Grave a interação lenta',
              text: 'Na aba Profiler, clique no círculo para gravar, faça a ação que parece lenta (digitar, filtrar, abrir um menu) e clique de novo para parar.',
            },
            {
              title: 'Leia o gráfico',
              text: 'Cada barra é um componente. Cinza quer dizer que não renderizou; amarelo e laranja, que demorou mais. Clique numa barra para ver quanto tempo levou e por que renderizou.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Meça a versão certa',
          text: 'O modo de desenvolvimento do React faz verificações extras e é bem mais lento. Rode o Lighthouse em cima de `npm run build` seguido de `npm run preview`, e no DevTools simule um celular com rede e processador mais lentos. É a experiência do seu público, não a do seu notebook.',
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem um ciclo honesto de otimização.',
          items: [
            'Reproduzir a lentidão e medir, anotando o número',
            'Usar o Profiler ou o Lighthouse para achar a causa',
            'Mudar uma coisa só, focada na causa',
            'Medir de novo nas mesmas condições',
            'Manter a mudança se o número melhorou, desfazer se não',
          ],
          explanation:
            'Mudar uma coisa de cada vez é o que permite saber o que funcionou. E o número antes e depois é a sua evidência para a pessoa que revisa o código.',
        },
      ],
    },
    {
      id: 'memo',
      title: 'memo, useMemo e useCallback: quando importam',
      blocks: [
        {
          type: 'text',
          text: 'Quando o estado de um componente muda, o React renderiza esse componente **e todos os filhos dele**, mesmo os que receberam as mesmas props. Quase sempre isso é rápido e está tudo bem. Mas, quando um filho é caro de desenhar, vale pedir ao React que pule o que não mudou.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'memo',
              text: 'Envolve um componente: `const Item = memo(function Item(props) {...})`. Se as props forem iguais às da última vez, o React reaproveita o resultado e não renderiza.',
            },
            {
              term: 'useCallback',
              text: 'Guarda a **mesma função** entre renderizações: `useCallback(fn, [dependencias])`. Sem ele, cada renderização cria uma função nova, e para o `memo` uma função nova é uma prop diferente.',
            },
            {
              term: 'useMemo',
              text: 'Guarda o **resultado de um cálculo**: `useMemo(() => filtrar(lista, busca), [lista, busca])`. Só recalcula quando uma dependência muda.',
            },
          ],
        },
        {
          type: 'playground',
          title: 'Contando renderizações',
          framework: 'react',
          task: 'Digite na anotação e veja no console: cada letra renderiza os cinco itens de novo, embora nada neles tenha mudado. Envolva `Item` em `memo`. Repare que ainda renderiza: a função `favoritar` nasce nova a cada vez. Estabilize-a com `useCallback`.',
          html: '<div id="root"></div>',
          css: `body { font-family: system-ui, sans-serif; margin: 16px; }
input { padding: 6px; width: 220px; }
li { margin: 4px 0; }
button { margin-left: 8px; cursor: pointer; }`,
          js: `const { useState, memo, useCallback } = React;

window.renderizacoes = 0;

const produtos = ['Arroz', 'Feijão', 'Farinha', 'Café', 'Açúcar'];

function Item({ nome, onFavoritar }) {
  window.renderizacoes++;
  console.log('renderizou', nome);
  return (
    <li>
      {nome}
      <button onClick={() => onFavoritar(nome)}>Favoritar {nome}</button>
    </li>
  );
}

function Lista() {
  const [anotacao, setAnotacao] = useState('');
  const [favorito, setFavorito] = useState('nenhum');

  function favoritar(nome) {
    setFavorito(nome);
  }

  return (
    <div>
      <input
        aria-label="Anotação"
        placeholder="Digite uma anotação"
        value={anotacao}
        onChange={(e) => setAnotacao(e.target.value)}
      />
      <p>Favorito: <strong id="favorito">{favorito}</strong></p>
      <ul>
        {produtos.map((p) => (
          <Item key={p} nome={p} onFavoritar={favoritar} />
        ))}
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Lista />);`,
          checks: [
            {
              label: 'Digitar na anotação não renderiza os itens de novo',
              test: verificar(`const campo = document.querySelector('input');
if (!campo || !document.querySelector('li')) return false;
const antes = window.renderizacoes;
digitar(campo, campo.value + 'a');
await esperar(50);
digitar(campo, campo.value + 'b');
await esperar(50);
return window.renderizacoes === antes;`),
            },
            {
              label: '**Favoritar Café** continua mostrando “Café” como favorito',
              test: verificar(`const b = botao('Favoritar Café');
if (!b) return false;
b.click();
await esperar(50);
return texto(document.querySelector('#favorito')) === 'Café';`),
            },
          ],
          solution: {
            js: `const { useState, memo, useCallback } = React;

window.renderizacoes = 0;

const produtos = ['Arroz', 'Feijão', 'Farinha', 'Café', 'Açúcar'];

const Item = memo(function Item({ nome, onFavoritar }) {
  window.renderizacoes++;
  console.log('renderizou', nome);
  return (
    <li>
      {nome}
      <button onClick={() => onFavoritar(nome)}>Favoritar {nome}</button>
    </li>
  );
});

function Lista() {
  const [anotacao, setAnotacao] = useState('');
  const [favorito, setFavorito] = useState('nenhum');

  const favoritar = useCallback((nome) => {
    setFavorito(nome);
  }, []);

  return (
    <div>
      <input
        aria-label="Anotação"
        placeholder="Digite uma anotação"
        value={anotacao}
        onChange={(e) => setAnotacao(e.target.value)}
      />
      <p>Favorito: <strong id="favorito">{favorito}</strong></p>
      <ul>
        {produtos.map((p) => (
          <Item key={p} nome={p} onFavoritar={favoritar} />
        ))}
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Lista />);`,
          },
        },
        {
          type: 'reveal',
          question:
            'Você eliminou dez renderizações por letra digitada. Esse app ficou perceptivelmente mais rápido?',
          answer:
            'Provavelmente não. Cinco itens simples renderizam em frações de milissegundo; ninguém nota a diferença. O exercício mostra o **mecanismo**. Na vida real, você só aplica `memo` quando o Profiler mostra um componente caro renderizando à toa, como uma tabela com centenas de linhas ou um gráfico.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns com memoização',
          text: 'Espalhar `memo`, `useMemo` e `useCallback` em tudo “por garantia”: deixa o código mais difícil de ler e cada um tem seu próprio custo de comparação. Esquecer uma dependência no array: o valor guardado fica velho e aparece um bug estranho. E usar `memo` num filho mas passar um objeto ou função criado na hora, que anula o efeito.',
        },
        {
          type: 'quiz',
          question: 'Em qual situação `useMemo` provavelmente faz diferença de verdade?',
          options: [
            {
              text: 'Calcular `preco * quantidade` para mostrar o subtotal',
              feedback:
                'Uma multiplicação custa praticamente nada. Guardar o resultado custa mais do que refazer a conta. Deixe o cálculo direto.',
            },
            {
              text: 'Filtrar e ordenar 20 mil linhas de pedidos a cada tecla digitada em outro campo',
              correct: true,
              feedback:
                'Isso. É um cálculo caro que só precisa ser refeito quando a lista ou o filtro mudam. Antes de aplicar, confirme no Profiler que esse é mesmo o gargalo.',
            },
            {
              text: 'Em todo componente, para garantir que o app nunca fique lento',
              feedback:
                'Memoização tem custo: memória, comparação das dependências e código mais complexo. Sem uma medição apontando o problema, ela costuma não ajudar.',
            },
          ],
        },
      ],
    },
    {
      id: 'listas-gigantes',
      title: 'Listas gigantes: renderize só o que aparece',
      blocks: [
        {
          type: 'text',
          text: 'Uma tabela com 10 mil pedidos cria 10 mil linhas no DOM, mesmo que a tela mostre só 15. O navegador gasta memória e tempo desenhando o que ninguém vê. `memo` não resolve isso: o problema é a quantidade, não as renderizações repetidas.',
        },
        {
          type: 'analogy',
          title: 'A janela do ônibus',
          text: 'Da janela do ônibus você vê só um trecho da avenida por vez, mas tem a sensação da rua inteira passando. **Virtualização** de lista faz isso: só as linhas visíveis existem no DOM. Conforme você rola, as que saem da janela são reaproveitadas para mostrar as que entram.',
        },
        {
          type: 'code',
          language: 'js',
          caption: 'A ideia por trás da virtualização, em poucas linhas',
          code: `const alturaLinha = 40;        // cada linha tem 40px
const alturaJanela = 600;      // a área visível tem 600px
const primeira = Math.floor(scrollTop / alturaLinha);
const quantas = Math.ceil(alturaJanela / alturaLinha) + 1;
const visiveis = pedidos.slice(primeira, primeira + quantas);
// renderiza só "visiveis" (16 linhas), num contêiner com a altura total da lista`,
        },
        {
          type: 'fill',
          prompt:
            'Cada linha tem 50px e a pessoa rolou 1000px. Complete o cálculo da primeira linha visível e do pedaço da lista que vai para a tela.',
          language: 'js',
          template: `const primeira = Math.floor(1000 / 50); // [[20]]
const visiveis = pedidos.[[slice]](primeira, primeira + 13);`,
          explanation:
            '1000 dividido por 50 dá 20: as linhas de 0 a 19 já passaram pela janela. `slice` recorta só o trecho visível. Na prática, bibliotecas como TanStack Virtual e react-window fazem essas contas, incluindo linhas de alturas diferentes.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Antes de virtualizar, pergunte',
          text: 'A pessoa precisa mesmo rolar 10 mil linhas? Paginação, filtros e busca no servidor costumam ser mais simples e ajudam também quem usa leitor de tela. A linha mais rápida é a que nem foi enviada.',
        },
        {
          type: 'quiz',
          question:
            'Uma tela de extrato com 8 mil transações do Pix trava ao abrir. O Profiler mostra que o tempo vai todo para criar as linhas na primeira renderização. Qual o melhor primeiro passo?',
          options: [
            {
              text: 'Envolver cada linha em `memo`',
              feedback:
                '`memo` evita renderizações **repetidas**. Na primeira renderização, todas as 8 mil linhas precisam ser criadas de qualquer jeito.',
            },
            {
              text: 'Mostrar só as linhas visíveis, com paginação ou virtualização',
              correct: true,
              feedback:
                'Isso. O problema é quantidade de DOM. Reduzir o que é desenhado ataca a causa que a medição apontou.',
            },
            {
              text: 'Trocar todas as funções por `useCallback`',
              feedback:
                'Funções estáveis só ajudam quando combinadas com `memo` e renderizações repetidas. Não diminuem as 8 mil linhas da primeira vez.',
            },
          ],
        },
      ],
    },
  ],
  recap: [
    'O build junta os arquivos em chunks, minifica, remove o que não é usado (tree-shaking) e coloca hash nos nomes para o cache não servir versões velhas.',
    '`lazy` com `import()` cria chunks separados, e `Suspense` mostra um aviso enquanto eles chegam; dividir por rota é o ponto de partida.',
    'Variáveis `VITE_` são gravadas no JavaScript e ficam públicas: segredos ficam no servidor.',
    'Meça antes e depois com o Profiler e o Lighthouse, em versão de produção, mudando uma coisa por vez.',
    '`memo`, `useCallback` e `useMemo` só valem quando a medição mostra renderização ou cálculo caro; listas enormes pedem paginação ou virtualização.',
  ],
  cards: [
    {
      id: 'tree-shaking',
      front: 'O que é tree-shaking?',
      back: 'A etapa do build que remove código exportado mas nunca importado, para ele não ir ao navegador.',
    },
    {
      id: 'lazy-suspense',
      front: 'Para que servem `lazy` e `Suspense`?',
      back: '`lazy` carrega um componente só quando ele vai aparecer; `Suspense` mostra um fallback enquanto ele chega.',
    },
    {
      id: 'vite-prefixo',
      front: 'Por que uma variável sem `VITE_` aparece como `undefined` no app?',
      back: 'O Vite só expõe ao código do navegador as variáveis com prefixo `VITE_`, de propósito.',
    },
    {
      id: 'gzip-coluna',
      front: 'No relatório do `vite build`, o que significa a coluna `gzip`?',
      back: 'O tamanho comprimido do arquivo, que é o que de fato trafega pela rede.',
    },
    {
      id: 'memo-callback',
      front: 'Por que `memo` sozinho não impede a renderização quando o filho recebe uma função?',
      back: 'Cada renderização do pai cria uma função nova, e o `memo` vê uma prop diferente. `useCallback` mantém a mesma função.',
    },
    {
      id: 'virtualizacao',
      front: 'O que a virtualização de lista faz?',
      back: 'Mantém no DOM só as linhas visíveis, trocando-as conforme a pessoa rola.',
    },
    {
      id: 'medir-producao',
      front: 'Por que medir desempenho na versão de produção?',
      back: 'O modo de desenvolvimento do React faz verificações extras e é mais lento, então os números enganam.',
    },
  ],
  mission: {
    title: 'Prove uma melhoria com números',
    text: 'Publique a versão de produção do seu app React com um build reproduzível e documente uma melhoria de desempenho com evidência antes e depois.',
    steps: [
      'Crie um workflow de CI que rode `npm ci`, os testes e `npm run build` a cada push',
      'Anote o tamanho dos chunks do build e a nota do Lighthouse da página principal, em modo celular e sobre `npm run preview`',
      'Coloque uma rota pesada em `lazy` com `Suspense` e um fallback acessível',
      'Gere o build e rode o Lighthouse de novo, nas mesmas condições',
      'Registre no README os números antes e depois, e explique por que a mudança valeu ou não valeu a pena',
    ],
  },
  sources: [
    {
      title: 'React: lazy',
      url: 'https://pt-br.react.dev/reference/react/lazy',
    },
    {
      title: 'React: memo',
      url: 'https://pt-br.react.dev/reference/react/memo',
    },
    {
      title: 'Vite: Construindo para produção',
      url: 'https://vite.dev/guide/build',
    },
    {
      title: 'Vite: Variáveis de ambiente e modos',
      url: 'https://vite.dev/guide/env-and-mode',
    },
  ],
};
