import { IMessageComposer } from '../../../../networking';

export class CatalogUpdatedComposer implements IMessageComposer
{
    private _data: any[];

    constructor()
    {
        this._data = [ false ];
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