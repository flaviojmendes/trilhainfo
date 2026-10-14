import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Você corrige o filtro de busca, testa clicando, publica. Dois dias depois alguém avisa que o carrinho parou de somar: sua correção quebrou outra parte e ninguém percebeu. Testes automatizados são pequenos programas que conferem seu programa em segundos, toda vez, sem cansar. Eles são o que deixa você mudar código sem medo.',
  sections: [
    {
      id: 'por-que-testar',
      title: 'Uma rede de segurança',
      blocks: [
        {
          type: 'analogy',
          title: 'O trapezista e a rede',
          text: 'O trapezista não pretende cair. A rede está lá para ele poder **tentar movimentos novos** sem que um erro vire tragédia. Testes são a rede: você continua mudando o código, e se algo quebrar, eles avisam antes da pessoa usuária.',
        },
        {
          type: 'text',
          text: 'Um **teste automatizado** é um código que usa o seu código e confere se o resultado é o esperado. Você escreve uma vez e roda quantas vezes quiser, com um comando.',
        },
        {
          type: 'text',
          text: 'Testar clicando na tela continua útil, mas é lento e depende da sua memória. Ninguém reconfere 40 telas a cada mudança. Quando algo que funcionava para de funcionar, isso se chama **regressão**, e é o tipo de bug que testes pegam melhor.',
        },
        {
          type: 'quiz',
          question: 'Qual é o principal ganho de ter testes automatizados num projeto?',
          options: [
            {
              text: 'Mudar o código com confiança, porque uma regressão aparece em segundos',
              correct: true,
              feedback:
                'Isso. O valor do teste aparece no futuro: na próxima mudança, sua ou de outra pessoa, ele confere o que já funcionava.',
            },
            {
              text: 'Provar que o programa não tem nenhum bug',
              feedback:
                'Nenhum conjunto de testes prova isso. Testes conferem os casos que você escreveu; um caso esquecido continua sem proteção.',
            },
            {
              text: 'Deixar o site mais rápido para quem usa',
              feedback:
                'Testes rodam no seu computador e na CI, não no navegador da pessoa. Eles não mudam a velocidade da página.',
            },
          ],
        },
      ],
    },
    {
      id: 'anatomia-do-teste',
      title: 'Anatomia de um teste',
      blocks: [
        {
          type: 'text',
          text: 'A maioria das ferramentas de teste em JavaScript usa as mesmas três palavras: `describe` agrupa, `it` descreve um caso e `expect` confere um valor. Dentro de cada caso, quase todo teste segue três passos: **organizar**, **agir** e **verificar**.',
        },
        {
          type: 'anatomy',
          caption:
            'Um teste de unidade escrito com Vitest, a ferramenta de testes que combina com o Vite.',
          language: 'ts',
          parts: [
            {
              text: "describe('aplicarCupom'",
              label: 'describe',
              note: 'Agrupa os testes de um mesmo assunto. O nome aparece no relatório, então escreva o que está sendo testado.',
            },
            { text: ', () => {\n  ' },
            {
              text: "it('dá 10% de desconto com o cupom TRILHA10'",
              label: 'it',
              note: 'Um caso de teste. Leia em voz alta: “ele dá 10% de desconto com o cupom”. Se a frase não faz sentido, o teste provavelmente confere coisas demais.',
            },
            { text: ', () => {\n    ' },
            {
              text: 'const total = 200;',
              label: 'Organizar',
              note: 'Prepare o cenário: os dados de entrada e o que mais o caso precisar. Em inglês, esse padrão é chamado de Arrange-Act-Assert.',
            },
            { text: '\n    ' },
            {
              text: "const resultado = aplicarCupom(total, 'TRILHA10');",
              label: 'Agir',
              note: 'Execute a única coisa que está sendo testada. Um teste com várias ações fica difícil de diagnosticar quando falha.',
            },
            { text: '\n    ' },
            {
              text: 'expect(resultado)',
              label: 'Verificar',
              note: '`expect` recebe o valor que o código produziu, o valor real.',
            },
            { text: '.' },
            {
              text: 'toBe(180)',
              label: 'Comparador',
              note: 'Diz o que você espera. `toBe` compara com `===`. Existem outros, como `toEqual` para objetos e `toContain` para listas.',
            },
            { text: ';\n  });\n});' },
          ],
        },
        {
          type: 'fill',
          prompt: 'Complete o teste para conferir que `formatarPreco(5)` devolve `R$ 5,00`.',
          language: 'ts',
          template: `[[it|test]]('formata valor inteiro', () => {
  const resultado = formatarPreco(5);
  [[expect]](resultado).[[toBe]]('R$ 5,00');
});`,
          explanation:
            '`it` (ou o sinônimo `test`) cria o caso, `expect` recebe o valor real e `toBe` diz o valor esperado. Se não forem iguais, a ferramenta mostra os dois lado a lado.',
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem o jeito de escrever um bom teste.',
          items: [
            'Escolher um comportamento que a pessoa usuária espera',
            'Preparar os dados e o cenário (organizar)',
            'Fazer a ação, como chamar a função ou clicar (agir)',
            'Conferir o resultado (verificar)',
            'Quebrar o código de propósito e ver o teste falhar',
          ],
          explanation:
            'O último passo é o que mais gente pula. Um teste que nunca falha pode não estar testando nada: ver ele ficar vermelho prova que ele enxerga o problema.',
        },
      ],
    },
    {
      id: 'primeiro-teste',
      title: 'Seu primeiro teste de unidade',
      blocks: [
        {
          type: 'text',
          text: 'Um **teste de unidade** confere uma parte pequena isolada, quase sempre uma função. Os melhores candidatos são **funções puras**: as que sempre devolvem o mesmo resultado para a mesma entrada e não mexem em nada fora delas, como formatar preço ou validar CEP.',
        },
        {
          type: 'codeTabs',
          caption: 'Uma função, o arquivo de teste e o que aparece no terminal',
          tabs: [
            {
              label: 'formatarPreco.ts',
              language: 'ts',
              code: `export function formatarPreco(valor: number): string {
  return 'R$ ' + valor.toFixed(2).replace('.', ',');
}`,
            },
            {
              label: 'formatarPreco.test.ts',
              language: 'ts',
              code: `import { describe, it, expect } from 'vitest';
import { formatarPreco } from './formatarPreco';

describe('formatarPreco', () => {
  it('usa vírgula e duas casas decimais', () => {
    expect(formatarPreco(10.5)).toBe('R$ 10,50');
  });

  it('formata zero', () => {
    expect(formatarPreco(0)).toBe('R$ 0,00');
  });
});`,
            },
            {
              label: 'Terminal',
              language: 'bash',
              code: `$ npx vitest run

 ✓ src/formatarPreco.test.ts (2 tests)
   ✓ formatarPreco > usa vírgula e duas casas decimais
   ✓ formatarPreco > formata zero

 Test Files  1 passed (1)
      Tests  2 passed (2)`,
            },
          ],
        },
        {
          type: 'text',
          text: 'Sem instalar nada, dá para sentir como isso funciona. O exercício abaixo traz um executor de testes de dez linhas, parecido com o Vitest, e uma função com defeito. Os testes já estão escritos e falhando.',
        },
        {
          type: 'playground',
          title: 'Faça os testes passarem',
          task: 'Rode e leia o console: cada `✗` diz o que era esperado e o que veio. Conserte **só** a função `formatarPreco` até todos os testes mostrarem `✓`. Dica: `toFixed(2)` fixa duas casas e `replace` troca o ponto pela vírgula.',
          js: `// Mini executor de testes (não precisa mexer aqui)
function teste(nome, fn) {
  try {
    fn();
    console.log('✓ ' + nome);
  } catch (erro) {
    console.log('✗ ' + nome + ': ' + erro.message);
  }
}

function esperar(valor) {
  return {
    toBe(esperado) {
      if (valor !== esperado) {
        throw new Error('esperava ' + JSON.stringify(esperado) + ', recebeu ' + JSON.stringify(valor));
      }
    },
  };
}

// A função com defeito: conserte aqui
function formatarPreco(valor) {
  return 'R$ ' + valor;
}

// Os testes (não mude)
teste('formata valor inteiro com centavos', () => {
  esperar(formatarPreco(10)).toBe('R$ 10,00');
});
teste('usa vírgula e duas casas', () => {
  esperar(formatarPreco(10.5)).toBe('R$ 10,50');
});
teste('arredonda para duas casas', () => {
  esperar(formatarPreco(3.999)).toBe('R$ 4,00');
});
teste('formata zero', () => {
  esperar(formatarPreco(0)).toBe('R$ 0,00');
});`,
          checks: [
            {
              label: '`formatarPreco(10.5)` devolve `R$ 10,50`',
              test: `try {
  return typeof formatarPreco === 'function' && formatarPreco(10.5) === 'R$ 10,50';
} catch (erro) {
  return false;
}`,
            },
            {
              label: 'Funciona com inteiros, zero e arredondamento',
              test: `try {
  return (
    typeof formatarPreco === 'function' &&
    formatarPreco(10) === 'R$ 10,00' &&
    formatarPreco(0) === 'R$ 0,00' &&
    formatarPreco(3.999) === 'R$ 4,00'
  );
} catch (erro) {
  return false;
}`,
            },
            {
              label: 'Os quatro testes aparecem com `✓` e nenhum com `✗`',
              test: `const logs = window.__trilhaLogs || [];
const passaram = logs.filter((linha) => linha.startsWith('✓')).length;
const falharam = logs.filter((linha) => linha.startsWith('✗')).length;
return passaram >= 4 && falharam === 0;`,
            },
            {
              label: 'Também acerta um caso que os testes não cobrem: `99.9` vira `R$ 99,90`',
              test: `try {
  return typeof formatarPreco === 'function' && formatarPreco(99.9) === 'R$ 99,90';
} catch (erro) {
  return false;
}`,
            },
          ],
          solution: {
            js: `// Mini executor de testes (não precisa mexer aqui)
function teste(nome, fn) {
  try {
    fn();
    console.log('✓ ' + nome);
  } catch (erro) {
    console.log('✗ ' + nome + ': ' + erro.message);
  }
}

function esperar(valor) {
  return {
    toBe(esperado) {
      if (valor !== esperado) {
        throw new Error('esperava ' + JSON.stringify(esperado) + ', recebeu ' + JSON.stringify(valor));
      }
    },
  };
}

function formatarPreco(valor) {
  return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

// Os testes (não mude)
teste('formata valor inteiro com centavos', () => {
  esperar(formatarPreco(10)).toBe('R$ 10,00');
});
teste('usa vírgula e duas casas', () => {
  esperar(formatarPreco(10.5)).toBe('R$ 10,50');
});
teste('arredonda para duas casas', () => {
  esperar(formatarPreco(3.999)).toBe('R$ 4,00');
});
teste('formata zero', () => {
  esperar(formatarPreco(0)).toBe('R$ 0,00');
});`,
          },
        },
        {
          type: 'reveal',
          question:
            'Todos os testes passaram. E `formatarPreco(1500)`? Ele devolve `R$ 1500,00`, sem o ponto de milhar. O teste estava errado?',
          answer:
            'Não: o teste confere só o que alguém pensou em escrever. Testes passando significam “os casos conhecidos funcionam”, não “não há bugs”. Quando achar um caso novo, escreva o teste dele primeiro, veja falhar e depois corrija. Para moeda de verdade, `Intl.NumberFormat` resolve milhares, mas usa um espaço especial entre `R$` e o número, e o teste precisa saber disso.',
        },
      ],
    },
    {
      id: 'teste-como-quem-usa',
      title: 'Teste como a pessoa usuária',
      blocks: [
        {
          type: 'text',
          text: 'Funções puras são fáceis de testar. Mas o que mais quebra no frontend é a **tela**: o botão que não aparece, a mensagem de erro que sumiu. Para isso existe o **teste de componente**: ele desenha um componente numa página simulada e interage com ele.',
        },
        {
          type: 'analogy',
          title: 'O cliente oculto',
          text: 'Uma loja contrata um cliente oculto para comprar como qualquer pessoa. Ele não abre o estoque nem lê o sistema do caixa: procura o produto pela placa, pede ajuda, paga. Se ele consegue, a loja funciona. A **Testing Library** faz seus testes agirem assim.',
        },
        {
          type: 'text',
          text: 'A Testing Library procura elementos do jeito que uma pessoa (ou um leitor de tela) os encontra: pelo **papel** (botão, título, campo), pelo **rótulo** do campo ou pelo **texto** visível. Repare que isso reaproveita tudo o que você aprendeu em acessibilidade.',
        },
        {
          type: 'code',
          language: 'tsx',
          caption: 'Teste de componente com Vitest e Testing Library',
          code: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Catalogo } from './Catalogo';

const produtos = [
  { id: 1, nome: 'Caneca' },
  { id: 2, nome: 'Camiseta' },
];

it('mostra só os produtos que combinam com a busca', async () => {
  const pessoa = userEvent.setup();
  render(<Catalogo produtos={produtos} />);

  await pessoa.type(screen.getByLabelText('Buscar produtos'), 'cam');

  expect(screen.getByRole('heading', { name: 'Camiseta' })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'Caneca' })).not.toBeInTheDocument();
});`,
        },
        {
          type: 'classify',
          prompt:
            'Quais buscas encontram o elemento como uma pessoa faria e quais dependem de detalhes internos?',
          buckets: ['Como a pessoa usuária', 'Detalhe interno'],
          items: [
            { text: "`getByRole('button', { name: 'Adicionar ao carrinho' })`", bucket: 0 },
            { text: "`getByLabelText('E-mail')`", bucket: 0 },
            { text: "`getByText('Nenhum produto encontrado')`", bucket: 0 },
            { text: "`getByRole('heading', { name: 'Camiseta' })`", bucket: 0 },
            { text: "`container.querySelector('.btn-3')`", bucket: 1 },
            { text: "`querySelector('div > div:nth-child(2) span')`", bucket: 1 },
            { text: 'Ler o valor de uma variável interna do componente', bucket: 1 },
          ],
          explanation:
            'A pessoa não vê classes CSS, posição na árvore nem variáveis. Se o time trocar `.btn-3` por `.botao-primario`, a tela continua igual, mas o teste quebra sem motivo. E se `getByRole` não acha seu botão, talvez ele nem seja um botão de verdade: o teste revelou um problema de acessibilidade.',
        },
        {
          type: 'text',
          text: 'E a falha de rede? Num teste você não quer depender de uma API real, que pode estar fora do ar. Você troca o `fetch` por um dublê que responde o que você mandar. Esse dublê se chama **mock**.',
        },
        {
          type: 'code',
          language: 'tsx',
          caption: 'Simulando a API fora do ar para conferir a mensagem de erro',
          code: `it('avisa quando a API falha', async () => {
  vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('sem rede'));
  render(<Catalogo />);

  const alerta = await screen.findByRole('alert');
  expect(alerta).toHaveTextContent('Não foi possível carregar os produtos');
});`,
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'get, query e find',
          text: '`getBy...` falha na hora se não achar. `queryBy...` devolve `null`, útil para conferir que algo **não** está na tela. `findBy...` espera o elemento aparecer, para o que chega depois de uma requisição.',
        },
      ],
    },
    {
      id: 'tipos-de-teste',
      title: 'Unidade, componente e ponta a ponta',
      blocks: [
        {
          type: 'text',
          text: 'Existe um terceiro tipo: o **teste de ponta a ponta** (em inglês, end-to-end ou e2e). Ele abre um navegador de verdade, entra no site rodando e faz o caminho completo, como uma pessoa faria.',
        },
        {
          type: 'pyramid',
          caption: 'Muitos testes rápidos na base, poucos testes realistas no topo.',
          levels: [
            {
              title: 'Ponta a ponta',
              text: 'Navegador real, site inteiro. Prova que a pessoa consegue concluir a tarefa. Lento e mais frágil: guarde para os caminhos críticos, como busca e compra.',
            },
            {
              title: 'Componente',
              text: 'Um componente ou tela numa página simulada, com a API trocada por mocks. Prova que a interface reage certo a cliques, digitação e erros.',
            },
            {
              title: 'Unidade',
              text: 'Uma função isolada, em milissegundos. Prova regras e casos de borda: formatação, cálculo de frete, validação.',
            },
          ],
        },
        {
          type: 'code',
          language: 'ts',
          caption: 'Um teste de ponta a ponta com Playwright',
          code: `import { test, expect } from '@playwright/test';

