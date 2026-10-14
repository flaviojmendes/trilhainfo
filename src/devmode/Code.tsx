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

// Every token color keeps at least 4.5:1 against the panel background (#0b0d13).
const theme: Record<string, CSSProperties> = {
  'code[class*="language-"]': { color: '#f2f4f8', fontFamily: mono, direction: 'ltr' },
  'pre[class*="language-"]': { color: '#f2f4f8', fontFamily: mono, direction: 'ltr' },
  comment: { color: '#9aa5b8', fontStyle: 'italic' },
  prolog: { color: '#9aa5b8' },
  doctype: { color: '#9aa5b8' },
  punctuation: { color: '#c4cddb' },
  keyword: { color: '#ff8ab5' },
  tag: { color: '#ff8ab5' },
  atrule: { color: '#ff8ab5' },
  important: { color: '#ff8ab5', fontWeight: 'bold' },
  string: { color: '#6ee7c8' },
  char: { color: '#6ee7c8' },
  'attr-value': { color: '#6ee7c8' },
  'template-string': { color: '#6ee7c8' },
  url: { color: '#6ee7c8' },
  inserted: { color: '#6ee7c8' },
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
  operator: { color: '#e2e8f0' },
  entity: { color: '#e2e8f0' },
  regex: { color: '#ffb3a1' },
  deleted: { color: '#ff9b9b' },
  // Line numbers also carry the `comment` class, and class styles win over lineNumberStyle.
  linenumber: { color: '#7e899c', fontStyle: 'normal' },
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
