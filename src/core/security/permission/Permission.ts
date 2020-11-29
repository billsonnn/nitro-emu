import { SecurityPermissionEntity } from '../../../database';
import { IPermission } from '../permission';
import { PermissionList } from './PermissionList';
import { PermissionManager } from './PermissionManager';

export class Permission implements IPermission
{
    private _manager: PermissionManager;

    private _entity: SecurityPermissionEntity;

    constructor(manager: PermissionManager, entity: SecurityPermissionEntity)
    {
        if(!manager) throw new Error('invalid_manager');

        if(!(entity instanceof SecurityPermissionEntity)) throw new Error('invalid_entity');
        
        this._manager   = manager;

        this._entity    = entity;
    }

    public hasAllPermissions(): boolean
    {
        if(this._entity.allPermissions === 1) return true;

        return false;
    }

    public hasPermission(permission: string): boolean
    {
        if(!permission) return true;

        if(permission === PermissionList.NONE) return true;

        if(this.hasAllPermissions()) return true;
        
        const value = this._entity[permission.toString()] as number;

        if(permission === undefined || !permission) return false;

        return value === 1;
    }

    public get id(): number
    {
        return this._entity.id;
    }

    public get manager(): PermissionManager
    {
        return this._manager;
    }
}