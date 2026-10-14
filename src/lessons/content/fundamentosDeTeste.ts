import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Um aplicativo de banco que mostra o saldo errado, um Pix que sai duas vezes, um site de vacinação que trava no dia da campanha: alguém poderia ter visto isso antes. Quem trabalha com testes e qualidade (QA, de quality assurance) é a pessoa paga para fazer as perguntas incômodas antes de o problema chegar a milhões de pessoas. Você não precisa programar para começar: precisa de curiosidade, método e um vocabulário que o time inteiro entende.',
  sections: [
    {
      id: 'por-que-testar',
      title: 'Por que testar',
      blocks: [
        {
          type: 'analogy',
          title: 'Quem cozinha prova antes de servir',
          text: 'Na cozinha de um restaurante, ninguém manda o feijão para o salão sem provar. Provar não deixa o feijão mais gostoso: mostra **se** ele está bom e dá tempo de corrigir o sal antes que o cliente reclame. Testar software é isso: provar antes de servir.',
        },
        {
          type: 'text',
          text: '**Testar** é colocar o sistema para funcionar de propósito e comparar o que ele faz com o que deveria fazer. Quando os dois não batem, você encontrou informação valiosa: um problema que ainda dá para corrigir com calma.',
        },
        {
          type: 'text',
          text: 'Os objetivos de testar vão além de achar bugs. Testes dão **confiança** para lançar, mostram **riscos** que ainda existem e ajudam o time a **decidir**: dá para publicar hoje ou é melhor esperar?',
        },
        {
          type: 'quiz',
          question:
            'A gerente pergunta: “Se a equipe de QA testou tudo, então o sistema está livre de bugs, certo?”. Qual a melhor resposta?',
          options: [
            {
              text: 'Não. Os testes reduzem o risco e mostram o que foi encontrado, mas não provam que não há nenhum bug',
              correct: true,
              feedback:
                'Isso. Testar mostra a presença de problemas, nunca a ausência total. A conversa honesta é sobre quanto risco ainda sobra e se ele é aceitável.',
            },
            {
              text: 'Sim. Se todos os testes passaram, não há bugs',
              feedback:
                'Os testes só conferem os cenários que alguém pensou. Um caso esquecido pode esconder um bug. Prometer “zero bugs” quebra a confiança no primeiro problema em produção.',
            },
            {
              text: 'Não, porque testar serve apenas para encontrar culpados pelos erros',
              feedback:
                'Testar não é caçar culpados. O objetivo é dar informação para o time melhorar o produto. Um clima de culpa faz as pessoas esconderem problemas.',
            },
          ],
        },
      ],
    },
    {
      id: 'erro-defeito-falha',
      title: 'Erro, defeito e falha',
      blocks: [
        {
          type: 'analogy',
          title: 'A receita de bolo',
          text: 'A avó dita a receita por áudio no grupo da família e você anota “3 xícaras de sal” em vez de açúcar. Isso foi um **engano** seu. A receita escrita agora tem um **defeito**. Ninguém percebe nada até alguém assar e provar: o bolo salgado é a **falha**.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Erro (ou engano)',
              text: 'Uma ação humana que produz um resultado incorreto: entender mal o pedido, digitar o número errado, esquecer um caso. Acontece na cabeça e nas mãos de uma pessoa.',
            },
            {
              term: 'Defeito (ou bug)',
              text: 'A imperfeição que o erro deixou num produto de trabalho: no código, na regra escrita, no desenho da tela. Ele fica ali parado, esperando.',
            },
            {
              term: 'Falha',
              text: 'O que se vê quando o defeito é executado: o sistema se comporta diferente do esperado. É a falha que a pessoa usuária sente.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Um defeito pode existir por anos sem causar falha, se ninguém passar pelo caminho dele. E uma falha também pode vir de fora do código, como um servidor sem memória ou uma rede caindo. Por isso a pergunta “qual é o defeito por trás desta falha?” é tão útil.',
        },
        {
          type: 'classify',
          prompt: 'Na história de um aplicativo de delivery, classifique cada situação.',
          buckets: ['Erro (engano)', 'Defeito', 'Falha'],
          items: [
            {
              text: 'A pessoa desenvolvedora entendeu que a taxa de entrega era por pedido, mas era por loja',
              bucket: 0,
            },
            { text: 'A analista copiou o valor do cupom errado para a especificação', bucket: 0 },
            {
              text: 'Uma linha de código soma a taxa só uma vez para pedidos com duas lojas',
              bucket: 1,
            },
            { text: 'A especificação diz que o cupom vale R$ 50 em vez de R$ 5', bucket: 1 },
            {
              text: 'O cliente vê uma taxa de entrega menor do que a cobrada no cartão',
              bucket: 2,
            },
            { text: 'O aplicativo fecha sozinho ao aplicar o cupom', bucket: 2 },
          ],
          explanation:
            'Siga a cadeia: uma pessoa se engana (erro), o engano fica gravado em algo (defeito) e, quando esse algo roda, aparece o comportamento errado (falha). Quem testa costuma ver primeiro a falha e investiga até achar o defeito.',
        },
        {
          type: 'text',
          text: 'Agora sinta isso numa tela de verdade. O carrinho de padaria abaixo tem um defeito. Primeiro observe a **falha** olhando a página; depois ache o **defeito** no código.',
        },
        {
          type: 'playground',
          title: 'Da falha ao defeito',
          task: 'Olhe a página: some de cabeça os valores de cada linha e compare com o total mostrado. Eles batem? Depois encontre, na função `calcularTotal`, a linha que esquece a quantidade de cada item e corrija. Dica: o valor de uma linha é `item.preco * item.quantidade`.',
          html: `<main>
  <h1>Padaria Pão Quente</h1>
  <ul id="lista"></ul>
  <p><strong>Total:</strong> <span id="total"></span></p>
</main>`,
          css: `body { font-family: system-ui, sans-serif; padding: 1rem; color: #222; }
ul { padding-left: 1.2rem; }
li { margin: 0.3rem 0; }
#total { font-size: 1.3rem; color: #0a5; }`,
          js: `const itens = [
  { nome: 'Pão francês', preco: 0.8, quantidade: 10 },
  { nome: 'Leite', preco: 5.5, quantidade: 2 },
  { nome: 'Café 500 g', preco: 18, quantidade: 1 },
];

function reais(valor) {
  return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

function calcularTotal(lista) {
  let total = 0;
  for (const item of lista) {
    total = total + item.preco;
  }
  return total;
}

for (const item of itens) {
  const linha = document.createElement('li');
  linha.textContent =
    item.quantidade + ' x ' + item.nome + ': ' + reais(item.preco * item.quantidade);
  document.getElementById('lista').appendChild(linha);
}
document.getElementById('total').textContent = reais(calcularTotal(itens));`,
          checks: [
            {
              label: 'O total da página mostra `R$ 37,00`',
              test: `return document.getElementById('total')?.textContent?.trim() === 'R$ 37,00';`,
            },
            {
              label: '`calcularTotal` considera a quantidade de cada item',
              test: `try {
  const total = calcularTotal([{ nome: 'Sonho', preco: 4, quantidade: 3 }]);
  return Math.abs(total - 12) < 0.001;
} catch (erro) {
  return false;
}`,
            },
            {
              label: 'Uma lista vazia continua dando zero',
              test: `try {
  return calcularTotal([]) === 0 && Math.abs(calcularTotal([{ preco: 2, quantidade: 5 }, { preco: 1, quantidade: 1 }]) - 11) < 0.001;
} catch (erro) {
  return false;
}`,
            },
          ],
          solution: {
            js: `const itens = [
  { nome: 'Pão francês', preco: 0.8, quantidade: 10 },
  { nome: 'Leite', preco: 5.5, quantidade: 2 },
  { nome: 'Café 500 g', preco: 18, quantidade: 1 },
];

function reais(valor) {
  return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

function calcularTotal(lista) {
  let total = 0;
  for (const item of lista) {
    total = total + item.preco * item.quantidade;
  }
  return total;
}

for (const item of itens) {
  const linha = document.createElement('li');
  linha.textContent =
    item.quantidade + ' x ' + item.nome + ': ' + reais(item.preco * item.quantidade);
  document.getElementById('lista').appendChild(linha);
}
document.getElementById('total').textContent = reais(calcularTotal(itens));`,
          },
        },
        {
          type: 'reveal',
          question:
            'Se todos os clientes da padaria comprassem só uma unidade de cada produto, esse defeito causaria alguma falha?',
          answer:
            'Não. Com quantidade 1, somar só o preço dá o mesmo resultado. O defeito continuaria no código, escondido, até alguém comprar dez pães. É por isso que quem testa escolhe dados variados: o mesmo caminho com dados diferentes revela coisas diferentes.',
        },
      ],
    },
    {
      id: 'sete-principios',
      title: 'Os sete princípios do teste',
      blocks: [
        {
          type: 'text',
          text: 'O ISTQB, a organização internacional que define o vocabulário de testes (no Brasil representada pelo BSTQB), resume décadas de experiência em sete princípios. Não precisa decorar os nomes; entenda a ideia de cada um, porque eles aparecem em toda conversa de time.',
        },
        {
          type: 'table',
          caption: 'Os sete princípios em palavras simples',
          head: ['Princípio', 'O que quer dizer'],
          rows: [
            [
              '**Testar mostra a presença de defeitos**',
              'Testes encontram problemas, mas não provam que não existe nenhum.',
            ],
            [
              '**Testar tudo é impossível**',
              'Um campo de idade já tem milhares de entradas possíveis. Você escolhe com técnica e risco.',
            ],
            [
              '**Testar cedo economiza**',
              'Um engano achado na conversa sobre a regra custa minutos; em produção, custa dias e clientes.',
            ],
            [
              '**Defeitos se agrupam**',
              'Poucas partes do sistema concentram a maioria dos problemas. Onde achou um, procure mais.',
            ],
            [
              '**Testes se desgastam**',
              'Repetir sempre os mesmos testes para de achar coisas novas, como um remédio que a praga aprende a resistir. Renove os casos.',
            ],
            [
              '**Testar depende do contexto**',
              'Um aplicativo de hospital e um joguinho de celular não são testados do mesmo jeito.',
            ],
            [
              '**Ausência de defeitos é uma ilusão**',
              'Um sistema sem bugs que não resolve o problema das pessoas continua sendo um fracasso.',
            ],
          ],
        },
        {
          type: 'quiz',
          question:
            'O time roda a mesma lista de 40 testes manuais toda semana há um ano. Nenhum encontra bugs, mas os clientes continuam reclamando de problemas novos. Que princípio explica isso?',
          options: [
            {
              text: 'Testes se desgastam: os mesmos casos repetidos param de encontrar defeitos novos',
              correct: true,
              feedback:
                'Exato. Esse princípio também é chamado de paradoxo do pesticida. Os 40 testes ainda servem para pegar regressões, mas o time precisa criar casos novos e explorar as áreas que mudaram.',
            },
            {
              text: 'Ausência de defeitos é uma ilusão: o sistema não tem bugs',
              feedback:
                'Os clientes estão achando bugs, então eles existem. Esse princípio fala de outra coisa: um sistema pode estar correto e mesmo assim não servir para quem usa.',
            },
            {
              text: 'Testar tudo é impossível, então não vale a pena manter a lista',
              feedback:
                'Ser impossível testar tudo não significa desistir. A lista ajuda a conferir o que já funcionava; o problema é depender só dela.',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Numa semana, você achou 9 bugs no módulo de pagamento e 1 no resto do sistema. Onde faz mais sentido investir o próximo dia de testes?',
          options: [
            {
              text: 'No pagamento, porque defeitos costumam se agrupar',
              correct: true,
              feedback:
                'Isso. Uma área com muitos defeitos geralmente é complexa, mudou muito ou foi feita com pressa. As chances de haver mais problemas ali são maiores.',
            },
            {
              text: 'No resto do sistema, porque o pagamento já foi bem testado',
              feedback:
                'Parece justo dividir o esforço, mas a evidência aponta o contrário: onde já apareceram muitos bugs, provavelmente há outros.',
            },
            {
              text: 'Em nenhum lugar: com 10 bugs achados, o sistema já está seguro',
              feedback:
                'Contar bugs achados não diz quantos sobraram. Testar mostra presença de defeitos, não ausência.',
            },
          ],
        },
      ],
    },
    {
      id: 'niveis-e-tipos',
      title: 'Níveis e tipos de teste',
      blocks: [
        {
          type: 'text',
          text: 'Pense num prédio. O engenheiro confere cada tijolo, depois se as paredes encaixam, depois o prédio inteiro com água e luz, e por fim o morador visita e diz se é o apartamento que comprou. Os **níveis de teste** seguem essa mesma escala, do pedaço pequeno ao todo.',
        },
        {
          type: 'pyramid',
          caption: 'Os quatro níveis de teste, do maior para o menor pedaço.',
          levels: [
            {
              title: 'Aceitação',
              text: 'A área de negócio ou a pessoa usuária confere se o sistema resolve o problema dela. Exemplo: a padaria aprova o novo sistema de encomendas.',
            },
            {
              title: 'Sistema',
              text: 'O sistema inteiro funcionando junto, como a pessoa usaria. Exemplo: fazer uma encomenda do começo ao fim.',
            },
            {
              title: 'Integração',
              text: 'Duas partes conversando. Exemplo: o site envia o pedido e o sistema de pagamento responde certo.',
            },
            {
              title: 'Unidade',
              text: 'Uma parte pequena isolada, como a função que calcula o total. Quase sempre automatizado por quem desenvolve.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Já os **tipos de teste** dizem **o que** você quer descobrir, em qualquer nível. Os mais falados no dia a dia são estes quatro.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Funcional',
              text: 'O sistema faz o que deveria? O cupom dá o desconto certo, o login recusa senha errada.',
            },
            {
              term: 'Não funcional',
              text: 'Como o sistema faz: velocidade, segurança, acessibilidade, facilidade de uso. O site aguenta 10 mil pessoas na Black Friday?',
            },
            {
              term: 'Regressão',
              text: 'Reconferir o que já funcionava depois de uma mudança, para ver se nada quebrou sem querer.',
            },
            {
              term: 'Smoke (fumaça)',
              text: 'Uma checagem rápida e rasa dos caminhos principais logo depois de uma entrega: o sistema liga, abre, deixa entrar? O nome vem de ligar um aparelho e ver se sai fumaça.',
            },
          ],
        },
        {
          type: 'classify',
          prompt: 'Que tipo de teste é cada situação?',
          buckets: ['Funcional', 'Não funcional', 'Regressão', 'Smoke'],
          items: [
            { text: 'Conferir que o frete é grátis para compras acima de R$ 100', bucket: 0 },
            {
              text: 'Verificar se a página de pagamento abre em menos de 2 segundos no 4G',
              bucket: 1,
            },
            { text: 'Navegar pelo formulário usando só o teclado', bucket: 1 },
            {
              text: 'Depois de mudarem o cálculo do frete, refazer os testes antigos de cupom',
              bucket: 2,
            },
            {
              text: 'Logo após publicar, abrir o site, fazer login e ver a home carregar',
              bucket: 3,
            },
            { text: 'Checar se o sistema recusa CPF com dígito verificador errado', bucket: 0 },
          ],
          explanation:
            'Funcional pergunta “faz certo?”. Não funcional pergunta “faz bem?”. Regressão pergunta “continua fazendo depois da mudança?”. Smoke pergunta “está de pé para começar a testar?”.',
        },
      ],
    },
    {
      id: 'qa-no-time',
      title: 'QA no time: cedo e junto',
      blocks: [
        {
          type: 'text',
          text: 'Duas perguntas parecem iguais, mas não são. **Verificação**: construímos o produto do jeito certo, conforme a regra escrita? **Validação**: construímos o produto certo, aquele que a pessoa precisava?',
        },
        {
          type: 'quiz',
          question:
            'O app de agendamento do posto de saúde segue exatamente a especificação, mas as pessoas idosas não conseguem marcar consulta porque os botões são minúsculos. Isso é um problema de quê?',
          options: [
            {
              text: 'De validação: o sistema obedece à regra, mas não atende quem precisa dele',
              correct: true,
              feedback:
                'Isso. A verificação passaria, porque tudo está como foi escrito. A validação falha, porque o produto não resolve o problema real. Conversar com quem usa revela isso.',
            },
            {
              text: 'De verificação: o código está diferente da especificação',
              feedback:
                'O enunciado diz que o app segue a especificação à risca. A especificação é que esqueceu de quem ia usar.',
            },
            {
              text: 'Não é um problema, porque o sistema faz o que foi pedido',
              feedback:
                'É o princípio da ausência de defeitos como ilusão: cumprir o pedido e não servir para as pessoas ainda é fracasso.',
            },
          ],
        },
        {
          type: 'text',
          text: '**Shift-left** (deslocar para a esquerda) é testar mais cedo na linha do tempo do projeto. Em vez de esperar o código ficar pronto, quem testa participa da conversa sobre a funcionalidade e já pergunta: “e se o CEP não existir?”. Cada dúvida respondida ali é um defeito que nem chega a ser escrito.',
        },
        {
          type: 'text',
          text: 'Uma ferramenta central dessa conversa são os **critérios de aceite**: frases que dizem quando uma funcionalidade está pronta. Um bom critério é **verificável**, isto é, qualquer pessoa consegue dizer “passou” ou “não passou” sem opinião.',
        },
        {
          type: 'classify',
          prompt: 'Quais critérios de aceite são verificáveis e quais são vagos?',
          buckets: ['Verificável', 'Vago'],
          items: [
            { text: 'Compras a partir de R$ 100,00 têm frete grátis', bucket: 0 },
            {
              text: 'Com senha errada 3 vezes seguidas, o login fica bloqueado por 15 minutos',
              bucket: 0,
            },
            { text: 'O CEP aceita só 8 dígitos, com ou sem hífen', bucket: 0 },
            { text: 'O cadastro deve ser fácil e intuitivo', bucket: 1 },
            { text: 'A página precisa carregar rápido', bucket: 1 },
            { text: 'O sistema deve tratar bem os erros', bucket: 1 },
          ],
          explanation:
            '“Fácil”, “rápido” e “bem” mudam de pessoa para pessoa. Troque por números e comportamentos: “carrega em até 2 segundos no 4G”, “mostra a mensagem X embaixo do campo”. Ajudar a reescrever critérios vagos é um dos trabalhos mais valiosos de QA.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'O papel de QA',
          text: 'QA não é o “portão” que aprova ou barra no fim. É quem ajuda o time inteiro a entender riscos: conversa com produto sobre a regra, com desenvolvimento sobre o que é difícil de testar e com suporte sobre o que os clientes reclamam. A qualidade é responsabilidade de todos; QA torna ela visível.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns de quem começa',
          text: 'Achar que QA só entra no fim, quando o sistema está pronto. Escrever “testar o cadastro” como se fosse um caso de teste. Prometer que “está tudo testado”. E tratar bug como acusação, em vez de informação.',
        },
      ],
    },
    {
      id: 'caso-de-teste',
      title: 'Anatomia de um caso de teste',
      blocks: [
        {
          type: 'text',
          text: 'Um **caso de teste** é uma receita que qualquer pessoa do time consegue seguir e chegar à mesma conclusão. Ele diz de onde partir, o que fazer e o que deve acontecer.',
        },
        {
          type: 'anatomy',
          caption: 'Um caso de teste para o frete grátis de uma loja on-line.',
          language: 'text',
          parts: [
            {
              text: 'CT-014: Frete grátis no valor exato de R$ 100,00',
              label: 'Identificador e título',
              note: 'Um código para achar o caso e um título que diz o comportamento testado. Quem lê só o título já sabe do que se trata.',
            },
            { text: '\n\n' },
            {
              text: 'Pré-condição: pessoa logada, carrinho vazio, CEP 01310-100 cadastrado',
              label: 'Pré-condição',
              note: 'O estado de partida. Sem isso, duas pessoas executam o mesmo caso e chegam a resultados diferentes.',
            },
            { text: '\n\n' },
            {
              text: 'Passos:\n1. Adicionar um produto de R$ 100,00 ao carrinho\n2. Abrir o carrinho\n3. Clicar em “Calcular frete”',
              label: 'Passos',
              note: 'Ações concretas e numeradas, uma por linha. Escreva para quem nunca viu o sistema.',
            },
            { text: '\n\n' },
            {
              text: 'Resultado esperado: o frete aparece como “Grátis” e o total é R$ 100,00',
              label: 'Resultado esperado',
              note: 'O que deve acontecer, escrito antes de executar e de forma verificável. É contra isso que o resultado obtido será comparado.',
            },
          ],
        },
        {
          type: 'fill',
          prompt: 'Complete os nomes das partes que faltam neste caso de teste.',
          language: 'text',
          template: `CT-021: Login recusado com senha errada

[[Pré-condição|Pré-condições|Precondição|pré-condição|Pre-condição]]: existe a conta ana@exemplo.com com a senha certa Abc12345

[[Passos|passos]]:
1. Abrir a tela de login
2. Digitar ana@exemplo.com e a senha 123
3. Clicar em "Entrar"

Resultado [[esperado|Esperado]]: aparece "E-mail ou senha incorretos" e a pessoa continua na tela de login`,
          explanation:
            'Pré-condição, passos e resultado esperado formam o esqueleto de todo caso. O título já diz que é um cenário **negativo**: um teste do que o sistema deve recusar, tão importante quanto o caminho feliz.',
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem o jeito de executar um caso de teste.',
          items: [
            'Ler o caso e preparar a pré-condição',
            'Executar os passos, um por um, como estão escritos',
            'Observar o que o sistema fez (o resultado obtido)',
            'Comparar o resultado obtido com o esperado',
            'Registrar “passou” ou “falhou”, com evidência quando falhar',
          ],
          explanation:
            'O resultado esperado é escrito antes; o obtido, durante a execução. Se eles não batem, você tem uma possível falha e o próximo passo é investigar e relatar, assunto de uma aula mais adiante nesta trilha.',
        },
      ],
    },
  ],
  recap: [
    'Testar é comparar o que o sistema faz com o que deveria fazer, para encontrar problemas cedo e informar decisões.',
    'Uma pessoa comete um **erro**, que deixa um **defeito** no produto, que aparece como **falha** quando executado.',
    'Os sete princípios lembram que testar tudo é impossível, que defeitos se agrupam e que testar cedo economiza.',
    'Níveis dizem o tamanho do que se testa (unidade, integração, sistema, aceitação); tipos dizem o que se quer descobrir (funcional, não funcional, regressão, smoke).',
    'Um bom caso de teste tem pré-condição, passos e resultado esperado verificável.',
  ],
  cards: [
    {
      id: 'erro-defeito-falha',
      front: 'Qual a diferença entre erro, defeito e falha?',
      back: 'Erro é o engano humano; defeito é a imperfeição que ele deixa no produto; falha é o comportamento errado quando o defeito é executado.',
    },
    {
      id: 'defeito-sem-falha',
      front: 'Um defeito sempre causa uma falha?',
      back: 'Não. Ele pode ficar escondido até alguém passar pelo caminho dele com os dados certos.',
    },
    {
      id: 'verificacao-validacao',
      front: 'Verificação e validação: qual a diferença?',
      back: 'Verificação: fizemos do jeito certo, conforme a regra? Validação: fizemos o produto certo para quem usa?',
    },
    {
      id: 'shift-left',
      front: 'O que é shift-left?',
      back: 'Testar mais cedo no projeto, inclusive revisando requisitos e critérios de aceite antes do código existir.',
    },
    {
      id: 'regressao-smoke',
      front: 'Qual a diferença entre teste de regressão e smoke?',
      back: 'Regressão reconfere o que já funcionava depois de uma mudança. Smoke é uma checagem rápida dos caminhos principais para ver se o sistema está de pé.',
    },
    {
      id: 'niveis',
      front: 'Quais são os quatro níveis de teste?',
      back: 'Unidade, integração, sistema e aceitação.',
    },
    {
      id: 'caso-de-teste',
      front: 'Quais são as partes essenciais de um caso de teste?',
      back: 'Identificador e título, pré-condição, passos e resultado esperado.',
    },
    {
      id: 'agrupamento',
      front: 'O que diz o princípio do agrupamento de defeitos?',
      back: 'Poucas áreas concentram a maioria dos defeitos. Onde você achou vários, provavelmente há mais.',
    },
  ],
  mission: {
    title: 'Critérios de aceite para uma funcionalidade real',
    text: 'Escolha uma funcionalidade de um aplicativo que você usa, como o cadastro de um app de delivery ou a recarga de bilhete de ônibus, e trate ela como se fosse chegar no seu time amanhã.',
    steps: [
      'Escreva em uma frase o que a funcionalidade deve fazer e para quem',
      'Escreva 4 critérios de aceite verificáveis, com números e comportamentos concretos',
      'Explique, com um exemplo dessa funcionalidade, a diferença entre um defeito e uma falha',
      'Transforme um dos critérios em um caso de teste com pré-condição, passos e resultado esperado',
      'Escreva também um caso negativo, de algo que o sistema deve recusar',
    ],
  },
  sources: [
    {
      title: 'BSTQB: syllabus e materiais de estudo',
      url: 'https://bstqb.org.br/b9/sobre/syllabus',
    },
    { title: 'Glossário oficial do ISTQB', url: 'https://glossary.istqb.org/' },
  ],
};
