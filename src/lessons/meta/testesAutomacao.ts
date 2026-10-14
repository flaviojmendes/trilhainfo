import { LessonMeta } from '../types';

const updatedAt = '2026-10-14';

export const lessons: LessonMeta[] = [
  {
    id: 'testes-de-api',
    title: 'Testes de API',
    summary:
      'Como conferir status, corpo, cabeçalhos, erros e permissões de uma API com testes automatizados e isolados.',
    minutes: 16,
    groupIds: ['test.testes-de-api'],
    objectives: [
      'Conferir status, cabeçalhos, campos e tipos de uma resposta HTTP',
      'Explorar uma API com `curl` e transformar as verificações em asserções no código',
      'Testar entradas inválidas, falta de login (`401`) e falta de permissão (`403`) sem vazamento de dados',
      'Explicar o que é um contrato de API e o que um teste de contrato protege',
      'Escrever testes isolados que criam e limpam os próprios dados e leem segredos de variáveis de ambiente',
    ],
    updatedAt,
    load: () => import('../content/testesDeApi'),
  },
  {
    id: 'playwright-para-web',
    title: 'Playwright para web',
    summary:
      'Como automatizar jornadas completas no navegador com Playwright, sem esperas fixas nem seletores frágeis, e investigar falhas pelo trace.',
    minutes: 16,
    groupIds: ['test.playwright-para-web', 'fullstack.testes-de-ponta-a-ponta'],
    objectives: [
      'Explicar o que um teste de ponta a ponta prova e escolher quais jornadas merecem um',
      'Escrever um teste Playwright com `page.goto`, `getByRole`, `fill`, `click` e `expect`',
      'Trocar esperas fixas e seletores CSS por espera automática e localizadores orientados à pessoa usuária',
      'Usar fixtures para manter cada teste isolado e independente da ordem',
      'Ler a saída de `npx playwright test` e usar trace e relatório para separar bug do produto de teste instável',
    ],
    updatedAt,
    load: () => import('../content/playwrightParaWeb'),
  },
  {
    id: 'estrategia-de-cobertura-e-ci',
    title: 'Estratégia de cobertura e CI',
    summary:
      'Como decidir o que testar em cada nível, interpretar a cobertura sem se enganar e fazer a CI rodar a suíte com relatórios confiáveis.',
    minutes: 16,
    groupIds: ['test.ci-e-estrategia-de-cobertura'],
    objectives: [
      'Comparar pirâmide e troféu de testes e reconhecer uma suíte desequilibrada',
      'Priorizar o que automatizar usando risco e frequência',
      'Explicar por que 100% de cobertura não garante ausência de bugs',
      'Montar um workflow que roda testes em jobs e shards e guarda relatórios como artefatos',
      'Tratar testes instáveis com quarentena e diferenciar bug do produto, falha do teste e falha de ambiente',
    ],
    updatedAt,
    load: () => import('../content/estrategiaDeCoberturaECi'),
  },
];
