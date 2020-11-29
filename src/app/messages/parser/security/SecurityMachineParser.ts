import { IMessageDataWrapper, IMessageParser } from '../../../../networking';

export class SecurityMachineParser implements IMessageParser
{
    private _someString: string;
    private _machineId: string;
    private _flashVersion: string;

    public flush(): boolean
    {
        this._someString    = null;
        this._machineId     = null;
        this._flashVersion  = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._someString    = wrapper.readString();
        this._machineId     = wrapper.readString();
        this._flashVersion  = wrapper.readString();
        
        return true;
    }

    public get someString(): string
    {
        return this._someString;
    }

    public get machineId(): string
    {
        return this._machineId;
    }

    public get flashVersion(): string
    {
        return this._flashVersion;
    }
}