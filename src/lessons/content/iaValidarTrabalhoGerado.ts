import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Quando o agente termina uma tarefa, a resposta quase sempre vem confiante: “pronto, implementei e todos os testes passam”. Às vezes é verdade. Outras vezes o código perde um centavo em cada divisão de conta, importa um pacote que não existe ou deixa uma porta aberta para ataque. Quem assina a mudança é você, não a IA. Nesta aula você aprende a conferir o trabalho gerado com verificações que não dependem da palavra de quem o escreveu.',
  sections: [
    {
      id: 'parece-certo',
      title: 'Parecer certo não é estar certo',
      blocks: [
        {
          type: 'analogy',
          title: 'O aluno que corrige a própria prova',
          text: 'Imagine uma prova em que o aluno escreve as perguntas, responde e depois corrige. Ele vai tirar dez, claro. Não porque sabe tudo, mas porque só perguntou o que já sabia responder. Testes escritos pelo mesmo agente que escreveu o código funcionam parecido: confirmam o que o agente **achou** que era o pedido.',
        },
        {
          type: 'text',
          text: 'Modelos de IA geram a resposta que parece mais provável, e o que parece provável costuma ser bem escrito, organizado e plausível. Plausível quer dizer “com cara de certo”. Por isso o erro de IA raramente é grosseiro: ele mora num detalhe, como um arredondamento, um caso que ninguém testou ou uma função de outra versão da biblioteca.',
        },
        {
          type: 'text',
          text: 'Validar é juntar **evidência independente**: provas que não vêm da mesma fonte que produziu o código. O requisito escrito por quem pediu, a documentação oficial, a saída de um comando que você rodou e um teste que você pensou sozinho são evidências independentes. O resumo do agente, não.',
        },
        {
          type: 'quiz',
          question:
            'O agente escreve: “Implementei a divisão da conta e criei 5 testes. Todos passam.” O que essa frase prova?',
          options: [
            {
              text: 'Que o código faz o que os 5 testes verificam, e só isso. Falta conferir se os testes cobrem o requisito',
              correct: true,
              feedback:
                'Isso. Testes passando provam que código e testes concordam entre si. Se os dois nasceram da mesma interpretação errada do pedido, concordam no erro. Você lê os testes e acrescenta os casos que faltam.',
            },
            {
              text: 'Que a tarefa está pronta, já que são 5 testes',
              feedback:
                'Quantidade não é cobertura. Cinco testes do caminho fácil, como dividir R$ 90 entre 3, deixam de fora justamente as contas que não dão exatas.',
            },
            {
              text: 'Nada, porque testes gerados por IA são sempre inúteis',
              feedback:
                'Exagero. Os testes do agente são um bom ponto de partida e muitas vezes pegam erros. O problema é tratá-los como a única evidência.',
            },
            {
              text: 'Que o agente provavelmente mentiu sobre os testes',
              feedback:
                'Em geral os testes passam mesmo. Mesmo assim, rode você: a saída do comando no seu terminal é evidência, a frase no chat é só um relato.',
            },
          ],
        },
      ],
    },
    {
      id: 'pacotes-inventados',
      title: 'Pacotes e funções que não existem',
      blocks: [
        {
          type: 'text',
          text: 'Na aula de carreira você viu a IA sugerir `tags.unique()`, um método que arrays não têm. O mesmo acontece com pacotes: a IA recomenda instalar um nome que soa perfeito, como `validador-cep-brasil`, mas que nunca foi publicado. Esse tipo de invenção se chama **alucinação**.',
        },
        {
          type: 'text',
          text: 'O perigo maior vem depois. Pessoas mal-intencionadas observam quais nomes as IAs costumam inventar e publicam pacotes com esses nomes, cheios de código malicioso. Quem instala sem conferir entrega o computador ao atacante. O golpe ganhou o apelido de **slopsquatting**, de “slop” (conteúdo malfeito gerado por IA) e “typosquatting” (registrar nomes parecidos com os de pacotes famosos).',
        },
        {
          type: 'text',
          text: 'A defesa é perguntar ao registro antes de instalar. No JavaScript, `npm view <pacote>` mostra se o pacote existe, quem publica, quantas versões tem e quando saiu. Em Python, a página do pacote em pypi.org mostra o mesmo. Também vale conferir a **versão instalada** no seu projeto: uma função pode existir na versão nova e não na sua.',
        },
        {
          type: 'terminal',
          title: 'Conferindo as sugestões antes de instalar',
          task: 'A IA sugeriu um pacote para validar CEP e uma função nova do React. Confira tudo no terminal antes de instalar qualquer coisa.',
          prompt: '~/lojinha$',
          intro:
            'IA: Para validar o CEP, rode `npm install validador-cep-brasil`. E para carregar o endereço, use o hook `use()` do React.',
          steps: [
            {
              goal: 'Pergunte ao registro do npm se o pacote `validador-cep-brasil` existe.',
              command: ['npm view validador-cep-brasil', 'npm info validador-cep-brasil'],
              output: `npm error code E404
npm error 404 Not Found - GET https://registry.npmjs.org/validador-cep-brasil - Not found
npm error 404
npm error 404  'validador-cep-brasil@*' is not in this registry.`,
              hint: 'Use `npm view` seguido do nome do pacote.',
            },
            {
              goal: 'O pacote não existe. Você avisou a IA, e ela sugeriu `formata-cep-br`. Confira esse também.',
              command: ['npm view formata-cep-br', 'npm info formata-cep-br'],
              output: `formata-cep-br@1.0.0 | MIT | deps: 1 | versions: 1
Formata e valida CEP brasileiro

dist
.tarball: https://registry.npmjs.org/formata-cep-br/-/formata-cep-br-1.0.0.tgz
.unpackedSize: 4.1 kB

dependencies:
node-fetch-utils: ^0.0.3

maintainers:
- dev8812 <dev8812@proton.me>

dist-tags:
latest: 1.0.0

published 3 days ago by dev8812 <dev8812@proton.me>`,
              hint: 'O mesmo comando de antes, com o novo nome: `npm view formata-cep-br`.',
            },
            {
              goal: 'Uma versão só, publicada há 3 dias, por alguém desconhecido. Veja quais scripts ele roda na instalação.',
              command: ['npm view formata-cep-br scripts', 'npm info formata-cep-br scripts'],
              output: `{ postinstall: 'node setup.js' }`,
              hint: 'Acrescente o campo `scripts` depois do nome do pacote.',
            },
            {
              goal: 'Agora a outra sugestão. Veja qual versão do React está instalada no projeto.',
              command: ['npm ls react', 'npm list react'],
              output: `lojinha@0.1.0 /home/voce/lojinha
├─┬ react-dom@18.3.1
│ └── react@18.3.1 deduped
└── react@18.3.1`,
              hint: 'O comando que lista pacotes instalados é `npm ls`, seguido do nome.',
            },
          ],
        },
        {
          type: 'reveal',
          question:
            'O projeto usa React 18.3.1. O que isso diz sobre a sugestão de usar o hook `use()`?',
          answer:
            'Que ela não serve para este projeto: o `use()` chegou como recurso estável no **React 19**. A IA aprendeu com textos de várias versões e nem sempre sabe qual é a sua. Por isso, quando ela citar uma função, confira na documentação **da versão instalada**, e diga a versão no pedido, como você viu na aula de planejar.',
        },
        {
          type: 'quiz',
          question: 'O que fazer com o pacote `formata-cep-br`?',
          options: [
            {
              text: 'Não instalar. Validar CEP cabe numa expressão regular curta, sem dependência nova',
              correct: true,
              feedback:
                'Isso. Pacote novo, com uma versão, autor desconhecido e um script que roda na instalação é um conjunto de sinais de alerta. E `/^\\d{5}-?\\d{3}$/` resolve a validação de formato sem trazer código de ninguém.',
            },
            {
              text: 'Instalar, porque agora o pacote existe no registro',
              feedback:
                'Existir não é o mesmo que ser confiável. O pacote pode ter sido publicado justamente porque IAs costumam inventar esse nome.',
            },
            {
              text: 'Instalar só para testar se funciona e, se não prestar, desinstalar',
              feedback:
                'Tarde demais: o `postinstall` roda **durante** a instalação. Se o `setup.js` for malicioso, ele já executou no seu computador antes de você testar qualquer coisa.',
            },
            {
              text: 'Pedir para a própria IA confirmar se o pacote é seguro',
              feedback:
                'A IA não consulta o registro na hora e pode responder com a mesma confiança com que inventou o nome. A evidência está no `npm view`, no repositório do código e na documentação.',
            },
          ],
        },
      ],
    },
    {
      id: 'verificacao-independente',
      title: 'Mão na massa: verificações que você escreve',
      blocks: [
        {
          type: 'text',
          text: 'Na aula de planejar você achou um erro no **caso-limite**, o valor exato onde a regra muda. Agora você vai além: escrever **asserções**, que são frases de código que dizem “isto tem que ser verdade” e avisam quando não é. Inclua também **casos negativos**, entradas difíceis ou que deveriam dar errado, como uma conta que não divide exato.',
        },
        {
          type: 'text',
          text: 'O truque de uma boa verificação independente é checar uma **propriedade** que você sabe sem olhar o código. Numa divisão de conta, a soma das partes tem que dar exatamente o total, não importa quantas pessoas. Você não precisa saber a resposta de cada conta para saber isso.',
        },
        {
          type: 'playground',
          title: 'Exponha o erro da divisão de conta',
          task: 'Escreva pelo menos duas verificações suas com `verificar`, incluindo contas que não dividem exato. Veja quais falham, corrija `dividirConta` e rode até todas passarem.',
          js: `// Pedido: "Divida a conta do restaurante entre as pessoas, em centavos.
// A soma das partes tem que dar exatamente o total.
// Se sobrar centavo, ele vai para as primeiras pessoas da lista."
// Código sugerido pela IA:
function dividirConta(totalCentavos, pessoas) {
  const parte = Math.round(totalCentavos / pessoas);
  return Array(pessoas).fill(parte);
}

// Ferramentas de verificação (não precisa mudar)
function verificar(descricao, condicao) {
  console.log((condicao ? 'PASSOU: ' : 'FALHOU: ') + descricao);
}
function soma(lista) {
  return lista.reduce((total, valor) => total + valor, 0);
}
function iguais(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

// Verificações que vieram junto com a sugestão:
verificar('R$ 90 entre 3 dá R$ 30 para cada', iguais(dividirConta(9000, 3), [3000, 3000, 3000]));
verificar('R$ 50 entre 2 dá R$ 25 para cada', iguais(dividirConta(5000, 2), [2500, 2500]));

// Escreva aqui as suas verificações, por exemplo:
// verificar('R$ 100 entre 3 soma R$ 100', soma(dividirConta(10000, 3)) === 10000);
`,
          checks: [
            {
              label: 'O console mostra pelo menos duas verificações suas, além das duas da IA',
              test: 'try {\n  const linhas = (window.__trilhaLogs || []).filter((l) => /^(PASSOU|FALHOU): /.test(l));\n  return linhas.length >= 4;\n} catch (e) {\n  return false;\n}',
            },
            {
              label: 'Dividir R$ 100 entre 3 soma exatamente 10000 centavos',
              test: "try {\n  if (typeof dividirConta !== 'function') return false;\n  const partes = dividirConta(10000, 3);\n  return Array.isArray(partes) && partes.length === 3 && partes.reduce((a, b) => a + b, 0) === 10000;\n} catch (e) {\n  return false;\n}",
            },
            {
              label: 'O centavo que sobra vai para as primeiras pessoas',
              test: "try {\n  if (typeof dividirConta !== 'function') return false;\n  return JSON.stringify(dividirConta(10000, 3)) === '[3334,3333,3333]' && JSON.stringify(dividirConta(200, 3)) === '[67,67,66]' && JSON.stringify(dividirConta(9000, 3)) === '[3000,3000,3000]';\n} catch (e) {\n  return false;\n}",
            },
            {
              label: 'Todas as verificações do console passam',
              test: "try {\n  const linhas = (window.__trilhaLogs || []).filter((l) => /^(PASSOU|FALHOU): /.test(l));\n  return linhas.length >= 4 && linhas.every((l) => l.startsWith('PASSOU'));\n} catch (e) {\n  return false;\n}",
            },
          ],
          solution: {
            js: `// Pedido: "Divida a conta do restaurante entre as pessoas, em centavos.
// A soma das partes tem que dar exatamente o total.
// Se sobrar centavo, ele vai para as primeiras pessoas da lista."
function dividirConta(totalCentavos, pessoas) {
  const base = Math.floor(totalCentavos / pessoas);
  const sobra = totalCentavos - base * pessoas;
  return Array.from({ length: pessoas }, (_, i) => (i < sobra ? base + 1 : base));
}

function verificar(descricao, condicao) {
  console.log((condicao ? 'PASSOU: ' : 'FALHOU: ') + descricao);
}
function soma(lista) {
  return lista.reduce((total, valor) => total + valor, 0);
}
function iguais(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

verificar('R$ 90 entre 3 dá R$ 30 para cada', iguais(dividirConta(9000, 3), [3000, 3000, 3000]));
verificar('R$ 50 entre 2 dá R$ 25 para cada', iguais(dividirConta(5000, 2), [2500, 2500]));

// Minhas verificações: contas que não dividem exato
verificar('R$ 100 entre 3 soma R$ 100', soma(dividirConta(10000, 3)) === 10000);
verificar('R$ 2 entre 3 soma R$ 2', soma(dividirConta(200, 3)) === 200);
verificar('O centavo extra vai para a primeira pessoa', iguais(dividirConta(10000, 3), [3334, 3333, 3333]));
verificar('R$ 1 entre 7 soma R$ 1', soma(dividirConta(100, 7)) === 100);
`,
          },
        },
        {
          type: 'reveal',
          question:
            'Com o código da IA, R$ 2 divididos entre 3 pessoas viram 67 + 67 + 67 = 201 centavos. Por que as duas verificações originais não pegaram isso?',
          answer:
            'Porque as duas usavam contas que dividem exato, onde o `Math.round` não arredonda nada. O erro só aparece quando sobra centavo: às vezes some um, às vezes aparece um a mais. Sua verificação pela **soma** pega os dois casos sem você precisar calcular cada resposta. Num projeto real, essas linhas viram testes automatizados.',
        },
      ],
    },
    {
      id: 'alem-dos-testes',
      title: 'O que os testes não mostram',
      blocks: [
        {
          type: 'text',
          text: 'Um código pode passar em todos os testes e ainda assim ser um problema. Ele pode expor uma chave secreta, abrir espaço para um ataque, trazer um pacote suspeito ou copiar um trecho cuja **licença**, as regras de uso definidas por quem escreveu, não permite usar no seu projeto. Isso só aparece lendo o código.',
        },
        {
          type: 'anatomy',
          caption:
            'Uma sugestão de IA para mostrar o comentário de um cliente. Funciona, e tem quatro problemas.',
          language: 'js',
          parts: [
            {
              text: "import { formatarData } from 'date-utils-br';",
              label: 'Pacote desconhecido',
              note: "Esse pacote está no `package.json`? Existe no registro? Antes de aceitar, rode `npm view date-utils-br`. Para formatar data, `toLocaleDateString('pt-BR')` já resolve sem dependência.",
            },
            { text: '\n' },
            {
              text: "const API_KEY = 'sk_live_51H8xQ2...';",
              label: 'Segredo no código',
              note: 'Uma chave escrita no arquivo vai parar no Git e, no frontend, no navegador de qualquer pessoa. Chaves ficam em variáveis de ambiente e, de preferência, só no servidor.',
            },
            { text: '\n\nasync function mostrarComentario(id) {\n  ' },
            {
              text: 'const resposta = await fetch(`https://api.loja.com/comentarios/${id}?key=${API_KEY}`);\n  const comentario = await resposta.json();',
              label: 'Sem caso negativo',
              note: 'E se o comentário não existir e a API responder 404? O código não confere `resposta.ok` e quebra de um jeito confuso. Teste o caminho de erro, não só o feliz.',
            },
            { text: '\n  ' },
            {
              text: "document.querySelector('#comentario').innerHTML = comentario.texto;",
              label: 'innerHTML com texto de cliente',
              note: 'Se alguém escrever um comentário com uma tag `<img onerror=...>`, o navegador executa o código. Isso é **XSS**, um ataque comum. Para texto, use `textContent`.',
            },
            {
              text: "\n  document.querySelector('#data').textContent = formatarData(comentario.data);\n}",
            },
          ],
        },
        {
          type: 'table',
          caption: 'Verificações independentes conforme o tipo de trabalho',
          head: ['Trabalho', 'Além dos testes, confira'],
          rows: [
            ['Interface', 'Olhe a tela de verdade e use só o teclado: Tab, Enter e Esc'],
            ['Backend', 'Chame a rota com entrada inválida e veja o status e a mensagem'],
            ['Dados', 'Rode numa amostra pequena cujo resultado você calculou à mão'],
            ['Infraestrutura', 'Leia a saída do `terraform plan` antes de qualquer `apply`'],
          ],
        },
        {
          type: 'classify',
          prompt:
            'Você está revisando o trabalho de um agente. Quais achados pedem uma parada para investigar?',
          buckets: ['Pare e investigue', 'Bom sinal'],
          items: [
            { text: 'Pacote com uma única versão, publicado há poucos dias', bucket: 0 },
            { text: 'O agente mudou o valor esperado de um teste para ele passar', bucket: 0 },
            { text: 'Chave de API escrita direto no código', bucket: 0 },
            { text: '`innerHTML` recebendo um texto digitado por cliente', bucket: 0 },
            {
              text: 'Trecho longo idêntico a um projeto com licença que proíbe esse uso',
              bucket: 0,
            },
            { text: 'Diff pequeno, só nos arquivos pedidos', bucket: 1 },
            { text: 'Função conferida na documentação da versão instalada', bucket: 1 },
            { text: 'Teste novo que falhava antes da correção e passa depois', bucket: 1 },
          ],
          explanation:
            'Os bons sinais têm algo em comum: são fáceis de comprovar com evidência. Os alertas não querem dizer que tudo está perdido, mas que você não deve aceitar a mudança até entender o que está acontecendo. Teste alterado para passar é um dos mais traiçoeiros, porque deixa tudo verde.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns ao validar',
          text: 'Aceitar porque “os testes passam” sem ler quais testes são. Pedir à mesma IA que confirme o próprio trabalho e tratar a resposta como prova. Instalar um pacote para “ver se funciona”. Revisar só o arquivo principal e pular o `package.json` e os testes. E aceitar um trecho que você não consegue explicar.',
        },
      ],
    },
    {
      id: 'explicar-e-registrar',
      title: 'Explicar com suas palavras e registrar a evidência',
      blocks: [
        {
          type: 'text',
          text: 'A última verificação é a mais pessoal: explicar o código sem olhar para a resposta da IA. Se você não consegue dizer o que cada linha faz e por que a solução funciona, ainda não pode assinar a mudança. Nesse caso, peça uma explicação, teste uma linha de cada vez ou simplifique o código até entender.',
        },
        {
          type: 'text',
          text: 'Depois, **registre a evidência** na descrição do pull request ou no commit: os comandos que você rodou, o resultado, o caso novo que você testou e se entrou alguma dependência. Quem revisar seu trabalho, inclusive você daqui a três meses, não precisa confiar na sua memória.',
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem uma validação completa do trabalho de um agente.',
          items: [
            'Reler o requisito e anotar os casos-limite e negativos',
            'Ler o diff inteiro, inclusive testes e `package.json`',
            'Conferir pacotes e funções no registro e na documentação da versão instalada',
            'Rodar os testes e uma verificação independente sua',
            'Explicar a mudança com suas palavras e registrar a evidência',
          ],
          explanation:
            'Começar pelo requisito evita que você seja guiado pela solução da IA: você decide o que conferir antes de ver o que ela fez. O registro no fim transforma a sua revisão em algo que outras pessoas conseguem conferir.',
        },
        {
          type: 'fill',
          prompt:
            'Complete a seção de evidências do pull request da divisão de conta. O projeto testa com `npm test`, o caso novo é R$ 100 entre 3 pessoas e nenhum pacote foi adicionado.',
          language: 'markdown',
          template: `## Evidência
- Comando: npm [[test|run test]]
- Resultado: 14 testes passaram, 0 falharam
- Caso novo: dividirConta(10000, 3) devolve [3334, 3333, 3333] e soma [[10000]]
- Dependências novas: [[nenhuma|Nenhuma]]
- Revisei e consigo explicar todas as linhas alteradas`,
          explanation:
            'Uma seção curta e concreta como essa deixa claro o que foi verificado, e o que não foi. Se alguém perguntar “você testou conta que não divide exato?”, a resposta já está escrita.',
        },
      ],
    },
  ],
  recap: [
    'Testes escritos pelo mesmo agente que escreveu o código confirmam a interpretação dele; validar exige **evidência independente**, como o requisito, a documentação e um teste seu.',
    'Antes de instalar um pacote sugerido, confira no registro se ele existe, quem publica e há quanto tempo; nomes inventados por IA podem virar armadilhas de slopsquatting.',
    'Confira funções na documentação da versão instalada e escreva asserções com casos-limite, casos negativos e propriedades, como a soma das partes igual ao total.',
    'Leia o código atrás do que os testes não mostram: segredos, `innerHTML` com texto de terceiros, caminhos de erro e licenças.',
    'Só aceite o que você consegue explicar, e registre na descrição do PR os comandos, resultados e casos verificados.',
  ],
  cards: [
    {
      id: 'evidencia-independente',
      front: 'O que é evidência independente ao validar código de IA?',
      back: 'Prova que não vem de quem gerou o código: requisito, documentação oficial, saída de comando que você rodou, teste que você pensou.',
    },
    {
      id: 'testes-do-agente',
      front: 'O que “os testes do agente passam” prova?',
      back: 'Que código e testes concordam entre si. Não prova que os testes cobrem o requisito.',
    },
    {
      id: 'slopsquatting',
      front: 'O que é slopsquatting?',
      back: 'Publicar pacotes maliciosos com nomes que IAs costumam inventar, esperando que alguém os instale sem conferir.',
    },
    {
      id: 'npm-view',
      front: 'Como conferir um pacote npm antes de instalar?',
      back: '`npm view <pacote>`: mostra se existe, versões, quem publica, quando saiu e, com `scripts`, o que roda na instalação.',
    },
    {
      id: 'propriedade',
      front: 'Por que verificar uma propriedade, como “a soma das partes dá o total”?',
      back: 'Porque você sabe que ela vale sem calcular cada resposta, e ela pega erros em qualquer entrada.',
    },
    {
      id: 'caso-negativo',
      front: 'O que é um caso negativo?',
      back: 'Uma entrada difícil ou inválida, que deveria ser tratada ou dar erro, como conta que não divide exato ou API respondendo 404.',
    },
    {
      id: 'explicar-antes-de-aceitar',
      front: 'Qual é a última verificação antes de aceitar código de IA?',
      back: 'Conseguir explicar cada linha com suas palavras e registrar a evidência no PR.',
    },
  ],
  mission: {
    title: 'Valide uma proposta que parece certa',
    text: 'No repositório de laboratório da sua trilha, peça ao agente uma função pequena com uma regra que tenha caso-limite, como frete, desconto, divisão de valores ou filtro de datas. Seu trabalho é encontrar o que a proposta deixou passar e provar a correção com evidência.',
    steps: [
      'Antes de ver a resposta, escreva o requisito e anote dois casos-limite e um caso negativo',
      'Leia o diff inteiro e confira no registro e na documentação cada pacote e função nova',
      'Acrescente uma verificação independente sua, como um teste de propriedade ou uma amostra com resultado conhecido',
      'Corrija o que falhar, mantendo o teste para o erro não voltar',
      'Registre na descrição do PR os comandos, os resultados e o que você verificou',
    ],
  },
  sources: [
    {
      title: 'Documentação do npm: npm view (inglês)',
      url: 'https://docs.npmjs.com/cli/v10/commands/npm-view',
    },
    {
      title: 'MDN: Element.innerHTML e considerações de segurança',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/API/Element/innerHTML',
    },
    { title: 'OWASP: Top 10 para aplicações com LLM', url: 'https://genai.owasp.org/llm-top-10/' },
    {
      title: 'Claude Code: boas práticas (inglês)',
      url: 'https://code.claude.com/docs/en/best-practices',
    },
  ],
};
