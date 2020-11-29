import { NitroManager, TimeHelper } from '../../../../common';
import { UserSubscriptionDao } from '../../../../database';
import { IUser } from '../../interfaces';
import { UserSubscription } from './UserSubscription';

export class UserSubscriptions extends NitroManager
{
    public static HABBO_CLUB: string = 'habbo_club';
    
    private _user: IUser;
    private _subscriptions: Map<string, UserSubscription>;

    constructor(user: IUser)
    {
        super(user.logger);

        this._user          = user;
        this._subscriptions = new Map();
    }

    protected async onInit(): Promise<void>
    {
        await this.loadSubscriptions();
    }

    protected async onDispose(): Promise<void>
    {
        this._user = null;
        
        this._subscriptions.clear();
    }

    public getSubscription(name: string): UserSubscription
    {
        const existing = this._subscriptions.get(name);

        if(!existing) return null;

        return existing;
    }

    public hasHabboClub(): boolean
    {
        const subscription = this.getSubscription(UserSubscriptions.HABBO_CLUB);

        if(!subscription) return false;

        return TimeHelper.between(TimeHelper.now, subscription.expiration, 'seconds') > 0;
    }

    private async loadSubscriptions(): Promise<void>
    {
        this._subscriptions.clear();

        const results = await UserSubscriptionDao.loadSubscriptions(this._user.id);

        if(!results) return;

        for(let result of results)
        {
            if(!result) continue;

            this._subscriptions.set(result.name, new UserSubscription(this._user, result));
        }
    }

    public get user(): IUser
    {
        return this._user;
    }

    public get subscriptions(): Map<string, UserSubscription>
    {
        return this._subscriptions;
    }
}