import { IMessageDataWrapper, IMessageParser } from '../../../../../../networking';

export class FurnitureFloorUpdateParser implements IMessageParser
{
    private _itemId: number;
    private _x: number;
    private _y: number;
    private _direction: number;

    public flush(): boolean
    {
        this._itemId    = 0;
        this._x         = 0;
        this._y         = 0;
        this._direction = 0;
        
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._itemId    = wrapper.readInt();
        this._x         = wrapper.readInt();
        this._y         = wrapper.readInt();
        this._direction = wrapper.readInt();
        
        return true;
    }

    public get itemId(): number
    {
        return this._itemId;
    }

    public get x(): number
    {
        return this._x;
    }

    public get y(): number
    {
        return this._y;
    }

    public get direction(): number
    {
        return this._direction;
    }
}