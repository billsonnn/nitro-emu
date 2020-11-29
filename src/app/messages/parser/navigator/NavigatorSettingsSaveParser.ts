import { IMessageDataWrapper, IMessageParser } from '../../../../networking';

export class NavigatorSettingsSaveParser implements IMessageParser
{
    private _x: number;
    private _y: number;
    private _width: number;
    private _height: number;
    private _searchOpen: boolean;

    public flush(): boolean
    {
        this._x             = 0;
        this._y             = 0;
        this._width         = 0;
        this._height        = 0;
        this._searchOpen    = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._x             = wrapper.readInt();
        this._y             = wrapper.readInt();
        this._width         = wrapper.readInt();
        this._height        = wrapper.readInt();
        this._searchOpen    = wrapper.readBoolean();
        
        return true;
    }

    public get x(): number
    {
        return this._x;
    }

    public get y(): number
    {
        return this._y;
    }

    public get width(): number
    {
        return this._width;
    }

    public get height(): number
    {
        return this._height;
    }

    public get searchOpen(): boolean
    {
        return this._searchOpen;
    }
}