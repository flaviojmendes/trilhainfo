import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'o-que-avaliam',
      title: 'O que estão avaliando',
      blocks: [
        {
          type: 'text',
          text: 'Na entrevista de design de sistemas não existe resposta certa. A banca quer ver **como você decide**: se entende o problema antes de desenhar, se começa simples, se enxerga gargalos e se explica as trocas de cada escolha.',
        },
      ],
    },
    {
      id: 'roteiro',
      title: 'Um roteiro de 45 minutos',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Requisitos (5 a 10 min)',
              text: 'Pergunte o que o sistema faz e para quantas pessoas. Separe o essencial do "seria bom". Escreva os requisitos não funcionais: latência, disponibilidade, consistência.',
            },
            {
              title: 'Estimativas (5 min)',
              text: 'Uma conta de guardanapo: requisições por segundo, volume de dados por ano. Ela diz se cabe em um banco ou se precisa de mais.',
            },
            {
              title: 'API e dados (5 a 10 min)',
              text: 'Os endpoints principais e as tabelas ou entidades. Isso ancora o resto da conversa.',
            },
            {
              title: 'Desenho de alto nível (10 min)',
              text: 'Cliente, balanceador, serviços, banco, cache, filas. Comece com o mínimo que funciona.',
            },
            {
              title: 'Aprofundar e escalar (10 a 15 min)',
              text: 'Escolha o gargalo mais provável e resolva. Fale do que acontece quando uma peça cai.',
            },
          ],
        },
      ],
    },
    {
      id: 'exemplo',
      title: 'Exemplo: um encurtador de links',
      blocks: [
        {
          type: 'list',
          items: [
            '**Requisitos:** criar um link curto e redirecionar. 100 milhões de links novos por mês; leitura 100 vezes mais frequente que escrita.',
            '**Estimativa:** 100 mi ÷ 30 dias ÷ 86.400 s ≈ 40 escritas/s e cerca de 4.000 leituras/s. Em 5 anos, 6 bilhões de links × 500 bytes ≈ 3 TB.',
            '**API:** `POST /links {url}` → `{codigo}`; `GET /{codigo}` → `301` para a URL.',
            '**Código:** 7 caracteres em base62 dão 62⁷ ≈ 3,5 trilhões de combinações. Sobra muito.',
          ],
        },
        {
          type: 'sequence',
          caption: 'O caminho de leitura, que precisa ser rápido',
          actors: ['Navegador', 'Serviço', 'Cache', 'Banco'],
          messages: [
            { from: 0, to: 1, label: 'GET /aB3x9Kq' },
            {
              from: 1,
              to: 2,
              label: 'buscar aB3x9Kq',
              text: 'A maioria dos acessos está em poucos links populares.',
            },
            { from: 2, to: 1, label: 'miss', tone: 'error' },
            {
              from: 1,
              to: 3,
              label: 'SELECT url WHERE codigo = …',
              text: 'Busca por chave primária: rápida mesmo com bilhões de linhas.',
            },
            { from: 3, to: 1, label: 'https://…', tone: 'ok' },
            { from: 1, to: 0, label: '301 Location: https://…', tone: 'ok' },
          ],
        },
      ],
    },
    {
      id: 'blocos',
      title: 'Peças que aparecem em quase todo desenho',
      blocks: [
        {
          type: 'table',
          caption: 'Quando cada peça entra',
          head: ['Peça', 'Resolve', 'Troca que você assume'],
          rows: [
            [
              'Balanceador de carga',
              'Distribui tráfego entre várias instâncias',
              'Serviço precisa ser sem estado',
            ],
            ['Cache', 'Leituras repetidas e caras', 'Dados podem ficar desatualizados'],
            ['Réplicas de leitura', 'Muitas leituras no banco', 'Atraso de replicação'],
            ['Fila', 'Trabalho lento ou picos de carga', 'Processamento assíncrono e eventual'],
            [
              'Particionamento (sharding)',
              'Dados ou escritas que não cabem em um banco',
              'Consultas entre partições ficam difíceis',
            ],
            ['CDN', 'Arquivos estáticos perto de quem acessa', 'Invalidação de cache'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Fale as trocas em voz alta',
          text: '"Vou usar 301 porque o navegador guarda o redirecionamento e alivia o servidor. Se precisarmos contar cliques, 302 é melhor, mesmo custando mais tráfego." Esse tipo de frase é o que a banca procura.',
        },
        {
          type: 'checklist',
          id: 'design',
          items: [
            'Perguntei os requisitos e a escala antes de desenhar.',
            'Fiz uma estimativa de tráfego e de armazenamento.',
            'Defini a API e o modelo de dados.',
            'Comecei com o desenho mais simples que atende.',
            'Identifiquei o gargalo e o que acontece se uma peça cair.',
            'Expliquei a troca de cada decisão importante.',
          ],
        },
      ],
    },
  ],
  sources: [
    { title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer' },
    { title: 'ByteByteGo: blog', url: 'https://blog.bytebytego.com/' },
    {
      title: 'Designing Data-Intensive Applications: site do livro',
      url: 'https://dataintensive.net/',
    },
  ],
};
