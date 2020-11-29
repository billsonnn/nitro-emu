import { IMessageDataWrapper, IMessageParser } from '../../../../../../networking';

export class RoomMuteUserParser implements IMessageParser
{
    private _userId: number;
    private _roomId: number;
    private _minutes: number;

    public flush(): boolean
    {
        this._userId    = 0;
        this._roomId    = 0;
        this._minutes   = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._userId    = wrapper.readInt();
        this._roomId    = wrapper.readInt();
        this._minutes   = wrapper.readInt();
        
        return true;
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get roomId(): number
    {
        return this._roomId;
    }

    public get minutes(): number
    {
        return this._minutes;
    }
}