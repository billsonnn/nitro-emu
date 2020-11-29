import { IMessageComposer } from '../../../../../networking';

export class CatalogRecyclerPrizesComposer implements IMessageComposer
{
    private _data: any[];

    constructor()
    {
        this._data = [ 0 ];
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