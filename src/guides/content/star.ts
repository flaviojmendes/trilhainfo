import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'o-que-e',
      title: 'Para que serve',
      blocks: [
        {
          type: 'text',
          text: 'Perguntas como "conte sobre uma vez em que você errou" ou "fale de um conflito no time" são **comportamentais**: avaliam como você age, não o que você sabe. O método STAR organiza a resposta em quatro partes para que ela tenha contexto, foco em você e um resultado concreto.',
        },
      ],
    },
    {
      id: 'etapas',
      title: 'As quatro etapas',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'S · Situação',
              text: 'Dê o contexto em duas ou três frases. Onde você estava, quem estava envolvido e por que aquilo importava.',
            },
            {
              title: 'T · Tarefa',
              text: 'Qual era a **sua** responsabilidade. O que precisava ser resolvido e qual era a restrição (prazo, recurso, risco).',
            },
            {
              title: 'A · Ação',
              text: 'A parte mais longa. Os passos que **você** tomou e por quê. Fale em primeira pessoa do singular: "eu investiguei", não "a gente fez".',
            },
            {
              title: 'R · Resultado',
              text: 'O que mudou, de preferência com número. Termine com o que você aprendeu ou faria diferente.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Proporção',
          text: 'Uma boa resposta tem entre 1 e 2 minutos: cerca de 20% para situação e tarefa, 60% para ação e 20% para resultado.',
        },
      ],
    },
    {
      id: 'exemplo',
      title: 'Um exemplo completo',
      blocks: [
        {
          type: 'text',
          text: '**Pergunta:** "Conte sobre um problema difícil que você resolveu."',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Situação',
              text: 'No meu projeto de portfólio, um catálogo de cursos com busca, usuários reclamaram que a página demorava mais de 6 segundos para abrir no celular.',
            },
            {
              term: 'Tarefa',
              text: 'Eu era a única pessoa desenvolvendo e queria resolver antes de apresentar o projeto em um processo seletivo, dali a uma semana.',
            },
            {
              term: 'Ação',
              text: 'Medi com o Lighthouse e o painel Network e descobri que a página baixava todas as 400 imagens de uma vez. Adicionei `loading="lazy"`, gerei miniaturas menores e paginei a busca na API. Escrevi um teste para garantir que a primeira página trazia no máximo 20 itens.',
            },
            {
              term: 'Resultado',
              text: 'O carregamento caiu para 1,8 segundo em 4G simulado. Aprendi a medir antes de otimizar: minha primeira suspeita, o JavaScript, não era o problema.',
            },
          ],
        },
      ],
    },
    {
      id: 'preparacao',
      title: 'Como se preparar',
      blocks: [
        {
          type: 'text',
          text: 'Prepare de cinco a seis histórias que possam ser adaptadas. Cada uma deve servir para mais de uma pergunta.',
        },
        {
          type: 'checklist',
          id: 'historias',
          items: [
            'Um problema técnico difícil que você resolveu',
            'Um erro seu e o que você fez depois',
            'Uma discordância com alguém e como chegaram a um acordo',
            'Uma entrega com prazo apertado',
            'Algo que você aprendeu sozinho e rápido',
            'Uma vez em que você ajudou outra pessoa a avançar',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Ainda sem experiência profissional? Use projetos pessoais, trabalhos da faculdade, contribuições em open source ou outros empregos. O que é avaliado é o comportamento.',
        },
      ],
    },
  ],
};
