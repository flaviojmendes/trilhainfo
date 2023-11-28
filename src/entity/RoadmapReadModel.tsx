export type RoadmapRead = {
  label: string;
  children?: RoadmapRead[];
  read?: boolean;
};
