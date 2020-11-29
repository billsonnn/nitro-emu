import { FurnitureWiredConditionComposer } from '../../../../../../app';
import { FurnitureWiredComposer } from '../../../../../../app/messages/outgoing/room/furniture/logic/wired/FurnitureWiredComposer';
import { FurnitureWiredConditionData } from '../data';
import { FurnitureWiredLogic } from '../FurnitureWiredLogic';

export class FurnitureWiredConditionLogic extends FurnitureWiredLogic
{
    public createWiredData(): FurnitureWiredConditionData
    {
        return new FurnitureWiredConditionData();
    }

    public get wiredData(): FurnitureWiredConditionData
    {
        return this._wiredData as FurnitureWiredConditionData;
    }

    public get configComposer(): typeof FurnitureWiredComposer
    {
        return FurnitureWiredConditionComposer;
    }
}