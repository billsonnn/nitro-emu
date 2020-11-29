import { IMessageDataWrapper, IMessageParser } from '../../../../../networking';

export class UserFigureParser implements IMessageParser
{
    private _gender: string;
    private _figure: string;

    public flush(): boolean
    {
        this._gender    = null;
        this._figure    = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._gender    = wrapper.readString();
        this._figure    = wrapper.readString();
        
        return true;
    }

    public get gender(): string
    {
        return this._gender;
    }

    public get figure(): string
    {
        return this._figure;
    }
}