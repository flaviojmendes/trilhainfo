import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { PiArrowCounterClockwise, PiCheckBold, PiCircle, PiConfetti, PiEye } from 'react-icons/pi';
import { recordAnswer } from '../../lessons/progress';
import { Inline } from '../Guide/inline';
import { Block, useLessonId } from './context';

type Language = 'html' | 'css' | 'js';
type Code = Record<Language, string>;
interface LogLine {
  level: 'log' | 'info' | 'warn' | 'error';
  text: string;
}

const labels: Record<Language, string> = { html: 'HTML', css: 'CSS', js: 'JavaScript' };
const reactLabels: Record<Language, string> = { html: 'HTML', css: 'CSS', js: 'React (JSX)' };

const escapeTag = (code: string, tag: string) =>
  code.replace(new RegExp(`</${tag}`, 'gi'), `<\\/${tag}`);
const toScript = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');

function bridge(token: string, mode: 'preview' | 'check') {
  return `(function(){
var token=${toScript(token)},mode=${toScript(mode)};
function send(type,payload){var data={source:'trilha-playground',token:token,type:type};for(var k in payload)data[k]=payload[k];parent.postMessage(data,'*');}
window.__trilhaSend=send;
function format(v){if(typeof v==='string')return v;if(v===null||v===undefined||typeof v==='number'||typeof v==='boolean'||typeof v==='function')return String(v);if(typeof Element!=='undefined'&&v instanceof Element)return '<'+v.tagName.toLowerCase()+'>';if(v instanceof Error)return v.name+': '+v.message;try{return JSON.stringify(v);}catch(e){return String(v);}}
window.__trilhaLogs=[];
if(mode==='check'){['log','info','warn','error'].forEach(function(level){var original=console[level];console[level]=function(){window.__trilhaLogs.push(Array.prototype.slice.call(arguments).map(format).join(' '));original.apply(console,arguments);};});}
if(mode==='preview'){['log','info','warn','error'].forEach(function(level){var original=console[level];console[level]=function(){var args=Array.prototype.slice.call(arguments);send('log',{level:level,text:args.map(format).join(' ')});original.apply(console,arguments);};});
window.addEventListener('error',function(e){send('log',{level:'error',text:e.message||'Erro no script'});});
window.addEventListener('unhandledrejection',function(e){var r=e.reason;send('log',{level:'error',text:'Promise rejeitada: '+format(r&&r.message?r.message:r)});});}
document.addEventListener('submit',function(e){e.preventDefault();if(mode==='preview')send('log',{level:'info',text:'Formulário enviado. Nesta prévia o envio é simulado.'});});
document.addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('a[href]');if(a&&a.getAttribute('href').charAt(0)!=='#'){e.preventDefault();if(mode==='preview')send('log',{level:'info',text:'Link para '+a.getAttribute('href')+'. Nesta prévia a navegação fica bloqueada.'});}});
})();`;
}

export const reactScripts = [
  'https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.development.js',
  'https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.development.js',
  'https://cdn.jsdelivr.net/npm/@babel/standalone@7.26.4/babel.min.js',
];

function checker(tests: string[], delay: number) {
  return `window.addEventListener('load',function(){setTimeout(function(){var tests=${toScript(
    tests,
  )};
Promise.all(tests.map(function(src){try{return Promise.resolve(new Function('return (async function(){'+src+'\\n})()')()).then(function(v){return !!v;},function(){return false;});}catch(e){return Promise.resolve(false);}})).then(function(results){window.__trilhaSend('checks',{results:results});});},${delay});});`;
}

