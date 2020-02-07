import { Vector2, Coordinates } from '../app/shared/graph-canvas.model';

// Will return true if number is between the two number
// Will include edge values
export function isBetween(value: number, rangeStart: number, rangeEnd: number): boolean {
    return value >= rangeStart && value <= rangeEnd;
}
/**
 * Builds unit vector to adjust the position of a given Vector
 */
function buildUnitVector(from: Coordinates, to: Coordinates, unitVector: Coordinates) {
    unitVector.x = (to.x - from.x);
    unitVector.y = (to.y - from.y);
    var vectorNorm = Math.sqrt(Math.pow(unitVector.x, 2) + Math.pow(unitVector.y, 2));
    unitVector.x /= vectorNorm;
    unitVector.y /= vectorNorm;
}

/**
 * Returns a shorter version of the given line
 */
export function drawShorterLine(from: Coordinates, to: Coordinates, reduceAmount: { start: number, end: number }): Vector2 {
    const unitVector = { x: 0, y: 0 };
    const start = { x: 0, y: 0 };
    const end = { x: 0, y: 0 };

    buildUnitVector(from, to, unitVector);
    start.x = from.x + unitVector.x * reduceAmount.start;
    start.y = from.y + unitVector.y * reduceAmount.start;
    end.x = to.x - unitVector.x * reduceAmount.end;
    end.y = to.y - unitVector.y * reduceAmount.end;

    return { start, end };
}
