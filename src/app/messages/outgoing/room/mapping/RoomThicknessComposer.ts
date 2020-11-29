import { IRoom } from '../../../../../core';
import { IMessageComposer } from '../../../../../networking';

export class RoomThicknessComposer implements IMessageComposer
{
    private _data: any[];

    constructor(room: IRoom)
    {
        this._data = [
            room.details.hideWalls,
            room.details.thicknessWall,
            room.details.thicknessFloor
        ];
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