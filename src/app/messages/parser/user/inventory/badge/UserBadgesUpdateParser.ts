import { IMessageDataWrapper, IMessageParser } from '../../../../../../networking';

export class UserBadgesUpdateParser implements IMessageParser
{
    private _slots: { slot: number, code: string }[];

    public flush(): boolean
    {
        this._slots = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        let totalSlots = 5;

        while(totalSlots > 0)
        {
            this._slots.push({ slot: wrapper.readInt(), code: wrapper.readString() });

            totalSlots--;
        }
        
        return true;
    }

    public get slots(): { slot: number, code: string }[]
    {
        return this._slots;
    }
}