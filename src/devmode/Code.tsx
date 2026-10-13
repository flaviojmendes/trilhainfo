import { CSSProperties } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('json', json);

export type CodeLanguage = 'tsx' | 'typescript' | 'css' | 'json' | 'text';

const mono = "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace";

// Every token color keeps at least 4.5:1 against the panel background (#0d0a0c).
const theme: Record<string, CSSProperties> = {
  'code[class*="language-"]': { color: '#f4eef2', fontFamily: mono, direction: 'ltr' },
  'pre[class*="language-"]': { color: '#f4eef2', fontFamily: mono, direction: 'ltr' },
  comment: { color: '#a99aa3', fontStyle: 'italic' },
  prolog: { color: '#a99aa3' },
  doctype: { color: '#a99aa3' },
  punctuation: { color: '#cdbfc8' },
  keyword: { color: '#ff83c5' },
  tag: { color: '#ff83c5' },
  atrule: { color: '#ff83c5' },
  important: { color: '#ff83c5', fontWeight: 'bold' },
  string: { color: '#91e4c6' },
  char: { color: '#91e4c6' },
  'attr-value': { color: '#91e4c6' },
  'template-string': { color: '#91e4c6' },
  url: { color: '#91e4c6' },
  inserted: { color: '#91e4c6' },
  function: { color: '#ffd28a' },
  'class-name': { color: '#ffd28a' },
  selector: { color: '#ffd28a' },
  number: { color: '#c9b6ff' },
  boolean: { color: '#c9b6ff' },
  constant: { color: '#c9b6ff' },
  symbol: { color: '#c9b6ff' },
  property: { color: '#9fd3ff' },
  'attr-name': { color: '#9fd3ff' },
  variable: { color: '#9fd3ff' },
  builtin: { color: '#9fd3ff' },
  operator: { color: '#e8dde4' },
  entity: { color: '#e8dde4' },
  regex: { color: '#ffb3a1' },
  deleted: { color: '#ff9b9b' },
  // Line numbers also carry the `comment` class, and class styles win over lineNumberStyle.
  linenumber: { color: '#8f7f89', fontStyle: 'normal' },
};

const lineNumberStyle = (code: string): CSSProperties => ({
  minWidth: `${String(code.split('\n').length).length + 0.5}em`,
  paddingRight: '1.25em',
  textAlign: 'right',
  userSelect: 'none',
});

export function Code({
  code,
  language,
  label,
  lineNumbers = false,
}: {
  code: string;
  language: CodeLanguage;
  label: string;
  lineNumbers?: boolean;
}) {
  return (
    <div className="dev-code" role="region" aria-label={label} tabIndex={0}>
      {language === 'text' ? (
        <pre>
          <code>{code}</code>
        </pre>
      ) : (
        <SyntaxHighlighter
          language={language}
          style={theme}
          showLineNumbers={lineNumbers}
          lineNumberStyle={lineNumberStyle(code)}
          customStyle={{ margin: 0, padding: '14px 16px', background: 'transparent' }}
        >
          {code}
        </SyntaxHighlighter>
      )}
    </div>
  );
}
