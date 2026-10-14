import { GuideBlock } from '../guides/types';

/**
 * Text fields accept the same inline marks as guides: `code` and **destaque**.
 * Code fields (`code`, `html`, `css`, `js`, `template`) are shown as typed.
 */
export type LessonActivity =
  | {
      type: 'quiz';
      question: string;
      code?: string;
      language?: string;
      /** Exactly one option is correct. Each feedback explains why the option is right or wrong. */
      options: Array<{ text: string; correct?: boolean; feedback: string }>;
    }
  | {
      type: 'order';
      prompt: string;
      /** Items in the correct order; they are shuffled on screen. */
      items: string[];
      explanation: string;
    }
  | {
      type: 'classify';
      prompt: string;
      buckets: string[];
      items: Array<{ text: string; bucket: number }>;
      explanation: string;
    }
  | {
      type: 'fill';
      prompt: string;
      language: string;
      /** Code with blanks written as `[[resposta]]` or `[[resposta|alternativa]]`. */
      template: string;
      explanation: string;
    };

export type LessonVisual =
  | { type: 'analogy'; title: string; text: string }
  | { type: 'reveal'; question: string; answer: string }
  | {
      type: 'anatomy';
      caption: string;
      language: string;
      /** Concatenated `text` values form the snippet; parts with `label` are explorable. */
      parts: Array<{ text: string; label?: string; note?: string }>;
    }
  | {
      type: 'flow';
      caption: string;
      actors: string[];
      steps: Array<{
        from: number;
        to: number;
        label: string;
        text: string;
        tone?: 'ok' | 'error';
      }>;
    }
  | {
      type: 'trace';
      caption: string;
      code: string;
      /**
       * `line` is 1-based. `memory` is the full snapshot after the line runs; when omitted the
       * previous snapshot is kept. `output` is the text printed by that step.
       */
      steps: Array<{
        line: number;
        note: string;
        memory?: Array<[string, string]>;
        output?: string;
      }>;
    }
  | {
      type: 'playground';
      title: string;
      task?: string;
      html?: string;
      css?: string;
      js?: string;
      /**
       * `test` is the body of a function run inside the sandboxed preview after the code loads.
       * It must return a truthy value when the learner's code meets the goal.
       */
      checks?: Array<{ label: string; test: string }>;
      solution?: { html?: string; css?: string; js?: string };
      /** Adds a width slider to simulate small screens. */
      resizable?: boolean;
      height?: number;
      /**
       * `react` loads React 18 and Babel in the preview, so `js` may use JSX and the globals
       * `React` and `ReactDOM`. Checks should wait (about 300 ms) for the first render.
       */
      framework?: 'react';
    }
  | {
      /**
       * A guided terminal: each step asks for one command in plain language, accepts any of the
       * listed commands (spaces are normalized) and prints the scripted output.
       */
      type: 'terminal';
      title: string;
      task?: string;
      /** Prompt shown before each command until a step changes it. */
      prompt?: string;
      /** Text already on screen when the session starts. */
      intro?: string;
      steps: Array<{
        goal: string;
        command: string | string[];
        output?: string;
        hint?: string;
        /** Prompt from this step on, e.g. after `cd projeto`. */
        prompt?: string;
      }>;
    }
  | {
      /**
       * SQLite in the browser. `setup` runs before every execution, so each run starts from the
       * same data. Each `checks[].test` is the body of a function `(result, run, query)`: `result`
       * is the last result set `{ columns, rows }` (or `null`), `run(sql)` executes extra SQL on the
       * same database and returns its last result set, `query` is the learner's text.
       */
      type: 'sql';
      title: string;
      task?: string;
      setup: string;
      query: string;
      solution?: string;
      checks?: Array<{ label: string; test: string }>;
    }
  | {
      /**
       * Python 3 (Pyodide) in the browser. Each `checks[].test` is a Python expression evaluated
       * after the learner's code, in the same namespace; `__saida__` holds everything printed and
       * `__codigo__` the learner's source.
       */
      type: 'python';
      title: string;
      task?: string;
      code: string;
      solution?: string;
      checks?: Array<{ label: string; test: string }>;
    }
  | { type: 'boxModel' }
  | { type: 'layoutLab'; mode: 'flex' | 'grid' }
  | { type: 'specificity'; pairs: Array<[string, string]> }
  | { type: 'contrast'; foreground: string; background: string }
  | { type: 'domTree'; caption: string; html: string }
  | {
      type: 'screenReader';
      caption: string;
      variants: Array<{ label: string; code: string; speech: string[]; verdict: 'good' | 'bad' }>;
    }
  | {
      type: 'codeTabs';
      caption: string;
      tabs: Array<{ label: string; language: string; code: string }>;
    };

export type LessonBlock = GuideBlock | LessonActivity | LessonVisual;

export interface LessonSection {
  id: string;
  title: string;
  blocks: LessonBlock[];
}

export interface Flashcard {
  /** Stable across edits: progress in the review deck is keyed by it. */
  id: string;
  front: string;
  back: string;
}

export interface LessonContent {
  /** Opening paragraph that answers "por que eu deveria me importar?". */
  hook: string;
  sections: LessonSection[];
  /** Three to five sentences the learner should be able to say after the lesson. */
  recap: string[];
  cards: Flashcard[];
  mission: { title: string; text: string; steps: string[] };
  sources?: Array<{ title: string; url: string }>;
}

export interface LessonMeta {
  id: string;
  title: string;
  summary: string;
  minutes: number;
  /**
   * Catalog group ids taught by this lesson, in any trail. Each trail's course lists the lesson
   * under the stage of its first matching group.
   */
  groupIds: string[];
  objectives: string[];
  updatedAt: string;
  load: () => Promise<{ content: LessonContent }>;
}

export const activityTypes = ['quiz', 'order', 'classify', 'fill'] as const;

export function isActivity(block: LessonBlock): block is LessonActivity {
  return (activityTypes as readonly string[]).includes(block.type);
}
