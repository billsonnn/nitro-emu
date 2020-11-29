import { IMessageDataWrapper, IMessageParser } from '../../../../../networking';

export class NavigatorSearchOpenParser implements IMessageParser
{
    private _query: string;

    public flush(): boolean
    {
        this._query = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._query = wrapper.readString();
        
        return true;
    }

    public get query(): string
    {
        return this._query;
    }
}