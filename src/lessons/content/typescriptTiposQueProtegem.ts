import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'O carrinho mostra “Total: R$ 2510” para um pastel de 25 reais com frete de 10. Ninguém percebeu, porque o código rodou sem erro nenhum. Bugs assim chegam até o cliente porque o JavaScript só descobre o problema na hora de executar. O TypeScript aponta esse tipo de erro enquanto você ainda está digitando.',
  sections: [
    {
      id: 'bug-que-motiva',
      title: 'O erro que só aparece na frente do cliente',
      blocks: [
        {
          type: 'text',
          text: 'Lembra que `campo.value` é sempre texto? Veja o que acontece quando esse texto encontra uma conta. O JavaScript não reclama: ele dá um jeito, e o jeito dele nem sempre é o que você queria.',
        },
        {
          type: 'quiz',
          question: 'O campo de preço tem `25` digitado. O que aparece no console?',
          code: 'function somarFrete(preco, frete) {\n  return preco + frete;\n}\n\nconst preco = campoPreco.value; // o campo mostra 25\nconsole.log(somarFrete(preco, 10));',
          language: 'js',
          options: [
            {
              text: '`2510`',
              correct: true,
              feedback:
                'Isso. `campoPreco.value` é o texto `"25"`. Texto + número junta os dois como texto: `"2510"`. Nenhum erro, só um resultado absurdo.',
            },
            {
              text: '`35`',
              feedback:
                'Seria o caso se `preco` fosse o número 25. Mas `value` sempre devolve texto, e `+` com texto junta em vez de somar.',
            },
            {
              text: 'Um erro dizendo que texto não pode ser somado',
              feedback:
                'O JavaScript não dá esse erro: ele converte o número em texto e junta. É exatamente por isso que o bug passa despercebido.',
            },
            {
              text: '`NaN`',
              feedback:
                '`NaN` aparece em contas que não fazem sentido, como `"abc" * 2`. Com `+`, o texto ganha e os valores são colados.',
            },
          ],
        },
        {
          type: 'list',
          items: [
            'Escrever `produto.prco` no lugar de `produto.preco` devolve `undefined`, e a conta vira `NaN`.',
            'Chamar `usuario.endereco.cidade` quando o cadastro não tem endereço quebra a página com “Cannot read properties of undefined”.',
            'Mudar o nome de um campo num arquivo e esquecer outros três lugares que o usavam.',
          ],
        },
        {
          type: 'text',
          text: 'Todos esses erros têm algo em comum: dava para saber que estavam errados **sem rodar o código**, só olhando que tipo de valor cada coisa guarda. É essa leitura que o TypeScript faz por você.',
        },
        {
          type: 'reveal',
          question:
            'Em JavaScript puro, como você corrigiria `somarFrete`? E qual é o problema dessa correção num projeto grande?',
          answer:
            'Convertendo o texto em número: `somarFrete(Number(campoPreco.value), 10)`. O problema é que você precisa lembrar disso em cada lugar que chama a função, para sempre, e nada avisa quando alguém esquece. O TypeScript transforma esse “lembrar” numa regra que o editor confere.',
        },
      ],
    },
    {
      id: 'o-que-e-typescript',
      title: 'JavaScript com etiquetas',
      blocks: [
        {
          type: 'analogy',
          title: 'A etiqueta da prateleira',
          text: 'No mercado, cada prateleira tem uma etiqueta: “arroz”, “feijão”. Se alguém tenta colocar detergente na prateleira do arroz, o repositor percebe na hora, antes de um cliente levar para casa. Um **tipo** é essa etiqueta: diz que tipo de valor pode morar numa variável, e o TypeScript faz o papel do repositor atento.',
        },
        {
          type: 'text',
          text: '**TypeScript** é JavaScript com tipos. Todo JavaScript válido continua valendo; você só acrescenta etiquetas. Um programa chamado **compilador** confere as etiquetas e depois as remove, gerando JavaScript comum, que é o que o navegador entende.',
        },
        {
          type: 'flow',
          caption: 'Do arquivo .ts até a tela',
          actors: ['Você', 'TypeScript', 'Navegador'],
          steps: [
            {
              from: 0,
              to: 1,
              label: 'carrinho.ts',
              text: 'Você escreve o código com tipos num arquivo `.ts`. O editor já consulta o TypeScript enquanto você digita.',
            },
            {
              from: 1,
              to: 0,
              label: 'Erro na linha 12',
              text: 'O compilador encontrou um texto onde deveria haver número e sublinha a linha em vermelho. Nada chegou ao navegador ainda.',
              tone: 'error',
            },
            {
              from: 0,
              to: 1,
              label: 'código corrigido',
              text: 'Você converte o valor com `Number(...)` e salva. Agora as etiquetas combinam.',
            },
            {
              from: 1,
              to: 1,
              label: 'remove os tipos',
              text: 'O compilador (o `tsc`, ou o Vite no projeto) apaga as anotações e gera JavaScript comum.',
              tone: 'ok',
            },
            {
              from: 1,
              to: 2,
              label: 'carrinho.js',
              text: 'O navegador recebe JavaScript puro e executa. Ele nunca vê um tipo sequer.',
              tone: 'ok',
            },
          ],
        },
        {
          type: 'quiz',
          question: 'Depois de compilado, o que sobra dos tipos no arquivo que roda no navegador?',
          options: [
            {
              text: 'Nada: os tipos são apagados',
              correct: true,
              feedback:
                'Isso. Os tipos existem só enquanto você escreve e compila. O navegador recebe JavaScript comum, sem nenhuma verificação extra. Guarde isso: vai ser importante no fim da aula.',
            },
            {
              text: 'Eles continuam lá e o navegador confere cada valor',
              feedback:
                'Navegadores não entendem TypeScript. As etiquetas são removidas na compilação, então nada é conferido durante a execução.',
            },
            {
              text: 'Viram mensagens de erro no console',
              feedback:
                'Erros de tipo aparecem no editor e no terminal, antes de rodar. No navegador, só existe o JavaScript gerado.',
            },
          ],
        },
      ],
    },
    {
      id: 'anotacoes-e-inferencia',
      title: 'Anotar tipos e deixar o TypeScript deduzir',
      blocks: [
        {
          type: 'anatomy',
          caption: 'Uma função com parâmetros e retorno anotados.',
          language: 'ts',
          parts: [
            { text: 'function total(' },
            {
              text: 'preco: number',
              label: 'Parâmetro anotado',
              note: 'Os dois-pontos colocam a etiqueta: `preco` só aceita números. Chamar `total("25", 2)` vira erro no editor.',
            },
            { text: ', ' },
            {
              text: 'quantidade: number',
              label: 'Outro parâmetro',
              note: 'Cada parâmetro tem a própria etiqueta. Os tipos básicos são os que você já conhece: `number`, `string`, `boolean`.',
            },
            { text: ')' },
            {
              text: ': number',
              label: 'Tipo do retorno',
              note: 'Depois dos parênteses, o que a função devolve. Se alguém mudar o corpo e ela passar a devolver texto, o erro aparece aqui.',
            },
            { text: ' {\n  return preco * quantidade;\n}\n\nconst ' },
            {
              text: 'valor',
              label: 'Inferência',
              note: 'Sem anotação nenhuma, o TypeScript **deduz** que `valor` é `number`, porque sabe o que `total` devolve. Isso se chama **inferência**.',
            },
            { text: ' = total(25, 2);' },
          ],
        },
        {
          type: 'text',
          text: 'Você não precisa anotar tudo. Em `const nome = "Ana"`, o TypeScript já sabe que é texto. A regra prática: anote **parâmetros** de função, e deixe a inferência cuidar das variáveis.',
        },
        {
          type: 'quiz',
          question: 'Onde o TypeScript aponta erro neste código?',
          code: 'function total(preco: number, quantidade: number): number {\n  return preco * quantidade;\n}\n\nfunction aoMudar(campo: HTMLInputElement) {\n  total(campo.value, 2);\n}',
          language: 'ts',
          options: [
            {
              text: 'Em `campo.value`: texto não pode entrar onde se espera `number`',
              correct: true,
              feedback:
                'Isso. O TypeScript sabe que `value` é `string`. A mensagem diz algo como “Argument of type string is not assignable to parameter of type number”. A correção é converter: `Number(campo.value)`.',
            },
            {
              text: 'Em `preco * quantidade`, porque a multiplicação é arriscada',
              feedback:
                'Dentro da função, os dois são `number`, então a conta é segura. O problema está em quem chama a função com o tipo errado.',
            },
            {
              text: 'Em lugar nenhum; o erro só apareceria ao rodar',
              feedback:
                'No JavaScript puro, sim. Mas pegar exatamente esse erro antes de rodar é o principal motivo de usar TypeScript.',
            },
          ],
        },
        {
          type: 'fill',
          prompt:
            'Complete as anotações: a função recebe um nome e uma idade e devolve se a pessoa pode tirar habilitação.',
          language: 'ts',
          template:
            'function podeDirigir(nome: [[string]], idade: [[number]]): [[boolean]] {\n  return idade >= 18;\n}',
          explanation:
            'Texto é `string`, número é `number` e verdadeiro ou falso é `boolean`. Todos em minúsculas: `String` com maiúscula é outra coisa.',
        },
      ],
    },
    {
      id: 'formato-dos-objetos',
      title: 'Descrever a forma dos objetos',
      blocks: [
        {
          type: 'text',
          text: 'Na vida real, você trabalha mais com objetos do que com números soltos. Com `type` (ou `interface`), você descreve a **forma** de um objeto uma vez e reaproveita em todo o projeto.',
        },
        {
          type: 'codeTabs',
          caption: 'O mesmo carrinho em JavaScript e em TypeScript.',
          tabs: [
            {
              label: 'JavaScript',
              language: 'js',
              code: `// Que campos um produto tem? Só lendo o resto do código para saber.
function subtotal(itens) {
  let soma = 0;
  for (const item of itens) {
    soma = soma + item.prco * item.quantidade; // erro de digitação: vira NaN
  }
  return soma;
}`,
            },
            {
              label: 'TypeScript',
              language: 'ts',
              code: `type ItemCarrinho = {
  nome: string;
  preco: number;
  quantidade: number;
  observacao?: string; // o ? quer dizer: pode não existir
};

function subtotal(itens: ItemCarrinho[]): number {
  let soma = 0;
  for (const item of itens) {
    soma = soma + item.prco * item.quantidade;
    //                 ~~~~ Property 'prco' does not exist.
    //                      Did you mean 'preco'?
  }
  return soma;
}`,
            },
          ],
        },
        {
          type: 'terms',
          items: [
            {
              term: '`type Produto = { ... }`',
              text: 'Dá um nome a uma forma de objeto. Cada campo tem nome e tipo, separados por `;`.',
            },
            {
              term: '`interface Produto { ... }`',
              text: 'Outra forma de descrever objetos, quase igual. Escolha uma e seja consistente; muitos times usam `type` para tudo.',
            },
            {
              term: 'Campo opcional `?`',
              text: '`desconto?: number` quer dizer que o campo pode faltar. O TypeScript obriga você a tratar o caso em que ele é `undefined`.',
            },
            {
              term: '`Produto[]`',
              text: 'Um array de produtos. Também pode ser escrito `Array<Produto>`.',
            },
          ],
        },
        {
          type: 'quiz',
          question: 'O que o TypeScript diz sobre a última linha?',
          code: 'type Produto = {\n  nome: string;\n  preco: number;\n  desconto?: number;\n};\n\nfunction precoFinal(produto: Produto) {\n  return produto.preco - produto.desconto;\n}',
          language: 'ts',
          options: [
            {
              text: 'Aponta erro: `desconto` pode ser `undefined`',
              correct: true,
              feedback:
                'Isso. Com o `?`, o campo pode não existir, e `25 - undefined` dá `NaN`. Uma correção: `produto.preco - (produto.desconto ?? 0)`, que usa 0 quando não há desconto.',
            },
            {
              text: 'Nenhum erro: `desconto` é `number`',
              feedback:
                'O `?` muda tudo: o tipo real é `number | undefined`. O TypeScript não deixa você esquecer o caso em que ele falta.',
            },
            {
              text: 'Aponta erro: a função não tem tipo de retorno',
              feedback:
                'Anotar o retorno é opcional; o TypeScript infere. O problema é outro: subtrair algo que pode não existir.',
            },
          ],
        },
        {
          type: 'fill',
          prompt: 'Descreva um produto do catálogo e um array deles. A avaliação é opcional.',
          language: 'ts',
          template:
            'type Produto = {\n  nome: [[string]];\n  preco: [[number]];\n  avaliacao[[?]]: number;\n};\n\nconst catalogo: [[Produto[]|Array<Produto>]] = [];',
          explanation:
            'Cada campo recebe seu tipo, o `?` marca o que pode faltar e `Produto[]` descreve uma lista. A partir daqui, o editor completa os campos para você e reclama de qualquer erro de digitação.',
        },
      ],
    },
    {
      id: 'unions-e-narrowing',
      title: 'Um valor, vários casos possíveis',
      blocks: [
        {
          type: 'text',
          text: 'Às vezes um valor pode ser uma coisa **ou** outra. Uma **union** (união) usa a barra vertical para listar as possibilidades. Com textos exatos, ela impede valores inventados.',
        },
        {
          type: 'code',
          language: 'ts',
          caption: 'Só três valores são aceitos. Um erro de digitação vira erro no editor.',
          code: `type Situacao = 'carregando' | 'sucesso' | 'erro';

let situacao: Situacao = 'carregando';
situacao = 'sucesso';   // ok
situacao = 'sucesos';   // erro: não é uma das opções`,
        },
        {
          type: 'text',
          text: 'Melhor ainda: lembra dos quatro estados de uma tela? Cada estado carrega dados diferentes. Uma **union discriminada** junta objetos que compartilham um campo, como `tipo`, que diz qual caso é qual.',
        },
        {
          type: 'trace',
          caption:
            'Acompanhe o que o TypeScript sabe sobre `estado` em cada linha. Nada roda aqui: é o editor raciocinando.',
          code: "type Estado =\n  | { tipo: 'carregando' }\n  | { tipo: 'sucesso'; produtos: Produto[] }\n  | { tipo: 'erro'; mensagem: string };\n\nfunction descrever(estado: Estado): string {\n  if (estado.tipo === 'carregando') {\n    return 'Carregando...';\n  }\n  if (estado.tipo === 'erro') {\n    return estado.mensagem;\n  }\n  return estado.produtos.length + ' produtos';\n}",
          steps: [
            {
              line: 1,
              note: 'Define três formas possíveis. O campo `tipo` diferencia cada uma.',
            },
            {
              line: 6,
              note: 'No começo da função, `estado` pode ser qualquer um dos três. Só `tipo` é garantido em todos.',
              memory: [['estado', "'carregando' | 'sucesso' | 'erro'"]],
            },
            {
              line: 7,
              note: 'Dentro deste `if`, o TypeScript sabe que é o caso carregando. Isso se chama **narrowing** (estreitamento).',
              memory: [['estado', "'carregando'"]],
            },
            {
              line: 10,
              note: 'Se chegou aqui, não era carregando: esse caso saiu da lista.',
              memory: [['estado', "'sucesso' | 'erro'"]],
            },
            {
              line: 11,
              note: 'Dentro deste `if`, só pode ser erro. Por isso `estado.mensagem` é permitido.',
              memory: [['estado', "'erro'"]],
            },
            {
              line: 13,
              note: 'Sobrou um caso só: sucesso. `estado.produtos` existe com certeza.',
              memory: [['estado', "'sucesso'"]],
            },
            {
              line: 13,
              note: 'Se você escrevesse `estado.mensagem` aqui, o editor reclamaria: no caso sucesso, não existe mensagem.',
            },
          ],
        },
        {
          type: 'text',
          text: 'O `if` não é a única forma de estreitar. `typeof valor === "string"` separa textos de números. `"preco" in objeto` confere se um campo existe. Em todos os casos, depois da pergunta o TypeScript passa a saber mais.',
        },
        {
          type: 'quiz',
          question: 'Qual linha o TypeScript aceita sem erro?',
          code: 'function formatar(valor: string | number) {\n  // qual destas linhas pode ficar aqui?\n}',
          language: 'ts',
          options: [
            {
              text: "`if (typeof valor === 'number') return valor.toFixed(2);`",
              correct: true,
              feedback:
                'Isso. Depois do `typeof`, dentro do `if`, `valor` só pode ser `number`, e `toFixed` existe em números.',
            },
            {
              text: '`return valor.toFixed(2);`',
              feedback:
                '`valor` pode ser texto, e texto não tem `toFixed`. O TypeScript exige que você trate os dois casos antes.',
            },
            {
              text: '`return valor.toUpperCase();`',
              feedback:
                'Mesmo problema do outro lado: números não têm `toUpperCase`. Pergunte com `typeof` antes de usar.',
            },
          ],
        },
        {
          type: 'classify',
          prompt:
            'Com `type Estado` da animação acima, o que o TypeScript aceita e o que ele aponta como erro?',
          buckets: ['Aceita', 'Aponta erro'],
          items: [
            { text: "`const e: Estado = { tipo: 'carregando' };`", bucket: 0 },
            { text: "`const e: Estado = { tipo: 'erro', mensagem: 'Sem rede' };`", bucket: 0 },
            { text: "`const e: Estado = { tipo: 'erro' };`", bucket: 1 },
            { text: "`const e: Estado = { tipo: 'vazio' };`", bucket: 1 },
            { text: "`const e: Estado = { tipo: 'sucesso', produtos: [] };`", bucket: 0 },
            { text: "`const e: Estado = { tipo: 'sucesso', mensagem: 'ok' };`", bucket: 1 },
          ],
          explanation:
            'Cada caso exige exatamente os seus campos: erro sem `mensagem` não passa, sucesso precisa de `produtos`, e `vazio` nem está na lista. Se você quiser esse quarto estado, acrescente-o ao tipo, e o editor mostrará cada lugar que precisa tratá-lo.',
        },
      ],
    },
    {
      id: 'limites-dos-tipos',
      title: 'Onde os tipos não chegam',
      blocks: [
        {
          type: 'text',
          text: 'Os tipos são poderosos, mas têm limites. Conhecê-los evita a falsa sensação de segurança, que é pior do que não ter tipo nenhum.',
        },
        {
          type: 'codeTabs',
          caption: '`any` desliga a proteção; `unknown` obriga você a conferir.',
          tabs: [
            {
              label: 'any: sem proteção',
              language: 'ts',
              code: `const dados: any = JSON.parse(texto);

dados.produtoss.map((p) => p.nome);
// Compila sem reclamar. Quebra na frente do cliente.`,
            },
            {
              label: 'unknown: confira antes',
              language: 'ts',
              code: `const dados: unknown = JSON.parse(texto);

dados.produtos;
// ~~~~ Erro: 'dados' is of type 'unknown'.

if (Array.isArray(dados)) {
  console.log(dados.length); // ok: agora é um array
}`,
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Tipos não conferem o que vem da rede',
          text: 'Escrever `const produtos: Produto[] = await resposta.json()` não faz o TypeScript verificar nada. Os tipos são apagados antes de rodar. Se a API mandar `preco` como texto, seu código acredita que é número e o bug do começo da aula volta. Dados de fora precisam ser **validados** enquanto o programa roda.',
        },
        {
          type: 'code',
          language: 'ts',
          caption:
            'Validar cada item antes de confiar nele. Bibliotecas como o Zod automatizam isso em projetos maiores.',
          code: `function paraProduto(item: unknown): Produto {
  if (
    typeof item === 'object' && item !== null &&
    'nome' in item && typeof item.nome === 'string' &&
    'preco' in item && typeof item.preco === 'number'
  ) {
    return { nome: item.nome, preco: item.preco };
  }
  throw new Error('Produto inválido na resposta da API');
}

async function buscarProdutos(): Promise<Produto[]> {
  const resposta = await fetch('/api/produtos');
  const dados: unknown = await resposta.json();
  if (!Array.isArray(dados)) throw new Error('Esperava uma lista');
  return dados.map(paraProduto);
}`,
        },
        {
          type: 'quiz',
          question:
            'O código declara `const produto: Produto = await resposta.json()` e a API manda `{ "nome": "Pastel", "preco": "8" }`. O que acontece?',
          options: [
            {
              text: 'Nada avisa; `produto.preco` é o texto `"8"` e as contas saem erradas',
              correct: true,
              feedback:
                'Isso. O TypeScript confiou na sua declaração e o navegador nem sabe que ela existiu. Só uma validação em tempo de execução, como `paraProduto`, pegaria o problema.',
            },
            {
              text: 'O TypeScript mostra um erro no editor',
              feedback:
                'O editor não sabe o que a API vai mandar: a resposta só existe quando o programa roda. Na hora de compilar, a declaração parece correta.',
            },
            {
              text: 'O navegador lança um erro de tipo ao receber o JSON',
              feedback:
                'O navegador recebe JavaScript sem tipos. Para ele, `"8"` é um valor como outro qualquer.',
            },
            {
              text: 'O TypeScript converte `"8"` em `8` automaticamente',
              feedback:
                'Tipos nunca mudam valores. Eles só descrevem o que você espera; converter e validar é trabalho do seu código.',
            },
          ],
        },
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              label: 'Erro comum',
              title: 'Usar any para o erro sumir',
              text: 'O erro some, a proteção também. Prefira `unknown` e confira o valor, ou descubra o tipo certo.',
            },
            {
              label: 'Erro comum',
              title: 'Mentir com as',
              text: '`dados as Produto[]` manda o TypeScript acreditar em você sem conferir. É uma promessa, não uma verificação.',
            },
            {
              label: 'Erro comum',
              title: 'Desligar o strict',
              text: 'Com `"strict": true` no `tsconfig.json`, o TypeScript confere `null`, `undefined` e parâmetros sem tipo. Sem ele, metade da proteção desaparece. Deixe sempre ligado.',
            },
            {
              label: 'Erro comum',
              title: 'Confiar em tipos para dados externos',
              text: 'Resposta de API, `localStorage`, campo de formulário: tudo o que vem de fora precisa ser validado em tempo de execução.',
            },
          ],
        },
        {
          type: 'classify',
          prompt:
            'Qual destes problemas o TypeScript pega antes de rodar, e qual só uma validação durante a execução pega?',
          buckets: ['O TypeScript pega antes', 'Só a validação ao rodar pega'],
          items: [
            { text: 'Escrever `produto.prco` no lugar de `produto.preco`', bucket: 0 },
            { text: 'Chamar `total("25", 2)` com texto', bucket: 0 },
            { text: 'A API mandar `preco` como texto', bucket: 1 },
            { text: 'Usar `desconto` opcional sem tratar `undefined`', bucket: 0 },
            { text: 'O `localStorage` ter um JSON antigo, com outro formato', bucket: 1 },
            { text: 'A API devolver um objeto quando você esperava uma lista', bucket: 1 },
          ],
          explanation:
            'O TypeScript enxerga o seu código. Ele não enxerga o que vai chegar de fora quando o programa estiver rodando. Para isso existem validações como `paraProduto`.',
        },
      ],
    },
  ],
  recap: [
    'TypeScript é JavaScript com tipos: o compilador confere tudo antes de rodar e depois apaga os tipos.',
    'Anote os parâmetros das funções e deixe a inferência cuidar das variáveis; descreva objetos com `type` ou `interface` e marque campos opcionais com `?`.',
    'Unions listam os casos possíveis, e o narrowing com `if`, `typeof` e `in` faz o TypeScript saber qual caso você está tratando.',
    'Prefira `unknown` a `any`, mantenha `strict` ligado e valide em tempo de execução tudo o que vem da rede.',
  ],
  cards: [
    {
      id: 'o-que-e-ts',
      front: 'O que o navegador executa quando você escreve TypeScript?',
      back: 'JavaScript comum. O compilador confere os tipos e os apaga antes.',
    },
    {
      id: 'inferencia',
      front: 'O que é inferência de tipos?',
      back: 'O TypeScript deduzir o tipo sozinho, como em `const total = 10`, que ele já sabe ser `number`.',
    },
    {
      id: 'campo-opcional',
      front: 'O que significa `desconto?: number`?',
      back: 'Que o campo pode faltar. Seu tipo real é `number | undefined`, e você precisa tratar os dois casos.',
    },
    {
      id: 'union-literal',
      front: "O que faz `type Situacao = 'carregando' | 'sucesso' | 'erro'`?",
      back: 'Permite só esses três textos. Qualquer outro valor, incluindo um erro de digitação, vira erro no editor.',
    },
    {
      id: 'narrowing',
      front: 'O que é narrowing (estreitamento)?',
      back: 'Quando uma checagem como `if (typeof x === "string")` faz o TypeScript saber um tipo mais específico dentro do bloco.',
    },
    {
      id: 'any-unknown',
      front: 'Qual a diferença entre `any` e `unknown`?',
      back: '`any` desliga a verificação. `unknown` aceita qualquer valor, mas obriga você a conferir o tipo antes de usar.',
    },
    {
      id: 'tipos-e-rede',
      front:
        'Declarar `const dados: Produto[] = await resposta.json()` garante que os dados estão corretos?',
      back: 'Não. Tipos são apagados antes de rodar. Dados externos precisam de validação em tempo de execução.',
    },
  ],
  mission: {
    title: 'Coloque tipos no seu catálogo',
    text: 'Leve o catálogo do projeto Aplicação com API para TypeScript, sem `any`, e prove que ele não confia cegamente na API.',
    steps: [
      'Ative `"strict": true` no `tsconfig.json` e confira que continua ligado no fim',
      'Crie o `type Produto` com todos os campos que a tela usa, marcando os opcionais com `?`',
      'Descreva o estado da tela como uma union discriminada com carregando, sucesso, vazio e erro',
      'Escreva uma função que valida cada item da resposta da API, recebendo `unknown`, antes de usá-lo',
      'Rode o compilador e garanta zero erros sem usar `any` nem `as` para escondê-los',
      'Quebre a validação de propósito, mudando um campo da resposta, e confira que a tela mostra o estado de erro',
    ],
  },
  sources: [
    {
      title: 'TypeScript: The Basics',
      url: 'https://www.typescriptlang.org/docs/handbook/2/basic-types.html',
    },
    {
      title: 'TypeScript: Narrowing',
      url: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html',
    },
    {
      title: 'TypeScript: Everyday Types',
      url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html',
    },
  ],
};
