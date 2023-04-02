import { Level } from './RoadmapModel';

export interface RoadmapObjectModel {
  file: Level[];
  title: string;
}

export interface RoadmapFileModel {
  frontend: RoadmapObjectModel;
  react: RoadmapObjectModel;
  backend: RoadmapObjectModel;
  devops: RoadmapObjectModel;
  dataEngineer: RoadmapObjectModel;
  community: RoadmapObjectModel;
  test: RoadmapObjectModel;
}
