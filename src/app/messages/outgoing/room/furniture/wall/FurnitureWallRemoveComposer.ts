import { IFurniture } from '../../../../../../core';
import { IMessageComposer } from '../../../../../../networking';

export class FurnitureWallRemoveComposer implements IMessageComposer
{
    private _data: any[];

    constructor(furniture: IFurniture, animate: boolean = true)
    {
        this._data = [ (furniture.id.toString()), furniture.userId ];
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