import { IMessageEvent, MessageEvent } from '../../../../networking';
import { CameraPriceParser } from '../../parser';

export class CameraPriceEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CameraPriceParser);
    }

    public getParser(): CameraPriceParser
    {
        return this.parser as CameraPriceParser;
    }
}