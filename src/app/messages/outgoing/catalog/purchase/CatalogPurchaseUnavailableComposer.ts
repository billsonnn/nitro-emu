import { IMessageComposer } from '../../../../../networking';

export class CatalogPurchaseUnavailableComposer implements IMessageComposer
{
    private _data: any[];

    constructor(code: number)
    {
        this._data = [ code ];
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