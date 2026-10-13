import { CSSProperties, PointerEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';
import {
  PiArrowRight,
  PiAtom,
  PiBug,
  PiChatsCircle,
  PiDatabase,
  PiFlowArrow,
  PiInfinity,
  PiLayout,
  PiStack,
} from 'react-icons/pi';
import { readProgressSnapshots } from '../../learning/progressSnapshot';
import { curriculumReviewLabel } from '../../roadmaps/guides';
import { mainRoadmapsData } from './mainRoadmapsData';

const icons: Record<string, IconType> = {
  frontend: PiLayout,
  backend: PiDatabase,
  fullstack: PiStack,
  test: PiBug,
  devops: PiInfinity,
  'data-engineer': PiFlowArrow,
  react: PiAtom,
  entrevistas: PiChatsCircle,
};

function RouteGlyph({ seed }: { seed: number }) {
  const lift = 6 + (seed % 3) * 4;
  const flip = seed % 2 ? -1 : 1;
  const ys = [20 + flip * lift, 20 - flip * lift, 20 + flip * lift * 0.6, 20 - flip * lift * 0.4];
  const xs = [8, 46, 84, 122];
  const d = xs.reduce(
    (path, x, index) =>
      index
        ? `${path} C${xs[index - 1] + 19} ${ys[index - 1]} ${x - 19} ${ys[index]} ${x} ${ys[index]}`
        : `M${x} ${ys[0]}`,
    '',
  );
  return (
    <svg className="route-glyph" viewBox="0 0 130 40" aria-hidden="true">
      <path className="route-glyph-base" d={d} />
      <path className="route-glyph-draw" d={d} pathLength={1} />
      {xs.map((x, index) => (
        <circle
          key={x}
          cx={x}
          cy={ys[index]}
          r={index === xs.length - 1 ? 4.5 : 3.5}
          className={index === xs.length - 1 ? 'route-glyph-goal' : undefined}
        />
      ))}
    </svg>
  );
}

function spotlight(event: PointerEvent<HTMLAnchorElement>) {
  const box = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--mx', `${event.clientX - box.left}px`);
  event.currentTarget.style.setProperty('--my', `${event.clientY - box.top}px`);
}

export default function MainRoadmaps() {
  const [progress] = useState(readProgressSnapshots);

  function card(roadmap: (typeof mainRoadmapsData)[number], index: number) {
    const Icon = icons[roadmap.id] || PiLayout;
    const snapshot = progress[roadmap.id];
    const started = !!snapshot && snapshot.done > 0;
    return (
      <li key={roadmap.id} style={{ '--i': index } as CSSProperties}>
        <Link className="roadmap-card" to={roadmap.url} onPointerMove={spotlight}>
          <span className="roadmap-card-top">
            <span className="roadmap-card-icon" aria-hidden="true">
              <Icon />
            </span>
            <span className="roadmap-card-kind">{roadmap.kind}</span>
          </span>
          <h4>{roadmap.title}</h4>
          <p className="roadmap-card-audience">{roadmap.audience}</p>
          {roadmap.outcome && (
            <p className="roadmap-card-outcome">
              <span>Você vai entregar</span>
              {roadmap.outcome}
            </p>
          )}
          <RouteGlyph seed={index} />
          <span className="roadmap-card-footer">
            {started ? (
              <span className="roadmap-card-status">
                <span
                  className="roadmap-card-meter"
                  style={{ '--p': snapshot.percent / 100 } as CSSProperties}
                  aria-hidden="true"
                >
                  <span />
                </span>
                Continuar · {snapshot.percent}%
              </span>
            ) : (
              <span className="roadmap-card-status">Começar a trilha</span>
            )}
            <PiArrowRight className="roadmap-card-arrow" aria-hidden="true" />
          </span>
        </Link>
      </li>
    );
  }

  const careers = mainRoadmapsData.filter((roadmap) => roadmap.group === 'career');
  const complements = mainRoadmapsData.filter((roadmap) => roadmap.group === 'complement');

  return (
    <section id="trilhas" className="home-section" aria-labelledby="trilhas-title">
      <header className="home-section-head">
        <p className="home-eyebrow">Trilhas revisadas em {curriculumReviewLabel}</p>
        <h2 id="trilhas-title">Escolha seu caminho de aprendizado</h2>
        <p>
          Comece por uma carreira. Cada trilha é dividida em trechos que terminam em um projeto para
          o portfólio, com prática de IA ao longo do caminho.
        </p>
      </header>
      <h3 className="home-group-title">Carreiras</h3>
      <ul className="roadmap-grid">{careers.map(card)}</ul>
      <h3 className="home-group-title">Para complementar sua formação</h3>
      <ul className="roadmap-grid roadmap-grid-compact">
        {complements.map((roadmap, index) => card(roadmap, careers.length + index))}
      </ul>
    </section>
  );
}
