import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'ideia',
      title: 'O que o TypeScript faz por você',
      blocks: [
        {
          type: 'text',
          text: 'TypeScript é JavaScript com **tipos verificados antes de rodar**. O compilador lê o código e avisa quando você chama uma função com o argumento errado, esquece um campo ou acessa algo que pode ser `undefined`. Depois, os tipos são apagados e sobra JavaScript comum.',
        },
        {
          type: 'code',
          language: 'typescript',
          caption: 'O erro aparece no editor, não na tela de quem usa',
          code: "function saudacao(nome: string) {\n  return `Olá, ${nome.toUpperCase()}`;\n}\n\nsaudacao(42);\n// Erro: o argumento do tipo 'number' não pode ser\n// atribuído ao parâmetro do tipo 'string'.",
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Tipos não validam dados que chegam de fora, como a resposta de uma API ou um formulário. Para isso, valide em tempo de execução com uma biblioteca como Zod ou com checagens manuais.',
        },
      ],
    },
    {
      id: 'tipos',
      title: 'Os tipos que você mais vai usar',
      blocks: [
        {
          type: 'code',
          language: 'typescript',
          caption: 'Objetos, opcionais, uniões e listas',
          code: "type Status = 'rascunho' | 'publicado' | 'arquivado';\n\ninterface Post {\n  id: number;\n  titulo: string;\n  status: Status;\n  tags: string[];\n  publicadoEm?: Date; // opcional: pode não existir\n}\n\nconst post: Post = {\n  id: 1,\n  titulo: 'Olá',\n  status: 'rascunho',\n  tags: [],\n};",
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Inferência',
              text: 'Você não precisa anotar tudo. `const total = 10` já é `number`. Anote parâmetros de função e o formato dos dados.',
            },
            {
              term: 'União',
              text: '`A | B` aceita um ou outro. Uniões de textos fixos substituem "strings mágicas".',
            },
            {
              term: 'type ou interface',
              text: 'Para objetos, os dois funcionam. `type` também descreve uniões. Escolha um padrão e mantenha no projeto.',
            },
            {
              term: 'unknown',
              text: 'Um valor que você ainda não sabe o que é. Diferente de `any`, obriga a verificar antes de usar.',
            },
          ],
        },
      ],
    },
    {
      id: 'estreitamento',
      title: 'Estreitar o tipo antes de usar',
      blocks: [
        {
          type: 'text',
          text: 'Quando um valor pode ser de mais de um tipo, o TypeScript acompanha os `if` e entende o que sobra em cada ramo. Isso se chama **estreitamento**.',
        },
        {
          type: 'code',
          language: 'typescript',
          caption: 'Uma união discriminada: o campo "tipo" diz qual formato veio',
          code: "type Resultado =\n  | { tipo: 'ok'; dados: Post[] }\n  | { tipo: 'erro'; mensagem: string };\n\nfunction mostrar(resultado: Resultado) {\n  if (resultado.tipo === 'erro') {\n    return resultado.mensagem; // aqui só existe mensagem\n  }\n  return resultado.dados.length; // aqui só existe dados\n}",
        },
        {
          type: 'code',
          language: 'typescript',
          caption: 'Opcionais: trate o caso vazio',
          code: "function dataDoPost(post: Post) {\n  return post.publicadoEm?.toLocaleDateString('pt-BR') ?? 'Não publicado';\n}",
        },
      ],
    },
    {
      id: 'genericos',
      title: 'Genéricos sem mistério',
      blocks: [
        {
          type: 'text',
          text: 'Um genérico é um **tipo como parâmetro**. A função funciona com qualquer tipo, mas mantém a ligação entre a entrada e a saída.',
        },
        {
          type: 'code',
          language: 'typescript',
          code: "function primeiro<T>(lista: T[]): T | undefined {\n  return lista[0];\n}\n\nconst nome = primeiro(['Ana', 'Bia']); // string | undefined\nconst post = primeiro(posts);         // Post | undefined",
        },
        {
          type: 'table',
          caption: 'Utilitários prontos que evitam repetir tipos',
          head: ['Utilitário', 'Resultado'],
          rows: [
            ['`Partial<Post>`', 'Todos os campos opcionais, útil para atualização parcial'],
            ["`Pick<Post, 'id' | 'titulo'>`", 'Só os campos escolhidos'],
            ["`Omit<Post, 'id'>`", 'Tudo menos os campos escolhidos, útil para criação'],
            ['`Record<Status, number>`', 'Um objeto com uma chave para cada status'],
          ],
        },
      ],
    },
    {
      id: 'configuracao',
      title: 'Configuração que vale a pena',
      blocks: [
        {
          type: 'list',
          items: [
            'Ligue `"strict": true` no `tsconfig.json` desde o começo. Migrar depois é bem mais trabalhoso.',
            'Rode `tsc --noEmit` na CI. Vite e esbuild removem os tipos sem verificá-los.',
            'Evite `any`. Quando não souber o tipo, use `unknown` e estreite.',
            'Evite `as` para "calar" o compilador. Ele não converte nada, só esconde o problema.',
          ],
        },
        {
          type: 'checklist',
          id: 'typescript',
          items: [
            '`strict` está ligado e o projeto compila sem erros.',
            'Funções exportadas têm parâmetros e retorno claros.',
            'Dados externos são validados antes de virar um tipo do projeto.',
            'Não há `any` nem `as` sem uma justificativa.',
          ],
        },
      ],
    },
  ],
  sources: [
    {
      title: 'Manual do TypeScript',
      url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
    },
    {
      title: 'Estreitamento de tipos',
      url: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html',
    },
    {
      title: 'Tipos utilitários',
      url: 'https://www.typescriptlang.org/docs/handbook/utility-types.html',
    },
    { title: 'Playground do TypeScript', url: 'https://www.typescriptlang.org/play' },
  ],
};
