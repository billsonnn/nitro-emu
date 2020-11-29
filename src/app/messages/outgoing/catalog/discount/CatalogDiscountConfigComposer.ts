import { IMessageComposer } from '../../../../../networking';

export class CatalogDiscountConfigComposer implements IMessageComposer
{
    private _data: any[];

    constructor()
    {
        this._data = [ 100, 6, 1, 1, 2, 40, 99 ];
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