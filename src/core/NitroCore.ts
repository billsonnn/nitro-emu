import { NitroManager } from '../common';
import { IDatabaseInstance } from '../database';
import { CatalogManager } from './catalog';
import { CommandManager, ICommandManager } from './command';
import { FurnitureManager, IFurnitureManager } from './furniture';
import { GroupManager } from './group';
import { INitroCore } from './interfaces';
import { NavigatorManager } from './navigator';
import { RoomManager } from './room';
import { SecurityManager } from './security';
import { UserManager } from './user';

export class NitroCore extends NitroManager implements INitroCore
{
    private _database: IDatabaseInstance;
    private _command: ICommandManager;
    private _furniture: IFurnitureManager;
    private _catalog: CatalogManager;
    private _navigator: NavigatorManager;
    private _group: GroupManager;
    private _room: RoomManager;
    private _security: SecurityManager;
    private _user: UserManager;

    constructor(database: IDatabaseInstance)
    {
        super();

        this._database      = database;
        this._command       = new CommandManager(this);
        this._furniture     = new FurnitureManager(this);
        this._catalog       = new CatalogManager(this);
        this._navigator     = new NavigatorManager(this);
        this._group         = new GroupManager(this);
        this._room          = new RoomManager(this);
        this._security      = new SecurityManager(this);
        this._user          = new UserManager(this);
    }

    public static init(): void
    {
        console.log();
        console.log(`       _   ___ __`);
        console.log(`      / | / (_) /__________`);
        console.log(`     /  |/ / / __/ ___/ __ \\`);
        console.log(`    / /|  / / /_/ /  / /_/ /`);
        console.log(`   /_/ |_/_/\\__/_/   \\____/`);
        console.log(`   v0.0.1 by Billsonnn`);
        console.log();
        console.log(`   Thanks for using Nitro. To report bugs or issues`);
        console.log(`   join us on Discord: https://discord.gg/7etsMAs`);
        console.log();
    }

    protected async onInit(): Promise<void>
    {
        if(this._command) await this._command.init();
        if(this._furniture) await this._furniture.init();
        if(this._catalog) await this._catalog.init();
        if(this._navigator) await this._navigator.init();
        if(this._group) await this._group.init();
        if(this._room) await this._room.init();
        if(this._security) await this._security.init();
        if(this._user) await this._user.init();

        this.logger.log(`Initalized`);
    }

    protected async onDispose(): Promise<void>
    {
        if(this._command) await this._command.dispose();
        if(this._user) await this._user.dispose();
        if(this._security) await this._security.dispose();
        if(this._room) await this._room.dispose();
        if(this._group) await this._group.dispose();
        if(this._navigator) await this._navigator.dispose();
        if(this._catalog) await this._catalog.dispose();
        if(this._furniture) await this._furniture.dispose();

        this.logger.log(`Disposed`);
    }

    public get database(): IDatabaseInstance
    {
        return this._database;
    }

    public get command(): ICommandManager
    {
        return this._command;
    }

    public get furniture(): IFurnitureManager
    {
        return this._furniture;
    }

    public get catalog(): CatalogManager
    {
        return this._catalog;
    }

    public get navigator(): NavigatorManager
    {
        return this._navigator;
    }

    public get group(): GroupManager
    {
        return this._group;
    }

    public get room(): RoomManager
    {
        return this._room;
    }

    public get security(): SecurityManager
    {
        return this._security;
    }

    public get user(): UserManager
    {
        return this._user;
    }
}