import { IMessageComposer } from '../../../../networking';

export class RoomCreatedComposer implements IMessageComposer
{
    private _data: any[];

    constructor(id: number, name: string)
    {
        this._data = [ id, name ];
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