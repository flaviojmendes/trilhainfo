import { LessonContent } from '../types';

const html = `<main>
  <h1>Padaria Pão Quente</h1>
  <p>Entrega de pão fresquinho no seu bairro.</p>
  <label for="cep">CEP</label>
  <input id="cep" class="x91" inputmode="numeric" />
  <button id="calcular" class="btn-a7">Calcular frete</button>
  <p role="status" id="resultado"></p>
</main>`;

const css = `body { font-family: system-ui, sans-serif; padding: 16px; }
main { max-width: 360px; display: grid; gap: 8px; }
input, button { font: inherit; padding: 8px; }
[role="status"] { font-weight: bold; min-height: 1.4em; }`;

const site = `// ===== O site da padaria (não precisa mexer) =====
let modoQuebrado = false;
const campoCep = document.getElementById('cep');
const resultado = document.getElementById('resultado');

document.getElementById('calcular').addEventListener('click', () => {
  const cep = campoCep.value.replace(/[^0-9]/g, '');
  resultado.textContent = 'Calculando...';
  // O servidor demora um pouco para responder, como na vida real
  setTimeout(() => {
    if (modoQuebrado) resultado.textContent = 'Frete: R$ NaN';
    else if (cep.length !== 8) resultado.textContent = 'CEP inválido';
    else resultado.textContent = 'Frete: R$ 8,00';
  }, 700);
});

function reiniciarSite() {
  campoCep.value = '';
  resultado.textContent = '';
}

// ===== Mini Playwright (não precisa mexer) =====
function nomeAcessivel(el) {
  const rotulo = el.id && document.querySelector('label[for="' + el.id + '"]');
  return (el.getAttribute('aria-label') || (rotulo && rotulo.textContent) || el.textContent || '').trim();
}

const papeis = {
  button: 'button',
  heading: 'h1, h2, h3',
  textbox: 'input, textarea',
  status: '[role="status"]',
};

async function aguardar(condicao, descricao, limite = 2000) {
  const inicio = Date.now();
  let ultimo = { ok: false, detalhe: '' };
  while (Date.now() - inicio < limite) {
    ultimo = condicao();
    if (ultimo.ok) return ultimo.el;
    await new Promise((r) => setTimeout(r, 50));
  }
  throw new Error('Timeout de ' + limite + ' ms: ' + descricao + (ultimo.detalhe ? ' (' + ultimo.detalhe + ')' : ''));
}

function localizador(descricao, buscar) {
  const achar = () => {
    const el = buscar();
    return { ok: Boolean(el), el, detalhe: el ? '' : 'nenhum elemento encontrado' };
  };
  return {
    descricao,
    buscar,
    async fill(texto) {
      const el = await aguardar(achar, 'esperando ' + descricao);
      el.value = texto;
      el.dispatchEvent(new Event('input', { bubbles: true }));
    },
    async click() {
      const el = await aguardar(achar, 'esperando ' + descricao);
      el.click();
    },
  };
}

const page = {
  getByRole(papel, opcoes = {}) {
    const nome = opcoes.name ? ", { name: '" + opcoes.name + "' }" : '';
    return localizador("getByRole('" + papel + "'" + nome + ')', () =>
      [...document.querySelectorAll(papeis[papel] || '[role="' + papel + '"]')].find(
        (el) => !opcoes.name || nomeAcessivel(el) === opcoes.name,
      ),
    );
  },
  getByLabel(texto) {
    return localizador("getByLabel('" + texto + "')", () => {
      const rotulo = [...document.querySelectorAll('label')].find((l) => l.textContent.trim() === texto);
      return rotulo ? document.getElementById(rotulo.htmlFor) : null;
    });
  },
  getByText(texto) {
    return localizador("getByText('" + texto + "')", () =>
      [...document.querySelectorAll('body *')].find(
        (el) => el.children.length === 0 && el.textContent.trim() === texto,
      ),
    );
  },
  locator(seletor) {
    return localizador("locator('" + seletor + "')", () => document.querySelector(seletor));
  },
  waitForTimeout(ms) {
    return new Promise((r) => setTimeout(r, ms));
  },
};

function expect(loc) {
  return {
    async toBeVisible() {
      await aguardar(() => {
        const el = loc.buscar();
        const visivel = Boolean(el && el.getClientRects().length);
        return { ok: visivel, el, detalhe: el ? 'elemento escondido' : 'nenhum elemento encontrado' };
      }, 'esperava ' + loc.descricao + ' visível');
    },
    async toHaveText(esperado) {
      await aguardar(() => {
        const el = loc.buscar();
        const atual = el ? el.textContent.trim() : null;
        return { ok: atual === esperado, el, detalhe: el ? 'recebeu "' + atual + '"' : 'nenhum elemento encontrado' };
      }, 'esperava ' + loc.descricao + ' com o texto "' + esperado + '"');
    },
  };
}

const testes = [];
function test(nome, fn) {
  testes.push({ nome, fn });
}

`;

