export interface Coordinates {
    x: number;
    y: number;
}

export class Line {
    public start: Coordinates;
    public end: Coordinates;
    public vector: Coordinates;
    public distance: number;

    constructor(start: Coordinates, end: Coordinates) {
        this.start = start;
        this.end = end;
        const delta = { x: end.x - start.x, y: end.y - start.y };
        this.vector = { x: delta.x, y: delta.y };
        this.distance = Math.sqrt(Math.pow(this.vector.x, 2) + Math.pow(this.vector.y, 2));
    }

    getUnitVector(): Coordinates {
        return { x: this.vector.x / this.distance, y: this.vector.y / this.distance };
    }

}
