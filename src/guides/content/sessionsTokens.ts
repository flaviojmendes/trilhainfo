import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'duas-perguntas',
      title: 'Duas perguntas diferentes',
      blocks: [
        {
          type: 'terms',
          items: [
            {
              term: 'Autenticação',
              text: '**Quem é você?** Confirmar a identidade com senha, código, chave de acesso ou um provedor externo.',
            },
            {
              term: 'Autorização',
              text: '**O que você pode fazer?** Decidir, a cada requisição, se aquela pessoa pode ler ou alterar aquele recurso.',
            },
          ],
        },
        {
          type: 'text',
          text: 'O HTTP não guarda memória entre requisições. Depois do login, a aplicação precisa de uma forma de reconhecer a pessoa nas próximas chamadas. As duas mais comuns são uma **sessão no servidor** e um **token** carregado pelo cliente.',
        },
      ],
    },
    {
      id: 'sessao',
      title: 'Sessão com cookie',
      blocks: [
        {
          type: 'sequence',
          caption: 'Login com sessão guardada no servidor',
          actors: ['Navegador', 'Servidor', 'Armazém de sessões'],
          messages: [
            { from: 0, to: 1, label: 'POST /login', text: 'E-mail e senha, por HTTPS.' },
            { from: 1, to: 1, label: 'Confere o hash da senha' },
            { from: 1, to: 2, label: 'Cria a sessão', text: 'Um id aleatório ligado ao usuário.' },
            {
              from: 1,
              to: 0,
              label: '200 + Set-Cookie',
              text: 'O cookie leva só o id da sessão.',
              tone: 'ok',
            },
            { from: 0, to: 1, label: 'GET /perfil', text: 'O navegador envia o cookie sozinho.' },
            { from: 1, to: 2, label: 'Busca a sessão pelo id' },
            { from: 1, to: 0, label: '200 OK', tone: 'ok' },
          ],
        },
        {
          type: 'code',
          language: 'http',
          code: 'Set-Cookie: sid=3f9a1c…; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=86400',
        },
        {
          type: 'terms',
          items: [
            {
              term: '`HttpOnly`',
              text: 'O JavaScript da página não consegue ler o cookie. Um script injetado não rouba a sessão.',
            },
            { term: '`Secure`', text: 'O cookie só viaja por HTTPS.' },
            {
              term: '`SameSite=Lax`',
              text: 'O cookie não acompanha requisições disparadas por outros sites, o que reduz ataques de CSRF.',
            },
          ],
        },
      ],
    },
    {
      id: 'jwt',
      title: 'Tokens JWT',
      blocks: [
        {
          type: 'text',
          text: 'Um **JWT** (JSON Web Token) carrega os dados da pessoa dentro do próprio token, com uma **assinatura**. O servidor confere a assinatura e a validade sem consultar um banco.',
        },
        {
          type: 'code',
          language: 'jwt',
          caption: 'Cabeçalho, conteúdo e assinatura, separados por ponto',
          code: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\n.eyJzdWIiOiI0MiIsInJvbGUiOiJhbHVubyIsImV4cCI6MTc5ODc2MTYwMH0\n.assinatura…',
          output:
            '{ "alg": "HS256", "typ": "JWT" }\n{ "sub": "42", "role": "aluno", "exp": 1798761600 }',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Assinado não é secreto',
          text: 'Qualquer um decodifica o conteúdo de um JWT. Nunca coloque dados sensíveis nele. A assinatura só garante que ninguém **alterou** o conteúdo.',
        },
        {
          type: 'list',
          items: [
            'Valide sempre assinatura, algoritmo esperado, `exp`, `iss` e `aud`. Rejeite `alg: none`.',
            'Use validade curta para o token de acesso e um **refresh token** para renovar.',
            'No navegador, prefira guardar o token em um cookie `HttpOnly`. Em `localStorage`, qualquer script da página consegue lê-lo.',
          ],
        },
        {
          type: 'table',
          caption: 'Sessão ou JWT',
          head: ['', 'Sessão no servidor', 'JWT'],
          rows: [
            ['Onde fica o estado', 'No servidor', 'No próprio token'],
            [
              'Encerrar o acesso agora',
              'Simples: apague a sessão',
              'Difícil: o token vale até expirar',
            ],
            [
              'Vários serviços',
              'Precisam do mesmo armazém de sessões',
              'Cada um valida a assinatura sozinho',
            ],
            [
              'Bom para',
              'Aplicações web no mesmo domínio',
              'APIs, apps mobile, comunicação entre serviços',
            ],
          ],
        },
      ],
    },
    {
      id: 'oauth',
      title: 'OAuth 2.0: delegar acesso',
      blocks: [
        {
          type: 'text',
          text: '**OAuth 2.0** resolve outro problema: permitir que uma aplicação acesse algo **em seu nome**, sem receber sua senha. É o que acontece quando um app pede acesso ao seu calendário. O botão "Entrar com Google" usa o **OpenID Connect**, uma camada sobre o OAuth que também informa quem é você.',
        },
        {
          type: 'sequence',
          caption: 'Fluxo Authorization Code com PKCE, o recomendado hoje',
          actors: ['Navegador', 'Aplicação', 'Autorização', 'API'],
          messages: [
            {
              from: 1,
              to: 0,
              label: 'Redireciona para /authorize',
              text: 'Com `client_id`, `scope`, `state` e `code_challenge`.',
            },
            { from: 0, to: 2, label: 'Abre a página de login' },
            {
              from: 2,
              to: 2,
              label: 'Login e consentimento',
              text: 'A pessoa vê o que está autorizando.',
            },
            { from: 2, to: 0, label: 'Volta com ?code=…', text: 'Um código de uso único.' },
            { from: 0, to: 1, label: 'Entrega o código' },
            { from: 1, to: 2, label: 'POST /token', text: 'Código + `code_verifier`.' },
            {
              from: 2,
              to: 1,
              label: 'access_token',
              text: 'E, opcionalmente, um refresh token.',
              tone: 'ok',
            },
            { from: 1, to: 3, label: 'Authorization: Bearer …', text: 'Só no escopo autorizado.' },
          ],
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Escopo',
              text: 'O que a aplicação pode fazer, como `calendar.read`. Peça só o necessário.',
            },
            {
              term: '`state`',
              text: 'Valor aleatório que volta no redirecionamento. Confirma que a resposta é para o pedido que você fez.',
            },
            {
              term: 'PKCE',
              text: 'A aplicação cria um segredo de uso único e envia só o hash dele no início. Quem interceptar o código não consegue trocá-lo por um token.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Os fluxos Implicit e Resource Owner Password estão desaconselhados pela RFC 9700. Em tutoriais antigos, troque-os por Authorization Code com PKCE.',
        },
      ],
    },
    {
      id: 'escolha',
      title: 'Qual usar no seu projeto',
      blocks: [
        {
          type: 'table',
          caption: 'Pontos de partida razoáveis',
          head: ['Cenário', 'Abordagem'],
          rows: [
            ['Aplicação web e API no mesmo domínio', 'Sessão com cookie `HttpOnly`'],
            ['App mobile ou API usada por terceiros', 'Tokens de acesso curtos via OAuth 2.0'],
            ['"Entrar com Google ou GitHub"', 'OpenID Connect'],
            ['Um serviço chamando outro', 'Client credentials ou certificados (mTLS)'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text: 'Em produção, não implemente autenticação do zero. Use uma biblioteca madura do seu framework ou um provedor de identidade, e concentre seu código na **autorização**: quem pode fazer o quê.',
        },
      ],
    },
  ],
  sources: [
    {
      title: 'OWASP: gerenciamento de sessões',
      url: 'https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html',
    },
    {
      title: 'OWASP: autenticação',
      url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html',
    },
    { title: 'RFC 7519: JSON Web Token', url: 'https://datatracker.ietf.org/doc/html/rfc7519' },
    {
      title: 'RFC 9700: boas práticas de segurança para OAuth 2.0',
      url: 'https://datatracker.ietf.org/doc/html/rfc9700',
    },
    {
      title: 'MDN: o cabeçalho Set-Cookie',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Set-Cookie',
    },
  ],
};
