import { Level, RoadmapItem } from '../entity/RoadmapModel';
import { RoadmapFileModel } from '../entity/RoadmapFileModel';
import { topic as curriculumTopic } from './curriculum';
import { resources as r } from './resources';

type Specialty = keyof RoadmapFileModel;

// The editorial tag stays valid when a title or description is revised.
function topic(...args: Parameters<typeof curriculumTopic>): RoadmapItem {
  return { ...curriculumTopic(...args), ai: 'focused' };
}

interface AIPractice {
  task: string;
  context: string;
  verification: string;
  challenge: string;
}

const practices: Record<Specialty, AIPractice> = {
  frontend: {
    task: 'revisar um componente de interface e propor uma melhoria pequena de semântica, responsividade ou tratamento de erro',
    context: 'arquivos da interface que já existirem, comportamento esperado e problema observado',
    verification:
      'funciona em celular e desktop, pelo teclado, com carregamento, erro e lista vazia quando aplicáveis',
    challenge:
      'Altere uma regra de layout ou validação e explique o resultado antes de consultar a IA.',
  },
  react: {
    task: 'investigar estado duplicado ou um Effect desnecessário e propor uma mudança pequena no componente',
    context: 'componente, props, fluxo de eventos e teste ou reprodução do comportamento',
    verification:
      'estado e eventos permanecem corretos, Effects necessários têm cleanup e o teste cobre comportamento visível',
    challenge: 'Acrescente uma interação ao componente e explique onde o estado deve ficar.',
  },
  backend: {
    task: 'revisar uma regra ou endpoint e propor uma mudança pequena com validação e testes',
    context:
      'trecho da regra ou endpoint que já existir, entrada/saída e, se presentes, contrato HTTP e esquema do banco',
    verification:
      'entradas inválidas são tratadas; quando houver banco ou login, consultas são parametrizadas e permissões são testadas',
    challenge: 'Mude uma regra de negócio e acrescente um teste que falha antes da correção.',
  },
  fullstack: {
    task: 'planejar e implementar um recorte pequeno de uma funcionalidade, identificando os limites entre cliente e servidor',
    context:
      'tela, contrato HTTP e schema do banco, apenas para as partes já presentes nesta etapa',
    verification:
      'entradas são validadas, erros são mostrados ao usuário e nenhum segredo é exposto no cliente',
    challenge: 'Altere um campo e explique cada mudança necessária entre interface, API e banco.',
  },
  devops: {
    task: 'investigar uma falha simulada no laboratório local e propor uma correção mínima',
    context:
      'logs sanitizados, configuração do serviço e comandos já executados com seus resultados',
    verification:
      'a hipótese é reproduzida, a correção é verificada e existe um procedimento para voltar ao estado anterior',
    challenge: 'Provoque outra falha local e siga o runbook sem depender de sugestões.',
  },
  'data-engineer': {
    task: 'revisar uma consulta ou etapa do pipeline e procurar dupla contagem, nulos ou duplicação após reexecução',
    context:
      'schema, granularidade esperada, consulta ou código e uma pequena amostra pública ou sintética',
    verification:
      'o resultado é comparado com uma amostra calculada manualmente; cargas repetidas não duplicam dados quando aplicável',
    challenge: 'Insira um registro duplicado ou nulo e demonstre como o teste detecta o problema.',
  },
  test: {
    task: 'propor cenários de teste priorizados por risco e justificar o resultado esperado a partir dos requisitos',
    context: 'critérios de aceite, regras do produto e evidências de uma sessão de teste',
    verification:
      'o resultado esperado vem do requisito; casos duplicados são eliminados e há cenários negativos relevantes',
    challenge: 'Crie um caso que a IA não sugeriu e explique o risco que ele cobre.',
  },
  entrevistas: {
    task: 'simular uma entrevista sobre meu projeto, com uma pergunta por vez e feedback após minha resposta',
    context: 'descrição da vaga, README e trechos sanitizados do projeto que quero apresentar',
    verification:
      'o feedback aponta lacunas verificáveis; as regras de uso de IA do processo seletivo são respeitadas',
    challenge: 'Repita uma pergunta sem sugestões e explique a decisão com suas próprias palavras.',
  },
};

