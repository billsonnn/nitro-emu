import { IMessageComposer } from '../../../../../networking';

export class RoomEnterErrorComposer implements IMessageComposer
{
    private _data: any[];

    constructor(errorCode: number, message: string = '')
    {
        this._data = [ errorCode, message ];
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