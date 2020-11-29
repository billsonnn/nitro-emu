import { IMessageDataWrapper, IMessageParser } from '../../../../networking';

export class SecurityTicketParser implements IMessageParser
{
    private _ticket: string;

    public flush(): boolean
    {
        this._ticket = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._ticket = wrapper.readString();
        
        return true;
    }

    public get ticket(): string
    {
        return this._ticket;
    }
}