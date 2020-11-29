import { Direction } from './Direction';
import { Position } from './Position';

export class MovePoints
{
    public static STANDARD_POINTS: Position[] = [
        new Position(0, -1, 0, Direction.WEST),
        new Position(1, 0, 0, Direction.NORTH),
        new Position(0, 1, 0, Direction.EAST),
        new Position(-1, 0, 0, Direction.SOUTH)
    ];

    public static DIAGONAL_POINTS: Position[] = [
        new Position(1, -1, 0, Direction.NORTH_WEST),
        new Position(-1, 1, 0, Direction.SOUTH_EAST),
        new Position(1, 1, 0, Direction.NORTH_EAST),
        new Position(-1, -1, Direction.SOUTH_WEST)
    ];

    public static MOVE_POINTS: Position[] = [ ...MovePoints.STANDARD_POINTS, ...MovePoints.DIAGONAL_POINTS ];
}