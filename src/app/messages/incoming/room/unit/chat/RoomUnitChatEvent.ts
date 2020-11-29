import { IMessageEvent, MessageEvent } from '../../../../../../networking';
import { RoomUnitChatParser } from '../../../../parser';

export class RoomUnitChatEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomUnitChatParser);
    }

    public getParser(): RoomUnitChatParser
    {
        return this.parser as RoomUnitChatParser;
    }
}