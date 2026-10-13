import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'ideia',
      title: 'Guardar a resposta para não refazer o trabalho',
      blocks: [
        {
          type: 'text',
          text: 'Cache é uma cópia mais perto de quem pede. Ele troca **atualização** por **velocidade**: a resposta vem muito mais rápido, mas pode estar um pouco velha. A pergunta de projeto é sempre: quão velho esse dado pode ficar?',
        },
        {
          type: 'table',
          caption: 'As camadas, da mais perto à mais longe da pessoa',
          head: ['Camada', 'Exemplo', 'Bom para'],
          rows: [
            [
              'Navegador',
              '`Cache-Control: max-age=3600`',
              'Arquivos estáticos, imagens, respostas públicas',
            ],
            ['CDN', 'Cloudflare, CloudFront, Vercel', 'Páginas e arquivos iguais para todo mundo'],
            [
              'Aplicação',
              'Redis, Memcached, memória',
              'Resultados caros de calcular ou de consultar',
            ],
            [
              'Banco',
              'Cache de páginas do PostgreSQL',
              'Já acontece sozinho; ajuste antes de duplicar',
            ],
          ],
        },
      ],
    },
    {
      id: 'cache-aside',
      title: 'O padrão mais usado: cache-aside',
      blocks: [
        {
          type: 'sequence',
          caption: 'A aplicação procura no cache e, se não achar, vai ao banco',
          actors: ['API', 'Redis', 'Banco'],
          messages: [
            { from: 0, to: 1, label: 'GET produto:42', text: 'Primeira tentativa: o cache.' },
            { from: 1, to: 0, label: 'nil', text: 'Não estava lá (cache miss).', tone: 'error' },
            { from: 0, to: 2, label: 'SELECT … WHERE id = 42', text: 'Busca na fonte da verdade.' },
            { from: 2, to: 0, label: 'produto', tone: 'ok' },
            {
              from: 0,
              to: 1,
              label: 'SET produto:42 EX 300',
              text: 'Guarda por 5 minutos. A próxima leitura é um cache hit.',
              tone: 'ok',
            },
          ],
        },
        {
          type: 'code',
          language: 'javascript',
          caption: 'Em código',
          code: 'async function buscarProduto(id) {\n  const chave = `produto:${id}`;\n  const salvo = await redis.get(chave);\n  if (salvo) return JSON.parse(salvo);\n\n  const produto = await db.produtos.buscar(id);\n  await redis.set(chave, JSON.stringify(produto), { EX: 300 });\n  return produto;\n}\n\nasync function atualizarProduto(id, dados) {\n  await db.produtos.atualizar(id, dados);\n  await redis.del(`produto:${id}`); // invalida\n}',
        },
      ],
    },
    {
      id: 'invalidar',
      title: 'Invalidar: a parte difícil',
      blocks: [
        {
          type: 'terms',
          items: [
            {
              term: 'Expiração (TTL)',
              text: 'O dado some depois de um tempo. Simples e seguro; o preço é ficar desatualizado até expirar.',
            },
            {
              term: 'Apagar ao escrever',
              text: 'Ao mudar o dado, remova a chave. A próxima leitura busca a versão nova. Use junto com TTL, como rede de segurança.',
            },
            {
              term: 'Chave versionada',
              text: 'Inclua uma versão ou hash na chave, como `app.3f9a.js`. Uma versão nova é uma chave nova, e a antiga expira sozinha.',
            },
          ],
        },
        {
          type: 'table',
          caption: 'Problemas clássicos',
          head: ['Problema', 'O que acontece', 'Mitigação'],
          rows: [
            [
              'Avalanche',
              'Uma chave popular expira e mil requisições vão ao banco ao mesmo tempo',
              'Só uma recalcula (lock) ou TTL com variação aleatória',
            ],
            [
              'Dado de outra pessoa',
              'A resposta de uma pessoa logada vai para o cache público',
              '`Cache-Control: private` e chaves que incluem o usuário',
            ],
            [
              'Cache que nunca expira',
              'A memória enche e dados velhos ficam para sempre',
              'Sempre um TTL e uma política de remoção',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Cache não corrige consulta lenta',
          text: 'Antes de cachear, confira se falta um índice ou se há consultas N+1. Cache esconde o problema até a primeira vez que ele expira sob carga.',
        },
      ],
    },
    {
      id: 'checklist',
      title: 'Antes de adicionar um cache',
      blocks: [
        {
          type: 'checklist',
          id: 'cache',
          items: [
            'Sei quanto tempo o dado pode ficar desatualizado sem prejudicar ninguém.',
            'Toda chave tem TTL.',
            'Escritas apagam ou atualizam as chaves afetadas.',
            'Respostas com dados pessoais nunca vão para um cache compartilhado.',
            'A aplicação continua funcionando, mais devagar, se o cache cair.',
            'Medi a taxa de acerto (hit rate) depois de publicar.',
          ],
        },
      ],
    },
  ],
  sources: [
    {
      title: 'MDN: cache HTTP',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Caching',
    },
    {
      title: 'AWS: estratégias de cache',
      url: 'https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Strategies.html',
    },
    { title: 'Redis: documentação', url: 'https://redis.io/docs/latest/' },
  ],
};
