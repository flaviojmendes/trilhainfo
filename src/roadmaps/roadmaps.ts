import { roadmapTitles } from './titles';
import { data as frontendData } from '../roadmaps/frontend';
import { data as reactData } from '../roadmaps/react';
import { data as backendData } from '../roadmaps/backend';
import { data as devopsData } from '../roadmaps/devops';
import { data as testData } from '../roadmaps/test';
import { data as communityData } from '../roadmaps/community';
import { data as fullstackData } from '../roadmaps/fullstack';
import { data as entrevistasData } from '../roadmaps/entrevistas';
import { dataEngineeringData } from '../roadmaps/dataEngineering';
import { RoadmapFileModel } from '../entity/RoadmapFileModel';

export const roadmaps: RoadmapFileModel = {
  frontend: { file: frontendData, title: roadmapTitles.frontend },
  react: { file: reactData, title: roadmapTitles.react },
  backend: { file: backendData, title: roadmapTitles.backend },
  fullstack: { file: fullstackData, title: roadmapTitles.fullstack },
  devops: { file: devopsData, title: roadmapTitles.devops },
  'data-engineer': { file: dataEngineeringData, title: roadmapTitles['data-engineer'] },
  community: { file: communityData, title: roadmapTitles.community },
  test: { file: testData, title: roadmapTitles.test },
  entrevistas: { file: entrevistasData, title: roadmapTitles.entrevistas },
};
