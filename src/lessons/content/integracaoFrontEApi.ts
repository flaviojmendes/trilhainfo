import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Você já tem uma tela React e uma API Node rodando, cada uma no seu canto. A primeira vez que você tenta ligar as duas, quase sempre aparece uma mensagem vermelha sobre CORS no console, e muita gente trava aqui. Nesta aula você entende o caminho completo de um cadastro, do clique no botão até o dado salvo, e aprende a tratar cada coisa que pode dar errado no meio sem fazer a pessoa digitar tudo de novo.',
  sections: [
    {
      id: 'caminho-da-requisicao',
      title: 'Dois programas, uma conversa',
      blocks: [
        {
          type: 'analogy',
          title: 'O pedido no aplicativo de entrega',
          text: 'Quando você pede uma pizza pelo app, o celular não faz a pizza. Ele monta o pedido, envia para o restaurante e mostra “pedido recebido” ou “restaurante fechado”. O restaurante confere se tem ingrediente, prepara e responde. O app React é o celular; a API é o restaurante; o banco de dados é a cozinha.',
        },
        {
          type: 'text',
          text: 'No seu computador, são **dois processos** separados: o Vite servindo o front em `http://localhost:5173` e o Node servindo a API em `http://localhost:3000`. Cada um ocupa uma **porta**. O código React roda no navegador da pessoa; o código Express roda no servidor. Eles só se falam por HTTP.',
        },
        {
          type: 'flow',
          caption: 'O caminho de um cadastro de despesa',
          actors: ['Pessoa', 'App React', 'API :3000', 'Banco'],
          steps: [
            {
              from: 0,
              to: 1,
              label: 'clica em Salvar',
              text: 'A pessoa preencheu descrição e valor. O React lê o estado do formulário.',
            },
            {
              from: 1,
              to: 2,
              label: 'POST /despesas + JSON',
              text: 'O `fetch` envia um pedido HTTP com o corpo em JSON. A partir daqui o React só espera.',
            },
            {
              from: 2,
              to: 3,
              label: 'valida e grava',
              text: 'A API confere os dados de novo, porque não confia no cliente, e grava no banco.',
            },
            {
              from: 2,
              to: 1,
              label: '201 + despesa criada',
              text: 'A API devolve o status 201 e a despesa com o `id` que o banco gerou.',
              tone: 'ok',
            },
            {
              from: 1,
              to: 0,
              label: 'mostra na lista',
              text: 'O React atualiza o estado, a lista ganha um item e o botão volta a funcionar.',
              tone: 'ok',
            },
          ],
        },
        {
          type: 'classify',
          prompt: 'Onde cada tarefa acontece?',
          buckets: ['No front (navegador)', 'Na API (servidor)'],
          items: [
            { text: 'Mostrar “Salvando…” e desativar o botão', bucket: 0 },
            { text: 'Avisar que o campo valor está vazio antes de enviar', bucket: 0 },
            { text: 'Guardar o que a pessoa digitou se o envio falhar', bucket: 0 },
            { text: 'Recusar valor negativo com status 400, mesmo vindo do curl', bucket: 1 },
            { text: 'Gerar o `id` da despesa nova', bucket: 1 },
            { text: 'Ler a senha do banco de dados', bucket: 1 },
          ],
          explanation:
            'O front cuida da experiência: avisar cedo, mostrar progresso, não perder dados. A API cuida das regras e dos segredos, porque o código do navegador pode ser lido e modificado por qualquer pessoa. Validar nos dois lugares não é repetição: cada validação protege uma coisa diferente.',
        },
      ],
    },
    {
      id: 'fetch-com-corpo',
      title: 'Enviar dados com fetch',
      blocks: [
        {
          type: 'text',
          text: 'Na aula de JavaScript assíncrono você usou `fetch` para **buscar** dados. Para **enviar**, o `fetch` recebe um segundo argumento com o método, os **cabeçalhos** (informações extras sobre o pedido) e o corpo.',
        },
        {
          type: 'anatomy',
          caption: 'Um POST completo para a API de despesas. Explore cada parte.',
          language: 'js',
          parts: [
            {
              text: "const resposta = await fetch(API_URL + '/despesas', {",
              label: 'Endereço',
              note: '`API_URL` vem de uma variável de ambiente, como você vai ver adiante. Assim o mesmo código chama a API local em desenvolvimento e a API publicada em produção.',
            },
            { text: '\n  ' },
            {
              text: "method: 'POST',",
              label: 'Método',
              note: 'Sem isso o `fetch` faz um GET. POST é o método para criar um recurso novo.',
            },
            { text: '\n  ' },
            {
              text: "headers: { 'Content-Type': 'application/json' },",
              label: 'Cabeçalho',
              note: 'Avisa a API que o corpo é JSON. É esse cabeçalho que faz o `express.json()` do servidor ler o corpo e preencher `req.body`.',
            },
            { text: '\n  ' },
            {
              text: 'body: JSON.stringify({ descricao, valor: Number(valor) }),',
              label: 'Corpo',
              note: 'O corpo viaja como texto. `JSON.stringify` transforma o objeto em texto JSON. O `Number` converte o valor, porque todo campo de formulário entrega texto.',
            },
            { text: '\n});\n' },
            {
              text: 'const dados = await resposta.json();',
              label: 'Ler a resposta',
              note: 'Transforma o texto JSON da resposta de volta em objeto. Pode ser a despesa criada ou um `{ erro }`: confira `resposta.ok` antes de decidir.',
            },
            { text: '\n' },
            {
              text: 'if (!resposta.ok) throw new Error(dados.erro);',
              label: 'Conferir o status',
              note: 'O `fetch` só falha sozinho quando a rede falha. Um 400 ou 500 chega como resposta normal, e é você quem transforma em erro.',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            "Alguém escreveu `body: { descricao: 'Mercado', valor: 230 }`, sem `JSON.stringify`. A API responde 400 dizendo “Informe a descrição”. O que aconteceu?",
          options: [
            {
              text: 'O objeto virou o texto `[object Object]`, que não é JSON, e a API não achou os campos',
              correct: true,
              feedback:
                'Isso. O corpo precisa ser texto. Um objeto comum vira `[object Object]` quando é convertido, e o servidor não consegue tirar descrição nem valor dali.',
            },
            {
              text: 'A API está com defeito, porque os dados estavam certos',
              feedback:
                'Os dados estavam certos no JavaScript, mas não chegaram certos. Abra o painel Network e veja o corpo enviado: lá estará `[object Object]`.',
            },
            {
              text: 'Faltou usar o método GET',
              feedback:
                'GET não tem corpo. Para criar uma despesa o método certo é POST; o problema é o formato do corpo.',
            },
          ],
        },
        {
          type: 'fill',
          prompt: 'Complete a função que atualiza parte de uma despesa com PATCH.',
          language: 'js',
          template: `async function atualizarDespesa(id, mudancas) {
  const resposta = await fetch(API_URL + '/despesas/' + id, {
    method: '[[PATCH]]',
    headers: { 'Content-Type': '[[application/json]]' },
    body: JSON.[[stringify]](mudancas),
  });
  const dados = await resposta.[[json]]();
  if (!resposta.[[ok]]) throw new Error(dados.erro);
  return dados;
}`,
          explanation:
            'O método é PATCH porque só parte da despesa muda. O cabeçalho avisa que o corpo é JSON, `JSON.stringify` transforma o objeto em texto, `resposta.json()` faz o caminho inverso e `resposta.ok` é verdadeiro só para status entre 200 e 299.',
        },
      ],
    },
    {
      id: 'cors',
      title: 'CORS: a portaria do navegador',
      blocks: [
        {
          type: 'analogy',
          title: 'A portaria do condomínio',
          text: 'Num condomínio, o porteiro não deixa qualquer entregador subir. Ele interfona para o apartamento e pergunta: “posso liberar?”. Quem decide é o morador, mas quem barra é o porteiro. No CORS, o morador é a API, o porteiro é o navegador e o entregador é o código de outro site.',
        },
        {
          type: 'text',
          text: 'Uma **origem** é a combinação de protocolo, domínio e porta. `http://localhost:5173` e `http://localhost:3000` são origens **diferentes**, porque a porta muda. Por segurança, o navegador não entrega a um site a resposta de outra origem, a menos que o servidor autorize. Essa regra de autorização se chama **CORS** (Cross-Origin Resource Sharing, compartilhamento entre origens).',
        },
        {
          type: 'flow',
          caption: 'Um POST com JSON de outra origem: o navegador pergunta antes',
          actors: ['App React', 'Navegador', 'API :3000'],
          steps: [
            {
              from: 0,
              to: 1,
              label: 'fetch POST /despesas',
              text: 'O app em `localhost:5173` pede para enviar JSON a `localhost:3000`. Origens diferentes: o navegador entra em ação.',
            },
            {
              from: 1,
              to: 2,
              label: 'OPTIONS (pré-voo)',
              text: 'Antes do POST, o navegador manda um pedido de consulta chamado **preflight** (pré-voo): “a origem 5173 pode mandar POST com JSON?”.',
            },
            {
              from: 2,
              to: 1,
              label: 'Allow-Origin: :5173',
              text: 'A API responde com o cabeçalho `Access-Control-Allow-Origin: http://localhost:5173`. O porteiro recebeu a autorização.',
              tone: 'ok',
            },
            {
              from: 1,
              to: 2,
              label: 'POST /despesas',
              text: 'Agora sim o navegador envia o pedido de verdade, com o corpo.',
            },
            {
              from: 2,
              to: 0,
              label: '201 liberado para o app',
              text: 'A resposta também traz a autorização, então o navegador entrega o resultado ao seu código.',
              tone: 'ok',
            },
          ],
        },
        {
          type: 'anatomy',
          caption: 'A mensagem que aparece no console quando a API não autoriza a origem',
          language: 'text',
          parts: [
            {
              text: "Access to fetch at 'http://localhost:3000/despesas'",
              label: 'O destino',
              note: 'Para onde o seu código tentou ir. Confira se o endereço e a porta são os da API.',
            },
            { text: ' ' },
            {
              text: "from origin 'http://localhost:5173'",
              label: 'A origem',
              note: 'De onde o pedido saiu: a página do Vite. É essa origem que a API precisa autorizar.',
            },
            { text: ' ' },
            {
              text: 'has been blocked by CORS policy:',
              label: 'Quem bloqueou',
              note: 'Foi o **navegador** que bloqueou, não a API. O pedido pode até ter chegado e ter sido processado no servidor.',
            },
            { text: ' ' },
            {
              text: "No 'Access-Control-Allow-Origin' header is present on the requested resource.",
              label: 'O motivo',
              note: 'A resposta veio sem o cabeçalho de autorização. A correção é no **servidor**, adicionando esse cabeçalho para a origem certa.',
            },
            { text: '\n' },
            {
              text: 'TypeError: Failed to fetch',
              label: 'O que o seu código vê',
              note: 'Por segurança, o JavaScript não recebe o motivo: só um erro genérico de rede. O motivo de verdade está na linha de cima, no console.',
            },
          ],
        },
        {
          type: 'code',
          language: 'js',
          caption: 'A correção, no server.js, com o pacote cors (npm install cors)',
          code: `import cors from 'cors';

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());`,
        },
        {
          type: 'quiz',
          question:
            'O `curl` cadastra despesas sem problema, mas o app React recebe o erro de CORS acima. Qual é a correção certa?',
          options: [
            {
              text: 'Autorizar a origem do front na API, com o cabeçalho `Access-Control-Allow-Origin`',
              correct: true,
              feedback:
                'Isso. Quem decide é o servidor. O `curl` não é navegador, então não aplica CORS, e por isso funcionava. Em produção, autorize só as origens do seu front, nunca qualquer uma.',
            },
            {
              text: "Usar `mode: 'no-cors'` no `fetch`",
              feedback:
                'Parece resolver porque o erro some, mas a resposta chega “opaca”: seu código não consegue ler status nem corpo. E o cabeçalho de JSON nem é enviado nesse modo.',
            },
            {
              text: 'Instalar uma extensão que desliga o CORS no navegador',
              feedback:
                'Funciona só na sua máquina. Quem usar o app continua bloqueado, e você passa a navegar sem uma proteção importante.',
            },
            {
              text: 'Nada, o CORS protege a API contra o `curl`',
              feedback:
                'O CORS não protege a API: o `curl` acabou de provar que qualquer cliente fora do navegador chama a API. Ele protege a pessoa usuária contra sites que tentam ler dados de outras origens em seu nome.',
            },
          ],
        },
      ],
    },
    {
      id: 'proxy-e-ambientes',
      title: 'Proxy no desenvolvimento e endereços por ambiente',
      blocks: [
        {
          type: 'text',
          text: 'Existe outro jeito de fugir do CORS durante o desenvolvimento: fazer o próprio Vite repassar os pedidos. Um **proxy** é um intermediário. O front chama `/api/despesas` na mesma origem (5173), e o Vite encaminha para `localhost:3000`. Para o navegador, tudo é uma origem só.',
        },
        {
          type: 'text',
          text:
            'Mas o endereço da API muda de lugar para lugar: `/api` no seu computador, `https://api.minhasdespesas.com.br` em produção. Na aula de npm e Vite você viu as variáveis de ambiente com prefixo `VITE_`. Elas resolvem isso: o código lê `' +
            ['import', 'meta'].join('.') +
            '.env.VITE_API_URL`, e cada arquivo `.env` dá o valor do seu ambiente.',
        },
        {
          type: 'codeTabs',
          caption: 'Proxy e variáveis de ambiente num projeto Vite',
          tabs: [
            {
              label: 'vite.config.ts',
              language: 'ts',
              code: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // /api/despesas no front vira http://localhost:3000/despesas
      '/api': {
        target: 'http://localhost:3000',
        rewrite: (caminho) => caminho.replace(/^\\/api/, ''),
      },
    },
  },
});`,
            },
            {
              label: '.env.development',
              language: 'bash',
              code: 'VITE_API_URL=/api',
            },
            {
              label: '.env.production',
              language: 'bash',
              code: 'VITE_API_URL=https://api.minhasdespesas.com.br',
            },
            {
              label: 'src/api.js',
              language: 'js',
              code: `export const API_URL = ${'import.meta'}.env.VITE_API_URL;

export async function listarDespesas() {
  const resposta = await fetch(API_URL + '/despesas');
  if (!resposta.ok) throw new Error('Erro ' + resposta.status);
  return resposta.json();
}`,
            },
          ],
        },
        {
          type: 'terminal',
          title: 'Confira o proxy funcionando',
          task: 'A API está rodando na porta 3000 em outro terminal. Na pasta do front, confira a configuração, suba o Vite e chame a API passando por ele.',
          prompt: '~/despesas-web$',
          steps: [
            {
              goal: 'Mostre o conteúdo do arquivo `.env.development`.',
              command: ['cat .env.development'],
              output: 'VITE_API_URL=/api',
              hint: 'Use `cat .env.development`.',
            },
            {
              goal: 'Suba o servidor de desenvolvimento do Vite.',
              command: ['npm run dev', 'npx vite'],
              output: `  VITE v6.3.5  ready in 412 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help`,
              hint: 'O script `dev` do `package.json` chama o Vite: `npm run dev`.',
            },
            {
              goal: 'Em outro terminal, peça a lista à porta **5173**, no caminho `/api/despesas`. Quem responde é a API, através do proxy.',
              command: [
                'curl http://localhost:5173/api/despesas',
                'curl localhost:5173/api/despesas',
              ],
              output:
                '[{"id":1,"descricao":"Mercado","valor":230},{"id":2,"descricao":"Ônibus","valor":4.4}]',
              hint: 'Escreva `curl http://localhost:5173/api/despesas`. Repare que a porta é a do Vite.',
            },
            {
              goal: 'Agora gere a versão de produção. Nela, o Vite usa o `.env.production`, e não existe proxy.',
              command: ['npm run build', 'npx vite build'],
              output: `vite v6.3.5 building for production...
✓ 34 modules transformed.
dist/index.html                   0.46 kB │ gzip:  0.30 kB
dist/assets/index-B7xQ2kfd.css    1.12 kB │ gzip:  0.58 kB
dist/assets/index-Dk3pL9aZ.js   146.80 kB │ gzip: 47.21 kB
✓ built in 1.21s`,
              hint: 'Use `npm run build`. O endereço de produção fica gravado dentro do arquivo `.js` gerado.',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Para chamar um serviço de pagamento, alguém criou `VITE_CHAVE_SECRETA=sk_live_...` no `.env.production` do front. Qual o problema?',
          options: [
            {
              text: 'Tudo com prefixo `VITE_` vai parar dentro do JavaScript público, e qualquer pessoa consegue ler a chave',
              correct: true,
              feedback:
                'Isso. O build copia o valor para o arquivo `.js` que o navegador baixa. Segredos ficam só no servidor: o front chama a sua API, e é a API que usa a chave.',
            },
            {
              text: 'Nenhum, porque o arquivo `.env` não vai para o Git',
              feedback:
                'Mesmo fora do Git, o valor entra no build e é entregue a todo navegador que abrir o site. Basta abrir o painel Sources para encontrar.',
            },
            {
              text: 'O nome deveria ser `VITE_API_URL`, senão o Vite não lê',
              feedback:
                'O Vite lê qualquer nome com o prefixo `VITE_`. O problema não é o nome, é colocar um segredo num lugar público.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Proxy não substitui CORS em produção',
          text: 'O proxy do Vite só existe enquanto `npm run dev` está rodando. Em produção, ou a API fica na mesma origem do front (por exemplo, atrás do mesmo domínio), ou ela precisa autorizar a origem do front com CORS.',
        },
      ],
    },
    {
      id: 'estados-e-falhas',
      title: 'Tudo o que pode dar errado no caminho',
      blocks: [
        {
          type: 'text',
          text: 'Numa rede de verdade, a resposta pode demorar, não chegar, chegar recusando os dados ou chegar num formato estranho. Uma boa integração trata cada caso com uma mensagem útil e **nunca apaga o que a pessoa digitou** quando o envio falha.',
        },
        {
          type: 'code',
          language: 'js',
          caption: 'Uma função de envio que separa cada tipo de falha',
          code: `export async function criarDespesa(dados) {
  let resposta;
  try {
    resposta = await fetch(API_URL + '/despesas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
      signal: AbortSignal.timeout(8000), // desiste depois de 8 segundos
    });
  } catch (erro) {
    if (erro.name === 'TimeoutError') throw new Error('A API demorou demais. Tente de novo.');
    throw new Error('Sem conexão com a API. Confira sua internet.');
  }

  const corpo = await resposta.json().catch(() => null); // corpo que não é JSON vira null
  if (!resposta.ok) {
    throw new Error(corpo?.erro ?? 'Não foi possível salvar (erro ' + resposta.status + ').');
  }
  if (typeof corpo?.id !== 'number') {
    throw new Error('A API respondeu num formato inesperado.');
  }
  return corpo;
}`,
        },
        {
          type: 'text',
          text: 'Repare na última conferência. Mesmo que front e API compartilhem um tipo TypeScript `Despesa`, o tipo só existe enquanto você programa. Na hora em que a resposta chega, ninguém garante que ela segue o tipo. Conferir o formato em tempo de execução é o que evita uma tela quebrada com `undefined`.',
        },
        {
          type: 'classify',
          prompt: 'Que tipo de falha é cada situação?',
          buckets: ['Rede ou tempo', 'Recusa da API', 'Resposta fora do contrato'],
          items: [
            { text: 'O Wi-Fi caiu no meio do envio e o `fetch` lançou um erro', bucket: 0 },
            { text: 'A API não respondeu em 8 segundos e o pedido foi cancelado', bucket: 0 },
            { text: 'Status 400 com `{ "erro": "O valor deve ser maior que zero" }`', bucket: 1 },
            { text: 'Status 401 porque a sessão expirou', bucket: 1 },
            { text: 'Status 200, mas o corpo é uma página HTML de manutenção', bucket: 2 },
            { text: 'Status 201, mas sem o campo `id` que o contrato promete', bucket: 2 },
          ],
          explanation:
            'Falhas de rede pedem “tente de novo”. Recusas da API trazem uma mensagem que deve aparecer para a pessoa, de preferência perto do campo. Respostas fora do contrato são bugs de integração: mostre uma mensagem genérica e registre o problema para o time.',
        },
        {
          type: 'quiz',
          question:
            'A pessoa preencheu um formulário longo e a API respondeu 400 por causa de um único campo. O que a tela deve fazer?',
          options: [
            {
              text: 'Manter tudo preenchido, mostrar a mensagem do servidor e liberar o botão para tentar de novo',
              correct: true,
              feedback:
                'Isso. Só limpe o formulário depois do sucesso. Perder dados digitados é um dos motivos mais comuns de desistência em cadastros.',
            },
            {
              text: 'Limpar o formulário para a pessoa começar do zero',
              feedback:
                'Isso obriga a pessoa a redigitar tudo por causa de um erro pequeno. Limpe só quando a API confirmar o cadastro.',
            },
            {
              text: 'Recarregar a página para buscar o estado mais novo',
              feedback:
                'Recarregar apaga o que foi digitado e não resolve o campo inválido. A resposta 400 já diz o que precisa mudar.',
            },
            {
              text: 'Mostrar só “Erro 400” para não confundir',
              feedback:
                '“400” não significa nada para a maioria das pessoas. A API mandou uma mensagem em português justamente para ser mostrada.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns',
          text: 'Esquecer o `JSON.stringify` ou o cabeçalho `Content-Type`. Achar que o `fetch` lança erro sozinho num 400 ou 500. Deixar o botão ativo e permitir dois cadastros iguais com cliques rápidos. Limpar o formulário antes da resposta chegar. Escrever `http://localhost:3000` direto no código e descobrir em produção que nada funciona. Tentar consertar CORS no front.',
        },
      ],
    },
    {
      id: 'atualizacao-otimista',
      title: 'Atualização otimista: mostrar antes de confirmar',
      blocks: [
        {
          type: 'analogy',
          title: 'O reloginho do WhatsApp',
          text: 'Quando você manda uma mensagem no grupo da família, ela aparece na conversa na hora, com um reloginho do lado. Só depois vira um tique, quando o servidor confirma. Se a internet falhar, aparece um aviso vermelho para reenviar. O app não espera o servidor para mostrar: ele é otimista.',
        },
        {
          type: 'text',
          text: 'Uma **atualização otimista** mostra o resultado na tela antes da API confirmar, marcado como pendente. Quando a resposta chega, você troca o item provisório pelo definitivo. Se a API recusar, você **desfaz**: tira o item e mostra o erro. A tela parece instantânea, sem mentir para a pessoa.',
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem os passos de um cadastro otimista.',
          items: [
            'Criar um item provisório com um id temporário e marcá-lo como pendente',
            'Colocar o item provisório na lista e desativar o botão',
            'Enviar o POST para a API',
            'Se der certo, trocar o provisório pela despesa com o id real e limpar o formulário',
            'Se falhar, tirar o provisório da lista e mostrar o erro mantendo o que foi digitado',
            'Reativar o botão em qualquer um dos casos',
          ],
          explanation:
            'O item entra na lista antes do envio, por isso parece instantâneo. A resposta decide o destino dele: vira definitivo ou é desfeito. Reativar o botão no fim, dando certo ou errado, é o papel do `finally`.',
        },
        {
          type: 'playground',
          title: 'Um cadastro que não perde nada',
          framework: 'react',
          height: 320,
          task: 'A tela usa uma API falsa que se comporta como a de verdade: demora um pouco e recusa valores menores ou iguais a zero. Mantenha os campos `#descricao`, `#valor` e o botão, e faça a tela: desativar o botão enquanto salva, mostrar a despesa na lista na hora (otimista), e, se a API recusar, tirar a despesa da lista, mostrar a mensagem num elemento com `role="alert"` e manter o que foi digitado. Teste com o valor `-5`.',
          html: '<div id="root"></div>',
          css: `body { font-family: system-ui, sans-serif; padding: 16px; color: #1e293b; }
form { display: grid; gap: 6px; max-width: 320px; }
input { padding: 8px; font-size: 1rem; }
button { background: #1d4ed8; color: white; padding: 8px 12px; border: 0; border-radius: 6px; font-size: 1rem; cursor: pointer; }
button:disabled { background: #94a3b8; cursor: wait; }
[role="alert"] { color: #b91c1c; margin: 4px 0; }
ul { padding-left: 18px; }
.pendente { color: #64748b; font-style: italic; }`,
          js: `const { useState, useEffect } = React;

// API falsa: atraso de rede e validação no servidor
const banco = [
  { id: 1, descricao: 'Mercado', valor: 230 },
  { id: 2, descricao: 'Ônibus', valor: 4.4 },
];
let proximoId = 3;
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

const api = {
  async listar() {
    await esperar(100);
    return banco.map((d) => ({ ...d }));
  },
  async criar(dados) {
    await esperar(250);
    if (!(dados.valor > 0)) {
      const erro = new Error('O valor deve ser maior que zero');
      erro.status = 400;
      throw erro;
    }
    const nova = { id: proximoId++, ...dados };
    banco.push(nova);
    return { ...nova };
  },
};

function App() {
  const [despesas, setDespesas] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');

  useEffect(() => {
    api.listar().then(setDespesas);
  }, []);

  async function salvar(evento) {
    evento.preventDefault();
    const nova = await api.criar({ descricao, valor: Number(valor) });
    setDespesas([...despesas, nova]);
    setDescricao('');
    setValor('');
  }

  return (
    <div>
      <form onSubmit={salvar}>
        <label htmlFor="descricao">Descrição</label>
        <input id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        <label htmlFor="valor">Valor</label>
        <input id="valor" type="number" value={valor} onChange={(e) => setValor(e.target.value)} />
        <button type="submit">Salvar</button>
      </form>
      <ul>
        {despesas.map((d) => (
          <li key={d.id}>{d.descricao}: R$ {d.valor}</li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
          checks: [
            {
              label: 'Enquanto salva, o botão fica desativado',
              test: `const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
const digitar = (campo, texto) => {
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set?.call(campo, texto);
  campo.dispatchEvent(new Event('input', { bubbles: true }));
};
await esperar(300);
const descricao = document.getElementById('descricao');
const valor = document.getElementById('valor');
const botao = document.querySelector('button');
if (!descricao || !valor || !botao) return false;
digitar(descricao, 'Farmácia');
digitar(valor, '37.9');
await esperar(30);
botao.click();
await esperar(40);
return botao.disabled === true;`,
            },
            {
              label: 'A despesa aparece na lista antes de a API responder',
              test: `const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
const digitar = (campo, texto) => {
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set?.call(campo, texto);
  campo.dispatchEvent(new Event('input', { bubbles: true }));
};
await esperar(1000);
const descricao = document.getElementById('descricao');
const valor = document.getElementById('valor');
const botao = document.querySelector('button');
if (!descricao || !valor || !botao) return false;
digitar(descricao, 'Padaria');
digitar(valor, '12');
await esperar(30);
botao.click();
await esperar(30);
return [...document.querySelectorAll('li')].some((li) => li.textContent.includes('Padaria'));`,
            },
            {
              label:
                'Com valor `-5`, a despesa sai da lista, um alerta mostra a mensagem da API e o texto digitado continua no campo',
              test: `const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
const digitar = (campo, texto) => {
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set?.call(campo, texto);
  campo.dispatchEvent(new Event('input', { bubbles: true }));
};
await esperar(1700);
const descricao = document.getElementById('descricao');
const valor = document.getElementById('valor');
const botao = document.querySelector('button');
if (!descricao || !valor || !botao) return false;
digitar(descricao, 'Pix errado');
digitar(valor, '-5');
await esperar(30);
botao.click();
await esperar(500);
const alerta = document.querySelector('[role="alert"]');
const naLista = [...document.querySelectorAll('li')].some((li) => li.textContent.includes('Pix errado'));
return !!alerta && alerta.textContent.includes('O valor deve ser maior que zero') && !naLista && document.getElementById('descricao')?.value === 'Pix errado';`,
            },
            {
              label:
                'Depois de confirmadas, cada despesa aparece uma vez só e o botão volta a funcionar',
              test: `await new Promise((r) => setTimeout(r, 2600));
const itens = [...document.querySelectorAll('li')].map((li) => li.textContent);
const contar = (texto) => itens.filter((t) => t.includes(texto)).length;
return contar('Farmácia') === 1 && contar('Padaria') === 1 && document.querySelector('button')?.disabled === false;`,
            },
          ],
          solution: {
            js: `const { useState, useEffect } = React;

const banco = [
  { id: 1, descricao: 'Mercado', valor: 230 },
  { id: 2, descricao: 'Ônibus', valor: 4.4 },
];
let proximoId = 3;
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

const api = {
  async listar() {
    await esperar(100);
    return banco.map((d) => ({ ...d }));
  },
  async criar(dados) {
    await esperar(250);
    if (!(dados.valor > 0)) {
      const erro = new Error('O valor deve ser maior que zero');
      erro.status = 400;
      throw erro;
    }
    const nova = { id: proximoId++, ...dados };
    banco.push(nova);
    return { ...nova };
  },
};

function App() {
  const [despesas, setDespesas] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    api.listar().then(setDespesas);
  }, []);

  async function salvar(evento) {
    evento.preventDefault();
    const dados = { descricao, valor: Number(valor) };
    const provisoria = { ...dados, id: 'temp-' + Date.now(), pendente: true };
    setDespesas((atuais) => [...atuais, provisoria]);
    setSalvando(true);
    setErro('');
    try {
      const nova = await api.criar(dados);
      setDespesas((atuais) => atuais.map((d) => (d.id === provisoria.id ? nova : d)));
      setDescricao('');
      setValor('');
    } catch (falha) {
      setDespesas((atuais) => atuais.filter((d) => d.id !== provisoria.id));
      setErro(falha.message || 'Não foi possível salvar. Tente de novo.');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div>
      <form onSubmit={salvar}>
        <label htmlFor="descricao">Descrição</label>
        <input id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        <label htmlFor="valor">Valor</label>
        <input id="valor" type="number" value={valor} onChange={(e) => setValor(e.target.value)} />
        <button type="submit" disabled={salvando}>
          {salvando ? 'Salvando…' : 'Salvar'}
        </button>
        {erro && <p role="alert">{erro}</p>}
      </form>
      <ul>
        {despesas.map((d) => (
          <li key={d.id} className={d.pendente ? 'pendente' : undefined}>
            {d.descricao}: R$ {d.valor}
            {d.pendente && ' (salvando…)'}
          </li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
          },
        },
        {
          type: 'reveal',
          question:
            'Atualização otimista funciona bem para uma despesa ou uma curtida. Em que tipo de tela ela seria uma má ideia?',
          answer:
            'Em ações caras ou difíceis de desfazer, como confirmar um Pix, finalizar uma compra ou agendar uma consulta. Ali, mostrar “pago” antes da confirmação pode fazer a pessoa fechar o app achando que deu certo. Nesses casos, mostre o carregando e espere a resposta. Use o otimismo quando a chance de falha é baixa e o erro é fácil de desfazer.',
        },
      ],
    },
  ],
  recap: [
    'Front e API são dois processos em portas diferentes que só conversam por HTTP; o front cuida da experiência e a API das regras e dos segredos.',
    'Para enviar dados, o `fetch` precisa de método, cabeçalho `Content-Type: application/json` e corpo com `JSON.stringify`, e você confere `resposta.ok`.',
    'CORS é aplicado pelo navegador e liberado pelo servidor; no desenvolvimento, o proxy do Vite coloca tudo na mesma origem, e `VITE_API_URL` muda o endereço por ambiente.',
    'Trate rede, tempo esgotado, recusa da API e resposta fora do contrato, sempre sem apagar o que a pessoa digitou.',
    'Na atualização otimista o item aparece na hora como pendente e é confirmado ou desfeito quando a resposta chega.',
  ],
  cards: [
    {
      id: 'dois-processos',
      front: 'Por que front e API rodam em portas diferentes no desenvolvimento?',
      back: 'São dois programas separados: o Vite serve o front (5173) e o Node serve a API (3000). Eles conversam por HTTP.',
    },
    {
      id: 'fetch-post-json',
      front: 'O que um `fetch` precisa para enviar JSON?',
      back: "`method: 'POST'`, o cabeçalho `Content-Type: application/json` e `body: JSON.stringify(dados)`.",
    },
    {
      id: 'origem',
      front: 'O que forma uma origem?',
      back: 'Protocolo, domínio e porta. `localhost:5173` e `localhost:3000` são origens diferentes.',
    },
    {
      id: 'quem-aplica-cors',
      front: 'Quem bloqueia e quem libera no CORS?',
      back: 'O navegador bloqueia; o servidor libera com o cabeçalho `Access-Control-Allow-Origin`. O `curl` não aplica CORS.',
    },
    {
      id: 'proxy-vite',
      front: 'O que o proxy do Vite resolve?',
      back: 'No desenvolvimento, repassa `/api` para a API, então o navegador vê uma origem só. Ele não existe em produção.',
    },
    {
      id: 'vite-env-api',
      front: 'Como mudar o endereço da API entre desenvolvimento e produção?',
      back:
        'Com `' +
        ['import', 'meta'].join('.') +
        '.env.VITE_API_URL` e um valor em cada arquivo `.env.development` e `.env.production`.',
    },
    {
      id: 'tipos-em-runtime',
      front: 'Um tipo TypeScript compartilhado garante o formato da resposta?',
      back: 'Não. O tipo some na execução. Confira o formato da resposta em tempo de execução antes de usar.',
    },
    {
      id: 'otimista',
      front: 'O que é atualização otimista?',
      back: 'Mostrar o resultado antes da confirmação, como pendente, e trocar pelo definitivo ou desfazer quando a API responder.',
    },
  ],
  mission: {
    title: 'Ligue o formulário de despesas à sua API',
    text: 'Conecte o front React à API Node da aula anterior e faça o cadastro aguentar as falhas do mundo real.',
    steps: [
      'Configure o proxy `/api` no Vite e a variável `VITE_API_URL` em `.env.development` e `.env.production`',
      'Faça o formulário enviar um POST com JSON e mostrar a despesa criada na lista',
      'Ligue o CORS na API só para a origem do front e confirme no painel Network que o pré-voo aparece sem o proxy',
      'Trate tempo esgotado com `AbortSignal.timeout`, resposta inválida e erro 400 sem perder os dados digitados',
      'Desligue a API no meio de um cadastro e confira que a tela mostra uma mensagem útil e permite tentar de novo',
    ],
  },
  sources: [
    {
      title: 'MDN: Usando a Fetch API',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch',
    },
    {
      title: 'MDN: Cross-Origin Resource Sharing (CORS)',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS',
    },
    {
      title: 'Vite: opções do servidor (proxy)',
      url: 'https://vite.dev/config/server-options.html#server-proxy',
    },
    {
      title: 'Vite: variáveis de ambiente e modos',
      url: 'https://vite.dev/guide/env-and-mode.html',
    },
  ],
};
