import { useCallback, useEffect, useRef, useState } from 'react';
import { migrateLegacyProgress, restorePreferences } from './progress';
import { RoadmapCatalog, StudyPlan, StudyPreferences } from './types';
import { validateStudyPlan } from './agents';

function read(key: string): unknown {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : undefined;
}

export function useStudyState(catalog: RoadmapCatalog) {
  const key = `trilha-study:v1:${catalog.id}`;
  const [initial] = useState(() => {
    if (typeof window === 'undefined')
      return { prefs: restorePreferences(catalog, undefined), persistable: true };
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) {
        const current = JSON.parse(raw);
        if (typeof current !== 'object' || current === null || current.schemaVersion !== 1)
          throw new Error('Unsupported stored format');
        return { prefs: restorePreferences(catalog, current), persistable: true };
      }
      let vertical: unknown;
      let horizontal: unknown;
      try {
        vertical = read(`selectedItems-${catalog.id}`);
      } catch {
        /* Preserve malformed source. */
      }
      try {
        horizontal = read('items');
      } catch {
        /* The other store can still migrate. */
      }
      return { prefs: migrateLegacyProgress(catalog, vertical, horizontal), persistable: true };
    } catch {
      // Never overwrite an unreadable existing record with an empty one.
      return { prefs: restorePreferences(catalog, undefined), persistable: false };
    }
  });
  const [storageIssue, setStorageIssue] = useState(!initial.persistable);
  const canPersist = useRef(initial.persistable);
  const [prefs, setPrefs] = useState<StudyPreferences>(initial.prefs);
  const [restoredPlan] = useState<{ plan?: StudyPlan; issue: string }>(() => {
    try {
      const value = read(`${key}:plan`);
      return {
        plan: value
          ? validateStudyPlan(value, catalog, { ...prefs, weeklyMinutes: 2400 })
          : undefined,
        issue: '',
      };
    } catch {
      return {
        issue:
          'Não foi possível retomar o plano salvo. O registro original foi preservado; monte um novo plano para esta versão da trilha.',
      };
    }
  });
  const [plan, setPlanState] = useState<StudyPlan | undefined>(restoredPlan.plan);
  const [planIssue, setPlanIssue] = useState(restoredPlan.issue);
  useEffect(() => {
    if (plan && plan.roadmapVersion !== catalog.version)
      setPlanIssue(
        'O catálogo mudou. Monte um novo plano; o registro anterior permanece preservado.',
      );
  }, [catalog.version, plan]);
  const update = useCallback(
    (change: Partial<StudyPreferences> | ((previous: StudyPreferences) => StudyPreferences)) => {
      setPrefs((previous) =>
        typeof change === 'function' ? change(previous) : { ...previous, ...change },
      );
    },
    [],
  );

  useEffect(() => {
    if (!canPersist.current) return;
    try {
      localStorage.setItem(key, JSON.stringify(prefs));
      setStorageIssue(false);
    } catch {
      setStorageIssue(true);
    }
  }, [key, prefs]);

  useEffect(() => {
    function sync(event: StorageEvent) {
      if (event.key !== key || event.newValue === null) return;
      try {
        const value = JSON.parse(event.newValue);
        if (typeof value !== 'object' || value === null || value.schemaVersion !== 1)
          throw new Error('Unsupported stored format');
        canPersist.current = true;
        setStorageIssue(false);
        setPrefs(restorePreferences(catalog, value));
      } catch {
        canPersist.current = false;
        setStorageIssue(true);
      }
    }
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, [catalog, key]);

  const setPlan = useCallback(
    (next: StudyPlan | undefined) => {
      setPlanState(next);
      setPlanIssue('');
      if (!canPersist.current) return;
      try {
        if (next) localStorage.setItem(`${key}:plan`, JSON.stringify(next));
        else localStorage.removeItem(`${key}:plan`);
      } catch {
        setStorageIssue(true);
      }
    },
    [key],
  );

  return {
    prefs,
    update,
    storageIssue,
    plan: plan?.roadmapVersion === catalog.version ? plan : undefined,
    planIssue,
    setPlan,
  };
}

export function resolveGroup(catalog: RoadmapCatalog, fragment: string): string | undefined {
  let id: string;
  try {
    id = decodeURIComponent(fragment.replace(/^#/, ''));
  } catch {
    return undefined;
  }
  if (Object.prototype.hasOwnProperty.call(catalog.groups, id)) return id;
  return Object.values(catalog.groups).find(
    (group) =>
      group.title === id ||
      Object.values(group.variants).some((variant) => variant.stepIds.includes(id)),
  )?.id;
}
