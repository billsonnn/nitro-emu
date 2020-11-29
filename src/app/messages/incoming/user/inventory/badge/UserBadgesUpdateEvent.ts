import { IMessageEvent, MessageEvent } from '../../../../../../networking';
import { UserBadgesUpdateParser } from '../../../../parser';

export class UserBadgesUpdateEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserBadgesUpdateParser);
    }

    public getParser(): UserBadgesUpdateParser
    {
        return this.parser as UserBadgesUpdateParser;
    }
}