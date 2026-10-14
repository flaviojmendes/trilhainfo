import { CSSProperties, KeyboardEvent, useEffect, useId, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  PiArrowCounterClockwise,
  PiCaretLeft,
  PiCaretRight,
  PiLightbulbFilament,
  PiPause,
  PiPlay,
  PiSpeakerHigh,
} from 'react-icons/pi';
import { CodeBlock } from '../Guide/CodeBlock';
import { Inline } from '../Guide/inline';
import { Block } from './context';

export function Analogy({ block }: { block: Block<'analogy'> }) {
  return (
    <aside className="lesson-analogy">
      <PiLightbulbFilament aria-hidden="true" />
      <div>
        <p className="lesson-analogy-kicker">Pense assim</p>
        <p className="lesson-analogy-title">
          <Inline text={block.title} />
        </p>
        <p>
          <Inline text={block.text} />
        </p>
      </div>
    </aside>
  );
}

export function Reveal({ block }: { block: Block<'reveal'> }) {
  return (
    <details className="lesson-reveal">
      <summary>
        <span className="lesson-activity-kind">Pare e pense</span>
        <span>
          <Inline text={block.question} />
        </span>
        <span className="lesson-reveal-action" aria-hidden="true">
          Ver resposta
        </span>
      </summary>
      <p>
        <Inline text={block.answer} />
      </p>
    </details>
  );
}

export function Anatomy({ block }: { block: Block<'anatomy'> }) {
  const labeled = block.parts
    .map((part, index) => ({ part, index }))
    .filter(({ part }) => part.label);
  const [active, setActive] = useState(labeled[0]?.index ?? -1);
  const current = block.parts[active];
  return (
    <figure className="lesson-anatomy">
      <figcaption className="guide-figcaption">
        <Inline text={block.caption} />
        <span className="lesson-hint"> Toque nas partes destacadas.</span>
      </figcaption>
      <pre className="lesson-anatomy-code" data-language={block.language}>
        <code>
          {block.parts.map((part, index) =>
            part.label ? (
              <button
                key={index}
                type="button"
                aria-pressed={active === index}
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
              >
                {part.text}
              </button>
            ) : (
              <span key={index}>{part.text}</span>
            ),
          )}
        </code>
      </pre>
      <div className="lesson-anatomy-note" aria-live="polite">
        {current?.label && (
          <motion.div key={active} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
            <p className="lesson-anatomy-label">{current.label}</p>
            {current.note && (
              <p>
                <Inline text={current.note} />
              </p>
            )}
          </motion.div>
        )}
      </div>
    </figure>
  );
}

function useStepper(total: number, delay = 1800) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return;
    if (step >= total - 1) {
      setPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => setStep((value) => value + 1), delay);
    return () => window.clearTimeout(timer);
  }, [playing, step, total, delay]);
  return {
    step,
    playing,
    go: (value: number) => {
      setPlaying(false);
      setStep(Math.max(0, Math.min(total - 1, value)));
    },
    toggle: () => {
      if (!playing && step >= total - 1) setStep(0);
      setPlaying((value) => !value);
    },
  };
}

function StepControls({
  step,
  total,
  playing,
  go,
  toggle,
  label,
}: ReturnType<typeof useStepper> & { total: number; label: string }) {
  return (
    <div className="lesson-stepper" role="group" aria-label={`Controles: ${label}`}>
      <button type="button" onClick={toggle} className="lesson-stepper-play">
        {playing ? <PiPause aria-hidden="true" /> : <PiPlay aria-hidden="true" />}
        {playing ? 'Pausar' : step >= total - 1 ? 'Ver de novo' : 'Reproduzir'}
      </button>
      <button
        type="button"
        onClick={() => go(step - 1)}
        disabled={step === 0}
        aria-label="Passo anterior"
      >
        <PiCaretLeft aria-hidden="true" />
      </button>
      <span className="lesson-stepper-count" aria-live="polite">
        Passo {step + 1} de {total}
      </span>
      <button
        type="button"
        onClick={() => go(step + 1)}
        disabled={step >= total - 1}
        aria-label="Próximo passo"
      >
        <PiCaretRight aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => go(0)}
        disabled={step === 0}
        aria-label="Voltar ao início"
      >
        <PiArrowCounterClockwise aria-hidden="true" />
      </button>
    </div>
  );
}

