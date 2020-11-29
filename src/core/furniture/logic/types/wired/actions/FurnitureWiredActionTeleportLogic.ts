import { Position } from '../../../../../../common';
import { IUser } from '../../../../../user';
import { FurnitureWiredActionLogic } from './FurnitureWiredActionLogic';
import { FurnitureWiredActionType } from './FurnitureWiredActionType';

export class FurnitureWiredActionTeleportLogic extends FurnitureWiredActionLogic
{
    private static TELEPORT_EFFECT: number = 4;

    public canTrigger(user: IUser): boolean
    {
        if(!user || !super.canTrigger(user)) return false;

        this.addTimeout(this.processAction.bind(this, user));
        
        return true;
    }

    protected processAction(user: IUser): boolean
    {
        if(!user || !user.roomUnit) return false;
        
        const furniture = this.getRandomFurniture();

        if(!furniture) return false;

        let tile = this.furniture.room.map.getValidTile(user.roomUnit, furniture.position);

        if(!tile)
        {
            tile = this.furniture.room.map.getValidTileAroundPosition(user.roomUnit, furniture.position);

            if(!tile) return false;
        }

        this.addTimeout(this.teleport.bind(this, user, tile.position, 1), 0.6);

        return true;
    }

    private teleport(user: IUser, position: Position, step: number = 1): void
    {
        if(!user || !position || !step) return;

        const location = user.roomUnit && user.roomUnit.location;

        if(!location) return;

        let delay: number = 0;

        switch(step)
        {
            case 1:
                location.effect(FurnitureWiredActionTeleportLogic.TELEPORT_EFFECT);
                delay = 1.5;
                break;
            case 2:
                location.stopWalking();
                location.canWalk = false;
                delay = 1;
                break;
            case 3:
                location.goTo(position);
                location.canWalk = true;
                delay = 2;
                break;
            case 4:
                location.effect();
                return;
        }

        this.addTimeout(this.teleport.bind(this, user, position, step + 1), delay);
    }

    public get wiredType(): number
    {
        return FurnitureWiredActionType.TELEPORT;
    }

    public get requiresUser(): boolean
    {
        return true;
    }
}