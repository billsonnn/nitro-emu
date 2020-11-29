import { IMessageDataWrapper, IMessageParser } from '../../../../../networking';

export class FurniturePickupParser implements IMessageParser
{
    private _category: number;
    private _itemId: number;

    public flush(): boolean
    {
        this._category  = 0;
        this._itemId    = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        // 10 (floor item) = 2
        // 20 (wall item) = 1
        this._category  = wrapper.readInt();
        this._itemId    = wrapper.readInt();
        
        return true;
    }

    public get category(): number
    {
        return this._category;
    }

    public get itemId(): number
    {
        return this._itemId;
    }
}