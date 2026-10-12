import { useEffect } from 'react';
import { learningMetadata } from './metadata';
import { RoadmapCatalog } from './types';

export function useCatalogMetadata(catalog?: RoadmapCatalog) {
  useEffect(() => {
    if (!catalog) return;
    document.title = `Trilha de ${catalog.title} | Trilha Info`;
    document.head.querySelectorAll('[data-trilha-meta]').forEach((element) => element.remove());
    const metas = [
      ['name', 'description', catalog.outcome],
      ['property', 'og:title', `Trilha de ${catalog.title} | Trilha Info`],
      ['property', 'og:description', catalog.outcome],
    ];
    const previous: Array<{ element: Element; content: string | null }> = [];
    metas.forEach(([attribute, name, content]) => {
      let element = document.head.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      previous.push({ element, content: element.getAttribute('content') });
      element.setAttribute('content', content);
    });
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = `https://trilha.info/roadmap/${catalog.id}`;
    canonical.dataset.trilhaMeta = '';
    document.head.appendChild(canonical);
    [
      ['application/json', `/data/${catalog.id}.json`],
      ['text/markdown', `/data/${catalog.id}.md`],
      ['text/html', `/read/${catalog.id}/`],
    ].forEach(([type, href]) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.type = type;
      link.href = href;
      link.dataset.trilhaMeta = '';
      document.head.appendChild(link);
    });
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.trilhaMeta = '';
    script.textContent = JSON.stringify(learningMetadata(catalog));
    document.head.appendChild(script);
    return () => {
      document.head.querySelectorAll('[data-trilha-meta]').forEach((element) => element.remove());
      previous.forEach(({ element }) => {
        const name = element.getAttribute('name') || element.getAttribute('property');
        element.setAttribute(
          'content',
          name === 'og:title'
            ? 'Trilha Info'
            : 'Guias de estudo de tecnologia com referências gratuitas em português. Explore as trilhas e acompanhe seu progresso.',
        );
      });
    };
  }, [catalog]);
}
