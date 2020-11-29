import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { MessengerFollowParser } from '../../../parser';

export class MessengerFollowEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MessengerFollowParser);
    }

    public getParser(): MessengerFollowParser
    {
        return this.parser as MessengerFollowParser;
    }
}