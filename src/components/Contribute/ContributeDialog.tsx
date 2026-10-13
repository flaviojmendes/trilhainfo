import { FormEvent, ReactNode, useEffect, useId, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  PiBookOpenText,
  PiCheckCircle,
  PiCode,
  PiGithubLogo,
  PiListPlus,
  PiPlayCircle,
  PiX,
} from 'react-icons/pi';
import { LearningGroup, RoadmapCatalog } from '../../learning/types';
import {
  ContributionLanguage,
  ContributionResourceKind,
  languageLabels,
  resourceKindLabels,
} from '../../contributions/types';
import {
  FieldErrors,
  limits,
  normalizeURL,
  validateDraft,
  youtubeId,
} from '../../contributions/validate';
import { fetchLinkInfo, submitContribution, SubmitResult } from '../../contributions/client';
import { DevFlip } from '../../devmode/DevFlip';
import { Turnstile } from './Turnstile';
import './contribute.css';

type Choice = ContributionResourceKind | 'step';

const choices: Array<{ id: Choice; title: string; hint: string; icon: ReactNode }> = [
  {
    id: 'video',
    title: 'Um vídeo',
    hint: 'YouTube, aula gravada, palestra',
    icon: <PiPlayCircle />,
  },
  {
    id: 'read',
    title: 'Documentação ou artigo',
    hint: 'Guia oficial, tutorial, post',
    icon: <PiBookOpenText />,
  },
  {
    id: 'practice',
    title: 'Exercício ou prática',
    hint: 'Desafio, laboratório, projeto guiado',
    icon: <PiCode />,
  },
  {
    id: 'step',
    title: 'Um passo novo',
    hint: 'Algo que falta estudar neste assunto',
    icon: <PiListPlus />,
  },
];

const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

