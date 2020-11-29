import { IMessageComposer } from '../../../../../networking';

export class MessengerChatComposer implements IMessageComposer
{
    private _data: any[];

    constructor(userId: number, message: string, timestamp: number)
    {
        this._data = [ userId, message, timestamp ];
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