import { IMessageComposer } from '../../../../../../networking';

export class RoomRightsComposer implements IMessageComposer
{
    private _data: any[];

    constructor(type: number)
    {
        this._data = [ type ];
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