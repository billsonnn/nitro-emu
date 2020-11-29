import { IMessageComposer } from '../../../../networking';

export class CameraUrlComposer implements IMessageComposer
{
    private _data: any [];

    constructor(url: string)
    {
        this._data = [ url ];
    }

    public getMessageArray(): any[]
    {
        return this._data;
    }

    public dispose(): void
    {
        return;
    }
}