const studyPrompt = `Estou aprendendo [conceito] na trilha [nome].
Meu objetivo é [resultado pequeno e observável].
Já tentei [tentativa] e observei [resultado ou erro].
Use este trecho como contexto: [código ou exemplo sem dados privados].
Explique a ideia com um exemplo curto e faça uma pergunta para conferir minha compreensão.
Depois proponha uma variação do exercício. Aguarde minha tentativa antes de dar feedback.`;

function withPrompt(item: RoadmapItem, prompt: string): RoadmapItem {
  return {
    ...item,
    children: item.children?.map((section) =>
      section.label === 'Pratique e confira' ? { ...section, prompt } : section,
    ),
  };
}

const aiStart: RoadmapItem = {
  id: 'aiLearning.seu-assistente-de-estudos',
  ai: 'focused',
  label: 'Seu assistente de estudos',
  description:
    'Aprenda programação e uso de IA em paralelo. Escolha uma ferramenta a que já tenha acesso; os exercícios também funcionam em um chat, compartilhando trechos pequenos. Documentação gratuita não significa serviço gratuito: consulte os limites da sua conta. Você não precisa assinar nem dominar três ferramentas.',
  children: [
    {
      id: 'aiLearning.escolha-uma-ferramenta',
      label: 'Escolha uma ferramenta',
      description:
        'Experimente uma opção neste momento. Para concluir esta etapa, basta abrir um exercício em uma ferramenta e localizar como conversar, fornecer contexto e revisar uma mudança.\n\nCursor: abra um projeto no editor, converse sobre um arquivo e forneça trechos ou arquivos como contexto. Peça uma alteração pequena, examine o diff e execute o exemplo.\n\nClaude: use o chat com trechos fornecidos por você, ou Claude Code para trabalhar no projeto por terminal ou integrações de editor, se já tiver acesso. Siga o quickstart e peça uma explicação do repositório antes da primeira mudança.\n\nCodex: consulte o quickstart e escolha a superfície disponível para sua conta, como aplicativo, editor ou terminal. Peça que explique o projeto e como executar o exercício; depois experimente uma mudança pequena.\n\nSe ainda não tiver acesso a uma IA, siga os exercícios de programação e retome estas práticas quando uma opção estiver disponível.',
      links: [r.cursor, r.cursorPrompts, r.claude, r.claudePractices, r.codex, r.codexPrompts],
    },
    {
      id: 'aiLearning.pratique-tutoria',
      label: 'Pratique tutoria',
      description:
        'Faça uma tentativa, peça uma explicação ou pista e confira o resultado executando o exemplo. Solicite perguntas e exercícios de revisão. Quando a IA gerar código, leia, altere e teste esse código. Conclua esta etapa após responder uma pergunta sobre o exemplo e resolver uma pequena variação.',
      prompt: studyPrompt,
      links: [r.codexPrompts, r.claudePractices, r.ai],
    },
  ],
};

const prompting: Level = {
  id: 'aiLearning.ia-prompting-e-contexto',
  kind: 'ai',
  label: 'IA: prompting e contexto',
  description:
    'Depois dos primeiros fundamentos, pratique transformar uma dúvida em uma tarefa verificável. Use uma ferramenta por vez.',
  items: [
    withPrompt(
      topic(
        'Prompts para aprender e construir',
        'Expresse objetivo, contexto, limites e como conferir o resultado. Mostre sua tentativa e exemplos de entrada/saída. Peça uma resposta no nível de quem está aprendendo e faça perguntas quando algo não estiver claro. Ajuste o prompt a partir do resultado, sem decorar fórmulas.',
        [r.codexPrompts, r.cursorPrompts, r.claudePractices],
        'Compare um pedido vago com um pedido que inclui sua tentativa e critérios. Execute os exemplos e registre qual informação melhorou a resposta.',
        'aiLearning.prompts-para-aprender-e-construir',
      ),
      studyPrompt,
    ),
    topic(
      'Contexto útil e dados protegidos',
      'Forneça os arquivos relevantes, o erro completo sanitizado, a versão usada e o comportamento esperado. Diferencie conversar sobre código de permitir edição e execução. Use dados de laboratório; não compartilhe senhas, tokens ou dados pessoais.',
      [r.cursorPrompts, r.codexPrompts, r.ai],
      'Peça ajuda para a mesma dúvida com e sem o trecho relevante. Identifique uma suposição incorreta e corrija o contexto antes de aceitar a solução.',
      'aiLearning.contexto-util-e-dados-protegidos',
    ),
  ],
};

