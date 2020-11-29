import { IMessageComposer } from '../../../../../../networking';

export class UserRoomFavoriteCountComposer implements IMessageComposer
{
    private _data: any[];

    constructor(maxAllowed: number, roomIds: number[])
    {
        this._data = [ maxAllowed, roomIds.length, ...roomIds ];
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