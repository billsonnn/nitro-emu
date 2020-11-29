import { IMessageDataWrapper, IMessageParser } from '../../../../../../networking';

export class UserOutfitSaveParser implements IMessageParser
{
    private _slot: number;
    private _figure: string;
    private _gender: string;

    public flush(): boolean
    {
        this._slot      = 0;
        this._figure    = null;
        this._gender    = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._slot      = wrapper.readInt();
        this._figure    = wrapper.readString();
        this._gender    = wrapper.readString();
        
        return true;
    }

    public get slot(): number
    {
        return this._slot;
    }

    public get figure(): string
    {
        return this._figure;
    }

    public get gender(): string
    {
        return this._gender;
    }
}