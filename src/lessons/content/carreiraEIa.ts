import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Saber fazer e conseguir mostrar que sabe fazer são habilidades diferentes, e a segunda também se aprende. Quem avalia uma pessoa iniciante tem poucos minutos e quer ver uma coisa: se ela consegue construir algo, explicar o que construiu e continuar aprendendo. Nesta aula você prepara essa vitrine, aprende a ler vagas sem se assustar e a usar IA como colega de estudo, não como atalho que esvazia o aprendizado.',
  sections: [
    {
      id: 'projeto-que-se-explica',
      title: 'Um projeto que se explica sozinho',
      blocks: [
        {
          type: 'analogy',
          title: 'A receita com foto e modo de preparo',
          text: 'Uma receita só com a lista de ingredientes não convence ninguém. Com foto do prato pronto, modo de preparo e a dica “se o forno for fraco, deixe mais 10 minutos”, você confia em quem escreveu. O **README** é a receita do seu projeto.',
        },
        {
          type: 'text',
          text: 'O **README** é o arquivo `README.md` na raiz do repositório, que o GitHub mostra logo abaixo da lista de arquivos. É a primeira coisa que alguém lê. Um bom README responde: que problema isto resolve, onde vejo funcionando, como rodo, que decisões você tomou, como testou e o que ainda falta.',
        },
        {
          type: 'anatomy',
          caption: 'Um README de portfólio, escrito em Markdown.',
          language: 'markdown',
          parts: [
            {
              text: '# Catálogo da Feira\n\nCatálogo com busca e favoritos para bancas de uma feira de bairro.',
              label: 'Título e resumo',
              note: 'Uma frase que diz o que é e para quem. Quem lê decide em segundos se continua.',
            },
            { text: '\n\n' },
            {
              text: 'Demonstração: https://seu-usuario.github.io/catalogo-feira',
              label: 'Link da demonstração',
              note: 'O item mais importante. Muita gente não vai clonar nada: vai clicar, testar no celular e voltar. Confira que o link funciona.',
            },
            { text: '\n\n' },
            {
              text: '## Problema\nAs bancas anunciam produtos só no grupo de mensagens e as fotos se perdem.',
              label: 'Problema',
              note: 'Um problema real, mesmo que pequeno, mostra que você pensa em quem usa, e não só em tecnologia.',
            },
            { text: '\n\n' },
            {
              text: '## Como rodar\nnpm install\nnpm run dev',
              label: 'Como rodar',
              note: 'Comandos que funcionam numa máquina limpa. Peça para alguém seguir e veja se trava em algum passo.',
            },
            { text: '\n\n' },
            {
              text: '## Decisões\n- Vue com TypeScript, para tipar os dados da API.\n- Favoritos na página do catálogo, porque cabeçalho e lista usam.',
              label: 'Decisões',
              note: 'O que você escolheu e por quê. É aqui que a pessoa vê raciocínio, e é daqui que saem as perguntas da entrevista.',
            },
            { text: '\n\n' },
            {
              text: '## Testes\nnpm test: busca, falha da API e formulário inválido.',
              label: 'Testes',
              note: 'Dizer o que está testado, e não só que existem testes, mostra que você sabe o que importa proteger.',
            },
            { text: '\n\n' },
            {
              text: '## Limites e próximos passos\n- Sem login: os favoritos somem ao limpar o navegador.\n- LCP de 3,1 s no celular; próximo passo é reduzir o banner.',
              label: 'Limites',
              note: 'Admitir o que falta não é fraqueza: é sinal de maturidade. Toda equipe trabalha com limites conhecidos.',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Seu catálogo não tem login e os favoritos somem quando a pessoa limpa o navegador. Você menciona isso no README?',
          options: [
            {
              text: 'Sim, na seção de limites, com uma ideia de como resolveria',
              correct: true,
              feedback:
                'Isso. Mostra que você conhece o próprio projeto e pensa no próximo passo. Na entrevista, vira uma conversa boa em vez de uma surpresa.',
            },
            {
              text: 'Não, porque chama atenção para um defeito',
              feedback:
                'Quem avalia vai perceber de qualquer jeito. Esconder parece descuido; explicar parece domínio do assunto.',
            },
            {
              text: 'Só se perguntarem na entrevista',
              feedback:
                'Muitas vezes não há entrevista sem antes alguém ler o README. Ali é a sua chance de mostrar que você sabe o que falta.',
            },
          ],
        },
      ],
    },
    {
      id: 'o-que-observam',
      title: 'O que quem contrata observa',
      blocks: [
        {
          type: 'text',
          text: 'Ninguém espera que uma pessoa júnior saiba tudo. O que se procura é **evidência**: de que você termina o que começa, de que entende o que fez e de que trabalha de um jeito que outras pessoas conseguem acompanhar.',
        },
        {
          type: 'classify',
          prompt: 'Quais sinais fortalecem uma candidatura e quais quase não dizem nada?',
          buckets: ['Sinal forte', 'Sinal fraco'],
          items: [
            { text: 'Link de demonstração que abre e funciona no celular', bucket: 0 },
            { text: 'README que explica problema, decisões e limites', bucket: 0 },
            { text: 'Commits pequenos com mensagens que dizem o porquê', bucket: 0 },
            { text: 'Testes rodando na CI do repositório', bucket: 0 },
            { text: 'Vinte projetos copiados de tutoriais, todos parecidos', bucket: 1 },
            { text: 'Quinze tecnologias no currículo sem projeto que use nenhuma', bucket: 1 },
            { text: 'Repositório com um único commit chamado “final”', bucket: 1 },
          ],
          explanation:
            'Um projeto completo, publicado e bem explicado vale mais que muitos pela metade. Projeto de tutorial não é proibido: fica forte quando você muda alguma coisa de verdade e explica o que mudou.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Mostre colaboração',
          text: 'Se puder, tenha pelo menos um pull request revisado por outra pessoa: num projeto de amigos, de comunidade ou de código aberto. Ele mostra que você recebe feedback e ajusta o código, que é boa parte do trabalho no dia a dia.',
        },
      ],
    },
    {
      id: 'lendo-vagas',
      title: 'Lendo uma vaga sem se assustar',
      blocks: [
        {
          type: 'text',
          text: 'Muitas vagas de entrada pedem mais do que a pessoa contratada vai usar. Às vezes a descrição foi copiada de uma vaga mais sênior; às vezes é uma lista de desejos. Aprender a separar o essencial do resto evita que você desista de vagas que poderia conseguir.',
        },
        {
          type: 'code',
          language: 'text',
          caption: 'Uma vaga fictícia, parecida com muitas reais',
          code: `Pessoa Desenvolvedora Frontend Júnior

Requisitos:
- HTML, CSS e JavaScript
- React
- Git
- Consumo de APIs REST
- 3 anos de experiência com React

Diferenciais:
- TypeScript
- Testes automatizados
- Docker e Kubernetes`,
        },
        {
          type: 'classify',
          prompt: 'Separe o que é base da vaga, o que é diferencial e o que é lista de desejos.',
          buckets: ['Obrigatório de verdade', 'Desejável', 'Lista de desejos'],
          items: [
            { text: 'HTML, CSS e JavaScript', bucket: 0 },
            { text: 'React', bucket: 0 },
            { text: 'Git', bucket: 0 },
            { text: 'Consumo de APIs REST', bucket: 0 },
            { text: 'TypeScript', bucket: 1 },
            { text: 'Testes automatizados', bucket: 1 },
            { text: '3 anos de experiência numa vaga júnior', bucket: 2 },
            { text: 'Docker e Kubernetes numa vaga de frontend júnior', bucket: 2 },
          ],
          explanation:
            'O obrigatório costuma ser o que aparece em quase toda vaga parecida. Três anos de experiência contradizem o próprio nível júnior, e infraestrutura avançada raramente é tarefa de quem está começando no frontend. TypeScript e testes você já estudou nesta trilha: são diferenciais ao seu alcance.',
        },
        {
          type: 'quiz',
          question:
            'Você tem a base da vaga e um dos diferenciais, mas não tem os três anos de experiência. O que fazer?',
          options: [
            {
              text: 'Candidatar-se, com o portfólio em destaque, e anotar o diferencial que falta como próximo estudo',
              correct: true,
              feedback:
                'Isso. Se você atende à maior parte, vale tentar. E comparar várias vagas mostra qual lacuna aparece sempre: essa é a próxima a estudar.',
            },
            {
              text: 'Esperar até cumprir todos os itens',
              feedback:
                'Muita gente contratada também não cumpria todos. Esperar a lista completa pode significar esperar para sempre.',
            },
            {
              text: 'Fazer um curso de Docker e Kubernetes antes de se candidatar',
              feedback:
                'É o item menos relacionado ao trabalho de frontend júnior. Estude o que se repete nas vagas que você quer, não o item mais assustador.',
            },
          ],
        },
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              title: 'Estágio',
              text: 'Para quem está estudando em curso técnico ou superior. Costuma ter mentoria e é feito para aprender trabalhando.',
            },
            {
              title: 'Vagas júnior',
              text: 'Esperam autonomia em tarefas pequenas e vontade de aprender. Projetos completos no portfólio pesam muito aqui.',
            },
            {
              title: 'Freelas pequenos',
              text: 'A página de um pequeno negócio do bairro ou de uma ONG. Combine escopo e prazo por escrito e comece por algo que você consegue entregar.',
            },
            {
              title: 'Código aberto e comunidades',
              text: 'Corrigir documentação ou uma issue marcada para iniciantes gera pull requests revisados. Comunidades e eventos locais trazem indicações e mentoria.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Inglês aos poucos',
          text: 'A documentação mais atual está quase sempre em inglês. Não espere ficar fluente: leia uma página da documentação do seu framework por dia, com tradutor do lado no começo. Em poucos meses você vai precisar dele bem menos.',
        },
      ],
    },
    {
      id: 'ia-no-fluxo',
      title: 'IA no fluxo de trabalho',
      blocks: [
        {
          type: 'analogy',
          title: 'O colega veterano que às vezes inventa',
          text: 'Imagine um colega que leu muita coisa, responde na hora e nunca perde a paciência, mas que às vezes afirma com toda a segurança algo que não existe. Você aprenderia muito com ele, desde que **conferisse** o que ele diz antes de usar.',
        },
        {
          type: 'text',
          text: 'Assistentes de IA geram texto e código prevendo o que parece uma boa resposta. Por isso acertam muito e também **inventam**: funções que não existem, opções de versões antigas, explicações convincentes e erradas. A ferramenta é ótima; a responsabilidade pelo código continua sendo sua.',
        },
        {
          type: 'classify',
          prompt: 'Quais usos de IA ajudam a aprender e trabalhar, e quais são riscos?',
          buckets: ['Bom uso', 'Risco'],
          items: [
            { text: 'Pedir para explicar uma mensagem de erro', bucket: 0 },
            { text: 'Pedir sugestões de casos de teste para uma função', bucket: 0 },
            { text: 'Pedir explicação linha a linha de um código desconhecido', bucket: 0 },
            { text: 'Pedir crítica à sua hipótese sobre um bug', bucket: 0 },
            { text: 'Colar o arquivo `.env` com as chaves para ela achar o erro', bucket: 1 },
            { text: 'Usar uma função sugerida sem conferir se ela existe', bucket: 1 },
            { text: 'Entregar a solução do exercício sem conseguir explicá-la', bucket: 1 },
            { text: 'Confiar na versão de biblioteca citada sem ver a documentação', bucket: 1 },
          ],
          explanation:
            'Os bons usos deixam você mais perto de entender. Os riscos são de três tipos: **vazar** dados (segredos, código da empresa, dados de clientes), **acreditar** sem verificar e **terceirizar** o entendimento, que é justamente o que você precisa mostrar numa entrevista.',
        },
        {
          type: 'quiz',
          question:
            'Qual pedido tende a gerar uma resposta que ensina e que você consegue verificar?',
          options: [
            {
              text: '“Estou aprendendo JavaScript. Esta função deveria filtrar produtos pelo nome, mas devolve lista vazia quando digito Cam. Segue o código e um exemplo de entrada. Me ajude a achar o erro e explique o porquê, sem reescrever tudo.”',
              correct: true,
              feedback:
                'Isso. Tem contexto (seu nível), o comportamento esperado, o que acontece de fato, um exemplo para testar e o tipo de ajuda que você quer. A resposta vem focada e fácil de conferir.',
            },
            {
              text: '“Meu código não funciona, conserta.”',
              feedback:
                'Sem contexto, a ferramenta chuta. E “conserta” pede a resposta pronta, sem explicação: você sai sem entender e sem como verificar.',
            },
            {
              text: '“Faça um catálogo completo em React com busca, favoritos e testes.”',
              feedback:
                'Gera muito código de uma vez, que você não escreveu nem entende. Na primeira mudança ou pergunta de entrevista, você fica sem chão.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'O que nunca colar numa ferramenta de IA',
          text: 'Senhas, chaves de API, conteúdo de `.env`, dados pessoais de clientes e código da empresa sem permissão. Em muitos serviços o que você digita pode ser guardado. Troque valores reais por exemplos antes de perguntar.',
        },
      ],
    },
    {
      id: 'ciclo-de-verificacao',
      title: 'O ciclo de verificação',
      blocks: [
        {
          type: 'text',
          text: 'Veja um caso típico. Você pediu um jeito de tirar tags repetidas de uma lista, e a resposta veio confiante.',
        },
        {
          type: 'code',
          language: 'js',
          caption: 'A sugestão da IA, rodada no console',
          code: `const tags = ['promo', 'novo', 'promo'];
const unicas = tags.unique();`,
          output: 'TypeError: tags.unique is not a function',
        },
        {
          type: 'reveal',
          question: 'O que aconteceu, e como você confirmaria a solução certa?',
          answer:
            'Arrays em JavaScript não têm o método `unique`: a ferramenta misturou com outra linguagem ou biblioteca. Na documentação da MDN você confirma que um `Set` guarda valores sem repetição, então `[...new Set(tags)]` resolve. Rodar o código e conferir a fonte transformou uma resposta errada em aprendizado.',
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem o ciclo para usar uma resposta de IA com segurança.',
          items: [
            'Perguntar com contexto, dizendo o que você já tentou',
            'Ler a resposta inteira, linha por linha',
            'Testar no seu código, incluindo um caso que deveria falhar',
            'Conferir na documentação oficial',
            'Explicar a solução com suas palavras',
          ],
          explanation:
            'O último passo é o teste definitivo: se você não consegue explicar, ainda não aprendeu, só copiou. Escrever um teste automatizado para a mudança, como na aula de testes, é a melhor forma de fechar o ciclo.',
        },
      ],
    },
    {
      id: 'entrevistas-e-rotina',
      title: 'Entrevistas e uma rotina que dura',
      blocks: [
        {
          type: 'text',
          text: 'Em entrevistas para vagas de entrada, é muito comum pedirem que você apresente um projeto seu. Ninguém espera código perfeito: espera que você saiba **por que** ele é como é.',
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Que problema o projeto resolve?',
              text: 'Uma ou duas frases, sem tecnologia. Pratique em voz alta até sair natural.',
            },
            {
              title: 'Por que essas escolhas?',
              text: 'Por que esse framework, onde mora cada estado, por que essa divisão de componentes. O README já tem as respostas.',
            },
            {
              title: 'Como você sabe que funciona?',
              text: 'Que testes existem, o que eles cobrem e o que você mediu de desempenho e acessibilidade.',
            },
            {
              title: 'O que você faria diferente?',
              text: 'Os limites e próximos passos. Uma resposta honesta aqui mostra que você continua aprendendo.',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Na entrevista, perguntam sobre uma parte do código que a IA sugeriu e você não entende bem. Qual a melhor resposta?',
          options: [
            {
              text: 'Falar com honestidade, explicar o que você entende, dizer que usou IA nessa parte e como verificaria o restante',
              correct: true,
              feedback:
                'Isso. Honestidade e um plano de verificação mostram exatamente o que uma equipe procura. Melhor ainda é não chegar lá: estude cada trecho do seu portfólio antes.',
            },
            {
              text: 'Inventar uma explicação confiante',
              feedback:
                'Quem entrevista costuma perceber com uma ou duas perguntas a mais, e a confiança perdida custa mais que a lacuna.',
            },
            {
              text: 'Dizer que não lembra porque fez há muito tempo',
              feedback:
                'Soa como fuga. É melhor admitir o que não sabe e mostrar como descobriria.',
            },
          ],
        },
        {
          type: 'list',
          items: [
            '**Pouco todo dia vence muito de vez em quando.** Uma hora por dia rende mais que oito horas num sábado e nada na semana.',
            '**Construa mais do que assiste.** Para cada aula ou vídeo, escreva algum código que não estava no exemplo.',
            '**Revise com espaçamento.** Os cartões de revisão desta plataforma existem para isso: rever um pouco depois de alguns dias fixa melhor que reler tudo de uma vez.',
            '**Descanse.** Dormir faz parte de aprender, e um problema travado à noite muitas vezes se resolve na manhã seguinte.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Sobre o tempo',
          text: 'Concluir a trilha não garante uma vaga, e o tempo até a primeira oportunidade varia muito de pessoa para pessoa. Candidatar-se, receber feedback e ajustar o estudo faz parte do processo, não é sinal de fracasso.',
        },
      ],
    },
  ],
  recap: [
    'Um bom README mostra o problema, a demonstração, como rodar, as decisões, os testes e os limites do projeto.',
    'Quem contrata procura evidência: projeto completo e publicado, histórico de commits claro e capacidade de explicar o que foi feito.',
    'Em uma vaga, separe o obrigatório do desejável e da lista de desejos; se você atende à maior parte, candidate-se e estude a lacuna que mais se repete.',
    'IA é ótima para explicar e revisar, mas inventa: pergunte com contexto, teste, confira na documentação e explique com suas palavras.',
    'Nunca cole segredos ou dados privados numa ferramenta de IA, e estude cada trecho do seu portfólio antes de apresentá-lo.',
  ],
  cards: [
    {
      id: 'readme-essencial',
      front: 'O que não pode faltar no README de um projeto de portfólio?',
      back: 'Problema, link de demonstração, como rodar, decisões, testes e limites.',
    },
    {
      id: 'limites-no-readme',
      front: 'Por que listar os limites do projeto no README?',
      back: 'Mostra que você conhece o próprio código e pensa nos próximos passos, um sinal de maturidade.',
    },
    {
      id: 'vaga-lista-de-desejos',
      front: 'Uma vaga júnior pede itens que você não tem. Quando se candidatar?',
      back: 'Quando você atende à maior parte do que é base. Anote a lacuna que mais se repete entre vagas e estude-a.',
    },
    {
      id: 'ia-bons-usos',
      front: 'Cite bons usos de IA no estudo de programação.',
      back: 'Explicar erros, sugerir casos de teste, explicar código desconhecido e criticar suas hipóteses.',
    },
    {
      id: 'ia-riscos',
      front: 'Quais são os três grandes riscos de usar IA no código?',
      back: 'Vazar dados e segredos, acreditar em respostas inventadas sem verificar e terceirizar o entendimento.',
    },
    {
      id: 'ciclo-verificacao',
      front: 'Qual é o ciclo para usar uma resposta de IA com segurança?',
      back: 'Perguntar com contexto, ler, testar, conferir na documentação e explicar com suas palavras.',
    },
    {
      id: 'entrevista-projeto',
      front: 'Quatro perguntas para preparar sobre o seu projeto antes de uma entrevista.',
      back: 'Que problema resolve, por que essas escolhas, como sabe que funciona e o que faria diferente.',
    },
  ],
  mission: {
    title: 'Coloque seu projeto na vitrine',
    text: 'Pegue o projeto de catálogo da trilha e transforme em algo que você apresentaria amanhã numa entrevista. O objetivo é sair desta missão com um link para mandar e uma lacuna clara para estudar.',
    steps: [
      'Publique o projeto e escreva o README com problema, demonstração, decisões, testes e limites',
      'Peça feedback a alguém que use o projeto no celular e registre uma issue com o que ouvir',
      'Corrija essa issue com ajuda de IA, escrevendo um teste que prove a correção',
      'Compare três vagas de entrada da sua região ou remotas e marque o que se repete',
      'Escolha uma lacuna concreta e planeje duas semanas de estudo para ela',
    ],
  },
  sources: [
    {
      title: 'GitHub Docs: sobre os READMEs',
      url: 'https://docs.github.com/pt/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes',
    },
    {
      title: 'Open Source Guides: como contribuir',
      url: 'https://opensource.guide/pt/how-to-contribute/',
    },
    { title: 'OWASP: Top 10 para aplicações com LLM', url: 'https://genai.owasp.org/llm-top-10/' },
  ],
};
