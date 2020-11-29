import { NitroManager } from '../../../../common';
import { GroupDao } from '../../../../database';
import { GroupMember } from '../../../group';
import { IUser } from '../../interfaces';

export class UserGroups extends NitroManager
{
    private _user: IUser;

    private _memberships: Map<number, GroupMember>;

    constructor(user: IUser)
    {
        super(user.logger);

        this._user          = user;

        this._memberships   = new Map();
    }

    protected async onInit(): Promise<void>
    {
        await this.loadMemberships();
    }

    protected async onDispose(): Promise<void>
    {
        this._user = null;

        if(this._memberships.size)
        {
            for(let groupId of this._memberships.keys()) this.removeMembership(groupId);

            this._memberships.clear();
        }
    }

    public getMembership(groupId: number): GroupMember
    {
        const existing = this._memberships.get(groupId);

        if(existing) return existing;

        return null;
    }

    public removeMembership(groupId: number): void
    {
        const existing = this._memberships.get(groupId);

        if(!existing) return;

        this._memberships.delete(groupId);

        if(existing.group && this._user) existing.group.removeActiveMember(this._user.id);
    }

    private async loadMemberships(): Promise<void>
    {
        this._memberships.clear();

        const results = await GroupDao.getMembershipsByUserId(this._user.id);

        if(!results || !results.length) return;

        for(let result of results)
        {
            if(!result) continue;

            try
            {
                const existing = this._memberships.get(result.groupId);

                if(existing) continue;

                const group = await this._user.manager.core.group.getGroup(result.groupId);

                if(!group) continue;

                const member = new GroupMember(group, result, this._user);

                group.addActiveMember(member);

                this._memberships.set(group.id, member);
            }

            catch(err)
            {
                this.logger.error(err.message || err, err.stack);
            }
        }
    }

    public get user(): IUser
    {
        return this._user;
    }
}