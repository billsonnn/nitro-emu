import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { MessengerFriendsParser } from '../../../parser';

export class MessengerFriendsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MessengerFriendsParser);
    }

    public getParser(): MessengerFriendsParser
    {
        return this.parser as MessengerFriendsParser;
    }
}