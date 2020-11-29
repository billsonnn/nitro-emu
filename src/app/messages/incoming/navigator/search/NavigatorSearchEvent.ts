import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { NavigatorSearchParser } from '../../../parser';

export class NavigatorSearchEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NavigatorSearchParser);
    }

    public getParser(): NavigatorSearchParser
    {
        return this.parser as NavigatorSearchParser;
    }
}