import { IMessageDataWrapper, IMessageParser } from '../../../../networking';

export class CatalogPageParser implements IMessageParser
{
    private _pageId: number;
    private _someInt: number;
    private _mode: string;

    public flush(): boolean
    {
        this._pageId    = 0;
        this._someInt   = 0;
        this._mode      = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._pageId    = wrapper.readInt();
        this._someInt   = wrapper.readInt();
        this._mode      = wrapper.readString();

        return true;
    }

    public get pageId(): number
    {
        return this._pageId;
    }

    public get someInt(): number
    {
        return this._someInt;
    }

    public get mode(): string
    {
        return this._mode;
    }
}