export function ContributeDialog({
  catalog,
  group,
}: {
  catalog: RoadmapCatalog;
  group: LearningGroup;
}) {
  const [open, setOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setFormKey((key) => key + 1);
      }}
    >
      <DevFlip
        id="contribute"
        label={group.title}
        data={{
          roadmapId: catalog.id,
          groupId: group.id,
          steps: group.variants.deep.stepIds,
          turnstile: Boolean(siteKey),
        }}
      >
        <aside className="group-contribute" aria-label={`Sugerir conteúdo para ${group.title}`}>
          <p>Conhece um vídeo, documentação ou exercício que ajudaria aqui?</p>
          <Dialog.Trigger className="group-contribute-button">Sugerir conteúdo</Dialog.Trigger>
        </aside>
      </DevFlip>
      <Dialog.Portal>
        <Dialog.Overlay className="contribute-overlay" />
        <Dialog.Content className="contribute-dialog">
          <ContributeForm
            key={formKey}
            catalog={catalog}
            group={group}
            onReset={() => setFormKey((key) => key + 1)}
          />
          <Dialog.Close className="contribute-close" aria-label="Fechar">
            <PiX aria-hidden="true" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function ContributeForm({
  catalog,
  group,
  onReset,
}: {
  catalog: RoadmapCatalog;
  group: LearningGroup;
  onReset: () => void;
}) {
  const uid = useId().replace(/:/g, '');
  const fieldId = (field: string) => `${uid}-${field.replace(/\./g, '-')}`;
  const steps = group.variants.deep.stepIds
    .map((id) => catalog.nodes[id])
    .filter((node) => node && node.groupId === group.id);

  const [choice, setChoice] = useState<Choice | undefined>();
  const [nodeId, setNodeId] = useState(steps[0]?.id || '');
  const [url, setURL] = useState('');
  const [title, setTitle] = useState('');
  const [linkKind, setLinkKind] = useState<ContributionResourceKind>('read');
  const [language, setLanguage] = useState<ContributionLanguage | ''>('pt-BR');
  const [free, setFree] = useState(false);
  const [stepTitle, setStepTitle] = useState('');
  const [stepDescription, setStepDescription] = useState('');
  const [reason, setReason] = useState('');
  const [name, setName] = useState('');
  const [github, setGithub] = useState('');
  const [website, setWebsite] = useState('');
  const [token, setToken] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [notice, setNotice] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<SubmitResult | undefined>();
  const summary = useRef<HTMLDivElement>(null);
  const lastLookup = useRef('');

  const isStep = choice === 'step';
  const resourceKind: ContributionResourceKind = isStep ? linkKind : choice || 'read';
  const prefix = isStep ? 'step.resource' : 'resource';
  const error = (field: string) => errors[field];

  function payload() {
    const resource = { kind: resourceKind, title, url, language: language || null };
    const author = { name, github };
    const base = { roadmapId: catalog.id, groupId: group.id, reason, author };
    if (!choice) return base;
    return isStep
      ? {
          ...base,
          kind: 'step',
          step: { title: stepTitle, description: stepDescription, resource },
        }
      : { ...base, kind: 'resource', nodeId, resource };
  }

  async function lookUp() {
    const normalized = normalizeURL(url);
    if (!normalized || !youtubeId(normalized) || lastLookup.current === normalized) return;
    lastLookup.current = normalized;
    if (isStep) setLinkKind('video');
    else if (choice !== 'video') setChoice('video');
    if (title.trim()) return;
    const info = await fetchLinkInfo(normalized);
    if (info && !title.trim()) {
      setTitle(info.title);
      setNotice('Título preenchido a partir do YouTube. Ajuste se precisar.');
    }
  }

  function focusFirst(fields: FieldErrors) {
    const [element] = Object.keys(fields)
      .map((field) => document.getElementById(fieldId(field)))
      .filter((item): item is HTMLElement => item !== null)
      .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
    if (element) {
      const details = element.closest('details');
      if (details) details.open = true;
      element.focus();
    } else summary.current?.focus();
  }

  function localErrors(body: ReturnType<typeof payload>): FieldErrors {
    const checked = validateDraft(body);
    const next: FieldErrors = checked.ok ? {} : { ...checked.errors };
    if (!free) next.free = 'Só incluímos conteúdos gratuitos. Confirme que este é gratuito.';
    if (siteKey && !token) next.turnstile = 'Confirme a verificação antes de enviar.';
    return next;
  }

  // Errors fade as fields are fixed; server errors stay until the user edits something.
  const serverErrorsFor = useRef('');
  useEffect(() => {
    if (!Object.keys(errors).length) return;
    const body = payload();
    if (JSON.stringify(body) === serverErrorsFor.current) return;
    const current = localErrors(body);
    const kept = Object.fromEntries(
      Object.entries(errors).filter(([field]) => current[field] !== undefined),
    );
    if (Object.keys(kept).length !== Object.keys(errors).length) setErrors(kept);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    choice,
    nodeId,
    url,
    title,
    linkKind,
    language,
    free,
    stepTitle,
    stepDescription,
    reason,
    name,
    github,
    token,
  ]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const body = payload();
    const next = localErrors(body);
    serverErrorsFor.current = '';
    setErrors(next);
    if (Object.keys(next).length) return focusFirst(next);

    setSending(true);
    const response = await submitContribution({ ...body, website, turnstileToken: token });
    setSending(false);
    if (response.status === 'invalid') {
      serverErrorsFor.current = JSON.stringify(body);
      setErrors(response.errors);
      setResult(response);
      return focusFirst(response.errors);
    }
    setResult(response);
  }

  if (result && result.status !== 'invalid' && result.status !== 'failed')
    return <Outcome result={result} onReset={onReset} />;

  const errorCount = Object.keys(errors).length;
  const describedBy = (field: string, hint?: string) =>
    [hint, error(field) ? `${fieldId(field)}-error` : ''].filter(Boolean).join(' ') || undefined;
  const fieldError = (field: string) =>
    error(field) ? (
      <p className="contribute-error" id={`${fieldId(field)}-error`}>
        {error(field)}
      </p>
    ) : null;

  return (
    <form className="contribute-form" onSubmit={submit} noValidate>
      <header className="contribute-head">
        <p className="contribute-eyebrow">
          {catalog.title} · {group.title}
        </p>
        <Dialog.Title className="contribute-title">Sugerir conteúdo</Dialog.Title>
        <Dialog.Description className="contribute-lead">
          Sua sugestão vira um pull request público no GitHub. Depois da revisão, ela aparece nesta
          trilha para todo mundo.
        </Dialog.Description>
      </header>

      {(errorCount > 0 || result?.status === 'failed') && (
        <div className="contribute-summary" role="alert" tabIndex={-1} ref={summary}>
          {result?.status === 'failed'
            ? result.message
            : errorCount === 1
            ? 'Revise 1 campo antes de enviar.'
            : `Revise ${errorCount} campos antes de enviar.`}
        </div>
      )}

      <fieldset className="contribute-choices" aria-describedby={describedBy('kind')}>
        <legend>O que você quer sugerir?</legend>
        <div>
          {choices.map((option, index) => (
            <label key={option.id} className="contribute-choice">
              <input
                type="radio"
                name={`${uid}-choice`}
                id={index === 0 ? fieldId('kind') : undefined}
                value={option.id}
                checked={choice === option.id}
                onChange={() => setChoice(option.id)}
              />
              <span className="contribute-choice-icon" aria-hidden="true">
                {option.icon}
              </span>
              <span className="contribute-choice-text">
                <strong>{option.title}</strong>
                <span>{option.hint}</span>
              </span>
            </label>
          ))}
        </div>
        {fieldError('kind')}
      </fieldset>

      {choice && (
        <>
          {!isStep && (
            <fieldset className="contribute-steps" aria-describedby={describedBy('nodeId')}>
              <legend>Em qual passo ele ajuda?</legend>
              {steps.map((step, index) => (
                <label key={step.id}>
                  <input
                    type="radio"
                    name={`${uid}-node`}
                    id={index === 0 ? fieldId('nodeId') : undefined}
                    value={step.id}
                    checked={nodeId === step.id}
                    onChange={() => setNodeId(step.id)}
                  />
                  <span>{step.title}</span>
                </label>
              ))}
              {fieldError('nodeId')}
            </fieldset>
          )}

          {isStep && (
            <div className="contribute-group">
              <Field
                id={fieldId('step.title')}
                label="Nome do passo"
                error={fieldError('step.title')}
              >
                <input
                  id={fieldId('step.title')}
                  value={stepTitle}
                  maxLength={limits.stepTitle[1]}
                  aria-invalid={!!error('step.title')}
                  aria-describedby={describedBy('step.title')}
                  onChange={(event) => setStepTitle(event.target.value)}
                  placeholder="Ex.: Formulários acessíveis"
                />
              </Field>
              <Field
                id={fieldId('step.description')}
                label="O que estudar neste passo"
                hint={`${fieldId('step.description')}-hint`}
                hintText="Uma ou duas frases sobre o que a pessoa aprende ou pratica."
                error={fieldError('step.description')}
              >
                <textarea
                  id={fieldId('step.description')}
                  rows={3}
                  value={stepDescription}
                  maxLength={limits.description[1]}
                  aria-invalid={!!error('step.description')}
                  aria-describedby={describedBy(
                    'step.description',
                    `${fieldId('step.description')}-hint`,
                  )}
                  onChange={(event) => setStepDescription(event.target.value)}
                />
              </Field>
            </div>
          )}

          <div className="contribute-group">
            <p className="contribute-group-title">
              {isStep ? 'Referência principal do passo' : 'O conteúdo'}
            </p>
            <Field
              id={fieldId(`${prefix}.url`)}
              label="Link"
              hint={`${fieldId(`${prefix}.url`)}-hint`}
              hintText="Cole o endereço completo. Para vídeos do YouTube, o título é preenchido sozinho."
              error={fieldError(`${prefix}.url`)}
            >
              <input
                id={fieldId(`${prefix}.url`)}
                type="url"
                inputMode="url"
                autoComplete="url"
                value={url}
                aria-invalid={!!error(`${prefix}.url`)}
                aria-describedby={describedBy(`${prefix}.url`, `${fieldId(`${prefix}.url`)}-hint`)}
                onChange={(event) => setURL(event.target.value)}
                onBlur={lookUp}
                placeholder="https://"
              />
            </Field>
            <Field
              id={fieldId(`${prefix}.title`)}
              label="Título"
              error={fieldError(`${prefix}.title`)}
            >
              <input
                id={fieldId(`${prefix}.title`)}
                value={title}
                maxLength={limits.title[1]}
                aria-invalid={!!error(`${prefix}.title`)}
                aria-describedby={describedBy(`${prefix}.title`)}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Como aparece na trilha"
              />
            </Field>
            <p className="sr-only" role="status">
              {notice}
            </p>
            {notice && (
              <p className="contribute-notice" aria-hidden="true">
                {notice}
              </p>
            )}
            <div className="contribute-row">
              {isStep && (
                <Field id={fieldId('linkKind')} label="Tipo">
                  <select
                    id={fieldId('linkKind')}
                    value={linkKind}
                    onChange={(event) =>
                      setLinkKind(event.target.value as ContributionResourceKind)
                    }
                  >
                    {(Object.keys(resourceKindLabels) as ContributionResourceKind[]).map((kind) => (
                      <option key={kind} value={kind}>
                        {resourceKindLabels[kind]}
                      </option>
                    ))}
                  </select>
                </Field>
              )}
              <Field
                id={fieldId(`${prefix}.language`)}
                label="Idioma"
                error={fieldError(`${prefix}.language`)}
              >
                <select
                  id={fieldId(`${prefix}.language`)}
                  value={language}
                  onChange={(event) => setLanguage(event.target.value as ContributionLanguage | '')}
                >
                  {(Object.keys(languageLabels) as ContributionLanguage[]).map((code) => (
                    <option key={code} value={code}>
                      {languageLabels[code]}
                    </option>
                  ))}
                  <option value="">Outro ou sem fala</option>
                </select>
              </Field>
            </div>
            <label className="contribute-check">
              <input
                id={fieldId('free')}
                type="checkbox"
                checked={free}
                aria-invalid={!!error('free')}
                aria-describedby={describedBy('free')}
                onChange={(event) => setFree(event.target.checked)}
              />
              <span>O conteúdo é gratuito e não exige assinatura paga</span>
            </label>
            {fieldError('free')}
          </div>

          <Field
            id={fieldId('reason')}
            label="Por que isso ajuda quem estuda?"
            hint={`${fieldId('reason')}-hint`}
            hintText="Conte o que o conteúdo explica bem, ou o que falta hoje na trilha."
            error={fieldError('reason')}
          >
            <textarea
              id={fieldId('reason')}
              rows={3}
              value={reason}
              maxLength={limits.reason[1]}
              aria-invalid={!!error('reason')}
              aria-describedby={describedBy('reason', `${fieldId('reason')}-hint`)}
              onChange={(event) => setReason(event.target.value)}
            />
          </Field>

          <details className="contribute-credit">
            <summary>Receber crédito (opcional)</summary>
            <div className="contribute-row">
              <Field id={fieldId('author.name')} label="Seu nome" error={fieldError('author.name')}>
                <input
                  id={fieldId('author.name')}
                  autoComplete="name"
                  value={name}
                  maxLength={limits.name[1]}
                  aria-invalid={!!error('author.name')}
                  aria-describedby={describedBy('author.name')}
                  onChange={(event) => setName(event.target.value)}
                />
              </Field>
              <Field
                id={fieldId('author.github')}
                label="Usuário do GitHub"
                hint={`${fieldId('author.github')}-hint`}
                hintText="Você entra como coautor e acompanha a revisão."
                error={fieldError('author.github')}
              >
                <span className="contribute-prefixed">
                  <PiGithubLogo aria-hidden="true" />
                  <input
                    id={fieldId('author.github')}
                    autoComplete="username"
                    autoCapitalize="none"
                    spellCheck={false}
                    value={github}
                    aria-invalid={!!error('author.github')}
                    aria-describedby={describedBy(
                      'author.github',
                      `${fieldId('author.github')}-hint`,
                    )}
                    onChange={(event) => setGithub(event.target.value)}
                  />
                </span>
              </Field>
            </div>
          </details>

          <Preview
            title={title}
            url={url}
            kind={resourceKind}
            language={language}
            stepTitle={isStep ? stepTitle : undefined}
            stepName={isStep ? undefined : steps.find((step) => step.id === nodeId)?.title}
            author={name || (github ? `@${github.replace(/^@/, '')}` : '')}
          />

          <label className="contribute-honeypot" aria-hidden="true">
            Não preencha
            <input
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
            />
          </label>

          {siteKey && (
            <div id={fieldId('turnstile')} tabIndex={-1}>
              <Turnstile siteKey={siteKey} onToken={setToken} />
              {fieldError('turnstile')}
            </div>
          )}

          <div className="contribute-actions">
            <button type="submit" className="contribute-submit" disabled={sending}>
              {sending ? 'Enviando…' : 'Enviar sugestão'}
            </button>
            <p>A equipe revisa antes de publicar. Não colocamos seu e-mail em lugar nenhum.</p>
          </div>
        </>
      )}
    </form>
  );
}

