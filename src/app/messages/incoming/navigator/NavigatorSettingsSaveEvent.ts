import { IMessageEvent, MessageEvent } from '../../../../networking';
import { NavigatorSettingsSaveParser } from '../../parser';

export class NavigatorSettingsSaveEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NavigatorSettingsSaveParser);
    }

    public getParser(): NavigatorSettingsSaveParser
    {
        return this.parser as NavigatorSettingsSaveParser;
    }
}