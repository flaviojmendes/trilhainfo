import { LinkContentType, RoadmapItem } from "../../entity/RoadmapItem";

export const containers: RoadmapItem = {
  label: "Containers vs Virtualização",
  description:
    "Contêineres e máquinas virtuais são as duas abordagens mais populares para configurar uma infraestrutura de software para sua organização.",
  children: [
    {
      label: "Docker",
      links: [
        {
          label: "Descomplicando o Docker - Linux Tips",
          url: "https://www.youtube.com/watch?v=Wm99C_f7Kxw&list=PLf-O3X2-mxDn1VpyU2q3fuI6YYeIWp5rR",
          contentType: LinkContentType.WATCH,
        },
      ],
    },
    { label: "rkt", links: [] },
    { label: "LXC", links: [] },
  ],
};
