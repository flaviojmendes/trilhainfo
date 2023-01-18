import { Level } from "./RoadmapModel";

export interface RoadmapFileModel {
  frontend: RoadmapObjectModel;
  react: RoadmapObjectModel;
  backend: RoadmapObjectModel;
  devops: RoadmapObjectModel;
  dataEngineer: RoadmapObjectModel;
  community: RoadmapObjectModel;
  test: RoadmapObjectModel;
}

export interface RoadmapObjectModel {
  file: Level[];
  title: string;
}
