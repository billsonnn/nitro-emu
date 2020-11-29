import { IMessageDataWrapper, IMessageParser } from '../../../../../../networking';

export class RoomBanGiveParser implements IMessageParser
{
    private _userId: number;
    private _roomId: number;
    private _length: string;

    public flush(): boolean
    {
        this._userId    = 0;
        this._roomId    = 0;
        this._length    = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._userId    = wrapper.readInt();
        this._roomId    = wrapper.readInt();
        this._length    = wrapper.readString();
        
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

    public get length(): string
    {
        return this._length;
    }
}