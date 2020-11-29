import { IMessageEvent, MessageEvent } from '../../../../networking';
import { SecurityTicketParser } from '../../parser';

export class SecurityTicketEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, SecurityTicketParser);
    }

    public getParser(): SecurityTicketParser
    {
        return this.parser as SecurityTicketParser;
    }
}