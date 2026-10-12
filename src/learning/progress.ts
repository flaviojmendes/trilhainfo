import { RoadmapRead } from '../entity/RoadmapReadModel';
import { RoadmapCatalog, StudyPreferences } from './types';

export function initialPreferences(catalog: RoadmapCatalog): StudyPreferences {
  return {
    schemaVersion: 1,
    depthByGroup: {},
    knowledgeByGroup: {},
    completedNodeIds: [],
    studiedResourceIds: [],
    goal: catalog.outcome,
    weeklyMinutes: 240,
    view: 'study',
    activeGroupId: catalog.stages[0]?.groupIds[0] || '',
    lighting: 'auto',
    effects: true,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function restorePreferences(catalog: RoadmapCatalog, value: unknown): StudyPreferences {
  const defaults = initialPreferences(catalog);
  if (!isRecord(value) || value.schemaVersion !== 1) return defaults;
  const validMap = <T extends string>(source: unknown, allowed: T[]): Record<string, T> => {
    if (!isRecord(source)) return {};
    return Object.fromEntries(
      Object.entries(source).filter(
        ([id, entry]) =>
          Object.prototype.hasOwnProperty.call(catalog.groups, id) && allowed.includes(entry as T),
      ),
    ) as Record<string, T>;
  };
  return {
    ...defaults,
    depthByGroup: validMap(value.depthByGroup, ['simple', 'standard', 'deep']),
    knowledgeByGroup: validMap(value.knowledgeByGroup, ['unknown', 'familiar', 'demonstrated']),
    // Keep unknown historical IDs so removed content can be restored later.
    completedNodeIds: Array.isArray(value.completedNodeIds)
      ? [...new Set(value.completedNodeIds.filter((id): id is string => typeof id === 'string'))]
      : [],
    studiedResourceIds: Array.isArray(value.studiedResourceIds)
      ? [...new Set(value.studiedResourceIds.filter((id): id is string => typeof id === 'string'))]
      : [],
    goal: typeof value.goal === 'string' ? value.goal.slice(0, 2000) : defaults.goal,
    weeklyMinutes:
      typeof value.weeklyMinutes === 'number' && Number.isFinite(value.weeklyMinutes)
        ? Math.max(30, Math.min(2400, Math.round(value.weeklyMinutes)))
        : defaults.weeklyMinutes,
    view: ['study', 'map', 'list'].includes(value.view as string)
      ? (value.view as StudyPreferences['view'])
      : defaults.view,
    activeGroupId:
      typeof value.activeGroupId === 'string' &&
      Object.prototype.hasOwnProperty.call(catalog.groups, value.activeGroupId)
        ? value.activeGroupId
        : defaults.activeGroupId,
    lighting: ['auto', 'day', 'night'].includes(value.lighting as string)
      ? (value.lighting as StudyPreferences['lighting'])
      : 'auto',
    effects: typeof value.effects === 'boolean' ? value.effects : true,
  };
}

/** Both legacy stores remain untouched. Migrate only observed completion. */
export function migrateLegacyProgress(
  catalog: RoadmapCatalog,
  vertical: unknown,
  horizontal: unknown,
): StudyPreferences {
  const result = initialPreferences(catalog);
  const completed = new Set<string>();
  const resources = new Set<string>();
  const horizontalMap = isRecord(horizontal) ? horizontal : {};
  function walk(entries: unknown): void {
    if (!Array.isArray(entries)) return;
    for (const candidate of entries) {
      if (!isRecord(candidate) || typeof candidate.label !== 'string') continue;
      const entry = candidate as unknown as RoadmapRead;
      if (entry.read === true) completed.add(entry.label);
      walk(entry.children);
    }
  }
  walk(vertical);
  Object.entries(horizontalMap).forEach(([label, read]) => {
    if (read === true) completed.add(label);
  });
  for (const node of Object.values(catalog.nodes)) {
    const group = Object.values(catalog.groups).find((group) =>
      Object.values(group.variants).some((variant) => variant.stepIds.includes(node.id)),
    );
    if (node.legacyIds.some((id) => completed.has(id))) {
      result.completedNodeIds.push(node.id);
    }
    // A partially read section transfers reference flags but not its completion.
    if (group)
      for (const id of node.resourceIds) {
        const resource = catalog.resources[id];
        const aliases = [
          `${group.title}-${node.title}-${resource.title}`,
          `${node.title}-${resource.title}`,
        ];
        // Short IDs are accepted only when the source tree confirms the parent.
        if (completed.has(aliases[0])) resources.add(id);
        if (Array.isArray(vertical)) {
          const matchesParent = (entries: unknown): boolean =>
            Array.isArray(entries) &&
            entries.some(
              (entry) =>
                isRecord(entry) &&
                ((typeof entry.label === 'string' &&
                  node.legacyIds.includes(entry.label) &&
                  Array.isArray(entry.children) &&
                  entry.children.some(
                    (child) =>
                      isRecord(child) &&
                      child.read === true &&
                      typeof child.label === 'string' &&
                      aliases.includes(child.label),
                  )) ||
                  matchesParent(entry.children)),
            );
          if (matchesParent(vertical as RoadmapRead[])) resources.add(id);
        }
      }
  }
  result.studiedResourceIds = [...resources];
  return result;
}

export function progressSummary(catalog: RoadmapCatalog, prefs: StudyPreferences) {
  const required = [
    ...new Set(
      catalog.stages
        .filter((stage) => !stage.optional)
        .flatMap((stage) => stage.groupIds.flatMap((id) => catalog.groups[id].requiredIds)),
    ),
  ];
  const done = required.filter((id) => prefs.completedNodeIds.includes(id)).length;
  return {
    done,
    total: required.length,
    percent: required.length ? Math.round((done * 100) / required.length) : 0,
  };
}

export function nextGroup(catalog: RoadmapCatalog, prefs: StudyPreferences): string | undefined {
  return catalog.stages
    .filter((stage) => !stage.optional)
    .flatMap((stage) => stage.groupIds)
    .find((id) =>
      catalog.groups[id].requiredIds.some((nodeId) => !prefs.completedNodeIds.includes(nodeId)),
    );
}
