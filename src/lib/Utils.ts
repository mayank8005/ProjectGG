import { Line, Coordinates } from '../app/shared/Util.model';
// Will return true if number is between the two number
// Will include edge values
export function isBetween(value: number, rangeStart: number, rangeEnd: number): boolean {
    return value >= rangeStart && value <= rangeEnd;
}

/**
 * Returns a shorter version of the given line
 */
export function drawShorterLine(from: Coordinates, to: Coordinates, reduceAmount: { start: number, end: number }): Line {
    const start = { x: 0, y: 0 };
    const end = { x: 0, y: 0 };
    const line = new Line(from, to);
    const unitVector = line.getUnitVector();
    // adding unit vector multiplied by no of units to move, to original start coordinates
    start.x = from.x + unitVector.x * reduceAmount.start;
    start.y = from.y + unitVector.y * reduceAmount.start;
    //same for end coordinates but with negative sign as we're moving backwards from end
    end.x = to.x - unitVector.x * reduceAmount.end;
    end.y = to.y - unitVector.y * reduceAmount.end;
    return new Line(start, end);
}
