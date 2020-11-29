import { IMessageDataWrapper, IMessageParser } from '../../../../../networking';

export class RoomUnitDanceParser implements IMessageParser
{
    private _danceType: number;

    public flush(): boolean
    {
        this._danceType = 0;
        
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._danceType = wrapper.readInt();
        
        return true;
    }

    public get danceType(): number
    {
        return this._danceType;
    }
}