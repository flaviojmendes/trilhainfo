import { CSSProperties, useId, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { compareSpecificity, contrastRatio, parseHex, specificity } from '../../lessons/tools';
import { CodeBlock } from '../Guide/CodeBlock';
import { Block } from './context';

function Range({
  label,
  value,
  min,
  max,
  unit = 'px',
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit?: string;
  onChange: (value: number) => void;
}) {
  const id = useId();
  return (
    <div className="lesson-range">
      <label htmlFor={id}>
        {label} <output htmlFor={id}>{value + unit}</output>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}

function Choice<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="lesson-choice">
      <legend>{label}</legend>
      <div>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function BoxModel() {
  const [width, setWidth] = useState(160);
  const [padding, setPadding] = useState(16);
  const [border, setBorder] = useState(4);
  const [margin, setMargin] = useState(16);
  const [sizing, setSizing] = useState<'content-box' | 'border-box'>('content-box');
  const content = sizing === 'border-box' ? Math.max(width - 2 * padding - 2 * border, 0) : width;
  const visible = content + 2 * padding + 2 * border;
  const scale = Math.min(1, 300 / (visible + 2 * margin));
  return (
    <figure className="lesson-lab lesson-box">
      <div className="lesson-lab-controls">
        <Range label="width" value={width} min={60} max={240} onChange={setWidth} />
        <Range label="padding" value={padding} min={0} max={40} onChange={setPadding} />
        <Range label="border" value={border} min={0} max={16} onChange={setBorder} />
        <Range label="margin" value={margin} min={0} max={40} onChange={setMargin} />
        <Choice
          label="box-sizing"
          options={['content-box', 'border-box'] as const}
          value={sizing}
          onChange={setSizing}
        />
      </div>
      <div className="lesson-lab-stage" aria-hidden="true">
        <div className="lesson-box-margin" style={{ padding: margin * scale }}>
          <span className="lesson-box-tag">margin</span>
          <div className="lesson-box-border" style={{ padding: border * scale }}>
            <div className="lesson-box-padding" style={{ padding: padding * scale }}>
              <span className="lesson-box-tag">padding</span>
              <div className="lesson-box-content" style={{ width: content * scale }}>
                {content}px
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="lesson-box-math" aria-live="polite">
        <p>
          Largura visível: <strong>{visible}px</strong> = {content} (conteúdo) + {2 * padding}{' '}
          (padding dos dois lados) + {2 * border} (borda dos dois lados).
        </p>
        <p>
          Espaço ocupado na página, com a margem: <strong>{visible + 2 * margin}px</strong>.
          {sizing === 'content-box'
            ? ' Com content-box, o width vale só para o conteúdo: padding e borda somam por fora.'
            : ' Com border-box, o width já inclui padding e borda: a caixa fica do tamanho que você pediu.'}
        </p>
      </figcaption>
      <CodeBlock
        language="css"
        compact
        code={`.caixa {\n  box-sizing: ${sizing};\n  width: ${width}px;\n  padding: ${padding}px;\n  border: ${border}px solid;\n  margin: ${margin}px;\n}`}
      />
    </figure>
  );
}

const flexOptions = {
  direction: ['row', 'column', 'row-reverse'] as const,
  justify: [
    'flex-start',
    'center',
    'flex-end',
    'space-between',
    'space-around',
    'space-evenly',
  ] as const,
  align: ['stretch', 'flex-start', 'center', 'flex-end'] as const,
  wrap: ['nowrap', 'wrap'] as const,
};
const gridTemplates = [
  '1fr 1fr 1fr',
  '1fr 2fr',
  '200px 1fr',
  'repeat(auto-fill, minmax(110px, 1fr))',
] as const;
const sizes = [56, 88, 64, 104, 72, 60];

export function LayoutLab({ block }: { block: Block<'layoutLab'> }) {
  const reduced = useReducedMotion();
  const [direction, setDirection] = useState<(typeof flexOptions.direction)[number]>('row');
  const [justify, setJustify] = useState<(typeof flexOptions.justify)[number]>('flex-start');
  const [align, setAlign] = useState<(typeof flexOptions.align)[number]>('stretch');
  const [wrap, setWrap] = useState<(typeof flexOptions.wrap)[number]>('nowrap');
  const [template, setTemplate] = useState<(typeof gridTemplates)[number]>('1fr 1fr 1fr');
  const [span, setSpan] = useState(1);
  const [gap, setGap] = useState(8);
  const [count, setCount] = useState(block.mode === 'flex' ? 4 : 6);
  const flex = block.mode === 'flex';
  const container: CSSProperties = flex
    ? {
        display: 'flex',
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        flexWrap: wrap,
        gap,
      }
    : { display: 'grid', gridTemplateColumns: template, gap };
  const code = flex
    ? `.container {\n  display: flex;\n  flex-direction: ${direction};\n  justify-content: ${justify};\n  align-items: ${align};\n  flex-wrap: ${wrap};\n  gap: ${gap}px;\n}`
    : `.container {\n  display: grid;\n  grid-template-columns: ${template};\n  gap: ${gap}px;\n}${
        span > 1 ? `\n\n.item-1 {\n  grid-column: span ${span};\n}` : ''
      }`;
  const transition = reduced
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 380, damping: 32 };
  return (
    <figure className="lesson-lab lesson-layout-lab" data-mode={block.mode}>
      <div className="lesson-lab-controls">
        {flex ? (
          <>
            <Choice
              label="flex-direction"
              options={flexOptions.direction}
              value={direction}
              onChange={setDirection}
            />
            <Choice
              label="justify-content"
              options={flexOptions.justify}
              value={justify}
              onChange={setJustify}
            />
            <Choice
              label="align-items"
              options={flexOptions.align}
              value={align}
              onChange={setAlign}
            />
            <Choice label="flex-wrap" options={flexOptions.wrap} value={wrap} onChange={setWrap} />
          </>
        ) : (
          <>
            <Choice
              label="grid-template-columns"
              options={gridTemplates}
              value={template}
              onChange={setTemplate}
            />
            <Range
              label="item 1 ocupa colunas"
              value={span}
              min={1}
              max={3}
              unit=""
              onChange={setSpan}
            />
          </>
        )}
        <Range label="gap" value={gap} min={0} max={32} onChange={setGap} />
        <Range label="itens" value={count} min={2} max={flex ? 8 : 9} unit="" onChange={setCount} />
      </div>
      <div className="lesson-lab-stage">
        {flex && (
          <p className="lesson-axis" data-direction={direction} aria-hidden="true">
            eixo principal {direction === 'column' ? '↓' : direction === 'row-reverse' ? '←' : '→'}
          </p>
        )}
        <div className="lesson-layout-container" style={container} aria-hidden="true">
          {Array.from({ length: count }, (_, index) => (
            <motion.span
              key={index}
              layout
              transition={transition}
              className="lesson-layout-item"
              style={
                flex
                  ? {
                      [direction === 'column' ? 'minHeight' : 'minWidth']:
                        sizes[index % sizes.length] / (direction === 'column' ? 2.4 : 1),
                      height:
                        align === 'stretch' || direction === 'column'
                          ? undefined
                          : 28 + (index % 3) * 14,
                    }
                  : { gridColumn: index === 0 && span > 1 ? `span ${span}` : undefined }
              }
            >
              {index + 1}
            </motion.span>
          ))}
        </div>
      </div>
      <CodeBlock language="css" code={code} compact />
    </figure>
  );
}

export function SpecificityLab({ block }: { block: Block<'specificity'> }) {
  const [pair, setPair] = useState<[string, string]>(block.pairs[0] || ['p', '.texto']);
  const scores = pair.map((selector) => specificity(selector || ''));
  const result = compareSpecificity(scores[0], scores[1]);
  return (
    <figure className="lesson-lab lesson-specificity">
      <figcaption className="guide-figcaption">
        Escreva dois seletores para o mesmo elemento e veja qual vence. A pontuação é comparada da
        esquerda para a direita: uma coluna só importa quando as anteriores empatam.
      </figcaption>
      <div className="lesson-specificity-grid">
        {pair.map((selector, index) => {
          const won = index === 0 ? result > 0 : result < 0;
          return (
            <div key={index} className="lesson-specificity-card" data-won={won || undefined}>
              <label>
                Regra {index + 1}
                <input
                  type="text"
                  value={selector}
                  spellCheck={false}
                  autoCapitalize="off"
                  onChange={(event) => {
                    const next = [...pair] as [string, string];
                    next[index] = event.target.value;
                    setPair(next);
                  }}
                />
              </label>
              <dl className="lesson-specificity-score">
                <div>
                  <dt>IDs</dt>
                  <dd>{scores[index][0]}</dd>
                </div>
                <div>
                  <dt>classes, atributos, pseudo-classes</dt>
                  <dd>{scores[index][1]}</dd>
                </div>
                <div>
                  <dt>tags, pseudo-elementos</dt>
                  <dd>{scores[index][2]}</dd>
                </div>
              </dl>
              {won && <p className="lesson-specificity-badge">Vence</p>}
            </div>
          );
        })}
      </div>
      <p className="lesson-specificity-verdict" aria-live="polite">
        {result === 0
          ? 'Empate: vence a regra que aparece por último no CSS.'
          : `A regra ${result > 0 ? 1 : 2} vence: (${scores[result > 0 ? 0 : 1].join(
              ', ',
            )}) é maior que (${scores[result > 0 ? 1 : 0].join(', ')}).`}
      </p>
      {block.pairs.length > 1 && (
        <div className="lesson-specificity-examples">
          <span>Experimente:</span>
          {block.pairs.map((example) => (
            <button
              key={example.join('|')}
              type="button"
              className="lesson-chip"
              onClick={() => setPair(example)}
            >
              <code>{example[0]}</code> × <code>{example[1]}</code>
            </button>
          ))}
        </div>
      )}
    </figure>
  );
}

export function ContrastLab({ block }: { block: Block<'contrast'> }) {
  const [foreground, setForeground] = useState(block.foreground);
  const [background, setBackground] = useState(block.background);
  const valid = parseHex(foreground) && parseHex(background);
  const ratio = valid ? contrastRatio(foreground, background) : 1;
  const checks = [
    { label: 'Texto normal (AA)', min: 4.5 },
    { label: 'Texto grande ou ícone (AA)', min: 3 },
    { label: 'Texto normal (AAA)', min: 7 },
  ];
  const field = (label: string, value: string, set: (value: string) => void) => (
    <label className="lesson-contrast-field">
      {label}
      <span>
        <input
          type="color"
          value={parseHex(value) ? value : '#000000'}
          onChange={(event) => set(event.target.value)}
          aria-label={`${label}: seletor`}
        />
        <input
          type="text"
          value={value}
          spellCheck={false}
          onChange={(event) => set(event.target.value)}
        />
      </span>
    </label>
  );
  return (
    <figure className="lesson-lab lesson-contrast">
      <div className="lesson-lab-controls">
        {field('Cor do texto', foreground, setForeground)}
        {field('Cor do fundo', background, setBackground)}
      </div>
      <div
        className="lesson-contrast-preview"
        style={{
          color: valid ? foreground : undefined,
          background: valid ? background : undefined,
        }}
      >
        <p className="lesson-contrast-big">Texto grande</p>
        <p>
          Um parágrafo comum precisa ser lido por qualquer pessoa, no sol ou numa tela com brilho
          baixo.
        </p>
      </div>
      <figcaption>
        <p className="lesson-contrast-ratio" aria-live="polite">
          Contraste <strong>{ratio.toFixed(2)}:1</strong>
        </p>
        <ul className="lesson-contrast-checks">
          {checks.map((check) => (
            <li key={check.label} data-pass={ratio >= check.min || undefined}>
              {ratio >= check.min ? '✓ passa' : '✗ não passa'} · {check.label}, mínimo {check.min}:1
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
