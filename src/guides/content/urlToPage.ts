import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'visao-geral',
      title: 'A viagem completa',
      blocks: [
        {
          type: 'text',
          text: 'Entre apertar Enter e ver a página, o navegador conversa com pelo menos dois sistemas: um **servidor DNS**, que traduz o nome em endereço, e o **servidor da aplicação**, que devolve o conteúdo. Depois, ainda precisa montar e desenhar a página.',
        },
        {
          type: 'sequence',
          caption: 'O que acontece ao abrir https://trilha.info/roadmap/frontend',
          actors: ['Navegador', 'DNS', 'Servidor'],
          messages: [
            {
              from: 0,
              to: 0,
              label: 'Interpreta a URL',
              text: 'Separa protocolo, domínio e caminho.',
            },
            {
              from: 0,
              to: 1,
              label: 'Qual o IP de trilha.info?',
              text: 'Só se a resposta não estiver em cache.',
            },
            { from: 1, to: 0, label: '203.0.113.10', text: 'O endereço do servidor.' },
            {
              from: 0,
              to: 2,
              label: 'Abre conexão segura',
              text: 'TCP e TLS: confere o certificado e combina chaves.',
            },
            { from: 0, to: 2, label: 'GET /roadmap/frontend', text: 'Com cabeçalhos e cookies.' },
            { from: 2, to: 0, label: '200 OK + HTML', tone: 'ok' },
            {
              from: 0,
              to: 0,
              label: 'Monta a página',
              text: 'Lê o HTML, pede CSS, JS e imagens, e desenha.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Com HTTP/3, a conexão usa o protocolo QUIC em vez de TCP, e o TLS vem embutido. O papel de cada etapa continua o mesmo.',
        },
      ],
    },
    {
      id: 'anatomia',
      title: 'As partes de uma URL',
      blocks: [
        {
          type: 'code',
          language: 'url',
          code: 'https://trilha.info:443/roadmap/frontend?view=map#trecho-2',
        },
        {
          type: 'terms',
          items: [
            {
              term: '`https://`',
              text: 'O **protocolo**. Com `https`, a conexão é cifrada com TLS.',
            },
            { term: '`trilha.info`', text: 'O **domínio**, que o DNS traduz em um endereço IP.' },
            {
              term: '`:443`',
              text: 'A **porta**. Costuma ser omitida: 443 é o padrão do HTTPS e 80 o do HTTP.',
            },
            {
              term: '`/roadmap/frontend`',
              text: 'O **caminho**, que identifica o recurso no servidor.',
            },
            {
              term: '`?view=map`',
              text: 'A **query string**, com parâmetros no formato `chave=valor`.',
            },
            {
              term: '`#trecho-2`',
              text: 'O **fragmento**. Não é enviado ao servidor: o navegador usa para rolar até um ponto da página.',
            },
          ],
        },
      ],
    },
    {
      id: 'renderizacao',
      title: 'Do HTML aos pixels',
      blocks: [
        {
          type: 'text',
          text: 'Com o HTML em mãos, o navegador segue o chamado **caminho crítico de renderização**.',
        },
        {
          type: 'steps',
          items: [
            {
              title: 'DOM',
              text: 'Lê o HTML e cria a árvore de elementos. Ao encontrar CSS, JS ou imagens, pede cada arquivo.',
            },
            {
              title: 'CSSOM',
              text: 'Lê o CSS e cria a árvore de estilos. A página não é desenhada antes disso, por isso o CSS **bloqueia a renderização**.',
            },
            {
              title: 'Árvore de renderização',
              text: 'Combina DOM e CSSOM, mantendo só o que aparece na tela. Um elemento com `display: none` fica de fora.',
            },
            {
              title: 'Layout',
              text: 'Calcula tamanho e posição de cada caixa a partir da largura da janela.',
            },
            {
              title: 'Pintura e composição',
              text: 'Desenha textos, cores e imagens em camadas e junta tudo na tela.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          text: 'Um `<script>` comum interrompe a leitura do HTML. Veja o guia **Scripts: normal, async e defer** para evitar esse atraso.',
        },
      ],
    },
    {
      id: 'na-pratica',
      title: 'Veja isso acontecer',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Abra as ferramentas do navegador (`F12` ou `Cmd + Option + I`) e vá até a aba **Network**.',
            'Recarregue a página e clique na primeira linha, o documento HTML.',
            'Em **Headers**, confira método, status e cabeçalhos da resposta.',
            'Em **Timing**, veja quanto tempo levaram DNS, conexão, TLS, espera pelo servidor e download.',
          ],
        },
        {
          type: 'text',
          text: 'Explique cada etapa em voz alta. Se uma requisição falhar, esse é o primeiro lugar para descobrir **em qual etapa** o problema aconteceu.',
        },
      ],
    },
  ],
  sources: [
    {
      title: 'MDN: como os navegadores funcionam',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/Performance/How_browsers_work',
    },
    {
      title: 'web.dev: caminho crítico de renderização',
      url: 'https://web.dev/articles/critical-rendering-path',
    },
    {
      title: 'Chrome DevTools: inspecionar a atividade de rede',
      url: 'https://developer.chrome.com/docs/devtools/network',
    },
  ],
};
