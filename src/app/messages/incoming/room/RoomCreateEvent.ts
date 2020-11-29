import { IMessageEvent, MessageEvent } from '../../../../networking';
import { RoomCreateParser } from '../../parser';

export class RoomCreateEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomCreateParser);
    }

    public getParser(): RoomCreateParser
    {
        return this.parser as RoomCreateParser;
    }
}