import { Link, useParams } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import { GuideView } from '../components/Guide/GuideView';
import { findGuide } from '../guides';

export default function GuidePage() {
  const { guide: id } = useParams();
  const guide = findGuide(id);

  return (
    <MainLayout>
      {guide ? (
        <GuideView key={guide.id} guide={guide} />
      ) : (
        <section className="site-empty">
          <p className="home-eyebrow">Guia não encontrado</p>
          <h1>Este guia não existe, ou mudou de nome</h1>
          <p>Veja todos os guias disponíveis e escolha um assunto para revisar.</p>
          <Link className="home-button home-button-primary" to="/guias">
            Ver todos os guias
          </Link>
        </section>
      )}
    </MainLayout>
  );
}
