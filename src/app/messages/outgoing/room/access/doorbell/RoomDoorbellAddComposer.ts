import { IMessageComposer } from '../../../../../../networking';

export class RoomDoorbellAddComposer implements IMessageComposer
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