import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { UserSettingsOldChatParser } from '../../../parser';

export class UserSettingsOldChatEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserSettingsOldChatParser);
    }

    public getParser(): UserSettingsOldChatParser
    {
        return this.parser as UserSettingsOldChatParser;
    }
}