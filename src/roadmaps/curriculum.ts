import { Level, Link, RoadmapItem } from '../entity/RoadmapModel';
import { resources as r } from './resources';

export function topic(
  label: string,
  description: string,
  links: Link[],
  practice: string,
): RoadmapItem {
  return {
    label,
    description,
    children: [
      { label: 'O básico', links },
      { label: 'Pratique e confira', description: practice, links },
    ],
  };
}

export function project(
  label: string,
  description: string,
  criteria: string,
  links: Link[],
): Level {
  return {
    label: 'Projeto: ' + label,
    description: 'Construa antes de avançar. Registre as decisões e peça uma revisão.',
    items: [
      {
        label,
        description,
        children: [{ label: 'Critérios de conclusão', description: criteria, links }],
      },
    ],
  };
}

export const git = topic(
  'Controle de Versão',
  'Use Git desde o primeiro exercício: commits pequenos, branches, pull requests, revisão e resolução de conflitos. Não publique credenciais.',
  [r.git, r.contribute],
  'Crie um repositório com README, abra um pull request e resolva um conflito em uma branch de exercício. Peça à IA que explique o diff e confira a explicação no histórico do Git.',
);

export const web = topic(
  'Internet e HTTP',
  'Entenda cliente e servidor, DNS, HTTPS, métodos, status, cabeçalhos, JSON e o ciclo de uma requisição. Use o painel Network do navegador.',
  [r.web, r.http],
  'Inspecione uma requisição real e explique URL, método, resposta, status e por que uma falha ocorreu. Peça à IA hipóteses para a falha e confira cada uma no painel Network.',
);

export const html = topic(
  'HTML',
  'Aprenda estrutura semântica, títulos, links, imagens e formulários com labels e validação nativa. A página deve fazer sentido sem CSS.',
  [r.htmlCourse, r.html],
  'Monte uma página com navegação, formulário e imagens com texto alternativo. Peça à IA uma revisão de semântica e labels; confira as sugestões na documentação e percorra os controles pelo teclado.',
);

export const css = topic(
  'CSS',
  'Aprenda cascata, especificidade, box model, Flexbox, Grid e layouts responsivos. Depois explore propriedades customizadas e container queries.',
  [r.htmlCourse, r.css],
  'Adapte a mesma página a celular e desktop sem rolagem horizontal, com texto legível e foco visível. Descreva um problema de layout à IA, teste a hipótese nas ferramentas do navegador e explique a correção.',
);

export const javascript = topic(
  'JavaScript',
  'Pratique variáveis, funções, arrays, objetos, módulos, DOM, eventos, promises, async/await e tratamento de erros antes de usar um framework.',
  [r.jsCourse, r.js, r.fetch],
  'Crie uma lista com filtros e dados de uma API. Mostre carregamento, lista vazia e erro; peça uma pista à IA para um bug e investigue a hipótese com breakpoints. Altere uma função gerada e preveja o resultado.',
);

export const typescript = topic(
  'TypeScript',
  'Use tipos, interfaces, unions, narrowing e generics simples. Ative strict e entenda que tipos não validam dados recebidos em tempo de execução.',
  [r.ts],
  'Tipifique os dados do projeto sem any e valide a resposta de uma API antes de usá-la. Peça à IA que explique um erro de tipo e confira a correção com o compilador, preservando strict.',
);

export const accessibility = topic(
  'Acessibilidade',
  'Inclua semântica, teclado, foco, contraste, mensagens de erro e teste com leitor de tela desde os primeiros componentes.',
  [r.accessibility],
  'Peça à IA que sugira uma lista de verificações. Conclua uma tarefa apenas com teclado e confira labels, foco e anúncios de erro com leitor de tela; a revisão do código não confirma sozinha a acessibilidade.',
);

export const sql = topic(
  'SQL e PostgreSQL',
  'Aprenda SELECT, filtros, JOIN, agregações, CTEs, chaves, constraints, transações, índices e migrações. Comece com um banco relacional.',
  [r.sql, r.postgres],
  'Modele usuários e pedidos, consulte com JOIN e execute uma transação. Peça à IA uma consulta e compare o resultado com uma amostra calculada manualmente. Compare um plano de consulta antes e depois de um índice.',
);

export const delivery = topic(
  'CI e publicação',
  'Automatize lint, checagem de tipos, testes e build em cada pull request. Documente configuração, publicação e rollback; não versione segredos.',
  [r.actions, r.docker],
  'Peça à IA uma proposta de pipeline usando os scripts reais do projeto. Faça a CI falhar com um teste quebrado e voltar a passar após corrigir. Demonstre como reproduzir o projeto localmente.',
);

export const ai = topic(
  'IA no fluxo de trabalho',
  'Use IA para explicar erros, propor testes e revisar hipóteses. Confira a documentação, o diff e os resultados. Proteja dados privados e segredos.',
  [r.ai],
  'Compare uma sugestão de IA com sua solução, identifique uma limitação e teste a mudança. Explique o código sem depender da ferramenta.',
);

export const career: Level = {
  label: 'Preparação para oportunidades',
  description:
    'Comece a buscar estágio ou vagas compatíveis com seus projetos. Ajuste o estudo aos requisitos recorrentes da sua região; concluir a trilha não garante contratação.',
  items: [
    topic(
      'Portfólio e candidatura',
      'Publique projetos com problema, instruções de execução, testes, decisões e limitações. Prepare currículo conciso, uma demonstração e exemplos de colaboração. Pratique leitura de documentação em inglês aos poucos.',
      [r.git, r.contribute],
      'Peça feedback sobre um projeto, corrija uma issue e explique sua contribuição. Compare vagas de entrada e escolha uma lacuna concreta para estudar.',
    ),
    ai,
  ],
};
