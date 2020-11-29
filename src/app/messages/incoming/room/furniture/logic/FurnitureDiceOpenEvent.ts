import { IMessageEvent, MessageEvent } from '../../../../../../networking';
import { FurnitureDiceOpenParser } from '../../../../parser';

export class FurnitureDiceOpenEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureDiceOpenParser);
    }

    public getParser(): FurnitureDiceOpenParser
    {
        return this.parser as FurnitureDiceOpenParser;
    }
}