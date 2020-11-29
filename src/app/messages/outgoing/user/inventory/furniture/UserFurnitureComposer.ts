import { IFurniture } from '../../../../../../core';
import { IMessageComposer } from '../../../../../../networking';
import { FurnitureComposerUtilities } from '../../../room';

export class UserFurnitureComposer implements IMessageComposer
{
    private _data: any[];

    constructor(totalPages: number, currentPage: number, furniture: IFurniture[])
    {
        let totalFurniture = 0;

        const data: any[] = [];

        if(furniture && furniture.length)
        {
            for(let item of furniture)
            {
                if(!item) continue;

                data.push(...FurnitureComposerUtilities.composeFurnitureAsInventory(item));

                totalFurniture++;
            }
        }
        
        this._data = [ totalPages, (currentPage - 1), totalFurniture, ...data ]
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