import { IMessageEvent, MessageEvent } from '../../../../../../networking';
import { UserBadgesParser } from '../../../../parser';

export class UserBadgesEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserBadgesParser);
    }

    public getParser(): UserBadgesParser
    {
        return this.parser as UserBadgesParser;
    }
}