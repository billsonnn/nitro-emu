import { IMessageDataWrapper, IMessageParser } from '../../../../../../networking';

export class UserSubscriptionParser implements IMessageParser
{
    private _type: string;

    public flush(): boolean
    {
        this._type = null;
        
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._type = wrapper.readString();
        
        return true;
    }

    public get type(): string
    {
        return this._type;
    }
}