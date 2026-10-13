import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'problema',
      title: 'O pipeline vai falhar. E depois?',
      blocks: [
        {
          type: 'text',
          text: 'A API de origem cai, o disco enche, alguém corrige um bug e precisa reprocessar o mês passado. Um pipeline **idempotente** pode rodar de novo, quantas vezes for, e o resultado é o mesmo de rodar uma vez. Sem isso, cada nova execução duplica ou perde dados.',
        },
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              label: 'Não idempotente',
              title: 'Acrescentar sempre',
              text: 'Rodou duas vezes para o dia 12, as vendas do dia 12 aparecem em dobro.',
              code: "INSERT INTO vendas_diarias\nSELECT * FROM staging_vendas\nWHERE dia = '2026-10-12';",
            },
            {
              label: 'Idempotente',
              title: 'Substituir a partição',
              text: 'Apaga o dia e grava de novo, na mesma transação. Rodar de novo dá o mesmo resultado.',
              code: "BEGIN;\nDELETE FROM vendas_diarias\nWHERE dia = '2026-10-12';\nINSERT INTO vendas_diarias\nSELECT * FROM staging_vendas\nWHERE dia = '2026-10-12';\nCOMMIT;",
            },
          ],
        },
      ],
    },
    {
      id: 'tecnicas',
      title: 'Técnicas que garantem idempotência',
      blocks: [
        {
          type: 'terms',
          items: [
            {
              term: 'Processar por intervalo',
              text: 'Cada execução cuida de um intervalo fixo, como "o dia 12", recebido como parâmetro. Nunca "desde a última vez" nem "agora".',
            },
            {
              term: 'Sobrescrever a partição',
              text: 'Grave o resultado substituindo a partição inteira do intervalo, como no exemplo acima.',
            },
            {
              term: 'MERGE ou upsert por chave',
              text: 'Quando não há partição, atualize se a chave existe e insira se não existe.',
            },
            {
              term: 'Escrever e depois trocar',
              text: 'Grave num local temporário e só no final mova para o destino. Uma falha no meio não deixa arquivo pela metade.',
            },
          ],
        },
        {
          type: 'code',
          language: 'sql',
          caption: 'Upsert por chave no PostgreSQL',
          code: 'INSERT INTO clientes (id, nome, atualizado_em)\nSELECT id, nome, atualizado_em FROM staging_clientes\nON CONFLICT (id) DO UPDATE\nSET nome = EXCLUDED.nome,\n    atualizado_em = EXCLUDED.atualizado_em;',
        },
      ],
    },
    {
      id: 'reprocessar',
      title: 'Reprocessar o passado (backfill)',
      blocks: [
        {
          type: 'code',
          language: 'python',
          caption: 'No Airflow, a data lógica da execução define o intervalo',
          code: "@task\ndef carregar_vendas(ds=None):\n    # ds = '2026-10-12', a data lógica, não a data de hoje\n    dados = extrair_vendas(dia=ds)\n    substituir_particao('vendas_diarias', dia=ds, dados=dados)",
        },
        {
          type: 'code',
          language: 'bash',
          caption: 'Reprocessar setembro inteiro, um dia por execução',
          code: 'airflow dags backfill vendas \\\n  --start-date 2026-09-01 \\\n  --end-date 2026-09-30',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Cuidado com o relógio',
          text: 'Usar `datetime.now()` dentro da tarefa quebra o backfill: reprocessar o dia 12 hoje traria os dados de hoje. Use sempre a data recebida como parâmetro.',
        },
      ],
    },
    {
      id: 'checklist',
      title: 'Pipeline pronto para falhar',
      blocks: [
        {
          type: 'checklist',
          id: 'pipeline',
          items: [
            'Cada execução recebe o intervalo que vai processar.',
            'Rodar a mesma execução duas vezes não muda o resultado.',
            'Escritas substituem a partição ou fazem upsert por chave.',
            'Nenhuma tarefa depende de `now()` ou do horário em que roda.',
            'Falhas têm novas tentativas automáticas, com intervalo entre elas.',
            'Existe uma verificação de contagem ou soma depois da carga.',
          ],
        },
      ],
    },
  ],
  sources: [
    {
      title: 'Maxime Beauchemin: engenharia de dados funcional',
      url: 'https://maximebeauchemin.medium.com/functional-data-engineering-a-modern-paradigm-for-batch-data-processing-2327ec32c42a',
    },
    {
      title: 'Airflow: boas práticas',
      url: 'https://airflow.apache.org/docs/apache-airflow/stable/best-practices.html',
    },
    {
      title: 'PostgreSQL: INSERT ON CONFLICT',
      url: 'https://www.postgresql.org/docs/current/sql-insert.html#SQL-ON-CONFLICT',
    },
  ],
};
