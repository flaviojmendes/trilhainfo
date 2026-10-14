import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Muitos dos bugs mais estranhos não estão em nenhum roteiro: aparecem quando alguém digita um nome com acento, clica duas vezes rápido ou volta pela seta do navegador no meio do pagamento. Encontrar esses problemas é metade do trabalho. A outra metade é contar o que achou de um jeito que a pessoa desenvolvedora consiga reproduzir em cinco minutos, sem se sentir atacada. Esta aula treina as duas.',
  sections: [
    {
      id: 'o-que-e-explorar',
      title: 'Explorar não é sair clicando',
      blocks: [
        {
          type: 'analogy',
          title: 'Turista com um objetivo',
          text: 'Duas pessoas chegam a uma cidade nova. Uma segue um roteiro fixo de agência: ponto A, ponto B, foto, ônibus. A outra decide “quero descobrir onde se come bem e barato perto do centro”, anda por duas horas, conversa com gente, anota e muda de rua quando encontra uma pista. A segunda está **explorando**: tem um objetivo e um tempo, mas decide o caminho enquanto aprende.',
        },
        {
          type: 'text',
          text: 'No **teste exploratório**, você aprende sobre o sistema, inventa testes e executa todos ao mesmo tempo. O resultado de um teste decide o próximo. Já no **teste roteirizado**, os casos foram escritos antes, como os que você viu na aula de fundamentos, e você os segue passo a passo.',
        },
        {
          type: 'text',
          text: 'Os dois se completam. Roteiros garantem que o importante seja conferido toda vez; a exploração encontra o que ninguém pensou em escrever. Explorar **não** é clicar sem rumo: tem objetivo, tempo definido e anotações.',
        },
        {
          type: 'quiz',
          question:
            'O time vai lançar uma tela nova de cadastro amanhã, a especificação é curta e ninguém sabe direito como as pessoas vão usar. Qual abordagem traz mais informação hoje?',
          options: [
            {
              text: 'Uma sessão exploratória com objetivo e tempo definidos, anotando o que encontrar',
              correct: true,
              feedback:
                'Isso. Com especificação curta e pouco tempo, explorar é a forma mais rápida de aprender sobre o sistema e achar problemas. O que você descobrir pode virar casos roteirizados depois.',
            },
            {
              text: 'Escrever 50 casos de teste detalhados antes de abrir a tela',
              feedback:
                'Escrever casos detalhados de algo que você ainda não conhece consome o dia inteiro e erra muitas vezes o alvo. Primeiro aprenda, depois documente o que vale repetir.',
            },
            {
              text: 'Clicar em tudo o mais rápido possível, sem anotar nada',
              feedback:
                'Sem objetivo e sem notas você não sabe o que cobriu nem consegue reproduzir o que achou. É o que dá má fama ao teste exploratório.',
            },
          ],
        },
      ],
    },
    {
      id: 'charter-e-tempo',
      title: 'Charter e timebox: objetivo e prazo',
      blocks: [
        {
          type: 'text',
          text: 'Uma sessão exploratória começa com um **charter**: uma frase curta que diz a missão da sessão. Um modelo muito usado é: **Explorar** o quê, **com** quais recursos, **para descobrir** que tipo de informação.',
        },
        {
          type: 'anatomy',
          caption: 'Um charter e o registro de uma sessão exploratória.',
          language: 'text',
          parts: [
            {
              text: 'Explorar o formulário de cadastro',
              label: 'Alvo',
              note: 'Uma parte do sistema, não ele inteiro. “Explorar o app” é grande demais para uma sessão.',
            },
            { text: '\n' },
            {
              text: 'com nomes brasileiros reais, CEPs inválidos e cliques repetidos',
              label: 'Recursos',
              note: 'Os dados, ferramentas ou truques que você vai usar. Isso dá direção sem amarrar cada passo.',
            },
            { text: '\n' },
            {
              text: 'para descobrir se as validações recusam e aceitam o que deveriam',
              label: 'Informação buscada',
              note: 'O que o time ganha com a sessão. Ajuda a decidir quando parar e o que relatar.',
            },
            { text: '\n\n' },
            {
              text: 'Timebox: 45 minutos',
              label: 'Timebox',
              note: 'Um tempo fechado, em geral entre 30 e 90 minutos. Tempo curto mantém o foco; quando acaba, você para e conta o que encontrou.',
            },
            { text: '\n' },
            {
              text: 'Notas: 14h05 nome “João” recusado. 14h12 CEP com letras aceito? Conferir.',
              label: 'Anotações',
              note: 'Registre na hora, com horário: o que tentou, o que viu, dúvidas e ideias para depois. Notas são a matéria-prima do relato.',
            },
          ],
        },
        {
          type: 'quiz',
          question: 'Qual destes é o melhor charter para uma sessão de 45 minutos?',
          options: [
            {
              text: 'Explorar o cupom de desconto no carrinho com cupons vencidos, repetidos e em letras minúsculas para descobrir se o valor final fica errado',
              correct: true,
              feedback:
                'Isso. Tem alvo pequeno, recursos concretos e uma informação clara a buscar. Em 45 minutos dá para cobrir e ainda anotar.',
            },
            {
              text: 'Testar o site todo para achar bugs',
              feedback:
                'Alvo grande demais e sem direção. Em 45 minutos você passaria por tudo superficialmente e não saberia dizer o que cobriu.',
            },
            {
              text: 'Clicar no botão “Aplicar cupom” e ver se aparece a mensagem “Cupom aplicado”',
              feedback:
                'Isso é um caso de teste roteirizado, com passos e resultado fixos. Um charter dá a missão e deixa você escolher os caminhos.',
            },
          ],
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem uma sessão exploratória.',
          items: [
            'Escrever o charter e combinar o timebox',
            'Preparar o ambiente, os dados e onde vai anotar',
            'Explorar, anotando com horário o que tentou e o que viu',
            'Parar quando o tempo acabar, mesmo no meio de uma ideia',
            'Revisar as notas e transformar os problemas em relatos de bug',
            'Contar ao time o que foi coberto, o que ficou de fora e as dúvidas',
          ],
          explanation:
            'A conversa no fim (às vezes chamada de debriefing) é o que transforma a sessão em informação para o time. Ideias que ficaram de fora viram charters para a próxima sessão.',
        },
      ],
    },
    {
      id: 'heuristicas',
      title: 'Heurísticas: perguntas para quando a ideia acaba',
      blocks: [
        {
          type: 'text',
          text: 'Em algum momento da sessão, você vai pensar “e agora, o que mais eu testo?”. Uma **heurística** é um atalho mental, uma lista curta de perguntas que destrava ideias. Uma das mais conhecidas tem a sigla em inglês **SFDPOT**.',
        },
        {
          type: 'table',
          caption: 'A heurística SFDPOT, aplicada a um formulário de cadastro',
          head: ['Letra', 'Pergunte sobre', 'Ideias de teste'],
          rows: [
            [
              '**S** (estrutura)',
              'Do que o sistema é feito',
              'Quais campos, botões e telas existem? Algum escondido?',
            ],
            ['**F** (função)', 'O que ele faz', 'Cada validação aceita o certo e recusa o errado?'],
            [
              '**D** (dados)',
              'O que entra e sai',
              'Acentos, espaços, vazio, textos enormes, valores-limite',
            ],
            [
              '**P** (plataforma)',
              'Onde ele roda',
              'Celular, outro navegador, tela pequena, internet lenta',
            ],
            [
              '**O** (operações)',
              'Como as pessoas usam',
              'Usar só o teclado, colar o texto, voltar pela seta do navegador',
            ],
            [
              '**T** (tempo)',
              'Quando e em que ritmo',
              'Clicar duas vezes rápido, deixar a página aberta uma hora, fuso horário',
            ],
          ],
        },
        {
          type: 'classify',
          prompt: 'De que letra da heurística vem cada ideia de teste?',
          buckets: ['Função', 'Dados', 'Plataforma', 'Tempo'],
          items: [
            { text: 'O botão “Esqueci minha senha” envia o e-mail?', bucket: 0 },
            { text: 'O filtro de preço mostra só produtos na faixa escolhida?', bucket: 0 },
            { text: 'Cadastrar o nome “Maria da Conceição Gonçalves”', bucket: 1 },
            { text: 'Colar um CEP com espaço no final', bucket: 1 },
            { text: 'Abrir o cadastro num celular Android antigo', bucket: 2 },
            { text: 'Usar o site com a internet do celular no modo 3G', bucket: 2 },
            { text: 'Clicar duas vezes rápido em “Pagar”', bucket: 3 },
            { text: 'Deixar o carrinho aberto até a sessão expirar', bucket: 3 },
          ],
          explanation:
            'Você não precisa decorar a sigla. O valor é ter perguntas prontas para quando a criatividade seca. Outra opção popular são os **tours**: visitar o sistema como turista do dinheiro (onde se paga), do bairro ruim (onde já houve bugs) ou da madrugada (tarefas em horários estranhos).',
        },
      ],
    },
    {
      id: 'sessao-na-pratica',
      title: 'Sua primeira sessão',
      blocks: [
        {
          type: 'text',
          text: 'O cadastro abaixo é o seu sistema sob teste, com as regras escritas no topo. Ele tem **pelo menos quatro defeitos** plantados. Seu charter: explorar o cadastro com nomes brasileiros, valores-limite e cliques repetidos, para descobrir se as validações funcionam.',
        },
        {
          type: 'playground',
          title: 'Sessão exploratória: Clube de Descontos',
          task: 'Use a aba de resultado como pessoa usuária: tente nomes com acento, senhas no limite, CEPs estranhos e cliques rápidos. A cada descoberta, adicione uma nota na lista `anotacoes`, começando com `BUG:`, `PERGUNTA:` ou `IDEIA:`, e execute de novo para ver o diário. Não mexa no código abaixo da linha marcada: você está testando, não corrigindo.',
          html: `<main>
  <h1>Clube de Descontos</h1>
  <p class="regras">Regras: nome completo; e-mail válido; CEP com 8 dígitos, com ou sem hífen; senha com no mínimo 8 caracteres.</p>
  <form id="cadastro" novalidate>
    <label>Nome completo <input id="nome" autocomplete="off" /></label>
    <label>E-mail <input id="email" autocomplete="off" /></label>
    <label>CEP <input id="cep" autocomplete="off" /></label>
    <label>Senha <input id="senha" type="password" /></label>
    <button type="submit">Criar conta</button>
  </form>
  <p id="mensagem" role="status"></p>
  <p>Contas criadas: <strong id="contador">0</strong></p>
  <section>
    <h2>Diário da sessão</h2>
    <ul id="diario"></ul>
  </section>
</main>`,
          css: `body { font-family: system-ui, sans-serif; padding: 1rem; color: #222; }
.regras { background: #fff7d6; padding: 0.5rem; border-radius: 6px; font-size: 0.9rem; }
form { display: grid; gap: 0.6rem; max-width: 22rem; }
label { display: grid; gap: 0.2rem; font-size: 0.9rem; }
input { padding: 0.4rem; font-size: 1rem; }
button { padding: 0.5rem; font-size: 1rem; cursor: pointer; }
#mensagem { font-weight: 600; min-height: 1.2rem; }
#diario li { font-family: ui-monospace, monospace; font-size: 0.85rem; }`,
          js: `// Diário da sessão: uma nota por linha, começando com BUG:, PERGUNTA: ou IDEIA:
const anotacoes = [
  'IDEIA: testar o campo nome com nomes brasileiros comuns',
];

// ---------- O sistema sob teste: não mexa daqui para baixo ----------
for (const nota of anotacoes) {
  const item = document.createElement('li');
  item.textContent = nota;
  document.getElementById('diario').appendChild(item);
}

let contas = 0;

function validar(dados) {
  const nome = dados.nome.trim();
  if (!/^[A-Za-z ]+$/.test(nome) || nome.split(' ').length < 2) {
    return 'Informe seu nome completo.';
  }
  if (!dados.email.includes('@')) return 'E-mail inválido.';
  const cep = dados.cep.replace('-', '');
  if (cep.length !== 8) return 'O CEP deve ter 8 dígitos.';
  if (dados.senha.length < 7) return 'A senha precisa de no mínimo 8 caracteres.';
  return '';
}

document.getElementById('cadastro').addEventListener('submit', (evento) => {
  evento.preventDefault();
  const dados = {
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    cep: document.getElementById('cep').value,
    senha: document.getElementById('senha').value,
  };
  const mensagem = document.getElementById('mensagem');
  const problema = validar(dados);
  if (problema) {
    mensagem.textContent = problema;
    return;
  }
  mensagem.textContent = 'Processando...';
  setTimeout(() => {
    contas = contas + 1;
    document.getElementById('contador').textContent = String(contas);
    mensagem.textContent = 'Conta criada para ' + dados.nome.trim() + '.';
  }, 800);
});`,
          checks: [
            {
              label: 'O diário tem pelo menos 4 anotações',
              test: `try {
  return Array.isArray(anotacoes) && anotacoes.length >= 4;
} catch (erro) {
  return false;
}`,
            },
            {
              label: 'Anotou um `BUG:` sobre nomes com acento',
              test: `try {
  return anotacoes.some((n) => /^BUG/i.test(n) && /nome|acent/i.test(n) && /acent|[áàâãéêíóôõúç]/i.test(n));
} catch (erro) {
  return false;
}`,
            },
            {
              label: 'Anotou um `BUG:` sobre o limite da senha',
              test: `try {
  return anotacoes.some((n) => /^BUG/i.test(n) && /senha/i.test(n) && /7|sete|limite|m[ií]nimo/i.test(n));
} catch (erro) {
  return false;
}`,
            },
            {
              label: 'Anotou um `BUG:` sobre o CEP ou sobre contas duplicadas',
              test: `try {
  return anotacoes.some((n) => /^BUG/i.test(n) && /cep|duplic|duas vezes|clique|duas contas|2 contas/i.test(n));
} catch (erro) {
  return false;
}`,
            },
            {
              label: 'Anotou pelo menos uma `PERGUNTA:` para o time',
              test: `try {
  return anotacoes.some((n) => /^PERGUNTA/i.test(n));
} catch (erro) {
  return false;
}`,
            },
          ],
          solution: {
            js: `// Diário da sessão: uma nota por linha, começando com BUG:, PERGUNTA: ou IDEIA:
const anotacoes = [
  'IDEIA: testar o campo nome com nomes brasileiros comuns',
  'BUG: nome com acento (João da Silva) é recusado com "Informe seu nome completo"',
  'BUG: senha com 7 caracteres (abc1234) é aceita, mas a regra pede no mínimo 8',
  'BUG: CEP com letras (abcdefgh) é aceito',
  'BUG: dois cliques rápidos em "Criar conta" criam 2 contas',
  'PERGUNTA: um e-mail sem domínio, como ana@, deveria ser aceito?',
];

// ---------- O sistema sob teste: não mexa daqui para baixo ----------
for (const nota of anotacoes) {
  const item = document.createElement('li');
  item.textContent = nota;
  document.getElementById('diario').appendChild(item);
}

let contas = 0;

function validar(dados) {
  const nome = dados.nome.trim();
  if (!/^[A-Za-z ]+$/.test(nome) || nome.split(' ').length < 2) {
    return 'Informe seu nome completo.';
  }
  if (!dados.email.includes('@')) return 'E-mail inválido.';
  const cep = dados.cep.replace('-', '');
  if (cep.length !== 8) return 'O CEP deve ter 8 dígitos.';
  if (dados.senha.length < 7) return 'A senha precisa de no mínimo 8 caracteres.';
  return '';
}

document.getElementById('cadastro').addEventListener('submit', (evento) => {
  evento.preventDefault();
  const dados = {
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    cep: document.getElementById('cep').value,
    senha: document.getElementById('senha').value,
  };
  const mensagem = document.getElementById('mensagem');
  const problema = validar(dados);
  if (problema) {
    mensagem.textContent = problema;
    return;
  }
  mensagem.textContent = 'Processando...';
  setTimeout(() => {
    contas = contas + 1;
    document.getElementById('contador').textContent = String(contas);
    mensagem.textContent = 'Conta criada para ' + dados.nome.trim() + '.';
  }, 800);
});`,
          },
          height: 560,
        },
        {
          type: 'reveal',
          question:
            'O nome “João da Silva” foi recusado com a mensagem “Informe seu nome completo”. Por que essa mensagem torna o defeito ainda pior?',
          answer:
            'Porque ela culpa a pessoa por algo que ela fez certo. Quem se chama João vai tentar de novo, achar que digitou errado e provavelmente desistir. No relato, registre também a mensagem exata: ela ajuda quem desenvolve a achar a validação certa no código e mostra o impacto para quem usa.',
        },
      ],
    },
    {
      id: 'relato-de-bug',
      title: 'Um relato que qualquer pessoa reproduz',
      blocks: [
        {
          type: 'text',
          text: 'Um **relato de bug** (bug report) é a carta que você escreve para alguém que não estava do seu lado quando o problema aconteceu. Se a pessoa não consegue reproduzir, o bug provavelmente vai ficar parado. O relato tem partes fixas, e cada uma responde a uma pergunta.',
        },
        {
          type: 'anatomy',
          caption: 'Um relato de bug completo, a partir da sessão no cadastro.',
          language: 'text',
          parts: [
            {
              text: 'Título: Cadastro aceita senha com 7 caracteres (regra pede no mínimo 8)',
              label: 'Título',
              note: 'O que acontece e onde, em uma linha. Quem lê a lista de bugs entende sem abrir. Evite “cadastro com problema” ou “senha bugada”.',
            },
            { text: '\n\n' },
            {
              text: 'Passos para reproduzir:\n1. Abrir a página de cadastro\n2. Preencher nome "Ana Souza", e-mail ana@exemplo.com, CEP 01310-100\n3. Digitar a senha abc1234 (7 caracteres)\n4. Clicar em "Criar conta"',
              label: 'Passos',
              note: 'Numerados, com os dados exatos que você usou. Outra pessoa deve chegar ao mesmo resultado seguindo só isto.',
            },
            { text: '\n\n' },
            {
              text: 'Resultado esperado: mensagem "A senha precisa de no mínimo 8 caracteres" e nenhuma conta criada',
              label: 'Esperado',
              note: 'O que a regra diz que deveria acontecer. Cite a regra ou o critério de aceite quando puder.',
            },
            { text: '\n' },
            {
              text: 'Resultado obtido: a conta é criada e o contador vai para 1',
              label: 'Obtido',
              note: 'O que aconteceu de fato, sem interpretação. Fatos, não opiniões como “está horrível”.',
            },
            { text: '\n\n' },
            {
              text: 'Ambiente: homologação, Chrome 129, Windows 11. Também ocorre no Firefox.',
              label: 'Ambiente',
              note: 'Onde aconteceu: ambiente (teste, homologação, produção), navegador e versão, sistema, dispositivo. Muitos bugs só aparecem em um lugar.',
            },
            { text: '\n' },
            {
              text: 'Evidência: print da conta criada, gravação de 15 s, horário 14h20',
              label: 'Evidência',
              note: 'Prova do que você viu: captura de tela, vídeo curto, mensagem do console, horário e ID do registro. Ajuda a confirmar e a buscar nos logs.',
            },
            { text: '\n' },
            {
              text: 'Severidade: média. Prioridade: alta (lançamento na segunda).',
              label: 'Severidade e prioridade',
              note: 'Severidade mede o estrago do bug. Prioridade mede a urgência de corrigir, e normalmente é decidida com produto.',
            },
          ],
        },
        {
          type: 'codeTabs',
          caption: 'O mesmo bug relatado de dois jeitos',
          tabs: [
            {
              label: 'Relato ruim',
              language: 'text',
              code: `Título: cadastro não funciona!!!

O cadastro está bugado de novo, coloquei meu nome e não deixou.
Alguém mexeu no que estava funcionando. Corrijam urgente.`,
            },
            {
              label: 'Relato bom',
              language: 'text',
              code: `Título: Cadastro recusa nomes com acento ("João da Silva")

Passos:
1. Abrir a página de cadastro
2. Preencher nome "João da Silva", demais campos válidos
3. Clicar em "Criar conta"

Esperado: conta criada (nomes com acento são válidos)
Obtido: mensagem "Informe seu nome completo." e nenhuma conta criada
Também ocorre com: "Conceição Alves", "José Lima"
Não ocorre com: "Joao da Silva" (sem acento)

Ambiente: homologação, Chrome 129, Android 14
Evidência: print anexado, 14h05
Severidade: alta (impede o cadastro de muita gente)`,
            },
          ],
        },
        {
          type: 'text',
          text: 'Repare em duas linhas do relato bom: “também ocorre com” e “não ocorre com”. Isolar o padrão, testando variações antes de relatar, economiza horas de investigação para quem vai corrigir.',
        },
        {
          type: 'classify',
          prompt:
            'Severidade é o tamanho do estrago; prioridade é a urgência de corrigir. Classifique cada bug.',
          buckets: [
            'Severidade alta, prioridade alta',
            'Severidade alta, prioridade baixa',
            'Severidade baixa, prioridade alta',
            'Severidade baixa, prioridade baixa',
          ],
          items: [
            { text: 'Todo pagamento por Pix é cobrado duas vezes', bucket: 0 },
            { text: 'Ninguém consegue fazer login no aplicativo', bucket: 0 },
            {
              text: 'O sistema trava ao gerar o relatório anual, usado só em dezembro (estamos em março)',
              bucket: 1,
            },
            {
              text: 'O nome da empresa está escrito errado na página inicial, e a campanha na TV começa amanhã',
              bucket: 2,
            },
            {
              text: 'A logo do patrocinador sumiu da página do evento que abre inscrições hoje',
              bucket: 2,
            },
            { text: 'Um ícone fica 2 pixels desalinhado na tela de configurações', bucket: 3 },
          ],
          explanation:
            'As duas medidas são independentes. Um erro de digitação quase não estraga nada (severidade baixa), mas na véspera da campanha é urgente (prioridade alta). Um travamento grave numa função usada só daqui a nove meses pode esperar a próxima versão. Quem testa sugere a severidade; a prioridade costuma ser decidida com produto.',
        },
        {
          type: 'quiz',
          question:
            'Você achou o bug da senha com 7 caracteres. Antes de relatar, o que mais aumenta a chance de ele ser corrigido rápido?',
          options: [
            {
              text: 'Reproduzir de novo, testar 8 e 6 caracteres para isolar a borda e anotar os dados exatos',
              correct: true,
              feedback:
                'Isso. Confirmar que o bug se repete e mostrar exatamente onde está a borda (7 passa, 6 é recusado, 8 passa) aponta quase direto para a linha do código.',
            },
            {
              text: 'Relatar na hora, antes de esquecer, com o título “problema na senha”',
              feedback:
                'Anotar na hora está certo, mas relatar sem reproduzir e com título vago faz a pessoa desenvolvedora gastar tempo descobrindo o que você já sabia.',
            },
            {
              text: 'Escrever em letras maiúsculas que é urgente, para chamar atenção',
              feedback:
                'Urgência se mostra com impacto e fatos, não com tom. Um relato claro e calmo é levado mais a sério.',
            },
          ],
        },
      ],
    },
    {
      id: 'comunicacao-sem-culpa',
      title: 'Falar de bugs sem apontar culpados',
      blocks: [
        {
          type: 'text',
          text: 'Um bug é uma informação sobre o **produto**, não um julgamento sobre uma **pessoa**. Lembre da aula de fundamentos: o erro é humano e todo mundo comete. O objetivo do relato é que o problema seja entendido e corrigido, e que o time continue confiando em você.',
        },
        {
          type: 'quiz',
          question:
            'O mesmo bug do CEP voltou depois de ser corrigido na semana passada. Como você avisa no canal do time?',
          options: [
            {
              text: '“O bug #142 do CEP com letras voltou na versão de hoje. Reproduzi com abcdefgh, mesmos passos do relato original. Reabri o chamado com print.”',
              correct: true,
              feedback:
                'Isso. Fatos, referência ao relato original, versão e evidência. Ninguém é acusado e quem corrigiu já sabe exatamente onde olhar.',
            },
            {
              text: '“De novo esse CEP?! Quem corrigiu não testou nada.”',
              feedback:
                'Além de criar tensão, não ajuda a resolver: falta a versão, os dados e a evidência. E pode haver outra causa, como uma mudança de outra pessoa que desfez a correção.',
            },
            {
              text: 'Não avisar e esperar alguém perceber sozinho, para evitar conflito',
              feedback:
                'Calar esconde um risco do time e dos clientes. Dá para falar de problemas sem conflito: com fatos e sem culpa.',
            },
          ],
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem a vida típica de um bug no time.',
          items: [
            'Quem testa relata o bug com passos, esperado, obtido e evidência',
            'O time analisa, confirma e define a prioridade',
            'Uma pessoa desenvolvedora corrige e entrega uma nova versão',
            'Quem testa refaz os passos do relato na nova versão (reteste)',
            'Testes de regressão conferem que a correção não quebrou outra coisa',
            'O bug é fechado',
          ],
          explanation:
            'Os nomes dos estados mudam de ferramenta para ferramenta (Jira, GitHub Issues, uma planilha), mas o ciclo é o mesmo. Ferramenta é detalhe: um bom relato funciona até num documento de texto.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns em relatos',
          text: 'Juntar três bugs diferentes num relato só. Escrever “não funciona” sem dizer o que aconteceu. Esquecer o ambiente. Não anexar evidência. Relatar sem tentar reproduzir. Usar tom de acusação. E confundir severidade com prioridade.',
        },
      ],
    },
  ],
  recap: [
    'Teste exploratório é aprender, desenhar e executar testes ao mesmo tempo, com objetivo, tempo e anotações.',
    'Um **charter** diz o que explorar, com que recursos e para descobrir o quê; o **timebox** fecha o tempo da sessão.',
    'Heurísticas como SFDPOT dão perguntas prontas sobre estrutura, função, dados, plataforma, operações e tempo.',
    'Um bom relato de bug tem título claro, passos com dados exatos, esperado, obtido, ambiente, evidência, severidade e prioridade.',
    'Severidade mede o estrago e prioridade mede a urgência; e bug se relata com fatos, sem culpa.',
  ],
  cards: [
    {
      id: 'exploratorio-x-roteirizado',
      front: 'Qual a diferença entre teste exploratório e roteirizado?',
      back: 'No roteirizado, os passos foram escritos antes. No exploratório, você aprende, cria e executa os testes ao mesmo tempo.',
    },
    {
      id: 'charter',
      front: 'Qual o modelo de um charter?',
      back: 'Explorar (alvo) com (recursos) para descobrir (informação).',
    },
    {
      id: 'timebox',
      front: 'O que é o timebox de uma sessão exploratória?',
      back: 'Um tempo fechado, em geral de 30 a 90 minutos, ao fim do qual você para e conta o que encontrou.',
    },
    {
      id: 'sfdpot',
      front: 'O que significa a heurística SFDPOT?',
      back: 'Estrutura, função, dados, plataforma, operações e tempo: perguntas para gerar ideias de teste.',
    },
    {
      id: 'partes-relato',
      front: 'Quais são as partes de um bom relato de bug?',
      back: 'Título, passos para reproduzir, resultado esperado, resultado obtido, ambiente, evidência, severidade e prioridade.',
    },
    {
      id: 'severidade-prioridade',
      front: 'Qual a diferença entre severidade e prioridade?',
      back: 'Severidade é o tamanho do estrago do bug. Prioridade é a urgência de corrigir, decidida com o negócio.',
    },
    {
      id: 'isolar',
      front: 'Por que testar variações antes de relatar um bug?',
      back: 'Para isolar o padrão (onde ocorre e onde não ocorre) e poupar a investigação de quem vai corrigir.',
    },
  ],
  mission: {
    title: 'Uma sessão exploratória e um relato reproduzível',
    text: 'Escolha um sistema que você pode testar sem causar problemas, como um site de demonstração feito para treinar testes, um projeto seu ou o formulário desta aula. Faça uma sessão de verdade e produza um relato que outra pessoa consiga reproduzir.',
    steps: [
      'Escreva um charter com alvo, recursos e informação buscada, e defina um timebox de 30 a 45 minutos',
      'Explore anotando com horário o que tentou, o que viu, dúvidas e ideias',
      'Escolha o problema mais importante e teste variações para isolar o padrão',
      'Escreva o relato com título, passos, esperado, obtido, ambiente, evidência, severidade e prioridade',
      'Peça para outra pessoa seguir seus passos sem sua ajuda e confira se ela chega ao mesmo resultado',
    ],
  },
  sources: [
    {
      title: 'BSTQB: syllabus e materiais de estudo',
      url: 'https://bstqb.org.br/b9/sobre/syllabus',
    },
    {
      title: 'Mozilla: guia para escrever relatos de bug',
      url: 'https://bugzilla.mozilla.org/page.cgi?id=bug-writing.html',
    },
    {
      title: 'GitHub: como contribuir com projetos',
      url: 'https://docs.github.com/pt/get-started/exploring-projects-on-github/contributing-to-a-project',
    },
  ],
};
