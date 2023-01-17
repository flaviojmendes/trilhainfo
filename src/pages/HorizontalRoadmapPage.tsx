import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import useDocumentTitle from "../components/useDocumentTitle";
import { roadmaps } from "../roadmaps/roadmaps";
import { Level } from "../entity/RoadmapModel";
import HorizontalLevelItem from "../components/HorizontalRoadmap/HorizontalLevelItem/HorizontalLevelItem";
import HorizontalRoadmapFooter from "../components/HorizontalRoadmap/HorizontalRoadmapFooter/HorizontalRoadmapFooter";
import Note from "../components/Note/Note";
import { HorizontalLevelItemContent } from "../components/HorizontalRoadmap/HorizontalLevelItemContent/HorizontalLevelItemContent";
import {
  LevelProvider,
  useSelectedItem,
} from "../components/HorizontalRoadmap/LevelProvider/LevelProvider";
import RoadmapButtons from "../components/RoadmapButtons";
import { useAuth0 } from "@auth0/auth0-react";

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

  const roadmapName = name ?? "frontend";
  const roadmapTitle = roadmaps[roadmapName].title;
  const roadmapData = roadmaps[roadmapName].file;
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);

  const [roadmapLevel, setRoadmapLevel] = useState<Level>(roadmapData[0]);
  const roadmapRef = useRef(null);

  useDocumentTitle(`Trilha Info - ${roadmapTitle}`);

  return (
    <MainLayout>
     
        <div className="m-auto h-full flex flex-col w-11/12">
          <div className="flex justify-end gap-2 mt-8">
            <RoadmapButtons
              buttons={
                isAuthenticated
                  ? ["verticalView", "exportNotes"]
                  : ["verticalView"]
              }
              title={roadmapTitle}
              roadmapRef={roadmapRef}
            />
          </div>
          <section
            ref={roadmapRef}
            className="m-auto h-full flex flex-col w-11/12"
          >
            <h1 className="m-auto mt-8 text-center font-title text-4xl text-yellow xl:hidden">
              {roadmapTitle}
            </h1>
            <div className="flex flex-col xl:flex-row">
              <div className="w-full xl:w-1/4 flex-col">
                <div className="flex-col my-8 space-y-4">
                  <HorizontalLevelItem
                    roadmapLevel={roadmapLevel}
                    index={currentLevelIndex}
                  />
                </div>
              </div>
              {/* Selected Item Content */}
              <div className="w-full xl:w-2/4 xl:pl-10">
                <h1 className="m-auto my-8 text-center font-title text-4xl text-yellow hidden xl:block">
                  {roadmapTitle}
                </h1>
                <HorizontalLevelItemContent />
              </div>
              <div className="w-full xl:w-1/4 xl:pl-10">
                {selectedItem && (
                  <Note id={selectedItem.label} title={selectedItem.label} />
                )}
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
    </MainLayout>
  );
}
