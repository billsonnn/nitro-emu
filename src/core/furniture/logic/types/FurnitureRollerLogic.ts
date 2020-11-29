import { IUser } from '../../../user';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureRollerLogic extends FurnitureLogic
{
    public onInteract(user: IUser, state: number = null): void
    {
        return;
    }

    public setState(state: number = null, refresh: boolean = true): boolean
    {
        return false;
    }

    public isFurnitureRollable(): boolean
    {
        return false;
    }

    public isFurnitureToggleable(): boolean
    {
        return false;
    }

    public isFurnitureStackable(): boolean
    {
        return false;
    }
}