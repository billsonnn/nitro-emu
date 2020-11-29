import { IFurniture } from '../../../../../../core';
import { IMessageComposer } from '../../../../../../networking';
import { FurnitureComposerUtilities } from '../FurnitureComposerUtilities';

export class FurnitureFloorComposer implements IMessageComposer
{
    private _data: any[];

    constructor(owners: IterableIterator<[number, string]>, furniture: IterableIterator<IFurniture> | IFurniture[])
    {
        let totalOwners = 0;

        const ownerData: any[] = [];

        if(owners)
        {
            for(let [ id, username ] of owners)
            {
                ownerData.push(id, username);

                totalOwners++;
            }
        }

        let totalFurniture = 0;

        const furnitureData: any[] = [];

        if(furniture)
        {
            for(let item of furniture)
            {
                if(!item) continue;

                furnitureData.push(...FurnitureComposerUtilities.composeFurniture(item, 1));

                totalFurniture++;
            }
        }

        this._data = [ totalOwners, ...ownerData, totalFurniture, ...furnitureData ];
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