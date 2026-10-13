import { CSSProperties, useId, useState } from 'react';
import { ComplexityId, GuideBlock, JoinKind, ScriptPhase } from '../../guides/types';
import { Inline } from './inline';
import { CodeBlock } from './CodeBlock';

type Block<T extends GuideBlock['type']> = Extract<GuideBlock, { type: T }>;

export function SequenceDiagram({ block }: { block: Block<'sequence'> }) {
  const { actors } = block;
  const n = actors.length;
  return (
    <figure className="guide-seq" style={{ '--n': n } as CSSProperties}>
      <figcaption className="guide-figcaption">
        <Inline text={block.caption} />
      </figcaption>
      <div className="guide-seq-body">
        <div className="guide-seq-actors" aria-hidden="true">
          {actors.map((actor) => (
            <span key={actor}>{actor}</span>
          ))}
        </div>
        <div className="guide-seq-lifelines" aria-hidden="true">
          {actors.map((actor, index) => (
            <span key={actor} style={{ '--i': index } as CSSProperties} />
          ))}
        </div>
        <ol className="guide-seq-steps">
          {block.messages.map((message, index) => {
            const a = Math.min(message.from, message.to);
            const b = Math.max(message.from, message.to);
            const self = a === b;
            const start = self ? (a < n - 1 ? a : a - 1) : a;
            const end = self ? start + 1 : b;
            const direction = self ? 'self' : message.to > message.from ? 'right' : 'left';
            return (
              <li
                key={index}
                className="guide-seq-step"
                data-dir={direction}
                data-tone={message.tone}
                style={{ '--a': a, '--b': b } as CSSProperties}
              >
                <div className="guide-seq-text" style={{ gridColumn: `${start + 1} / ${end + 2}` }}>
                  <span className="guide-seq-index" aria-hidden="true">
                    {index + 1}
                  </span>
                  <span className="guide-seq-route">
                    {self
                      ? actors[message.from]
                      : `${actors[message.from]} → ${actors[message.to]}`}
                  </span>
                  <strong>
                    <Inline text={message.label} />
                  </strong>
                  {message.text && (
                    <p>
                      <Inline text={message.text} />
                    </p>
                  )}
                </div>
                <span className="guide-seq-arrow" aria-hidden="true" />
              </li>
            );
          })}
        </ol>
      </div>
    </figure>
  );
}

const phaseLabels: Record<ScriptPhase, string> = {
  parse: 'Leitura do HTML',
  pause: 'Leitura pausada',
  fetch: 'Download do script',
  exec: 'Execução do script',
};
const phaseShort: Record<ScriptPhase, string> = {
  parse: 'HTML',
  pause: 'pausa',
  fetch: 'download',
  exec: 'execução',
};

