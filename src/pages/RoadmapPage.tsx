import { useParams } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import Roadmap from '../components/Roadmap';
import { data as frontendData } from '../roadmaps/frontend';
import { data as reactData } from '../roadmaps/react';
import { data as backendData } from '../roadmaps/backend';
import { data as devopsData } from '../roadmaps/devops';
import { data as communityData } from '../roadmaps/community';
import { data as testData } from '../roadmaps/test';
import E404Page from './E404Page';
import useDocumentTitle from '../components/useDocumentTitle';
import { useEffect, useState } from 'react';
import { dataEngineeringData } from '../roadmaps/dataEngineering';

export default function RoadmapPage() {
  const { name } = useParams<string>();
  const [roadmapName, setRoadmapName] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const roadmaps: any = {
    frontend: { file: frontendData, title: 'Frontend', path: 'Frontend' },
    react: { file: reactData, title: 'React', path: 'React' },
    backend: { file: backendData, title: 'Backend', path: 'Backend' },
    devops: { file: devopsData, title: 'Devops', path: 'Devops' },
    dataEngineer: { file: dataEngineeringData, title: 'Data Engineer', path: 'Data Engineer' },
    community: { file: communityData, title: 'Comunidade', path: 'Community' },
    test: { file: testData, title: 'Test/QA', path: 'Test/QA' },
  };

  useEffect(() => {
    setRoadmapName(name || '');
  }, [name]);

  useDocumentTitle('Trilha Info - ' + roadmaps[name || ''].title);

  return (
    <MainLayout>
      {/* <p className="mt-4 text-center font-title c-brown md:px-10">
        Não sabe por onde começar a estudar? Que tal dar uma olhada por aqui?
      </p> */}
      <div className="m-auto mt-4 w-2/3">
        <p className="c-brown mb-2 font-title ">
          Lendo de cima pra baixo, cada <span className="text-red">caixa</span> é um assunto a ser
          estudado.
        </p>
        <p className="c-brown font-title ">
          <span className="text-red">Clicando</span>, você verá em mais detalhes o que estudar com
          links de conteúdos gratuitos!
        </p>
      </div>

      {name && roadmaps[name] && (
        <Roadmap
          isPreview={false}
          data={roadmaps[name].file}
          title={roadmaps[name].title}
          path={roadmaps[name].path}
          name={roadmapName}
        />
      )}
      {!name || (!roadmaps[name] && <E404Page />)}
    </MainLayout>
  );
}
