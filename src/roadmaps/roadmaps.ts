import { data as frontendData } from '../roadmaps/frontend';
import { data as reactData } from '../roadmaps/react';
import { data as backendData } from '../roadmaps/backend';
import { data as devopsData } from '../roadmaps/devops';
import { data as testData } from '../roadmaps/test';
import { data as communityData } from '../roadmaps/community';
import { dataEngineeringData } from '../roadmaps/dataEngineering';
import { RoadmapFileModel } from '../entity/RoadmapFileModel';

export const roadmaps: RoadmapFileModel = {
  frontend: { file: frontendData, title: 'Frontend', path: 'frontend' },
  react: { file: reactData, title: 'React', path: 'react' },
  backend: { file: backendData, title: 'Backend', path: 'backend' },
  devops: { file: devopsData, title: 'Devops', path: 'devops' },
  'data-engineer': { file: dataEngineeringData, title: 'Data Engineer', path: 'data-engineer' },
  community: { file: communityData, title: 'Comunidade', path: 'community' },
  test: { file: testData, title: 'Test/QA', path: 'test' },
};
