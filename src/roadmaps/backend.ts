import { withAILearning } from './aiLearning';
import { Level } from '../entity/RoadmapModel';
import { career, delivery, git, project, sql, topic, web } from './curriculum';
import { resources as r } from './resources';

export const data: Level[] = withAILearning(
  [
    {
      label: 'Fundamentos de desenvolvimento',
      description:
        'Comece por lógica, Git e HTTP. HTML e CSS básicos ajudam a entender o cliente, mas dominar frontend não é pré-requisito para backend.',
      items: [git, web],
    },
    {
      label: 'Escolha uma linguagem e uma stack',
      description:
        'Escolha uma opção conforme seus objetivos e as vagas locais. Faça todo o primeiro projeto na mesma stack; não estude todas em paralelo.',
      items: [
        topic(
          'Uma linguagem de backend',
          'Opções: TypeScript com Node.js, Python com FastAPI, Java com Spring ou C# com ASP.NET Core. Pratique funções, coleções, erros, módulos, testes e depuração.',
          [r.jsCourse, r.js, r.ts, r.node, r.pythonCourse, r.python, r.java, r.dotnet],
          'Construa um programa de linha de comando com validação, persistência em arquivo e testes na linguagem escolhida.',
        ),
      ],
    },
    project(
      'Programa com regras de negócio',
      'Implemente um controle de despesas no terminal, separando entrada, regras e armazenamento.',
      'Teste valores inválidos e regras de cálculo, trate erros de arquivo e documente como rodar e depurar.',
      [r.node, r.python, r.java, r.dotnet],
    ),
    { label: 'Persistência relacional', items: [sql] },
    {
      label: 'Primeira API',
      items: [
        topic(
          'API REST e contratos',
          'Use um framework da stack escolhida. Entenda rotas, status, validação de dados, paginação, erros consistentes e OpenAPI.',
          [r.node, r.fastapi, r.spring, r.aspnet, r.openapi],
          'Crie endpoints de despesas com validação e documentação; demonstre respostas de sucesso e erro.',
        ),
        topic(
          'Acesso a dados e migrações',
          'Use consultas parametrizadas, transações e migrações versionadas. Um ORM ajuda, mas você precisa entender o SQL produzido.',
          [r.postgres, r.security],
          'Aplique uma migração em um banco vazio, teste rollback de uma transação e explique como evitar SQL injection.',
        ),
      ],
    },
    project(
      'API com banco de dados',
      'Conecte a API de despesas ao PostgreSQL e documente o contrato.',
      'Inclua CRUD, paginação, migrações reproduzíveis e testes de integração com banco de teste. Demonstre validação e conflitos de dados.',
      [r.postgres, r.openapi, r.playwrightApi],
    ),
    {
      label: 'Segurança e qualidade',
      items: [
        topic(
          'Autenticação e autorização',
          'Diferencie identidade e permissões. Aprenda hash seguro de senha, sessão/cookies, tokens, TLS, CORS, CSRF, limites de requisição e gestão de segredos. Prefira bibliotecas mantidas.',
          [r.security, r.http],
          'Garanta que uma pessoa não leia nem altere despesas de outra; teste acesso sem sessão e com permissões insuficientes.',
        ),
        topic(
          'Testes e design simples',
          'Separe regras de negócio do transporte HTTP. Teste unidades, integração e contrato; use um monólito modular antes de microserviços.',
          [r.pytest, r.vitest, r.playwrightApi],
          'Teste regras, banco e endpoints com dados isolados e justifique os limites dos módulos.',
        ),
      ],
    },
    {
      label: 'Execução e operação',
      items: [
        topic(
          'Containers e observabilidade',
          'Aprenda Docker, health checks, logs estruturados, métricas e backups. Identifique falhas antes de adicionar infraestrutura.',
          [r.docker, r.compose, r.otel],
          'Rode API e banco em Compose, investigue uma falha por logs e demonstre restauração de um backup.',
        ),
        delivery,
      ],
    },
    project(
      'Serviço pronto para demonstração',
      'Entregue a API com acesso por usuário, banco, documentação, testes e execução reproduzível.',
      'A CI valida a aplicação; README descreve configuração sem segredos, decisões, limites e recuperação. Disponibilize uma demo local ou hospedada com custos conhecidos.',
      [r.compose, r.actions, r.security],
    ),
    career,
    {
      label: 'Escala e especialização opcionais',
      description:
        'Estude quando o projeto ou a vaga exigir. GraphQL, bancos em grafos e mecanismos de busca não são requisitos universais de entrada.',
      items: [
        topic(
          'Cache, filas e sistemas distribuídos',
          'Explore invalidação de cache, jobs, retries, idempotência e consistência. Meça a necessidade antes de separar serviços.',
          [r.sre, r.kafka],
          'Implemente uma tarefa assíncrona idempotente e documente o que acontece em caso de repetição e falha.',
        ),
        topic(
          'Arquitetura e escalabilidade',
          'Compare escalabilidade vertical e horizontal, gargalos de banco, custo e observabilidade. Discuta trade-offs a partir de medições.',
          [r.sre, r.otel],
          'Meça um gargalo e proponha uma melhoria com seus custos e limitações.',
        ),
      ],
    },
  ],
  'backend',
);
