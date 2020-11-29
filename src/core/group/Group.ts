import { NitroManager, TimeHelper } from '../../common';
import { GroupDao, GroupEntity } from '../../database';
import { IRoom } from '../room';
import { GroupDetails } from './GroupDetails';
import { GroupManager } from './GroupManager';
import { GroupMember } from './GroupMember';
import { IGroup } from './interfaces';

export class Group extends NitroManager implements IGroup
{
    private _manager: GroupManager;

    private _id: number;
    private _details: GroupDetails;

    private _activeMembers: Map<number, GroupMember>;
    private _room: IRoom;

    private _lastAccess: number;
    private _disposeTimeout: NodeJS.Timeout;

    constructor(manager: GroupManager, entity: GroupEntity)
    {
        super();

        if(!manager) throw new Error('invalid_manager');

        if(!(entity instanceof GroupEntity)) throw new Error('invalid_entity');

        this._manager           = manager;

        this._id                = entity.id;
        this._details           = new GroupDetails(this, entity);

        this._activeMembers     = new Map();
        this._room              = null;

        this._lastAccess        = TimeHelper.currentTimestamp;
        this._disposeTimeout    = null;
    }

    protected async onInit(): Promise<void>
    {
        await this.loadPendingCount();
    }

    protected async onDispose(): Promise<void>
    {
        this.cancelDispose();

        await this._manager.removeGroup(this._id);

        if(this._details) await this._details.saveNow();

        this.logger.log(`Disposed`);
    }

    public updateLastAccess(): void
    {
        this.cancelDispose();

        this._lastAccess = TimeHelper.currentTimestamp;
    }

    public tryDispose(): void
    {
        if(this.isDisposed || this.isDisposing || this.isLoading) return;

        if(this._disposeTimeout || this._activeMembers.size || this._room) return;

        if(this._lastAccess < (TimeHelper.currentTimestamp - 60000)) return;

        this._disposeTimeout = setTimeout(() => this.dispose(), 60000);
    }

    public cancelDispose(): void
    {
        if(this._disposeTimeout) clearTimeout(this._disposeTimeout);

        this._disposeTimeout = null;
    }

    public async loadPendingCount(): Promise<void>
    {
        const result = await GroupDao.getTotalPendingByGroupId(this.id);

        if(this._details) this._details.totalMembersPending = result || 0;
    }

    public addActiveMember(member: GroupMember): void
    {
        if(!member) return;

        const existing = this._activeMembers.get(member.userId);

        if(existing) return;

        this._activeMembers.set(member.userId, member);
    }

    public removeActiveMember(userId: number): void
    {
        if(!userId) return;

        this._activeMembers.delete(userId);
    }

    public setRoom(room: IRoom): void
    {
        this._room = room;
    }

    public get manager(): GroupManager
    {
        return this._manager;
    }

    public get id(): number
    {
        return this._id;
    }

    public get details(): GroupDetails
    {
        return this._details;
    }

    public get activeMembers(): Map<number, GroupMember>
    {
        return this._activeMembers;
    }

    public get room(): IRoom
    {
        return this._room;
    }
}