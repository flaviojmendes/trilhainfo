import { LinkContentType } from '../../entity/RoadmapModel';

export const cicd = {
  label: 'Escolha alguma ferramenta de CI/CD',
  items: [
    {
      label: 'ArgoCD',
      children: [
        {
          label: 'O básico',
          links: [
            {
              label: 'Deploy Contínuo com GitOps e ArgoCD',
              url: 'https://www.youtube.com/watch?v=63HGUgQXD1w',
              contentType: LinkContentType.WATCH,
            },
          ],
        },
      ],
    },
    { label: 'Azure DevOps', children: [{ label: 'O básico', links: [] }] },
    { label: 'Bamboo', children: [{ label: 'O básico', links: [] }] },
    { label: 'Circle CI', children: [{ label: 'O básico', links: [] }] },

    {
      label: 'Github Actions',
      children: [
        {
          label: 'O básico',
          description:
            'GitHub Actions é uma plataforma de integração contínua e entrega contínua (CI/CD) que permite automatizar o processo de build de sua aplicação diretamente do GitHub.',
          links: [
            {
              label: 'GitHub Actions: Integração contínua direto no GitHub | Dias de Dev',
              url: 'https://youtu.be/ugrB9hNT9qw',
              contentType: LinkContentType.WATCH,
            },
            {
              label: 'Como usar GitHub Actions? | Dev Soutinho',
              url: 'https://www.youtube.com/watch?v=IKjcdYQvcDo',
              contentType: LinkContentType.WATCH,
            },
          ],
        },
      ],
    },
    {
      label: 'Gitlab CI',
      children: [
        {
          label: 'O básico',
          links: [
            {
              label:
                'Do zero ao deploy #1 - Configurando o Gitlab-CI/Gitlab Pages | Eduardo Mendes',
              url: 'https://www.youtube.com/watch?v=wDjZGkfphbk',
              contentType: LinkContentType.WATCH,
            },
          ],
        },
      ],
    },
    {
      label: 'Jenkins',
      children: [
        {
          label: 'O básico',
          links: [
            {
              label: 'O básico de Pipelines CI/CD com Jenkins | Fabrício Veronez',
              url: 'https://www.youtube.com/watch?v=O6y27_Ol25g',
              contentType: LinkContentType.WATCH,
            },
            {
              label: 'Jenkins instalação e configuração Pipeline Java e Docker | Feltex',
              url: 'https://www.youtube.com/watch?v=ejHAKSdAlKs',
              contentType: LinkContentType.WATCH,
            },
          ],
        },
      ],
    },
    { label: 'TeamCity', children: [{ label: 'O básico', links: [] }] },
  ],
};
