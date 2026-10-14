import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Uma IA de programação escreve em dez segundos o que você levaria uma tarde para digitar. O problema é que ela também erra em dez segundos, e um erro escondido no meio de duzentas linhas pode passar despercebido até chegar à pessoa usuária. Quem trabalha bem com IA não pede o sistema inteiro de uma vez: divide o trabalho em fatias pequenas, revisa cada uma e só segue quando tem evidência de que funciona. É esse jeito de trabalhar que você vai praticar agora.',
  sections: [
    {
      id: 'fatias-pequenas',
      title: 'Uma fatia de cada vez',
      blocks: [
        {
          type: 'analogy',
          title: 'A reforma da casa',
          text: 'Ninguém contrata um pedreiro, diz “reforma a casa toda” e viaja por um mês. Você combina primeiro o banheiro, confere se o piso ficou nivelado e se a descarga funciona, e só então passa para a cozinha. Se algo saiu errado, o prejuízo é de um cômodo, não da casa inteira.',
        },
        {
          type: 'text',
          text: 'Com IA é igual. Um **assistente de código** é uma IA que conversa sobre o seu código e sugere trechos. Um **agente de código** vai além: ele lê os arquivos do projeto, edita, roda comandos no terminal e mostra o resultado. Quanto mais ele consegue fazer sozinho, mais importa limitar o tamanho de cada pedido.',
        },
        {
          type: 'text',
          text: 'Uma **fatia** (ou recorte) é uma mudança pequena que entrega algo observável: um botão que passa a funcionar, uma regra nova com um teste, um erro tratado. Ela cabe numa revisão de poucos minutos e, se der errado, é fácil desfazer.',
        },
        {
          type: 'quiz',
          question:
            'Você está construindo a lojinha da trilha e quer frete grátis para pedidos grandes. Qual pedido para a IA é uma boa fatia?',
          options: [
            {
              text: '“Implemente a regra de frete grátis a partir de R$ 100 na função `calcularFrete` e um teste para ela. Não mexa em outros arquivos.”',
              correct: true,
              feedback:
                'Isso. Uma regra, um lugar, um teste e um limite claro. Você consegue revisar tudo em poucos minutos e sabe exatamente o que conferir.',
            },
            {
              text: '“Melhore o checkout da loja.”',
              feedback:
                'Vago demais: a IA vai decidir sozinha o que é “melhorar” e pode mexer em dezenas de arquivos. Você não terá como saber se o resultado é o que queria.',
            },
            {
              text: '“Crie o carrinho, o cálculo de frete, o cupom de desconto e o pagamento por Pix.”',
              feedback:
                'São quatro funcionalidades num pedido só. O diff fica enorme, os erros se misturam e, se uma parte quebrar, fica difícil desfazer só ela.',
            },
          ],
        },
      ],
    },
    {
      id: 'o-ciclo',
      title: 'O ciclo de trabalho em parceria',
      blocks: [
        {
          type: 'text',
          text: 'Trabalhar com um agente é repetir um ciclo curto: **planejar**, **implementar** uma fatia, **revisar** o que mudou, **testar** e guardar o passo num **commit** (o registro de uma mudança no Git). Depois, a próxima fatia. Veja o ciclo acontecendo.',
        },
        {
          type: 'flow',
          caption: 'Uma fatia da regra de frete, do pedido ao commit',
          actors: ['Você', 'Agente', 'Código', 'Testes'],
          steps: [
            {
              from: 0,
              to: 1,
              label: 'Pedido + limites',
              text: 'Você descreve a fatia, o resultado esperado com um exemplo e quais arquivos podem mudar. E pede um plano antes de qualquer código.',
            },
            {
              from: 1,
              to: 0,
              label: 'Plano em 3 passos',
              text: 'O agente propõe: alterar `calcularFrete`, criar um teste e rodar a suíte. Você lê, corrige o que não faz sentido e aprova só o primeiro passo.',
            },
            {
              from: 1,
              to: 2,
              label: 'Edita frete.js',
              text: 'O agente altera o arquivo. Até aqui nada foi guardado no Git: a mudança está só na sua pasta, fácil de desfazer.',
            },
            {
              from: 1,
              to: 3,
              label: 'npm test',
              text: 'O agente roda os testes do projeto para conferir o próprio trabalho.',
            },
            {
              from: 3,
              to: 1,
              label: '1 teste falhou',
              text: 'Um teste antigo quebrou. O agente lê a mensagem e ajusta o código. Repare: quem decide se o ajuste está certo ainda é você.',
              tone: 'error',
            },
            {
              from: 1,
              to: 0,
              label: 'Diff + saída dos testes',
              text: 'O agente mostra o que mudou e o resultado dos comandos. Você lê o diff linha por linha.',
            },
            {
              from: 0,
              to: 3,
              label: 'Você roda de novo',
              text: 'Você mesmo roda os testes e abre a aplicação para ver o frete na tela. A palavra do agente não é evidência; a saída do comando é.',
              tone: 'ok',
            },
            {
              from: 0,
              to: 0,
              label: 'Commit da fatia',
              text: 'Com tudo conferido, você faz o commit. Se a próxima fatia der errado, este ponto seguro continua guardado.',
            },
          ],
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem o ciclo de uma fatia feita em parceria com um agente.',
          items: [
            'Descrever a fatia, o resultado esperado e os limites',
            'Ler o plano proposto e ajustar antes de aprovar',
            'Deixar o agente implementar só o passo aprovado',
            'Ler o diff linha por linha',
            'Rodar os testes e conferir o comportamento você mesmo',
            'Fazer o commit e só então partir para a próxima fatia',
          ],
          explanation:
            'O ciclo é curto de propósito. Cada volta termina num ponto seguro, com evidência de que funciona. Se você pular a revisão, o próximo passo já começa em cima de um erro.',
        },
      ],
    },
    {
      id: 'plano-primeiro',
      title: 'Plano primeiro, código depois',
      blocks: [
        {
          type: 'text',
          text: 'Pedir o plano antes do código parece burocracia, mas é o passo mais barato do ciclo. Corrigir uma frase do plano leva segundos; desfazer cinco arquivos editados na direção errada leva muito mais.',
        },
        {
          type: 'code',
          language: 'text',
          caption: 'Um modelo de pedido para começar uma fatia',
          code: `Quero implementar [mudança pequena] neste projeto.
Contexto: [arquivos relevantes, comportamento atual e versão].
Resultado esperado: [exemplo de entrada e saída].
Limites: [arquivos que podem mudar e o que deve ser preservado].
Primeiro proponha um plano curto e como vamos verificar.
Depois trabalharemos uma etapa por vez.
Ao implementar, mostre o diff, explique as decisões
e informe os comandos executados e seus resultados.`,
        },
        {
          type: 'reveal',
          question:
            'O agente responde com um plano que inclui “atualizar a biblioteca de testes para a versão mais nova”. Por que vale parar aqui, antes de qualquer código?',
          answer:
            'Porque isso não faz parte da fatia. Atualizar uma dependência pode quebrar outras partes do projeto e mistura duas mudanças num diff só. No plano, basta responder “sem atualizar dependências” e seguir. Depois do código feito, separar as duas coisas dá bem mais trabalho.',
        },
        {
          type: 'text',
          text: 'O plano também é a hora de decidir **o que você mesmo escreve**. Se você está aprendendo, a parte central do exercício é sua: é ela que você precisa saber explicar numa entrevista. Tarefas repetitivas ou periféricas podem ser delegadas, desde que revisadas.',
        },
        {
          type: 'classify',
          prompt:
            'Enquanto você aprende, o que é melhor fazer você e o que pode delegar à IA para depois revisar?',
          buckets: ['Faça você', 'Pode delegar e revisar'],
          items: [
            { text: 'A regra principal que o exercício quer ensinar', bucket: 0 },
            { text: 'Decidir o que entra e o que fica fora da fatia', bucket: 0 },
            {
              text: 'Um caso de teste escrito a partir do requisito, sem olhar o código gerado',
              bucket: 0,
            },
            { text: 'Renomear uma variável em vários arquivos', bucket: 1 },
            { text: 'Gerar dados de exemplo para testar uma tela ou consulta', bucket: 1 },
            { text: 'Um rascunho da seção “Como rodar” do README, que você confere', bucket: 1 },
          ],
          explanation:
            'O teste que você escreve a partir do requisito é especialmente valioso: se o código e o teste vierem da mesma proposta, os dois podem carregar o mesmo mal-entendido. Um caso pensado por você é uma verificação independente.',
        },
      ],
    },
    {
      id: 'lendo-o-diff',
      title: 'Lendo um diff como quem revisa',
      blocks: [
        {
          type: 'text',
          text: 'O **diff** é a lista do que mudou entre duas versões de um arquivo. Você viu o Git na aula de Git do zero; aqui o foco é ler o diff com olhar de revisão. Linhas com `-` saíram, linhas com `+` entraram, e as linhas sem sinal são contexto, só para você se localizar.',
        },
        {
          type: 'anatomy',
          caption: 'Um diff pequeno, como o `git diff` mostra no terminal.',
          language: 'diff',
          parts: [
            {
              text: 'diff --git a/src/preco.js b/src/preco.js\n--- a/src/preco.js\n+++ b/src/preco.js',
              label: 'Qual arquivo',
              note: 'O cabeçalho diz qual arquivo mudou. `a/` é a versão antiga e `b/` é a nova. Primeira pergunta da revisão: este arquivo deveria mesmo ter mudado nesta fatia?',
            },
            { text: '\n' },
            {
              text: '@@ -1,3 +1,5 @@',
              label: 'Onde',
              note: 'Um trecho alterado. Lê-se: na versão antiga, a partir da linha 1, 3 linhas; na nova, a partir da linha 1, 5 linhas. Um diff grande tem vários desses blocos.',
            },
            { text: '\n' },
            {
              text: ' function formatarPreco(valor) {',
              label: 'Contexto',
              note: 'Começa com espaço: a linha não mudou. Ela aparece só para você saber em que parte do código está.',
            },
            { text: '\n' },
            {
              text: "-  return 'R$ ' + valor;",
              label: 'Linha removida',
              note: 'Começa com `-`. Era assim antes. Pergunte-se: o que este código fazia, e alguém dependia disso?',
            },
            { text: '\n' },
            {
              text: "+  return valor.toLocaleString('pt-BR', {\n+    style: 'currency', currency: 'BRL',\n+  });",
              label: 'Linhas adicionadas',
              note: 'Começam com `+`. É o código novo. Leia como se você fosse responder por ele: você sabe o que `toLocaleString` faz? Se não, confira na documentação antes de aceitar.',
            },
            { text: '\n }' },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Onde ver o diff',
          text: 'No terminal, `git diff` mostra o que ainda não foi para o commit. Editores como VS Code e Cursor mostram o mesmo em cores, lado a lado. Os agentes costumam exibir o diff antes de aplicar a mudança: é ali que a revisão começa.',
        },
        {
          type: 'quiz',
          question:
            'O agente avisa: “Pronto, todos os testes passam.” Revisando o diff, você encontra este trecho. O que fazer?',
          code: `--- a/tests/frete.test.js
+++ b/tests/frete.test.js
@@ -4,3 +4,3 @@
 test('frete grátis a partir de R$ 100', () => {
-  expect(calcularFrete(100)).toBe(0);
+  expect(calcularFrete(100)).toBe(12.9);
 });`,
          language: 'diff',
          options: [
            {
              text: 'Rejeitar essa parte: o teste foi alterado para aceitar o comportamento errado',
              correct: true,
              feedback:
                'Isso. O requisito diz que R$ 100 já tem frete grátis, e o teste dizia exatamente isso. Em vez de corrigir o código, o agente mudou a expectativa. Peça para restaurar o teste e corrigir a função.',
            },
            {
              text: 'Aceitar, porque os testes estão passando',
              feedback:
                'Testes passando só valem se continuam dizendo a verdade sobre o requisito. Aqui o teste passou porque deixou de testar a regra.',
            },
            {
              text: 'Apagar o teste, já que ele estava atrapalhando',
              feedback:
                'Apagar a verificação esconde o problema em vez de resolvê-lo. A regra continua quebrada, só que agora ninguém percebe.',
            },
            {
              text: 'Aceitar, porque a IA deve conhecer melhor a regra de frete',
              feedback:
                'A regra é do negócio, não da IA. Quem sabe se R$ 100 tem frete grátis é o requisito, e ele está escrito no nome do próprio teste.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns na revisão',
          text: 'Aceitar o diff inteiro sem ler porque “parece certo”. Deixar o agente emendar várias fatias sem nenhum commit no meio. Acreditar no resumo do agente (“testei e funciona”) em vez de rodar o comando. E aceitar arquivos alterados que não tinham nada a ver com a tarefa.',
        },
        {
          type: 'fill',
          prompt:
            'Complete os comandos que fecham uma fatia: ver o que mudou, testar, preparar e guardar.',
          language: 'bash',
          template: `git [[diff]]            # ver o que mudou, linha por linha
npm [[test|run test]]            # rodar os testes você mesmo
git [[add]] src/frete.js tests/frete.test.js
git [[commit]] -m "Frete grátis a partir de R$ 100"`,
          explanation:
            'Em um projeto Python o teste seria `pytest`; num projeto de dados, talvez `dbt test`. O comando muda, a ordem não: ler, rodar, e só então guardar.',
        },
      ],
    },
    {
      id: 'revise-a-funcao',
      title: 'Mão na massa: revise o que a IA escreveu',
      blocks: [
        {
          type: 'text',
          text: 'A IA recebeu o pedido “frete grátis para pedidos **a partir de** R$ 100; abaixo disso, R$ 12,90” e devolveu a função abaixo, com dois exemplos que funcionam. Sua tarefa é revisar como faria numa equipe: comparar o código com o requisito, testar um caso que a IA não testou e corrigir.',
        },
        {
          type: 'playground',
          title: 'Revise a função de frete',
          task: 'Rode os exemplos e compare com o requisito. Acrescente um `console.log` para o caso de exatamente R$ 100, encontre o erro e corrija a função.',
          js: `// Pedido: "Frete grátis para pedidos a partir de R$ 100.
// Abaixo disso, o frete custa R$ 12,90."
// Código sugerido pela IA:
function calcularFrete(subtotal) {
  if (subtotal > 100) {
    return 0;
  }
  return 12.9;
}

// Exemplos que vieram junto com a sugestão:
console.log('R$ 50 ->', calcularFrete(50));
console.log('R$ 150 ->', calcularFrete(150));

// Escreva aqui o seu caso de teste:
`,
          checks: [
            {
              label: 'O console mostra o frete para um pedido de exatamente R$ 100',
              test: 'try {\n  return window.__trilhaLogs.some((linha) => /(^|[^\\d.,])100([^\\d.,]|$)/.test(linha));\n} catch (e) {\n  return false;\n}',
            },
            {
              label: '`calcularFrete(100)` devolve `0`, como pede o requisito',
              test: "try {\n  return typeof calcularFrete === 'function' && calcularFrete(100) === 0;\n} catch (e) {\n  return false;\n}",
            },
            {
              label: 'Abaixo de R$ 100 o frete continua `12.9` e acima continua `0`',
              test: "try {\n  if (typeof calcularFrete !== 'function') return false;\n  return calcularFrete(99.99) === 12.9 && calcularFrete(50) === 12.9 && calcularFrete(150) === 0;\n} catch (e) {\n  return false;\n}",
            },
          ],
          solution: {
            js: `// Pedido: "Frete grátis para pedidos a partir de R$ 100.
// Abaixo disso, o frete custa R$ 12,90."
// "A partir de" inclui o próprio 100, então a comparação é >=.
function calcularFrete(subtotal) {
  if (subtotal >= 100) {
    return 0;
  }
  return 12.9;
}

console.log('R$ 50 ->', calcularFrete(50));
console.log('R$ 150 ->', calcularFrete(150));

// O caso-limite que faltava:
console.log('R$ 100 ->', calcularFrete(100));
`,
          },
        },
        {
          type: 'reveal',
          question:
            'Os dois exemplos da IA passavam e o erro estava lá mesmo assim. O que esse exercício ensina sobre os exemplos que vêm junto com o código?',
          answer:
            'Que eles costumam testar o caminho fácil, longe da fronteira. Erros de `>` no lugar de `>=` só aparecem no **caso-limite**, o valor exato onde a regra muda. Por isso o seu teste, pensado a partir do requisito, vale mais do que os exemplos da mesma proposta. Esse caso vira um teste automatizado no projeto, para o erro nunca voltar.',
        },
      ],
    },
  ],
  recap: [
    'Trabalhe com IA em **fatias pequenas**: uma mudança observável, com limites claros, que cabe numa revisão de poucos minutos.',
    'O ciclo é planejar, implementar um passo, ler o diff, rodar os testes e fazer o commit antes da próxima fatia.',
    'Peça o plano antes do código: corrigir uma frase do plano custa muito menos que desfazer arquivos editados.',
    'No diff, desconfie de arquivos fora do escopo e de testes alterados para passar.',
    'A evidência é a saída dos comandos que você roda, e um caso de teste pensado por você a partir do requisito.',
  ],
  cards: [
    {
      id: 'agente-de-codigo',
      front: 'Qual a diferença entre um assistente e um agente de código?',
      back: 'O assistente conversa e sugere trechos. O agente também lê arquivos, edita e roda comandos no projeto.',
    },
    {
      id: 'fatia',
      front: 'O que é uma boa fatia de trabalho para a IA?',
      back: 'Uma mudança pequena e observável, com resultado esperado e limites claros, fácil de revisar e de desfazer.',
    },
    {
      id: 'ciclo-parceria',
      front: 'Quais são os passos do ciclo de trabalho com um agente?',
      back: 'Planejar, implementar um passo, ler o diff, rodar os testes, fazer o commit.',
    },
    {
      id: 'plano-antes',
      front: 'Por que pedir um plano antes do código?',
      back: 'Porque corrigir o plano é barato, e você pode cortar o que está fora da fatia antes de qualquer arquivo mudar.',
    },
    {
      id: 'diff-sinais',
      front: 'No diff, o que significam as linhas com `-`, `+` e sem sinal?',
      back: '`-` saiu, `+` entrou e sem sinal é contexto que não mudou.',
    },
    {
      id: 'teste-alterado',
      front: 'O agente mudou a expectativa de um teste para ele passar. O que fazer?',
      back: 'Rejeitar essa parte, restaurar o teste e pedir para corrigir o código conforme o requisito.',
    },
  ],
  mission: {
    title: 'Uma fatia em parceria, do plano ao commit',
    text: 'No projeto que você está construindo na sua trilha, escolha uma mudança pequena e faça o ciclo completo com uma ferramenta de IA. Ao final, você deve conseguir explicar cada linha do diff.',
    steps: [
      'Escreva o pedido com contexto, resultado esperado e limites, e peça um plano antes do código',
      'Ajuste o plano e aprove só o primeiro passo',
      'Leia o diff inteiro e rejeite ou ajuste pelo menos uma sugestão, anotando o motivo',
      'Acrescente um caso de teste que você pensou a partir do requisito, sem copiar da proposta',
      'Rode os testes você mesmo e faça um commit com uma mensagem que diga o porquê',
    ],
  },
  sources: [
    {
      title: 'Claude Code: boas práticas (inglês)',
      url: 'https://code.claude.com/docs/en/best-practices',
    },
    {
      title: 'OpenAI: prompting para tarefas de código (inglês)',
      url: 'https://developers.openai.com/codex/prompting/',
    },
    {
      title: 'Pro Git: registrando alterações no repositório',
      url: 'https://git-scm.com/book/pt-br/v2/Fundamentos-de-Git-Gravando-Altera%C3%A7%C3%B5es-em-Seu-Reposit%C3%B3rio',
    },
  ],
};
