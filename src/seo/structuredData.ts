import { findGuide } from '../guides';
import { courseLessons, findCourse, findLesson, lessonPlace } from '../lessons';
import { homeQuestions } from './faq';
import { siteUrl, SocialPage } from './pages';

const organization = `${siteUrl}/#organization`;
const website = `${siteUrl}/#website`;
const reference = (id: string) => ({ '@id': id });

export function structuredData(page: SocialPage) {
  const url = `${siteUrl}${page.path}`;
  const guide = page.path.startsWith('/guide/') && findGuide(page.path.slice(7));
  const lesson = page.path.startsWith('/aula/') && findLesson(page.path.slice(6));
  const course = page.path.startsWith('/aulas/') && findCourse(page.path.slice(7));
  const trail = page.path.startsWith('/roadmap/');
  const post = page.path.startsWith('/blog/');
  const collection = ['/guias', '/aulas', '/blog'].includes(page.path);
  const resourceId = trail ? url : `${url}#resource`;
  const crumbs = [{ name: 'Início', item: `${siteUrl}/` }];
  if (page.path !== '/') {
    if (guide) crumbs.push({ name: 'Guias', item: `${siteUrl}/guias` });
    if (lesson || course) crumbs.push({ name: 'Aulas', item: `${siteUrl}/aulas` });
    if (lesson) {
      const place = lessonPlace(lesson.id);
      if (place)
        crumbs.push({ name: place.course.title, item: `${siteUrl}/aulas/${place.course.id}` });
    }
    if (post) crumbs.push({ name: 'Blog', item: `${siteUrl}/blog` });
    crumbs.push({ name: page.title, item: url });
  }

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': organization,
      name: 'Trilha Info',
      url: `${siteUrl}/`,
      logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` },
      sameAs: ['https://github.com/flaviojmendes/trilhainfo'],
    },
    {
      '@type': 'WebSite',
      '@id': website,
      name: 'Trilha Info',
      url: `${siteUrl}/`,
      inLanguage: 'pt-BR',
      publisher: reference(organization),
    },
    {
      '@type': collection ? 'CollectionPage' : 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      inLanguage: 'pt-BR',
      isPartOf: reference(website),
      primaryImageOfPage: { '@type': 'ImageObject', url: `${siteUrl}${page.image}` },
      ...(page.path !== '/' ? { breadcrumb: reference(`${url}#breadcrumbs`) } : {}),
      ...(guide || lesson || course || trail || post ? { mainEntity: reference(resourceId) } : {}),
    },
  ];
  if (page.path !== '/')
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumbs`,
      itemListElement: crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        ...crumb,
      })),
    });
  if (guide || lesson || post)
    graph.push({
      '@type': guide
        ? ['TechArticle', 'LearningResource']
        : lesson
        ? ['Article', 'LearningResource']
        : 'BlogPosting',
      '@id': resourceId,
      url,
      headline: page.title,
      name: page.title,
      description: page.description,
      inLanguage: 'pt-BR',
      isAccessibleForFree: true,
      publisher: reference(organization),
      mainEntityOfPage: reference(`${url}#webpage`),
      image: `${siteUrl}${page.image}`,
      ...(page.modified ? { dateModified: page.modified } : {}),
      ...(guide
        ? {
            learningResourceType: 'Guia',
            educationalLevel: guide.level,
            timeRequired: `PT${guide.minutes}M`,
          }
        : {}),
      ...(lesson
        ? {
            learningResourceType: 'Aula interativa',
            teaches: lesson.objectives,
            timeRequired: `PT${lesson.minutes}M`,
          }
        : {}),
    });
  if (course)
    graph.push({
      '@type': 'Course',
      '@id': resourceId,
      url,
      name: `Aulas de ${course.title}`,
      description: page.description,
      inLanguage: 'pt-BR',
      isAccessibleForFree: true,
      provider: reference(organization),
      hasPart: courseLessons(course).map((item) => ({
        '@type': 'LearningResource',
        '@id': `${siteUrl}/aula/${item.id}#resource`,
        url: `${siteUrl}/aula/${item.id}`,
        name: item.title,
      })),
    });
  if (page.path === '/')
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#questions`,
      isPartOf: reference(`${url}#webpage`),
      mainEntity: homeQuestions.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    });
  return { '@context': 'https://schema.org', '@graph': graph };
}

export const jsonForScript = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');

export function applyStructuredData(html: string, page: SocialPage) {
  return html
    .replace(/<script data-seo-schema[^>]*>[\s\S]*?<\/script>\s*/g, '')
    .replace(
      '</head>',
      () =>
        `<script data-seo-schema type="application/ld+json">${jsonForScript(
          structuredData(page),
        )}</script></head>`,
    );
}
