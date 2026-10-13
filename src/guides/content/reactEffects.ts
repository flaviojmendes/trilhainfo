import { GuideContent } from '../types';

export const content: GuideContent = {
  sections: [
    {
      id: 'para-que',
      title: 'Para que serve um Effect',
      blocks: [
        {
          type: 'text',
          text: '`useEffect` serve para **sincronizar o componente com algo fora do React**: uma requisição, um timer, uma assinatura de eventos, a API do navegador. Se nada externo está envolvido, você provavelmente não precisa de um Effect.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Pergunta que resolve a maioria dos casos',
          text: 'Isso acontece **porque o componente apareceu na tela**, ou **porque alguém fez algo**? Se foi por causa de uma ação, coloque o código no tratador do evento, não em um Effect.',
        },
      ],
    },
    {
      id: 'sem-effect',
      title: 'Quando não usar',
      blocks: [
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              label: 'Evite',
              title: 'Estado derivado em Effect',
              text: 'Renderiza duas vezes e pode mostrar um valor desatualizado por um instante.',
              code: 'const [total, setTotal] = useState(0);\nuseEffect(() => {\n  setTotal(itens.reduce((s, i) => s + i.preco, 0));\n}, [itens]);',
            },
            {
              label: 'Prefira',
              title: 'Calcule durante a renderização',
              text: 'Sempre atualizado. Use `useMemo` só se o cálculo for comprovadamente caro.',
              code: 'const total = itens.reduce(\n  (s, i) => s + i.preco,\n  0,\n);',
            },
            {
              label: 'Evite',
              title: 'Reagir a uma ação no Effect',
              text: 'O envio fica longe do clique que o causou e pode disparar de novo sem querer.',
              code: 'useEffect(() => {\n  if (enviado) api.salvar(form);\n}, [enviado]);',
            },
            {
              label: 'Prefira',
              title: 'Faça no tratador do evento',
              text: 'A causa e o efeito ficam juntos, e acontece exatamente uma vez.',
              code: 'async function aoEnviar() {\n  await api.salvar(form);\n  setEnviado(true);\n}',
            },
          ],
        },
        {
          type: 'list',
          items: [
            'Para **reiniciar o estado** quando um id muda, use `key={id}` no componente em vez de um Effect que zera tudo.',
            'Para **avisar o componente pai**, chame a função recebida por props no próprio evento.',
          ],
        },
      ],
    },
    {
      id: 'com-effect',
      title: 'Quando usar, e como fazer direito',
      blocks: [
        {
          type: 'code',
          language: 'jsx',
          caption: 'Buscar dados quando o id muda, sem resposta fora de ordem',
          code: "useEffect(() => {\n  const controle = new AbortController();\n\n  fetch(`/api/cursos/${id}`, { signal: controle.signal })\n    .then((resposta) => resposta.json())\n    .then(setCurso)\n    .catch((erro) => {\n      if (erro.name !== 'AbortError') setErro(erro);\n    });\n\n  return () => controle.abort(); // limpeza\n}, [id]);",
        },
        {
          type: 'steps',
          items: [
            {
              title: 'O Effect roda depois da renderização',
              text: 'A tela já foi atualizada. Por isso não bloqueia o que a pessoa vê.',
            },
            {
              title: 'As dependências dizem quando repetir',
              text: 'Liste **tudo** que o Effect usa e pode mudar. O plugin `eslint-plugin-react-hooks` aponta o que faltou.',
            },
            {
              title: 'A limpeza roda antes da próxima vez',
              text: 'Cancele requisições, remova ouvintes de eventos e pare timers. Sem limpeza, uma resposta antiga pode sobrescrever a nova.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Por que roda duas vezes no desenvolvimento?',
          text: 'Com `<StrictMode>`, o React monta, desmonta e monta de novo para revelar Effects sem limpeza. Em produção, roda uma vez. Se rodar duas vezes quebra algo, falta a limpeza.',
        },
      ],
    },
    {
      id: 'refs',
      title: 'E o useRef?',
      blocks: [
        {
          type: 'terms',
          items: [
            {
              term: 'Elemento do DOM',
              text: '`ref={campo}` dá acesso ao elemento real para focar, medir ou rolar. Ex.: `campo.current.focus()`.',
            },
            {
              term: 'Valor que não renderiza',
              text: 'Guarda algo entre renderizações sem causar uma nova, como o id de um timer.',
            },
            {
              term: 'Não leia durante a renderização',
              text: 'Mudar `ref.current` não atualiza a tela. Se o valor aparece na interface, ele é estado.',
            },
          ],
        },
        {
          type: 'checklist',
          id: 'effects',
          items: [
            'Cada Effect sincroniza com algo externo ao React.',
            'Valores que dá para calcular a partir de props e estado não estão em `useState`.',
            'Ações do usuário estão nos tratadores de eventos.',
            'Todas as dependências estão listadas, sem desligar o lint.',
            'Requisições, ouvintes e timers têm limpeza.',
          ],
        },
      ],
    },
  ],
  sources: [
    {
      title: 'React: você talvez não precise de um Effect',
      url: 'https://react.dev/learn/you-might-not-need-an-effect',
    },
    {
      title: 'React: sincronizando com Effects',
      url: 'https://react.dev/learn/synchronizing-with-effects',
    },
    {
      title: 'React: referenciando valores com refs',
      url: 'https://react.dev/learn/referencing-values-with-refs',
    },
  ],
};