const rodape = `

// ===== Rodar os testes (não precisa mexer) =====
async function rodar() {
  for (const t of testes) {
    reiniciarSite();
    try {
      await t.fn({ page });
      console.log('✓ ' + t.nome);
    } catch (erro) {
      console.log('✗ ' + t.nome + ': ' + erro.message);
    }
  }
  console.log('Fim: ' + testes.length + ' testes');
}
rodar();`;

const testesIniciais = `// ===== Seus testes =====
test('calcula o frete para um CEP válido', async ({ page }) => {
  await page.locator('.x91').fill('01310-100');
  await page.locator('.btn-a7').click();
  await page.waitForTimeout(300);
  const texto = document.querySelector('#resultado').textContent;
  if (texto !== 'Frete: R$ 8,00') {
    throw new Error('esperava "Frete: R$ 8,00", recebeu "' + texto + '"');
  }
});

test('avisa quando o CEP é inválido', async ({ page }) => {
  // Escreva este teste: preencha o CEP com '123', clique em "Calcular frete"
  // e confira que o status mostra 'CEP inválido'
});`;

const testesResolvidos = `// ===== Seus testes =====
test('calcula o frete para um CEP válido', async ({ page }) => {
  await page.getByLabel('CEP').fill('01310-100');
  await page.getByRole('button', { name: 'Calcular frete' }).click();
  await expect(page.getByRole('status')).toHaveText('Frete: R$ 8,00');
});

test('avisa quando o CEP é inválido', async ({ page }) => {
  await page.getByLabel('CEP').fill('123');
  await page.getByRole('button', { name: 'Calcular frete' }).click();
  await expect(page.getByRole('status')).toHaveText('CEP inválido');
});`;

