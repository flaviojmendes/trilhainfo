import { Link } from 'react-router-dom';

export default function E404Page() {
  return (
    <section className="site-empty">
      <p className="home-eyebrow">Página não encontrada</p>
      <h1>Esta trilha não existe, ou mudou de lugar</h1>
      <p>Veja as trilhas disponíveis e escolha por onde continuar.</p>
      <Link className="home-button home-button-primary" to="/#trilhas">
        Ver todas as trilhas
      </Link>
    </section>
  );
}
