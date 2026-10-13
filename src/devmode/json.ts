const maxLength = 200000;
const maxDepth = 10;

function plain(value: unknown, ancestors: object[]): unknown {
  if (typeof value === 'function') return `ƒ ${value.name || 'anônima'}()`;
  if (typeof value === 'bigint') return `${value}n`;
  if (typeof value === 'symbol') return value.toString();
  if (!value || typeof value !== 'object') return value;
  if (ancestors.includes(value)) return '[referência circular]';
  if ('$$typeof' in value) return '[elemento React]';
  if (value instanceof Date) return value.toISOString();
  if (ancestors.length >= maxDepth) return Array.isArray(value) ? '[…]' : '{…}';
  const path = [...ancestors, value];
  if (Array.isArray(value)) return value.map((item) => plain(item, path));
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, plain(item, path)]));
}

/** Pretty JSON for display: tolerates functions, React elements, cycles and shared references. */
export function toDisplayJSON(value: unknown): string {
  const text = JSON.stringify(plain(value, []), null, 2) ?? 'undefined';
  return text.length > maxLength
    ? `${text.slice(0, maxLength)}\n… (${text.length - maxLength} caracteres omitidos)`
    : text;
}
