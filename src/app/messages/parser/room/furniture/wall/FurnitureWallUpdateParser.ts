import { IMessageDataWrapper, IMessageParser } from '../../../../../../networking';

export class FurnitureWallUpdateParser implements IMessageParser
{
    private _itemId: number;
    private _location: string;

    public flush(): boolean
    {
        this._itemId    = 0;
        this._location  = null;
        
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._itemId    = wrapper.readInt();
        this._location  = wrapper.readString();
        
        return true;
    }

    public get itemId(): number
    {
        return this._itemId;
    }

    public get location(): string
    {
        return this._location;
    }
}