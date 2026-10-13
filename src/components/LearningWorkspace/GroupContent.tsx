import { memo, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { projectBranch } from '../../learning/catalog';
import { Depth, LearningGroup, RoadmapCatalog, StudyPreferences } from '../../learning/types';
import { ResourceList } from './ResourceList';
import LearningPrompt from '../LearningPrompt';
import { Link } from 'react-router-dom';
import { guidesForTopic } from '../../guides';
import { AISymbol, BookIcon } from './icons';

export const depthLabels: Record<Depth, string> = {
  simple: 'Simplificar',
  standard: 'Ver completo',
  deep: 'Aprofundar',
};
export const depthNames: Record<Depth, string> = {
  simple: 'essencial',
  standard: 'completo',
  deep: 'aprofundado',
};
const modes: Depth[] = ['simple', 'standard', 'deep'];

export const GroupContent = memo(function GroupContent({
  catalog,
  group,
  prefs,
  onDepth,
  onNode,
  onResource,
  animated = true,
}: {
  catalog: RoadmapCatalog;
  group: LearningGroup;
  prefs: StudyPreferences;
  onDepth: (id: string, depth: Depth) => void;
  onNode: (id: string, checked: boolean) => void;
  onResource: (id: string, checked: boolean) => void;
  animated?: boolean;
}) {
  const depth = prefs.depthByGroup[group.id] || 'standard';
  const nodes = useMemo(() => projectBranch(catalog, group.id, depth), [catalog, group.id, depth]);
  const reduced = useReducedMotion();
  const ownIds = group.variants.deep.stepIds;
  const complete = group.requiredIds.every((id) => prefs.completedNodeIds.includes(id));
  const topicGuides = guidesForTopic(group.id);
  return (
    <article className="learning-group" aria-labelledby={`title-${group.id}`}>
      <header className="group-heading">
        <div>
          <p className="group-state">
            {complete ? 'Prática essencial concluída' : 'Em estudo'} · Modo {depthNames[depth]}
          </p>
          {group.ai && (
            <p className="group-ai-label">
              <AISymbol />{' '}
              {group.ai === 'focused'
                ? 'Aprender desenvolvimento com IA'
                : 'Projeto com prática de IA'}
            </p>
          )}
          <h3 id={`title-${group.id}`} tabIndex={-1}>
            {group.title}
          </h3>
        </div>
        <div className="depth-controls" role="group" aria-label={`Detalhamento de ${group.title}`}>
          {modes.map((mode) => (
            <button
              key={mode}
              type="button"
              aria-pressed={depth === mode}
              aria-controls={`steps-${group.id}`}
              onClick={() => onDepth(group.id, mode)}
            >
              {depthLabels[mode]}
            </button>
          ))}
        </div>
      </header>
      <p className="group-description">
        {depth === 'simple'
          ? group.variants.simple.summary
          : group.description || group.variants[depth].summary}
      </p>
      {group.href && (
        <a className="related-roadmap" href={group.href}>
          Abrir a trilha de {group.title} ↗
        </a>
      )}
      {topicGuides.length > 0 && (
        <aside className="group-guides" aria-label={`Guias rápidos sobre ${group.title}`}>
          <BookIcon />
          <span>Guia rápido</span>
          <ul>
            {topicGuides.map((guide) => (
              <li key={guide.id}>
                <Link to={`/guide/${guide.id}`}>{guide.title}</Link>
                <span> · {guide.minutes} min</span>
              </li>
            ))}
          </ul>
        </aside>
      )}
      <ol className="learning-steps" id={`steps-${group.id}`}>
        {nodes.map((node) => {
          const prerequisite = !ownIds.includes(node.id);
          const content = (
            <>
              <div className="node-heading">
                <h4 id={`node-title-${node.id}`} tabIndex={-1}>
                  {node.ai && (
                    <span className="node-ai-label">
                      <AISymbol />{' '}
                      {node.ai === 'focused' ? 'Desenvolvimento com IA' : 'Prática com IA'}
                    </span>
                  )}
                  {prerequisite && (
                    <span className="prerequisite-tag">
                      Pré-requisito · {catalog.groups[node.groupId].title}:{' '}
                    </span>
                  )}
                  {node.title}
                </h4>
                <label className="node-check">
                  <input
                    type="checkbox"
                    aria-label={`${node.kind === 'concept' ? 'Estudei' : 'Demonstrei'}: ${
                      catalog.groups[node.groupId].title
                    }, ${node.title}`}
                    checked={prefs.completedNodeIds.includes(node.id)}
                    onChange={(event) => onNode(node.id, event.target.checked)}
                  />
                  <span>{node.kind === 'concept' ? 'Estudei' : 'Demonstrei'}</span>
                  <span className="sr-only">
                    : {group.title}, {node.title}
                  </span>
                </label>
              </div>
              {node.description && <p className="node-description">{node.description}</p>}
              {node.requires.length > 0 && !prerequisite && (
                <p className="node-prerequisites">
                  Antes de praticar:{' '}
                  {node.requires
                    .map(
                      (id) =>
                        `${catalog.groups[catalog.nodes[id].groupId].title}: ${
                          catalog.nodes[id].title
                        }`,
                    )
                    .join(', ')}
                  .
                </p>
              )}
              <ResourceList
                resources={node.resourceIds.map((id) => catalog.resources[id])}
                studied={prefs.studiedResourceIds}
                onStudy={onResource}
                simple={depth === 'simple'}
              />
              {node.prompt && (
                <details className="node-prompt">
                  <summary>Usar um prompt de estudo</summary>
                  <LearningPrompt prompt={node.prompt} label={`${group.title}: ${node.title}`} />
                </details>
              )}
            </>
          );
          return (
            <motion.li
              key={node.id}
              layout={animated && prefs.effects && !reduced ? 'position' : false}
              transition={{ type: 'tween', duration: 0.18, ease: 'easeOut' }}
              className={`learning-step ${node.kind === 'challenge' ? 'learning-challenge' : ''}`}
              data-ai={node.ai}
            >
              {prerequisite && prefs.completedNodeIds.includes(node.id) ? (
                <details className="completed-prerequisite">
                  <summary>{node.title} · já estudado</summary>
                  {content}
                </details>
              ) : (
                content
              )}
            </motion.li>
          );
        })}
      </ol>
      <p className="learning-footnote">
        Marque a prática depois de cumprir seus critérios. Uma referência lida continua separada da
        habilidade demonstrada.
      </p>
    </article>
  );
});
