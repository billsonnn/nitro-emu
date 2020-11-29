import { IMessageDataWrapper, IMessageParser } from '../../../../../networking';

export class RoomUnitSignParser implements IMessageParser
{
    private _signType: number;

    public flush(): boolean
    {
        this._signType = 0;
        
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._signType = wrapper.readInt();
        
        return true;
    }

    public get signType(): number
    {
        return this._signType;
    }
}