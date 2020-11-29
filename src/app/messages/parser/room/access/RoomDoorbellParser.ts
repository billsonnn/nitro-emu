import { IMessageDataWrapper, IMessageParser } from '../../../../../networking';

export class RoomDoorbellParser implements IMessageParser
{
    private _username: string;
    private _accepted: boolean;

    public flush(): boolean
    {
        this._username  = null;
        this._accepted  = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._username  = wrapper.readString();
        this._accepted  = wrapper.readBoolean();
        
        return true;
    }

    public get username(): string
    {
        return this._username;
    }

    public get accepted(): boolean
    {
        return this._accepted;
    }
}