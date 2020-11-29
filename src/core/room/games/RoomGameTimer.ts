import { Position } from '../../../common';
import { IFurniture } from '../../furniture';
import { IRoomGame, IRoomGameTimer } from './interfaces';

export class RoomGameTimer implements IRoomGameTimer
{
    private _game: IRoomGame;
    private _furniture: IFurniture;

    private _secondsAllowed: number;
    private _timerInterval: NodeJS.Timeout;

    constructor(game: IRoomGame, furniture: IFurniture)
    {
        if(!game || !furniture) throw new Error('invalid_tile');

        this._game              = game;
        this._furniture         = furniture;

        this._secondsAllowed    = 0;
        this._timerInterval     = null;
    }

    public resetTimer(): void
    {
        this.stopTimer();

        this._furniture.logic.setState(0);
    }

    public stopTimer(): void
    {
        if(!this._timerInterval) return;

        clearTimeout(this._timerInterval);

        this._timerInterval = null;
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