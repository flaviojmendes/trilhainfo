import { Level, LinkType, RoadmapItem } from "../entity/RoadmapItem";

export const data: Level[] = [
  { items: [{ label: "Ande o Roadmap de Frontend até React em Frameworks" }] },
  {
    label: "Fundamentos",
    description:
      "Tenha em mente aprender esses fundamentos essenciais para escrever uma aplicação em React",
    items: [
      { label: "Create React App" },
      { label: "JSX/TSX" },
      { label: "Components" },
      { label: "Props x Stats" },
      { label: "Conditional Rendering" },
      { label: "Ciclo de Vida de Components" },
      { label: "Lists e Keys" },
      { label: "Composition vs Herança" },
      {
        label: "Hooks Básicos",
        children: [
          { label: "useState", links: [] },
          { label: "useEffect", links: [] },
        ],
      },
    ],
  },
  {
    label: "Conceitos mais Avançados",
    description: "Componentes em React",
    items: [
      { label: "Hooks", children: [] },
      { label: "Context", children: [] },
      { label: "Refs", children: [] },
      { label: "Render Props", children: [] },
      { label: "High Order Components", children: [] },
      { label: "Portals", children: [] },
      { label: "Error Boundaries", children: [] },
      { label: "Fiber Architecture", children: [] },
    ],
  },
  {
    label: "Ecossistema",
    items: [
      {
        label: "Routers",
        children: [
          { label: "React Router", links: [] },
          { label: "Reach Router", links: [] },
        ],
      },
      { label: "SSR", children: [{ label: "Next.js", links: [] }] },
      {
        label: "SSG",
        children: [
          { label: "Next.js", links: [] },
          { label: "Gatsby", links: [] },
        ],
      },
      {
        label: "API Calls",
        children: [
          { label: "react-query", links: [] },
          { label: "Apollo", links: [] },
          { label: "Relay Modern", links: [] },
          { label: "Axios", links: [] },
          { label: "Unfetch", links: [] },
          { label: "superagent", links: [] },
          { label: "use-http", links: [] },
        ],
      },
      { label: "Mobile", children: [{ label: "React Native", links: [] }] },
      {
        label: "Forms",
        children: [
          { label: "React Hook Form", links: [] },
          { label: "Formik", links: [] },
          { label: "Final Form", links: [] },
        ],
      },
      {
        label: "Testes",
        children: [
          { label: "Jest", links: [] },
          { label: "React Testing Library", links: [] },
          { label: "Cypress", links: [] },
        ],
      },
      {
        label: "Gerenciamento de Estado",
        children: [
          { label: "Context/State", links: [] },
          { label: "Redux", links: [] },
          { label: "MobX", links: [] },
        ],
      },
      {
        label: "Styling",
        children: [
          { label: "Chakra UI", links: [] },
          { label: "Material UI", links: [] },
          { label: "Ant Design", links: [] },
          { label: "Styled Components", links: [] },
          { label: "Emotion", links: [] },
        ],
      },
    ],
  },
  {
    items: [
      { label: "Continue o Roadmap de Frontend após a caixa de Frameworks" },
    ],
  },
];
