import {
  LinkContentType,
  LinkType,
  RoadmapItem,
} from "../../entity/RoadmapItem";

export const go: RoadmapItem = {
  label: "Go",
  links: [
    {
      label: "Aprenda Go",
      url: "https://www.youtube.com/watch?v=WiGU_ZB-u0w&list=PLCKpcjBB_VlBsxJ9IseNxFllf-UFEXOdg",
      contentType: LinkContentType.WATCH,
    },
    {
      label: "Go 101 - Tiago Temporin",
      url: "https://tiago-temporin.notion.site/Go-101-1fe9cef0ccc94ed3bed7f38e7dd5815d",
      contentType: LinkContentType.VISIT,
    },
    {
      label: "Aprenda Go - Ellen Korbes",
      url: "https://www.youtube.com/c/AprendaGo/about",
      contentType: LinkContentType.VISIT,
    },
    {
      label: "Aprenda Go com Testes - Lauren Ferreira ",
      url: "https://larien.gitbook.io/aprenda-go-com-testes/",
      contentType: LinkContentType.VISIT,
    },
  ],
};
