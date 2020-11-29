import { IMessageDataWrapper, IMessageParser } from '../../../../../networking';

export class RoomEnterParser implements IMessageParser
{
    private _roomId: number;
    private _password: string;

    public flush(): boolean
    {
        this._roomId    = 0;
        this._password  = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._roomId    = wrapper.readInt();
        this._password  = wrapper.readString();
        
        return true;
    }

    public get roomId(): number
    {
        return this._roomId;
    }

    public get password(): string
    {
        return this._password;
    }
}