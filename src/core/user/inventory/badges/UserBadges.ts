import { NitroManager } from '../../../../common';
import { UserBadgeDao } from '../../../../database';
import { IUser } from '../../interfaces';
import { UserBadge } from './UserBadge';

export class UserBadges extends NitroManager
{
    private _user: IUser;
    private _badges: Map<number, UserBadge>;
    private _currentBadges: UserBadge[];

    constructor(user: IUser)
    {
        super(user.logger);

        this._user          = user;
        this._badges        = new Map();
        this._currentBadges = [];
    }

    protected async onInit(): Promise<void>
    {
        await this.loadBadges();
    }

    protected async onDispose(): Promise<void>
    {
        this._user = null;
        
        this._badges.clear();
    }

    public getBadge(code: string): UserBadge
    {
        if(!code) return null;
        
        for(let badge of this._badges.values())
        {
            if(!badge) continue;

            if(badge.code !== code) continue;

            return badge;
        }

        return null;
    }

    public hasBadge(code: string): boolean
    {
        return this.getBadge(code) !== null;
    }

    public async getCurrentBadges(): Promise<UserBadge[]>
    {
        if(this.isLoaded || (this._currentBadges && this._currentBadges.length)) return this._currentBadges;

        const results: UserBadge[] = [];
        
        const currentBadges = await UserBadgeDao.loadUserCurrentBadges(this._user.id);

        if(currentBadges)
        {
            for(let entity of currentBadges)
            {
                if(!entity) continue;

                if(!entity.slotNumber) continue;

                results.push(new UserBadge(entity));
            }
        }

        return results;
    }

    private setCurrentBadges(): void
    {
        this._currentBadges = [];

        if(!this._badges.size) return;
        
        for(let badge of this._badges.values())
        {
            if(!badge || !badge.slot) continue;

            this._currentBadges.push(badge);
        }
    }

    public async updateCurrentBadges(badges: { slot: number, code: string }[]): Promise<void>
    {
        const results: { slot: number, code: string }[] = [];

        await this.resetBadgeSlots();

        if(badges)
        {
            for(let badge of badges.values())
            {
                if(!badge) continue;

                const existing = this.getBadge(badge.code);

                if(!existing) continue;

                existing.slot = badge.slot;

                results.push({ slot: badge.slot, code: badge.code });
            }
        }

        if(results.length)
        {
            for(let badge of results.values())
            {
                if(!badge) continue;

                await UserBadgeDao.setBadgeSlot(this._user.id, badge.code, badge.slot);
            }
        }

        this.setCurrentBadges();
    }

    private async resetBadgeSlots(): Promise<void>
    {
        if(this._badges.size)
        {
            for(let badge of this._badges.values())
            {
                if(!badge) continue;

                badge.slot = 0;
            }
        }

        await UserBadgeDao.resetBadgeSlots(this._user.id);
    }

    private async loadBadges(): Promise<void>
    {
        this._badges.clear();

        const results = await UserBadgeDao.loadUserBadges(this._user.id);

        if(results && results.length)
        {
            for(let result of results)
            {
                if(!result) continue;

                const badge = new UserBadge(result);

                if(!badge) continue;

                this._badges.set(badge.id, badge);
            }
        }

        this.setCurrentBadges();
    }

    public get user(): IUser
    {
        return this._user;
    }

    public get badges(): Map<number, UserBadge>
    {
        return this._badges;
    }
}