test('pessoa busca e favorita um produto', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await page.getByLabel('Buscar produtos').fill('camiseta');
  await page.getByRole('button', { name: 'Favoritar Camiseta' }).click();

  await expect(page.getByText('Favoritos: 1')).toBeVisible();
});`,
        },
        {
          type: 'classify',
          prompt: 'Qual tipo de teste combina melhor com cada caso?',
          buckets: ['Unidade', 'Componente', 'Ponta a ponta'],
          items: [
            { text: '`formatarPreco` usa vírgula e duas casas', bucket: 0 },
            { text: 'Um CEP precisa ter 8 dígitos', bucket: 0 },
            { text: 'O formulário mostra erro quando o e-mail está vazio', bucket: 1 },
            { text: 'A lista mostra “Nenhum produto” quando a API devolve vazio', bucket: 1 },
            { text: 'A pessoa entra, adiciona ao carrinho e finaliza a compra', bucket: 2 },
            { text: 'Depois da publicação, a página inicial abre e a busca funciona', bucket: 2 },
          ],
          explanation:
            'Pergunte: qual o teste mais barato que pegaria esse problema? Regra de cálculo, unidade. Reação da tela, componente. Fluxo que atravessa várias telas e o servidor, ponta a ponta.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns',
          text: 'Testar detalhes internos (classes, nomes de variáveis, quantas vezes uma função interna rodou). Usar esperas fixas como “aguarde 2 segundos”. Escrever só testes de ponta a ponta porque “são mais reais”: a suíte fica lenta e ninguém roda.',
        },
        {
          type: 'quiz',
          question:
            'Um teste passa no seu computador e falha de vez em quando na CI. Ele clica em “Buscar”, espera 2 segundos fixos e confere a lista. O que está acontecendo?',
          options: [
            {
              text: 'É um teste instável: na CI a resposta às vezes demora mais de 2 segundos. Troque a espera fixa por uma que aguarda o elemento aparecer',
              correct: true,
              feedback:
                'Isso. Um teste que às vezes passa e às vezes falha sem mudança no código é chamado de **instável** (em inglês, flaky). `findByRole` e o `expect(...).toBeVisible()` do Playwright esperam a condição em vez de um tempo chutado.',
            },
            {
              text: 'Aumente a espera para 10 segundos e o problema some',
              feedback:
                'Diminui a falha, mas deixa a suíte lenta e um dia 10 segundos também não bastam. O problema é esperar tempo em vez de esperar o resultado.',
            },
            {
              text: 'A CI está com defeito; rode de novo até passar',
              feedback:
                'Rodar de novo esconde o problema. Um teste em que ninguém confia vira ruído e logo é ignorado, inclusive quando aponta um bug real.',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Você trocou a classe `.card` por `.cartao-produto`. A tela ficou idêntica, mas 12 testes quebraram. O que isso indica?',
          options: [
            {
              text: 'Os testes dependem de detalhes de implementação, e não do que a pessoa vê',
              correct: true,
              feedback:
                'Exato. Um bom teste só quebra quando o comportamento quebra. Busque por papel, rótulo e texto, e uma refatoração dessas não muda nada.',
            },
            {
              text: 'Os testes funcionaram: pegaram uma mudança',
              feedback:
                'Pegaram uma mudança que não afeta ninguém. Testes que gritam sem motivo fazem o time desconfiar deles.',
            },
            {
              text: 'É melhor nunca mudar nomes de classes depois de escrever testes',
              feedback:
                'Testes existem para facilitar mudanças, não para impedir. Se travam refatorações inofensivas, o problema está neles.',
            },
          ],
        },
      ],
    },
    {
      id: 'testes-na-ci',
      title: 'Testes que rodam sozinhos',
      blocks: [
        {
          type: 'text',
          text: 'Teste que só roda quando alguém lembra acaba esquecido. Por isso os projetos usam **CI** (integração contínua): um serviço que roda lint, testes e build automaticamente a cada push ou pull request.',
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Deixe os testes rodando localmente',
              text: 'Confira que `npx vitest run` e `npx playwright test` passam no seu computador.',
            },
            {
              title: 'Crie o arquivo de workflow',
              text: 'No GitHub Actions, a CI do próprio GitHub, um arquivo em `.github/workflows/` diz o que rodar. O Playwright precisa saber subir o site: configure `webServer` no `playwright.config.ts`.',
              code: `name: Testes
