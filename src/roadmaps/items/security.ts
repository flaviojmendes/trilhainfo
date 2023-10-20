import { LinkContentType } from '../../entity/RoadmapModel';

export const security = {
  items: [
    {
      label: 'Segurança',
      description:
        'A segurança da Web refere-se às medidas de proteção tomadas pelos desenvolvedores para proteger os aplicativos da Web de ameaças que podem afetar os negócios.',
      children: [
        { label: 'HTTPS', links: [] },
        {
          label: 'CORS',
          links: [
            {
              url: 'https://www.youtube.com/watch?v=GZV-FUdeVwE',
              label: 'Cross-Origin Resource Sharing em 6 minutos - Codigo Fonte TV',
              contentType: LinkContentType.WATCH,
            },
            {
              url: 'https://youtu.be/Fha6Il-5RYE',
              label:
                "O que é CORS - Resolvendo o erro No 'Access-Control-Allow-Origin' header is present  | Dias de Dev",
              contentType: LinkContentType.WATCH,
            },
          ],
        },
        { label: 'Content Security Policy', links: [] },
        {
          label: 'OWASP',
          links: [
            {
              url: 'https://www.youtube.com/watch?v=wC_epzVm780',
              label: 'Série OWASP Top 10 - Cássio B. Pereira',
              contentType: LinkContentType.WATCH,
            },
          ],
        },
        {
          label: 'Cookies',
          links: [
            {
              url: 'https://dias.dev/2022-09-27-cookies-e-seguranca/',
              label: 'Cookies e Segurança',
              contentType: LinkContentType.READ,
            },
          ],
        },
        {
          label: 'OAuth 2.0 and OpenID Connect',
          links: [
            {
              label: 'OAuth 2.0 and OpenID Connect (in plain English) - OktaDev',
              url: 'https://youtu.be/996OiexHze0',
              contentType: LinkContentType.WATCH,
            },
            {
              label: 'OAuth 2 // Dicionário do Programador - - Codigo Fonte TV',
              url: 'https://youtu.be/z-RuvnMlw34',
              contentType: LinkContentType.WATCH,
            },
          ],
        },
        {
          label: 'Autenticação e autorização',
          links: [
            {
              label: 'Logins seguros - Armazenando senhas corretamente | Dias de Dev',
              url: 'https://youtu.be/Qhk6xu53kho',
              contentType: LinkContentType.WATCH,
            },
            {
              label: 'Autenticação por Token | Dias de Dev',
              url: 'https://youtu.be/MZetkcs2xIo',
              contentType: LinkContentType.WATCH,
            },
            {
              label: 'Autenticação com JWT | Dias de Dev',
              url: 'https://youtu.be/B-7e-ZpIWAs',
              contentType: LinkContentType.WATCH,
            },
            {
              label:
                'Impedindo acesso indevido - Implementações de controle de acesso (ACL e RBAC) | Dias de Dev',
              url: 'https://youtu.be/AvcGteniPt4',
              contentType: LinkContentType.WATCH,
            },
            {
              label: 'Segurança em Login: Enumeração de usuários através de Timing Attack',
              url: 'https://youtu.be/M03zSDSa81k',
              contentType: LinkContentType.WATCH,
            },
          ],
        },
        {
          label: 'Criptografia',
          links: [
            {
              label: 'Algoritmos de Hash - Qual a diferença entre Hash e Encriptação | Dias de Dev',
              url: 'https://youtu.be/soTJbV8MxGU',
              contentType: LinkContentType.WATCH,
            },
            {
              label:
                'Hash é criptografia sim - Corrigindo os termos criptografia e encriptação | Dias de Dev',
              url: 'https://youtu.be/k9Z__lQPm-I',
              contentType: LinkContentType.WATCH,
            },
            {
              label:
                'Criptografia: Encriptação e decriptação na prática - Entenda sobre cifragem | Dias de Dev',
              url: 'https://youtu.be/4MCO-FgukcA',
              contentType: LinkContentType.WATCH,
            },
          ],
        },
        {
          label: 'Prevenção de ataques',
          links: [
            {
              label: 'Segurança da Informação: Evitando Cross-site scripting (XSS) | Dias de Dev',
              url: 'https://youtu.be/lntsVxPZibw',
              contentType: LinkContentType.WATCH,
            },
            {
              label: 'Ataque com Regex - Negação de serviço com expressões regulares | Dias de Dev',
              url: 'https://youtu.be/MEfgCLE3Dw8',
              contentType: LinkContentType.WATCH,
            },
          ],
        },
      ],
    },
  ],
};
