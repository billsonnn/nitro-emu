import { RoomRollingComposer } from '../../../../../../app';
import { Direction, NumberHelper } from '../../../../../../common';
import { RoomRollerData } from '../../../../../room';
import { IFurniture } from '../../../../interfaces';
import { FurnitureWiredActionLogic } from './FurnitureWiredActionLogic';
import { FurnitureWiredActionType } from './FurnitureWiredActionType';

export class FurnitureWiredActionMoveRotateLogic extends FurnitureWiredActionLogic
{
    private static DIRECTION_PARAMETER: number  = 0;
    private static DIRECTION_NONE: number       = 0;
    private static DIRECTION_RANDOM: number     = 1;
    private static DIRECTION_LEFT_RIGHT: number = 2;
    private static DIRECTION_UP_DOWN: number    = 3;
    private static DIRECTION_NORTH: number      = 4;
    private static DIRECTION_EAST: number       = 5;
    private static DIRECTION_SOUTH: number      = 6;
    private static DIRECTION_WEST: number       = 7;
    private static ROTATION_PARAMETER: number   = 1;
    private static ROTATION_NONE: number        = 0;
    private static ROTATION_EAST: number        = 1;
    private static ROTATION_WEST: number        = 2;
    private static ROTATION_RANDOM: number      = 3;

    public canTrigger(): boolean
    {
        if(!super.canTrigger()) return false;

        const direction = this.wiredData.intParameters[FurnitureWiredActionMoveRotateLogic.DIRECTION_PARAMETER];
        const rotation  = this.wiredData.intParameters[FurnitureWiredActionMoveRotateLogic.ROTATION_PARAMETER];

        const furniture = this.getFurniture();

        if(furniture && furniture.length)
        {
            for(let furni of furniture)
            {
                if(!furni || !furni.logic) continue;

                this.addTimeout(this.processAction.bind(this, furni, direction, rotation));
            }
        }

        return true;
    }

    private processAction(furniture: IFurniture, direction: number = 0, rotation: number = 0): void
    {
        if(!furniture) return;

        const room = furniture.room;

        if(!room) return;

        const oldPosition   = furniture.position.copy();
        const newPosition   = direction ? oldPosition.getPosition(this.getNextDirection(direction)) : oldPosition;

        newPosition.rotation = this.getNextRotation(newPosition.rotation, rotation);

        const tile = room.map.getTile(newPosition);
        
        if(!tile || this.processCollision(furniture, newPosition) || !room.furniture.moveFurniture(null, furniture.id, newPosition, true, true, false)) return;

        if(oldPosition.rotation !== newPosition.rotation)
        {
            furniture.logic.refreshFurniture();
        }
        else
        {
            const rollerData = new RoomRollerData(room, oldPosition, furniture.position);

            rollerData.addFurniture(furniture, furniture.position.z, furniture.position.z);

            room.unit.processComposer(new RoomRollingComposer(rollerData, false));
        }
    }

    private getNextDirection(parameter: number = 0): number
    {
        let direction: number = Direction.NORTH;

        switch(parameter)
        {
            case FurnitureWiredActionMoveRotateLogic.DIRECTION_RANDOM:
                direction   = Direction.getRandomDirection();
                break;
            case FurnitureWiredActionMoveRotateLogic.DIRECTION_LEFT_RIGHT:
                direction   = (Math.random() >= 0.5) ? Direction.EAST : Direction.WEST;
                break;
            case FurnitureWiredActionMoveRotateLogic.DIRECTION_UP_DOWN:
                direction   = (Math.random() >= 0.5) ? Direction.NORTH : Direction.SOUTH;
                break;
            case FurnitureWiredActionMoveRotateLogic.DIRECTION_NORTH:
                direction   = Direction.NORTH;
                break;
            case FurnitureWiredActionMoveRotateLogic.DIRECTION_EAST:
                direction   = Direction.EAST;
                break;
            case FurnitureWiredActionMoveRotateLogic.DIRECTION_SOUTH:
                direction   = Direction.SOUTH;
                break;
            case FurnitureWiredActionMoveRotateLogic.DIRECTION_WEST:
                direction   = Direction.WEST;
                break;
        }

        return direction;
    }

    private getNextRotation(rotation: number = 0, parameter: number = 0): number
    {
        let offset = 0;

        switch(parameter)
        {
            case FurnitureWiredActionMoveRotateLogic.ROTATION_EAST:
                offset = Direction.EAST;
                break;
            case FurnitureWiredActionMoveRotateLogic.ROTATION_WEST:
                offset = Direction.WEST;
                break;
            case FurnitureWiredActionMoveRotateLogic.ROTATION_RANDOM:
                offset = NumberHelper.getRandomValue([ Direction.EAST, Direction.WEST ]);
                break;
            case FurnitureWiredActionMoveRotateLogic.ROTATION_NONE:
            default:
                offset = 0;
                break;
        }

        return Direction.convertWithOffset(rotation, offset);
    }

    protected get usesCollision(): boolean
    {
        return true;
    }

    public get wiredType(): number
    {
        return FurnitureWiredActionType.MOVE_FURNI;
    }
}