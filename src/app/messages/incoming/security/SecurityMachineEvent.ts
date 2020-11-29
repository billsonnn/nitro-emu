import { IMessageEvent, MessageEvent } from '../../../../networking';
import { SecurityMachineParser } from '../../parser';

export class SecurityMachineEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, SecurityMachineParser);
    }

    public getParser(): SecurityMachineParser
    {
        return this.parser as SecurityMachineParser;
    }
}