import { IMessageEvent, MessageEvent } from '../../../../networking';
import { ClientLatencyParser } from '../../parser';

export class ClientLatencyEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ClientLatencyParser);
    }

    public getParser(): ClientLatencyParser
    {
        return this.parser as ClientLatencyParser;
    }
}