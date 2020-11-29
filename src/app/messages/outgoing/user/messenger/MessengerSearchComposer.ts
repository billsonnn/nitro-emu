import { IMessageComposer } from '../../../../../networking';

export class MessengerSearchComposer implements IMessageComposer
{
    private _data: any[];

    constructor(results: any[])
    {
        this._data = [ ...results ];
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