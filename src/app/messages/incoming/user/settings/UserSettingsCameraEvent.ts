import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { UserSettingsCameraParser } from '../../../parser';

export class UserSettingsCameraEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserSettingsCameraParser);
    }

    public getParser(): UserSettingsCameraParser
    {
        return this.parser as UserSettingsCameraParser;
    }
}