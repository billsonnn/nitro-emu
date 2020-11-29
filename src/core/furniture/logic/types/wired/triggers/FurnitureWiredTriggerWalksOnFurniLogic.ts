import { IUser } from '../../../../../user';
import { IFurniture } from '../../../../interfaces';
import { FurnitureWiredTriggerLogic } from './FurnitureWiredTriggerLogic';
import { FurnitureWiredTriggerType } from './FurnitureWiredTriggerType';

export class FurnitureWiredTriggerWalksOnFurniLogic extends FurnitureWiredTriggerLogic
{
    public canTrigger(user: IUser, furniture: IFurniture): boolean
    {
        if(!user || !furniture || !super.canTrigger(user, furniture)) return false;

        if(this.wiredData.furnitureIds.indexOf(furniture.id) === -1) return false;
        
        return true;
    }

    public get requiresUser(): boolean
    {
        return true;
    }

    public get wiredType(): number
    {
        return FurnitureWiredTriggerType.AVATAR_WALKS_ON_FURNI;
    }
}