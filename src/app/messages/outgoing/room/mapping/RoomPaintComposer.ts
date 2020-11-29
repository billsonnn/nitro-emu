import { IMessageComposer } from '../../../../../networking';

export class RoomPaintComposer implements IMessageComposer
{
    private _data: any[];

    constructor(type: string, value: string)
    {
        this._data = [ type, value ];
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