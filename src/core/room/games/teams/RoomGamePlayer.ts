import { Disposable } from '../../../../common';
import { IRoomUnitController } from '../../unit';
import { IRoomGamePlayer, IRoomGameTeam } from './interfaces';

export class RoomGamePlayer extends Disposable implements IRoomGamePlayer
{
    private _team: IRoomGameTeam;
    private _unit: IRoomUnitController;

    private _score: number;

    constructor(team: IRoomGameTeam, unit: IRoomUnitController)
    {
        super();
        
        if(!team || !unit) throw new Error('invalid_player');

        this._team  = team;
        this._unit  = unit;

        this.resetScore();
        this.setEffect();
    }

    public reset(): void
    {
        this.resetScore();
    }

    public resetScore(): void
    {
        this._score = 0;

        //this._team.updateScore();
    }

    public adjustScore(amount: number = 0): void
    {
        this._score += amount;

        //this._team.updateScore();
    }

    public setEffect(): void
    {
        if(!this._unit || !this._unit.location) return;

        this._unit.location.effect(this._team.game.type + this._team.color);
    }

    public clearEffect(): void
    {
        if(!this._unit || !this._unit.location) return;

        this._unit.location.effect();
    }

    public get team(): IRoomGameTeam
    {
        return this._team;
    }

    public get unit(): IRoomUnitController
    {
        return this._unit;
    }

    public get score(): number
    {
        return this._score;
    }
}