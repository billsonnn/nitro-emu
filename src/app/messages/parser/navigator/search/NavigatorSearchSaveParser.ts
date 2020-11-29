import { IMessageDataWrapper, IMessageParser } from '../../../../../networking';

export class NavigatorSearchSaveParser implements IMessageParser
{
    private _query: string;
    private _extraData: string;

    public flush(): boolean
    {
        this._query     = null;
        this._extraData = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._query = wrapper.readString();

        if(wrapper.bytesAvailable) this._extraData = wrapper.readString();
        
        return true;
    }

    public get query(): string
    {
        return this._query;
    }

    public get extraData(): string
    {
        return this._extraData;
    }
}