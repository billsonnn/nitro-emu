import { IMessageDataWrapper, IMessageParser } from '../../../../../networking';

export class UserSettingsInvitesParser implements IMessageParser
{
    private _flag: boolean;

    public flush(): boolean
    {
        this._flag = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._flag = wrapper.readBoolean();
        
        return true;
    }

    public get flag(): boolean
    {
        return this._flag;
    }
}