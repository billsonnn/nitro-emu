import { NitroManager } from '../../../common';
import { IRoomGame, IRoomGameTeam, RoomGameFactory } from '../games';
import { IRoom } from '../interfaces';
import { IRoomUnitController } from '../unit';

export class RoomGameManager extends NitroManager
{
    private _room: IRoom;

    private _games: Map<number, IRoomGame>;

    constructor(room: IRoom)
    {
        super(room.logger);

        this._room  = room;

        this._games = new Map();
    }

    protected onDispose(): void
    {
        this.removeAllGames();
    }

    public getGame(type: number): IRoomGame
    {
        return this.createGame(type);
    }

    private getActiveGame(type: number): IRoomGame
    {
        if(!type) return null;

        const existing = this._games.get(type);

        if(!existing) return null;

        return existing;
    }

    public getTeamForUnit(unit: IRoomUnitController): IRoomGameTeam
    {
        if(!unit || !this._games.size) return null;

        for(let game of this._games.values())
        {
            if(!game) continue;

            const team = game.getTeamForUnit(unit);

            if(!team) continue;

            return team;
        }

        return null;
    }

    private createGame(type: number): IRoomGame
    {
        const existing = this.getActiveGame(type);

        if(existing) return existing;

        const game = RoomGameFactory.createGameInstance(type, this._room);

        if(!game) return null;

        this._games.set(type, game);

        return game;
    }

    public removeGame(type: number): void
    {
        const existing = this.getActiveGame(type);

        if(!existing) return;

        this._games.delete(type);

        existing.dispose();
    }

    public removeAllGames(): void
    {
        if(!this._games || !this._games.size) return;

        for(let game of this._games.values())
        {
            if(!game) continue;

            this._games.delete(game.type);

            game.dispose();
        }
    }

    public removeUnitFromTeam(unit: IRoomUnitController): void
    {
        if(!unit) return;

        const team = this.getTeamForUnit(unit);

        if(!team) return;

        team.removePlayer(unit);
    }

    public get room(): IRoom
    {
        return this._room;
    }

    public get games(): Map<number, IRoomGame>
    {
        return this._games;
    }
}