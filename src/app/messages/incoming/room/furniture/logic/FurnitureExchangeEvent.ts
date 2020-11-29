import { IMessageEvent, MessageEvent } from '../../../../../../networking';
import { FurnitureExchangeParser } from '../../../../parser';

export class FurnitureExchangeEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureExchangeParser);
    }

    public getParser(): FurnitureExchangeParser
    {
        return this.parser as FurnitureExchangeParser;
    }
}