import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import useDocumentTitle from '../components/useDocumentTitle';
import { roadmaps } from '../roadmaps/roadmaps';
import { Level } from '../entity/RoadmapModel';
import HorizontalLevelItem from '../components/HorizontalRoadmap/HorizontalLevelItem';
import HorizontalRoadmapFooter from '../components/HorizontalRoadmap/HorizontalRoadmapFooter';
import Note from '../components/Note';
import { HorizontalLevelItemContent } from '../components/HorizontalRoadmap/HorizontalLevelItemContent';
import { LevelProvider, useSelectedItem } from '../components/HorizontalRoadmap/LevelProvider';
import RoadmapButtons from '../components/RoadmapButtons';
import { useAuth0 } from '@auth0/auth0-react';
import E404Page from './E404Page';

type RoadmapName = keyof typeof roadmaps;

export default function HorizontalRoadmapPage() {
  return (
    <LevelProvider>
      <HorizontalRoadmapPageImpl />
    </LevelProvider>
  );
}

function HorizontalRoadmapPageImpl() {
  const [selectedItem] = useSelectedItem();
  const { name } = useParams<{ name: RoadmapName }>();
  const { isAuthenticated } = useAuth0();

  // we can be sure it is a keyof typeof roadmaps because of the ternary operator
  // but TypeScript is not smart enough
  // I'm using frontend as default in case the name is not in roadmaps so we don't get an error
  const roadmapName = (
    name ? (name in roadmaps ? name : 'frontend') : 'frontend'
  ) as keyof typeof roadmaps;
  const roadmapTitle = roadmaps[roadmapName].title;
  const roadmapData = roadmaps[roadmapName].file;
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);

  const [roadmapLevel, setRoadmapLevel] = useState<Level>(roadmapData[0]);
  const roadmapRef = useRef(null);

  useDocumentTitle(
    `Trilha Info ${name && name in roadmaps ? ` - ${roadmaps[roadmapName].title}` : ''}`,
  );

  return (
    <MainLayout>
      {name && name in roadmaps && (
        <div className="m-auto flex h-full w-11/12 flex-col">
          <div className="mt-8 flex justify-end gap-2">
            <RoadmapButtons
              buttons={isAuthenticated ? ['verticalView', 'exportNotes'] : ['verticalView']}
              title={roadmapTitle}
              roadmapPath={roadmaps[roadmapName].path}
              roadmapRef={roadmapRef}
            />
          </div>
          <section ref={roadmapRef} className="m-auto flex h-full w-11/12 flex-col">
            <h1 className="m-auto mt-8 text-center font-title text-4xl text-yellow xl:hidden">
              {roadmapTitle}
            </h1>
            <div className="flex flex-col xl:flex-row">
              <div className="w-full flex-col xl:w-1/4">
                <div className="my-8 flex-col space-y-4">
                  <HorizontalLevelItem roadmapLevel={roadmapLevel} index={currentLevelIndex} />
                </div>
              </div>
              {/* Selected Item Content */}
              <div className="w-full xl:w-2/4 xl:pl-10">
                <h1 className="m-auto my-8 hidden text-center font-title text-4xl text-yellow xl:block">
                  {roadmapTitle}
                </h1>
                <HorizontalLevelItemContent />
              </div>
              <div className="w-full xl:w-1/4 xl:pl-10">
                {selectedItem && <Note id={selectedItem.label} title={selectedItem.label} />}
              </div>
            </div>
            <div className="flex-grow" />
            <HorizontalRoadmapFooter
              roadmapData={roadmapData}
              setRoadmapLevel={setRoadmapLevel}
              currentLevelIndex={currentLevelIndex}
              setCurrentLevelIndex={setCurrentLevelIndex}
            />
          </section>
        </div>
      )}
      {!name || (!(name in roadmaps) && <E404Page />)}
    </MainLayout>
  );
}
