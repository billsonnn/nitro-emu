import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { UserSettingsVolumeParser } from '../../../parser';

export class UserSettingsVolumeEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserSettingsVolumeParser);
    }

    public getParser(): UserSettingsVolumeParser
    {
        return this.parser as UserSettingsVolumeParser;
    }
}