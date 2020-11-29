import { IMessageDataWrapper, IMessageParser } from '../../../../../networking';

export class RoomInfoParser implements IMessageParser
{
    private _roomId: number;
    private _enterRoom: boolean;
    private _forwardRoom: boolean;

    public flush(): boolean
    {
        this._roomId        = 0;
        this._enterRoom     = false;
        this._forwardRoom   = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._roomId        = wrapper.readInt();
        this._enterRoom     = wrapper.readInt() === 1;
        this._forwardRoom   = wrapper.readInt() === 1;
        
        return true;
    }

    public get roomId(): number
    {
        return this._roomId;
    }

    public get enterRoom(): boolean
    {
        return this._enterRoom;
    }

    public get forwardRoom(): boolean
    {
        return this._forwardRoom;
    }
}