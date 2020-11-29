import { IMessageEvent, MessageEvent } from '../../../../../../networking';
import { UserBadgesCurrentParser } from '../../../../parser';

export class UserBadgesCurrentEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserBadgesCurrentParser);
    }

    public getParser(): UserBadgesCurrentParser
    {
        return this.parser as UserBadgesCurrentParser;
    }
}