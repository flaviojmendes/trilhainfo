import {
  CSSProperties,
  RefObject,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  aiPracticeNode,
  buildJourney,
  groupMatches,
  journeyProgress,
} from '../../learning/journey';
import { LearningGroup, RoadmapCatalog, StudyPreferences } from '../../learning/types';
import { nextGroup } from '../../learning/progress';
import { AISymbol, BranchIcon, CheckIcon, FlagIcon, SummitIcon } from './icons';

export { AISymbol } from './icons';

const sway = [0, 0.55, 1, 0.55, 0, -0.55, -1, -0.55];
const introduced = new Set<string>();

type Point = { x: number; y: number; reached: boolean };
type Road = { width: number; height: number; base: string; done: string };

function offsetWithin(element: HTMLElement, container: HTMLElement) {
  // Offsets ignore transforms, so entrance and hover motion never bend the road.
  let x = element.offsetWidth / 2;
  let y = element.offsetHeight / 2;
  let current: HTMLElement | null = element;
  while (current && current !== container) {
    x += current.offsetLeft;
    y += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

function toPath(points: Point[]) {
  const r = (value: number) => Math.round(value * 10) / 10;
  return points.reduce((path, point, index) => {
    if (!index) return `M${r(point.x)} ${r(point.y)}`;
    const previous = points[index - 1];
    const bend = (point.y - previous.y) / 2;
    return `${path} C${r(previous.x)} ${r(previous.y + bend)} ${r(point.x)} ${r(
      point.y - bend,
    )} ${r(point.x)} ${r(point.y)}`;
  }, '');
}

function useTrailRoad(ref: RefObject<HTMLDivElement>, signature: string) {
  const [road, setRoad] = useState<Road>();
  useLayoutEffect(() => {
    const container = ref.current;
    if (!container) return;
    function measure() {
      if (!container) return;
      const points = Array.from(container.querySelectorAll<HTMLElement>('[data-trail-point]')).map(
        (element) => ({
          ...offsetWithin(element, container),
          reached: element.dataset.reached === 'true',
        }),
      );
      if (points.length < 2 || !container.offsetWidth) return setRoad(undefined);
      const reached = points.findIndex((point) => !point.reached);
      const last = reached < 0 ? points.length - 1 : reached - 1;
      const next = {
        width: container.offsetWidth,
        height: container.offsetHeight,
        base: toPath(points),
        done: last > 0 ? toPath(points.slice(0, last + 1)) : '',
      };
      setRoad((previous) =>
        previous &&
        previous.base === next.base &&
        previous.done === next.done &&
        previous.width === next.width &&
        previous.height === next.height
          ? previous
          : next,
      );
    }
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [ref, signature]);
  return road;
}

export function JourneyMap({
  catalog,
  prefs,
  query,
  onSelect,
  onClearQuery,
}: {
  catalog: RoadmapCatalog;
  prefs: StudyPreferences;
  query: string;
  onSelect: (id: string, nodeId?: string) => void;
  onClearQuery: () => void;
}) {
  const journey = useMemo(() => buildJourney(catalog), [catalog]);
  const trailRef = useRef<HTMLDivElement>(null);
  const [intro] = useState(() => !introduced.has(catalog.id));
  const [legendOpen] = useState(
    () => typeof window === 'undefined' || window.matchMedia('(min-width: 768px)').matches,
  );
  useEffect(() => {
    introduced.add(catalog.id);
  }, [catalog.id]);

  const matches = (id: string) => groupMatches(catalog, catalog.groups[id], query);
  const phases = journey.filter((phase) => phase.groupIds.some(matches));
  const optional = catalog.stages
    .filter((stage) => stage.optional)
    .map((stage) => ({ ...stage, groupIds: stage.groupIds.filter(matches) }))
    .filter((stage) => stage.groupIds.length);
  const hasAI = Object.values(catalog.groups).some((group) => !!group.ai);
  const nextId = nextGroup(catalog, prefs);
  const next = nextId ? catalog.groups[nextId] : undefined;
  const order = journey.flatMap((phase) => phase.groupIds);
  const currentOrder = nextId ? order.indexOf(nextId) : Infinity;
  const road = useTrailRoad(
    trailRef,
    `${query}|${prefs.completedNodeIds.length}|${nextId}|${phases.length}`,
  );

  function stats(group: LearningGroup) {
    const done = group.requiredIds.filter((id) => prefs.completedNodeIds.includes(id)).length;
    return { done, total: group.requiredIds.length, complete: done === group.requiredIds.length };
  }

  function label(group: LearningGroup, isOptional = false) {
    const { complete, total } = stats(group);
    return `${group.title} · ${isOptional ? 'Opcional' : 'Obrigatório'} · ${
      complete ? 'Concluído' : `${total} passos essenciais`
    }${group.ai ? ' · Com IA' : ''}${group.id === nextId ? ' · Você está aqui' : ''}`;
  }

  function scrollToPhase(id: string) {
    const target = document.getElementById(`journey-phase-title-${id}`);
    target?.focus({ preventScroll: true });
    target?.scrollIntoView({
      block: 'center',
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  }

  let row = 0;
  let topicNumber = 0;

  return (
    <section
      className="journey-map"
      aria-labelledby="journey-title"
      data-intro={intro || undefined}
    >
      <header className="journey-heading">
        <h2 id="journey-title" tabIndex={-1}>
          Seu trajeto, do começo à entrega
        </h2>
        <p>
          Siga a estrada de cima para baixo. Cada trecho termina em um projeto que você consegue
          construir e demonstrar.
        </p>
      </header>

      <div className="journey-layout">
        <aside className="journey-aside" aria-label="Resumo do trajeto">
          {next ? (
            <div className="aside-card aside-next">
              <h3 className="aside-eyebrow">
                <span className="aside-pulse" aria-hidden="true" />
                Próximo passo
              </h3>
              <p className="aside-next-title">{next.title}</p>
              {next.description && <p className="aside-next-description">{next.description}</p>}
              <button type="button" className="learning-primary" onClick={() => onSelect(next.id)}>
                {prefs.completedNodeIds.length ? 'Continuar em' : 'Começar por'} {next.title}{' '}
                <span aria-hidden="true">→</span>
              </button>
            </div>
          ) : (
            <div className="aside-card aside-next aside-finished">
              <h3 className="aside-eyebrow">
                <SummitIcon /> Trajeto concluído
              </h3>
              <p className="aside-next-description">
                Você cumpriu todos os passos essenciais. Escolha um aprofundamento opcional ou
                revise seus projetos.
              </p>
            </div>
          )}

          {journey.length > 1 && (
            <nav className="aside-card aside-chapters" aria-label="Trechos do trajeto">
              <h3 className="aside-eyebrow">Trechos</h3>
              <ol>
                {journey.map((phase, index) => {
                  const progress = journeyProgress(catalog, phase.groupIds, prefs);
                  const ratio = progress.total ? progress.done / progress.total : 0;
                  const visible = phases.includes(phase);
                  return (
                    <li key={phase.id}>
                      <button
                        type="button"
                        disabled={!visible}
                        onClick={() => scrollToPhase(phase.id)}
                        aria-current={
                          nextId && phase.groupIds.includes(nextId) ? 'step' : undefined
                        }
                        style={{ '--p': ratio } as CSSProperties}
                        data-complete={ratio === 1 || undefined}
                      >
                        <span className="chapter-number" aria-hidden="true">
                          {ratio === 1 ? <CheckIcon /> : index + 1}
                        </span>
                        <span className="chapter-text">
                          <span className="chapter-title">{phase.title}</span>
                          <span className="chapter-meter" aria-hidden="true">
                            <span />
                          </span>
                          <span className="chapter-count">
                            {progress.done} de {progress.total} passos
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>
          )}

          <details className="aside-card aside-legend" open={legendOpen}>
            <summary className="aside-eyebrow">Como ler o mapa</summary>
            <ul aria-label="Legenda do mapa">
              <li>
                <span className="legend-dot" aria-hidden="true" />
                Assunto obrigatório. Abra para estudar.
              </li>
              <li>
                <span className="legend-dot legend-dot-done" aria-hidden="true">
                  <CheckIcon />
                </span>
                Assunto concluído
              </li>
              {hasAI && (
                <li>
                  <span className="legend-dot legend-dot-ai" aria-hidden="true">
                    <AISymbol />
                  </span>
                  Prática com IA, parte do percurso
                </li>
              )}
              <li>
                <span className="legend-dot legend-dot-project" aria-hidden="true">
                  <FlagIcon />
                </span>
                Projeto que fecha o trecho
              </li>
              <li>
                <span className="legend-road" aria-hidden="true" />
                Trecho já percorrido
              </li>
              {optional.length > 0 && (
                <li>
                  <span className="legend-dot legend-dot-optional" aria-hidden="true" />
                  Aprofundamento opcional
                </li>
              )}
            </ul>
          </details>
        </aside>

        <div className="journey-trail-column">
          {phases.length > 0 && (
            <div className="journey-trail" ref={trailRef}>
              {road && (
                <svg
                  className="trail-road"
                  aria-hidden="true"
                  width={road.width}
                  height={road.height}
                  viewBox={`0 0 ${road.width} ${road.height}`}
                >
                  <defs>
                    <linearGradient id="trail-done-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#ff83c5" />
                      <stop offset="1" stopColor="#e1047b" />
                    </linearGradient>
                  </defs>
                  <path className="trail-road-bed" d={road.base} />
                  <path className="trail-road-lane" d={road.base} />
                  {road.done && (
                    <>
                      <path className="trail-road-glow" d={road.done} pathLength={1} />
                      <path className="trail-road-done" d={road.done} pathLength={1} />
                    </>
                  )}
                </svg>
              )}
              <ol className="trail-phases">
                {phases.map((phase) => {
                  const phaseIndex = journey.indexOf(phase);
                  const progress = journeyProgress(catalog, phase.groupIds, prefs);
                  const ratio = progress.total ? progress.done / progress.total : 0;
                  const phaseReached = order.indexOf(phase.groupIds[0]) <= currentOrder;
                  const stations = phase.groupIds.filter(matches);
                  return (
                    <li
                      key={phase.id}
                      className="trail-phase"
                      id={`journey-phase-${phase.id}`}
                      aria-labelledby={`journey-phase-title-${phase.id}`}
                    >
                      <header
                        className="trail-row trail-phase-head"
                        style={{ '--sway': 0, '--i': row++ } as CSSProperties}
                      >
                        <span
                          className="trail-dot trail-dot-phase"
                          data-trail-point
                          data-reached={phaseReached}
                          aria-hidden="true"
                        >
                          {ratio === 1 ? <CheckIcon /> : phaseIndex + 1}
                        </span>
                        <div className="trail-phase-text">
                          <span className="trail-eyebrow">
                            Trecho {phaseIndex + 1} de {journey.length}
                          </span>
                          <h3 id={`journey-phase-title-${phase.id}`} tabIndex={-1}>
                            {phase.title}
                          </h3>
                          <span
                            className="trail-phase-meter"
                            style={{ '--p': ratio } as CSSProperties}
                            aria-hidden="true"
                          >
                            <span />
                          </span>
                          <span className="trail-phase-progress">
                            {progress.done} de {progress.total} passos essenciais
                          </span>
                        </div>
                      </header>
                      <ol className="trail-stations">
                        {stations.map((id, index) => {
                          const group = catalog.groups[id];
                          const { done, total, complete } = stats(group);
                          const current = id === nextId;
                          const reached = order.indexOf(id) <= currentOrder;
                          const isProject = phase.projectGroupIds.includes(id);
                          const isFollowup = phase.afterProjectGroupIds.includes(id);
                          const state = complete
                            ? 'done'
                            : current
                            ? 'current'
                            : done
                            ? 'partial'
                            : 'todo';
                          const style = {
                            '--sway': isProject ? 0 : sway[(index + 1) % sway.length],
                            '--i': row++,
                            '--p': total ? done / total : 0,
                          } as CSSProperties;
                          if (isProject) {
                            const practice =
                              group.ai === 'assisted' ? aiPracticeNode(catalog, id) : undefined;
                            return (
                              <li
                                key={id}
                                className="trail-row trail-project"
                                data-state={state}
                                style={style}
                              >
                                <div className="trail-project-card">
                                  <button
                                    type="button"
                                    id={`journey-topic-${id}`}
                                    data-journey-group={id}
                                    className="trail-station"
                                    aria-current={current ? 'step' : undefined}
                                    aria-label={`Projeto: ${group.title} · Obrigatório${
                                      group.ai ? ' · Com IA' : ''
                                    }${complete ? ' · Concluído' : ''}${
                                      current ? ' · Você está aqui' : ''
                                    }`}
                                    onClick={() => onSelect(id)}
                                  >
                                    <span
                                      className="trail-dot trail-dot-project"
                                      data-trail-point
                                      data-reached={reached}
                                    >
                                      {complete ? <CheckIcon /> : <FlagIcon />}
                                    </span>
                                    <span className="trail-card">
                                      {current && (
                                        <span className="trail-here">Você está aqui</span>
                                      )}
                                      <span className="trail-kicker">
                                        {complete
                                          ? 'Projeto demonstrado'
                                          : `Entrega do trecho ${phaseIndex + 1}`}
                                      </span>
                                      <span className="trail-title">{group.title}</span>
                                      {group.description && (
                                        <span className="trail-description">
                                          {group.description}
                                        </span>
                                      )}
                                      <span className="trail-meta">
                                        {complete ? 'Concluído' : `${done} de ${total} critérios`}
                                        <span aria-hidden="true"> ↗</span>
                                      </span>
                                    </span>
                                  </button>
                                  {practice && (
                                    <button
                                      type="button"
                                      className="trail-ai-practice"
                                      id={`journey-ai-practice-${id}`}
                                      data-journey-ai-practice={id}
                                      onClick={() => onSelect(id, practice)}
                                    >
                                      <AISymbol />
                                      <span>Praticar IA no projeto: {group.title}</span>
                                      <span aria-hidden="true">↗</span>
                                    </button>
                                  )}
                                </div>
                              </li>
                            );
                          }
                          if (!group.ai) topicNumber += 1;
                          return (
                            <li
                              key={id}
                              className="trail-row trail-topic"
                              data-state={state}
                              data-ai={group.ai}
                              style={style}
                            >
                              <button
                                type="button"
                                id={`journey-topic-${id}`}
                                data-journey-group={id}
                                className="trail-station"
                                aria-current={current ? 'step' : undefined}
                                aria-label={label(group)}
                                onClick={() => onSelect(id)}
                              >
                                <span className="trail-dot" data-trail-point data-reached={reached}>
                                  {complete ? (
                                    <CheckIcon />
                                  ) : group.ai ? (
                                    <AISymbol />
                                  ) : (
                                    String(topicNumber).padStart(2, '0')
                                  )}
                                </span>
                                <span className="trail-card">
                                  {current && <span className="trail-here">Você está aqui</span>}
                                  <span className="trail-kicker">
                                    {group.ai && <AISymbol />}
                                    {group.ai
                                      ? 'Com IA'
                                      : isFollowup
                                      ? 'Depois da entrega'
                                      : 'Assunto'}
                                  </span>
                                  <span className="trail-title">{group.title}</span>
                                  <span className="trail-meta">
                                    {complete
                                      ? 'Concluído'
                                      : done
                                      ? `${done} de ${total} passos`
                                      : `${total} passos`}
                                  </span>
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ol>
                    </li>
                  );
                })}
              </ol>
              {phases.length === journey.length && (
                <div
                  className="trail-row trail-goal"
                  data-state={next ? 'todo' : 'done'}
                  style={{ '--sway': 0, '--i': row++ } as CSSProperties}
                >
                  <span
                    className="trail-dot trail-dot-goal"
                    data-trail-point
                    data-reached={!next}
                    aria-hidden="true"
                  >
                    <SummitIcon />
                  </span>
                  <div className="trail-goal-text">
                    <span className="trail-eyebrow">Destino</span>
                    <p>{catalog.outcome}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {optional.length > 0 && (
            <section
              className="journey-optionals"
              data-journey-optional="true"
              aria-labelledby="journey-optional-title"
            >
              <header>
                <span className="journey-optional-icon" aria-hidden="true">
                  <BranchIcon />
                </span>
                <div>
                  <h3 id="journey-optional-title">Aprofundamentos opcionais</h3>
                  <p>
                    Desvios para quando fizer sentido no seu projeto ou vaga. Eles não aumentam o
                    total obrigatório.
                  </p>
                </div>
              </header>
              <ul className="journey-optional-topics">
                {optional.flatMap((stage) =>
                  stage.groupIds.map((id) => {
                    const group = catalog.groups[id];
                    const { done, total, complete } = stats(group);
                    return (
                      <li key={id}>
                        <button
                          type="button"
                          id={`journey-topic-${id}`}
                          data-journey-group={id}
                          className="optional-station"
                          data-state={complete ? 'done' : done ? 'partial' : 'todo'}
                          aria-label={label(group, true)}
                          onClick={() => onSelect(id)}
                        >
                          <span className="optional-dot" aria-hidden="true">
                            {complete ? <CheckIcon /> : null}
                          </span>
                          <span className="optional-text">
                            <span className="trail-title">{group.title}</span>
                            <span className="trail-meta">
                              {complete ? 'Concluído' : `${done} de ${total} passos`}
                            </span>
                          </span>
                          <span className="optional-open" aria-hidden="true">
                            ↗
                          </span>
                        </button>
                      </li>
                    );
                  }),
                )}
              </ul>
            </section>
          )}

          {!phases.length && !optional.length && (
            <div className="empty-search journey-empty">
              <p>Nenhum assunto encontrado. Tente outro termo para explorar o trajeto.</p>
              <button type="button" onClick={onClearQuery}>
                Limpar busca
              </button>
            </div>
          )}
          {query.trim() && (
            <p className="journey-search-status" role="status">
              Busca por “{query.trim()}”. A ordem dos trechos foi preservada.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
