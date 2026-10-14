import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PiArrowRight } from 'react-icons/pi';
import { DevFlip } from '../../devmode/DevFlip';
import { latestSnapshot } from '../../learning/progressSnapshot';
import { roadmapTitles } from '../../roadmaps/titles';
import { mainRoadmapsData } from '../MainRoadmaps/mainRoadmapsData';

const road = 'M70 46 C70 128 392 104 392 186 C392 268 92 248 92 330 C92 412 372 396 372 478';
const traveled = 'M70 46 C70 128 392 104 392 186 C392 268 92 248 92 330';

function HeroTrail() {
  return (
    <div className="hero-trail" aria-hidden="true">
      <img className="hero-trail-backdrop" src="/hero.png" alt="" />
      <svg viewBox="0 0 460 540" className="hero-trail-svg">
        <defs>
          <linearGradient id="hero-trail-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ff8ab5" />
            <stop offset="1" stopColor="#f23d7f" />
          </linearGradient>
        </defs>
        <path className="hero-road-bed" d={road} />
        <path className="hero-road-lane" d={road} />
        <path className="hero-road-glow" d={traveled} pathLength={1} />
        <path className="hero-road-done" d={traveled} pathLength={1} />
        <circle className="hero-node hero-node-done" cx="70" cy="46" r="15" />
        <circle className="hero-node hero-node-done" cx="392" cy="186" r="15" />
        <circle className="hero-node hero-node-current" cx="92" cy="330" r="17" />
        <circle className="hero-node-ai" cx="236" cy="404" r="9" />
        <rect
          className="hero-node hero-node-project"
          x="352"
          y="458"
          width="40"
          height="40"
          rx="12"
        />
      </svg>
      <span className="hero-chip hero-chip-done" style={{ left: '22%', top: '6%' }}>
        <b>✓</b> Internet e HTTP
      </span>
      <span className="hero-chip hero-chip-done" style={{ right: '20%', top: '32%' }}>
        <b>✓</b> HTML e CSS
      </span>
      <span className="hero-chip hero-chip-current" style={{ left: '28%', top: '58%' }}>
        <small>Você está aqui</small>
        JavaScript
      </span>
      <span className="hero-chip hero-chip-ai" style={{ left: '8%', top: '75%' }}>
        <b>✦</b> Depuração com IA
      </span>
      <span className="hero-chip hero-chip-project" style={{ right: '27%', top: '90%' }}>
        <small>Entrega do trecho</small>
        Aplicação com API
      </span>
    </div>
  );
}

export default function Hero() {
  const [resume] = useState(latestSnapshot);
  return (
    <DevFlip id="hero" data={{ resume: resume ?? null, trails: mainRoadmapsData.length }}>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-copy">
          <p className="home-eyebrow">
            <span className="home-eyebrow-dot" aria-hidden="true" /> Gratuito, em português e open
            source
          </p>
          <h1 id="home-title">
            Explore o seu{' '}
            <span className="home-hero-mark">
              caminho
              <svg viewBox="0 0 220 24" aria-hidden="true" preserveAspectRatio="none">
                <path d="M4 16 C 50 4, 110 22, 216 8" pathLength={1} />
              </svg>
            </span>{' '}
            na tecnologia
          </h1>
          <p className="home-lead">
            Aulas próprias e interativas, prática com IA e projetos para o portfólio. Você sempre
            sabe onde está, o que vem depois e o que vai conseguir entregar.
          </p>
          <div className="home-actions">
            {resume && roadmapTitles[resume[0]] && (
              <Link className="home-button home-button-primary" to={`/roadmap/${resume[0]}`}>
                Continuar {roadmapTitles[resume[0]]}
                <span className="home-button-badge">{resume[1].percent}%</span>
              </Link>
            )}
            <a className={`home-button ${resume ? '' : 'home-button-primary'}`} href="#trilhas">
              Escolher uma trilha <PiArrowRight aria-hidden="true" />
            </a>
            <Link className="home-button" to="/aulas">
              Aulas de Frontend do zero
            </Link>
          </div>
          <dl className="home-facts">
            <div>
              <dt>trilhas completas</dt>
              <dd>{mainRoadmapsData.length}</dd>
            </div>
            <div>
              <dt>para começar</dt>
              <dd>Sem cadastro</dd>
            </div>
            <div>
              <dt>seu progresso</dt>
              <dd>No navegador</dd>
            </div>
          </dl>
        </div>
        <HeroTrail />
      </section>
    </DevFlip>
  );
}
