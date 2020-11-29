import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { RoomSettingsParser } from '../../../parser';

export class RoomSettingsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomSettingsParser);
    }

    public getParser(): RoomSettingsParser
    {
        return this.parser as RoomSettingsParser;
    }
}