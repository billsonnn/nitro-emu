import { IDisposable } from '../../../../common';
import { RoomUnitManager } from '../../managers';
import { IRoomUnitLocation } from './IRoomUnitLocation';
import { IRoomUnitTimer } from './IRoomUnitTimer';

export interface IRoomUnit extends IDisposable
{
    ready(): void;
    id: number;
    type: number;
    manager: RoomUnitManager;
    location: IRoomUnitLocation;
    timer: IRoomUnitTimer;
    needsUpdate: boolean;
}