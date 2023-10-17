import { useParams } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import Roadmap from '../components/Roadmap';
import useDocumentTitle from '../components/useDocumentTitle';
import { useEffect, useState } from 'react';
import { Level } from '../entity/RoadmapModel';
import { roadmaps } from '../roadmaps/roadmaps';
import E404Page from './E404Page';

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

  // we can be sure it is a keyof typeof roadmaps because of the ternary operator
  // but TypeScript is not smart enough
  // I'm using frontend as default in case the name is not in roadmaps so we don't get an error
  const currentRoadmap = (
    name ? (name in roadmaps ? name : 'frontend') : 'frontend'
  ) as keyof typeof roadmaps;

  useDocumentTitle(
    `Trilha Info ${name && name in roadmaps ? ` - ${roadmaps[currentRoadmap].title}` : ''}`,
  );

  return (
    <MainLayout>
      {/* <p className="mt-4 text-center font-title c-brown md:px-10">
        Não sabe por onde começar a estudar? Que tal dar uma olhada por aqui?
      </p> */}
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
      {!name || (!(name in roadmaps) && <E404Page />)}
    </MainLayout>
  );
}
