import { IFurniture } from '../../core';
import { Direction } from './Direction';
import { Position } from './Position';

export class AffectedPositions
{
    public static getPositions(furniture: IFurniture, position: Position = null): Position[]
    {
        if(!furniture || !furniture.logic || !furniture.logic.definition) return null;
        
        position = position || furniture.position;
            
        const positions: Position[] = [];

        let width   = furniture.logic.definition.width;
        let length  = furniture.logic.definition.length;

        if(position.rotation === Direction.EAST || position.rotation === Direction.WEST) [ width, length ] = [ length, width ];

        for(let tempX = position.x; tempX < position.x + width; tempX++)
        {
            for(let tempY = position.y; tempY < position.y + length; tempY++) positions.push(new Position(tempX, tempY));
        }

        if(!positions.length) return null;

        return positions;
    }

    public static getPillowPositions(furniture: IFurniture, position: Position = null): Position[]
    {
        if(!furniture) return null;
        
        position = position || furniture.position;
            
        const positions: Position[] = [];

        positions.push(new Position(furniture.position.x, furniture.position.y));

        if(furniture.logic.definition.width !== 2) return positions;

        const x = position.rotation === 0 ? position.x + 1 : position.x;
        const y = position.rotation === 2 ? position.y + 1 : position.y;

        positions.push(new Position(x, y));

        return positions;
    }
}