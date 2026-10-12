# Adaptive roadmaps and agent contracts

`/roadmap/:name` and `/hroadmap/:name` share the learning interface and progress. Map, Study and List use a catalog produced from `src/roadmaps`. Existing readers remain available for custom roadmaps and previews.

PNG export remains available with size limits and an on-demand image exporter. Authenticated users retain note export through the existing API.

## Content and identity

Every curated stage, topic, section and resource has a permanent editorial ID. Keep that ID when renaming or moving content. The fifth argument of `topic` and `project` is the ID. New concepts receive new IDs; do not reuse retired identities.

```ts
topic('Concept', 'Explanation', [r.html], 'Verifiable practice', 'web.concept');
```

`src/learning/catalog.ts` normalizes content, validates references and dependency cycles, and derives the version from the complete catalog. `requires` expresses educational dependencies; stages and groups express presentation. Variants preserve essential explanations and practice. Deep mode adds a verifiable challenge; topic-specific tasks live in the `challenges` registry.

## Progress and personalization

`trilha-study:v1:<roadmap>` stores depth, declared familiarity, node completion, studied resources, goals, available time and visual preferences. Migration reads `selectedItems-<roadmap>` and `items` without deleting either source. Unreadable modern records are not overwritten; the interface remains usable in memory and supports context export.

The essential progress denominator is independent of view and depth. New material and additional challenges start incomplete. Declared knowledge and studied references do not automatically complete practice.

## Public artifacts

`scripts/catalogPlugin.ts` generates and serves these artifacts from the editorial source:

- `/data/index.json` and `/data/<roadmap>.json`.
- `/data/<roadmap>.md`, including IDs, prerequisites, variants, prompts and references.
- `/read/<roadmap>/`, containing the complete roadmap without JavaScript.
- `/schemas/roadmap.v1.schema.json`, `study-context.v1.schema.json` and `study-plan.v1.schema.json`.
- `/llms.txt` and `/sitemap.xml`.
- Initial HTML for public routes, including canonical URLs, alternate formats and LearningResource JSON-LD.

Configure production hosting to serve existing files before the SPA fallback. This is required for data, Markdown, schemas, reading pages and roadmap-specific HTML. The output directory includes these artifacts for static hosting.

MIT applies to the catalog; external resources retain their own licenses. Unknown language and availability are `null`, as are unspecified durations and review dates.

## Plans and AI

The study tools generate a local plan using progress, depth and weekly availability. Durations are planning estimates, not measured resource durations. Context export includes a complete catalog snapshot and the learner fields selected by the product. Public HTML and artifacts do not contain that personal context.

An external assistant can return a plan conforming to the schema. Import validates version, IDs, allowed references, prerequisites, duplicates and weekly time budgets. Proposals are reviewed before applying, with undo available. Applied plans persist under `trilha-study:v1:<roadmap>:plan`. Plans using an older catalog version require regeneration; their original stored records are preserved.

## Validation

Run `yarn test --run` and `yarn build`. Tests cover nine catalogs, migration, projections, agent contracts and UI focus/progress. `TRILHA_ENV_DIR` may point to an empty directory for isolated validation; otherwise Vite retains its usual configuration resolution. No new runtime dependency was required.

Also verify desktop, tablet, 320px width, keyboard navigation, reduced motion, persistence after reload and reading with JavaScript disabled. Field performance limits require measurement after deployment.

Português: [Trilhas adaptativas e contratos para agentes](aplicativo-adaptativo.md).
