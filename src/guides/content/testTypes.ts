import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'pergunta',
      title: 'A pergunta certa',
      blocks: [
        {
          type: 'text',
          text: 'Não existe "o melhor teste". Existe o teste que dá **mais confiança pelo menor custo** para aquele risco. Testes mais realistas pegam mais problemas, mas são mais lentos, mais caros de manter e mais difíceis de diagnosticar quando falham.',
        },
        {
          type: 'pyramid',
          caption:
            'A pirâmide de testes: muitos testes rápidos na base e poucos testes realistas no topo.',
          levels: [
            {
              title: 'Ponta a ponta',
              text: 'Um navegador ou cliente real percorre o fluxo inteiro, com banco e serviços. Poucos, nos caminhos críticos: login, compra, cadastro.',
            },
            {
              title: 'Integração',
              text: 'Peças reais juntas: API com banco, componente com roteador. Pegam erros de contrato, consulta e configuração.',
            },
            {
              title: 'Unidade',
              text: 'Uma função ou classe isolada, em milissegundos. Cobrem regras de negócio e casos de borda.',
            },
          ],
        },
      ],
    },
    {
      id: 'comparacao',
      title: 'Os três níveis lado a lado',
      blocks: [
        {
          type: 'table',
          caption: 'O que cada nível prova e quanto custa',
          head: ['Nível', 'Prova que', 'Velocidade', 'Ferramentas comuns'],
          rows: [
            [
              'Unidade',
              'A lógica de uma parte está correta',
              'Milissegundos',
              'Vitest, Jest, JUnit, pytest',
            ],
            [
              'Integração',
              'As partes conversam do jeito combinado',
              'Segundos',
              'Testing Library, Supertest, Testcontainers',
            ],
            [
              'Ponta a ponta',
              'A pessoa consegue concluir a tarefa',
              'Segundos a minutos',
              'Playwright, Cypress',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'E no frontend?',
          text: 'Muita gente prefere o "troféu de testes": mais peso em integração, renderizando o componente e interagindo como a pessoa usuária. A ideia é a mesma: escolher pelo risco, não pela ferramenta.',
        },
      ],
    },
    {
      id: 'exemplos',
      title: 'Como um bom teste se parece',
      blocks: [
        {
          type: 'code',
          language: 'javascript',
          caption: 'Unidade: organize, aja e confira',
          code: "import { describe, it, expect } from 'vitest';\nimport { aplicarDesconto } from './preco';\n\ndescribe('aplicarDesconto', () => {\n  it('não deixa o preço ficar negativo', () => {\n    const preco = 30;                              // organize\n    const resultado = aplicarDesconto(preco, 50);  // aja\n    expect(resultado).toBe(0);                     // confira\n  });\n});",
        },
        {
          type: 'code',
          language: 'javascript',
          caption: 'Integração no frontend: interaja como a pessoa usuária',
          code: "render(<Busca />);\n\nawait userEvent.type(\n  screen.getByRole('searchbox', { name: 'Buscar curso' }),\n  'react',\n);\n\nexpect(await screen.findByText('3 cursos encontrados')).toBeInTheDocument();",
        },
        {
          type: 'text',
          text: 'Repare que o segundo teste procura elementos **pelo papel e pelo nome**, como um leitor de tela faria. Se ele não encontra o campo, provavelmente a interface também tem um problema de acessibilidade.',
        },
      ],
    },
    {
      id: 'checklist',
      title: 'Antes de abrir o pull request',
      blocks: [
        {
          type: 'checklist',
          id: 'pr',
          items: [
            'O teste **falha** se eu desfizer a correção. Confirmei isso de propósito.',
            'Testa o **comportamento**, não detalhes internos. Uma refatoração não deveria quebrá-lo.',
            'O nome descreve a regra: "não deixa o preço ficar negativo", não "teste 3".',
            'Cobre casos de borda: lista vazia, limite exato, entrada inválida, erro da API.',
            'Não depende da ordem dos testes, do horário nem de serviços externos reais.',
            'Quando falha, a mensagem mostra o que era esperado e o que veio.',
          ],
        },
      ],
    },
  ],
  sources: [
    {
      title: 'Martin Fowler: a pirâmide de testes na prática',
      url: 'https://martinfowler.com/articles/practical-test-pyramid.html',
    },
    {
      title: 'Kent C. Dodds: o troféu de testes',
      url: 'https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications',
    },
    {
      title: 'Testing Library: princípios',
      url: 'https://testing-library.com/docs/guiding-principles',
    },
    { title: 'Playwright: boas práticas', url: 'https://playwright.dev/docs/best-practices' },
  ],
};
