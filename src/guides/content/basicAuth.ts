import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'como-funciona',
      title: 'Como funciona',
      blocks: [
        {
          type: 'text',
          text: 'Na autenticação básica, o cliente envia **usuário e senha em cada requisição**, no cabeçalho `Authorization`. Os dois são unidos por `:` e codificados em **Base64**.',
        },
        {
          type: 'code',
          language: 'http',
          caption: 'Requisição com credenciais',
          code: 'GET /trilhas HTTP/1.1\nHost: api.trilha.info\nAuthorization: Basic YW5hOnMzbmg0LWZvcnRl',
          output: 'Decodificando o Base64: ana:s3nh4-forte',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Base64 não é criptografia',
          text: 'Qualquer pessoa que veja o cabeçalho recupera a senha em um segundo. Basic Auth **só é aceitável com HTTPS**, que cifra a conexão inteira.',
        },
      ],
    },
    {
      id: 'fluxo',
      title: 'O fluxo no navegador',
      blocks: [
        {
          type: 'sequence',
          caption: 'Primeiro acesso a um recurso protegido por Basic Auth',
          actors: ['Navegador', 'Servidor'],
          messages: [
            { from: 0, to: 1, label: 'GET /trilhas', text: 'Sem o cabeçalho Authorization.' },
            {
              from: 1,
              to: 0,
              label: '401 Unauthorized',
              text: 'Com `WWW-Authenticate: Basic realm="Trilha Info"`.',
              tone: 'error',
            },
            { from: 0, to: 0, label: 'Janela de login', text: 'O navegador pede usuário e senha.' },
            {
              from: 0,
              to: 1,
              label: 'GET /trilhas + Authorization',
              text: '`Basic` seguido do Base64.',
            },
            {
              from: 1,
              to: 1,
              label: 'Confere as credenciais',
              text: 'Compara com o hash guardado.',
            },
            { from: 1, to: 0, label: '200 OK', text: 'Devolve o conteúdo.', tone: 'ok' },
          ],
        },
        {
          type: 'text',
          text: 'Depois do primeiro login, o navegador **reenvia o cabeçalho automaticamente** para o mesmo domínio. Não existe "sair" de verdade: as credenciais ficam guardadas até o navegador ser fechado.',
        },
      ],
    },
    {
      id: 'quando-usar',
      title: 'Quando faz sentido',
      blocks: [
        {
          type: 'cards',
          items: [
            {
              label: 'Serve bem',
              title: 'Ferramentas internas e integrações simples',
              text: 'Comunicação entre serviços, ambientes de teste ou um painel interno, sempre com HTTPS.',
              points: ['Fácil de testar com `curl -u usuario:senha`', 'Sem estado no servidor'],
            },
            {
              label: 'Evite',
              title: 'Login de usuários finais',
              text: 'Para pessoas usando sua aplicação, prefira sessões com cookie ou um provedor com OAuth 2.0 e OpenID Connect.',
              points: [
                'A senha trafega em toda requisição',
                'Sem logout, expiração ou segundo fator',
                'Interface de login do navegador não é personalizável',
              ],
            },
          ],
        },
        {
          type: 'terms',
          items: [
            {
              term: '401 Unauthorized',
              text: 'Falta autenticação ou ela é inválida. O servidor deve enviar `WWW-Authenticate`.',
            },
            {
              term: '403 Forbidden',
              text: 'A pessoa foi identificada, mas **não tem permissão** para o recurso.',
            },
          ],
        },
      ],
    },
  ],
  sources: [
    { title: 'RFC 7617: o esquema Basic', url: 'https://datatracker.ietf.org/doc/html/rfc7617' },
    {
      title: 'MDN: autenticação HTTP',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Authentication',
    },
    {
      title: 'OWASP: armazenamento de senhas',
      url: 'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html',
    },
  ],
};
