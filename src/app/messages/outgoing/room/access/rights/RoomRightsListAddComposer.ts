import { IMessageComposer } from '../../../../../../networking';

export class RoomRightsListAddComposer implements IMessageComposer
{
    private _data: any[];

    constructor(roomId: number, userId: number, username: string)
    {
        this._data = [ roomId, userId, username ];
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