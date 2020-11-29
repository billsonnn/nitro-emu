import { IMessageDataWrapper, IMessageParser } from '../../../../../networking';

export class NavigatorSearchParser implements IMessageParser
{
    private _tab: string;
    private _query: string;

    public flush(): boolean
    {
        this._tab   = null;
        this._query = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._tab   = wrapper.readString();
        this._query = wrapper.readString();
        
        return true;
    }

    public get tab(): string
    {
        return this._tab;
    }

    public get query(): string
    {
        return this._query;
    }
}