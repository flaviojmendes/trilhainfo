export interface ProgressSnapshot {
  percent: number;
  done: number;
  total: number;
  visitedAt: string;
}

const key = 'trilha-progress:v1';

export function readProgressSnapshots(): Record<string, ProgressSnapshot> {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '{}');
    return typeof value === 'object' && value !== null && !Array.isArray(value) ? value : {};
  } catch {
    return {};
  }
}

/** Lightweight summary for the home page, which must not load every catalog. */
export function saveProgressSnapshot(id: string, summary: Omit<ProgressSnapshot, 'visitedAt'>) {
  try {
    localStorage.setItem(
      key,
      JSON.stringify({
        ...readProgressSnapshots(),
        [id]: { ...summary, visitedAt: new Date().toISOString() },
      }),
    );
  } catch {
    /* The study record remains the source of truth. */
  }
}

export function latestSnapshot(): [string, ProgressSnapshot] | undefined {
  return Object.entries(readProgressSnapshots())
    .filter(([, snapshot]) => snapshot.done > 0 && snapshot.percent < 100)
    .sort(([, a], [, b]) => b.visitedAt.localeCompare(a.visitedAt))[0];
}
