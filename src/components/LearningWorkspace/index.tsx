import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { projectBranch } from '../../learning/catalog';
import { nextGroup, progressSummary } from '../../learning/progress';
import { Depth, LearningView, RoadmapCatalog, StudyPreferences } from '../../learning/types';
import { resolveGroup, useStudyState } from '../../learning/useStudyState';
import { GroupContent, depthNames } from './GroupContent';
import { StudyTools } from './StudyTools';
import { JourneyMap } from './JourneyMap';
import { BookIcon, CheckIcon, ListIcon, MapIcon } from './icons';
import { groupMatches } from '../../learning/journey';
import { downloadVisualization } from '../../learning/downloads';
import { saveProgressSnapshot } from '../../learning/progressSnapshot';
import { curriculumReviewLabel } from '../../roadmaps/guides';
import './workspace.css';

const viewLabels: Record<LearningView, string> = { study: 'Estudar', map: 'Mapa', list: 'Lista' };
const viewIcons = { map: MapIcon, study: BookIcon, list: ListIcon };
const views: LearningView[] = ['map', 'study', 'list'];

function ProgressRing({ percent }: { percent: number }) {
  const radius = 34;
  const length = 2 * Math.PI * radius;
  return (
    <svg className="progress-ring" viewBox="0 0 80 80" aria-hidden="true">
      <circle className="progress-ring-track" cx="40" cy="40" r={radius} />
      <circle
        className="progress-ring-value"
        cx="40"
        cy="40"
        r={radius}
        strokeDasharray={length}
        strokeDashoffset={length * (1 - percent / 100)}
      />
    </svg>
  );
}

