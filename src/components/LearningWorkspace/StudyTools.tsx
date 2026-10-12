import { useRef, useState } from 'react';
import {
  downloadJSON,
  exportStudyContext,
  generateStudyPlan,
  tutorPrompt,
  validateStudyPlan,
} from '../../learning/agents';
import { RoadmapCatalog, StudyPlan, StudyPreferences } from '../../learning/types';
import LearningPrompt from '../LearningPrompt';

export function StudyTools({
  catalog,
  prefs,
  update,
  plan,
  setPlan,
  onSelect,
}: {
  catalog: RoadmapCatalog;
  prefs: StudyPreferences;
  update: (change: Partial<StudyPreferences>) => void;
  plan?: StudyPlan;
  setPlan: (plan: StudyPlan | undefined) => void;
  onSelect: (groupId: string) => void;
}) {
  const [preview, setPreview] = useState<StudyPlan>();
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [previousPlan, setPreviousPlan] = useState<{ value?: StudyPlan }>();
  const fileRef = useRef<HTMLInputElement>(null);
  const proposeRef = useRef<HTMLButtonElement>(null);
  const undoRef = useRef<HTMLButtonElement>(null);

  function propose() {
    try {
      const next = validateStudyPlan(generateStudyPlan(catalog, prefs), catalog, prefs);
      setPreview(next);
      setError('');
      setNotice(
        next.weeks.length
          ? 'Plano pronto para revisar. As durações são estimativas ajustáveis.'
          : 'Você já concluiu os objetivos selecionados. Escolha um aprofundamento para continuar.',
      );
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Não foi possível montar o plano.');
    }
  }

  async function importPlan(file?: File) {
    if (!file) return;
    try {
      if (file.size > 1_000_000) throw new Error('Escolha um arquivo JSON de até 1 MB.');
      const proposal = validateStudyPlan(JSON.parse(await file.text()), catalog, prefs);
      setPreview(proposal);
      setError('');
      setNotice('Plano importado. Revise as semanas antes de aplicar.');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Não foi possível ler o plano.');
      setPreview(undefined);
    } finally {
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  function apply() {
    if (!preview) return;
    try {
      const checked = validateStudyPlan(preview, catalog, prefs);
      setPreviousPlan({ value: plan });
      setPlan(checked);
      setPreview(undefined);
      setError('');
      setNotice('Plano aplicado. Seu progresso e a trilha original foram preservados.');
      requestAnimationFrame(() => document.getElementById('plan-title')?.focus());
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Revise o plano.');
    }
  }

  const displayed = preview || plan;
  return (
    <details className="study-tools" id="study-tools">
      <summary>
        <span>Organizar meus estudos</span>
        <span className="tools-hint">Objetivo, plano e assistente de IA</span>
      </summary>
      <div className="study-tools-body">
        <div className="study-profile">
          <label>
            Meu objetivo
            <textarea
              rows={2}
              maxLength={2000}
              value={prefs.goal}
              onChange={(event) => update({ goal: event.target.value })}
            />
          </label>
          <label>
            Minutos por semana
            <input
              key={prefs.weeklyMinutes}
              type="number"
              min={30}
              max={2400}
              step={1}
              defaultValue={prefs.weeklyMinutes}
              onBlur={(event) => {
                const value = event.target.valueAsNumber;
                const minutes = Number.isFinite(value)
                  ? Math.max(30, Math.min(2400, Math.round(value)))
                  : prefs.weeklyMinutes;
                event.target.value = String(minutes);
                update({ weeklyMinutes: minutes });
              }}
            />
          </label>
        </div>
        <p>
          O plano considera seu progresso, conhecimento declarado e profundidade escolhida. As
          durações abaixo são estimativas de planejamento.
        </p>
        <div className="tools-actions">
          <button ref={proposeRef} type="button" className="learning-primary" onClick={propose}>
            Montar meu plano
          </button>
          <button
            type="button"
            onClick={() => {
              downloadJSON(
                `trilha-${catalog.id}-contexto.json`,
                exportStudyContext(catalog, prefs),
              );
              setNotice('Contexto exportado com o catálogo completo e seu progresso.');
            }}
          >
            Exportar contexto para IA
          </button>
          <button type="button" onClick={() => fileRef.current?.click()}>
            Importar plano da IA
          </button>
          <input
            ref={fileRef}
            type="file"
            tabIndex={-1}
            accept="application/json,.json"
            className="sr-only"
            aria-label="Arquivo de plano de estudos"
            onChange={(event) => {
              importPlan(event.target.files?.[0]);
            }}
          />
        </div>
        <p className="learning-footnote">
          Seu objetivo e progresso ficam no navegador. A exportação baixa um arquivo pessoal;
          compartilhe-o com o assistente que você escolher.
        </p>
        <details className="agent-prompt">
          <summary>Preparar um pedido para meu assistente</summary>
          <LearningPrompt
            prompt={tutorPrompt(catalog, prefs)}
            label={`plano de ${catalog.title}`}
          />
        </details>
        <p role="status" aria-atomic="true">
          {notice}
        </p>
        {error && (
          <p role="alert" className="learning-error">
            {error}
          </p>
        )}
        {displayed &&
          displayed.weeks.some(
            (week) =>
              week.steps.reduce((sum, step) => sum + step.estimatedMinutes, 0) >
              prefs.weeklyMinutes,
          ) && (
            <p role="status" className="learning-error">
              Seu plano excede a disponibilidade atual. Monte uma nova proposta para redistribuir as
              semanas.
            </p>
          )}
        {displayed && (
          <section className="plan-preview" aria-labelledby="plan-title">
            <div className="plan-heading">
              <h2 id="plan-title" tabIndex={-1}>
                {preview ? 'Revise seu plano' : 'Seu plano de estudos'}
              </h2>
              <button
                type="button"
                onClick={() => downloadJSON(`trilha-${catalog.id}-plano.json`, displayed)}
              >
                Baixar plano
              </button>
            </div>
            {displayed.weeks.length === 0 && <p>Não há passos pendentes neste recorte.</p>}
            {displayed.weeks.map((week, index) => (
              <details key={index} className="plan-week" open={index === 0}>
                <summary>
                  {week.title} ·{' '}
                  {week.steps.reduce((total, step) => total + step.estimatedMinutes, 0)} min
                  estimados
                </summary>
                <ol>
                  {week.steps.map((step) => {
                    const node = catalog.nodes[step.nodeId];
                    const group = catalog.groups[node.groupId];
                    return (
                      <li key={node.id}>
                        <div className="plan-step-heading">
                          <strong>
                            {group.title} · {node.title}
                          </strong>
                          <span>{step.estimatedMinutes} min</span>
                        </div>
                        <p>{step.successCriteria}</p>
                        {step.resourceIds.map((id) => (
                          <a
                            key={id}
                            href={catalog.resources[id].url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {catalog.resources[id].title}
                          </a>
                        ))}
                        {group && (
                          <button
                            type="button"
                            onClick={() => {
                              if (!group.variants.standard.stepIds.includes(node.id))
                                update({
                                  depthByGroup: { ...prefs.depthByGroup, [group.id]: 'deep' },
                                });
                              onSelect(group.id);
                            }}
                          >
                            Estudar {group.title}
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </details>
            ))}
            <div className="tools-actions">
              {preview && (
                <>
                  <button type="button" className="learning-primary" onClick={apply}>
                    Aplicar plano
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPreview(undefined);
                      setNotice('Prévia descartada.');
                      requestAnimationFrame(() => proposeRef.current?.focus());
                    }}
                  >
                    Descartar prévia
                  </button>
                </>
              )}
              {!preview && plan && (
                <button
                  type="button"
                  onClick={() => {
                    setPreviousPlan({ value: plan });
                    setPlan(undefined);
                    setNotice('Plano removido. Seu progresso continua salvo.');
                    requestAnimationFrame(() => undoRef.current?.focus());
                  }}
                >
                  Remover plano
                </button>
              )}
            </div>
          </section>
        )}
        {previousPlan && (
          <div className="tools-actions">
            <button
              ref={undoRef}
              type="button"
              onClick={() => {
                setPlan(previousPlan.value);
                setPreviousPlan(undefined);
                setPreview(undefined);
                setNotice('Alteração do plano desfeita.');
                requestAnimationFrame(() => proposeRef.current?.focus());
              }}
            >
              Desfazer alteração do plano
            </button>
          </div>
        )}
      </div>
    </details>
  );
}
