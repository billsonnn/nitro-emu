import { IMessageDataWrapper, IMessageParser } from '../../../../networking';

export class ClientVariablesParser implements IMessageParser
{
    private _someInt: number;
    private _clientBase: string;
    private _clientVariables: string;

    public flush(): boolean
    {
        this._someInt           = 0;
        this._clientBase        = null;
        this._clientVariables   = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._someInt           = wrapper.readInt();
        this._clientBase        = wrapper.readString();
        this._clientVariables   = wrapper.readString();

        return true;
    }

    public get someInt(): number
    {
        return this._someInt;
    }

    public get clientBase(): string
    {
        return this._clientBase;
    }

    public get clientVariables(): string
    {
        return this._clientVariables;
    }
}