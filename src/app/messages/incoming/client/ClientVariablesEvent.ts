import { IMessageEvent, MessageEvent } from '../../../../networking';
import { ClientVariablesParser } from '../../parser';

export class ClientVariablesEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ClientVariablesParser);
    }

    public getParser(): ClientVariablesParser
    {
        return this.parser as ClientVariablesParser;
    }
}