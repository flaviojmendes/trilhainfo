import { useParams } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import { useEffect, useState } from 'react';
import { Level } from '../entity/RoadmapModel';
import useDocumentTitle from '../components/useDocumentTitle';
import { roadmaps } from '../roadmaps/roadmaps';

export default function CoursePage() {
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
      <div className="flex">
        <div className="w-1/4">
          <h1 className="">Trilha {roadmapName}</h1>
        </div>
      </div>
    </MainLayout>
  );
}
