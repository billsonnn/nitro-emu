import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { MessengerChatParser } from '../../../parser';

export class MessengerChatEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MessengerChatParser);
    }

    public getParser(): MessengerChatParser
    {
        return this.parser as MessengerChatParser;
    }
}