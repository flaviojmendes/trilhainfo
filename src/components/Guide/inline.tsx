import { Fragment, ReactNode } from 'react';

const marks = /(`[^`]+`|\*\*[^*]+\*\*)/g;

export function Inline({ text }: { text: string }) {
  const parts = text.split(marks).filter(Boolean);
  return (
    <>
      {parts.map((part, index): ReactNode => {
        if (part.startsWith('`') && part.endsWith('`'))
          return <code key={index}>{part.slice(1, -1)}</code>;
        if (part.startsWith('**') && part.endsWith('**'))
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        return <Fragment key={index}>{part}</Fragment>;
      })}
    </>
  );
}

export function plain(text: string): string {
  return text.replace(/`([^`]+)`/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1');
}
