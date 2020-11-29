import { IMessageDataWrapper, IMessageParser } from '../../../../../networking';

export class RoomUnitActionParser implements IMessageParser
{
    private _actionType: number;

    public flush(): boolean
    {
        this._actionType = 0;
        
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._actionType = wrapper.readInt();
        
        return true;
    }

    public get actionType(): number
    {
        return this._actionType;
    }
}