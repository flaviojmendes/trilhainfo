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
    items: [{ label: "Hooks", children: [] },
    { label: "Context", children: [] },
    { label: "Refs", children: [] },
    { label: "Render Props", children: [] },
    { label: "High Order Components", children: [] },
    { label: "Portals", children: [] },
    { label: "Error Boundaries", children: [] },
    { label: "Fiber Architecture", children: [] }],
  },
];
