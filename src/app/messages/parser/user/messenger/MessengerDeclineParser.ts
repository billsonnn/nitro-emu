import { IMessageDataWrapper, IMessageParser } from '../../../../../networking';

export class MessengerDeclineParser implements IMessageParser
{
    private _removeAll: boolean;
    private _friendIds: number[];

    public flush(): boolean
    {
        this._removeAll = false;
        this._friendIds = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        if(wrapper.readBoolean())
        {
            this._removeAll = true;

            return;
        }

        let totalDeclined = wrapper.readInt();

        while(totalDeclined > 0)
        {
            this._friendIds.push(wrapper.readInt());

            totalDeclined--;
        }
        
        return true;
    }

    public get removeAll(): boolean
    {
        return this._removeAll;
    }

    public get friendIds(): number[]
    {
        return this._friendIds;
    }
}