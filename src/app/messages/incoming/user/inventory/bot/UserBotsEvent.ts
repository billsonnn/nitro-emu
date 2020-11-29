import { IMessageEvent, MessageEvent } from '../../../../../../networking';
import { UserBotsParser } from '../../../../parser';

export class UserBotsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserBotsParser);
    }

    public getParser(): UserBotsParser
    {
        return this.parser as UserBotsParser;
    }
}