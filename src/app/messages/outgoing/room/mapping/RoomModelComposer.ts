import { IRoom } from '../../../../../core';
import { IMessageComposer } from '../../../../../networking';

export class RoomModelComposer implements IMessageComposer
{
    private _data: any[];

    constructor(room: IRoom)
    {
        this._data = [ ];

        const model = room && room.model;

        if(!model) return;

        this._data.push(model.isZoomed, room.details.wallHeight, model.model);
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