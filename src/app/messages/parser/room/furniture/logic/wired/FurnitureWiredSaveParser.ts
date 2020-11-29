import { IMessageDataWrapper, IMessageParser } from '../../../../../../../networking';

export class FurnitureWiredSaveParser implements IMessageParser
{
    private _itemId: number;
    private _intParameters: number[];
    private _stringParameter: string;
    private _itemIds: number[];

    public flush(): boolean
    {
        this._itemId            = 0;
        this._intParameters     = [];
        this._stringParameter   = '';
        this._itemIds           = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._itemId = wrapper.readInt();

        let totalIntParameters = wrapper.readInt();

        while(totalIntParameters > 0)
        {
            this._intParameters.push(wrapper.readInt());

            totalIntParameters--;
        }

        this._stringParameter = wrapper.readString();

        let totalItemIds = wrapper.readInt();

        while(totalItemIds > 0)
        {
            this._itemIds.push(wrapper.readInt());

            totalItemIds--;
        }
        
        return true;
    }

    public get itemId(): number
    {
        return this._itemId;
    }

    public get intParameters(): number[]
    {
        return this._intParameters;
    }

    public get stringParameter(): string
    {
        return this._stringParameter;
    }

    public get itemIds(): number[]
    {
        return this._itemIds;
    }
}