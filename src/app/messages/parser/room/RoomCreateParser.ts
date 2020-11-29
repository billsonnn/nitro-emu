import { RoomTradeEnum } from '../../../../core';
import { IMessageDataWrapper, IMessageParser } from '../../../../networking';

export class RoomCreateParser implements IMessageParser
{
    private _name: string;
    private _description: string;
    private _model: string;
    private _categoryId: number;
    private _usersMax: number;
    private _tradeType: number;

    public flush(): boolean
    {
        this._name          = null;
        this._description   = null;
        this._model         = null;
        this._categoryId    = 0;
        this._usersMax      = 0;
        this._tradeType     = RoomTradeEnum.DISABLED;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._name          = wrapper.readString();
        this._description   = wrapper.readString();
        this._model         = wrapper.readString();
        this._categoryId    = wrapper.readInt();
        this._usersMax      = wrapper.readInt();
        this._tradeType     = wrapper.readInt();
        
        return true;
    }

    public get name(): string
    {
        return this._name;
    }

    public get description(): string
    {
        return this._description;
    }

    public get model(): string
    {
        return this._model;
    }

    public get categoryId(): number
    {
        return this._categoryId;
    }

    public get usersMax(): number
    {
        return this._usersMax;
    }

    public get tradeType(): number
    {
        return this._tradeType;
    }
}