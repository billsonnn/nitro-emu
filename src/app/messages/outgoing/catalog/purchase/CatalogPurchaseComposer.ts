import { CatalogItem } from '../../../../../core';
import { IMessageComposer } from '../../../../../networking';
import { CatalogPageComposer } from '../CatalogPageComposer';

export class CatalogPurchaseComposer implements IMessageComposer
{
    private _data: any[];

    constructor(item: CatalogItem)
    {
        this._data = [ ...CatalogPageComposer.composeItem(item) ];
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