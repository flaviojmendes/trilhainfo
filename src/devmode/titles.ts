export const devTitles = {
  hero: 'Abertura da página inicial',
  'roadmap-card': 'Card de trilha',
  'guide-card': 'Card de guia',
  'open-source': 'Card de código aberto',
  'learning-group': 'Conteúdo do assunto',
  resources: 'Lista de referências',
  contribute: 'Sugestão de conteúdo',
  header: 'Cabeçalho',
  footer: 'Rodapé',
} as const;

export type DevComponentId = keyof typeof devTitles;
