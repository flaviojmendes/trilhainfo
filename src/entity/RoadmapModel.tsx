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
  /** Permanent editorial identity; keep it when renaming or moving content. */
  id?: string;
  label?: string;
  optional?: boolean;
  /** Editorial classification; independent from whether the stage is optional. */
  kind?: 'study' | 'project' | 'ai';
  description?: string;
  items: RoadmapItem[];
}

export interface RoadmapItem {
  id?: string;
  label: string;
  description?: string;
  prompt?: string;
  /** Dedicated AI learning or an explicitly AI-assisted exercise. */
  ai?: 'focused' | 'assisted';
  children?: RoadmapItem[];
  links?: Link[];
  url?: string;
}

export interface Link {
  id?: string;
  language?: string | null;
  estimatedMinutes?: number | null;
  lastReviewedAt?: string | null;
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
