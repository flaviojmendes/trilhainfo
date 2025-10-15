import { useParams } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import useDocumentTitle from '../components/useDocumentTitle';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import BigONotation from '../components/CheatSheets/BigONotation';
import BasicAuth from '../components/CheatSheets/BasicAuth';

// const cookies = new Cookies();

export default function GuidePage() {
  const { guide } = useParams();

  // useEffect(() => {

  // }, []);

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
      default:
        return <img className="m-auto h-screen" alt="Guide" src={getImageUrl(guide || '')} />;
    }
  };

  return <MainLayout>{renderGuide()}</MainLayout>;
}
