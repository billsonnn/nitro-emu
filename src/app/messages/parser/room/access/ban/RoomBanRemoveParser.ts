import { IMessageDataWrapper, IMessageParser } from '../../../../../../networking';

export class RoomBanRemoveParser implements IMessageParser
{
    private _userId: number;
    private _roomId: number;

    public flush(): boolean
    {
        this._userId    = 0;
        this._roomId    = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._userId    = wrapper.readInt();
        this._roomId    = wrapper.readInt();
        
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
}