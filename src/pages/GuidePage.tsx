import { useParams } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import useDocumentTitle from '../components/useDocumentTitle';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import BigONotation from '../components/CheatSheets/BigONotation';

// const cookies = new Cookies();

export default function GuidePage() {
  const { guide } = useParams();

  // useEffect(() => {

  // }, []);

  function getImageUrl(name: string) {
    return `/guides/${name}.jpg`;
  }

  useDocumentTitle('Trilha Info - ' + guide);

  return (
    <MainLayout>
      {guide === 'bigO' ? (
        <BigONotation />
      ) : (
        <img className="m-auto h-screen" alt="Guide" src={getImageUrl(guide || '')} />
      )}
    </MainLayout>
  );
}
