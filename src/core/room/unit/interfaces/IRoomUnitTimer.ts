import { IRoomUnitController } from './IRoomUnitController';

export interface IRoomUnitTimer
{
    init(): void;
    dispose(): void;
    startIdleTimer(): void;
    stopIdleTimer(): void;
    startLookTimer(): void;
    stopLookTimer(): void;
    unit: IRoomUnitController;
}