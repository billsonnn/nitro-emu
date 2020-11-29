import { IMessageDataWrapper, IMessageParser } from '../../../../../networking';

export class MessengerRemoveParser implements IMessageParser
{
    private _friendIds: number[];

    public flush(): boolean
    {
        this._friendIds = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        let totalRemoved = wrapper.readInt();

        while(totalRemoved > 0)
        {
            this._friendIds.push(wrapper.readInt());

            totalRemoved--;
        }
        
        return true;
    }

    public get friendIds(): number[]
    {
        return this._friendIds;
    }
}