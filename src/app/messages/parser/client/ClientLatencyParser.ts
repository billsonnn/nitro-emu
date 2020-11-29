import { IMessageDataWrapper, IMessageParser } from '../../../../networking';

export class ClientLatencyParser implements IMessageParser
{
    private _latency: number;

    public flush(): boolean
    {
        this._latency = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._latency = wrapper.readInt();
        
        return true;
    }

    public get latency(): number
    {
        return this._latency;
    }
}