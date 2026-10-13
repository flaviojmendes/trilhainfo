import * as Dialog from '@radix-ui/react-dialog';
import {
  Fragment,
  KeyboardEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { Code } from './Code';
import { extractRules } from './cssRules';
import { toDisplayJSON } from './json';
import { isRecording, NetworkEntry, networkEntries, subscribeNetwork } from './network';
import { DevEntry, registry, Source } from './registry';
import { DevComponentId, devTitles } from './titles';
import './devpanel.css';

const repository = 'https://github.com/flaviojmendes/trilhainfo';

type TabId = 'notes' | 'code' | 'css' | 'network' | 'data';
const tabs: TabId[] = ['notes', 'code', 'css', 'network', 'data'];
const tabLabels: Record<TabId, string> = {
  notes: 'Como funciona',
  code: 'Código',
  css: 'CSS',
  network: 'Rede',
  data: 'Dados',
};

const statusNames: Record<number, string> = {
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  204: 'No Content',
  304: 'Not Modified',
  400: 'Bad Request',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  422: 'Unprocessable Entity',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
};

function Inline({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/(`[^`]+`)/)
        .map((part, index) =>
          part.length > 2 && part.startsWith('`') && part.endsWith('`') ? (
            <code key={index}>{part.slice(1, -1)}</code>
          ) : (
            part
          ),
        )}
    </>
  );
}

function Loading() {
  return (
    <p className="dev-muted" role="status">
      Carregando…
    </p>
  );
}

const sources = new Map<string, Promise<string>>();

function loadSource(file: Source): Promise<string> {
  let promise = sources.get(file.path);
  if (!promise) {
    promise = file.load().then((module) => module.default.trimEnd());
    promise.catch(() => sources.delete(file.path));
    sources.set(file.path, promise);
  }
  return promise;
}

function useSource(file: Source): { text?: string; failed?: boolean } {
  const [state, setState] = useState<{ path: string; text?: string; failed?: boolean }>({
    path: file.path,
  });
  useEffect(() => {
    let live = true;
    loadSource(file).then(
      (text) => live && setState({ path: file.path, text }),
      () => live && setState({ path: file.path, failed: true }),
    );
    return () => {
      live = false;
    };
  }, [file]);
  return state.path === file.path ? state : {};
}

function shortPath(path: string) {
  return path.split('/').slice(-2).join('/');
}

function shortUrl(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.origin === window.location.origin ? parsed.pathname + parsed.search : parsed.href;
  } catch {
    return url;
  }
}

function pretty(body: string): { text: string; language: 'json' | 'text' } {
  try {
    return { text: JSON.stringify(JSON.parse(body), null, 2), language: 'json' };
  } catch {
    return { text: body || '(vazia)', language: 'text' };
  }
}

const kb = (bytes: number) =>
  `${(bytes / 1024).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} KB`;

function Toolbar({
  title,
  text,
  meta,
  href,
}: {
  title: string;
  text?: string;
  meta?: string;
  href?: string;
}) {
  const [status, setStatus] = useState('');
  function copy() {
    if (text === undefined) return;
    const writing = navigator.clipboard?.writeText(text);
    if (!writing) return setStatus('Não foi possível copiar.');
    writing.then(
      () => setStatus('Copiado.'),
      () => setStatus('Não foi possível copiar.'),
    );
  }
  return (
    <div className="dev-toolbar">
      <code className="dev-toolbar-path">
        {title.split('/').map((part, index) => (
          <Fragment key={index}>
            {index > 0 && (
              <>
                /<wbr />
              </>
            )}
            {part}
          </Fragment>
        ))}
      </code>
      {meta && <span className="dev-muted">{meta}</span>}
      <span className="dev-toolbar-actions">
        {text !== undefined && (
          <button type="button" onClick={copy}>
            Copiar
          </button>
        )}
        {href && (
          <a href={href} target="_blank" rel="noreferrer">
            Ver no GitHub<span className="sr-only"> (abre em nova aba)</span>
          </a>
        )}
      </span>
      <span className="dev-toolbar-status" role="status">
        {status}
      </span>
    </div>
  );
}

function FilePicker({
  paths,
  index,
  onPick,
  label,
}: {
  paths: string[];
  index: number;
  onPick: (index: number) => void;
  label: string;
}) {
  if (paths.length < 2) return null;
  return (
    <div className="dev-files" role="group" aria-label={label}>
      {paths.map((path, i) => (
        <button key={path} type="button" aria-pressed={i === index} onClick={() => onPick(i)}>
          {shortPath(path)}
        </button>
      ))}
    </div>
  );
}

function SourceView({ files }: { files: Source[] }) {
  const [index, setIndex] = useState(0);
  const file = files[index];
  const { text, failed } = useSource(file);
  return (
    <>
      <FilePicker
        paths={files.map((source) => source.path)}
        index={index}
        onPick={setIndex}
        label="Arquivos deste componente"
      />
      <Toolbar
        title={file.path}
        text={text}
        meta={text === undefined ? undefined : `${text.split('\n').length} linhas`}
        href={`${repository}/blob/main/${file.path}`}
      />
      {failed ? (
        <p className="dev-muted">Não foi possível carregar este arquivo agora.</p>
      ) : text === undefined ? (
        <Loading />
      ) : (
        <Code code={text} language={file.language} label={`Código de ${file.path}`} lineNumbers />
      )}
    </>
  );
}

function StyleView({ styles }: { styles: DevEntry['styles'] }) {
  const [index, setIndex] = useState(0);
  const style = styles[index];
  const { text, failed } = useSource(style.file);
  const rules = useMemo(
    () => (text === undefined ? [] : extractRules(text, style.needles)),
    [text, style],
  );
  const name = style.file.path.split('/').pop();
  const extracted = rules
    .map((rule) => `/* ${name}, linha ${rule.line} */\n${rule.text}`)
    .join('\n\n');
  return (
    <>
      <FilePicker
        paths={styles.map((item) => item.file.path)}
        index={index}
        onPick={setIndex}
        label="Arquivos de estilo"
      />
      <p className="dev-hint">
        Regras de <code>{style.file.path}</code> cujo seletor menciona{' '}
        {style.needles.map((needle, i) => (
          <span key={needle}>
            {i > 0 && ', '}
            <code>{needle}</code>
          </span>
        ))}
        .
      </p>
      <Toolbar
        title={style.file.path}
        text={text === undefined ? undefined : extracted}
        meta={text === undefined ? undefined : `${rules.length} regras`}
        href={`${repository}/blob/main/${style.file.path}${rules[0] ? `#L${rules[0].line}` : ''}`}
      />
      {failed ? (
        <p className="dev-muted">Não foi possível carregar este arquivo agora.</p>
      ) : text === undefined ? (
        <Loading />
      ) : (
        <Code code={extracted} language="css" label={`CSS de ${style.file.path}`} />
      )}
    </>
  );
}

function RequestItem({ request }: { request: NetworkEntry }) {
  const status =
    request.status !== undefined
      ? `${request.status} ${request.statusText || statusNames[request.status] || ''}`.trim()
      : request.error || 'Aguardando resposta…';
  const tone =
    request.error || (request.status !== undefined && request.status >= 400)
      ? 'error'
      : request.status !== undefined
      ? 'ok'
      : 'pending';
  const sent = request.requestBody === undefined ? undefined : pretty(request.requestBody);
  const received = request.responseBody === undefined ? undefined : pretty(request.responseBody);
  return (
    <li className="dev-request" data-tone={tone}>
      <details>
        <summary>
          <span className="dev-method">{request.method}</span>
          <span className="dev-request-url">{shortUrl(request.url)}</span>
          <span className="dev-request-status">{status}</span>
          <span className="dev-muted">
            {request.duration !== undefined && `${request.duration} ms · `}
            <time dateTime={new Date(request.at).toISOString()}>
              {new Date(request.at).toLocaleTimeString('pt-BR')}
            </time>
          </span>
        </summary>
        <p className="dev-muted dev-break">
          <code>{request.url}</code>
        </p>
        {sent && (
          <>
            <h5>Corpo enviado</h5>
            <Code code={sent.text} language={sent.language} label="Corpo enviado" />
          </>
        )}
        {received ? (
          <>
            <h5>Resposta{request.contentType ? ` (${request.contentType})` : ''}</h5>
            <Code code={received.text} language={received.language} label="Resposta" />
          </>
        ) : (
          !request.error && <p className="dev-muted">A resposta aparece aqui quando chegar.</p>
        )}
      </details>
    </li>
  );
}

interface LoadedModule {
  name: string;
  duration: number;
  transfer: number;
  size: number;
}

function readModules(match: RegExp): LoadedModule[] {
  if (typeof performance === 'undefined' || typeof performance.getEntriesByType !== 'function')
    return [];
  return (performance.getEntriesByType('resource') as PerformanceResourceTiming[])
    .filter((entry) => match.test(entry.name))
    .map((entry) => ({
      name: shortUrl(entry.name),
      duration: Math.round(entry.duration),
      transfer: entry.transferSize,
      size: entry.decodedBodySize,
    }));
}

function ModulesView({ match, label }: NonNullable<DevEntry['modules']>) {
  const [modules, setModules] = useState(() => readModules(match));
  useEffect(() => {
    if (typeof PerformanceObserver === 'undefined') return undefined;
    const observer = new PerformanceObserver(() => setModules(readModules(match)));
    try {
      observer.observe({ type: 'resource', buffered: true });
    } catch {
      return undefined;
    }
    return () => observer.disconnect();
  }, [match]);
  return (
    <>
      <h4 className="dev-subhead">{label}</h4>
      {modules.length ? (
        <ul className="dev-modules">
          {modules.map((module, index) => (
            <li key={`${module.name}-${index}`}>
              <code>{module.name}</code>
              <span className="dev-muted">
                {module.duration} ms ·{' '}
                {module.transfer ? `${kb(module.transfer)} pela rede` : 'do cache'}
                {module.size ? ` · ${kb(module.size)} descompactado` : ''}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="dev-muted">O navegador ainda não registrou nenhum módulo.</p>
      )}
    </>
  );
}

function NetworkView({ entry, requests }: { entry: DevEntry; requests: NetworkEntry[] }) {
  return (
    <>
      {entry.endpoints.length ? (
        <>
          <h4 className="dev-subhead">Chamadas que este componente faz</h4>
          <ul className="dev-endpoints">
            {entry.endpoints.map((endpoint) => (
              <li key={endpoint.url}>
                <p className="dev-endpoint-line">
                  {endpoint.method && <span className="dev-method">{endpoint.method}</span>}
                  <code>{endpoint.url}</code>
                </p>
                <p>
                  <Inline text={endpoint.when} />
                </p>
                {endpoint.detail && (
                  <p className="dev-muted">
                    <Inline text={endpoint.detail} />
                  </p>
                )}
                {endpoint.server && (
                  <p className="dev-muted">
                    Quem responde no servidor: <code>{endpoint.server}</code>, na aba Código.
                  </p>
                )}
                {endpoint.replay && (
                  <button
                    type="button"
                    className="dev-action"
                    onClick={() => {
                      fetch(endpoint.replay as string).catch(() => undefined);
                    }}
                  >
                    Fazer a chamada agora
                  </button>
                )}
              </li>
            ))}
          </ul>
          <h4 className="dev-subhead">Registradas nesta visita</h4>
          <p className="dev-muted" role="status">
            {requests.length
              ? `${requests.length} ${requests.length === 1 ? 'chamada' : 'chamadas'}.`
              : 'Nenhuma chamada ainda.'}
          </p>
          {!requests.length && (
            <p className="dev-muted">
              {isRecording()
                ? 'Chamadas feitas antes de ligar o modo desenvolvedor não aparecem aqui. Recarregue a página para ver tudo desde o início.'
                : 'O gravador de rede está desligado.'}
            </p>
          )}
          {requests.length > 0 && (
            <ol className="dev-requests">
              {requests.map((request) => (
                <RequestItem key={request.id} request={request} />
              ))}
            </ol>
          )}
        </>
      ) : (
        <p className="dev-muted">
          Este componente não faz chamadas de rede. O que ele mostra já veio no JavaScript da página
          ou está salvo no seu navegador.
        </p>
      )}
      {entry.modules && <ModulesView {...entry.modules} />}
    </>
  );
}

function DataView({ data }: { data: unknown }) {
  const text = useMemo(() => (data === undefined ? undefined : toDisplayJSON(data)), [data]);
  if (text === undefined)
    return (
      <p className="dev-muted">
        Este componente não recebe dados: tudo o que ele mostra está no próprio código.
      </p>
    );
  return (
    <>
      <p className="dev-hint">
        Os dados que o componente está usando agora. Funções aparecem como <code>ƒ nome()</code>.
      </p>
      <Toolbar title="dados ao vivo" text={text} meta={`${text.split('\n').length} linhas`} />
      <Code code={text} language="json" label="Dados do componente" />
    </>
  );
}

export interface PanelProps {
  id: DevComponentId;
  label?: string;
  data?: unknown;
  active: boolean;
  inDialog?: boolean;
  onExpand?: () => void;
}

export default function DevPanel({
  id,
  label,
  data,
  active,
  inDialog = false,
  onExpand,
}: PanelProps) {
  const entry = registry[id];
  const uid = useId().replace(/:/g, '');
  const [tab, setTab] = useState<TabId>('notes');
  const heading = useRef<HTMLHeadingElement>(null);
  const tabButtons = useRef<Partial<Record<TabId, HTMLButtonElement | null>>>({});
  const all = useSyncExternalStore(subscribeNetwork, networkEntries, networkEntries);
  const requests = useMemo(
    () =>
      all.filter((request) => entry.endpoints.some((endpoint) => endpoint.match.test(request.url))),
    [all, entry],
  );

  useEffect(() => {
    if (active) heading.current?.focus();
  }, [active]);

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>) {
    const index = tabs.indexOf(tab);
    const next =
      event.key === 'ArrowRight'
        ? tabs[(index + 1) % tabs.length]
        : event.key === 'ArrowLeft'
        ? tabs[(index - 1 + tabs.length) % tabs.length]
        : event.key === 'Home'
        ? tabs[0]
        : event.key === 'End'
        ? tabs[tabs.length - 1]
        : undefined;
    if (!next) return;
    event.preventDefault();
    setTab(next);
    tabButtons.current[next]?.focus();
  }

  const Heading = inDialog ? 'h2' : 'h3';
  const title = (
    <Heading ref={heading} id={`${uid}-title`} tabIndex={-1} className="dev-panel-title">
      {devTitles[id]}
      {label && <span className="dev-panel-label">{label}</span>}
    </Heading>
  );

  return (
    <section
      className={`dev-panel${inDialog ? ' dev-panel-wide' : ''}`}
      aria-labelledby={`${uid}-title`}
    >
      <header className="dev-panel-head">
        <div>
          <p className="dev-panel-eyebrow">
            <span aria-hidden="true">{'</>'}</span> Como é feito
          </p>
          {inDialog ? <Dialog.Title asChild>{title}</Dialog.Title> : title}
        </div>
        {onExpand && (
          <button type="button" className="dev-action" onClick={onExpand}>
            Expandir<span className="sr-only"> em tela cheia</span>
          </button>
        )}
      </header>
      <div className="dev-tabs" role="tablist" aria-label="Partes do componente">
        {tabs.map((item) => (
          <button
            key={item}
            ref={(element) => {
              tabButtons.current[item] = element;
            }}
            type="button"
            role="tab"
            id={`${uid}-tab-${item}`}
            aria-selected={tab === item}
            aria-controls={`${uid}-panel-${item}`}
            tabIndex={tab === item ? 0 : -1}
            onClick={() => setTab(item)}
            onKeyDown={onTabKey}
          >
            {tabLabels[item]}
            {item === 'network' && requests.length > 0 && (
              <span className="dev-tab-count">
                {requests.length}
                <span className="sr-only"> {requests.length === 1 ? 'chamada' : 'chamadas'}</span>
              </span>
            )}
          </button>
        ))}
      </div>
      {tabs.map((item) => (
        <div
          key={item}
          role="tabpanel"
          id={`${uid}-panel-${item}`}
          aria-labelledby={`${uid}-tab-${item}`}
          className="dev-tabpanel"
          hidden={tab !== item}
          tabIndex={0}
        >
          {tab === item && item === 'notes' && (
            <>
              <p className="dev-lead">
                <Inline text={entry.summary} />
              </p>
              <ul className="dev-notes">
                {entry.notes.map((note) => (
                  <li key={note}>
                    <Inline text={note} />
                  </li>
                ))}
              </ul>
              <h4 className="dev-subhead">Arquivos</h4>
              <ul className="dev-file-list">
                {entry.files.map((file) => (
                  <li key={file.path}>
                    <code>{file.path}</code>
                  </li>
                ))}
              </ul>
            </>
          )}
          {tab === item && item === 'code' && <SourceView files={entry.files} />}
          {tab === item && item === 'css' && <StyleView styles={entry.styles} />}
          {tab === item && item === 'network' && <NetworkView entry={entry} requests={requests} />}
          {tab === item && item === 'data' && <DataView data={data} />}
        </div>
      ))}
    </section>
  );
}
