import { IMessageDataWrapper, IMessageParser } from '../../../../../networking';

export class MessengerRoomInviteParser implements IMessageParser
{
    private _friendIds: number[];
    private _message: string;

    public flush(): boolean
    {
        this._friendIds = [];
        this._message   = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        let totalInvited = wrapper.readInt();

        while(totalInvited > 0)
        {
            this._friendIds.push(wrapper.readInt());

            totalInvited--;
        }

        this._message = wrapper.readString();
        
        return true;
    }

    public get friendIds(): number[]
    {
        return this._friendIds;
    }

    public get message(): string
    {
        return this._message;
    }
}