on: [push, pull_request]
jobs:
  testes:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npx vitest run
      - run: npx playwright install --with-deps
      - run: npx playwright test`,
            },
            {
              title: 'Abra um pull request',
              text: 'O resultado aparece no próprio PR: verde se tudo passou, vermelho com o log do passo que falhou.',
            },
            {
              title: 'Quebre de propósito',
              text: 'Mude a função para errar, faça push e veja a CI ficar vermelha. Depois corrija e veja voltar ao verde. Agora você confia nela.',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'A CI ficou vermelha no seu pull request, mas no seu computador tudo passa. Qual o primeiro passo?',
          options: [
            {
              text: 'Abrir o log do passo que falhou e ler qual teste quebrou e com qual mensagem',
              correct: true,
              feedback:
                'Isso. O log diz o que era esperado e o que veio. Muitas vezes a diferença é de ambiente: uma variável que só existe na sua máquina ou uma dependência fora do lockfile.',
            },
            {
              text: 'Desativar o teste para conseguir juntar o PR',
              feedback:
                'Desligar o alarme não apaga o incêndio. Se o teste estiver errado, corrija o teste; se o código estiver errado, corrija o código.',
            },
            {
              text: 'Juntar mesmo assim, já que funciona localmente',
              feedback:
                'A CI roda num ambiente limpo, parecido com o de produção. Se falha lá, há boa chance de falhar para as pessoas também.',
            },
          ],
        },
      ],
    },
  ],
  recap: [
    'Um teste automatizado usa seu código e confere o resultado; ele protege contra **regressões**.',
    'Todo teste segue organizar, agir e verificar, com `describe`, `it` e `expect`.',
    'Busque elementos como a pessoa usuária: por papel, rótulo e texto, nunca por classe ou posição.',
    'Muitos testes de unidade, vários de componente e poucos de ponta a ponta nos fluxos críticos.',
    'Testes instáveis e presos a detalhes internos perdem a confiança do time; a CI roda tudo a cada pull request.',
  ],
  cards: [
    {
      id: 'organizar-agir-verificar',
      front: 'Quais são os três passos de um teste?',
      back: 'Organizar (preparar dados), agir (executar o que é testado) e verificar (conferir o resultado com `expect`).',
    },
    {
      id: 'regressao',
      front: 'O que é uma regressão?',
      back: 'Algo que funcionava e parou de funcionar depois de uma mudança. Testes automatizados a detectam cedo.',
    },
    {
      id: 'buscar-por-papel',
      front: "Por que preferir `getByRole` a `querySelector('.classe')` num teste?",
      back: 'Porque encontra o elemento como a pessoa e o leitor de tela encontram, e não quebra quando a classe CSS muda.',
    },
    {
      id: 'tres-tipos',
      front: 'O que cada tipo de teste prova: unidade, componente e ponta a ponta?',
      back: 'Unidade: a regra de uma função. Componente: a reação da tela. Ponta a ponta: a pessoa conclui a tarefa no site real.',
    },
    {
      id: 'teste-instavel',
      front: 'O que é um teste instável (flaky) e uma causa comum?',
      back: 'Um teste que passa e falha sem mudança no código. Causa comum: esperar um tempo fixo em vez de esperar o elemento aparecer.',
    },
    {
      id: 'mock',
      front: 'Para que serve um mock num teste de interface?',
      back: 'Substituir algo externo, como o `fetch`, para simular respostas e falhas sem depender de uma API real.',
    },
    {
      id: 'ver-falhar',
      front: 'Por que quebrar o código de propósito depois de escrever um teste?',
      back: 'Para provar que o teste enxerga o problema. Um teste que nunca falha pode não estar testando nada.',
    },
  ],
  mission: {
    title: 'Proteja o catálogo com testes',
    text: 'No projeto de catálogo que você está construindo, escreva testes para os três momentos que mais quebram em telas reais e coloque tudo para rodar sozinho.',
    steps: [
      'Escreva um teste de unidade para uma função pura, como formatar preço ou filtrar produtos',
      'Teste a busca com Testing Library, encontrando o campo pelo rótulo',
      'Simule uma falha da API com um mock e confira a mensagem de erro',
      'Teste que um formulário inválido mostra o erro e não envia',
      'Crie o workflow do GitHub Actions e veja um pull request ficar verde',
    ],
  },
  sources: [
    { title: 'Vitest: primeiros passos', url: 'https://vitest.dev/guide/' },
    {
      title: 'Testing Library: prioridade das consultas',
      url: 'https://testing-library.com/docs/queries/about/#priority',
    },
    { title: 'Playwright: instalação', url: 'https://playwright.dev/docs/intro' },
  ],
};
