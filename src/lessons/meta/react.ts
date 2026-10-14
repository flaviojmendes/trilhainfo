import { LessonMeta } from '../types';

const updatedAt = '2026-10-14';

export const lessons: LessonMeta[] = [
  {
    id: 'react-jsx-componentes-e-props',
    title: 'JSX, componentes e props',
    summary:
      'Escreva seus primeiros componentes React: as regras do JSX, props, children, listas com key e renderização condicional.',
    minutes: 16,
    groupIds: ['react.jsx-componentes-e-props', 'fullstack.react-e-node-js'],
    objectives: [
      'Explicar por que o React descreve a tela a partir dos dados em vez de editar o DOM',
      'Escrever JSX válido, com uma raiz, `className`, tags fechadas e expressões entre chaves',
      'Criar componentes que recebem props e children',
      'Renderizar listas com `map` e uma `key` estável',
      'Mostrar ou esconder elementos com `&&`, ternário e `if` antes do `return`',
    ],
    updatedAt,
    load: () => import('../content/reactJsxComponentesEProps'),
  },
  {
    id: 'react-estado-e-eventos',
    title: 'Estado e eventos',
    summary:
      'Faça a tela reagir a cliques e digitação com useState, atualizações imutáveis, formulários controlados e estado derivado.',
    minutes: 16,
    groupIds: ['react.estado-e-eventos', 'fullstack.react-e-node-js'],
    objectives: [
      'Criar estado com `useState` e atualizá-lo em eventos como `onClick` e `onChange`',
      'Usar a atualização funcional quando o novo valor depende do anterior',
      'Atualizar arrays e objetos no estado sem modificar o original',
      'Construir um formulário controlado que adiciona e remove itens',
      'Elevar o estado para o pai comum e calcular valores derivados em vez de duplicá-los',
    ],
    updatedAt,
    load: () => import('../content/reactEstadoEEventos'),
  },
  {
    id: 'react-effects-e-refs',
    title: 'Effects e refs',
    summary:
      'Sincronize componentes com o mundo fora do React usando useEffect com limpeza, evite efeitos desnecessários e use refs para foco e valores guardados.',
    minutes: 15,
    groupIds: ['react.effects-e-refs'],
    objectives: [
      'Explicar quando um código pertence a um efeito, a um evento ou à renderização',
      'Declarar corretamente a lista de dependências de um efeito',
      'Escrever a limpeza de timers e listeners e explicar a execução dupla do StrictMode',
      'Reconhecer laços infinitos e efeitos que só copiam dados derivados',
      'Usar `useRef` para colocar o foco num elemento e guardar valores que não renderizam',
    ],
    updatedAt,
    load: () => import('../content/reactEffectsERefs'),
  },
  {
    id: 'react-rotas-e-requisicoes',
    title: 'Rotas e requisições',
    summary:
      'Crie telas acessíveis pela URL com React Router e busque dados com carregando, erro, vazio e proteção contra respostas fora de ordem.',
    minutes: 16,
    groupIds: ['react.rotas-e-requisicoes'],
    objectives: [
      'Explicar como um roteador troca de tela numa SPA sem recarregar a página',
      'Declarar rotas com parâmetros, navegar com `Link` e ler valores com `useParams`',
      'Buscar dados num efeito tratando carregando, erro e lista vazia',
      'Evitar condições de corrida com a limpeza do efeito e `AbortController`',
      'Decidir quando adotar uma biblioteca de dados como TanStack Query',
    ],
    updatedAt,
    load: () => import('../content/reactRotasERequisicoes'),
  },
];
