import { IMessageEvent, MessageEvent } from '../../../../networking';
import { DesktopNewsParser } from '../../parser';

export class DesktopNewsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, DesktopNewsParser);
    }

    public getParser(): DesktopNewsParser
    {
        return this.parser as DesktopNewsParser;
    }
}