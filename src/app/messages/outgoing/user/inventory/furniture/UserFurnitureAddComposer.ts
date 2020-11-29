import { IMessageComposer } from '../../../../../../networking';

export class UserFurnitureAddComposer implements IMessageComposer
{
    private _data: any[];

    constructor(ids: number[])
    {
        let totalFurniture = 0;

        const data: any[] = [];

        if(ids && ids.length)
        {
            for(let id of ids)
            {
                if(!id) continue;

                data.push(id);

                totalFurniture++;
            }
        }
        
        this._data = [ 1, 1, totalFurniture, ...data ]
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