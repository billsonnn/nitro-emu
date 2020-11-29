import { FurnitureWiredSaveTriggerParser } from '../../../../../parser';
import { FurnitureWiredSaveEvent } from './FurnitureWiredSaveEvent';

export class FurnitureWiredSaveTriggerEvent extends FurnitureWiredSaveEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureWiredSaveTriggerParser);
    }

    public getParser(): FurnitureWiredSaveTriggerParser
    {
        return this.parser as FurnitureWiredSaveTriggerParser;
    }
}