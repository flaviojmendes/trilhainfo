import {
    LinkContentType,
    RoadmapItem,
  } from "../../entity/RoadmapModel";
  
  export const http: RoadmapItem = {
    label: "HTTP",
    description:
      "HTTP é o protocolo da Web, sendo backend ou frontend você deve saber pelo menos como esse protocolo funciona",
    children: [
      {
        label: "HTTP",
        links: [
          {
            label: "Conceitos Essenciais: O Básico de HTTP - Cod3r",
            url: "https://www.youtube.com/watch?v=CXzbUwK6lc8",
            contentType: LinkContentType.WATCH,
          },
        ],
      }
    ],
  };
  