import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Quase todo servidor que mantém um site, um app de delivery ou um sistema de banco no ar roda Linux, e quase sempre sem tela nem mouse: só um terminal. Quando algo quebra às três da manhã, quem resolve é a pessoa que sabe entrar nessa máquina, ler um log e encontrar o processo culpado. Nesta aula você vai treinar exatamente isso, num terminal simulado, sem medo de estragar nada.',
  sections: [
    {
      id: 'arvore-de-pastas',
      title: 'Uma árvore que começa na raiz',
      blocks: [
        {
          type: 'analogy',
          title: 'Endereço completo ou “a segunda casa à direita”',
          text: 'Para explicar onde você mora, dá para dizer o endereço completo, com estado, cidade, rua e número, e qualquer pessoa chega. Ou dá para dizer “é a segunda casa depois da padaria”, que só funciona para quem já está na padaria. No Linux é igual: um **caminho absoluto** é o endereço completo; um **caminho relativo** depende de onde você está.',
        },
        {
          type: 'text',
          text: 'Na aula Seu kit de trabalho você usou `pwd`, `ls`, `cd` e `mkdir` para andar entre pastas. Agora vamos olhar o mapa inteiro. No Linux, tudo fica dentro de uma única pasta inicial, a **raiz**, escrita como uma barra: `/`. Não existe `C:` nem `D:`: até um pendrive aparece como uma pasta dentro da raiz.',
        },
        {
          type: 'table',
          caption: 'As pastas que você vai visitar todo dia num servidor',
          head: ['Caminho', 'O que guarda', 'Comparação'],
          rows: [
            ['`/`', 'A raiz: o começo de todos os caminhos', 'O país inteiro'],
            [
              '`/home/ana`',
              'A pasta pessoal da usuária `ana`. O atalho `~` aponta para ela',
              'O seu apartamento',
            ],
            [
              '`/etc`',
              'Arquivos de configuração do sistema e dos programas',
              'A pasta de contratos e manuais do prédio',
            ],
            [
              '`/var/log`',
              'Logs: os diários onde os programas anotam o que fizeram e o que deu errado',
              'O livro de ocorrências da portaria',
            ],
            [
              '`/usr/bin`',
              'Os programas instalados, como `ls` e `python3`',
              'A caixa de ferramentas',
            ],
            ['`/tmp`', 'Arquivos temporários, apagados de tempos em tempos', 'A mesa de rascunho'],
          ],
        },
        {
          type: 'text',
          text: 'Um caminho que começa com `/` é **absoluto** e funciona de qualquer lugar. Um caminho sem a barra inicial é **relativo** à pasta atual. Dois atalhos ajudam: `..` é a pasta de cima e `~` é a sua pasta pessoal.',
        },
        {
          type: 'terminal',
          title: 'Passeio por um servidor',
          task: 'Você entrou num servidor Ubuntu de laboratório. Ande pelas pastas usando caminhos absolutos e relativos. Digite `ajuda` se travar.',
          prompt: 'ana@servidor:~$',
          intro: 'Welcome to Ubuntu 24.04 LTS (GNU/Linux 6.8.0-45-generic x86_64)',
          steps: [
            {
              goal: 'Descubra em que pasta você está agora.',
              command: 'pwd',
              output: '/home/ana',
              hint: 'O comando tem três letras e significa “mostre a pasta de trabalho”.',
            },
            {
              goal: 'Vá direto para a pasta de logs do sistema usando um caminho absoluto.',
              command: ['cd /var/log', 'cd /var/log/'],
              prompt: 'ana@servidor:/var/log$',
              hint: 'Comece o caminho pela raiz: `cd /var/log`.',
            },
            {
              goal: 'Liste o que existe nessa pasta.',
              command: 'ls',
              output: 'apt  auth.log  dpkg.log  journal  loja  nginx  syslog',
              hint: 'Use o comando que lista o conteúdo da pasta atual.',
            },
            {
              goal: 'Entre na pasta `nginx` usando um caminho relativo.',
              command: ['cd nginx', 'cd nginx/', 'cd ./nginx'],
              prompt: 'ana@servidor:/var/log/nginx$',
              hint: 'Você já está em `/var/log`, então basta o nome da pasta: `cd nginx`.',
            },
            {
              goal: 'Volte para a sua pasta pessoal com um atalho.',
              command: ['cd ~', 'cd', 'cd /home/ana', 'cd ~/'],
              prompt: 'ana@servidor:~$',
              hint: 'O til (`~`) representa a sua pasta pessoal. `cd` sozinho também leva até lá.',
            },
          ],
        },
        {
          type: 'quiz',
          question:
            'Você está em `/home/ana/projetos` e digita `cd etc`. O terminal responde `No such file or directory`. Por quê?',
          options: [
            {
              text: 'Sem a barra inicial, o terminal procurou uma pasta `etc` dentro de `/home/ana/projetos`',
              correct: true,
              feedback:
                'Isso. `etc` é um caminho relativo. Para ir à pasta de configurações do sistema, de qualquer lugar, use o absoluto: `cd /etc`.',
            },
            {
              text: 'A pasta `/etc` só pode ser aberta com `sudo`',
              feedback:
                'Qualquer pessoa pode entrar em `/etc` e ler a maioria dos arquivos. O que exige permissão é alterar. O erro aqui é de endereço, não de permissão.',
            },
            {
              text: 'Os nomes de pasta precisam ser digitados em maiúsculas',
              feedback:
                'É o contrário: o Linux diferencia maiúsculas de minúsculas, e as pastas do sistema são todas em minúsculas. `Etc` e `etc` seriam pastas diferentes.',
            },
          ],
        },
      ],
    },
    {
      id: 'permissoes',
      title: 'Quem pode fazer o quê: permissões',
      blocks: [
        {
          type: 'text',
          text: 'Um servidor é compartilhado por várias pessoas e programas. Para ninguém apagar o que não deve, cada arquivo tem um **dono**, um **grupo** e uma lista do que cada um pode fazer. O comando `ls -la` mostra tudo isso: `-l` pede o formato longo e `-a` inclui os arquivos ocultos, que começam com ponto.',
        },
        {
          type: 'anatomy',
          caption: 'Uma linha de `ls -la`, pedaço por pedaço',
          language: 'bash',
          parts: [
            {
              text: '-',
              label: 'Tipo',
              note: '`-` é um arquivo comum, `d` é uma pasta (directory) e `l` é um atalho (link).',
            },
            {
              text: 'rwx',
              label: 'Dono',
              note: 'O que o dono pode fazer: `r` ler (read), `w` escrever (write), `x` executar (execute). Aqui, tudo.',
            },
            {
              text: 'r-x',
              label: 'Grupo',
              note: 'O que as pessoas do grupo podem fazer. O traço marca uma permissão que falta: elas leem e executam, mas não alteram.',
            },
            {
              text: 'r--',
              label: 'Outros',
              note: 'Qualquer outra conta da máquina. Só pode ler.',
            },
            { text: '  1  ' },
            {
              text: 'ana',
              label: 'Dono',
              note: 'A conta dona do arquivo. Normalmente quem criou.',
            },
            { text: '  ' },
            {
              text: 'devs',
              label: 'Grupo',
              note: 'O grupo dono do arquivo. Grupos servem para dar acesso a uma equipe inteira de uma vez.',
            },
            { text: '  ' },
            {
              text: '2048',
              label: 'Tamanho',
              note: 'Em bytes. Use `ls -lah` para ver em K, M e G.',
            },
            { text: '  Oct 14 09:12  ' },
            { text: 'deploy.sh', label: 'Nome', note: 'O nome do arquivo.' },
          ],
        },
        {
          type: 'text',
          text: 'Para mudar permissões existe o `chmod` (change mode). A forma com letras é a mais legível: `chmod +x arquivo` dá permissão de execução. Também existe a forma com números, muito comum em tutoriais, onde ler vale 4, escrever vale 2 e executar vale 1, somados para dono, grupo e outros.',
        },
        {
          type: 'table',
          caption: 'Os números de chmod que você mais vai encontrar',
          head: ['Número', 'Letras', 'Quando usar'],
          rows: [
            ['`755`', '`rwxr-xr-x`', 'Scripts e programas: todos executam, só o dono altera'],
            ['`644`', '`rw-r--r--`', 'Arquivos comuns: todos leem, só o dono altera'],
            ['`600`', '`rw-------`', 'Segredos, como chaves SSH e arquivos `.env`: só o dono lê'],
          ],
        },
        {
          type: 'terminal',
          title: 'O script que não queria rodar',
          task: 'Uma colega deixou um script de backup na sua pasta. Descubra por que ele não roda e resolva do jeito certo.',
          prompt: 'ana@servidor:~/scripts$',
          steps: [
            {
              goal: 'Liste todos os arquivos da pasta, inclusive os ocultos, no formato longo.',
              command: ['ls -la', 'ls -al', 'ls -l -a', 'ls -a -l'],
              output:
                'total 16\ndrwxr-xr-x 2 ana ana 4096 Oct 14 09:12 .\ndrwxr-x--- 6 ana ana 4096 Oct 14 09:10 ..\n-rw------- 1 ana ana   58 Oct 14 09:11 .env\n-rw-r--r-- 1 ana ana  214 Oct 14 09:12 backup.sh',
              hint: 'Junte as opções `-l` e `-a`: `ls -la`.',
            },
            {
              goal: 'Tente executar o script. Para rodar um arquivo da pasta atual, comece com `./`.',
              command: './backup.sh',
              output: 'bash: ./backup.sh: Permission denied',
              hint: 'Digite `./backup.sh`.',
            },
            {
              goal: 'A linha de `backup.sh` começa com `-rw-r--r--`: falta o `x`. Dê permissão de execução.',
              command: ['chmod +x backup.sh', 'chmod 755 backup.sh', 'chmod a+x backup.sh'],
              hint: 'Use `chmod +x` seguido do nome do arquivo.',
            },
            {
              goal: 'Confira a nova permissão olhando só esse arquivo.',
              command: ['ls -l backup.sh', 'ls -la backup.sh', 'ls -al backup.sh'],
              output: '-rwxr-xr-x 1 ana ana 214 Oct 14 09:12 backup.sh',
              hint: 'Use `ls -l backup.sh`.',
            },
            {
              goal: 'Agora execute o script de novo.',
              command: './backup.sh',
              output:
                'Copiando /home/ana/projetos para /home/ana/backups/2026-10-14...\nBackup concluído: 37 arquivos.',
              hint: 'O mesmo comando de antes: `./backup.sh`.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'sudo é a chave mestra do prédio',
          text: 'O `sudo` roda um comando como **root**, a conta que pode tudo, inclusive apagar o sistema inteiro sem perguntar. Use só quando o comando realmente precisa, como instalar programas ou editar algo em `/etc`, e leia o comando duas vezes antes do `Enter`. “Deu permissão negada, coloca `sudo`” é o atalho que mais causa estrago em servidor.',
        },
        {
          type: 'quiz',
          question:
            'Um script dá `Permission denied`. Na internet, alguém sugere `chmod 777 script.sh`. Qual é a melhor escolha?',
          options: [
            {
              text: '`chmod +x script.sh`, que só acrescenta a execução que faltava',
              correct: true,
              feedback:
                'Isso. Você resolve o problema e não abre nada além do necessário. É o princípio do **menor privilégio**: dar só a permissão que o trabalho exige.',
            },
            {
              text: '`chmod 777 script.sh`, porque funciona e é mais rápido',
              feedback:
                'Funciona, mas `777` deixa **qualquer** conta da máquina alterar o script. Alguém poderia trocar o conteúdo por um comando malicioso que você mesma executaria depois.',
            },
            {
              text: '`sudo ./script.sh`, porque o root ignora permissões',
              feedback:
                'Mesmo o root precisa de pelo menos um `x` para executar um arquivo, então continua falhando. E rodar como root um script que você não conferiu é arriscado.',
            },
            {
              text: 'Renomear para `script.exe`',
              feedback:
                'No Linux, a extensão não decide se algo é executável. Quem decide é a permissão `x`.',
            },
          ],
        },
      ],
    },
    {
      id: 'ler-logs',
      title: 'Ler arquivos, filtrar e encadear',
      blocks: [
        {
          type: 'text',
          text: 'Logs são arquivos de texto onde os programas anotam cada coisa que fazem, linha por linha, com data e hora. Eles podem ter milhões de linhas, então você raramente abre o arquivo inteiro. Existem comandos para ler só a parte que interessa.',
        },
        {
          type: 'terms',
          items: [
            {
              term: '`cat arquivo`',
              text: 'Despeja o arquivo inteiro na tela. Ótimo para arquivos curtos, péssimo para um log gigante.',
            },
            {
              term: '`less arquivo`',
              text: 'Abre o arquivo para navegar com as setas. `/palavra` procura, `q` sai.',
            },
            {
              term: '`head` e `tail`',
              text: 'Mostram o começo e o fim do arquivo. `tail -n 20` mostra as 20 últimas linhas; `tail -f` fica acompanhando ao vivo as linhas novas (saia com `Ctrl` + `C`).',
            },
            {
              term: '`grep palavra arquivo`',
              text: 'Mostra só as linhas que contêm a palavra. `grep -i` ignora maiúsculas; `grep -c` conta.',
            },
          ],
        },
        {
          type: 'analogy',
          title: 'O pipe é uma esteira de fábrica',
          text: 'O caractere `|`, chamado **pipe** (cano), liga dois comandos: a saída do primeiro vira a entrada do segundo, como uma esteira que leva a peça de uma máquina para a próxima. Já `>` despeja a saída num arquivo, **apagando** o que havia, e `>>` acrescenta no final, como anotar mais uma linha no caderno.',
        },
        {
          type: 'terminal',
          title: 'Investigando o log da loja',
          task: 'Clientes reclamam que o checkout falhou por volta das 10h. Use o log da aplicação para descobrir o que aconteceu.',
          prompt: 'ana@servidor:/var/log/loja$',
          steps: [
            {
              goal: 'Veja as 5 últimas linhas do arquivo `app.log`.',
              command: ['tail -n 5 app.log', 'tail -5 app.log', 'tail -n5 app.log'],
              output:
                '2026-10-14 09:59:03 ERROR falha ao conectar no banco: timeout após 5s\n2026-10-14 09:59:05 WARN  nova tentativa de conexão (2/3)\n2026-10-14 09:59:10 ERROR falha ao conectar no banco: timeout após 5s\n2026-10-14 10:01:22 ERROR pedido 8820: estoque negativo para produto 77\n2026-10-14 10:01:40 INFO  pedido 8821 criado (cliente 504)',
              hint: 'Use `tail -n 5 app.log`.',
            },
            {
              goal: 'Mostre só as linhas que contêm `ERROR`.',
              command: ['grep ERROR app.log', 'grep "ERROR" app.log', "grep 'ERROR' app.log"],
              output:
                '2026-10-14 08:14:51 ERROR pagamento recusado pelo emissor (pedido 8790)\n2026-10-14 09:59:03 ERROR falha ao conectar no banco: timeout após 5s\n2026-10-14 09:59:10 ERROR falha ao conectar no banco: timeout após 5s\n2026-10-14 10:01:22 ERROR pedido 8820: estoque negativo para produto 77',
              hint: 'A ordem é `grep`, a palavra e depois o arquivo.',
            },
            {
              goal: 'Conte quantas linhas de erro existem, ligando `grep` ao `wc -l` com um pipe.',
              command: [
                'grep ERROR app.log | wc -l',
                'grep "ERROR" app.log | wc -l',
                "grep 'ERROR' app.log | wc -l",
              ],
              output: '4',
              hint: '`wc -l` conta linhas. Escreva o grep, depois `|`, depois `wc -l`.',
            },
            {
              goal: 'Agora só as falhas de banco: filtre `ERROR` e, no resultado, filtre de novo por `banco`.',
              command: [
                'grep ERROR app.log | grep banco',
                'grep "ERROR" app.log | grep "banco"',
                "grep 'ERROR' app.log | grep 'banco'",
                'grep ERROR app.log | grep "banco"',
              ],
              output:
                '2026-10-14 09:59:03 ERROR falha ao conectar no banco: timeout após 5s\n2026-10-14 09:59:10 ERROR falha ao conectar no banco: timeout após 5s',
              hint: 'Encadeie dois `grep` com um pipe no meio.',
            },
            {
              goal: 'Salve as linhas de erro num arquivo `erros.txt` para mandar para a equipe.',
              command: [
                'grep ERROR app.log > erros.txt',
                'grep "ERROR" app.log > erros.txt',
                "grep 'ERROR' app.log > erros.txt",
              ],
              hint: 'Use `>` seguido do nome do arquivo novo.',
            },
            {
              goal: 'Acompanhe o log ao vivo para ver se o problema continua.',
              command: ['tail -f app.log', 'tail -F app.log'],
              output:
                '2026-10-14 10:01:22 ERROR pedido 8820: estoque negativo para produto 77\n2026-10-14 10:01:40 INFO  pedido 8821 criado (cliente 504)\n2026-10-14 10:02:15 INFO  pagamento Pix confirmado (pedido 8821)\n^C',
              hint: 'A opção que “segue” o arquivo é `-f`, de follow.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Um > a menos apaga um arquivo inteiro',
          text: 'Escrever `grep ERROR app.log > app.log` destrói o log: o `>` esvazia o arquivo antes do `grep` começar a ler. E `>` no lugar de `>>` substitui o conteúdo em vez de acrescentar. Antes de redirecionar, confira o nome do arquivo de destino.',
        },
        {
          type: 'fill',
          prompt:
            'Complete os comandos: filtrar avisos, contar quantos são, criar um arquivo novo com eles e depois acrescentar os erros no mesmo arquivo.',
          language: 'bash',
          template:
            '# Só as linhas com WARN\n$ [[grep]] WARN app.log\n# Quantas são? (a saída do grep entra no contador de linhas)\n$ grep WARN app.log | [[wc -l]]\n# Criar avisos.txt com elas, substituindo o que houver\n$ grep WARN app.log [[>]] avisos.txt\n# Acrescentar os erros no final, sem apagar os avisos\n$ grep ERROR app.log [[>>]] avisos.txt',
          explanation:
            'Com `grep`, pipe e redirecionamento você responde a maioria das perguntas sobre um log: o que aconteceu, quantas vezes e quando.',
        },
      ],
    },
    {
      id: 'processos',
      title: 'Processos: programas em execução',
      blocks: [
        {
          type: 'text',
          text: 'Um **processo** é um programa rodando. Cada um recebe um número de identificação, o **PID**. Quando um servidor fica lento, a pergunta é sempre a mesma: qual processo está comendo a máquina?',
        },
        {
          type: 'terms',
          items: [
            {
              term: '`ps aux`',
              text: 'Uma fotografia de todos os processos: dono, PID, uso de CPU e memória, e o comando que os iniciou. Quase sempre combinado com `grep`.',
            },
            {
              term: '`top`',
              text: 'Um painel ao vivo, ordenado por quem usa mais CPU. Aperte `q` para sair. Muitas máquinas têm também o `htop`, mais colorido.',
            },
            {
              term: '`kill PID`',
              text: 'Pede ao processo que termine, dando a chance de ele salvar o que estava fazendo. `kill -9 PID` obriga a parar na hora, sem arrumar nada: é o último recurso.',
            },
            {
              term: '`systemctl` e `journalctl`',
              text: 'Programas que rodam o tempo todo, como um servidor web, são **serviços**. `systemctl status nginx` mostra se ele está de pé; `journalctl -u nginx` mostra o log dele.',
            },
          ],
        },
        {
          type: 'terminal',
          title: 'O relatório que travou o servidor',
          task: 'O servidor está lento desde as 9h40. Encontre o processo culpado e encerre-o com educação.',
          prompt: 'ana@servidor:~$',
          steps: [
            {
              goal: 'Abra o painel ao vivo de processos para ver quem usa mais CPU.',
              command: ['top', 'htop'],
              output:
                'top - 10:03:11 up 12 days,  2:41,  1 user,  load average: 3.92, 3.71, 2.80\nTasks: 142 total,   2 running, 140 sleeping\n%Cpu(s): 97.8 us,  1.9 sy,  0.0 id\n\n    PID USER      %CPU  %MEM     TIME+ COMMAND\n   4821 ana       98.7   2.1  21:13.40 python3\n    912 www-data   0.7   1.4   3:02.11 nginx\n   1033 postgres   0.3   3.8   5:47.90 postgres\n(você apertou q para sair)',
              hint: 'O nome do comando tem três letras.',
            },
            {
              goal: 'Veja o comando completo desse processo: liste tudo com `ps aux` e filtre por `python`.',
              command: [
                'ps aux | grep python',
                'ps aux | grep python3',
                'ps -ef | grep python',
                'ps aux | grep 4821',
              ],
              output:
                'ana       4821 98.7  2.1 412332 86120 ?     R    09:40  21:13 python3 relatorio.py --ano 2019-2026\nana       5190  0.0  0.0   6612  2304 pts/0 S+   10:03   0:00 grep --color=auto python',
              hint: 'Use o pipe: `ps aux | grep python`.',
            },
            {
              goal: 'É um relatório pesado esquecido rodando. Peça para o processo 4821 terminar.',
              command: ['kill 4821', 'kill -15 4821', 'kill -TERM 4821'],
              hint: 'Use `kill` seguido do PID, sem `-9` por enquanto.',
            },
            {
              goal: 'Confirme que o processo 4821 não existe mais.',
              command: ['ps -p 4821', 'ps aux | grep 4821', 'ps aux | grep python'],
              output: '    PID TTY          TIME CMD',
              hint: '`ps -p 4821` mostra só esse processo, se ele ainda existir.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Repare que o `grep` aparece na própria lista do `ps`: ele também é um processo. E que a saída final mostra só o cabeçalho, sem linha nenhuma: o processo terminou.',
        },
        {
          type: 'order',
          prompt: 'Um servidor ficou lento. Coloque em ordem um jeito seguro de investigar.',
          items: [
            'Abrir o `top` e ver qual processo usa mais CPU ou memória',
            'Anotar o PID do processo suspeito',
            'Ver o comando completo com `ps aux | grep` para entender o que ele é',
            'Conferir com a equipe ou no log se é seguro interromper',
            'Enviar `kill PID` e esperar alguns segundos',
            'Usar `kill -9 PID` só se o processo ignorar o pedido',
          ],
          explanation:
            'Matar processos às cegas pode derrubar o banco de dados ou corromper um arquivo no meio da escrita. Primeiro entenda, depois peça com educação, e só no fim force.',
        },
      ],
    },
    {
      id: 'pacotes-variaveis-ajuda',
      title: 'Pacotes, variáveis de ambiente e ajuda',
      blocks: [
        {
          type: 'text',
          text: 'No Linux você raramente baixa instaladores de sites. Existe um **gerenciador de pacotes**, uma loja oficial de programas acessada pelo terminal. No Ubuntu e no Debian ele se chama `apt`. Primeiro você atualiza a lista do que existe (`apt update`), depois instala (`apt install nome`).',
        },
        {
          type: 'text',
          text: '**Variáveis de ambiente** são valores com nome que ficam disponíveis para todos os programas de uma sessão, como `HOME` (sua pasta pessoal) e `PATH` (onde procurar programas). Aplicações usam variáveis assim para receber configurações, como o endereço do banco, sem escrever isso no código.',
        },
        {
          type: 'terminal',
          title: 'Instalar, configurar e pedir ajuda',
          task: 'Instale uma ferramenta, crie uma variável de ambiente e descubra sozinha como usar um comando.',
          prompt: 'ana@servidor:~$',
          steps: [
            {
              goal: 'Atualize a lista de pacotes disponíveis. Isso exige permissão de administrador.',
              command: ['sudo apt update', 'sudo apt-get update'],
              output:
                "[sudo] password for ana:\nHit:1 http://archive.ubuntu.com/ubuntu noble InRelease\nGet:2 http://security.ubuntu.com/ubuntu noble-security InRelease [126 kB]\nFetched 126 kB in 1s (98.4 kB/s)\nReading package lists... Done\n12 packages can be upgraded. Run 'apt list --upgradable' to see them.",
              hint: 'Use `sudo apt update`.',
            },
            {
              goal: 'Instale o pacote `tree`, que desenha pastas como uma árvore.',
              command: [
                'sudo apt install tree',
                'sudo apt install -y tree',
                'sudo apt-get install tree',
                'sudo apt-get install -y tree',
              ],
              output:
                'Reading package lists... Done\nThe following NEW packages will be installed:\n  tree\nSetting up tree (2.1.1-2ubuntu3) ...',
              hint: '`sudo apt install` seguido do nome do pacote.',
            },
            {
              goal: 'Mostre o valor da variável `HOME`. Para ler uma variável, coloque `$` antes do nome.',
              command: ['echo $HOME', 'echo "$HOME"'],
              output: '/home/ana',
              hint: 'Use `echo $HOME`.',
            },
            {
              goal: 'Crie a variável `AMBIENTE` com o valor `producao`, sem espaços em volta do `=`.',
              command: ['export AMBIENTE=producao', 'export AMBIENTE="producao"'],
              hint: 'Use `export AMBIENTE=producao`.',
            },
            {
              goal: 'Confira o valor de `AMBIENTE`.',
              command: ['echo $AMBIENTE', 'echo "$AMBIENTE"'],
              output: 'producao',
              hint: 'Igual ao `HOME`: `echo $AMBIENTE`.',
            },
            {
              goal: 'Esqueceu como o `tail` funciona? Peça a ajuda rápida dele.',
              command: ['tail --help', 'man tail'],
              output:
                'Usage: tail [OPTION]... [FILE]...\nPrint the last 10 lines of each FILE to standard output.\n\n  -f, --follow      output appended data as the file grows\n  -n, --lines=NUM   output the last NUM lines, instead of the last 10',
              hint: 'Quase todo comando aceita `--help`. Para o manual completo, use `man tail`.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Ninguém decora todas as opções',
          text: 'Profissionais experientes consultam `--help` e `man` o dia inteiro. O manual é em inglês, mas segue sempre o mesmo formato: uso, descrição e uma lista de opções. Dentro do `man`, `/palavra` procura e `q` sai.',
        },
        {
          type: 'quiz',
          question:
            'Você fez `export TOKEN=abc123` num terminal. Abriu uma segunda janela de terminal e `echo $TOKEN` mostrou uma linha vazia. O que aconteceu?',
          options: [
            {
              text: 'A variável só existe na sessão onde foi criada e nos programas abertos por ela',
              correct: true,
              feedback:
                'Isso. Cada terminal é um processo com o seu próprio ambiente. Para valer em todas as sessões, a variável precisa ir para um arquivo de configuração como `~/.bashrc`, ou ser passada ao programa que precisa dela.',
            },
            {
              text: 'O `export` falhou porque precisava de `sudo`',
              feedback:
                'Criar variáveis na própria sessão não exige nenhuma permissão especial. O `export` funcionou, mas só naquela janela.',
            },
            {
              text: 'O Linux apaga variáveis depois de um minuto',
              feedback:
                'Não há prazo. A variável dura enquanto a sessão estiver aberta; ela só não é vista por outras sessões.',
            },
          ],
        },
      ],
    },
  ],
  recap: [
    'No Linux tudo começa na raiz `/`; caminhos com `/` no início são **absolutos**, os outros são **relativos** à pasta atual.',
    '`ls -la` mostra tipo, permissões `rwx` de dono, grupo e outros, além do dono e do grupo; `chmod` muda permissões e `sudo` deve ser usado com cuidado.',
    'Logs são lidos com `tail`, `less` e `grep`; o pipe `|` encadeia comandos, `>` cria ou substitui um arquivo e `>>` acrescenta.',
    'Processos têm PID: `top` e `ps aux` mostram quem consome a máquina, `kill` pede para encerrar e `kill -9` força.',
    '`apt` instala programas, variáveis de ambiente guardam configurações da sessão e `--help` e `man` ensinam qualquer comando.',
  ],
  cards: [
    {
      id: 'caminho-absoluto',
      front: 'Qual a diferença entre um caminho absoluto e um relativo?',
      back: 'O absoluto começa na raiz (`/etc/nginx`) e funciona de qualquer lugar. O relativo parte da pasta atual (`nginx`).',
    },
    {
      id: 'var-log',
      front: 'Em que pasta ficam os logs do sistema no Linux?',
      back: 'Em `/var/log`. As configurações ficam em `/etc`.',
    },
    {
      id: 'rwx',
      front: 'O que significam as letras `r`, `w` e `x` em `ls -la`?',
      back: 'Ler, escrever e executar, mostradas três vezes: para o dono, o grupo e os outros.',
    },
    {
      id: 'chmod-x',
      front: 'Um script dá `Permission denied`. Qual o comando mais seguro para resolver?',
      back: '`chmod +x script.sh`, que acrescenta só a permissão de execução.',
    },
    {
      id: 'maior-e-dois-maiores',
      front: 'Qual a diferença entre `>` e `>>`?',
      back: '`>` cria ou substitui o arquivo. `>>` acrescenta no final, sem apagar.',
    },
    {
      id: 'pipe',
      front: 'O que faz o pipe `|` em `grep ERROR app.log | wc -l`?',
      back: 'Entrega a saída do `grep` como entrada do `wc -l`, que conta as linhas.',
    },
    {
      id: 'kill-9',
      front: 'Quando usar `kill -9` em vez de `kill`?',
      back: 'Só quando o processo ignora o `kill` normal. O `-9` interrompe sem dar chance de salvar nada.',
    },
  ],
  mission: {
    title: 'Monte seu laboratório Linux',
    text: 'Use um Linux onde você possa errar à vontade: o WSL no Windows, uma máquina virtual com Ubuntu ou um computador antigo. Faça a prática que a trilha pede: um usuário com permissões limitadas, um serviço rodando e uma falha encontrada nos logs.',
    steps: [
      'Crie um usuário de teste com `sudo adduser estagiario` e confirme que ele não consegue ler um arquivo seu com permissão `600`',
      'Instale o nginx com `sudo apt install nginx` e confira que ele está de pé com `systemctl status nginx`',
      'Pare o serviço com `sudo systemctl stop nginx`, tente acessar `curl localhost` e anote o erro',
      'Encontre o registro da parada com `journalctl -u nginx` ou em `/var/log/nginx` usando `tail` e `grep`',
      'Escreva num arquivo `diario.txt`, usando `>>`, os comandos que você usou e o que cada um mostrou',
    ],
  },
  sources: [
    {
      title: 'Ubuntu: The Linux command line for beginners',
      url: 'https://ubuntu.com/tutorials/command-line-for-beginners',
    },
    {
      title: 'Manual do chmod (man7.org)',
      url: 'https://man7.org/linux/man-pages/man1/chmod.1.html',
    },
    {
      title: 'GNU Bash Reference Manual: Redirections',
      url: 'https://www.gnu.org/software/bash/manual/html_node/Redirections.html',
    },
  ],
};
