import { LessonMeta } from '../types';

const updatedAt = '2026-10-14';

export const lessons: LessonMeta[] = [
  {
    id: 'ia-planejar-implementar-revisar',
    title: 'Planejar, implementar e revisar com IA',
    summary:
      'Trabalhar com IA em fatias pequenas: pedir o plano antes do código, ler o diff como quem revisa e só seguir com evidência de que funciona.',
    minutes: 15,
    groupIds: ['aiLearning.planejar-implementar-e-revisar'],
    objectives: [
      'Dividir uma mudança em fatias pequenas, com limites claros e resultado observável',
      'Pedir um plano curto e a forma de verificação antes de qualquer código',
      'Ler um diff procurando arquivos fora do escopo e testes alterados para passar',
      'Testar um caso-limite pensado a partir do requisito e corrigir o código sugerido',
    ],
    updatedAt,
    load: () => import('../content/iaPlanejarImplementarRevisar'),
  },
  {
    id: 'ia-depuracao-com-evidencias',
    title: 'Depuração com evidências',
    summary:
      'Reproduzir o erro, ler a mensagem e a pilha, testar uma hipótese por vez e levar à IA evidências em vez de “não funciona”.',
    minutes: 15,
    groupIds: ['aiLearning.depuracao-com-evidencias'],
    objectives: [
      'Registrar esperado e observado e reproduzir um erro de propósito',
      'Ler o tipo, a mensagem e a primeira linha da pilha de um erro',
      'Confirmar uma hipótese com log, breakpoint ou teste, mudando uma coisa por vez',
      'Pedir à IA hipóteses com formas de testá-las a partir das evidências',
      'Fechar a investigação com a menor correção e um teste de regressão',
    ],
    updatedAt,
    load: () => import('../content/iaDepuracaoComEvidencias'),
  },
  {
    id: 'ia-instrucoes-e-escopo-do-agente',
    title: 'Instruções do projeto e escopo do agente',
    summary:
      'Escrever as regras da casa para um agente de IA, limitar o que ele faz sozinho e conferir no terminal se o combinado foi respeitado.',
    minutes: 14,
    groupIds: ['aiLearning.instrucoes-do-projeto-e-escopo-do-agente'],
    objectives: [
      'Escrever um arquivo de instruções curto, com comandos reais, organização, limites e definição de pronto',
      'Separar ações do agente em pode fazer sozinho, pergunte antes e nunca',
      'Delimitar uma tarefa com objetivo, arquivos permitidos, limites e critério de pronto',
      'Revisar uma sessão do agente com `git status`, `git diff` e os testes',
    ],
    updatedAt,
    load: () => import('../content/iaInstrucoesEEscopoDoAgente'),
  },
  {
    id: 'ia-validar-trabalho-gerado',
    title: 'Validar trabalho gerado por IA',
    summary:
      'Conferir o que a IA entrega com evidência independente: asserções suas, pacotes e funções que existem de verdade, segurança, licenças e sua própria explicação.',
    minutes: 15,
    groupIds: ['aiLearning.validar-trabalho-gerado-por-ia'],
    objectives: [
      'Explicar por que testes escritos pelo próprio agente não bastam como evidência',
      'Conferir no registro e na versão instalada se pacotes e funções sugeridos existem',
      'Escrever asserções com casos-limite, casos negativos e propriedades que expõem um erro',
      'Identificar sinais de alerta de segurança, dependência e licença num código gerado',
      'Registrar a evidência da validação na descrição de um pull request',
    ],
    updatedAt,
    load: () => import('../content/iaValidarTrabalhoGerado'),
  },
];
