export interface Node {
    id: string;
    x: number;
    y: number;
}

export interface Coordinates {
    x: number;
    y: number;
}

export interface compilerOptions {
    source: string;
    isMST?: boolean; 
}
