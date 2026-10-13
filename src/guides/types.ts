export type GuideCategoryId = 'web' | 'apis' | 'dados' | 'operacao' | 'carreira';

export interface GuideCategory {
  id: GuideCategoryId;
  title: string;
  description: string;
}

export type ComplexityId = '1' | 'log n' | 'n' | 'n log n' | 'n²' | '2ⁿ';

export type ScriptPhase = 'parse' | 'pause' | 'fetch' | 'exec';

export type JoinKind = 'inner' | 'left' | 'right' | 'full';

/**
 * Text fields accept two inline marks: `code` and **destaque**.
 * Everything else is plain text, so content never injects HTML.
 */
export type GuideBlock =
  | { type: 'text'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'callout'; tone: 'tip' | 'warning' | 'note'; title?: string; text: string }
  | { type: 'code'; language: string; code: string; caption?: string; output?: string }
  | { type: 'steps'; items: Array<{ title: string; text: string; code?: string }> }
  | {
      type: 'cards';
      columns?: 2 | 3;
      items: Array<{
        label?: string;
        title: string;
        text: string;
        points?: string[];
        code?: string;
      }>;
    }
  | { type: 'table'; caption: string; head: string[]; rows: string[][] }
  | { type: 'terms'; items: Array<{ term: string; text: string }> }
  | {
      type: 'sequence';
      caption: string;
      actors: string[];
      messages: Array<{
        from: number;
        to: number;
        label: string;
        text?: string;
        tone?: 'ok' | 'error';
      }>;
    }
  | {
      type: 'scripts';
      variants: Array<{
        markup: string;
        title: string;
        text: string;
        /** Percent positions on a shared time axis (0–100). */
        html: Array<{ phase: 'parse' | 'pause'; from: number; to: number }>;
        script: Array<{ phase: 'fetch' | 'exec'; from: number; to: number }>;
      }>;
    }
  | {
      type: 'complexity';
      items: Array<{ id: ComplexityId; name: string; text: string; example: string; code: string }>;
    }
  | {
      type: 'joins';
      tables: [string, string];
      items: Array<{ kind: JoinKind; title: string; text: string; sql: string; result: string }>;
    }
  | { type: 'pyramid'; caption: string; levels: Array<{ title: string; text: string }> }
  | { type: 'layout'; variant: 'flex' | 'grid'; caption: string; code: string }
  | { type: 'checklist'; id: string; items: string[] };

export interface GuideSection {
  id: string;
  title: string;
  blocks: GuideBlock[];
}

export interface GuideContent {
  sections: GuideSection[];
  sources?: Array<{ title: string; url: string }>;
}

export interface GuideMeta {
  id: string;
  title: string;
  summary: string;
  category: GuideCategoryId;
  level: 'Iniciante' | 'Intermediário';
  minutes: number;
  /** Roadmap ids where the guide helps. */
  trails: string[];
  /** Catalog group ids that link to the guide from the study view. */
  topics: string[];
  /** A printable image exists at /guides/<id>.jpg. */
  poster?: boolean;
  updatedAt: string;
  load: () => Promise<{ content: GuideContent }>;
}
