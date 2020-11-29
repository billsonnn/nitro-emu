import { UserSubscriptionEntity } from '../../../../database';
import { IUser } from '../../interfaces';

export class UserSubscription
{
    private _user: IUser;
    private _entity: UserSubscriptionEntity;

    constructor(user: IUser, entity: UserSubscriptionEntity)
    {
        if(!user) throw new Error('invalid_user');

        if(!(entity instanceof UserSubscriptionEntity)) throw new Error('invalid_entity');
        
        this._user      = user;
        this._entity    = entity;
    }

    public get user(): IUser
    {
        return this._user;
    }

    public get entity(): UserSubscriptionEntity
    {
        return this._entity;
    }

    public get expiration(): Date
    {
        return this._entity.timestampExpires;
    }
}