import { IMessageDataWrapper, IMessageParser } from '../../../../../../networking';

export class RoomRightsRemoveParser implements IMessageParser
{
    private _ids: number[];

    public flush(): boolean
    {
        this._ids = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        let totalIds = wrapper.readInt();

        while(totalIds > 0)
        {
            this._ids.push(wrapper.readInt());

            totalIds--;
        }
        
        return true;
    }

    public get ids(): number[]
    {
        return this._ids;
    }
}