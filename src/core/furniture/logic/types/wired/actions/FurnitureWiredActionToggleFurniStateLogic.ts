import { FurnitureWiredActionLogic } from './FurnitureWiredActionLogic';
import { FurnitureWiredActionType } from './FurnitureWiredActionType';

export class FurnitureWiredActionToggleFurniStateLogic extends FurnitureWiredActionLogic
{
    public canTrigger(): boolean
    {
        if(!super.canTrigger()) return false;

        this.addTimeout(this.processAction.bind(this));
        
        return true;
    }

    private processAction(): void
    {
        const furniture = this.getFurniture();

        if(!furniture || !furniture.length) return;

        for(let furni of furniture)
        {
            if(!furni || !furni.logic) continue;

            furni.logic.setState();
        }
    }

    public get wiredType(): number
    {
        return FurnitureWiredActionType.TOGGLE_FURNI_STATE;
    }
}