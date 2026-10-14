import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Sexta-feira, 18h, alguém publica uma versão nova do app de delivery e o botão de pagar some. Em uma empresa sem pipeline, começa a correria: quem publicou, o que mudou, como voltava mesmo? Em uma empresa com pipeline, alguém aperta “voltar para a versão anterior” e vai jantar. Esta aula é sobre construir o segundo cenário.',
  sections: [
    {
      id: 'da-ci-ao-cd',
      title: 'Conferir não é entregar',
      blocks: [
        {
          type: 'analogy',
          title: 'A cozinha do restaurante',
          text: 'Na cozinha, o prato é montado e o chef **confere** antes de sair: tempero, ponto, apresentação. Isso é a CI. Depois, alguém **leva** o prato até a mesa certa, sem derrubar no caminho. Isso é o CD. São etapas diferentes, com riscos diferentes, e um bom restaurante cuida das duas.',
        },
        {
          type: 'text',
          text: 'Na aula de CI você automatizou a conferência. **CD** é a parte da entrega e tem dois sentidos. **Entrega contínua** (*Continuous Delivery*): toda versão aprovada fica pronta para ir ao ar com um clique. **Implantação contínua** (*Continuous Deployment*): ela vai ao ar sozinha, sem clique.',
        },
        {
          type: 'text',
          text: '**Deploy** (implantação) é colocar uma versão para rodar em um ambiente. Um **pipeline de entrega** é a sequência automática de etapas que leva um commit até esse deploy, parando no primeiro problema.',
        },
        {
          type: 'quiz',
          question:
            'Na empresa de Júlia, todo merge no `main` roda os testes e gera uma versão pronta. Para ir à produção, alguém do time clica em “aprovar”. Isso é:',
          options: [
            {
              text: 'Entrega contínua',
              correct: true,
              feedback:
                'Isso. A versão está sempre pronta para sair, mas a decisão final é de uma pessoa. É o modelo mais comum, e um ótimo ponto de partida.',
            },
            {
              text: 'Implantação contínua',
              feedback:
                'Na implantação contínua não há o clique: passou em tudo, vai para produção. Aqui existe uma aprovação humana no meio.',
            },
            {
              text: 'Só CI, sem CD',
              feedback:
                'Seria só CI se a versão não ficasse pronta para entrega. Aqui ela é empacotada e aguarda aprovação: o pedaço de entrega existe.',
            },
          ],
        },
      ],
    },
    {
      id: 'estagios',
      title: 'As etapas do caminho',
      blocks: [
        {
          type: 'text',
          text: 'Um pipeline é uma esteira. Cada etapa só começa se a anterior passou, e quanto mais perto da produção, mais caro é errar. Por isso as verificações baratas e rápidas vêm primeiro.',
        },
        {
          type: 'table',
          caption: 'As etapas de um pipeline típico',
          head: ['Etapa', 'O que faz', 'Se falhar'],
          rows: [
            ['**Build**', 'Compila e empacota o código', 'Nada é publicado; corrija o código'],
            ['**Testes**', 'Roda testes unitários e de integração', 'Nada é publicado'],
            [
              '**Artefato**',
              'Guarda o pacote pronto, com versão',
              'Sem artefato não há o que implantar',
            ],
            ['**Staging**', 'Implanta num ambiente parecido com produção', 'Produção não é tocada'],
            [
              '**Produção**',
              'Implanta para as pessoas usuárias',
              'Rollback para a versão anterior',
            ],
          ],
        },
        {
          type: 'anatomy',
          caption: 'Um pipeline em GitHub Actions com etapas encadeadas.',
          language: 'yaml',
          parts: [
            {
              text: 'on:\n  push:\n    branches: [main]',
              label: 'Gatilho',
              note: 'Só o `main` gera versões que podem ir ao ar. Pull requests rodam a CI, mas não chegam aqui.',
            },
            {
              text: '\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: docker build -t loja:${{ github.sha }} .\n',
            },
            {
              text: '      - run: docker push registro.exemplo.com/loja:${{ github.sha }}',
              label: 'Artefato versionado',
              note: 'A imagem é marcada com o **SHA** do commit, o código único que o Git dá a cada commit. Assim, cada artefato aponta exatamente para o código que o gerou.',
            },
            { text: '\n\n  staging:\n' },
            {
              text: '    needs: build',
              label: 'needs',
              note: '`needs` cria a ordem: este job só começa se `build` terminou com sucesso. Sem ele, os jobs rodariam em paralelo.',
            },
            { text: '\n' },
            {
              text: '    environment: staging',
              label: 'environment',
              note: 'Um **ambiente** no GitHub: tem segredos próprios (a senha do banco de staging não é a de produção) e pode ter regras de proteção.',
            },
            {
              text: '\n    runs-on: ubuntu-latest\n    steps:\n      - run: ./deploy.sh staging ${{ github.sha }}\n\n  producao:\n    needs: staging\n',
            },
            {
              text: '    environment: producao',
              label: 'Aprovação',
              note: 'No ambiente `producao` dá para exigir que uma pessoa aprove antes de o job rodar. O pipeline pausa e espera o clique.',
            },
            { text: '\n    runs-on: ubuntu-latest\n    steps:\n' },
            {
              text: '      - run: ./deploy.sh producao ${{ github.sha }}',
              label: 'Mesmo artefato',
              note: 'Produção recebe **a mesma imagem** testada em staging. Nada é recompilado no caminho.',
            },
          ],
        },
        {
          type: 'order',
          prompt: 'Coloque as etapas do pipeline na ordem em que acontecem.',
          items: [
            'Build: compilar e empacotar',
            'Testes automatizados',
            'Publicar o artefato com uma versão',
            'Deploy em staging',
            'Aprovação de uma pessoa do time',
            'Deploy em produção',
          ],
          explanation:
            'Cada etapa protege a seguinte. Se os testes falham, não existe artefato; se staging quebra, produção nem fica sabendo.',
        },
      ],
    },
    {
      id: 'artefatos-e-ambientes',
      title: 'Construa uma vez, implante em todo lugar',
      blocks: [
        {
          type: 'text',
          text: 'Um **artefato** é o pacote pronto para rodar: uma imagem Docker, um `.zip` de site, um `.jar`. A regra de ouro é gerar o artefato **uma vez** e promover esse mesmo pacote de ambiente em ambiente. Se você recompila para produção, está implantando algo que nunca foi testado.',
        },
        {
          type: 'text',
          text: 'Então como o mesmo pacote fala com bancos diferentes? Pela **configuração**, que vem de fora: variáveis de ambiente e segredos de cada ambiente. O artefato é igual; o endereço do banco muda.',
        },
        {
          type: 'classify',
          prompt: 'O que fica dentro do artefato e o que muda por ambiente?',
          buckets: ['Igual em todos (no artefato)', 'Muda por ambiente (configuração)'],
          items: [
            { text: 'O código compilado da aplicação', bucket: 0 },
            { text: 'O endereço do banco de dados', bucket: 1 },
            { text: 'As bibliotecas nas versões travadas', bucket: 0 },
            { text: 'A chave da API de pagamentos', bucket: 1 },
            { text: 'O nível de detalhe dos logs', bucket: 1 },
            { text: 'Os arquivos de CSS e imagens do site', bucket: 0 },
          ],
          explanation:
            'Tudo que é “o programa” vai no artefato; tudo que é “onde e com quem ele conversa” vem do ambiente. Por isso nenhuma senha deveria estar dentro de uma imagem Docker.',
        },
        {
          type: 'text',
          text: 'Para saber o que está no ar, cada artefato precisa de uma **versão**. Uma convenção comum é o **versionamento semântico**: `MAIOR.MENOR.CORREÇÃO`, como `1.4.2`. Correção sobe o último número; função nova, o do meio; mudança que quebra quem usa, o primeiro.',
        },
        {
          type: 'terminal',
          title: 'Gerando e registrando uma versão',
          task: 'Você vai empacotar a loja como imagem Docker com versão, enviá-la a um registro e marcar o commit no Git.',
          prompt: 'voce@computador:~/loja$',
          steps: [
            {
              goal: 'Construa a imagem com o nome `loja` e a versão `1.4.0`.',
              command: ['docker build -t loja:1.4.0 .'],
              output:
                '[+] Building 18.3s (10/10) FINISHED\n => [1/5] FROM docker.io/library/node:22-alpine\n => [5/5] RUN npm run build\n => exporting to image\n => => naming to docker.io/library/loja:1.4.0',
              hint: 'Você viu na aula de Docker: `docker build -t nome:versao .`',
            },
            {
              goal: 'Dê à imagem o nome completo do registro da empresa, `registro.exemplo.com/loja:1.4.0`.',
              command: ['docker tag loja:1.4.0 registro.exemplo.com/loja:1.4.0'],
              output: '',
              hint: '`docker tag origem destino`.',
            },
            {
              goal: 'Envie a imagem para o registro.',
              command: ['docker push registro.exemplo.com/loja:1.4.0'],
              output:
                'The push refers to repository [registro.exemplo.com/loja]\n5f70bf18a086: Pushed\n1.4.0: digest: sha256:9b2c41e0d7a3 size: 1572',
              hint: '`docker push` seguido do nome completo.',
            },
            {
              goal: 'Marque o commit atual no Git com a tag `v1.4.0`.',
              command: ['git tag v1.4.0'],
              output: '',
              hint: '`git tag v1.4.0`.',
            },
            {
              goal: 'Envie a tag para o GitHub.',
              command: ['git push origin v1.4.0', 'git push --tags', 'git push origin --tags'],
              output: 'To github.com:ana/loja.git\n * [new tag]         v1.4.0 -> v1.4.0',
              hint: '`git push origin v1.4.0`.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Por que versão e tag juntas',
          text: 'A imagem `1.4.0` diz o que roda; a tag `v1.4.0` no Git diz de qual código veio. Com as duas, qualquer pessoa responde em segundos “o que está em produção agora?”, a primeira pergunta de todo incidente.',
        },
      ],
    },
    {
      id: 'estrategias',
      title: 'Trocando a versão sem derrubar ninguém',
      blocks: [
        {
          type: 'text',
          text: 'Colocar a versão nova no ar não precisa ser um “desliga tudo e liga de novo”. Existem estratégias para trocar com as pessoas usando, e para limitar o estrago se algo der errado.',
        },
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              label: 'Rolling',
              title: 'Troca aos poucos',
              text: 'Com 4 servidores, troca um de cada vez. Simples e sem custo extra, mas por um tempo as duas versões convivem.',
            },
            {
              label: 'Blue-green',
              title: 'Dois ambientes iguais',
              text: 'A versão nova sobe inteira ao lado da antiga e o tráfego é virado de uma vez. Voltar é virar de novo. Custa o dobro durante a troca.',
            },
            {
              label: 'Canary',
              title: 'Um grupo pequeno primeiro',
              text: 'A versão nova recebe 5% das pessoas. Se os erros não sobem, aumenta para 25%, 50%, 100%. Se sobem, só 5% sentiram.',
            },
          ],
        },
        {
          type: 'flow',
          caption: 'Um deploy canary em ação',
          actors: ['Usuários', 'Balanceador', 'Versão 1.3', 'Versão 1.4'],
          steps: [
            {
              from: 0,
              to: 1,
              label: 'Pedidos chegando',
              text: 'O **balanceador de carga** recebe todos os pedidos e decide para qual servidor cada um vai.',
            },
            {
              from: 1,
              to: 2,
              label: '95% do tráfego',
              text: 'A maioria continua na versão estável.',
              tone: 'ok',
            },
            {
              from: 1,
              to: 3,
              label: '5% do tráfego',
              text: 'Um grupo pequeno recebe a versão nova. É o “canário na mina”: o primeiro sinal de perigo.',
            },
            {
              from: 3,
              to: 3,
              label: 'Erros sobem para 8%',
              text: 'O painel mostra que a versão nova falha muito mais que a antiga. Hora de agir.',
              tone: 'error',
            },
            {
              from: 1,
              to: 2,
              label: '100% volta para a 1.3',
              text: 'O tráfego é devolvido à versão estável. Só 5% das pessoas viram o problema, por poucos minutos.',
              tone: 'ok',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Um banco digital vai mudar a tela de Pix. O time quer que, se der problema, o menor número possível de clientes seja afetado e que dê para comparar erros entre versões. Qual estratégia combina mais?',
          options: [
            {
              text: 'Canary',
              correct: true,
              feedback:
                'Isso. Canary expõe a versão nova a uma fração pequena e permite comparar as métricas das duas versões lado a lado antes de ampliar.',
            },
            {
              text: 'Blue-green',
              feedback:
                'Blue-green dá uma volta rápida, mas vira **todo** o tráfego de uma vez. Se houver bug, todos os clientes o veem até a volta.',
            },
            {
              text: 'Desligar o sistema de madrugada e trocar tudo',
              feedback:
                'Era comum, mas causa indisponibilidade e não reduz o risco: de manhã, todo mundo recebe a versão nova ao mesmo tempo. Pix funciona 24 horas.',
            },
          ],
        },
      ],
    },
    {
      id: 'rollback-e-flags',
      title: 'Plano de volta, flags e aprovações',
      blocks: [
        {
          type: 'text',
          text: '**Rollback** é voltar para a versão anterior que funcionava. Com artefatos versionados, é só implantar de novo o artefato antigo. A regra prática: na dúvida durante um problema, volte primeiro e investigue depois.',
        },
        {
          type: 'terminal',
          title: 'Voltando para a versão anterior',
          task: 'A versão `v1.4.0` quebrou o pagamento. Use a CLI do GitHub para disparar o workflow de deploy com a versão anterior.',
          prompt: 'voce@computador:~/loja$',
          steps: [
            {
              goal: 'Liste as versões publicadas para achar a anterior.',
              command: ['gh release list'],
              output:
                'TITLE   TYPE    TAG NAME  PUBLISHED\nv1.4.0  Latest  v1.4.0    about 20 minutes ago\nv1.3.2          v1.3.2    about 3 days ago\nv1.3.1          v1.3.1    about 1 week ago',
              hint: '`gh release list`.',
            },
            {
              goal: 'Dispare o workflow `deploy.yml` passando a entrada `versao` com o valor `v1.3.2`.',
              command: [
                'gh workflow run deploy.yml -f versao=v1.3.2',
                'gh workflow run deploy.yml --field versao=v1.3.2',
              ],
              output: '✓ Created workflow_dispatch event for deploy.yml at main',
              hint: '`gh workflow run deploy.yml -f versao=v1.3.2`.',
            },
            {
              goal: 'Acompanhe a execução até o fim.',
              command: ['gh run watch'],
              output:
                '✓ main Deploy · 9127\nTriggered via workflow_dispatch about 1 minute ago\n\nJOBS\n✓ producao in 52s (ID 3381)\n  ✓ Deploy da imagem loja:1.3.2\n  ✓ Health check',
              hint: '`gh run watch`.',
            },
            {
              goal: 'Confira qual versão está respondendo em produção.',
              command: [
                'curl https://loja.exemplo.com.br/versao',
                'curl -s https://loja.exemplo.com.br/versao',
              ],
              output: '{"versao":"1.3.2","commit":"b71d03f"}',
              hint: '`curl https://loja.exemplo.com.br/versao`.',
            },
          ],
        },
        {
          type: 'reveal',
          question:
            'A versão 1.4 apagou uma coluna do banco de dados. Você faz rollback para a 1.3. Por que isso pode não resolver?',
          answer:
            'Porque o rollback troca o código, não os dados. A 1.3 vai procurar uma coluna que não existe mais. Por isso mudanças de banco devem ser **compatíveis com a versão anterior**: primeiro adicione o novo, depois migre, e só remova o antigo numa versão futura.',
        },
        {
          type: 'text',
          text: 'Uma **feature flag** (chave de funcionalidade) é um “interruptor” no código: a função nova vai para produção desligada e é ligada por configuração, para todos ou para um grupo. Assim, **deploy** (código no ar) e **lançamento** (pessoas vendo) viram decisões separadas.',
        },
        {
          type: 'code',
          language: 'javascript',
          caption: 'Uma feature flag no código',
          code: "if (flags.estaLigada('novo-checkout', usuario)) {\n  mostrarNovoCheckout();\n} else {\n  mostrarCheckoutAtual();\n}",
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns no pipeline',
          text: 'Recompilar o código para cada ambiente. Usar a mesma senha em staging e produção. Dar ao pipeline permissão de administrador “para não dar erro”: ele deve ter só o que precisa, como publicar imagens e implantar um serviço. Instalar dependências sem lockfile, aceitando qualquer versão que aparecer. Nunca ter testado o rollback até o dia em que ele é necessário.',
        },
        {
          type: 'quiz',
          question:
            'O time quer lançar um novo cardápio no app só para clientes de Recife primeiro, sem fazer um deploy separado. O que resolve?',
          options: [
            {
              text: 'Uma feature flag ligada para clientes de Recife',
              correct: true,
              feedback:
                'Isso. O código já está em produção para todos, mas só quem cumpre a regra da flag vê. Para ampliar, muda-se a configuração, não o código.',
            },
            {
              text: 'Um deploy canary de 10%',
              feedback:
                'O canary escolhe uma fração do tráfego, normalmente aleatória, não um grupo definido pelo negócio. E ainda é um deploy. Flags decidem quem vê.',
            },
            {
              text: 'Um ambiente de staging só para Recife',
              feedback:
                'Staging é para testar antes de produção, não para clientes reais. Clientes de Recife continuariam usando produção.',
            },
            {
              text: 'Um rollback seletivo',
              feedback:
                'Rollback volta uma versão para todos. Não existe “voltar só para algumas cidades”; para isso servem as flags.',
            },
          ],
        },
      ],
    },
  ],
  recap: [
    'CI confere cada mudança; CD leva a versão aprovada até um ambiente, com ou sem aprovação humana.',
    'Um pipeline segue build, testes, artefato, staging e produção, parando na primeira falha.',
    'O artefato é gerado uma vez, recebe uma versão e é promovido entre ambientes; o que muda é a configuração.',
    'Rolling, blue-green e canary trocam a versão sem desligar tudo; canary limita quem é afetado.',
    'Rollback reimplanta a versão anterior, feature flags separam deploy de lançamento e aprovações protegem produção.',
  ],
  cards: [
    {
      id: 'delivery-deployment',
      front: 'Entrega contínua e implantação contínua: qual a diferença?',
      back: 'Na entrega contínua, a versão fica pronta e alguém aprova. Na implantação contínua, ela vai ao ar sozinha.',
    },
    {
      id: 'artefato',
      front: 'O que é um artefato e por que gerá-lo uma vez só?',
      back: 'O pacote pronto para rodar. Gerado uma vez, garante que produção recebe exatamente o que foi testado.',
    },
    {
      id: 'semver',
      front: 'Em `2.5.1`, o que cada número indica?',
      back: 'Maior (quebra compatibilidade), menor (função nova), correção (bug corrigido).',
    },
    {
      id: 'canary',
      front: 'Como funciona um deploy canary?',
      back: 'A versão nova recebe uma fração pequena do tráfego; se as métricas forem boas, a fração aumenta.',
    },
    {
      id: 'blue-green',
      front: 'Como funciona um deploy blue-green?',
      back: 'A versão nova sobe inteira ao lado da antiga e o tráfego é virado de uma vez; voltar é virar de novo.',
    },
    {
      id: 'feature-flag',
      front: 'Para que serve uma feature flag?',
      back: 'Ligar ou desligar uma função por configuração, separando o deploy do lançamento.',
    },
    {
      id: 'rollback-banco',
      front: 'Por que mudanças de banco atrapalham rollbacks?',
      back: 'O rollback volta o código, não os dados. A mudança precisa ser compatível com a versão anterior.',
    },
  ],
  mission: {
    title: 'Monte um pipeline com volta garantida',
    text: 'Use um projeto seu que já tenha CI. Você vai transformar a conferência em entrega com versão e provar que consegue voltar atrás.',
    steps: [
      'Faça a CI validar cada pull request e bloquear o merge se ela falhar',
      'No `main`, gere um artefato versionado (imagem Docker ou build do site) marcado com a versão ou o SHA do commit',
      'Crie um ambiente de produção com segredos próprios e permissões mínimas para o job de deploy',
      'Publique duas versões e depois faça rollback para a primeira, registrando os comandos usados',
      'Escreva no README como descobrir qual versão está no ar e como voltar para a anterior',
    ],
  },
  sources: [
    {
      title: 'Documentação do GitHub Actions',
      url: 'https://docs.github.com/pt/actions',
    },
    {
      title: 'Martin Fowler: Blue Green Deployment',
      url: 'https://martinfowler.com/bliki/BlueGreenDeployment.html',
    },
    {
      title: 'Martin Fowler: Canary Release',
      url: 'https://martinfowler.com/bliki/CanaryRelease.html',
    },
    {
      title: 'Versionamento Semântico',
      url: 'https://semver.org/lang/pt-BR/',
    },
  ],
};
