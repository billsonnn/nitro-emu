import { MessengerFriendEntity } from '../../../database';

export class MessengerFriend
{
    private _id: number;
    private _username: string;
    private _motto: string;
    private _gender: string;
    private _figure: string;
    private _online: boolean;
    private _relationship: number;
    private _categoryId: number;
    private _inRoom: boolean;

    constructor(entity: MessengerFriendEntity)
    {
        if(!(entity instanceof MessengerFriendEntity)) throw new Error('invalid_entity');

        this._id            = entity.friend.id;
        this._username      = entity.friend.username;
        this._motto         = entity.friend.motto;
        this._gender        = entity.friend.gender;
        this._figure        = entity.friend.figure;
        this._online        = entity.friend.online === 1;
        this._relationship  = entity.relation;
        this._categoryId    = entity.categoryId || 0;
        this._inRoom        = false;
    }

    public get id(): number
    {
        return this._id;
    }

    public get username(): string
    {
        return this._username;
    }

    public set username(username: string)
    {
        this._username = username;
    }

    public get motto(): string
    {
        return this._motto;
    }

    public set motto(motto: string)
    {
        this._motto = motto;
    }

    public get gender(): string
    {
        return this._gender;
    }

    public set gender(gender: string)
    {
        this._gender = gender;
    }

    public get figure(): string
    {
        return this._figure;
    }

    public set figure(figure: string)
    {
        this._figure = figure;
    }

    public get online(): boolean
    {
        return this._online;
    }

    public set online(online: boolean)
    {
        this._online = online;
    }

    public get categoryId(): number
    {
        return this._categoryId;
    }

    public get relationship(): number
    {
        return this._relationship;
    }

    public set relationship(relationship: number)
    {
        this._relationship = relationship;
    }

    public get inRoom(): boolean
    {
        return this._inRoom;
    }

    public set inRoom(status: boolean)
    {
        this._inRoom = status;
    }
}