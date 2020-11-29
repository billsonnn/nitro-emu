import { IRoomUnitController } from '../../../../../room';
import { IFurniture } from '../../../../interfaces';
import { FurnitureWiredTriggerLogic } from './FurnitureWiredTriggerLogic';
import { FurnitureWiredTriggerType } from './FurnitureWiredTriggerType';

export class FurnitureWiredTriggerCollisionLogic extends FurnitureWiredTriggerLogic
{
    public canTrigger(unit: IRoomUnitController, furniture: IFurniture): boolean
    {
        if(!unit || !furniture || !super.canTrigger()) return false;
        
        return true;
    }

    public get wiredType(): number
    {
        return FurnitureWiredTriggerType.COLLISION;
    }
}