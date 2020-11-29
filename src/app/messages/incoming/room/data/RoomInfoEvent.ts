import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { RoomInfoParser } from '../../../parser';

export class RoomInfoEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomInfoParser);
    }

    public getParser(): RoomInfoParser
    {
        return this.parser as RoomInfoParser;
    }
}