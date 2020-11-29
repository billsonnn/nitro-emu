import { NotificationList } from '../../../../../core';
import { IMessageComposer } from '../../../../../networking';

export class NotificationListComposer implements IMessageComposer
{
    private _data: any[];

    constructor(notification: NotificationList)
    {
        let totalItems = 0;

        const data: any[] = [];

        if(notification.items && notification.items.length)
        {
            for(let item of notification.items)
            {
                if(!item) continue;

                data.push(item.key, item.value);

                totalItems++;
            }
        }

        this._data = [ notification.type, totalItems, ...data ];
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