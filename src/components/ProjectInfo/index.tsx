import { PiArrowUpRight, PiEnvelopeSimple, PiFileText, PiGithubLogo } from 'react-icons/pi';
import { cheatSheets } from '../../guides/cheatSheets';
import SubscriptionEmbeded from '../SubscriptionEmbeded';

export default function ProjectInfo() {
  return (
    <>
      <section id="guias" className="home-section" aria-labelledby="guias-title">
        <header className="home-section-head">
          <p className="home-eyebrow">Download gratuito</p>
          <h2 id="guias-title">Guias e cheat sheets</h2>
          <p>Resumos visuais para revisar um conceito em poucos minutos.</p>
        </header>
        <ul className="guide-grid">
          {cheatSheets.map((cheatSheet) => (
            <li key={cheatSheet.id}>
              <a className="guide-card" href={`/guide/${cheatSheet.id}`}>
                <PiFileText className="guide-card-icon" aria-hidden="true" />
                <span>{cheatSheet.title}</span>
                <PiArrowUpRight className="guide-card-arrow" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="home-section home-community" aria-label="Comunidade">
        <article className="community-card community-newsletter">
          <span className="community-icon" aria-hidden="true">
            <PiEnvelopeSimple />
          </span>
          <h2>Newsletter mensal</h2>
          <p>Novas trilhas, revisões de conteúdo e guias, uma vez por mês.</p>
          <div className="community-embed">
            <SubscriptionEmbeded />
          </div>
        </article>
        <article className="community-card">
          <span className="community-icon" aria-hidden="true">
            <PiGithubLogo />
          </span>
          <h2>Feito em código aberto</h2>
          <p>
            A Trilha Info nasceu em junho de 2022 para organizar conteúdos gratuitos em português
            para quem quer entrar na área de tecnologia. Educação e conhecimento devem ser
            democráticos.
          </p>
          <p>
            Encontrou um bug ou tem uma ideia?{' '}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/flaviojmendes/trilhainfo/issues"
            >
              Abra uma issue
            </a>{' '}
            ou contribua com o{' '}
            <a target="_blank" href="https://github.com/flaviojmendes/trilhainfo" rel="noreferrer">
              repositório
            </a>
            .
          </p>
          <iframe
            src="https://ghbtns.com/github-btn.html?user=flaviojmendes&repo=trilhainfo&type=star&count=true&size=large&v=2"
            scrolling="0"
            width="170"
            height="30"
            title="Estrelas da Trilha Info no Github"
          ></iframe>
        </article>
      </section>
    </>
  );
}
