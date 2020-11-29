import { SecurityRankEntity } from '../../../database';
import { IPermission } from '../permission';
import { IRank } from './IRank';
import { RankManager } from './RankManager';

export class Rank implements IRank
{
    private _manager: RankManager;

    private _entity: SecurityRankEntity;
    private _permission: IPermission;

    constructor(manager: RankManager, entity: SecurityRankEntity)
    {
        if(!manager) throw new Error('invalid_manager');

        if(!(entity instanceof SecurityRankEntity)) throw new Error('invalid_entity');

        this._manager       = manager;

        this._entity        = entity;
        this._permission    = null;
    }

    public hasPermission(permission: string): boolean
    {
        return this._permission && this._permission.hasPermission(permission);
    }

    public get id(): number
    {
        return this._entity.id;
    }

    public get manager(): RankManager
    {
        return this._manager;
    }

    public get permission(): IPermission
    {
        return this._permission;
    }

    public set permission(permission: IPermission)
    {
        this._permission = permission;
    }

    public get clientRank(): number
    {
        return this._entity.clientRank || 0;
    }
}