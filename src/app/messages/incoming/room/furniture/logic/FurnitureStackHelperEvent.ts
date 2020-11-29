import { IMessageEvent, MessageEvent } from '../../../../../../networking';
import { FurnitureStackHelperParser } from '../../../../parser';

export class FurnitureStackHelperEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureStackHelperParser);
    }

    public getParser(): FurnitureStackHelperParser
    {
        return this.parser as FurnitureStackHelperParser;
    }
}