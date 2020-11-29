import { IMessageComposer } from '../../../../../../networking';

export class RoomDoorbellDeniedComposer implements IMessageComposer
{
    private _data: any[];

    constructor(username: string)
    {
        this._data = [ username ];
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