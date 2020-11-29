import { MessengerRequest } from '../../../../../core';
import { IMessageComposer } from '../../../../../networking';

export class MessengerRequestsComposer implements IMessageComposer
{
    private _data: any[];

    constructor(requests: IterableIterator<MessengerRequest>)
    {
        let totalRequests = 0;

        const data: any[] = [];

        if(requests)
        {
            for(let request of requests)
            {
                if(!request) continue;

                data.push(request.id, request.username, request.figure);

                totalRequests++;
            }
        }

        this._data = [ totalRequests, totalRequests, ...data ];
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