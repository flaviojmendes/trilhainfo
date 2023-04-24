import { Level } from './RoadmapModel';

export interface RoadmapObjectModel {
  file: Level[];
  title: string;
  path: string;
}

export interface RoadmapFileModel {
  frontend: RoadmapObjectModel;
  react: RoadmapObjectModel;
  backend: RoadmapObjectModel;
  devops: RoadmapObjectModel;
  'data-engineer': RoadmapObjectModel;
  community: RoadmapObjectModel;
  test: RoadmapObjectModel;
}
