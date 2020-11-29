import { FurnitureBattleBanzaiGateLogic, FurnitureBattleBanzaiScoreboardLogic, FurnitureBattleBanzaiTileLogic } from '../../../../furniture';
import { RoomGame } from '../../RoomGame';
import { IRoomGameTeam } from '../../teams';
import { BattleBanzaiGameTile } from './BattleBanzaiGameTile';

export class BattleBanzaiGame extends RoomGame
{
    protected onInit(): void
    {
        this.loadTiles();
    }

    protected onDispose(): void
    {

    }

    protected setGate(team: IRoomGameTeam): void
    {
        if(!team) return;

        const gates = this.room.furniture.getFurnitureByLogic(FurnitureBattleBanzaiGateLogic);

        if(!gates || !gates.length) return;

        for(let gate of gates)
        {
            if(!gate) continue;

            const logic = gate.logic as FurnitureBattleBanzaiGateLogic;

            if(!logic) continue;

            if(logic.teamColor() !== team.color) continue;

            team.setGate(gate);

            return;
        }
    }

    protected setScoreboard(team: IRoomGameTeam): void
    {
        if(!team) return;

        const scoreboards = this.room.furniture.getFurnitureByLogic(FurnitureBattleBanzaiScoreboardLogic);

        if(!scoreboards || !scoreboards.length) return;

        for(let scoreboard of scoreboards)
        {
            if(!scoreboard) continue;

            const logic = scoreboard.logic as FurnitureBattleBanzaiScoreboardLogic;

            if(!logic) continue;

            if(logic.teamColor() !== team.color) continue;

            team.setScoreboard(scoreboard);

            return;
        }
    }

    private loadTiles(): void
    {
        if(!this.room) return;

        const tiles = this.room.furniture.getFurnitureByLogic(FurnitureBattleBanzaiTileLogic);

        if(!tiles || !tiles.length) return;

        for(let tile of tiles)
        {
            if(!tile) continue;

            const gameTile = new BattleBanzaiGameTile(this, tile);

            if(!gameTile) continue;

            this.tiles.set(gameTile.furniture.id, gameTile);
        }
    }
}