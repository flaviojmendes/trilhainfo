import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'regra',
      title: 'A regra prática',
      blocks: [
        {
          type: 'cards',
          items: [
            {
              label: 'Uma dimensão',
              title: 'Flexbox',
              text: 'Organiza itens **em uma linha ou em uma coluna**. O tamanho do conteúdo decide o espaço de cada item.',
              points: [
                'Menus e barras de ferramentas',
                'Botão com ícone e texto',
                'Centralizar algo',
              ],
            },
            {
              label: 'Duas dimensões',
              title: 'Grid',
              text: 'Organiza itens **em linhas e colunas ao mesmo tempo**. O layout define o espaço e os itens se encaixam nele.',
              points: ['Estrutura da página', 'Grade de cards', 'Formulário com rótulos alinhados'],
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text: 'Os dois se combinam. É comum usar Grid na estrutura da página e Flexbox dentro de cada componente.',
        },
      ],
    },
    {
      id: 'flexbox',
      title: 'Flexbox em um exemplo',
      blocks: [
        {
          type: 'layout',
          variant: 'flex',
          caption:
            'Um menu: itens na mesma linha, alinhados ao centro, e o último empurrado para a direita com `margin-left: auto`.',
          code: '.menu {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 8px;\n}\n\n.menu .entrar {\n  margin-left: auto;\n}',
        },
        {
          type: 'table',
          caption: 'Propriedades de Flexbox que resolvem a maioria dos casos',
          head: ['Propriedade', 'O que faz'],
          rows: [
            ['`flex-direction`', 'Define o eixo principal: `row` (padrão) ou `column`.'],
            [
              '`justify-content`',
              'Distribui os itens **no eixo principal**: `start`, `center`, `space-between`.',
            ],
            [
              '`align-items`',
              'Alinha os itens **no eixo cruzado**: `stretch` (padrão), `center`, `start`.',
            ],
            ['`gap`', 'Espaço entre os itens, sem precisar de margens.'],
            ['`flex-wrap`', 'Permite quebrar a linha quando não cabe tudo.'],
            ['`flex: 1`', 'No item: ocupa o espaço que sobrar.'],
          ],
        },
      ],
    },
    {
      id: 'grid',
      title: 'Grid em um exemplo',
      blocks: [
        {
          type: 'layout',
          variant: 'grid',
          caption:
            'Uma página com áreas nomeadas. Mudar o layout no celular é só redefinir `grid-template-areas`.',
          code: '.pagina {\n  display: grid;\n  grid-template-columns: 90px 1fr;\n  grid-template-rows: auto 1fr auto;\n  grid-template-areas:\n    "topo topo"\n    "menu conteudo"\n    "rodape rodape";\n  gap: 8px;\n}\n\n.topo { grid-area: topo; }',
        },
        {
          type: 'code',
          language: 'css',
          caption: 'Grade de cards responsiva, sem media query',
          code: '.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));\n  gap: 16px;\n}',
        },
        {
          type: 'text',
          text: '`auto-fill` cria quantas colunas couberem, cada uma com pelo menos `240px`. A unidade `fr` divide o espaço que sobra em partes iguais.',
        },
      ],
    },
    {
      id: 'escolha',
      title: 'Qual escolher em cada caso',
      blocks: [
        {
          type: 'table',
          caption: 'Situações comuns e o modelo mais simples para cada uma',
          head: ['Situação', 'Use', 'Por quê'],
          rows: [
            ['Menu horizontal', 'Flexbox', 'Uma linha, itens de tamanhos diferentes.'],
            [
              'Centralizar um elemento',
              'Os dois',
              '`display: grid; place-items: center` resolve em uma linha.',
            ],
            ['Grade de produtos ou cards', 'Grid', 'Colunas alinhadas entre as linhas.'],
            ['Estrutura da página', 'Grid', 'Áreas nomeadas e fáceis de reorganizar.'],
            ['Rótulo e campo alinhados', 'Grid', 'Todos os rótulos ficam na mesma coluna.'],
            ['Ícone ao lado do texto', 'Flexbox', 'Alinhamento vertical com `align-items`.'],
          ],
        },
      ],
    },
  ],
  sources: [
    { title: 'web.dev: Learn CSS, Flexbox', url: 'https://web.dev/learn/css/flexbox' },
    { title: 'web.dev: Learn CSS, Grid', url: 'https://web.dev/learn/css/grid' },
    {
      title: 'MDN: conceitos básicos de Flexbox',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox',
    },
    {
      title: 'CSS-Tricks: guia completo de Grid',
      url: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
    },
  ],
};
