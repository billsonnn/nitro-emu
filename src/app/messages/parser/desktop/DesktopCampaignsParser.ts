import { IMessageDataWrapper, IMessageParser } from '../../../../networking';

export class DesktopCampaignsParser implements IMessageParser
{
    private _something: string;

    public flush(): boolean
    {
        this._something = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._something = wrapper.readString();
        
        return true;
    }

    public get something(): string
    {
        return this._something;
    }
}