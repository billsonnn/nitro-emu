import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { InventoryUnknownParser } from '../../../parser';

export class InventoryUnknownEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, InventoryUnknownParser);
    }

    public getParser(): InventoryUnknownParser
    {
        return this.parser as InventoryUnknownParser;
    }
}