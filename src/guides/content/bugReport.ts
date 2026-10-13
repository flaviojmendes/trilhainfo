import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'objetivo',
      title: 'Um bom relato poupa uma conversa',
      blocks: [
        {
          type: 'text',
          text: 'O objetivo de um relato é que outra pessoa **reproduza o problema na primeira tentativa**, sem precisar perguntar nada. Se ela não reproduz, o bug fica parado, e a culpa raramente é de quem desenvolve.',
        },
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              label: 'Difícil de agir',
              title: '"O checkout não funciona"',
              text: 'Qual navegador? Qual produto? O que apareceu? Funcionava antes? Tudo isso vira perguntas e espera.',
            },
            {
              label: 'Pronto para corrigir',
              title: '"Cupom com 100% de desconto deixa o total negativo"',
              text: 'O título já diz onde, o que e em qual condição. Quem lê sabe por onde começar.',
            },
          ],
        },
      ],
    },
    {
      id: 'modelo',
      title: 'Um modelo que funciona',
      blocks: [
        {
          type: 'code',
          language: 'markdown',
          caption: 'Copie para o seu rastreador de issues',
          code: '## Cupom de 100% deixa o total do pedido negativo\n\n**Ambiente:** staging · Chrome 130 · macOS 15 · build 2026.10.13-3f9a\n\n**Passos para reproduzir**\n1. Entre como cliente@teste.com\n2. Adicione "Camiseta básica" (R$ 49,90) ao carrinho\n3. Aplique o cupom TESTE100\n4. Escolha frete Expresso (R$ 15,00)\n\n**Resultado esperado:** total R$ 15,00 (só o frete)\n**Resultado obtido:** total -R$ 34,90\n\n**Frequência:** 5 de 5 tentativas\n**Evidência:** captura de tela, HAR da requisição POST /carrinho/cupom\n**Impacto:** pedido é criado com valor negativo; afeta qualquer cupom de 100%',
        },
        {
          type: 'terms',
          items: [
            {
              term: 'Passos mínimos',
              text: 'Corte tudo que não muda o resultado. Cinco passos certeiros valem mais que vinte.',
            },
            {
              term: 'Esperado e obtido',
              text: 'Sempre os dois. "Está errado" não diz qual seria o certo.',
            },
            {
              term: 'Evidência',
              text: 'Captura ou vídeo curto, mensagem do console, requisição da aba Network, id de log ou de pedido.',
            },
            {
              term: 'Frequência',
              text: '"Sempre" e "1 em 10" levam a investigações bem diferentes.',
            },
          ],
        },
      ],
    },
    {
      id: 'severidade',
      title: 'Severidade e prioridade',
      blocks: [
        {
          type: 'text',
          text: '**Severidade** é o tamanho do estrago. **Prioridade** é a urgência de corrigir, que também depende do negócio. Um erro de digitação no logo é pouco severo e pode ser prioridade alta na véspera do lançamento.',
        },
        {
          type: 'table',
          caption: 'Uma escala comum de severidade',
          head: ['Nível', 'Quando usar', 'Exemplo'],
          rows: [
            [
              'Crítica',
              'Perda de dados, falha de segurança ou sistema fora do ar',
              'Pagamento cobrado duas vezes',
            ],
            [
              'Alta',
              'Uma função principal não funciona e não há alternativa',
              'Não dá para finalizar a compra no Safari',
            ],
            ['Média', 'Funciona com dificuldade ou há alternativa', 'Filtro ignora a ordenação'],
            ['Baixa', 'Visual ou texto, sem impedir o uso', 'Botão desalinhado em 320 px'],
          ],
        },
      ],
    },
    {
      id: 'checklist',
      title: 'Antes de enviar',
      blocks: [
        {
          type: 'checklist',
          id: 'bug',
          items: [
            'Procurei se já existe um relato do mesmo problema.',
            'Reproduzi de novo seguindo só os passos que escrevi.',
            'O título descreve o problema e a condição, não só a tela.',
            'Informei ambiente, versão e dados usados.',
            'Escrevi o resultado esperado e o obtido.',
            'Anexei evidência e removi dados pessoais e senhas dela.',
            'Um relato descreve um problema só.',
          ],
        },
      ],
    },
  ],
  sources: [
    {
      title: 'Mozilla: diretrizes para relatar bugs',
      url: 'https://bugzilla.mozilla.org/page.cgi?id=bug-writing.html',
    },
    {
      title: 'Chrome DevTools: exportar requisições em HAR',
      url: 'https://developer.chrome.com/docs/devtools/network/reference#save-as-har',
    },
    { title: 'Ministry of Testing', url: 'https://www.ministryoftesting.com/' },
  ],
};
