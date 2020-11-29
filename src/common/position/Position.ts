import { Direction } from './Direction';
import { IPosition } from './IPosition';

export class Position implements IPosition
{
    private _x: number;
    private _y: number;
    private _z: number;

    private _rotation: number;
    private _headRotation: number;

    constructor(x: number = 0, y: number = 0, z: number = 0, rotation: number = Direction.NORTH, headRotation: number = Direction.NORTH)
    {
        this._x = x || 0;
        this._y = y || 0;
        this._z = z || 0;

        this._rotation     = parseInt(<any> rotation) || Direction.NORTH;
        this._headRotation = parseInt(<any> headRotation) || Direction.NORTH;
    }

    public addPosition(position: Position): Position
    {
        const copy = this.copy();

        copy.x += position.x;
        copy.y += position.y;
        copy.z += position.z;

        return copy;
    }

    public subtractPosition(position: Position): Position
    {
        const copy = this.copy();

        copy.x -= position.x;
        copy.y -= position.y;
        copy.z -= position.z;

        return copy;
    }

    public getPosition(direction: number, offset: number = 1): Position
    {
        const copy = this.copy();

        direction = direction % 8;

        switch(direction)
        {
            case Direction.NORTH:
                copy.y -= offset;
                break;
            case Direction.NORTH_EAST:
                copy.x += offset;
                copy.y -= offset;
                break;
            case Direction.EAST:
                copy.x += offset;
                break;
            case Direction.SOUTH_EAST:
                copy.x += offset;
                copy.y += offset;
                break;
            case Direction.SOUTH:
                copy.y += offset;
                break;
            case Direction.SOUTH_WEST:
                copy.x -= offset;
                copy.y += offset;
                break;
            case Direction.WEST:
                copy.x -= offset;
                break;
            case Direction.NORTH_WEST:
                copy.x -= offset;
                copy.y -= offset;
                break;
        }

        return copy;
    }

    public getPositionInfront(offset: number = 1): Position
    {
        return this.getPosition(this._rotation, offset);
    }

    public getDistanceAround(position: Position): number
    {
        const copy = this.copy();

        copy.x -= position.x;
        copy.y -= position.y;

        return (copy.x * copy.x) + (copy.y * copy.y);
    }

    public getPositionsAround(radius: number = 1): Position[]
    {
        const copy      = this.copy();
        const positions = [];

        radius = radius * 2;

        for(let x = copy.x - radius; x <= copy.x + radius; x++)
        {
            for(let y = copy.y - radius; y <= copy.y + radius; y++)
            {
                const position = new Position(x, y);

                if(!position || this.compare(position)) continue;

                if(position.getDistanceAround(this) <= radius) positions.push(position);
            }
        }

        return positions;
    }

    public isNear(position: Position, radius: number = 1): boolean
    {
        if(!position || !radius) return false;

        if(this.compare(position)) return true;
        
        const positions = position.getPositionsAround(radius);

        if(positions && positions.length)
        {
            for(let pos of positions)
            {
                if(!pos || !pos.compare(this)) continue;

                return true;
            }
        }

        return false;
    }

    public copy(): Position
    {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
    
    public compare(position: Position): boolean
    {
        return position !== null && this._x === position.x && this._y === position.y;
    }

    public compareStrict(position: Position): boolean
    {
        return position !== null && this._x === position.x && this._y === position.y && this._rotation === position.rotation;
    }

    public setRotation(direction: number): void
    {
        this._rotation     = direction;
        this._headRotation = direction;
    }

    public calculateHumanDirection(position: Position): number
    {
        if(!position) return Direction.NORTH;
        
        if(this._x > position.x && this._y > position.y)        return Direction.NORTH_WEST;
        else if(this._x < position.x && this._y < position.y)   return Direction.SOUTH_EAST;
        else if(this._x > position.x && this._y < position.y)   return Direction.SOUTH_WEST;
        else if(this._x < position.x && this._y > position.y)   return Direction.NORTH_EAST;
        else if(this._x > position.x)                           return Direction.WEST;
        else if(this._x < position.x)                           return Direction.EAST;
        else if(this._y < position.y)                           return Direction.SOUTH;

        return Direction.NORTH;
    }

    public calculateSitDirection(): number
    {
        return (this._rotation % 2) ? this._rotation - 1 : this._rotation;
    }

    public calculateWalkDirection(position: Position): number
    {
        if(!position) return Direction.NORTH_EAST;
        
        if(this._x === position.x)
        {
            if(this._y < position.y) return Direction.SOUTH;
            else return Direction.NORTH;
        }

        else if(this._x > position.x)
        {
            if(this._y === position.y) return Direction.WEST;
            else if(this._y < position.y) return Direction.SOUTH_WEST;
            else return Direction.NORTH_WEST;
        }

        else if(this._y === position.y) return Direction.EAST;
        else if(this._y < position.y) return Direction.SOUTH_EAST;

        return Direction.NORTH_EAST;
    }

    public calculateHeadDirection(position: Position): number
    {
        if(!position || (this._rotation % 2)) return this._rotation;
        
        const difference = this._rotation - this.calculateHumanDirection(position);
        
        if(difference > 0) return this._rotation - 1;
        
        if(difference < 0) return this._rotation + 1;
        
        return this._rotation;
    }

    public get x(): number
    {
        return this._x;
    }

    public set x(x: number)
    {
        this._x = x || 0;
    }

    public get y(): number
    {
        return this._y;
    }

    public set y(y: number)
    {
        this._y = y || 0;
    }

    public get z(): number
    {
        return this._z;
    }

    public set z(z: number)
    {
        this._z = z;
    }

    public get rotation(): number
    {
        return this._rotation;
    }

    public set rotation(direction: number)
    {
        this._rotation = direction;
    }

    public get rotationOpposite(): number
    {
        return ((this._rotation + 4) % 8);
    }

    public get headRotation(): number
    {
        return this._headRotation;
    }

    public set headRotation(direction: number)
    {
        this._headRotation = direction;
    }

    public toString(): string
    {
        return `Position: (${ this._x }, ${ this._y }, ${ this._z })`;
    }
}