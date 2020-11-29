import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { FurniturePickupParser } from '../../../parser';

export class FurniturePickupEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurniturePickupParser);
    }

    public getParser(): FurniturePickupParser
    {
        return this.parser as FurniturePickupParser;
    }
}