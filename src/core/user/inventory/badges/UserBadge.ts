import { UserBadgeEntity } from '../../../../database';

export class UserBadge
{
    private _id: number;
    private _code: string;
    private _slot: number;

    constructor(entity: UserBadgeEntity)
    {
        if(!(entity instanceof UserBadgeEntity)) throw new Error('invalid_entity');

        this._id    = entity.id;
        this._code  = entity.badgeCode;
        this._slot  = entity.slotNumber;
    }

    public get id(): number
    {
        return this._id;
    }

    public get code(): string
    {
        return this._code;
    }

    public get slot(): number
    {
        return this._slot;
    }

    public set slot(slot: number)
    {
        this._slot = slot;
    }
}