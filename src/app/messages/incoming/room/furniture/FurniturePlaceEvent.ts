import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { FurniturePlaceParser } from '../../../parser';

export class FurniturePlaceEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurniturePlaceParser);
    }

    public getParser(): FurniturePlaceParser
    {
        return this.parser as FurniturePlaceParser;
    }
}