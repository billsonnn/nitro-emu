import { IUser } from '../../../../../user';
import { FurnitureWiredConditionLogic } from './FurnitureWiredConditionLogic';
import { FurnitureWiredConditionType } from './FurnitureWiredConditionType';

export class FurnitureWiredConditionOnFurniLogic extends FurnitureWiredConditionLogic
{
    public canTrigger(user: IUser): boolean
    {
        if(!user || !super.canTrigger(user)) return false;

        if(!user.roomUnit) return false;

        const furniture = this.getFurniture();

        if(!furniture || !furniture.length) return false;

        if(furniture.indexOf(user.roomUnit.location.getFurniture()) === -1) return false;
        
        return true;
    }

    public get wiredType(): number
    {
        return FurnitureWiredConditionType.TRIGGERER_IS_ON_FURNI;
    }

    public get requiresUser(): boolean
    {
        return true;
    }
}