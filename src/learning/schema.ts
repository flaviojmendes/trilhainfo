const identity = { type: 'string', pattern: '^[a-zA-Z0-9][a-zA-Z0-9._-]*$' };
const ids = { type: 'array', items: identity, uniqueItems: true };
const text = { type: 'string' };
const nullableText = { type: ['string', 'null'] };
const stageKind = { enum: ['study', 'project', 'ai'] };
const aiFocus = { enum: ['focused', 'assisted'] };
const object = (properties: Record<string, unknown>, required = Object.keys(properties)) => ({
  type: 'object',
  additionalProperties: false,
  properties,
  required,
});
const map = (value: unknown) => ({
  type: 'object',
  propertyNames: identity,
  additionalProperties: value,
});
const variant = object({ summary: text, stepIds: ids });
const credit = object({ id: text, author: text, github: text }, ['id']);

export const roadmapSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://trilha.info/schemas/roadmap.v1.schema.json',
  title: 'Trilha Info: catálogo público v1',
  ...object(
    {
      schemaVersion: { const: 1 },
      id: identity,
      version: text,
      title: text,
      language: { const: 'pt-BR' },
      license: text,
      source: { type: 'string', format: 'uri' },
      audience: text,
      outcome: text,
      prerequisite: object({ label: text, path: text }),
      stages: {
        type: 'array',
        items: object(
          {
            id: identity,
            title: text,
            description: text,
            optional: { type: 'boolean' },
            kind: stageKind,
            groupIds: ids,
          },
          ['id', 'title', 'description', 'optional', 'groupIds'],
        ),
      },
      groups: map(
        object(
          {
            id: identity,
            title: text,
            description: text,
            stageId: identity,
            ai: aiFocus,
            href: text,
            requiredIds: ids,
            variants: object({ simple: variant, standard: variant, deep: variant }),
          },
          ['id', 'title', 'description', 'stageId', 'requiredIds', 'variants'],
        ),
      ),
      nodes: map(
        object(
          {
            id: identity,
            groupId: identity,
            title: text,
            description: text,
            requires: ids,
            resourceIds: ids,
            kind: { enum: ['concept', 'practice', 'criteria', 'challenge'] },
            ai: aiFocus,
            prompt: text,
            legacyIds: { type: 'array', items: text },
            contribution: credit,
          },
          ['id', 'groupId', 'title', 'description', 'requires', 'resourceIds', 'kind', 'legacyIds'],
        ),
      ),
      resources: map(
        object(
          {
            id: identity,
            title: text,
            url: { type: 'string', pattern: '^https://', format: 'uri' },
            language: nullableText,
            kind: text,
            free: { type: ['boolean', 'null'] },
            estimatedMinutes: { type: ['integer', 'null'], minimum: 1 },
            lastReviewedAt: { type: ['string', 'null'], format: 'date' },
            contribution: credit,
          },
          ['id', 'title', 'url', 'language', 'kind', 'free', 'estimatedMinutes', 'lastReviewedAt'],
        ),
      ),
    },
    [
      'schemaVersion',
      'id',
      'version',
      'title',
      'language',
      'license',
      'source',
      'audience',
      'outcome',
      'stages',
      'groups',
      'nodes',
      'resources',
    ],
  ),
};

const depthMap = map({ enum: ['simple', 'standard', 'deep'] });
const knowledgeMap = map({ enum: ['unknown', 'familiar', 'demonstrated'] });

export const studyContextSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://trilha.info/schemas/study-context.v1.schema.json',
  ...object({
    schemaVersion: { const: 1 },
    roadmapId: identity,
    roadmapVersion: text,
    catalogSnapshot: { $ref: roadmapSchema.$id },
    learner: object({
      goal: { type: 'string', maxLength: 2000 },
      weeklyMinutes: { type: 'integer', minimum: 30, maximum: 2400 },
      depthByGroup: depthMap,
      knowledgeByGroup: knowledgeMap,
      completedNodeIds: ids,
      studiedResourceIds: ids,
    }),
  }),
};

export const studyPlanSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://trilha.info/schemas/study-plan.v1.schema.json',
  description:
    'Durações são estimativas de planejamento. A aplicação também valida referências, versão, orçamento semanal e ordem dos pré-requisitos.',
  ...object({
    schemaVersion: { const: 1 },
    roadmapId: identity,
    roadmapVersion: text,
    weeks: {
      type: 'array',
      maxItems: 200,
      items: object({
        title: { type: 'string', minLength: 1, maxLength: 160 },
        steps: {
          type: 'array',
          minItems: 1,
          maxItems: 1000,
          items: object({
            nodeId: identity,
            resourceIds: ids,
            estimatedMinutes: { type: 'integer', minimum: 1, maximum: 2400 },
            successCriteria: { type: 'string', minLength: 1, maxLength: 4000 },
          }),
        },
      }),
    },
  }),
};
