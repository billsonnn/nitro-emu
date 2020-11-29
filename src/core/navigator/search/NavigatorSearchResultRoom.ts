import { RoomEntity } from '../../../database';

export class NavigatorSearchResultRoom
{
    private _id: number;
    private _name: string;
    private _description: string;
    private _ownerId: number;
    private _ownerName: string;
    private _state: number;
    private _categoryId: number;
    private _usersNow: number;
    private _usersMax: number;
    private _tradeType: number;
    private _allowPets: boolean;
    private _totalLikes: number;
    private _isPublic: boolean;

    constructor(entity: RoomEntity)
    {
        if(!(entity instanceof RoomEntity)) throw new Error('invalid_entity');

        this._id            = entity.id;
        this._name          = entity.name;
        this._description   = entity.description;
        this._ownerId       = entity.ownerId;
        this._ownerName     = entity.ownerName;
        this._state         = entity.state;
        this._categoryId    = entity.categoryId;
        this._usersNow      = entity.usersNow;
        this._usersMax      = entity.usersMax;
        this._tradeType     = entity.tradeType;
        this._allowPets     = entity.allowBan === 1;
        //@ts-ignore
        this._totalLikes    = entity.totalLikes;
        this._isPublic      = false;
    }

    public get id(): number
    {
        return this._id;
    }

    public get name(): string
    {
        return this._name;
    }

    public get description(): string
    {
        return this._description;
    }

    public get ownerId(): number
    {
        return this._ownerId;
    }

    public get ownerName(): string
    {
        return this._ownerName;
    }

    public get state(): number
    {
        return this._state;
    }

    public get categoryId(): number
    {
        return this._categoryId;
    }

    public get usersNow(): number
    {
        return this._usersNow;
    }

    public get usersMax(): number
    {
        return this._usersMax;
    }

    public get tradeType(): number
    {
        return this._tradeType;
    }

    public get allowPets(): boolean
    {
        return this._allowPets;
    }

    public get totalLikes(): number
    {
        return this._totalLikes;
    }

    public get isPublic(): boolean
    {
        return this._isPublic;
    }

    public set isPublic(flag: boolean)
    {
        this._isPublic = flag;
    }
}