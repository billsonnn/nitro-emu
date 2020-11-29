import { GroupEntity } from '../../database';
import { IGroup } from './interfaces';

export class GroupDetails
{
    private _group: IGroup;
    private _entity: GroupEntity;

    private _totalMembers: number;
    private _totalMembersPending: number;

    constructor(group: IGroup, entity: GroupEntity)
    {
        if(!group) throw new Error('invalid_room');

        if(!(entity instanceof GroupEntity)) throw new Error('invalid_entity');

        this._group                 = group;
        this._entity                = entity;

        //@ts-ignore
        this._totalMembers          = entity.totalMembers || 0;

        //@ts-ignore
        this._totalMembersPending   = entity.totalMembersPending || 0;
    }

    public save(): void
    {
        this._group.manager.core.database.queue.queueEntity(this._entity);
        
        return;
    }

    public async saveNow(): Promise<void>
    {
        await this._group.manager.core.database.queue.processNow(this._entity);
    }

    public get group(): IGroup
    {
        return this._group;
    }

    public get id(): number
    {
        return this._entity.id;
    }

    public get entity(): GroupEntity
    {
        return this._entity;
    }

    public get userId(): number
    {
        return this._entity.userId;
    }

    public get userName(): string
    {
        return this._entity.user.username || null;
    }

    public get roomId(): number
    {
        return this._entity.roomId;
    }

    public get roomName(): string
    {
        return this._entity.room.name || null;
    }

    public get name(): string
    {
        return this._entity.name;
    }

    public get description(): string
    {
        return this._entity.description;
    }

    public get badge(): string
    {
        return this._entity.badge;
    }

    public get colorOne(): number
    {
        return this._entity.colorOne;
    }

    public get colorTwo(): number
    {
        return this._entity.colorTwo;
    }

    public get state(): number
    {
        return this._entity.state;
    }

    public get memberRights(): boolean
    {
        return this._entity.memberRights === 1;
    }

    public get forumEnabled(): boolean
    {
        return this._entity.forumEnabled === 1;
    }

    public get timestampCreated(): Date
    {
        return this._entity.timestampCreated;
    }

    public get totalMembers(): number
    {
        return this._totalMembers;
    }

    public set totalMembers(count: number)
    {
        this._totalMembers = count;
    }

    public get totalMembersPending(): number
    {
        return this._totalMembersPending;
    }

    public set totalMembersPending(count: number)
    {
        this._totalMembersPending = count;
    }
}