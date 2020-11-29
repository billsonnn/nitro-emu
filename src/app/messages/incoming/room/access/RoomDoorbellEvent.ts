import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { RoomDoorbellParser } from '../../../parser';

export class RoomDoorbellEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomDoorbellParser);
    }

    public getParser(): RoomDoorbellParser
    {
        return this.parser as RoomDoorbellParser;
    }
}