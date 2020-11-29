import { RoomRollingComposer } from '../../../../../../app';
import { Direction } from '../../../../../../common';
import { RoomRollerData, RoomTile } from '../../../../../room';
import { IFurniture } from '../../../../interfaces';
import { FurnitureWiredActionLogic } from './FurnitureWiredActionLogic';
import { FurnitureWiredActionType } from './FurnitureWiredActionType';

export class FurnitureWiredActionMoveToDirectionLogic extends FurnitureWiredActionLogic
{
    private static DIRECTION_PARAMETER: number  = 0;
    private static ACTION_PARAMETER: number     = 1;
    private static ACTION_WAIT: number          = 0;
    private static ACTION_TURN_RIGHT_45: number = 1;
    private static ACTION_TURN_RIGHT_90: number = 2;
    private static ACTION_TURN_LEFT_45: number  = 3;
    private static ACTION_TURN_LEFT_90: number  = 4;
    private static ACTION_TURN_BACK: number     = 5;
    private static ACTION_TURN_RANDOM: number   = 6;

    private _storedDirections: Map<number, number>;

    constructor()
    {
        super();

        this._storedDirections = new Map();
    }

    protected cleanUp(): void
    {
        this._storedDirections.clear();

        return super.cleanUp();
    }

    public canTrigger(): boolean
    {
        if(!super.canTrigger()) return false;

        const direction = this.wiredData.intParameters[FurnitureWiredActionMoveToDirectionLogic.DIRECTION_PARAMETER];
        const action    = this.wiredData.intParameters[FurnitureWiredActionMoveToDirectionLogic.ACTION_PARAMETER];

        const furniture = this.getFurniture();

        if(furniture && furniture.length)
        {
            for(let furni of furniture)
            {
                if(!furni) continue;

                this.addTimeout(this.processAction.bind(this, furni, direction, action));
            }
        }

        return true;
    }

    private processAction(furniture: IFurniture, direction: number = 0, action: number = 0): void
    {
        if(!furniture) return;

        const room = furniture.room;

        if(!room) return;

        let storedDirection = this._storedDirections.get(furniture.id);

        if(storedDirection === undefined) storedDirection = direction;

        const oldPosition = furniture.position.copy();

        let tile: RoomTile = null;

        let count = 0;

        while(!tile && (count < 7))
        {
            let newPosition = oldPosition.getPosition(storedDirection);

            tile = room.map.getTile(newPosition);

            if(tile && this.processCollision(furniture, newPosition)) return;

            count++;

            if(!tile || !room.furniture.moveFurniture(null, furniture.id, newPosition, false, true, false))
            {
                storedDirection = this.getNextDirection(storedDirection, action);

                this._storedDirections.set(furniture.id, storedDirection);

                tile = null;

                continue;
            }
        }

        if(!tile) return;

        const rollerData = new RoomRollerData(room, oldPosition, furniture.position);

        rollerData.addFurniture(furniture, furniture.position.z, furniture.position.z);

        room.unit.processComposer(new RoomRollingComposer(rollerData, false));
    }

    private getNextDirection(direction: number = 0, action: number = 0): number
    {
        let offset = 0;

        switch(action)
        {
            case FurnitureWiredActionMoveToDirectionLogic.ACTION_TURN_RIGHT_45:
                offset = Direction.NORTH_EAST;
                break;
            case FurnitureWiredActionMoveToDirectionLogic.ACTION_TURN_RIGHT_90:
                offset = Direction.EAST;
                break;
            case FurnitureWiredActionMoveToDirectionLogic.ACTION_TURN_LEFT_45:
                offset = Direction.NORTH_WEST;
                break;
            case FurnitureWiredActionMoveToDirectionLogic.ACTION_TURN_LEFT_90:
                offset = Direction.WEST;
                break;
            case FurnitureWiredActionMoveToDirectionLogic.ACTION_TURN_BACK:
                offset = Direction.SOUTH;
                break;
            case FurnitureWiredActionMoveToDirectionLogic.ACTION_TURN_RANDOM:
                offset = Direction.getRandomStandardDirection();
                break;
            case FurnitureWiredActionMoveToDirectionLogic.ACTION_WAIT:
            default:
                return direction;
        }

        return Direction.convertWithOffset(direction, offset);
    }

    public get wiredType(): number
    {
        return FurnitureWiredActionType.MOVE_TO_DIRECTION;
    }
}