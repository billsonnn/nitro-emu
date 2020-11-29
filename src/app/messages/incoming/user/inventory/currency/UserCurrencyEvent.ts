import { IMessageEvent, MessageEvent } from '../../../../../../networking';
import { UserCurrencyParser } from '../../../../parser';

export class UserCurrencyEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserCurrencyParser);
    }

    public getParser(): UserCurrencyParser
    {
        return this.parser as UserCurrencyParser;
    }
}