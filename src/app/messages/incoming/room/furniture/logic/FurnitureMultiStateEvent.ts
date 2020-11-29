import { IMessageEvent, MessageEvent } from '../../../../../../networking';
import { FurnitureMultiStateParser } from '../../../../parser';

export class FurnitureMultiStateEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureMultiStateParser);
    }

    public getParser(): FurnitureMultiStateParser
    {
        return this.parser as FurnitureMultiStateParser;
    }
}