export function buildDocument(
  code: Code,
  token: string,
  mode: 'preview' | 'check',
  tests: string[] = [],
  framework?: 'react',
) {
  const libraries =
    framework === 'react'
      ? reactScripts.map((src) => `<script src="${src}"></script>`).join('')
      : '';
  const script =
    framework === 'react' ? '<script type="text/babel" data-presets="react">' : '<script>';
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><script>${bridge(
    token,
    mode,
  )}</script>${libraries}<style>${escapeTag(code.css, 'style')}</style></head><body>${
    code.html
  }${script}${escapeTag(code.js, 'script')}\n</script>${
    mode === 'check' ? `<script>${checker(tests, framework === 'react' ? 300 : 40)}</script>` : ''
  }</body></html>`;
}

function initialCode(block: Block<'playground'>): Code {
  return { html: block.html || '', css: block.css || '', js: block.js || '' };
}

export function Playground({
  block,
  activityId,
}: {
  block: Block<'playground'>;
  activityId: string;
}) {
  const lessonId = useLessonId();
  const id = useId();
  const token = useMemo(() => `${id}-${Math.random().toString(36).slice(2)}`, [id]);
  const languages = (['html', 'css', 'js'] as Language[]).filter(
    (language) => block[language] !== undefined,
  );
  const [code, setCode] = useState<Code>(() => initialCode(block));
  const [active, setActive] = useState<Language>(languages[0] || 'html');
  const [rendered, setRendered] = useState(code);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [results, setResults] = useState<boolean[]>([]);
  const [width, setWidth] = useState(1024);
  const preview = useRef<HTMLIFrameElement>(null);
  const check = useRef<HTMLIFrameElement>(null);
  const checks = useMemo(() => block.checks || [], [block.checks]);
  const passed = checks.length > 0 && results.length === checks.length && results.every(Boolean);
  const onlyScript = languages.length === 1 && languages[0] === 'js';

  useEffect(() => {
    const timer = window.setTimeout(() => setRendered(code), 400);
    return () => window.clearTimeout(timer);
  }, [code]);

  useEffect(() => {
    setLogs([]);
  }, [rendered]);

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      const data = event.data;
      if (!data || data.source !== 'trilha-playground' || data.token !== token) return;
      if (data.type === 'log' && event.source === preview.current?.contentWindow)
        setLogs((previous) => [
          ...previous.slice(-49),
          { level: data.level, text: String(data.text) },
        ]);
      if (
        data.type === 'checks' &&
        event.source === check.current?.contentWindow &&
        Array.isArray(data.results)
      )
        setResults(data.results.map(Boolean));
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [token]);

  useEffect(() => {
    if (passed) recordAnswer(lessonId, activityId, true);
  }, [passed, lessonId, activityId]);

  const previewDoc = useMemo(
    () => buildDocument(rendered, token, 'preview', [], block.framework),
    [rendered, token, block.framework],
  );
  const checkDoc = useMemo(
    () =>
      checks.length
        ? buildDocument(
            rendered,
            token,
            'check',
            checks.map((item) => item.test),
            block.framework,
          )
        : '',
    [rendered, token, checks, block.framework],
  );
  const lines = Math.max(6, Math.min(18, code[active].split('\n').length + 1));

  return (
    <section
      className="lesson-playground"
      aria-labelledby={`${id}-title`}
      data-passed={passed || undefined}
    >
      <header className="lesson-playground-head">
        <span className="lesson-activity-kind">Mão na massa</span>
        <h3 id={`${id}-title`}>
          <Inline text={block.title} />
        </h3>
        {block.task && (
          <p>
            <Inline text={block.task} />
          </p>
        )}
      </header>
      <div className="lesson-playground-grid" data-script-only={onlyScript || undefined}>
        <div className="lesson-editor">
          <div className="lesson-editor-tabs" role="tablist" aria-label="Arquivos">
            {languages.map((language) => (
              <button
                key={language}
                type="button"
                role="tab"
                aria-selected={active === language}
                aria-controls={`${id}-editor`}
                onClick={() => setActive(language)}
              >
                {(block.framework === 'react' ? reactLabels : labels)[language]}
              </button>
            ))}
            <span className="lesson-editor-actions">
              <button
                type="button"
                onClick={() => {
                  setCode(initialCode(block));
                  setResults([]);
                }}
              >
                <PiArrowCounterClockwise aria-hidden="true" /> Recomeçar
              </button>
              {block.solution && (
                <button
                  type="button"
                  onClick={() => setCode((previous) => ({ ...previous, ...block.solution }))}
                >
                  <PiEye aria-hidden="true" /> Ver uma solução
                </button>
              )}
            </span>
          </div>
          <label className="sr-only" htmlFor={`${id}-editor`}>
            Código {labels[active]}
          </label>
          <textarea
            id={`${id}-editor`}
            className="lesson-editor-input"
            rows={lines}
            value={code[active]}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            onChange={(event) => {
              const value = event.target.value;
              setCode((previous) => ({ ...previous, [active]: value }));
            }}
          />
          <p className="lesson-editor-hint">
            A prévia atualiza enquanto você digita.
            {block.framework === 'react' &&
              ' Na primeira vez, o React leva alguns segundos para carregar.'}
          </p>
        </div>
        <div className="lesson-preview">
          {!onlyScript && (
            <>
              <div className="lesson-preview-bar">
                <span aria-hidden="true" className="lesson-preview-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span>Prévia</span>
                {block.resizable && <span className="lesson-preview-width">{width}px</span>}
              </div>
              {block.resizable && (
                <label className="lesson-preview-range">
                  <span className="sr-only">Largura da tela simulada</span>
                  <input
                    type="range"
                    min={320}
                    max={1024}
                    step={8}
                    value={width}
                    onChange={(event) => setWidth(Number(event.target.value))}
                  />
                </label>
              )}
              <div className="lesson-preview-frame">
                <iframe
                  ref={preview}
                  title={`Prévia: ${block.title}`}
                  sandbox="allow-scripts allow-forms"
                  srcDoc={previewDoc}
                  style={{ height: block.height || 260, width: block.resizable ? width : '100%' }}
                />
              </div>
            </>
          )}
          {onlyScript && (
            <iframe
              ref={preview}
              title={`Execução: ${block.title}`}
              sandbox="allow-scripts"
              srcDoc={previewDoc}
              hidden
            />
          )}
          <div className="lesson-console" data-tall={onlyScript || undefined}>
            <p className="lesson-console-title">Console</p>
            <ol aria-live="polite">
              {logs.length === 0 ? (
                <li className="lesson-console-empty">
                  {onlyScript
                    ? 'Use console.log() para ver valores aqui.'
                    : 'Mensagens do console aparecem aqui.'}
                </li>
              ) : (
                logs.map((line, index) => (
                  <li key={index} data-level={line.level}>
                    {line.text}
                  </li>
                ))
              )}
            </ol>
          </div>
        </div>
      </div>
      {checks.length > 0 && (
        <div className="lesson-checks">
          <p className="lesson-checks-title">
            {passed ? (
              <>
                <PiConfetti aria-hidden="true" /> Missão cumprida!
              </>
            ) : (
              'Objetivos'
            )}
          </p>
          <ul aria-live="polite">
            {checks.map((item, index) => (
              <li key={item.label} data-pass={results[index] || undefined}>
                {results[index] ? (
                  <PiCheckBold aria-hidden="true" />
                ) : (
                  <PiCircle aria-hidden="true" />
                )}
                <span>
                  <Inline text={item.label} />
                </span>
                <span className="sr-only">{results[index] ? ': cumprido' : ': pendente'}</span>
              </li>
            ))}
          </ul>
          <iframe
            ref={check}
            className="lesson-check-frame"
            title="Verificação automática"
            sandbox="allow-scripts allow-forms"
            srcDoc={checkDoc}
            aria-hidden="true"
            tabIndex={-1}
          />
        </div>
      )}
    </section>
  );
}
