import { IRoomUnit } from '../../../room';
import { IUser } from '../../../user';
import { IFurnitureData } from '../../data';
import { IFurnitureDefinition } from '../../definition';
import { IFurniture } from '../../interfaces';

export interface IFurnitureLogic
{
    initialize(definition: IFurnitureDefinition): boolean;
    dispose(): void;
    onReady(): boolean;
    onEnter(unit: IRoomUnit): void;
    onLeave(unit: IRoomUnit): void;
    beforeStep(unit: IRoomUnit): void;
    onStep(unit: IRoomUnit): void;
    onStop(unit: IRoomUnit): void;
    onPlace(user: IUser): void;
    onMove(user: IUser): void;
    onPickup(user: IUser): void;
    onInteract(user: IUser, state?: number): void;
    setState(state?: number, refresh?: boolean): boolean;
    setFurniture(furniture: IFurniture): void;
    isFurnitureStackable(): boolean;
    isFurnitureWalkable(): boolean;
    isFurnitureSittable(): boolean;
    isFurnitureLayable(): boolean
    isFurnitureOpen(): boolean;
    isFurnitureRollable(): boolean;
    isFurnitureToggleable(): boolean;
    furnitureStackHeight(): number;
    refreshFurniture(): void;
    refreshFurnitureData(): void;
    furniture: IFurniture;
    definition: IFurnitureDefinition;
    data: IFurnitureData;
    dataKey: number;
}