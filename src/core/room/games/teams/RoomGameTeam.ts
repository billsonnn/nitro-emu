import { Disposable } from '../../../../common';
import { IFurniture } from '../../../furniture';
import { IRoomUnitController } from '../../unit';
import { IRoomGame, IRoomGameTile } from '../interfaces';
import { IRoomGamePlayer, IRoomGameTeam } from './interfaces';
import { RoomGamePlayer } from './RoomGamePlayer';

export class RoomGameTeam extends Disposable implements IRoomGameTeam
{
    private _game: IRoomGame;
    private _color: number;

    private _lockedTiles: Map<number, IRoomGameTile>;

    private _players: Map<number, IRoomGamePlayer>;
    private _maxPlayers: number;
    private _score: number;

    private _gate: IFurniture;
    private _scoreboard: IFurniture;

    constructor(color: number, game: IRoomGame)
    {
        super();

        if(!game) throw new Error('invalid_game');

        this._game          = game;
        this._color         = color;

        this._lockedTiles   = new Map();

        this._players       = new Map();
        this._maxPlayers    = 5;
        this._score         = 0;

        this._gate          = null;
        this._scoreboard    = null;
    }

    public reset(): void
    {
        this.clearLockedTiles();
        this.resetScore();
        this.updateGate();
    }

    private clearLockedTiles(): void
    {
        this._lockedTiles.clear();
    }

    public getPlayer(unit: IRoomUnitController): IRoomGamePlayer
    {
        if(!unit) return null;

        const existing = this._players.get(unit.id);

        if(!existing) return null;

        return existing;
    }

    public hasPlayer(unit: IRoomUnitController): boolean
    {
        return this.getPlayer(unit) !== null;
    }

    public addPlayer(unit: IRoomUnitController): IRoomGamePlayer
    {
        if(!unit) return null;

        if(this._players.size === this._maxPlayers) return;

        const team = this._game.room.game.getTeamForUnit(unit);

        if(team)
        {
            if(team.game === this._game)
            {
                team.removePlayer(unit);
                
                return null;
            }

            team.removePlayer(unit);
        }

        const activePlayer = this.getPlayer(unit);

        if(activePlayer) return activePlayer;

        if(this.game.isLoaded) return null;

        const player = new RoomGamePlayer(this, unit);

        if(!player) return null;

        this._players.set(player.unit.id, player);

        this.updateGate();

        return player;
    }

    public removePlayer(unit: IRoomUnitController): void
    {
        if(!unit) return;

        const existing = this._players.get(unit.id);

        if(!existing) return;

        this._players.delete(unit.id);

        this.updateGate();

        existing.reset();

        existing.unit && existing.unit.location && existing.unit.location.effect();
    }

    public setGate(gate: IFurniture): void
    {
        if(!gate || this._gate) return;

        this._gate = gate;
    }

    public setScoreboard(scoreboard: IFurniture): void
    {
        if(!scoreboard || this._scoreboard) return;

        this._scoreboard = scoreboard;
    }

    public resetScore(): void
    {
        this._score = 0;

        if(this._players && this._players.size)
        {
            for(let player of this._players.values())
            {
                if(!player) continue;

                player.resetScore();
            }
        }

        this.updateScoreboard();
    }

    public updateScore(): void
    {
        this._score = 0;

        if(this._players && this._players.size)
        {
            for(let player of this._players.values())
            {
                if(!player) continue;

                this._score += player.score;
            }
        }

        this.updateScoreboard();
    }

    private updateGate(): void
    {
        if(!this._gate || (this._gate.room !== this._game.room)) return;

        this._gate.logic.setState(this._players.size);
    }

    private updateScoreboard(): void
    {
        if(!this._scoreboard || (this._scoreboard.room !== this._game.room)) return;

        this._gate.logic.setState(this._score);
    }

    public get color(): number
    {
        return this._color;
    }

    public get game(): IRoomGame
    {
        return this._game;
    }

    public get lockedTiles(): Map<number, IRoomGameTile>
    {
        return this._lockedTiles;
    }

    public get players(): Map<number, IRoomGamePlayer>
    {
        return this._players;
    }

    public get gate(): IFurniture
    {
        return this._gate;
    }

    public get scoreboard(): IFurniture
    {
        return this._scoreboard;
    }
}