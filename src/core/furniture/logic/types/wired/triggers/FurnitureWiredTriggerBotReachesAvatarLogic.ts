import { FurnitureWiredTriggerLogic } from './FurnitureWiredTriggerLogic';
import { FurnitureWiredTriggerType } from './FurnitureWiredTriggerType';

export class FurnitureWiredTriggerBotReachesAvatarLogic extends FurnitureWiredTriggerLogic
{
    public canTrigger(): boolean
    {
        if(!super.canTrigger()) return false;
        
        return true;
    }

    public get wiredType(): number
    {
        return FurnitureWiredTriggerType.BOT_REACHED_AVATAR;
    }
}