import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'por-que',
      title: 'Por que testar desde o começo',
      blocks: [
        {
          type: 'text',
          text: 'No Brasil, cerca de **18,6 milhões de pessoas** têm alguma deficiência (IBGE, PNAD Contínua 2022). Muitas outras usam a web com o braço machucado, sob sol forte ou com internet lenta. Uma interface acessível funciona melhor para todo mundo.',
        },
        {
          type: 'text',
          text: 'A **Lei Brasileira de Inclusão** (Lei 13.146/2015) torna obrigatória a acessibilidade nos sites de empresas com sede ou representação no país e de órgãos de governo. A referência técnica é a **WCAG**, hoje na versão 2.2.',
        },
      ],
    },
    {
      id: 'verificacoes',
      title: 'As 10 verificações',
      blocks: [
        {
          type: 'text',
          text: 'Faça na sua própria página. Leva cerca de 15 minutos e encontra os problemas mais frequentes. As marcações ficam salvas neste navegador.',
        },
        {
          type: 'checklist',
          id: 'dez',
          items: [
            '**Teclado:** com `Tab`, `Shift + Tab`, `Enter` e `Espaço`, alcanço e uso todos os controles.',
            '**Foco visível:** sempre sei onde o foco está, e ele segue a ordem de leitura.',
            '**Sem armadilhas:** um modal fecha com `Esc` e devolve o foco a quem o abriu.',
            '**Zoom e reflow:** com zoom de 200% e largura de 320 px, nada some e não há rolagem horizontal.',
            '**Contraste:** texto normal tem pelo menos 4,5:1; texto grande e ícones, 3:1.',
            '**Não só cor:** erros, estados e links têm texto, ícone ou sublinhado, além da cor.',
            '**Imagens:** imagens informativas têm `alt` descritivo; decorativas têm `alt=""`.',
            '**Formulários:** todo campo tem um `<label>` visível, e o erro diz como corrigir.',
            '**Estrutura:** há um `<h1>`, títulos em ordem, e marcos como `<header>`, `<nav>` e `<main>`.',
            '**Nomes claros:** cada botão e link faz sentido fora de contexto. Nada de "clique aqui".',
          ],
        },
      ],
    },
    {
      id: 'leitor-de-tela',
      title: 'Cinco minutos com um leitor de tela',
      blocks: [
        {
          type: 'table',
          caption: 'Leitores de tela gratuitos e o atalho para começar',
          head: ['Leitor', 'Sistema', 'Ligar', 'Listar títulos'],
          rows: [
            ['NVDA', 'Windows', '`Ctrl + Alt + N`', '`H` vai ao próximo título'],
            ['VoiceOver', 'macOS', '`Cmd + F5`', '`Ctrl + Option + U` abre o rotor'],
            [
              'VoiceOver',
              'iOS',
              'Ajustes › Acessibilidade',
              'Gire dois dedos para escolher "Títulos"',
            ],
            [
              'TalkBack',
              'Android',
              'Segure os dois botões de volume',
              'Deslize para cima ou para baixo até "Títulos"',
            ],
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Liste os títulos: eles descrevem a página sozinhos?',
            'Preencha um formulário: cada campo anuncia o rótulo e o erro?',
            'Abra e feche um menu ou modal: o leitor anuncia o que mudou?',
          ],
        },
      ],
    },
    {
      id: 'ferramentas',
      title: 'Ferramentas automáticas',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              title: 'Lighthouse',
              text: 'Já vem no Chrome, na aba Lighthouse das ferramentas do navegador.',
            },
            {
              title: 'axe DevTools',
              text: 'Extensão gratuita com explicação e correção para cada problema.',
            },
            { title: 'WAVE', text: 'Mostra os problemas desenhados sobre a própria página.' },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Ferramentas automáticas encontram só parte dos problemas. Uma nota 100 não garante que alguém consiga usar a página com teclado ou leitor de tela. Faça as verificações manuais também.',
        },
      ],
    },
  ],
  sources: [
    { title: 'W3C: referência rápida da WCAG 2.2', url: 'https://www.w3.org/WAI/WCAG22/quickref/' },
    {
      title: 'W3C: verificações simples de acessibilidade',
      url: 'https://www.w3.org/WAI/test-evaluate/preliminary/',
    },
    {
      title: 'Lei Brasileira de Inclusão (Lei 13.146/2015)',
      url: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm',
    },
  ],
};