const pairing: Level = {
  id: 'aiLearning.ia-programacao-em-parceria',
  kind: 'ai',
  label: 'IA: programação em parceria',
  description:
    'Use o primeiro projeto como contexto. Alterne pequenas implementações, leitura de código, depuração e testes.',
  items: [
    withPrompt(
      topic(
        'Planejar, implementar e revisar',
        'Defina um recorte pequeno e peça um plano. Decida o que implementar você e o que delegar. Revise cada diff, rode a aplicação e confira o comportamento antes de seguir para outra tarefa. A IA pode gerar código, testes e documentação, mas a evidência precisa ser executada.',
        [r.claudePractices, r.codexPrompts, r.cursor],
        'Implemente uma pequena mudança em parceria. Explique o diff, rejeite ou ajuste uma sugestão e acrescente um caso de teste que não veio da mesma proposta.',
        'aiLearning.planejar-implementar-e-revisar',
      ),
      `Quero implementar [mudança pequena] neste projeto.
Contexto: [arquivos relevantes, comportamento atual e versão].
Resultado esperado: [exemplo de entrada e saída].
Limites: [arquivos que podem mudar e requisitos que devem ser preservados].
Primeiro proponha um plano curto e a verificação. Depois trabalharemos uma etapa por vez.
Ao implementar, mostre o diff, explique as decisões e informe os comandos executados e seus resultados.`,
    ),
    withPrompt(
      topic(
        'Depuração com evidências',
        'Reproduza o problema e registre esperado versus observado. Peça hipóteses e uma forma de distinguir entre elas antes de tentar correções. Não confunda uma explicação plausível com uma causa confirmada.',
        [r.claudePractices, r.codexPrompts],
        'Introduza um bug no laboratório, confirme uma hipótese por log, breakpoint ou teste e verifique uma correção mínima.',
        'aiLearning.depuracao-com-evidencias',
      ),
      `Problema reproduzível: [passos].
Esperado: [resultado]. Observado: [resultado ou erro sanitizado].
Contexto: [trecho, configuração e versões relevantes].
Liste até três hipóteses e uma verificação para distinguir cada uma.
Primeiro vamos confirmar a causa. Depois proponha a menor correção e um teste de regressão.`,
    ),
  ],
};

const agents: Level = {
  id: 'aiLearning.ia-agentes-regras-e-verificacao',
  kind: 'ai',
  label: 'IA: agentes, regras e verificação',
  description:
    'Depois de conseguir ler diffs, depurar e testar, delegue uma tarefa limitada no repositório de laboratório.',
  items: [
    topic(
      'Instruções do projeto e escopo do agente',
      'Documente como rodar, testar e organizar o projeto. Pratique regras do Cursor, CLAUDE.md ou AGENTS.md conforme a ferramenta escolhida. Defina arquivos, tarefa, limites e permissões. Comece com uma branch e uma alteração pequena; deixe MCP, múltiplos agentes e automações amplas para aprofundamento.',
      [r.cursorRules, r.claudePractices, r.codexRules],
      'Escreva instruções curtas com comandos reais do projeto. Peça uma alteração pequena e confira que as instruções foram usadas e que o diff respeita o escopo.',
      'aiLearning.instrucoes-do-projeto-e-escopo-do-agente',
    ),
    topic(
      'Validar trabalho gerado por IA',
      'Confira comportamento e requisitos além dos testes produzidos pelo próprio agente. Verifique casos negativos, dependências, documentação da versão e o resultado dos comandos. Para interface, faça inspeção visual e por teclado; para dados, use uma amostra com resultado conhecido.',
      [r.claudePractices, r.ai, r.codexPrompts],
      'Revise uma proposta que parece correta, mas tem um caso-limite errado. Acrescente uma verificação independente, corrija e documente a evidência.',
      'aiLearning.validar-trabalho-gerado-por-ia',
    ),
  ],
};

