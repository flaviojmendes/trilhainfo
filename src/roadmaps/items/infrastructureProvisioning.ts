import { LinkContentType } from '../../entity/RoadmapModel';

export const infrastructureProvisioning = {
  label: 'Provisionamento de Infraestrutura',
  children: [
    {
      label: 'Terraform',
      links: [
        {
          label: 'Curso de Terraform com AWS  - Cleber Gasparoto',
          url: 'https://www.youtube.com/watch?v=bIPF_hzmQGE&list=PLWQmZVQayUUIgSmOj3GPH2BJcn0hOzIaP',
          contentType: LinkContentType.WATCH,
        },
      ],
    },
    { label: 'CloudFormation', links: [] },
    {
      label: 'Pulumi',
      links: [
        {
          label: 'IaC além da teoria. Infra as Code crash course.',
          url: 'https://www.youtube.com/watch?v=D-mPpylBxVM',
          contentType: LinkContentType.WATCH,
        },
      ],
    },
  ],
};
