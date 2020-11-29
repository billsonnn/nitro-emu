import { MessengerRequestEntity } from '../../../database';

export class MessengerRequest
{
    private _userId: number;
    private _username: string;
    private _figure: string;

    constructor(entity: MessengerRequestEntity)
    {
        if(!(entity instanceof MessengerRequestEntity)) throw new Error('invalid_entity');

        this._userId    = entity.userId;
        this._username  = entity.user.username;
        this._figure    = entity.user.figure;
    }

    public get id(): number
    {
        return this._userId;
    }

    public get username(): string
    {
        return this._username;
    }

    public get figure(): string
    {
        return this._figure;
    }
}