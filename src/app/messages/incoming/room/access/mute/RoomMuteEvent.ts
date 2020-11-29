import { IMessageEvent, MessageEvent } from '../../../../../../networking';
import { RoomMuteParser } from '../../../../parser';

export class RoomMuteEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomMuteParser);
    }

    public getParser(): RoomMuteParser
    {
        return this.parser as RoomMuteParser;
    }
}