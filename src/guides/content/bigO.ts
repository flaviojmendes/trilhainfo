import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'ideia',
      title: 'A ideia em uma frase',
      blocks: [
        {
          type: 'text',
          text: 'A notação Big O descreve **como o custo de um algoritmo cresce** quando a entrada aumenta. O custo pode ser **tempo** (quantidade de operações) ou **espaço** (memória extra). Ela não mede segundos: compara tendências.',
        },
        {
          type: 'text',
          text: 'Formalmente, Big O é um **limite superior** de crescimento. No dia a dia e em entrevistas, ele costuma ser usado para o **pior caso**: a entrada que mais faz o algoritmo trabalhar.',
        },
      ],
    },
    {
      id: 'complexidades',
      title: 'As complexidades mais comuns',
      blocks: [
        {
          type: 'complexity',
          items: [
            {
              id: '1',
              name: 'constante',
              text: 'O custo **não depende** do tamanho da entrada.',
              example: 'acessar uma posição de um array ou uma chave de um `Map`.',
              code: 'const notas = [7, 9, 6, 10];\nconsole.log(notas[3]);',
            },
            {
              id: 'log n',
              name: 'logarítmica',
              text: 'A cada passo, o problema **cai pela metade**. Dobrar a entrada acrescenta só um passo.',
              example: 'busca binária em uma lista ordenada.',
              code: 'for (let i = 1; i <= n; i = i * 2) {\n  console.log(i);\n}',
            },
            {
              id: 'n',
              name: 'linear',
              text: 'O custo cresce **na mesma proporção** da entrada.',
              example: 'percorrer todos os itens de um array uma vez.',
              code: 'for (let i = 0; i < lista.length; i++) {\n  console.log(lista[i]);\n}',
            },
            {
              id: 'n log n',
              name: 'linearítmica',
              text: 'Um pouco pior que linear. É o custo dos **bons algoritmos de ordenação**.',
              example: '`Array.prototype.sort`, merge sort, heap sort.',
              code: 'const ordenada = [...lista].sort((a, b) => a - b);',
            },
            {
              id: 'n²',
              name: 'quadrática',
              text: 'Para cada item, o código percorre **todos os itens de novo**. Dobrar a entrada quadruplica o custo.',
              example: 'um loop dentro de outro sobre a mesma lista.',
              code: 'for (const a of lista) {\n  for (const b of lista) {\n    comparar(a, b);\n  }\n}',
            },
            {
              id: '2ⁿ',
              name: 'exponencial',
              text: 'Cada item a mais **dobra** o custo. Fica inviável muito rápido.',
              example: 'Fibonacci recursivo sem memória, gerar todos os subconjuntos.',
              code: 'function fib(n) {\n  if (n <= 1) return n;\n  return fib(n - 1) + fib(n - 2);\n}',
            },
          ],
        },
      ],
    },
    {
      id: 'calcular',
      title: 'Como chegar ao Big O de um código',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Conte os passos que dependem da entrada',
              text: 'Loops sobre a entrada contam como `n`. Loops aninhados sobre a mesma entrada multiplicam: `n × n`.',
            },
            {
              title: 'Some partes em sequência',
              text: 'Um trecho `O(n)` seguido de outro `O(n²)` custa `O(n + n²)`.',
            },
            {
              title: 'Fique só com o termo dominante',
              text: 'Para entradas grandes, o termo que cresce mais rápido manda: `O(n + n²)` vira `O(n²)`.',
            },
            {
              title: 'Descarte constantes',
              text: 'Percorrer a lista duas vezes é `O(2n)`, que se escreve `O(n)`. Big O compara formas de crescimento, não multiplicadores.',
            },
          ],
        },
        {
          type: 'code',
          language: 'javascript',
          caption: 'Exemplo: O(1) + O(n) + O(n²) = O(n²)',
          code: 'function temDuplicado(lista) {\n  if (lista.length < 2) return false;      // O(1)\n  const total = lista.reduce((s, x) => s + x, 0); // O(n)\n  for (let i = 0; i < lista.length; i++) {  // O(n²)\n    for (let j = i + 1; j < lista.length; j++) {\n      if (lista[i] === lista[j]) return true;\n    }\n  }\n  return false;\n}',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Trocar tempo por espaço',
          text: 'O mesmo `temDuplicado` pode ser `O(n)` com um `Set`: você guarda o que já viu e gasta `O(n)` de memória extra. Em entrevistas, mencione a troca e pergunte qual restrição importa mais.',
        },
      ],
    },
    {
      id: 'cuidados',
      title: 'O que Big O não diz',
      blocks: [
        {
          type: 'list',
          items: [
            'Para entradas pequenas, um algoritmo `O(n²)` simples pode ser mais rápido que um `O(n log n)` complexo.',
            'Chamadas de biblioteca têm custo: `includes`, `indexOf` e `splice` em arrays são `O(n)`.',
            'Rede, disco e banco de dados costumam dominar o tempo real de uma aplicação. Meça antes de otimizar.',
          ],
        },
      ],
    },
  ],
  sources: [
    {
      title: 'Big-O Cheat Sheet: complexidade de estruturas e algoritmos',
      url: 'https://www.bigocheatsheet.com/',
    },
    {
      title: 'MDN: Array.prototype.sort',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort',
    },
  ],
};
