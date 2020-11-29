import { IMessageDataWrapper, IMessageParser } from '../../../../../networking';

export class MessengerRelationshipsParser implements IMessageParser
{
    private _userId: number;

    public flush(): boolean
    {
        this._userId = 0;
        
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._userId = wrapper.readInt();
        
        return true;
    }

    public get userId(): number
    {
        return this._userId;
    }
}