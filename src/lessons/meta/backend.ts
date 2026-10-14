import { LessonMeta } from '../types';

const updatedAt = '2026-10-14';

export const lessons: LessonMeta[] = [
  {
    id: 'api-rest-e-contratos',
    title: 'API REST e contratos',
    summary:
      'Como pedir e responder numa API: recursos, métodos, status, JSON, paginação, validação e o contrato que une backend, frontend e testes.',
    minutes: 16,
    groupIds: [
      'backend.api-rest-e-contratos',
      'test.api-e-sql-basicos',
      'fullstack.integracao-http',
    ],
    objectives: [
      'Escolher o método e o status HTTP certos para cada operação de uma API REST',
      'Fazer requisições com curl e interpretar status, cabeçalhos e corpo JSON',
      'Explicar idempotência e por que um POST repetido pode duplicar dados',
      'Implementar paginação com limite e validação com mensagens de erro consistentes',
      'Ler um contrato OpenAPI e diferenciar mudanças compatíveis de incompatíveis',
    ],
    updatedAt,
    load: () => import('../content/apiRestEContratos'),
  },
  {
    id: 'banco-acesso-e-migracoes',
    title: 'Acesso a dados e migrações',
    summary:
      'Ligar a API ao banco com segurança: consultas parametrizadas, repositórios, ORM, transações e migrações versionadas.',
    minutes: 16,
    groupIds: ['backend.acesso-a-dados-e-migracoes'],
    objectives: [
      'Descrever o caminho de uma requisição da API até o banco e de volta',
      'Demonstrar um SQL injection e evitá-lo com consultas parametrizadas',
      'Identificar o problema N+1 e resolvê-lo com uma única consulta com JOIN',
      'Usar uma transação e desfazê-la com ROLLBACK',
      'Aplicar e desfazer migrações versionadas num banco vazio',
    ],
    updatedAt,
    load: () => import('../content/bancoAcessoEMigracoes'),
  },
  {
    id: 'autenticacao-e-autorizacao',
    title: 'Autenticação e autorização',
    summary:
      'Quem é você e o que pode fazer: senhas com hash, sessões, cookies, JWT e regras que impedem uma pessoa de ver os dados de outra.',
    minutes: 16,
    groupIds: ['backend.autenticacao-e-autorizacao', 'fullstack.sessoes-e-permissoes'],
    objectives: [
      'Diferenciar autenticação de autorização e escolher entre 401 e 403',
      'Guardar senhas com hash e sal em vez de texto',
      'Comparar sessão com cookie e token JWT, configurando HttpOnly, Secure e SameSite',
      'Escrever uma regra de acesso por papel e por dono do recurso',
      'Testar uma API sem login e com permissões insuficientes',
    ],
    updatedAt,
    load: () => import('../content/autenticacaoEAutorizacao'),
  },
  {
    id: 'testes-de-backend',
    title: 'Testes de backend e design simples',
    summary:
      'Escrever testes que pegam bugs de verdade, combinar unidade, integração e contrato, e separar a regra de negócio do HTTP.',
    minutes: 15,
    groupIds: ['backend.testes-e-design-simples'],
    objectives: [
      'Escrever testes no formato organizar, agir, verificar que detectam um bug',
      'Classificar testes em unidade, integração, contrato e ponta a ponta',
      'Usar fakes e espiões para isolar dependências externas',
      'Separar a regra de negócio da rota HTTP para torná-la testável',
      'Rodar uma suíte com pytest e interpretar uma falha',
    ],
    updatedAt,
    load: () => import('../content/testesDeBackend'),
  },
];
