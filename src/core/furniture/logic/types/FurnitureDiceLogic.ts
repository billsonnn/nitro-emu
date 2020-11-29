import { IUser } from '../../../user';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureDiceLogic extends FurnitureLogic
{
    private static DICE_ROLL_TIMEOUT: number = 1500;

    private _pendingTimeout: NodeJS.Timeout;

    constructor()
    {
        super();

        this._pendingTimeout = null;
    }

    protected cleanUp(): void
    {
        this.clearPendingTimeout();

        super.cleanUp();
    }

    public onInteract(user: IUser, state: number = null): void
    {
        return;
    }

    public openDice(user: IUser): void
    {
        if(!user || !this.data || !this.furniture.room || !this.canToggleDice(user)) return;

        this.processDice(Math.floor(Math.random() * (this.definition.totalStates - 1)) + 1);
    }

    public closeDice(user: IUser): void
    {
        if(!user || !this.data || !this.furniture.room || !this.canToggleDice(user)) return;

        this.clearPendingTimeout();

        this.setState(0);
    }

    private canToggleDice(user: IUser): boolean
    {
        if(!user) return false;

        const unit = user.roomUnit;

        if(!unit) return;

        if(!this.furniture.room.security.hasRights(user)) return false;

        if(!unit.location.position.isNear(this.furniture.position)) return false;

        return true;
    }

    private processDice(state: number = 0): void
    {
        this.clearPendingTimeout();

        this.setState(-1);

        this._pendingTimeout = setTimeout(() => this.setState(state), FurnitureDiceLogic.DICE_ROLL_TIMEOUT);
    }

    private clearPendingTimeout(): void
    {
        if(!this._pendingTimeout) return;
        
        clearTimeout(this._pendingTimeout);

        this._pendingTimeout = null;
    }

    public isFurnitureToggleable(): boolean
    {
        return false;
    }
}