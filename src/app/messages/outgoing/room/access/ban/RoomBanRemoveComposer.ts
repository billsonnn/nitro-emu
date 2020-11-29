import { IMessageComposer } from '../../../../../../networking';

export class RoomBanRemoveComposer implements IMessageComposer
{
    private _data: any[];

    constructor(roomId: number, userId: number)
    {
        this._data = [ roomId, userId ];
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