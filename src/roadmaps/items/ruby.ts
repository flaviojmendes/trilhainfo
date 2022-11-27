import {
    LinkContentType,
    LinkType,
    RoadmapItem,
  } from "../../entity/RoadmapItem";

  export const ruby: RoadmapItem = {
    label: "Ruby",
    links: [
      {
        label: "Ruby Puro - One Bit Code",
        url: "https://onebitcode.com/course/ruby-puro/",
        contentType: LinkContentType.WATCH,
      },
      {
        label: "Ruby Course - The Odin Project",
        url: "https://www.theodinproject.com/",
        contentType: LinkContentType.WATCH,
      },
      {
        label: "Ruby on Rails para iniciantes - Jackson Pires",
        url: "https://www.youtube.com/watch?v=ZHPondVB9RQ&list=PLe3LRfCs4go-mkvHRMSXEOG-HDbzesyaP",
        contentType: LinkContentType.WATCH,
      },

    ],
  };
