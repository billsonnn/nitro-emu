import { IDisposable } from '../../../../../common';
import { IRoomUnitController } from '../../../unit';
import { IRoomGameTeam } from './IRoomGameTeam';

export interface IRoomGamePlayer extends IDisposable
{
    reset(): void;
    resetScore(): void;
    adjustScore(amount?: number): void;
    setEffect(): void;
    clearEffect(): void;
    team: IRoomGameTeam;
    unit: IRoomUnitController;
    score: number;
}