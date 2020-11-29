import { IMessageComposer } from '../../../../../networking';

export class RoomInfoOwnerComposer implements IMessageComposer
{
    private _data: any[];

    constructor(roomId: number, isOwner: boolean)
    {
        this._data = [ roomId, isOwner ];
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