import { Position } from '../../../../common';
import { IFurniture } from '../../../furniture';
import { RoomTile } from '../../mapping';
import { IRoomUnitController } from './IRoomUnitController';

export interface IRoomUnitLocation
{
    dispose(): void;
    walkTo(position: Position): void;
    goTo(position: Position): void;
    processNextPosition(): void;
    updateHeight(tile?: RoomTile): void;
    clearPath(): void;
    stopWalking(): void;
    addStatus(type: string, value: string): void;
    hasStatus(...types: string[]): boolean;
    removeStatus(...types: string[]): void;
    lookAtPosition(position: Position, headOnly?: boolean, selfInvoked?: boolean): void;
    action(type?: number): void;
    sit(flag?: boolean, height?: number, direction?: number): void;
    lay(flag?: boolean, height?: number, direction?: number): void;
    dance(type?: number): void;
    effect(type?: number): void;
    hand(type?: number): void;
    idle(flag?: boolean): void;
    sign(type: number): void;
    getTile(): RoomTile;
    getNextTile(): RoomTile;
    getFurniture(): IFurniture;
    invokeCurrentLocation(): void;
    unit: IRoomUnitController;
    statuses: Map<string, string>;
    position: Position;
    positionNext: Position;
    positionGoal: Position;
    currentPath: Position[];
    isWalking: boolean;
    canWalk: boolean;
    danceType: number;
    effectType: number;
    handType: number;
    isIdle: boolean;
}