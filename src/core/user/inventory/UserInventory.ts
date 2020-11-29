import { NitroManager } from '../../../common';
import { IUser } from '../interfaces';
import { UserBadges } from './badges';
import { UserBots } from './bots';
import { UserOutfits } from './clothing';
import { UserCurrency } from './currency';
import { UserFurniture } from './furniture';
import { UserGroups } from './groups';
import { UserRooms } from './rooms';
import { UserSubscriptions } from './subscriptions';

export class UserInventory extends NitroManager
{
    private _user: IUser;

    private _badges: UserBadges;
    private _bots: UserBots;
    private _outfits: UserOutfits;
    private _currency: UserCurrency;
    private _furniture: UserFurniture;
    private _groups: UserGroups;
    private _rooms: UserRooms;
    private _subscriptions: UserSubscriptions;

    constructor(user: IUser)
    {
        super(user.logger);

        this._user      = user;

        this._badges        = new UserBadges(this._user);
        this._bots          = new UserBots(this._user);
        this._outfits       = new UserOutfits(this._user);
        this._currency      = new UserCurrency(this._user);
        this._furniture     = new UserFurniture(this._user);
        this._groups        = new UserGroups(this._user);
        this._rooms         = new UserRooms(this._user);
        this._subscriptions = new UserSubscriptions(this._user);
    }

    protected async onInit(): Promise<void>
    {
        if(this._badges) await this._badges.init();
        if(this._bots) await this._bots.init();
        if(this._outfits) await this._outfits.init();
        if(this._currency) await this._currency.init();
        if(this._furniture) await this._furniture.init();
        if(this._groups) await this._groups.init();
        if(this._rooms) await this._rooms.init();
        if(this._subscriptions) await this._subscriptions.init();
    }

    protected async onDispose(): Promise<void>
    {
        if(this._subscriptions) await this._subscriptions.dispose();
        if(this._rooms) await this._rooms.dispose();
        if(this._groups) await this._groups.dispose();
        if(this._furniture) await this._furniture.dispose();
        if(this._currency) await this._currency.dispose();
        if(this._outfits) await this._outfits.dispose();
        if(this._bots) await this._bots.dispose();
        if(this._badges) await this._badges.dispose();
    }

    public get user(): IUser
    {
        return this._user;
    }

    public get badges(): UserBadges
    {
        return this._badges;
    }

    public get bots(): UserBots
    {
        return this._bots;
    }

    public get outfits(): UserOutfits
    {
        return this._outfits;
    }

    public get currency(): UserCurrency
    {
        return this._currency;
    }

    public get furniture(): UserFurniture
    {
        return this._furniture;
    }

    public get groups(): UserGroups
    {
        return this._groups;
    }

    public get rooms(): UserRooms
    {
        return this._rooms;
    }

    public get subscriptions(): UserSubscriptions
    {
        return this._subscriptions;
    }
}