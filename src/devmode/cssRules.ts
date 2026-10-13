export interface CssRule {
  line: number;
  text: string;
}

interface Block {
  prelude: string;
  start: number;
  open: number;
  close: number;
}

function blankComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, (comment) => comment.replace(/[^\n]/g, ' '));
}

function skipString(src: string, index: number, to: number): number {
  const quote = src[index];
  let i = index + 1;
  while (i < to && src[i] !== quote) i += src[i] === '\\' ? 2 : 1;
  return i + 1;
}

function scan(src: string, from: number, to: number): Block[] {
  const blocks: Block[] = [];
  let start = from;
  let i = from;
  while (i < to) {
    const char = src[i];
    if (char === '"' || char === "'") {
      i = skipString(src, i, to);
    } else if (char === ';') {
      start = ++i;
    } else if (char === '{') {
      let depth = 1;
      let j = i + 1;
      while (j < to && depth) {
        if (src[j] === '"' || src[j] === "'") {
          j = skipString(src, j, to);
          continue;
        }
        if (src[j] === '{') depth++;
        else if (src[j] === '}') depth--;
        j++;
      }
      const raw = src.slice(start, i);
      blocks.push({
        prelude: raw.trim(),
        start: start + raw.length - raw.trimStart().length,
        open: i,
        close: j - 1,
      });
      start = i = j;
    } else {
      i++;
    }
  }
  return blocks;
}

/** Returns the rules (and the @media/@supports blocks around them) whose selector mentions a needle. */
export function extractRules(css: string, needles: string[]): CssRule[] {
  const src = blankComments(css);
  const lineStarts = [0];
  for (let i = 0; i < css.length; i++) if (css[i] === '\n') lineStarts.push(i + 1);
  const lineOf = (index: number) => {
    let low = 0;
    let high = lineStarts.length - 1;
    while (low < high) {
      const mid = (low + high + 1) >> 1;
      if (lineStarts[mid] <= index) low = mid;
      else high = mid - 1;
    }
    return low + 1;
  };
  const matches = (prelude: string) => needles.some((needle) => prelude.includes(needle));
  const text = (block: Block) => css.slice(block.start, block.close + 1);

  const rules: CssRule[] = [];
  for (const block of scan(src, 0, src.length)) {
    if (/^@(media|supports|container|layer)\b/.test(block.prelude)) {
      const inner = scan(src, block.open + 1, block.close).filter((rule) => matches(rule.prelude));
      if (inner.length)
        rules.push({
          line: lineOf(inner[0].start),
          text: `${block.prelude} {\n${inner.map((rule) => `  ${text(rule)}`).join('\n')}\n}`,
        });
    } else if (!block.prelude.startsWith('@') && matches(block.prelude)) {
      rules.push({ line: lineOf(block.start), text: text(block) });
    }
  }
  return rules;
}
