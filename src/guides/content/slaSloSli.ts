import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'tres-siglas',
      title: 'Três siglas, três perguntas',
      blocks: [
        {
          type: 'text',
          text: 'SLI, SLO e SLA são formas de falar sobre a **confiabilidade de um serviço**. Cada uma responde a uma pergunta diferente, e elas dependem uma da outra.',
        },
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              label: 'SLI · indicador',
              title: 'O que medimos?',
              text: 'Uma métrica que representa a experiência de quem usa o serviço.',
              points: ['% de requisições com sucesso', '% de respostas em menos de 300 ms'],
            },
            {
              label: 'SLO · objetivo',
              title: 'Quanto queremos?',
              text: 'A meta interna para o SLI, em uma janela de tempo.',
              points: ['99,9% de sucesso em 30 dias', '95% abaixo de 300 ms por semana'],
            },
            {
              label: 'SLA · acordo',
              title: 'O que prometemos?',
              text: 'Um contrato com o cliente, com consequência se não for cumprido.',
              points: ['99,5% de disponibilidade mensal', 'Crédito de 10% na fatura se falhar'],
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text: 'O SLO costuma ser **mais exigente que o SLA**. Assim, a equipe percebe o problema e reage antes de quebrar o contrato.',
        },
      ],
    },
    {
      id: 'error-budget',
      title: 'Error budget: quanto pode falhar',
      blocks: [
        {
          type: 'text',
          text: 'Nenhum serviço é 100% disponível. O **error budget** é a parte que pode falhar sem violar o SLO: `100% − SLO`. Enquanto sobra orçamento, a equipe entrega novidades. Quando ele acaba, a prioridade passa a ser estabilidade.',
        },
        {
          type: 'table',
          caption: 'Tempo de indisponibilidade permitido em uma janela de 30 dias',
          head: ['SLO', 'Error budget', 'Indisponibilidade permitida'],
          rows: [
            ['99%', '1%', '7 h 12 min'],
            ['99,5%', '0,5%', '3 h 36 min'],
            ['99,9%', '0,1%', '43 min'],
            ['99,99%', '0,01%', '4 min 19 s'],
          ],
        },
      ],
    },
    {
      id: 'na-pratica',
      title: 'Como definir os seus',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Escolha uma jornada importante',
              text: 'Por exemplo, "abrir uma trilha" ou "finalizar uma compra". Pense em quem usa, não no servidor.',
            },
            {
              title: 'Defina o SLI como uma proporção',
              text: '`eventos bons ÷ eventos válidos`. Exemplo: requisições que não terminaram em erro do servidor (5xx), divididas pelo total de requisições.',
            },
            {
              title: 'Comece com um SLO alcançável',
              text: 'Use o histórico recente. Uma meta que nunca é cumprida vira ruído e deixa de orientar decisões.',
            },
            {
              title: 'Alerte pelo consumo do orçamento',
              text: 'Avise quando o error budget estiver sendo gasto rápido demais, em vez de alertar a cada erro isolado.',
            },
          ],
        },
      ],
    },
  ],
  sources: [
    {
      title: 'Livro de SRE do Google: Service Level Objectives',
      url: 'https://sre.google/sre-book/service-level-objectives/',
    },
    {
      title: 'Workbook de SRE do Google: implementando SLOs',
      url: 'https://sre.google/workbook/implementing-slos/',
    },
  ],
};
