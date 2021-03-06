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
    contentType: LinkContentType;
    label: string;
}

export enum LinkType {
    FREE = 'Grátis',
    PAID = 'Pago'
}

export enum LinkContentType {
    WATCH = "Assista",
    READ = "Leia",
    LISTEN = "Ouça",
    VISIT = "Visite"
}
