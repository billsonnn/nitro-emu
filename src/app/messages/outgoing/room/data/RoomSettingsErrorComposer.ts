import { IMessageComposer } from '../../../../../networking';

export class RoomSettingsErrorComposer implements IMessageComposer
{
    private _data: any[];

    constructor(roomId: number, errorCode: number, message: string)
    {
        this._data = [ roomId, errorCode, message ];
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