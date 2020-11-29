import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { MessengerDeclineParser } from '../../../parser';

export class MessengerDeclineEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MessengerDeclineParser);
    }

    public getParser(): MessengerDeclineParser
    {
        return this.parser as MessengerDeclineParser;
    }
}