import {
  LinkContentType,
  LinkType,
  RoadmapItem,
} from "../../entity/RoadmapItem";

export const javascript: RoadmapItem = {
  label: "JavaScript",
  description:
    "JavaScript permite adicionar interatividade às suas páginas. Exemplos comuns que você pode ter visto nos sites são controles deslizantes, interações de clique, pop-ups e assim por diante.",
  children: [
    {
      label: "Sintaxe e o Básico",
      links: [
        {
          url: "https://www.youtube.com/watch?v=bXim6-jCflk&list=PLz_pSrQW_5xJexe74z50HXLCkYDKfks8S",
          label: "Desafios Javascript - Fabio Bergmann",
          votes: 0,
          type: LinkType.FREE,
          contentType: LinkContentType.WATCH,
        },
        {
          url: "https://www.youtube.com/watch?v=BXqUH86F-kA&list=PLntvgXM11X6pi7mW0O4ZmfUI1xDSIbmTm",
          label: "Curso Grátis de JavaScript Moderno - Gustavo Guanabara",
          votes: 0,
          type: LinkType.FREE,
          contentType: LinkContentType.WATCH,
        },
        {
          url: "https://gustavoguanabara.github.io/javascript/exercicios/",
          label: "Exercícios de JavaScript- Gustavo Guanabara",
          votes: 0,
          type: LinkType.FREE,
          contentType: LinkContentType.PRACTICE,
        },
      ],
    },
    {
      label: "Manipulação de DOM",
      links: [
        {
          url: "https://www.youtube.com/watch?v=xoYFoBtev8A",
          label: "Manipulando o DOM na prática - Dogcode",
          contentType: LinkContentType.WATCH,
        },
        {
          url: "https://www.youtube.com/watch?v=aVB67Y31E4A",
          label: "Manipulando a DOM com Vanilla JS - CodarMe",
          contentType: LinkContentType.WATCH,
        },
        {
          url: "https://www.youtube.com/watch?v=UftSB4DaRU4",
          label:
            "Manipulação de DOM com JavaScript, do zero, na prática - Mayk Brito",
          contentType: LinkContentType.WATCH,
        },
        {
          url: "https://www.computersciencemaster.com.br/exercicio-manipulacao-dom-javascript/",
          label:
            "Exercícios de manipulação do DOM usando Javascript - Vinicius dos Santos",
          contentType: LinkContentType.PRACTICE,
        },
        {
          url: "https://www.w3schools.com/js/js_exercises.asp",
          label: "Exercícios de JavaScript (em inglês)",
          contentType: LinkContentType.PRACTICE,
        },
      ],
    },
    {
      label: "Fetch API / Ajax (XHR)",
      links: [
        {
          url: "https://www.youtube.com/watch?v=mmCuNbChZ9I",
          label: "Como consumir de uma API usando a Fetch API - Huriel",
          contentType: LinkContentType.WATCH,
        },
        {
          url: "https://www.youtube.com/watch?v=qIGYM4S8x50",
          label:
            "Aprenda Fetch Api de Javascript - Matheus Battisti (Hora de Codar)",
          contentType: LinkContentType.WATCH,
        },
        {
          url: "https://www.devmedia.com.br/javascript-fetch/41206#2",
          label: "JavaScript: Fetch (com exemplos)",
          contentType: LinkContentType.READ,
        },
      ],
    },
    {
      label: "ES6+ e JS Modular",
      links: [
        {
          url: "https://www.youtube.com/watch?v=-Hc7V1R5bt0",
          label:
            "Um guia para MÓDULOS JavaScript (ES6 Modules) - Flávio Coutinho",
          contentType: LinkContentType.WATCH,
        },
        {
          url: "https://www.youtube.com/watch?v=ihWA4tri1Fc&list=PLDqnSpzNKDvnU__J6Seq2iAhCaRr7nhMP",
          label: "Javascript ES6+ (playlist) - Angelo Luz",
          contentType: LinkContentType.WATCH,
        },
        {
          url: "https://medium.com/trainingcenter/entendendo-m%C3%B3dulos-no-javascript-73bce1d64dbf",
          label: "Entendendo módulos ES6 - Lucas Santos",
          contentType: LinkContentType.READ,
        },
      ],
    },
    {
      label:
        "Conceitos de Hoisting, Event Bubbling, Escopo, Prototype, Shadow DOM, strict",
      links: [
        {
          url: "https://www.youtube.com/watch?v=RtfBx90R070&list=PLlAbYrWSYTiPQ1BE8klOtheBC0mtL3hEi",
          label: "Mini-curso JS Moderno (ES6) - Willian Justen",
          contentType: LinkContentType.WATCH,
        },
        {
          url: "https://www.questoesestrategicas.com.br/questoes/busca/assunto/javascript",
          label: "Questões de JavaScript",
          contentType: LinkContentType.PRACTICE,
        },
      ],
    },
  ],
};
