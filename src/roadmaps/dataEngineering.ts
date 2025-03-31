import { Level } from '../entity/RoadmapModel';
import { cloudComputing } from './items/cloudComputing';
import { containers } from './items/containers';
import { db } from './items/db';
import { python } from './items/python';
import { SO } from './items/SO';

export const dataEngineeringData: Level[] = [
  {
    label: '',
    description: '',
    items: [python, SO],
  },
  db,
  { items: [containers] },
  { items: [cloudComputing] },
];
