import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { MessengerSearchParser } from '../../../parser';

export class MessengerSearchEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MessengerSearchParser);
    }

    public getParser(): MessengerSearchParser
    {
        return this.parser as MessengerSearchParser;
    }
}