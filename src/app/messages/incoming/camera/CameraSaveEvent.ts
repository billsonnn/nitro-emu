import { IMessageEvent, MessageEvent } from '../../../../networking';
import { CameraSaveParser } from '../../parser';

export class CameraSaveEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CameraSaveParser);
    }

    public getParser(): CameraSaveParser
    {
        return this.parser as CameraSaveParser;
    }
}