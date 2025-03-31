/* eslint-disable no-use-before-define */

export class RoadmapModel {
  id?: string;
  title?: string;
  description?: string;
  owner?: string;
  slug?: string;
  levels: Level[] = [];

  addLevel(level: Level) {
    this.levels.push(level);
  }

  removeLevel(level: Level) {
    this.levels = this.levels.filter((obj) => {
      return obj !== level;
    });
  }

  getLevels() {
    return this.levels;
  }
}

export interface Level {
  label?: string;
  description?: string;
  items: RoadmapItem[];
}

export interface RoadmapItem {
  label: string;
  description?: string;
  children?: RoadmapItem[];
  links?: Link[];
  url?: string;
}

export interface Link {
  url: string;
  type?: string;
  votes?: number;
  contentType: LinkContentType | string;
  label: string;
}

export enum LinkType {
  FREE = 'Grátis',
  PAID = 'Pago',
}

export enum LinkContentType {
  WATCH = 'Assista',
  READ = 'Leia',
  LISTEN = 'Ouça',
  VISIT = 'Visite',
  PRACTICE = 'Pratique',
}

export type AdjacentLink = Link | undefined;
