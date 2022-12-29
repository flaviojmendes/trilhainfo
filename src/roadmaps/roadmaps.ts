import { data as frontendData } from "../roadmaps/frontend";
import { data as reactData } from "../roadmaps/react";
import { data as backendData } from "../roadmaps/backend";
import { data as devopsData } from "../roadmaps/devops";
import { data as communityData } from "../roadmaps/community";
import { dataEngineeringData } from "../roadmaps/dataEngineering";
import { RoadmapFileModel } from "../entity/RoadmapFileModel";

export const roadmaps: RoadmapFileModel = {
    frontend: { file: frontendData, title: "Frontend" },
    react: { file: reactData, title: "React" },
    backend: { file: backendData, title: "Backend" },
    devops: { file: devopsData, title: "Devops" },
    dataEngineer: { file: dataEngineeringData, title: "Data Engineer" },
    community: { file: communityData, title: "Comunidade" },
  };