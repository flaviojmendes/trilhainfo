import { useParams } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import Roadmap from '../components/Roadmap';
import useDocumentTitle from '../components/useDocumentTitle';
import { useEffect, useState } from 'react';
import { Level } from '../entity/RoadmapModel';
import { roadmaps } from '../roadmaps/roadmaps';
import RoadmapNotfound from './RoadmapNotfound';

export default function RoadmapPage() {
  const { name } = useParams<string>();
  const [roadmapName, setRoadmapName] = useState('');

  useEffect(() => {
    setRoadmapName(name || '');
  }, [name]);

  type Roadmap = {
    file: Level[];
    title: string;
    path: string;
  };

  const currentRoadmap = (
    name ? (name in roadmaps ? name : 'frontend') : 'frontend'
  ) as keyof typeof roadmaps;

  useDocumentTitle(
    `Trilha Info ${name && name in roadmaps ? ` - ${roadmaps[currentRoadmap].title}` : ''}`,
  );

  return (
    <MainLayout>
      {name && name in roadmaps && (
        <>
          <div className="m-auto mt-4 px-2 lg:w-2/3">
            <p className="c-brown mb-2 font-title ">
              Lendo de cima pra baixo, cada <span className="text-primary">caixa</span> é um assunto
              a ser estudado.
            </p>
            <p className="c-brown font-title ">
              <span className="text-primary">Clicando</span>, você verá em mais detalhes o que
              estudar com links de conteúdos gratuitos!
            </p>
          </div>

          <Roadmap
            isPreview={false}
            data={roadmaps[name as keyof typeof roadmaps].file}
            title={roadmaps[name as keyof typeof roadmaps].title}
            name={roadmapName}
            roadmapPath={roadmapName}
          />
        </>
      )}
      {!name || (!(name in roadmaps) && <RoadmapNotfound />)}
    </MainLayout>
  );
}
