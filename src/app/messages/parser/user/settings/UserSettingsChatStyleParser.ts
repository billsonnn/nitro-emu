import { IMessageDataWrapper, IMessageParser } from '../../../../../networking';

export class UserSettingsChatStyleParser implements IMessageParser
{
    private _chatStyle: number;

    public flush(): boolean
    {
        this._chatStyle = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._chatStyle = wrapper.readInt();
        
        return true;
    }

    public get chatStyle(): number
    {
        return this._chatStyle;
    }
}