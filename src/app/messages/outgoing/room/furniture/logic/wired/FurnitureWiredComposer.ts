import { FurnitureWiredData } from '../../../../../../../core';
import { IMessageComposer } from '../../../../../../../networking';

export class FurnitureWiredComposer implements IMessageComposer
{
    private _data: any[];

    constructor(wiredData: FurnitureWiredData)
    {
        this._data = [ ...wiredData.getMessageArray() ];
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