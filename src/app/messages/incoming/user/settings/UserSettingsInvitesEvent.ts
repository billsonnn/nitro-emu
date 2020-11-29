import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { UserSettingsInvitesParser } from '../../../parser';

export class UserSettingsInvitesEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserSettingsInvitesParser);
    }

    public getParser(): UserSettingsInvitesParser
    {
        return this.parser as UserSettingsInvitesParser;
    }
}