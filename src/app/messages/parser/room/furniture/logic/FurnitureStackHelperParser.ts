import { IMessageDataWrapper, IMessageParser } from '../../../../../../networking';

export class FurnitureStackHelperParser implements IMessageParser
{
    private _itemId: number;
    private _stackHeight: number;

    public flush(): boolean
    {
        this._itemId        = 0;
        this._stackHeight   = 0;
        
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._itemId        = wrapper.readInt();
        this._stackHeight   = wrapper.readInt() / 100;
        
        return true;
    }

    public get itemId(): number
    {
        return this._itemId;
    }

    public get stackHeight(): number
    {
        return this._stackHeight;
    }
}