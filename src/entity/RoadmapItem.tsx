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
}

export interface Link {
    url: string;
    type?: string;
    votes?: number;
    label: string;
}

export enum LinkType {
    FREE = 'Grátis',
    PAID = 'Pago'
}