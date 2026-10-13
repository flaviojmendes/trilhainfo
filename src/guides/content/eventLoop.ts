import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'ideia',
      title: 'Uma fila, uma coisa por vez',
      blocks: [
        {
          type: 'text',
          text: 'O JavaScript da página roda em **uma única thread**: executa um trecho de código por vez, até o fim. Mesmo assim, ele espera requisições, timers e cliques sem travar. Quem faz isso funcionar é o **event loop**.',
        },
        {
          type: 'text',
          text: 'Operações demoradas, como `fetch` ou `setTimeout`, são entregues ao navegador. Quando terminam, a função de retorno (callback) entra em uma **fila**. O event loop só pega o próximo item da fila quando a pilha de chamadas está **vazia**.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Pilha de chamadas',
              text: 'As funções em execução agora. Uma função entra quando é chamada e sai quando retorna.',
            },
            {
              term: 'APIs do ambiente',
              text: 'Timers, rede e eventos do DOM. Ficam fora do JavaScript, no navegador ou no Node.js.',
            },
            {
              term: 'Fila de tarefas',
              text: 'Callbacks de `setTimeout`, `setInterval`, eventos de clique e mensagens.',
            },
            {
              term: 'Fila de microtarefas',
              text: 'Continuações de Promises (`then`, `catch`, `await`) e `queueMicrotask`. Têm **prioridade**.',
            },
          ],
        },
      ],
    },
    {
      id: 'regra',
      title: 'A regra de ouro',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Execute o código atual até o fim',
              text: 'Nada interrompe uma função no meio.',
            },
            {
              title: 'Esvazie a fila de microtarefas inteira',
              text: 'Incluindo microtarefas criadas durante esse processo.',
            },
            {
              title: 'Deixe o navegador atualizar a tela, se precisar',
              text: 'Estilos, layout e pintura acontecem entre tarefas.',
            },
            {
              title: 'Pegue a próxima tarefa da fila e recomece',
              text: 'Uma tarefa por volta do loop.',
            },
          ],
        },
      ],
    },
    {
      id: 'preveja',
      title: 'Preveja a ordem',
      blocks: [
        {
          type: 'text',
          text: 'Antes de ler a saída, tente adivinhar a ordem dos logs.',
        },
        {
          type: 'code',
          language: 'javascript',
          code: "console.log('1: início');\n\nsetTimeout(() => console.log('2: timeout'), 0);\n\nPromise.resolve().then(() => console.log('3: promise'));\n\nqueueMicrotask(() => console.log('4: microtarefa'));\n\nconsole.log('5: fim');",
          output: '1: início\n5: fim\n3: promise\n4: microtarefa\n2: timeout',
        },
        {
          type: 'list',
          items: [
            '`1` e `5` são código síncrono: rodam primeiro, na ordem.',
            '`3` e `4` são microtarefas: rodam assim que a pilha esvazia, na ordem em que foram agendadas.',
            '`2` é uma tarefa: mesmo com `0` ms, espera todas as microtarefas.',
          ],
        },
        {
          type: 'code',
          language: 'javascript',
          caption: 'O mesmo vale para async/await',
          code: "async function carregar() {\n  console.log('A');\n  await null;\n  console.log('B'); // vira uma microtarefa\n}\n\nconsole.log('1');\ncarregar();\nconsole.log('2');",
          output: '1\nA\n2\nB',
        },
      ],
    },
    {
      id: 'consequencias',
      title: 'O que isso muda no seu código',
      blocks: [
        {
          type: 'cards',
          items: [
            {
              label: 'Trava a tela',
              title: 'Loops longos',
              text: 'Enquanto um cálculo pesado roda, a página não responde a cliques nem se redesenha.',
              points: [
                'Divida o trabalho em partes menores',
                'Use um Web Worker para cálculos pesados',
              ],
            },
            {
              label: 'Não é imediato',
              title: '`setTimeout(fn, 0)`',
              text: 'Significa "o quanto antes, depois do código atual e das microtarefas". Depois de alguns timers aninhados, o navegador impõe um atraso mínimo de 4 ms.',
            },
            {
              label: 'Pode congelar',
              title: 'Microtarefas infinitas',
              text: 'Uma Promise que agenda outra para sempre impede o navegador de chegar à etapa de desenhar a tela.',
            },
            {
              label: 'Ordem garantida',
              title: 'Dentro de uma função',
              text: 'Nenhum callback roda no meio do seu código síncrono. Outra parte do programa só executa quando a função termina ou chega a um `await`.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'O Node.js tem fases extras e filas próprias, como `process.nextTick` e `setImmediate`, mas a ideia de pilha, microtarefas e tarefas é a mesma.',
        },
      ],
    },
  ],
  sources: [
    {
      title: 'MDN: modelo de concorrência e event loop',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Event_loop',
    },
    {
      title: 'MDN: usando microtarefas com queueMicrotask',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/API/HTML_DOM_API/Microtask_guide',
    },
    {
      title: 'Jake Archibald: tasks, microtasks, queues and schedules',
      url: 'https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/',
    },
  ],
};