function Field({
  id,
  label,
  hint,
  hintText,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  hintText?: string;
  error?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="contribute-field">
      <label htmlFor={id}>{label}</label>
      {hint && hintText && (
        <p className="contribute-hint" id={hint}>
          {hintText}
        </p>
      )}
      {children}
      {error}
    </div>
  );
}

function Preview({
  title,
  url,
  kind,
  language,
  stepTitle,
  stepName,
  author,
}: {
  title: string;
  url: string;
  kind: ContributionResourceKind;
  language: ContributionLanguage | '';
  stepTitle?: string;
  stepName?: string;
  author: string;
}) {
  const host = (() => {
    try {
      return new URL(normalizeURL(url) || '').hostname.replace(/^www\./, '');
    } catch {
      return '';
    }
  })();
  return (
    <section className="contribute-preview" aria-label="Prévia da sugestão">
      <p className="contribute-group-title">Como vai aparecer</p>
      <div className="contribute-preview-card">
        <p className="contribute-preview-step">
          {stepTitle !== undefined ? `Novo passo: ${stepTitle || 'Nome do passo'}` : stepName}
        </p>
        <p className="contribute-preview-title">{title || 'Título do conteúdo'}</p>
        <p className="contribute-preview-meta">
          {resourceKindLabels[kind]} ·{' '}
          {language ? languageLabels[language] : 'Idioma não informado'} · Gratuito
          {host ? ` · ${host}` : ''}
        </p>
        <p className="contribute-preview-credit">
          Sugestão {author ? `de ${author}` : 'da comunidade'}
        </p>
      </div>
    </section>
  );
}

