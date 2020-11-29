import { IMessageComposer } from '../../../../../../networking';

export class UserClothingComposer implements IMessageComposer
{
    private _data: any[];

    constructor(clothingSetIds: number[], boundFurnitureNames: string[])
    {
        let totalClothing = 0;

        const clothingData: any[] = [];

        if(clothingSetIds)
        {
            for(let setId of clothingSetIds)
            {
                if(!setId) continue;

                clothingData.push(setId);

                totalClothing++;
            }
        }

        let totalFurnitureNames = 0;

        const furnitureNameData: any[] = [];

        if(boundFurnitureNames)
        {
            for(let name of boundFurnitureNames)
            {
                if(!name) continue;

                furnitureNameData.push(name);

                totalFurnitureNames++;
            }
        }

        this._data = [ totalClothing, ...clothingData, totalFurnitureNames, ...furnitureNameData ];
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