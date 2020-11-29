import { IMessageComposer } from '../../../../../networking';

export class CatalogGiftConfigComposer implements IMessageComposer
{
    private _data: any[];

    constructor()
    {
        this._data = [ true, 2, 0, 8, 0, 1, 2, 3, 4, 5, 6, 8, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0 ];
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