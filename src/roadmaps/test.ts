import { withAILearning } from './aiLearning';
import { Level } from '../entity/RoadmapModel';
import { accessibility, career, git, project, topic, web } from './curriculum';
import { resources as r } from './resources';

export const data: Level[] = withAILearning(
  [
    {
      id: 'test.fundamentos-de-qualidade',
      label: 'Fundamentos de qualidade',
      description:
        'É possível começar por testes manuais e análise de produto. Automação vem depois de entender riscos, comportamento esperado e investigação de falhas.',
      items: [
        topic(
          'Fundamentos de teste',
          'Aprenda objetivos, princípios, níveis de teste, critérios de aceite e a colaboração de QA com produto e desenvolvimento. Certificação é opcional.',
          [r.istqb],
          'Explique a diferença entre defeito e falha e escreva critérios de aceite verificáveis para uma funcionalidade.',
          'test.fundamentos-de-teste',
        ),
      ],
    },
    {
      id: 'test.investigacao-e-desenho-de-testes',
      label: 'Investigação e desenho de testes',
      items: [
        topic(
          'Técnicas e riscos',
          'Use particionamento de equivalência, valores-limite, tabelas de decisão e testes de transição de estado. Priorize cenários pelo risco.',
          [r.istqb],
          'Crie casos para um formulário com limites de idade ou valor e justifique quais têm maior prioridade.',
          'test.tecnicas-e-riscos',
        ),
        topic(
          'Testes exploratórios e relato de bugs',
          'Escreva charters, registre evidências e reporte passos, ambiente, resultado esperado e observado. Ferramentas de gestão são alternativas, não pré-requisitos.',
          [r.istqb, r.contribute],
          'Faça uma sessão exploratória e produza um bug report que outra pessoa consiga reproduzir.',
          'test.testes-exploratorios-e-relato-de-bugs',
        ),
      ],
    },
    project(
      'Plano de testes e evidências',
      'Avalie uma aplicação local ou ambiente de demonstração autorizado. Defina riscos e execute testes manuais.',
      'Entregue charters, casos priorizados, evidências e relatórios reproduzíveis. Inclua um cenário negativo e uma conclusão sobre o risco restante.',
      [r.istqb],
      'test.plano-de-testes-e-evidencias',
    ),
    {
      id: 'test.base-tecnica-para-testar',
      label: 'Base técnica para testar',
      items: [
        web,
        git,
        topic(
          'API e SQL básicos',
          'Entenda JSON, status HTTP, autenticação e consultas SELECT/JOIN. Use requisições e banco de teste para conferir o estado do sistema.',
          [r.http, r.sql, r.playwrightApi],
          'Compare a resposta de uma API com os dados de um banco de laboratório e investigue uma divergência.',
          'test.api-e-sql-basicos',
        ),
      ],
    },
    {
      id: 'test.escolha-uma-linguagem',
      label: 'Escolha uma linguagem',
      description:
        'TypeScript combina com Playwright; Python é outra opção. Se sua equipe usa Java, Selenium ou outra stack, adapte a escolha mantendo os conceitos.',
      items: [
        topic(
          'Programação para automação',
          'Aprenda funções, coleções, condições, módulos, async/await, erros e depuração. Comece com scripts pequenos antes de frameworks de automação.',
          [r.jsCourse, r.js, r.ts, r.pythonCourse],
          'Escreva um script que valide uma resposta JSON e retorne erro quando faltar um campo obrigatório.',
          'test.programacao-para-automacao',
        ),
      ],
    },
    {
      id: 'test.automacao-de-api-e-navegador',
      label: 'Automação de API e navegador',
      items: [
        topic(
          'Testes de API',
          'Teste status, contrato, autenticação, autorização, validação e idempotência. Use dados isolados e configuração sem segredos versionados.',
          [r.playwrightApi, r.openapi],
          'Automatize um sucesso, uma entrada inválida e um acesso negado; limpe os dados criados pelo teste.',
          'test.testes-de-api',
        ),
        topic(
          'Playwright para web',
          'Use locators orientados ao usuário, assertions, fixtures e espera automática. Evite sleeps fixos, dependência entre testes e seletores frágeis.',
          [r.playwright],
          'Automatize o fluxo principal e investigue uma falha pelo trace. Rode o teste isoladamente e em conjunto.',
          'test.playwright-para-web',
        ),
      ],
    },
    {
      id: 'test.qualidade-continua',
      label: 'Qualidade contínua',
      items: [
        topic(
          'CI e estratégia de cobertura',
          'Combine testes unitários, integração e poucos fluxos completos. Execute a suíte em CI, investigue flakiness e trate a causa; retries não substituem correção.',
          [r.actions, r.playwright],
          'Faça a CI produzir um relatório e demonstre como diferenciar um bug do produto de uma falha do teste.',
          'test.ci-e-estrategia-de-cobertura',
        ),
        accessibility,
      ],
    },
    project(
      'Portfólio de QA',
      'Combine análise de risco, testes exploratórios e automação de API e web em um único repositório.',
      'Inclua plano, bug reports, fixtures isoladas, CI e instruções. Mostre uma falha encontrada e explique quais riscos sua suíte ainda não cobre.',
      [r.playwright, r.playwrightApi, r.actions],
      'test.portfolio-de-qa',
    ),
    career,
    {
      optional: true,
      id: 'test.especializacoes-opcionais',
      label: 'Especializações opcionais',
      description:
        'Escolha conforme o produto e a vaga. Não é preciso aprender todas as ferramentas de web, mobile e API.',
      items: [
        topic(
          'Desempenho, segurança e mobile',
          'Aprenda carga com k6 e análise de resultados; estude segurança em ambiente autorizado. Mobile, contratos e acessibilidade aprofundada são caminhos próprios.',
          [r.k6, r.security, r.accessibility],
          'Defina uma hipótese de desempenho para um serviço local e compare os resultados com um limite de aceitação explícito.',
          'test.desempenho-seguranca-e-mobile',
        ),
      ],
    },
  ],
  'test',
);
