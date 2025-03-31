import { useParams } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import useDocumentTitle from '../components/useDocumentTitle';

export default function GuidePage() {
  const { guide } = useParams();
  const imageUrl = getImageUrl(guide || '');

  useDocumentTitle('Trilha Info - ' + guide);
  function getImageUrl(name: string) {
    return `/guides/${name}.jpg`;
  }

  return (
    <MainLayout>
      <div className="flex min-h-screen flex-col items-center justify-center text-center">
        <img className="m-auto h-screen" src={imageUrl} alt={`Guia ${guide}`} />

        <a
          href={imageUrl}
          download={guide ? `${guide}.jpg` : 'guia.jpg'}
          className="mt-4 rounded-xl bg-primary px-6 py-3 text-lg font-semibold text-white transition hover:bg-primary-shadow hover:text-black"
        >
          Baixar Imagem
        </a>
      </div>
    </MainLayout>
  );
}
