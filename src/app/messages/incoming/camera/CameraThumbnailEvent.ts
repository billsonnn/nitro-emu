import { IMessageEvent, MessageEvent } from '../../../../networking';
import { CameraThumbnailParser } from '../../parser';

export class CameraThumbnailEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CameraThumbnailParser);
    }

    public getParser(): CameraThumbnailParser
    {
        return this.parser as CameraThumbnailParser;
    }
}