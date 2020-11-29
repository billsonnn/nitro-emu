import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { NavigatorSearchCloseParser } from '../../../parser';

export class NavigatorSearchCloseEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NavigatorSearchCloseParser);
    }

    public getParser(): NavigatorSearchCloseParser
    {
        return this.parser as NavigatorSearchCloseParser;
    }
}