import { useParams } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import useDocumentTitle from '../components/useDocumentTitle';
import BigONotation from '../components/CheatSheets/BigONotation';
import BasicAuth from '../components/CheatSheets/BasicAuth';
import StarGuide from '../components/CheatSheets/StarGuide';

export default function GuidePage() {
  const { guide } = useParams();

  function getImageUrl(name: string) {
    return `/guides/${name}.jpg`;
  }

  useDocumentTitle('Trilha Info - ' + guide);

  const renderGuide = () => {
    switch (guide) {
      case 'bigO':
        return <BigONotation />;
      case 'basicAuth':
        return <BasicAuth />;
      case 'star':
        return <StarGuide />;
      default:
        return <img className="m-auto h-screen" alt="Guide" src={getImageUrl(guide || '')} />;
    }
  };

  return <MainLayout>{renderGuide()}</MainLayout>;
}
