import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { RoomSettingsSaveParser } from '../../../parser';

export class RoomSettingsSaveEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomSettingsSaveParser);
    }

    public getParser(): RoomSettingsSaveParser
    {
        return this.parser as RoomSettingsSaveParser;
    }
}