import { Level, LinkContentType, LinkType, RoadmapItem } from "../../entity/RoadmapItem";

export const SO: RoadmapItem = {
  label: "SO e Conhecimentos Gerais",
  description:
    "Sistema Operacional é um programa que gerencia os recursos de um computador, principalmente a alocação desses recursos entre outros programas. Os recursos típicos incluem a unidade central de processamento (CPU), memória do computador, armazenamento de arquivos, dispositivos de entrada/saída (E/S) e conexões de rede.",
  children: [
    {
      label: "Uso do Terminal",
      links: [
        {
          label: "Aprenda os comandos básicos do Linux - Diolinux",
          url: "https://www.youtube.com/watch?v=JEhVB4VHsTI",
          contentType: LinkContentType.WATCH,
        },
        {
          label: "Linux Week - Linux Tips",
          url: "https://www.youtube.com/watch?v=zGE4UxYndrk&list=PLf-O3X2-mxDnl7LhhjhEgbo2etWKkJ0GV",
          contentType: LinkContentType.WATCH,
        },
      ],
    },
    {
      label: "Como funcionam SO's",
      links: [
        {
          url: "https://www.youtube.com/watch?v=Rl6HhDvW984&list=PLxI8Can9yAHeK7GUEGxMsqoPRmJKwI9Jw",
          label: "Sistemas Operacionais - UNIVESP",
          votes: 0,
          type: LinkType.FREE,
          contentType: LinkContentType.WATCH,
        },
      ],
    },
    { label: "Gerenciamento de Processos", links: [] },
    {
      label: "Threads e Concorrência",
      links: [
        {
          label: "Concorrência e Paralelismo - Fabio Akita",
          url: "https://www.youtube.com/watch?v=cx1ULv4wYxM",
          contentType: LinkContentType.WATCH,
        },
      ],
    },
    {
      label: "Armazenamento",
      links: [
        {
          label: "Entendendo Armazenamento - Fabio Akita",
          url: "https://www.youtube.com/playlist?list=PLdsnXVqbHDUcM0LTAxqrVrTy6Q7jQprjt",
          contentType: LinkContentType.WATCH,
        },
      ],
    },
    {
      label: "Gerenciamento de Memória",
      links: [
        {
          label: "Gerenciamento de Memória - Fabio Akita",
          url: "https://www.youtube.com/watch?v=9AK_1gqEfkQ",
          contentType: LinkContentType.WATCH,
        },
      ],
    },
    { label: "Básicos POSIX", links: [] },
    {
      label: "Conceitos Básicos de Rede",
      links: [
        {
          label: "Redes de Computadores - Curso em Video",
          url: "https://www.cursoemvideo.com/curso/redes-de-computadores/",
          contentType: LinkContentType.VISIT,
        },
        {
          label: "Introdução a Redes - Fabio Akita",
          url: "https://www.youtube.com/playlist?list=PLdsnXVqbHDUcTGjNZuRYCVj3AZtdt6oG7",
          contentType: LinkContentType.WATCH,
        },
      ],
    },
  ],
};
