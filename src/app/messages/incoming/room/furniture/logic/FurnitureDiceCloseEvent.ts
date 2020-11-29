import { IMessageEvent, MessageEvent } from '../../../../../../networking';
import { FurnitureDiceCloseParser } from '../../../../parser';

export class FurnitureDiceCloseEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureDiceCloseParser);
    }

    public getParser(): FurnitureDiceCloseParser
    {
        return this.parser as FurnitureDiceCloseParser;
    }
}