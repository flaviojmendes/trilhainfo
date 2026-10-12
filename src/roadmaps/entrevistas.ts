import { withAILearning } from './aiLearning';
import { Level } from '../entity/RoadmapModel';
import { ai, project, topic } from './curriculum';
import { resources as r } from './resources';

export const data: Level[] = withAILearning(
  [
    {
      id: 'entrevistas.prepare-se-para-uma-vaga-concreta',
      label: 'Prepare-se para uma vaga concreta',
      description:
        'Esta trilha complementa uma carreira. Comece depois de construir um projeto; adapte a preparação ao nível e ao formato do processo seletivo.',
      items: [
        topic(
          'Currículo, vaga e apresentação',
          'Compare requisitos recorrentes de vagas de entrada. Descreva projetos e contribuições com evidências, prepare uma demonstração e exemplos de colaboração, aprendizado e resolução de problemas.',
          [r.git, r.contribute],
          'Apresente um projeto em cinco minutos: problema, sua contribuição, decisões, falha encontrada e próximos passos.',
          'entrevistas.curriculo-vaga-e-apresentacao',
        ),
      ],
    },
    {
      id: 'entrevistas.exercicios-proximos-ao-trabalho',
      label: 'Exercícios próximos ao trabalho',
      items: [
        topic(
          'Código, depuração e revisão',
          'Pratique ler código, investigar erros, implementar uma pequena mudança e escrever testes. Explique hipóteses e pergunte sobre requisitos antes de codificar.',
          [r.js, r.python, r.vitest],
          'Corrija um bug em um projeto, teste a regressão e explique o diff e suas limitações.',
          'entrevistas.codigo-depuracao-e-revisao',
        ),
        topic(
          'HTTP, dados e segurança',
          'Revise status HTTP, validação, SQL/JOIN, autenticação e autorização. Discuta situações concretas da carreira escolhida.',
          [r.http, r.postgres, r.security],
          'Explique uma falha de API, uma consulta com dupla contagem e um caso de acesso indevido.',
          'entrevistas.http-dados-e-seguranca',
        ),
      ],
    },
    {
      id: 'entrevistas.algoritmos-essenciais',
      label: 'Algoritmos essenciais',
      description:
        'Estude conforme o processo pedir. Problemas de produto e código legível também fazem parte da preparação.',
      items: [
        topic(
          'Arrays, mapas e complexidade',
          'Use arrays, strings, mapas, conjuntos, pilhas e filas. Entenda tempo e espaço com Big O e pratique busca, ordenação e contagem.',
          [r.algorithms, r.algorithmsCourse, r.js],
          'Resolva deduplicação e busca em uma coleção; explique a complexidade e teste vazio, repetição e limites.',
          'entrevistas.arrays-mapas-e-complexidade',
        ),
        topic(
          'Raciocínio e comunicação',
          'Trabalhe um exemplo pequeno, defina invariantes e compare soluções. Pratique recursão e busca binária; não decore respostas sem compreender.',
          [r.algorithms, r.algorithmsCourse],
          'Resolva um exercício em voz alta, escreva casos de teste antes de finalizar e discuta uma alternativa.',
          'entrevistas.raciocinio-e-comunicacao',
        ),
      ],
    },
    project(
      'Entrevista simulada',
      'Faça uma simulação com apresentação de projeto, exercício prático e revisão de código.',
      'Registre feedback sobre raciocínio, comunicação, testes e código. Corrija uma lacuna concreta e repita a parte que apresentou dificuldade.',
      [r.git, r.vitest, r.algorithms],
      'entrevistas.entrevista-simulada',
    ),
    {
      id: 'entrevistas.preparacao-por-especialidade',
      label: 'Preparação por especialidade',
      items: [
        topic(
          'Revise a carreira escolhida',
          'Frontend/React: estado, acessibilidade e testes. Backend: API, SQL e permissões. QA: riscos e investigação. DevOps: diagnóstico e recuperação. Dados: SQL, modelagem e idempotência.',
          [r.react, r.postgres, r.playwright, r.otel, r.dbt],
          'Prepare uma demonstração de falha e recuperação no seu projeto e explique como verificou a solução.',
          'entrevistas.revise-a-carreira-escolhida',
        ),
        ai,
      ],
    },
    {
      id: 'entrevistas.processo-seletivo-e-acompanhamento',
      label: 'Processo seletivo e acompanhamento',
      items: [
        topic(
          'Desafio técnico e conversa com a equipe',
          'Confirme escopo, tempo disponível e critérios do desafio. Documente o que entregou e o que falta. Pergunte sobre mentoria, rotina e expectativas para o nível de entrada.',
          [r.git, r.contribute],
          'Entregue um README com execução, testes, decisões e limitações; registre feedback e atualize seu plano de estudo.',
          'entrevistas.desafio-tecnico-e-conversa-com-a-equipe',
        ),
      ],
    },
    {
      id: 'entrevistas.aprofundamento-conforme-o-processo',
      label: 'Aprofundamento conforme o processo',
      description:
        'Árvores, grafos e system design distribuído são úteis em processos específicos. Não trate sharding e todas as ordenações como pré-requisitos universais para vagas júnior.',
      items: [
        topic(
          'Estruturas e design de sistemas',
          'Aprenda árvores/grafos, BFS/DFS e modelagem de sistemas quando solicitados. Compare cache, filas, escala e consistência partindo de requisitos explícitos.',
          [r.algorithmsCourse, r.sre, r.kafka],
          'Desenhe um serviço simples, estime seus limites e justifique uma escolha arquitetural sem adicionar componentes desnecessários.',
          'entrevistas.estruturas-e-design-de-sistemas',
        ),
      ],
    },
  ],
  'entrevistas',
);