function Track({
  label,
  segments,
}: {
  label: string;
  segments: Array<{ phase: ScriptPhase; from: number; to: number }>;
}) {
  return (
    <div className="guide-track">
      <span className="guide-track-label">{label}</span>
      <div className="guide-track-bar">
        {segments.map((segment, index) => (
          <span
            key={index}
            data-phase={segment.phase}
            style={{ left: `${segment.from}%`, width: `${segment.to - segment.from}%` }}
          >
            {segment.to - segment.from >= 14 && phaseShort[segment.phase]}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ScriptTimelines({ block }: { block: Block<'scripts'> }) {
  return (
    <div className="guide-scripts">
      <ul className="guide-legend" aria-label="Legenda das linhas do tempo">
        {(Object.keys(phaseLabels) as ScriptPhase[]).map((phase) => (
          <li key={phase}>
            <span className="guide-swatch" data-phase={phase} aria-hidden="true" />
            {phaseLabels[phase]}
          </li>
        ))}
      </ul>
      {block.variants.map((variant) => (
        <article className="guide-script" key={variant.markup}>
          <header>
            <code>{variant.markup}</code>
            <h3>{variant.title}</h3>
          </header>
          <p>
            <Inline text={variant.text} />
          </p>
          <div className="guide-script-chart" aria-hidden="true">
            <Track label="HTML" segments={variant.html} />
            <Track label="Script" segments={variant.script} />
            <div className="guide-script-axis">
              <span>chegada do HTML</span>
              <span>tempo →</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

const growth: Record<ComplexityId, (n: number) => number> = {
  '1': () => 2.5,
  'log n': (n) => Math.log2(n) * 3,
  n: (n) => n,
  'n log n': (n) => (n * Math.log2(n)) / 2,
  'n²': (n) => (n * n) / 4,
  '2ⁿ': (n) => 2 ** n,
};
const curveColor: Record<ComplexityId, string> = {
  '1': '#91e4c6',
  'log n': '#b9e2cf',
  n: '#e9d6df',
  'n log n': '#ffb3d9',
  'n²': '#ff83c5',
  '2ⁿ': '#f0479d',
};
const chart = { width: 600, height: 300, left: 40, right: 72, top: 30, bottom: 34, n: 20, y: 40 };

function curve(id: ComplexityId) {
  const plotW = chart.width - chart.left - chart.right;
  const plotH = chart.height - chart.top - chart.bottom;
  const x = (n: number) => chart.left + ((n - 1) / (chart.n - 1)) * plotW;
  const y = (value: number) => chart.top + plotH - (Math.min(value, chart.y) / chart.y) * plotH;
  const points: string[] = [];
  let label = { x: x(chart.n) + 8, y: y(growth[id](chart.n)) + 4, anchor: 'start' };
  for (let n = 1; n <= chart.n; n += 0.25) {
    const value = growth[id](n);
    points.push(`${x(n).toFixed(1)},${y(value).toFixed(1)}`);
    if (value >= chart.y) {
      label = { x: x(n), y: chart.top - 10, anchor: 'middle' };
      break;
    }
  }
  return { d: `M${points.join(' L')}`, label };
}

export function ComplexityChart({ block }: { block: Block<'complexity'> }) {
  const [active, setActive] = useState<ComplexityId | null>(null);
  const captionId = useId();
  const plotBottom = chart.height - chart.bottom;
  return (
    <div className="guide-complexity">
      <figure className="guide-chart">
        <svg
          viewBox={`0 0 ${chart.width} ${chart.height}`}
          role="img"
          aria-labelledby={captionId}
          data-active={active || undefined}
        >
          <line
            className="guide-chart-axis"
            x1={chart.left}
            y1={chart.top - 8}
            x2={chart.left}
            y2={plotBottom}
          />
          <line
            className="guide-chart-axis"
            x1={chart.left}
            y1={plotBottom}
            x2={chart.width - chart.right + 8}
            y2={plotBottom}
          />
          <text className="guide-chart-axis-label" x={chart.left} y={chart.height - 8}>
            tamanho da entrada (n) →
          </text>
          <text
            className="guide-chart-axis-label"
            transform={`translate(16 ${plotBottom}) rotate(-90)`}
          >
            operações →
          </text>
          {block.items.map((item) => {
            const { d, label } = curve(item.id);
            return (
              <g
                key={item.id}
                className="guide-chart-curve"
                data-on={active === item.id || undefined}
                style={{ '--c': curveColor[item.id] } as CSSProperties}
              >
                <path d={d} />
                <text x={label.x} y={label.y} textAnchor={label.anchor}>
                  O({item.id})
                </text>
              </g>
            );
          })}
        </svg>
        <figcaption id={captionId} className="guide-figcaption">
          Crescimento de cada complexidade conforme a entrada aumenta. Quanto mais cedo a curva sai
          pelo topo do gráfico, pior o algoritmo escala.
        </figcaption>
      </figure>
      <ul className="guide-complexity-list">
        {block.items.map((item) => (
          <li
            key={item.id}
            onMouseEnter={() => setActive(item.id)}
            onMouseLeave={() => setActive(null)}
            style={{ '--c': curveColor[item.id] } as CSSProperties}
          >
            <h3>
              O({item.id}) <span>{item.name}</span>
            </h3>
            <p>
              <Inline text={item.text} />
            </p>
            <p className="guide-complexity-example">
              <span>Exemplo</span> <Inline text={item.example} />
            </p>
            <CodeBlock language="javascript" code={item.code} compact />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Venn({ kind }: { kind: JoinKind }) {
  const clip = `venn-${useId().replace(/:/g, '')}`;
  const a = { cx: 44, cy: 38, r: 30 };
  const b = { cx: 80, cy: 38, r: 30 };
  return (
    <svg className="guide-venn" viewBox="0 0 124 76" aria-hidden="true">
      <defs>
        <clipPath id={clip}>
          <circle {...a} />
        </clipPath>
      </defs>
      {(kind === 'left' || kind === 'full') && <circle className="guide-venn-fill" {...a} />}
      {(kind === 'right' || kind === 'full') && <circle className="guide-venn-fill" {...b} />}
      <circle className="guide-venn-fill" {...b} clipPath={`url(#${clip})`} />
      <circle className="guide-venn-line" {...a} />
      <circle className="guide-venn-line" {...b} />
      <text x="30" y="42">
        A
      </text>
      <text x="86" y="42">
        B
      </text>
    </svg>
  );
}

export function JoinDiagrams({ block }: { block: Block<'joins'> }) {
  return (
    <div className="guide-joins">
      <p className="guide-joins-key">
        <span>A</span> {block.tables[0]} <span>B</span> {block.tables[1]}
      </p>
      <ul className="guide-join-list">
        {block.items.map((item) => (
          <li key={item.kind} className="guide-panel guide-join">
            <div className="guide-join-text">
              <Venn kind={item.kind} />
              <h3>{item.title}</h3>
              <p>
                <Inline text={item.text} />
              </p>
            </div>
            <CodeBlock language="sql" code={item.sql} output={item.result} compact />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Pyramid({ block }: { block: Block<'pyramid'> }) {
  const last = Math.max(block.levels.length - 1, 1);
  return (
    <figure className="guide-pyramid">
      <figcaption className="guide-figcaption">
        <Inline text={block.caption} />
      </figcaption>
      <div className="guide-pyramid-body">
        <p className="guide-pyramid-axis" aria-hidden="true">
          <span>↑ mais realistas, mais lentos</span>
          <span>↓ mais rápidos, mais baratos</span>
        </p>
        <ol>
          {block.levels.map((level, index) => (
            <li
              key={level.title}
              style={{ '--w': `${40 + (index / last) * 60}%` } as CSSProperties}
            >
              <span className="guide-pyramid-shape">
                <strong>{level.title}</strong>
              </span>
              <p>
                <Inline text={level.text} />
              </p>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}

export function LayoutDemo({ block }: { block: Block<'layout'> }) {
  return (
    <figure className="guide-layout-demo">
      <div className="guide-layout-preview" data-variant={block.variant} aria-hidden="true">
        {block.variant === 'flex' ? (
          <>
            <span>Logo</span>
            <span>Trilhas</span>
            <span>Guias</span>
            <span className="guide-layout-push">Entrar</span>
          </>
        ) : (
          <>
            <span style={{ gridArea: 'topo' }}>topo</span>
            <span style={{ gridArea: 'menu' }}>menu</span>
            <span style={{ gridArea: 'conteudo' }}>conteúdo</span>
            <span style={{ gridArea: 'rodape' }}>rodapé</span>
          </>
        )}
      </div>
      <CodeBlock language="css" code={block.code} compact />
      <figcaption className="guide-figcaption">
        <Inline text={block.caption} />
      </figcaption>
    </figure>
  );
}