export const content: LessonContent = {
  hook: 'Imagine a Black Friday: o site da loja recebe milhares de compras por minuto e, depois de uma atualização na madrugada, o botão “Finalizar compra” parou de responder. Nenhum teste de função pegou, porque cada peça sozinha funcionava. Um teste de ponta a ponta abre o navegador e faz a compra inteira, como uma pessoa faria, minutos depois de cada mudança. Saber escrever esses testes sem deixá-los lentos e instáveis é o que separa uma automação que ajuda de uma que todo mundo ignora.',
  sections: [
    {
      id: 'o-que-e-e2e',
      title: 'Um robô que usa o site como você',
      blocks: [
        {
          type: 'analogy',
          title: 'A vistoria do carro',
          text: 'Na oficina, cada peça pode ser testada na bancada: o freio, o farol, a bateria. Mas antes de devolver o carro, alguém dá uma volta no quarteirão. Só assim se descobre que o freio funciona, mas o pedal ficou longe demais do pé. O **teste de ponta a ponta** é essa volta no quarteirão.',
        },
        {
          type: 'text',
          text: 'Um **teste de ponta a ponta** (em inglês, end-to-end ou **E2E**) abre um navegador de verdade, entra no site rodando com servidor e banco, e faz uma tarefa completa: entrar, buscar, comprar. Ele prova que as peças funcionam **juntas**.',
        },
        {
          type: 'text',
          text: 'O **Playwright** é uma ferramenta gratuita da Microsoft para escrever esses testes em TypeScript, JavaScript, Python, Java ou C#. Ele controla Chromium, Firefox e WebKit (o motor do Safari). Você já viu um gostinho dele na aula de testes de interface e usou o `request` dele nos testes de API.',
        },
        {
          type: 'flow',
          caption: 'O que acontece quando um teste de ponta a ponta calcula um frete.',
          actors: ['Teste', 'Navegador', 'Site', 'API'],
          steps: [
            {
              from: 0,
              to: 1,
              label: 'abrir /carrinho',
              text: 'O teste manda o navegador abrir a página, como se alguém digitasse o endereço.',
            },
            {
              from: 1,
              to: 2,
              label: 'carrega a página',
              text: 'O navegador baixa HTML, CSS e JavaScript do site, igual faria no seu celular.',
            },
            {
              from: 0,
              to: 1,
              label: 'preencher CEP e clicar',
              text: 'O teste encontra o campo pelo rótulo “CEP”, digita e clica no botão.',
            },
            {
              from: 2,
              to: 3,
              label: 'POST /frete',
              text: 'O código do site chama a API de verdade, que consulta o banco.',
            },
            {
              from: 3,
              to: 2,
              label: '200: R$ 8,00',
              text: 'A API responde, e o site mostra o valor na tela.',
              tone: 'ok',
            },
            {
              from: 1,
              to: 0,
              label: 'texto “Frete: R$ 8,00”',
              text: 'O teste confere o que aparece na tela. Se qualquer peça no caminho falhar, ele fica vermelho.',
              tone: 'ok',
            },
          ],
        },
        {
          type: 'text',
          text: 'Essa força tem um preço: cada teste leva segundos (não milissegundos) e depende de muita coisa funcionando. Por isso a regra das trilhas de Testes e Fullstack é a mesma: regras de negócio ficam em testes de unidade e de API; o navegador fica para as **jornadas críticas**, as tarefas que não podem quebrar.',
        },
        {
          type: 'quiz',
          question:
            'Sua equipe tem tempo para automatizar só um teste de ponta a ponta no app de delivery. Qual escolher?',
          options: [
            {
              text: 'A pessoa entra, escolhe um prato, paga e vê o pedido confirmado',
              correct: true,
              feedback:
                'Isso. É a jornada que gera receita e atravessa todas as peças: tela, login, carrinho, pagamento e banco. Se ela quebrar, o negócio para.',
            },
            {
              text: 'O cálculo da taxa de entrega para 30 CEPs diferentes',
              feedback:
                'São 30 variações de uma regra. No navegador seriam 30 testes lentos; num teste de unidade ou de API, a mesma conferência leva milissegundos.',
            },
            {
              text: 'A cor do botão “Pedir” em todas as telas',
              feedback:
                'Cor é detalhe visual que muda com frequência. Um teste E2E para isso quebraria a cada ajuste de design sem proteger nada importante.',
            },
            {
              text: 'Todas as telas do app, para garantir que nada passe',
              feedback:
                'Parece seguro, mas a suíte ficaria lenta e instável, e o time pararia de rodar. Poucos testes E2E bem escolhidos protegem mais que muitos frágeis.',
            },
          ],
        },
      ],
    },
    {
      id: 'anatomia-do-teste',
      title: 'Anatomia de um teste Playwright',
      blocks: [
        {
          type: 'text',
          text: 'Todo teste Playwright tem as mesmas peças: um nome que descreve a tarefa, a navegação até a página, ações sobre elementos e conferências no final. Explore cada parte abaixo.',
        },
        {
          type: 'anatomy',
          caption:
            'O arquivo `tests/frete.spec.ts`. O sufixo `.spec.ts` é o jeito de o Playwright achar os testes.',
          language: 'ts',
          parts: [
            {
              text: "import { test, expect } from '@playwright/test';",
              label: 'Importação',
              note: '`test` cria um caso de teste e `expect` faz as conferências. Os dois vêm do pacote do Playwright.',
            },
            { text: '\n\n' },
            {
              text: "test('calcula o frete para um CEP válido', async ({ page }) => {",
              label: 'test e page',
              note: 'O nome aparece no relatório, então descreva a tarefa da pessoa. `page` é uma aba nova e limpa do navegador que o Playwright entrega para cada teste. A função é `async` porque quase tudo no navegador leva algum tempo.',
            },
            { text: '\n  ' },
            {
              text: "await page.goto('/carrinho');",
              label: 'goto',
              note: 'Abre a página. O endereço base (como `http://localhost:5173`) fica no arquivo de configuração, então o teste funciona no seu computador e na CI.',
            },
            { text: '\n  ' },
            {
              text: "await page.getByLabel('CEP').fill('01310-100');",
              label: 'Localizar e preencher',
              note: '`getByLabel` acha o campo pelo rótulo que a pessoa lê. `fill` limpa o campo e digita o texto.',
            },
            { text: '\n  ' },
            {
              text: "await page.getByRole('button', { name: 'Calcular frete' }).click();",
              label: 'Localizar e clicar',
              note: '`getByRole` acha pelo papel do elemento (botão) e pelo nome visível. Antes de clicar, o Playwright espera o botão aparecer, estar habilitado e parado na tela.',
            },
            { text: '\n\n  ' },
            {
              text: "await expect(page.getByRole('status')).toHaveText('Frete: R$ 8,00');",
              label: 'Conferência com espera',
              note: 'Esse `expect` tenta de novo por alguns segundos (5 por padrão) até o texto aparecer. É assim que o teste espera a resposta da API sem precisar adivinhar quanto tempo ela leva.',
            },
            { text: '\n  ' },
            {
              text: "await expect(page.getByText('Entrega amanhã')).toBeVisible();",
              label: 'toBeVisible',
              note: 'Confere que o elemento está na tela e visível para a pessoa, não apenas escondido no HTML.',
            },
            { text: '\n});' },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'O `await` esquecido',
          text: 'Sem `await` na frente de `click()` ou de um `expect` com espera, o teste segue sem esperar e pode terminar verde antes de a conferência acontecer. Se um teste passa rápido demais e nunca falha, procure um `await` faltando.',
        },
        {
          type: 'fill',
          prompt:
            'Complete o teste de login: abrir a página, preencher o e-mail, clicar em Entrar e conferir a saudação.',
          language: 'ts',
          template: `import { test, expect } from '@playwright/test';

[[test]]('pessoa entra na conta', async ({ [[page]] }) => {
  await page.[[goto]]('/login');
  await page.getByLabel('E-mail').[[fill]]('ana@exemplo.com');
  await page.getByLabel('Senha').fill(process.env.SENHA_TESTE);
  await page.getByRole('button', { name: 'Entrar' }).[[click]]();
  await [[expect]](page.getByRole('heading', { name: 'Olá, Ana' })).toBeVisible();
});`,
          explanation:
            '`test` cria o caso e recebe a `page`; `goto` navega; `fill` digita; `click` clica; `expect` confere. Repare que a senha vem de uma variável de ambiente, nunca escrita no código.',
        },
      ],
    },
    {
      id: 'localizadores',
      title: 'Encontrar elementos como uma pessoa',
      blocks: [
        {
          type: 'text',
          text: 'Um **localizador** (em inglês, locator) é a descrição de como achar um elemento na página. Ele não guarda o elemento: procura de novo toda vez que é usado. Por isso continua funcionando quando a tela é redesenhada depois de uma resposta da API.',
        },
        {
          type: 'table',
          caption: 'A ordem de preferência recomendada pela documentação do Playwright',
          head: ['Localizador', 'Acha pelo', 'Exemplo'],
          rows: [
            [
              '`getByRole`',
              'Papel e nome acessível',
              "`getByRole('button', { name: 'Pagar com Pix' })`",
            ],
            ['`getByLabel`', 'Rótulo do campo', "`getByLabel('CEP')`"],
            [
              '`getByPlaceholder`',
              'Texto de exemplo dentro do campo',
              "`getByPlaceholder('00000-000')`",
            ],
            ['`getByText`', 'Texto visível', "`getByText('Pedido confirmado')`"],
            [
              '`getByTestId`',
              'Atributo `data-testid` combinado com o time',
              "`getByTestId('total-carrinho')`",
            ],
            ['`locator` com CSS', 'Classe, id, posição', "`locator('.btn-a7')` (último recurso)"],
          ],
        },
        {
          type: 'text',
          text: 'Os primeiros da lista enxergam a página como a pessoa usuária e as tecnologias assistivas. Se `getByRole` não acha o seu botão, talvez ele seja uma `div` com clique, e o teste acabou de revelar um problema de acessibilidade. O `data-testid` é um combinado com quem desenvolve: um nome que não muda com o design, útil quando não há texto ou papel estável.',
        },
        {
          type: 'order',
          prompt: 'Ordene os localizadores do mais recomendado ao último recurso.',
          items: [
            "`getByRole('button', { name: 'Finalizar compra' })`",
            "`getByLabel('Número do cartão')`",
            "`getByText('Frete grátis')`",
            "`getByTestId('resumo-pedido')`",
            "`locator('div.col-3 > span:nth-child(2)')`",
          ],
          explanation:
            'Quanto mais perto do que a pessoa vê, menos o teste quebra por mudanças que não importam. Seletores CSS com posição quebram quando alguém adiciona uma `div` no meio, mesmo com a tela idêntica.',
        },
        {
          type: 'quiz',
          question:
            "O teste falhou com: `strict mode violation: getByRole('button', { name: 'Adicionar' }) resolved to 3 elements`. O que isso quer dizer?",
          options: [
            {
              text: 'Há três botões “Adicionar” na página e o Playwright não adivinha qual você quer; é preciso deixar o localizador mais específico',
              correct: true,
              feedback:
                "Isso. O Playwright recusa ações ambíguas para não clicar no lugar errado. Uma saída comum é filtrar dentro do produto: `page.getByRole('listitem').filter({ hasText: 'Pão de queijo' }).getByRole('button', { name: 'Adicionar' })`.",
            },
            {
              text: 'O site está com defeito, porque botões não podem ter o mesmo nome',
              feedback:
                'Numa lista de produtos é normal cada item ter seu “Adicionar”. O problema é o teste não dizer qual. Ainda assim, nomes mais claros, como “Adicionar pão de queijo”, ajudam leitores de tela.',
            },
            {
              text: 'Basta usar `.first()` sempre que isso acontecer',
              feedback:
                '`.first()` faz o erro sumir, mas o teste passa a depender da ordem da lista. Se ela mudar, o teste clica no produto errado e pode até continuar verde.',
            },
          ],
        },
      ],
    },
    {
      id: 'auto-espera',
      title: 'Esperar o resultado, não o relógio',
      blocks: [
        {
          type: 'analogy',
          title: 'No ponto de ônibus',
          text: 'Você não decide “vou esperar exatamente 7 minutos e depois ir embora”. Se o ônibus atrasar 8, você perde; se vier em 1, você ficou parado à toa. Você olha a rua até ele aparecer, com um limite: se em 40 minutos nada, aí chama um carro. O Playwright espera assim.',
        },
        {
          type: 'text',
          text: 'Antes de cada ação, o Playwright faz a **espera automática** (auto-wait): confere se o elemento existe, está visível, habilitado e parado. E os `expect` que olham a página, como `toHaveText` e `toBeVisible`, tentam de novo até a condição ser verdadeira ou o tempo limite acabar.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns',
          text: 'Usar esperas fixas como `page.waitForTimeout(3000)`: no seu computador sobra tempo, na CI falta. Ler o texto uma vez, sem espera, logo depois do clique. Fazer um teste depender do que outro deixou pronto. E procurar elementos por classes CSS geradas, como `.x91`, que mudam a cada build.',
        },
        {
          type: 'playground',
          title: 'Conserte um teste E2E instável',
          task: 'A página da padaria é o site; o código abaixo traz um mini Playwright e dois testes. O primeiro usa classe CSS e uma espera fixa de 300 ms, mas o servidor leva 700 ms: ele falha. Reescreva-o com `getByLabel`, `getByRole` e `expect(...).toHaveText(...)`, e escreva o segundo teste. Não apague as linhas que começam com `// =====`. Leia o console: `✓` passou, `✗` falhou.',
          html,
          css,
          js: site + testesIniciais + rodape,
          height: 260,
          checks: [
            {
              label: 'Os dois testes passam (`✓`) e nenhum falha',
              test: `const inicio = Date.now();
while (Date.now() - inicio < 8000) {
  if ((window.__trilhaLogs || []).some((l) => l.startsWith('Fim:'))) break;
  await new Promise((r) => setTimeout(r, 100));
}
const linhas = (window.__trilhaLogs || []).filter((l) => l.startsWith('✓') || l.startsWith('✗'));
return linhas.length >= 2 && linhas.every((l) => l.startsWith('✓'));`,
            },
            {
              label: 'Os testes usam `getByRole`, sem classes CSS nem `querySelector`',
              test: `const fonte = [...document.scripts].map((s) => s.textContent).find((t) => t.includes('function rodar')) || '';
const trecho = (fonte.split('===== Seus testes')[1] || '').split('===== Rodar os testes')[0];
return trecho.includes('test(') && trecho.includes('getByRole(') && !trecho.includes('locator(') && !trecho.includes('querySelector');`,
            },
            {
              label: 'Nenhuma espera fixa (`waitForTimeout` ou `setTimeout`) nos testes',
              test: `const fonte = [...document.scripts].map((s) => s.textContent).find((t) => t.includes('function rodar')) || '';
const trecho = (fonte.split('===== Seus testes')[1] || '').split('===== Rodar os testes')[0];
return trecho.includes('test(') && !trecho.includes('waitForTimeout') && !trecho.includes('setTimeout');`,
            },
            {
              label: 'Os dois testes ficam vermelhos quando o site quebra (frete vira `R$ NaN`)',
              test: `const inicio = Date.now();
while (Date.now() - inicio < 8000) {
  if ((window.__trilhaLogs || []).some((l) => l.startsWith('Fim:'))) break;
  await new Promise((r) => setTimeout(r, 100));
}
if (typeof testes === 'undefined' || testes.length < 2) return false;
modoQuebrado = true;
let pegou = 0;
for (const t of testes.slice(0, 2)) {
  reiniciarSite();
  try {
    await t.fn({ page });
  } catch (erro) {
    pegou += 1;
  }
}
modoQuebrado = false;
return pegou === 2;`,
            },
          ],
          solution: { html, css, js: site + testesResolvidos + rodape },
        },
        {
          type: 'reveal',
          question:
            'O primeiro teste falhava com “Calculando...”. Se você trocasse a espera de 300 ms por 1000 ms, ele passaria. Por que isso ainda é uma má ideia?',
          answer:
            'Porque o tempo do servidor varia. Na CI, com a máquina ocupada, 700 ms viram 1200 e o teste falha de vez em quando. E quando o servidor responde em 100 ms, você desperdiça 900 ms em cada teste, vezes centenas de testes. Esperar a condição é ao mesmo tempo mais rápido e mais confiável.',
        },
      ],
    },
    {
      id: 'fixtures-e-isolamento',
      title: 'Fixtures: cada teste começa do zero',
      blocks: [
        {
          type: 'text',
          text: 'Aquele `{ page }` no começo do teste é uma **fixture**: algo que o Playwright prepara antes do teste e limpa depois. Cada teste ganha um **contexto** de navegador novo, como uma janela anônima: sem cookies, sem login, sem carrinho do teste anterior.',
        },
        {
          type: 'text',
          text: 'Isso garante **isolamento**: os testes podem rodar em qualquer ordem e em paralelo, em vários **workers** (processos que rodam testes ao mesmo tempo). Se você precisa de algo pronto antes, como uma pessoa logada, crie sua própria fixture em vez de depender de outro teste.',
        },
        {
          type: 'codeTabs',
          caption: 'Duas formas de preparar o terreno sem criar dependência entre testes',
          tabs: [
            {
              label: 'beforeEach',
              language: 'ts',
              code: `import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/cardapio');
});

test('mostra o pão de queijo', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Pão de queijo' })).toBeVisible();
});`,
            },
            {
              label: 'Fixture própria',
              language: 'ts',
              code: `import { test as base, expect } from '@playwright/test';

// Cria uma pessoa nova pela API e entrega a página já logada
const test = base.extend({
  paginaLogada: async ({ page, request }, use) => {
    const email = 'teste-' + Date.now() + '@exemplo.com';
    await request.post('/api/contas', { data: { email, senha: process.env.SENHA_TESTE } });
    await page.goto('/login');
    await page.getByLabel('E-mail').fill(email);
    await page.getByLabel('Senha').fill(process.env.SENHA_TESTE);
    await page.getByRole('button', { name: 'Entrar' }).click();
    await use(page);
    await request.delete('/api/contas/' + email);
  },
});

test('vê o histórico de pedidos', async ({ paginaLogada }) => {
  await paginaLogada.getByRole('link', { name: 'Meus pedidos' }).click();
  await expect(paginaLogada.getByText('Nenhum pedido ainda')).toBeVisible();
});`,
            },
          ],
        },
        {
          type: 'text',
          text: 'Tudo antes de `use(page)` é preparação; tudo depois é limpeza, que roda mesmo se o teste falhar. Criar dados pela API, como você viu na aula de testes de API, é bem mais rápido que clicar em telas de cadastro.',
        },
        {
          type: 'quiz',
          question:
            'O teste “cancela pedido” só passa se “faz pedido” rodar antes dele, porque usa o pedido criado ali. Rodando sozinho, falha. O que fazer?',
          options: [
            {
              text: 'Fazer “cancela pedido” criar o próprio pedido (pela API ou numa fixture) antes de cancelar',
              correct: true,
              feedback:
                'Isso. Cada teste prepara o que precisa. Assim ele roda sozinho, em qualquer ordem e em paralelo, e uma falha aponta para o lugar certo.',
            },
            {
              text: 'Juntar os dois num teste só e rodar sempre na mesma ordem',
              feedback:
                'Funciona hoje, mas a suíte fica serializada e lenta, e quando o pedido falhar você não saberá se o cancelamento também tem problema.',
            },
            {
              text: 'Configurar o Playwright para rodar com um único worker',
              feedback:
                'Isso esconde a dependência em vez de resolvê-la. Basta rodar um teste só, com `--grep`, para ela aparecer de novo.',
            },
          ],
        },
      ],
    },
    {
      id: 'gravar-rodar-investigar',
      title: 'Gravar, rodar e investigar falhas',
      blocks: [
        {
          type: 'text',
          text: 'Para começar rápido, o **codegen** abre um navegador e transforma seus cliques em código. É ótimo para descobrir localizadores; depois você revisa, troca valores fixos e acrescenta as conferências que ele não sabe escolher.',
        },
        {
          type: 'code',
          language: 'bash',
          caption: 'O codegen grava enquanto você usa o site e escreve o teste na janela ao lado.',
          code: 'npx playwright codegen http://localhost:5173',
          output: `test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByLabel('CEP').click();
  await page.getByLabel('CEP').fill('01310-100');
  await page.getByRole('button', { name: 'Calcular frete' }).click();
  await page.getByText('Frete: R$ 8,00').click();
});`,
        },
        {
          type: 'reveal',
          question: 'O que você mudaria nesse código gravado antes de commitar?',
          answer:
            "Dar um nome que descreva a tarefa no lugar de `test`. Trocar o endereço completo por `/`, usando o endereço base da configuração. Apagar o `click()` extra no campo. E, principalmente, trocar o último clique no texto do frete por uma conferência: `await expect(page.getByRole('status')).toHaveText('Frete: R$ 8,00')`. Sem `expect`, o teste não confere nada.",
        },
        {
          type: 'text',
          text: 'Quando um teste falha, o Playwright deixa evidências. O **relatório HTML** lista testes, tempos e erros. O **trace** (rastro) é uma gravação passo a passo: para cada ação, mostra a tela antes e depois, as requisições de rede e o console. Com ele você vê a falha da CI como se estivesse lá.',
        },
        {
          type: 'terminal',
          title: 'Rode a suíte e investigue a falha',
          task: 'Você está no projeto da loja. Rode os testes, leia com calma a mensagem de erro e use as ferramentas de investigação.',
          prompt: '~/loja$',
          steps: [
            {
              goal: 'Rode todos os testes de ponta a ponta: `npx playwright test`',
              command: ['npx playwright test'],
              output: `Running 6 tests using 3 workers

  ✓  1 [chromium] › tests/busca.spec.ts:3:5 › pessoa busca um produto (1.2s)
  ✓  2 [chromium] › tests/login.spec.ts:5:5 › pessoa entra na conta (1.8s)
  ✓  3 [chromium] › tests/carrinho.spec.ts:4:5 › adiciona pão de queijo (1.4s)
  ✘  4 [chromium] › tests/frete.spec.ts:3:5 › calcula o frete para um CEP válido (5.6s)
  ✓  5 [chromium] › tests/frete.spec.ts:10:5 › avisa quando o CEP é inválido (1.1s)
  ✓  6 [chromium] › tests/pedido.spec.ts:6:5 › finaliza pedido com Pix (2.3s)

  1) [chromium] › tests/frete.spec.ts:3:5 › calcula o frete para um CEP válido

    Error: expect(locator).toHaveText(expected) failed

    Locator:  getByRole('status')
    Expected: "Frete: R$ 8,00"
    Received: "CEP inválido"
    Timeout:  5000ms

      5 |   await page.getByLabel('CEP').fill('01310-100');
      6 |   await page.getByRole('button', { name: 'Calcular frete' }).click();
    > 7 |   await expect(page.getByRole('status')).toHaveText('Frete: R$ 8,00');
        |                                          ^

    attachment #1: trace (application/zip)
    test-results/frete-calcula-o-frete-chromium/trace.zip

  1 failed
    [chromium] › tests/frete.spec.ts:3:5 › calcula o frete para um CEP válido
  5 passed (9.4s)`,
              hint: 'Digite exatamente `npx playwright test`.',
            },
            {
              goal: 'Rode só o arquivo do frete para repetir a falha mais rápido: `npx playwright test frete`',
              command: [
                'npx playwright test frete',
                'npx playwright test tests/frete.spec.ts',
                'npx playwright test frete.spec.ts',
              ],
              output: `Running 2 tests using 2 workers

  ✘  1 [chromium] › tests/frete.spec.ts:3:5 › calcula o frete para um CEP válido (5.5s)
  ✓  2 [chromium] › tests/frete.spec.ts:10:5 › avisa quando o CEP é inválido (1.0s)

  1 failed
  1 passed (6.8s)`,
              hint: 'Depois de `npx playwright test`, escreva parte do nome do arquivo: `frete`.',
            },
            {
              goal: 'Abra o trace da falha: `npx playwright show-trace test-results/frete-calcula-o-frete-chromium/trace.zip`',
              command: [
                'npx playwright show-trace test-results/frete-calcula-o-frete-chromium/trace.zip',
              ],
              output: `Abrindo o Trace Viewer...

  fill getByLabel('CEP')                 valor digitado: "01310-100"
  click getByRole('button', { name: 'Calcular frete' })
  POST /api/frete  →  422  {"erro":"CEP deve ter só números"}
  expect toHaveText                      recebido: "CEP inválido"`,
              hint: 'O caminho do arquivo aparece na saída do primeiro comando, depois de `attachment #1`.',
            },
            {
              goal: 'Abra o relatório HTML para ver a suíte inteira: `npx playwright show-report`',
              command: ['npx playwright show-report'],
              output: `  Serving HTML report at http://localhost:9323. Press Ctrl+C to quit.`,
              hint: 'O comando é `npx playwright show-report`.',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Pelo trace, a API agora recusa CEP com hífen (`422`), e o site mostra “CEP inválido” para `01310-100`. Na semana passada esse mesmo teste passava. O que você faz?',
          options: [
            {
              text: 'Abro um relato de bug no produto: pessoas digitam CEP com hífen, e o site deveria aceitar ou limpar o hífen antes de enviar',
              correct: true,
              feedback:
                'Isso. O teste fez exatamente o que uma pessoa faria e pegou uma regressão real. O trace, com a requisição e a resposta `422`, é a evidência perfeita para o relato.',
            },
            {
              text: 'Mudo o teste para digitar `01310100`, sem hífen, e ele volta a passar',
              feedback:
                'O teste fica verde, mas a pessoa usuária continua travada. Mudar o teste para acompanhar o bug é apagar o alarme. Só ajuste o teste se a regra mudou de propósito e a tela orienta a pessoa.',
            },
            {
              text: 'Rodo de novo até passar, porque deve ser instabilidade',
              feedback:
                'Instabilidade é quando o resultado muda sem mudança no código. Aqui a falha se repetiu e o trace mostra uma resposta clara da API: é um comportamento novo, não azar.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Nem toda falha é bug do produto. Um teste **instável** (flaky) passa e falha sem nenhuma mudança no código. Um bom diagnóstico é rodar o mesmo teste várias vezes seguidas, com `npx playwright test frete --repeat-each=20`: se falhar 3 de 20, o problema é de estabilidade.',
        },
        {
          type: 'classify',
          prompt: 'Cada falha abaixo é causa típica de teste instável ou sinal de bug do produto?',
          buckets: ['Teste instável', 'Bug do produto'],
          items: [
            { text: 'O teste espera 2 segundos fixos e a API às vezes leva 3', bucket: 0 },
            {
              text: 'Dois testes em paralelo usam a mesma conta e um esvazia o carrinho do outro',
              bucket: 0,
            },
            { text: 'O teste depende da data de hoje e falha todo dia 31', bucket: 0 },
            {
              text: 'O teste clica no primeiro “Adicionar”, e a ordem da lista muda a cada carga',
              bucket: 0,
            },
            { text: 'Todo CEP com hífen é recusado desde o último deploy', bucket: 1 },
            {
              text: 'O botão “Pagar” fica desabilitado depois de aplicar um cupom, em toda execução',
              bucket: 1,
            },
          ],
          explanation:
            'Instabilidade costuma vir de tempo, dados compartilhados, ordem ou datas: o resultado muda sem o código mudar. Bug do produto se repete do mesmo jeito em toda execução. A pergunta “falha sempre ou só às vezes?” é o primeiro filtro.',
        },
      ],
    },
  ],
  recap: [
    'Um teste de ponta a ponta usa um navegador de verdade para provar que as peças funcionam juntas; guarde-o para as jornadas críticas.',
    'Um teste Playwright navega com `page.goto`, localiza com `getByRole` e `getByLabel`, age com `fill` e `click` e confere com `expect`.',
    'A espera automática e os `expect` que tentam de novo substituem esperas fixas, que deixam a suíte lenta e instável.',
    'Fixtures dão a cada teste um navegador limpo e dados próprios, então os testes rodam isolados, em qualquer ordem e em paralelo.',
    'Codegen ajuda a começar; relatório, trace e `--repeat-each` ajudam a separar bug do produto de teste instável.',
  ],
  cards: [
    {
      id: 'o-que-e-e2e',
      front: 'O que um teste de ponta a ponta prova que um teste de unidade não prova?',
      back: 'Que tela, servidor e banco funcionam juntos e a pessoa consegue concluir a tarefa num navegador de verdade.',
    },
    {
      id: 'prioridade-localizadores',
      front: 'Qual localizador o Playwright recomenda tentar primeiro?',
      back: '`getByRole`, que acha pelo papel e pelo nome acessível. Depois `getByLabel`, `getByText` e, por último, `getByTestId` e CSS.',
    },
    {
      id: 'auto-espera',
      front: 'O que é a espera automática do Playwright?',
      back: 'Antes de agir, ele espera o elemento existir, estar visível, habilitado e parado; os `expect` da página tentam de novo até um tempo limite.',
    },
    {
      id: 'espera-fixa',
      front: 'Por que evitar `page.waitForTimeout(3000)`?',
      back: 'Porque o tempo real varia: às vezes falta (teste instável) e às vezes sobra (suíte lenta). Espere a condição com `expect`.',
    },
    {
      id: 'fixture',
      front: 'O que é uma fixture no Playwright?',
      back: 'Algo preparado antes do teste e limpo depois, como a `page` em um contexto novo ou uma pessoa já logada.',
    },
    {
      id: 'trace',
      front: 'Para que serve o trace do Playwright?',
      back: 'Mostrar passo a passo a tela, a rede e o console de um teste, para investigar uma falha que aconteceu na CI.',
    },
    {
      id: 'strict-mode',
      front: 'O que significa `strict mode violation` num localizador?',
      back: 'Ele achou mais de um elemento; deixe-o mais específico, por exemplo filtrando dentro do item certo.',
    },
  ],
  mission: {
    title: 'Automatize o fluxo principal de um site',
    text: 'Escolha um projeto seu (ou um site de exemplo que você possa rodar localmente) e proteja a tarefa mais importante dele com Playwright, investigando uma falha pelo trace.',
    steps: [
      'Instale com `npm init playwright@latest` e configure o `baseURL` e o `webServer` do seu projeto',
      'Grave o fluxo principal com `npx playwright codegen` e reescreva o código com nome claro e conferências com `expect`',
      'Garanta que o teste usa `getByRole` ou `getByLabel` e nenhuma espera fixa',
      'Quebre o site de propósito, rode o teste e investigue a falha com `npx playwright show-trace`',
      'Rode o teste sozinho, junto com a suíte e com `--repeat-each=10` para confirmar que ele é estável',
    ],
  },
  sources: [
    { title: 'Playwright: escrevendo testes', url: 'https://playwright.dev/docs/writing-tests' },
    { title: 'Playwright: localizadores', url: 'https://playwright.dev/docs/locators' },
    { title: 'Playwright: boas práticas', url: 'https://playwright.dev/docs/best-practices' },
    { title: 'Playwright: Trace Viewer', url: 'https://playwright.dev/docs/trace-viewer' },
  ],
};
