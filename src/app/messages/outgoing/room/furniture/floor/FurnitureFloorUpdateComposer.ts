import { IFurniture } from '../../../../../../core';
import { IMessageComposer } from '../../../../../../networking';
import { FurnitureComposerUtilities } from '../FurnitureComposerUtilities';

export class FurnitureFloorUpdateComposer implements IMessageComposer
{
    private _data: any[];

    constructor(furniture: IFurniture)
    {
        this._data = [ ...FurnitureComposerUtilities.composeFurniture(furniture, 0) ];
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