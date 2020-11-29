import { NitroManager } from '../../common';
import { UserEntity } from '../../database';
import { IConnection, IMessageComposer, IMessageDataWrapper } from '../../networking';
import { IRoomUnitController } from '../room';
import { IRank } from '../security';
import { IUser } from './interfaces';
import { UserInventory } from './inventory';
import { UserMessenger } from './messenger';
import { UserNotification } from './notification';
import { UserDetails } from './UserDetails';
import { UserManager } from './UserManager';

export class User extends NitroManager implements IUser
{
    private _id: number;
    private _manager: UserManager;
    private _connection: IConnection;

    private _details: UserDetails;
    private _rank: IRank;
    private _inventory: UserInventory;
    private _messenger: UserMessenger;
    private _notification: UserNotification;

    private _roomUnit: IRoomUnitController;

    constructor(manager: UserManager, entity: UserEntity)
    {
        super();

        if(!manager) throw new Error('invalid_manager');

        if(!(entity instanceof UserEntity)) throw new Error('invalid_entity');

        this._id            = entity.id;
        this._manager       = manager;
        this._connection    = null;

        this._rank          = null;
        this._details       = new UserDetails(this, entity);
        this._inventory     = new UserInventory(this);
        this._messenger     = new UserMessenger(this);
        this._notification  = new UserNotification(this);

        this._roomUnit      = null;

        this.logger.description = this._id;
    }

    protected async onInit(): Promise<void>
    {
        this.refreshRank();

        if(this._inventory) await this._inventory.init();
        if(this._messenger) await this._messenger.init();
        if(this._notification) await this._notification.init();

        this.logger.log(`Initialized`);
    }

    protected async onDispose(): Promise<void>
    {
        this.clearRoomUnit();

        await this._manager.removeUser(this._id);
        
        if(this._details) this._details.updateOnline(false);

        if(this._notification) await this._notification.dispose();
        if(this._messenger) await this._messenger.dispose();
        if(this._inventory) await this._inventory.dispose();
        if(this._connection) this._connection.dispose();

        if(this._details) await this._details.saveNow();

        this.logger.log(`Disposed`);
    }

    public setConnection(connection: IConnection): boolean
    {
        if(this._connection && (this._connection !== connection)) return false;

        if(!connection.setUser(this)) return false;

        this._connection = connection;

        return true;
    }

    public setRoomUnit(unit: IRoomUnitController): boolean
    {
        this.clearRoomUnit();

        if(!unit.setHolder(this)) return false;

        this._roomUnit = unit;

        if(this._messenger) this._messenger.updateAllFriends();

        return true;
    }

    public clearRoomUnit(): void
    {
        if(this._roomUnit)
        {
            this._roomUnit.dispose();

            this._roomUnit = null;

            if(this._messenger) this._messenger.updateAllFriends();
        }

        this._manager.core.room.clearRoomStatus(this);
    }

    public processWrapper(...wrappers: IMessageDataWrapper[]): void
    {
        return this._connection && this._connection.processWrapper(...wrappers);
    }

    public processComposer(...composers: IMessageComposer[]): void
    {
        return this._connection && this._connection.processComposer(...composers);
    }

    public hasPermission(permission: string): boolean
    {
        return (this._rank && this._rank.hasPermission(permission)) || false;
    }

    public refreshRank(): void
    {
        this._rank = null;

        const rank = this._manager.core.security.rank.getRank(this._details.rankId);

        if(!rank) return;

        this._rank = rank;
    }

    public get id(): number
    {
        return this._id;
    }

    public get manager(): UserManager
    {
        return this._manager;
    }

    public get connection(): IConnection
    {
        return this._connection;
    }
    
    public get details(): UserDetails
    {
        return this._details;
    }

    public get rank(): IRank
    {
        return this._rank;
    }

    public get inventory(): UserInventory
    {
        return this._inventory;
    }

    public get messenger(): UserMessenger
    {
        return this._messenger;
    }

    public get notification(): UserNotification
    {
        return this._notification;
    }

    public get roomUnit(): IRoomUnitController
    {
        return this._roomUnit;
    }

    public get username(): string
    {
        return this._details.username;
    }

    public get motto(): string
    {
        return this._details.motto;
    }

    public get figure(): string
    {
        return this._details.figure;
    }

    public get gender(): string
    {
        return this._details.gender;
    }
}