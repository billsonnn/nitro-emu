import { IMessageEvent, MessageEvent } from '../../../../networking';
import { ClientReleaseVersionParser } from '../../parser';

export class ClientReleaseVersionEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ClientReleaseVersionParser);
    }

    public getParser(): ClientReleaseVersionParser
    {
        return this.parser as ClientReleaseVersionParser;
    }
}