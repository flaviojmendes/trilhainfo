import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'o-erro',
      title: 'O erro que todo mundo encontra',
      blocks: [
        {
          type: 'code',
          language: 'text',
          caption: 'Console do navegador',
          code: "Access to fetch at 'https://api.loja.com/pedidos' from origin\n'http://localhost:5173' has been blocked by CORS policy:\nNo 'Access-Control-Allow-Origin' header is present.",
        },
        {
          type: 'text',
          text: 'A requisição **chegou** ao servidor e ele **respondeu**. Quem bloqueou foi o navegador, que não entregou a resposta ao seu JavaScript porque o servidor não autorizou essa origem. Por isso o mesmo endpoint funciona no curl, no Postman e no backend, mas falha na página.',
        },
      ],
    },
    {
      id: 'origem',
      title: 'Origem e a política de mesma origem',
      blocks: [
        {
          type: 'text',
          text: 'A **origem** é a combinação de esquema, domínio e porta. Por segurança, o navegador só deixa um script ler respostas da mesma origem da página, a não ser que o outro servidor diga que aceita.',
        },
        {
          type: 'table',
          caption: 'Comparando com a página https://loja.com',
          head: ['Endereço', 'Mesma origem?', 'Motivo'],
          rows: [
            ['`https://loja.com/api`', 'Sim', 'Só o caminho muda'],
            ['`http://loja.com`', 'Não', 'Esquema diferente'],
            ['`https://api.loja.com`', 'Não', 'Subdomínio diferente'],
            ['`https://loja.com:8443`', 'Não', 'Porta diferente'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'CORS não protege o servidor',
          text: 'Ele protege a **pessoa usuária**: impede que um site qualquer leia, com os cookies dela, dados de outro site. Qualquer programa fora do navegador ignora o CORS. Autenticação e autorização continuam sendo necessárias.',
        },
      ],
    },
    {
      id: 'preflight',
      title: 'Como o navegador pede permissão',
      blocks: [
        {
          type: 'text',
          text: 'Requisições que podem mudar algo, ou que levam cabeçalhos como `Authorization` e `Content-Type: application/json`, passam antes por um **preflight**: uma requisição `OPTIONS` perguntando se pode.',
        },
        {
          type: 'sequence',
          caption: 'Um POST com JSON de localhost:5173 para api.loja.com',
          actors: ['Navegador', 'API'],
          messages: [
            {
              from: 0,
              to: 1,
              label: 'OPTIONS /pedidos',
              text: 'Origin: http://localhost:5173 · Access-Control-Request-Method: POST · Access-Control-Request-Headers: content-type, authorization',
            },
            {
              from: 1,
              to: 0,
              label: '204 No Content',
              text: 'Access-Control-Allow-Origin: http://localhost:5173 · Allow-Methods: GET, POST · Allow-Headers: content-type, authorization',
              tone: 'ok',
            },
            {
              from: 0,
              to: 1,
              label: 'POST /pedidos',
              text: 'A requisição real, com o corpo JSON.',
            },
            {
              from: 1,
              to: 0,
              label: '201 Created',
              text: 'Precisa repetir Access-Control-Allow-Origin, senão o navegador esconde a resposta.',
              tone: 'ok',
            },
          ],
        },
      ],
    },
    {
      id: 'corrigir',
      title: 'Como corrigir',
      blocks: [
        {
          type: 'code',
          language: 'javascript',
          caption: 'Express com o pacote cors: libere só as origens que você conhece',
          code: "import cors from 'cors';\n\nconst origens = ['https://loja.com', 'http://localhost:5173'];\n\napp.use(\n  cors({\n    origin: origens,\n    credentials: true, // só se usar cookies\n  }),\n);",
        },
        {
          type: 'code',
          language: 'javascript',
          caption: 'No desenvolvimento, o proxy do Vite evita o CORS: tudo vira mesma origem',
          code: "// vite.config.js\nexport default {\n  server: {\n    proxy: { '/api': 'http://localhost:3000' },\n  },\n};\n\n// no código: fetch('/api/pedidos')",
        },
        {
          type: 'table',
          caption: 'Armadilhas comuns',
          head: ['Sintoma', 'Causa provável'],
          rows: [
            ['Funciona no GET, falha no POST', 'O servidor não responde ao `OPTIONS` do preflight'],
            [
              'Erro 401 no preflight',
              'A autenticação está bloqueando o `OPTIONS`, que não leva token',
            ],
            [
              'Cookies não vão junto',
              "Falta `credentials: 'include'` no fetch e `Allow-Credentials: true` no servidor",
            ],
            ['`*` com credenciais é rejeitado', 'Com cookies, a origem precisa ser explícita'],
            ['Só falha em produção', 'A lista de origens não inclui o domínio publicado'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Não resolva desligando',
          text: 'Extensões que "desativam CORS" e `Access-Control-Allow-Origin: *` em uma API com cookies escondem o problema no seu computador e deixam a falha, ou a brecha, para produção.',
        },
      ],
    },
  ],
  sources: [
    { title: 'MDN: CORS', url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS' },
    {
      title: 'MDN: política de mesma origem',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/Security/Same-origin_policy',
    },
    { title: 'web.dev: CORS', url: 'https://web.dev/articles/cross-origin-resource-sharing' },
    {
      title: 'Vite: proxy do servidor',
      url: 'https://vite.dev/config/server-options#server-proxy',
    },
  ],
};
