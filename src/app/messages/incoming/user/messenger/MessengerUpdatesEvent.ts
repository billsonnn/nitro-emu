import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { MessengerUpdatesParser } from '../../../parser';

export class MessengerUpdatesEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MessengerUpdatesParser);
    }

    public getParser(): MessengerUpdatesParser
    {
        return this.parser as MessengerUpdatesParser;
    }
}