import { INitroManager } from '../../../common';
import { IConnection, IConnectionHolder } from '../../../networking';
import { IRoomUnitHolder } from '../../room';
import { IRank } from '../../security';
import { UserInventory } from '../inventory';
import { UserMessenger } from '../messenger';
import { UserNotification } from '../notification';
import { UserDetails } from '../UserDetails';
import { UserManager } from '../UserManager';

export interface IUser extends INitroManager, IRoomUnitHolder, IConnectionHolder
{
    setConnection(connection: IConnection): boolean;
    hasPermission(permission: string): boolean;
    refreshRank(): void;
    id: number;
    manager: UserManager;
    connection: IConnection;
    details: UserDetails;
    rank: IRank;
    inventory: UserInventory;
    messenger: UserMessenger;
    notification: UserNotification;
}