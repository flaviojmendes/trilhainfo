export type ContributionResourceKind = 'video' | 'read' | 'practice' | 'listen';
export type ContributionLanguage = 'pt-BR' | 'en' | 'es';

export interface ContributionResource {
  kind: ContributionResourceKind;
  title: string;
  url: string;
  language: ContributionLanguage | null;
}

export interface ContributionAuthor {
  name?: string;
  github?: string;
}

interface ContributionBase {
  schemaVersion: 1;
  id: string;
  createdAt: string;
  roadmapId: string;
  groupId: string;
  reason: string;
  author?: ContributionAuthor;
}

export interface ResourceContribution extends ContributionBase {
  kind: 'resource';
  nodeId: string;
  resource: ContributionResource;
}

export interface StepContribution extends ContributionBase {
  kind: 'step';
  step: { title: string; description: string; resource: ContributionResource };
}

export type Contribution = ResourceContribution | StepContribution;

export type ContributionDraft =
  | Omit<ResourceContribution, 'schemaVersion' | 'id' | 'createdAt'>
  | Omit<StepContribution, 'schemaVersion' | 'id' | 'createdAt'>;

export const resourceKindLabels: Record<ContributionResourceKind, string> = {
  video: 'Assista',
  read: 'Leia',
  practice: 'Pratique',
  listen: 'Ouça',
};

export const languageLabels: Record<ContributionLanguage, string> = {
  'pt-BR': 'Português',
  en: 'Inglês',
  es: 'Espanhol',
};
