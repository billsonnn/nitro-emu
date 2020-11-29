import { IMessageComposer } from '../../../../networking';

export class CatalogModeComposer implements IMessageComposer
{
    private _data: any[];

    constructor(mode: number)
    {
        this._data = [ mode ];
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