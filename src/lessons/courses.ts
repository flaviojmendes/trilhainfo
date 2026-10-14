export interface CourseModule {
  /** Stage title in the trail. */
  title: string;
  optional?: boolean;
  lessonIds: string[];
}

export interface Course {
  /** Trail id, e.g. `frontend`. */
  id: string;
  title: string;
  modules: CourseModule[];
  /** The trail group each lesson is listed under. */
  groups: Record<string, string>;
}

/** Generated from the trails by `UPDATE_COURSES=1 vitest run src/lessons/courses.test.ts`. */
export const courses: Course[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    modules: [
      {
        title: 'Comece pela web',
        lessonIds: [
          'como-a-web-funciona',
          'seu-kit-de-trabalho',
          'git-do-zero',
          'ia-assistente-de-estudos',
        ],
      },
      {
        title: 'Páginas sem framework',
        lessonIds: [
          'html-primeira-pagina',
          'html-semantica-e-formularios',
          'css-seletores-e-cascata',
          'css-tudo-e-caixa',
          'css-flexbox-e-grid',
          'css-responsivo',
        ],
      },
      {
        title: 'Interfaces que todos podem usar',
        lessonIds: ['acessibilidade-para-todos'],
      },
      {
        title: 'IA: prompting e contexto',
        lessonIds: ['ia-prompts-para-aprender', 'ia-contexto-e-dados-protegidos'],
      },
      {
        title: 'Interatividade e dados',
        lessonIds: [
          'js-valores-e-variaveis',
          'js-decisoes-funcoes-e-repeticoes',
          'js-arrays-e-objetos',
          'js-dom-e-eventos',
          'js-assincrono-e-apis',
        ],
      },
      {
        title: 'IA: programação em parceria',
        lessonIds: ['ia-planejar-implementar-revisar', 'ia-depuracao-com-evidencias'],
      },
      {
        title: 'Ferramentas do projeto',
        lessonIds: ['typescript-tipos-que-protegem', 'ferramentas-npm-e-vite'],
      },
      {
        title: 'Escolha um framework',
        lessonIds: ['componentes-e-estado'],
      },
      {
        title: 'Qualidade e entrega',
        lessonIds: ['testes-de-interface', 'desempenho-e-seguranca'],
      },
      {
        title: 'IA: agentes, regras e verificação',
        lessonIds: ['ia-instrucoes-e-escopo-do-agente', 'ia-validar-trabalho-gerado'],
      },
      {
        title: 'Preparação para oportunidades',
        lessonIds: ['carreira-e-ia'],
      },
    ],
    groups: {
      'como-a-web-funciona': 'curriculum.internet-e-http',
      'seu-kit-de-trabalho': 'curriculum.internet-e-http',
      'git-do-zero': 'curriculum.controle-de-versao',
      'ia-assistente-de-estudos': 'aiLearning.seu-assistente-de-estudos',
      'html-primeira-pagina': 'curriculum.html',
      'html-semantica-e-formularios': 'curriculum.html',
      'css-seletores-e-cascata': 'curriculum.css',
      'css-tudo-e-caixa': 'curriculum.css',
      'css-flexbox-e-grid': 'curriculum.css',
      'css-responsivo': 'curriculum.css',
      'acessibilidade-para-todos': 'curriculum.acessibilidade',
      'ia-prompts-para-aprender': 'aiLearning.prompts-para-aprender-e-construir',
      'ia-contexto-e-dados-protegidos': 'aiLearning.contexto-util-e-dados-protegidos',
      'js-valores-e-variaveis': 'curriculum.javascript',
      'js-decisoes-funcoes-e-repeticoes': 'curriculum.javascript',
      'js-arrays-e-objetos': 'curriculum.javascript',
      'js-dom-e-eventos': 'curriculum.javascript',
      'js-assincrono-e-apis': 'curriculum.javascript',
      'ia-planejar-implementar-revisar': 'aiLearning.planejar-implementar-e-revisar',
      'ia-depuracao-com-evidencias': 'aiLearning.depuracao-com-evidencias',
      'typescript-tipos-que-protegem': 'curriculum.typescript',
      'ferramentas-npm-e-vite': 'frontend.vite-pacotes-e-qualidade',
      'componentes-e-estado': 'frontend.componentes-com-react',
      'testes-de-interface': 'frontend.testes-de-interface',
      'desempenho-e-seguranca': 'frontend.desempenho-e-seguranca-web',
      'ia-instrucoes-e-escopo-do-agente': 'aiLearning.instrucoes-do-projeto-e-escopo-do-agente',
      'ia-validar-trabalho-gerado': 'aiLearning.validar-trabalho-gerado-por-ia',
      'carreira-e-ia': 'curriculum.portfolio-e-candidatura',
    },
  },
  {
    id: 'react',
    title: 'React',
    modules: [
      {
        title: 'Antes de React',
        lessonIds: [
          'js-valores-e-variaveis',
          'js-decisoes-funcoes-e-repeticoes',
          'js-arrays-e-objetos',
          'js-dom-e-eventos',
          'js-assincrono-e-apis',
          'typescript-tipos-que-protegem',
          'ia-assistente-de-estudos',
        ],
      },
      {
        title: 'Crie o primeiro projeto',
        lessonIds: ['ferramentas-npm-e-vite'],
      },
      {
        title: 'Fundamentos de componentes',
        lessonIds: ['react-jsx-componentes-e-props', 'react-estado-e-eventos'],
      },
      {
        title: 'IA: prompting e contexto',
        lessonIds: ['ia-prompts-para-aprender', 'ia-contexto-e-dados-protegidos'],
      },
      {
        title: 'Sincronização e dados',
        lessonIds: ['react-effects-e-refs', 'react-rotas-e-requisicoes'],
      },
      {
        title: 'Qualidade de uma aplicação',
        lessonIds: ['acessibilidade-para-todos', 'react-testes-com-testing-library'],
      },
      {
        title: 'Estado compartilhado e entrega',
        lessonIds: ['react-reducer-e-context', 'react-build-e-desempenho'],
      },
      {
        title: 'IA: programação em parceria',
        lessonIds: ['ia-planejar-implementar-revisar', 'ia-depuracao-com-evidencias'],
      },
      {
        title: 'IA: agentes, regras e verificação',
        lessonIds: ['ia-instrucoes-e-escopo-do-agente', 'ia-validar-trabalho-gerado'],
      },
      {
        title: 'Preparação para oportunidades',
        lessonIds: ['carreira-e-ia'],
      },
    ],
    groups: {
      'js-valores-e-variaveis': 'react.revise-javascript',
      'js-decisoes-funcoes-e-repeticoes': 'react.revise-javascript',
      'js-arrays-e-objetos': 'react.revise-javascript',
      'js-dom-e-eventos': 'react.revise-javascript',
      'js-assincrono-e-apis': 'react.revise-javascript',
      'typescript-tipos-que-protegem': 'curriculum.typescript',
      'ia-assistente-de-estudos': 'aiLearning.seu-assistente-de-estudos',
      'ferramentas-npm-e-vite': 'react.configuracao-com-vite',
      'react-jsx-componentes-e-props': 'react.jsx-componentes-e-props',
      'react-estado-e-eventos': 'react.estado-e-eventos',
      'ia-prompts-para-aprender': 'aiLearning.prompts-para-aprender-e-construir',
      'ia-contexto-e-dados-protegidos': 'aiLearning.contexto-util-e-dados-protegidos',
      'react-effects-e-refs': 'react.effects-e-refs',
      'react-rotas-e-requisicoes': 'react.rotas-e-requisicoes',
      'acessibilidade-para-todos': 'curriculum.acessibilidade',
      'react-testes-com-testing-library': 'react.testes-com-testing-library',
      'react-reducer-e-context': 'react.reducer-e-context',
      'react-build-e-desempenho': 'react.build-e-desempenho',
      'ia-planejar-implementar-revisar': 'aiLearning.planejar-implementar-e-revisar',
      'ia-depuracao-com-evidencias': 'aiLearning.depuracao-com-evidencias',
      'ia-instrucoes-e-escopo-do-agente': 'aiLearning.instrucoes-do-projeto-e-escopo-do-agente',
      'ia-validar-trabalho-gerado': 'aiLearning.validar-trabalho-gerado-por-ia',
      'carreira-e-ia': 'curriculum.portfolio-e-candidatura',
    },
  },
  {
    id: 'backend',
    title: 'Backend',
    modules: [
      {
        title: 'Fundamentos de desenvolvimento',
        lessonIds: [
          'git-do-zero',
          'como-a-web-funciona',
          'seu-kit-de-trabalho',
          'ia-assistente-de-estudos',
        ],
      },
      {
        title: 'Escolha uma linguagem e uma stack',
        lessonIds: ['python-do-zero', 'python-listas-dicionarios-e-arquivos'],
      },
      {
        title: 'IA: prompting e contexto',
        lessonIds: ['ia-prompts-para-aprender', 'ia-contexto-e-dados-protegidos'],
      },
      {
        title: 'Persistência relacional',
        lessonIds: ['sql-consultas', 'sql-tabelas-e-relacoes'],
      },
      {
        title: 'Primeira API',
        lessonIds: ['api-rest-e-contratos', 'banco-acesso-e-migracoes'],
      },
      {
        title: 'IA: programação em parceria',
        lessonIds: ['ia-planejar-implementar-revisar', 'ia-depuracao-com-evidencias'],
      },
      {
        title: 'Segurança e qualidade',
        lessonIds: ['autenticacao-e-autorizacao', 'testes-de-backend'],
      },
      {
        title: 'Execução e operação',
        lessonIds: ['docker-e-compose', 'observabilidade-e-incidentes', 'ci-e-publicacao'],
      },
      {
        title: 'IA: agentes, regras e verificação',
        lessonIds: ['ia-instrucoes-e-escopo-do-agente', 'ia-validar-trabalho-gerado'],
      },
      {
        title: 'Preparação para oportunidades',
        lessonIds: ['carreira-e-ia'],
      },
    ],
    groups: {
      'git-do-zero': 'curriculum.controle-de-versao',
      'como-a-web-funciona': 'curriculum.internet-e-http',
      'seu-kit-de-trabalho': 'curriculum.internet-e-http',
      'ia-assistente-de-estudos': 'aiLearning.seu-assistente-de-estudos',
      'python-do-zero': 'backend.uma-linguagem-de-backend',
      'python-listas-dicionarios-e-arquivos': 'backend.uma-linguagem-de-backend',
      'ia-prompts-para-aprender': 'aiLearning.prompts-para-aprender-e-construir',
      'ia-contexto-e-dados-protegidos': 'aiLearning.contexto-util-e-dados-protegidos',
      'sql-consultas': 'curriculum.sql-e-postgresql',
      'sql-tabelas-e-relacoes': 'curriculum.sql-e-postgresql',
      'api-rest-e-contratos': 'backend.api-rest-e-contratos',
      'banco-acesso-e-migracoes': 'backend.acesso-a-dados-e-migracoes',
      'ia-planejar-implementar-revisar': 'aiLearning.planejar-implementar-e-revisar',
      'ia-depuracao-com-evidencias': 'aiLearning.depuracao-com-evidencias',
      'autenticacao-e-autorizacao': 'backend.autenticacao-e-autorizacao',
      'testes-de-backend': 'backend.testes-e-design-simples',
      'docker-e-compose': 'backend.containers-e-observabilidade',
      'observabilidade-e-incidentes': 'backend.containers-e-observabilidade',
      'ci-e-publicacao': 'curriculum.ci-e-publicacao',
      'ia-instrucoes-e-escopo-do-agente': 'aiLearning.instrucoes-do-projeto-e-escopo-do-agente',
      'ia-validar-trabalho-gerado': 'aiLearning.validar-trabalho-gerado-por-ia',
      'carreira-e-ia': 'curriculum.portfolio-e-candidatura',
    },
  },
  {
    id: 'fullstack',
    title: 'Fullstack',
    modules: [
      {
        title: 'Uma base para os dois lados',
        lessonIds: [
          'como-a-web-funciona',
          'seu-kit-de-trabalho',
          'git-do-zero',
          'ia-assistente-de-estudos',
        ],
      },
      {
        title: 'Interface sem abstrações',
        lessonIds: [
          'html-primeira-pagina',
          'html-semantica-e-formularios',
          'css-seletores-e-cascata',
          'css-tudo-e-caixa',
          'css-flexbox-e-grid',
          'css-responsivo',
          'js-valores-e-variaveis',
          'js-decisoes-funcoes-e-repeticoes',
          'js-arrays-e-objetos',
          'js-dom-e-eventos',
          'js-assincrono-e-apis',
        ],
      },
      {
        title: 'IA: prompting e contexto',
        lessonIds: ['ia-prompts-para-aprender', 'ia-contexto-e-dados-protegidos'],
      },
      {
        title: 'Uma stack para o produto',
        lessonIds: [
          'typescript-tipos-que-protegem',
          'componentes-e-estado',
          'react-jsx-componentes-e-props',
          'react-estado-e-eventos',
          'node-e-express',
        ],
      },
      {
        title: 'Dados e contrato',
        lessonIds: [
          'sql-consultas',
          'sql-tabelas-e-relacoes',
          'api-rest-e-contratos',
          'integracao-front-e-api',
        ],
      },
      {
        title: 'IA: programação em parceria',
        lessonIds: ['ia-planejar-implementar-revisar', 'ia-depuracao-com-evidencias'],
      },
      {
        title: 'Acesso, inclusão e testes',
        lessonIds: [
          'autenticacao-e-autorizacao',
          'acessibilidade-para-todos',
          'playwright-para-web',
        ],
      },
      {
        title: 'Entrega e operação básica',
        lessonIds: ['ci-e-publicacao', 'observabilidade-e-incidentes'],
      },
      {
        title: 'IA: agentes, regras e verificação',
        lessonIds: ['ia-instrucoes-e-escopo-do-agente', 'ia-validar-trabalho-gerado'],
      },
      {
        title: 'Preparação para oportunidades',
        lessonIds: ['carreira-e-ia'],
      },
    ],
    groups: {
      'como-a-web-funciona': 'curriculum.internet-e-http',
      'seu-kit-de-trabalho': 'curriculum.internet-e-http',
      'git-do-zero': 'curriculum.controle-de-versao',
      'ia-assistente-de-estudos': 'aiLearning.seu-assistente-de-estudos',
      'html-primeira-pagina': 'curriculum.html',
      'html-semantica-e-formularios': 'curriculum.html',
      'css-seletores-e-cascata': 'curriculum.css',
      'css-tudo-e-caixa': 'curriculum.css',
      'css-flexbox-e-grid': 'curriculum.css',
      'css-responsivo': 'curriculum.css',
      'js-valores-e-variaveis': 'curriculum.javascript',
      'js-decisoes-funcoes-e-repeticoes': 'curriculum.javascript',
      'js-arrays-e-objetos': 'curriculum.javascript',
      'js-dom-e-eventos': 'curriculum.javascript',
      'js-assincrono-e-apis': 'curriculum.javascript',
      'ia-prompts-para-aprender': 'aiLearning.prompts-para-aprender-e-construir',
      'ia-contexto-e-dados-protegidos': 'aiLearning.contexto-util-e-dados-protegidos',
      'typescript-tipos-que-protegem': 'curriculum.typescript',
      'componentes-e-estado': 'fullstack.react-e-node-js',
      'react-jsx-componentes-e-props': 'fullstack.react-e-node-js',
      'react-estado-e-eventos': 'fullstack.react-e-node-js',
      'node-e-express': 'fullstack.react-e-node-js',
      'sql-consultas': 'curriculum.sql-e-postgresql',
      'sql-tabelas-e-relacoes': 'curriculum.sql-e-postgresql',
      'api-rest-e-contratos': 'fullstack.integracao-http',
      'integracao-front-e-api': 'fullstack.integracao-http',
      'ia-planejar-implementar-revisar': 'aiLearning.planejar-implementar-e-revisar',
      'ia-depuracao-com-evidencias': 'aiLearning.depuracao-com-evidencias',
      'autenticacao-e-autorizacao': 'fullstack.sessoes-e-permissoes',
      'acessibilidade-para-todos': 'curriculum.acessibilidade',
      'playwright-para-web': 'fullstack.testes-de-ponta-a-ponta',
      'ci-e-publicacao': 'curriculum.ci-e-publicacao',
      'observabilidade-e-incidentes': 'fullstack.configuracao-e-monitoramento',
      'ia-instrucoes-e-escopo-do-agente': 'aiLearning.instrucoes-do-projeto-e-escopo-do-agente',
      'ia-validar-trabalho-gerado': 'aiLearning.validar-trabalho-gerado-por-ia',
      'carreira-e-ia': 'curriculum.portfolio-e-candidatura',
    },
  },
  {
    id: 'devops',
    title: 'DevOps',
    modules: [
      {
        title: 'Base para operar sistemas',
        lessonIds: [
          'git-do-zero',
          'como-a-web-funciona',
          'seu-kit-de-trabalho',
          'ia-assistente-de-estudos',
        ],
      },
      {
        title: 'Linux e redes na prática',
        lessonIds: ['linux-e-terminal', 'redes-e-diagnostico'],
      },
      {
        title: 'Automação simples',
        lessonIds: [
          'python-do-zero',
          'python-listas-dicionarios-e-arquivos',
          'shell-scripts-e-automacao',
        ],
      },
      {
        title: 'IA: prompting e contexto',
        lessonIds: ['ia-prompts-para-aprender', 'ia-contexto-e-dados-protegidos'],
      },
      {
        title: 'Containers antes de orquestração',
        lessonIds: ['docker-e-compose'],
      },
      {
        title: 'CI/CD e segurança de entrega',
        lessonIds: ['pipeline-de-entrega'],
      },
      {
        title: 'Nuvem e infraestrutura como código',
        lessonIds: ['conceitos-de-nuvem', 'terraform-e-estado'],
      },
      {
        title: 'Confiabilidade e operação',
        lessonIds: ['observabilidade-e-incidentes'],
      },
      {
        title: 'IA: programação em parceria',
        lessonIds: ['ia-planejar-implementar-revisar', 'ia-depuracao-com-evidencias'],
      },
      {
        title: 'IA: agentes, regras e verificação',
        lessonIds: ['ia-instrucoes-e-escopo-do-agente', 'ia-validar-trabalho-gerado'],
      },
      {
        title: 'Preparação para oportunidades',
        lessonIds: ['carreira-e-ia'],
      },
    ],
    groups: {
      'git-do-zero': 'curriculum.controle-de-versao',
      'como-a-web-funciona': 'curriculum.internet-e-http',
      'seu-kit-de-trabalho': 'curriculum.internet-e-http',
      'ia-assistente-de-estudos': 'aiLearning.seu-assistente-de-estudos',
      'linux-e-terminal': 'devops.linux-e-terminal',
      'redes-e-diagnostico': 'devops.redes-e-diagnostico',
      'python-do-zero': 'devops.shell-e-python',
      'python-listas-dicionarios-e-arquivos': 'devops.shell-e-python',
      'shell-scripts-e-automacao': 'devops.shell-e-python',
      'ia-prompts-para-aprender': 'aiLearning.prompts-para-aprender-e-construir',
      'ia-contexto-e-dados-protegidos': 'aiLearning.contexto-util-e-dados-protegidos',
      'docker-e-compose': 'devops.docker-e-compose',
      'pipeline-de-entrega': 'devops.pipeline-de-entrega',
      'conceitos-de-nuvem': 'devops.conceitos-de-nuvem',
      'terraform-e-estado': 'devops.terraform-e-estado',
      'observabilidade-e-incidentes': 'devops.observabilidade-e-incidentes',
      'ia-planejar-implementar-revisar': 'aiLearning.planejar-implementar-e-revisar',
      'ia-depuracao-com-evidencias': 'aiLearning.depuracao-com-evidencias',
      'ia-instrucoes-e-escopo-do-agente': 'aiLearning.instrucoes-do-projeto-e-escopo-do-agente',
      'ia-validar-trabalho-gerado': 'aiLearning.validar-trabalho-gerado-por-ia',
      'carreira-e-ia': 'curriculum.portfolio-e-candidatura',
    },
  },
  {
    id: 'data-engineer',
    title: 'Engenharia de Dados',
    modules: [
      {
        title: 'Comece com programação e dados',
        lessonIds: [
          'python-do-zero',
          'python-listas-dicionarios-e-arquivos',
          'python-para-dados',
          'git-do-zero',
          'carreira-em-dados',
          'ia-assistente-de-estudos',
        ],
      },
      {
        title: 'SQL antes de ferramentas distribuídas',
        lessonIds: ['sql-consultas', 'sql-tabelas-e-relacoes', 'sql-analitico'],
      },
      {
        title: 'IA: prompting e contexto',
        lessonIds: ['ia-prompts-para-aprender', 'ia-contexto-e-dados-protegidos'],
      },
      {
        title: 'Modelagem e armazenamento',
        lessonIds: ['modelagem-analitica-e-formatos'],
      },
      {
        title: 'Ingestão e transformação',
        lessonIds: ['pipelines-batch', 'transformacoes-com-dbt'],
      },
      {
        title: 'IA: programação em parceria',
        lessonIds: ['ia-planejar-implementar-revisar', 'ia-depuracao-com-evidencias'],
      },
      {
        title: 'Orquestração e confiabilidade',
        lessonIds: ['orquestracao-com-airflow', 'qualidade-e-governanca'],
      },
      {
        title: 'Entrega e armazenamento em nuvem',
        lessonIds: ['docker-e-compose', 'ci-e-publicacao', 'conceitos-de-nuvem'],
      },
      {
        title: 'IA: agentes, regras e verificação',
        lessonIds: ['ia-instrucoes-e-escopo-do-agente', 'ia-validar-trabalho-gerado'],
      },
      {
        title: 'Preparação para oportunidades',
        lessonIds: ['carreira-e-ia'],
      },
    ],
    groups: {
      'python-do-zero': 'dataEngineering.python-para-dados',
      'python-listas-dicionarios-e-arquivos': 'dataEngineering.python-para-dados',
      'python-para-dados': 'dataEngineering.python-para-dados',
      'git-do-zero': 'curriculum.controle-de-versao',
      'carreira-em-dados': 'dataEngineering.carreira-em-dados',
      'ia-assistente-de-estudos': 'aiLearning.seu-assistente-de-estudos',
      'sql-consultas': 'curriculum.sql-e-postgresql',
      'sql-tabelas-e-relacoes': 'curriculum.sql-e-postgresql',
      'sql-analitico': 'dataEngineering.sql-analitico',
      'ia-prompts-para-aprender': 'aiLearning.prompts-para-aprender-e-construir',
      'ia-contexto-e-dados-protegidos': 'aiLearning.contexto-util-e-dados-protegidos',
      'modelagem-analitica-e-formatos': 'dataEngineering.modelagem-analitica-e-formatos',
      'pipelines-batch': 'dataEngineering.pipelines-batch',
      'transformacoes-com-dbt': 'dataEngineering.transformacoes-com-dbt',
      'ia-planejar-implementar-revisar': 'aiLearning.planejar-implementar-e-revisar',
      'ia-depuracao-com-evidencias': 'aiLearning.depuracao-com-evidencias',
      'orquestracao-com-airflow': 'dataEngineering.orquestracao-com-airflow',
      'qualidade-e-governanca': 'dataEngineering.qualidade-e-governanca',
      'docker-e-compose': 'dataEngineering.containers-ci-e-nuvem',
      'ci-e-publicacao': 'dataEngineering.containers-ci-e-nuvem',
      'conceitos-de-nuvem': 'dataEngineering.containers-ci-e-nuvem',
      'ia-instrucoes-e-escopo-do-agente': 'aiLearning.instrucoes-do-projeto-e-escopo-do-agente',
      'ia-validar-trabalho-gerado': 'aiLearning.validar-trabalho-gerado-por-ia',
      'carreira-e-ia': 'curriculum.portfolio-e-candidatura',
    },
  },
  {
    id: 'test',
    title: 'Testes / QA',
    modules: [
      {
        title: 'Fundamentos de qualidade',
        lessonIds: ['fundamentos-de-teste', 'ia-assistente-de-estudos'],
      },
      {
        title: 'Investigação e desenho de testes',
        lessonIds: ['tecnicas-e-riscos', 'exploratorio-e-relato-de-bugs'],
      },
      {
        title: 'IA: prompting e contexto',
        lessonIds: ['ia-prompts-para-aprender', 'ia-contexto-e-dados-protegidos'],
      },
      {
        title: 'Base técnica para testar',
        lessonIds: [
          'como-a-web-funciona',
          'seu-kit-de-trabalho',
          'git-do-zero',
          'sql-consultas',
          'api-rest-e-contratos',
        ],
      },
      {
        title: 'Escolha uma linguagem',
        lessonIds: ['python-do-zero', 'python-listas-dicionarios-e-arquivos'],
      },
      {
        title: 'Automação de API e navegador',
        lessonIds: ['testes-de-api', 'playwright-para-web'],
      },
      {
        title: 'Qualidade contínua',
        lessonIds: ['ci-e-publicacao', 'estrategia-de-cobertura-e-ci', 'acessibilidade-para-todos'],
      },
      {
        title: 'IA: programação em parceria',
        lessonIds: ['ia-planejar-implementar-revisar', 'ia-depuracao-com-evidencias'],
      },
      {
        title: 'IA: agentes, regras e verificação',
        lessonIds: ['ia-instrucoes-e-escopo-do-agente', 'ia-validar-trabalho-gerado'],
      },
      {
        title: 'Preparação para oportunidades',
        lessonIds: ['carreira-e-ia'],
      },
    ],
    groups: {
      'fundamentos-de-teste': 'test.fundamentos-de-teste',
      'ia-assistente-de-estudos': 'aiLearning.seu-assistente-de-estudos',
      'tecnicas-e-riscos': 'test.tecnicas-e-riscos',
      'exploratorio-e-relato-de-bugs': 'test.testes-exploratorios-e-relato-de-bugs',
      'ia-prompts-para-aprender': 'aiLearning.prompts-para-aprender-e-construir',
      'ia-contexto-e-dados-protegidos': 'aiLearning.contexto-util-e-dados-protegidos',
      'como-a-web-funciona': 'curriculum.internet-e-http',
      'seu-kit-de-trabalho': 'curriculum.internet-e-http',
      'git-do-zero': 'curriculum.controle-de-versao',
      'sql-consultas': 'test.api-e-sql-basicos',
      'api-rest-e-contratos': 'test.api-e-sql-basicos',
      'python-do-zero': 'test.programacao-para-automacao',
      'python-listas-dicionarios-e-arquivos': 'test.programacao-para-automacao',
      'testes-de-api': 'test.testes-de-api',
      'playwright-para-web': 'test.playwright-para-web',
      'ci-e-publicacao': 'test.ci-e-estrategia-de-cobertura',
      'estrategia-de-cobertura-e-ci': 'test.ci-e-estrategia-de-cobertura',
      'acessibilidade-para-todos': 'curriculum.acessibilidade',
      'ia-planejar-implementar-revisar': 'aiLearning.planejar-implementar-e-revisar',
      'ia-depuracao-com-evidencias': 'aiLearning.depuracao-com-evidencias',
      'ia-instrucoes-e-escopo-do-agente': 'aiLearning.instrucoes-do-projeto-e-escopo-do-agente',
      'ia-validar-trabalho-gerado': 'aiLearning.validar-trabalho-gerado-por-ia',
      'carreira-e-ia': 'curriculum.portfolio-e-candidatura',
    },
  },
  {
    id: 'entrevistas',
    title: 'Entrevistas',
    modules: [
      {
        title: 'Prepare-se para uma vaga concreta',
        lessonIds: ['curriculo-vaga-e-apresentacao', 'ia-assistente-de-estudos'],
      },
      {
        title: 'Exercícios próximos ao trabalho',
        lessonIds: ['codigo-depuracao-e-revisao', 'http-dados-e-seguranca-na-entrevista'],
      },
      {
        title: 'Algoritmos essenciais',
        lessonIds: ['arrays-mapas-e-complexidade', 'raciocinio-e-comunicacao'],
      },
      {
        title: 'IA: prompting e contexto',
        lessonIds: ['ia-prompts-para-aprender', 'ia-contexto-e-dados-protegidos'],
      },
      {
        title: 'IA: simulação e feedback',
        lessonIds: ['ia-treinar-explicacao'],
      },
      {
        title: 'Preparação por especialidade',
        lessonIds: ['revise-a-carreira-escolhida', 'carreira-e-ia'],
      },
      {
        title: 'Processo seletivo e acompanhamento',
        lessonIds: ['desafio-tecnico-e-conversa'],
      },
    ],
    groups: {
      'curriculo-vaga-e-apresentacao': 'entrevistas.curriculo-vaga-e-apresentacao',
      'ia-assistente-de-estudos': 'aiLearning.seu-assistente-de-estudos',
      'codigo-depuracao-e-revisao': 'entrevistas.codigo-depuracao-e-revisao',
      'http-dados-e-seguranca-na-entrevista': 'entrevistas.http-dados-e-seguranca',
      'arrays-mapas-e-complexidade': 'entrevistas.arrays-mapas-e-complexidade',
      'raciocinio-e-comunicacao': 'entrevistas.raciocinio-e-comunicacao',
      'ia-prompts-para-aprender': 'aiLearning.prompts-para-aprender-e-construir',
      'ia-contexto-e-dados-protegidos': 'aiLearning.contexto-util-e-dados-protegidos',
      'ia-treinar-explicacao': 'aiLearning.treine-explicacao-e-raciocinio',
      'revise-a-carreira-escolhida': 'entrevistas.revise-a-carreira-escolhida',
      'carreira-e-ia': 'curriculum.ia-no-fluxo-de-trabalho',
      'desafio-tecnico-e-conversa': 'entrevistas.desafio-tecnico-e-conversa-com-a-equipe',
    },
  },
];
