import { IFurniture } from '../../../../../../core';
import { IMessageComposer } from '../../../../../../networking';
import { FurnitureComposerUtilities } from '../FurnitureComposerUtilities';

export class FurnitureFloorAddComposer implements IMessageComposer
{
    private _data: any[];

    constructor(furniture: IFurniture)
    {
        this._data = [ ...FurnitureComposerUtilities.composeFurniture(furniture, 1), (furniture.ownerName || null) ];
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