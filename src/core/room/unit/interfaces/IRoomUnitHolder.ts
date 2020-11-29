import { IRoomUnitController } from './IRoomUnitController';

export interface IRoomUnitHolder
{
    setRoomUnit(unit: IRoomUnitController): boolean;
    clearRoomUnit(): void;
    id: number;
    username: string;
    motto: string;
    figure: string;
    gender: string;
    roomUnit: IRoomUnitController;
}