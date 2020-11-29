import { IMessageDataWrapper, IMessageParser } from '../../../../../networking';

export class MessengerRequestParser implements IMessageParser
{
    private _username: string;

    public flush(): boolean
    {
        this._username = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._username = wrapper.readString();
        
        return true;
    }

    public get username(): string
    {
        return this._username;
    }
}