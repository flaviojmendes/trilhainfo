import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import posts from '../../public/posts/posts.json';
import { roadmapGuides } from '../roadmaps/guides';
import { roadmapTitles } from '../roadmaps/titles';
import { pageForPath, roadmapSocialPage, socialPages, socialTags } from './pages';
import { jsonForScript, structuredData } from './structuredData';
import { isPersonalPath } from './routePolicy';

const pages = [
  ...socialPages([], posts),
  ...Object.entries(roadmapTitles).map(([id, title]) =>
    roadmapSocialPage({
      id,
      title,
      audience: roadmapGuides[id as keyof typeof roadmapGuides]?.audience || '',
      outcome: roadmapGuides[id as keyof typeof roadmapGuides]?.outcome || '',
    }),
  ),
];

/** Owns route metadata so lazy pages cannot leave a previous page's canonical or schema behind. */
export function RouteMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = pageForPath(pages, pathname);
    document.head
      .querySelectorAll(
        'title, meta[name="description"], meta[name="robots"], meta[property^="og:"], meta[property^="article:"], meta[name^="twitter:"], link[rel="canonical"], script[data-seo-schema]',
      )
      .forEach((element) => element.remove());
    if (page) {
      const template = document.createElement('template');
      template.innerHTML = socialTags(page).join('');
      document.head.appendChild(template.content);
      const schema = document.createElement('script');
      schema.type = 'application/ld+json';
      schema.dataset.seoSchema = '';
      schema.textContent = jsonForScript(structuredData(page));
      document.head.appendChild(schema);
    } else {
      document.title = isPersonalPath(pathname)
        ? 'Seu espaço de estudo · Trilha Info'
        : 'Página não encontrada · Trilha Info';
      const robots = document.createElement('meta');
      robots.name = 'robots';
      robots.content = 'noindex, follow';
      document.head.appendChild(robots);
    }
  }, [pathname]);
  return null;
}
