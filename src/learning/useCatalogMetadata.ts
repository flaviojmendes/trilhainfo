import { useEffect } from 'react';
import { learningMetadata } from './metadata';
import { RoadmapCatalog } from './types';

/** Catalog-only details complement the metadata owned by RouteMetadata. */
export function useCatalogMetadata(catalog?: RoadmapCatalog) {
  useEffect(() => {
    if (!catalog) return;
    document.head.querySelectorAll('[data-trilha-meta]').forEach((element) => element.remove());
    const elements: Element[] = [];
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
      elements.push(link);
      document.head.appendChild(link);
    });
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.trilhaMeta = '';
    script.textContent = JSON.stringify(learningMetadata(catalog)).replace(/</g, '\\u003c');
    elements.push(script);
    document.head.appendChild(script);
    return () => elements.forEach((element) => element.remove());
  }, [catalog]);
}
