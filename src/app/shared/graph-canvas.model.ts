export interface Node {
    id: string;
    x: number;
    y: number;
}

export interface Coordinates {
    x: number;
    y: number;
}

export interface Vector2 {
    start: Coordinates,
    end: Coordinates
}
