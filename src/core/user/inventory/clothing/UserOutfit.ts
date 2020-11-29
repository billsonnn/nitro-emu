import { UserOutfitEntity } from '../../../../database';

export class UserOutfit
{
    private _id: number;
    private _slot: number;
    private _figure: string;
    private _gender: string;

    constructor(entity: UserOutfitEntity)
    {
        if(!(entity instanceof UserOutfitEntity)) throw new Error('invalid_entity');

        this._id        = entity.id;
        this._slot      = entity.slotNumber;
        this._figure    = entity.figure;
        this._gender    = entity.gender;
    }

    public get id(): number
    {
        return this._id;
    }

    public get slot(): number
    {
        return this._slot;
    }

    public get figure(): string
    {
        return this._figure;
    }

    public get gender(): string
    {
        return this._gender;
    }
}