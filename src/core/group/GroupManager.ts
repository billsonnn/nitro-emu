import { NitroManager } from '../../common';
import { GroupDao } from '../../database';
import { INitroCore } from '../interfaces';
import { Group } from './Group';
import { IGroup } from './interfaces';

export class GroupManager extends NitroManager
{
    private _core: INitroCore;

    private _groups: Map<number, IGroup>;

    private _disposeInterval: NodeJS.Timeout;

    constructor(core: INitroCore)
    {
        super();

        this._core              = core;

        this._groups            = new Map();

        this._disposeInterval   = null;
    }

    protected async onInit(): Promise<void>
    {
        this._disposeInterval = setInterval(() => this.tryDisposeAll(), 60000);
    }

    protected async onDispose(): Promise<void>
    {
        if(this._disposeInterval) clearInterval(this._disposeInterval);
        
        await this.removeAllGroups();
    }

    public async getGroup(id: number): Promise<IGroup>
    {
        if(!id) return null;

        const group = this.getActiveGroup(id);

        if(group) return group;

        return await this.getOfflineGroup(id);
    }

    public async getGroupByRoomId(roomId: number): Promise<IGroup>
    {
        if(!roomId) return null;

        const groupId = await GroupDao.getGroupIdByRoomId(roomId);

        if(!groupId) return null;

        return await this.getGroup(groupId);
    }

    public getActiveGroup(id: number): IGroup
    {
        if(!id) return null;

        const existing = this._groups.get(id);

        if(!existing) return null;

        existing.updateLastAccess();

        return existing;
    }

    private async getOfflineGroup(id: number): Promise<IGroup>
    {
        if(!id) return null;

        const entity = await GroupDao.loadGroup(id);

        if(!entity) return null;

        const room = new Group(this, entity);

        if(!room) return null;

        return this.addGroup(room);
    }

    public addGroup(group: IGroup): IGroup
    {
        if(!group) return null;

        const existing = this.getActiveGroup(group.id);

        if(existing)
        {
            if(group !== existing) group.dispose();

            return existing;
        }

        this._groups.set(group.id, group);

        return group;
    }

    public async removeGroup(groupId: number): Promise<void>
    {
        const existing = this.getActiveGroup(groupId);

        if(!existing) return;

        this._groups.delete(groupId);

        await existing.dispose();
    }

    public async removeAllGroups(): Promise<void>
    {
        if(!this._groups || !this._groups.size) return;

        for(let group of this._groups.values())
        {
            if(!group) continue;

            this._groups.delete(group.id);

            await group.dispose();
        }
    }

    public tryDisposeAll(): void
    {
        if(!this._groups || !this._groups.size) return;
        
        for(let group of this._groups.values())
        {
            if(!group) continue;

            group.tryDispose();
        }
    }

    public get core(): INitroCore
    {
        return this._core;
    }

    public get groups(): Map<number, IGroup>
    {
        return this._groups;
    }
}