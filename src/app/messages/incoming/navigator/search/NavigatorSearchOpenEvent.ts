import { IMessageEvent, MessageEvent } from '../../../../../networking';
import { NavigatorSearchOpenParser } from '../../../parser';

export class NavigatorSearchOpenEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NavigatorSearchOpenParser);
    }

    public getParser(): NavigatorSearchOpenParser
    {
        return this.parser as NavigatorSearchOpenParser;
    }
}