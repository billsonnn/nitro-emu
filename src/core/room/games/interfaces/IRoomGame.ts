import { INitroManager, Position } from '../../../../common';
import { IRoom } from '../../interfaces';
import { IRoomUnitController } from '../../unit';
import { IRoomGameTeam } from '../teams';
import { IRoomGameTile } from './IRoomGameTile';
import { IRoomGameTimer } from './IRoomGameTimer';

export interface IRoomGame extends INitroManager
{
    getTeam(color: number): IRoomGameTeam;
    getTeamForUnit(unit: IRoomUnitController): IRoomGameTeam;
    removeTeam(color: number): void;
    removeAllTeams(): void;
    getTile(position: Position): IRoomGameTile;
    type: number;
    room: IRoom;
    timer: IRoomGameTimer;
    tiles: Map<number, IRoomGameTile>;
    teams: Map<number, IRoomGameTeam>;
}