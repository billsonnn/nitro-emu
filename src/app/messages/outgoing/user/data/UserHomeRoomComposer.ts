import { IMessageComposer } from '../../../../../networking';

export class UserHomeRoomComposer implements IMessageComposer
{
    private _data: any [];

    constructor(roomId: number, update: boolean = false)
    {
        this._data = [ roomId, (update ? roomId : 0) ];
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