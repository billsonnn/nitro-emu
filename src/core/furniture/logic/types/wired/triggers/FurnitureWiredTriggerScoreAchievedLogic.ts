import { FurnitureWiredTriggerLogic } from './FurnitureWiredTriggerLogic';
import { FurnitureWiredTriggerType } from './FurnitureWiredTriggerType';

export class FurnitureWiredTriggerScoreAchievedLogic extends FurnitureWiredTriggerLogic
{
    public canTrigger(): boolean
    {
        if(!super.canTrigger()) return false;
        
        return true;
    }

    public get wiredType(): number
    {
        return FurnitureWiredTriggerType.SCORE_ACHIEVED;
    }
}