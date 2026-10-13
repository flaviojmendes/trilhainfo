import { useEffect, useState } from 'react';
import {
  PiArrowLeft,
  PiArrowRight,
  PiArrowUpRight,
  PiClock,
  PiDownloadSimple,
  PiSignpost,
} from 'react-icons/pi';
import { Link, useLocation } from 'react-router-dom';
import { adjacentGuides, categoryOf, GuideMeta, relatedGuides } from '../../guides';
import { GuideContent } from '../../guides/types';
import { roadmapTitles } from '../../roadmaps/titles';
import { GuideBlockView } from './GuideBlock';
import { GuideCard } from './GuideCard';
import './guide.css';

const dateFormat = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' });

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  const signature = ids.join('|');
  useEffect(() => {
    setActive(ids[0]);
    if (typeof IntersectionObserver === 'undefined' || ids.length === 0) return;
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visible.set(entry.target.id, entry.isIntersecting));
        const first = ids.find((id) => visible.get(id));
        if (first) setActive(first);
      },
      { rootMargin: '-96px 0px -55% 0px' },
    );
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature]);
  return active;
}

export function GuideView({ guide }: { guide: GuideMeta }) {
  const [content, setContent] = useState<GuideContent | null>(null);
  const [failed, setFailed] = useState(false);
  const location = useLocation();
  const category = categoryOf(guide);
  const { previous, next } = adjacentGuides(guide.id);
  const related = relatedGuides(guide);
  const sections = content?.sections || [];
  const active = useActiveSection(sections.map((section) => section.id));

  useEffect(() => {
    let current = true;
    guide
      .load()
      .then((module) => current && setContent(module.content))
      .catch(() => current && setFailed(true));
    return () => {
      current = false;
    };
  }, [guide]);

  useEffect(() => {
    if (!content) return;
    const target =
      location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) target.scrollIntoView?.();
    else document.documentElement.scrollTop = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  return (
    <article className="guide-page" aria-labelledby="guide-title">
      <header className="guide-hero">
        <nav className="guide-crumbs" aria-label="Você está em">
          <ol>
            <li>
              <Link to="/">Início</Link>
            </li>
            <li>
              <Link to="/guias">Guias</Link>
            </li>
            <li>
              <Link to={`/guias?tema=${category.id}`}>{category.title}</Link>
            </li>
          </ol>
        </nav>
        <h1 id="guide-title">{guide.title}</h1>
        <p className="guide-summary">
          <span>Resumo</span>
          {guide.summary}
        </p>
        <ul className="guide-facts">
          <li>
            <PiClock aria-hidden="true" /> {guide.minutes} min de leitura
          </li>
          <li>
            <PiSignpost aria-hidden="true" /> {guide.level}
          </li>
          <li>
            Revisado em{' '}
            <time dateTime={guide.updatedAt}>
              {dateFormat.format(new Date(`${guide.updatedAt}T12:00:00`))}
            </time>
          </li>
        </ul>
        {guide.trails.length > 0 && (
          <div className="guide-trails">
            <span id="guide-trails-label">Usado nas trilhas</span>
            <ul aria-labelledby="guide-trails-label">
              {guide.trails.map((trail) => (
                <li key={trail}>
                  <Link to={`/roadmap/${trail}`}>{roadmapTitles[trail]}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <div className="guide-layout">
        <nav className="guide-toc" aria-label="Neste guia">
          <p className="guide-toc-title" aria-hidden="true">
            Neste guia
          </p>
          {sections.length > 0 && (
            <ol>
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} aria-current={active === section.id || undefined}>
                    <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          )}
          {guide.poster && (
            <a className="guide-poster" href={`/guides/${guide.id}.jpg`} download>
              <PiDownloadSimple aria-hidden="true" /> Baixar versão em imagem
            </a>
          )}
        </nav>

        <div className="guide-body">
          {failed ? (
            <div className="guide-failed" role="alert">
              <p>Não foi possível carregar este guia. Verifique a conexão e tente de novo.</p>
              <button type="button" onClick={() => window.location.reload()}>
                Recarregar
              </button>
            </div>
          ) : !content ? (
            <div role="status" aria-label="Carregando guia">
              <div className="roadmap-skeleton" />
              <div className="roadmap-skeleton" />
            </div>
          ) : (
            <>
              {sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="guide-section"
                  aria-labelledby={`${section.id}-title`}
                >
                  <h2 id={`${section.id}-title`}>
                    <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    {section.title}
                  </h2>
                  {section.blocks.map((block, blockIndex) => (
                    <GuideBlockView key={blockIndex} block={block} guideId={guide.id} />
                  ))}
                </section>
              ))}
              {content.sources && content.sources.length > 0 && (
                <section className="guide-sources" aria-labelledby="guide-sources-title">
                  <h2 id="guide-sources-title">Para ir além</h2>
                  <ul>
                    {content.sources.map((source) => (
                      <li key={source.url}>
                        <a href={source.url} target="_blank" rel="noreferrer">
                          {source.title}
                          <PiArrowUpRight aria-hidden="true" />
                          <span className="sr-only"> (abre em nova aba)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </>
          )}
        </div>
      </div>

      <footer className="guide-end">
        {related.length > 0 && (
          <section aria-labelledby="guide-related-title">
            <h2 id="guide-related-title">Continue estudando</h2>
            <ul className="guide-tiles">
              {related.map((item) => (
                <li key={item.id}>
                  <GuideCard guide={item} />
                </li>
              ))}
            </ul>
          </section>
        )}
        <nav className="guide-pager" aria-label="Guia anterior e próximo">
          {previous ? (
            <Link to={`/guide/${previous.id}`} rel="prev">
              <PiArrowLeft aria-hidden="true" />
              <span>
                <small>Anterior</small>
                {previous.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to={`/guide/${next.id}`} rel="next" className="guide-pager-next">
              <span>
                <small>Próximo</small>
                {next.title}
              </span>
              <PiArrowRight aria-hidden="true" />
            </Link>
          )}
        </nav>
      </footer>
    </article>
  );
}
