import { ReactNode } from 'react';
import {
  PiArrowRight,
  PiArrowUpRight,
  PiBug,
  PiGitPullRequest,
  PiGithubLogo,
  PiPlusCircle,
  PiStarFill,
} from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { findGuide, GuideMeta, guides } from '../../guides';
import { roadmapTitles } from '../../roadmaps/titles';
import { GuideCard } from '../Guide/GuideCard';
import { useGithubStars } from './useGithubStars';

const featured = ['urlToPage', 'httpApis', 'sqlJoins', 'testTypes', 'gitDaily', 'aiStudy']
  .map(findGuide)
  .filter((guide): guide is GuideMeta => Boolean(guide));

const repository = 'https://github.com/flaviojmendes/trilhainfo';
const trails = Object.keys(roadmapTitles).length;

const ways: Array<{
  title: string;
  text: string;
  href: string;
  icon: ReactNode;
  external?: boolean;
}> = [
  {
    title: 'Sugira um conteúdo',
    text: 'No fim de cada assunto, use "Sugerir conteúdo". Sua sugestão vira um pull request.',
    href: '/#trilhas',
    icon: <PiPlusCircle />,
  },
  {
    title: 'Relate um problema',
    text: 'Link quebrado, erro ou ideia de melhoria: abra uma issue.',
    href: `${repository}/issues/new`,
    icon: <PiBug />,
    external: true,
  },
  {
    title: 'Contribua com código',
    text: 'Veja como rodar o projeto e enviar seu primeiro pull request.',
    href: `${repository}/blob/main/CONTRIBUTING.md`,
    icon: <PiGitPullRequest />,
    external: true,
  },
];

export default function ProjectInfo() {
  const stars = useGithubStars();
  return (
    <>
      <section id="guias" className="home-section" aria-labelledby="guias-title">
        <header className="home-section-head">
          <p className="home-eyebrow">Guias rápidos</p>
          <h2 id="guias-title">Revise um conceito em poucos minutos</h2>
          <p>
            Explicações curtas com diagramas e exemplos, ligadas aos assuntos das trilhas. Abra
            durante o estudo ou antes de uma entrevista.
          </p>
        </header>
        <ul className="guide-tiles">
          {featured.map((guide) => (
            <li key={guide.id}>
              <GuideCard guide={guide} />
            </li>
          ))}
        </ul>
        <Link className="home-section-more" to="/guias">
          Ver os {guides.length} guias <PiArrowRight aria-hidden="true" />
        </Link>
      </section>

      <section className="home-section" aria-labelledby="open-title">
        <div className="open-card">
          <div className="open-copy">
            <p className="home-eyebrow">Código aberto</p>
            <h2 id="open-title">Feita em código aberto, por quem estuda e ensina</h2>
            <p>
              A Trilha Info nasceu em junho de 2022 para organizar conteúdos gratuitos em português
              para quem quer entrar na área de tecnologia. Todo o currículo está no GitHub, e
              qualquer pessoa pode propor melhorias.
            </p>
            <dl className="open-stats">
              <div>
                <dt>Trilhas</dt>
                <dd>{trails}</dd>
              </div>
              <div>
                <dt>Guias</dt>
                <dd>{guides.length}</dd>
              </div>
              {stars !== undefined && (
                <div>
                  <dt>Estrelas no GitHub</dt>
                  <dd>{stars.toLocaleString('pt-BR')}</dd>
                </div>
              )}
              <div>
                <dt>Para estudar</dt>
                <dd>Grátis</dd>
              </div>
            </dl>
            <div className="open-actions">
              <a className="open-primary" href={repository} target="_blank" rel="noreferrer">
                <PiGithubLogo aria-hidden="true" />
                Ver no GitHub
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
              <a
                className="open-secondary"
                href={`${repository}/stargazers`}
                target="_blank"
                rel="noreferrer"
              >
                <PiStarFill aria-hidden="true" />
                Dar uma estrela
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </div>
          </div>

          <div className="open-ways">
            <h3>Como participar</h3>
            <ul>
              {ways.map((way) => (
                <li key={way.title}>
                  <a
                    href={way.href}
                    {...(way.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    <span className="open-way-icon" aria-hidden="true">
                      {way.icon}
                    </span>
                    <span className="open-way-text">
                      <strong>{way.title}</strong>
                      <span>{way.text}</span>
                    </span>
                    {way.external ? (
                      <PiArrowUpRight className="open-way-arrow" aria-hidden="true" />
                    ) : (
                      <PiArrowRight className="open-way-arrow" aria-hidden="true" />
                    )}
                    {way.external && <span className="sr-only"> (abre em nova aba)</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
