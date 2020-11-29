import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { MessengerAcceptParser } from '../../../parser';

export class MessengerAcceptEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MessengerAcceptParser);
    }

    public getParser(): MessengerAcceptParser
    {
        return this.parser as MessengerAcceptParser;
    }
}