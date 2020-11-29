import { RoomRollingComposer } from '../../../../../../app';
import { Direction, MovePoints, NumberHelper, Position } from '../../../../../../common';
import { IRoomUnitController, RoomRollerData } from '../../../../../room';
import { IFurniture } from '../../../../interfaces';
import { FurnitureWiredActionLogic } from './FurnitureWiredActionLogic';
import { FurnitureWiredActionType } from './FurnitureWiredActionType';

export class FurnitureWiredActionChaseLogic extends FurnitureWiredActionLogic
{
    private _lastPositions: Map<number, Position>;

    constructor()
    {
        super();

        this._lastPositions = new Map();
    }

    protected cleanUp(): void
    {
        this._lastPositions.clear();

        super.cleanUp();
    }

    public canTrigger(): boolean
    {
        if(!super.canTrigger()) return false;

        const furniture = this.getFurniture();

        if(furniture && furniture.length)
        {
            for(let furni of furniture)
            {
                if(!furni) continue;

                const unit = this.getClosestUserUnit(furni);

                if(!unit) continue;

                this.addTimeout(this.processAction.bind(this, unit, furni));
            }
        }

        return true;
    }

    protected processAction(unit: IRoomUnitController, furniture: IFurniture): void
    {
        if(!unit || !furniture) return;

        const room      = furniture.room;
        const position  = unit.location && unit.location.position;

        if(!room || !position) return;

        let direction: number       = null;
        let lastPosition: Position  = this._lastPositions.get(furniture.id) || null;

        if(position.x === furniture.position.x)
        {
            direction = (furniture.position.y < position.y) ? Direction.SOUTH : Direction.NORTH;
        }

        else if(position.y === furniture.position.y)
        {
            direction = (furniture.position.x < position.x) ? Direction.EAST : Direction.WEST;
        }

        else if((position.x - furniture.position.x) > (position.y - furniture.position.y))
        {
            direction = ((position.x - furniture.position.x) > 0) ? Direction.EAST : Direction.WEST;
        }

        else
        {
            direction = ((position.y - furniture.position.y) > 0) ? Direction.SOUTH : Direction.NORTH;
        }

        const directions = this.getDirections(furniture);

        if(!directions || (direction !== null && (directions.indexOf(direction) === -1))) direction = null;

        const totalDirections = directions.length || 0;

        if(direction === null)
        {
            switch(totalDirections)
            {
                case 0: return;
                case 1:
                    direction = directions[0];
                    break;
                case 2:
                    if(lastPosition === null)
                    {
                        direction = NumberHelper.getRandomValue(directions);
                    }
                    else
                    {
                        const oppositeDirection = lastPosition.rotationOpposite;

                        direction = (directions[0] === oppositeDirection) ? directions[1] : directions[0];
                    }
                    break;
                default:
                    if(lastPosition !== null)
                    {
                        const oppositeDirection = lastPosition.rotationOpposite;

                        const index = directions.indexOf(oppositeDirection);

                        if(index >= 0) directions.splice(index, 1);
                    }

                    direction = NumberHelper.getRandomValue(directions);
                    break;
            }
        }

        const oldPosition   = furniture.position.copy();
        const newPosition   = oldPosition.getPosition(direction);
        const tile          = room.map.getTile(newPosition);

        if(!tile || this.processCollision(furniture, newPosition)) return;

        this._lastPositions.set(furniture.id, newPosition);
        
        if(!room.furniture.moveFurniture(null, furniture.id, newPosition, false, true, false)) return;

        const rollerData = new RoomRollerData(room, oldPosition, furniture.position);

        rollerData.addFurniture(furniture, oldPosition.z, furniture.position.z);

        room.unit.processComposer(new RoomRollingComposer(rollerData, false));
    }

    private getDirections(furniture: IFurniture): number[]
    {
        if(!furniture) return null;

        const currentTile = furniture.getTile();

        if(!currentTile) return null;

        const results: number[] = [];

        const points = MovePoints.STANDARD_POINTS;

        for(let point of points)
        {
            if(!point) continue;

            const tile = furniture.room.map.getTile(currentTile.position.getPosition(point.rotation));

            if(!tile || !furniture.isValidPlacement(tile.position)) continue;

            results.push(point.rotation);
        }

        if(!results || !results.length) return null;

        return results;
    }

    public get wiredType(): number
    {
        return FurnitureWiredActionType.CHASE;
    }
}