import { IUser } from '../../../user';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureExchangeLogic extends FurnitureLogic
{
    public onInteract(user: IUser, state: number = null): void
    {
        return;
    }

    public exchange(user: IUser): void
    {
        
    }

    public isFurnitureToggleable(): boolean
    {
        return false;
    }
}