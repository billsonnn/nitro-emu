import { IMessageDataWrapper, IMessageParser } from '../../../../../networking';

export class MessengerAcceptParser implements IMessageParser
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

        let totalAccepted = wrapper.readInt();

        while(totalAccepted > 0)
        {
            this._friendIds.push(wrapper.readInt());

            totalAccepted--;
        }
        
        return true;
    }

    public get friendIds(): number[]
    {
        return this._friendIds;
    }
}