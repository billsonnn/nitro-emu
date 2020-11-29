import { GroupMemberEntity } from '../../database';
import { IUser } from '../user';
import { GroupRank } from './enum/GroupRank';
import { IGroup } from './interfaces';

export class GroupMember
{
    private _group: IGroup;

    private _entity: GroupMemberEntity;
    private _user: IUser;

    constructor(group: IGroup, entity: GroupMemberEntity, user: IUser)
    {
        if(!(entity instanceof GroupMemberEntity)) throw new Error('invalid_entity');

        this._group     = group;

        this._entity    = entity;
        this._user      = user;
    }

    public async saveNow(): Promise<void>
    {
        await this._group.manager.core.database.queue.processNow(this._entity);
    }

    public async updateRank(rank: number): Promise<void>
    {
        if(this._entity.rank === rank) return;

        this._entity.rank = rank;

        await this.saveNow();
    }

    public get group(): IGroup
    {
        return this._group;
    }

    public get user(): IUser
    {
        return this._user;
    }

    public get id(): number
    {
        return this._entity.id;
    }

    public get groupId(): number
    {
        return this._entity.groupId;
    }

    public get userId(): number
    {
        return this._entity.userId;
    }

    public get rank(): GroupRank
    {
        return this._entity.rank;
    }

    public get timestampCreated(): Date
    {
        return this._entity.timestampCreated;
    }
}