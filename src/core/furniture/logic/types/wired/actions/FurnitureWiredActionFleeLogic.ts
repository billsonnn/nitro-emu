import { RoomRollingComposer } from '../../../../../../app';
import { Position } from '../../../../../../common';
import { IRoomUnitController, RoomRollerData } from '../../../../../room';
import { IFurniture } from '../../../../interfaces';
import { FurnitureWiredActionLogic } from './FurnitureWiredActionLogic';
import { FurnitureWiredActionType } from './FurnitureWiredActionType';

export class FurnitureWiredActionFleeLogic extends FurnitureWiredActionLogic
{
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

        let x = 0;
        let y = 0;

        if(position.x === furniture.position.x)
        {
            if(furniture.position.y < position.y) y--;
            else y++;
        }

        else if(position.y === furniture.position.y)
        {
            if(furniture.position.x < position.x) x--;
            else x++;
        }

        else if((position.x - furniture.position.x) > (position.y - furniture.position.y))
        {
            if((position.x - furniture.position.x) > 0) x--;
            else x++;
        }

        else
        {
            if((position.y - furniture.position.y) > 0) y--;
            else y++;
        }

        const oldPosition   = furniture.position.copy();
        const newPosition   = oldPosition.addPosition(new Position(x, y));
        const tile          = room.map.getTile(newPosition);

        if(!tile || this.processCollision(furniture, newPosition)) return;
        
        if(!room.furniture.moveFurniture(null, furniture.id, newPosition, false, true, false)) return;

        const rollerData = new RoomRollerData(room, oldPosition, furniture.position);

        rollerData.addFurniture(furniture, oldPosition.z, furniture.position.z);

        room.unit.processComposer(new RoomRollingComposer(rollerData, false));
    }

    public get wiredType(): number
    {
        return FurnitureWiredActionType.FLEE;
    }
}