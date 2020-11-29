import { IFurniture } from '../../../../../../core';
import { IMessageComposer } from '../../../../../../networking';
import { FurnitureComposerUtilities } from '../FurnitureComposerUtilities';

export class FurnitureWallUpdateComposer implements IMessageComposer
{
    private _data: any[];

    constructor(furniture: IFurniture)
    {
        this._data = [ ...FurnitureComposerUtilities.composeFurniture(furniture), (furniture.userId.toString()) ];
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