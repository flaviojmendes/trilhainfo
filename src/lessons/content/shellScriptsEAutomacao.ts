import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Toda manhã, alguém na equipe confere se o disco não encheu, se o site responde e quantos erros apareceram no log. Feito à mão, são dez minutos por dia, e no dia corrido alguém esquece. Um script faz a mesma conferência em um segundo, toda vez do mesmo jeito, até de madrugada, e avisa quando algo está errado. É a primeira automação de quase toda pessoa que trabalha com operação.',
  sections: [
    {
      id: 'primeiro-script',
      title: 'Um script é uma receita escrita',
      blocks: [
        {
          type: 'analogy',
          title: 'O caderno da padaria',
          text: 'Na padaria, quem abre a loja segue um caderno: ligar o forno, conferir o fermento, anotar a temperatura da geladeira. Com o caderno, qualquer pessoa abre a loja do mesmo jeito, mesmo num dia de folga da gerente. Um **script** é esse caderno para o computador: um arquivo de texto com comandos, executados em sequência.',
        },
        {
          type: 'text',
          text: 'Os comandos que você aprendeu na aula Linux e terminal podem ir para um arquivo. O programa que lê e executa esses comandos se chama **shell**, e o mais comum em servidores é o **Bash**. Um arquivo de comandos Bash costuma terminar em `.sh`.',
        },
        {
          type: 'code',
          language: 'bash',
          caption: 'O arquivo `bom-dia.sh`: a conferência da manhã em seis linhas',
          code: '#!/usr/bin/env bash\necho "== Disco =="\ndf -h /\necho "== Site =="\nsystemctl is-active nginx\necho "== Erros no log =="\ngrep -c ERROR /var/log/loja/app.log',
        },
        {
          type: 'terminal',
          title: 'Rodando o primeiro script',
          task: 'O arquivo `bom-dia.sh` já está na pasta `scripts`. Torne-o executável e rode.',
          prompt: 'ana@servidor:~/scripts$',
          steps: [
            {
              goal: 'Mostre o conteúdo do script na tela antes de rodar. Nunca execute algo sem ler.',
              command: ['cat bom-dia.sh', 'less bom-dia.sh'],
              output:
                '#!/usr/bin/env bash\necho "== Disco =="\ndf -h /\necho "== Site =="\nsystemctl is-active nginx\necho "== Erros no log =="\ngrep -c ERROR /var/log/loja/app.log',
              hint: 'O comando que despeja um arquivo curto na tela é `cat`.',
            },
            {
              goal: 'Dê permissão de execução ao arquivo.',
              command: ['chmod +x bom-dia.sh', 'chmod 755 bom-dia.sh', 'chmod u+x bom-dia.sh'],
              hint: 'Você fez isso na aula anterior: `chmod +x` e o nome do arquivo.',
            },
            {
              goal: 'Execute o script.',
              command: ['./bom-dia.sh', 'bash bom-dia.sh'],
              output:
                '== Disco ==\nFilesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        40G   31G  9.0G  78% /\n== Site ==\nactive\n== Erros no log ==\n4',
              hint: 'Para rodar um arquivo da pasta atual, comece com `./`.',
            },
          ],
        },
        {
          type: 'quiz',
          question: 'Qual é a maior vantagem de transformar a conferência da manhã num script?',
          options: [
            {
              text: 'Ela passa a ser feita sempre do mesmo jeito, por qualquer pessoa ou por um agendador',
              correct: true,
              feedback:
                'Isso. O ganho principal é a repetição sem variação: ninguém pula um passo por pressa. A velocidade vem de brinde.',
            },
            {
              text: 'Os comandos ficam mais poderosos dentro de um script',
              feedback:
                'Cada comando faz exatamente a mesma coisa dentro ou fora do script. O script só organiza a sequência.',
            },
            {
              text: 'Scripts não precisam de permissão para rodar',
              feedback:
                'Precisam: sem o `x`, aparece `Permission denied`, como você viu. E rodam com as permissões de quem os executa.',
            },
          ],
        },
      ],
    },
    {
      id: 'anatomia',
      title: 'A anatomia de um script de verdade',
      blocks: [
        {
          type: 'text',
          text: 'O script da manhã só mostra informações. Um script de operação de verdade toma decisões: tenta de novo, avisa quando falha e termina com um sinal claro de sucesso ou erro. Explore cada parte deste verificador de serviço.',
        },
        {
          type: 'anatomy',
          caption: '`checa-servico.sh`: testa uma URL até três vezes e avisa se ela não responde',
          language: 'bash',
          parts: [
            {
              text: '#!/usr/bin/env bash',
              label: 'Shebang',
              note: 'A primeira linha diz qual programa deve ler o arquivo. Sem ela, o sistema pode tentar ler o script com outro shell e falhar de jeitos estranhos.',
            },
            { text: '\n' },
            {
              text: 'set -euo pipefail',
              label: 'Modo seguro',
              note: '`-e` para o script no primeiro comando que falhar. `-u` trata variável não definida como erro, em vez de usar texto vazio. `-o pipefail` faz um pipe falhar se qualquer pedaço dele falhar.',
            },
            { text: '\n\n' },
            {
              text: 'URL="${1:-http://localhost:8000/saude}"',
              label: 'Variável e argumento',
              note: '`$1` é o primeiro argumento passado ao script, como em `./checa-servico.sh https://site`. O `:-` define um valor padrão se nada for passado. Repare: sem espaços em volta do `=`.',
            },
            { text: '\n' },
            { text: 'TENTATIVAS=3' },
            { text: '\n\n' },
            {
              text: 'for i in $(seq 1 "$TENTATIVAS"); do',
              label: 'Repetição',
              note: '`for` repete o bloco até o `done`, com `i` valendo 1, 2 e 3. `$(...)` roda um comando e usa a saída dele no lugar.',
            },
            { text: '\n  ' },
            {
              text: 'if curl -fsS --max-time 5 "$URL" > /dev/null; then',
              label: 'Decisão',
              note: 'O `if` não testa texto: ele roda o comando e olha se deu certo. O `-f` faz o `curl` falhar em respostas de erro HTTP. `> /dev/null` joga fora a página, porque só importa se respondeu.',
            },
            { text: '\n    echo "OK: $URL respondeu na tentativa $i"\n    ' },
            {
              text: 'exit 0',
              label: 'Código de saída',
              note: 'Encerra o script avisando “deu certo”. Zero significa sucesso.',
            },
            { text: '\n  fi\n  ' },
            {
              text: 'echo "AVISO: tentativa $i falhou" >&2',
              label: 'Saída de erro',
              note: '`>&2` manda a mensagem para a saída de erros, separada da saída normal. Assim, quem guarda o log consegue separar avisos de resultados.',
            },
            { text: '\n  sleep 2\ndone\n\necho "ERRO: $URL fora do ar" >&2\n' },
            {
              text: 'exit 1',
              label: 'Falha',
              note: 'Qualquer número diferente de zero significa erro. É isso que permite a outros programas, como o cron ou uma pipeline, perceber que algo deu errado.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Os tropeços clássicos do Bash',
          text: '`URL = "x"` com espaços não cria variável: o Bash tenta rodar um comando chamado `URL`. Variáveis sem aspas, como `$ARQUIVO` em vez de `"$ARQUIVO"`, quebram quando o valor tem espaço. E um script salvo no Windows pode carregar quebras de linha invisíveis que causam `bad interpreter`: configure o editor para usar LF.',
        },
        {
          type: 'fill',
          prompt:
            'Complete o script que conta erros em cada arquivo `.log` de uma pasta recebida como argumento.',
          language: 'bash',
          template:
            '#!/usr/bin/env bash\n[[set]] -euo pipefail\n\n# Primeiro argumento do script, ou uma pasta padrão\nPASTA="${[[1]]:-/var/log/loja}"\n\nfor arquivo in "$PASTA"/*.log; [[do]]\n  total=$(grep -c ERROR "$arquivo" || true)\n  if [ "$total" -gt 0 ]; [[then]]\n    echo "$arquivo: $total erros"\n  fi\n[[done]]',
          explanation:
            'O `|| true` existe por causa do `set -e`: o `grep` termina com código 1 quando não encontra nada, e isso pararia o script. Com `|| true`, “zero erros” vira um resultado normal.',
        },
      ],
    },
    {
      id: 'codigos-de-saida',
      title: 'Códigos de saída e scripts que podem rodar de novo',
      blocks: [
        {
          type: 'text',
          text: 'Todo comando, ao terminar, devolve um número chamado **código de saída** (exit code). Zero quer dizer sucesso; qualquer outro número quer dizer algum tipo de falha. A variável especial `$?` guarda o código do último comando.',
        },
        {
          type: 'terminal',
          title: 'Ouvindo o que os comandos respondem',
          task: 'Veja os códigos de saída de comandos que dão certo e errado, e depois do seu verificador.',
          prompt: 'ana@servidor:~/scripts$',
          steps: [
            {
              goal: 'Liste uma pasta que não existe: `/etc/naoexiste`.',
              command: 'ls /etc/naoexiste',
              output: "ls: cannot access '/etc/naoexiste': No such file or directory",
              hint: 'Use `ls /etc/naoexiste`.',
            },
            {
              goal: 'Mostre o código de saída do último comando.',
              command: ['echo $?', 'echo "$?"'],
              output: '2',
              hint: 'A variável é `$?`. Use `echo $?`.',
            },
            {
              goal: 'Rode o verificador sem argumentos, para testar a URL padrão.',
              command: ['./checa-servico.sh', 'bash checa-servico.sh'],
              output: 'OK: http://localhost:8000/saude respondeu na tentativa 1',
              hint: 'Use `./checa-servico.sh`.',
            },
            {
              goal: 'Confira o código de saída.',
              command: ['echo $?', 'echo "$?"'],
              output: '0',
              hint: 'De novo, `echo $?`.',
            },
            {
              goal: 'Agora teste uma porta onde não há nada: passe `http://localhost:9999/saude` como argumento.',
              command: [
                './checa-servico.sh http://localhost:9999/saude',
                'bash checa-servico.sh http://localhost:9999/saude',
              ],
              output:
                "curl: (7) Failed to connect to localhost port 9999 after 0 ms: Couldn't connect to server\nAVISO: tentativa 1 falhou\ncurl: (7) Failed to connect to localhost port 9999 after 0 ms: Couldn't connect to server\nAVISO: tentativa 2 falhou\ncurl: (7) Failed to connect to localhost port 9999 after 0 ms: Couldn't connect to server\nAVISO: tentativa 3 falhou\nERRO: http://localhost:9999/saude fora do ar",
              hint: 'O argumento vai depois do nome do script, separado por espaço.',
            },
            {
              goal: 'E o código de saída agora?',
              command: ['echo $?', 'echo "$?"'],
              output: '1',
              hint: '`echo $?` mais uma vez.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Esse número é a ponte entre programas. `comando1 && comando2` roda o segundo só se o primeiro deu certo; `comando1 || comando2` roda o segundo só se o primeiro falhou. Assim nasce um alerta simples: `./checa-servico.sh || ./avisa-equipe.sh`.',
        },
        {
          type: 'quiz',
          question:
            'Um script tem `set -e` mas não tem `pipefail`. A linha `grep ERROR app.log | wc -l` roda e o arquivo `app.log` não existe. O que acontece?',
          options: [
            {
              text: 'O script continua, porque o pipe devolve o código do último comando, o `wc`, que deu certo',
              correct: true,
              feedback:
                'Isso. Sem `pipefail`, só o último pedaço do pipe conta. O `wc` imprime `0` e termina bem, escondendo que o `grep` falhou. Por isso o trio completo `set -euo pipefail` é tão recomendado.',
            },
            {
              text: 'O script para, porque o `set -e` vê qualquer falha',
              feedback:
                'Seria o ideal, mas o `-e` olha o código do pipe inteiro, que, sem `pipefail`, é o do último comando. A falha do `grep` passa despercebida.',
            },
            {
              text: 'O Bash cria o arquivo `app.log` vazio',
              feedback:
                'O `grep` só lê arquivos, nunca cria. Ele reclama que o arquivo não existe e termina com erro.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Idempotente: rodar duas vezes não estraga',
          text: 'Um script de automação vai rodar muitas vezes, às vezes no meio de uma falha. Ele é **idempotente** quando rodar de novo deixa tudo no mesmo estado, sem erro e sem duplicar nada. `mkdir -p` cria a pasta só se faltar; já `mkdir` sozinho falha na segunda vez.',
        },
        {
          type: 'classify',
          prompt: 'Rodar cada linha duas vezes seguidas é seguro?',
          buckets: ['Idempotente: pode repetir', 'Não idempotente: a segunda vez falha ou duplica'],
          items: [
            { text: '`mkdir -p /srv/loja/backups`', bucket: 0 },
            { text: '`mkdir /srv/loja/backups`', bucket: 1 },
            { text: '`cp config.padrao /etc/loja.conf`', bucket: 0 },
            { text: '`echo "export AMBIENTE=prod" >> ~/.bashrc`', bucket: 1 },
            { text: '`id deploy || sudo useradd deploy`', bucket: 0 },
            { text: '`sudo useradd deploy`', bucket: 1 },
          ],
          explanation:
            'O padrão é “confira antes de mudar” ou usar opções que já fazem isso, como `-p`. O `>>` repetido acrescenta a mesma linha várias vezes no arquivo.',
        },
      ],
    },
    {
      id: 'cron',
      title: 'Agendando com cron',
      blocks: [
        {
          type: 'analogy',
          title: 'O despertador com repetição',
          text: 'No celular, você cria um alarme “de segunda a sexta, às 6h” e esquece: ele toca sozinho. O **cron** é o despertador do Linux. Em vez de tocar música, ele roda um comando no horário que você escolher.',
        },
        {
          type: 'anatomy',
          caption: 'Uma linha de agendamento do cron (o crontab)',
          language: 'bash',
          parts: [
            {
              text: '*/5',
              label: 'Minuto',
              note: 'De 0 a 59. `*/5` quer dizer “a cada 5 minutos”.',
            },
            { text: ' ' },
            { text: '*', label: 'Hora', note: 'De 0 a 23. O `*` quer dizer “todas”.' },
            { text: ' ' },
            { text: '*', label: 'Dia do mês', note: 'De 1 a 31.' },
            { text: ' ' },
            { text: '*', label: 'Mês', note: 'De 1 a 12.' },
            { text: ' ' },
            {
              text: '*',
              label: 'Dia da semana',
              note: 'De 0 a 6, começando no domingo. `1-5` seria de segunda a sexta.',
            },
            { text: ' ' },
            {
              text: '/home/ana/scripts/checa-servico.sh',
              label: 'Comando',
              note: 'Use sempre o caminho absoluto. O cron não começa na sua pasta e não conhece os atalhos do seu terminal.',
            },
            {
              text: ' >> /home/ana/logs/checa.log 2>&1',
              label: 'Registro',
              note: 'Acrescenta a saída normal num log, e o `2>&1` junta a saída de erros no mesmo lugar. Sem isso, você nunca saberá o que aconteceu.',
            },
          ],
        },
        {
          type: 'table',
          caption: 'Expressões de cron comuns',
          head: ['Expressão', 'Quando roda'],
          rows: [
            ['`*/5 * * * *`', 'A cada 5 minutos'],
            ['`0 3 * * *`', 'Todo dia às 3h da manhã'],
            ['`30 8 * * 1-5`', 'De segunda a sexta, às 8h30'],
            ['`0 0 1 * *`', 'À meia-noite do primeiro dia de cada mês'],
          ],
        },
        {
          type: 'terminal',
          title: 'Agendando o verificador',
          task: 'Faça o verificador rodar sozinho a cada 5 minutos.',
          prompt: 'ana@servidor:~$',
          steps: [
            {
              goal: 'Veja se você já tem algum agendamento.',
              command: 'crontab -l',
              output: 'no crontab for ana',
              hint: 'O comando é `crontab` com a opção `-l` (listar).',
            },
            {
              goal: 'Abra a sua tabela de agendamentos para editar.',
              command: 'crontab -e',
              output:
                '(o editor abriu; você colou a linha abaixo, salvou e fechou)\n*/5 * * * * /home/ana/scripts/checa-servico.sh >> /home/ana/logs/checa.log 2>&1\ncrontab: installing new crontab',
              hint: 'A opção de editar é `-e`.',
            },
            {
              goal: 'Confirme que o agendamento foi salvo.',
              command: 'crontab -l',
              output:
                '*/5 * * * * /home/ana/scripts/checa-servico.sh >> /home/ana/logs/checa.log 2>&1',
              hint: 'Liste de novo com `crontab -l`.',
            },
            {
              goal: 'Dez minutos depois: veja as últimas linhas do log do verificador.',
              command: [
                'tail /home/ana/logs/checa.log',
                'tail ~/logs/checa.log',
                'tail -n 5 ~/logs/checa.log',
              ],
              output:
                'OK: http://localhost:8000/saude respondeu na tentativa 1\nOK: http://localhost:8000/saude respondeu na tentativa 1',
              hint: 'Use `tail` com o caminho do log.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: '“No terminal funciona, no cron não”',
          text: 'O cron roda com um ambiente mínimo: quase nenhuma variável de ambiente, um `PATH` curto e a pasta pessoal como ponto de partida. Comandos que você usa por nome curto ou variáveis do seu `.bashrc` podem não existir lá. Use caminhos absolutos e defina no próprio script as variáveis de que ele precisa.',
        },
        {
          type: 'quiz',
          question: 'Quando roda a linha `0 3 * * 1 /opt/backup.sh`?',
          options: [
            {
              text: 'Toda segunda-feira, às 3h da manhã',
              correct: true,
              feedback:
                'Isso. Minuto 0, hora 3, qualquer dia do mês, qualquer mês, dia da semana 1, que é segunda (domingo é 0).',
            },
            {
              text: 'Todo dia, às 3 minutos depois da 1h',
              feedback:
                'A ordem é minuto e depois hora: `0 3` significa 3h00. E o último campo, `1`, é o dia da semana, não a hora.',
            },
            {
              text: 'No dia 3 de cada mês, à 1h',
              feedback:
                'O dia do mês é o terceiro campo, que aqui é `*`. O `3` está na posição da hora.',
            },
            {
              text: 'A cada 3 horas, às segundas',
              feedback:
                '“A cada 3 horas” seria `*/3` no campo da hora. Um número sozinho quer dizer um horário exato.',
            },
          ],
        },
      ],
    },
    {
      id: 'hora-do-python',
      title: 'Quando trocar o Bash pelo Python',
      blocks: [
        {
          type: 'text',
          text: 'Bash é ótimo para encadear comandos. Mas quando o script precisa entender texto com estrutura, fazer contas, ler JSON, chamar uma API ou tratar vários tipos de erro, ele vira um emaranhado difícil de ler. Nesse ponto, **Python** costuma ser a escolha: está instalado na maioria dos servidores Linux e lê quase como português.',
        },
        {
          type: 'table',
          caption: 'Um jeito prático de decidir',
          head: ['Use Bash quando...', 'Prefira Python quando...'],
          rows: [
            ['A tarefa é rodar comandos em sequência', 'Há lógica com muitas decisões e contas'],
            ['O script cabe numa tela', 'O script passa de umas 50 linhas'],
            [
              'Você junta `grep`, `tail`, `curl` com pipes',
              'Precisa ler JSON, CSV ou chamar uma API',
            ],
            ['Erros só precisam parar o script', 'Cada erro pede um tratamento diferente'],
          ],
        },
        {
          type: 'codeTabs',
          caption:
            'A mesma tarefa, contar respostas por status num log de servidor web, nas duas linguagens',
          tabs: [
            {
              label: 'Bash',
              language: 'bash',
              code: "# O status é o 9º campo de cada linha\nawk '{print $9}' access.log | sort | uniq -c",
            },
            {
              label: 'Python',
              language: 'python',
              code: "from collections import Counter\n\nwith open('access.log') as arquivo:\n    status = [linha.split()[-2] for linha in arquivo if linha.strip()]\n\nfor codigo, total in sorted(Counter(status).items()):\n    print(codigo, total)",
            },
          ],
        },
        {
          type: 'text',
          text: 'A versão em Bash é curtíssima, mas quebra fácil se o formato da linha mudar e é difícil de estender. A versão em Python é mais longa e muito mais fácil de evoluir: dá para somar erros, calcular porcentagens e decidir se manda alerta. Em scripts maiores, o módulo `subprocess` roda comandos do sistema e o `urllib.request` faz requisições HTTP, ambos sem instalar nada.',
        },
        {
          type: 'python',
          title: 'Um alerta a partir do log',
          task: 'O texto `LOG` imita um log de servidor web. Complete o programa: pegue o status de cada linha (o penúltimo pedaço), conte quantas vezes cada status aparece no dicionário `contagem`, some em `erros_5xx` as respostas que começam com `5`, imprima uma linha `Status 200: 3` para cada status e, se mais de 10% das requisições forem erros 5xx, imprima uma linha começando com `ALERTA`.',
          code: 'LOG = """203.0.113.5 - - [14/Oct/2026:10:00:01 -0300] "GET /api/pedidos HTTP/1.1" 200 512\n198.51.100.7 - - [14/Oct/2026:10:00:02 -0300] "POST /api/pix HTTP/1.1" 201 87\n203.0.113.5 - - [14/Oct/2026:10:00:04 -0300] "GET /api/cardapio HTTP/1.1" 200 2048\n192.0.2.10 - - [14/Oct/2026:10:00:05 -0300] "GET /favicon.ico HTTP/1.1" 404 0\n198.51.100.7 - - [14/Oct/2026:10:00:07 -0300] "POST /api/pix HTTP/1.1" 502 0\n203.0.113.9 - - [14/Oct/2026:10:00:08 -0300] "GET /api/pedidos HTTP/1.1" 200 498\n192.0.2.10 - - [14/Oct/2026:10:00:09 -0300] "POST /api/pix HTTP/1.1" 503 0\n203.0.113.5 - - [14/Oct/2026:10:00:11 -0300] "GET /api/pedidos HTTP/1.1" 500 0\n\n"""\n\ncontagem = {}\nfor linha in LOG.splitlines():\n    if not linha.strip():\n        continue  # pula linhas vazias\n    partes = linha.split()\n    status = ""  # troque por: o penúltimo item de partes\n    # some 1 em contagem[status]; dica: contagem.get(status, 0)\n\nerros_5xx = 0  # some as contagens dos status que começam com "5"\ntotal = sum(contagem.values())\n\nprint(contagem)\n',
          solution:
            'LOG = """203.0.113.5 - - [14/Oct/2026:10:00:01 -0300] "GET /api/pedidos HTTP/1.1" 200 512\n198.51.100.7 - - [14/Oct/2026:10:00:02 -0300] "POST /api/pix HTTP/1.1" 201 87\n203.0.113.5 - - [14/Oct/2026:10:00:04 -0300] "GET /api/cardapio HTTP/1.1" 200 2048\n192.0.2.10 - - [14/Oct/2026:10:00:05 -0300] "GET /favicon.ico HTTP/1.1" 404 0\n198.51.100.7 - - [14/Oct/2026:10:00:07 -0300] "POST /api/pix HTTP/1.1" 502 0\n203.0.113.9 - - [14/Oct/2026:10:00:08 -0300] "GET /api/pedidos HTTP/1.1" 200 498\n192.0.2.10 - - [14/Oct/2026:10:00:09 -0300] "POST /api/pix HTTP/1.1" 503 0\n203.0.113.5 - - [14/Oct/2026:10:00:11 -0300] "GET /api/pedidos HTTP/1.1" 500 0\n\n"""\n\ncontagem = {}\nfor linha in LOG.splitlines():\n    if not linha.strip():\n        continue  # pula linhas vazias\n    partes = linha.split()\n    status = partes[-2]\n    contagem[status] = contagem.get(status, 0) + 1\n\nerros_5xx = sum(n for codigo, n in contagem.items() if codigo.startswith("5"))\ntotal = sum(contagem.values())\n\nfor codigo in sorted(contagem):\n    print(f"Status {codigo}: {contagem[codigo]}")\n\ntaxa = erros_5xx / total\nif taxa > 0.10:\n    print(f"ALERTA: {erros_5xx} de {total} requisições falharam no servidor ({taxa:.0%})")\n',
          checks: [
            {
              label: 'A contagem tem 3 respostas `200` e 1 resposta `404`',
              test: "contagem.get('200', contagem.get(200)) == 3 and contagem.get('404', contagem.get(404)) == 1",
            },
            {
              label: 'As 8 requisições foram contadas, sem a linha vazia',
              test: 'sum(contagem.values()) == 8',
            },
            {
              label: '`erros_5xx` soma os 3 erros de servidor',
              test: 'erros_5xx == 3',
            },
            {
              label: 'Imprime a linha `Status 200: 3`',
              test: "'Status 200: 3' in __saida__",
            },
            {
              label: 'Imprime um `ALERTA`, porque mais de 10% foram erros 5xx',
              test: "'ALERTA' in __saida__",
            },
          ],
        },
      ],
    },
  ],
  recap: [
    'Um **script** é um arquivo de comandos executados em sequência; começa com o **shebang** e precisa de permissão de execução.',
    'Variáveis se criam sem espaços em volta do `=`, `$1` é o primeiro argumento e `if` e `for` decidem e repetem.',
    'Todo comando devolve um **código de saída**: 0 é sucesso; `set -euo pipefail` faz o script parar na primeira falha em vez de seguir às cegas.',
    'Scripts de automação devem ser **idempotentes**, e o **cron** os executa nos horários definidos, com caminhos absolutos e saída guardada em log.',
    'Quando a lógica cresce, com contas, JSON ou muitos tipos de erro, Python é mais fácil de ler e evoluir do que Bash.',
  ],
  cards: [
    {
      id: 'shebang',
      front: 'Para que serve a primeira linha `#!/usr/bin/env bash`?',
      back: 'É o shebang: diz ao sistema qual programa deve ler e executar o arquivo.',
    },
    {
      id: 'argumento-1',
      front: 'O que é `$1` dentro de um script?',
      back: 'O primeiro argumento passado na chamada, como `site` em `./checa.sh site`.',
    },
    {
      id: 'codigo-de-saida',
      front: 'O que significam os códigos de saída 0 e 1?',
      back: '0 é sucesso. Qualquer valor diferente de zero, como 1, indica falha.',
    },
    {
      id: 'set-euo-pipefail',
      front: 'O que faz `set -euo pipefail`?',
      back: 'Para o script no primeiro erro, trata variável indefinida como erro e faz pipes falharem se qualquer parte falhar.',
    },
    {
      id: 'idempotente',
      front: 'O que é um script idempotente?',
      back: 'Um script que pode rodar várias vezes e deixa tudo no mesmo estado, sem erro nem duplicação.',
    },
    {
      id: 'cron-campos',
      front: 'Quais são os cinco campos de horário do cron, em ordem?',
      back: 'Minuto, hora, dia do mês, mês e dia da semana.',
    },
    {
      id: 'bash-ou-python',
      front: 'Quando vale trocar um script Bash por Python?',
      back: 'Quando há muita lógica, contas, JSON ou APIs, vários tratamentos de erro ou o script passa de umas 50 linhas.',
    },
  ],
  mission: {
    title: 'Automatize a checagem de um serviço',
    text: 'A prática desta etapa da trilha é automatizar uma checagem de serviço, produzir logs úteis e devolver um código de erro quando a verificação falhar. Faça no seu laboratório Linux ou no WSL.',
    steps: [
      'Escreva um `checa-servico.sh` com shebang, `set -euo pipefail`, a URL em `$1` com valor padrão e três tentativas',
      'Faça o script imprimir data, hora e resultado de cada tentativa, e terminar com `exit 0` ou `exit 1`',
      'Teste com um serviço de pé (`python3 -m http.server 8000`) e parado, conferindo `echo $?` nos dois casos',
      'Agende o script no cron a cada 5 minutos, guardando a saída num log com `>> arquivo.log 2>&1`',
      'Rode o script duas vezes seguidas e confirme que nada é duplicado nem quebra na segunda vez',
    ],
  },
  sources: [
    {
      title: 'GNU Bash Reference Manual',
      url: 'https://www.gnu.org/software/bash/manual/bash.html',
    },
    {
      title: 'Manual do formato crontab (man7.org)',
      url: 'https://man7.org/linux/man-pages/man5/crontab.5.html',
    },
    {
      title: 'Python: o módulo subprocess',
      url: 'https://docs.python.org/pt-br/3/library/subprocess.html',
    },
  ],
};
