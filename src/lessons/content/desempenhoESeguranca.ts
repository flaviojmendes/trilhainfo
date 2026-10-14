import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'No seu computador, com wi-fi bom, qualquer site parece rápido. Para muita gente no Brasil, a internet é o pacote de dados pré-pago de um celular intermediário, e cada megabyte que sua página baixa sai do bolso de alguém. Ao mesmo tempo, um único `innerHTML` descuidado deixa um estranho rodar código no navegador de quem confiou no seu site. Esta aula trata das duas coisas que as pessoas só notam quando dão errado.',
  sections: [
    {
      id: 'cada-megabyte-custa',
      title: 'Cada megabyte custa',
      blocks: [
        {
          type: 'text',
          text: 'Duas coisas tornam uma página lenta para quem usa: o **peso** (quantos bytes precisam viajar pela rede) e o **trabalho** (quanto JavaScript o processador do celular precisa executar). Um celular intermediário pode levar várias vezes mais tempo que um notebook para rodar o mesmo script.',
        },
        {
          type: 'analogy',
          title: 'A mudança de casa',
          text: 'Mudar com um caminhão cheio de caixas demora para carregar (peso) e para desempacotar (trabalho). Se metade das caixas tem coisas que você nunca usa, as duas etapas ficam lentas à toa. Uma página rápida leva só o que a pessoa vai usar agora.',
        },
        {
          type: 'reveal',
          question:
            'Uma página de 5 MB que a pessoa abre todo dia útil consome quanto do pacote de dados dela num mês?',
          answer:
            'Cerca de 100 MB, se nada vier do cache. Num pacote pequeno, é uma fatia real, só para ver um site. Reduzir para 1 MB devolve quase 80 MB para ela usar como quiser.',
        },
        {
          type: 'quiz',
          question:
            'Qual mudança ajuda mais quem abre seu catálogo num celular intermediário com pacote de dados pequeno?',
          options: [
            {
              text: 'Trocar a foto de capa de 3 MB por uma versão de 200 KB no tamanho exibido',
              correct: true,
              feedback:
                'Isso. Menos bytes significa menos espera e menos dados gastos. Quase sempre as imagens são o maior ganho, e o mais fácil.',
            },
            {
              text: 'Adicionar uma animação de carregamento enquanto a página baixa',
              feedback:
                'A animação pode deixar a espera menos estranha, mas não diminui nem um byte. Às vezes ainda acrescenta código.',
            },
            {
              text: 'Testar no seu notebook com wi-fi para conferir que está rápido',
              feedback:
                'No seu notebook quase tudo parece rápido. Para enxergar o problema, simule a rede e o processador de quem usa.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Teste com o celular que seu público usa',
          text: 'Se não tiver um aparelho modesto à mão, o DevTools simula: ele deixa a rede e o processador mais lentos de propósito. Você vai usar isso daqui a pouco.',
        },
      ],
    },
    {
      id: 'core-web-vitals',
      title: 'Três perguntas: LCP, INP e CLS',
      blocks: [
        {
          type: 'text',
          text: '“Rápido” é vago. O Google propôs três medidas que traduzem a experiência de quem usa em números, chamadas **Core Web Vitals** (sinais vitais da web). Cada uma responde uma pergunta simples.',
        },
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              label: 'Carregamento',
              title: 'LCP: o principal apareceu?',
              text: 'Largest Contentful Paint: quanto tempo até o maior elemento visível (a foto do produto, o título) aparecer.',
              points: ['Bom: até 2,5 segundos'],
            },
            {
              label: 'Resposta',
              title: 'INP: respondeu ao toque?',
              text: 'Interaction to Next Paint: quanto tempo entre tocar ou digitar e a tela mostrar alguma reação.',
              points: ['Bom: até 200 milissegundos'],
            },
            {
              label: 'Estabilidade',
              title: 'CLS: a página pulou?',
              text: 'Cumulative Layout Shift: quanto o conteúdo se mexe sozinho enquanto carrega. Não é tempo, é uma pontuação.',
              points: ['Bom: até 0,1'],
            },
          ],
        },
        {
          type: 'text',
          text: 'Você conhece o CLS de perto: ia tocar em “Cancelar”, um anúncio carregou em cima e você tocou em “Comprar”. A métrica existe porque esse pulo irrita e causa erros reais.',
        },
        {
          type: 'classify',
          prompt: 'Qual métrica cada problema prejudica?',
          buckets: ['LCP', 'INP', 'CLS'],
          items: [
            { text: 'A foto gigante do banner demora para aparecer', bucket: 0 },
            { text: 'O servidor leva 3 segundos para devolver o HTML', bucket: 0 },
            { text: 'O botão “Adicionar ao carrinho” demora para reagir ao toque', bucket: 1 },
            { text: 'Digitar na busca trava, porque cada letra filtra 5 mil itens', bucket: 1 },
            { text: 'Um anúncio aparece no topo e empurra o texto para baixo', bucket: 2 },
            { text: 'Uma imagem sem `width` e `height` desloca o botão quando carrega', bucket: 2 },
          ],
          explanation:
            'LCP fala de **chegar** (rede, servidor, imagens pesadas). INP fala de **responder** (JavaScript ocupando o processador). CLS fala de **ficar parado** (espaço não reservado). Saber qual métrica está ruim já aponta onde procurar.',
        },
      ],
    },
    {
      id: 'imagens-e-javascript',
      title: 'Menos peso: imagens e JavaScript',
      blocks: [
        {
          type: 'text',
          text: 'Na maioria das páginas, as imagens são a maior parte dos bytes. Quatro cuidados resolvem quase tudo: o **tamanho certo**, um **formato moderno**, **carregar só quando for aparecer** e **reservar o espaço**.',
        },
        {
          type: 'anatomy',
          caption: 'Uma imagem de produto bem configurada.',
          language: 'html',
          parts: [
            { text: '<img\n  ' },
            {
              text: 'src="tenis-800.webp"',
              label: 'Formato moderno',
              note: '**WebP** e **AVIF** costumam ficar bem menores que JPEG e PNG com a mesma qualidade visual. Todos os navegadores atuais suportam WebP.',
            },
            { text: '\n  ' },
            {
              text: 'srcset="tenis-400.webp 400w, tenis-800.webp 800w"\n  sizes="(max-width: 600px) 100vw, 800px"',
              label: 'Tamanho certo',
              note: 'Você oferece versões de larguras diferentes e diz quanto espaço a imagem ocupa. O celular baixa a de 400 pixels; o monitor grande, a de 800. Ninguém baixa uma foto de 4000 pixels para mostrar em 360.',
            },
            { text: '\n  alt="Tênis de corrida azul, vista lateral"\n  ' },
            {
              text: 'width="800" height="600"',
              label: 'Espaço reservado',
              note: 'Com largura e altura, o navegador calcula a proporção e reserva o espaço **antes** de baixar a imagem. Nada pula quando ela chega: é o remédio para o CLS.',
            },
            { text: '\n  ' },
            {
              text: 'loading="lazy"',
              label: 'Carregamento sob demanda',
              note: 'A imagem só é baixada quando está perto de aparecer na tela. Ótimo para fotos no meio da lista; quem não rola a página não paga por elas.',
            },
            { text: '\n>' },
          ],
        },
        {
          type: 'quiz',
          question:
            'O CSS já tem `img { width: 100%; height: auto; }`. Por que ainda escrever `width` e `height` no HTML da imagem?',
          options: [
            {
              text: 'Para o navegador saber a proporção e reservar o espaço antes da imagem chegar, evitando que a página pule',
              correct: true,
              feedback:
                'Isso. O CSS continua mandando no tamanho final; os atributos só informam a proporção (800 por 600) cedo. Sem eles, o espaço começa com altura zero e cresce de repente.',
            },
            {
              text: 'Para a imagem baixar mais rápido',
              feedback:
                'Os atributos não mudam o peso do arquivo. Para baixar menos, use o tamanho certo e um formato moderno.',
            },
            {
              text: 'Não precisa: com `height: auto` o navegador já sabe a altura',
              feedback:
                '`height: auto` depende da proporção da imagem, e ela só é conhecida quando o arquivo chega, a não ser que os atributos digam antes.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erro comum: lazy na imagem principal',
          text: 'Não use `loading="lazy"` na foto do topo, a que a pessoa vê sem rolar. Ela é quase sempre o elemento do LCP, e atrasar seu download piora justamente a métrica que você queria melhorar.',
        },
        {
          type: 'text',
          text: 'Depois das imagens, o vilão é o JavaScript. Cada biblioteca instalada vira bytes para baixar **e** código para o celular executar. Antes de instalar, pergunte se o navegador já faz aquilo sozinho.',
        },
        {
          type: 'codeTabs',
          caption: 'Três jeitos de mandar menos JavaScript',
          tabs: [
            {
              label: 'Antes: biblioteca inteira',
              language: 'js',
              code: `import moment from 'moment';
import 'moment/locale/pt-br';

// Uma biblioteca de datas grande, só para escrever "14 de outubro"
const texto = moment(pedido.data).locale('pt-br').format('D [de] MMMM');`,
            },
            {
              label: 'Depois: recurso do navegador',
              language: 'js',
              code: `// Intl já vem no navegador: zero bytes a mais
const formatador = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long' });
const texto = formatador.format(new Date(pedido.data));`,
            },
            {
              label: 'Carregar só quando precisar',
              language: 'js',
              code: `// O código do mapa só é baixado se a pessoa pedir o mapa
botaoMapa.addEventListener('click', async () => {
  const { abrirMapa } = await import('./mapa.js');
  abrirMapa();
});`,
            },
          ],
        },
        {
          type: 'quiz',
          question: 'Numa lista com 40 produtos, qual imagem deve ficar **sem** `loading="lazy"`?',
          options: [
            {
              text: 'A foto grande do primeiro produto, visível assim que a página abre',
              correct: true,
              feedback:
                'Isso. Ela provavelmente é o elemento do LCP e precisa começar a baixar o quanto antes. As de baixo podem esperar a rolagem.',
            },
            {
              text: 'A foto do último produto, no fim da página',
              feedback:
                'Essa é a candidata perfeita para lazy: muita gente nem chega lá, e não precisa pagar por ela.',
            },
            {
              text: 'Nenhuma: lazy em todas é sempre melhor',
              feedback:
                'Lazy em tudo atrasa justamente a imagem que a pessoa vê primeiro. Use onde a imagem começa fora da tela.',
            },
          ],
        },
      ],
    },
    {
      id: 'medir-antes-e-depois',
      title: 'Meça antes e depois',
      blocks: [
        {
          type: 'text',
          text: 'Otimizar sem medir é chute. Você pode passar um dia economizando 2 KB de JavaScript enquanto uma imagem de 3 MB continua lá. A regra é: meça, mude **uma coisa**, meça de novo nas mesmas condições.',
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Rode o Lighthouse',
              text: 'No DevTools, abra a aba **Lighthouse**, escolha o modo navegação e o dispositivo celular, e gere o relatório. Ele dá notas, mostra LCP e CLS e lista as oportunidades, como imagens grandes demais.',
            },
            {
              title: 'Simule um celular de verdade',
              text: 'Na aba **Performance**, use as opções de limitação: deixe a CPU mais lenta (por exemplo, 4 vezes) e a rede em 4G lento. Agora você vê a página como boa parte do seu público.',
            },
            {
              title: 'Grave uma interação',
              text: 'Ainda em Performance, grave enquanto clica num botão ou digita na busca. Tarefas longas aparecem marcadas em vermelho: é ali que o INP sofre.',
            },
            {
              title: 'Anote e repita',
              text: 'Rode três vezes e anote o valor do meio, porque cada medição varia. Faça a mudança e meça de novo do mesmo jeito.',
            },
          ],
        },
        {
          type: 'table',
          caption: 'Exemplo de registro antes e depois de otimizar as imagens do catálogo',
          head: ['Medida', 'Antes', 'Depois', 'O que mudou'],
          rows: [
            ['Peso da página', '4,8 MB', '1,1 MB', 'Fotos em WebP, no tamanho exibido'],
            ['LCP (celular simulado)', '5,2 s', '2,3 s', 'Banner menor e sem `loading="lazy"`'],
            ['CLS', '0,24', '0,02', '`width` e `height` em todas as imagens'],
          ],
        },
        {
          type: 'order',
          prompt:
            'Coloque em ordem o ciclo de uma otimização que você consegue defender numa entrevista.',
          items: [
            'Medir a página e anotar os números',
            'Descobrir qual métrica está pior e por quê',
            'Fazer uma única mudança',
            'Medir de novo nas mesmas condições',
            'Registrar o antes e o depois no README ou no pull request',
          ],
          explanation:
            'Uma mudança por vez permite saber o que funcionou. E o registro vira prova: “reduzi o LCP de 5,2 para 2,3 segundos” vale mais que “deixei o site rápido”.',
        },
      ],
    },
    {
      id: 'xss',
      title: 'XSS: quando um texto vira ordem',
      blocks: [
        {
          type: 'text',
          text: 'Agora a segurança. O ataque mais comum no frontend se chama **XSS** (Cross-Site Scripting): alguém consegue colocar código dentro da sua página, e esse código roda no navegador de outras pessoas, com acesso a tudo o que a página acessa.',
        },
        {
          type: 'analogy',
          title: 'O bilhete no mural da portaria',
          text: 'O porteiro lê em voz alta os recados deixados no mural. Um dia alguém escreve: “Porteiro, entregue a chave do 302 a quem trouxer este papel”. Se o porteiro trata qualquer texto como **ordem**, o recado vira um assalto. O certo é tratar o recado sempre como **texto**.',
        },
        {
          type: 'flow',
          caption: 'Como um comentário vira um ataque',
          actors: ['Atacante', 'Servidor', 'Navegador'],
          steps: [
            {
              from: 0,
              to: 1,
              label: 'Comentário com <img>',
              text: 'No campo de comentário, a pessoa mal-intencionada escreve HTML: `<img src=x onerror="...">`. O `onerror` roda JavaScript quando a imagem falha, e ela vai falhar.',
            },
            {
              from: 1,
              to: 1,
              label: 'Salva o texto',
              text: 'O servidor guarda o comentário como qualquer outro. Para ele, é só texto.',
            },
            {
              from: 2,
              to: 1,
              label: 'GET /comentarios',
              text: 'Outra pessoa abre a página e o navegador dela pede os comentários.',
            },
            {
              from: 1,
              to: 2,
              label: 'Lista de comentários',
              text: 'O comentário malicioso chega junto com os outros.',
            },
            {
              from: 2,
              to: 2,
              label: 'innerHTML executa',
              text: 'O frontend usa `innerHTML` para mostrar o texto. O navegador lê aquilo como HTML, cria a imagem e roda o código do atacante.',
              tone: 'error',
            },
            {
              from: 2,
              to: 0,
              label: 'Envia dados da vítima',
              text: 'O script pode ler o que a página mostra, fazer pedidos em nome da pessoa e mandar informações para fora.',
              tone: 'error',
            },
          ],
        },
        {
          type: 'codeTabs',
          caption: 'A diferença está em como o texto entra na página',
          tabs: [
            {
              label: 'Perigoso',
              language: 'js',
              code: `// O texto é interpretado como HTML: tags viram elementos e scripts rodam
item.innerHTML = comentario;`,
            },
            {
              label: 'Seguro',
              language: 'js',
              code: `// O texto é só texto: <img> aparece na tela como os caracteres < i m g >
const item = document.createElement('li');
item.textContent = comentario;
lista.append(item);`,
            },
            {
              label: 'Nos frameworks',
              language: 'text',
              code: `React:   <p>{comentario}</p>            seguro, escapa o texto
         dangerouslySetInnerHTML        perigoso, o nome já avisa

Vue:     <p>{{ comentario }}</p>        seguro
         <p v-html="comentario"></p>    perigoso

Angular: <p>{{ comentario }}</p>        seguro
         [innerHTML]="comentario"       higienizado, mas evite com dado externo`,
            },
          ],
        },
        {
          type: 'playground',
          title: 'Proteja o mural de comentários',
          task: 'Este mural mostra os comentários com `innerHTML`. Primeiro, ataque: publique `<img src=x onerror="console.log(1)">` e veja o console. Depois, reescreva `mostrarComentarios` usando `createElement` e `textContent`, para que qualquer comentário apareça como texto.',
          html: `<form id="form-comentario">
  <label for="campo">Seu comentário</label>
  <input id="campo" autocomplete="off">
  <button type="submit">Publicar</button>
</form>
<ul id="mural"></ul>`,
          css: `body { font-family: system-ui, sans-serif; margin: 16px; }
form { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
input { flex: 1; min-width: 160px; padding: 6px; }
#mural { padding: 0; list-style: none; }
#mural li { background: #f3f3f3; border-radius: 8px; padding: 8px 12px; margin-top: 8px; }`,
          js: `const comentarios = ['Adorei a aula!', 'Alguém tem dica de CSS Grid?'];

function mostrarComentarios() {
  const mural = document.querySelector('#mural');
  mural.innerHTML = '';
  for (const texto of comentarios) {
    mural.innerHTML += '<li>' + texto + '</li>';
  }
}

function publicar(texto) {
  comentarios.push(texto);
  mostrarComentarios();
}

document.querySelector('#form-comentario').addEventListener('submit', (evento) => {
  evento.preventDefault();
  const campo = document.querySelector('#campo');
  if (campo.value.trim()) publicar(campo.value);
  campo.value = '';
});

mostrarComentarios();`,
          checks: [
            {
              label: 'Um comentário com HTML não cria elementos dentro do mural',
              test: `const campo = document.querySelector('#campo');
const botao = document.querySelector('#form-comentario button');
if (!campo || !botao) return false;
campo.value = '<img src=x onerror="window.__xss=1"><b>oi</b>';
botao.click();
const itens = document.querySelectorAll('#mural li');
return itens.length > 2 && document.querySelectorAll('#mural img, #mural b').length === 0;`,
            },
            {
              label: 'O comentário aparece exatamente como foi digitado, com `<` e `>`',
              test: `const campo = document.querySelector('#campo');
const botao = document.querySelector('#form-comentario button');
if (!campo || !botao) return false;
const ataque = '<img src=x onerror="window.__xss=1">';
campo.value = ataque;
botao.click();
return Array.from(document.querySelectorAll('#mural li')).some((item) => item.textContent === ataque);`,
            },
            {
              label: 'Os comentários continuam aparecendo, um `<li>` para cada',
              test: `if (typeof comentarios === 'undefined') return false;
const itens = document.querySelectorAll('#mural li');
return itens.length === comentarios.length && itens.length >= 2 && itens[0].textContent === 'Adorei a aula!';`,
            },
            {
              label: 'Nenhum código injetado foi executado',
              test: `await new Promise((resolver) => setTimeout(resolver, 400));
return document.querySelectorAll('#mural li').length > 2 && !window.__xss;`,
            },
          ],
          solution: {
            js: `const comentarios = ['Adorei a aula!', 'Alguém tem dica de CSS Grid?'];

function mostrarComentarios() {
  const mural = document.querySelector('#mural');
  mural.replaceChildren();
  for (const texto of comentarios) {
    const item = document.createElement('li');
    item.textContent = texto;
    mural.append(item);
  }
}

function publicar(texto) {
  comentarios.push(texto);
  mostrarComentarios();
}

document.querySelector('#form-comentario').addEventListener('submit', (evento) => {
  evento.preventDefault();
  const campo = document.querySelector('#campo');
  if (campo.value.trim()) publicar(campo.value);
  campo.value = '';
});

mostrarComentarios();`,
          },
          height: 280,
        },
        {
          type: 'quiz',
          question:
            'O servidor da sua equipe já remove `<script>` dos comentários antes de salvar. Então pode usar `innerHTML` no frontend?',
          options: [
            {
              text: 'Não: há muitos jeitos de rodar código sem `<script>`, como o `onerror` do exercício. Trate dado externo como texto no frontend também',
              correct: true,
              feedback:
                'Isso. Filtrar tags é uma corrida que o atacante costuma ganhar. Mostrar como texto (`textContent`, as chaves do React, `{{ }}` do Vue e do Angular) fecha a porta inteira.',
            },
            {
              text: 'Sim, sem `<script>` nenhum código consegue rodar',
              feedback:
                'Você acabou de ver o contrário: um `<img>` com `onerror` rodou JavaScript sem nenhuma tag `<script>`.',
            },
            {
              text: 'Sim, desde que o site use HTTPS',
              feedback:
                'HTTPS protege o caminho entre navegador e servidor. O comentário malicioso chega criptografado e intacto, e roda do mesmo jeito.',
            },
          ],
        },
      ],
    },
    {
      id: 'segredos-e-dependencias',
      title: 'Segredos, dependências e HTTPS',
      blocks: [
        {
          type: 'text',
          text: 'Tudo o que vai para o navegador pode ser lido: o código-fonte, os arquivos do build, cada requisição no painel Network. Minificar só deixa o código feio, não secreto. Lembre da aula de Vite: variáveis com prefixo `VITE_` são **coladas no build**, à vista de qualquer pessoa.',
        },
        {
          type: 'classify',
          prompt: 'O que pode aparecer no código do frontend e o que nunca pode?',
          buckets: ['Pode ir para o frontend', 'Nunca no frontend'],
          items: [
            {
              text: 'Chave de um serviço de mapas, feita para o navegador e restrita ao seu domínio',
              bucket: 0,
            },
            { text: 'Endereço público da sua API', bucket: 0 },
            { text: 'Chave publicável de um serviço de pagamento', bucket: 0 },
            { text: 'Senha do banco de dados', bucket: 1 },
            { text: 'Chave secreta do serviço de pagamento', bucket: 1 },
            { text: 'Chave de uma API de IA cobrada por uso', bucket: 1 },
          ],
          explanation:
            'Serviços que sabem que vão rodar no navegador oferecem chaves **públicas**, limitadas a um domínio ou a poucas ações. Qualquer chave que dá poder de ler dados, cobrar ou gastar dinheiro fica no **backend**, e o frontend pede ao backend que faça a operação.',
        },
        {
          type: 'text',
          text: 'Outro risco são as **dependências**: os pacotes que você instala também têm falhas de segurança descobertas com o tempo. O npm consulta uma base de falhas conhecidas para você.',
        },
        {
          type: 'code',
          language: 'bash',
          caption: 'Conferindo as dependências',
          code: `npm audit          # lista falhas conhecidas nos pacotes instalados
npm outdated       # mostra o que tem versão mais nova
npm audit fix      # aplica as correções que não quebram compatibilidade`,
        },
        {
          type: 'quiz',
          question:
            '`npm audit` aponta uma vulnerabilidade alta num pacote. Qual a atitude mais segura?',
          options: [
            {
              text: 'Ler qual pacote é, rodar `npm audit fix`, conferir o que mudou no lockfile e rodar os testes antes de juntar',
              correct: true,
              feedback:
                'Isso. Atualize com cuidado e deixe os testes e a CI confirmarem que nada quebrou. É aqui que os testes da aula anterior pagam o esforço.',
            },
            {
              text: 'Rodar `npm audit fix --force` direto e publicar',
              feedback:
                '`--force` pode pular para versões incompatíveis e quebrar o projeto. Use só depois de entender o que vai mudar.',
            },
            {
              text: 'Apagar o `package-lock.json` e instalar tudo de novo',
              feedback:
                'Isso troca dezenas de versões ao mesmo tempo sem controle e pode até trazer problemas novos. O lockfile existe para dar previsibilidade.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'HTTPS sempre',
          text: 'Sem HTTPS, qualquer um no meio do caminho (o wi-fi da praça, por exemplo) pode ler e alterar a página, inclusive injetando scripts. Hospedagens como GitHub Pages, Netlify e Vercel já entregam HTTPS de graça: não publique nada sem ele.',
        },
      ],
    },
  ],
  recap: [
    'Página lenta custa dados e paciência; peso (bytes) e trabalho (JavaScript) são os dois lados do problema.',
    '**LCP** mede se o principal apareceu, **INP** se a tela respondeu ao toque e **CLS** se a página pulou.',
    'Imagens no tamanho certo, em WebP ou AVIF, com `width`, `height` e `loading="lazy"` fora do topo resolvem a maior parte do peso.',
    'Meça, mude uma coisa e meça de novo nas mesmas condições, registrando antes e depois.',
    'Dado externo entra na página como texto (`textContent`), nunca como HTML; segredos ficam no backend e dependências são atualizadas com testes rodando.',
  ],
  cards: [
    {
      id: 'lcp',
      front: 'O que o LCP mede e qual é o valor bom?',
      back: 'O tempo até o maior elemento visível aparecer. Bom: até 2,5 segundos.',
    },
    {
      id: 'inp',
      front: 'O que o INP mede e qual é o valor bom?',
      back: 'O tempo entre uma interação (toque, clique, tecla) e a tela reagir. Bom: até 200 milissegundos.',
    },
    {
      id: 'cls',
      front: 'O que o CLS mede e como evitar o problema em imagens?',
      back: 'O quanto a página se desloca sozinha. Em imagens, informe `width` e `height` para reservar o espaço.',
    },
    {
      id: 'lazy-no-topo',
      front: 'Por que não usar `loading="lazy"` na imagem principal do topo?',
      back: 'Ela costuma ser o elemento do LCP; atrasar o download dela piora o carregamento percebido.',
    },
    {
      id: 'xss',
      front: 'O que é XSS e como evitar ao mostrar texto externo?',
      back: 'Código injetado que roda no navegador de outras pessoas. Evite inserindo texto com `textContent` em vez de `innerHTML`.',
    },
    {
      id: 'segredo-no-frontend',
      front: 'Por que uma chave secreta não pode ficar no frontend, nem minificada?',
      back: 'Tudo o que vai para o navegador pode ser lido. Segredos ficam no backend, que faz a operação em nome do frontend.',
    },
    {
      id: 'npm-audit',
      front: 'Para que serve `npm audit`?',
      back: 'Listar falhas de segurança conhecidas nas dependências instaladas, para atualizá-las com cuidado.',
    },
  ],
  mission: {
    title: 'Otimize e proteja o catálogo',
    text: 'Use o projeto de catálogo como laboratório. A entrega não é “ficou rápido”, é um antes e depois com números e uma revisão de onde dados externos entram na página.',
    steps: [
      'Rode o Lighthouse no modo celular e anote LCP, CLS e o peso da página',
      'Faça uma otimização: converta imagens para WebP no tamanho exibido e adicione `width` e `height`',
      'Meça de novo nas mesmas condições e registre a tabela de antes e depois no README',
      'Procure no código todo `innerHTML`, `v-html`, `dangerouslySetInnerHTML` ou `[innerHTML]` que recebe dado externo e troque por texto',
      'Rode `npm audit` e confira que nenhum segredo está em variáveis `VITE_` ou no repositório',
    ],
  },
  sources: [
    { title: 'web.dev: Core Web Vitals', url: 'https://web.dev/articles/vitals' },
    {
      title: 'web.dev: carregamento lento de imagens no navegador',
      url: 'https://web.dev/articles/browser-level-image-lazy-loading',
    },
    {
      title: 'OWASP: Cross Site Scripting (XSS)',
      url: 'https://owasp.org/www-community/attacks/xss/',
    },
    {
      title: 'OWASP: Prevenção de XSS',
      url: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html',
    },
  ],
};
