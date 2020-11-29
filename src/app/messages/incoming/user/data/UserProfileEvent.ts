import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { UserProfileParser } from '../../../parser';

export class UserProfileEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserProfileParser);
    }

    public getParser(): UserProfileParser
    {
        return this.parser as UserProfileParser;
    }
}