export function Flow({ block }: { block: Block<'flow'> }) {
  const stepper = useStepper(block.steps.length, 2400);
  const reduced = useReducedMotion();
  const current = block.steps[stepper.step];
  const n = block.actors.length;
  const center = (index: number) => `${((index + 0.5) / n) * 100}%`;
  return (
    <figure className="lesson-flow" style={{ '--n': n } as CSSProperties}>
      <figcaption className="guide-figcaption">
        <Inline text={block.caption} />
      </figcaption>
      <div className="lesson-flow-stage" aria-hidden="true">
        <div className="lesson-flow-actors">
          {block.actors.map((actor, index) => (
            <span
              key={actor}
              data-active={index === current.from || index === current.to || undefined}
            >
              {actor}
            </span>
          ))}
        </div>
        <div className="lesson-flow-wire">
          <motion.span
            key={stepper.step}
            className="lesson-flow-packet"
            data-tone={current.tone}
            initial={{ left: center(current.from), opacity: 0, scale: 0.6 }}
            animate={{
              left: center(current.to),
              opacity: 1,
              scale: current.from === current.to ? [1, 1.35, 1] : 1,
            }}
            transition={{ duration: reduced ? 0 : 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {current.label}
          </motion.span>
        </div>
      </div>
      <ol className="lesson-flow-steps">
        {block.steps.map((item, index) => (
          <li
            key={index}
            data-current={index === stepper.step || undefined}
            hidden={index !== stepper.step}
          >
            <p className="lesson-flow-route">
              <span>{index + 1}</span>
              {item.from === item.to
                ? block.actors[item.from]
                : `${block.actors[item.from]} → ${block.actors[item.to]}`}
            </p>
            <p className="lesson-flow-label">
              <Inline text={item.label} />
            </p>
            <p>
              <Inline text={item.text} />
            </p>
          </li>
        ))}
      </ol>
      <StepControls {...stepper} total={block.steps.length} label={block.caption} />
    </figure>
  );
}

export function Trace({ block }: { block: Block<'trace'> }) {
  const stepper = useStepper(block.steps.length, 2200);
  const lines = useMemo(() => block.code.split('\n'), [block.code]);
  const current = block.steps[stepper.step];
  const memory = useMemo(() => {
    for (let index = stepper.step; index >= 0; index--) {
      const snapshot = block.steps[index].memory;
      if (snapshot) return snapshot;
    }
    return [];
  }, [block.steps, stepper.step]);
  const output = block.steps
    .slice(0, stepper.step + 1)
    .map((step) => step.output)
    .filter((value): value is string => value !== undefined);
  const reduced = useReducedMotion();
  return (
    <figure className="lesson-trace">
      <figcaption className="guide-figcaption">
        <Inline text={block.caption} />
      </figcaption>
      <div className="lesson-trace-grid">
        <pre className="lesson-trace-code" role="region" aria-label="Código" tabIndex={0}>
          <code>
            {lines.map((line, index) => (
              <span
                key={index}
                className="lesson-trace-line"
                data-current={index + 1 === current.line || undefined}
              >
                <span className="lesson-trace-number" aria-hidden="true">
                  {index + 1}
                </span>
                {line || ' '}
                {index + 1 === current.line && <span className="sr-only"> (linha atual)</span>}
              </span>
            ))}
          </code>
        </pre>
        <div className="lesson-trace-side">
          <section aria-label="Memória">
            <p className="lesson-trace-title">Memória</p>
            {memory.length === 0 ? (
              <p className="lesson-trace-empty">vazia</p>
            ) : (
              <ul className="lesson-trace-memory">
                <AnimatePresence initial={false}>
                  {memory.map(([name, value]) => (
                    <motion.li
                      key={name}
                      layout={!reduced}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <span className="lesson-trace-name">{name}</span>
                      <motion.span
                        key={value}
                        className="lesson-trace-value"
                        initial={reduced ? false : { backgroundColor: 'rgba(255,138,181,0.45)' }}
                        animate={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                        transition={{ duration: 1.1 }}
                      >
                        {value}
                      </motion.span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </section>
          <section aria-label="Console">
            <p className="lesson-trace-title">Console</p>
            <pre className="lesson-trace-output">
              {output.length ? (
                output.join('\n')
              ) : (
                <span className="lesson-trace-empty">nada ainda</span>
              )}
            </pre>
          </section>
        </div>
      </div>
      <p className="lesson-trace-note" aria-live="polite">
        <span>Linha {current.line}</span> <Inline text={current.note} />
      </p>
      <StepControls {...stepper} total={block.steps.length} label={block.caption} />
    </figure>
  );
}

export function CodeTabs({ block }: { block: Block<'codeTabs'> }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  function onKey(event: KeyboardEvent) {
    const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (active + delta + block.tabs.length) % block.tabs.length;
    setActive(next);
    refs.current[next]?.focus();
  }
  return (
    <figure className="lesson-tabs">
      <figcaption className="guide-figcaption">
        <Inline text={block.caption} />
      </figcaption>
      <div role="tablist" aria-label={block.caption}>
        {block.tabs.map((tab, index) => (
          <button
            key={tab.label}
            ref={(element) => (refs.current[index] = element)}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-selected={active === index}
            aria-controls={`${id}-panel`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={onKey}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`}>
        <CodeBlock
          language={block.tabs[active].language}
          code={block.tabs[active].code}
          caption={block.tabs[active].label}
          compact
        />
      </div>
    </figure>
  );
}

interface TreeNode {
  label: string;
  kind: 'element' | 'text';
  children: TreeNode[];
}

function buildTree(html: string): TreeNode[] {
  if (typeof DOMParser === 'undefined') return [];
  const document = new DOMParser().parseFromString(html, 'text/html');
  const isDocument = /<html[\s>]/i.test(html);
  const convert = (node: Node): TreeNode | null => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = (node.textContent || '').trim();
      return text
        ? { label: text.length > 32 ? `${text.slice(0, 30)}…` : text, kind: 'text', children: [] }
        : null;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return null;
    const element = node as Element;
    const attributes = Array.from(element.attributes)
      .slice(0, 2)
      .map((attribute) => `${attribute.name}="${attribute.value}"`)
      .join(' ');
    return {
      label: `<${element.tagName.toLowerCase()}${attributes ? ' ' + attributes : ''}>`,
      kind: 'element',
      children: Array.from(element.childNodes)
        .map(convert)
        .filter((child): child is TreeNode => child !== null),
    };
  };
  const roots = isDocument ? [document.documentElement] : Array.from(document.body.childNodes);
  return roots.map(convert).filter((node): node is TreeNode => node !== null);
}

function countNodes(nodes: TreeNode[]): number {
  return nodes.reduce((total, node) => total + 1 + countNodes(node.children), 0);
}

export function DomTree({ block }: { block: Block<'domTree'> }) {
  const tree = useMemo(() => buildTree(block.html), [block.html]);
  const total = useMemo(() => countNodes(tree), [tree]);
  const [visible, setVisible] = useState(total);
  const [building, setBuilding] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => setVisible(total), [total]);
  useEffect(() => {
    if (!building) return;
    if (visible >= total) {
      setBuilding(false);
      return;
    }
    const timer = window.setTimeout(() => setVisible((value) => value + 1), reduced ? 0 : 420);
    return () => window.clearTimeout(timer);
  }, [building, visible, total, reduced]);

  let order = 0;
  const render = (nodes: TreeNode[]): JSX.Element => (
    <ul>
      {nodes.map((node, index) => {
        const position = order++;
        const shown = position < visible;
        const children = node.children.length ? render(node.children) : null;
        return (
          <li
            key={index}
            data-kind={node.kind}
            data-shown={shown || undefined}
            data-new={position === visible - 1 && building ? true : undefined}
          >
            <span className="lesson-tree-node">{node.label}</span>
            {children}
          </li>
        );
      })}
    </ul>
  );

  return (
    <figure className="lesson-tree">
      <figcaption className="guide-figcaption">
        <Inline text={block.caption} />
      </figcaption>
      <div className="lesson-tree-grid">
        <CodeBlock language="html" code={block.html} compact />
        <div className="lesson-tree-view" aria-label="Árvore DOM">
          <p className="lesson-trace-title">Árvore que o navegador monta</p>
          {render(tree)}
        </div>
      </div>
      <div className="lesson-activity-actions">
        <button
          type="button"
          className="lesson-button-quiet"
          onClick={() => {
            setVisible(0);
            setBuilding(true);
          }}
          disabled={building}
        >
          <PiPlay aria-hidden="true" /> Ver o navegador montar a árvore
        </button>
        <span className="sr-only" aria-live="polite">
          {building ? 'Montando a árvore' : ''}
        </span>
      </div>
    </figure>
  );
}

function canSpeak() {
  return (
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    typeof SpeechSynthesisUtterance !== 'undefined'
  );
}

export function ScreenReader({ block }: { block: Block<'screenReader'> }) {
  const [playing, setPlaying] = useState<number | null>(null);
  const [heard, setHeard] = useState<Record<number, number>>({});
  const [voice, setVoice] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (playing === null) return;
    const lines = block.variants[playing].speech;
    const count = heard[playing] || 0;
    if (count >= lines.length) {
      setPlaying(null);
      return;
    }
    if (voice && canSpeak()) {
      const utterance = new SpeechSynthesisUtterance(lines[count]);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.05;
      utterance.onend = () => setHeard((previous) => ({ ...previous, [playing]: count + 1 }));
      window.speechSynthesis.speak(utterance);
      return () => window.speechSynthesis.cancel();
    }
    const timer = window.setTimeout(
      () => setHeard((previous) => ({ ...previous, [playing]: count + 1 })),
      reduced ? 0 : 900,
    );
    return () => window.clearTimeout(timer);
  }, [playing, heard, voice, block.variants, reduced]);

  return (
    <figure className="lesson-reader">
      <figcaption className="guide-figcaption">
        <Inline text={block.caption} />
      </figcaption>
      {canSpeak() && (
        <label className="lesson-reader-voice">
          <input
            type="checkbox"
            checked={voice}
            onChange={(event) => setVoice(event.target.checked)}
          />
          Ouvir com a voz do navegador
        </label>
      )}
      <div className="lesson-reader-grid">
        {block.variants.map((variant, index) => {
          const count = heard[index] || 0;
          const finished = count >= variant.speech.length;
          return (
            <article
              key={variant.label}
              className="lesson-reader-card"
              data-verdict={finished ? variant.verdict : undefined}
            >
              <h3>{variant.label}</h3>
              <CodeBlock language="html" code={variant.code} compact />
              <button
                type="button"
                className="lesson-button-quiet"
                disabled={playing !== null}
                onClick={() => {
                  setHeard((previous) => ({ ...previous, [index]: 0 }));
                  setPlaying(index);
                }}
              >
                <PiSpeakerHigh aria-hidden="true" />{' '}
                {count ? 'Ouvir de novo' : 'Ouvir como um leitor de tela'}
              </button>
              <ol className="lesson-reader-speech" aria-live="polite">
                {variant.speech.slice(0, count).map((line, lineIndex) => (
                  <motion.li
                    key={lineIndex}
                    initial={reduced ? false : { opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    “{line}”
                  </motion.li>
                ))}
              </ol>
              {finished && (
                <p className="lesson-reader-verdict">
                  {variant.verdict === 'good'
                    ? 'Dá para entender e usar.'
                    : 'Falta informação para quem não vê a tela.'}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </figure>
  );
}
