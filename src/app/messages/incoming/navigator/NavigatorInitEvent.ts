import { IMessageEvent, MessageEvent } from '../../../../networking';
import { NavigatorInitParser } from '../../parser';

export class NavigatorInitEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NavigatorInitParser);
    }

    public getParser(): NavigatorInitParser
    {
        return this.parser as NavigatorInitParser;
    }
}