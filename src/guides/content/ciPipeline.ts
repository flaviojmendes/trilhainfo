import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'ideia',
      title: 'CI e CD em uma frase cada',
      blocks: [
        {
          type: 'terms',
          items: [
            {
              term: 'Integração contínua (CI)',
              text: 'A cada push ou pull request, um servidor instala, compila e testa o projeto do zero. Quebrou, todo mundo sabe em minutos.',
            },
            {
              term: 'Entrega contínua (CD)',
              text: 'O que passou na CI fica sempre pronto para publicar, com um clique ou automaticamente.',
            },
            {
              term: 'Pipeline',
              text: 'A sequência de etapas, cada uma só começa se a anterior passou.',
            },
          ],
        },
        {
          type: 'pyramid',
          caption: 'Um pipeline típico: do mais rápido ao mais caro',
          levels: [
            {
              title: 'Publicar',
              text: 'Gera o artefato, publica e confere se o serviço respondeu.',
            },
            { title: 'Testes de integração e ponta a ponta', text: 'Com banco e navegador reais.' },
            { title: 'Testes de unidade', text: 'Segundos. Pegam a maioria das regressões.' },
            { title: 'Lint, formatação e tipos', text: 'Falham primeiro e mais barato.' },
          ],
        },
      ],
    },
    {
      id: 'exemplo',
      title: 'Um workflow do GitHub Actions comentado',
      blocks: [
        {
          type: 'code',
          language: 'yaml',
          caption: '.github/workflows/ci.yml',
          code: 'name: CI\n\non:\n  pull_request:\n  push:\n    branches: [main]\n\njobs:\n  verificar:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 22\n          cache: npm          # reaproveita downloads\n\n      - run: npm ci          # instala exatamente o lockfile\n      - run: npm run lint\n      - run: npx tsc --noEmit\n      - run: npm test -- --run\n      - run: npm run build',
        },
        {
          type: 'list',
          items: [
            '`npm ci` em vez de `npm install`: usa o lockfile e falha se ele estiver desatualizado.',
            'Uma etapa com erro interrompe o job e marca o pull request com um X vermelho.',
            'Proteja a `main` exigindo que esse job passe antes do merge.',
          ],
        },
      ],
    },
    {
      id: 'segredos',
      title: 'Configuração e segredos',
      blocks: [
        {
          type: 'code',
          language: 'yaml',
          caption: 'Segredos vêm do cofre do repositório, nunca do código',
          code: '      - run: npm run deploy\n        env:\n          DATABASE_URL: ${{ secrets.DATABASE_URL }}\n          API_KEY: ${{ secrets.API_KEY }}',
        },
        {
          type: 'table',
          caption: 'Onde fica cada coisa',
          head: ['Tipo', 'Exemplo', 'Onde guardar'],
          rows: [
            [
              'Configuração pública',
              'URL da API, nível de log',
              'Variáveis do ambiente ou arquivo versionado',
            ],
            ['Segredo', 'Senha do banco, chave de API', 'Secrets da CI ou um cofre de segredos'],
            [
              'Exemplo para quem chega',
              'Nomes das variáveis, sem valores',
              '`.env.example` versionado',
            ],
            [
              'Valores locais',
              'Sua chave de desenvolvimento',
              '`.env` fora do Git, no `.gitignore`',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Vazou? Troque.',
          text: 'Apagar um segredo do repositório não basta: ele continua no histórico e pode ter sido copiado. Revogue a chave e gere outra.',
        },
      ],
    },
    {
      id: 'boas-praticas',
      title: 'Um pipeline em que dá para confiar',
      blocks: [
        {
          type: 'table',
          caption: 'Sintomas e o que fazer',
          head: ['Sintoma', 'O que fazer'],
          rows: [
            [
              'A CI demora mais de 10 minutos',
              'Cache de dependências, jobs em paralelo, testes lentos só na `main`',
            ],
            [
              'Teste que falha "às vezes"',
              'Trate como bug: isole, corrija ou remova. Não normalize rodar de novo',
            ],
            [
              'Passa na CI e falha em produção',
              'Mesma versão de runtime, mesmas variáveis, mesmo artefato nos dois',
            ],
            [
              'Ninguém sabe o que foi publicado',
              'Marque o artefato com o hash do commit e registre cada publicação',
            ],
          ],
        },
        {
          type: 'checklist',
          id: 'ci',
          items: [
            'Todo pull request roda lint, tipos, testes e build.',
            'A `main` só aceita merge com a CI verde.',
            'Instalação reprodutível com lockfile e `npm ci`.',
            'Nenhum segredo no código ou nos logs.',
            'O que é publicado é o mesmo artefato que foi testado.',
            'Existe um jeito documentado de voltar para a versão anterior.',
          ],
        },
      ],
    },
  ],
  sources: [
    {
      title: 'GitHub Actions: guia rápido',
      url: 'https://docs.github.com/pt/actions/writing-workflows/quickstart',
    },
    {
      title: 'GitHub Actions: segredos',
      url: 'https://docs.github.com/pt/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions',
    },
    {
      title: 'Martin Fowler: integração contínua',
      url: 'https://martinfowler.com/articles/continuousIntegration.html',
    },
    { title: 'The Twelve-Factor App: configuração', url: 'https://12factor.net/pt_br/config' },
  ],
};
