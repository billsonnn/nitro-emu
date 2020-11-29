import { FurnitureWiredSaveConditionEvent } from '../../../../../../app';
import { FurnitureWiredData } from './FurnitureWiredData';

export class FurnitureWiredConditionData extends FurnitureWiredData
{
    public initializeFromIncomingMessage(message: FurnitureWiredSaveConditionEvent): boolean
    {
        if(!(message instanceof FurnitureWiredSaveConditionEvent)) return false;
        
        if(!super.initializeFromIncomingMessage(message)) return false;

        return true;
    }
}