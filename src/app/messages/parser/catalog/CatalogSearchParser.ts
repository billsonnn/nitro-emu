import { IMessageDataWrapper, IMessageParser } from '../../../../networking';

export class CatalogSearchParser implements IMessageParser
{
    private _offerId: number;

    public flush(): boolean
    {
        this._offerId = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._offerId = wrapper.readInt();

        return true;
    }

    public get offerId(): number
    {
        return this._offerId;
    }
}