import { Position } from '../../../common';
import { IFurniture } from '../../furniture';
import { IRoomGame, IRoomGameTile } from './interfaces';

export class RoomGameTile implements IRoomGameTile
{
    private _game: IRoomGame;
    private _furniture: IFurniture;

    constructor(game: IRoomGame, furniture: IFurniture)
    {
        if(!game || !furniture) throw new Error('invalid_tile');

        this._game      = game;
        this._furniture = furniture;
    }

    public get game(): IRoomGame
    {
        return this._game;
    }

    public get furniture(): IFurniture
    {
        return this._furniture;
    }

    public get position(): Position
    {
        return this._furniture && this._furniture.position;
    }
}