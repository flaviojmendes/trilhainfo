import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'ideia',
      title: 'Um login, vários sistemas',
      blocks: [
        {
          type: 'text',
          text: '**Single Sign-On (SSO)** permite entrar uma vez e acessar vários sistemas independentes sem digitar a senha de novo. Você entra no Gmail e já está autenticado no Google Docs, no Calendar e no YouTube.',
        },
        {
          type: 'text',
          text: 'Para isso, os sistemas deixam de verificar senhas por conta própria e **confiam em um provedor central de identidade**. Nas empresas, o padrão mais antigo e comum para isso é o **SAML 2.0**.',
        },
      ],
    },
    {
      id: 'atores',
      title: 'Os três papéis',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              label: 'Usuário',
              title: 'Quem quer acessar',
              text: 'Usa um navegador, que leva as mensagens de um lado para o outro.',
            },
            {
              label: 'IdP',
              title: 'Provedor de identidade',
              text: 'Autentica a pessoa e diz quem ela é e a quais grupos pertence. Exemplos: Okta, Microsoft Entra ID, Keycloak.',
            },
            {
              label: 'SP',
              title: 'Provedor de serviço',
              text: 'A aplicação que a pessoa quer usar. Confia no IdP em vez de guardar senhas.',
            },
          ],
        },
      ],
    },
    {
      id: 'fluxo',
      title: 'O fluxo SAML, passo a passo',
      blocks: [
        {
          type: 'sequence',
          caption: 'Login iniciado pelo provedor de serviço (o fluxo mais comum)',
          actors: ['Navegador', 'Aplicação (SP)', 'Identidade (IdP)'],
          messages: [
            { from: 0, to: 1, label: 'Acessa a aplicação', text: 'Ainda sem sessão.' },
            {
              from: 1,
              to: 0,
              label: 'Redireciona para o IdP',
              text: 'Leva um `AuthnRequest` dizendo quem está pedindo.',
            },
            { from: 0, to: 2, label: 'Entrega o pedido ao IdP' },
            {
              from: 2,
              to: 2,
              label: 'Autentica',
              text: 'Senha, segundo fator ou sessão que já existe.',
            },
            {
              from: 2,
              to: 0,
              label: 'Devolve a asserção SAML',
              text: 'Um XML **assinado** com a identidade e os atributos.',
            },
            {
              from: 0,
              to: 1,
              label: 'Envia a asserção',
              text: 'Por POST para o endereço da aplicação.',
            },
            {
              from: 1,
              to: 1,
              label: 'Valida e cria a sessão',
              text: 'Confere assinatura, validade e destinatário.',
              tone: 'ok',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Por que o segundo sistema não pede senha',
          text: 'No próximo SP, os passos 1 a 3 se repetem, mas o IdP já tem uma sessão sua. Ele pula o passo 4 e devolve a asserção na hora.',
        },
      ],
    },
    {
      id: 'saml-ou-oidc',
      title: 'SAML ou OpenID Connect?',
      blocks: [
        {
          type: 'table',
          caption: 'Os dois protocolos mais usados para SSO',
          head: ['', 'SAML 2.0', 'OpenID Connect'],
          rows: [
            ['Formato', 'XML assinado', 'JSON (ID token em JWT)'],
            ['Base', 'Padrão próprio, de 2005', 'Camada sobre OAuth 2.0'],
            ['Onde aparece', 'Sistemas corporativos e legados', 'Aplicações web e mobile novas'],
            ['Login social', 'Raro', 'Comum ("Entrar com Google")'],
          ],
        },
        {
          type: 'text',
          text: 'Se você vai integrar uma aplicação nova, comece por **OpenID Connect**. Aprenda SAML quando um cliente corporativo exigir.',
        },
      ],
    },
  ],
  sources: [
    {
      title: 'OASIS: visão técnica do SAML 2.0',
      url: 'https://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html',
    },
    {
      title: 'OpenID Foundation: como o OpenID Connect funciona',
      url: 'https://openid.net/developers/how-connect-works/',
    },
  ],
};
