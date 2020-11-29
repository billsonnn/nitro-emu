import { IMessageComposer } from '../../../../../../networking';

export class FurnitureStackHelperComposer implements IMessageComposer
{
    private _data: any[];

    constructor(itemId: number, height: number)
    {
        this._data = [ itemId, height ];
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