import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Dia 5, dia de pagamento, e as pessoas reclamam nas redes que o app não fecha o pedido. Você tem duas opções: abrir o código e adivinhar, ou abrir um painel e ver em um minuto que só o pagamento falha, desde as 9h12, por causa de um banco sem resposta. Observabilidade é o que permite a segunda opção. Saber operar um sistema quando ele falha é o que faz alguém confiar em você para colocá-lo no ar.',
  sections: [
    {
      id: 'tres-sinais',
      title: 'Três jeitos de enxergar um sistema',
      blocks: [
        {
          type: 'analogy',
          title: 'Acompanhando uma encomenda',
          text: 'O painel do caminhão mostra números o tempo todo: velocidade, combustível. O motorista anota no diário de bordo o que aconteceu e a que horas. E o rastreio dos Correios mostra cada etapa da **sua** encomenda, de agência em agência, com o tempo em cada uma. Os sistemas têm exatamente essas três fontes de informação.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Métricas',
              text: 'Números medidos ao longo do tempo: requisições por segundo, porcentagem de erros, uso de memória. Baratas de guardar, ótimas para gráficos e alertas. Respondem “**quanto** e **quando**”.',
            },
            {
              term: 'Logs',
              text: 'Registros de eventos, linha a linha, com horário: “pedido 812 recusado: cartão expirado”. Respondem “**o que** aconteceu exatamente”.',
            },
            {
              term: 'Traces',
              text: 'O caminho de uma requisição por todos os serviços, com o tempo gasto em cada etapa (cada etapa é um **span**). Respondem “**onde** está a demora ou o erro”.',
            },
          ],
        },
        {
          type: 'text',
          text: '**Observabilidade** é a capacidade de entender o que acontece dentro de um sistema olhando para o que ele emite de fora. O **OpenTelemetry** é o padrão aberto mais usado para gerar esses três sinais, independentemente da ferramenta que vai exibi-los.',
        },
        {
          type: 'classify',
          prompt: 'Que tipo de sinal é cada informação?',
          buckets: ['Métrica', 'Log', 'Trace'],
          items: [
            { text: 'Gráfico de requisições por minuto na última hora', bucket: 0 },
            { text: '`ERROR pagamento recusado pedido=812 motivo=timeout`', bucket: 1 },
            {
              text: 'Uma requisição levou 3 s: 2,8 s foram esperando o serviço de pagamento',
              bucket: 2,
            },
            { text: 'Uso de memória do banco: 87%', bucket: 0 },
            { text: '`INFO usuario 45 fez login`', bucket: 1 },
            { text: 'O caminho de um pedido: app, API, estoque, pagamento', bucket: 2 },
          ],
          explanation:
            'Na prática, você usa os três juntos: a métrica mostra que algo piorou, o trace aponta em que serviço, e o log daquele serviço conta o porquê.',
        },
      ],
    },
    {
      id: 'logs-estruturados',
      title: 'Logs que uma máquina consegue ler',
      blocks: [
        {
          type: 'text',
          text: 'Um log em texto livre, como `Erro ao pagar o pedido 812!!`, é fácil de escrever e difícil de pesquisar. Um **log estruturado** guarda cada informação num campo com nome, normalmente em JSON. Aí dá para perguntar “quantos erros por rota na última hora?” em vez de ler linha por linha.',
        },
        {
          type: 'anatomy',
          caption: 'Uma linha de log estruturado em JSON.',
          language: 'json',
          parts: [
            { text: '{ ' },
            {
              text: '"hora": "2026-10-05T09:12:44.318Z"',
              label: 'Horário',
              note: 'Em formato padrão e em UTC (horário universal). Com servidores em lugares diferentes, é a única forma de pôr os eventos em ordem.',
            },
            { text: ', ' },
            {
              text: '"nivel": "error"',
              label: 'Nível',
              note: 'A gravidade: `debug`, `info`, `warn`, `error`. Em produção, costuma-se guardar a partir de `info`. Reserve `error` para o que precisa de atenção.',
            },
            { text: ', ' },
            {
              text: '"servico": "api-pedidos"',
              label: 'Serviço',
              note: 'Quem escreveu o log. Com vários serviços mandando logs para o mesmo lugar, é o primeiro filtro que você vai usar.',
            },
            { text: ', ' },
            {
              text: '"msg": "pagamento recusado"',
              label: 'Mensagem',
              note: 'Uma frase curta e **fixa**. Os detalhes que variam vão em campos próprios, para a mensagem poder ser agrupada.',
            },
            { text: ', ' },
            {
              text: '"pedido_id": 812, "rota": "/pagamento", "status": 502, "ms": 3004',
              label: 'Contexto',
              note: 'Os dados que permitem investigar: qual pedido, qual rota, qual resposta, quanto tempo. Números ficam como números, para dar para somar e comparar.',
            },
            { text: ', ' },
            {
              text: '"trace_id": "4bf92f3577b34da6"',
              label: 'trace_id',
              note: 'O código do trace dessa requisição. Com ele, você pula do log para o caminho completo do pedido e vê os logs dos outros serviços na mesma requisição.',
            },
            { text: ' }' },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'O que nunca vai para o log',
          text: 'Senhas, tokens, número de cartão, CPF completo e dados de saúde. Logs são lidos por muita gente, copiados para várias ferramentas e guardados por meses. Pela LGPD, dado pessoal em log também é tratamento de dado pessoal. Registre o `usuario_id`, não o nome e o CPF.',
        },
        {
          type: 'python',
          title: 'Contando erros a partir dos logs',
          task: 'Cada linha é um log em JSON. Conte quantas requisições tiveram erro de servidor (status 500 ou mais), calcule a `taxa` de erro (erros dividido pelo total) e preencha `erros_por_rota` com quantos erros cada rota teve.',
          code: 'import json\n\nlinhas = [\n    \'{"nivel": "info", "rota": "/pedidos", "status": 200, "ms": 120}\',\n    \'{"nivel": "info", "rota": "/pedidos", "status": 201, "ms": 180}\',\n    \'{"nivel": "error", "rota": "/pagamento", "status": 502, "ms": 3000}\',\n    \'{"nivel": "info", "rota": "/cardapio", "status": 200, "ms": 45}\',\n    \'{"nivel": "error", "rota": "/pagamento", "status": 504, "ms": 5000}\',\n    \'{"nivel": "warn", "rota": "/pedidos", "status": 404, "ms": 30}\',\n    \'{"nivel": "info", "rota": "/cardapio", "status": 200, "ms": 50}\',\n    \'{"nivel": "error", "rota": "/pagamento", "status": 500, "ms": 900}\',\n]\n\nerros = 0\nerros_por_rota = {}\n\nfor linha in linhas:\n    evento = json.loads(linha)\n    # se evento["status"] for 500 ou mais:\n    #   some 1 em erros e 1 na rota do evento\n    pass\n\ntaxa = 0\n\nprint(f"Erros 5xx: {erros} de {len(linhas)} ({taxa:.1%})")\nprint("Por rota:", erros_por_rota)\n',
          solution:
            'import json\n\nlinhas = [\n    \'{"nivel": "info", "rota": "/pedidos", "status": 200, "ms": 120}\',\n    \'{"nivel": "info", "rota": "/pedidos", "status": 201, "ms": 180}\',\n    \'{"nivel": "error", "rota": "/pagamento", "status": 502, "ms": 3000}\',\n    \'{"nivel": "info", "rota": "/cardapio", "status": 200, "ms": 45}\',\n    \'{"nivel": "error", "rota": "/pagamento", "status": 504, "ms": 5000}\',\n    \'{"nivel": "warn", "rota": "/pedidos", "status": 404, "ms": 30}\',\n    \'{"nivel": "info", "rota": "/cardapio", "status": 200, "ms": 50}\',\n    \'{"nivel": "error", "rota": "/pagamento", "status": 500, "ms": 900}\',\n]\n\nerros = 0\nerros_por_rota = {}\n\nfor linha in linhas:\n    evento = json.loads(linha)\n    if evento["status"] >= 500:\n        erros += 1\n        rota = evento["rota"]\n        erros_por_rota[rota] = erros_por_rota.get(rota, 0) + 1\n\ntaxa = erros / len(linhas)\n\nprint(f"Erros 5xx: {erros} de {len(linhas)} ({taxa:.1%})")\nprint("Por rota:", erros_por_rota)\n',
          checks: [
            {
              label: 'Conta só os erros de servidor (o 404 não entra)',
              test: 'erros == 3',
            },
            {
              label: 'A taxa de erro é erros dividido pelo total de linhas',
              test: 'abs(taxa - 0.375) < 1e-9',
            },
            {
              label: 'Os erros estão agrupados por rota',
              test: "erros_por_rota == {'/pagamento': 3}",
            },
          ],
        },
      ],
    },
    {
      id: 'sinais-de-ouro',
      title: 'Os quatro sinais que importam',
      blocks: [
        {
          type: 'text',
          text: 'Dá para medir milhares de coisas. O livro de SRE do Google propõe começar por quatro, os **sinais de ouro**, porque descrevem o que a pessoa usuária sente.',
        },
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              label: 'Latência',
              title: 'Quanto demora',
              text: 'O tempo para responder. Meça separado para sucessos e erros: um erro rápido pode puxar a média para baixo e esconder o problema.',
            },
            {
              label: 'Tráfego',
              title: 'Quanto pedem',
              text: 'Requisições por segundo, pedidos por minuto. Uma queda brusca de tráfego também é sinal de problema: talvez ninguém consiga chegar.',
            },
            {
              label: 'Erros',
              title: 'Quanto falha',
              text: 'A fração de requisições que falham, como respostas 5xx ou pedidos que não foram concluídos.',
            },
            {
              label: 'Saturação',
              title: 'Quão cheio está',
              text: 'O quanto do recurso mais escasso está em uso: memória, conexões com o banco, fila. Avisa antes de transbordar.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Para latência, a **média** engana. Use **percentis**: o p95 é o tempo abaixo do qual estão 95% das requisições. Se o p95 é 2 s, 1 em cada 20 pessoas esperou 2 s ou mais.',
        },
        {
          type: 'quiz',
          question:
            'O painel mostra latência média de 180 ms, mas o p99 está em 6 segundos. Como você interpreta?',
          options: [
            {
              text: 'A maioria é rápida, mas 1% das requisições está muito lenta e merece investigação',
              correct: true,
              feedback:
                'Isso. A média esconde a cauda. Num app com 100 mil pedidos por dia, 1% são mil pessoas esperando 6 segundos, muitas desistindo do pedido.',
            },
            {
              text: 'Está tudo bem, porque a média é baixa',
              feedback:
                'A média mistura todos e esconde os casos ruins. Poucas requisições lentíssimas quase não mexem na média, mas mexem muito na experiência de quem as fez.',
            },
            {
              text: 'O painel está errado, porque a média e o p99 deveriam ser parecidos',
              feedback:
                'É muito comum ficarem distantes. A maioria das requisições é rápida e algumas, como as que esperam outro serviço, são lentas. É exatamente para isso que existem os percentis.',
            },
          ],
        },
        {
          type: 'flow',
          caption: 'O trace de um pedido lento: onde foram os 3 segundos?',
          actors: ['App', 'API', 'Banco', 'Pagamentos'],
          steps: [
            {
              from: 0,
              to: 1,
              label: 'POST /pedidos',
              text: 'O trace começa aqui, com um `trace_id` que vai viajar junto com a requisição por todos os serviços.',
            },
            {
              from: 1,
              to: 2,
              label: 'Salva pedido · 12 ms',
              text: 'Um span rápido. O banco não é o problema.',
              tone: 'ok',
            },
            {
              from: 1,
              to: 3,
              label: 'Cobrar · 2.840 ms',
              text: 'O span que domina o tempo total. O serviço de pagamento está demorando quase 3 segundos para responder.',
              tone: 'error',
            },
            {
              from: 3,
              to: 1,
              label: 'Aprovado',
              text: 'A resposta chega, mas tarde. Sem trace, a API pareceria a culpada.',
            },
            {
              from: 1,
              to: 0,
              label: '201 em 2,9 s',
              text: 'A pessoa recebe a confirmação, depois de quase 3 segundos olhando um carregando.',
            },
          ],
        },
      ],
    },
    {
      id: 'slo-e-orcamento',
      title: 'Quanto de falha é aceitável',
      blocks: [
        {
          type: 'text',
          text: 'Nenhum sistema acerta 100% das vezes, e tentar custa caro demais. Então o time combina uma meta. Três siglas organizam essa conversa.',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'SLI (indicador)',
              text: 'O que você mede, do ponto de vista de quem usa. Exemplo: a fração de requisições ao checkout respondidas com sucesso em menos de 1 s.',
            },
            {
              term: 'SLO (objetivo)',
              text: 'A meta para o SLI num período. Exemplo: 99,9% das requisições boas em 30 dias.',
            },
            {
              term: 'Orçamento de erros',
              text: 'O quanto pode falhar sem quebrar o SLO: 100% menos a meta. Com 99,9%, sobra 0,1% para falhas, lançamentos arriscados e imprevistos.',
            },
          ],
        },
        {
          type: 'table',
          caption: 'Quanto tempo fora do ar cada meta permite em 30 dias',
          head: ['SLO', 'Orçamento', 'Indisponibilidade permitida'],
          rows: [
            ['99%', '1%', 'cerca de 7 horas e 12 minutos'],
            ['99,9%', '0,1%', 'cerca de 43 minutos'],
            ['99,99%', '0,01%', 'cerca de 4 minutos'],
          ],
        },
        {
          type: 'text',
          text: 'O orçamento vira uma regra de decisão: se ainda sobra, o time pode lançar coisas novas com mais liberdade; se acabou, a prioridade passa a ser confiabilidade.',
        },
        {
          type: 'python',
          title: 'Calculando o orçamento de erros do mês',
          task: 'O checkout recebeu 1.200.000 requisições no mês e 1.500 falharam. A meta é 99,9%. Calcule o `sli`, o `orcamento` (quantas falhas a meta permite), o `gasto` (que porcentagem do orçamento já foi usada) e diga em `dentro_do_slo` se a meta foi cumprida.',
          code: 'total = 1_200_000\nfalhas = 1_500\nslo = 0.999\n\nsli = 0             # fração de requisições boas\norcamento = 0       # total x (1 - slo)\ngasto = 0           # falhas / orcamento x 100\ndentro_do_slo = True\n\nprint(f"SLI: {sli:.3%}")\nprint(f"Orçamento: {orcamento:.0f} falhas | gasto: {gasto:.0f}%")\nprint("Dentro do SLO?", dentro_do_slo)\n',
          solution:
            'total = 1_200_000\nfalhas = 1_500\nslo = 0.999\n\nsli = (total - falhas) / total\norcamento = total * (1 - slo)\ngasto = falhas / orcamento * 100\ndentro_do_slo = sli >= slo\n\nprint(f"SLI: {sli:.3%}")\nprint(f"Orçamento: {orcamento:.0f} falhas | gasto: {gasto:.0f}%")\nprint("Dentro do SLO?", dentro_do_slo)\n',
          checks: [
            {
              label: 'O SLI é a fração de requisições boas',
              test: 'abs(sli - 0.99875) < 1e-9',
            },
            {
              label: 'O orçamento permite 1.200 falhas no mês',
              test: 'round(orcamento) == 1200',
            },
            {
              label: 'O gasto mostra que o orçamento estourou (125%)',
              test: 'abs(gasto - 125) < 0.01',
            },
            {
              label: 'A meta não foi cumprida',
              test: 'dentro_do_slo == False',
            },
          ],
        },
        {
          type: 'reveal',
          question:
            'O resultado mostra 99,875% de sucesso. Parece ótimo. Por que o time deveria se preocupar?',
          answer:
            'Porque a meta combinada era 99,9%, e o orçamento foi gasto em 125%. Em números absolutos, 300 falhas além do aceitável. Pela regra do orçamento, é hora de pausar lançamentos arriscados e investir em confiabilidade até a situação voltar.',
        },
      ],
    },
    {
      id: 'alertas',
      title: 'Alertas que valem acordar alguém',
      blocks: [
        {
          type: 'text',
          text: 'Um alerta é uma regra que chama uma pessoa quando uma métrica passa de um limite. Alerta demais é tão ruim quanto nenhum: quem recebe dez falsos por noite começa a ignorar, e ignora também o verdadeiro.',
        },
        {
          type: 'text',
          text: 'A regra prática é alertar pelo **sintoma** (o que a pessoa usuária sente: erros, lentidão) e não pela **causa** (CPU alta, um container reiniciado). CPU em 90% sem ninguém afetado não é emergência. E todo alerta deve ser **acionável**: quem recebe precisa saber o que fazer.',
        },
        {
          type: 'classify',
          prompt: 'Este alerta deveria chamar alguém de madrugada?',
          buckets: [
            'Bom alerta: sintoma e acionável',
            'Ruído: melhor virar painel ou aviso de dia',
          ],
          items: [
            { text: 'Taxa de erro do checkout acima de 2% por 5 minutos', bucket: 0 },
            { text: 'CPU de um servidor passou de 80% por 1 minuto', bucket: 1 },
            { text: 'Orçamento de erros sendo gasto 10 vezes mais rápido que o normal', bucket: 0 },
            { text: 'Apareceu uma linha de log com nível `warn`', bucket: 1 },
            { text: 'p95 da busca acima de 2 s por 10 minutos', bucket: 0 },
            {
              text: 'Um container reiniciou uma vez, sem erros para as pessoas usuárias',
              bucket: 1,
            },
          ],
          explanation:
            'Os bons alertas descrevem impacto e duram o bastante para não serem um soluço. Os outros são informação útil para investigar, mas não justificam interromper o sono de ninguém.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Health check: o sinal mais simples',
          text: 'Um **health check** é um endereço como `/health` que responde se o serviço está pronto: consegue falar com o banco, tem o que precisa. O Docker, o balanceador e o monitoramento consultam esse endereço para decidir se mandam tráfego e se alertam. Você viu `healthcheck` na aula de Docker.',
        },
      ],
    },
    {
      id: 'incidentes',
      title: 'Quando dá errado de verdade',
      blocks: [
        {
          type: 'text',
          text: 'Um **incidente** é qualquer situação que afeta as pessoas usuárias e precisa de resposta agora. A prioridade é **mitigar** (fazer o serviço voltar), não descobrir a causa profunda. Investigação completa vem depois, com calma.',
        },
        {
          type: 'terminal',
          title: 'Diagnosticando uma API fora do ar',
          task: 'O alerta disparou: a API da loja responde erro. Ela roda com Docker Compose num servidor. Investigue e restaure o serviço.',
          prompt: 'voce@servidor:~/loja$',
          steps: [
            {
              goal: 'Consulte o health check da API e veja o status da resposta.',
              command: [
                'curl -i http://localhost:8000/health',
                'curl -i localhost:8000/health',
                'curl http://localhost:8000/health',
                'curl localhost:8000/health',
              ],
              output:
                'HTTP/1.1 503 Service Unavailable\ncontent-type: application/json\n\n{"status":"erro","banco":"indisponivel"}',
              hint: '`curl -i http://localhost:8000/health`. O `-i` mostra o status.',
            },
            {
              goal: 'Veja o estado dos containers do projeto.',
              command: ['docker compose ps', 'docker compose ps -a'],
              output:
                'NAME         IMAGE         SERVICE   STATUS\nloja-api-1   loja:1.4.0    api       Up 3 hours\nloja-db-1    postgres:16   db        Exited (137) 12 minutes ago',
              hint: '`docker compose ps`.',
            },
            {
              goal: 'Leia as últimas 20 linhas de log da API para confirmar o que ela vê.',
              command: [
                'docker compose logs api --tail 20',
                'docker compose logs --tail 20 api',
                'docker compose logs --tail=20 api',
                'docker compose logs api --tail=20',
              ],
              output:
                'api-1  | {"nivel":"error","msg":"falha ao conectar no banco","host":"db:5432","erro":"connection refused"}\napi-1  | {"nivel":"error","msg":"falha ao conectar no banco","host":"db:5432","erro":"connection refused"}',
              hint: '`docker compose logs api --tail 20`.',
            },
            {
              goal: 'Mitigue: suba de novo o serviço do banco em segundo plano.',
              command: ['docker compose up -d db', 'docker compose start db'],
              output: '[+] Running 1/1\n ✔ Container loja-db-1  Started',
              hint: '`docker compose up -d db`.',
            },
            {
              goal: 'Confirme que a API voltou a responder.',
              command: [
                'curl -i http://localhost:8000/health',
                'curl -i localhost:8000/health',
                'curl http://localhost:8000/health',
                'curl localhost:8000/health',
              ],
              output:
                'HTTP/1.1 200 OK\ncontent-type: application/json\n\n{"status":"ok","banco":"ok"}',
              hint: 'O mesmo `curl` do começo.',
            },
          ],
        },
        {
          type: 'reveal',
          question:
            'O serviço voltou. O incidente acabou? O que o código `Exited (137)` sugere para a investigação?',
          answer:
            'O impacto acabou, a investigação não. O código 137 indica que o processo foi encerrado à força, muitas vezes por falta de memória. Se ninguém investigar, vai acontecer de novo. Esse é o assunto do relato pós-incidente.',
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem as etapas de resposta a um incidente.',
          items: [
            'Um alerta de sintoma dispara',
            'Alguém assume a coordenação e declara o incidente',
            'O time avisa as pessoas afetadas sobre o problema',
            'O serviço é restaurado, com rollback ou outra mitigação',
            'As métricas confirmam que a situação normalizou',
            'O time escreve o relato pós-incidente sem culpados',
            'As ações de melhoria entram no planejamento',
          ],
          explanation:
            'Comunicar cedo evita que as pessoas fiquem no escuro. E repare: a causa profunda aparece só no relato, depois que o serviço já voltou.',
        },
        {
          type: 'text',
          text: 'Um **runbook** é o roteiro escrito para um alerta: o que olhar primeiro, quais comandos rodar, quando escalar. Ele transforma o conhecimento de uma pessoa experiente em algo que alguém nova no time consegue seguir às 3h da manhã. Inclua também como **restaurar um backup**, e teste a restauração: backup nunca restaurado é só uma esperança.',
        },
        {
          type: 'text',
          text: 'O **relato pós-incidente** (*postmortem*) conta o que aconteceu, a linha do tempo, o impacto, as causas e as ações para não repetir. Ele é **sem culpados**: parte do princípio de que as pessoas agiram da melhor forma com o que sabiam, e procura o que no sistema permitiu o erro.',
        },
        {
          type: 'quiz',
          question: 'No relato de um incidente, qual destas frases segue a cultura sem culpados?',
          options: [
            {
              text: 'O comando de limpeza apagou a tabela porque o script não pedia confirmação em produção',
              correct: true,
              feedback:
                'Isso. A frase descreve o mecanismo e aponta uma melhoria concreta: o script deveria pedir confirmação ou bloquear produção. Qualquer pessoa poderia ter cometido o mesmo erro.',
            },
            {
              text: 'O Lucas foi descuidado e rodou o comando errado',
              feedback:
                'Apontar uma pessoa não impede a próxima vez: o sistema continua permitindo o mesmo erro. E quem tem medo de punição passa a esconder informações nos próximos incidentes.',
            },
            {
              text: 'Foi falta de atenção, e o time vai prestar mais atenção',
              feedback:
                '“Prestar mais atenção” não é uma ação verificável. Bons relatos terminam com mudanças concretas: um alerta novo, uma proteção no script, um teste.',
            },
          ],
        },
      ],
    },
  ],
  recap: [
    'Métricas dizem quanto e quando, logs dizem o que aconteceu, traces dizem onde; juntos, explicam o sistema por fora.',
    'Logs estruturados em JSON, com contexto e sem dados pessoais, podem ser pesquisados e contados.',
    'Latência, tráfego, erros e saturação são os sinais de ouro; para latência, use percentis em vez de média.',
    'O SLI mede, o SLO é a meta e o orçamento de erros é a margem que orienta quando lançar e quando estabilizar.',
    'Alerte por sintomas acionáveis, mitigue primeiro, siga runbooks e escreva relatos sem culpados.',
  ],
  cards: [
    {
      id: 'tres-sinais',
      front: 'Qual a diferença entre métricas, logs e traces?',
      back: 'Métricas: números no tempo. Logs: eventos detalhados. Traces: o caminho de uma requisição pelos serviços.',
    },
    {
      id: 'log-estruturado',
      front: 'O que é um log estruturado?',
      back: 'Um log com campos nomeados, como JSON, que pode ser filtrado e contado por máquina.',
    },
    {
      id: 'sinais-de-ouro',
      front: 'Quais são os quatro sinais de ouro?',
      back: 'Latência, tráfego, erros e saturação.',
    },
    {
      id: 'p95',
      front: 'O que significa p95 de latência = 2 s?',
      back: '95% das requisições responderam em até 2 s; 5% demoraram mais.',
    },
    {
      id: 'sli-slo',
      front: 'Qual a diferença entre SLI e SLO?',
      back: 'SLI é o que se mede; SLO é a meta para essa medida num período.',
    },
    {
      id: 'orcamento-erros',
      front: 'Com SLO de 99,9% e 1 milhão de requisições, qual o orçamento de erros?',
      back: '1.000 requisições com falha (0,1% do total).',
    },
    {
      id: 'sintoma-causa',
      front: 'Por que alertar por sintoma e não por causa?',
      back: 'Sintomas mostram impacto real em quem usa; causas como CPU alta muitas vezes não afetam ninguém.',
    },
    {
      id: 'sem-culpados',
      front: 'O que é um relato pós-incidente sem culpados?',
      back: 'Um relato que busca as falhas do sistema e ações concretas, sem apontar pessoas.',
    },
  ],
  mission: {
    title: 'Derrube, recupere e conte a história',
    text: 'Use uma aplicação sua com API e banco rodando em Docker Compose. Você vai provocar uma falha de propósito, recuperar o serviço e escrever o relato como um time de verdade faria.',
    steps: [
      'Adicione logs estruturados em JSON e um endereço `/health` que verifica o banco',
      'Defina um SLI e um SLO para a rota principal e escreva qual seria o alerta de sintoma',
      'Pare o container do banco e observe o que o health check e os logs mostram',
      'Recupere o serviço seguindo um runbook curto que você escreveu antes',
      'Faça um backup do banco, apague os dados de teste e restaure a partir do backup',
      'Escreva um relato pós-incidente sem culpados com linha do tempo, impacto, causa e duas ações',
    ],
  },
  sources: [
    {
      title: 'Google SRE: Monitoring Distributed Systems',
      url: 'https://sre.google/sre-book/monitoring-distributed-systems/',
    },
    {
      title: 'Google SRE Workbook: Implementing SLOs',
      url: 'https://sre.google/workbook/implementing-slos/',
    },
    {
      title: 'Google SRE: Postmortem Culture',
      url: 'https://sre.google/sre-book/postmortem-culture/',
    },
    {
      title: 'OpenTelemetry: Observability primer',
      url: 'https://opentelemetry.io/docs/concepts/observability-primer/',
    },
  ],
};
