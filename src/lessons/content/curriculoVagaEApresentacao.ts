import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Uma vaga júnior no LinkedIn ou na Gupy recebe centenas de candidaturas, e a primeira leitura do seu currículo costuma durar menos de um minuto. Isso não mede o seu valor: mede o quanto o papel deixa fácil enxergar o que você já fez. Nesta aula você aprende a ler a vaga, montar um currículo de uma página com projetos que mostram resultado, arrumar LinkedIn e GitHub e responder ao clássico “fale sobre você” sem travar.',
  sections: [
    {
      id: 'lendo-a-vaga',
      title: 'A vaga é um mapa, não uma prova',
      blocks: [
        {
          type: 'analogy',
          title: 'A lista do mercado de casa',
          text: 'Quando alguém da família escreve “arroz, feijão, óleo e, se tiver promoção, café”, você sabe que não pode voltar sem o arroz, mas pode voltar sem o café. Uma vaga funciona igual: tem o que é **obrigatório** para o trabalho e o que é **desejável**, aquilo que seria bom ter, mas não decide sozinho.',
        },
        {
          type: 'text',
          text: 'Na aula Portfólio, carreira e IA você já viu que muitas vagas de entrada pedem mais do que vão usar. Aqui o foco é ler a vaga como um **mapa**: ela diz quais palavras usar no currículo, que projeto mostrar primeiro e o que estudar se aparecer em todas as vagas parecidas.',
        },
        {
          type: 'code',
          language: 'text',
          caption: 'Uma vaga fictícia de dados, no formato comum em portais brasileiros',
          code: `Pessoa Analista de Dados Júnior (vaga afirmativa para pessoas negras)
Modelo: híbrido em São Paulo | Contratação: CLT

O que você vai fazer:
- Montar relatórios de vendas para o time comercial
- Garantir que os números batem com o sistema financeiro

Requisitos:
- SQL (consultas com JOIN e agrupamentos)
- Excel ou Google Sheets
- Boa comunicação com áreas não técnicas

Diferenciais:
- Python para análise de dados
- Power BI ou outra ferramenta de visualização
- Inglês intermediário`,
        },
        {
          type: 'classify',
          prompt: 'Nessa vaga, o que é obrigatório e o que é desejável?',
          buckets: ['Obrigatório', 'Desejável'],
          items: [
            { text: 'Escrever consultas SQL com JOIN', bucket: 0 },
            { text: 'Usar planilhas', bucket: 0 },
            { text: 'Explicar números para quem não é da área', bucket: 0 },
            { text: 'Python para análise', bucket: 1 },
            { text: 'Power BI', bucket: 1 },
            { text: 'Inglês intermediário', bucket: 1 },
          ],
          explanation:
            'Repare que a seção “O que você vai fazer” confirma o obrigatório: relatórios e números que batem pedem SQL, planilha e conversa com outras áreas. Se você tem isso e um projeto que prova, candidate-se. Os diferenciais viram plano de estudo, não barreira.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Estágio',
              text: 'Para quem está matriculado em curso técnico ou superior. Tem contrato próprio (Lei do Estágio), bolsa e carga horária limitada, e existe para você aprender trabalhando.',
            },
            {
              term: 'Trainee',
              text: 'Programa para quem se formou há pouco, com turmas, rodízio entre áreas e seleção longa, com várias etapas.',
            },
            {
              term: 'Júnior',
              text: 'Primeiro nível como profissional. Espera-se autonomia em tarefas pequenas, com apoio de pessoas mais experientes.',
            },
            {
              term: 'Banco de talentos',
              text: 'Cadastro para vagas futuras, sem vaga aberta agora. Vale preencher bem, mas não conte com ele como candidatura ativa.',
            },
            {
              term: 'Vaga afirmativa',
              text: 'Vaga exclusiva ou prioritária para grupos sub-representados, como pessoas negras, mulheres, pessoas trans e pessoas com deficiência. Existe para corrigir desigualdade de acesso, e o nível de exigência técnica é o mesmo da vaga.',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Você recebe duas propostas: uma CLT de R$ 3.200 com vale-refeição e outra PJ de R$ 4.000. O que é mais importante considerar antes de comparar?',
          options: [
            {
              text: 'Que no PJ você emite nota, paga impostos e não tem férias remuneradas, 13º nem FGTS, então o valor líquido e a segurança mudam',
              correct: true,
              feedback:
                'Isso. **CLT** é o contrato com carteira assinada e direitos garantidos. **PJ** é quando você presta serviço como empresa: o valor bruto parece maior, mas sai dele o imposto, a contabilidade e a reserva para férias e imprevistos.',
            },
            {
              text: 'Nada: o maior salário é sempre a melhor proposta',
              feedback:
                'Os números não são comparáveis direto. No PJ, parte dos R$ 4.000 vai para impostos e você não recebe 13º, férias pagas nem FGTS.',
            },
            {
              text: 'Que CLT só existe para vagas sênior',
              feedback:
                'Não é verdade. Muitas vagas júnior são CLT. O tipo de contrato depende da empresa, não do nível.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Se a cabeça disser que você não é suficiente',
          text: 'A sensação de que todo mundo sabe mais e você foi parar ali por engano tem nome: **síndrome do impostor**. Ela é muito comum em quem vem de fora da área ou de grupos que raramente se veem nas equipes. Vagas afirmativas não são favor: você vai passar pelas mesmas etapas que qualquer pessoa, então se candidate sem pedir desculpas.',
        },
      ],
    },
    {
      id: 'curriculo-de-uma-pagina',
      title: 'O currículo de uma página',
      blocks: [
        {
          type: 'text',
          text: 'Para quem está começando, o currículo cabe em **uma página**. A pessoa que faz a triagem quer achar rápido três coisas: como falar com você, o que você sabe fazer e onde está a prova disso. Tudo o mais atrapalha a busca.',
        },
        {
          type: 'anatomy',
          caption: 'Um currículo de entrada, em texto simples. Explore cada parte.',
          language: 'text',
          parts: [
            {
              text: 'Joana Ribeiro | Desenvolvedora Backend Júnior\nRecife, PE (aberta a remoto) | joana@email.com | linkedin.com/in/joana-ribeiro | github.com/joanar',
              label: 'Cabeçalho',
              note: 'Nome, o cargo que você busca, cidade e estado, e os links. Não precisa de CPF, endereço completo, estado civil ou foto: são dados pessoais que não ajudam a avaliar seu trabalho.',
            },
            { text: '\n\n' },
            {
              text: 'Resumo\nPessoa desenvolvedora backend em formação, com API em Node.js e PostgreSQL publicada. Seis anos de atendimento ao público no comércio.',
              label: 'Resumo',
              note: 'Duas ou três linhas. O que você faz hoje, a prova mais forte e o que você traz de antes. Experiência fora de tecnologia conta, e muito.',
            },
            { text: '\n\n' },
            {
              text: 'Projetos\nAPI de agendamento para salão de beleza (Node.js, PostgreSQL)\n- Criei 8 rotas REST com validação e testes automatizados, publicadas no Render\n- Reduzi agendamentos duplicados a zero com uma restrição única no banco',
              label: 'Projetos',
              note: 'Para quem ainda não tem emprego na área, esta é a seção principal e vem antes da experiência. Cada projeto tem nome, tecnologias e dois ou três bullets de impacto.',
            },
            { text: '\n\n' },
            {
              text: 'Experiência\nAtendente | Farmácia do Bairro | 2019 a 2025\n- Atendi cerca de 80 clientes por dia e treinei 3 pessoas novas no sistema de caixa',
              label: 'Experiência',
              note: 'Emprego fora da área mostra responsabilidade, comunicação e rotina de trabalho. Escreva com o mesmo formato de impacto.',
            },
            { text: '\n\n' },
            {
              text: 'Formação\nAnálise e Desenvolvimento de Sistemas | em andamento, previsão 2027',
              label: 'Formação',
              note: 'Curso, instituição e situação. Cursos livres e bootcamps entram aqui se forem relevantes para a vaga.',
            },
            { text: '\n\n' },
            {
              text: 'Habilidades\nJavaScript, TypeScript, Node.js, SQL, PostgreSQL, Git, testes com Vitest',
              label: 'Habilidades',
              note: 'Só o que você consegue usar e explicar. Nada de barrinhas de nível ou porcentagens: “Python 70%” não diz nada a ninguém.',
            },
          ],
        },
        {
          type: 'classify',
          prompt: 'O que vale colocar num currículo de entrada e o que é melhor deixar de fora?',
          buckets: ['Vale incluir', 'Deixe de fora'],
          items: [
            { text: 'Link de um projeto publicado', bucket: 0 },
            { text: 'Emprego anterior como atendente, com o que você fazia', bucket: 0 },
            { text: 'Curso técnico em andamento', bucket: 0 },
            { text: 'Tecnologias que você usou num projeto real', bucket: 0 },
            { text: 'CPF e endereço completo', bucket: 1 },
            { text: 'Barras mostrando “React 80%”', bucket: 1 },
            { text: 'Ferramentas que você só viu num vídeo', bucket: 1 },
            { text: 'Uma terceira página com todos os cursos que já fez', bucket: 1 },
          ],
          explanation:
            'O critério é simples: ajuda a provar que você faz o trabalho da vaga? Dados pessoais sensíveis aumentam risco e não ajudam. Ferramentas que você não sabe explicar viram pergunta difícil na entrevista.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros que derrubam bons currículos',
          text: 'Arquivo chamado `curriculo_final_v3.pdf` em vez de `joana-ribeiro-backend.pdf`. Link quebrado para o GitHub. Um único currículo genérico para frontend, dados e QA ao mesmo tempo. Erros de português num texto curto. Antes de enviar, abra cada link e peça para alguém ler em voz alta.',
        },
      ],
    },
    {
      id: 'bullets-com-impacto',
      title: 'Bullets que mostram resultado',
      blocks: [
        {
          type: 'text',
          text: 'A diferença entre um currículo esquecível e um que chama entrevista mora nos **bullets**, as linhas curtas que começam com um traço. “Fiz um site em React” diz o que você usou. Um bom bullet diz o que você **fez**, **como** fez e **o que mudou** por causa disso.',
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Verbo de ação no passado',
              text: 'Criei, automatizei, reduzi, corrigi, testei, documentei. O verbo coloca você como quem fez.',
            },
            {
              title: 'O quê',
              text: 'O objeto do trabalho: a tela de cadastro, o pipeline de vendas, os testes do checkout.',
            },
            {
              title: 'Como',
              text: 'A técnica ou ferramenta, em poucas palavras: com Playwright, com um índice no PostgreSQL, com GitHub Actions.',
            },
            {
              title: 'Resultado',
              text: 'O efeito, de preferência com número: de 12 para 2 minutos, 15 testes, zero duplicados, usado por 30 bancas da feira.',
            },
          ],
        },
        {
          type: 'table',
          caption: 'O mesmo trabalho, escrito de dois jeitos, em carreiras diferentes',
          head: ['Carreira', 'Bullet fraco', 'Bullet com impacto'],
          rows: [
            [
              'Frontend',
              'Fiz um site responsivo',
              'Refiz o catálogo da feira com Grid, deixando-o usável em celulares de 360 px',
            ],
            [
              'Dados',
              'Trabalhei com SQL',
              'Automatizei o relatório de vendas com SQL, de 2 horas manuais para 5 minutos',
            ],
            [
              'QA',
              'Fiz testes',
              'Escrevi 12 testes end-to-end com Playwright e encontrei 3 bugs antes da entrega',
            ],
            [
              'DevOps',
              'Usei Docker',
              'Empacotei a API em Docker, e o projeto passou a rodar com um só comando',
            ],
          ],
        },
        {
          type: 'fill',
          prompt:
            'Monte um bullet com estes fatos de um projeto de backend: você **criou** um cache, o objeto foi a **consulta de CEP**, a ferramenta foi **Redis** e o tempo de resposta caiu de 800 ms para 90 ms.',
          language: 'text',
          template:
            '- [[Criei|criei]] um cache para a [[consulta de CEP|consulta de cep]] com [[Redis|redis]], reduzindo o tempo de resposta de [[800 ms|800ms]] para [[90 ms|90ms]]',
          explanation:
            'Verbo, o quê, como e resultado, nessa ordem. Quem lê entende em cinco segundos o que você fez, e o número dá assunto para a entrevista: “como você mediu esses 800 ms?”.',
        },
        {
          type: 'reveal',
          question: 'E se o seu projeto não tem nenhum número para mostrar?',
          answer:
            'Quase sempre tem, você só não mediu ainda. Conte testes, telas, rotas, pessoas que usaram, tempo antes e depois. Se não houver mesmo, descreva o efeito concreto: “o formulário passou a avisar o erro antes do envio”. Nunca invente número: ele vira pergunta na entrevista.',
        },
      ],
    },
    {
      id: 'palavras-chave-e-ats',
      title: 'Robôs de triagem e palavras-chave, com honestidade',
      blocks: [
        {
          type: 'analogy',
          title: 'A triagem do posto de saúde',
          text: 'No posto, antes da consulta, alguém faz uma triagem rápida com perguntas fixas para organizar a fila. Ela não decide o diagnóstico, mas, se você não disser que está com febre, ninguém vai saber. Nos portais de vagas, essa triagem inicial costuma ser feita por um sistema.',
        },
        {
          type: 'text',
          text: '**ATS** (sistema de acompanhamento de candidaturas) é o programa que a empresa usa para receber e organizar currículos, como os da Gupy e de outros portais. Muitas vezes ele busca **palavras-chave** da vaga no seu texto e ajuda a ordenar a fila. Se você usou PostgreSQL mas escreveu só “banco de dados”, a busca pode não encontrar.',
        },
        {
          type: 'python',
          title: 'Compare a vaga com o currículo',
          task: 'Complete o laço para separar as palavras da vaga em `encontradas` e `faltando`, sem diferenciar maiúsculas de minúsculas (use `.lower()` dos dois lados). Depois, ajuste a última frase do `curriculo`: a pessoa de fato apresentou os resultados para a dona da padaria, então pode escrever a palavra `comunicação` com verdade.',
          code: `vaga = """
Requisitos: SQL, Python, Git e comunicação.
Diferenciais: Power BI e Airflow.
"""

curriculo = """
Projeto: painel de vendas de uma padaria com python e SQL.
Versionei o código com Git e apresentei os resultados para a dona.
"""

palavras_da_vaga = ['SQL', 'Python', 'Git', 'comunicação', 'Power BI', 'Airflow']

encontradas = []
faltando = []

for palavra in palavras_da_vaga:
    # Se a palavra aparece no currículo, vai para encontradas; senão, para faltando
    pass

print('Encontradas:', encontradas)
print('Faltando:', faltando)`,
          solution: `vaga = """
Requisitos: SQL, Python, Git e comunicação.
Diferenciais: Power BI e Airflow.
"""

curriculo = """
Projeto: painel de vendas de uma padaria com python e SQL.
Versionei o código com Git e fiz a comunicação dos resultados para a dona, numa apresentação de 10 minutos.
"""

palavras_da_vaga = ['SQL', 'Python', 'Git', 'comunicação', 'Power BI', 'Airflow']

encontradas = []
faltando = []

for palavra in palavras_da_vaga:
    if palavra.lower() in curriculo.lower():
        encontradas.append(palavra)
    else:
        faltando.append(palavra)

print('Encontradas:', encontradas)
print('Faltando:', faltando)`,
          checks: [
            {
              label: 'Cada palavra da vaga vai para uma das duas listas',
              test: "len(encontradas) + len(faltando) == 6 and 'SQL' in encontradas and 'Airflow' in faltando",
            },
            {
              label: 'A comparação ignora maiúsculas: `python` conta como `Python`',
              test: "'Python' in encontradas",
            },
            {
              label: 'O currículo cita comunicação e ela passa a ser encontrada',
              test: "'comunicação' in curriculo.lower() and 'comunicação' in encontradas",
            },
            {
              label: 'Sobram só os diferenciais que a pessoa ainda não tem',
              test: "faltando == ['Power BI', 'Airflow']",
            },
          ],
        },
        {
          type: 'text',
          text: 'Esse é o uso honesto das palavras-chave: dar o **nome certo** ao que você fez. O que ficou em `faltando` não deve ir para o currículo; deve ir para o plano de estudo, se aparecer em várias vagas.',
        },
        {
          type: 'quiz',
          question:
            'Uma pessoa sugere colar todas as palavras da vaga em letras brancas no rodapé do currículo, para enganar o sistema. O que acontece?',
          options: [
            {
              text: 'Mesmo se passar da triagem, a pessoa recrutadora lê o texto do arquivo, e a entrevista técnica cobra o que está escrito',
              correct: true,
              feedback:
                'Isso. Muitos sistemas mostram o texto extraído, sem cor, e o truque fica visível. E se passar, você chega a uma entrevista sobre coisas que não sabe. A confiança perdida custa mais que a vaga.',
            },
            {
              text: 'Funciona sempre, porque só robôs leem currículos',
              feedback:
                'Pessoas leem os currículos que passam da triagem, e muitas leem desde o começo. O sistema organiza; quem decide é gente.',
            },
            {
              text: 'É indiferente: palavra-chave não importa',
              feedback:
                'Importa, sim: usar os mesmos nomes da vaga para o que você fez de verdade ajuda a busca a encontrar você. O problema é inventar, não nomear bem.',
            },
          ],
        },
      ],
    },
    {
      id: 'linkedin-e-github',
      title: 'LinkedIn e GitHub como vitrine',
      blocks: [
        {
          type: 'text',
          text: 'Quem gostou do currículo clica nos links. O **LinkedIn** mostra sua trajetória e como você se comunica; o **GitHub** mostra o código. Os dois precisam contar a mesma história que o currículo.',
        },
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              label: 'LinkedIn',
              title: 'Título e sobre',
              text: 'O título aparece em toda busca. Em vez de “Estudante buscando oportunidade”, diga o que você faz e com o quê.',
              points: [
                'Título: Desenvolvedora Backend Júnior | Node.js, PostgreSQL',
                'Sobre: o seu pitch em texto, com link para o melhor projeto',
                'Projetos na seção Destaques, com link',
                'Recrutadores encontram você pela busca: use os nomes das tecnologias',
              ],
            },
            {
              label: 'GitHub',
              title: 'Perfil e repositórios fixados',
              text: 'Você pode fixar até seis repositórios no topo do perfil. Escolha os dois ou três mais completos, cada um com README.',
              points: [
                'README de perfil: duas frases sobre você e o que está estudando',
                'Repositórios fixados com descrição e link da demonstração',
                'Projetos de tutorial só se você mudou algo e explicou o quê',
                'Commits com mensagens que explicam o porquê',
              ],
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Qual título de LinkedIn ajuda mais uma pessoa iniciante em QA a ser encontrada?',
          options: [
            {
              text: 'Analista de QA Júnior | Testes manuais e automatizados com Playwright',
              correct: true,
              feedback:
                'Isso. Diz o cargo que você busca e as palavras que recrutadores digitam na busca. Concreto e verdadeiro.',
            },
            {
              text: 'Apaixonada por tecnologia e em busca de uma oportunidade',
              feedback:
                'Muita gente escreve isso, e por isso não diferencia ninguém. Também não tem nenhuma palavra que alguém pesquisaria.',
            },
            {
              text: 'QA | Dev | Dados | DevOps | IA | Cloud',
              feedback:
                'Parece que você ainda não escolheu. Para a primeira vaga, foco ajuda: quem recruta procura uma carreira, não todas.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Status de disponibilidade',
          text: 'O LinkedIn permite avisar que você está aberta ou aberto a trabalho, para todo mundo ou só para recrutadores. Se você já trabalha em outro lugar, escolha a opção visível só para recrutadores.',
        },
      ],
    },
    {
      id: 'fale-sobre-voce',
      title: '“Fale sobre você” em um minuto',
      blocks: [
        {
          type: 'analogy',
          title: 'O trailer do filme',
          text: 'Um trailer não conta o filme inteiro: mostra onde a história está, de onde ela veio e dá vontade de ver o resto. A resposta para “fale sobre você” é o seu trailer. Um minuto, sem contar a vida desde a infância.',
        },
        {
          type: 'text',
          text: 'Essa costuma ser a primeira pergunta de qualquer entrevista, de qualquer carreira. Uma estrutura que funciona é **presente, passado, futuro**: o que você faz agora, o caminho que trouxe você até aqui e por que esta vaga é o próximo passo.',
        },
        {
          type: 'code',
          language: 'text',
          caption: 'Um pitch de cerca de 50 segundos, de uma pessoa em transição de carreira',
          code: `Hoje eu estudo engenharia de dados e mantenho um pipeline que junta as vendas
de uma padaria do meu bairro num painel atualizado todo dia.

Antes, trabalhei seis anos como caixa em supermercado. Foi ali que comecei a
usar planilha para conferir o fechamento, e isso me levou a aprender SQL e Python.

Me candidatei porque a vaga é para relatórios de vendas, que é exatamente o que
eu faço no projeto, e quero aprender com uma equipe que trabalha com dados de verdade.`,
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem as partes de um bom “fale sobre você”.',
          items: [
            'O que você faz hoje e o projeto que melhor mostra isso',
            'De onde você veio e o que trouxe dessa experiência',
            'O que liga a sua história a esta vaga',
            'Uma frase sobre o que você quer aprender na equipe',
          ],
          explanation:
            'Começar pelo presente coloca você logo como alguém da área. O passado explica a trajetória, e trajetória não linear é força, não defeito. O futuro conecta tudo à vaga e mostra que você leu a descrição.',
        },
        {
          type: 'quiz',
          question:
            'Na entrevista para uma vaga de frontend, a pessoa começa: “Nasci em Natal, estudei na escola X, depois fiz o ensino médio na escola Y…”. Qual o problema?',
          options: [
            {
              text: 'Ela gasta o tempo mais valioso com fatos que não ligam a história à vaga',
              correct: true,
              feedback:
                'Isso. A cronologia completa empurra o que importa para o fim, quando a atenção já caiu. Comece pelo presente e use o passado só para explicar como chegou até aqui.',
            },
            {
              text: 'Ela deveria ter começado listando todas as tecnologias que conhece',
              feedback:
                'Uma lista de ferramentas não é uma história. Melhor citar uma ou duas dentro de um projeto concreto.',
            },
            {
              text: 'Nenhum: quanto mais detalhes pessoais, melhor',
              feedback:
                'Detalhes pessoais podem aparecer, mas a pergunta, na prática, é “por que você para esta vaga?”. Um minuto focado responde isso.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Ensaie em voz alta, não decore',
          text: 'Grave o pitch no celular, ouça e corte o que sobra. Decorar palavra por palavra faz você travar se perder uma frase. Saiba os três blocos e fale com naturalidade.',
        },
      ],
    },
  ],
  recap: [
    'Leia a vaga como um mapa: separe o obrigatório do desejável e use “O que você vai fazer” para confirmar o que pesa de verdade.',
    'Para quem está começando, o currículo tem uma página, com projetos antes da experiência e sem dados pessoais desnecessários.',
    'Bom bullet tem verbo, o quê, como e resultado, de preferência com um número verdadeiro.',
    'Palavras-chave servem para dar o nome certo ao que você fez; o que você não tem vai para o plano de estudo, não para o currículo.',
    'Para “fale sobre você”, use presente, passado e futuro em cerca de um minuto, e mantenha LinkedIn e GitHub contando a mesma história.',
  ],
  cards: [
    {
      id: 'obrigatorio-desejavel',
      front: 'Como separar o obrigatório do desejável numa vaga?',
      back: 'Obrigatório aparece em “Requisitos” e no que você vai fazer no dia a dia. Diferenciais ajudam, mas não decidem sozinhos.',
    },
    {
      id: 'formula-bullet',
      front: 'Qual a fórmula de um bullet de impacto?',
      back: 'Verbo de ação + o quê + como + resultado, de preferência com número.',
    },
    {
      id: 'ats',
      front: 'O que é um ATS?',
      back: 'O sistema que organiza candidaturas e costuma buscar palavras-chave da vaga no currículo.',
    },
    {
      id: 'curriculo-dados-pessoais',
      front: 'Que dados pessoais deixar fora do currículo?',
      back: 'CPF, endereço completo, estado civil e foto. Basta cidade, estado e contatos.',
    },
    {
      id: 'clt-pj',
      front: 'Qual a diferença essencial entre CLT e PJ?',
      back: 'CLT tem carteira assinada, férias, 13º e FGTS. PJ presta serviço como empresa: paga impostos e não tem esses direitos.',
    },
    {
      id: 'pitch-estrutura',
      front: 'Qual a estrutura de “fale sobre você”?',
      back: 'Presente (o que faz hoje), passado (como chegou aqui) e futuro (por que esta vaga), em cerca de um minuto.',
    },
    {
      id: 'vaga-afirmativa',
      front: 'O que é uma vaga afirmativa?',
      back: 'Vaga exclusiva ou prioritária para grupos sub-representados, com as mesmas etapas e exigências técnicas.',
    },
  ],
  mission: {
    title: 'Prepare-se para uma vaga concreta',
    text: 'Escolha uma vaga real de entrada na carreira que você está seguindo e prepare tudo para ela. No final, apresente seu melhor projeto em cinco minutos para alguém: problema, sua contribuição, decisões, uma falha que encontrou e os próximos passos.',
    steps: [
      'Salve a vaga e separe os requisitos em obrigatórios e desejáveis',
      'Reescreva o currículo em uma página, com pelo menos três bullets no formato verbo, o quê, como e resultado',
      'Compare as palavras da vaga com o currículo e corrija os nomes do que você fez de verdade',
      'Atualize o título do LinkedIn e fixe no GitHub os repositórios com README',
      'Grave seu “fale sobre você” em um minuto e ouça antes de regravar',
      'Apresente o projeto em cinco minutos para alguém e anote as perguntas que fizerem',
    ],
  },
  sources: [
    {
      title: 'GitHub Docs: gerenciar o README do seu perfil',
      url: 'https://docs.github.com/pt/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme',
    },
    {
      title: 'GitHub Docs: fixar itens no seu perfil',
      url: 'https://docs.github.com/pt/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/pinning-items-to-your-profile',
    },
    {
      title: 'Ministério do Trabalho e Emprego',
      url: 'https://www.gov.br/trabalho-e-emprego/pt-br',
    },
  ],
};
