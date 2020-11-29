import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { NavigatorSearchSaveParser } from '../../../parser';

export class NavigatorSearchSaveEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NavigatorSearchSaveParser);
    }

    public getParser(): NavigatorSearchSaveParser
    {
        return this.parser as NavigatorSearchSaveParser;
    }
}