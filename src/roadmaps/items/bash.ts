import {
  LinkContentType,
  LinkType,
  RoadmapItem,
} from "../../entity/RoadmapItem";

export const bash: RoadmapItem = {
  label: "Bash",
  description:
    "Bash é a linguagem de programação do terminal Linux também conhecida como Shell Script, Bash é a evolução do shell sh original do Linux e é uma linguagem essencial para trabalhar com automação de processos em ambientes Linux.",
  children: [
    {
      label: "Bash",
      links: [
        {
          label: "Curso Básico de Bash - Blau Araujo no canal debxp ",
          url: "https://www.youtube.com/playlist?list=PLXoSGejyuQGpf4X-NdGjvSlEFZhn2f2H7",
          contentType: LinkContentType.WATCH,
        }
      ],
    },
  ],
};
