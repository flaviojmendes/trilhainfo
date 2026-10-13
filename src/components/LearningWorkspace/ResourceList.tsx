import { LearningCredit, LearningResource } from '../../learning/types';

export function creditLabel(credit: LearningCredit): string {
  const who = [credit.author, credit.github ? `@${credit.github}` : ''].filter(Boolean).join(' ');
  return who ? `Sugestão de ${who}` : 'Sugestão da comunidade';
}

export function ResourceList({
  resources,
  studied,
  onStudy,
  simple = false,
}: {
  resources: LearningResource[];
  studied: string[];
  onStudy: (id: string, checked: boolean) => void;
  simple?: boolean;
}) {
  if (!resources.length) return null;
  const first = resources.find((resource) => resource.language === 'pt-BR') || resources[0];
  const visible = simple ? [first] : resources;
  const others = simple ? resources.filter((resource) => resource.id !== first.id) : [];
  const render = (items: LearningResource[]) => (
    <ul className="learning-resources">
      {items.map((resource) => (
        <li key={resource.id}>
          <div>
            <a href={resource.url} target="_blank" rel="noreferrer">
              {resource.title}
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
            <p className="resource-meta">
              {resource.kind} ·{' '}
              {resource.language === 'pt-BR'
                ? 'Português'
                : resource.language === 'en'
                ? 'Inglês'
                : 'Idioma não informado'}
              {resource.free === true ? ' · Gratuito' : resource.free === false ? ' · Pago' : ''}
              {resource.estimatedMinutes !== null ? ` · ${resource.estimatedMinutes} min` : ''}
            </p>
            {resource.contribution && (
              <p className="community-credit">{creditLabel(resource.contribution)}</p>
            )}
          </div>
          <label className="resource-check">
            <input
              type="checkbox"
              checked={studied.includes(resource.id)}
              onChange={(event) => onStudy(resource.id, event.target.checked)}
            />
            <span className="sr-only">Marcar {resource.title} como estudado</span>
          </label>
        </li>
      ))}
    </ul>
  );
  return (
    <>
      {render(visible)}
      {!!others.length && (
        <details className="more-references">
          <summary>Ver outras {others.length} referências</summary>
          {render(others)}
        </details>
      )}
    </>
  );
}
