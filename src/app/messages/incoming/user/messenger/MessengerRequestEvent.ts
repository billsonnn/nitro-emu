import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { MessengerRequestParser } from '../../../parser';

export class MessengerRequestEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MessengerRequestParser);
    }

    public getParser(): MessengerRequestParser
    {
        return this.parser as MessengerRequestParser;
    }
}