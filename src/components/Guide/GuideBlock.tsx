import { PiInfo, PiLightbulb, PiWarning } from 'react-icons/pi';
import { GuideBlock } from '../../guides/types';
import { Checklist } from './Checklist';
import { CodeBlock } from './CodeBlock';
import {
  ComplexityChart,
  JoinDiagrams,
  LayoutDemo,
  Pyramid,
  ScriptTimelines,
  SequenceDiagram,
} from './diagrams';
import { Inline } from './inline';

const callouts = {
  tip: { label: 'Dica', Icon: PiLightbulb },
  warning: { label: 'Atenção', Icon: PiWarning },
  note: { label: 'Observação', Icon: PiInfo },
};

export function GuideBlockView({ block, guideId }: { block: GuideBlock; guideId: string }) {
  switch (block.type) {
    case 'text':
      return (
        <p className="guide-text">
          <Inline text={block.text} />
        </p>
      );
    case 'list': {
      const List = block.ordered ? 'ol' : 'ul';
      return (
        <List className="guide-list" data-ordered={block.ordered || undefined}>
          {block.items.map((item) => (
            <li key={item}>
              <Inline text={item} />
            </li>
          ))}
        </List>
      );
    }
    case 'callout': {
      const { label, Icon } = callouts[block.tone];
      return (
        <aside className="guide-callout" data-tone={block.tone}>
          <Icon aria-hidden="true" />
          <div>
            <p className="guide-callout-title">{block.title || label}</p>
            <p>
              <Inline text={block.text} />
            </p>
          </div>
        </aside>
      );
    }
    case 'code':
      return (
        <CodeBlock
          language={block.language}
          code={block.code}
          caption={block.caption}
          output={block.output}
        />
      );
    case 'steps':
      return (
        <ol className="guide-steps">
          {block.items.map((item, index) => (
            <li key={item.title}>
              <span className="guide-step-number" aria-hidden="true">
                {index + 1}
              </span>
              <div>
                <h3>
                  <Inline text={item.title} />
                </h3>
                <p>
                  <Inline text={item.text} />
                </p>
                {item.code && <CodeBlock language="terminal" code={item.code} compact />}
              </div>
            </li>
          ))}
        </ol>
      );
    case 'cards':
      return (
        <ul className="guide-panels" data-columns={block.columns || 2}>
          {block.items.map((item) => (
            <li key={item.title} className="guide-panel">
              {item.label && <p className="guide-panel-label">{item.label}</p>}
              <h3>
                <Inline text={item.title} />
              </h3>
              <p>
                <Inline text={item.text} />
              </p>
              {item.points && (
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>
                      <Inline text={point} />
                    </li>
                  ))}
                </ul>
              )}
              {item.code && <CodeBlock language="exemplo" code={item.code} compact />}
            </li>
          ))}
        </ul>
      );
    case 'table':
      return (
        <div className="guide-table" role="region" aria-label={block.caption} tabIndex={0}>
          <table>
            <caption>{block.caption}</caption>
            <thead>
              <tr>
                {block.head.map((cell) => (
                  <th key={cell} scope="col">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join('|')}>
                  {row.map((cell, index) =>
                    index === 0 ? (
                      <th key={index} scope="row">
                        <Inline text={cell} />
                      </th>
                    ) : (
                      <td key={index}>
                        <Inline text={cell} />
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'terms':
      return (
        <dl className="guide-terms">
          {block.items.map((item) => (
            <div key={item.term}>
              <dt>
                <Inline text={item.term} />
              </dt>
              <dd>
                <Inline text={item.text} />
              </dd>
            </div>
          ))}
        </dl>
      );
    case 'sequence':
      return <SequenceDiagram block={block} />;
    case 'scripts':
      return <ScriptTimelines block={block} />;
    case 'complexity':
      return <ComplexityChart block={block} />;
    case 'joins':
      return <JoinDiagrams block={block} />;
    case 'pyramid':
      return <Pyramid block={block} />;
    case 'layout':
      return <LayoutDemo block={block} />;
    case 'checklist':
      return <Checklist guideId={guideId} listId={block.id} items={block.items} />;
  }
}
