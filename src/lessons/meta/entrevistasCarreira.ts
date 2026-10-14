import { LessonMeta } from '../types';

const updatedAt = '2026-10-14';

export const lessons: LessonMeta[] = [
  {
    id: 'curriculo-vaga-e-apresentacao',
    title: 'Currículo, vaga e apresentação',
    summary:
      'Ler uma vaga, montar um currículo de uma página com projetos que mostram resultado, ajustar LinkedIn e GitHub e responder ao “fale sobre você”.',
    minutes: 16,
    groupIds: ['entrevistas.curriculo-vaga-e-apresentacao'],
    objectives: [
      'Separar requisitos obrigatórios e desejáveis numa vaga real',
      'Montar um currículo de uma página com projetos antes da experiência',
      'Escrever bullets de projeto com verbo, o quê, como e resultado',
      'Usar as palavras-chave da vaga com honestidade e ajustar LinkedIn e GitHub',
      'Apresentar-se em um minuto com a estrutura presente, passado e futuro',
    ],
    updatedAt,
    load: () => import('../content/curriculoVagaEApresentacao'),
  },
  {
    id: 'raciocinio-e-comunicacao',
    title: 'Raciocínio e comunicação',
    summary:
      'Pensar em voz alta, perguntar antes de resolver, testar com exemplos pequenos e responder perguntas comportamentais com o método STAR.',
    minutes: 15,
    groupIds: ['entrevistas.raciocinio-e-comunicacao'],
    objectives: [
      'Narrar intenção e decisões enquanto resolve um exercício',
      'Fazer perguntas de esclarecimento e declarar premissas',
      'Resolver um exemplo pequeno à mão e escrever casos de teste antes de finalizar',
      'Responder perguntas comportamentais com Situação, Tarefa, Ação e Resultado',
      'Responder com honestidade quando não sabe, raciocinando a partir do que sabe',
    ],
    updatedAt,
    load: () => import('../content/raciocinioEComunicacao'),
  },
  {
    id: 'desafio-tecnico-e-conversa',
    title: 'Desafio técnico e conversa com a equipe',
    summary:
      'Do enunciado à entrega: escopo, tempo, README, testes, commits, trade-offs e as perguntas que você faz à equipe.',
    minutes: 15,
    groupIds: ['entrevistas.desafio-tecnico-e-conversa-com-a-equipe'],
    objectives: [
      'Diferenciar take-home, live coding, pareamento e revisão de código',
      'Priorizar o escopo de um desafio e pedir prazo quando necessário',
      'Preparar uma entrega com README, testes e histórico de commits claro',
      'Explicar decisões como trade-offs',
      'Fazer perguntas à equipe e reconhecer sinais de alerta',
    ],
    updatedAt,
    load: () => import('../content/desafioTecnicoEConversa'),
  },
  {
    id: 'revise-a-carreira-escolhida',
    title: 'Revise a carreira escolhida',
    summary:
      'Um plano de revisão para a sua carreira, com diário de lacunas, revisão espaçada, entrevistas simuladas e um jeito saudável de lidar com recusas.',
    minutes: 14,
    groupIds: ['entrevistas.revise-a-carreira-escolhida'],
    objectives: [
      'Identificar os temas centrais de revisão da sua carreira',
      'Registrar lacunas com pergunta, resposta e próxima ação',
      'Montar um calendário de revisão espaçada com prática ativa',
      'Conduzir uma entrevista simulada com uma pessoa ou com IA',
      'Transformar feedback e recusas em ações concretas de estudo',
    ],
    updatedAt,
    load: () => import('../content/reviseACarreiraEscolhida'),
  },
];
