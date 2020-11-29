import { IMessageEvent, MessageEvent } from '../../../../networking';
import { ClientEventTrackerParser } from '../../parser';

export class ClientEventTrackerEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ClientEventTrackerParser);
    }

    public getParser(): ClientEventTrackerParser
    {
        return this.parser as ClientEventTrackerParser;
    }
}