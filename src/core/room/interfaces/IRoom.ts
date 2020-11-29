import { INitroManager } from '../../../common';
import { IGroup } from '../../group';
import { NavigatorCategory } from '../../navigator';
import { IUser } from '../../user';
import { RoomBotManager, RoomFurnitureManager, RoomGameManager, RoomSecurityManager, RoomUnitManager, RoomWiredManager } from '../managers';
import { RoomMap, RoomModel } from '../mapping';
import { RoomDetails } from '../RoomDetails';
import { RoomManager } from '../RoomManager';
import { RoomTaskManager } from '../tasks';

export interface IRoom extends INitroManager
{
    enterRoom(user: IUser): void;
    tryDispose(): void;
    cancelDispose(): void;
    manager: RoomManager;
    id: number;
    details: RoomDetails;
    category: NavigatorCategory;
    group: IGroup;
    security: RoomSecurityManager;
    furniture: RoomFurnitureManager;
    game: RoomGameManager;
    unit: RoomUnitManager;
    bot: RoomBotManager;
    wired: RoomWiredManager;
    task: RoomTaskManager;
    model: RoomModel;
    map: RoomMap;
}