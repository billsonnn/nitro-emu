import { IDisposable } from '../../../../../common';
import { IFurniture } from '../../../../furniture';
import { IRoomUnitController } from '../../../unit';
import { IRoomGame, IRoomGameTile } from '../../interfaces';
import { IRoomGamePlayer } from './IRoomGamePlayer';

export interface IRoomGameTeam extends IDisposable
{
    reset(): void;
    getPlayer(unit: IRoomUnitController): IRoomGamePlayer;
    hasPlayer(unit: IRoomUnitController): boolean;
    addPlayer(unit: IRoomUnitController): IRoomGamePlayer
    removePlayer(unit: IRoomUnitController): void;
    setGate(gate: IFurniture): void;
    setScoreboard(scoreboard: IFurniture): void;
    resetScore(): void;
    updateScore(): void;
    color: number;
    game: IRoomGame;
    lockedTiles: Map<number, IRoomGameTile>;
    players: Map<number, IRoomGamePlayer>;
    gate: IFurniture;
    scoreboard: IFurniture;
}