import { INitroManager } from '../../../common';
import { IRoom } from '../../room';
import { IRoomUnitHolder } from '../../room/unit';
import { BotDetails } from '../BotDetails';

export interface IBot extends INitroManager, IRoomUnitHolder
{
    setRoom(room: IRoom): boolean;
    clearRoom(): void;
    id: number;
    details: BotDetails;
    room: IRoom;
}