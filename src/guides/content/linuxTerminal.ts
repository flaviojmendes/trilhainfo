import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'navegar',
      title: 'Navegar e mexer em arquivos',
      blocks: [
        {
          type: 'table',
          caption: 'Os comandos que você vai usar todo dia',
          head: ['Comando', 'O que faz'],
          rows: [
            ['`pwd`', 'Mostra em que pasta você está'],
            ['`ls -la`', 'Lista tudo, inclusive arquivos ocultos, com permissões e tamanho'],
            ['`cd ~/projetos`', 'Entra na pasta. `cd -` volta para a anterior'],
            ['`mkdir -p a/b/c`', 'Cria a pasta e as intermediárias'],
            ['`cp -r origem destino`', 'Copia; `-r` para pastas'],
            ['`mv antigo novo`', 'Move ou renomeia'],
            ['`rm arquivo`', 'Apaga sem lixeira. Cuidado com `rm -rf`'],
            ['`less arquivo.log`', 'Lê arquivos grandes. `/` busca, `q` sai'],
            ['`tail -f app.log`', 'Acompanha o arquivo enquanto ele cresce'],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Ajuda sempre à mão',
          text: '`man ls` abre o manual do comando. `comando --help` mostra um resumo. A tecla Tab completa nomes, e a seta para cima repete comandos anteriores.',
        },
      ],
    },
    {
      id: 'combinar',
      title: 'Combinar comandos',
      blocks: [
        {
          type: 'text',
          text: 'A força do terminal está em ligar programas pequenos. O `|` (pipe) manda a saída de um comando para a entrada do próximo. `>` grava num arquivo, e `>>` acrescenta no final.',
        },
        {
          type: 'code',
          language: 'bash',
          caption: 'Os 5 IPs que mais geraram erro 500 no log',
          code: "grep ' 500 ' access.log \\\n  | awk '{print $1}' \\\n  | sort \\\n  | uniq -c \\\n  | sort -rn \\\n  | head -5",
          output:
            '  412 203.0.113.7\n   98 198.51.100.23\n   41 192.0.2.14\n   12 203.0.113.50\n    3 198.51.100.4',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'grep',
              text: 'Filtra linhas que contêm um texto. `-i` ignora maiúsculas, `-r` busca em pastas.',
            },
            { term: 'awk', text: 'Separa colunas. `$1` é a primeira palavra da linha.' },
            { term: 'sort e uniq -c', text: 'Ordenam e contam repetições.' },
            {
              term: 'find',
              text: '`find . -name "*.log" -mtime -1` acha arquivos por nome e data.',
            },
          ],
        },
      ],
    },
    {
      id: 'permissoes',
      title: 'Permissões e usuários',
      blocks: [
        {
          type: 'code',
          language: 'bash',
          code: 'ls -l deploy.sh',
          output: '-rwxr-x--- 1 ana devs 812 out 13 10:02 deploy.sh',
        },
        {
          type: 'text',
          text: 'Depois do primeiro caractere vêm três grupos de `rwx`: **dono**, **grupo** e **outros**. `r` é ler, `w` é escrever e `x` é executar. Aqui, Ana faz tudo, o grupo `devs` lê e executa, e mais ninguém acessa.',
        },
        {
          type: 'list',
          items: [
            '`chmod +x deploy.sh` torna o script executável.',
            '`chmod 600 chave.pem` deixa só o dono ler e escrever. O SSH exige isso de chaves privadas.',
            '`sudo comando` executa como administrador. Use só quando necessário.',
          ],
        },
      ],
    },
    {
      id: 'processos',
      title: 'Processos, portas e serviços',
      blocks: [
        {
          type: 'table',
          caption: 'Quando algo está lento, travado ou ocupando a porta',
          head: ['Pergunta', 'Comando'],
          rows: [
            ['O que está consumindo CPU e memória?', '`top` ou `htop`'],
            ['Esse processo está rodando?', '`ps aux | grep node`'],
            ['Quem está usando a porta 3000?', '`ss -ltnp | grep 3000` ou `lsof -i :3000`'],
            ['Como paro esse processo?', '`kill 1234`; se não responder, `kill -9 1234`'],
            ['O disco está cheio?', '`df -h` e `du -sh * | sort -h`'],
            ['O serviço está de pé?', '`systemctl status nginx`'],
            ['O que o serviço registrou?', '`journalctl -u nginx --since "10 min ago"`'],
          ],
        },
        {
          type: 'checklist',
          id: 'terminal',
          items: [
            'Navego entre pastas e manipulo arquivos sem o gerenciador gráfico.',
            'Encontro um texto em vários arquivos com `grep -r`.',
            'Combino comandos com `|` para responder a uma pergunta sobre um log.',
            'Leio e altero permissões com `ls -l` e `chmod`.',
            'Descubro qual processo usa uma porta e consigo pará-lo.',
            'Leio os logs de um serviço com `journalctl`.',
          ],
        },
      ],
    },
  ],
  sources: [
    { title: 'Linux Journey', url: 'https://linuxjourney.com/' },
    { title: 'The Linux Command Line (livro gratuito)', url: 'https://linuxcommand.org/tlcl.php' },
    { title: 'explainshell: explica cada parte de um comando', url: 'https://explainshell.com/' },
    { title: 'MIT: The Missing Semester', url: 'https://missing.csail.mit.edu/' },
  ],
};
