import { IMessageDataWrapper, IMessageParser } from '../../../../../networking';

export class FurniturePlaceParser implements IMessageParser
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

        const data = wrapper.readString();

        const [ itemId, x, y, direction ] = data.split(' ').map(octet => parseInt(octet, 10));

        this._itemId    = itemId;
        this._x         = x;
        this._y         = y;
        this._direction = direction;
        
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