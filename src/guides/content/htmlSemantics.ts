import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'por-que',
      title: 'Por que a tag certa importa',
      blocks: [
        {
          type: 'text',
          text: 'Uma `<div>` com cara de botão parece um botão, mas não **se comporta** como um. HTML semântico é usar o elemento que já tem o significado e o comportamento de que você precisa. O navegador entrega de graça foco pelo teclado, anúncio no leitor de tela, envio de formulário e leitura por buscadores.',
        },
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              label: 'Sem semântica',
              title: 'Parece, mas não é',
              text: 'Não recebe foco com Tab, não responde ao Enter e o leitor de tela anuncia só "texto".',
              code: '<div class="botao" onclick="salvar()">\n  Salvar\n</div>',
            },
            {
              label: 'Com semântica',
              title: 'Funciona sozinho',
              text: 'Foco, Enter, Espaço e o papel "botão" já vêm prontos. Basta estilizar.',
              code: '<button type="button" onclick="salvar()">\n  Salvar\n</button>',
            },
          ],
        },
      ],
    },
    {
      id: 'estrutura',
      title: 'A estrutura de uma página',
      blocks: [
        {
          type: 'code',
          language: 'html',
          caption: 'Os pontos de referência que leitores de tela listam para navegar',
          code: '<header>\n  <a href="/">Minha loja</a>\n  <nav aria-label="Principal">…</nav>\n</header>\n\n<main>\n  <h1>Tênis de corrida</h1>\n  <article>\n    <h2>Modelo Leve 3</h2>\n    <p>…</p>\n  </article>\n  <aside aria-label="Filtros">…</aside>\n</main>\n\n<footer>…</footer>',
        },
        {
          type: 'terms',
          items: [
            {
              term: '<main>',
              text: 'O conteúdo principal. **Um por página.** Permite pular direto para ele.',
            },
            {
              term: '<nav>',
              text: 'Um grupo de links de navegação. Com mais de um, dê um nome com `aria-label`.',
            },
            {
              term: '<article>',
              text: 'Algo que faz sentido sozinho: um post, um produto, um comentário.',
            },
            {
              term: '<section>',
              text: 'Uma parte temática com título. Sem título, prefira uma `<div>`.',
            },
            {
              term: '<h1> a <h6>',
              text: 'Os títulos formam o sumário da página. Não pule níveis para mudar o tamanho da fonte: isso é trabalho do CSS.',
            },
          ],
        },
      ],
    },
    {
      id: 'escolhas',
      title: 'Escolhas que confundem',
      blocks: [
        {
          type: 'table',
          caption: 'Qual elemento usar',
          head: ['Situação', 'Use', 'Evite'],
          rows: [
            [
              'Leva para outra página ou âncora',
              '`<a href="…">`',
              '`<button>` com `location.href`',
            ],
            ['Executa uma ação na página', '`<button type="button">`', '`<a href="#">` ou `<div>`'],
            ['Envia um formulário', '`<button type="submit">`', 'Clique tratado em `<div>`'],
            ['Rótulo de campo', '`<label for="id">`', 'Só o `placeholder`'],
            ['Lista de itens', '`<ul>` ou `<ol>` com `<li>`', 'Várias `<div>` seguidas'],
            ['Dados com linhas e colunas', '`<table>` com `<th>`', 'Grid de `<div>`'],
            ['Imagem que informa', '`<img alt="O que ela mostra">`', '`alt` com "imagem de"'],
            ['Imagem decorativa', '`<img alt="">`', 'Omitir o atributo `alt`'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'A primeira regra do ARIA',
          text: 'Se existe um elemento nativo com o comportamento que você quer, use-o. `role="button"` não adiciona teclado nem foco: você teria que programar tudo isso à mão.',
        },
      ],
    },
    {
      id: 'formularios',
      title: 'Formulários que ajudam',
      blocks: [
        {
          type: 'code',
          language: 'html',
          caption: 'Rótulo, dica, tipo certo e erro ligado ao campo',
          code: '<label for="email">E-mail</label>\n<p id="email-dica">Usaremos só para enviar o recibo.</p>\n<input\n  id="email"\n  type="email"\n  autocomplete="email"\n  aria-describedby="email-dica email-erro"\n  aria-invalid="true"\n  required\n/>\n<p id="email-erro">Informe um e-mail com @.</p>',
        },
        {
          type: 'list',
          items: [
            'O `type` certo (`email`, `tel`, `number`, `date`) abre o teclado adequado no celular.',
            '`autocomplete` permite que o navegador preencha nome, endereço e senha.',
            '`aria-describedby` faz o leitor de tela ler a dica e o erro junto com o campo.',
            'Agrupe opções relacionadas, como botões de rádio, em `<fieldset>` com `<legend>`.',
          ],
        },
      ],
    },
    {
      id: 'checklist',
      title: 'Revisão rápida',
      blocks: [
        {
          type: 'checklist',
          id: 'html',
          items: [
            'A página tem um `<h1>` e os títulos seguem a ordem, sem pular níveis.',
            'Existe um `<main>`, e a navegação está em `<nav>`.',
            'Tudo que é clicável é `<a>` ou `<button>`, e funciona com Tab e Enter.',
            'Todo campo tem um `<label>` visível.',
            'Imagens têm `alt` descritivo, ou `alt=""` quando são decorativas.',
            'O validador do W3C não aponta erros de estrutura.',
          ],
        },
      ],
    },
  ],
  sources: [
    {
      title: 'MDN: HTML semântico',
      url: 'https://developer.mozilla.org/pt-BR/docs/Glossary/Semantics',
    },
    {
      title: 'MDN: elementos HTML',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element',
    },
    {
      title: 'W3C: usando ARIA',
      url: 'https://www.w3.org/TR/using-aria/',
    },
    { title: 'Validador de HTML do W3C', url: 'https://validator.w3.org/' },
  ],
};
