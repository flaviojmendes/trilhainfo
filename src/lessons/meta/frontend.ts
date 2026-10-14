import { LessonMeta } from '../types';

const updatedAt = '2026-10-14';

export const lessons: LessonMeta[] = [
  {
    id: 'como-a-web-funciona',
    title: 'Como a web funciona',
    summary:
      'O caminho de um clique até a página aparecer: cliente, servidor, endereço, DNS e a conversa em HTTP.',
    minutes: 14,
    groupIds: ['curriculum.internet-e-http'],
    objectives: [
      'Explicar com suas palavras o que é cliente e o que é servidor',
      'Ler as partes de uma URL',
      'Descrever uma requisição e uma resposta HTTP, incluindo o status',
      'Abrir o painel Network e encontrar uma requisição',
    ],
    updatedAt,
    load: () => import('../content/comoAWebFunciona'),
  },
  {
    id: 'seu-kit-de-trabalho',
    title: 'Seu kit de trabalho',
    summary:
      'Navegador, ferramentas de desenvolvimento, editor de código e terminal: o que cada um faz e como criar seu primeiro arquivo.',
    minutes: 12,
    groupIds: ['curriculum.internet-e-http'],
    objectives: [
      'Criar uma pasta de projeto e um arquivo index.html no editor',
      'Abrir as ferramentas de desenvolvimento e usar o console',
      'Navegar entre pastas no terminal com cd, ls e pwd',
    ],
    updatedAt,
    load: () => import('../content/seuKitDeTrabalho'),
  },
  {
    id: 'git-do-zero',
    title: 'Git do zero',
    summary:
      'Um histórico do projeto que você pode consultar e desfazer: commits, staging, branches e o pull request.',
    minutes: 16,
    groupIds: ['curriculum.controle-de-versao'],
    objectives: [
      'Explicar a diferença entre pasta de trabalho, staging e histórico',
      'Fazer commits pequenos com mensagens úteis',
      'Criar uma branch, juntar mudanças e resolver um conflito simples',
      'Publicar o repositório no GitHub e abrir um pull request',
    ],
    updatedAt,
    load: () => import('../content/gitDoZero'),
  },
  {
    id: 'html-primeira-pagina',
    title: 'HTML: sua primeira página',
    summary:
      'Tags, elementos e atributos: como o HTML dá significado ao conteúdo e como o navegador o transforma numa árvore.',
    minutes: 14,
    groupIds: ['curriculum.html'],
    objectives: [
      'Reconhecer a anatomia de um elemento: tag, atributo e conteúdo',
      'Montar a estrutura mínima de um documento HTML',
      'Usar títulos, parágrafos, listas, links e imagens',
      'Desenhar a árvore DOM de um trecho de HTML',
    ],
    updatedAt,
    load: () => import('../content/htmlPrimeiraPagina'),
  },
  {
    id: 'html-semantica-e-formularios',
    title: 'HTML semântico e formulários',
    summary:
      'Escolher a tag pelo significado, não pela aparência, e construir formulários que qualquer pessoa consegue preencher.',
    minutes: 16,
    groupIds: ['curriculum.html'],
    objectives: [
      'Organizar uma página com header, nav, main, section e footer',
      'Escrever texto alternativo útil para imagens',
      'Ligar cada campo a um label e usar validação nativa',
      'Escolher entre link e botão',
    ],
    updatedAt,
    load: () => import('../content/htmlSemanticaEFormularios'),
  },
  {
    id: 'css-seletores-e-cascata',
    title: 'CSS: seletores e cascata',
    summary:
      'Como escolher elementos, por que uma regra vence a outra e como a herança economiza código.',
    minutes: 15,
    groupIds: ['curriculum.css'],
    objectives: [
      'Ler e escrever uma regra CSS: seletor, propriedade e valor',
      'Usar seletores de tipo, classe, id e combinações',
      'Calcular a especificidade e prever qual regra vence',
      'Explicar o que é herdado e o que não é',
    ],
    updatedAt,
    load: () => import('../content/cssSeletoresECascata'),
  },
  {
    id: 'css-tudo-e-caixa',
    title: 'CSS: tudo é uma caixa',
    summary:
      'Conteúdo, padding, borda e margem; block e inline; e as unidades que tornam o tamanho previsível.',
    minutes: 12,
    groupIds: ['curriculum.css'],
    objectives: [
      'Calcular o tamanho final de uma caixa',
      'Explicar por que usar box-sizing: border-box',
      'Diferenciar elementos block e inline',
      'Escolher entre px, rem, % e unidades de viewport',
    ],
    updatedAt,
    load: () => import('../content/cssTudoECaixa'),
  },
  {
    id: 'css-flexbox-e-grid',
    title: 'Layout com Flexbox e Grid',
    summary:
      'Organizar itens em linha, em coluna e em grade, experimentando cada propriedade e vendo o resultado na hora.',
    minutes: 16,
    groupIds: ['curriculum.css'],
    objectives: [
      'Distinguir eixo principal e eixo cruzado no Flexbox',
      'Alinhar e distribuir itens com justify-content, align-items e gap',
      'Criar uma grade com grid-template-columns e fr',
      'Escolher Flexbox ou Grid para um caso real',
    ],
    updatedAt,
    load: () => import('../content/cssFlexboxEGrid'),
  },
  {
    id: 'css-responsivo',
    title: 'Páginas responsivas',
    summary:
      'Uma página que funciona do celular ao monitor: mobile first, media queries, imagens fluidas e texto legível.',
    minutes: 12,
    groupIds: ['curriculum.css'],
    objectives: [
      'Explicar a meta tag viewport',
      'Escrever estilos mobile first com media queries de largura mínima',
      'Deixar imagens e grades fluidas sem rolagem horizontal',
    ],
    updatedAt,
    load: () => import('../content/cssResponsivo'),
  },
  {
    id: 'acessibilidade-para-todos',
    title: 'Acessibilidade: a web é para todo mundo',
    summary:
      'Quem usa a web de formas diferentes, como um leitor de tela lê sua página e as verificações que evitam exclusão.',
    minutes: 15,
    groupIds: ['curriculum.acessibilidade'],
    objectives: [
      'Citar formas diferentes de usar a web e quem se beneficia da acessibilidade',
      'Usar a página só com o teclado e reconhecer foco visível',
      'Verificar o contraste entre texto e fundo',
      'Comparar o que um leitor de tela anuncia em marcações diferentes',
    ],
    updatedAt,
    load: () => import('../content/acessibilidadeParaTodos'),
  },
  {
    id: 'js-valores-e-variaveis',
    title: 'JavaScript: valores e variáveis',
    summary:
      'O primeiro contato com programação: o console, tipos de valor, variáveis e operações, vendo a memória mudar linha a linha.',
    minutes: 15,
    groupIds: ['curriculum.javascript', 'react.revise-javascript'],
    objectives: [
      'Usar console.log para inspecionar valores',
      'Diferenciar string, number, boolean, null e undefined',
      'Escolher entre const e let',
      'Prever o resultado de operações e comparações',
    ],
    updatedAt,
    load: () => import('../content/jsValoresEVariaveis'),
  },
  {
    id: 'js-decisoes-funcoes-e-repeticoes',
    title: 'JavaScript: decisões, funções e repetições',
    summary:
      'if, funções e laços: como um programa escolhe um caminho, reaproveita passos e repete tarefas sem copiar código.',
    minutes: 18,
    groupIds: ['curriculum.javascript', 'react.revise-javascript'],
    objectives: [
      'Escrever condições com if, else e operadores lógicos',
      'Criar funções com parâmetros e retorno',
      'Repetir passos com for e for...of',
      'Seguir a execução de um programa passo a passo',
    ],
    updatedAt,
    load: () => import('../content/jsDecisoesFuncoesERepeticoes'),
  },
  {
    id: 'js-arrays-e-objetos',
    title: 'JavaScript: listas e objetos',
    summary:
      'Guardar muitos valores e descrever coisas do mundo real; transformar listas com map, filter e find.',
    minutes: 16,
    groupIds: ['curriculum.javascript', 'react.revise-javascript'],
    objectives: [
      'Criar e acessar arrays e objetos',
      'Transformar listas com map, filter e find',
      'Entender que objetos e arrays são referências',
      'Ler e escrever dados em JSON',
    ],
    updatedAt,
    load: () => import('../content/jsArraysEObjetos'),
  },
  {
    id: 'js-dom-e-eventos',
    title: 'JavaScript na página: DOM e eventos',
    summary:
      'Selecionar elementos, mudar a página e reagir a cliques e formulários, com segurança e sem recarregar.',
    minutes: 16,
    groupIds: ['curriculum.javascript', 'react.revise-javascript'],
    objectives: [
      'Selecionar elementos com querySelector',
      'Alterar texto, classes e atributos',
      'Reagir a eventos com addEventListener',
      'Criar elementos a partir de dados sem usar innerHTML com texto externo',
    ],
    updatedAt,
    load: () => import('../content/jsDomEEventos'),
  },
  {
    id: 'js-assincrono-e-apis',
    title: 'Esperar sem travar: assíncrono e APIs',
    summary:
      'Promises, async/await e fetch: buscar dados de uma API e mostrar carregamento, sucesso, lista vazia e erro.',
    minutes: 18,
    groupIds: ['curriculum.javascript', 'react.revise-javascript'],
    objectives: [
      'Explicar por que algumas operações são assíncronas',
      'Usar async/await com try/catch',
      'Buscar JSON com fetch e verificar response.ok',
      'Projetar os quatro estados de uma tela que depende de dados',
    ],
    updatedAt,
    load: () => import('../content/jsAssincronoEApis'),
  },
  {
    id: 'typescript-tipos-que-protegem',
    title: 'TypeScript: tipos que protegem',
    summary:
      'Descrever a forma dos dados para que o editor aponte erros antes de você abrir o navegador.',
    minutes: 15,
    groupIds: ['curriculum.typescript'],
    objectives: [
      'Anotar tipos em variáveis, parâmetros e retornos',
      'Descrever objetos com type e interface',
      'Usar unions e narrowing para tratar cada caso',
      'Explicar por que tipos não validam dados vindos da rede',
    ],
    updatedAt,
    load: () => import('../content/typescriptTiposQueProtegem'),
  },
  {
    id: 'ferramentas-npm-e-vite',
    title: 'Ferramentas: npm, Vite e qualidade',
    summary:
      'Pacotes, scripts, lockfile, servidor de desenvolvimento e build; e por que segredo nunca vai para o frontend.',
    minutes: 12,
    groupIds: ['frontend.vite-pacotes-e-qualidade', 'react.configuracao-com-vite'],
    objectives: [
      'Ler um package.json e rodar scripts',
      'Explicar o papel do lockfile',
      'Criar um projeto com Vite e gerar o build',
      'Separar variáveis públicas de segredos',
    ],
    updatedAt,
    load: () => import('../content/ferramentasNpmEVite'),
  },
  {
    id: 'componentes-e-estado',
    title: 'Componentes, props e estado',
    summary:
      'A ideia que React, Vue e Angular compartilham: dividir a tela em peças e deixar a interface seguir os dados.',
    minutes: 18,
    groupIds: [
      'frontend.componentes-com-react',
      'frontend.componentes-com-vue',
      'frontend.componentes-com-angular',
      'fullstack.react-e-node-js',
    ],
    objectives: [
      'Dividir uma tela em componentes',
      'Passar dados por props e avisar o pai com eventos',
      'Decidir onde cada estado deve ficar',
      'Reconhecer o mesmo componente em React, Vue e Angular',
    ],
    updatedAt,
    load: () => import('../content/componentesEEstado'),
  },
  {
    id: 'testes-de-interface',
    title: 'Testes de interface',
    summary:
      'Provar que a tela funciona como quem usa espera: testes de função, de componente e de ponta a ponta.',
    minutes: 14,
    groupIds: ['frontend.testes-de-interface'],
    objectives: [
      'Escrever um teste com organizar, agir e verificar',
      'Buscar elementos como uma pessoa usuária faria',
      'Escolher entre teste de unidade, de componente e de ponta a ponta',
    ],
    updatedAt,
    load: () => import('../content/testesDeInterface'),
  },
  {
    id: 'desempenho-e-seguranca',
    title: 'Desempenho e segurança web',
    summary:
      'Páginas rápidas em celulares modestos e protegidas contra XSS e vazamento de segredos.',
    minutes: 15,
    groupIds: ['frontend.desempenho-e-seguranca-web'],
    objectives: [
      'Explicar LCP, INP e CLS',
      'Reduzir peso de imagens e de JavaScript',
      'Reconhecer e evitar XSS',
      'Explicar por que segredos não podem ficar no frontend',
    ],
    updatedAt,
    load: () => import('../content/desempenhoESeguranca'),
  },
  {
    id: 'carreira-e-ia',
    title: 'Portfólio, carreira e IA',
    summary:
      'Mostrar o que você sabe fazer, procurar a primeira oportunidade e usar IA sem terceirizar o aprendizado.',
    minutes: 12,
    groupIds: ['curriculum.portfolio-e-candidatura', 'curriculum.ia-no-fluxo-de-trabalho'],
    objectives: [
      'Escrever um README que explica problema, decisões e limites',
      'Ler uma vaga e escolher a próxima lacuna para estudar',
      'Usar IA para explicar e revisar, conferindo cada resposta',
    ],
    updatedAt,
    load: () => import('../content/carreiraEIa'),
  },
];
