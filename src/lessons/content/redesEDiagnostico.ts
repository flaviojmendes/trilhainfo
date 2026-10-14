import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: '“O site caiu” é a frase mais vaga que existe, e você vai ouvi-la muitas vezes. Pode ser um nome digitado errado, um servidor desligado, uma porta bloqueada ou um programa travado, e cada caso tem um conserto diferente. Quem sabe seguir a requisição passo a passo descobre o culpado em minutos, em vez de reiniciar tudo e torcer.',
  sections: [
    {
      id: 'ip-e-porta',
      title: 'Endereço e porta: o prédio e o apartamento',
      blocks: [
        {
          type: 'analogy',
          title: 'Um prédio com muitos apartamentos',
          text: 'Para entregar um pacote num prédio, o entregador do iFood precisa de duas informações: o endereço do prédio e o número do apartamento. Na rede, o **endereço IP** é o prédio: identifica a máquina. A **porta** é o apartamento: identifica qual programa, dentro daquela máquina, vai receber a conversa.',
        },
        {
          type: 'text',
          text: 'Um IP comum tem quatro números de 0 a 255, como `192.168.0.15`. Uma mesma máquina roda vários programas ao mesmo tempo, cada um “morando” numa porta, um número de 0 a 65535. O endereço completo de um serviço junta os dois: `192.168.0.15:5432`.',
        },
        {
          type: 'table',
          caption: 'Portas que você vai encontrar o tempo todo',
          head: ['Porta', 'Quem costuma morar lá'],
          rows: [
            ['`22`', 'SSH: acesso remoto ao terminal de um servidor'],
            ['`80`', 'HTTP: sites sem criptografia'],
            ['`443`', 'HTTPS: sites com criptografia, quase todos hoje'],
            ['`5432`', 'PostgreSQL, um banco de dados muito usado'],
            ['`3000`, `5173`, `8000`, `8080`', 'Aplicações rodando em desenvolvimento'],
          ],
        },
        {
          type: 'terms',
          items: [
            {
              term: '`localhost` ou `127.0.0.1`',
              text: 'Um endereço especial que sempre significa “esta mesma máquina”. É como falar com alguém do próprio apartamento sem sair de casa.',
            },
            {
              term: 'IP privado',
              text: 'Endereços como `192.168.x.x` e `10.x.x.x` só valem dentro de uma rede local, como a do Wi-Fi da sua casa. De fora, ninguém chega neles diretamente.',
            },
            {
              term: 'IP público',
              text: 'O endereço visível na internet. Quando seu celular acessa um site, o servidor vê o IP público do seu roteador ou da operadora.',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Uma pessoa da equipe roda a API no notebook dela e manda para você: “acessa `http://localhost:8000`”. Você abre no seu computador e não carrega. Por quê?',
          options: [
            {
              text: '`localhost` no seu computador aponta para o seu computador, onde a API não está rodando',
              correct: true,
              feedback:
                'Isso. `localhost` sempre significa “a máquina onde estou”. Para acessar a API dela, você precisaria do IP do notebook dela na rede, e a API teria que aceitar conexões de fora.',
            },
            {
              text: 'A porta `8000` só funciona em notebooks',
              feedback:
                'Portas não dependem do tipo de máquina. Qualquer computador pode ter um programa ouvindo na `8000`.',
            },
            {
              text: 'Faltou o `www` antes de `localhost`',
              feedback:
                '`www` é só um pedaço de alguns nomes de domínio. `localhost` é um nome especial e nunca leva `www`.',
            },
          ],
        },
      ],
    },
    {
      id: 'dns-tcp-firewall',
      title: 'DNS, TCP, UDP e o porteiro',
      blocks: [
        {
          type: 'text',
          text: 'Na aula Como a web funciona você viu que o **DNS** traduz nomes como `loja.exemplo.com.br` em endereços IP, como uma agenda de contatos. Quando o DNS falha ou aponta para o lugar errado, nada mais funciona, mesmo com o servidor perfeito. Por isso ele é um dos primeiros suspeitos.',
        },
        {
          type: 'analogy',
          title: 'Ligação telefônica ou aviso no alto-falante',
          text: 'O **TCP** funciona como uma ligação: primeiro alguém atende, depois a conversa acontece em ordem e, se uma frase se perde, ela é repetida. O **UDP** é como o aviso no alto-falante da rodoviária: a mensagem sai sem confirmar se alguém ouviu. É mais rápido, mas pode perder pedaços.',
        },
        {
          type: 'text',
          text: 'Sites, APIs, bancos de dados e SSH usam TCP, porque não podem perder nenhum byte. Chamadas de vídeo e jogos online costumam usar UDP: um quadro perdido é melhor do que a imagem congelar esperando. As consultas de DNS normalmente vão por UDP, por serem pequenas e rápidas.',
        },
        {
          type: 'analogy',
          title: 'O firewall é o porteiro',
          text: 'Mesmo com o endereço e o apartamento certos, o entregador passa pela portaria. O **firewall** é esse porteiro: uma lista de regras que decide quais portas aceitam visitas e de onde. Um servidor pode estar ligado e com o programa rodando, mas se o firewall não libera a porta, a conexão nunca chega.',
        },
        {
          type: 'reveal',
          question:
            'Quando a porta está fechada, às vezes a resposta vem na hora (`Connection refused`) e às vezes a conexão fica esperando até desistir (timeout). O que cada caso sugere?',
          answer:
            '`Connection refused` é o prédio respondendo “não mora ninguém nesse apartamento”: a máquina está lá, mas nenhum programa ouve aquela porta. O timeout é o porteiro que nem responde: geralmente um firewall descartando o pacote em silêncio, ou uma máquina inalcançável.',
        },
        {
          type: 'classify',
          prompt: 'Qual protocolo costuma ser usado em cada situação?',
          buckets: ['TCP: tudo precisa chegar, em ordem', 'UDP: rapidez importa mais'],
          items: [
            { text: 'Carregar a página de um banco', bucket: 0 },
            { text: 'Gravar um pedido no PostgreSQL', bucket: 0 },
            { text: 'Acessar um servidor por SSH', bucket: 0 },
            { text: 'Chamada de vídeo com a família', bucket: 1 },
            { text: 'Partida de jogo online', bucket: 1 },
            { text: 'Consulta rápida de DNS', bucket: 1 },
          ],
          explanation:
            'A pergunta-chave é: perder um pedaço estraga tudo? Num pedido de compra, sim, então TCP. Numa chamada de vídeo, um quadro perdido quase não se nota, então UDP.',
        },
      ],
    },
    {
      id: 'caminho-do-diagnostico',
      title: 'O roteiro de diagnóstico',
      blocks: [
        {
          type: 'text',
          text: 'Diagnosticar rede é fazer perguntas em ordem, da mais básica para a mais específica, e só passar para a próxima quando a anterior foi respondida. Cada pergunta tem uma ferramenta de terminal.',
        },
        {
          type: 'table',
          caption: 'Cinco ferramentas, cinco perguntas',
          head: ['Ferramenta', 'Pergunta que ela responde', 'Onde rodar'],
          rows: [
            ['`ping host`', 'A máquina responde na rede?', 'Do seu lado'],
            ['`dig host` ou `nslookup host`', 'O nome vira o IP certo?', 'Do seu lado'],
            [
              '`curl -v url`',
              'A conexão abre e o serviço responde HTTP? Com que status?',
              'Do seu lado',
            ],
            [
              '`ss -tlnp` (ou o antigo `netstat -tlnp`)',
              'Tem algum programa ouvindo na porta, e em qual endereço?',
              'No servidor',
            ],
            ['`traceroute host`', 'Em que ponto do caminho os pacotes param?', 'Do seu lado'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Ping sem resposta não prova que o servidor caiu',
          text: 'Muitos provedores de nuvem e firewalls bloqueiam o `ping` de propósito. Se o `ping` falha, mas o `curl` funciona, está tudo bem. Use o `ping` como pista, nunca como veredito.',
        },
        {
          type: 'order',
          prompt: 'Coloque o roteiro de diagnóstico na ordem usada nesta aula.',
          items: [
            '`ping`: a máquina responde?',
            '`dig`: o nome aponta para o IP certo?',
            '`curl -v`: a conexão abre e o HTTP responde?',
            '`ss -tlnp`: no servidor, quem ouve a porta?',
            '`traceroute`: onde o caminho para?',
          ],
          explanation:
            'Começar pelo básico evita horas mexendo no código de uma aplicação quando o problema era um nome digitado errado. O `traceroute` fica por último porque só ajuda quando o problema está no caminho entre as máquinas.',
        },
      ],
    },
    {
      id: 'lendo-saidas',
      title: 'Três chamados, três culpados',
      blocks: [
        {
          type: 'text',
          text: 'Agora você vai atender três chamados reais, numa simulação. Em cada um, leia a saída com calma: a resposta está escrita ali, só precisa ser encontrada.',
        },
        {
          type: 'terminal',
          title: 'Chamado 1: “a API não abre”',
          task: 'A integração com a API da loja parou de funcionar depois de uma mudança de configuração. Descubra em que etapa a conversa quebra.',
          prompt: 'ana@notebook:~$',
          steps: [
            {
              goal: 'Teste se a máquina `api.lojaexemplo.com.br` responde, mandando 2 pacotes.',
              command: ['ping -c 2 api.lojaexemplo.com.br', 'ping -c2 api.lojaexemplo.com.br'],
              output: 'ping: api.lojaexemplo.com.br: Name or service not known',
              hint: 'Use `ping -c 2` seguido do nome. O `-c 2` limita a dois pacotes.',
            },
            {
              goal: 'O ping nem chegou a tentar: o nome não foi encontrado. Pergunte ao DNS pelo nome.',
              command: [
                'dig api.lojaexemplo.com.br',
                'nslookup api.lojaexemplo.com.br',
                'dig +short api.lojaexemplo.com.br',
              ],
              output:
                ';; ->>HEADER<<- opcode: QUERY, status: NXDOMAIN, id: 40211\n;; QUESTION SECTION:\n;api.lojaexemplo.com.br.\t\tIN\tA\n\n;; AUTHORITY SECTION:\nlojaexemplo.com.br.\t300\tIN\tSOA\tns1.lojaexemplo.com.br. admin.lojaexemplo.com.br.',
              hint: 'Use `dig` seguido do nome.',
            },
            {
              goal: '`NXDOMAIN` quer dizer “esse nome não existe”. Confira o nome que a documentação da loja informa: `api.loja-exemplo.com.br`, com hífen.',
              command: [
                'dig +short api.loja-exemplo.com.br',
                'dig api.loja-exemplo.com.br',
                'nslookup api.loja-exemplo.com.br',
              ],
              output: '203.0.113.42',
              hint: 'Repita o `dig`, agora com o nome com hífen. `dig +short` mostra só o IP.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Culpado do chamado 1: **DNS**, por um nome digitado sem o hífen na configuração. O servidor estava perfeito o tempo todo. Repare na pista: `Name or service not known` aparece antes de qualquer tentativa de conexão.',
        },
        {
          type: 'terminal',
          title: 'Chamado 2: “o site está fora”',
          task: 'O site da padaria parou de responder. O nome resolve normalmente. Siga em frente no roteiro.',
          prompt: 'ana@notebook:~$',
          steps: [
            {
              goal: 'Veja em detalhes a tentativa de conexão com `http://padaria.exemplo.com.br:8080`.',
              command: [
                'curl -v http://padaria.exemplo.com.br:8080',
                'curl -v padaria.exemplo.com.br:8080',
              ],
              output:
                "*   Trying 203.0.113.80:8080...\n* connect to 203.0.113.80 port 8080 failed: Connection refused\n* Failed to connect to padaria.exemplo.com.br port 8080 after 41 ms: Couldn't connect to server\ncurl: (7) Failed to connect to padaria.exemplo.com.br port 8080 after 41 ms: Couldn't connect to server",
              hint: 'Use `curl -v` seguido do endereço completo, com a porta.',
            },
            {
              goal: 'A resposta veio rápido: “Connection refused”. A máquina existe, mas ninguém atendeu. Entre no servidor e veja quem ouve quais portas TCP.',
              command: [
                'ss -tlnp',
                'sudo ss -tlnp',
                'ss -tln',
                'netstat -tlnp',
                'sudo netstat -tlnp',
              ],
              prompt: 'ana@padaria-srv:~$',
              output:
                'State   Recv-Q  Send-Q   Local Address:Port   Peer Address:Port  Process\nLISTEN  0       128            0.0.0.0:22          0.0.0.0:*      users:(("sshd",pid=702,fd=3))\nLISTEN  0       511          127.0.0.1:8080        0.0.0.0:*      users:(("node",pid=3310,fd=19))\nLISTEN  0       244          127.0.0.1:5432        0.0.0.0:*      users:(("postgres",pid=1033,fd=6))',
              hint: 'Use `ss -tlnp`: TCP, só quem está ouvindo (listen), números em vez de nomes, e o processo.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Achou? O programa `node` ouve a porta `8080`, mas em `127.0.0.1`, ou seja, só aceita conversas vindas da própria máquina. O SSH, em `0.0.0.0`, aceita de qualquer lugar. Culpado do chamado 2: a **aplicação** foi configurada para ouvir só o `localhost`. O conserto é fazê-la ouvir em `0.0.0.0`, ou colocar um proxy na frente.',
        },
        {
          type: 'quiz',
          question:
            'Na saída do `ss`, o PostgreSQL aparece em `127.0.0.1:5432`. A aplicação roda na mesma máquina. Isso é um problema?',
          options: [
            {
              text: 'Não. A aplicação está na mesma máquina, e esconder o banco do resto da rede é até mais seguro',
              correct: true,
              feedback:
                'Exato. Ouvir só no `localhost` é um problema para quem precisa ser acessado de fora, como o site. Para o banco, que só a aplicação local usa, é uma boa prática.',
            },
            {
              text: 'Sim. Todo serviço deveria ouvir em `0.0.0.0`',
              feedback:
                'Expor um banco para a rede inteira sem necessidade aumenta o risco de ataque. Cada serviço deve ouvir só onde precisa.',
            },
            {
              text: 'Sim. A porta `5432` está errada para o PostgreSQL',
              feedback: '`5432` é justamente a porta padrão do PostgreSQL.',
            },
          ],
        },
        {
          type: 'terminal',
          title: 'Chamado 3: “fica carregando para sempre”',
          task: 'Um painel interno não abre: o navegador fica girando até desistir. O nome resolve para `198.51.100.23`. Investigue.',
          prompt: 'ana@notebook:~$',
          steps: [
            {
              goal: 'Teste a conexão HTTPS com `https://painel.exemplo.com.br`, limitando a espera a 5 segundos com `--max-time 5`.',
              command: [
                'curl -v --max-time 5 https://painel.exemplo.com.br',
                'curl -v -m 5 https://painel.exemplo.com.br',
                'curl --max-time 5 -v https://painel.exemplo.com.br',
              ],
              output:
                '*   Trying 198.51.100.23:443...\n* Connection timed out after 5001 milliseconds\ncurl: (28) Connection timed out after 5001 milliseconds',
              hint: 'Use `curl -v --max-time 5` seguido do endereço.',
            },
            {
              goal: 'Nada de “refused”: a conexão ficou no vácuo. Veja até onde os pacotes chegam no caminho.',
              command: [
                'traceroute painel.exemplo.com.br',
                'traceroute 198.51.100.23',
                'tracepath painel.exemplo.com.br',
              ],
              output:
                'traceroute to painel.exemplo.com.br (198.51.100.23), 30 hops max\n 1  192.168.0.1      1.8 ms   1.6 ms   1.7 ms\n 2  10.42.0.1        9.4 ms   9.1 ms   9.8 ms\n 3  200.160.0.9     14.2 ms  13.9 ms  14.5 ms\n 4  198.51.100.1    18.7 ms  18.3 ms  18.9 ms\n 5  * * *\n 6  * * *',
              hint: 'Use `traceroute` seguido do nome.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Os pacotes atravessam o seu roteador, o provedor e chegam ao roteador da rede do painel (`198.51.100.1`). Depois disso, silêncio: as estrelas mostram que ninguém responde. Com o timeout no `curl`, a suspeita forte é um **firewall** na frente do servidor descartando a porta `443`. O próximo passo é pedir para quem administra conferir as regras.',
        },
        {
          type: 'quiz',
          question:
            'No chamado 3, alguém propõe reiniciar a aplicação do painel. Por que isso provavelmente não vai resolver?',
          options: [
            {
              text: 'Porque a conexão nem chega à aplicação: os pacotes param antes, na rede do servidor',
              correct: true,
              feedback:
                'Isso. O timeout e as estrelas do `traceroute` mostram que a conversa não atravessa até a porta. Reiniciar o programa não muda uma regra de firewall.',
            },
            {
              text: 'Porque o DNS está errado',
              feedback:
                'O nome resolveu para `198.51.100.23` e os pacotes chegaram perto desse endereço. O DNS fez a parte dele.',
            },
            {
              text: 'Porque o `curl` não funciona com HTTPS',
              feedback:
                'O `curl` fala HTTPS normalmente. Ele não conseguiu nem abrir a conexão TCP, que vem antes da criptografia.',
            },
          ],
        },
      ],
    },
    {
      id: 'sintoma-e-camada',
      title: 'Do sintoma à camada',
      blocks: [
        {
          type: 'text',
          text: 'Com prática, você olha uma mensagem de erro e já sabe por onde começar. Pense em camadas: primeiro o **nome** precisa virar endereço, depois o **caminho** precisa levar até a máquina, depois a **porta** precisa estar aberta e atendida, e só então a **aplicação** responde.',
        },
        {
          type: 'classify',
          prompt: 'Em qual camada você começaria a investigar cada sintoma?',
          buckets: ['Nome (DNS)', 'Caminho de rede', 'Porta ou firewall', 'Aplicação'],
          items: [
            { text: '`Could not resolve host: api.exemplo.com`', bucket: 0 },
            { text: '`dig` responde `NXDOMAIN`', bucket: 0 },
            { text: '`traceroute` só mostra `* * *` a partir do roteador do provedor', bucket: 1 },
            { text: '`curl: (7) Connection refused`', bucket: 2 },
            { text: 'O `ping` responde, mas a conexão na porta `5432` dá timeout', bucket: 2 },
            { text: '`HTTP/1.1 500 Internal Server Error`', bucket: 3 },
            { text: '`HTTP/1.1 404 Not Found` em `/api/v2/pedidos`', bucket: 3 },
          ],
          explanation:
            'Se o erro tem um status HTTP, a conversa chegou até a aplicação: a rede está funcionando. Se nem conectou, o problema está numa camada de baixo. Essa separação sozinha já corta metade do trabalho.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Anote o que testou',
          text: 'Num chamado, escreva cada comando e o que ele mostrou, mesmo o que deu certo. “Ping ok, dig ok, curl recusado na 8080” já entrega metade da solução para quem pegar o problema depois de você.',
        },
        {
          type: 'quiz',
          question:
            'Uma pessoa diz “a API caiu”. Você roda `curl -v` e recebe `HTTP/1.1 503 Service Unavailable`. O que dá para concluir?',
          options: [
            {
              text: 'DNS, rede e porta estão funcionando; quem respondeu com erro foi o software do outro lado',
              correct: true,
              feedback:
                'Isso. Para receber um status HTTP, o nome resolveu, a conexão abriu e um programa respondeu. Agora o caminho é olhar os logs da aplicação ou do proxy.',
            },
            {
              text: 'O DNS está apontando para o lugar errado',
              feedback:
                'Pode até acontecer de apontar para outro servidor que responde 503, mas o mais provável é que você chegou no lugar certo. Um DNS quebrado normalmente nem deixa conectar.',
            },
            {
              text: 'O firewall bloqueou a porta',
              feedback:
                'Com a porta bloqueada, você veria timeout ou conexão recusada, não uma resposta HTTP completa.',
            },
          ],
        },
      ],
    },
  ],
  recap: [
    'O **IP** identifica a máquina e a **porta** identifica o programa dentro dela; `localhost` é sempre a própria máquina.',
    'O **DNS** traduz nomes em IPs; o **TCP** garante entrega em ordem e o **UDP** troca garantia por rapidez; o **firewall** decide quais portas aceitam visitas.',
    'O roteiro é `ping`, `dig`, `curl -v`, `ss -tlnp` e `traceroute`, do mais básico ao mais específico.',
    '`NXDOMAIN` aponta para DNS, `Connection refused` para porta sem programa, timeout para firewall ou caminho, e um status HTTP para a aplicação.',
  ],
  cards: [
    {
      id: 'ip-porta',
      front: 'Na analogia do prédio, o que são o IP e a porta?',
      back: 'O IP é o endereço do prédio (a máquina). A porta é o apartamento (o programa).',
    },
    {
      id: 'localhost',
      front: 'Para onde aponta `localhost`?',
      back: 'Sempre para a própria máquina onde o comando roda, no endereço `127.0.0.1`.',
    },
    {
      id: 'tcp-udp',
      front: 'Qual a diferença entre TCP e UDP?',
      back: 'TCP confirma a entrega e mantém a ordem. UDP envia sem confirmar, mais rápido, mas pode perder pedaços.',
    },
    {
      id: 'nxdomain',
      front: 'O que significa `NXDOMAIN` no `dig`?',
      back: 'Que o nome consultado não existe no DNS.',
    },
    {
      id: 'refused-timeout',
      front: '`Connection refused` ou timeout: qual sugere firewall?',
      back: 'O timeout. `Connection refused` indica que a máquina respondeu, mas nenhum programa ouve a porta.',
    },
    {
      id: 'ss-tlnp',
      front: 'Para que serve `ss -tlnp` no servidor?',
      back: 'Para ver quais programas ouvem quais portas TCP e em qual endereço, como `127.0.0.1` ou `0.0.0.0`.',
    },
  ],
  mission: {
    title: 'Provoque e diagnostique três falhas',
    text: 'A prática desta etapa da trilha é diagnosticar separadamente uma porta fechada, um erro de DNS e um serviço indisponível. Você vai criar cada problema de propósito, no seu computador ou no laboratório Linux, e anotar como cada um aparece.',
    steps: [
      'Suba um servidor simples com `python3 -m http.server 8000` e confirme com `curl -v localhost:8000` que ele responde `200`',
      'Pare o servidor com `Ctrl` + `C` e repita o `curl`: anote a mensagem de porta sem programa',
      'Rode `curl -v` com um domínio digitado errado e depois `dig` no mesmo nome: anote as duas mensagens',
      'Com o servidor de pé, use `ss -tln` e encontre a linha da porta `8000` e o endereço em que ela ouve',
      'Escreva um parágrafo para cada falha dizendo o sintoma, a ferramenta que revelou a causa e o conserto',
    ],
  },
  sources: [
    {
      title: 'MDN: Visão geral do HTTP',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Overview',
    },
    {
      title: 'Manual do curl',
      url: 'https://curl.se/docs/manpage.html',
    },
    {
      title: 'Manual do ss (man7.org)',
      url: 'https://man7.org/linux/man-pages/man8/ss.8.html',
    },
  ],
};
