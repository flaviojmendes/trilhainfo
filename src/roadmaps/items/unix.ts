import { LinkContentType, RoadmapItem } from '../../entity/RoadmapModel';

export const unix: RoadmapItem = {
  label: 'UNIX',
  description: 'UNIX é um sistema operacional portável, multitarefa e multiusuário originalmente criado por Ken Thompson, Dennis Ritchie, entre outros, que trabalhavam nos Laboratórios Bell da AT&T.',
  children: [
    {
      label: 'AIX', links: [
        {
          label: 'UNICAMP - CCUEC - Apostila de AIX',
          url: 'http://www.dicas-l.com.br/download/aix.pdf',
          contentType: LinkContentType.WATCH,
        },
      ]
    },
    { label: 'Solaris', links: [] },
    { label: 'MINIX', links: [] },
  ],
}
