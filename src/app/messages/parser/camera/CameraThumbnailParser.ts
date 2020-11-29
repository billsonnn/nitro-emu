import { IMessageDataWrapper, IMessageParser } from '../../../../networking';

export class CameraThumbnailParser implements IMessageParser
{
    private _picture: ByteBuffer;

    public flush(): boolean
    {
        this._picture = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._picture = wrapper.readBytes(wrapper.readInt());
        
        return true;
    }

    public get picture(): ByteBuffer
    {
        return this._picture;
    }
}