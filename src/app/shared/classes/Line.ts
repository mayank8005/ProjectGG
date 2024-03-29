import { Coordinates } from '../models/GraphUtil.model';
export class Line {
    public start: Coordinates;
    public end: Coordinates;
    private vector: Coordinates;
    private distance: number;

    constructor(start: Coordinates, end: Coordinates) {
        this.start = start;
        this.end = end;
        const vectorUnits = { x: end.x - start.x, y: end.y - start.y };
        this.vector = { x: vectorUnits.x, y: vectorUnits.y };
        this.distance = Math.sqrt(Math.pow(this.vector.x, 2) + Math.pow(this.vector.y, 2));
    }

    getUnitVector(): Coordinates {
        return { x: this.vector.x / this.distance, y: this.vector.y / this.distance };
    }

    getShorterLine({ reduceStartBy, reduceEndBy }): Line {
        const start = { x : 0, y : 0};
        const end = { x : 0, y : 0};
        const unitVector = this.getUnitVector();
        // adding unit vector multiplied by no of units to move, to original start coordinates
        start.x = this.start.x + unitVector.x * reduceStartBy;
        start.y = this.start.y + unitVector.y * reduceStartBy;

        // same for end coordinates but with negative sign as we're moving backwards from the end
        end.x = this.end.x - unitVector.x * reduceEndBy;
        end.y = this.end.y - unitVector.y * reduceEndBy;

        return new Line(start, end);
    }

}
