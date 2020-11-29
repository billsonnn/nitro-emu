import { IMessageDataWrapper, IMessageParser } from '../../../../networking';

export class CatalogPurchaseParser implements IMessageParser
{
    private _pageId: number;
    private _itemId: number;
    private _extraData: string;
    private _amount: number;

    public flush(): boolean
    {
        this._pageId    = 0;
        this._itemId    = 0;
        this._extraData = null;
        this._amount    = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._pageId    = wrapper.readInt();
        this._itemId    = wrapper.readInt();
        this._extraData = wrapper.readString();
        this._amount    = wrapper.readInt();

        return true;
    }

    public get pageId(): number
    {
        return this._pageId;
    }

    public get itemId(): number
    {
        return this._itemId;
    }

    public get extraData(): string
    {
        return this._extraData;
    }

    public get amount(): number
    {
        return this._amount;
    }
}