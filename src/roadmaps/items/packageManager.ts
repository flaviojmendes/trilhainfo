import { Level, LinkContentType } from '../../entity/RoadmapModel';

export const packageManager: Level = {
  label: 'Gerenciadores de Pacote',
  description:
    'Os gerenciadores de pacotes permitem que você gerencie as dependências (código externo escrito por você ou outra pessoa) que seu projeto precisa para funcionar corretamente.',

  items: [
    {
      label: 'npm',
      children: [
        {
          label: 'O básico',
          links: [
            {
              url: 'https://www.youtube.com/watch?v=tFqsmNrWW0M',
              label: 'Introdução ao NPM - Fellyph Cintra ',
              contentType: LinkContentType.WATCH,
            },
          ],
        },
      ],
    },
    {
      label: 'yarn',
      children: [
        {
          label: 'O básico',
          links: [
            {
              url: 'https://www.youtube.com/watch?v=3BPfDo4arHc',
              label: 'Yarn - DevPleno',
              contentType: LinkContentType.WATCH,
            },
          ],
        },
      ],
    },
  ],
};
