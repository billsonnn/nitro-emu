import { RoomChatEnum } from '../../enum';
import { RoomRollerData } from '../../RoomRollerData';
import { IRoomUnit } from './IRoomUnit';
import { IRoomUnitHolder } from './IRoomUnitHolder';

export interface IRoomUnitController extends IRoomUnit
{
    chat(type: RoomChatEnum, message: string): void;
    setHolder(holder: IRoomUnitHolder): boolean;
    setRollerData(rollerData?: RoomRollerData): void;
    holder: IRoomUnitHolder;
    rollerData: RoomRollerData;
}