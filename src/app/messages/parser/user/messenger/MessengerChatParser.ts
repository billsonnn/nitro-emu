import { IMessageDataWrapper, IMessageParser } from '../../../../../networking';

export class MessengerChatParser implements IMessageParser
{
    private _friendId: number;
    private _message: string;

    public flush(): boolean
    {
        this._friendId  = 0;
        this._message   = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._friendId  = wrapper.readInt();
        this._message   = wrapper.readString();
        
        return true;
    }

    public get friendId(): number
    {
        return this._friendId;
    }

    public get message(): string
    {
        return this._message;
    }
}