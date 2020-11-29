import { INitroManager } from '../../common';
import { IDatabaseInstance } from '../../database';
import { CatalogManager } from '../catalog';
import { ICommandManager } from '../command';
import { IFurnitureManager } from '../furniture';
import { GroupManager } from '../group';
import { NavigatorManager } from '../navigator';
import { RoomManager } from '../room';
import { SecurityManager } from '../security';
import { UserManager } from '../user';

export interface INitroCore extends INitroManager
{
    database: IDatabaseInstance;
    command: ICommandManager;
    furniture: IFurnitureManager;
    catalog: CatalogManager;
    navigator: NavigatorManager;
    group: GroupManager;
    room: RoomManager;
    security: SecurityManager;
    user: UserManager;
}