import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Na aula de DOM você mudou a página na mão: achar o elemento, trocar o texto, lembrar do contador. Com três botões isso funciona; com uma loja inteira, alguém sempre esquece de atualizar um pedaço. React, Vue e Angular existem para resolver exatamente esse problema, e os três usam a mesma ideia. Aprendendo a ideia, você aprende os três pela metade.',
  sections: [
    {
      id: 'interface-segue-estado',
      title: 'A tela segue os dados',
      blocks: [
        {
          type: 'text',
          text: 'Imagine um catálogo com um botão de favoritar em cada produto, um contador de favoritos no topo e uma lista “Seus favoritos” no rodapé. Um clique precisa mudar **três** lugares da tela. Veja como isso fica escrito à mão.',
        },
        {
          type: 'code',
          language: 'js',
          caption: 'Atualizando a tela na mão: cada mudança é um lugar a mais para lembrar',
          code: `function favoritar(id) {
  favoritos.push(id);
  const botao = document.querySelector('#produto-' + id + ' button');
  botao.textContent = 'Desfavoritar';
  document.querySelector('#contador').textContent = favoritos.length;
  const item = document.createElement('li');
  item.textContent = buscarNome(id);
  document.querySelector('#favoritos').append(item);
}

function desfavoritar(id) {
  // Agora tudo ao contrário: tirar do array, trocar o botão,
  // atualizar o contador, achar e remover o <li> certo...
}`,
        },
        {
          type: 'text',
          text: 'O problema não é a dificuldade de cada linha. É que os dados (o array `favoritos`) e a tela podem **discordar**. Basta esquecer o contador em `desfavoritar` para a página mostrar 3 favoritos quando só existem 2.',
        },
        {
          type: 'analogy',
          title: 'O placar do estádio',
          text: 'Ninguém sobe no placar para pintar o número do gol. A mesa registra “Brasil 2 x 1” e o placar **mostra o que está registrado**. Se o placar quebrar e for religado, ele exibe o resultado certo, porque a verdade está no registro, não no painel.',
        },
        {
          type: 'text',
          text: 'Os frameworks trazem essa ideia para o código. Você guarda os dados que mudam em um lugar, o **estado**, e escreve uma função que diz como a tela fica para aquele estado. É isso que se resume como **interface = função(estado)**.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Estado',
              text: 'Os dados que podem mudar enquanto a página está aberta: o que foi digitado na busca, quais produtos são favoritos, se o menu está aberto.',
            },
            {
              term: 'Renderizar',
              text: 'Calcular como a tela deve ficar a partir do estado atual. Em vez de editar a tela, você muda o estado e pede uma nova renderização.',
            },
            {
              term: 'Framework',
              text: 'Uma base de código pronta que organiza seu projeto e faz o trabalho repetitivo. Aqui, o trabalho repetitivo é manter o DOM igual ao estado.',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'O time decide mostrar um selo “Favorito” no cartão de cada produto favoritado. Usando a ideia de interface = função(estado), o que você precisa mudar?',
          options: [
            {
              text: 'Só a parte que desenha o cartão: ela passa a mostrar o selo quando o produto está nos favoritos',
              correct: true,
              feedback:
                'Isso. O estado já sabe quem é favorito. Você só ensina a função de desenho a mostrar mais uma coisa, e ela vale para favoritar, desfavoritar e carregar a página.',
            },
            {
              text: 'As funções `favoritar` e `desfavoritar`, para criar e remover o selo em cada clique',
              feedback:
                'Esse é o jeito manual, e é ele que gera os bugs de tela desatualizada. Com interface = função(estado), as ações só mudam dados.',
            },
            {
              text: 'Criar um novo array só para guardar quais cartões têm selo',
              feedback:
                'Seria guardar a mesma informação duas vezes. Quem tem selo é exatamente quem está em `favoritos`: dá para calcular.',
            },
          ],
        },
      ],
    },
    {
      id: 'pecas-de-lego',
      title: 'Componentes: peças de LEGO',
      blocks: [
        {
          type: 'analogy',
          title: 'Uma tela montada com peças',
          text: 'Com LEGO você não esculpe um castelo em um bloco só. Você usa peças pequenas, cada uma com um formato, e repete as mesmas peças várias vezes. Se uma quebra, troca só ela.',
        },
        {
          type: 'text',
          text: 'Um **componente** é uma peça da interface com HTML, estilo e comportamento juntos, que você pode reaproveitar. Em código, quase sempre é uma função ou classe que recebe dados e devolve um pedaço de tela.',
        },
        {
          type: 'text',
          text: 'Uma tela de catálogo pode virar: `PaginaCatalogo` (a tela toda), `Cabecalho`, `BarraDeBusca`, `ListaDeProdutos` e `CartaoProduto`. O cartão aparece uma vez para cada produto: escreveu uma vez, usa vinte.',
        },
        {
          type: 'code',
          language: 'text',
          caption: 'A árvore de componentes do catálogo',
          code: `PaginaCatalogo
├── Cabecalho
├── BarraDeBusca
└── ListaDeProdutos
    ├── CartaoProduto
    ├── CartaoProduto
    └── CartaoProduto`,
        },
        {
          type: 'classify',
          prompt: 'Em qual componente cada pedaço da tela do catálogo deve ficar?',
          buckets: ['Cabecalho', 'BarraDeBusca', 'ListaDeProdutos', 'CartaoProduto'],
          items: [
            { text: 'Logo da loja', bucket: 0 },
            { text: 'Contador de favoritos no topo', bucket: 0 },
            { text: 'Campo de texto para buscar', bucket: 1 },
            { text: 'Botão “Limpar busca”', bucket: 1 },
            { text: 'Mensagem “Nenhum produto encontrado”', bucket: 2 },
            { text: 'Foto, nome e preço de um produto', bucket: 3 },
            { text: 'Botão de favoritar de um produto', bucket: 3 },
          ],
          explanation:
            'A mensagem de lista vazia é da lista, porque só ela sabe se sobrou algum produto. Tudo o que se repete por produto vai para o cartão. Não existe divisão única correta, mas cada peça deve ter um motivo claro para existir.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Quando criar um componente novo',
          text: 'Três sinais: o pedaço **se repete**, tem uma **responsabilidade** que dá para dizer numa frase, ou o arquivo ficou grande demais para ler de uma vez. Começar com poucos componentes e dividir depois é normal.',
        },
      ],
    },
    {
      id: 'props-e-eventos',
      title: 'Props descem, eventos sobem',
      blocks: [
        {
          type: 'text',
          text: 'O cartão precisa saber o nome e o preço do produto, mas quem tem a lista de produtos é a página. Então o componente pai **passa os dados** para o filho. Esses dados se chamam **props** (de propriedades), e funcionam como os parâmetros de uma função.',
        },
        {
          type: 'anatomy',
          caption:
            'Um componente React escrito em JSX, um HTML que aceita JavaScript entre chaves.',
          language: 'jsx',
          parts: [
            { text: 'function ' },
            {
              text: 'CartaoProduto',
              label: 'Nome do componente',
              note: 'Começa com letra maiúscula. É assim que o React diferencia `<CartaoProduto />` (seu componente) de `<article>` (uma tag HTML).',
            },
            { text: '(' },
            {
              text: '{ nome, preco, onFavoritar }',
              label: 'Props',
              note: 'O objeto de props, já desmontado em variáveis. O pai decide os valores; o cartão só lê. Mudar uma prop dentro do filho é proibido.',
            },
            { text: ') {\n  return (\n    <article>\n      <h3>' },
            {
              text: '{nome}',
              label: 'Chaves',
              note: 'Entre chaves vai uma expressão JavaScript. Aqui, o valor da prop aparece na tela. Se o pai mandar outro nome, o título muda sozinho.',
            },
            { text: '</h3>\n      <p>R$ {preco}</p>\n      <button ' },
            {
              text: 'onClick={onFavoritar}',
              label: 'Evento que sobe',
              note: 'O cartão não sabe o que é favoritar. Ele recebe uma função do pai e a chama no clique. É assim que o filho **avisa** o pai.',
            },
            { text: '>Favoritar</button>\n    </article>\n  );\n}' },
          ],
        },
        {
          type: 'code',
          language: 'jsx',
          caption: 'O pai usa o cartão como se fosse uma tag e passa as props como atributos',
          code: `<CartaoProduto
  nome={produto.nome}
  preco={produto.preco}
  onFavoritar={() => alternarFavorito(produto.id)}
/>`,
        },
        {
          type: 'text',
          text: 'Repare na direção: **dados descem** do pai para o filho em props; **avisos sobem** do filho para o pai em eventos. O filho nunca mexe direto nos dados do pai. Ele pede, e o pai decide.',
        },
        {
          type: 'analogy',
          title: 'O garçom e a cozinha',
          text: 'O garçom (filho) recebe o cardápio do dia (props) e não inventa pratos. Quando a mesa pede algo, ele leva o pedido à cozinha (evento). Quem muda o estoque é a cozinha (pai).',
        },
        {
          type: 'fill',
          prompt: 'Complete o componente para mostrar o nome recebido e avisar o pai no clique.',
          language: 'jsx',
          template: `function BotaoFavorito({ nome, onAlternar }) {
  return (
    <button onClick={[[onAlternar|() => onAlternar()]]}>
      Favoritar {[[nome]]}
    </button>
  );
}`,
          explanation:
            'O componente só usa o que recebeu: `nome` para mostrar e `onAlternar` para avisar. Ele não sabe onde a lista de favoritos mora, e é por isso que dá para reaproveitá-lo em qualquer tela.',
        },
        {
          type: 'quiz',
          question:
            'Dentro de `CartaoProduto`, alguém escreve `preco = preco * 0.9` para mostrar um desconto. Qual o problema?',
          options: [
            {
              text: 'Props são do pai: o filho não deve alterá-las. O desconto deve ser calculado numa variável nova ou decidido pelo pai',
              correct: true,
              feedback:
                'Isso. Props são somente leitura. Calcule `const precoComDesconto = preco * 0.9` ou faça o pai mandar o preço já com desconto.',
            },
            {
              text: 'Nenhum, props funcionam como variáveis normais',
              feedback:
                'Em JavaScript puro até funciona, mas quebra o combinado dos frameworks: o pai deixaria de ser a fonte da verdade, e a próxima renderização desfaz sua mudança.',
            },
            {
              text: 'O problema é usar número; preço deveria ser texto',
              feedback:
                'O tipo não é a questão aqui. O erro é o filho modificar um dado que pertence ao pai.',
            },
          ],
        },
      ],
    },
    {
      id: 'onde-mora-o-estado',
      title: 'Onde cada estado deve morar',
      blocks: [
        {
          type: 'text',
          text: 'Todo estado pertence a algum componente. A regra prática: coloque o estado **no componente mais próximo que seja pai de todos que precisam dele**. Se só o cartão usa, fica no cartão. Se dois irmãos usam, sobe para o pai deles.',
        },
        {
          type: 'text',
          text: 'Esse movimento tem nome: **elevar o estado** (em inglês, lifting state up). O estado sobe, e o pai entrega o valor por props e as funções de mudança como eventos.',
        },
        {
          type: 'quiz',
          question:
            'A tela tem `BarraDeBusca` (onde se digita) e `ListaDeProdutos` (que filtra pelo texto). As duas são filhas de `PaginaCatalogo`. Onde deve ficar o texto da busca?',
          options: [
            {
              text: 'Em `PaginaCatalogo`, que passa o texto para os dois filhos',
              correct: true,
              feedback:
                'Exato. É o pai comum mais próximo. A barra recebe o texto e um evento para mudá-lo; a lista recebe o texto para filtrar.',
            },
            {
              text: 'Em `BarraDeBusca`, porque é lá que a pessoa digita',
              feedback:
                'Onde se digita não decide onde o estado mora. Se ficar na barra, a lista, que é irmã, não tem como ler o texto.',
            },
            {
              text: 'Em `ListaDeProdutos`, porque é ela que usa o texto para filtrar',
              feedback:
                'Aí a barra não conseguiria mudar o valor. Os dois precisam do estado, então ele fica no pai dos dois.',
            },
            {
              text: 'Uma cópia em cada um, sincronizadas a cada digitação',
              feedback:
                'Duas cópias do mesmo dado acabam discordando, que é o problema que queremos evitar. Uma fonte da verdade só.',
            },
          ],
        },
        {
          type: 'flow',
          caption: 'O ciclo de toda interação em um framework',
          actors: ['Pessoa', 'Componente', 'Framework', 'DOM'],
          steps: [
            {
              from: 0,
              to: 1,
              label: 'Clica em Favoritar',
              text: 'O clique chega ao componente pelo evento. Até aqui, nada mudou na tela.',
            },
            {
              from: 1,
              to: 1,
              label: 'Muda o estado',
              text: 'O tratador do evento só faz uma coisa: atualiza os dados, por exemplo acrescentando o id ao estado `favoritos`.',
            },
            {
              from: 1,
              to: 2,
              label: 'Estado mudou',
              text: 'O framework percebe a mudança. Cada um percebe de um jeito: React pela função `setFavoritos`, Vue e Angular pelo valor reativo.',
            },
            {
              from: 2,
              to: 2,
              label: 'Recalcula a interface',
              text: 'Ele roda de novo a função de desenho dos componentes afetados e compara o resultado novo com o anterior.',
            },
            {
              from: 2,
              to: 3,
              label: 'Aplica só a diferença',
              text: 'Só o que mudou vai para o DOM: o texto do botão, o número do contador, um item novo na lista.',
              tone: 'ok',
            },
            {
              from: 3,
              to: 0,
              label: 'Tela atualizada',
              text: 'A pessoa vê a tela coerente com os dados. Você não escreveu nenhum `querySelector`.',
              tone: 'ok',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erro comum: guardar o que dá para calcular',
          text: 'Se você tem `favoritos` no estado, **não** crie também `quantidadeDeFavoritos`. Calcule `favoritos.length` na renderização. Estado duplicado é a versão moderna do contador esquecido: um dia os dois discordam.',
        },
        {
          type: 'classify',
          prompt: 'O que precisa ser estado e o que deve ser calculado a partir dele?',
          buckets: ['Guarde como estado', 'Calcule na renderização'],
          items: [
            { text: 'Texto digitado na busca', bucket: 0 },
            { text: 'Ids dos produtos favoritados', bucket: 0 },
            { text: 'Se o menu do celular está aberto', bucket: 0 },
            { text: 'Quantidade de favoritos', bucket: 1 },
            { text: 'Produtos que combinam com a busca', bucket: 1 },
            { text: 'Se o botão “Limpar busca” aparece', bucket: 1 },
          ],
          explanation:
            'Estado é o mínimo que você não consegue descobrir de outro jeito. A quantidade vem de `favoritos.length`, a lista filtrada vem de produtos + busca, e o botão aparece quando a busca não está vazia. Esse cálculo é chamado de **estado derivado**.',
        },
        {
          type: 'reveal',
          question:
            'O contador de favoritos fica no `Cabecalho` e os botões ficam em cada `CartaoProduto`. Onde mora o estado `favoritos`?',
          answer:
            'Em `PaginaCatalogo`, o pai comum. Ela passa `favoritos.length` ao cabeçalho, passa a cada cartão se ele é favorito e entrega uma função `alternarFavorito` que os cartões chamam no clique.',
        },
      ],
    },
    {
      id: 'padrao-sem-framework',
      title: 'Construa o padrão com JavaScript puro',
      blocks: [
        {
          type: 'text',
          text: 'Antes de instalar qualquer framework, vale ver que a ideia cabe em JavaScript que você já conhece: um objeto `estado`, uma função `render()` que desenha a tela a partir dele, e tratadores que **mudam o estado e chamam `render()`**. O framework só faz isso de forma mais eficiente.',
        },
        {
          type: 'playground',
          title: 'Favoritos guiados pelo estado',
          task: 'Complete os quatro `TODO`. Em `alternarFavorito`, mude só o estado e chame `render()`. Em `render`, desenhe o contador e a lista de favoritos a partir de `estado.favoritos`. Não altere o DOM fora de `render`.',
          html: `<header>
  <h1>Lojinha</h1>
  <p>Favoritos: <strong id="contador">0</strong></p>
</header>
<ul id="lista"></ul>
<h2>Seus favoritos</h2>
<ul id="favoritos"></ul>`,
          css: `body { font-family: system-ui, sans-serif; margin: 16px; }
header { display: flex; justify-content: space-between; align-items: center; }
h1 { font-size: 1.25rem; margin: 0; }
h2 { font-size: 1rem; margin-top: 20px; }
ul { padding: 0; list-style: none; }
#lista li { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #ddd; }
button { cursor: pointer; padding: 4px 10px; }
button[aria-pressed="true"] { background: #ffe08a; }`,
          js: `const estado = {
  produtos: [
    { id: 1, nome: 'Caneca', preco: 39 },
    { id: 2, nome: 'Camiseta', preco: 59 },
    { id: 3, nome: 'Boné', preco: 45 },
  ],
  favoritos: [],
};

function alternarFavorito(id) {
  // TODO 1: se o id já está em estado.favoritos, tire; senão, adicione.
  // TODO 2: depois de mudar o estado, chame render().
}

function render() {
  const lista = document.querySelector('#lista');
  lista.replaceChildren();
  for (const produto of estado.produtos) {
    const favorito = estado.favoritos.includes(produto.id);
    const item = document.createElement('li');
    const nome = document.createElement('span');
    nome.textContent = produto.nome + ' (R$ ' + produto.preco + ')';
    const botao = document.createElement('button');
    botao.textContent = favorito ? 'Desfavoritar' : 'Favoritar';
    botao.setAttribute('aria-pressed', String(favorito));
    botao.addEventListener('click', () => alternarFavorito(produto.id));
    item.append(nome, botao);
    lista.append(item);
  }

  // TODO 3: mostre em #contador quantos favoritos existem.
  // TODO 4: preencha #favoritos com um <li> (nome do produto) para cada favorito.
}

render();`,
          checks: [
            {
              label: 'Clicar em **Favoritar** troca só aquele botão para **Desfavoritar**',
              test: `if (typeof estado !== 'object' || typeof render !== 'function') return false;
estado.favoritos = [];
render();
const antes = document.querySelectorAll('#lista button');
if (antes.length < 3) return false;
antes[0].click();
const depois = document.querySelectorAll('#lista button');
return depois[0].textContent.trim() === 'Desfavoritar' && depois[1].textContent.trim() === 'Favoritar';`,
            },
            {
              label: 'O contador acompanha os favoritos, subindo e descendo',
              test: `if (typeof estado !== 'object' || typeof render !== 'function') return false;
estado.favoritos = [];
render();
document.querySelectorAll('#lista button')[0].click();
document.querySelectorAll('#lista button')[2].click();
const contador = document.querySelector('#contador');
const dois = contador && contador.textContent.trim() === '2';
document.querySelectorAll('#lista button')[0].click();
const um = document.querySelector('#contador').textContent.trim() === '1';
return Boolean(dois && um);`,
            },
            {
              label: 'A lista **Seus favoritos** mostra exatamente os produtos favoritados',
              test: `if (typeof estado !== 'object' || typeof render !== 'function') return false;
estado.favoritos = [];
render();
document.querySelectorAll('#lista button')[1].click();
const itens = Array.from(document.querySelectorAll('#favoritos li'));
const mostrou = itens.length === 1 && itens[0].textContent.includes('Camiseta');
document.querySelectorAll('#lista button')[1].click();
const sumiu = document.querySelectorAll('#favoritos li').length === 0;
return mostrou && sumiu;`,
            },
          ],
          solution: {
            js: `const estado = {
  produtos: [
    { id: 1, nome: 'Caneca', preco: 39 },
    { id: 2, nome: 'Camiseta', preco: 59 },
    { id: 3, nome: 'Boné', preco: 45 },
  ],
  favoritos: [],
};

function alternarFavorito(id) {
  if (estado.favoritos.includes(id)) {
    estado.favoritos = estado.favoritos.filter((favoritoId) => favoritoId !== id);
  } else {
    estado.favoritos.push(id);
  }
  render();
}

function render() {
  const lista = document.querySelector('#lista');
  lista.replaceChildren();
  for (const produto of estado.produtos) {
    const favorito = estado.favoritos.includes(produto.id);
    const item = document.createElement('li');
    const nome = document.createElement('span');
    nome.textContent = produto.nome + ' (R$ ' + produto.preco + ')';
    const botao = document.createElement('button');
    botao.textContent = favorito ? 'Desfavoritar' : 'Favoritar';
    botao.setAttribute('aria-pressed', String(favorito));
    botao.addEventListener('click', () => alternarFavorito(produto.id));
    item.append(nome, botao);
    lista.append(item);
  }

  document.querySelector('#contador').textContent = String(estado.favoritos.length);

  const listaFavoritos = document.querySelector('#favoritos');
  listaFavoritos.replaceChildren();
  for (const produto of estado.produtos) {
    if (estado.favoritos.includes(produto.id)) {
      const item = document.createElement('li');
      item.textContent = produto.nome;
      listaFavoritos.append(item);
    }
  }
}

render();`,
          },
          height: 300,
        },
        {
          type: 'reveal',
          question:
            'Por que `render()` apaga e redesenha a lista inteira a cada clique? Isso não é desperdício?',
          answer:
            'Com três produtos, não faz diferença. Com mil, seria lento e perderia o foco do teclado no botão clicado. É justamente essa parte que os frameworks otimizam: eles comparam a tela nova com a anterior e mexem só no que mudou. A ideia que você escreveu continua a mesma.',
        },
      ],
    },
    {
      id: 'tres-frameworks',
      title: 'O mesmo componente em React, Vue e Angular',
      blocks: [
        {
          type: 'text',
          text: 'Agora compare o mesmo botão de favoritar nos três frameworks mais usados no Brasil. Ele recebe o nome do produto por prop e guarda se está favoritado em um estado local. Procure as mesmas três peças em cada aba: **prop**, **estado** e **evento**.',
        },
        {
          type: 'codeTabs',
          caption: 'Um botão de favoritar com uma prop e um estado',
          tabs: [
            {
              label: 'React',
              language: 'tsx',
              code: `import { useState } from 'react';

export function BotaoFavorito({ nome }: { nome: string }) {
  const [favorito, setFavorito] = useState(false);

  return (
    <button aria-pressed={favorito} onClick={() => setFavorito(!favorito)}>
      {favorito ? 'Desfavoritar' : 'Favoritar'} {nome}
    </button>
  );
}`,
            },
            {
              label: 'Vue',
              language: 'vue',
              code: `<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ nome: string }>();
const favorito = ref(false);
</script>

<template>
  <button :aria-pressed="favorito" @click="favorito = !favorito">
    {{ favorito ? 'Desfavoritar' : 'Favoritar' }} {{ nome }}
  </button>
</template>`,
            },
            {
              label: 'Angular',
              language: 'ts',
              code: `import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-botao-favorito',
  standalone: true,
  template: \`
    <button [attr.aria-pressed]="favorito()" (click)="alternar()">
      {{ favorito() ? 'Desfavoritar' : 'Favoritar' }} {{ nome() }}
    </button>
  \`,
})
export class BotaoFavoritoComponent {
  nome = input.required<string>();
  favorito = signal(false);

  alternar() {
    this.favorito.update((valor) => !valor);
  }
}`,
            },
          ],
        },
        {
          type: 'table',
          caption: 'As mesmas ideias, com nomes diferentes',
          head: ['Ideia', 'React', 'Vue', 'Angular'],
          rows: [
            ['Prop', 'parâmetro da função', '`defineProps`', '`input()`'],
            ['Estado', '`useState`', '`ref`', '`signal`'],
            ['Evento no HTML', '`onClick={...}`', '`@click="..."`', '`(click)="..."`'],
            ['Mostrar valor', '`{nome}`', '`{{ nome }}`', '`{{ nome() }}`'],
          ],
        },
        {
          type: 'quiz',
          question: 'O que `useState` no React, `ref` no Vue e `signal` no Angular têm em comum?',
          options: [
            {
              text: 'Guardam um valor e avisam o framework quando ele muda, para a tela ser recalculada',
              correct: true,
              feedback:
                'Isso. Os três são formas de criar estado que o framework observa. Mudou o valor pelo caminho certo, a interface acompanha.',
            },
            {
              text: 'Selecionam um elemento da página, como `querySelector`',
              feedback:
                'É o contrário: eles existem para você não precisar selecionar elementos. Você muda o dado, e o framework cuida do DOM.',
            },
            {
              text: 'Recebem dados do componente pai',
              feedback:
                'Isso são as props (`defineProps`, `input()`, parâmetros da função). Estado é do próprio componente.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erro comum: mudar o valor pelo caminho errado',
          text: 'No React, `favorito = true` não atualiza nada: use `setFavorito(true)`. No Angular, use `favorito.set()` ou `update()`. Em arrays no React, crie um array novo (`[...favoritos, id]`) em vez de dar `push`, senão o React não percebe a mudança.',
        },
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              label: 'Biblioteca',
              title: 'React',
              text: 'Componentes são funções JavaScript com JSX. Muito presente em vagas e com um ecossistema enorme, mas você escolhe rotas, formulários e outras peças à parte.',
            },
            {
              label: 'Framework progressivo',
              title: 'Vue',
              text: 'HTML, script e estilo no mesmo arquivo `.vue`, com uma sintaxe de template próxima do HTML. Costuma ser considerado o mais suave para começar.',
            },
            {
              label: 'Framework completo',
              title: 'Angular',
              text: 'Já vem com rotas, formulários, requisições e injeção de dependência, sempre em TypeScript. Comum em empresas grandes, bancos e sistemas corporativos.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Como escolher',
          text: 'Pesquise vagas de entrada na sua cidade ou nas remotas que você quer e conte qual aparece mais. Escolha **um** para o primeiro projeto e vá até o fim. Trocar depois é bem mais fácil do que parece, porque a ideia de componentes, props e estado é a mesma.',
        },
      ],
    },
  ],
  recap: [
    'Em vez de editar a tela na mão, você guarda os dados no **estado** e descreve a tela a partir dele: interface = função(estado).',
    'Um **componente** é uma peça reaproveitável de interface; uma tela é uma árvore de componentes.',
    '**Props** levam dados do pai para o filho e não são alteradas pelo filho; **eventos** levam avisos do filho para o pai.',
    'O estado mora no componente mais próximo que é pai de todos que o usam, e o que dá para calcular não vira estado.',
    'React (`useState`), Vue (`ref`) e Angular (`signal`) aplicam a mesma ideia com sintaxes diferentes.',
  ],
  cards: [
    {
      id: 'interface-funcao-estado',
      front: 'O que significa “interface = função(estado)”?',
      back: 'A tela é sempre calculada a partir dos dados atuais. Para mudar a tela, você muda o estado, não o DOM.',
    },
    {
      id: 'componente',
      front: 'O que é um componente?',
      back: 'Uma peça de interface reaproveitável que junta estrutura, estilo e comportamento, como `CartaoProduto`.',
    },
    {
      id: 'props',
      front: 'O que são props e quem pode alterá-las?',
      back: 'Dados que o pai passa ao filho. Só o pai muda; para o filho, são somente leitura.',
    },
    {
      id: 'eventos-sobem',
      front: 'Como um componente filho avisa o pai que algo aconteceu?',
      back: 'Chamando uma função recebida por prop, como `onFavoritar`, ou emitindo um evento. O pai decide o que fazer.',
    },
    {
      id: 'elevar-estado',
      front: 'Dois componentes irmãos precisam do mesmo dado. Onde ele mora?',
      back: 'No pai comum mais próximo, que passa o valor por props aos dois. Isso se chama elevar o estado.',
    },
    {
      id: 'estado-derivado',
      front: 'Por que não guardar `quantidadeDeFavoritos` no estado se já existe `favoritos`?',
      back: 'Porque dá para calcular com `favoritos.length`. Guardar duas vezes faz os valores discordarem um dia.',
    },
    {
      id: 'estado-nos-frameworks',
      front: 'Como se cria estado em React, Vue e Angular?',
      back: 'React: `useState`. Vue: `ref`. Angular: `signal`.',
    },
  ],
  mission: {
    title: 'Recrie uma tela do catálogo com componentes',
    text: 'Escolha um framework, crie um projeto com Vite (ou com o Angular CLI) e reconstrua a tela do catálogo desta aula. O objetivo não é ficar bonito, é ficar bem dividido e saber explicar cada decisão.',
    steps: [
      'Desenhe no papel a árvore de componentes antes de escrever código',
      'Crie `CartaoProduto` recebendo nome, preço e se é favorito por props',
      'Implemente busca e favoritos, com o estado no pai comum dos componentes que o usam',
      'Mostre a quantidade de favoritos calculada, sem guardá-la como estado separado',
      'Escreva no README onde cada estado mora e por quê',
    ],
  },
  sources: [
    { title: 'React: Pensando em React', url: 'https://react.dev/learn/thinking-in-react' },
    {
      title: 'React: Compartilhando estado entre componentes',
      url: 'https://react.dev/learn/sharing-state-between-components',
    },
    {
      title: 'Vue: Fundamentos de reatividade',
      url: 'https://vuejs.org/guide/essentials/reactivity-fundamentals.html',
    },
    { title: 'Angular: Signals', url: 'https://angular.dev/guide/signals' },
  ],
};
