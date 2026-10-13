import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'objetivo',
      title: 'O objetivo das primeiras semanas',
      blocks: [
        {
          type: 'text',
          text: 'Onboarding é o processo de se integrar a um projeto ou empresa: tecnicamente, nos processos e na cultura. O objetivo não é entender tudo. É conseguir **fazer uma mudança pequena com segurança** e saber **a quem perguntar**.',
        },
      ],
    },
    {
      id: 'roteiro',
      title: 'Um roteiro em três etapas',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Leia a documentação em alto nível',
              text: 'README, arquitetura e regras de negócio principais. Depois, **explique o que entendeu** para alguém do time, em um desenho ou em uma conversa. As correções que você receber valem mais que horas de leitura.',
            },
            {
              title: 'Rode o projeto na sua máquina',
              text: 'Instale, rode os testes e abra a aplicação. Escolha uma funcionalidade e **siga o fluxo pelo código**: da tela ou endpoint até o banco, passando pelos logs.',
            },
            {
              title: 'Pegue uma tarefa pequena',
              text: 'Um bug simples ou um ajuste de texto. Ele ensina o caminho completo: branch, testes, revisão, deploy. Aumente a complexidade aos poucos.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Antes de perguntar',
          text: 'Procure pull requests e issues que resolveram problemas parecidos. Eles mostram o padrão do time e quem conhece aquela parte do código. Se em 30 minutos você não avançou, pergunte, contando o que já tentou.',
        },
      ],
    },
    {
      id: 'primeira-semana',
      title: 'Checklist da primeira semana',
      blocks: [
        {
          type: 'checklist',
          id: 'semana',
          items: [
            'Consigo instalar e rodar o projeto do zero seguindo o README',
            'Rodei a suíte de testes e sei quanto tempo ela leva',
            'Sei como uma mudança chega à produção (CI, revisão, deploy)',
            'Segui uma funcionalidade da interface até o banco de dados',
            'Sei onde ficam os logs e os painéis de monitoramento',
            'Sei quem procurar para dúvidas de produto, de código e de acesso',
            'Abri meu primeiro pull request, mesmo que pequeno',
            'Corrigi ou completei algo no README que estava desatualizado',
          ],
        },
        {
          type: 'text',
          text: 'Anote o que aprender em um documento seu: comandos, decisões, siglas, pessoas. Ele vira referência para dúvidas futuras e, depois, uma contribuição para o próximo que chegar.',
        },
      ],
    },
  ],
};
