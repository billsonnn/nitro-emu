import { FurnitureWiredActionLogic } from './FurnitureWiredActionLogic';
import { FurnitureWiredActionType } from './FurnitureWiredActionType';

export class FurnitureWiredActionGiveScoreLogic extends FurnitureWiredActionLogic
{
    public canTrigger(): boolean
    {
        if(!super.canTrigger()) return false;

        this.addTimeout(this.processAction.bind(this));
        
        return true;
    }

    private processAction(): void
    {
        
    }

    public get wiredType(): number
    {
        return FurnitureWiredActionType.GIVE_SCORE;
    }
}