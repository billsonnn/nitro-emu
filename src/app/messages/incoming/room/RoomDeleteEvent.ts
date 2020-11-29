import { IMessageEvent, MessageEvent } from '../../../../networking';
import { RoomDeleteParser } from '../../parser';

export class RoomDeleteEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomDeleteParser);
    }

    public getParser(): RoomDeleteParser
    {
        return this.parser as RoomDeleteParser;
    }
}