import { IMessageDataWrapper, IMessageParser } from '../../../../networking';

export class ClientReleaseVersionParser implements IMessageParser
{
    private _version: string;

    public flush(): boolean
    {
        this._version = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._version = wrapper.readString();

        return true;
    }

    public get version(): string
    {
        return this._version;
    }
}