const interviewAI: Level = {
  id: 'aiLearning.ia-simulacao-e-feedback',
  kind: 'ai',
  label: 'IA: simulação e feedback',
  description:
    'Use a ferramenta para praticar antes do processo. Durante uma avaliação real, siga as regras comunicadas pela equipe.',
  items: [
    withPrompt(
      topic(
        'Treine explicação e raciocínio',
        'Peça uma pergunta por vez sobre seu projeto ou um exercício. Responda antes de receber dicas e peça feedback sobre raciocínio, testes e clareza. Confira as críticas no código ou na documentação; feedback de IA também pode estar errado.',
        [r.codexPrompts, r.claudePractices],
        'Faça uma simulação, confira uma crítica com evidência e repita uma resposta com suas próprias palavras. Pergunte ao recrutador quais usos de IA são permitidos em cada etapa.',
        'aiLearning.treine-explicacao-e-raciocinio',
      ),
      `Simule uma entrevista para [vaga e nível] a partir deste projeto: [README e trecho sanitizado].
Faça uma pergunta por vez e espere minha resposta.
Depois avalie clareza, raciocínio e evidência, sem inventar experiências que eu não tive.
Se eu pedir uma dica, dê uma pista curta. No final, proponha uma lacuna concreta para eu estudar.`,
    ),
  ],
};

function projectPractice(level: Level, specialty: Specialty, index: number, total: number): Level {
  const practice = practices[specialty];
  const stage =
    specialty === 'entrevistas'
      ? 'Conduza a simulação com uma pergunta por vez e feedback após minha resposta.'
      : index === 0
      ? 'Planeje e explique o primeiro recorte antes de implementar.'
      : index === total - 1
      ? 'Delegue uma tarefa pequena e revise o diff e a evidência de execução.'
      : 'Implemente em parceria uma etapa pequena e compare com sua própria solução.';
  const prompt = `Projeto: ${level.items[0].label}.
Objetivo: ${practice.task}.
Contexto: [${practice.context}].
Nesta etapa: ${stage}
Limites: apenas este projeto de laboratório; use as ferramentas já escolhidas, dados públicos ou sintéticos e não exponha segredos.
Critérios: ${practice.verification}.
Mostre as hipóteses e como verificá-las. Informe o que foi executado e o que ainda falta conferir.`;

  return {
    ...level,
    items: level.items.map((item) => ({
      ...item,
      ai: 'assisted',
      children: [
        ...(item.children || []),
        {
          id: `${item.id}.ai-practice`,
          ai: 'assisted',
          label: 'Prática de IA neste projeto',
          description:
            stage + ' Adapte o prompt ao que você já construiu nesta etapa. ' + practice.challenge,
          prompt,
          links: [r.codexPrompts, r.cursorPrompts, r.claudePractices],
        },
        {
          id: `${item.id}.verification`,
          ai: 'assisted',
          label: 'Registre sua verificação',
          description:
            'Registre um prompt sanitizado, uma sugestão aceita ou corrigida, a verificação executada e seu resultado. Explique a mudança com suas palavras. Conclua o projeto após demonstrar os critérios, mesmo quando parte do código vier de IA.',
          links: [r.git, r.ai],
        },
      ],
    })),
  };
}

// The same progression is placed at learning milestones; project exercises
// remain specific to each career. Historical catalogs and custom tracks stay intact.
export function withAILearning(levels: Level[], specialty: Specialty): Level[] {
  const isProject = (level: Level) =>
    level.kind === 'project' || (!level.kind && level.label?.startsWith('Projeto: '));
  const projectCount = levels.filter(isProject).length;
  let projectIndex = 0;
  return levels.flatMap((level, index) => {
    if (!isProject(level)) {
      return [{ ...level, items: index === 0 ? [...level.items, aiStart] : level.items }];
    }

    const before: Level[] = [];
    if (projectIndex === 0) before.push(prompting);
    if (specialty === 'entrevistas') {
      before.push(interviewAI);
    } else {
      if (projectIndex === 1) before.push(pairing);
      if (projectIndex === projectCount - 1) before.push(agents);
    }
    const updated = projectPractice(level, specialty, projectIndex, projectCount);
    projectIndex++;
    return [...before, updated];
  });
}
