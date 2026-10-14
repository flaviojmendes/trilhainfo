import { LessonContent } from '../types';

export const content: LessonContent = {
  hook: 'Uma equipe com 900 testes pode estar menos protegida que outra com 200. Se a suíte leva 40 minutos, falha “de vez em quando” e ninguém sabe o que ela cobre, as pessoas param de olhar para o vermelho, e é aí que o bug passa. Decidir o que testar, em que nível, e como a CI mostra o resultado é o que transforma testes soltos em uma rede de segurança de verdade. É também uma das perguntas favoritas em entrevistas de QA: “como você montaria a estratégia de testes deste produto?”.',
  sections: [
    {
      id: 'formato-da-suite',
      title: 'Quantos testes de cada tipo',
      blocks: [
        {
          type: 'analogy',
          title: 'Exames no posto de saúde',
          text: 'No posto do SUS, medir pressão e glicemia é rápido e barato, então se faz em toda consulta. Uma ressonância mostra muito mais, mas é cara e demorada: fica para quando há um motivo forte. Ninguém faz ressonância toda semana “para garantir”. Uma boa suíte de testes distribui os exames do mesmo jeito.',
        },
        {
          type: 'text',
          text: 'Na aula de testes de interface você viu a **pirâmide de testes**: muitos testes de unidade na base, vários de integração no meio e poucos de ponta a ponta no topo. Um **teste de integração** confere duas ou mais peças conversando de verdade, como a API com o banco, ou uma tela com o roteador e o formulário.',
        },
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              label: 'Modelo',
              title: 'Pirâmide',
              text: 'Base larga de testes de unidade, rápidos e baratos; poucos E2E no topo. Ótima regra para regras de negócio e serviços de backend.',
              points: ['Unidade: maioria', 'Integração: vários', 'Ponta a ponta: poucos'],
            },
            {
              label: 'Modelo',
              title: 'Troféu',
              text: 'Popular no frontend: a maior parte do esforço em testes de integração, que dão mais confiança por teste, apoiados por análise estática (TypeScript e lint).',
              points: [
                'Estático: sempre ligado',
                'Unidade: lógica isolada',
                'Integração: a maior fatia',
                'Ponta a ponta: poucos',
              ],
            },
          ],
        },
        {
          type: 'text',
          text: 'Os dois modelos concordam no essencial: poucos testes de ponta a ponta, só nas jornadas críticas, e a maior parte das conferências nos níveis mais rápidos. O desenho que eles condenam é o **sorvete de casquinha**: quase tudo em E2E e testes manuais, quase nada embaixo.',
        },
        {
          type: 'quiz',
          question:
            'Uma equipe tem 15 testes de unidade e 400 testes de ponta a ponta. A suíte leva 50 minutos e falha em média uma vez por dia sem bug real. Qual o melhor primeiro passo?',
          options: [
            {
              text: 'Levar as regras que estão sendo conferidas pelo navegador para testes de unidade e de API, mantendo E2E só nas jornadas críticas',
              correct: true,
              feedback:
                'Isso. Uma regra de desconto testada em 30 cenários pelo navegador vira 30 testes de milissegundos embaixo. A suíte fica rápida e as falhas apontam o lugar exato do problema.',
            },
            {
              text: 'Comprar máquinas mais rápidas para a CI',
              feedback:
                'Ajuda no tempo, mas não nas falhas sem motivo nem no diagnóstico. O problema é o formato da suíte, não a máquina.',
            },
            {
              text: 'Configurar 3 tentativas automáticas para todos os testes',
              feedback:
                'Esconde as falhas sem resolver nenhuma e pode deixar a suíte ainda mais lenta. Tentativas automáticas não substituem corrigir a causa.',
            },
            {
              text: 'Apagar os testes que falham com frequência',
              feedback:
                'Eles podem estar protegendo algo importante. Antes de apagar, entenda o que cobrem e mova essa conferência para o nível certo.',
            },
          ],
        },
      ],
    },
    {
      id: 'o-que-automatizar',
      title: 'O que vale automatizar',
      blocks: [
        {
          type: 'text',
          text: 'Automatizar custa: escrever, manter e esperar o teste rodar. O retorno vem quando ele roda muitas vezes e protege algo que importa. Duas perguntas resolvem a maioria das dúvidas: **qual o risco** se isso quebrar? E **com que frequência** isso precisa ser conferido?',
        },
        {
          type: 'table',
          caption:
            'Risco e frequência, as duas perguntas da aula de técnicas e riscos aplicadas à automação',
          head: ['', 'Muda ou roda com frequência', 'Raramente'],
          rows: [
            [
              'Risco alto',
              'Automatize primeiro (login, pagamento, cálculo de preço)',
              'Automatize o essencial e explore manualmente',
            ],
            [
              'Risco baixo',
              'Automatize se for barato, em nível baixo',
              'Confira manualmente ou só observe',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Automação não substitui exploração',
          text: 'Um teste automatizado só confere o que alguém pensou em escrever. O teste exploratório, que você praticou na aula de exploratório e relato de bugs, descobre o que ninguém pensou. Uma estratégia saudável usa os dois.',
        },
        {
          type: 'classify',
          prompt:
            'Para cada caso, o melhor caminho é automatizar ou manter como verificação manual/exploratória?',
          buckets: ['Automatizar', 'Manual ou exploratório'],
          items: [
            { text: 'Pagamento com Pix no checkout, conferido a cada deploy', bucket: 0 },
            { text: 'As 20 regras de cálculo de frete por faixa de CEP', bucket: 0 },
            { text: 'Pessoa sem login não consegue ver pedidos de outras pessoas', bucket: 0 },
            { text: 'A tela de cadastro continua funcionando depois de cada mudança', bucket: 0 },
            { text: 'Avaliar se o novo layout da home ficou fácil de entender', bucket: 1 },
            { text: 'Banner de uma campanha que fica no ar só neste fim de semana', bucket: 1 },
            { text: 'Primeira investigação de um recurso que acabou de ser criado', bucket: 1 },
          ],
          explanation:
            'Automatize o que é repetitivo e caro de errar. Julgamentos humanos (clareza, beleza), coisas de vida curta e a primeira descoberta de um recurso novo pedem uma pessoa. Muitas vezes a exploração encontra casos que depois viram testes automatizados.',
        },
      ],
    },
    {
      id: 'cobertura',
      title: 'O que a cobertura mede, e o que não mede',
      blocks: [
        {
          type: 'text',
          text: '**Cobertura de código** é a porcentagem do código que foi executada enquanto os testes rodavam. A cobertura de **linhas** conta quais linhas rodaram; a de **ramos** (branches) conta se cada caminho de um `if` foi seguido, tanto o “sim” quanto o “não”.',
        },
        {
          type: 'terminal',
          title: 'Meça a cobertura de um projeto',
          task: 'O projeto usa Vitest para testes de unidade. Rode os testes, peça o relatório de cobertura e veja o que acontece com uma meta mínima.',
          prompt: '~/loja$',
          steps: [
            {
              goal: 'Rode os testes de unidade: `npx vitest run`',
              command: ['npx vitest run'],
              output: ` ✓ src/carrinho.test.ts (8 tests) 12ms
 ✓ src/frete.test.ts (4 tests) 5ms
 ✓ src/cupom.test.ts (2 tests) 4ms

 Test Files  3 passed (3)
      Tests  14 passed (14)
   Duration  612ms`,
              hint: 'Digite `npx vitest run`.',
            },
            {
              goal: 'Agora peça o relatório de cobertura: `npx vitest run --coverage`',
              command: ['npx vitest run --coverage'],
              output: ` ✓ src/carrinho.test.ts (8 tests) 12ms
 ✓ src/frete.test.ts (4 tests) 5ms
 ✓ src/cupom.test.ts (2 tests) 4ms

 Test Files  3 passed (3)
      Tests  14 passed (14)

 % Coverage report from v8
-------------|---------|----------|---------|---------|-------------------
File         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------|---------|----------|---------|---------|-------------------
All files    |   86.95 |    72.72 |   88.88 |   86.95 |
 carrinho.ts |     100 |      100 |     100 |     100 |
 cupom.ts    |   63.63 |       40 |      75 |   63.63 | 14-19
 frete.ts    |     100 |      100 |     100 |     100 |
-------------|---------|----------|---------|---------|-------------------`,
              hint: 'É o mesmo comando com `--coverage` no final.',
            },
            {
              goal: 'Simule a meta que a CI cobra, de 80% de ramos: `npx vitest run --coverage --coverage.thresholds.branches=80`',
              command: [
                'npx vitest run --coverage --coverage.thresholds.branches=80',
                'npx vitest run --coverage.thresholds.branches=80 --coverage',
              ],
              output: ` Test Files  3 passed (3)
      Tests  14 passed (14)

 % Coverage report from v8
 All files    |   86.95 |    72.72 |   88.88 |   86.95 |

ERROR: Coverage for branches (72.72%) does not meet global threshold (80%)`,
              hint: 'Acrescente `--coverage.thresholds.branches=80` ao comando anterior.',
            },
          ],
        },
        {
          type: 'text',
          text: 'O relatório é ótimo para achar **o que nenhum teste executa**: as linhas 14 a 19 do `cupom.ts`, por exemplo, nunca rodaram. Mas ele não diz se os testes que rodaram **conferem** alguma coisa. Uma linha pode ser executada por um teste sem nenhum `expect`.',
        },
        {
          type: 'quiz',
          question:
            'O `frete.ts` tem 100% de cobertura de linhas e de ramos. Uma pessoa da equipe diz: “então o frete não tem bug”. Ela está certa?',
          options: [
            {
              text: 'Não. Cobertura mostra que o código rodou, não que o resultado foi conferido nem que os casos certos foram testados',
              correct: true,
              feedback:
                'Isso. Um teste com `frete(150)` e `frete(50)` passa por todas as linhas da regra “a partir de R$ 100”, mas nunca testa o valor `100`, exatamente onde o erro de `>` no lugar de `>=` mora.',
            },
            {
              text: 'Sim. Se todas as linhas e ramos rodaram, todo comportamento foi testado',
              feedback:
                'Rodar não é conferir. E o mesmo ramo pode dar certo para `150` e errado para `100`: cobertura não enxerga valores de fronteira nem requisitos que ninguém implementou.',
            },
            {
              text: 'Sim, desde que a cobertura de ramos também seja 100%',
              feedback:
                'Ramos são mais rigorosos que linhas, mas o problema continua: um teste pode seguir os dois caminhos do `if` sem conferir o resultado certo, ou sem testar a fronteira.',
            },
            {
              text: 'Não, porque cobertura só vale para testes de ponta a ponta',
              feedback:
                'É o contrário: cobertura é mais usada com testes de unidade e integração. O limite dela vale para qualquer tipo de teste.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Uma forma de medir se os testes realmente conferem algo é o **teste de mutação**: uma ferramenta cria cópias do código com pequenos defeitos (os **mutantes**), como trocar `>=` por `>`, e roda os testes em cada uma. Mutante que sobrevive mostra uma conferência que está faltando.',
        },
        {
          type: 'python',
          title: 'Cobertura de 100% e mutantes que escapam',
          task: 'Os dois testes em `testar` já executam todas as linhas de `frete`: cobertura de 100%. Mesmo assim, dois mutantes escapam. Acrescente `assert` nos valores de fronteira até todos os mutantes serem pegos e a regra correta continuar passando.',
          code: `# Regra da loja: a partir de R$ 100, frete grátis; abaixo disso, R$ 12
def frete(total):
    if total >= 100:
        return 0
    return 12

# Mutantes: cópias com um pequeno defeito, como os que escapam numa revisão apressada
def mutante_maior(total):
    if total > 100:
        return 0
    return 12

def mutante_99(total):
    if total >= 99:
        return 0
    return 12

def mutante_valor(total):
    if total >= 100:
        return 0
    return 15

# Seus testes: recebem uma função de frete e conferem com assert
def testar(f):
    assert f(150) == 0
    assert f(50) == 12
    # Acrescente aqui casos na fronteira da regra

# Placar (não precisa mexer)
def pega(f):
    try:
        testar(f)
    except Exception:
        return True
    return False

print('Regra correta passa:', not pega(frete))
for m in [mutante_maior, mutante_99, mutante_valor]:
    print(m.__name__, '->', 'pegou' if pega(m) else 'escapou')`,
          solution: `def frete(total):
    if total >= 100:
        return 0
    return 12

def mutante_maior(total):
    if total > 100:
        return 0
    return 12

def mutante_99(total):
    if total >= 99:
        return 0
    return 12

def mutante_valor(total):
    if total >= 100:
        return 0
    return 15

def testar(f):
    assert f(150) == 0
    assert f(50) == 12
    assert f(100) == 0
    assert f(99.99) == 12

def pega(f):
    try:
        testar(f)
    except Exception:
        return True
    return False

print('Regra correta passa:', not pega(frete))
for m in [mutante_maior, mutante_99, mutante_valor]:
    print(m.__name__, '->', 'pegou' if pega(m) else 'escapou')`,
          checks: [
            { label: 'Seus testes passam com a regra correta', test: 'not pega(frete)' },
            { label: 'Pega o mutante que trocou `>=` por `>`', test: 'pega(mutante_maior)' },
            {
              label: 'Pega o mutante que começa o frete grátis em R$ 99',
              test: 'pega(mutante_99)',
            },
            { label: 'Pega o mutante que cobra R$ 15', test: 'pega(mutante_valor)' },
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Erros comuns com cobertura',
          text: 'Tratar a porcentagem como objetivo: quando vira meta de desempenho, aparecem testes sem `expect` só para subir o número. Exigir 100% em tudo, gastando esforço em código sem risco. E ignorar o relatório, que é bom justamente para achar partes importantes que nenhum teste executa.',
        },
      ],
    },
    {
      id: 'suite-na-ci',
      title: 'A suíte rodando na CI',
      blocks: [
        {
          type: 'text',
          text: 'Na aula de CI e publicação você montou um workflow que roda lint, testes e build a cada push. Para uma suíte de testes de verdade, entram três peças novas: separar os testes em **jobs** (blocos de trabalho que podem rodar ao mesmo tempo), guardar **artefatos** (arquivos produzidos pela execução, como relatórios e traces) e dividir os testes lentos entre máquinas.',
        },
        {
          type: 'anatomy',
          caption:
            'Um workflow do GitHub Actions com testes de unidade e de ponta a ponta. Explore as partes.',
          language: 'yaml',
          parts: [
            { text: 'name: Testes\non: [push, pull_request]\n\njobs:\n  ' },
            {
              text: 'unidade:',
              label: 'Job rápido',
              note: 'Os testes de unidade e integração rodam primeiro, num job próprio. Em poucos minutos a pessoa já sabe se quebrou alguma regra.',
            },
            {
              text: '\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: 22, cache: npm }\n      - run: npm ci\n      ',
            },
            {
              text: '- run: npx vitest run --coverage',
              label: 'Cobertura como sinal',
              note: 'O relatório de cobertura sai junto. Uma meta mínima pode quebrar o job, mas use como alarme para partes importantes sem teste, não como nota.',
            },
            { text: '\n\n  e2e:\n    ' },
            {
              text: 'needs: unidade',
              label: 'Dependência entre jobs',
              note: 'O job de ponta a ponta só começa se o de unidade passou. Não faz sentido gastar 10 minutos de navegador com uma regra básica quebrada.',
            },
            { text: '\n    runs-on: ubuntu-latest\n    ' },
            {
              text: 'strategy:\n      fail-fast: false\n      matrix:\n        shard: [1/3, 2/3, 3/3]',
              label: 'Shards',
              note: 'A **matriz** cria três cópias do job, uma por fatia (**shard**) da suíte, rodando em máquinas diferentes ao mesmo tempo. `fail-fast: false` deixa as outras fatias terminarem mesmo se uma falhar, para você ver todas as falhas.',
            },
            {
              text: '\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: 22, cache: npm }\n      - run: npm ci\n      - run: npx playwright install --with-deps chromium\n      ',
            },
            {
              text: '- run: npx playwright test --shard=${{ matrix.shard }}',
              label: 'Rodar uma fatia',
              note: 'Cada cópia do job roda só a sua parte: `1/3`, `2/3` ou `3/3`. Uma suíte de 15 minutos passa a levar perto de 5.',
            },
            { text: '\n      - uses: actions/upload-artifact@v4\n        ' },
            {
              text: 'if: ${{ !cancelled() }}',
              label: 'Guardar mesmo se falhar',
              note: 'Sem essa linha, o passo seria pulado justamente quando os testes falham, que é quando você mais precisa do relatório.',
            },
            {
              text: '\n        with:\n          name: relatorio-${{ strategy.job-index }}\n          ',
            },
            {
              text: 'path: playwright-report/\n          retention-days: 14',
              label: 'Artefato',
              note: 'A pasta do relatório HTML, com traces e capturas de tela, fica disponível para download na página da execução por 14 dias.',
            },
          ],
        },
        {
          type: 'text',
          text: 'Paralelizar só funciona com testes isolados. Dentro de uma máquina, o Playwright já usa vários **workers**; os shards dividem a suíte entre máquinas. Se um teste depende do que outro deixou no banco, ele vai falhar assim que os dois caírem em fatias ou workers diferentes.',
        },
        {
          type: 'fill',
          prompt:
            'Complete os passos finais do job de ponta a ponta para guardar o relatório mesmo quando um teste falha.',
          language: 'yaml',
          template: `      - run: npx playwright test --shard=\${{ matrix.shard }}
      - uses: actions/[[upload-artifact]]@v4
        if: \${{ [[!cancelled()|always()]] }}
        with:
          name: relatorio-\${{ strategy.job-index }}
          [[path]]: playwright-report/`,
          explanation:
            '`actions/upload-artifact` guarda arquivos da execução. A condição `!cancelled()` (ou `always()`) faz o passo rodar mesmo depois de uma falha. `path` diz qual pasta guardar.',
        },
      ],
    },
    {
      id: 'instaveis-e-quarentena',
      title: 'Testes instáveis e quarentena',
      blocks: [
        {
          type: 'analogy',
          title: 'O alarme do carro que dispara com o vento',
          text: 'Na rua, ninguém mais olha quando aquele alarme dispara: ele toca toda hora sem motivo. No dia em que alguém mexer no carro de verdade, o alarme toca e todo mundo ignora. Um teste instável faz o mesmo com a CI.',
        },
        {
          type: 'text',
          text: 'O Playwright pode repetir um teste que falhou com a opção `retries`. Se ele passar na segunda tentativa, o relatório marca como **flaky** (instável), em vez de esconder. Isso deixa o pull request andar, mas é um aviso, não uma solução.',
        },
        {
          type: 'code',
          language: 'ts',
          caption: 'Trecho do `playwright.config.ts` comum em projetos que rodam na CI',
          code: `export default defineConfig({
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['html'], ['junit', { outputFile: 'resultados/junit.xml' }]],
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
});`,
        },
        {
          type: 'text',
          text: "Com `trace: 'on-first-retry'`, o Playwright grava o rastro justamente na tentativa extra, que é a evidência para investigar. O reporter `junit` gera um arquivo XML que muitas ferramentas de CI leem para mostrar quais testes falharam direto no pull request.",
        },
        {
          type: 'text',
          text: 'Quando um teste instável atrapalha a equipe e a correção vai demorar, ele vai para **quarentena**: continua rodando, mas fora do caminho que bloqueia o pull request, com uma issue aberta, uma pessoa responsável e um prazo. Quarentena sem dono vira cemitério de testes.',
        },
        {
          type: 'code',
          language: 'ts',
          caption:
            'Uma etiqueta separa o teste em quarentena; a CI roda os dois grupos em passos diferentes.',
          code: `// Issue #482: falha 3 em 20 execuções, suspeita de dados compartilhados (responsável: Bia)
test('aplica cupom de primeira compra', { tag: '@quarentena' }, async ({ page }) => {
  // ...
});

// No workflow:
//   npx playwright test --grep-invert @quarentena   -> bloqueia o pull request
//   npx playwright test --grep @quarentena          -> roda, mas não bloqueia`,
        },
        {
          type: 'order',
          prompt: 'Coloque em ordem o tratamento de um teste instável.',
          items: [
            'Confirmar a instabilidade rodando o teste várias vezes com `--repeat-each`',
            'Pôr em quarentena com uma issue, uma pessoa responsável e um prazo',
            'Investigar a causa pelo trace da tentativa que falhou',
            'Corrigir a causa: espera fixa, dados compartilhados, ordem ou data',
            'Rodar de novo várias vezes e tirar o teste da quarentena',
          ],
          explanation:
            'Confirmar evita culpar o teste por um bug real. A quarentena protege a confiança na CI enquanto a correção acontece, e o último passo garante que o teste voltou de fato a proteger o produto.',
        },
        {
          type: 'quiz',
          question:
            'Alguém propõe: “vamos colocar `retries: 5` e acabou o problema dos testes instáveis”. Qual o maior risco?',
          options: [
            {
              text: 'Bugs que aparecem só às vezes no produto, como uma condição de corrida, passam a ser escondidos pelas tentativas',
              correct: true,
              feedback:
                'Isso. Nem toda falha intermitente é culpa do teste: às vezes o produto falha de vez em quando para as pessoas também. Repetir até passar apaga essa pista. Use poucas tentativas e acompanhe os testes marcados como flaky.',
            },
            {
              text: 'Nenhum, porque se o teste passou em alguma tentativa, o código está certo',
              feedback:
                'Passar uma vez em cinco não prova que está certo. Se fosse um caixa eletrônico que funciona em uma de cada cinco tentativas, ninguém chamaria de correto.',
            },
            {
              text: 'O GitHub Actions não permite mais de duas tentativas',
              feedback:
                'Quem repete o teste é o Playwright, não o GitHub Actions, e não há esse limite. O problema é o que as tentativas escondem.',
            },
          ],
        },
      ],
    },
    {
      id: 'ler-o-vermelho',
      title: 'Bug do produto ou falha do teste?',
      blocks: [
        {
          type: 'text',
          text: 'Quando a CI fica vermelha, a primeira pergunta não é “como faço passar?”, e sim “quem errou?”. Há três suspeitos: o **produto** mudou de comportamento, o **teste** está errado ou frágil, ou o **ambiente** (rede, serviço externo, máquina da CI) falhou. O relatório e o trace são as provas.',
        },
        {
          type: 'table',
          caption: 'Pistas que ajudam a separar os três suspeitos',
          head: ['Pista', 'Aponta para'],
          rows: [
            [
              'Falha sempre, desde um commit específico, e a tela no trace mostra o erro para a pessoa',
              'Produto',
            ],
            [
              'Passa e falha sem mudança no código; o relatório marca flaky',
              'Teste (ou condição de corrida no produto)',
            ],
            [
              'O texto ou a estrutura da tela mudaram de propósito e o teste não acompanhou',
              'Teste desatualizado',
            ],
            [
              'Vários testes sem relação falham juntos com timeout de rede ou erro ao instalar',
              'Ambiente',
            ],
          ],
        },
        {
          type: 'classify',
          prompt: 'Leia cada falha da CI e decida o suspeito principal.',
          buckets: ['Bug do produto', 'Problema no teste', 'Ambiente'],
          items: [
            {
              text: 'Desde ontem, todo pedido com cupom fica com total negativo no trace',
              bucket: 0,
            },
            {
              text: 'O botão “Pagar” não aparece no celular em toda execução, desde o último merge',
              bucket: 0,
            },
            {
              text: 'O teste procura “Comprar”, mas o time renomeou o botão para “Finalizar compra” de propósito',
              bucket: 1,
            },
            {
              text: 'O teste falha só quando roda em paralelo com o de cadastro, que usa a mesma conta',
              bucket: 1,
            },
            {
              text: 'Todos os jobs falharam no passo `npm ci` com erro de rede ao baixar pacotes',
              bucket: 2,
            },
            {
              text: 'Os testes que usam a sandbox do provedor de pagamento falharam juntos por timeout, e a página de status dele mostra instabilidade',
              bucket: 2,
            },
          ],
          explanation:
            'Bug do produto se repete e aparece na tela como a pessoa veria. Problema no teste envolve texto desatualizado, localizador frágil ou dados compartilhados. Ambiente derruba muita coisa ao mesmo tempo, muitas vezes antes dos testes começarem.',
        },
        {
          type: 'reveal',
          question:
            'Na entrevista perguntam: “o que sua suíte não cobre?”. Por que responder isso com clareza conta pontos?',
          answer:
            'Porque nenhuma suíte cobre tudo, e quem sabe onde estão os buracos sabe onde está o risco. Uma boa resposta cita o que foi escolhido de propósito (por exemplo, sem testes de carga nem de outros navegadores além do Chromium) e por quê, mostrando que a estratégia foi pensada, não acumulada.',
        },
      ],
    },
  ],
  recap: [
    'Pirâmide e troféu concordam: poucos testes de ponta a ponta nas jornadas críticas e a maior parte das conferências nos níveis rápidos.',
    'Automatize primeiro o que tem risco alto e roda com frequência; deixe julgamento humano e descoberta para testes exploratórios.',
    'Cobertura mostra o que nenhum teste executa, mas 100% não significa ausência de bugs: rodar uma linha não é conferir o resultado.',
    'Na CI, separe jobs rápidos e lentos, divida a suíte em shards e guarde relatórios e traces como artefatos mesmo quando falha.',
    'Testes instáveis vão para quarentena com dono e prazo; tentativas automáticas sinalizam o problema, mas não substituem corrigir a causa.',
  ],
  cards: [
    {
      id: 'piramide-e-trofeu',
      front: 'Em que a pirâmide e o troféu de testes concordam?',
      back: 'Poucos testes de ponta a ponta, só nas jornadas críticas, e a maior parte das conferências em níveis rápidos.',
    },
    {
      id: 'o-que-automatizar',
      front: 'Quais duas perguntas ajudam a decidir o que automatizar?',
      back: 'Qual o risco se quebrar e com que frequência precisa ser conferido.',
    },
    {
      id: 'cobertura-limite',
      front: 'Por que 100% de cobertura não garante ausência de bugs?',
      back: 'Cobertura mede o que rodou, não o que foi conferido; casos de fronteira e requisitos esquecidos ficam de fora.',
    },
    {
      id: 'teste-de-mutacao',
      front: 'O que é teste de mutação?',
      back: 'Criar cópias do código com pequenos defeitos e ver se os testes pegam; mutante que sobrevive mostra conferência faltando.',
    },
    {
      id: 'artefato-ci',
      front: 'Por que o upload do relatório usa `if: ${{ !cancelled() }}`?',
      back: 'Para guardar o relatório mesmo quando os testes falham, que é quando ele mais importa.',
    },
    {
      id: 'shard',
      front: 'O que é dividir a suíte em shards?',
      back: 'Separar os testes em fatias que rodam em máquinas diferentes ao mesmo tempo, como `--shard=1/3`.',
    },
    {
      id: 'quarentena',
      front: 'O que é colocar um teste em quarentena?',
      back: 'Tirá-lo do caminho que bloqueia o pull request, sem desligá-lo, com issue, responsável e prazo para corrigir.',
    },
    {
      id: 'tres-suspeitos',
      front: 'Quais os três suspeitos quando a CI fica vermelha?',
      back: 'O produto mudou de comportamento, o teste está errado ou frágil, ou o ambiente falhou.',
    },
  ],
  mission: {
    title: 'Faça a CI produzir um relatório e explicar uma falha',
    text: 'No repositório de testes que você está montando (com testes de API e de Playwright), coloque a suíte para rodar no GitHub Actions com relatório e mostre como você separa um bug do produto de uma falha do teste.',
    steps: [
      'Escreva em poucas linhas a estratégia: o que fica em unidade, em API e em ponta a ponta, e por quê',
      'Crie um workflow com um job rápido e um job de Playwright que dependa dele',
      'Guarde o relatório HTML como artefato com `if: ${{ !cancelled() }}` e abra-o depois de uma execução',
      'Quebre o produto de propósito, deixe a CI falhar e use o trace para explicar o defeito no pull request',
      'Faça um teste ficar instável (por exemplo, com uma espera fixa curta), confirme com `--repeat-each` e registre como você o corrigiria',
    ],
  },
  sources: [
    { title: 'Playwright: integração contínua', url: 'https://playwright.dev/docs/ci-intro' },
    { title: 'Playwright: sharding', url: 'https://playwright.dev/docs/test-sharding' },
    { title: 'Vitest: cobertura', url: 'https://vitest.dev/guide/coverage' },
    {
      title: 'Martin Fowler: Test Pyramid',
      url: 'https://martinfowler.com/bliki/TestPyramid.html',
    },
  ],
};
