import { IMessageComposer } from '../../../../../../networking';

export class RoomRightsListComposer implements IMessageComposer
{
    private _data: any[];

    constructor(roomId: number, rights: IterableIterator<[number, string]>)
    {
        let totalRights = 0;

        const data: any[] = [];

        if(rights)
        {
            for(let [ id, username ] of rights)
            {
                data.push(id, username);

                totalRights++;
            }
        }

        this._data = [ roomId, totalRights, ...data ];
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