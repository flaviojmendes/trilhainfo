export type Specificity = [number, number, number];

function splitTopLevel(text: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = '';
  for (const char of text) {
    if (char === '(') depth++;
    if (char === ')') depth--;
    if (char === ',' && depth === 0) {
      parts.push(current);
      current = '';
    } else current += char;
  }
  parts.push(current);
  return parts.map((part) => part.trim()).filter(Boolean);
}

const add = (a: Specificity, b: Specificity): Specificity => [
  a[0] + b[0],
  a[1] + b[1],
  a[2] + b[2],
];

export function compareSpecificity(a: Specificity, b: Specificity): number {
  for (let index = 0; index < 3; index++) if (a[index] !== b[index]) return a[index] - b[index];
  return 0;
}

const legacyPseudoElements = ['before', 'after', 'first-line', 'first-letter'];

/**
 * Specificity of one complex selector as (ids, classes/attributes/pseudo-classes, types/pseudo-elements).
 * Follows Selectors Level 4 for :is(), :not(), :has() and :where().
 */
export function specificity(selector: string): Specificity {
  let result: Specificity = [0, 0, 0];
  let index = 0;
  const source = selector.trim();
  const readName = () => {
    const match = /^[\w-]+/.exec(source.slice(index));
    index += match ? match[0].length : 0;
    return match ? match[0] : '';
  };
  const readParens = () => {
    if (source[index] !== '(') return '';
    let depth = 0;
    const start = index;
    for (; index < source.length; index++) {
      if (source[index] === '(') depth++;
      if (source[index] === ')' && --depth === 0) break;
    }
    index++;
    return source.slice(start + 1, index - 1);
  };
  while (index < source.length) {
    const char = source[index];
    if (char === '#') {
      index++;
      readName();
      result = add(result, [1, 0, 0]);
    } else if (char === '.') {
      index++;
      readName();
      result = add(result, [0, 1, 0]);
    } else if (char === '[') {
      index = source.indexOf(']', index) + 1 || source.length;
      result = add(result, [0, 1, 0]);
    } else if (char === ':') {
      const element = source[index + 1] === ':';
      index += element ? 2 : 1;
      const name = readName().toLowerCase();
      const args = readParens();
      if (element || legacyPseudoElements.includes(name)) result = add(result, [0, 0, 1]);
      else if (name === 'where') continue;
      else if (['is', 'not', 'has'].includes(name)) {
        const highest = splitTopLevel(args)
          .map(specificity)
          .sort((a, b) => compareSpecificity(b, a))[0];
        if (highest) result = add(result, highest);
      } else result = add(result, [0, 1, 0]);
    } else if (/[\w-]/.test(char)) {
      readName();
      result = add(result, [0, 0, 1]);
    } else index++;
  }
  return result;
}

function channel(value: number) {
  const scaled = value / 255;
  return scaled <= 0.04045 ? scaled / 12.92 : ((scaled + 0.055) / 1.055) ** 2.4;
}

export function parseHex(hex: string): [number, number, number] | null {
  const match = /^#?([\da-f]{3}|[\da-f]{6})$/i.exec(hex.trim());
  if (!match) return null;
  const digits =
    match[1].length === 3
      ? match[1]
          .split('')
          .map((digit) => digit + digit)
          .join('')
      : match[1];
  return [0, 2, 4].map((start) => parseInt(digits.slice(start, start + 2), 16)) as [
    number,
    number,
    number,
  ];
}

export function luminance(hex: string): number {
  const rgb = parseHex(hex);
  if (!rgb) return 0;
  const [r, g, b] = rgb.map(channel);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG 2 contrast ratio between two colors, from 1 to 21. */
export function contrastRatio(foreground: string, background: string): number {
  const [light, dark] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (light + 0.05) / (dark + 0.05);
}

/** Deterministic shuffle that never returns the original order for two or more items. */
export function stableShuffle<T>(items: T[], seed: string): T[] {
  let state = 0;
  for (const char of seed) state = (Math.imul(state, 31) + char.charCodeAt(0)) | 0;
  const next = () => {
    state = (Math.imul(state ^ (state >>> 15), 2246822507) + 0x9e3779b9) | 0;
    return (state >>> 0) / 4294967296;
  };
  const result = [...items];
  for (let index = result.length - 1; index > 0; index--) {
    const other = Math.floor(next() * (index + 1));
    [result[index], result[other]] = [result[other], result[index]];
  }
  if (result.length > 1 && result.every((item, index) => item === items[index]))
    result.push(result.shift() as T);
  return result;
}

export type FillPart = { kind: 'text'; text: string } | { kind: 'blank'; answers: string[] };

export function parseFill(template: string): FillPart[] {
  return template
    .split(/(\[\[[^\]]+\]\])/)
    .filter(Boolean)
    .map((part) =>
      part.startsWith('[[')
        ? { kind: 'blank', answers: part.slice(2, -2).split('|') }
        : { kind: 'text', text: part },
    );
}

export function fillMatches(value: string, answers: string[]): boolean {
  const normalize = (text: string) => text.trim().replace(/\s+/g, ' ').replace(/;$/, '');
  return answers.some((answer) => normalize(answer) === normalize(value));
}
