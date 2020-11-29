import { IFurniture } from '../../../../../../core';
import { IMessageComposer } from '../../../../../../networking';
import { FurnitureComposerUtilities } from '../FurnitureComposerUtilities';

export class FurnitureWallAddComposer implements IMessageComposer
{
    private _data: any[];

    constructor(furniture: IFurniture)
    {
        this._data = [ ...FurnitureComposerUtilities.composeFurniture(furniture), (furniture.ownerName || null) ];
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