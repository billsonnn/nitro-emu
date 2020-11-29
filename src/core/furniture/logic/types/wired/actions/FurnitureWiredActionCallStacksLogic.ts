import { RoomTile } from '../../../../../room';
import { FurnitureWiredLogic } from '../FurnitureWiredLogic';
import { FurnitureWiredActionLogic } from './FurnitureWiredActionLogic';
import { FurnitureWiredActionType } from './FurnitureWiredActionType';

export class FurnitureWiredActionCallStacksLogic extends FurnitureWiredActionLogic
{
    public canTrigger(): boolean
    {
        if(!super.canTrigger()) return false;

        this.addTimeout(this.processAction.bind(this));
        
        return true;
    }

    private processAction(): void
    {
        const furniture = this.getFurniture();

        if(!furniture || !furniture.length) return;

        const tiles: RoomTile[] = [];

        for(let furni of furniture)
        {
            if(!furni || !(furni.logic instanceof FurnitureWiredLogic)) continue;

            const tile = furni.getTile();

            if(!tile || (tiles.indexOf(tile) >= 0)) continue;

            tiles.push(tile);
        }

        if(!tiles || !tiles.length) return;

        for(let tile of tiles)
        {
            if(!tile) continue;

            this.furniture.room && this.furniture.room.wired.processActionsAtTile(tile);
        }
    }

    public get wiredType(): number
    {
        return FurnitureWiredActionType.CALL_ANOTHER_STACK;
    }
}