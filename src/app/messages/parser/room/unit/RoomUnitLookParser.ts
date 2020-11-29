import { IMessageDataWrapper, IMessageParser } from '../../../../../networking';

export class RoomUnitLookParser implements IMessageParser
{
    private _x: number;
    private _y: number;

    public flush(): boolean
    {
        this._x = 0;
        this._y = 0;
        
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._x = wrapper.readInt();
        this._y = wrapper.readInt();
        
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
}