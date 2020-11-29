import { UserOutfit } from '../../../../../../core';
import { IMessageComposer } from '../../../../../../networking';

export class UserOutfitsComposer implements IMessageComposer
{
    private _data: any[];

    constructor(outfits: IterableIterator<UserOutfit> | UserOutfit[])
    {
        let totalOutfits = 0;

        const data: any[] = [];

        if(outfits)
        {
            for(let outfit of outfits)
            {
                if(!outfit) continue;

                data.push(outfit.slot, outfit.figure, outfit.gender.toUpperCase());

                totalOutfits++;
            }
        }

        this._data = [ 1, totalOutfits, ...data ];
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