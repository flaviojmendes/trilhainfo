import {
  LinkContentType,
  LinkType,
  RoadmapItem,
} from "../../entity/RoadmapModel";

export const controleDeVersao: RoadmapItem = {
  label: "Controle de Versão",
  description:
    "Os sistemas de controle de versão permitem rastrear alterações em sua base de código/arquivos ao longo do tempo. Eles permitem que você volte para alguma versão anterior da base de código sem problemas. Além disso, eles ajudam na colaboração com pessoas que trabalham no mesmo código – se você já colaborou com outras pessoas em um projeto, você já deve conhecer a frustração de copiar e mesclar as alterações de outra pessoa em sua base de código; sistemas de controle de versão permitem que você se livre desse problema.",
  children: [
    {
      label: "Conceitos de Git",
      links: [
        {
          url: "https://www.youtube.com/watch?v=IBClN6VpJDw&list=PLlAbYrWSYTiPA2iEiQ2PF_A9j__C4hi0A",
          label: "Git e Github para Iniciantes - Willian Justen",
          type: LinkType.FREE,
          votes: 0,
          contentType: LinkContentType.WATCH,
        },
        {
          url: "https://www.youtube.com/playlist?list=PLlAbYrWSYTiNqugqFFWWsgONJsmc3eMpg",
          label: "Git e Github na Vida Real - Willian Justen",
          type: LinkType.FREE,
          votes: 0,
          contentType: LinkContentType.WATCH,
        },
        {
          url: "https://www.youtube.com/watch?v=6Czd1Yetaac&t=269s",
          label: "Entendendo GIT - Fábio Akita",
          type: LinkType.FREE,
          votes: 0,
          contentType: LinkContentType.WATCH,
        },
        {
          url: "https://www.hostinger.com.br/tutoriais/comandos-basicos-de-git/#gref",
          label: "Comandos Básicos de GIT - Rafael H.",
          type: LinkType.FREE,
          votes: 0,
          contentType: LinkContentType.READ,
        },
        {
          url: "https://www.w3schools.com/git/git_exercises.asp ",
          label: "Exercícios Git",
          type: LinkType.FREE,
          votes: 0,
          contentType: LinkContentType.PRACTICE,
        },
      ],
    },
    {
      label: "Serviços de Hospedagem de Git",
      children: [
        {
          label: "Github",
          links: [
            {
              url: "https://www.youtube.com/watch?v=kB5e-gTAl_s",
              label:
                "Curso de Git e Github COMPLETO 2021 [Iniciantes] + Desafios + Muita Prática - Dev Aprender",
              type: LinkType.FREE,
              votes: 0,
              contentType: LinkContentType.WATCH,
            },
          ],
        },
        {
          label: "Gitlab",
          links: [
            {
              url: "https://blog.engdb.com.br/gitlab-ci/",
              label: "O que é e como usar o GitLab Ci?",
              type: LinkType.FREE,
              votes: 0,
              contentType: LinkContentType.READ,
            },
            {
              url: "https://medium.com/ekode/primeiros-passos-com-git-e-gitlab-criando-seu-primeiro-projeto-89f9001614b0",
              label:
                "Primeiros passos com Git e GitLab: criando seu primeiro projeto",
              type: LinkType.FREE,
              votes: 0,
              contentType: LinkContentType.READ,
            },
          ],
        },
        { label: "Bitbucket", links: [] },
      ],
    },
  ],
};
