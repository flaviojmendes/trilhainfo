import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'o-que-avaliam',
      title: 'Não é só sobre acertar',
      blocks: [
        {
          type: 'text',
          text: 'No live coding, a banca está avaliando **como você trabalha**: se entende o problema, se comunica o raciocínio, se testa o próprio código e se reage bem a dicas. Uma solução incompleta bem explicada costuma valer mais do que uma solução certa em silêncio.',
        },
      ],
    },
    {
      id: 'roteiro',
      title: 'Um roteiro para qualquer problema',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Repita o problema com suas palavras',
              text: '"Então recebo uma lista de números e devolvo os dois índices que somam o alvo, certo?" Isso pega mal-entendidos no primeiro minuto.',
            },
            {
              title: 'Pergunte sobre entradas e bordas',
              text: 'A lista pode estar vazia? Tem números negativos? Sempre existe resposta? Pode repetir?',
            },
            {
              title: 'Faça um exemplo à mão',
              text: 'Com `[2, 7, 11, 15]` e alvo `9`, a resposta é `[0, 1]`. O exemplo vira seu primeiro teste.',
            },
            {
              title: 'Diga a solução simples primeiro',
              text: '"Dá para testar todos os pares, que é O(n²). Posso melhorar guardando o que já vi num mapa." Só depois escreva.',
            },
            {
              title: 'Escreva narrando',
              text: 'Fale o que cada parte faz enquanto escreve. Se travar, diga onde e por quê.',
            },
            {
              title: 'Teste e analise',
              text: 'Percorra o exemplo linha a linha, depois um caso de borda. Termine com a complexidade de tempo e de memória.',
            },
          ],
        },
      ],
    },
    {
      id: 'exemplo',
      title: 'O roteiro aplicado',
      blocks: [
        {
          type: 'code',
          language: 'javascript',
          caption: 'Dois números que somam o alvo, em O(n)',
          code: 'function doisSomam(numeros, alvo) {\n  const vistos = new Map(); // valor -> índice\n\n  for (let i = 0; i < numeros.length; i++) {\n    const falta = alvo - numeros[i];\n    if (vistos.has(falta)) return [vistos.get(falta), i];\n    vistos.set(numeros[i], i);\n  }\n\n  return null; // combinei com a banca: sem resposta, null\n}\n\ndoisSomam([2, 7, 11, 15], 9); // [0, 1]\ndoisSomam([3, 3], 6);         // [0, 1]: repetidos funcionam\ndoisSomam([], 1);             // null',
        },
        {
          type: 'text',
          text: 'Tempo O(n), porque cada número é visto uma vez e o mapa responde em tempo constante. Memória O(n), pelo mapa. A troca: gastamos memória para não comparar todos os pares.',
        },
      ],
    },
    {
      id: 'travou',
      title: 'Quando você travar',
      blocks: [
        {
          type: 'table',
          caption: 'Frases que mantêm a conversa andando',
          head: ['Situação', 'O que dizer'],
          rows: [
            [
              'Não sabe por onde começar',
              '"Vou resolver um exemplo pequeno à mão para achar o padrão."',
            ],
            [
              'Esqueceu uma função da linguagem',
              '"Não lembro o nome exato; vou assumir que existe um método que ordena e sigo."',
            ],
            [
              'Achou um erro no seu código',
              '"Opa, isso falha com a lista vazia. Vou tratar aqui."',
            ],
            [
              'Recebeu uma dica',
              '"Boa, então se eu guardar o que já vi, não preciso voltar." Use a dica e agradeça.',
            ],
            [
              'O tempo está acabando',
              '"Não vou terminar a otimização, mas a ideia seria…" e explique.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Treine em voz alta',
          text: 'Resolver sozinho em silêncio não prepara para falar enquanto pensa. Grave a tela resolvendo um problema, ou peça para alguém fazer o papel da banca.',
        },
        {
          type: 'checklist',
          id: 'live-coding',
          items: [
            'Repeti o problema e confirmei as entradas e as bordas.',
            'Fiz um exemplo à mão antes de escrever código.',
            'Falei a solução simples e a complexidade antes de otimizar.',
            'Narrei o que estava escrevendo.',
            'Testei com o exemplo e com um caso de borda.',
            'Terminei com a complexidade de tempo e memória.',
          ],
        },
      ],
    },
  ],
  sources: [
    { title: 'NeetCode: roteiro de problemas', url: 'https://neetcode.io/roadmap' },
    {
      title: 'Tech Interview Handbook: durante a entrevista',
      url: 'https://www.techinterviewhandbook.org/coding-interview-techniques/',
    },
    { title: 'LeetCode', url: 'https://leetcode.com/' },
  ],
};
