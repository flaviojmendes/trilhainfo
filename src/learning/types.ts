export type Depth = 'simple' | 'standard' | 'deep';
export type LearningView = 'study' | 'map' | 'list';
export type Knowledge = 'unknown' | 'familiar' | 'demonstrated';

export interface LearningResource {
  id: string;
  title: string;
  url: string;
  language: string | null;
  kind: string;
  free: boolean | null;
  estimatedMinutes: number | null;
  lastReviewedAt: string | null;
}

export interface LearningNode {
  id: string;
  groupId: string;
  title: string;
  description: string;
  requires: string[];
  resourceIds: string[];
  kind: 'concept' | 'practice' | 'criteria' | 'challenge';
  ai?: 'focused' | 'assisted';
  prompt?: string;
  legacyIds: string[];
}

export interface LearningGroup {
  id: string;
  title: string;
  description: string;
  stageId: string;
  ai?: 'focused' | 'assisted';
  href?: string;
  requiredIds: string[];
  variants: Record<Depth, { summary: string; stepIds: string[] }>;
}

export interface LearningStage {
  id: string;
  title: string;
  description: string;
  optional: boolean;
  kind?: 'study' | 'project' | 'ai';
  groupIds: string[];
}

export interface RoadmapCatalog {
  schemaVersion: 1;
  id: string;
  version: string;
  title: string;
  language: 'pt-BR';
  license: string;
  source: string;
  audience: string;
  outcome: string;
  prerequisite?: { label: string; path: string };
  stages: LearningStage[];
  groups: Record<string, LearningGroup>;
  nodes: Record<string, LearningNode>;
  resources: Record<string, LearningResource>;
}

export interface StudyPreferences {
  schemaVersion: 1;
  depthByGroup: Record<string, Depth>;
  knowledgeByGroup: Record<string, Knowledge>;
  completedNodeIds: string[];
  studiedResourceIds: string[];
  goal: string;
  weeklyMinutes: number;
  view: LearningView;
  activeGroupId: string;
  lighting: 'auto' | 'day' | 'night';
  effects: boolean;
}

export interface StudyContext {
  schemaVersion: 1;
  roadmapId: string;
  roadmapVersion: string;
  catalogSnapshot: RoadmapCatalog;
  learner: Pick<
    StudyPreferences,
    | 'goal'
    | 'weeklyMinutes'
    | 'depthByGroup'
    | 'knowledgeByGroup'
    | 'completedNodeIds'
    | 'studiedResourceIds'
  >;
}

export interface StudyPlan {
  schemaVersion: 1;
  roadmapId: string;
  roadmapVersion: string;
  weeks: Array<{
    title: string;
    steps: Array<{
      nodeId: string;
      resourceIds: string[];
      estimatedMinutes: number;
      successCriteria: string;
    }>;
  }>;
}
