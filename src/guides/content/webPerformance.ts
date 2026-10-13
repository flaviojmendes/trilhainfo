import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'metricas',
      title: 'As três métricas que importam',
      blocks: [
        {
          type: 'text',
          text: 'As **Core Web Vitals** medem o que a pessoa sente: quanto tempo leva para ver o conteúdo, se a página responde ao toque e se as coisas ficam paradas no lugar. O Google usa essas métricas no ranqueamento, e elas são um bom alvo para qualquer projeto.',
        },
        {
          type: 'table',
          caption: 'Limites para uma boa experiência, medidos em 75% das visitas',
          head: ['Métrica', 'Mede', 'Bom', 'Causas comuns quando está ruim'],
          rows: [
            [
              'LCP: maior conteúdo visível',
              'Quando o maior elemento aparece',
              'Até 2,5 s',
              'Imagem grande, servidor lento, CSS ou fonte bloqueando',
            ],
            [
              'INP: resposta à interação',
              'Quanto a tela demora para reagir a um clique',
              'Até 200 ms',
              'JavaScript pesado na thread principal',
            ],
            [
              'CLS: estabilidade do layout',
              'Quanto o conteúdo pula enquanto carrega',
              'Até 0,1',
              'Imagens sem tamanho, anúncios e banners injetados',
            ],
          ],
        },
      ],
    },
    {
      id: 'medir',
      title: 'Meça antes de otimizar',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Rode o Lighthouse',
              text: 'No Chrome, DevTools → Lighthouse, em modo celular. Mostra as métricas de laboratório e uma lista de oportunidades.',
            },
            {
              title: 'Simule uma conexão real',
              text: 'Na aba Network, use "Fast 4G" ou "Slow 4G" e desligue o cache. Seu computador e sua internet são melhores que os da maioria.',
            },
            {
              title: 'Grave um perfil',
              text: 'A aba Performance mostra tarefas longas (mais de 50 ms) que travam cliques. Comece pela maior.',
            },
            {
              title: 'Confira os dados reais',
              text: 'O PageSpeed Insights mostra o que pessoas reais vivem no seu site, quando há tráfego suficiente. A biblioteca `web-vitals` coleta isso no seu próprio site.',
              code: 'npx lighthouse https://seusite.com --view',
            },
          ],
        },
      ],
    },
    {
      id: 'ganhos',
      title: 'Os ganhos mais comuns',
      blocks: [
        {
          type: 'cards',
          items: [
            {
              label: 'LCP',
              title: 'Imagens',
              text: 'Costumam ser o maior peso da página.',
              points: [
                'Use AVIF ou WebP e o tamanho certo com `srcset`.',
                'Imagem principal com `fetchpriority="high"`; o resto com `loading="lazy"`.',
              ],
              code: '<img src="capa.avif" width="1200" height="630"\n  fetchpriority="high" alt="…">',
            },
            {
              label: 'INP',
              title: 'Menos JavaScript',
              text: 'Cada kilobyte precisa ser baixado, lido e executado.',
              points: [
                'Divida o código por rota com `import()` dinâmico.',
                'Troque bibliotecas grandes por alternativas menores ou pela API nativa.',
                'Quebre tarefas longas e adie o que não é urgente.',
              ],
            },
            {
              label: 'CLS',
              title: 'Reserve espaço',
              text: 'O navegador precisa saber o tamanho antes de o conteúdo chegar.',
              points: [
                'Sempre `width` e `height` em imagens e vídeos.',
                'Reserve a altura de banners e anúncios.',
                'Fontes com `font-display: swap` e tamanhos de fallback parecidos.',
              ],
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Cache do lado do servidor também conta',
          text: 'Arquivos com hash no nome, como os que o Vite gera, podem ter `Cache-Control: max-age=31536000, immutable`. O HTML deve ser revalidado a cada visita.',
        },
      ],
    },
    {
      id: 'checklist',
      title: 'Antes de publicar',
      blocks: [
        {
          type: 'checklist',
          id: 'desempenho',
          items: [
            'Lighthouse em modo celular com desempenho acima de 90, ou o motivo documentado.',
            'A imagem principal está otimizada e não usa `loading="lazy"`.',
            'Todas as imagens têm `width` e `height`.',
            'O bundle inicial foi conferido e rotas pesadas carregam sob demanda.',
            'Arquivos estáticos com hash têm cache longo.',
          ],
        },
      ],
    },
  ],
  sources: [
    { title: 'web.dev: Core Web Vitals', url: 'https://web.dev/articles/vitals' },
    { title: 'web.dev: otimizar o LCP', url: 'https://web.dev/articles/optimize-lcp' },
    { title: 'web.dev: otimizar o INP', url: 'https://web.dev/articles/optimize-inp' },
    { title: 'PageSpeed Insights', url: 'https://pagespeed.web.dev/' },
  ],
};
