import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'problema',
      title: 'Não dá para testar tudo',
      blocks: [
        {
          type: 'text',
          text: 'Um campo de idade aceita milhões de valores. Testar todos é impossível, e testar alguns ao acaso deixa buracos. As técnicas de projeto de testes escolhem **poucos casos que representam muitos**, onde os defeitos costumam estar.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Exemplo usado neste guia',
          text: 'Uma loja dá frete grátis para compras **a partir de R$ 100,00** e aceita pedidos de **1 a 10 itens**.',
        },
      ],
    },
    {
      id: 'particao',
      title: 'Partição de equivalência',
      blocks: [
        {
          type: 'text',
          text: 'Divida as entradas em grupos que o sistema deveria tratar **do mesmo jeito**. Se um valor do grupo funciona, os outros provavelmente também. Teste um representante de cada grupo, incluindo os inválidos.',
        },
        {
          type: 'table',
          caption: 'Partições para a quantidade de itens',
          head: ['Partição', 'Exemplo', 'Esperado'],
          rows: [
            ['Abaixo do mínimo', '0', 'Pedido recusado'],
            ['Dentro do intervalo', '5', 'Pedido aceito'],
            ['Acima do máximo', '15', 'Pedido recusado'],
            ['Não numérico', '"dois"', 'Mensagem de erro no campo'],
          ],
        },
      ],
    },
    {
      id: 'limites',
      title: 'Análise de valor-limite',
      blocks: [
        {
          type: 'text',
          text: 'Defeitos se concentram nas **bordas**: um `>` que deveria ser `>=`, um arredondamento. Para cada limite, teste o valor exato e os vizinhos imediatos.',
        },
        {
          type: 'table',
          caption: 'Limites do frete grátis (a partir de R$ 100,00)',
          head: ['Total', 'Esperado', 'Por quê'],
          rows: [
            ['R$ 99,99', 'Frete cobrado', 'Logo abaixo do limite'],
            ['R$ 100,00', 'Frete grátis', 'O limite exato: o caso que mais quebra'],
            ['R$ 100,01', 'Frete grátis', 'Logo acima do limite'],
          ],
        },
        {
          type: 'code',
          language: 'javascript',
          caption: 'Os mesmos casos como teste automatizado',
          code: "it.each([\n  [99.99, false],\n  [100.0, true],\n  [100.01, true],\n])('total %s tem frete grátis? %s', (total, gratis) => {\n  expect(temFreteGratis(total)).toBe(gratis);\n});",
        },
      ],
    },
    {
      id: 'decisao',
      title: 'Tabela de decisão',
      blocks: [
        {
          type: 'text',
          text: 'Quando o resultado depende da **combinação** de condições, liste todas as combinações. Fica fácil ver qual regra ninguém definiu.',
        },
        {
          type: 'table',
          caption: 'Desconto conforme cadastro e cupom',
          head: ['Cliente cadastrado', 'Cupom válido', 'Desconto esperado'],
          rows: [
            ['Sim', 'Sim', '15% (5% + 10%)? Ou só o maior? Pergunte!'],
            ['Sim', 'Não', '5%'],
            ['Não', 'Sim', '10%'],
            ['Não', 'Não', 'Nenhum'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Testar começa antes do código',
          text: 'A primeira linha da tabela revela uma regra indefinida. Encontrar isso no refinamento custa uma conversa; em produção, custa dinheiro.',
        },
      ],
    },
    {
      id: 'risco',
      title: 'Priorizar pelo risco',
      blocks: [
        {
          type: 'text',
          text: 'Com tempo limitado, comece pelo que tem **mais chance de falhar** e **maior impacto se falhar**: código novo ou muito alterado, regras de dinheiro e permissões, integrações e fluxos que todo mundo usa.',
        },
        {
          type: 'checklist',
          id: 'tecnicas',
          items: [
            'Listei as partições válidas e inválidas de cada entrada.',
            'Testei o valor exato de cada limite e os vizinhos.',
            'Combinações de regras estão numa tabela de decisão, sem lacunas.',
            'Casos com mais risco foram testados primeiro.',
            'Dúvidas sobre regras foram levadas para quem define o produto.',
          ],
        },
      ],
    },
  ],
  sources: [
    { title: 'ISTQB: certificação Foundation Level', url: 'https://istqb.org/' },
    { title: 'BSTQB: materiais em português', url: 'https://bstqb.online/' },
    {
      title: 'Martin Fowler: Given, When, Then',
      url: 'https://martinfowler.com/bliki/GivenWhenThen.html',
    },
  ],
};
