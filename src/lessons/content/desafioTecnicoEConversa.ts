import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Em boa parte dos processos para vagas de entrada, em frontend, backend, dados, DevOps ou QA, chega a hora do desafio técnico: um pequeno projeto para fazer em casa ou um exercício ao vivo com a equipe. É a etapa em que você mais se parece com quem já trabalha ali, e por isso é a que mais conta. Nesta aula você aprende a ler o enunciado, cortar escopo, entregar algo que se explica sozinho e aproveitar a conversa final para avaliar a empresa também.',
  sections: [
    {
      id: 'formatos-de-desafio',
      title: 'Desafio para casa ou ao vivo',
      blocks: [
        {
          type: 'analogy',
          title: 'O concurso de bolos',
          text: 'Num concurso, às vezes você leva o bolo pronto de casa; às vezes cozinha na frente do júri. No primeiro, julgam o resultado e a receita que você anotou. No segundo, julgam como você se organiza, mede e corrige quando a massa desanda. O desafio técnico tem essas duas versões.',
        },
        {
          type: 'table',
          caption: 'Os formatos mais comuns de desafio técnico',
          head: ['Formato', 'Como é', 'O que costumam avaliar'],
          rows: [
            [
              '**Take-home** (para casa)',
              'Um enunciado e um prazo de alguns dias; você entrega um repositório',
              'Organização do código, testes, README e decisões',
            ],
            [
              '**Live coding** (ao vivo)',
              'Um exercício curto, resolvido em chamada, com alguém assistindo',
              'Raciocínio em voz alta, perguntas e testes',
            ],
            [
              '**Pareamento**',
              'Você e alguém da equipe mexem juntos num código existente',
              'Colaboração, leitura de código e como você recebe sugestões',
            ],
            [
              '**Revisão de código**',
              'Você lê um pull request e comenta o que mudaria',
              'Atenção a bugs, clareza e gentileza nos comentários',
            ],
          ],
        },
        {
          type: 'text',
          text: 'Na aula Raciocínio e comunicação você treinou o formato ao vivo. Aqui o foco maior é o **take-home**, que é onde mais gente perde pontos por coisas que não têm a ver com saber programar: escopo, prazo e documentação.',
        },
        {
          type: 'quiz',
          question:
            'O enunciado diz “prazo de 7 dias, estimamos de 4 a 6 horas de trabalho”. Qual a melhor estratégia?',
          options: [
            {
              text: 'Planejar em torno de 6 horas, entregar o pedido bem feito e listar no README o que faria com mais tempo',
              correct: true,
              feedback:
                'Isso. A estimativa diz o tamanho esperado da entrega. Respeitá-la mostra que você sabe priorizar, que é o que acontece toda semana numa equipe.',
            },
            {
              text: 'Usar os 7 dias inteiros e adicionar o máximo de funcionalidades extras',
              feedback:
                'Extras que ninguém pediu tomam tempo de revisão e podem esconder o essencial. Também podem dar a impressão de que você não respeita o escopo combinado.',
            },
            {
              text: 'Entregar em 2 horas para parecer rápida',
              feedback:
                'Velocidade não é critério se a entrega ficar sem testes ou README. Use o tempo estimado para fazer o pedido com qualidade.',
            },
          ],
        },
      ],
    },
    {
      id: 'ler-o-enunciado',
      title: 'Ler o enunciado e cuidar do tempo',
      blocks: [
        {
          type: 'code',
          language: 'text',
          caption: 'Um enunciado de take-home, parecido com muitos reais',
          code: `Desafio: consulta de CEP

Crie uma aplicação que recebe um CEP e mostra rua, bairro e cidade,
usando a API pública ViaCEP. Pode ser tela web, API ou script de linha
de comando, conforme a vaga.

Obrigatório:
- Validar o CEP (8 dígitos, com ou sem hífen)
- Tratar CEP inexistente e falha da API
- README explicando como rodar

Diferenciais:
- Testes automatizados
- Histórico das últimas buscas
- Docker

Prazo: 5 dias. Estimativa: 4 a 6 horas.`,
        },
        {
          type: 'classify',
          prompt: 'Como você priorizaria cada item desse desafio?',
          buckets: ['Fazer primeiro', 'Se sobrar tempo', 'Perguntar antes'],
          items: [
            { text: 'Validação do CEP com e sem hífen', bucket: 0 },
            { text: 'Mensagem clara quando a API falha', bucket: 0 },
            { text: 'README com o passo a passo para rodar', bucket: 0 },
            { text: 'Testes da validação e do erro da API', bucket: 0 },
            { text: 'Histórico das últimas buscas', bucket: 1 },
            { text: 'Dockerfile', bucket: 1 },
            {
              text: 'Posso usar uma biblioteca de requisições ou devo usar só o fetch?',
              bucket: 2,
            },
            { text: 'O histórico deve sobreviver ao recarregar a página?', bucket: 2 },
          ],
          explanation:
            'O obrigatório vem primeiro e completo. Testes são diferencial no enunciado, mas protegem justamente o obrigatório, então valem cedo. Dúvidas que mudam a solução se perguntam por e-mail no primeiro dia, não no último.',
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Leia duas vezes e reescreva',
              text: 'Liste com suas palavras o que é obrigatório, o que é diferencial e o que não ficou claro.',
            },
            {
              title: 'Pergunte cedo',
              text: 'Mande as dúvidas no primeiro dia. Se não responderem, decida, e registre a decisão no README.',
            },
            {
              title: 'Divida o tempo em blocos',
              text: 'Por exemplo: 3 horas para o obrigatório com testes, 1 hora para o README, o restante para um diferencial. Um bloco de tempo com limite fixo se chama **timebox**.',
            },
            {
              title: 'Deixe algo entregável o quanto antes',
              text: 'Uma versão simples que funciona, com commit, no fim do primeiro bloco. Melhorias vêm depois, sem risco de ficar sem nada.',
            },
          ],
        },
        {
          type: 'code',
          language: 'text',
          caption: 'Pedir mais prazo com antecedência, quando algo real acontece',
          code: `Olá, Marina, tudo bem?

Recebi o desafio na segunda e já comecei. Nesta semana tenho provas
na faculdade na quarta e na quinta. Seria possível entregar na segunda-feira,
dia 19, em vez de sexta, dia 16?

Se não for possível, entrego na sexta o obrigatório completo e deixo no
README o que faria com mais tempo.

Obrigada,
Joana`,
        },
        {
          type: 'quiz',
          question: 'O que torna esse pedido de prazo um bom pedido?',
          options: [
            {
              text: 'Foi feito cedo, dá o motivo em uma frase, propõe uma data e oferece uma alternativa',
              correct: true,
              feedback:
                'Isso. Quem recebe consegue responder em segundos. Pedir mais prazo não elimina ninguém; sumir e entregar atrasado, sim.',
            },
            {
              text: 'Pede desculpas várias vezes e explica toda a semana em detalhes',
              feedback:
                'O e-mail não faz isso, e ainda bem: excesso de desculpas e de detalhes torna a mensagem longa e passa insegurança. Um motivo curto basta.',
            },
            {
              text: 'Foi enviado no dia do prazo, para não incomodar antes',
              feedback:
                'Pedir no último dia deixa a empresa sem opção e parece desorganização. Quanto antes, melhor.',
            },
          ],
        },
      ],
    },
    {
      id: 'entrega-que-se-explica',
      title: 'Uma entrega que se explica',
      blocks: [
        {
          type: 'text',
          text: 'Na aula Portfólio, carreira e IA você montou um README de projeto. O README de um desafio tem um papel a mais: responder **antes** as perguntas que a pessoa avaliadora faria. Ela pode ter dez desafios para corrigir na mesma tarde.',
        },
        {
          type: 'anatomy',
          caption: 'As partes que fazem diferença no README de um desafio',
          language: 'markdown',
          parts: [
            {
              text: '## Como rodar\nnpm install\nnpm test\nnpm run dev',
              label: 'Como rodar',
              note: 'Comandos que funcionam numa máquina limpa. Teste clonando o repositório em outra pasta antes de enviar.',
            },
            { text: '\n\n' },
            {
              text: '## Decisões\n- Validação separada da tela, em `validarCep`, para testar sem navegador.\n- Sem biblioteca de requisições: o `fetch` resolve e evita dependência.',
              label: 'Decisões',
              note: 'O que você escolheu e por quê. É daqui que sai a conversa da próxima etapa.',
            },
            { text: '\n\n' },
            {
              text: '## Testes\n8 testes: CEP com e sem hífen, CEP com letras, CEP inexistente e API fora do ar.',
              label: 'Testes',
              note: 'Diga o que está coberto, não só que existem testes. Mostra que você sabe o que precisava proteger.',
            },
            { text: '\n\n' },
            {
              text: '## O que ficou de fora\n- Histórico de buscas: priorizei os testes do tratamento de erro.\n- Com mais tempo: cache das buscas repetidas.',
              label: 'Limites',
              note: 'O que você escolheu não fazer, e por quê. Transforma falta de tempo em prova de que você sabe priorizar.',
            },
            { text: '\n\n' },
            {
              text: '## Uso de IA\nUsei um assistente para revisar as mensagens de erro e sugerir casos de teste. Todo o código foi lido e testado por mim.',
              label: 'Uso de IA',
              note: 'Muitas empresas aceitam IA e querem saber como você usou. Seja transparente e confira se o enunciado proíbe.',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Qual histórico de commits ajuda mais a pessoa avaliadora a entender o seu trabalho?',
          options: [
            {
              text: 'Commits pequenos, como “feat: busca endereço pelo CEP” e “test: cobre CEP inválido”',
              correct: true,
              feedback:
                'Isso. Cada commit conta um passo, e a pessoa vê como você pensou. O prefixo, como `feat` e `test`, segue uma convenção chamada Conventional Commits.',
            },
            {
              text: 'Um único commit chamado “desafio pronto”',
              feedback:
                'Não dá para ver o caminho, e pode até parecer que o código foi copiado de outro lugar. O histórico também é parte da entrega.',
            },
            {
              text: 'Vinte commits chamados “ajustes”',
              feedback:
                'Muitos commits ajudam, mas só se a mensagem disser o que mudou. “Ajustes” obriga a abrir cada um para entender.',
            },
          ],
        },
        {
          type: 'terminal',
          title: 'Prepare a entrega',
          task: 'Faltam duas horas para o prazo. Você terminou o README e um arquivo de testes. Confira tudo e envie.',
          prompt: '~/desafio-cep$',
          steps: [
            {
              goal: 'Veja quais arquivos mudaram desde o último commit.',
              command: 'git status',
              output: `On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
	modified:   README.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	src/cep.test.ts

no changes added to commit (use "git add" and/or "git commit -a")`,
              hint: 'O comando que mostra o estado do repositório é `git status`.',
            },
            {
              goal: 'Rode os testes antes de salvar qualquer coisa.',
              command: ['npm test', 'npm run test'],
              output: `> desafio-cep@1.0.0 test
> vitest run

 ✓ src/cep.test.ts (5 tests) 12ms
 ✓ src/formatar.test.ts (3 tests) 4ms

 Test Files  2 passed (2)
      Tests  8 passed (8)
   Duration  640ms`,
              hint: 'Os testes do projeto rodam com `npm test`.',
            },
            {
              goal: 'Adicione o README e o arquivo de testes ao próximo commit.',
              command: [
                'git add README.md src/cep.test.ts',
                'git add src/cep.test.ts README.md',
                'git add .',
                'git add -A',
                'git add --all',
              ],
              hint: 'Use `git add` seguido dos arquivos, ou `git add .` para tudo.',
            },
            {
              goal: 'Crie um commit com a mensagem `test: cobre CEP inválido e documenta limites`.',
              command: [
                'git commit -m "test: cobre CEP inválido e documenta limites"',
                "git commit -m 'test: cobre CEP inválido e documenta limites'",
              ],
              output: `[main 4e1a2c9] test: cobre CEP inválido e documenta limites
 2 files changed, 48 insertions(+), 3 deletions(-)
 create mode 100644 src/cep.test.ts`,
              hint: 'O formato é `git commit -m "mensagem"`, com a mensagem entre aspas.',
            },
            {
              goal: 'Veja o histórico resumido, um commit por linha, como a pessoa avaliadora verá.',
              command: ['git log --oneline', 'git log --oneline -5', 'git log --oneline -n 5'],
              output: `4e1a2c9 (HEAD -> main) test: cobre CEP inválido e documenta limites
b71d0e3 feat: mostra mensagem quando a API de CEP falha
9c3f5a1 feat: busca endereço pelo CEP
5d20b88 feat: valida CEP com e sem hífen
2a8e6d4 chore: cria projeto com Vite e Vitest`,
              hint: 'É `git log` com a opção `--oneline`.',
            },
            {
              goal: 'Envie os commits para o GitHub.',
              command: ['git push', 'git push origin main'],
              output: `To github.com:seu-usuario/desafio-cep.git
   b71d0e3..4e1a2c9  main -> main`,
              hint: 'O comando que envia para o repositório remoto é `git push`.',
            },
          ],
        },
        {
          type: 'reveal',
          question: 'Lendo só o `git log` acima, o que a pessoa avaliadora já descobre sobre você?',
          answer:
            'Que você começou pela estrutura, fez a validação antes da busca, tratou o erro da API e terminou com testes e documentação. É uma ordem que faz sentido, em passos pequenos. Ela entende seu processo sem abrir uma linha de código.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros que custam a vaga',
          text: 'Esquecer o `.env` com uma chave de API dentro do repositório. Deixar o repositório privado sem dar acesso a quem avalia. Mandar o link sem testar se o projeto roda depois de clonado. Copiar uma solução pronta: avaliadores reconhecem, e a conversa seguinte vai ser sobre o seu código.',
        },
      ],
    },
    {
      id: 'decisoes-e-trade-offs',
      title: 'Apresentar decisões e trade-offs',
      blocks: [
        {
          type: 'analogy',
          title: 'Ônibus ou carro de aplicativo',
          text: 'Para chegar ao trabalho, o ônibus é mais barato e o aplicativo, mais rápido. Nenhum é “o certo”: depende de quanto dinheiro e quanto tempo você tem hoje. Toda escolha técnica é assim: ganha algo e paga algo.',
        },
        {
          type: 'text',
          text: '**Trade-off** é exatamente essa troca: o que você ganha e o que paga com uma escolha. Na conversa sobre o desafio, uma frase com quatro partes resolve quase tudo: o que escolhi, por quê, qual é o custo e quando eu mudaria.',
        },
        {
          type: 'code',
          language: 'text',
          caption: 'Um trade-off explicado em voz alta',
          code: `Guardei o histórico de buscas no localStorage porque não precisava de servidor
e cabia no tempo do desafio. O custo é que o histórico não aparece em outro
aparelho. Se a pessoa precisasse disso, eu salvaria num banco, junto do login.`,
        },
        {
          type: 'quiz',
          question:
            'Na conversa, perguntam: “por que você não usou uma biblioteca de gerenciamento de estado?”. Qual resposta mostra mais maturidade?',
          options: [
            {
              text: '“O estado era só o CEP e o resultado, então um estado local resolvia sem dependência extra. Se a aplicação crescesse para várias telas compartilhando dados, eu reavaliaria.”',
              correct: true,
              feedback:
                'Isso. Explica a escolha pelo tamanho do problema, reconhece quando ela deixaria de servir e não trata a ferramenta como certa ou errada.',
            },
            {
              text: '“Porque essas bibliotecas são ruins.”',
              feedback:
                'Ferramentas resolvem problemas diferentes. Desqualificar uma inteira passa a impressão de opinião sem critério.',
            },
            {
              text: '“Desculpa, eu deveria ter usado. Posso refazer.”',
              feedback:
                'A pergunta não era uma crítica: era um convite para você explicar. Defender uma escolha razoável é o que se espera.',
            },
          ],
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem uma apresentação de cinco minutos do seu desafio.',
          items: [
            'O problema, em uma frase',
            'Uma demonstração rápida, incluindo um caso de erro',
            'As principais decisões e o porquê',
            'Um trade-off ou uma falha que você encontrou',
            'O que faria com mais tempo',
          ],
          explanation:
            'Começar pela demonstração do problema resolvido prende a atenção. Mostrar um caso de erro e uma falha que você mesma encontrou prova que você testou de verdade. Terminar com próximos passos abre espaço para perguntas.',
        },
      ],
    },
    {
      id: 'conversa-com-a-equipe',
      title: 'A conversa com a equipe',
      blocks: [
        {
          type: 'text',
          text: 'Quase toda entrevista termina com “você tem alguma pergunta?”. Responda que sim. A entrevista também é a sua chance de avaliar a empresa: como ela recebe pessoas iniciantes, se existe mentoria e como é a rotina.',
        },
        {
          type: 'list',
          items: [
            '**Mentoria:** “Como é o acompanhamento de uma pessoa júnior nos primeiros meses?”',
            '**Expectativas:** “O que vocês esperam de mim nos primeiros três meses?”',
            '**Rotina:** “Como é uma semana típica da equipe?”',
            '**Qualidade:** “Como funciona a revisão de código e os testes antes de ir para produção?”',
            '**Feedback:** “Com que frequência as pessoas recebem feedback?”',
          ],
        },
        {
          type: 'classify',
          prompt: 'Que respostas da empresa são bons sinais e quais são sinais de alerta?',
          buckets: ['Bom sinal', 'Sinal de alerta'],
          items: [
            {
              text: '“Toda pessoa nova tem alguém de referência nas primeiras semanas”',
              bucket: 0,
            },
            { text: '“Todo pull request é revisado antes de ir para produção”', bucket: 0 },
            { text: '“Fazemos conversas de feedback todo mês”', bucket: 0 },
            {
              text: '“Nos primeiros meses, esperamos que você aprenda o sistema com tarefas pequenas”',
              bucket: 0,
            },
            { text: '“Aqui cada um se vira sozinho desde o primeiro dia”', bucket: 1 },
            { text: '“Trabalhar no fim de semana é normal, faz parte da cultura”', bucket: 1 },
            { text: '“Não temos testes; quando quebra, corrigimos direto em produção”', bucket: 1 },
            {
              text: 'O desafio é construir uma funcionalidade inteira do produto real, sem pagamento',
              bucket: 1,
            },
          ],
          explanation:
            'Uma empresa que recebe bem iniciantes tem mentoria, revisão e expectativas claras. Sinais de alerta não eliminam a vaga sozinhos, mas merecem uma pergunta a mais. E um desafio que é trabalho de verdade, sem pagamento, é uso indevido do seu tempo.',
        },
        {
          type: 'quiz',
          question:
            'Uma semana depois, chega o e-mail: você não seguiu no processo. Qual a melhor próxima ação?',
          options: [
            {
              text: 'Agradecer, pedir com educação um retorno sobre o desafio e anotar o que ouvir no seu plano de estudo',
              correct: true,
              feedback:
                'Isso. Nem toda empresa responde, mas quando responde o retorno vale ouro. A próxima aula mostra como transformar isso num plano de revisão.',
            },
            {
              text: 'Responder questionando a decisão',
              feedback:
                'A decisão já foi tomada, e discutir fecha portas para vagas futuras na mesma empresa. Pedir feedback com educação é bem mais útil.',
            },
            {
              text: 'Apagar o repositório do desafio',
              feedback:
                'O desafio é trabalho seu e pode virar portfólio, se o enunciado permitir. Melhore o que faltou e mantenha.',
            },
          ],
        },
      ],
    },
  ],
  recap: [
    'Take-home avalia organização, testes e documentação; ao vivo, raciocínio e comunicação.',
    'Leia o enunciado separando obrigatório, diferencial e dúvidas, pergunte cedo e respeite a estimativa de tempo.',
    'O README do desafio diz como rodar, as decisões, o que está testado, o que ficou de fora e como você usou IA.',
    'Commits pequenos com mensagens claras contam o seu processo; rode os testes antes de enviar.',
    'Explique escolhas como trade-offs e use as perguntas finais para avaliar mentoria, rotina e expectativas da equipe.',
  ],
  cards: [
    {
      id: 'take-home-live',
      front: 'Qual a diferença entre take-home e live coding?',
      back: 'Take-home é feito em casa, com prazo, e entregue num repositório. Live coding é resolvido ao vivo, com alguém assistindo.',
    },
    {
      id: 'estimativa-de-tempo',
      front: 'Para que serve a estimativa de horas de um desafio?',
      back: 'Diz o tamanho esperado da entrega. Respeitá-la mostra que você sabe priorizar.',
    },
    {
      id: 'readme-desafio',
      front: 'O que o README de um desafio deve ter?',
      back: 'Como rodar, decisões, o que está testado, o que ficou de fora e como usou IA.',
    },
    {
      id: 'trade-off',
      front: 'O que é um trade-off?',
      back: 'A troca de uma escolha: o que você ganha, o que paga e quando mudaria de ideia.',
    },
    {
      id: 'pedir-prazo',
      front: 'Como pedir mais prazo num desafio?',
      back: 'Cedo, com um motivo curto, uma data proposta e uma alternativa.',
    },
    {
      id: 'perguntas-equipe',
      front: 'Cite duas perguntas boas para fazer à equipe.',
      back: 'Como é o acompanhamento de uma pessoa júnior? O que esperam nos primeiros três meses?',
    },
  ],
  mission: {
    title: 'Entregue um desafio como se fosse valer',
    text: 'Pegue um enunciado de desafio da sua carreira, como o da consulta de CEP, ou um que você recebeu, e faça em um timebox de no máximo seis horas. O objetivo é praticar a entrega inteira, não só o código.',
    steps: [
      'Separe o enunciado em obrigatório, diferencial e dúvidas, e decida as premissas',
      'Faça o obrigatório com testes, em commits pequenos com mensagens claras',
      'Escreva o README com execução, testes, decisões, o que ficou de fora e uso de IA',
      'Clone o repositório em outra pasta e confira se roda seguindo só o README',
      'Apresente em cinco minutos para alguém e registre o feedback no seu plano de estudo',
    ],
  },
  sources: [
    { title: 'Conventional Commits', url: 'https://www.conventionalcommits.org/pt-br/v1.0.0/' },
    {
      title: 'GitHub Docs: sobre os READMEs',
      url: 'https://docs.github.com/pt/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes',
    },
    { title: 'Pro Git, em português', url: 'https://git-scm.com/book/pt-br/v2' },
    {
      title: 'Tech Interview Handbook: perguntas para fazer à empresa (em inglês)',
      url: 'https://www.techinterviewhandbook.org/final-questions/',
    },
  ],
};