function Outcome({ result, onReset }: { result: SubmitResult; onReset: () => void }) {
  return (
    <div className="contribute-outcome" role="status">
      <PiCheckCircle aria-hidden="true" className="contribute-outcome-icon" />
      {result.status === 'sent' && (
        <>
          <Dialog.Title className="contribute-title">Sugestão enviada</Dialog.Title>
          <Dialog.Description className="contribute-lead">
            Abrimos o pull request #{result.pull.number} no GitHub. Quando a revisão terminar, o
            conteúdo aparece nesta trilha.
          </Dialog.Description>
          <a className="contribute-submit" href={result.pull.url} target="_blank" rel="noreferrer">
            Acompanhar no GitHub<span className="sr-only"> (abre em nova aba)</span>
          </a>
        </>
      )}
      {result.status === 'duplicate' && (
        <>
          <Dialog.Title className="contribute-title">Essa sugestão já está em revisão</Dialog.Title>
          <Dialog.Description className="contribute-lead">{result.message}</Dialog.Description>
          <a className="contribute-submit" href={result.pull.url} target="_blank" rel="noreferrer">
            Ver o pull request #{result.pull.number}
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </>
      )}
      {result.status === 'dry-run' && (
        <>
          <Dialog.Title className="contribute-title">Modo de teste</Dialog.Title>
          <Dialog.Description className="contribute-lead">
            O envio ao GitHub não está configurado neste ambiente, então nenhum pull request foi
            aberto. Este é o arquivo que seria proposto em <code>{result.path}</code>:
          </Dialog.Description>
          <pre
            className="contribute-file"
            tabIndex={0}
            role="region"
            aria-label="Arquivo da sugestão"
          >
            {JSON.stringify(result.file, null, 2)}
          </pre>
        </>
      )}
      <button type="button" className="contribute-secondary" onClick={onReset}>
        Sugerir outro conteúdo
      </button>
    </div>
  );
}
