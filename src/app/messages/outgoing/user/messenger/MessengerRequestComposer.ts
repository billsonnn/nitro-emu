import { MessengerRequest } from '../../../../../core';
import { IMessageComposer } from '../../../../../networking';

export class MessengerRequestComposer implements IMessageComposer
{
    private _data: any[];

    constructor(request: MessengerRequest)
    {
        this._data = [ request.id, request.username, request.figure ];
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