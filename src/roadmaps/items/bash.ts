import { LinkContentType, RoadmapItem } from '../../entity/RoadmapModel';

export const bash: RoadmapItem = {
  label: 'Bash',
  description:
    'Bash é a linguagem de programação do terminal Linux também conhecida como Shell Script, Bash é a evolução do shell sh original do Linux e é uma linguagem essencial para trabalhar com automação de processos em ambientes Linux.',
  children: [
    {
      label: 'Bash',
      links: [
        {
          label: 'Curso Básico de Bash - Blau Araujo no canal debxp',
          url: 'https://www.youtube.com/playlist?list=PLXoSGejyuQGpf4X-NdGjvSlEFZhn2f2H7',
          contentType: LinkContentType.WATCH,
        },
        {
          label: 'Curso Shell Script - BosonTreinamentos',
          url: 'https://www.youtube.com/watch?v=EOLPUc6oo-w&list=PLucm8g_ezqNrYgjXC8_CgbvHbvI7dDfhs',
          contentType: LinkContentType.WATCH,
        },
      ],
    },
  ],
};
