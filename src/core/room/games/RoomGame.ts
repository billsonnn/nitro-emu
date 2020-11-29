import { NitroManager, Position } from '../../../common';
import { IRoom } from '../interfaces';
import { IRoomUnitController } from '../unit';
import { IRoomGame, IRoomGameTile, IRoomGameTimer } from './interfaces';
import { IRoomGameTeam, RoomGameTeam } from './teams';

export class RoomGame extends NitroManager implements IRoomGame
{
    private _type: number;
    private _room: IRoom;

    private _timer: IRoomGameTimer;
    private _tiles: Map<number, IRoomGameTile>;
    private _teams: Map<number, IRoomGameTeam>;

    constructor(type: number, room: IRoom)
    {
        super();

        if(!type || !room) throw new Error('invalid_game');

        this._type          = type;
        this._room          = room;

        this._timer         = null;
        this._tiles         = new Map();
        this._teams         = new Map();
    }

    public getTeam(color: number): IRoomGameTeam
    {
        return this.createTeam(color);
    }

    public getTeamForUnit(unit: IRoomUnitController): IRoomGameTeam
    {
        if(!unit || !this._teams.size) return null;

        for(let team of this._teams.values())
        {
            if(!team || !team.hasPlayer(unit)) continue;

            return team;
        }

        return null;
    }

    private getActiveTeam(color: number): IRoomGameTeam
    {
        const existing = this._teams.get(color);

        if(!existing) return null;

        return existing;
    }

    private createTeam(color: number): IRoomGameTeam
    {
        const existing = this.getActiveTeam(color);

        if(existing) return existing;

        const team = new RoomGameTeam(color, this);

        if(!team) return null;

        this.setGate(team);
        this.setScoreboard(team);

        team.reset();

        this._teams.set(team.color, team);

        return team;
    }

    public removeTeam(color: number): void
    {
        const existing = this.getActiveTeam(color);

        if(!existing) return;

        this._teams.delete(color);

        existing.dispose();
    }

    public removeAllTeams(): void
    {
        if(!this._teams || !this._teams.size) return;

        for(let team of this._teams.values())
        {
            if(!team) continue;

            this._teams.delete(team.color);

            team.dispose();
        }
    }

    public getTile(position: Position): IRoomGameTile
    {
        if(!position) return null;

        if(!this._tiles || !this._tiles.size) return null;

        for(let tile of this._tiles.values())
        {
            if(!tile || !tile.position.compare(position)) continue;

            return tile;
        }

        return null;
    }

    protected setGate(team: IRoomGameTeam): void
    {
        return;
    }

    protected setScoreboard(team: IRoomGameTeam): void
    {
        return;
    }

    public get type(): number
    {
        return this._type;
    }

    public get room(): IRoom
    {
        return this._room;
    }

    public get timer(): IRoomGameTimer
    {
        return this._timer;
    }

    public get tiles(): Map<number, IRoomGameTile>
    {
        return this._tiles;
    }

    public get teams(): Map<number, IRoomGameTeam>
    {
        return this._teams;
    }
}