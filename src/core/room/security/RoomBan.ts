import { RoomBanEntity } from '../../../database';

export class RoomBan
{
    private _entity: RoomBanEntity;

    constructor(entity: RoomBanEntity)
    {
        if(!(entity instanceof RoomBanEntity)) throw new Error('invalid_entity');

        this._entity = entity;
    }

    public get userId(): number
    {
        return this._entity.user.id;
    }

    public get username(): string
    {
        return this._entity.user.username;
    }

    public get timestampCreated(): Date
    {
        return this._entity.timestampCreated;
    }

    public get timestampExpires(): Date
    {
        return this._entity.timestampExpires;
    }
}