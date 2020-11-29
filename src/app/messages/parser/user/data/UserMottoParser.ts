import { IMessageDataWrapper, IMessageParser } from '../../../../../networking';

export class UserMottoParser implements IMessageParser
{
    private _motto: string;

    public flush(): boolean
    {
        this._motto = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._motto = wrapper.readString();
        
        return true;
    }

    public get motto(): string
    {
        return this._motto;
    }
}