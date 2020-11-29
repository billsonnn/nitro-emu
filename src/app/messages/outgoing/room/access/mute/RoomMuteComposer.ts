import { IMessageComposer } from '../../../../../../networking';

export class RoomMuteComposer implements IMessageComposer
{
    private _data: any[];

    constructor(flag: boolean)
    {
        this._data = [ flag ];
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