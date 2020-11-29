import { NitroManager, TimeHelper } from '../../common';
import { SecurityTicketDao } from '../../database';
import { INitroCore } from '../interfaces';
import { PermissionManager } from './permission';
import { RankManager } from './rank';

export class SecurityManager extends NitroManager
{
    private _core: INitroCore;

    private _permission: PermissionManager;
    private _rank: RankManager;

    constructor(core: INitroCore)
    {
        super();

        this._core          = core;

        this._permission    = new PermissionManager(this);
        this._rank          = new RankManager(this);
    }

    protected async onInit(): Promise<void>
    {
        if(this._permission) await this._permission.init();
        if(this._rank) await this._rank.init();
    }

    protected async onDispose(): Promise<void>
    {
        if(this._rank) await this._rank.dispose();
        if(this._permission) await this._permission.dispose();
    }

    public async getUserIdFromTicket(ticket: string, ip: string): Promise<number>
    {
        if(!ticket) return 0;

        const entity = await SecurityTicketDao.getTicket(ticket);

        if(!entity) return 0;

        if(entity.isLocked === 0)
        {
            SecurityTicketDao.removeTicket(ticket);

            if(entity.timestampExpires < TimeHelper.now) return null;
        }

        if(!entity.userId) return 0;

        return entity.userId;
    }

    public get core(): INitroCore
    {
        return this._core;
    }

    public get permission(): PermissionManager
    {
        return this._permission;
    }

    public get rank(): RankManager
    {
        return this._rank;
    }
}