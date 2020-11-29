import { IMessageEvent, MessageEvent } from '../../../../networking';
import { ClientPongParser } from '../../parser';

export class ClientPongEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ClientPongParser);
    }

    public getParser(): ClientPongParser
    {
        return this.parser as ClientPongParser;
    }
}