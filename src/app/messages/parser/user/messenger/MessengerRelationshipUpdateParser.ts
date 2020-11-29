import { IMessageDataWrapper, IMessageParser } from '../../../../../networking';

export class MessengerRelationshipUpdateParser implements IMessageParser
{
    private _friendId: number;
    private _relationship: number;

    public flush(): boolean
    {
        this._friendId      = 0;
        this._relationship  = 0;
        
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._friendId      = wrapper.readInt();
        this._relationship  = wrapper.readInt();
        
        return true;
    }

    public get friendId(): number
    {
        return this._friendId;
    }

    public get relationship(): number
    {
        return this._relationship;
    }
}