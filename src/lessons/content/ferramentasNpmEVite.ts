import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Até aqui você criou arquivos à mão e abriu no navegador. Projetos de verdade têm dezenas de arquivos, bibliotecas de outras pessoas, TypeScript para converter e código para deixar leve antes de publicar. Ninguém faz isso manualmente. Nesta aula você conhece as ferramentas que automatizam esse trabalho, e entende o que cada uma faz por baixo, para nunca depender de mágica.',
  sections: [
    {
      id: 'por-que-ferramentas',
      title: 'Por que existem ferramentas',
      blocks: [
        {
          type: 'text',
          text: 'Uma boa regra: **automatize o que você já entende**. Você já sabe ligar um script ao HTML e conferir um tipo. As ferramentas fazem isso mais rápido, sem esquecer nenhum passo, em todos os computadores do time.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Node.js',
              text: 'Um programa que roda JavaScript **fora do navegador**, direto no seu computador. É ele que executa as ferramentas desta aula. Você instala uma vez e esquece.',
            },
            {
              term: 'npm',
              text: 'Vem junto com o Node.js. É ao mesmo tempo um **registro** público com milhões de pacotes e o **comando** que baixa e organiza esses pacotes no seu projeto.',
            },
            {
              term: 'Pacote',
              text: 'Código pronto que alguém publicou para outras pessoas usarem: uma biblioteca de datas, um framework, uma ferramenta como o Vite.',
            },
          ],
        },
        {
          type: 'analogy',
          title: 'A loja de peças',
          text: 'Para montar uma bicicleta, você não fabrica cada parafuso: compra as peças numa loja. O **npm** é a loja de peças do JavaScript. O `package.json` é a sua lista de compras, e a pasta `node_modules` é a caixa onde as peças chegam.',
        },
        {
          type: 'quiz',
          question:
            'Você vai criar um site simples. Ele vai rodar no navegador das pessoas. Por que você precisa do Node.js instalado no seu computador?',
          options: [
            {
              text: 'Para rodar as ferramentas de desenvolvimento, como npm e Vite',
              correct: true,
              feedback:
                'Isso. O Node.js trabalha nos bastidores, no seu computador. Quem visita o site não precisa de Node: recebe só HTML, CSS e JavaScript prontos.',
            },
            {
              text: 'Porque o navegador precisa do Node.js para entender JavaScript',
              feedback:
                'O navegador já entende JavaScript sozinho, como você viu nas aulas anteriores. O Node.js é outro lugar onde JavaScript roda: o seu computador.',
            },
            {
              text: 'Porque todo site precisa de um servidor Node.js para ser publicado',
              feedback:
                'Um site de frontend pode ser publicado como arquivos estáticos em qualquer hospedagem. O Node.js serve para construir o site, não necessariamente para servi-lo.',
            },
          ],
        },
      ],
    },
    {
      id: 'package-json',
      title: 'O package.json, a ficha do projeto',
      blocks: [
        {
          type: 'text',
          text: 'Todo projeto com npm tem um arquivo `package.json` na raiz. Ele diz o nome do projeto, quais comandos existem e de quais pacotes ele depende. É o primeiro arquivo que vale abrir num projeto desconhecido.',
        },
        {
          type: 'anatomy',
          caption: 'Um package.json típico de projeto com Vite e TypeScript.',
          language: 'json',
          parts: [
            { text: '{\n  ' },
            {
              text: '"name": "catalogo-de-lanches"',
              label: 'Nome',
              note: 'Identifica o projeto. Letras minúsculas e hífens, sem espaços nem acentos.',
            },
            { text: ',\n  "private": true,\n  "type": "module",\n  ' },
            {
              text: '"scripts": {\n    "dev": "vite",\n    "build": "tsc --noEmit && vite build",\n    "lint": "eslint ."\n  }',
              label: 'Scripts',
              note: 'Atalhos para comandos. `npm run dev` executa `vite`. No `build`, o `&&` quer dizer “só continue se o anterior deu certo”: primeiro confere os tipos, depois gera o site.',
            },
            { text: ',\n  ' },
            {
              text: '"dependencies": {\n    "dayjs": "^1.11.13"\n  }',
              label: 'dependencies',
              note: 'Pacotes que o seu código usa enquanto roda no navegador. Aqui, uma biblioteca para formatar datas na tela.',
            },
            { text: ',\n  ' },
            {
              text: '"devDependencies": {\n    "eslint": "^9.30.0",\n    "typescript": "^5.9.0",\n    "vite": "^7.1.0"\n  }',
              label: 'devDependencies',
              note: 'Ferramentas usadas só para desenvolver e construir. Elas trabalham no seu computador e não vão para o navegador de quem visita.',
            },
            { text: '\n}' },
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'O que significa o ^ na versão?',
          text: '`^7.1.0` quer dizer “a versão 7.1.0 ou qualquer mais nova da família 7”. Isso permite receber correções sem esforço, mas também faz duas instalações em datas diferentes pegarem versões diferentes. Guarde essa ideia para a próxima seção.',
        },
        {
          type: 'code',
          language: 'bash',
          caption: 'Os comandos do dia a dia.',
          code: `npm install dayjs        # adiciona em dependencies
npm install -D eslint    # -D adiciona em devDependencies
npm run dev              # roda o script "dev"
npm run build            # roda o script "build"`,
        },
        {
          type: 'classify',
          prompt: 'Num projeto de catálogo com Vite, onde cada pacote costuma ficar?',
          buckets: ['dependencies', 'devDependencies'],
          items: [
            { text: '`vite`, que monta o projeto', bucket: 1 },
            { text: '`dayjs`, que formata datas mostradas na tela', bucket: 0 },
            { text: '`typescript`, que confere os tipos', bucket: 1 },
            { text: '`react`, que desenha a interface no navegador', bucket: 0 },
            { text: '`eslint`, que procura problemas no código', bucket: 1 },
            { text: '`prettier`, que formata o código', bucket: 1 },
          ],
          explanation:
            'A pergunta é: esse código roda no navegador de quem usa o site? Se sim, `dependencies`. Se só ajuda você a escrever e construir, `devDependencies`, instalado com `npm install -D`.',
        },
        {
          type: 'quiz',
          question:
            'Com o script `"build": "tsc --noEmit && vite build"`, o que acontece ao rodar `npm run build` num projeto com um erro de tipo?',
          options: [
            {
              text: 'O `tsc` falha e o `vite build` nem começa',
              correct: true,
              feedback:
                'Isso. O `&&` só roda o segundo comando se o primeiro terminar com sucesso. É uma proteção: nenhum código com erro de tipo chega ao site publicado.',
            },
            {
              text: 'Os dois rodam e o site é gerado com um aviso',
              feedback:
                'Esse seria o comportamento com `;` entre os comandos. O `&&` interrompe a sequência na primeira falha.',
            },
            {
              text: 'O Vite corrige o erro de tipo automaticamente',
              feedback:
                'Nenhuma ferramenta corrige o seu tipo sozinha. O Vite nem confere tipos: ele só remove as anotações. Por isso o `tsc` vem antes.',
            },
          ],
        },
      ],
    },
    {
      id: 'lockfile',
      title: 'node_modules e o lockfile',
      blocks: [
        {
          type: 'text',
          text: 'Ao rodar `npm install`, o npm baixa os pacotes para a pasta `node_modules`, e também os pacotes de que eles dependem. Um projeto pequeno facilmente traz centenas de pastas ali. Essa pasta **nunca** vai para o Git: ela é listada no `.gitignore` e qualquer pessoa a recria com um comando.',
        },
        {
          type: 'text',
          text: 'Junto, o npm cria o `package-lock.json`, o **lockfile** (arquivo de trava). Ele registra a versão **exata** de cada pacote instalado, inclusive os indiretos. Esse arquivo vai, sim, para o Git.',
        },
        {
          type: 'table',
          caption: 'O que vai e o que não vai para o repositório',
          head: ['Arquivo ou pasta', 'Vai para o Git?', 'Por quê'],
          rows: [
            ['`package.json`', 'Sim', 'Lista o que o projeto precisa e os scripts'],
            ['`package-lock.json`', 'Sim', 'Garante as mesmas versões em todo computador'],
            ['`node_modules/`', 'Não', 'É enorme e recriado com `npm install` ou `npm ci`'],
            ['`dist/`', 'Não', 'É gerado pelo build a partir do código'],
            ['`.env`', 'Não', 'Pode ter configurações locais e valores sensíveis'],
          ],
        },
        {
          type: 'quiz',
          question:
            'O projeto não tem lockfile no Git. Ana instala em março, Bruno em junho, ambos com `"vite": "^7.1.0"`. O código funciona para Ana e quebra para Bruno. Qual a explicação mais provável?',
          options: [
            {
              text: 'O `^` deixou Bruno receber uma versão mais nova, com outro comportamento',
              correct: true,
              feedback:
                'Isso. Sem lockfile, cada instalação escolhe a versão mais recente permitida naquele dia. Com o lockfile no Git, os dois teriam exatamente as mesmas versões.',
            },
            {
              text: 'O computador do Bruno é mais lento',
              feedback:
                'Velocidade não muda o resultado do código. O que mudou foi o código instalado: as versões dos pacotes.',
            },
            {
              text: 'O `package.json` do Bruno está diferente',
              feedback:
                'O `package.json` é o mesmo, vindo do Git. O problema é justamente que ele permite um intervalo de versões, e só o lockfile fixa uma.',
            },
            {
              text: 'O npm sempre instala versões aleatórias',
              feedback:
                'Não é aleatório: o npm pega a versão mais nova que o intervalo permite. Como o tempo passou, a mais nova mudou.',
            },
          ],
        },
        {
          type: 'reveal',
          question: 'Qual a diferença entre `npm install` e `npm ci`?',
          answer:
            '`npm install` pode atualizar o lockfile se encontrar algo diferente. `npm ci` (de “integração contínua”) apaga o `node_modules` e instala **exatamente** o que está no lockfile, falhando se ele não combinar com o `package.json`. Use `npm ci` em servidores de build e quando quiser reproduzir o ambiente de alguém.',
        },
      ],
    },
    {
      id: 'vite',
      title: 'Vite: servidor de desenvolvimento e build',
      blocks: [
        {
          type: 'text',
          text: 'O **Vite** é uma ferramenta de build: ele pega o código que você escreve e entrega ao navegador do jeito certo. Ele tem dois modos de trabalho, um para quando você está programando e outro para quando vai publicar.',
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Crie o projeto',
              text: 'O comando faz algumas perguntas. Para começar, escolha **Vanilla** (sem framework) e a variante **TypeScript**.',
              code: 'npm create vite@latest catalogo',
            },
            {
              title: 'Entre na pasta e instale',
              text: 'O `npm install` lê o `package.json` e baixa tudo para `node_modules`.',
              code: 'cd catalogo\nnpm install',
            },
            {
              title: 'Ligue o servidor de desenvolvimento',
              text: 'O terminal mostra um endereço como `http://localhost:5173`. Abra no navegador. Para desligar, `Ctrl` + `C` no terminal.',
              code: 'npm run dev',
            },
            {
              title: 'Edite e salve',
              text: 'Mude um texto em `src/main.ts` e salve. A página atualiza sozinha em menos de um segundo, sem você recarregar.',
            },
          ],
        },
        {
          type: 'flow',
          caption: 'Os dois modos do Vite: desenvolvimento e build',
          actors: ['src/', 'Vite', 'Navegador', 'dist/'],
          steps: [
            {
              from: 0,
              to: 1,
              label: 'salvou main.ts',
              text: 'Com `npm run dev` ligado, o Vite vigia a pasta `src/`. Você salvou um arquivo.',
            },
            {
              from: 1,
              to: 1,
              label: 'remove tipos do arquivo',
              text: 'O Vite converte só o arquivo que mudou: apaga os tipos do TypeScript e entrega JavaScript. Por isso é tão rápido.',
            },
            {
              from: 1,
              to: 2,
              label: 'atualização instantânea',
              text: 'O navegador troca só o módulo alterado, sem recarregar a página. Isso se chama **hot reload** (recarga a quente).',
              tone: 'ok',
            },
            {
              from: 0,
              to: 1,
              label: 'npm run build',
              text: 'Hora de publicar. O build lê o projeto inteiro de uma vez.',
            },
            {
              from: 1,
              to: 1,
              label: 'junta, otimiza, minifica',
              text: 'Junta os arquivos, remove o que não é usado e encurta o código (minifica), para o site baixar rápido no celular.',
            },
            {
              from: 1,
              to: 3,
              label: 'index.html + assets/',
              text: 'O resultado vai para a pasta `dist/`: HTML, CSS e JavaScript prontos. É essa pasta que você publica.',
              tone: 'ok',
            },
            {
              from: 3,
              to: 2,
              label: 'site publicado',
              text: 'Uma hospedagem entrega os arquivos de `dist/`. Quem visita não precisa de Node, npm nem Vite.',
              tone: 'ok',
            },
          ],
        },
        {
          type: 'text',
          text: 'O Vite também entende **módulos**: arquivos que compartilham código com `export` e `import`. Em vez de um arquivo gigante, cada arquivo cuida de uma coisa.',
        },
        {
          type: 'codeTabs',
          caption: 'Um arquivo exporta uma função; outro importa e usa.',
          tabs: [
            {
              label: 'src/precos.ts',
              language: 'ts',
              code: `export function formatarPreco(valor: number): string {
  return 'R$ ' + valor.toFixed(2).replace('.', ',');
}`,
            },
            {
              label: 'src/main.ts',
              language: 'ts',
              code: `import { formatarPreco } from './precos';

console.log(formatarPreco(8)); // R$ 8,00`,
            },
          ],
        },
        {
          type: 'fill',
          prompt: 'Complete para compartilhar a função `somarCarrinho` entre dois arquivos.',
          language: 'ts',
          template:
            "// src/carrinho.ts\n[[export]] function somarCarrinho(precos: number[]) {\n  return precos.reduce((total, preco) => total + preco, 0);\n}\n\n// src/main.ts\n[[import]] { somarCarrinho } [[from]] './carrinho';",
          explanation:
            '`export` deixa a função disponível para outros arquivos; `import { nome } from "caminho"` a traz para onde você precisa. O caminho começa com `./`, que significa “a partir desta pasta”.',
        },
        {
          type: 'order',
          prompt:
            'Coloque em ordem os comandos para começar um projeto do zero e gerar a versão de publicação.',
          items: [
            '`npm create vite@latest catalogo`',
            '`cd catalogo`',
            '`npm install`',
            '`npm run dev`',
            '`npm run build`',
            '`npm run preview`',
          ],
          explanation:
            'Criar, entrar, instalar, desenvolver, construir e conferir. O `preview` serve a pasta `dist/` localmente, para você testar exatamente o que será publicado.',
        },
      ],
    },
    {
      id: 'qualidade',
      title: 'Lint e formatação: revisores automáticos',
      blocks: [
        {
          type: 'text',
          text: 'Duas ferramentas revisam o seu código a cada salvamento, antes de qualquer pessoa. Cada uma cuida de um tipo de problema, e juntas com o TypeScript formam uma rede de proteção.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'ESLint (lint)',
              text: 'Procura **padrões perigosos ou suspeitos**: variável criada e nunca usada, `==` no lugar de `===`, código que nunca roda. O nome vem de “lint”, os fiapos que grudam na roupa.',
            },
            {
              term: 'Prettier (formatação)',
              text: 'Cuida só da **aparência**: espaços, aspas, quebras de linha, indentação. Ele reescreve o arquivo no mesmo estilo para todo o time, e ninguém mais discute vírgula em revisão.',
            },
            {
              term: '`tsc --noEmit`',
              text: 'O compilador do TypeScript conferindo os **tipos** sem gerar arquivos. Vale ter como script próprio, por exemplo `"typecheck"`.',
            },
          ],
        },
        {
          type: 'classify',
          prompt: 'Qual ferramenta aponta ou corrige cada problema?',
          buckets: ['ESLint', 'Prettier', 'TypeScript'],
          items: [
            { text: 'Uma variável declarada que nunca é usada', bucket: 0 },
            { text: 'Aspas simples e duplas misturadas no mesmo arquivo', bucket: 1 },
            { text: 'Passar um texto onde a função espera número', bucket: 2 },
            { text: 'Usar `==` em vez de `===`', bucket: 0 },
            { text: 'Indentação bagunçada depois de colar um trecho', bucket: 1 },
            { text: 'Acessar `produto.prco`, um campo que não existe', bucket: 2 },
          ],
          explanation:
            'Prettier mexe só na aparência e nunca muda o que o código faz. ESLint aponta hábitos que costumam causar bugs. TypeScript confere se os valores combinam com os tipos. Rode os três antes de cada commit.',
        },
      ],
    },
    {
      id: 'publico-e-segredo',
      title: 'Variáveis públicas e segredos',
      blocks: [
        {
          type: 'text',
          text: 'Alguns valores mudam conforme o ambiente: o endereço da API de testes é diferente do de produção. Eles ficam num arquivo `.env`, como **variáveis de ambiente**, fora do código.',
        },
        {
          type: 'code',
          language: 'bash',
          caption:
            'Arquivo .env na raiz do projeto. Só o que começa com VITE_ chega ao seu código.',
          code: `VITE_API_URL=https://api.exemplo.com.br
VITE_CHAVE_MAPA=chave_publica_restrita_ao_dominio
SENHA_BANCO=nunca_deveria_estar_aqui`,
        },
        {
          type: 'code',
          language: 'ts',
          caption: 'Lendo a variável no código do frontend.',
          code: `const urlApi = import.meta.env.VITE_API_URL;
const resposta = await fetch(urlApi + '/produtos');`,
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'VITE_ quer dizer público',
          text: 'No build, o Vite **copia o valor** de cada variável `VITE_` para dentro do JavaScript em `dist/`. Qualquer pessoa abre as ferramentas de desenvolvimento e lê. Não existe jeito de esconder um segredo no frontend: tudo o que chega ao navegador pode ser lido. Segredos ficam no servidor, que faz a chamada sensível em nome do site.',
        },
        {
          type: 'classify',
          prompt:
            'Este valor pode ir para o frontend, ou é um segredo que só pode ficar no servidor?',
          buckets: ['Pode ir no frontend', 'Segredo: só no servidor'],
          items: [
            { text: 'O endereço público da API', bucket: 0 },
            { text: 'A senha do banco de dados', bucket: 1 },
            { text: 'A chave secreta do serviço de pagamento', bucket: 1 },
            {
              text: 'Uma chave de mapa feita para uso público e restrita ao seu domínio',
              bucket: 0,
            },
            { text: 'A chave da API de um serviço de IA cobrado por uso', bucket: 1 },
            { text: 'O ID da ferramenta de estatísticas de visitas', bucket: 0 },
            { text: 'Um token com permissão de administrador no GitHub', bucket: 1 },
          ],
          explanation:
            'Pergunte: se um estranho copiar esse valor, ele consegue gastar seu dinheiro, ler dados privados ou agir em seu nome? Se sim, é segredo e nunca vai para o navegador, nem com `VITE_`. Serviços que oferecem chaves públicas deixam isso claro e permitem restringi-las por domínio.',
        },
      ],
    },
  ],
  recap: [
    'O **Node.js** roda JavaScript no seu computador, e o **npm** instala pacotes e executa os scripts do `package.json`.',
    '`dependencies` vão para o navegador; `devDependencies` são ferramentas, instaladas com `npm install -D`.',
    '`node_modules` nunca vai para o Git; o lockfile vai, e `npm ci` reproduz exatamente as mesmas versões.',
    'O Vite atualiza a página na hora com `npm run dev` e gera a pasta `dist/` para publicar com `npm run build`.',
    'Toda variável `VITE_` fica pública no build: segredos ficam só no servidor.',
  ],
  cards: [
    {
      id: 'node-npm',
      front: 'Qual a diferença entre Node.js e npm?',
      back: 'Node.js roda JavaScript fora do navegador. npm é o registro de pacotes e o comando que os instala, e vem junto com o Node.js.',
    },
    {
      id: 'dev-dependencies',
      front: 'Quando instalar um pacote com `npm install -D`?',
      back: 'Quando ele é uma ferramenta de desenvolvimento, como Vite, TypeScript ou ESLint, e não roda no navegador de quem usa o site.',
    },
    {
      id: 'node-modules-git',
      front: 'A pasta `node_modules` vai para o Git?',
      back: 'Não. Ela fica no `.gitignore` e é recriada com `npm install` ou `npm ci`.',
    },
    {
      id: 'lockfile',
      front: 'Para que serve o `package-lock.json`?',
      back: 'Registra a versão exata de cada pacote, para todos instalarem as mesmas versões. Ele vai para o Git.',
    },
    {
      id: 'npm-ci',
      front: 'O que faz `npm ci`?',
      back: 'Instala exatamente o que está no lockfile, do zero, e falha se ele não combinar com o `package.json`.',
    },
    {
      id: 'vite-dev-build',
      front: 'Qual a diferença entre `npm run dev` e `npm run build` num projeto Vite?',
      back: '`dev` liga um servidor local que atualiza a página ao salvar. `build` gera a pasta `dist/` otimizada para publicar.',
    },
    {
      id: 'eslint-prettier',
      front: 'O que o ESLint faz que o Prettier não faz?',
      back: 'Aponta padrões que causam bugs, como variáveis não usadas. O Prettier só ajusta a aparência do código.',
    },
    {
      id: 'vite-env-publico',
      front: 'Uma variável `VITE_` no `.env` fica secreta?',
      back: 'Não. O valor é copiado para o JavaScript do build e qualquer pessoa pode ler. Segredos ficam no servidor.',
    },
  ],
  mission: {
    title: 'Monte o projeto com ferramentas de verdade',
    text: 'Leve o catálogo do projeto Aplicação com API para um projeto Vite com TypeScript, com scripts que qualquer pessoa do time consegue rodar.',
    steps: [
      'Crie o projeto com `npm create vite@latest`, escolhendo a variante TypeScript, e mova o código do catálogo para `src/`',
      'Confira no `package.json` os scripts `dev` e `build`, e adicione `"typecheck": "tsc --noEmit"`',
      'Instale ESLint e Prettier como `devDependencies` e crie os scripts `lint` e `format`',
      'Coloque o endereço da API em `VITE_API_URL` num `.env` e confira que `.env` e `node_modules` estão no `.gitignore`',
      'Faça commit do `package-lock.json`, apague `node_modules` e reinstale com `npm ci`',
      'Rode `npm run build` e abra a pasta `dist/` para ver o que realmente vai para o navegador',
    ],
  },
  sources: [
    {
      title: 'Vite: Primeiros passos',
      url: 'https://vite.dev/guide/',
    },
    {
      title: 'Vite: Variáveis de ambiente e modos',
      url: 'https://vite.dev/guide/env-and-mode',
    },
    {
      title: 'npm Docs: package.json',
      url: 'https://docs.npmjs.com/cli/configuring-npm/package-json',
    },
    {
      title: 'npm Docs: npm ci',
      url: 'https://docs.npmjs.com/cli/commands/npm-ci',
    },
  ],
};
