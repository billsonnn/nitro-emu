import { IMessageComposer } from '../../../../../../networking';

export class UserRoomFavoriteComposer implements IMessageComposer
{
    private _data: any[];

    constructor(roomId: number, flag: boolean)
    {
        this._data = [ roomId, flag ];
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