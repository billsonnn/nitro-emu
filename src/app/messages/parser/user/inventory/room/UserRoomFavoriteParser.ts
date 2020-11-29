import { IMessageDataWrapper, IMessageParser } from '../../../../../../networking';

export class UserRoomFavoriteParser implements IMessageParser
{
    private _roomId: number;

    public flush(): boolean
    {
        this._roomId = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._roomId = wrapper.readInt();
        
        return true;
    }

    public get roomId(): number
    {
        return this._roomId;
    }
}