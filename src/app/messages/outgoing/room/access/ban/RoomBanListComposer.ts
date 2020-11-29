import { RoomBan } from '../../../../../../core';
import { IMessageComposer } from '../../../../../../networking';

export class RoomBanListComposer implements IMessageComposer
{
    private _data: any[];

    constructor(roomId: number, bans: IterableIterator<RoomBan>)
    {
        let totalBans = 0;

        const data: any[] = [];

        if(bans)
        {
            for(let ban of bans)
            {
                data.push(ban.userId, ban.username);

                totalBans++;
            }
        }

        this._data = [ roomId, totalBans, ...data ];
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