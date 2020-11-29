import { IMessageEvent, MessageEvent } from '../../../../../../networking';
import { RoomMuteUserParser } from '../../../../parser';

export class RoomMuteUserEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomMuteUserParser);
    }

    public getParser(): RoomMuteUserParser
    {
        return this.parser as RoomMuteUserParser;
    }
}