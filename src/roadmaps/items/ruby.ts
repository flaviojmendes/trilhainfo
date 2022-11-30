import {
    LinkContentType,
    LinkType,
    RoadmapItem,
  } from "../../entity/RoadmapItem";

  export const ruby: RoadmapItem = {
    label: "Ruby",
    description:
      "Ruby é uma linguagem de programação interpretada de alto nível que combina Perl, Smalltalk, Eiffel, Ada e Lisp. Ruby foca na simplicidade e produtividade junto com uma sintaxe que lê e escreve naturalmente. Ruby suporta programação procedural, orientada a objetos e funcional e é tipada dinamicamente.",
    children: [
      {
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
            contentType: LinkContentType.READ,
          },
          {
            label: "Ruby on Rails para iniciantes - Jackson Pires",
            url: "https://www.youtube.com/watch?v=ZHPondVB9RQ&list=PLe3LRfCs4go-mkvHRMSXEOG-HDbzesyaP",
            contentType: LinkContentType.WATCH,
          },
          {
            label: "Minicurso de Testes para RoR com RSpec - One Bit Code",
            url: "https://onebitcode.com/course/minicurso-de-testes/",
            contentType: LinkContentType.WATCH,
          },
        ],
      },
    ],
  };
