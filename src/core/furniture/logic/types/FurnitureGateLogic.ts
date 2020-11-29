import { IUser } from '../../../user';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureGateLogic extends FurnitureLogic
{
    private static GATE_OPEN_STATE: number      = 1;
    private static GATE_CLOSED_STATE: number    = 0;

    public onInteract(user: IUser, state: number = null): void
    {
        if(!user) return;

        const tile = this.furniture.getTile();

        if(!tile || tile.units.size) return;

        if(!this.furniture.room.security.hasRights(user)) return;

        return super.onInteract(user);
    }

    public isFurnitureOpen(): boolean
    {
        if(this.data.state === FurnitureGateLogic.GATE_CLOSED_STATE) return false;

        if(this.data.state === FurnitureGateLogic.GATE_OPEN_STATE) return true;
        
        return super.isFurnitureOpen();
    }
}