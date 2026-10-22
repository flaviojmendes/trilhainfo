import { PiMagnifyingGlass } from 'react-icons/pi';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import { categoryIcons, GuideCard } from '../components/Guide/GuideCard';
import { guideCategories, GuideCategoryId, guideMatches, guides } from '../guides';
import '../components/Guide/guide.css';

export default function GuidesPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get('busca') || '';
  const requested = params.get('tema');
  const theme = guideCategories.some((category) => category.id === requested)
    ? (requested as GuideCategoryId)
    : null;

  const update = (changes: Record<string, string | null>) => {
    const nextParams = new URLSearchParams(params);
    Object.entries(changes).forEach(([key, value]) =>
      value ? nextParams.set(key, value) : nextParams.delete(key),
    );
    setParams(nextParams, { replace: true });
  };

  const visible = guides.filter(
    (guide) => (!theme || guide.category === theme) && guideMatches(guide, query),
  );
  const groups = guideCategories
    .map((category) => ({
      category,
      items: visible.filter((guide) => guide.category === category.id),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <MainLayout>
      <div className="guides-index">
        <header className="guides-index-head">
          <p className="home-eyebrow">Guias rápidos</p>
          <h1>Revise um conceito em poucos minutos</h1>
          <p>
            Explicações curtas, com diagramas e exemplos, para consultar enquanto estuda uma trilha
            ou antes de uma entrevista. Cada guia indica onde ele aparece no seu percurso.
          </p>
        </header>

        <div className="guides-index-controls">
          <label className="guides-search">
            <PiMagnifyingGlass aria-hidden="true" />
            <span className="sr-only">Buscar guia</span>
            <input
              type="search"
              value={query}
              placeholder="Buscar um guia"
              onChange={(event) => update({ busca: event.target.value || null })}
            />
          </label>
          <div className="guides-filters" role="group" aria-label="Filtrar por tema">
            <button type="button" aria-pressed={!theme} onClick={() => update({ tema: null })}>
              Todos
            </button>
            {guideCategories.map((category) => {
              const Icon = categoryIcons[category.id];
              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={theme === category.id}
                  onClick={() => update({ tema: theme === category.id ? null : category.id })}
                >
                  <Icon aria-hidden="true" />
                  {category.title}
                </button>
              );
            })}
          </div>
        </div>

        <p className="guides-count" role="status">
          {visible.length === guides.length
            ? `${guides.length} guias`
            : `${visible.length} de ${guides.length} guias`}
        </p>

        {groups.length === 0 ? (
          <div className="guides-empty">
            <p>Nenhum guia encontrado{query && ` para “${query}”`}.</p>
            <button type="button" onClick={() => update({ busca: null, tema: null })}>
              Limpar filtros
            </button>
          </div>
        ) : (
          groups.map(({ category, items }) => (
            <section
              key={category.id}
              className="guides-group"
              aria-labelledby={`guides-${category.id}`}
            >
              <header>
                <h2 id={`guides-${category.id}`}>{category.title}</h2>
                <p>{category.description}</p>
              </header>
              <ul className="guide-tiles">
                {items.map((guide) => (
                  <li key={guide.id}>
                    <GuideCard guide={guide} />
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>
    </MainLayout>
  );
}
