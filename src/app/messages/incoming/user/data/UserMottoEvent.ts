import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { UserMottoParser } from '../../../parser';

export class UserMottoEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserMottoParser);
    }

    public getParser(): UserMottoParser
    {
        return this.parser as UserMottoParser;
    }
}