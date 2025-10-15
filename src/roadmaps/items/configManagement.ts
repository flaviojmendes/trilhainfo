import { LinkContentType } from '../../entity/RoadmapModel';

export const configManagement = {
  label: 'Gerenciamento de Configuração',
  children: [
    {
      label: 'Ansible',
      links: [
        {
          label: 'Curso Ansible -  Mário Santana',
          url: 'https://www.youtube.com/watch?v=Os0Uo5VXxNU&list=PLORF-y_edVoDQnky9u2OgyrfirE1dhutX',
          contentType: LinkContentType.WATCH,
        },
        {
          label: 'Boas práticas do Ansible -  Amaury Borges Souza',
          url: 'https://amaurybsouza.medium.com/as-boas-pr%C3%A1ticas-do-ansible-que-ningu%C3%A9m-te-conta-e-que-n%C3%A3o-existem-no-google-4fcc3126ad1',
          contentType: LinkContentType.WATCH,
        },
        {
          label: 'Descomplicando o Ansible - Ansible',
          url: 'https://www.youtube.com/playlist?list=PLf-O3X2-mxDk3yebbffbo3sGmwdFxiNPi',
          contentType: LinkContentType.WATCH,
        },
      ],
    },
    { label: 'Chef', links: [] },
    { label: 'Salt', links: [] },
    { label: 'Puppet', links: [] },
  ],
};
