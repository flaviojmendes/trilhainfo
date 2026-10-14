import { LessonMeta } from '../types';

const updatedAt = '2026-10-14';

export const lessons: LessonMeta[] = [
  {
    id: 'react-reducer-e-context',
    title: 'Reducer e Context',
    summary:
      'Organize estados que mudam juntos com useReducer e compartilhe valores distantes com Context, sem exagerar.',
    minutes: 16,
    groupIds: ['react.reducer-e-context'],
    objectives: [
      'Reconhecer quando vários useState devem virar um useReducer',
      'Escrever um reducer puro que trata ações e testá-lo sem renderizar',
      'Compartilhar um valor com createContext, Provider e useContext para evitar prop drilling',
      'Decidir se um estado deve ser local, compartilhado por Context ou tratado como dado do servidor',
      'Combinar reducer e Context para montar um carrinho de compras',
    ],
    updatedAt,
    load: () => import('../content/reactReducerEContext'),
  },
  {
    id: 'react-build-e-desempenho',
    title: 'Build e desempenho no React',
    summary:
      'Entenda o que o build de produção faz, divida o código com lazy e Suspense e otimize só o que a medição apontar.',
    minutes: 16,
    groupIds: ['react.build-e-desempenho'],
    objectives: [
      'Explicar bundling, minificação, tree-shaking e code splitting lendo o relatório do vite build',
      'Carregar uma rota sob demanda com lazy e Suspense',
      'Usar variáveis VITE_ por ambiente sem expor segredos',
      'Medir com o React DevTools Profiler e o Lighthouse antes e depois de otimizar',
      'Aplicar memo, useMemo, useCallback e virtualização apenas quando resolvem um gargalo medido',
    ],
    updatedAt,
    load: () => import('../content/reactBuildEDesempenho'),
  },
];
