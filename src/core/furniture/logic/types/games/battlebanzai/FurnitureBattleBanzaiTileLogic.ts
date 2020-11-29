import { IUser } from '../../../../../user';
import { FurnitureLogic } from '../../FurnitureLogic';

export class FurnitureBattleBanzaiTileLogic extends FurnitureLogic
{
    public onInteract(user: IUser, state: number = null): void
    {
        return;
    }

    public isFurnitureToggleable(): boolean
    {
        return false;
    }
}