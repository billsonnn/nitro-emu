import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { MessengerRoomInviteParser } from '../../../parser';

export class MessengerRoomInviteEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MessengerRoomInviteParser);
    }

    public getParser(): MessengerRoomInviteParser
    {
        return this.parser as MessengerRoomInviteParser;
    }
}