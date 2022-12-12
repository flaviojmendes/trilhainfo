import {
  LinkContentType,
  LinkType,
  RoadmapItem,
} from "../../entity/RoadmapItem";

export const rust: RoadmapItem = {
  label: "Rust",
  description:
    "Rust é uma linguagem de programação de sistemas moderna com foco em segurança, velocidade e simultaneidade. Ele atinge esses objetivos sendo seguro para a memória sem usar o garbage collector.",
  children: [
    {
      label: "Rust",
      links: [
        {
          label: "Aprenda com quem não sabe - Fernando Daciuk",
          url: "https://www.youtube.com/watch?v=mWh49ZpmQwk&list=PLr4c053wuXU-igL9KSptwKK5XdyGX13FB",
          contentType: LinkContentType.WATCH,
        },
        {
          label: "Série Aprenda Rust - Bruno Rocha no canal CodeShow",
          url: "https://bit.ly/aprendarust",
          contentType: LinkContentType.WATCH,
        },
        {
          label: "A Linguagem de Programação Rust - Bruno Rocha",
          url: "https://www.youtube.com/watch?v=K5Zt804f9tg&list=PLjSf4DcGBdiHC1rf9rXR9orU3wvGjgtpm",
          contentType: LinkContentType.WATCH,
        },
      ],
    },
  ],
};
