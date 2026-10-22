import { categoryOf, guideCategories, guides } from '../guides';
import { courseLessons, courses, lessonPlace, lessons } from '../lessons';
import type { RoadmapCatalog } from '../learning/types';

export const siteUrl = 'https://trilha.info';
export const cardSize = { width: 1200, height: 630 };

export interface PreviewCard {
  kicker: string;
  title: string;
  summary: string;
  facts: string[];
}

export interface SocialPage {
  path: string;
  documentTitle: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  type: 'website' | 'article';
  section?: string;
  modified?: string;
  labels?: Array<[string, string]>;
  card: PreviewCard;
}

export interface BlogPost {
  title: string;
  summary: string;
  url: string;
}

const siteDescription =
  'Trilhas gratuitas em português para estudar tecnologia com referências abertas, prática com IA e projetos para o portfólio.';

function clip(text: string, max: number): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, clean.lastIndexOf(' ', max - 1)).replace(/[,.;:]$/, '')}…`;
}

function plain(text: string): string {
  return text.replace(/`([^`]+)`/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1');
}

function plural(count: number, one: string, many: string): string {
  return `${count} ${count === 1 ? one : many}`;
}

export function socialPages(catalogs: RoadmapCatalog[], posts: BlogPost[]): SocialPage[] {
  const home: SocialPage = {
    path: '/',
    documentTitle: 'Trilha Info | Cursos e trilhas gratuitas de programação',
    title: 'Trilha Info: explore o seu caminho na tecnologia',
    description: siteDescription,
    image: '/og/home.png',
    imageAlt: 'Trilha Info: trilhas gratuitas de tecnologia em português',
    type: 'website',
    card: {
      kicker: 'Gratuito, em português e open source',
      title: 'Explore o seu caminho na tecnologia',
      summary: siteDescription,
      facts: [
        plural(catalogs.length, 'trilha', 'trilhas'),
        plural(lessons.length, 'aula', 'aulas'),
        plural(guides.length, 'guia', 'guias'),
      ],
    },
  };

  const guidesIndex: SocialPage = {
    path: '/guias',
    documentTitle: 'Guias rápidos · Trilha Info',
    title: 'Guias rápidos: revise um conceito em poucos minutos',
    description:
      'Explicações curtas, com diagramas e exemplos, para consultar enquanto estuda uma trilha ou antes de uma entrevista.',
    image: '/og/guias.png',
    imageAlt: 'Guias rápidos da Trilha Info',
    type: 'website',
    card: {
      kicker: 'Guias rápidos',
      title: 'Revise um conceito em poucos minutos',
      summary: guideCategories.map((category) => category.title).join(' · '),
      facts: [plural(guides.length, 'guia', 'guias'), 'Diagramas e exemplos'],
    },
  };

  const guidePages = guides.map<SocialPage>((guide) => {
    const category = categoryOf(guide);
    const summary = plain(guide.summary);
    return {
      path: `/guide/${guide.id}`,
      documentTitle: `${guide.title} · Guias · Trilha Info`,
      title: guide.title,
      description: summary,
      image: `/og/guide-${guide.id}.png`,
      imageAlt: `Guia rápido: ${guide.title}`,
      type: 'article',
      section: category.title,
      modified: guide.updatedAt,
      labels: [
        ['Leitura', `${guide.minutes} min`],
        ['Nível', guide.level],
      ],
      card: {
        kicker: `Guia rápido · ${category.title}`,
        title: guide.title,
        summary,
        facts: [`${guide.minutes} min de leitura`, guide.level],
      },
    };
  });

  const lessonsIndex: SocialPage = {
    path: '/aulas',
    documentTitle: 'Aulas · Trilha Info',
    title: 'Aulas que você faz, para cada trilha',
    description:
      'Cursos gratuitos para quem está começando do zero: explicações animadas, código ao vivo, exercícios que explicam o erro e revisão espaçada.',
    image: '/og/aulas.png',
    imageAlt: 'Aulas da Trilha Info',
    type: 'website',
    card: {
      kicker: 'Cursos gratuitos',
      title: 'Aulas que você faz, para cada trilha',
      summary: 'Explicações animadas, código ao vivo, exercícios e revisão espaçada.',
      facts: [plural(courses.length, 'curso', 'cursos'), plural(lessons.length, 'aula', 'aulas')],
    },
  };

  const coursePages = courses.map<SocialPage>((course) => {
    const count = courseLessons(course).length;
    return {
      path: `/aulas/${course.id}`,
      documentTitle: `Aulas de ${course.title} · Trilha Info`,
      title: `${course.title} do zero, com aulas que você faz`,
      description: clip(
        `Curso gratuito de ${course.title} com ${count} aulas: explicações animadas, prática ao vivo, exercícios que explicam o erro e revisão espaçada.`,
        220,
      ),
      image: `/og/aulas-${course.id}.png`,
      imageAlt: `Aulas de ${course.title} da Trilha Info`,
      type: 'website',
      card: {
        kicker: 'Curso gratuito',
        title: `${course.title} do zero`,
        summary: 'Explicações animadas, prática ao vivo, exercícios e revisão espaçada.',
        facts: [plural(count, 'aula', 'aulas'), 'Sem cadastro'],
      },
    };
  });

  const lessonPages = lessons.flatMap<SocialPage>((lesson) => {
    const place = lessonPlace(lesson.id);
    if (!place) return [];
    const where = `${place.course.title} · ${place.module.title}`;
    return [
      {
        path: `/aula/${lesson.id}`,
        documentTitle: `${lesson.title} · Aulas · Trilha Info`,
        title: lesson.title,
        description: clip(lesson.summary, 220),
        image: `/og/aula-${lesson.id}.png`,
        imageAlt: `Aula ${place.number} de ${place.course.title}: ${lesson.title}`,
        type: 'article',
        section: where,
        modified: lesson.updatedAt,
        labels: [
          ['Duração', `${lesson.minutes} min`],
          ['Curso', place.course.title],
        ],
        card: {
          kicker: `Aula ${place.number} · ${where}`,
          title: lesson.title,
          summary: lesson.summary,
          facts: [`${lesson.minutes} min`, 'Exercícios interativos'],
        },
      },
    ];
  });

  const trailPages = catalogs.map(roadmapSocialPage);

  const postPages = posts.map<SocialPage>((post) => ({
    path: `/blog/${post.url}`,
    documentTitle: `${post.title} · Trilha Info`,
    title: post.title,
    description: clip(post.summary, 220),
    image: `/og/blog-${post.url}.png`,
    imageAlt: `${post.title}, publicação da Trilha Info`,
    type: 'article',
    card: { kicker: 'Publicação', title: post.title, summary: post.summary, facts: ['Blog'] },
  }));

  return [
    home,
    guidesIndex,
    ...guidePages,
    lessonsIndex,
    ...coursePages,
    ...lessonPages,
    ...trailPages,
    {
      path: '/blog',
      documentTitle: 'Blog de tecnologia e carreira · Trilha Info',
      title: 'Blog de tecnologia e carreira',
      description:
        'Publicações da Trilha Info sobre desenvolvimento de software, conceitos de tecnologia, livros e carreira para quem estuda e trabalha na área.',
      image: '/og/blog.png',
      imageAlt: 'Blog da Trilha Info: tecnologia e carreira',
      type: 'website',
      card: {
        kicker: 'Blog',
        title: 'Tecnologia e carreira',
        summary: 'Conceitos, leituras e reflexões para continuar aprendendo.',
        facts: ['Publicações da Trilha Info'],
      },
    },
    ...postPages,
  ];
}

export function pageForPath(pages: SocialPage[], pathname: string): SocialPage | undefined {
  const path = (pathname.split(/[?#]/)[0].replace(/\/+$/, '') || '/').replace(
    /^\/hroadmap\//,
    '/roadmap/',
  );
  return pages.find((page) => page.path === path);
}

function escapeAttribute(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function socialTags(page: SocialPage): string[] {
  const url = `${siteUrl}${page.path === '/' ? '/' : page.path}`;
  const image = `${siteUrl}${page.image}`;
  const meta = (key: 'name' | 'property', name: string, content: string) =>
    `<meta ${key}="${name}" content="${escapeAttribute(content)}" />`;
  return [
    `<title>${escapeAttribute(page.documentTitle)}</title>`,
    meta('name', 'description', page.description),
    meta('name', 'robots', 'index, follow, max-image-preview:large'),
    `<link rel="canonical" href="${url}" />`,
    meta('property', 'og:site_name', 'Trilha Info'),
    meta('property', 'og:locale', 'pt_BR'),
    meta('property', 'og:type', page.type),
    meta('property', 'og:url', url),
    meta('property', 'og:title', page.title),
    meta('property', 'og:description', page.description),
    meta('property', 'og:image', image),
    meta('property', 'og:image:type', 'image/png'),
    meta('property', 'og:image:width', String(cardSize.width)),
    meta('property', 'og:image:height', String(cardSize.height)),
    meta('property', 'og:image:alt', page.imageAlt),
    ...(page.section ? [meta('property', 'article:section', page.section)] : []),
    ...(page.modified ? [meta('property', 'article:modified_time', page.modified)] : []),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:site', '@flaviojmendes'),
    meta('name', 'twitter:title', page.title),
    meta('name', 'twitter:description', page.description),
    meta('name', 'twitter:image', image),
    meta('name', 'twitter:image:alt', page.imageAlt),
    ...(page.labels || []).flatMap(([label, data], index) => [
      meta('name', `twitter:label${index + 1}`, label),
      meta('name', `twitter:data${index + 1}`, data),
    ]),
  ];
}

export function applySocialMeta(html: string, page: SocialPage): string {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/gi, '')
    .replace(
      /<meta\s+(?:name|property)="(?:robots|description|og:[^"]*|twitter:[^"]*|article:[^"]*)"[^>]*>\s*/gi,
      '',
    )
    .replace(/<link\b[^>]*\brel="canonical"[^>]*>\s*/gi, '')
    .replace(
      /(<meta\s+charset="[^"]*"\s*\/?>)/i,
      (charset) => `${charset}\n    ${socialTags(page).join('\n    ')}`,
    );
}

export function roadmapSocialPage(
  catalog: Pick<RoadmapCatalog, 'id' | 'title' | 'audience' | 'outcome'> &
    Partial<Pick<RoadmapCatalog, 'groups' | 'stages'>>,
): SocialPage {
  const topics = catalog.groups ? Object.keys(catalog.groups).length : undefined;
  const stages = catalog.stages?.length;
  return {
    path: `/roadmap/${catalog.id}`,
    documentTitle: `Trilha de ${catalog.title} | Trilha Info`,
    title: `Trilha de ${catalog.title}`,
    description: clip(`${catalog.audience} Ao final: ${catalog.outcome}`, 220),
    image: `/og/trilha-${catalog.id}.png`,
    imageAlt: `Trilha de ${catalog.title} na Trilha Info`,
    type: 'website',
    labels: [
      ...(stages === undefined ? [] : [['Trechos', String(stages)] as [string, string]]),
      ...(topics === undefined ? [] : [['Assuntos', String(topics)] as [string, string]]),
    ],
    card: {
      kicker: 'Trilha gratuita',
      title: catalog.title,
      summary: catalog.audience,
      facts: [
        ...(stages === undefined ? [] : [plural(stages, 'trecho', 'trechos')]),
        ...(topics === undefined ? [] : [plural(topics, 'assunto', 'assuntos')]),
      ],
    },
  };
}
