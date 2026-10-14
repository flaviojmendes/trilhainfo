import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Imagine mandar um pull request e, em dois minutos, um robô avisar: “o teste do frete quebrou na linha 12”. Ninguém precisou lembrar de rodar nada, e o erro não chegou a quem usa o site. Em quase toda vaga de tecnologia, esse robô existe e se chama CI. Saber ler o que ele diz, e configurar o seu, é o que faz um projeto de portfólio parecer trabalho de verdade.',
  sections: [
    {
      id: 'conferencia-automatica',
      title: 'Uma conferência antes de entregar',
      blocks: [
        {
          type: 'analogy',
          title: 'O balcão dos Correios',
          text: 'Antes de aceitar sua encomenda, o atendente confere: o CEP existe, a caixa está fechada, o peso bate com o que foi pago. Se algo falha, a encomenda volta para você na hora, e não depois de rodar o país. A **CI** faz essa conferência com o seu código, sempre do mesmo jeito, antes de ele seguir viagem.',
        },
        {
          type: 'text',
          text: '**CI** vem de *Continuous Integration*, integração contínua. É a prática de juntar mudanças ao código principal com frequência, e a cada mudança um serviço roda automaticamente as verificações do projeto: lint, checagem de tipos, testes e build.',
        },
        {
          type: 'text',
          text: 'Você viu na aula de Git que mudanças chegam ao `main` por um **pull request** (PR). É nele que a CI aparece: cada verificação vira um **status check**, um selo verde, vermelho ou amarelo (rodando) ao lado do PR.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Lint',
              text: 'Uma ferramenta que lê o código procurando erros comuns e problemas de estilo, sem executar nada. Exemplo: ESLint em JavaScript, Ruff em Python.',
            },
            {
              term: 'Build',
              text: 'A etapa que transforma o código-fonte no que vai ser publicado, como a pasta `dist/` de um site feito com Vite.',
            },
            {
              term: 'Runner',
              text: 'O computador temporário que executa a CI. Ele nasce vazio, roda os passos e é apagado no fim.',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Seu colega diz: “Não preciso de CI, eu sempre rodo os testes antes de subir”. Qual é o melhor argumento a favor da CI?',
          options: [
            {
              text: 'A CI roda as mesmas verificações em um computador limpo, para toda mudança de qualquer pessoa',
              correct: true,
              feedback:
                'Isso. O ponto não é desconfiar do colega: é ter uma conferência que não depende de memória nem da configuração da máquina de alguém. “Na minha máquina funciona” deixa de ser argumento.',
            },
            {
              text: 'A CI deixa o código mais rápido',
              feedback:
                'A CI não muda o desempenho do programa. Ela só verifica. Um código lento passa na CI se os testes não medirem velocidade.',
            },
            {
              text: 'A CI corrige os erros sozinha',
              feedback:
                'A CI aponta, não conserta. Quem corrige é você, lendo o log da falha. Algumas ferramentas até formatam código, mas a regra continua sendo sua.',
            },
            {
              text: 'A CI substitui a revisão de código por outra pessoa',
              feedback:
                'Não substitui. A CI confere o que é verificável por máquina; a revisão humana avalia se a solução faz sentido, se o nome está claro, se há risco. As duas se completam.',
            },
          ],
        },
      ],
    },
    {
      id: 'anatomia-do-workflow',
      title: 'O arquivo que manda na CI',
      blocks: [
        {
          type: 'text',
          text: 'No **GitHub Actions**, a CI do próprio GitHub, a conferência é descrita em um arquivo **YAML** dentro de `.github/workflows/`. YAML é um formato de texto em que a **indentação** (os espaços no começo da linha) mostra o que está dentro do quê.',
        },
        {
          type: 'anatomy',
          caption: 'Um workflow de CI para um projeto Node. Explore cada parte.',
          language: 'yaml',
          parts: [
            {
              text: 'name: CI',
              label: 'name',
              note: 'O nome que aparece na aba Actions e no status check do PR. Escolha algo curto.',
            },
            { text: '\n\n' },
            {
              text: 'on:\n  pull_request:\n  push:\n    branches: [main]',
              label: 'on',
              note: 'Os **gatilhos**: quando o workflow roda. Aqui, em todo pull request e em todo push para o `main`. Sem `on`, o arquivo não faz nada.',
            },
            { text: '\n\n' },
            {
              text: 'jobs:\n  verificar:',
              label: 'jobs',
              note: 'Um workflow tem um ou mais **jobs** (trabalhos). Cada job roda em um runner próprio e, por padrão, em paralelo com os outros. `verificar` é o nome que você escolheu.',
            },
            { text: '\n' },
            {
              text: '    runs-on: ubuntu-latest',
              label: 'runs-on',
              note: 'Em que tipo de máquina o job roda. `ubuntu-latest` é um Linux novo a cada execução: nada do que você instalou na última vez continua lá.',
            },
            { text: '\n    steps:\n' },
            {
              text: '      - uses: actions/checkout@v4',
              label: 'uses',
              note: '`uses` chama uma **action**: um passo pronto, escrito por outra pessoa. `checkout` baixa o código do repositório para o runner. Sem ele, a máquina está vazia. O `@v4` fixa a versão.',
            },
            { text: '\n' },
            {
              text: '      - uses: actions/setup-node@v4\n        with:\n          node-version: 22\n          cache: npm',
              label: 'with',
              note: '`with` passa opções para a action. Aqui: instale o Node 22 e guarde em cache as dependências do npm entre execuções.',
            },
            { text: '\n' },
            {
              text: '      - run: npm ci\n      - run: npm run lint\n      - run: npm test\n      - run: npm run build',
              label: 'run',
              note: '`run` executa um comando no terminal do runner, igual você faria no seu. Os passos rodam em ordem; **se um falha, os seguintes não rodam** e o job fica vermelho.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Por que `npm ci` e não `npm install`',
          text: '`npm ci` instala exatamente as versões do `package-lock.json` e falha se ele estiver desatualizado. É o que você quer numa conferência: o mesmo resultado sempre. Em Python, o equivalente é instalar a partir de um arquivo de dependências com versões fixas.',
        },
        {
          type: 'fill',
          prompt:
            'Complete o workflow: ele deve rodar em pull requests, numa máquina Ubuntu, baixar o código e instalar as dependências travadas.',
          language: 'yaml',
          template:
            'name: CI\non: [[pull_request]]\njobs:\n  testes:\n    runs-on: [[ubuntu-latest]]\n    steps:\n      - uses: actions/[[checkout]]@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 22\n      - [[run]]: npm [[ci]]\n      - run: npm test',
          explanation:
            '`on` diz quando, `runs-on` diz onde, `uses` chama passos prontos e `run` executa comandos. Com essas quatro palavras você lê a maioria dos workflows que vai encontrar.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Em outros contextos',
          text: 'Em engenharia de dados, a CI roda testes de qualidade, como “a coluna `cpf` nunca vem vazia”, e falha quando os dados de exemplo quebram a regra. Em QA, a CI roda a suíte e publica um relatório. O arquivo é o mesmo; mudam os comandos em `run`.',
        },
      ],
    },
    {
      id: 'ler-a-falha',
      title: 'Quando fica vermelho',
      blocks: [
        {
          type: 'text',
          text: 'Um X vermelho no PR não é bronca: é informação. O caminho é sempre o mesmo: abrir o job que falhou, achar o **primeiro** erro no log e reproduzir no seu computador.',
        },
        {
          type: 'anatomy',
          caption: 'O trecho do log de uma CI que falhou. Onde está a pista?',
          language: 'text',
          parts: [
            {
              text: 'Run npm test',
              label: 'Passo que falhou',
              note: 'O log é dividido por passo. Os anteriores (checkout, `npm ci`, lint) passaram. O problema está aqui, não na instalação.',
            },
            { text: '\n\n> loja@1.0.0 test\n> vitest run\n\n' },
            {
              text: ' ✓ src/carrinho.test.ts (4 tests) 12ms',
              label: 'O que passou',
              note: 'Ajuda a delimitar: o carrinho está bem. Você não precisa olhar esse arquivo.',
            },
            { text: '\n' },
            {
              text: ' ❯ src/frete.test.ts (3 tests | 1 failed) 18ms\n   × calcula frete grátis acima de R$ 150',
              label: 'O teste que quebrou',
              note: 'Arquivo e nome do teste. Um bom nome de teste já diz qual regra de negócio foi violada.',
            },
            { text: '\n' },
            {
              text: '     → expected 15 to be 0',
              label: 'Esperado e recebido',
              note: 'O coração da pista: o teste esperava frete `0` e o código devolveu `15`. A regra do frete grátis não está sendo aplicada.',
            },
            {
              text: '\n\n Test Files  1 failed | 1 passed (2)\n      Tests  1 failed | 6 passed (7)\n',
            },
            {
              text: 'Error: Process completed with exit code 1.',
              label: 'Código de saída',
              note: 'Todo comando termina com um número. `0` significa sucesso; qualquer outro, falha. É esse número que a CI usa para decidir verde ou vermelho.',
            },
          ],
        },
        {
          type: 'terminal',
          title: 'Do X vermelho ao verde',
          task: 'Seu PR na loja falhou. Investigue pelo terminal com a CLI do GitHub (`gh`), reproduza, corrija e envie de novo.',
          prompt: 'voce@computador:~/loja$',
          steps: [
            {
              goal: 'Veja o estado das verificações do seu pull request.',
              command: ['gh pr checks'],
              output:
                'Some checks were not successful\n1 failing, 1 successful, 0 pending checks\n\nX  CI/verificar (pull_request)     41s\n✓  Netlify/deploy-preview           28s',
              hint: 'Use `gh pr checks`.',
            },
            {
              goal: 'Leia só o pedaço do log que falhou, sem rolar milhares de linhas.',
              command: ['gh run view --log-failed', 'gh run view 912 --log-failed'],
              output:
                'verificar  Run npm test   ❯ src/frete.test.ts (3 tests | 1 failed)\nverificar  Run npm test     × calcula frete grátis acima de R$ 150\nverificar  Run npm test       → expected 15 to be 0\nverificar  Run npm test  Error: Process completed with exit code 1.',
              hint: 'O comando é `gh run view --log-failed`.',
            },
            {
              goal: 'Reproduza a falha no seu computador rodando os testes.',
              command: ['npm test', 'npm run test'],
              output:
                ' ❯ src/frete.test.ts (3 tests | 1 failed)\n   × calcula frete grátis acima de R$ 150\n     → expected 15 to be 0\n\n Tests  1 failed | 6 passed (7)',
              hint: 'O mesmo comando que a CI roda: `npm test`.',
            },
            {
              goal: 'Você trocou `>` por `>=` na regra do frete em `src/frete.ts`. Rode os testes de novo para confirmar.',
              command: ['npm test', 'npm run test'],
              output:
                ' ✓ src/carrinho.test.ts (4 tests)\n ✓ src/frete.test.ts (3 tests)\n\n Tests  7 passed (7)',
              hint: 'De novo `npm test`.',
            },
            {
              goal: 'Faça o commit da correção com a mensagem `corrige frete gratis`.',
              command: [
                'git commit -am "corrige frete gratis"',
                "git commit -am 'corrige frete gratis'",
                'git commit -a -m "corrige frete gratis"',
                "git commit -a -m 'corrige frete gratis'",
              ],
              output:
                '[corrige-frete 4e1c9a2] corrige frete gratis\n 1 file changed, 1 insertion(+), 1 deletion(-)',
              hint: 'Use `git commit -am "corrige frete gratis"`.',
            },
            {
              goal: 'Envie o commit para o GitHub.',
              command: ['git push'],
              output:
                'To github.com:ana/loja.git\n   b71d03f..4e1c9a2  corrige-frete -> corrige-frete',
              hint: '`git push`.',
            },
            {
              goal: 'Confira as verificações do PR mais uma vez.',
              command: ['gh pr checks', 'gh pr checks --watch'],
              output:
                'All checks were successful\n0 failing, 2 successful, 0 pending checks\n\n✓  CI/verificar (pull_request)     38s\n✓  Netlify/deploy-preview           26s',
              hint: '`gh pr checks`.',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Um teste de interface falha na CI, você clica em “Re-run jobs” e ele passa, sem nenhuma mudança no código. O que isso indica?',
          options: [
            {
              text: 'Que o teste é instável (flaky) e precisa ser investigado',
              correct: true,
              feedback:
                'Isso. Um teste que muda de resultado sem mudança no código depende de algo variável: tempo de espera, ordem dos testes, dados compartilhados. Rodar de novo esconde o problema; descobrir a causa resolve.',
            },
            {
              text: 'Que estava tudo certo e a CI errou',
              feedback:
                'A CI só executou o que foi pedido. Se o resultado muda sozinho, alguma parte do teste ou do produto não é determinística. Pode até ser um bug real que só aparece às vezes.',
            },
            {
              text: 'Que é melhor configurar a CI para repetir todo teste três vezes',
              feedback:
                'Retries automáticos deixam o selo verde, mas a instabilidade continua lá, e um bug intermitente de verdade passa despercebido. Repetir não substitui corrigir a causa.',
            },
          ],
        },
        {
          type: 'reveal',
          question:
            'O log mostra 300 linhas de erro. Por que procurar o primeiro erro, e não o último?',
          answer:
            'Porque um erro costuma causar vários outros em cascata. Se a instalação de uma dependência falhou, tudo que vem depois reclama dela. Corrigir a primeira causa muitas vezes faz o resto sumir.',
        },
      ],
    },
    {
      id: 'cache-e-segredos',
      title: 'Mais rápido e sem vazar senha',
      blocks: [
        {
          type: 'text',
          text: 'Como o runner nasce vazio, toda execução baixaria as dependências do zero. O **cache** guarda essa pasta entre execuções, usando o arquivo de lock como chave: se o `package-lock.json` não mudou, o download é reaproveitado.',
        },
        {
          type: 'text',
          text: 'Outra necessidade: às vezes a CI precisa de uma senha, como o token para publicar o site. Isso nunca vai no código. Vai em **secrets**, uma área do repositório onde o valor fica guardado criptografado e é escondido nos logs.',
        },
        {
          type: 'code',
          language: 'yaml',
          caption: 'Lendo um segredo dentro do workflow',
          code: '      - run: npm run deploy\n        env:\n          DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Uma vez no Git, vazou',
          text: 'Se uma senha entrou em um commit, apagar a linha no commit seguinte não resolve: ela continua no histórico. O certo é **trocar a senha** (revogar e gerar outra) e só então limpar. Robôs varrem o GitHub procurando chaves expostas em minutos.',
        },
        {
          type: 'classify',
          prompt: 'Para cada item, onde ele deve ficar?',
          buckets: ['Pode ir no repositório', 'Deve ser um segredo'],
          items: [
            { text: 'O arquivo `.github/workflows/ci.yml`', bucket: 0 },
            { text: 'O token de deploy da Netlify', bucket: 1 },
            { text: 'Um `.env.example` com nomes de variáveis e valores falsos', bucket: 0 },
            { text: 'A senha do banco de produção', bucket: 1 },
            { text: 'O `package-lock.json`', bucket: 0 },
            { text: 'A chave de acesso da conta de nuvem', bucket: 1 },
          ],
          explanation:
            'A regra: configuração que descreve o projeto vai no repositório; qualquer coisa que dá acesso a algo vai em segredo. O `.env.example` é um bom meio-termo: documenta o que é preciso sem entregar valores.',
        },
      ],
    },
    {
      id: 'publicar',
      title: 'Do repositório para o mundo',
      blocks: [
        {
          type: 'text',
          text: 'Um site estático (HTML, CSS, JS, sem servidor próprio) é publicado copiando a pasta do build para um serviço de **hospedagem**. **GitHub Pages**, **Netlify** e **Vercel** fazem isso de graça para projetos pessoais, com HTTPS incluído.',
        },
        {
          type: 'flow',
          caption: 'O caminho de um push até o site no ar',
          actors: ['Você', 'GitHub', 'CI', 'Hospedagem'],
          steps: [
            {
              from: 0,
              to: 1,
              label: 'git push',
              text: 'Você envia o commit. Para o GitHub, isso é um evento que pode disparar workflows.',
            },
            {
              from: 1,
              to: 2,
              label: 'Dispara o workflow',
              text: 'O gatilho `on: push` acorda um runner, que baixa o código.',
            },
            {
              from: 2,
              to: 2,
              label: 'lint, testes, build',
              text: 'A conferência. Se algo falha aqui, o fluxo para e o site antigo continua no ar, intacto.',
            },
            {
              from: 2,
              to: 3,
              label: 'Envia a pasta dist/',
              text: 'Com tudo verde, só o resultado do build é publicado, não o código-fonte inteiro.',
              tone: 'ok',
            },
            {
              from: 3,
              to: 0,
              label: 'Site no ar com HTTPS',
              text: 'A hospedagem troca a versão antiga pela nova e guarda o histórico de publicações.',
              tone: 'ok',
            },
          ],
        },
        {
          type: 'text',
          text: 'Netlify e Vercel também criam um **deploy de preview** para cada PR: um endereço temporário com a versão nova, para revisar antes do merge. E como guardam cada publicação, **voltar atrás** (rollback) é escolher a anterior e republicá-la.',
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem o que acontece desde a sua mudança até o site atualizado.',
          items: [
            'Você abre um pull request com a mudança',
            'A CI roda lint, testes e build e o status fica verde',
            'Alguém revisa o PR e aprova',
            'O PR é integrado ao `main`',
            'O workflow do `main` publica a pasta do build',
            'A nova versão aparece no endereço do site',
          ],
          explanation:
            'Repare que a publicação só acontece depois da conferência e da revisão. É isso que impede um teste quebrado de virar um site quebrado.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns de quem está começando',
          text: 'Indentar o YAML com tab (ele exige espaços). Esquecer o `actions/checkout` e estranhar que “o arquivo não existe”. Usar uma versão de Node na CI diferente da sua. Publicar o código-fonte em vez da pasta do build. Deixar a CI vermelha “porque depois eu arrumo”: uma CI que vive vermelha para de ser lida.',
        },
        {
          type: 'quiz',
          question:
            'Seu site no GitHub Pages abre em branco, e o console mostra `404` para `/assets/index.js`. O endereço é `ana.github.io/loja/`. Qual é a causa mais provável?',
          options: [
            {
              text: 'O build procura os arquivos na raiz do domínio, mas o site está na subpasta `/loja/`',
              correct: true,
              feedback:
                'Isso. No GitHub Pages, projetos ficam em uma subpasta. Ferramentas como o Vite precisam saber disso (a opção `base`) para gerar os caminhos certos.',
            },
            {
              text: 'O GitHub Pages não suporta JavaScript',
              feedback:
                'Suporta, sim. Ele serve qualquer arquivo estático. O problema é o navegador estar pedindo o arquivo no lugar errado, e o `404` é a pista.',
            },
            {
              text: 'A CI não rodou os testes',
              feedback:
                'Testes não mudam onde os arquivos ficam. Um `404` diz que o arquivo pedido não existe naquele caminho; a causa está na configuração do build.',
            },
          ],
        },
      ],
    },
  ],
  recap: [
    '**CI** roda automaticamente as verificações do projeto (lint, tipos, testes, build) em um computador limpo a cada mudança.',
    'Um workflow do GitHub Actions diz quando rodar (`on`), onde (`runs-on`) e o quê (`steps` com `uses` e `run`).',
    'Diante de uma falha, ache o primeiro erro no log, reproduza localmente, corrija e envie de novo; repetir um teste instável não é correção.',
    'Cache acelera a instalação; senhas e tokens ficam em **secrets**, nunca no repositório.',
    'Sites estáticos são publicados enviando a pasta do build para uma hospedagem, que guarda versões para rollback.',
  ],
  cards: [
    {
      id: 'o-que-e-ci',
      front: 'O que é CI?',
      back: 'Integração contínua: integrar mudanças com frequência e rodar automaticamente lint, testes e build em cada uma.',
    },
    {
      id: 'on-runs-on',
      front: 'Num workflow do GitHub Actions, o que dizem `on` e `runs-on`?',
      back: '`on`: quando o workflow roda (gatilhos). `runs-on`: em que máquina o job roda.',
    },
    {
      id: 'uses-run',
      front: 'Qual a diferença entre `uses` e `run` num passo?',
      back: '`uses` chama uma action pronta; `run` executa um comando no terminal do runner.',
    },
    {
      id: 'exit-code',
      front: 'Como a CI decide se um passo passou?',
      back: 'Pelo código de saída do comando: `0` é sucesso, qualquer outro número é falha.',
    },
    {
      id: 'segredo-vazado',
      front: 'Uma senha foi parar num commit. O que fazer primeiro?',
      back: 'Revogar e trocar a senha. Apagar do código não basta, ela continua no histórico.',
    },
    {
      id: 'flaky',
      front: 'O que é um teste flaky e qual o tratamento certo?',
      back: 'Um teste que muda de resultado sem mudança no código. Investigar e corrigir a causa, não só repetir.',
    },
    {
      id: 'deploy-preview',
      front: 'O que é um deploy de preview?',
      back: 'Uma publicação temporária da versão de um PR, com endereço próprio, para revisar antes do merge.',
    },
  ],
  mission: {
    title: 'Coloque um projeto seu sob conferência automática',
    text: 'Escolha um projeto seu com pelo menos um teste. Você vai criar a CI, ver ela falhar de propósito e voltar ao verde. Pode pedir a uma IA uma proposta de workflow, mas confira se ela usa os scripts que existem de verdade no seu `package.json` (ou no seu projeto Python).',
    steps: [
      'Crie `.github/workflows/ci.yml` rodando instalação, lint, testes e build em cada pull request',
      'Abra um PR com um teste quebrado de propósito e leia o log da falha até achar a linha do erro',
      'Corrija, envie de novo e veja o status ficar verde',
      'Publique o site (ou o relatório de testes) no GitHub Pages, Netlify ou Vercel',
      'Escreva no README como rodar o projeto localmente e como voltar para a versão anterior publicada',
    ],
  },
  sources: [
    {
      title: 'Documentação do GitHub Actions',
      url: 'https://docs.github.com/pt/actions',
    },
    {
      title: 'Documentação do GitHub Pages',
      url: 'https://docs.github.com/pt/pages',
    },
    {
      title: 'Martin Fowler: Continuous Integration',
      url: 'https://martinfowler.com/articles/continuousIntegration.html',
    },
  ],
};
