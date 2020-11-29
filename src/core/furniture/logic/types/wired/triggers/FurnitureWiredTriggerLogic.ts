import { FurnitureWiredTriggerComposer } from '../../../../../../app';
import { FurnitureWiredComposer } from '../../../../../../app/messages/outgoing/room/furniture/logic/wired/FurnitureWiredComposer';
import { FurnitureWiredTriggerData } from '../data';
import { FurnitureWiredLogic } from '../FurnitureWiredLogic';

export class FurnitureWiredTriggerLogic extends FurnitureWiredLogic
{
    public createWiredData(): FurnitureWiredTriggerData
    {
        return new FurnitureWiredTriggerData();
    }

    public get wiredData(): FurnitureWiredTriggerData
    {
        return this._wiredData as FurnitureWiredTriggerData;
    }

    public get configComposer(): typeof FurnitureWiredComposer
    {
        return FurnitureWiredTriggerComposer;
    }
}