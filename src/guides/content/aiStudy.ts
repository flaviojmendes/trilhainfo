import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'principio',
      title: 'O princípio',
      blocks: [
        {
          type: 'text',
          text: 'Assistentes de IA aceleram muito o estudo e o trabalho, desde que você use a ferramenta para **entender mais rápido**, não para **pular o entendimento**. Uma regra simples resume tudo: você responde por cada linha que entrega, inclusive as que a IA escreveu.',
        },
        {
          type: 'cards',
          items: [
            {
              label: 'Use para',
              title: 'Acelerar o aprendizado',
              text: 'A IA funciona como tutor paciente e como par de revisão.',
              points: [
                'Explicar um erro ou um trecho de código',
                'Gerar exemplos e exercícios no seu nível',
                'Revisar seu código e sugerir testes',
                'Comparar abordagens e seus custos',
                'Simular uma entrevista técnica',
              ],
            },
            {
              label: 'Cuidado com',
              title: 'Respostas que parecem certas',
              text: 'O texto soa confiante mesmo quando está errado.',
              points: [
                'Funções, opções ou bibliotecas que não existem',
                'Código de versões antigas da ferramenta',
                'Falhas de segurança, como SQL montado com texto',
                'Copiar sem entender, e não aprender',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'ciclo',
      title: 'Um ciclo que ensina',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Tente primeiro',
              text: 'Uns 15 minutos sozinho. Escreva sua hipótese, mesmo que errada: é ela que transforma a resposta em aprendizado.',
            },
            {
              title: 'Peça explicação, não só a resposta',
              text: 'Dê contexto: o que você quer, o que tentou e o que aconteceu. Peça pistas antes da solução.',
            },
            {
              title: 'Verifique',
              text: 'Confira na documentação oficial, rode o código, leia o diff inteiro e escreva um teste.',
            },
            {
              title: 'Explique com suas palavras',
              text: 'Se você não consegue reescrever a solução sem olhar, ainda não aprendeu. Volte um passo.',
            },
          ],
        },
      ],
    },
    {
      id: 'prompts',
      title: 'Prompts que ensinam',
      blocks: [
        {
          type: 'code',
          language: 'prompt',
          caption: 'Para entender um erro',
          code: 'Estou aprendendo JavaScript. Ao clicar no botão, aparece este erro:\n[cole o erro]\n\nEste é o código:\n[cole o trecho]\n\nNão me dê a correção ainda. Liste três hipóteses para a causa e diga\ncomo posso testar cada uma nas ferramentas do navegador.',
        },
        {
          type: 'code',
          language: 'prompt',
          caption: 'Para revisar seu código',
          code: 'Revise esta função como em um pull request. Aponte bugs, casos de borda\nnão tratados e problemas de legibilidade, em ordem de importância.\nNão reescreva o código inteiro: explique cada ponto.',
        },
        {
          type: 'code',
          language: 'prompt',
          caption: 'Para fixar um conceito',
          code: 'Faça cinco perguntas sobre o event loop do JavaScript, uma de cada vez.\nEspere minha resposta antes de corrigir e explique o que eu errei.',
        },
      ],
    },
    {
      id: 'seguranca',
      title: 'Dados e segurança',
      blocks: [
        {
          type: 'checklist',
          id: 'seguranca',
          items: [
            'Não colo senhas, tokens, chaves de API nem arquivos `.env` no chat.',
            'Não envio dados pessoais nem código da empresa sem permissão da política interna.',
            'Antes de instalar um pacote sugerido, confiro se ele existe, tem esse nome exato e é mantido.',
            'Leio o diff completo antes de aceitar uma mudança gerada.',
            'Rodo os testes e a aplicação depois de cada mudança.',
            'Consigo explicar cada linha que vou entregar.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Em processos seletivos',
          text: 'Pergunte as regras antes. Muitos testes técnicos proíbem IA. Quando ela é permitida, o que se avalia é como você conduz e verifica o trabalho.',
        },
      ],
    },
  ],
  sources: [
    { title: 'OWASP: Top 10 para aplicações com LLM', url: 'https://genai.owasp.org/llm-top-10/' },
  ],
};
