import { FormEvent, KeyboardEvent, useEffect, useId, useRef, useState } from 'react';
import {
  PiArrowCounterClockwise,
  PiCheckBold,
  PiCircle,
  PiConfetti,
  PiEye,
  PiPlayFill,
} from 'react-icons/pi';
import { recordAnswer } from '../../lessons/progress';
import { Inline } from '../Guide/inline';
import { Block, useLessonId } from './context';
import { pythonLoaded, PythonRun, runPython } from './pythonRunner';
import { loadSql, runSql, SqlRun } from './sqlRunner';

function RunnerHead({
  id,
  kind,
  title,
  task,
}: {
  id: string;
  kind: string;
  title: string;
  task?: string;
}) {
  return (
    <header className="lesson-playground-head">
      <span className="lesson-activity-kind">{kind}</span>
      <h3 id={`${id}-title`}>
        <Inline text={title} />
      </h3>
      {task && (
        <p>
          <Inline text={task} />
        </p>
      )}
    </header>
  );
}

export function CheckList({
  checks,
  results,
}: {
  checks: Array<{ label: string }>;
  results: boolean[];
}) {
  if (!checks.length) return null;
  const passed = results.length === checks.length && results.every(Boolean);
  return (
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
            {results[index] ? <PiCheckBold aria-hidden="true" /> : <PiCircle aria-hidden="true" />}
            <span>
              <Inline text={item.label} />
            </span>
            <span className="sr-only">{results[index] ? ': cumprido' : ': pendente'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function usePassed(activityId: string, checks: unknown[], results: boolean[]) {
  const lessonId = useLessonId();
  const passed = checks.length > 0 && results.length === checks.length && results.every(Boolean);
  useEffect(() => {
    if (passed) recordAnswer(lessonId, activityId, true);
  }, [passed, lessonId, activityId]);
  return passed;
}

function runOnShortcut(run: () => void) {
  return (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      run();
    }
  };
}

const normalize = (command: string) => command.trim().replace(/\s+/g, ' ');

interface TerminalLine {
  kind: 'intro' | 'command' | 'output' | 'miss' | 'info';
  text: string;
  prompt?: string;
}

export function Terminal({ block, activityId }: { block: Block<'terminal'>; activityId: string }) {
  const lessonId = useLessonId();
  const id = useId();
  const start = (): TerminalLine[] => (block.intro ? [{ kind: 'intro', text: block.intro }] : []);
  const [lines, setLines] = useState<TerminalLine[]>(start);
  const [step, setStep] = useState(0);
  const [value, setValue] = useState('');
  const [misses, setMisses] = useState(0);
  const [totalMisses, setTotalMisses] = useState(0);
  const screen = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const done = step >= block.steps.length;
  const current = block.steps[step];
  const prompt =
    [...block.steps.slice(0, step)].reverse().find((item) => item.prompt)?.prompt ||
    block.prompt ||
    'voce@computador:~$';
  const accepted = current ? [current.command].flat() : [];

  useEffect(() => {
    screen.current?.scrollTo?.({ top: screen.current.scrollHeight });
  }, [lines]);

  useEffect(() => {
    if (done && block.steps.length) recordAnswer(lessonId, activityId, totalMisses === 0);
  }, [done, block.steps.length, lessonId, activityId, totalMisses]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const typed = normalize(value);
    if (!typed || !current) return;
    setValue('');
    if (typed === 'clear') {
      setLines([]);
      return;
    }
    if (typed === 'ajuda' || typed === 'help') {
      setLines((previous) => [
        ...previous,
        { kind: 'command', text: typed, prompt },
        {
          kind: 'info',
          text: `Objetivo: ${current.goal}${current.hint ? `\nDica: ${current.hint}` : ''}`,
        },
      ]);
      return;
    }
    if (accepted.some((command) => normalize(command) === typed)) {
      setLines((previous) => [
        ...previous,
        { kind: 'command', text: typed, prompt },
        ...(current.output ? [{ kind: 'output' as const, text: current.output }] : []),
      ]);
      setStep((previous) => previous + 1);
      setMisses(0);
      return;
    }
    setMisses((previous) => previous + 1);
    setTotalMisses((previous) => previous + 1);
    setLines((previous) => [
      ...previous,
      { kind: 'command', text: typed, prompt },
      {
        kind: 'miss',
        text: `Esse não é o comando deste passo.${current.hint ? ` Dica: ${current.hint}` : ''}`,
      },
    ]);
  }

  return (
    <section
      className="lesson-playground lesson-terminal"
      aria-labelledby={`${id}-title`}
      data-passed={done || undefined}
    >
      <RunnerHead id={id} kind="Terminal guiado" title={block.title} task={block.task} />
      <div className="lesson-terminal-window">
        <div className="lesson-preview-bar">
          <span aria-hidden="true" className="lesson-preview-dots">
            <i />
            <i />
            <i />
          </span>
          <span>Terminal</span>
          <span className="lesson-terminal-progress">
            {Math.min(step, block.steps.length)} de {block.steps.length}
          </span>
        </div>
        {/* Clicking the log is a mouse shortcut to the command input, which is keyboard-reachable. */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
        <div
          ref={screen}
          className="lesson-terminal-screen"
          role="log"
          aria-live="polite"
          aria-label="Saída do terminal"
          onClick={() => input.current?.focus()}
        >
          {lines.map((line, index) => (
            <p key={index} data-kind={line.kind}>
              {line.kind === 'command' && (
                <span className="lesson-terminal-prompt">{line.prompt} </span>
              )}
              {line.text}
            </p>
          ))}
          {!done && (
            <form className="lesson-terminal-input" onSubmit={submit}>
              <label htmlFor={`${id}-command`} className="lesson-terminal-prompt">
                {prompt}
              </label>
              <input
                ref={input}
                id={`${id}-command`}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                aria-describedby={`${id}-goal`}
              />
            </form>
          )}
        </div>
      </div>
      <div className="lesson-terminal-goal" id={`${id}-goal`}>
        {done ? (
          <p role="status">
            <PiConfetti aria-hidden="true" /> Sessão concluída
            {totalMisses === 0 ? ', sem nenhum tropeço.' : '. Errar e tentar de novo faz parte.'}
          </p>
        ) : (
          <>
            <p>
              <strong>
                Passo {step + 1} de {block.steps.length}:
              </strong>{' '}
              <Inline text={current.goal} />
            </p>
            <p className="lesson-editor-hint">
              Digite o comando e aperte Enter. Escreva <code>ajuda</code> para rever o objetivo.
            </p>
          </>
        )}
        <div className="lesson-terminal-actions">
          {!done && misses >= 2 && (
            <button
              type="button"
              onClick={() => {
                setValue(accepted[0]);
                input.current?.focus();
              }}
            >
              <PiEye aria-hidden="true" /> Mostrar o comando
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setLines(start());
              setStep(0);
              setMisses(0);
              setValue('');
            }}
          >
            <PiArrowCounterClockwise aria-hidden="true" /> Recomeçar
          </button>
        </div>
      </div>
    </section>
  );
}

function formatCell(value: unknown) {
  if (value === null || value === undefined) return 'NULL';
  if (value instanceof Uint8Array) return `[${value.length} bytes]`;
  return String(value);
}

export function SqlLab({ block, activityId }: { block: Block<'sql'>; activityId: string }) {
  const id = useId();
  const [query, setQuery] = useState(block.query);
  const [run, setRun] = useState<SqlRun | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'failed'>('idle');
  const checks = block.checks || [];
  const passed = usePassed(activityId, checks, run?.checks || []);

  async function execute(text = query) {
    setStatus('loading');
    try {
      const SQL = await loadSql();
      setRun(
        runSql(
          SQL,
          block.setup,
          text,
          checks.map((check) => check.test),
        ),
      );
      setStatus('idle');
    } catch {
      setStatus('failed');
    }
  }

  useEffect(() => {
    if (!run) execute(block.query);
    // Show the tables and the starter result once, without waiting for a click.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lines = Math.max(4, Math.min(14, query.split('\n').length + 1));
  const rows = run?.result?.rows || [];

  return (
    <section
      className="lesson-playground lesson-sql"
      aria-labelledby={`${id}-title`}
      data-passed={passed || undefined}
    >
      <RunnerHead id={id} kind="SQL ao vivo" title={block.title} task={block.task} />
      {run && run.tables.length > 0 && (
        <details className="lesson-sql-schema" open>
          <summary>Tabelas disponíveis</summary>
          <ul>
            {run.tables.map((table) => (
              <li key={table.name}>
                <code>{table.name}</code>
                <span>{table.columns.join(', ')}</span>
              </li>
            ))}
          </ul>
        </details>
      )}
      <div className="lesson-editor">
        <div className="lesson-editor-tabs">
          <span className="lesson-editor-label">Consulta</span>
          <span className="lesson-editor-actions">
            <button type="button" className="lesson-run" onClick={() => execute()}>
              <PiPlayFill aria-hidden="true" /> Executar
            </button>
            <button
              type="button"
              onClick={() => {
                setQuery(block.query);
                execute(block.query);
              }}
            >
              <PiArrowCounterClockwise aria-hidden="true" /> Recomeçar
            </button>
            {block.solution && (
              <button
                type="button"
                onClick={() => {
                  setQuery(block.solution as string);
                  execute(block.solution);
                }}
              >
                <PiEye aria-hidden="true" /> Ver uma solução
              </button>
            )}
          </span>
        </div>
        <label className="sr-only" htmlFor={`${id}-editor`}>
          Consulta SQL
        </label>
        <textarea
          id={`${id}-editor`}
          className="lesson-editor-input"
          rows={lines}
          value={query}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={runOnShortcut(() => execute())}
        />
        <p className="lesson-editor-hint">
          Ctrl + Enter (ou Cmd + Enter) executa. Cada execução começa com os mesmos dados.
        </p>
      </div>
      <div className="lesson-sql-result" aria-live="polite">
        {status === 'loading' && !run ? (
          <p>Preparando o banco de dados…</p>
        ) : status === 'failed' ? (
          <p data-tone="error">Não foi possível carregar o banco de dados. Recarregue a página.</p>
        ) : run?.error ? (
          <p data-tone="error">{run.error}</p>
        ) : run?.result ? (
          <>
            <p className="lesson-sql-count">
              {rows.length} {rows.length === 1 ? 'linha' : 'linhas'}
              {rows.length > 100 ? ' (mostrando as 100 primeiras)' : ''}
            </p>
            <div className="lesson-sql-table">
              <table>
                <thead>
                  <tr>
                    {run.result.columns.map((column, index) => (
                      <th key={index} scope="col">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(0, 100).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} data-null={cell === null || undefined}>
                          {formatCell(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : run ? (
          <p>
            Comando executado.
            {run.changes > 0 &&
              ` ${run.changes} ${run.changes === 1 ? 'linha alterada' : 'linhas alteradas'}.`}{' '}
            Escreva um SELECT para ver dados.
          </p>
        ) : null}
      </div>
      <CheckList checks={checks} results={run?.checks || []} />
    </section>
  );
}

export function PythonLab({ block, activityId }: { block: Block<'python'>; activityId: string }) {
  const id = useId();
  const [code, setCode] = useState(block.code);
  const [output, setOutput] = useState('');
  const [result, setResult] = useState<PythonRun | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'running' | 'failed'>('idle');
  const checks = block.checks || [];
  const passed = usePassed(activityId, checks, result?.checks || []);
  const escaped = useRef(false);

  async function execute(text = code) {
    setStatus(pythonLoaded() ? 'running' : 'loading');
    setOutput('');
    try {
      const run = await runPython(
        text,
        checks.map((check) => check.test),
        (line) => {
          setStatus('running');
          setOutput((previous) => `${previous}${line}\n`);
        },
      );
      setOutput(run.output);
      setResult(run);
      setStatus('idle');
    } catch {
      setStatus('failed');
    }
  }

  const lines = Math.max(6, Math.min(20, code.split('\n').length + 1));
  const busy = status === 'loading' || status === 'running';

  return (
    <section
      className="lesson-playground lesson-python"
      aria-labelledby={`${id}-title`}
      data-passed={passed || undefined}
    >
      <RunnerHead id={id} kind="Python ao vivo" title={block.title} task={block.task} />
      <div className="lesson-editor">
        <div className="lesson-editor-tabs">
          <span className="lesson-editor-label">programa.py</span>
          <span className="lesson-editor-actions">
            <button type="button" className="lesson-run" disabled={busy} onClick={() => execute()}>
              <PiPlayFill aria-hidden="true" /> Executar
            </button>
            <button
              type="button"
              onClick={() => {
                setCode(block.code);
                setResult(null);
                setOutput('');
              }}
            >
              <PiArrowCounterClockwise aria-hidden="true" /> Recomeçar
            </button>
            {block.solution && (
              <button type="button" onClick={() => setCode(block.solution as string)}>
                <PiEye aria-hidden="true" /> Ver uma solução
              </button>
            )}
          </span>
        </div>
        <label className="sr-only" htmlFor={`${id}-editor`}>
          Código Python
        </label>
        <textarea
          id={`${id}-editor`}
          className="lesson-editor-input"
          rows={lines}
          value={code}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          onChange={(event) => setCode(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              escaped.current = true;
              return;
            }
            const leaving = escaped.current;
            escaped.current = false;
            if (event.key === 'Tab' && !event.shiftKey && !leaving) {
              event.preventDefault();
              const target = event.currentTarget;
              const { selectionStart, selectionEnd } = target;
              const next = `${code.slice(0, selectionStart)}    ${code.slice(selectionEnd)}`;
              setCode(next);
              requestAnimationFrame(() =>
                target.setSelectionRange(selectionStart + 4, selectionStart + 4),
              );
              return;
            }
            runOnShortcut(() => execute())(event);
          }}
        />
        <p className="lesson-editor-hint">
          Ctrl + Enter (ou Cmd + Enter) executa. Tab insere 4 espaços; Esc e depois Tab sai do
          editor.
        </p>
      </div>
      <div className="lesson-console" data-tall>
        <p className="lesson-console-title">Saída</p>
        <div aria-live="polite">
          {status === 'loading' ? (
            <p className="lesson-console-empty">
              Carregando o Python no navegador. Na primeira vez são cerca de 10 MB; depois fica
              guardado.
            </p>
          ) : status === 'failed' ? (
            <p data-level="error">
              Não foi possível carregar o Python. Confira a conexão e tente executar de novo.
            </p>
          ) : (
            <>
              {output ? (
                <pre className="lesson-python-output">{output}</pre>
              ) : (
                !result?.error && (
                  <p className="lesson-console-empty">
                    {result
                      ? 'O programa rodou sem imprimir nada.'
                      : 'Aperte Executar para rodar o código.'}
                  </p>
                )
              )}
              {result?.error && <pre data-level="error">{result.error}</pre>}
            </>
          )}
        </div>
      </div>
      <CheckList checks={checks} results={result?.checks || []} />
    </section>
  );
}
