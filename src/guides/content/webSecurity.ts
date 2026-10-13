import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'regra',
      title: 'A regra por trás de quase tudo',
      blocks: [
        {
          type: 'text',
          text: 'A maioria das falhas em aplicações web vem do mesmo erro: **tratar dado como código**. Um texto digitado vira parte de uma consulta SQL, de um HTML ou de um comando. A defesa também se repete: separe o dado do código e confira permissões no servidor.',
        },
      ],
    },
    {
      id: 'ataques',
      title: 'Os ataques mais comuns',
      blocks: [
        {
          type: 'cards',
          items: [
            {
              label: 'Injeção de SQL',
              title: 'O texto vira parte da consulta',
              text: "Com `nome = \"x' OR '1'='1\"`, a consulta retorna todos os registros.",
              points: [
                'Use consultas parametrizadas ou um ORM.',
                'Nunca monte SQL concatenando texto.',
              ],
              code: "// vulnerável\ndb.query(`SELECT * FROM users WHERE nome = '${nome}'`);\n\n// seguro\ndb.query('SELECT * FROM users WHERE nome = $1', [nome]);",
            },
            {
              label: 'XSS',
              title: 'O texto vira HTML que executa',
              text: 'Um comentário com `<img src=x onerror="…">` roda script no navegador de quem lê.',
              points: [
                'Escreva texto com `textContent`, não `innerHTML`.',
                'No React, evite `dangerouslySetInnerHTML`. Se precisar, sanitize com DOMPurify.',
                'Use Content-Security-Policy como segunda barreira.',
              ],
              code: '// vulnerável\nel.innerHTML = comentario;\n\n// seguro\nel.textContent = comentario;',
            },
            {
              label: 'CSRF',
              title: 'Outro site usa a sua sessão',
              text: 'Uma página maliciosa envia um formulário para o seu banco, e o navegador anexa o cookie da sessão.',
              points: [
                'Cookies com `SameSite=Lax` ou `Strict`.',
                'Token anti-CSRF em formulários que mudam dados.',
                'Nunca mude dados em requisições `GET`.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'acesso',
      title: 'Controle de acesso quebrado',
      blocks: [
        {
          type: 'text',
          text: 'É a falha número um da lista OWASP. A interface esconde o botão de excluir, mas a API aceita `DELETE /pedidos/42` de qualquer pessoa logada. Ou basta trocar o id na URL para ver o pedido de outra pessoa.',
        },
        {
          type: 'code',
          language: 'javascript',
          caption: 'Confira no servidor se o recurso pertence a quem pediu',
          code: "app.get('/pedidos/:id', autenticar, async (req, res) => {\n  const pedido = await db.pedidos.buscar(req.params.id);\n  if (!pedido || pedido.clienteId !== req.usuario.id) {\n    return res.status(404).end(); // não revele que existe\n  }\n  res.json(pedido);\n});",
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'O frontend não é uma barreira',
          text: 'Qualquer pessoa pode chamar sua API sem a interface. Validação e permissão no cliente melhoram a experiência; no servidor, garantem a segurança.',
        },
      ],
    },
    {
      id: 'base',
      title: 'Uma base que evita muita dor',
      blocks: [
        {
          type: 'table',
          caption: 'Configurações que valem para quase todo projeto',
          head: ['Medida', 'Por quê'],
          rows: [
            ['HTTPS em tudo, com HSTS', 'Impede que alguém na rede leia ou altere o tráfego'],
            [
              'Cookies `HttpOnly`, `Secure` e `SameSite`',
              'O JavaScript não lê o cookie de sessão e ele não vai para outros sites',
            ],
            ['Senhas com bcrypt ou Argon2', 'Um vazamento do banco não revela as senhas'],
            [
              'Segredos fora do repositório',
              'Chaves em variáveis de ambiente ou num cofre de segredos',
            ],
            ['Dependências atualizadas', '`npm audit` e Dependabot avisam sobre falhas conhecidas'],
            ['Limite de tentativas', 'Dificulta força bruta em login e recuperação de senha'],
            ['Erros genéricos para quem usa', 'Detalhes e stack traces vão só para os logs'],
          ],
        },
        {
          type: 'checklist',
          id: 'seguranca',
          items: [
            'Nenhuma consulta SQL é montada concatenando texto.',
            'Conteúdo vindo de pessoas usuárias é exibido como texto, não como HTML.',
            'Toda rota que lê ou muda um recurso confere se ele pertence a quem pediu.',
            'Requisições `GET` não mudam dados.',
            'O repositório não tem chaves, senhas nem `.env`.',
            '`npm audit` não mostra falhas altas ou críticas sem um plano.',
          ],
        },
      ],
    },
  ],
  sources: [
    { title: 'OWASP Top 10', url: 'https://owasp.org/Top10/' },
    { title: 'OWASP Cheat Sheet Series', url: 'https://cheatsheetseries.owasp.org/' },
    {
      title: 'MDN: segurança na web',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/Security',
    },
    {
      title: 'MDN: Content-Security-Policy',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CSP',
    },
  ],
};
