import { LessonMeta } from '../types';

const updatedAt = '2026-10-14';

export const lessons: LessonMeta[] = [
  {
    id: 'ia-assistente-de-estudos',
    title: 'IA como assistente de estudos',
    summary:
      'O que é um modelo de linguagem, onde ele acerta e onde inventa, e como usá-lo como tutor sem terceirizar o raciocínio.',
    minutes: 14,
    groupIds: ['aiLearning.seu-assistente-de-estudos'],
    objectives: [
      'Explicar com suas palavras como um LLM gera respostas',
      'Reconhecer tarefas em que a IA costuma acertar e em que é preciso conferir',
      'Identificar uma alucinação e confirmá-la rodando o código e consultando a documentação',
      'Separar usos de IA que ensinam de usos que só dão a sensação de aprender',
      'Escrever um pedido de estudo com objetivo, tentativa, contexto e uma pergunta de conferência',
    ],
    updatedAt,
    load: () => import('../content/iaAssistenteDeEstudos'),
  },
  {
    id: 'ia-prompts-para-aprender',
    title: 'Prompts para aprender e construir',
    summary:
      'Como transformar uma dúvida solta em um pedido claro e verificável, e como ajustá-lo a partir da resposta.',
    minutes: 14,
    groupIds: ['aiLearning.prompts-para-aprender-e-construir'],
    objectives: [
      'Identificar papel, contexto, tarefa, formato, restrições e exemplos em um pedido',
      'Reescrever um pedido vago incluindo sua tentativa e um exemplo de entrada e saída',
      'Pedir que a IA faça perguntas antes de responder quando o problema estiver confuso',
      'Ajustar um pedido mudando uma coisa por vez e registrar o que melhorou a resposta',
    ],
    updatedAt,
    load: () => import('../content/iaPromptsParaAprender'),
  },
  {
    id: 'ia-contexto-e-dados-protegidos',
    title: 'Contexto útil e dados protegidos',
    summary:
      'O que colocar na conversa para a IA ajudar de verdade, e o que nunca colocar: senhas, chaves e dados pessoais.',
    minutes: 15,
    groupIds: ['aiLearning.contexto-util-e-dados-protegidos'],
    objectives: [
      'Explicar o que é a janela de contexto e por que conversas longas perdem informação',
      'Montar um pedido de ajuda com trecho relevante, erro completo, versão e o que já tentou',
      'Diferenciar conversar sobre código de permitir que um agente edite e execute comandos',
      'Classificar o que pode e o que não pode ser colado numa ferramenta de IA',
      'Anonimizar um log ou trecho de código antes de pedir ajuda',
    ],
    updatedAt,
    load: () => import('../content/iaContextoEDadosProtegidos'),
  },
  {
    id: 'ia-treinar-explicacao',
    title: 'Treine explicação e raciocínio',
    summary:
      'Use a IA para ser questionado, revisar explicações e simular entrevistas, fazendo você o esforço de pensar.',
    minutes: 14,
    groupIds: ['aiLearning.treine-explicacao-e-raciocinio'],
    objectives: [
      'Aplicar a técnica Feynman a um conceito, com a IA apontando lacunas',
      'Escrever um pedido de questionário com uma pergunta por vez e sem respostas à vista',
      'Distinguir hábitos de estudo que fixam o aprendizado dos que só parecem fixar',
      'Conduzir uma simulação de entrevista e conferir uma crítica com evidência',
    ],
    updatedAt,
    load: () => import('../content/iaTreinarExplicacao'),
  },
];
