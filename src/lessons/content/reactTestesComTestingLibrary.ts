import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Imagine trocar todo o estado de uma tela de `useState` para `useReducer`, rodar os testes e ver tudo verde, porque a tela continua fazendo a mesma coisa para quem usa. Isso só acontece quando o teste confere o que a pessoa vê, e não como o componente funciona por dentro. Em entrevistas e em times de React, saber escrever esse tipo de teste é o que diferencia quem entrega uma tela de quem entrega uma tela que continua funcionando no mês seguinte.',
  sections: [
    {
      id: 'comportamento-visivel',
      title: 'Teste o que a pessoa percebe',
      blocks: [
        {
          type: 'analogy',
          title: 'A vistoria do carro usado',
          text: 'Quem compra um carro usado não desmonta o motor para contar parafusos. Liga, acelera, freia, testa a seta e o farol. Se tudo responde como deveria, o carro serve. Um bom teste de componente faz a mesma coisa com a sua tela: clica, digita e confere o que aparece.',
        },
        {
          type: 'text',
          text: 'Na aula de testes de interface você viu `describe`, `it`, `expect` e a ideia de buscar elementos como a pessoa usuária. Agora o foco é React: como montar o ambiente, quais buscas usar primeiro, como simular a pessoa e como lidar com o que chega depois de uma requisição.',
        },
        {
          type: 'text',
          text: 'A regra de ouro tem nome: testar **comportamento**, não **implementação**. Implementação é o jeito interno: nomes de estados, quantos componentes existem, qual hook foi usado. Comportamento é o contrato com quem usa: “quando eu digito um e-mail inválido e clico em Inscrever, aparece um aviso”.',
        },
        {
          type: 'codeTabs',
          caption: 'Dois testes para a mesma tela de inscrição. Só um sobrevive a uma refatoração.',
          tabs: [
            {
              label: 'Preso à implementação',
              language: 'tsx',
              code: `it('muda o estado de erro', () => {
  const { container } = render(<Newsletter />);

  // depende da classe CSS e da estrutura de divs
  const botao = container.querySelector('.caixa > .botao-azul');
  fireEvent.click(botao!);

  // depende do texto exato de um <span> interno
  expect(container.querySelector('span.msg-erro')).not.toBeNull();
});`,
            },
            {
              label: 'Focado no comportamento',
              language: 'tsx',
              code: `it('avisa quando o e-mail é inválido', async () => {
  const pessoa = userEvent.setup();
  render(<Newsletter />);

  await pessoa.type(screen.getByLabelText('E-mail'), 'ana');
  await pessoa.click(screen.getByRole('button', { name: 'Inscrever' }));

  expect(screen.getByRole('alert')).toHaveTextContent('Digite um e-mail válido');
});`,
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'O time trocou a classe `.botao-azul` por `.botao-primario` e moveu o aviso de um `span` para um `p`. A tela ficou idêntica. O que acontece com os dois testes acima?',
          options: [
            {
              text: 'O primeiro quebra e o segundo continua passando',
              correct: true,
              feedback:
                'Isso. O primeiro depende de classe e de tag, que a pessoa nem vê. O segundo procura pelo rótulo, pelo papel de botão e pelo papel de alerta, que não mudaram.',
            },
            {
              text: 'Os dois quebram, porque o HTML mudou',
              feedback:
                'O HTML mudou, mas o que a pessoa percebe não mudou. O segundo teste só olha rótulo, papel e texto, e por isso continua verde.',
            },
            {
              text: 'Os dois continuam passando, porque o comportamento é o mesmo',
              feedback:
                'Seria o ideal, mas o primeiro procura `.botao-azul` e `span.msg-erro`. Como eles sumiram, ele quebra sem que exista bug nenhum. É o famoso falso alarme.',
            },
          ],
        },
      ],
    },
    {
      id: 'preparar-o-projeto',
      title: 'Vitest e Testing Library no projeto',
      blocks: [
        {
          type: 'text',
          text: 'Testes de componente rodam no terminal, não no navegador. Para o React conseguir desenhar a tela ali, o Vitest usa o **jsdom**: uma imitação do navegador feita em JavaScript, com `document`, elementos e eventos, mas sem pintar nada na tela.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Vitest',
              text: 'O executor de testes. Encontra arquivos `.test.tsx`, roda cada `it` e mostra o relatório. Usa a mesma configuração do Vite.',
            },
            {
              term: '@testing-library/react',
              text: 'Traz `render`, que desenha o componente no jsdom, e `screen`, que procura elementos na tela desenhada.',
            },
            {
              term: '@testing-library/user-event',
              text: 'Simula a pessoa: digitar, clicar, apertar `Tab`. Cada ação dispara a sequência completa de eventos que um navegador dispararia.',
            },
            {
              term: '@testing-library/jest-dom',
              text: 'Comparadores extras para o `expect`, como `toBeInTheDocument`, `toHaveTextContent` e `toBeDisabled`, com mensagens de erro legíveis.',
            },
          ],
        },
        {
          type: 'codeTabs',
          caption: 'A configuração mínima num projeto React criado com Vite',
          tabs: [
            {
              label: 'vite.config.ts',
              language: 'ts',
              code: `/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // a imitação de navegador
    globals: true, // describe, it e expect sem import
    setupFiles: './src/setupTests.ts',
  },
});`,
            },
            {
              label: 'src/setupTests.ts',
              language: 'ts',
              code: `// roda antes de cada arquivo de teste
import '@testing-library/jest-dom/vitest';`,
            },
            {
              label: 'package.json',
              language: 'json',
              code: `{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "test": "vitest"
  }
}`,
            },
          ],
        },
        {
          type: 'terminal',
          title: 'Instale e rode a primeira vez',
          task: 'Você está na pasta do catálogo React. Instale as ferramentas de teste e rode a suíte uma vez.',
          prompt: '~/catalogo$',
          steps: [
            {
              goal: 'Instale como dependências de desenvolvimento: `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/user-event` e `@testing-library/jest-dom`, nessa ordem.',
              command: [
                'npm install -D vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom',
                'npm i -D vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom',
                'npm install --save-dev vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom',
              ],
              output: `added 87 packages, and audited 312 packages in 9s

found 0 vulnerabilities`,
              hint: 'Use `npm install -D` seguido dos cinco pacotes separados por espaço.',
            },
            {
              goal: 'Rode todos os testes uma única vez, sem ficar vigiando arquivos.',
              command: ['npx vitest run', 'npm test -- --run', 'npm run test -- --run'],
              output: ` RUN  v3.2.4 /home/voce/catalogo

 ✓ src/utils/formatarPreco.test.ts (2 tests) 3ms
 ✓ src/components/Newsletter.test.tsx (3 tests) 212ms

 Test Files  2 passed (2)
      Tests  5 passed (5)
   Start at  14:02:31
   Duration  1.84s (transform 96ms, setup 180ms, collect 410ms, tests 215ms, environment 690ms)`,
              hint: 'O subcomando `run` faz o Vitest rodar uma vez e sair: `npx vitest run`.',
            },
            {
              goal: 'Agora ligue o modo que fica vigiando: ele roda de novo a cada vez que você salva um arquivo.',
              command: ['npx vitest', 'npm test', 'npm run test'],
              output: ` DEV  v3.2.4 /home/voce/catalogo

 ✓ src/utils/formatarPreco.test.ts (2 tests) 3ms
 ✓ src/components/Newsletter.test.tsx (3 tests) 208ms

 Test Files  2 passed (2)
      Tests  5 passed (5)

 PASS  Waiting for file changes...
       press h to show help, press q to quit`,
              hint: 'Sem o `run`, o Vitest entra em modo de observação: `npx vitest` (ou `npm test`, que chama o mesmo script).',
            },
          ],
        },
        {
          type: 'quiz',
          question: "Por que a configuração usa `environment: 'jsdom'`?",
          options: [
            {
              text: 'Porque componentes React precisam de `document` e elementos, e o terminal não tem navegador',
              correct: true,
              feedback:
                'Isso. O jsdom cria um `document` falso dentro do Node. O React desenha nele e a Testing Library procura nele, tudo em milissegundos.',
            },
            {
              text: 'Para abrir um Chrome escondido e rodar o teste nele',
              feedback:
                'Isso é o que o Playwright faz nos testes de ponta a ponta. O jsdom não abre navegador nenhum: é uma imitação em JavaScript, bem mais rápida e sem pintar pixels.',
            },
            {
              text: 'Para o teste conseguir acessar a API real do backend',
              feedback:
                'O ambiente não tem relação com a API. Em teste de componente, a API costuma ser trocada por um mock, justamente para não depender dela.',
            },
          ],
        },
      ],
    },
    {
      id: 'consultas-por-prioridade',
      title: 'Qual busca usar primeiro',
      blocks: [
        {
          type: 'text',
          text: 'A Testing Library oferece várias formas de achar um elemento, e a documentação sugere uma **ordem de preferência**. Quanto mais alto na lista, mais parecido com o jeito que uma pessoa, inclusive quem usa leitor de tela, encontra as coisas.',
        },
        {
          type: 'table',
          caption: 'A ordem recomendada pela Testing Library',
          head: ['Busca', 'Encontra por', 'Quando usar'],
          rows: [
            [
              '`getByRole`',
              'Papel e nome acessível',
              'Primeira escolha para quase tudo: botões, links, campos, títulos, alertas',
            ],
            [
              '`getByLabelText`',
              'Rótulo do campo',
              'Campos de formulário. Se falhar, o campo provavelmente não tem `label`',
            ],
            [
              '`getByPlaceholderText`',
              'Texto de exemplo do campo',
              'Só quando não há rótulo. Placeholder não substitui `label`',
            ],
            [
              '`getByText`',
              'Texto visível',
              'Textos que não são interativos: avisos, parágrafos, itens de lista',
            ],
            ['`getByAltText`', 'Texto alternativo', 'Imagens com `alt`'],
            [
              '`getByTestId`',
              'Atributo `data-testid`',
              'Último recurso, quando não existe nada visível para buscar',
            ],
          ],
        },
        {
          type: 'anatomy',
          caption: 'Uma busca por papel, a mais usada nos testes de React.',
          language: 'tsx',
          parts: [
            {
              text: 'screen',
              label: 'screen',
              note: 'Representa a tela inteira desenhada pelo `render`. Usar `screen` em vez de guardar o retorno do `render` deixa o teste mais legível.',
            },
            { text: '.' },
            {
              text: 'getByRole',
              label: 'Tipo de busca',
              note: '`get` falha na hora se não achar exatamente um elemento. `query` devolve `null`, `find` espera aparecer.',
            },
            { text: '(' },
            {
              text: "'button'",
              label: 'Papel',
              note: 'O papel que o leitor de tela anuncia. Um `<button>` tem papel `button`; um `<div onClick>` não tem papel nenhum, e por isso esta busca não encontra.',
            },
            { text: ', { ' },
            {
              text: "name: 'Adicionar ao carrinho'",
              label: 'Nome acessível',
              note: 'O nome que o leitor de tela fala: o texto do botão, o `label` do campo ou um `aria-label`. Aceita expressão regular, como `/adicionar/i`, para ignorar maiúsculas.',
            },
            { text: ' })' },
          ],
        },
        {
          type: 'classify',
          prompt: 'Classifique cada busca de um teste de React.',
          buckets: ['Prefira', 'Use com cuidado', 'Evite'],
          items: [
            { text: "`getByRole('button', { name: 'Salvar' })`", bucket: 0 },
            { text: "`getByLabelText('Senha')`", bucket: 0 },
            { text: "`getByText('Nenhum produto encontrado')`", bucket: 0 },
            { text: "`getByPlaceholderText('Buscar...')`", bucket: 1 },
            { text: "`getByTestId('grafico-vendas')`", bucket: 1 },
            { text: "`getByText('Salvar')` para achar um botão", bucket: 1 },
            { text: "`container.querySelector('.btn-primary')`", bucket: 2 },
            { text: 'Conferir quantas vezes `setErro` foi chamado', bucket: 2 },
          ],
          explanation:
            '`getByText` acharia o texto “Salvar” mesmo dentro de uma `div` sem papel de botão, então não prova que a pessoa consegue clicar. Placeholder e `data-testid` funcionam, mas não são o que a pessoa percebe. Classes e chamadas internas mudam em toda refatoração.',
        },
        {
          type: 'reveal',
          question:
            "Você escreveu `getByRole('button', { name: 'Inscrever' })` e o teste não encontra o botão, mas ele aparece na tela. Antes de trocar a busca por uma classe, o que vale investigar?",
          answer:
            'Se o elemento é um botão de verdade. Muitas vezes é uma `div` com `onClick`: aparece na tela, mas não recebe foco pelo teclado e o leitor de tela não anuncia como botão. O teste acabou de encontrar um problema de acessibilidade. Trocar a `div` por `<button>` conserta a tela e o teste ao mesmo tempo.',
        },
      ],
    },
    {
      id: 'agir-como-gente',
      title: 'Simular a pessoa e esperar a resposta',
      blocks: [
        {
          type: 'text',
          text: 'Quando uma pessoa digita, o navegador dispara vários eventos em sequência: foco, tecla pressionada, entrada de texto, tecla solta. O `userEvent` reproduz essa sequência inteira. O antigo `fireEvent` dispara um evento só, e por isso deixa passar bugs, como clicar num botão desativado.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Sempre com await',
          text: 'Toda ação do `userEvent` devolve uma Promise. Crie a pessoa com `const pessoa = userEvent.setup()` no começo do teste e escreva `await pessoa.click(...)`. Esquecer o `await` faz o `expect` rodar antes de a tela reagir.',
        },
        {
          type: 'text',
          text: 'Telas com dados chegam em dois tempos: primeiro o carregando, depois o resultado. Para o que aparece depois, use `findBy...`: ele tenta de novo por até um segundo até o elemento surgir. E, para não depender da API de verdade, troque o `fetch` por um **mock** que responde o que você mandar.',
        },
        {
          type: 'codeTabs',
          caption:
            'Testes de uma busca de CEP. O componente chama a API e mostra o endereço ou um aviso de erro.',
          tabs: [
            {
              label: 'Sucesso',
              language: 'tsx',
              code: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConsultaCep } from './ConsultaCep';

afterEach(() => vi.restoreAllMocks());

it('mostra o endereço depois de buscar', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(
    new Response(JSON.stringify({ logradouro: 'Avenida Paulista', localidade: 'São Paulo' })),
  );
  const pessoa = userEvent.setup();
  render(<ConsultaCep />);

  await pessoa.type(screen.getByLabelText('CEP'), '01310100');
  await pessoa.click(screen.getByRole('button', { name: 'Buscar' }));

  expect(await screen.findByText('Avenida Paulista, São Paulo')).toBeInTheDocument();
});`,
            },
            {
              label: 'Erro e recuperação',
              language: 'tsx',
              code: `it('deixa tentar de novo quando a rede falha', async () => {
  vi.spyOn(globalThis, 'fetch')
    .mockRejectedValueOnce(new TypeError('Failed to fetch'))
    .mockResolvedValueOnce(
      new Response(JSON.stringify({ logradouro: 'Rua da Aurora', localidade: 'Recife' })),
    );
  const pessoa = userEvent.setup();
  render(<ConsultaCep />);

  await pessoa.type(screen.getByLabelText('CEP'), '50050000');
  await pessoa.click(screen.getByRole('button', { name: 'Buscar' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('Não foi possível buscar o CEP');

  await pessoa.click(screen.getByRole('button', { name: 'Tentar de novo' }));
  expect(await screen.findByText('Rua da Aurora, Recife')).toBeInTheDocument();
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});`,
            },
            {
              label: 'Carregando',
              language: 'tsx',
              code: `it('mostra carregando e desativa o botão enquanto espera', async () => {
  // uma Promise que nunca termina: a tela fica parada no carregando
  vi.spyOn(globalThis, 'fetch').mockReturnValue(new Promise(() => {}));
  const pessoa = userEvent.setup();
  render(<ConsultaCep />);

  await pessoa.type(screen.getByLabelText('CEP'), '01310100');
  await pessoa.click(screen.getByRole('button', { name: 'Buscar' }));

  expect(screen.getByText('Carregando…')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Buscar' })).toBeDisabled();
});`,
            },
          ],
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem os passos do teste de erro e recuperação.',
          items: [
            'Configurar o mock: a primeira chamada falha, a segunda devolve um endereço',
            'Desenhar o componente com `render`',
            'Digitar o CEP e clicar em Buscar',
            'Esperar o alerta de erro aparecer com `findByRole`',
            'Clicar em Tentar de novo',
            'Esperar o endereço e conferir que o alerta sumiu',
          ],
          explanation:
            'O mock vem antes do `render`, porque o componente pode chamar a API logo ao aparecer. Depois o teste segue a história da pessoa: tenta, vê o erro, tenta de novo e consegue. `mockRejectedValueOnce` e `mockResolvedValueOnce` definem a resposta de cada chamada, em ordem.',
        },
        {
          type: 'fill',
          prompt:
            'Complete o teste que confere o aviso de e-mail inválido. Ele digita, clica e verifica.',
          language: 'tsx',
          template: `it('mostra erro com e-mail inválido', async () => {
  const pessoa = [[userEvent]].setup();
  render(<Newsletter />);

  await pessoa.[[type]](screen.[[getByLabelText]]('E-mail'), 'ana');
  [[await]] pessoa.click(screen.getByRole('[[button]]', { name: 'Inscrever' }));

  expect(screen.getByRole('alert')).toHaveTextContent('Digite um e-mail válido');
});`,
          explanation:
            '`userEvent.setup()` cria a pessoa simulada, `type` digita num campo encontrado pelo rótulo e `click` aperta o botão encontrado pelo papel. O `await` em cada ação garante que a tela já reagiu quando o `expect` roda.',
        },
        {
          type: 'quiz',
          question:
            "Depois de clicar em Buscar, o teste faz `expect(screen.getByText('Avenida Paulista, São Paulo'))` e falha com “Unable to find an element”. No navegador, o endereço aparece. Qual a correção?",
          options: [
            {
              text: 'Trocar por `await screen.findByText(...)`, que espera o texto aparecer',
              correct: true,
              feedback:
                'Isso. O endereço só aparece depois que a Promise do `fetch` termina. `getBy` procura uma vez, na hora; `findBy` tenta de novo até o elemento surgir ou o tempo acabar.',
            },
            {
              text: 'Colocar um `setTimeout` de 2 segundos antes do `expect`',
              feedback:
                'Espera fixa deixa o teste lento e instável: num computador mais lento, 2 segundos podem não bastar. Espere pela condição, não por um tempo chutado.',
            },
            {
              text: 'Trocar por `queryByText`, que não lança erro',
              feedback:
                '`queryBy` também procura uma vez só. Ele devolveria `null` e o teste falharia do mesmo jeito. Ele serve para conferir que algo **não** está na tela.',
            },
            {
              text: 'O componente está quebrado, porque o teste é mais confiável que o navegador',
              feedback:
                'O componente funciona: o teste é que confere cedo demais. Antes de culpar o código, veja se o teste está esperando pelo momento certo.',
            },
          ],
        },
      ],
    },
    {
      id: 'ler-falhas',
      title: 'Quando o teste fica vermelho',
      blocks: [
        {
          type: 'text',
          text: 'Um teste falhando é uma mensagem, não um castigo. A Testing Library escreve mensagens longas de propósito: quando não acha um elemento, ela lista os papéis que existem na tela e imprime o HTML desenhado. Quase sempre a resposta está ali.',
        },
        {
          type: 'terminal',
          title: 'Leia a falha e corrija',
          task: 'Alguém trocou o botão de inscrição por uma `div` estilizada. Rode o teste do componente, leia a mensagem e confirme a correção.',
          prompt: '~/catalogo$',
          steps: [
            {
              goal: 'Rode só os testes do arquivo da Newsletter, uma vez. O Vitest aceita um pedaço do nome do arquivo depois de `run`.',
              command: [
                'npx vitest run Newsletter',
                'npx vitest run src/components/Newsletter.test.tsx',
              ],
              output: ` RUN  v3.2.4 /home/voce/catalogo

 ❯ src/components/Newsletter.test.tsx (3 tests | 2 failed) 245ms
   ✓ Newsletter > mostra o campo de e-mail com rótulo
   × Newsletter > mostra erro com e-mail inválido
   × Newsletter > confirma a inscrição com e-mail válido

 FAIL  src/components/Newsletter.test.tsx > Newsletter > mostra erro com e-mail inválido
TestingLibraryElementError: Unable to find an accessible element with the role "button" and name "Inscrever"

Here are the accessible roles:

  textbox:

  Name "E-mail":
  <input id="email" />

  --------------------------------------------------

<body>
  <div>
    <div class="caixa">
      <label for="email">E-mail</label>
      <input id="email" />
      <div class="botao">Inscrever</div>
    </div>
  </div>
</body>

 ❯ src/components/Newsletter.test.tsx:14:31

 Test Files  1 failed (1)
      Tests  2 failed | 1 passed (3)`,
              hint: 'Escreva `npx vitest run Newsletter`.',
            },
            {
              goal: 'A lista de papéis mostra só um `textbox`: não há nenhum `button`. Você trocou a `div` por `<button type="button">` e salvou. Rode o mesmo arquivo de novo.',
              command: [
                'npx vitest run Newsletter',
                'npx vitest run src/components/Newsletter.test.tsx',
              ],
              output: ` RUN  v3.2.4 /home/voce/catalogo

 ✓ src/components/Newsletter.test.tsx (3 tests) 231ms
   ✓ Newsletter > mostra o campo de e-mail com rótulo
   ✓ Newsletter > mostra erro com e-mail inválido
   ✓ Newsletter > confirma a inscrição com e-mail válido

 Test Files  1 passed (1)
      Tests  3 passed (3)`,
              hint: 'O comando é o mesmo de antes: `npx vitest run Newsletter`.',
            },
            {
              goal: 'Antes de abrir o pull request, rode a suíte inteira uma vez para ver se nada mais quebrou.',
              command: ['npx vitest run', 'npm test -- --run', 'npm run test -- --run'],
              output: ` RUN  v3.2.4 /home/voce/catalogo

 ✓ src/utils/formatarPreco.test.ts (2 tests) 3ms
 ✓ src/components/Newsletter.test.tsx (3 tests) 226ms
 ✓ src/components/ConsultaCep.test.tsx (3 tests) 301ms

 Test Files  3 passed (3)
      Tests  8 passed (8)`,
              hint: 'Sem filtro de arquivo: `npx vitest run`.',
            },
          ],
        },
        {
          type: 'quiz',
          question: 'Na falha acima, que parte da mensagem mais ajudou a descobrir o problema?',
          options: [
            {
              text: 'A lista de papéis acessíveis, que não tinha nenhum `button`',
              correct: true,
              feedback:
                'Isso. A lista mostra a tela do jeito que o leitor de tela enxerga. Se o botão não está nela, ele não é um botão para a tecnologia assistiva, e o teste está certo em reclamar.',
            },
            {
              text: 'O tempo de execução, `245ms`',
              feedback:
                'O tempo indica se a suíte está lenta, mas não diz nada sobre por que o elemento não foi encontrado.',
            },
            {
              text: 'O número da linha, que mostra o bug no componente',
              feedback:
                'O número da linha aponta para o **teste** (`Newsletter.test.tsx:14`), não para o componente. Ele diz onde a busca falhou; a lista de papéis diz por quê.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns',
          text: 'Esquecer o `await` antes de `pessoa.click`. Usar `getBy` para conferir que algo sumiu (use `queryBy` com `not.toBeInTheDocument()`). Deixar um mock de `fetch` vazar para o próximo teste (restaure com `vi.restoreAllMocks()`). Fazer snapshot da tela inteira e aprovar qualquer diferença sem ler. Trocar a busca por `data-testid` só porque `getByRole` não achou, sem perguntar por quê.',
        },
      ],
    },
    {
      id: 'teste-sua-tela',
      title: 'Faça a tela passar no teste',
      blocks: [
        {
          type: 'text',
          text: 'Agora inverta o papel. Os objetivos abaixo funcionam como testes de verdade: eles procuram o campo pelo rótulo, o botão pelo papel, clicam e conferem o que aparece. A tela começa funcionando para quem enxerga e usa mouse, mas falha em todos.',
        },
        {
          type: 'playground',
          title: 'Uma inscrição testável',
          task: 'Ajuste o componente sem mudar o que ele faz: ligue o campo a um `label` com o texto **E-mail**, troque a `div` por um `<button>`, mostre o erro num elemento com `role="alert"` e a confirmação num elemento com `role="status"`.',
          framework: 'react',
          height: 220,
          html: '<div id="root"></div>',
          css: `body { font-family: system-ui, sans-serif; padding: 16px; }
.caixa { display: grid; gap: 8px; max-width: 320px; }
input { padding: 8px; font-size: 1rem; }
.botao, button { background: #1d4ed8; color: white; padding: 8px 12px; border: 0; border-radius: 6px; cursor: pointer; font-size: 1rem; }
[role="alert"] { color: #b91c1c; }
[role="status"] { color: #15803d; }`,
          js: `const { useState } = React;

function Newsletter() {
  const [email, setEmail] = useState('');
  const [erro, setErro] = useState('');
  const [confirmado, setConfirmado] = useState(false);

  function inscrever() {
    if (!email.includes('@')) {
      setErro('Digite um e-mail válido');
      setConfirmado(false);
      return;
    }
    setErro('');
    setConfirmado(true);
  }

  return (
    <div className="caixa">
      <p>Receba as vagas da semana</p>
      <input
        placeholder="seu@email.com"
        value={email}
        onChange={(evento) => setEmail(evento.target.value)}
      />
      <div className="botao" onClick={inscrever}>Inscrever</div>
      {erro && <p>{erro}</p>}
      {confirmado && <p>Inscrição confirmada</p>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Newsletter />);`,
          checks: [
            {
              label: 'O campo é encontrado pelo rótulo **E-mail**',
              test: `await new Promise((r) => setTimeout(r, 300));
const rotulo = [...document.querySelectorAll('label')].find((l) => l.textContent.trim().startsWith('E-mail'));
return rotulo?.control?.tagName === 'INPUT';`,
            },
            {
              label: 'Existe um botão de verdade chamado **Inscrever**',
              test: `await new Promise((r) => setTimeout(r, 300));
return [...document.querySelectorAll('button')].some((b) => b.textContent.trim() === 'Inscrever');`,
            },
            {
              label: 'Clicar com o campo vazio mostra um alerta com o erro',
              test: `await new Promise((r) => setTimeout(r, 300));
const botao = [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Inscrever');
if (!botao) return false;
botao.click();
await new Promise((r) => setTimeout(r, 80));
const alerta = document.querySelector('[role="alert"]');
return !!alerta && alerta.textContent.includes('Digite um e-mail válido');`,
            },
            {
              label: 'Digitar `ana@exemplo.com` e clicar mostra o status de confirmação',
              test: `await new Promise((r) => setTimeout(r, 700));
const rotulo = [...document.querySelectorAll('label')].find((l) => l.textContent.trim().startsWith('E-mail'));
const campo = rotulo?.control;
const botao = [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Inscrever');
if (!campo || !botao) return false;
const definir = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
definir?.call(campo, 'ana@exemplo.com');
campo.dispatchEvent(new Event('input', { bubbles: true }));
await new Promise((r) => setTimeout(r, 80));
botao.click();
await new Promise((r) => setTimeout(r, 80));
const status = document.querySelector('[role="status"]');
return !!status && status.textContent.includes('Inscrição confirmada') && !document.querySelector('[role="alert"]');`,
            },
          ],
          solution: {
            js: `const { useState } = React;

function Newsletter() {
  const [email, setEmail] = useState('');
  const [erro, setErro] = useState('');
  const [confirmado, setConfirmado] = useState(false);

  function inscrever() {
    if (!email.includes('@')) {
      setErro('Digite um e-mail válido');
      setConfirmado(false);
      return;
    }
    setErro('');
    setConfirmado(true);
  }

  return (
    <div className="caixa">
      <p>Receba as vagas da semana</p>
      <label htmlFor="email">E-mail</label>
      <input
        id="email"
        type="email"
        placeholder="seu@email.com"
        value={email}
        onChange={(evento) => setEmail(evento.target.value)}
      />
      <button type="button" onClick={inscrever}>Inscrever</button>
      {erro && <p role="alert">{erro}</p>}
      {confirmado && <p role="status">Inscrição confirmada</p>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Newsletter />);`,
          },
        },
        {
          type: 'reveal',
          question:
            'Repare: você não mudou nenhuma regra da tela, só a marcação. Por que isso bastou para os testes passarem?',
          answer:
            'Porque os testes procuram o que a tecnologia assistiva enxerga: rótulos, papéis e avisos. Uma tela fácil de testar com a Testing Library costuma ser uma tela acessível, e o contrário também vale. Quando um teste não consegue achar algo, pergunte primeiro se uma pessoa com leitor de tela conseguiria.',
        },
        {
          type: 'text',
          text: 'Os testes de componente cobrem uma tela por vez. O caminho completo, como entrar, buscar e finalizar uma compra com a API rodando, fica para um teste de ponta a ponta com Playwright, como você viu na aula de testes de interface. Poucos testes desses, nos fluxos que não podem quebrar, já trazem muita segurança.',
        },
        {
          type: 'quiz',
          question:
            'Qual destes comportamentos vale mais a pena cobrir com um teste de componente do formulário de cadastro?',
          options: [
            {
              text: 'Enviar com um campo obrigatório vazio mostra o erro e não chama a API',
              correct: true,
              feedback:
                'Isso. É um comportamento que a pessoa percebe, quebra com facilidade e é barato de testar com `render`, `userEvent` e um mock do `fetch`.',
            },
            {
              text: 'O estado `erros` começa como um objeto vazio',
              feedback:
                'Esse é um detalhe interno. Se alguém trocar o objeto por um reducer, o teste quebra sem que a tela mude. Teste o efeito visível: nenhum erro aparece antes do envio.',
            },
            {
              text: 'O botão tem a cor azul definida no CSS',
              feedback:
                'Cor é responsabilidade do design e de revisões visuais. Um teste de comportamento quer saber se o botão existe, tem nome e responde ao clique.',
            },
          ],
        },
      ],
    },
  ],
  recap: [
    'Teste **comportamento**: o que a pessoa vê e faz, não nomes de estados, classes ou hooks.',
    'No Vite, Vitest com jsdom desenha os componentes no terminal; jest-dom traz comparadores como `toBeInTheDocument`.',
    'Prefira `getByRole` e `getByLabelText`; `data-testid` é o último recurso, e classes CSS ficam de fora.',
    'Use `userEvent` com `await` para agir, `findBy` para o que chega depois e mocks de `fetch` para simular sucesso, carregamento e falha.',
    'Quando uma busca por papel falha, a mensagem lista os papéis da tela: muitas vezes o teste encontrou um problema de acessibilidade.',
  ],
  cards: [
    {
      id: 'comportamento-implementacao',
      front: 'Qual a diferença entre testar comportamento e testar implementação?',
      back: 'Comportamento é o que a pessoa percebe, como um aviso após clicar. Implementação é o jeito interno, como nomes de estados e classes. Só o primeiro sobrevive a refatorações.',
    },
    {
      id: 'jsdom',
      front: 'Para que serve o jsdom num teste de componente?',
      back: 'É uma imitação do navegador em JavaScript: dá ao React um `document` para desenhar no terminal, sem abrir navegador.',
    },
    {
      id: 'prioridade-consultas',
      front: 'Quais são as primeiras buscas a tentar na Testing Library?',
      back: '`getByRole` (papel e nome) e `getByLabelText` (rótulo do campo). `getByTestId` fica por último.',
    },
    {
      id: 'user-event',
      front: 'Por que preferir `userEvent` a `fireEvent`?',
      back: 'Porque reproduz a sequência completa de eventos de uma pessoa real, como foco e teclas, e respeita botões desativados.',
    },
    {
      id: 'find-by',
      front: 'Quando usar `findBy` em vez de `getBy`?',
      back: 'Para elementos que aparecem depois, como o resultado de uma requisição. `findBy` espera; `getBy` procura uma vez.',
    },
    {
      id: 'mock-fetch-ordem',
      front: 'Como simular uma API que falha na primeira chamada e funciona na segunda?',
      back: "Com `vi.spyOn(globalThis, 'fetch')` seguido de `.mockRejectedValueOnce(...)` e `.mockResolvedValueOnce(...)`.",
    },
    {
      id: 'role-nao-encontrado',
      front: "O `getByRole('button')` não acha um botão que aparece na tela. O que costuma ser?",
      back: 'O elemento não é um `<button>`, e sim uma `div` com `onClick`. Troque pela tag certa: corrige a acessibilidade e o teste.',
    },
  ],
  mission: {
    title: 'Proteja as três situações que mais quebram',
    text: 'No catálogo ou painel React que você está construindo, escreva testes de comportamento para os momentos que a pessoa usuária mais sente quando algo dá errado.',
    steps: [
      'Configure Vitest com jsdom e jest-dom e crie o script `test` no `package.json`',
      'Teste que um envio inválido do formulário mostra o erro e não chama a API',
      'Teste o carregamento com um mock de `fetch` que nunca termina e confira o texto de carregando',
      'Teste a recuperação: a primeira chamada falha, a pessoa clica em tentar de novo e os dados aparecem',
      'Quebre o componente de propósito, veja cada teste falhar e leia a mensagem antes de consertar',
      'Escreva um teste de ponta a ponta com Playwright para o fluxo principal da aplicação',
    ],
  },
  sources: [
    {
      title: 'Testing Library: prioridade das consultas',
      url: 'https://testing-library.com/docs/queries/about/#priority',
    },
    {
      title: 'Testing Library: user-event',
      url: 'https://testing-library.com/docs/user-event/intro',
    },
    { title: 'Vitest: ambiente de testes', url: 'https://vitest.dev/guide/environment' },
    {
      title: 'Kent C. Dodds: erros comuns com a React Testing Library',
      url: 'https://kentcdodds.com/blog/common-mistakes-with-react-testing-library',
    },
  ],
};