export default function LearningWorkspace({
  catalog,
  onExportNotes,
}: {
  catalog: RoadmapCatalog;
  onExportNotes?: () => Promise<void>;
}) {
  const { prefs, update, storageIssue, plan, planIssue, setPlan } = useStudyState(catalog);
  const [pending, startTransition] = useTransition();
  const [query, setQuery] = useState('');
  const [showOptional, setShowOptional] = useState(() =>
    catalog.stages.some((stage) => stage.optional && stage.groupIds.includes(prefs.activeGroupId)),
  );
  const [period, setPeriod] = useState<'day' | 'night'>('night');
  const [announcement, setAnnouncement] = useState('');
  const [exporting, setExporting] = useState(false);
  const [undo, setUndo] = useState<{ id: string; previous: Depth }>();
  const focusAfterRender = useRef<{ groupId: string; nodeId?: string }>();
  const mapOrigin = useRef<string>();
  const mapFocusAfterRender = useRef<string>();
  const location = useLocation();
  const navigate = useNavigate();
  const active = catalog.groups[prefs.activeGroupId] || Object.values(catalog.groups)[0];
  const activeStage =
    catalog.stages.find((stage) => stage.id === active.stageId) || catalog.stages[0];
  const summary = progressSummary(catalog, prefs);
  const upcoming = nextGroup(catalog, prefs);
  const reduced = useReducedMotion();

  useEffect(() => {
    saveProgressSnapshot(catalog.id, summary);
  }, [catalog.id, summary.done, summary.total, summary.percent]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    function refresh() {
      const hour = new Date().getHours();
      setPeriod(
        prefs.lighting === 'auto' ? (hour >= 6 && hour < 18 ? 'day' : 'night') : prefs.lighting,
      );
    }
    refresh();
    const timer = window.setInterval(refresh, 60_000);
    document.addEventListener('visibilitychange', refresh);
    window.addEventListener('focus', refresh);
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', refresh);
      window.removeEventListener('focus', refresh);
    };
  }, [prefs.lighting]);

  useEffect(() => {
    const id = resolveGroup(catalog, location.hash);
    if (id) {
      const incomingNode = (() => {
        try {
          return decodeURIComponent(location.hash.slice(1));
        } catch {
          return '';
        }
      })();
      update((previous) => ({
        ...previous,
        activeGroupId: id,
        view: 'study',
        depthByGroup:
          catalog.nodes[incomingNode] &&
          !catalog.groups[id].variants.standard.stepIds.includes(incomingNode)
            ? { ...previous.depthByGroup, [id]: 'deep' }
            : previous.depthByGroup,
      }));
      if (catalog.stages.find((stage) => stage.id === catalog.groups[id].stageId)?.optional)
        setShowOptional(true);
    }
  }, [catalog, location.hash, update]);

  useEffect(() => {
    if (!focusAfterRender.current) return;
    const target = focusAfterRender.current;
    focusAfterRender.current = undefined;
    const frame = requestAnimationFrame(() => {
      const heading = document.getElementById(
        target.nodeId ? `node-title-${target.nodeId}` : `title-${target.groupId}`,
      );
      if (heading) {
        heading.focus({ preventScroll: true });
        heading.scrollIntoView({
          block: 'start',
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth',
        });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [prefs.activeGroupId, prefs.view]);

  useEffect(() => {
    if (prefs.view !== 'map' || !mapFocusAfterRender.current) return;
    const id = mapFocusAfterRender.current;
    mapFocusAfterRender.current = undefined;
    const frame = requestAnimationFrame(() => {
      const control = document.getElementById(id) || document.getElementById('journey-title');
      control?.focus({ preventScroll: true });
      control?.scrollIntoView({ block: 'nearest', behavior: 'auto' });
    });
    return () => cancelAnimationFrame(frame);
  }, [prefs.view]);

  const filteredStages = useMemo(
    () =>
      catalog.stages
        .filter((stage) => showOptional || !stage.optional)
        .map((stage) => ({
          ...stage,
          groupIds: stage.groupIds.filter((id) => groupMatches(catalog, catalog.groups[id], query)),
        }))
        .filter((stage) => stage.groupIds.length),
    [catalog, query, showOptional],
  );

  const chooseGroup = useCallback(
    (id: string, nodeId?: string) => {
      if (!catalog.groups[id]) return;
      if (prefs.view === 'map')
        mapOrigin.current = nodeId ? `journey-ai-practice-${id}` : `journey-topic-${id}`;
      focusAfterRender.current = { groupId: id, nodeId };
      update((previous) => ({
        ...previous,
        activeGroupId: id,
        view: 'study',
        depthByGroup:
          nodeId && !catalog.groups[id].variants.standard.stepIds.includes(nodeId)
            ? { ...previous.depthByGroup, [id]: 'deep' }
            : previous.depthByGroup,
      }));
      if (prefs.view !== 'map') setQuery('');
      if (catalog.stages.find((stage) => stage.id === catalog.groups[id].stageId)?.optional)
        setShowOptional(true);
      navigate(`${location.pathname}${location.search}#${encodeURIComponent(nodeId || id)}`, {
        replace: true,
      });
    },
    [catalog, update, navigate, location.pathname, location.search, prefs.view],
  );

  const onDepth = useCallback(
    (id: string, depth: Depth) => {
      setUndo({ id, previous: prefs.depthByGroup[id] || 'standard' });
      startTransition(() => {
        update((previous) => ({
          ...previous,
          depthByGroup: { ...previous.depthByGroup, [id]: depth },
        }));
        setAnnouncement(
          `${catalog.groups[id].title}: modo ${depthNames[depth]}, ${
            projectBranch(catalog, id, depth).length
          } passos disponíveis.`,
        );
      });
    },
    [catalog, prefs.depthByGroup, update],
  );

  const onNode = useCallback(
    (id: string, checked: boolean) => {
      update((previous) => ({
        ...previous,
        completedNodeIds: checked
          ? [...new Set([...previous.completedNodeIds, id])]
          : previous.completedNodeIds.filter((value) => value !== id),
      }));
      setAnnouncement(
        `${catalog.nodes[id].title}: ${checked ? 'conclusão registrada' : 'conclusão desmarcada'}.`,
      );
    },
    [catalog, update],
  );

  const onResource = useCallback(
    (id: string, checked: boolean) => {
      update((previous) => ({
        ...previous,
        studiedResourceIds: checked
          ? [...new Set([...previous.studiedResourceIds, id])]
          : previous.studiedResourceIds.filter((value) => value !== id),
      }));
    },
    [update],
  );

  function switchView(view: LearningView) {
    if (view === 'map' && prefs.view !== 'map')
      mapFocusAfterRender.current = mapOrigin.current || `journey-topic-${prefs.activeGroupId}`;
    if (view === 'map' && location.hash)
      navigate(`${location.pathname}${location.search}`, { replace: true });
    update({ view });
    setAnnouncement(
      view === 'map' && query.trim()
        ? `Mapa exibido com a busca por ${query.trim()} preservada.`
        : `Visualização ${viewLabels[view]} selecionada.`,
    );
  }

  const groupProps = { catalog, prefs, onDepth, onNode, onResource };
  return (
    <div
      className="learning-workspace"
      data-period={period}
      data-effects={prefs.effects ? 'on' : 'off'}
      data-view={prefs.view}
    >
      <div className="learning-shell">
        <header className="learning-intro">
          <Link className="learning-back" to="/">
            <span aria-hidden="true">←</span> Todas as trilhas
          </Link>
          <div className="learning-intro-row">
            <div className="learning-intro-copy">
              <p className="learning-kicker">
                Trilha gratuita · revisada em {curriculumReviewLabel}
              </p>
              <h1>{catalog.title}</h1>
              <p className="learning-audience">{catalog.audience}</p>
              <p className="learning-outcome">
                <span className="learning-outcome-icon" aria-hidden="true">
                  <CheckIcon />
                </span>
                <span>
                  <strong>Ao final:</strong> {catalog.outcome}
                </span>
              </p>
              {catalog.prerequisite && (
                <Link className="related-roadmap" to={catalog.prerequisite.path}>
                  {catalog.prerequisite.label} →
                </Link>
              )}
            </div>
            <div className="learning-progress">
              <div className="learning-progress-ring">
                <ProgressRing percent={summary.percent} />
                <strong>
                  {summary.percent}
                  <span>%</span>
                </strong>
              </div>
              <div className="learning-progress-text">
                <span className="learning-progress-label">Seu percurso essencial</span>
                <span>
                  {summary.done} de {summary.total} passos concluídos
                </span>
                <progress
                  className="sr-only"
                  max={summary.total || 1}
                  value={summary.done}
                  aria-label="Progresso nos objetivos essenciais"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="learning-toolbar">
          <div className="view-controls" role="group" aria-label="Visualização da trilha">
            {views.map((view) => {
              const Icon = viewIcons[view];
              return (
                <button
                  type="button"
                  key={view}
                  aria-pressed={prefs.view === view}
                  aria-controls="learning-view"
                  onClick={() => switchView(view)}
                >
                  {prefs.view === view && (
                    <motion.span
                      className="view-indicator"
                      layoutId="view-indicator"
                      transition={
                        reduced || !prefs.effects
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 420, damping: 34 }
                      }
                      aria-hidden="true"
                    />
                  )}
                  <Icon />
                  <span>{viewLabels[view]}</span>
                </button>
              );
            })}
          </div>
          <label className="learning-search">
            <span className="sr-only">Buscar assunto na trilha</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m16 16 5 5" />
            </svg>
            <input
              type="search"
              placeholder="Buscar um assunto"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <details className="display-options">
            <summary>
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M3 6h8m4 0h2M3 14h2m4 0h8" />
                <circle cx="13" cy="6" r="2" />
                <circle cx="7" cy="14" r="2" />
              </svg>
              <span className="display-options-label">Preferências visuais</span>
            </summary>
            <div>
              <label>
                Luz ambiente
                <select
                  value={prefs.lighting}
                  onChange={(event) =>
                    update({ lighting: event.target.value as StudyPreferences['lighting'] })
                  }
                >
                  <option value="auto">Automática, pelo horário local</option>
                  <option value="day">Dia</option>
                  <option value="night">Noite</option>
                </select>
              </label>
              <label className="option-check">
                <input
                  type="checkbox"
                  checked={prefs.effects}
                  onChange={(event) => update({ effects: event.target.checked })}
                />
                Usar efeitos visuais
              </label>
            </div>
          </details>
        </div>
        <div className="learning-feedback">
          <p role="status" aria-atomic="true">
            {pending ? 'Adaptando o conteúdo…' : announcement}
          </p>
          {undo && (
            <button
              type="button"
              onClick={() => {
                const previous = undo;
                update((prefs) => ({
                  ...prefs,
                  depthByGroup: { ...prefs.depthByGroup, [previous.id]: previous.previous },
                }));
                setUndo(undefined);
                setAnnouncement(`Adaptação de ${catalog.groups[previous.id].title} desfeita.`);
                requestAnimationFrame(() => {
                  const controls = document.getElementById(`steps-${previous.id}`)?.parentElement;
                  const target =
                    controls?.querySelector<HTMLButtonElement>('button[aria-pressed="true"]') ||
                    document.querySelector<HTMLButtonElement>(
                      '.view-controls button[aria-pressed="true"]',
                    );
                  target?.focus({ preventScroll: true });
                });
              }}
            >
              Desfazer adaptação
            </button>
          )}
        </div>
        {storageIssue && (
          <p role="status" className="learning-error">
            Não foi possível ler ou salvar o progresso no navegador. Os registros originais foram
            preservados; exporte seu contexto para guardar esta sessão.
          </p>
        )}

        {prefs.view === 'study' && (
          <div className="journey-return">
            <button type="button" onClick={() => switchView('map')}>
              <span aria-hidden="true">← </span>
              {mapOrigin.current ? 'Voltar ao mapa' : 'Ver todo o trajeto'}
            </button>
            <span>
              {activeStage.optional ? 'Assunto opcional' : 'Percurso obrigatório'}
              {active.ai ? ' · Desenvolvimento com IA' : ''}
            </span>
          </div>
        )}
        <div id="learning-view" className={`learning-view learning-view-${prefs.view}`}>
          {prefs.view === 'study' ? (
            <>
              <aside className="learning-sidebar">
                <div className="sidebar-title">
                  <h2>Seu caminho</h2>
                  <span>{catalog.stages.filter((stage) => !stage.optional).length} etapas</span>
                </div>
                <nav aria-label="Etapas e assuntos">
                  {filteredStages.map((stage) => (
                    <details
                      key={stage.id}
                      className="stage-nav"
                      open={stage.id === active.stageId}
                    >
                      <summary>
                        <span className="stage-number">
                          {String(
                            catalog.stages.findIndex((value) => value.id === stage.id) + 1,
                          ).padStart(2, '0')}
                        </span>
                        <span>{stage.title}</span>
                        {stage.optional && <span className="optional-label">Opcional</span>}
                      </summary>
                      <ol>
                        {stage.groupIds.map((id) => {
                          const group = catalog.groups[id];
                          const completed = group.requiredIds.filter((id) =>
                            prefs.completedNodeIds.includes(id),
                          ).length;
                          const done = completed === group.requiredIds.length;
                          return (
                            <li key={id}>
                              <a
                                href={`#${encodeURIComponent(id)}`}
                                aria-current={id === active.id ? 'step' : undefined}
                                onClick={(event) => {
                                  event.preventDefault();
                                  chooseGroup(id);
                                }}
                              >
                                <span
                                  className={`topic-marker ${done ? 'topic-done' : ''}`}
                                  style={
                                    {
                                      '--p': group.requiredIds.length
                                        ? completed / group.requiredIds.length
                                        : 0,
                                    } as CSSProperties
                                  }
                                  aria-hidden="true"
                                >
                                  {done && <CheckIcon />}
                                </span>
                                <span>{group.title}</span>
                                {done && <span className="sr-only">, concluído</span>}
                              </a>
                            </li>
                          );
                        })}
                      </ol>
                    </details>
                  ))}
                </nav>
                {filteredStages.length === 0 && (
                  <p className="empty-search">
                    Nenhum assunto encontrado. Tente outro termo ou inclua as etapas opcionais.
                  </p>
                )}
                <label className="option-check optional-toggle">
                  <input
                    type="checkbox"
                    checked={showOptional}
                    onChange={(event) => setShowOptional(event.target.checked)}
                  />
                  Mostrar etapas opcionais
                </label>
                <a className="sidebar-export" href={`/read/${catalog.id}/`}>
                  Ler a trilha completa ↗
                </a>
              </aside>
              <section className="learning-focus" aria-labelledby="active-stage-title">
                <div className="focus-context">
                  <h2 id="active-stage-title">{activeStage.title}</h2>
                  <span>
                    Etapa {catalog.stages.indexOf(activeStage) + 1} de {catalog.stages.length}
                  </span>
                </div>
                {activeStage.description && (
                  <p className="stage-description">{activeStage.description}</p>
                )}
                <div className="focus-plane">
                  <GroupContent {...groupProps} group={active} />
                </div>
                <div className="learning-next">
                  <label>
                    Minha familiaridade com {active.title}
                    <select
                      value={prefs.knowledgeByGroup[active.id] || ''}
                      onChange={(event) => {
                        const knowledge = event.target.value as
                          | 'unknown'
                          | 'familiar'
                          | 'demonstrated';
                        update((previous) => ({
                          ...previous,
                          knowledgeByGroup: {
                            ...previous.knowledgeByGroup,
                            [active.id]: knowledge,
                          },
                        }));
                        onDepth(
                          active.id,
                          knowledge === 'unknown'
                            ? 'simple'
                            : knowledge === 'familiar'
                            ? 'standard'
                            : 'deep',
                        );
                      }}
                    >
                      <option value="" disabled>
                        Escolher meu nível
                      </option>
                      <option value="unknown">Estou começando</option>
                      <option value="familiar">Já pratiquei</option>
                      <option value="demonstrated">Consigo demonstrar</option>
                    </select>
                  </label>
                  {upcoming && upcoming !== active.id ? (
                    <button
                      type="button"
                      className="learning-primary"
                      onClick={() => chooseGroup(upcoming)}
                    >
                      Continuar em {catalog.groups[upcoming].title} →
                    </button>
                  ) : (
                    <a href="#study-tools">Organizar próximos estudos ↓</a>
                  )}
                </div>
              </section>
            </>
          ) : prefs.view === 'map' ? (
            <JourneyMap
              catalog={catalog}
              prefs={prefs}
              query={query}
              onSelect={chooseGroup}
              onClearQuery={() => setQuery('')}
            />
          ) : (
            <section className="learning-overview" aria-labelledby="overview-title">
              <div className="overview-heading">
                <div>
                  <h2 id="overview-title">Seu conteúdo, em sequência</h2>
                  <p>As conclusões são compartilhadas entre as três visualizações.</p>
                </div>
                <label className="option-check">
                  <input
                    type="checkbox"
                    checked={showOptional}
                    onChange={(event) => setShowOptional(event.target.checked)}
                  />
                  Mostrar etapas opcionais
                </label>
              </div>
              {filteredStages.length === 0 && (
                <p className="empty-search">
                  Nenhum assunto encontrado. Tente outro termo ou inclua as etapas opcionais.
                </p>
              )}
              <ol className="path-list">
                {filteredStages.map((stage) => (
                  <li
                    key={stage.id}
                    className={`path-stage ${stage.optional ? 'path-optional' : ''}`}
                  >
                    <header>
                      <span className="path-step" aria-hidden="true">
                        {String(
                          catalog.stages.findIndex((value) => value.id === stage.id) + 1,
                        ).padStart(2, '0')}
                      </span>
                      <div>
                        <h2>{stage.title}</h2>
                        {stage.description && <p>{stage.description}</p>}
                        {stage.optional && (
                          <span className="optional-label">Aprofundamento opcional</span>
                        )}
                      </div>
                    </header>
                    {stage.groupIds.map((id) => (
                      <GroupContent
                        key={id}
                        {...groupProps}
                        group={catalog.groups[id]}
                        animated={false}
                      />
                    ))}
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>

        {planIssue && (
          <p role="status" className="learning-error">
            {planIssue}
          </p>
        )}
        <StudyTools
          catalog={catalog}
          prefs={prefs}
          update={update}
          plan={plan}
          setPlan={setPlan}
          onSelect={chooseGroup}
        />
        <footer className="learning-data-links">
          <span>Conteúdo aberto · Progresso no seu navegador</span>
          <nav aria-label="Formatos da trilha">
            <a href={`/data/${catalog.id}.json`}>JSON</a>
            <a href={`/data/${catalog.id}.md`}>Markdown</a>
            <a href={`/read/${catalog.id}/`}>Leitura completa</a>
            <button
              type="button"
              disabled={exporting}
              onClick={async () => {
                setExporting(true);
                try {
                  await downloadVisualization(`trilha-${catalog.id}-${prefs.view}.png`);
                  setAnnouncement('Imagem da visualização exportada.');
                } catch (error) {
                  setAnnouncement(
                    error instanceof Error
                      ? error.message
                      : 'Não foi possível gerar a imagem. Use JSON ou Markdown.',
                  );
                } finally {
                  setExporting(false);
                }
              }}
            >
              {exporting ? 'Gerando imagem…' : 'Baixar visualização em PNG'}
            </button>
            {onExportNotes && (
              <button
                type="button"
                onClick={async () => {
                  try {
                    await onExportNotes();
                    setAnnouncement('Anotações exportadas.');
                  } catch {
                    setAnnouncement('Não foi possível exportar as anotações. Tente novamente.');
                  }
                }}
              >
                Exportar anotações
              </button>
            )}
          </nav>
        </footer>
      </div>
    </div>
  );
}
