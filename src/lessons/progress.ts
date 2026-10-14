import { useCallback, useSyncExternalStore } from 'react';

export interface LessonRecord {
  /** Index of the furthest section opened by the learner. */
  reached: number;
  /** Activity key → answered correctly on the first attempt. */
  answers: Record<string, boolean>;
  done?: string;
}

export interface LessonStore {
  schemaVersion: 1;
  lessons: Record<string, LessonRecord>;
  /** Trail groups already credited in the study record after their lessons were finished. */
  credited: string[];
}

export interface CardState {
  box: number;
  due: string;
}

export interface ReviewStore {
  schemaVersion: 1;
  cards: Record<string, CardState>;
}

export const lessonStoreKey = 'trilha-lessons:v1';
export const reviewStoreKey = 'trilha-review:v1';
const changeEvent = 'trilha-lessons-change';

/** Days until the next review for each Leitner box. */
export const reviewIntervals = [0, 1, 3, 7, 14, 30];

const emptyLessons: LessonStore = { schemaVersion: 1, lessons: {}, credited: [] };
const emptyReview: ReviewStore = { schemaVersion: 1, cards: {} };

const cache = new Map<string, { raw: string | null; value: unknown }>();

function readStore<T extends { schemaVersion: 1 }>(key: string, fallback: T): T {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(key);
  } catch {
    return fallback;
  }
  const cached = cache.get(key);
  if (cached && cached.raw === raw) return cached.value as T;
  let value: T = fallback;
  try {
    const parsed = raw ? JSON.parse(raw) : undefined;
    if (parsed && typeof parsed === 'object' && parsed.schemaVersion === 1)
      value = { ...fallback, ...parsed };
  } catch {
    /* An unreadable record is ignored, never overwritten until the learner acts. */
  }
  cache.set(key, { raw, value });
  return value;
}

function writeStore(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Storage can be unavailable in private mode; the session keeps working. */
  }
  window.dispatchEvent(new Event(changeEvent));
}

function subscribe(callback: () => void) {
  window.addEventListener(changeEvent, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(changeEvent, callback);
    window.removeEventListener('storage', callback);
  };
}

export const readLessons = () => readStore(lessonStoreKey, emptyLessons);
export const readReview = () => readStore(reviewStoreKey, emptyReview);

export function updateLessons(change: (store: LessonStore) => LessonStore) {
  writeStore(lessonStoreKey, change(readLessons()));
}

export function updateLesson(id: string, change: (record: LessonRecord) => LessonRecord) {
  updateLessons((store) => ({
    ...store,
    lessons: { ...store.lessons, [id]: change(store.lessons[id] || { reached: 0, answers: {} }) },
  }));
}

export function useLessonStore(): LessonStore {
  return useSyncExternalStore(subscribe, readLessons, () => emptyLessons);
}

export function useReviewStore(): ReviewStore {
  return useSyncExternalStore(subscribe, readReview, () => emptyReview);
}

export function useLessonRecord(id: string) {
  const store = useLessonStore();
  const record = store.lessons[id];
  const update = useCallback(
    (change: (record: LessonRecord) => LessonRecord) => updateLesson(id, change),
    [id],
  );
  return [record, update] as const;
}

/** Keeps only the first attempt, so the score reflects what the learner knew. */
export function recordAnswer(lessonId: string, key: string, correct: boolean) {
  updateLesson(lessonId, (record) =>
    key in record.answers ? record : { ...record, answers: { ...record.answers, [key]: correct } },
  );
}

export function localDay(date = new Date()): string {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function addDays(day: string, days: number): string {
  const [year, month, date] = day.split('-').map(Number);
  return localDay(new Date(year, month - 1, date + days));
}

export function nextCardState(
  current: CardState | undefined,
  remembered: boolean,
  today = localDay(),
): CardState {
  if (!remembered) return { box: 1, due: today };
  const box = Math.min((current?.box || 0) + 1, reviewIntervals.length - 1);
  return { box, due: addDays(today, reviewIntervals[box]) };
}

export const cardKey = (lessonId: string, cardId: string) => `${lessonId}:${cardId}`;

export function rateCard(key: string, remembered: boolean) {
  const store = readReview();
  writeStore(reviewStoreKey, {
    ...store,
    cards: { ...store.cards, [key]: nextCardState(store.cards[key], remembered) },
  });
}

/** Cards join the deck when a lesson ends, due the next day. */
export function enrollCards(keys: string[], today = localDay()) {
  const store = readReview();
  const cards = { ...store.cards };
  keys.forEach((key) => {
    if (!cards[key]) cards[key] = { box: 1, due: addDays(today, 1) };
  });
  writeStore(reviewStoreKey, { ...store, cards });
}

export function dueCardKeys(store: ReviewStore, today = localDay()): string[] {
  return Object.entries(store.cards)
    .filter(([, state]) => state.due <= today)
    .sort(([, a], [, b]) => a.box - b.box || a.due.localeCompare(b.due))
    .map(([key]) => key);
}

export function lessonScore(record: LessonRecord | undefined) {
  const values = Object.values(record?.answers || {});
  return { correct: values.filter(Boolean).length, total: values.length };
}

/**
 * Groups of a trail whose lessons are all finished and that were not yet credited there.
 * Crediting happens once per trail, so the learner can still uncheck the step afterwards.
 */
export function groupsToCredit(
  store: LessonStore,
  lessonsByGroup: Record<string, string[]>,
  roadmapId: string,
): string[] {
  return Object.entries(lessonsByGroup)
    .filter(
      ([groupId, ids]) =>
        ids.length > 0 &&
        !store.credited.includes(`${roadmapId}/${groupId}`) &&
        ids.every((id) => store.lessons[id]?.done),
    )
    .map(([groupId]) => groupId);
}

export function markCredited(roadmapId: string, groupIds: string[]) {
  if (!groupIds.length) return;
  updateLessons((store) => ({
    ...store,
    credited: [...new Set([...store.credited, ...groupIds.map((id) => `${roadmapId}/${id}`)])],
  }));
}
