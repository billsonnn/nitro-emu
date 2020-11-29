import { IDisposable, Position } from '../../../common';
import { IRoom, RoomRollerData, RoomTile } from '../../room';
import { IUser } from '../../user';
import { IFurnitureLogic } from '../logic';
import { IFurnitureManager } from './IFurnitureManager';

export interface IFurniture extends IDisposable
{
    save(queue?: boolean): void;
    saveNow(): Promise<void>;
    setRollerData(rollerData?: RoomRollerData): void;
    setRoom(room: IRoom): boolean;
    clearRoom(): void;
    setOwner(user: IUser): boolean;
    canPlaceOnTop(furniture: IFurniture, rolling?: boolean): boolean;
    isValidPlacement(position: Position, room?: IRoom): boolean
    getTile(): RoomTile;
    getTiles(): RoomTile[];
    getPositions(): Position[];
    manager: IFurnitureManager;
    logic: IFurnitureLogic;
    room: IRoom;
    position: Position;
    rollerData: RoomRollerData;
    height: number;
    id: number;
    roomId: number;
    userId: number;
    ownerName: string;
    wallPosition: string;
    extraData: string;
    wiredData: string;
}