import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'problema',
      title: 'Por que isso importa',
      blocks: [
        {
          type: 'text',
          text: 'O navegador lê o HTML de cima para baixo e vai montando a página. Quando encontra um `<script>` comum, ele **para de ler** o HTML, baixa o arquivo, executa e só então continua. Um script grande no topo da página atrasa tudo o que vem depois.',
        },
        {
          type: 'text',
          text: 'Os atributos `async` e `defer` dizem ao navegador que ele pode **baixar o script em paralelo** enquanto continua lendo o HTML. A diferença entre eles é **quando** o script executa.',
        },
      ],
    },
    {
      id: 'linhas-do-tempo',
      title: 'As três formas, lado a lado',
      blocks: [
        {
          type: 'scripts',
          variants: [
            {
              markup: '<script src="app.js">',
              title: 'Script comum',
              text: 'A leitura do HTML **pausa** durante o download e a execução. A página só continua a ser montada depois que o script termina.',
              html: [
                { phase: 'parse', from: 0, to: 28 },
                { phase: 'pause', from: 28, to: 70 },
                { phase: 'parse', from: 70, to: 100 },
              ],
              script: [
                { phase: 'fetch', from: 28, to: 56 },
                { phase: 'exec', from: 56, to: 70 },
              ],
            },
            {
              markup: '<script async src="app.js">',
              title: 'async',
              text: 'O download acontece **em paralelo**. Assim que termina, o script executa e pausa a leitura só durante a execução. Vários scripts `async` **não respeitam a ordem** do documento.',
              html: [
                { phase: 'parse', from: 0, to: 54 },
                { phase: 'pause', from: 54, to: 68 },
                { phase: 'parse', from: 68, to: 100 },
              ],
              script: [
                { phase: 'fetch', from: 28, to: 54 },
                { phase: 'exec', from: 54, to: 68 },
              ],
            },
            {
              markup: '<script defer src="app.js">',
              title: 'defer',
              text: 'O download acontece **em paralelo** e a execução fica para **depois que o HTML inteiro foi lido**, antes do evento `DOMContentLoaded`. Vários scripts `defer` executam **na ordem** em que aparecem.',
              html: [{ phase: 'parse', from: 0, to: 84 }],
              script: [
                { phase: 'fetch', from: 28, to: 56 },
                { phase: 'exec', from: 84, to: 100 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'qual-usar',
      title: 'Qual usar',
      blocks: [
        {
          type: 'table',
          caption: 'Comparação entre as formas de carregar um script externo',
          head: ['Forma', 'Bloqueia a leitura', 'Ordem garantida', 'Quando usar'],
          rows: [
            [
              '`<script>`',
              'Sim, no download e na execução',
              'Sim',
              'Raramente. Só se o código precisar rodar antes do resto da página.',
            ],
            [
              '`async`',
              'Só durante a execução',
              'Não',
              'Scripts independentes, como analytics e widgets.',
            ],
            ['`defer`', 'Não', 'Sim', 'O código da sua aplicação, que manipula o DOM.'],
            [
              '`type="module"`',
              'Não',
              'Sim',
              'Módulos ES já se comportam como `defer` por padrão.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: '`async` e `defer` só valem para scripts externos, com `src`. Em um script inline, eles são ignorados (exceto `async` em módulos).',
        },
        {
          type: 'code',
          language: 'html',
          caption: 'Um ponto de partida seguro',
          code: '<head>\n  <script defer src="/app.js"></script>\n  <script async src="https://analytics.exemplo.com/a.js"></script>\n</head>',
        },
      ],
    },
  ],
  sources: [
    {
      title: 'MDN: o elemento <script>',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/script',
    },
    {
      title: 'Especificação HTML: atributos async e defer',
      url: 'https://html.spec.whatwg.org/multipage/scripting.html#attr-script-async',
    },
  ],
};
