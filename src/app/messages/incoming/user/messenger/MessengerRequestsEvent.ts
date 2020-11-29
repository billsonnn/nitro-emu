import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { MessengerRequestsParser } from '../../../parser';

export class MessengerRequestsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MessengerRequestsParser);
    }

    public getParser(): MessengerRequestsParser
    {
        return this.parser as MessengerRequestsParser;
    }
}