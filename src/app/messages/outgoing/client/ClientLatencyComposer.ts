import { IMessageComposer } from '../../../../networking';

export class ClientLatencyComposer implements IMessageComposer
{
    private _data: any[];

    constructor(latency: number)
    {
        this._data = [ latency ];
    }

    public getMessageArray(): any[]
    {
        return this._data;
    }

    public dispose(): void
    {
        return;
    }
}