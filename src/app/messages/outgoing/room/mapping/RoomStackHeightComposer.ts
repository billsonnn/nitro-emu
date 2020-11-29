import { RoomTile } from '../../../../../core';
import { Byte, IMessageComposer, Short } from '../../../../../networking';

export class RoomStackHeightComposer implements IMessageComposer
{
    private _data: any[];

    constructor(tiles: IterableIterator<RoomTile> | RoomTile[])
    {
        let totalTiles = 0;

        const data: any[] = [];

        for(let tile of tiles)
        {
            if(!tile) continue;

            data.push(new Byte(tile.position.x), new Byte(tile.position.y), new Short(tile.relativeHeight));

            totalTiles++;
        }

        this._data = [ new Byte(totalTiles), ...data ];
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