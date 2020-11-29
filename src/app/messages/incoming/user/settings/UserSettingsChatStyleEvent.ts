import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { UserSettingsChatStyleParser } from '../../../parser';

export class UserSettingsChatStyleEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserSettingsChatStyleParser);
    }

    public getParser(): UserSettingsChatStyleParser
    {
        return this.parser as UserSettingsChatStyleParser;
    }
}