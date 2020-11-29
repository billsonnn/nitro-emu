import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { MessengerRemoveParser } from '../../../parser';

export class MessengerRemoveEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MessengerRemoveParser);
    }

    public getParser(): MessengerRemoveParser
    {
        return this.parser as MessengerRemoveParser;
    }
}