import { IMessageComposer } from '../../../../../../networking';

export class RoomMuteUserComposer implements IMessageComposer
{
    private _data: any[];

    constructor(seconds: number)
    {
        this._data = [ seconds ];
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