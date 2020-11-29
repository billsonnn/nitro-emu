import { IMessageComposer } from '../../../../../networking';

export class CatalogMarketplaceConfigComposer implements IMessageComposer
{
    private _data: any[];

    constructor()
    {
        this._data = [ true, 1, 10, 5, 1, 1000000, 48, 7 ];
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