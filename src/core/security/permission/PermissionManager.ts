import { NitroManager } from '../../../common';
import { SecurityPermissionDao } from '../../../database';
import { SecurityManager } from '../SecurityManager';
import { IPermission } from './IPermission';
import { Permission } from './Permission';

export class PermissionManager extends NitroManager
{
    private _manager: SecurityManager;

    private _permissions: Map<number, IPermission>;

    constructor(manager: SecurityManager)
    {
        super();

        this._manager       = manager;

        this._permissions   = new Map();
    }

    protected async onInit(): Promise<void>
    {
        await this.loadPermissions();
    }

    protected onDispose(): void
    {
        this._permissions.clear();
    }

    public getPermission(permissionId: number): IPermission
    {
        const existing = this._permissions.get(permissionId);

        if(!existing) return null;

        return existing;
    }

    private async loadPermissions(): Promise<void>
    {
        this._permissions.clear();

        const results = await SecurityPermissionDao.loadPermissions();

        if(results)
        {
            for(let result of results)
            {
                if(!result) continue;

                const permission = new Permission(this, result);

                if(!permission) continue;

                this._permissions.set(permission.id, permission);
            }
        }

        this.logger.log(`Loaded ${ this._permissions.size } permissions`);
    }

    public get manager(): SecurityManager
    {
        return this._manager;
    }
}