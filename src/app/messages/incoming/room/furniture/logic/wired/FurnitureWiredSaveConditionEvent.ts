import { FurnitureWiredSaveConditionParser } from '../../../../../parser';
import { FurnitureWiredSaveEvent } from './FurnitureWiredSaveEvent';

export class FurnitureWiredSaveConditionEvent extends FurnitureWiredSaveEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureWiredSaveConditionParser);
    }

    public getParser(): FurnitureWiredSaveConditionParser
    {
        return this.parser as FurnitureWiredSaveConditionParser;
    }
}