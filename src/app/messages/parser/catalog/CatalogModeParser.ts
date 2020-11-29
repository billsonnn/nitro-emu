import { IMessageDataWrapper, IMessageParser } from '../../../../networking';

export class CatalogModeParser implements IMessageParser
{
    private _mode: string;

    public flush(): boolean
    {
        this._mode = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._mode = wrapper.readString();

        return true;
    }

    public get mode(): string
    {
        return this._mode;
    }
}