import { IMessageDataWrapper, IMessageParser } from '../../../../../networking';

export class UserSettingsVolumeParser implements IMessageParser
{
    private _volumeSystem: number;
    private _volumeFurni: number;
    private _volumeTrax: number;

    public flush(): boolean
    {
        this._volumeSystem  = 0;
        this._volumeFurni   = 0;
        this._volumeTrax    = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._volumeSystem  = wrapper.readInt();
        this._volumeFurni   = wrapper.readInt();
        this._volumeTrax    = wrapper.readInt();
        
        return true;
    }

    public get volumeSystem(): number
    {
        return this._volumeSystem;
    }

    public get volumeFurni(): number
    {
        return this._volumeFurni;
    }

    public get volumeTrax(): number
    {
        return this._volumeTrax;
    }
}