import { FurnitureWiredSaveActionParser } from '../../../../../parser';
import { FurnitureWiredSaveEvent } from './FurnitureWiredSaveEvent';

export class FurnitureWiredSaveActionEvent extends FurnitureWiredSaveEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureWiredSaveActionParser);
    }

    public getParser(): FurnitureWiredSaveActionParser
    {
        return this.parser as FurnitureWiredSaveActionParser;
    }
}