import { useEffect, useState } from 'react';
import { PiCheck, PiCopy } from 'react-icons/pi';
import { Inline, plain } from './inline';

export function CodeBlock({
  language,
  code,
  caption,
  output,
  compact = false,
}: {
  language: string;
  code: string;
  caption?: string;
  output?: string;
  compact?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <figure className="guide-code" data-compact={compact || undefined}>
      <div className="guide-code-bar">
        <span>{caption ? <Inline text={caption} /> : language}</span>
        <button type="button" onClick={copy} aria-label={`Copiar código ${language}`}>
          {copied ? <PiCheck aria-hidden="true" /> : <PiCopy aria-hidden="true" />}
          <span aria-hidden="true">{copied ? 'Copiado' : 'Copiar'}</span>
        </button>
        <span className="sr-only" role="status">
          {copied ? 'Código copiado' : ''}
        </span>
      </div>
      <pre role="region" aria-label={`Código: ${caption ? plain(caption) : language}`} tabIndex={0}>
        <code>{code}</code>
      </pre>
      {output && (
        <div className="guide-code-output">
          <span>Resultado</span>
          <pre role="region" aria-label="Resultado" tabIndex={0}>
            {output}
          </pre>
        </div>
      )}
    </figure>
  );
}
