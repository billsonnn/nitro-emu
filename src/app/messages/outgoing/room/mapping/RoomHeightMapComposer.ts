import { IRoom } from '../../../../../core';
import { IMessageComposer, Short } from '../../../../../networking';

export class RoomHeightMapComposer implements IMessageComposer
{
    private _data: any[];

    constructor(room: IRoom)
    {
        this._data = [ ];

        const model = room && room.model;
        const map   = room && room.map;

        if(!model || !map) return;

        this._data.push((model.totalSize / model.totalY), model.totalSize);
        
        for(let tile of map.tiles.values()) this._data.push(new Short(tile.relativeHeight));
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