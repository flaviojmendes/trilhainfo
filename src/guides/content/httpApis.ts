import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'anatomia',
      title: 'Uma requisição e sua resposta',
      blocks: [
        {
          type: 'text',
          text: 'Toda conversa HTTP tem duas partes. A **requisição** diz o que o cliente quer: método, caminho, cabeçalhos e, às vezes, um corpo. A **resposta** diz o que aconteceu: um código de status, cabeçalhos e, quase sempre, um corpo.',
        },
        {
          type: 'code',
          language: 'http',
          caption: 'Criar uma anotação',
          code: 'POST /trilhas/42/anotacoes HTTP/1.1\nHost: api.trilha.info\nContent-Type: application/json\nAuthorization: Bearer eyJhbGciOi...\n\n{ "texto": "Revisar flexbox" }',
          output:
            'HTTP/1.1 201 Created\nLocation: /trilhas/42/anotacoes/7\nContent-Type: application/json\n\n{ "id": 7, "texto": "Revisar flexbox" }',
        },
      ],
    },
    {
      id: 'metodos',
      title: 'Métodos: o verbo da requisição',
      blocks: [
        {
          type: 'table',
          caption: 'Os métodos mais usados em APIs',
          head: ['Método', 'Uso', 'Seguro', 'Idempotente'],
          rows: [
            ['`GET`', 'Ler um recurso ou uma lista', 'Sim', 'Sim'],
            ['`POST`', 'Criar um recurso ou disparar uma ação', 'Não', 'Não'],
            ['`PUT`', 'Substituir um recurso inteiro', 'Não', 'Sim'],
            ['`PATCH`', 'Alterar parte de um recurso', 'Não', 'Não garantido'],
            ['`DELETE`', 'Remover um recurso', 'Não', 'Sim'],
          ],
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Seguro',
              text: 'Não altera nada no servidor. Pode ser repetido, guardado em cache e pré-carregado à vontade.',
            },
            {
              term: 'Idempotente',
              text: 'Repetir a mesma requisição deixa o servidor **no mesmo estado** que uma única chamada. Apagar algo duas vezes continua com o recurso apagado.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Por que idempotência importa',
          text: 'Quando a rede falha, clientes e proxies tentam de novo. Repetir um `PUT` é inofensivo; repetir um `POST` pode criar dois pedidos. Muitas APIs de pagamento aceitam um cabeçalho `Idempotency-Key` para tornar o `POST` seguro de repetir.',
        },
      ],
    },
    {
      id: 'status',
      title: 'Status: o que aconteceu',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          items: [
            { label: '2xx', title: 'Deu certo', text: 'A requisição foi entendida e atendida.' },
            {
              label: '3xx',
              title: 'Vá para outro lugar',
              text: 'O recurso mudou de endereço ou não mudou desde a última vez.',
            },
            {
              label: '4xx',
              title: 'Erro do cliente',
              text: 'Algo na requisição está errado. Repetir igual não resolve.',
            },
            {
              label: '5xx',
              title: 'Erro do servidor',
              text: 'A requisição parecia válida, mas o servidor falhou.',
            },
            {
              label: '1xx',
              title: 'Informativo',
              text: 'Respostas provisórias, raras no dia a dia de uma API.',
            },
          ],
        },
        {
          type: 'table',
          caption: 'Os códigos que você mais vai ver',
          head: ['Código', 'Nome', 'Quando usar'],
          rows: [
            ['`200`', 'OK', 'Leitura ou alteração bem-sucedida, com corpo.'],
            ['`201`', 'Created', 'Recurso criado. Envie `Location` com o endereço dele.'],
            ['`204`', 'No Content', 'Deu certo e não há o que devolver, como em um `DELETE`.'],
            ['`304`', 'Not Modified', 'O cliente pode usar a cópia que já tem em cache.'],
            ['`400`', 'Bad Request', 'Corpo ou parâmetros malformados.'],
            ['`401`', 'Unauthorized', 'Falta autenticação, ou ela é inválida.'],
            ['`403`', 'Forbidden', 'Autenticado, mas sem permissão.'],
            ['`404`', 'Not Found', 'O recurso não existe, ou você não deve saber que existe.'],
            ['`409`', 'Conflict', 'Conflita com o estado atual, como um e-mail já cadastrado.'],
            ['`422`', 'Unprocessable Content', 'Formato correto, mas a validação falhou.'],
            ['`429`', 'Too Many Requests', 'Limite de requisições atingido. Envie `Retry-After`.'],
            ['`500`', 'Internal Server Error', 'Erro inesperado no servidor.'],
            ['`503`', 'Service Unavailable', 'Fora do ar temporariamente ou sobrecarregado.'],
          ],
        },
      ],
    },
    {
      id: 'rotas',
      title: 'Desenhando as rotas',
      blocks: [
        {
          type: 'table',
          caption: 'Um recurso, seis operações',
          head: ['Ação', 'Requisição', 'Resposta de sucesso'],
          rows: [
            ['Listar', '`GET /trilhas?nivel=iniciante&pagina=2`', '`200` com a lista'],
            ['Detalhar', '`GET /trilhas/42`', '`200`, ou `404` se não existir'],
            ['Criar', '`POST /trilhas`', '`201` com `Location`'],
            ['Substituir', '`PUT /trilhas/42`', '`200` ou `204`'],
            ['Alterar', '`PATCH /trilhas/42`', '`200` com o recurso atualizado'],
            ['Remover', '`DELETE /trilhas/42`', '`204`'],
          ],
        },
        {
          type: 'list',
          items: [
            'Use **substantivos no plural** na URL e deixe o verbo para o método: `POST /trilhas`, não `/criarTrilha`.',
            'Filtros, ordenação e paginação vão na **query string**.',
            'Relações aparecem no caminho quando fazem sentido: `/trilhas/42/passos`.',
            'Devolva erros sempre no mesmo formato, para o cliente poder mostrar a mensagem certa.',
          ],
        },
        {
          type: 'code',
          language: 'json',
          caption: 'Um corpo de erro no formato da RFC 9457 (application/problem+json)',
          code: '{\n  "type": "https://api.trilha.info/erros/validacao",\n  "title": "Dados inválidos",\n  "status": 422,\n  "detail": "O campo texto não pode ficar vazio.",\n  "instance": "/trilhas/42/anotacoes"\n}',
        },
      ],
    },
    {
      id: 'depurar',
      title: 'Quando uma chamada falha',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Leia o status antes do resto',
              text: 'Ele diz de que lado está o problema: `4xx` aponta para a requisição, `5xx` para o servidor.',
            },
            {
              title: 'Com 4xx, confira a requisição',
              text: 'URL, método, `Content-Type`, corpo e token. Compare com a documentação e com um exemplo que funciona.',
            },
            {
              title: 'Com 5xx, procure os logs do servidor',
              text: 'O cliente raramente vê a causa. Um identificador de requisição na resposta ajuda a encontrar o log.',
            },
            {
              title: 'Erro de CORS no navegador?',
              text: 'A requisição pode ter chegado ao servidor. O que faltou foi ele autorizar a origem com `Access-Control-Allow-Origin`.',
            },
          ],
        },
      ],
    },
  ],
  sources: [
    {
      title: 'MDN: métodos de requisição HTTP',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods',
    },
    {
      title: 'MDN: códigos de status de respostas HTTP',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status',
    },
    { title: 'RFC 9110: semântica do HTTP', url: 'https://www.rfc-editor.org/rfc/rfc9110' },
    {
      title: 'RFC 9457: detalhes de problemas em APIs HTTP',
      url: 'https://www.rfc-editor.org/rfc/rfc9457',
    },
  ],
};
